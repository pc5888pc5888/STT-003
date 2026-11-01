import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const errors=[];
const requireToken=(source,token,label)=>{if(!source.includes(token))errors.push(label);};

const app=read("src/GCSDAStandaloneV3.tsx");
const english=read("src/GCSDAEnglishFoundation.tsx");
const meta=read("src/gcsdaMetadata.ts");
const vite=read("vite.config.ts");
const vercel=JSON.parse(read("vercel.json"));

const routes=["/en","/en/about","/en/governance","/en/membership"];
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
  "/en/governance":"/gcsda-en-governance.html",
  "/en/membership":"/gcsda-en-membership.html",
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
  exactRewrites:true,
  strictUnknownEnglish404:true,
  englishEditionHasNoParallelForm:true,
  formalChineseMembershipRetained:true,
  institutionalSeparationRetained:true,
  gcsdaLineUrlRetained:true,
  responsiveSourceLocks:true,
}));
