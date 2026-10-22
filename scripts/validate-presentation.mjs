import fs from "node:fs";

const src = fs.readFileSync("src/data/pagePresentation.ts","utf8");
const isGcsda = (process.env.VERCEL_GIT_COMMIT_REF || "").toLowerCase().includes("gcsda");
const allowedThree = new Set(["/about"]);
const errors = [];
const weighted = (s) => [...s].reduce((n,ch)=>n+(ch.charCodeAt(0)<128?0.55:1),0);
const routeRe = /"(\/[^"]*)"\s*:\s*\{([\s\S]*?)\n\s*\},/g;

for (const m of src.matchAll(routeRe)) {
  const route=m[1], body=m[2];
  if(route==="/projects") continue;
  const lm=body.match(/"lines"\s*:\s*\[([\s\S]*?)\]/);
  if(!lm) continue;
  const items=lm[1].split(",").map(x=>x.trim()).filter(Boolean);
  const literals=items.map(x=>x.match(/^"([\s\S]*)"$/)?.[1]).filter(v=>v!==undefined);
  if(items.length>3) errors.push(route+": more than 3 title lines");
  if(items.length===3 && !allowedThree.has(route)) errors.push(route+": 3 lines not approved");
  for(const line of literals){
    if(line.includes("。")) errors.push(route+": H1 contains prohibited full stop");
    if(weighted(line)>15.2) errors.push(route+": title line too long ("+weighted(line).toFixed(2)+")");
  }
  if(literals.length===items.length && items.length>1 && weighted(literals.join(""))<=15.2){
    errors.push(route+": should be one line");
  }
}
if(!isGcsda){
  const ericBlock=src.match(/"\/eric-chuang"\s*:\s*\{([\s\S]*?)\n\s*\},/)?.[1]||"";
  if(!ericBlock.includes('"創辦人暨執行長｜莊鈞翔博士"')) errors.push("/eric-chuang exact founder CEO title missing");
  const ericPage=fs.readFileSync("src/pages/InstitutionalPages.tsx","utf8");
  if(!ericPage.includes('subtitle="STT Governance 創辦人暨執行長"')) errors.push("/eric-chuang formal subtitle mismatch");
  if(ericPage.includes('subtitle="STT Governance 創辦人暨治理總控者"')) errors.push("/eric-chuang obsolete formal subtitle remains");
  const block=src.match(/"\/engagement"\s*:\s*\{([\s\S]*?)\n\s*\},/)?.[1]||"";
  if(!block.includes('"image": "/visual-approved/bank-14.png"')) errors.push("/engagement approved hero missing");
  if(!fs.existsSync("public/visual-approved/bank-14.png")) errors.push("/engagement hero file missing");
  const css=fs.readFileSync("src/styles/cis-page-system.css","utf8");
  for(const token of ["top:180px!important","left:56px!important","font-size:48px!important","max-width:760px!important"]){
    if(!css.includes(token)) errors.push("STT title geometry token missing: "+token);
  }
} else {
  const css=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
  for(const token of ["top:164px!important","left:56px!important","font-size:48px!important","max-width:760px!important"]){
    if(!css.includes(token)) errors.push("GCSDA title geometry token missing: "+token);
  }
}
if(errors.length){
  console.error("PRESENTATION QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}


const bannedTerm="\u6cbb\u7406\u7e3d\u63a7\u8005";
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const p=dir+"/"+entry.name;
    return entry.isDirectory()?walk(p):[p];
  });
}
for(const file of walk("src").filter(p=>/\.(ts|tsx|js|jsx|json|css)$/.test(p))){
  const content=fs.readFileSync(file,"utf8");
  if(content.includes(bannedTerm)){
    console.error("PRESENTATION QA FAILED: prohibited legacy role wording in "+file);
    process.exit(1);
  }
}

/* PROFILE IDENTITY STACK QA — 2026-10-22 */
{
  const profile=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
  const page=fs.readFileSync("src/pages/InstitutionalPages.tsx","utf8");
  const css=fs.readFileSync("src/styles/cis-page-system.css","utf8");
  const blocked="治理"+"總控者";
  if(profile.chineseName!=="莊鈞翔博士") errors.push("profile Chinese name mismatch");
  if(profile.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("profile English name mismatch");
  if(!page.includes('kicker=""')) errors.push("profile kicker must be empty");
  const heroSource=fs.readFileSync("src/components/GovernedHero.tsx","utf8");
  if(!heroSource.includes('{kicker&&<p className="cis-kicker">{kicker}</p>}')) errors.push("empty profile kicker must not render");
  if(!src.includes('byline: AUTHOR_PROFILE.englishName')) errors.push("profile English byline binding missing");
  if(!page.includes('title="創辦人暨執行長｜莊鈞翔博士"')) errors.push("profile first line mismatch");
  if(!page.includes('subtitle="STT Governance 創辦人暨執行長"')) errors.push("profile third line mismatch");
  if(page.includes(blocked)) errors.push("blocked public wording remains");
  for(const token of ["white-space:nowrap!important","word-break:keep-all!important","width:760px!important"]){
    if(!css.includes(token)) errors.push("profile nowrap CSS missing "+token);
  }
}

if(errors.length){
  console.error("PROFILE IDENTITY QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",profileIdentityQA:"PASS",branch:isGcsda?"gcsda":"stt"}));
