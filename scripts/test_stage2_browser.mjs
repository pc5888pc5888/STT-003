import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import('/tmp/stt-browser/node_modules/playwright/index.mjs');
const data=JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json','utf8'));
const output='stage2-evidence'; fs.mkdirSync(output,{recursive:true});
const report={checks:[],screens:[],pageErrors:[],baseline:data.stats};
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage(); page.on('pageerror',e=>report.pageErrors.push(e.message));
let mode='full';
await page.route('**/api/mmedia',route=>mode==='failure'?route.fulfill({status:502,body:'unavailable'}):route.fulfill({contentType:'application/json',body:JSON.stringify({...data,mode:'archive',articles:mode==='partial'?data.articles.slice(0,12):data.articles})}));
async function go(path){await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);}
async function shot(name,full=false){await page.screenshot({path:`${output}/${name}.png`,fullPage:full});report.screens.push(name);}
async function count(n){assert.match(await page.locator('.stt-columns-count').innerText(),new RegExp(`共 ${n} 則`));}
async function overflow(label){const d=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(d.scroll<=d.viewport+1,`${label}: overflow ${JSON.stringify(d)}`);}
try {
  await go('/insights'); await count(212); assert.equal(await page.locator('.stt-series-card').count(),3); await shot('01-columns-desktop'); await overflow('columns desktop');
  for(const [label,series,n] of [['法律新聞專欄','legal',199],['人文地景產專欄','humanistic',2],['新聞採訪專欄','news',11]]){
    await page.getByRole('button',{name:label,exact:true}).click(); await count(n);
    assert.ok((await page.locator('.stt-column-row').evaluateAll(rows=>rows.map(r=>r.dataset.series))).every(s=>s===series));
  }
  report.checks.push('Three exact source classifications: 199 / 2 / 11');
  await go('/insights'); const links=new Set();
  for(let n=1;n<=18;n++){
    for(const href of await page.locator('.stt-column-read').evaluateAll(xs=>xs.map(x=>x.href)))links.add(href);
    if(n<18){await page.getByRole('button',{name:'下一頁',exact:true}).click();await page.waitForFunction(n=>document.querySelector('.stt-column-pagination [aria-current="page"]')?.textContent===String(n),n+1);}
  }
  assert.deepEqual([...links].sort(),data.articles.map(a=>a.url).sort()); report.checks.push('All 212 rendered original-article links match source; no duplicates across 18 pages');
  await go('/insights'); await page.getByRole('textbox',{name:'搜尋專欄',exact:true}).fill('茗香'); await count(1);
  await page.getByRole('button',{name:'清除搜尋',exact:true}).click(); await count(212);
  await page.getByRole('combobox',{name:'專欄排序'}).selectOption('oldest');
  const oldest=[...data.articles].sort((a,b)=>a.date.localeCompare(b.date)||a.url.localeCompare(b.url))[0];
  assert.equal(await page.locator('.stt-column-read').first().getAttribute('href'),oldest.url);report.checks.push('Search, clear, sorting and pagination operate on full archive');
  await go('/insights?series=humanistic'); await count(2); await shot('02-humanistic-desktop',true);
  mode='partial';await go('/insights');await count(212);mode='failure';await go('/insights');await count(212);report.checks.push('Frontend retains 212 entries during a 12-entry response or upstream failure');mode='full';
  for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:1000});await go('/');await overflow('home '+width);
    const metric=await page.locator('.stth-hero h1').evaluate(el=>{const r=document.createRange();r.selectNodeContents(el);return {text:el.textContent,lines:[...r.getClientRects()].map(x=>({top:x.top,right:x.right,left:x.left})),whiteSpace:getComputedStyle(el).whiteSpace}});
    assert.equal(metric.text,'讓重要的事，走得更遠。');assert.equal(new Set(metric.lines.map(x=>Math.round(x.top))).size,1);assert.ok(metric.lines.every(r=>r.right<=width+1&&r.left>=0));
    const logo=await page.locator('.stth-brand img').evaluate(i=>({natural:[i.naturalWidth,i.naturalHeight],w:i.getBoundingClientRect().width,h:i.getBoundingClientRect().height}));
    assert.deepEqual(logo.natural,[884,250]);assert.ok(Math.abs(logo.w/logo.h-884/250)<.02);assert.ok(logo.w>=(width>=1440?350:210));
    await shot('03-home-'+width);await go('/insights');await overflow('columns '+width);
    if(width===390||width===768){await shot('04-columns-'+width);await page.locator('.stt-series').scrollIntoViewIfNeeded();await shot('05-series-'+width);}
  }
  report.checks.push('Hero single line, intact 884x250 logo, and no horizontal overflow at 1440 / 768 / 390 / 320px');
  await page.setViewportSize({width:1440,height:1000});await go('/how-stt-works');
  assert.equal(await page.locator('.stt-method-node').count(),7);
  assert.equal(await page.locator('.stt-canon-method-sequence').evaluate(el=>getComputedStyle(el).color),'rgb(37, 37, 37)');await shot('06-method-desktop',true);
  await go('/publications');assert.equal(await page.locator('.stt-canon-sub .stt-title-line').count(),2);
  assert.equal(await page.locator('.stt-canon-sub .stt-title-line').nth(1).textContent(),'三者不混為同一種內容。');await shot('07-publications-desktop');
  report.checks.push('Seven-step full-width timeline and second-sentence line break verified');
  for(const path of ['/visual-bank/stt/home-approved.webp','/visual-bank/stt/insights.webp','/visual-bank/stt/how-we-judge.webp','/visual-bank/stt/publications.webp']){
    const response=await context.request.get('http://127.0.0.1:4173'+path);assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/image\//);
  }
  report.checks.push('Four original route artwork files return image responses');
  assert.deepEqual(report.pageErrors,[]);report.passed=true;
}catch(e){report.passed=false;report.failure=String(e);await shot('failure');throw e;}
finally{fs.writeFileSync(output+'/browser-report.json',JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report,null,2));}
