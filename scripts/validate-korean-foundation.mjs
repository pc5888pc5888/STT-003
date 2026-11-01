import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const errors=[];
const requireToken=(source,token,label)=>{if(!source.includes(token))errors.push(label);};

const app=read("src/App.tsx");
const korean=read("src/pages/KoreanFoundation.tsx");
const english=read("src/pages/EnglishFoundation.tsx");
const japanese=read("src/pages/JapaneseFoundation.tsx");
const seo=read("src/seo.ts");
const vite=read("vite.config.ts");
const css=read("src/styles/stt-korean-foundation.css");
const sharedCss=read("src/styles/stt-japanese-foundation.css");
const vercel=JSON.parse(read("vercel.json"));

const routes=["/ko","/ko/how-stt-works","/ko/engagement","/ko/about","/ko/start"];
for(const route of routes){
  requireToken(app,`path="${route}"`,`Korean route missing: ${route}`);
  requireToken(seo,`"${route}": {`,`Korean metadata missing: ${route}`);
}

requireToken(app,'const HUMANISTIC_INTERVIEW_URL = "/humanistic-interview/";',"Humanistic Interview route changed");
requireToken(app,'const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";',"STT LINE public URL changed");
requireToken(app,'<Link to="/start" className="stt-g0-primary-cta">開始治理判讀</Link>',"Chinese primary CTA changed");
requireToken(app,'hrefLang="ko"',"Chinese-to-Korean switch missing");
requireToken(english,'hrefLang="ko"',"English-to-Korean switch missing");
requireToken(japanese,'hrefLang="ko"',"Japanese-to-Korean switch missing");
requireToken(korean,'hrefLang="zh-Hant-TW"',"Korean-to-Chinese switch missing");
requireToken(korean,'hrefLang="en"',"Korean-to-English switch missing");
requireToken(korean,'hrefLang="ja"',"Korean-to-Japanese switch missing");

requireToken(korean,'fetch("/api/cooperation-submit"',"Korean intake is not using the governed intake API");
requireToken(korean,'source_account:"stt"',"Korean intake attribution changed");
requireToken(korean,'landing_route:"/ko/start"',"Korean intake landing route missing");
requireToken(korean,'https://line.me/R/ti/p/%40783xkknh',"Korean LINE public URL changed");

const fetchCount=(korean.match(/fetch\(/g)||[]).length;
if(fetchCount!==1)errors.push(`Korean layer must have exactly one fetch call; found ${fetchCount}`);
for(const banned of ["@google/generative-ai","openai","anthropic","firebase","supabase"]){
  if(korean.toLowerCase().includes(banned.toLowerCase()))errors.push(`Unapproved dependency/service reference in Korean layer: ${banned}`);
}

requireToken(seo,'language?: "zh-Hant-TW" | "en" | "ja" | "ko"',"Korean runtime language type missing");
requireToken(seo,'locale?: "zh_TW" | "en_US" | "ja_JP" | "ko_KR"',"Korean locale type missing");
requireToken(seo,'if (pair.ko) alternatives.push(["ko", pair.ko]);',"Korean runtime hreflang missing");
requireToken(vite,'languagePair.ko ?',"Korean static hreflang missing");
requireToken(vite,'language === "ko" ? "ko_KR"',"Korean static OG locale missing");
requireToken(vite,'isKorean ? "/ko"',"Korean breadcrumb home missing");

requireToken(sharedCss,'.stt-g0-lang-cluster',"Shared compact language cluster missing");
requireToken(sharedCss,'@media(max-width:1399px)',"Medium-width language cluster control missing");
requireToken(css,'@media(max-width:760px)',"Korean mobile breakpoint missing");
requireToken(css,'.stt-ko-process-line{grid-template-columns:1fr}',"Korean process mobile geometry missing");

const rewrites=Array.isArray(vercel.rewrites)?vercel.rewrites:[];
if(rewrites.some(item=>item?.source==="/ko/:path*"))errors.push("Broad /ko/:path* fallback is prohibited");
const expected={
  "/ko":"/seo-ko.html",
  "/ko/how-stt-works":"/seo-ko-how-stt-works.html",
  "/ko/engagement":"/seo-ko-engagement.html",
  "/ko/about":"/seo-ko-about.html",
  "/ko/start":"/seo-ko-start.html",
};
for(const [source,destination] of Object.entries(expected)){
  if(!rewrites.some(item=>item?.source===source&&item?.destination===destination))errors.push(`Exact Korean rewrite missing: ${source}`);
}
const redirects=Array.isArray(vercel.redirects)?vercel.redirects:[];
for(const route of routes){
  if(!redirects.some(item=>item?.source===route+"/"&&item?.destination===route&&item?.permanent===true))errors.push(`Korean trailing-slash redirect missing: ${route}/`);
}

if(errors.length){
  console.error("STT KOREAN FOUNDATION QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  koreanFoundationQA:"PASS",
  formalKoreanRoutes:routes.length,
  exactRewrites:true,
  strictUnknownKorean404:true,
  existingIntakeApiReused:true,
  noNewAiService:true,
  fourLocaleHreflang:true,
  compactLanguageCluster:true,
  coreChineseCtaRetained:true,
  humanisticRouteRetained:true,
  sttLineUrlRetained:true,
  responsiveSourceLocks:true,
}));
