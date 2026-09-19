import fs from 'node:fs';
import assert from 'node:assert/strict';
const { chromium } = await import('/tmp/stt-browser/node_modules/playwright/index.mjs');

const base = process.env.STT_TEST_ORIGIN || 'http://127.0.0.1:4173';
const out = 'editorial-extended-evidence';
fs.mkdirSync(out,{recursive:true});

const routes = [
  '/domains',
  '/domains/family-succession',
  '/domains/compliance-contract',
  '/problems/major-decision',
  '/problems/succession',
  '/books/internal-compliance',
  '/legal/ai-disclosure',
  '/legal/intellectual-property',
  '/insights',
  '/start?route=enterprise-evaluation',
  '/start?route=speaking-invitation',
];

const badStart = /^[，。；：、？！）》】」』]/;
const badEnd = /[（《【「『]$/;

async function visualLines(locator){
  return locator.evaluate(el=>{
    const items=[];
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      for(let i=0;i<node.textContent.length;i++){
        const ch=node.textContent[i];
        if(!ch.trim()) continue;
        const range=document.createRange();
        range.setStart(node,i); range.setEnd(node,i+1);
        const rect=range.getBoundingClientRect();
        if(!rect.width && !rect.height) continue;
        items.push({ch,top:Math.round(rect.top),left:rect.left});
      }
    }
    const groups=[];
    for(const item of items){
      let group=groups.find(g=>Math.abs(g.top-item.top)<=2);
      if(!group){group={top:item.top,chars:[]};groups.push(group);}
      group.chars.push(item);
    }
    return groups.sort((a,b)=>a.top-b.top)
      .map(g=>g.chars.sort((a,b)=>a.left-b.left).map(x=>x.ch).join('').trim())
      .filter(Boolean);
  });
}

function assertPunctuation(lines,label){
  assert.ok(lines.length>0,label+' has no visual lines');
  for(const line of lines){
    const compact=line.replace(/\s/g,'');
    assert.ok(!badStart.test(compact),label+' starts with closing punctuation: '+JSON.stringify(lines));
    assert.ok(!badEnd.test(compact),label+' ends with opening punctuation: '+JSON.stringify(lines));
  }
}

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const report={passed:false,routes:[],humanistic:{},forms:{},errors:[]};

try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));

  let enterpriseTitles=[];
  let speakingTitles=[];

  for(const path of routes){
    await page.goto(base+path,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(100);

    const overflow=await page.evaluate(()=>({w:innerWidth,sw:document.documentElement.scrollWidth}));
    assert.ok(overflow.sw<=overflow.w+1,path+' horizontal overflow');

    const h1=page.locator('main h1').first();
    assert.ok(await h1.count(),path+' missing H1');
    const hs=await h1.evaluate(el=>{const cs=getComputedStyle(el);return{font:parseFloat(cs.fontSize),line:parseFloat(cs.lineHeight)};});
    assert.ok(hs.font>=30&&hs.font<=44,path+' H1 font '+hs.font);
    assert.ok(hs.line/hs.font>=1.25&&hs.line/hs.font<=1.60,path+' H1 line-height ratio');
    const h1Lines=await visualLines(h1);
    assert.ok(h1Lines.length<=5,path+' H1 too fragmented: '+JSON.stringify(h1Lines));
    assertPunctuation(h1Lines,path+' H1');

    for(const selector of ['main h2','main h3']){
      const nodes=page.locator(selector);
      const count=Math.min(await nodes.count(),8);
      for(let i=0;i<count;i++){
        const el=nodes.nth(i);
        if(!(await el.isVisible())) continue;
        const lines=await visualLines(el);
        assertPunctuation(lines,path+' '+selector+' '+i);
      }
    }

    const body=page.locator('main p').filter({hasNot:page.locator('.stt-master-kicker')}).first();
    if(await body.count()){
      const bs=await body.evaluate(el=>{const cs=getComputedStyle(el);return{font:parseFloat(cs.fontSize),line:parseFloat(cs.lineHeight)};});
      if(bs.font>=14){
        assert.ok(bs.line/bs.font>=1.55,path+' body line-height too tight');
      }
    }

    if(path.includes('enterprise-evaluation')){
      assert.equal(await page.locator('.stt-intake-field').count(),7,'enterprise evaluation must have seven dedicated fields');
      enterpriseTitles=await page.locator('.stt-intake-question').allInnerTexts();
      assert.ok(enterpriseTitles.some(t=>t.includes('企業／組織目前處於什麼階段')),'enterprise organization field missing');
      assert.ok(enterpriseTitles.some(t=>t.includes('最不能承擔的結果')),'enterprise downside field missing');
    }
    if(path.includes('speaking-invitation')){
      assert.equal(await page.locator('.stt-intake-field').count(),8,'speaking invitation must have eight dedicated fields');
      speakingTitles=await page.locator('.stt-intake-question').allInnerTexts();
      assert.ok(speakingTitles.some(t=>t.includes('主辦單位與活動名稱')),'speaking organizer field missing');
      assert.ok(speakingTitles.some(t=>t.includes('錄影、直播或公開刊載')),'speaking recording/public-use field missing');
    }

    const shot='route-'+path.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')+'.png';
    await page.screenshot({path:out+'/'+shot,fullPage:false});
    report.routes.push({path,h1Font:hs.font,h1Lines,screenshot:shot});
  }

  assert.notDeepEqual(enterpriseTitles,speakingTitles,'enterprise and speaking forms must not share one schema');
  report.forms={enterpriseFields:enterpriseTitles.length,speakingFields:speakingTitles.length};

  await page.goto(base+'/humanistic-interview/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const stationSources=await page.locator('.station-visual img').evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
  assert.equal(stationSources.length,5,'Humanistic must expose five station artworks');
  for(const src of stationSources){
    const response=await ctx.request.get(new URL(src,page.url()).href);
    assert.equal(response.status(),200,'Humanistic station artwork failed '+src);
    const bytes=await response.body();
    assert.ok(bytes.length>10000,'Humanistic station artwork is empty '+src);
  }

  const start=page.locator('#welcome .primary').first();
  await start.click();
  await page.waitForTimeout(150);
  const stationImage=page.locator('#station1 .station-visual img').first();
  await stationImage.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const imageState=await stationImage.evaluate(img=>({complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}));
  assert.ok(imageState.complete&&imageState.naturalWidth>0&&imageState.naturalHeight>0,'Humanistic station 1 image is broken');
  report.humanistic={stationCount:stationSources.length,station1:imageState};

  assert.deepEqual(report.errors,[]);
  report.passed=true;
  await ctx.close();
} finally {
  fs.writeFileSync(out+'/editorial-extended-report.json',JSON.stringify(report,null,2));
  await browser.close();
  console.log(JSON.stringify({passed:report.passed,routes:report.routes.length,forms:report.forms,humanistic:report.humanistic,errors:report.errors.length}));
}
