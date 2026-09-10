import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const {chromium}=await import('/tmp/stt-browser/node_modules/playwright/index.mjs');
const manifest=JSON.parse(fs.readFileSync('public/data/stt-original-artwork.json','utf8'));
const seed=JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json','utf8'));
const base=process.env.STT_TEST_ORIGIN||'http://127.0.0.1:4173';
const out='native-artwork-evidence';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const report={passed:false,environment:'Actual production build in Chromium with supplied image bytes',assets:[],routes:[],errors:[]};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const routes=['/','/how-stt-works','/insights','/publications','/projects','/stt',...['major-decision','owner-dependence','succession','family-ownership','strategic-legal','ai-governance','system-failure','founder-legacy'].map(s=>'/problems/'+s),...['corporate-governance','family-succession','strategic-legal','compliance-contract','human-ai-governance'].map(s=>'/domains/'+s),'/books','/books/internal-compliance','/research'];
try{
 for(const setup of [{width:1440,height:1000,dpr:2},{width:390,height:900,dpr:3}]){
  const context=await browser.newContext({viewport:{width:setup.width,height:setup.height},deviceScaleFactor:setup.dpr,reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.route('**/api/mmedia',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({...seed,ok:true,mode:'archive'})}));
  if(setup.width===1440){
   for(const [name,entry] of Object.entries(manifest.installedAssets)){
    const response=await context.request.get(base+manifest.urlPrefix+name);
    assert.equal(response.status(),200,name);const bytes=await response.body();
    assert.equal(hash(bytes),entry.encodedSha256,name+' actual served bytes differ');
    report.assets.push({name,width:entry.width,height:entry.height,bytes:bytes.length,hashVerified:true});
   }
  }
  for(const path of routes){
   await page.goto(base+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   const metrics=await page.evaluate(async()=>{
    const targets=[...document.querySelectorAll('.stt-route-artwork img,.stt-canon-visual,.stt-columns-visual,.stth-hero-media')];
    const list=[];
    for(const e of targets){
     const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;
     const cs=getComputedStyle(e);const isImg=e.tagName==='IMG';
     const url=isImg?e.currentSrc:(cs.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/)||[])[1];
     if(!url)continue;
     const image=new Image();image.src=url;await image.decode();
     let ratio;
     if(isImg||cs.backgroundSize==='contain')ratio=Math.min(r.width/image.naturalWidth,r.height/image.naturalHeight);
     else if(cs.backgroundSize.startsWith('100%'))ratio=r.width/image.naturalWidth;
     else ratio=Math.max(r.width/image.naturalWidth,r.height/image.naturalHeight);
     list.push({url,width:image.naturalWidth,height:image.naturalHeight,displayWidth:r.width,displayHeight:r.height,physicalScale:ratio*devicePixelRatio,filter:cs.filter});
    }
    return {images:list,overflow:document.documentElement.scrollWidth>innerWidth+1,title:document.querySelector('main h1')?.textContent};
   });
   assert.ok(metrics.title,path+' missing title');assert.ok(!metrics.overflow,path+' overflow');
   assert.ok(metrics.images.length>0,path+' artwork missing');
   for(const image of metrics.images){
    assert.ok(image.url.includes(manifest.urlPrefix),path+' still uses a legacy thumbnail');
    assert.ok(image.width>=1600,path+' low-resolution image');assert.equal(image.filter,'none');
    assert.ok(image.physicalScale<=1.01,path+' source is being magnified beyond its supplied pixels: '+image.physicalScale);
   }
   report.routes.push({path,viewport:setup.width,dpr:setup.dpr,...metrics});
   if(['/','/domains/family-succession','/insights'].includes(path))await page.screenshot({path:out+'/'+(path==='/'?'home':path.replaceAll('/','-').slice(1))+'-'+setup.width+'.png'});
  }
  await context.close();
 }
 assert.equal(report.assets.length,15);assert.deepEqual(report.errors,[]);assert.ok(seed.articles.length>=212);
 report.passed=true;
}finally{
 fs.writeFileSync(out+'/native-browser-report.json',JSON.stringify(report,null,2));await browser.close();
 console.log(JSON.stringify({passed:report.passed,assets:report.assets.length,routeChecks:report.routes.length}));
}
