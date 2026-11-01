import fs from "node:fs";
const read=p=>fs.readFileSync(p,"utf8"),errors=[];
const req=(s,t,l)=>{if(!s.includes(t))errors.push(l)};
const app=read("src/GCSDAStandaloneV3.tsx");
const nav=read("src/GCSDAInstitutionalNavigator.tsx");
const en=read("src/GCSDAEnglishFoundation.tsx");
const meta=read("src/gcsdaMetadata.ts");
const vercel=JSON.parse(read("vercel.json"));
for(const route of ["/navigator","/en/navigator"]){
  req(app,`path="${route}"`,`Navigator route missing: ${route}`);
  req(meta,`"${route}": {`,`Navigator metadata missing: ${route}`);
}
if((app.match(/const navItems = \[([\s\S]*?)\] as const;/)||[])[1]?.includes("navigator"))errors.push("Primary navigation must remain unchanged");
for(const bad of ["fetch(","openai","anthropic","@google/generative-ai","firebase","supabase"]){
  if(nav.toLowerCase().includes(bad.toLowerCase()))errors.push("Navigator external capability prohibited: "+bad);
}
if(/(?:window\.)?localStorage\s*\.\s*(?:setItem|getItem|removeItem|clear)\s*\(/.test(nav))errors.push("Navigator must not call localStorage");
if(/(?:window\.)?sessionStorage\s*\.\s*(?:setItem|getItem|removeItem|clear)\s*\(/.test(nav))errors.push("Navigator must not call sessionStorage");
req(nav,"不會送到外部 AI 模型","Chinese local-processing disclosure missing");
req(nav,"It is not sent to an external AI model","English local-processing disclosure missing");
req(nav,"不判定會員資格","Membership-decision boundary missing");
req(nav,"Institutional authority cannot.","Institutional authority boundary missing");
req(nav,"/charter","Charter route missing");
req(nav,"/governance","Governance route missing");
req(nav,"/membership","Membership route missing");
req(nav,"/events","Events route missing");
req(nav,"/knowledge","Knowledge route missing");
req(nav,"/founder-chairman","Founder route missing");
req(nav,"/council","Council route missing");
req(en,'to="/en/navigator"',"English navigator entry missing");
const rw=vercel.rewrites||[];
if(!rw.some(x=>x.source==="/navigator"&&x.destination==="/gcsda-navigator.html"))errors.push("Chinese exact rewrite missing");
if(!rw.some(x=>x.source==="/en/navigator"&&x.destination==="/gcsda-en-navigator.html"))errors.push("English exact rewrite missing");
if(rw.some(x=>x.source==="/navigator/:path*"||x.source==="/en/navigator/:path*"))errors.push("Broad navigator rewrite prohibited");
if(errors.length){console.error("GCSDA INSTITUTIONAL NAVIGATOR QA FAILED\n- "+errors.join("\n- "));process.exit(1)}
console.log(JSON.stringify({gcsdaInstitutionalNavigatorQA:"PASS",localClassificationOnly:true,noExternalModel:true,noStorage:true,primaryNavigationUnchanged:true,bilingualNavigator:true,formalInstitutionalRoutesOnly:true}));
