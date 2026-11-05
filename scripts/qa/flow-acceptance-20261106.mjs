import fs from 'node:fs';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.QA_MODULE);
const out='flow-acceptance-evidence';fs.mkdirSync(out,{recursive:true});
const marker='STTQA-20261106-A';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const results=[];
const save=()=>fs.writeFileSync(out+'/report.json',JSON.stringify({checkedAt:new Date().toISOString(),marker,scope:'Requested founder layout and intake/interview flows only; browser tests and provider receipts; mailbox receipt checked separately',results},null,2));
async function test(name,viewport,fn){
 const context=await browser.newContext({viewport,reducedMotion:'reduce',acceptDownloads:true});
 await context.addInitScript(()=>{window.showSaveFilePicker=undefined;try{Object.defineProperty(navigator,'share',{value:undefined,configurable:true})}catch{}});
 const page=await context.newPage();page.setDefaultTimeout(12000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 const record={name,viewport,checks:[],errors};
 try{await fn(page,context,record);assert.equal(errors.length,0,errors.join('; '));record.passed=true;}
 catch(error){record.passed=false;record.error=String(error);record.stack=error.stack;await page.screenshot({path:out+'/'+name+'-failure.png',fullPage:false}).catch(()=>{});record.visibleText=await page.locator('body').innerText().catch(()=>null);}
 finally{results.push(record);save();console.log(JSON.stringify(record));await context.close();}
}
const go=async(page,url)=>{const r=await page.goto(url,{waitUntil:'networkidle',timeout:45000});assert.equal(r.status(),200,url);await page.evaluate(()=>document.fonts.ready);return r;};
const postResponse=(page,path)=>page.waitForResponse(r=>r.url().includes(path)&&r.request().method()==='POST',{timeout:55000});
for(const [label,width,height] of [['desktop',1534,795],['desktop-wide',1440,1000],['tablet',1024,900],['tablet-small',820,1100],['mobile',390,844]]){
 await test('gcsda-credentials-'+label,{width,height},async(page,context,r)=>{
  await go(page,'https://gcsda-governance.vercel.app/founder-chairman');
  const el=page.locator('.g4-founder-credentials-intro');await el.scrollIntoViewIfNeeded();
  const m=await el.evaluate(el=>{const heading=el.querySelector('h2'),paragraph=el.querySelector(':scope > p');const p=paragraph.getBoundingClientRect(),box=heading.parentElement.getBoundingClientRect();const rects=[];const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode())){if(!n.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(n);rects.push(...[...range.getClientRects()].map(r=>r.toJSON()));}return {heading:heading.innerText,paragraph:paragraph.innerText,box:box.toJSON(),paragraphBox:p.toJSON(),rects,overflow:document.documentElement.scrollWidth>innerWidth+1,whiteSpace:getComputedStyle(heading).whiteSpace,overlap:rects.some(x=>x.right>p.left+1&&x.left<p.right-1&&x.bottom>p.top+1&&x.top<p.bottom-1),textOutsideColumn:rects.some(x=>x.right>box.right+1||x.left<box.left-1)};});
  assert.equal(m.overlap,false,'heading overlaps paragraph');assert.equal(m.textOutsideColumn,false,'heading outside own column');assert.equal(m.overflow,false,'page overflows');
  r.measurements=m;await el.screenshot({path:out+'/credentials-'+label+'.png'});r.checks.push('Live title wraps within own column; no paragraph overlap or horizontal overflow');
 });
}
for(const locale of ['zh','en','ja','ko']){
 await test('stt-intake-'+locale,locale==='ko'?{width:390,height:844}:{width:1440,height:1000},async(page,context,r)=>{
  const path=locale==='zh'?'/start':'/'+locale+'/start';await go(page,'https://stt-003.vercel.app'+path);
  const form=page.locator('form');const submit=form.locator('button[type=submit]');let posts=0;page.on('request',q=>{if(q.method()==='POST'&&q.url().includes('/api/cooperation-submit'))posts++;});
  await submit.click();assert.equal(posts,0,'empty form submitted');r.checks.push('Required-field validation blocks empty submission');
  const texts=form.locator('input:not([type]),input[type=text]').filter({hasNot:page.locator('[name=bot-field]')});
  const visible=page.locator('form input:not([type]):visible,form input[type=text]:visible');
  assert.equal(await visible.count(),2,'unexpected intake text fields');
  const name=marker+'-'+locale+' 系統驗證（非正式預約）';await visible.nth(0).fill(name);await visible.nth(1).fill('qa-'+locale+'@example.invalid');
  const selects=form.locator('select');await selects.nth(0).selectOption('其他');await selects.nth(1).selectOption('其他');
  const area=form.locator('textarea');for(let i=0;i<3;i++)await area.nth(i).fill(marker+' '+locale+' '+(i+1)+'：系統驗證送件與通知，非真實個案、非正式預約，請勿排程。');
  await form.locator('input[type=radio][value="無"]').check();
  const before=await area.evaluateAll(es=>es.map(e=>e.value));
  await page.route('**/api/cooperation-submit',async route=>{if(route.request().method()==='POST')return route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({ok:false,error:'QA simulated delivery failure'})});return route.continue();});
  const failed=postResponse(page,'/api/cooperation-submit');await submit.click();assert.equal((await failed).status(),503);await page.waitForFunction(()=>document.querySelector('form')?.getAttribute('aria-busy')!=='true');
  assert.deepEqual(await area.evaluateAll(es=>es.map(e=>e.value)),before);assert.equal(await visible.nth(0).inputValue(),name);r.checks.push('Simulated service failure retains all entered fields and permits retry');
  await page.unroute('**/api/cooperation-submit');const done=postResponse(page,'/api/cooperation-submit');await submit.click();const response=await done;const body=await response.json();r.delivery={http:response.status(),...body};assert.equal(response.status(),200);assert.equal(body.delivery,'resend-email');assert.ok(body.receiptId);await page.getByText(body.receiptId,{exact:false}).waitFor();
  r.checks.push('Real production UI submission accepted; receipt displayed');await page.screenshot({path:out+'/stt-'+locale+'-receipt.png',fullPage:false});
 });
}
await test('gcsda-membership',{width:390,height:844},async(page,context,r)=>{
 await go(page,'https://gcsda-governance.vercel.app/en/membership');await page.getByRole('link',{name:'Open formal membership application',exact:true}).click();await page.waitForURL('**/membership');r.checks.push('English membership entry reaches formal application');
 const form=page.locator('#gcsda-membership-form');await form.waitFor();const step=n=>form.locator('[data-form-step="'+n+'"]');
 await step(1).getByRole('button',{name:'下一步：專業背景',exact:true}).click();assert.equal(await step(1).isVisible(),true);r.checks.push('Membership step validation blocks empty fields');
 const name=marker+'-MEM 系統驗證（非入會申請）';await step(1).getByLabel('姓名',{exact:true}).fill(name);await step(1).getByLabel('聯絡電話',{exact:true}).fill('0000000000');await step(1).getByLabel('電子郵件',{exact:true}).fill('qa-member@example.invalid');await step(1).getByLabel('LINE 顯示名稱',{exact:true}).fill('系統驗證');await step(1).getByLabel('所在縣市',{exact:true}).fill('系統測試');await step(1).getByRole('button',{name:'下一步：專業背景',exact:true}).click();
 await step(2).getByLabel('現職單位／機構',{exact:true}).fill('STT／GCSDA 網站系統驗證，非真實申請');await step(2).getByLabel('職稱',{exact:true}).fill('系統驗證資料');await step(2).getByLabel('科技／AI治理',{exact:true}).check();await step(2).getByRole('button',{name:'下一步：參與申請',exact:true}).click();
 await step(3).getByLabel('申請來源',{exact:true}).selectOption('自主申請');const motivation=marker+'：本筆為網站維護所需的系統驗證資料，僅確認會員申請流程、資料傳送與莊博士收件通知是否正常。這不是實際入會申請，不具真實會員資格資料，請勿進行審查、建檔、收費或安排聯絡。';await step(3).getByLabel('申請加入學會的原因',{exact:true}).fill(motivation);await step(3).getByRole('button',{name:'下一步：確認資料',exact:true}).click();
 await step(4).locator('input[type=checkbox]').nth(0).check();await step(4).locator('input[type=checkbox]').nth(1).check();
 const button=step(4).getByRole('button',{name:'送出會員資格申請',exact:true});
 await page.route('**/api/gcsda-membership-submit',async route=>route.request().method()==='POST'?route.fulfill({status:503,contentType:'application/json',body:'{"ok":false}'}):route.continue());
 const failed=postResponse(page,'/api/gcsda-membership-submit');await button.click();assert.equal((await failed).status(),503);await form.locator('.g4-form-error').waitFor();assert.equal(await step(1).getByLabel('姓名',{exact:true}).inputValue(),name);assert.equal(await step(3).getByLabel('申請加入學會的原因',{exact:true}).inputValue(),motivation);r.checks.push('All membership data retained after simulated delivery failure');
 await page.unroute('**/api/gcsda-membership-submit');const done=postResponse(page,'/api/gcsda-membership-submit');await button.click();const response=await done;const body=await response.json();r.delivery={http:response.status(),...body};assert.equal(response.status(),200);assert.equal(body.ok,true);assert.ok(body.receiptId);await form.getByText('入會申請已送出',{exact:false}).waitFor();r.checks.push('Real membership submission accepted; pending-review state shown, not approved membership');await page.screenshot({path:out+'/membership-success-mobile.png',fullPage:false});
});
let exportedDraft=null;
await test('interview-desktop',{width:1440,height:1000},async(page,context,r)=>{
 await go(page,'https://stt-003.vercel.app/humanistic-interview/');
 const expected={};let moves=0;
 while(moves++<50){
  const active=page.locator('.screen.active');const id=await active.getAttribute('id');if(id==='submit')break;
  const answer=active.locator('textarea[data-q]');if(await answer.count()){const n=await answer.getAttribute('data-q');const value=marker+'-HUM 第'+n+'題：系統驗證回答，非真實受訪內容，僅核對儲存、完整送件與通知。';expected[n]=value;await answer.fill(value);}
  const next=active.locator('button[data-next],button.q-next');if(await next.count())await next.first().click();else{await page.locator('#toolbar-submit').click();break;}
 }
 assert.equal(Object.keys(expected).length,20,'question journey did not reach all twenty questions');r.checks.push('All twenty questions completed through actual next/station controls');
 await page.locator('#toolbar-submit').click();await page.locator('#participant-name').fill(marker+'-HUM 系統驗證（非正式受訪）');await page.locator('#participant-email').fill('qa-interview@example.invalid');
 const allValues=()=>page.locator('textarea[data-q]').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.dataset.q,e.value])));
 assert.deepEqual(await allValues(),expected);await page.reload({waitUntil:'networkidle'});assert.deepEqual(await allValues(),expected);r.checks.push('All twenty answers and metadata restored after same-tab reload');
 const download=page.waitForEvent('download');await page.locator('#save-draft-final').click();const file=await download;const filePath=out+'/interview-draft.json';await file.saveAs(filePath);exportedDraft=fs.readFileSync(filePath);const draft=JSON.parse(exportedDraft.toString().replace(/^\ufeff/,''));assert.deepEqual(draft.answers,expected);r.checks.push('Actual JSON draft download contains all twenty answers');
 const textDownload=page.waitForEvent('download');await page.locator('#backup-download-text').click();const textFile=await textDownload;await textFile.saveAs(out+'/interview-backup.txt');const backup=fs.readFileSync(out+'/interview-backup.txt','utf8');for(const value of Object.values(expected))assert.ok(backup.includes(value));r.checks.push('Actual text backup download contains all twenty answers');
 await page.locator('#backup-close').click();await page.locator('#consent').check();
 await page.route('**/api/humanistic-submit',route=>route.fulfill({status:503,contentType:'application/json',body:'{"ok":false}'}));const failed=postResponse(page,'/api/humanistic-submit');await page.locator('#submit-btn').click();assert.equal((await failed).status(),503);await page.getByText('尚未取得有效收件確認',{exact:false}).waitFor();assert.deepEqual(await allValues(),expected);r.checks.push('Failed send does not erase answers; backup and retry remain available');
 await page.locator('#backup-close').click();await page.unroute('**/api/humanistic-submit');const done=postResponse(page,'/api/humanistic-submit');await page.locator('#submit-btn').click();const response=await done;const body=await response.json();r.delivery={http:response.status(),...body};assert.equal(response.status(),200);assert.equal(body.delivery,'resend-email');assert.equal(body.answeredCount,20);await page.locator('#success.active').waitFor();assert.ok(Object.values(await allValues()).every(x=>x===''));assert.equal(await page.evaluate(()=>sessionStorage.getItem('stt20q.v02.answers')),null);r.checks.push('Real twenty-answer message accepted; receipt shown; submitted local answers cleared only after valid acceptance');await page.screenshot({path:out+'/interview-success-desktop.png',fullPage:false});
});
await test('interview-mobile-draft-recovery',{width:390,height:844},async(page,context,r)=>{
 assert.ok(exportedDraft,'desktop draft unavailable');await go(page,'https://stt-003.vercel.app/humanistic-interview/');await page.locator('#draft-file').setInputFiles({name:'qa-draft.json',mimeType:'application/json',buffer:exportedDraft});await page.getByText('草稿已讀回。檔案只在此裝置讀取，尚未送出。',{exact:true}).waitFor();const expected=JSON.parse(exportedDraft.toString().replace(/^\ufeff/,'')).answers;const actual=await page.locator('textarea[data-q]').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.dataset.q,e.value])));assert.deepEqual(actual,expected);r.checks.push('Downloaded draft imports all twenty answers into a new mobile browser context');await page.locator('#toolbar-submit').click();assert.equal(await page.locator('#answered-count').innerText(),'20 / 20');await page.screenshot({path:out+'/interview-mobile-restored.png',fullPage:false});
 const download=page.waitForEvent('download');await page.locator('#save-draft-final').click();const file=await download;await file.saveAs(out+'/interview-mobile-draft.json');r.checks.push('Mobile viewport exports draft successfully without another real submission');
});
await test('cross-site-entries',{width:1440,height:1000},async(page,context,r)=>{
 await go(page,'https://stt-003.vercel.app/');const society=page.locator('footer a[href="https://gcsda-governance.vercel.app/"]');assert.ok(await society.count());
 await go(page,'https://gcsda-governance.vercel.app/');await page.locator('header a[href="/membership"]').first().click();await page.locator('#gcsda-membership-form').waitFor();r.checks.push('STT external society entry and GCSDA membership navigation resolve');
 const stt=page.locator('footer a[href="https://stt-003.vercel.app/"]');assert.ok(await stt.count());await go(page,'https://stt-003.vercel.app/');await page.locator('header a[href="/start"]').first().click();await page.locator('form').waitFor();r.checks.push('GCSDA independent STT link and STT governance-intake entry resolve');
 await page.locator('header a[href="/humanistic-interview/"]').first().click();await page.locator('.screen.active').waitFor();r.checks.push('STT interview navigation reaches the working twenty-question page');
});
save();await browser.close();const failed=results.filter(r=>!r.passed);console.log(JSON.stringify({total:results.length,failed:failed.map(r=>({name:r.name,error:r.error}))}));if(failed.length)process.exitCode=1;
