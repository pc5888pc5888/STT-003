import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const errors=[];
const requireToken=(source,token,label)=>{if(!source.includes(token))errors.push(label);};

const app=read("src/App.tsx");
const japanese=read("src/pages/JapaneseFoundation.tsx");
const seo=read("src/seo.ts");
const vite=read("vite.config.ts");
const css=read("src/styles/stt-japanese-foundation.css");
const english=read("src/pages/EnglishFoundation.tsx");
const vercel=JSON.parse(read("vercel.json"));

const routes=[
  "/ja",
  "/ja/problems",
  "/ja/how-stt-works",
  "/ja/engagement",
  "/ja/insights",
  "/ja/about",
  "/ja/start",
];

for(const route of routes){
  requireToken(app,`path="${route}"`,`Japanese route missing: ${route}`);
  requireToken(seo,`"${route}": {`,`Japanese metadata missing: ${route}`);
}

requireToken(app,'const HUMANISTIC_INTERVIEW_URL = "/humanistic-interview/";',"Humanistic Interview route changed");
requireToken(app,'const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";',"STT LINE public URL changed");
requireToken(app,'<Link to="/start" className="stt-g0-primary-cta">開始治理判讀</Link>',"Chinese primary CTA changed");
requireToken(app,'className="stt-g0-lang-cluster"',"Chinese language cluster missing");
requireToken(app,'hrefLang="ja"',"Chinese-to-Japanese switch missing");
requireToken(english,'hrefLang="ja"',"English-to-Japanese switch missing");
requireToken(japanese,'hrefLang="zh-Hant-TW"',"Japanese-to-Chinese switch missing");
requireToken(japanese,'hrefLang="en"',"Japanese-to-English switch missing");

requireToken(japanese,'fetch("/api/cooperation-submit"',"Japanese intake is not using the governed intake API");
requireToken(japanese,'source_account:"stt"',"Japanese intake attribution changed");
requireToken(japanese,'landing_route:"/ja/start"',"Japanese intake landing route missing");
requireToken(japanese,'https://line.me/R/ti/p/%40783xkknh',"Japanese LINE public URL changed");
requireToken(japanese,'{ label: "いま直面している課題", path: "/ja/problems" }',"Japanese Problems navigation missing");
requireToken(japanese,'{ label: "研究・出版", path: "/ja/insights" }',"Japanese Insights navigation missing");
requireToken(japanese,'{ label: "莊鈞翔博士", path: "/eric-chuang" }',"Japanese founder navigation missing");
requireToken(japanese,'{ label: "インタビュー対象者専用", path: "/humanistic-interview/" }',"Japanese interviewee navigation missing");

const fetchCount=(japanese.match(/fetch\(/g)||[]).length;
if(fetchCount!==1)errors.push(`Japanese layer must have exactly one fetch call; found ${fetchCount}`);
for(const banned of ["@google/generative-ai","openai","anthropic","firebase","supabase"]){
  if(japanese.toLowerCase().includes(banned.toLowerCase()))errors.push(`Unapproved dependency/service reference in Japanese layer: ${banned}`);
}

requireToken(seo,'language?: "zh-Hant-TW" | "en" | "ja" | "ko"',"Japanese runtime language type missing");
requireToken(seo,'locale?: "zh_TW" | "en_US" | "ja_JP" | "ko_KR"',"Japanese locale type missing");
requireToken(seo,'if (pair.ja) alternatives.push(["ja", pair.ja]);',"Japanese runtime hreflang missing");
requireToken(vite,'languagePair.ja ?',"Japanese static hreflang missing");
requireToken(vite,'language === "ja" ? "ja_JP"',"Japanese static OG locale missing");
requireToken(vite,'isJapanese ? "/ja"',"Japanese breadcrumb home missing");

requireToken(css,'.stt-g0-lang-cluster',"Compact language cluster styling missing");
requireToken(css,'@media(max-width:1399px)',"Medium-width language cluster control missing");
requireToken(css,'.stt-g0-lang-cluster{display:none}',"Language cluster must hide below governed desktop width");
requireToken(css,'@media(max-width:760px)',"Japanese mobile breakpoint missing");
requireToken(css,'.stt-ja-process-line{grid-template-columns:1fr}',"Japanese process mobile geometry missing");

const rewrites=Array.isArray(vercel.rewrites)?vercel.rewrites:[];
if(rewrites.some(item=>item?.source==="/ja/:path*"))errors.push("Broad /ja/:path* fallback is prohibited");
const expected={
  "/ja":"/seo-ja.html",
  "/ja/problems":"/seo-ja-problems.html",
  "/ja/how-stt-works":"/seo-ja-how-stt-works.html",
  "/ja/engagement":"/seo-ja-engagement.html",
  "/ja/insights":"/seo-ja-insights.html",
  "/ja/about":"/seo-ja-about.html",
  "/ja/start":"/seo-ja-start.html",
};
for(const [source,destination] of Object.entries(expected)){
  if(!rewrites.some(item=>item?.source===source&&item?.destination===destination))errors.push(`Exact Japanese rewrite missing: ${source}`);
}
const redirects=Array.isArray(vercel.redirects)?vercel.redirects:[];
for(const route of routes){
  if(!redirects.some(item=>item?.source===route+"/"&&item?.destination===route&&item?.permanent===true))errors.push(`Japanese trailing-slash redirect missing: ${route}/`);
}

if(errors.length){
  console.error("STT JAPANESE FOUNDATION QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  japaneseFoundationQA:"PASS",
  formalJapaneseRoutes:routes.length,
  exactRewrites:true,
  strictUnknownJapanese404:true,
  existingIntakeApiReused:true,
  noNewAiService:true,
  trilingualHreflang:true,
  compactLanguageCluster:true,
  coreChineseCtaRetained:true,
  humanisticRouteRetained:true,
  sttLineUrlRetained:true,
  responsiveSourceLocks:true,
}));
