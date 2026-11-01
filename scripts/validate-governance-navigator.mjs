import fs from "node:fs";

const read=(path)=>fs.readFileSync(path,"utf8");
const errors=[];
const requireToken=(source,token,label)=>{if(!source.includes(token))errors.push(label);};

const app=read("src/App.tsx");
const navigator=read("src/pages/GovernanceNavigator.tsx");
const css=read("src/styles/stt-governance-navigator.css");
const home=read("src/pages/HomeCanonical.tsx");
const seo=read("src/seo.ts");
const vercel=JSON.parse(read("vercel.json"));

requireToken(app,'path="/navigator"',"Navigator route missing");
requireToken(app,'<Link to="/navigator">治理導航</Link>',"Navigator footer entry missing");
requireToken(home,'to="/navigator">開啟治理導航 →</Link>',"Homepage Navigator entry missing");
requireToken(seo,'"/navigator": {',"Navigator formal metadata missing");

const primaryBlock=(app.match(/const PRIMARY_NAVIGATION = \[([\s\S]*?)\] as const;/)||[])[1]||"";
if(primaryBlock.includes("/navigator")||primaryBlock.includes("治理導航"))errors.push("Navigator must not alter primary navigation");

for(const prohibited of ["fetch(","localStorage","sessionStorage","@google/generative-ai","openai","anthropic","firebase","supabase"]){
  if(navigator.toLowerCase().includes(prohibited.toLowerCase()))errors.push("Navigator contains prohibited external/storage capability: "+prohibited);
}

requireToken(navigator,'GOVERNANCE NAVIGATOR · LOCAL TRIAGE',"Navigator local-triage identity missing");
requireToken(navigator,'不會送到外部 AI 模型',"No-external-model disclosure missing");
requireToken(navigator,'不會提交到 STT',"No-submission disclosure missing");
requireToken(navigator,'不是莊鈞翔博士或 STT 對個案作出的治理判讀',"Human judgment boundary missing");
requireToken(navigator,'導航可以自動化；治理判讀不能外包',"Human authority statement missing");
requireToken(navigator,'maxLength={1200}',"Input length boundary missing");
requireToken(navigator,'SENSITIVE_TERMS',"Sensitive-information warning missing");

for(const route of [
  "/problems/succession",
  "/problems/family-ownership",
  "/problems/major-decision",
  "/problems/strategic-legal",
  "/problems/ai-governance",
  "/problems/system-failure",
  "/problems/founder-legacy",
  "/institutions",
  "/start?type=institution"
]){
  requireToken(navigator,route,"Navigator route mapping missing: "+route);
}

requireToken(css,"@media(max-width:900px)","Navigator tablet breakpoint missing");
requireToken(css,"@media(max-width:640px)","Navigator mobile breakpoint missing");
requireToken(css,".stt-navigator-grid{grid-template-columns:1fr}","Navigator responsive card collapse missing");

const rewrites=Array.isArray(vercel.rewrites)?vercel.rewrites:[];
if(!rewrites.some(item=>item?.source==="/navigator"&&item?.destination==="/seo-navigator.html"))errors.push("Exact /navigator rewrite missing");
if(rewrites.some(item=>item?.source==="/navigator/:path*"))errors.push("Broad Navigator fallback is prohibited");
const redirects=Array.isArray(vercel.redirects)?vercel.redirects:[];
if(!redirects.some(item=>item?.source==="/navigator/"&&item?.destination==="/navigator"&&item?.permanent===true))errors.push("Navigator trailing-slash canonical redirect missing");

if(errors.length){
  console.error("STT GOVERNANCE NAVIGATOR QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  governanceNavigatorQA:"PASS",
  localClassificationOnly:true,
  noExternalModel:true,
  noStorage:true,
  noParallelSubmission:true,
  primaryNavigationUnchanged:true,
  exactNavigatorRoute:true,
  sensitiveDataWarning:true,
  humanAuthorityBoundary:true,
  responsiveSourceLocks:true,
}));
