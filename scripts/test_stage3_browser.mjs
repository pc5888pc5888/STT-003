import fs from 'node:fs';
import assert from 'node:assert/strict';
const { chromium } = await import('/tmp/stt-browser/node_modules/playwright/index.mjs');
const seed=JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json','utf8'));
const output='stage3-evidence';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const report={environment:'CI production build in Chromium, not the protected Vercel endpoint',routes:[],navigation:[],pageErrors:[],screens:[],preservedArchive:seed.stats};
page.on('pageerror',e=>report.pageErrors.push(e.message));
await page.route('**/api/mmedia',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({...seed,ok:true,mode:'archive'})}));
const problems=['major-decision','owner-dependence','succession','family-ownership','strategic-legal','ai-governance','system-failure','founder-legacy'];
const domains={'corporate-governance':'corporate-governance.webp','family-succession':'family-ownership.webp','strategic-legal':'strategic-legal.webp','compliance-contract':'internal-compliance.webp','human-ai-governance':'ai-governance.webp'};
const routes=[...problems.map(x=>['/problems/'+x,x+'.webp']),...Object.entries(domains).map(([x,y])=>['/domains/'+x,y]),['/books','publications.webp'],['/books/internal-compliance','publications.webp'],['/research','publications.webp']];
async function go(path){await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(80);}
async function screenshot(name){await page.screenshot({path:output+'/'+name+'.png'});report.screens.push(name+'.png');}
async function overflow(label){const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width+1,label+' overflow '+JSON.stringify(size));}
async function noBrokenVisibleImages(){const broken=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>i.getBoundingClientRect().width>0&&(!i.complete||i.naturalWidth===0)).map(i=>i.getAttribute('src')));assert.deepEqual(broken,[]);}
try{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const [path,filename] of routes){
   await go(path);await overflow(path+' '+width);await noBrokenVisibleImages();
   assert.equal(await page.locator('main h1').count(),1);
   assert.equal(await page.locator('.stt-route-artwork').count(),1);
   const image=page.locator('.stt-route-artwork img');
   assert.equal(await image.getAttribute('src'),'/visual-bank/stt/'+filename);
   await image.evaluate(i=>i.decode());
   const metric=await page.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
    const copy=document.querySelector('.stt-route-hero-copy');const img=document.querySelector('.stt-route-artwork');
    return {title:document.querySelector('main h1').textContent,tab:document.title,copy:rect(copy),image:rect(img),background:getComputedStyle(document.querySelector('.stt-route-hero')).backgroundImage};
   });
   assert.equal(metric.background,'none');
   if(width>900)assert.ok(metric.copy.right<metric.image.x,'Text overlaps artwork: '+path);
   else assert.ok(metric.copy.bottom<=metric.image.y,'Mobile image overlaps text: '+path);
   assert.ok(metric.image.right<=width+1&&metric.image.w>100);
   assert.ok(metric.tab.startsWith(metric.title),'Tab and actual page heading disagree: '+path);
   report.routes.push({path,width,...metric});
   if(['/problems/family-ownership','/problems/major-decision','/domains/family-succession','/domains/compliance-contract','/books/internal-compliance','/research'].includes(path))await screenshot(path.replaceAll('/','-').slice(1)+'-'+width);
  }
 }
 report.navigation.push('16 topic/library routes at desktop 1440px and mobile 390px: full image decode, separate text/image regions, matching document titles.');
 await page.setViewportSize({width:320,height:900});
 for(const path of ['/problems/family-ownership','/domains/family-succession','/books/internal-compliance']){await go(path);await overflow(path+' 320');}
 await page.setViewportSize({width:1440,height:1000});
 for(const id of problems){
  await go('/problems/'+id);
  await page.getByRole('button',{name:'從這個問題開始 →',exact:true}).click();
  assert.equal(new URL(page.url()).pathname,'/start');
  assert.equal(new URL(page.url()).searchParams.get('route'),id);
  assert.ok((await page.locator('main').innerText()).includes('目前入口｜'));
  await go('/problems/'+id);await page.getByRole('button',{name:'← 回到問題入口',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/problems');
 }
 report.navigation.push('All eight problem CTAs carry their exact topic to intake; all eight back links return to the problem index. No forms submitted.');
 for(const slug of Object.keys(domains)){
  await go('/domains/'+slug);await page.getByRole('button',{name:'← 回到治理知識領域',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/domains');
 }
 const aliases=[['/governance/family','/domains/family-succession'],['/governance/corporate','/domains/corporate-governance'],['/governance/digital','/domains/human-ai-governance'],['/internal-compliance','/books/internal-compliance'],['/papers','/research'],['/insights.html','/insights'],['/problems/nonexistent-topic','/problems'],['/domains/nonexistent-domain','/domains']];
 for(const [from,to] of aliases){await go(from);assert.equal(new URL(page.url()).pathname,to);}
 report.navigation.push('Five domain back links and eight legacy/invalid-route redirects resolve to the intended content, not an unrelated fallback page.');
 const primary=[['你正在面對什麼','/problems'],['如何判讀','/how-stt-works'],['專欄判讀','/insights'],['出版研究','/publications'],['關於 STT','/stt']];
 for(const [label,path] of primary){await go('/domains/family-succession');await page.locator('nav[aria-label="Primary"]').getByRole('button',{name:label,exact:true}).click();assert.equal(new URL(page.url()).pathname,path);}
 report.navigation.push('All five primary navigation labels open their correct pages.');
 await go('/domains/family-succession');assert.equal(await page.locator('.stt-route-hero-copy p .stt-title-line').count(),2);
 const screenshotPaths=['/','/problems','/how-stt-works','/insights','/publications','/stt','/projects','/institution/eric-chuang','/start','/legal/privacy','/legal/intellectual-property','/legal/ai-disclosure','/legal/digital-content-policy'];
 for(const path of screenshotPaths){await go(path);await overflow(path);assert.ok((await page.locator('main').innerText()).trim().length>30);await noBrokenVisibleImages();}
 assert.equal(seed.articles.length,212);assert.equal(new Set(seed.articles.map(a=>a.url)).size,212);
 assert.deepEqual(report.pageErrors,[]);
 report.passed=true;
}catch(e){report.passed=false;report.failure=String(e);await screenshot('failure');throw e;}
finally{fs.writeFileSync(output+'/browser-report.json',JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify({passed:report.passed,routeChecks:report.routes.length,navigation:report.navigation,error:report.failure},null,2));}
