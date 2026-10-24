import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const OUT="artifacts/visual-qa";
fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const viewports={
  desktop:{width:1440,height:1000},
  tablet:{width:1024,height:900},
  mobile:{width:390,height:844},
};

const sttManaged={
  "/":{lines:1,image:true},
  "/problems":{lines:1,image:true},
  "/problems/major-decision":{lines:1,image:true},
  "/problems/owner-dependence":{lines:1,image:true},
  "/problems/succession":{lines:1,image:true},
  "/problems/family-ownership":{lines:2,image:true},
  "/problems/strategic-legal":{lines:2,image:true},
  "/problems/ai-governance":{lines:2,image:true},
  "/problems/system-failure":{lines:1,image:true},
  "/problems/founder-legacy":{lines:2,image:true},
  "/how-stt-works":{lines:1,image:true},
  "/engagement":{lines:2,image:true},
  "/insights":{lines:2,image:true},
  "/about":{lines:3,image:true},
  "/eric-chuang":{lines:1,image:true,profile:true},
  "/institutions":{lines:2,image:false},
  "/start":{lines:1,image:false},
  "/privacy":{lines:1,image:false},
  "/professional-boundary":{lines:1,image:false},
  "/research":{lines:1,image:true},
  "/books":{lines:1,image:true},
  "/books/internal-compliance":{lines:1,image:true},
  "/domains":{lines:1,image:true},
  "/domains/corporate-governance":{lines:1,image:true},
  "/domains/family-succession":{lines:1,image:true},
  "/domains/strategic-legal":{lines:1,image:true},
  "/domains/compliance-contract":{lines:1,image:true},
  "/domains/human-ai-governance":{lines:1,image:true},
  "/projects":{lines:2,image:true,locked:true},
  "/success":{lines:1,image:false},
  "/legal/intellectual-property":{lines:1,image:false},
  "/legal/ai-disclosure":{lines:1,image:false},
  "/legal/digital-content-policy":{lines:1,image:false},
};

const sttSpecial=[
  "/columns","/columns/legal","/columns/humanistic","/columns/news",
  "/internal-compliance","/internal-compliance/pillars","/internal-compliance/simulator","/internal-compliance/academic","/internal-compliance/publication",
  "/governance/corporate","/governance/corporate/modules","/governance/corporate/simulator","/governance/corporate/academic",
  "/governance/family","/governance/family/framework","/governance/family/stages","/governance/family/academic",
  "/governance/digital","/governance/digital/features","/governance/digital/console","/governance/digital/academic",
  "/governance/esgai","/legal","/legal/privacy","/legal/ai-usage-disclosure","/digital-product-policy",
  "/humanistic-interview/","/humanistic-20q"
];

const sttAliases=[
  "/index.html","/governance.html","/publications","/insights.html","/insights/index","/papers","/stt","/about.html",
  "/institution/eric-chuang","/cooperation","/contact.html","/institution/gcsda","/gcsda.html","/internal-compliance"
];

const gcsdaManaged={
  "/":{lines:2,image:true},
  "/about":{lines:2,image:true},
  "/founder-chairman":{lines:1,image:true,profile:true},
  "/governance":{lines:2,image:true},
  "/council":{lines:1,image:true},
  "/membership":{lines:2,image:true},
  "/events":{lines:2,image:true},
  "/knowledge":{lines:2,image:true},
  "/charter":{lines:1,image:true},
  "/privacy":{lines:1,image:false},
};

const sites=[
  {name:"stt",base:"https://stt-003.vercel.app",managed:sttManaged,special:sttSpecial,aliases:sttAliases,
   profile:{path:"/eric-chuang",title:"創辦人暨執行長｜莊鈞翔博士",byline:"CHUANG CHUN HSIANG Ph.D.",subtitle:"STT Governance 創辦人暨執行長"}},
  {name:"gcsda",base:"https://gcsda-governance.vercel.app",managed:gcsdaManaged,special:[],aliases:[],
   profile:{path:"/founder-chairman",title:"創會理事長｜莊鈞翔博士",byline:"CHUANG CHUN HSIANG Ph.D.",subtitle:"STT Governance 創辦人暨執行長"}},
];

const safe=(p)=>p==="/"?"home":p.replace(/^\//,"").replace(/\/$/,"").replace(/[^a-zA-Z0-9_-]+/g,"__")||"root";
const round=(n)=>Math.round(n*10)/10;

const browser=await chromium.launch({headless:true});
const records=[];

for(const site of sites){
  const routes=[
    ...Object.keys(site.managed).map(route=>({route,kind:"managed",...site.managed[route]})),
    ...site.special.map(route=>({route,kind:"special"})),
    ...site.aliases.map(route=>({route,kind:"alias"})),
    {route:"/__qa_not_found__",kind:"notfound"}
  ];
  for(const [vpName,vp] of Object.entries(viewports)){
    const context=await browser.newContext({viewport:vp,deviceScaleFactor:1});
    for(const spec of routes){
      const page=await context.newPage();
      const url=site.base+spec.route;
      let response=null;
      let navError=null;
      try{
        response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
        await page.waitForLoadState("networkidle",{timeout:5000}).catch(()=>{});
        await page.waitForTimeout(250);
      }catch(e){navError=String(e);}
      const metrics=await page.evaluate(({route,kind})=>{
        const visible=(el)=>{
          if(!el)return false;
          const s=getComputedStyle(el),r=el.getBoundingClientRect();
          return s.display!=="none"&&s.visibility!=="hidden"&&Number(s.opacity)!==0&&r.width>0&&r.height>0;
        };
        const box=(el)=>{
          if(!el)return null;
          const r=el.getBoundingClientRect();
          return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};
        };
        const lineCount=(el)=>{
          if(!el)return 0;
          const tops=[];
          const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
          let node;
          while((node=walker.nextNode())){
            const t=node.textContent||"";
            for(let i=0;i<t.length;i++){
              if(/\s/.test(t[i]))continue;
              const range=document.createRange();
              range.setStart(node,i);range.setEnd(node,i+1);
              const r=range.getBoundingClientRect();
              if(r.width>0&&r.height>0)tops.push(Math.round(r.top));
            }
          }
          return new Set(tops).size;
        };
        const main=document.querySelector("main,#main-content")||document.body;
        const h1s=[...main.querySelectorAll("h1")].filter(visible);
        const h1=h1s[0]||null;
        const hero=h1?.closest(".cis-hero,.stt-library-heading,.g4-pagehead,.g4-home")||document.querySelector(".cis-hero,.stt-library-heading,.g4-pagehead,.g4-home");
        const heroImg=hero?.querySelector("img")||null;
        const header=document.querySelector(".stt-g0-header,.g4-head,header");
        const desktopNav=document.querySelector(".stt-g0-desktop-nav,.g4-nav");
        const menu=document.querySelector(".stt-g0-menu-button,.g4-menu");
        const byline=hero?.querySelector(".cis-byline");
        const subtitle=hero?.querySelector(".cis-subtitle");
        const broken=[...document.images].filter(img=>img.complete&&img.naturalWidth===0).map(img=>img.currentSrc||img.src);
        return {
          path:location.pathname,
          title:document.title,
          h1Count:h1s.length,
          h1Text:h1?.innerText.trim()||"",
          h1Box:box(h1),
          h1Lines:lineCount(h1),
          heroClass:hero?.className||"",
          heroBox:box(hero),
          heroImage:heroImg?{
            src:heroImg.currentSrc||heroImg.src,
            box:box(heroImg),
            naturalWidth:heroImg.naturalWidth,
            naturalHeight:heroImg.naturalHeight,
            objectFit:getComputedStyle(heroImg).objectFit,
            objectPosition:getComputedStyle(heroImg).objectPosition
          }:null,
          byline:byline?{text:byline.textContent.trim(),box:box(byline),lines:lineCount(byline)}:null,
          subtitle:subtitle?{text:subtitle.textContent.trim(),box:box(subtitle),lines:lineCount(subtitle)}:null,
          header:box(header),
          desktopNavVisible:visible(desktopNav),
          menuVisible:visible(menu),
          horizontalOverflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),
          scrollWidth:document.documentElement.scrollWidth,
          viewportWidth:innerWidth,
          brokenImages:broken,
          forbiddenText:document.body.innerText.includes("治理總控者"),
          kind,route
        };
      },{route:spec.route,kind:spec.kind}).catch(e=>({evalError:String(e),route:spec.route,kind:spec.kind}));
      const rec={
        site:site.name,viewport:vpName,width:vp.width,height:vp.height,url,
        status:response?.status()??null,navError,...spec,...metrics,issues:[]
      };
      const issues=rec.issues;
      if(navError)issues.push("navigation-error");
      if(rec.status&&rec.status>=400&&spec.kind!=="notfound")issues.push("http-"+rec.status);
      if(spec.kind!=="alias"&&spec.kind!=="notfound"&&rec.h1Count!==1)issues.push("h1-count-"+rec.h1Count);
      if((rec.horizontalOverflow||0)>4)issues.push("horizontal-overflow-"+round(rec.horizontalOverflow));
      if(rec.brokenImages?.length)issues.push("broken-images-"+rec.brokenImages.length);
      if(rec.forbiddenText)issues.push("forbidden-public-text");
      if(spec.kind==="managed"){
        if(spec.image&&!rec.heroImage)issues.push("hero-image-missing");
        if(rec.heroImage&&(!rec.heroImage.naturalWidth||!rec.heroImage.naturalHeight))issues.push("hero-image-broken");
        if(vpName==="desktop"&&rec.h1Lines!==spec.lines&&!spec.locked)issues.push("desktop-title-lines-"+rec.h1Lines+"-expected-"+spec.lines);
        if(vpName==="tablet"&&rec.h1Lines>Math.max(2,spec.lines)&&!spec.locked)issues.push("tablet-title-lines-"+rec.h1Lines);
        if(vpName==="mobile"&&rec.h1Lines>3&&!spec.locked)issues.push("mobile-title-lines-"+rec.h1Lines);
        if(vpName==="desktop"&&rec.h1Box&&Math.abs(rec.h1Box.x-56)>4)issues.push("desktop-title-x-"+round(rec.h1Box.x));
        if(vpName==="tablet"&&rec.h1Box&&Math.abs(rec.h1Box.x-36)>4)issues.push("tablet-title-x-"+round(rec.h1Box.x));
        if(rec.heroImage&&vpName!=="mobile"){
          const b=rec.heroImage.box;
          if(b&&b.height>0){
            const ratio=b.width/b.height;
            if(Math.abs(ratio-(16/9))>.05)issues.push("hero-ratio-"+ratio.toFixed(3));
          }
        }
        if(vpName==="desktop"){
          if(!rec.desktopNavVisible)issues.push("desktop-nav-hidden");
          if(rec.menuVisible)issues.push("desktop-menu-visible");
        }else{
          if(rec.desktopNavVisible)issues.push(vpName+"-desktop-nav-visible");
          if(!rec.menuVisible)issues.push(vpName+"-menu-hidden");
        }
      }
      if(spec.profile){
        const p=site.profile;
        if(rec.h1Text!==p.title)issues.push("profile-title-text");
        if(rec.h1Lines!==1)issues.push("profile-title-wrap-"+rec.h1Lines);
        if(!rec.byline||rec.byline.text!==p.byline)issues.push("profile-byline-text");
        else if(rec.byline.lines!==1)issues.push("profile-byline-wrap-"+rec.byline.lines);
        if(!rec.subtitle||rec.subtitle.text!==p.subtitle)issues.push("profile-subtitle-text");
        else if(rec.subtitle.lines!==1)issues.push("profile-subtitle-wrap-"+rec.subtitle.lines);
      }
      const dir=path.join(OUT,site.name,vpName);
      fs.mkdirSync(dir,{recursive:true});
      await page.screenshot({path:path.join(dir,safe(spec.route)+".png"),fullPage:false});
      if(issues.length){
        await page.screenshot({path:path.join(dir,safe(spec.route)+"__full.png"),fullPage:true});
      }
      records.push(rec);
      await page.close();
    }
    await context.close();
  }
}
await browser.close();

// Cross-site / cross-route H1 screen-baseline checks for managed routes.
for(const vpName of ["desktop","tablet"]){
  const base=records.find(r=>r.site==="stt"&&r.viewport===vpName&&r.route==="/"&&r.kind==="managed");
  if(!base?.h1Box)continue;
  for(const r of records.filter(x=>x.viewport===vpName&&x.kind==="managed"&&x.h1Box&&!x.locked)){
    const dy=Math.abs(r.h1Box.y-base.h1Box.y);
    if(dy>5)r.issues.push("title-screen-y-"+round(r.h1Box.y)+"-baseline-"+round(base.h1Box.y));
  }
}

const failures=records.filter(r=>r.issues.length);
const summary={
  generatedAt:new Date().toISOString(),
  totalChecks:records.length,
  routesChecked:new Set(records.map(r=>r.site+":"+r.route)).size,
  failures:failures.length,
  records
};
fs.writeFileSync(path.join(OUT,"report.json"),JSON.stringify(summary,null,2));
const lines=[
  "# Production Visual QA",
  "",
  "Generated: "+summary.generatedAt,
  "Checks: "+summary.totalChecks,
  "Unique site/routes: "+summary.routesChecked,
  "Failures: "+summary.failures,
  "",
  "## Failures",
  ...failures.map(r=>"- "+r.site+" "+r.viewport+" "+r.route+" :: "+r.issues.join(", "))
];
fs.writeFileSync(path.join(OUT,"report.md"),lines.join("\n"));
console.log(JSON.stringify({visualQA:failures.length?"FAIL":"PASS",checks:summary.totalChecks,routes:summary.routesChecked,failures:failures.length}));
if(failures.length){
  console.log(failures.slice(0,120).map(r=>r.site+" "+r.viewport+" "+r.route+" -> "+r.issues.join(", ")).join("\n"));
  process.exit(1);
}
