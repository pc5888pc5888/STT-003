import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const errors=[];
const requireToken=(source,token,label)=>{if(!source.includes(token))errors.push(label);};

const app=read("src/GCSDAStandaloneV3.tsx");
const english=read("src/GCSDAEnglishFoundation.tsx");
const meta=read("src/gcsdaMetadata.ts");
const vite=read("vite.config.ts");
const headerCss=read("src/styles/gcsda-header-refinement.css");
const vercel=JSON.parse(read("vercel.json"));

const routes=["/en","/en/about","/en/founder-chairman","/en/governance","/en/council","/en/membership","/en/events","/en/knowledge","/en/charter"];
for(const route of routes){
  requireToken(app,`path="${route}"`,`English route missing: ${route}`);
  requireToken(meta,`"${route}": {`,`English metadata missing: ${route}`);
}

requireToken(app,'const LINE_URL = "https://line.me/R/ti/p/%40387nbnjs";',"GCSDA LINE public URL changed");
requireToken(app,'const STT_URL = "https://stt-003.vercel.app/";',"STT external link changed");
requireToken(app,'["章程與公告", "/charter"]',"Chinese charter navigation changed");
requireToken(app,'<Route path="/membership" element={<Membership/>}/>','Formal Chinese membership route changed');
requireToken(app,'fetch("/api/gcsda-membership-submit"',"Formal Chinese membership delivery path changed");

requireToken(english,'to="/membership"',"English membership must return to the formal Chinese application");
requireToken(english,'The English edition is explanatory',"English governance boundary statement missing");
requireToken(english,"GCSDA and STT Governance remain separate institutional actors.","Institutional separation statement missing");
requireToken(english,'GCSDA Official LINE',"English LINE contact missing");
for(const token of [
  '["About", "/en/about"]',
  '["Founding Chairman", "/en/founder-chairman"]',
  '["Institutional Governance", "/en/governance"]',
  '["Strategy Governance Council", "/en/council"]',
  '["Membership", "/en/membership"]',
  '["Assemblies & Events", "/en/events"]',
  '["Knowledge & Research", "/en/knowledge"]',
  '["Charter & Notices", "/en/charter"]',
]) requireToken(english,token,`English institutional navigation missing: ${token}`);
requireToken(headerCss,'grid-template-columns:repeat(8,minmax(0,1fr))',"GCSDA desktop navigation must preserve eight equal institutional positions");
requireToken(headerCss,'--gcsda-header-glass:rgba(255,253,249,.84)',"GCSDA translucent header visual contract missing");
requireToken(headerCss,'width:min(1780px,calc(100% - 32px))',"GCSDA wide desktop header contract missing");

if(english.includes('fetch("/api/gcsda-membership-submit"'))errors.push("English edition must not duplicate the formal membership submission form");
if(/<form\b/.test(english))errors.push("English edition must not introduce a parallel form");
for(const banned of ["openai","anthropic","@google/generative-ai","firebase","supabase"]){
  if(english.toLowerCase().includes(banned.toLowerCase()))errors.push(`Unapproved service reference in English edition: ${banned}`);
}

requireToken(meta,'export const GCSDA_LANGUAGE_PAIRS',"GCSDA language pairs missing");
requireToken(meta,'document.documentElement.lang=language',"Runtime html lang governance missing");
requireToken(meta,'data-gcsda-language-alternate',"Runtime language alternate governance missing");
requireToken(vite,'GCSDA_LANGUAGE_PAIRS',"Static hreflang generation missing");
requireToken(vite,'replace(/<html lang="[^"]*">/',"Static html lang generation missing");
requireToken(vite,'replace(/\\//g,"-")',"Nested English static filename normalization missing");

const rewrites=Array.isArray(vercel.rewrites)?vercel.rewrites:[];
if(rewrites.some(item=>item?.source==="/en/:path*"))errors.push("Broad /en/:path* fallback is prohibited");
const expected={
  "/en":"/gcsda-en.html",
  "/en/about":"/gcsda-en-about.html",
  "/en/founder-chairman":"/gcsda-en-founder-chairman.html",
  "/en/governance":"/gcsda-en-governance.html",
  "/en/council":"/gcsda-en-council.html",
  "/en/membership":"/gcsda-en-membership.html",
  "/en/events":"/gcsda-en-events.html",
  "/en/knowledge":"/gcsda-en-knowledge.html",
  "/en/charter":"/gcsda-en-charter.html",
};
for(const [source,destination] of Object.entries(expected)){
  if(!rewrites.some(item=>item?.source===source&&item?.destination===destination))errors.push(`Exact English rewrite missing: ${source}`);
}

const redirects=Array.isArray(vercel.redirects)?vercel.redirects:[];
for(const route of routes){
  if(!redirects.some(item=>item?.source===route+"/"&&item?.destination===route&&item?.permanent===true))errors.push(`Trailing-slash canonical redirect missing: ${route}/`);
}

requireToken(app,"@media(max-width:1050px)","GCSDA tablet/mobile nav breakpoint missing");
requireToken(app,"@media(max-width:760px)","GCSDA mobile breakpoint missing");
requireToken(app,".g4-valuegrid,.g4-grid,.g4-directory{grid-template-columns:1fr}","GCSDA mobile grid collapse missing");
requireToken(app,".g4-membership-form label{grid-template-columns:1fr","Formal membership mobile form geometry changed");

if(errors.length){
  console.error("GCSDA ENGLISH FOUNDATION QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  gcsdaEnglishFoundationQA:"PASS",
  formalEnglishRoutes:routes.length,
  fullEightItemNavigation:true,
  wideTranslucentHeaderContract:true,
  exactRewrites:true,
  strictUnknownEnglish404:true,
  englishEditionHasNoParallelForm:true,
  formalChineseMembershipRetained:true,
  institutionalSeparationRetained:true,
  gcsdaLineUrlRetained:true,
  responsiveSourceLocks:true,
}));
