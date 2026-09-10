import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const { chromium } = await import('/tmp/stt-browser/node_modules/playwright/index.mjs');
const base=process.env.STT_TEST_ORIGIN||'http://127.0.0.1:4173';
const live=Boolean(process.env.STT_TEST_ORIGIN);
const seed=JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('public/data/stt-original-artwork.json','utf8'));
const out='fullbleed-evidence';fs.mkdirSync(out,{recursive:true});
const paths={'/problems':['problems','major-decision.webp','你正在面對什麼'],'/how-stt-works':['method','how-we-judge.webp','如何判讀'],'/insights':['columns','insights.webp','專欄判讀'],'/publications':['publications','publications.webp','出版研究'],'/stt':['stt','stt-platform.webp','關於 STT']};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={passed:false,environment:live?'production fixed URL, no mocked requests':'CI production build; article API mocked for partial/failure regression',origin:base,routes:[],checks:[],pageErrors:[],sourceArticleCount:seed.articles.length};
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
let page,mode='full';
async function go(path){await page.goto(base+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);}
async function noOverflow(label){const v=await page.evaluate(()=>({w:innerWidth,sw:document.documentElement.scrollWidth}));assert.ok(v.sw<=v.w+1,label+' overflow '+JSON.stringify(v));}
async function count(n){assert.match(await page.locator('.stt-columns-count').innerText(),new RegExp(`共 ${n} 則`));}
try{
 for(const setup of [{w:1440,h:960,dpr:2},{w:900,h:960,dpr:2},{w:390,h:900,dpr:3}]){
  const ctx=await browser.newContext({viewport:{width:setup.w,height:setup.h},deviceScaleFactor:setup.dpr,reducedMotion:'reduce'});
  page=await ctx.newPage();page.on('pageerror',e=>report.pageErrors.push(e.message));
  if(!live)await page.route('**/api/mmedia',r=>mode==='failure'?r.fulfill({status:502,body:'unavailable'}):r.fulfill({contentType:'application/json',body:JSON.stringify({...seed,mode:'archive',articles:mode==='partial'?seed.articles.slice(0,12):seed.articles})}));
  const uniqueImages=new Set();
  for(const [path,[theme,file,label]] of Object.entries(paths)){
   await go(path);await noOverflow(path+' '+setup.w);
   assert.equal(await page.locator('main h1').count(),1);assert.equal(await page.locator('[data-stt-primary-hero]').count(),1);
   assert.equal(await page.locator('[data-stt-primary-hero]').getAttribute('data-stt-primary-hero'),theme);
   const metrics=await page.locator('[data-stt-primary-hero]').evaluate(async e=>{
    const r=e.getBoundingClientRect(),m=e.querySelector('.stt-full-hero__media').getBoundingClientRect(),img=e.querySelector('img');await img.decode();const ir=img.getBoundingClientRect();
    const c=e.querySelector('.stt-full-hero__copy').getBoundingClientRect();
    return {x:r.x,width:r.width,height:r.height,mediaWidth:m.width,src:img.currentSrc,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,displayWidth:ir.width,imageFilter:getComputedStyle(img).filter,imageBorder:getComputedStyle(img).borderWidth,title:e.querySelector('h1').textContent,copyRight:c.right,actions:e.querySelectorAll('.stt-full-hero__actions a').length};
   });
   assert.ok(Math.abs(metrics.x)<1&&Math.abs(metrics.width-setup.w)<1,'Hero is not full bleed');
   assert.ok(Math.abs(metrics.mediaWidth-setup.w)<1,'Image layer remains a boxed card');
   assert.ok(metrics.height>=650);assert.ok(metrics.copyRight<=setup.w+1);
   assert.ok(metrics.src.endsWith(manifest.urlPrefix+file));assert.ok(metrics.naturalWidth>=1600);assert.ok(metrics.displayWidth<=metrics.naturalWidth+1,'Upscaled beyond supplied CSS pixels');assert.equal(metrics.imageFilter,'none');assert.equal(metrics.imageBorder,'0px');assert.equal(metrics.actions,2);
   uniqueImages.add(metrics.src);
   if(setup.w===1440){const response=await ctx.request.get(metrics.src);assert.equal(response.status(),200);assert.equal(hash(await response.body()),manifest.installedAssets[file].encodedSha256,'Not the supplied original');
    assert.ok(await page.locator('nav[aria-label="Primary"]').isVisible());assert.equal(await page.locator('nav[aria-label="Primary"] [aria-current="page"]').innerText(),label);
   }
   const shot=`${theme}-${setup.w}.png`;await page.screenshot({path:out+'/'+shot});report.routes.push({path,viewport:setup.w,dpr:setup.dpr,...metrics,screenshot:shot});
  }
  assert.equal(uniqueImages.size,5);
  await go('/');await noOverflow('home '+setup.w);assert.equal(await page.locator('.stth-pillars,.stth-steps').count(),0);assert.equal(await page.locator('.stth-focus button').count(),8);assert.equal(await page.locator('.stth-hero h1').textContent(),'讓重要的事，走得更遠。');
  await page.screenshot({path:out+`/home-${setup.w}.png`});
  if(setup.w===1440){
   for(const [path,[theme,file,label]] of Object.entries(paths)){await go('/');await page.locator('.stth-nav').getByRole('button',{name:label,exact:true}).click();assert.equal(new URL(page.url()).pathname,path);assert.equal(await page.locator('[data-stt-primary-hero]').getAttribute('data-stt-primary-hero'),theme);}
   await go('/how-stt-works');assert.equal(await page.locator('.stt-foundations__grid article').count(),4);assert.equal(await page.locator('.stt-golden-path a').count(),7);
   for(let n=1;n<=7;n++){await page.locator(`.stt-golden-path a[href="#judgment-step-${n}"]`).click();assert.equal(new URL(page.url()).hash,'#judgment-step-'+n);assert.equal(await page.locator('#judgment-step-'+n).count(),1);}
   await page.locator('#judgment-foundations').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/method-foundations.png'});
   await go('/publications');assert.equal(await page.locator('.stt-full-hero__lead .stt-title-line').count(),2);assert.equal(await page.locator('.stt-full-hero__lead .stt-title-line').nth(1).textContent(),'三者不混為同一種內容。');
   for(const [path] of Object.entries(paths)){await go(path);const links=await page.locator('.stt-full-hero__actions a').evaluateAll(xs=>xs.map(x=>x.getAttribute('href')));for(const href of links){if(href.startsWith('#')){assert.equal(await page.locator(href).count(),1);await page.locator(`.stt-full-hero__actions a[href="${href}"]`).click();assert.equal(new URL(page.url()).hash,href);}else{await page.locator(`.stt-full-hero__actions a[href="${href}"]`).click();assert.equal(new URL(page.url()).pathname,href);assert.ok((await page.locator('main').innerText()).length>20);await go(path);}}}
   await go('/insights');assert.equal(await page.locator('.stt-series-card').count(),3);
   const liveData=live?await (await ctx.request.get(base+'/api/mmedia')).json():seed;
   assert.ok(Array.isArray(liveData.articles)&&liveData.articles.length>=seed.articles.length);await count(liveData.articles.length);
   report.actualArticleCount=liveData.articles.length;
   for(const [series,label] of [['legal','法律新聞專欄'],['humanistic','人文地景產專欄'],['news','新聞採訪專欄']]){await page.getByRole('button',{name:label,exact:true}).click();await count(liveData.articles.filter(a=>a.series===series).length);assert.ok((await page.locator('.stt-column-row').evaluateAll(rs=>rs.map(r=>r.dataset.series))).every(s=>s===series));}
   await go('/insights');const links=new Set();const pages=Math.ceil(liveData.articles.length/12);
   for(let i=1;i<=pages;i++){for(const href of await page.locator('.stt-column-read').evaluateAll(xs=>xs.map(x=>x.href)))links.add(href);if(i<pages)await page.getByRole('button',{name:'下一頁',exact:true}).click();}
   assert.deepEqual([...links].sort(),liveData.articles.map(a=>a.url).sort());report.checkedArticleLinks=links.size;
   await go('/insights');await page.getByRole('textbox',{name:'搜尋專欄',exact:true}).fill('茗香');assert.ok(await page.locator('.stt-column-read').count()>0);await page.getByRole('button',{name:'清除搜尋',exact:true}).click();await count(liveData.articles.length);await page.getByRole('combobox',{name:'專欄排序'}).selectOption('oldest');
   assert.equal(await page.locator('.stt-column-read').first().getAttribute('href'),[...liveData.articles].sort((a,b)=>a.date.localeCompare(b.date)||a.url.localeCompare(b.url))[0].url);
   if(!live){mode='partial';await go('/insights');await count(seed.articles.length);mode='failure';await go('/insights');await count(seed.articles.length);mode='full';}
  }
  if(setup.w===390){await go('/stt');await page.locator('header').getByRole('button',{name:'Menu',exact:true}).last().click();await page.locator('header').getByRole('button',{name:'專欄判讀',exact:true}).last().click();assert.equal(new URL(page.url()).pathname,'/insights');}
  await ctx.close();
 }
 assert.deepEqual(report.pageErrors,[]);report.checks=['Five full-width primary heroes, five distinct original assets, unchanged served bytes','Homepage four pillars and seven-step duplicate removed; eight problem gateways retained','Four foundations and seven clickable step anchors on the method page','All primary navigation and ten hero actions checked','Three article series, complete pagination, original links, search and sorting retained','Publication sentence break, visible desktop menu and mobile navigation checked'];report.passed=true;
}catch(e){report.failure=String(e);if(page&&!page.isClosed())await page.screenshot({path:out+'/failure.png'});throw e;}
finally{fs.writeFileSync(out+'/fullbleed-report.json',JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify({passed:report.passed,routes:report.routes.length,articles:report.checkedArticleLinks,failure:report.failure}));}
