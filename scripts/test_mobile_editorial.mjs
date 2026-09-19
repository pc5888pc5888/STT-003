import fs from 'node:fs';
import assert from 'node:assert/strict';
const { chromium } = await import('/tmp/stt-browser/node_modules/playwright/index.mjs');

const base = process.env.STT_TEST_ORIGIN || 'http://127.0.0.1:4173';
const out = 'mobile-editorial-evidence';
fs.mkdirSync(out,{recursive:true});

const routes = [
  { path:'/', kind:'master', name:'home' },
  { path:'/problems', kind:'master', name:'problems' },
  { path:'/how-stt-works', kind:'master', name:'method' },
  { path:'/publications', kind:'master', name:'publications' },
  { path:'/stt', kind:'master', name:'stt' },
  { path:'/cooperation', kind:'cooperation', name:'cooperation' },
  { path:'/institution/eric-chuang', kind:'master', name:'eric' },
  { path:'/humanistic-interview/', kind:'humanistic', name:'humanistic' },
];

const mobileViewports = [
  { width:360, height:800 },
  { width:390, height:844 },
  { width:430, height:932 },
];

function pctDiff(a,b){ return Math.abs(a-b)/b; }

async function visualLines(page, selector){
  return page.locator(selector).evaluate(el => {
    const items = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      for (let i=0;i<node.textContent.length;i++) {
        const ch=node.textContent[i];
        if (!ch.trim()) continue;
        const r=document.createRange();
        r.setStart(node,i); r.setEnd(node,i+1);
        const rect=r.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        items.push({ch,top:Math.round(rect.top),left:rect.left});
      }
    }
    const groups = new Map();
    for (const item of items) {
      let key=[...groups.keys()].find(k=>Math.abs(k-item.top)<=2);
      if (key===undefined){key=item.top;groups.set(key,[]);}
      groups.get(key).push(item);
    }
    return [...groups.entries()]
      .sort((a,b)=>a[0]-b[0])
      .map(([,chars])=>chars.sort((a,b)=>a.left-b.left).map(x=>x.ch).join('').trim())
      .filter(Boolean);
  });
}

async function measureMaster(page){
  return page.locator('.stt-master-hero.is-primary').evaluate(hero=>{
    const image=hero.querySelector('.stt-master-hero__image');
    const inner=hero.querySelector('.stt-master-hero__inner');
    const h1=hero.querySelector('h1');
    const lead=hero.querySelector('.stt-master-lead');
    const ir=image.getBoundingClientRect();
    const hr=h1.getBoundingClientRect();
    const cs=getComputedStyle(h1);
    const innerCs=getComputedStyle(inner);
    return {
      imageWidth:ir.width,
      imageHeight:ir.height,
      imageRatio:ir.width/ir.height,
      h1Font:parseFloat(cs.fontSize),
      h1Line:parseFloat(cs.lineHeight),
      h1Height:hr.height,
      paddingLeft:parseFloat(innerCs.paddingLeft),
      paddingRight:parseFloat(innerCs.paddingRight),
      leadFont:lead?parseFloat(getComputedStyle(lead).fontSize):null,
      leadLine:lead?parseFloat(getComputedStyle(lead).lineHeight):null,
      title:h1.textContent?.trim()||'',
      src:image.currentSrc||image.getAttribute('src')||'',
    };
  });
}

async function measureCooperation(page){
  return page.locator('.stt-coop-hero').evaluate(hero=>{
    const media=hero.querySelector('.stt-coop-hero-bg');
    const copy=hero.querySelector('.stt-coop-copy');
    const h1=hero.querySelector('h1');
    const mr=media.getBoundingClientRect();
    const cs=getComputedStyle(h1);
    const copyCs=getComputedStyle(copy);
    return {
      imageWidth:mr.width,
      imageHeight:mr.height,
      imageRatio:mr.width/mr.height,
      h1Font:parseFloat(cs.fontSize),
      h1Line:parseFloat(cs.lineHeight),
      paddingLeft:parseFloat(copyCs.paddingLeft),
      paddingRight:parseFloat(copyCs.paddingRight),
      title:h1.textContent?.trim()||'',
    };
  });
}

async function measureHumanistic(page){
  return page.locator('#welcome').evaluate(root=>{
    const card=root.querySelector('.visual-card');
    const copy=root.querySelector('.copy-panel');
    const h1=root.querySelector('h1');
    const cr=card.getBoundingClientRect();
    const rootCs=getComputedStyle(root);
    const hcs=getComputedStyle(h1);
    return {
      imageWidth:cr.width,
      imageHeight:cr.height,
      imageRatio:cr.width/cr.height,
      h1Font:parseFloat(hcs.fontSize),
      h1Line:parseFloat(hcs.lineHeight),
      paddingLeft:parseFloat(rootCs.paddingLeft),
      paddingRight:parseFloat(rootCs.paddingRight),
      title:h1.textContent?.trim()||'',
      hasReturn:Boolean(document.querySelector('.stt-return-home')),
      hasNetlifyHud:Boolean(document.querySelector('script[src*="/.netlify/scripts/hud"]')),
    };
  });
}


async function measureEditorialBody(page, route){
  const selectors = route.path==='/' ? {
      heading:'.stt-home-problems h2', body:'.stt-home-problems__head>p:not(.stt-master-kicker)'
    } : route.path==='/problems' ? {
      heading:'#problem-index h2', body:'.stt-problem-misjudgment'
    } : route.path==='/cooperation' ? {
      heading:'.stt-coop-card h3', body:'.stt-coop-body'
    } : route.path==='/institution/eric-chuang' ? {
      heading:'.gr-section h2', body:'.gr-desc'
    } : {
      heading:'.stt-canon-card h2', body:'.stt-canon-card p'
    };
  const heading = page.locator(selectors.heading).first();
  const body = page.locator(selectors.body).first();
  await heading.scrollIntoViewIfNeeded();
  return {
    ...await heading.evaluate(el=>{
      const cs=getComputedStyle(el),r=el.getBoundingClientRect();
      return {
        headingFont:parseFloat(cs.fontSize),
        headingLine:parseFloat(cs.lineHeight),
        headingWidth:r.width,
        headingText:el.textContent?.trim()||'',
      };
    }),
    ...await body.evaluate(el=>{
      const cs=getComputedStyle(el),r=el.getBoundingClientRect();
      return {
        bodyFont:parseFloat(cs.fontSize),
        bodyLine:parseFloat(cs.lineHeight),
        bodyWidth:r.width,
      };
    }),
    headingLines:await visualLines(page,selectors.heading),
  };
}

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const report={passed:false,origin:base,mobile:[],desktop:[],errors:[]};

try{
  for(const viewport of mobileViewports){
    const ctx=await browser.newContext({viewport,deviceScaleFactor:2,reducedMotion:'reduce'});
    const page=await ctx.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));

    for(const route of routes){
      await page.goto(base+route.path,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(100);

      const overflow=await page.evaluate(()=>{
        const inner=innerWidth,scroll=document.documentElement.scrollWidth;
        const offenders=[...document.querySelectorAll('body *')].map(el=>{
          const r=el.getBoundingClientRect();
          return {tag:el.tagName,cls:el.className||'',id:el.id||'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
        }).filter(x=>x.right>inner+1||x.left<-1).sort((a,b)=>b.width-a.width).slice(0,8);
        return {inner,scroll,offenders};
      });
      assert.ok(overflow.scroll<=overflow.inner+1,`${route.path} ${viewport.width}px horizontal overflow ${JSON.stringify(overflow)}`);

      let metrics, lines;
      if(route.kind==='master'){
        assert.equal(await page.locator('.stt-master-hero.is-primary').count(),1,`${route.path} missing master hero`);
        metrics=await measureMaster(page);
        lines=await visualLines(page,'.stt-master-hero.is-primary h1');
        assert.ok(pctDiff(metrics.imageRatio,4/3)<0.08,`${route.path} mobile hero must be approximately 4:3`);
        assert.ok(metrics.paddingLeft>=20&&metrics.paddingLeft<=28,`${route.path} mobile left padding ${metrics.paddingLeft}`);
        assert.ok(metrics.paddingRight>=20&&metrics.paddingRight<=28,`${route.path} mobile right padding ${metrics.paddingRight}`);
        assert.ok(metrics.h1Font>=29&&metrics.h1Font<=46,`${route.path} H1 font ${metrics.h1Font}`);
        assert.ok(metrics.h1Line/metrics.h1Font>=1.28&&metrics.h1Line/metrics.h1Font<=1.5,`${route.path} H1 line-height ratio`);
        assert.ok(lines.length>=1&&lines.length<=5,`${route.path} H1 has ${lines.length} visual lines`);
        assert.ok(lines.every(line=>Array.from(line.replace(/\s/g,'')).length!==1),`${route.path} H1 orphan line: ${JSON.stringify(lines)}`);
        const toggle=page.locator('.stt-accessibility-toggle');
        assert.equal(await toggle.count(),1,`${route.path} missing mobile accessibility toggle`);
        assert.ok(await toggle.isVisible(),`${route.path} mobile accessibility toggle not visible`);
        assert.ok(!(await page.locator('.stt-accessibility-tools').isVisible()),`${route.path} expanded tools should be closed initially`);
      }else if(route.kind==='cooperation'){
        metrics=await measureCooperation(page);
        lines=await visualLines(page,'.stt-coop-hero h1');
        assert.ok(pctDiff(metrics.imageRatio,4/3)<0.08,'cooperation mobile hero must be approximately 4:3');
        assert.ok(metrics.paddingLeft>=20&&metrics.paddingLeft<=28,'cooperation mobile left padding');
        assert.ok(metrics.paddingRight>=20&&metrics.paddingRight<=28,'cooperation mobile right padding');
        assert.ok(metrics.h1Font>=28&&metrics.h1Font<=36,`cooperation H1 font ${metrics.h1Font}`);
        assert.ok(lines.length>=2&&lines.length<=5,`cooperation H1 has ${lines.length} visual lines`);
        assert.ok(lines.every(line=>Array.from(line.replace(/\s/g,'')).length!==1),`cooperation H1 orphan line: ${JSON.stringify(lines)}`);
        assert.ok(await page.locator('.stt-accessibility-toggle').isVisible(),'cooperation mobile accessibility toggle not visible');
        assert.ok(!(await page.locator('.stt-accessibility-tools').isVisible()),'cooperation expanded tools should be closed initially');
      }else{
        metrics=await measureHumanistic(page);
        lines=await visualLines(page,'#welcome h1');
        assert.ok(metrics.imageRatio>0.72&&metrics.imageRatio<0.88,'Humanistic visual card should retain portrait editorial ratio');
        assert.ok(metrics.paddingLeft>=20&&metrics.paddingLeft<=28,'Humanistic mobile left padding');
        assert.ok(metrics.paddingRight>=20&&metrics.paddingRight<=28,'Humanistic mobile right padding');
        assert.ok(metrics.h1Font>=29&&metrics.h1Font<=39,`Humanistic H1 font ${metrics.h1Font}`);
        assert.ok(metrics.h1Line/metrics.h1Font>=1.28&&metrics.h1Line/metrics.h1Font<=1.5,'Humanistic H1 line-height ratio');
        assert.ok(lines.length>=1&&lines.length<=4,`Humanistic H1 has ${lines.length} visual lines`);
        assert.ok(metrics.hasReturn,'Humanistic STT return link missing');
        assert.ok(!metrics.hasNetlifyHud,'Humanistic source-host HUD must not exist on STT mirror');
      }

      let bodyMetrics=null;
      if(route.kind!=='humanistic'){
        bodyMetrics=await measureEditorialBody(page,route);
        assert.ok(bodyMetrics.headingFont>=20&&bodyMetrics.headingFont<=32,`${route.path} body heading font ${bodyMetrics.headingFont}`);
        assert.ok(bodyMetrics.headingLine/bodyMetrics.headingFont>=1.4&&bodyMetrics.headingLine/bodyMetrics.headingFont<=1.72,`${route.path} body heading line-height ratio`);
        assert.ok(bodyMetrics.headingLines.length>=1&&bodyMetrics.headingLines.length<=4,`${route.path} body heading has ${bodyMetrics.headingLines.length} visual lines: ${JSON.stringify(bodyMetrics.headingLines)}`);
        assert.ok(bodyMetrics.headingLines.every(line=>Array.from(line.replace(/\s/g,'')).length!==1),`${route.path} body heading orphan line: ${JSON.stringify(bodyMetrics.headingLines)}`);
        assert.ok(bodyMetrics.bodyFont>=14.5&&bodyMetrics.bodyFont<=17,`${route.path} body font ${bodyMetrics.bodyFont}`);
        assert.ok(bodyMetrics.bodyLine/bodyMetrics.bodyFont>=1.7&&bodyMetrics.bodyLine/bodyMetrics.bodyFont<=2.08,`${route.path} body line-height ratio`);
        assert.ok(bodyMetrics.bodyWidth<=viewport.width-36,`${route.path} body measure exceeds mobile safe area`);
        if(route.path==='/problems'){
          const label=page.locator('.stt-problem-label').first();
          const labelStyle=await label.evaluate(el=>({display:getComputedStyle(el).display,font:parseFloat(getComputedStyle(el).fontSize)}));
          assert.equal(labelStyle.display,'block','Problems metadata label must be separated from paragraph');
          assert.ok(labelStyle.font<=11.5,'Problems metadata label must remain subordinate');
        }
      }else{
        assert.ok(!(await page.locator('.bottom-tools').isVisible()),'Humanistic landing tools should not interrupt narrative first screen');
        const leadStyle=await page.locator('#welcome .lead').evaluate(el=>({font:parseFloat(getComputedStyle(el).fontSize),line:parseFloat(getComputedStyle(el).lineHeight),width:el.getBoundingClientRect().width}));
        assert.ok(leadStyle.font>=14.5&&leadStyle.font<=17,'Humanistic landing lead scale');
        assert.ok(leadStyle.line/leadStyle.font>=1.7&&leadStyle.line/leadStyle.font<=2.08,'Humanistic landing lead line-height');
        const start=page.locator('#welcome .primary').first();
        if(await start.count()){
          await start.click();
          await page.waitForTimeout(80);
          const q=page.locator('.question-card .qbody h3').first();
          if(await q.count()){
            const qs=await q.evaluate(el=>({font:parseFloat(getComputedStyle(el).fontSize),line:parseFloat(getComputedStyle(el).lineHeight)}));
            assert.ok(qs.font>=21&&qs.font<=26,'Humanistic question heading scale');
            assert.ok(qs.line/qs.font>=1.45&&qs.line/qs.font<=1.75,'Humanistic question heading line-height');
          }
        }
      }

      const screenshot=`${route.name}-${viewport.width}.png`;
      await page.screenshot({path:out+'/'+screenshot,fullPage:false});
      report.mobile.push({route:route.path,viewport:viewport.width,metrics,lines,bodyMetrics,screenshot});
    }
    await ctx.close();
  }

  const ctx=await browser.newContext({viewport:{width:1440,height:960},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  for(const route of routes.filter(x=>x.kind!=='humanistic')){
    await page.goto(base+route.path,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const overflow=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(overflow.scroll<=overflow.inner+1,`${route.path} desktop horizontal overflow`);
    assert.equal(await page.locator('main h1').count(),1,`${route.path} must have one H1`);
    report.desktop.push({route:route.path,h1:await page.locator('main h1').innerText()});
  }
  await ctx.close();

  assert.deepEqual(report.errors,[]);
  report.passed=true;
} finally {
  fs.writeFileSync(out+'/mobile-editorial-report.json',JSON.stringify(report,null,2));
  await browser.close();
  console.log(JSON.stringify({passed:report.passed,mobileChecks:report.mobile.length,desktopChecks:report.desktop.length,errors:report.errors.length}));
}
