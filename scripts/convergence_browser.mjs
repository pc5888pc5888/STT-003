import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const out='/tmp/convergence-evidence';
const site=process.env.QA_SITE;
const routes=process.env.QA_ROUTES.split(',');
const browser=await chromium.launch({headless:true});
const report={site,environment:'local production build; Vercel routing and real mail delivery not certified',pages:[],interactions:[]};
for(const [device,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844]]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const route of routes){
  const errors=[];const handler=e=>errors.push(e.message);page.on('pageerror',handler);
  try{
   await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle',timeout:30000});
   await page.evaluate(()=>document.fonts.ready);
   // Trigger native lazy images before treating one as missing.
   await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}window.scrollTo(0,0);});
   await page.waitForTimeout(150);
   const data=await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,h1:[...document.querySelectorAll('h1')].map(n=>n.textContent),overflow:document.documentElement.scrollWidth>innerWidth+1,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content,text:document.body.innerText,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),links:[...document.querySelectorAll('a[href]')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),fields:[...document.querySelectorAll('input,textarea,select')].map(i=>({tag:i.tagName,type:i.type,name:i.name,id:i.id,maxLength:i.maxLength}))}));
   const violations=(await new AxeBuilder({page}).analyze()).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
   const screenshot=site+'-'+(route==='/'?'home':route.slice(1).replaceAll('/','-'))+'-'+device+'.png';
   await page.screenshot({path:out+'/'+screenshot,fullPage:true});
   report.pages.push({route,device,...data,violations,errors,screenshot});
  }catch(e){report.pages.push({route,device,error:String(e),errors});}
  page.off('pageerror',handler);
  fs.writeFileSync(out+'/browser-report.json',JSON.stringify(report,null,2));
 }
 await context.close();
}
async function check(name,fn){try{await fn();report.interactions.push({name,passed:true});}catch(e){report.interactions.push({name,passed:false,error:String(e)});}}
const mobile=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const page=await mobile.newPage();
await check('mobile menu Escape closes and restores trigger focus',async()=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 const selector=site==='stt'?'.stt-g0-menu-button':'.g4-menu';
 const toggle=page.locator(selector);await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.equal(await toggle.evaluate(el=>el===document.activeElement),true);
});
await check('skip link reaches the main landmark',async()=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 await page.locator('.site-skip-link').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#main-content').evaluate(el=>el===document.activeElement),true);
});
if(site==='gcsda')await check('mobile dialog keyboard wraps within navigation',async()=>{
 await page.locator('.g4-menu').click();const close=page.locator('#gcsda-mobile-menu button');await close.focus();await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('#gcsda-mobile-menu a').last().evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Tab');assert.equal(await close.evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Escape');
});
if(site==='stt'){
 await check('institution route prefills only event category',async()=>{await page.goto('http://127.0.0.1:4173/start?type=institution',{waitUntil:'networkidle'});assert.equal(await page.locator('select').last().inputValue(),'機構合作');assert.equal(await page.locator('input[type="file"]').count(),0);});
 await check('failure and false success preserve values; retry uses same key; valid acknowledgement changes state (MOCK ONLY)',async()=>{
  await page.goto('http://127.0.0.1:4173/start',{waitUntil:'networkidle'});
  let calls=[];let number=0;
  await page.route('**/api/cooperation-submit',async route=>{
   calls.push({body:route.request().postDataJSON(),key:route.request().headers()['idempotency-key']});number++;
   await route.fulfill({status:number===1?503:200,contentType:'application/json',body:JSON.stringify(number===3?{ok:true,delivery:'resend-email',receiptId:'MOCK-VERIFIER-ONLY'}:{})});
  });
  await page.getByLabel(/姓名或稱謂/).fill('純技術驗證');await page.getByLabel(/Email 或可回覆/).fill('test@example.invalid');
  await page.locator('select').first().selectOption('董事');
  await page.locator('textarea').nth(0).fill('純測試，目前發生的事情');await page.locator('textarea').nth(1).fill('純測試，不希望發生的結果');await page.locator('textarea').nth(2).fill('純測試，希望形成的狀態');
  await page.getByRole('radio',{name:'無',exact:true}).check();await page.locator('select').last().selectOption('重大決策');
  for(let n=0;n<2;n++){await page.getByRole('button',{name:'提交治理情境',exact:true}).click();await page.getByRole('alert').waitFor();assert.equal(await page.locator('textarea').first().inputValue(),'純測試，目前發生的事情');}
  await page.getByRole('button',{name:'提交治理情境',exact:true}).click();await page.getByRole('status').filter({hasText:'MOCK-VERIFIER-ONLY'}).waitFor();
  assert.equal(calls.length,3);assert.ok(calls[0].key);assert.equal(calls[0].key,calls[1].key);assert.equal(calls[1].key,calls[2].key);assert.equal(await page.locator('input[type="file"]').count(),0);
  await page.unroute('**/api/cooperation-submit');
 });
}
await mobile.close();await browser.close();
fs.writeFileSync(out+'/browser-report.json',JSON.stringify(report,null,2));
const summary={site,environment:report.environment,routes,renderCount:report.pages.length,viewportChecks:{desktop:[1440,1000],tablet:[820,1180],mobile:[390,844]},overflow:report.pages.filter(p=>p.overflow).map(p=>[p.route,p.device]),invalidH1:report.pages.filter(p=>p.h1?.length!==1).map(p=>[p.route,p.device,p.h1]),brokenImages:report.pages.filter(p=>p.brokenImages?.length).map(p=>[p.route,p.device,p.brokenImages]),pageErrors:report.pages.filter(p=>p.error||p.errors?.length).map(p=>[p.route,p.device,p.error||p.errors]),internalLabels:report.pages.filter(p=>/TBD_OWNER_INPUT|ASSET_REQUIRED|PLACEHOLDER|施工中/.test(p.text||'')).map(p=>[p.route,p.device]),accessibility:report.pages.filter(p=>p.violations?.length).map(p=>({route:p.route,device:p.device,violations:p.violations.map(v=>({id:v.id,impact:v.impact,nodeCount:v.nodes.length}))})),interactions:report.interactions,productionModified:false,realInboxDeliveryVerified:false,wholeSiteAccepted:false};
fs.writeFileSync(out+'/browser-summary.json',JSON.stringify(summary,null,2));
