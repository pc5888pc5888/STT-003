import fs from "node:fs";

const source=fs.readFileSync("src/data/pagePresentation.ts","utf8");
const css=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
const rules=[
  ["/",2],["/about",2],["/founder-chairman",1],["/governance",2],["/council",1],
  ["/membership",2],["/events",2],["/knowledge",2],["/charter",1],["/privacy",1]
];
const errors=[];
const gcsdaPage=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
if(!source.includes('"創會理事長｜莊鈞翔博士"')) errors.push("/founder-chairman exact title");
if(!gcsdaPage.includes('title="創會理事長｜莊鈞翔博士"')) errors.push("FounderChairman title mismatch");
if(!gcsdaPage.includes('subtitle="中華企業策略永續發展學會 創會理事長"')) errors.push("FounderChairman subtitle mismatch");
if(gcsdaPage.includes('title="創辦人暨執行長｜莊鈞翔博士"')) errors.push("STT title leaked into GCSDA founder hero");
for(const [route,count] of rules){
  const start=source.indexOf('"'+route+'": {');
  const ls=source.indexOf('"lines": [',start);
  const le=source.indexOf(']',ls);
  const block=source.slice(ls,le+1);
  const lines=[...block.matchAll(/"([^"]*)"/g)].map(m=>m[1]).slice(1);
  if(lines.length!==count) errors.push(route+" line-count");
  if(lines.some(line=>line.includes("。"))) errors.push(route+" full-stop");
}
for(const token of ["top:164px!important","left:56px!important","font-size:48px!important","max-width:760px!important"]){
  if(!css.includes(token)) errors.push("geometry "+token);
}
if(errors.length){
  console.error("PRESENTATION QA FAILED: "+errors.join(", "));
  process.exit(1);
}


const profile=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
if(profile.chineseName!=="莊鈞翔博士"){
  console.error("PRESENTATION QA FAILED: founder name spacing mismatch");
  process.exit(1);
}
const pageSource=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
if(!pageSource.includes('title="創辦人暨執行長｜莊鈞翔博士"')){
  console.error("PRESENTATION QA FAILED: profile title mismatch");
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
  const pageSource=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
  const presentation=fs.readFileSync("src/data/pagePresentation.ts","utf8");
  const heroCss=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
  const blocked="治理"+"總控者";
  if(profile.chineseName!=="莊鈞翔博士") errors.push("GCSDA profile Chinese name mismatch");
  if(profile.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("GCSDA profile English name mismatch");
  if(!pageSource.includes('eyebrow=""')) errors.push("GCSDA profile kicker must be empty");
  if(!pageSource.includes('title="創辦人暨執行長｜莊鈞翔博士"')) errors.push("GCSDA profile first line mismatch");
  if(!pageSource.includes('subtitle="STT Governance 創辦人暨執行長"')) errors.push("GCSDA profile third line mismatch");
  if(!presentation.includes('"byline": "CHUANG CHUN HSIANG Ph.D."')) errors.push("GCSDA profile byline mismatch");
  if(pageSource.includes(blocked)) errors.push("blocked public wording remains");
  for(const token of ["white-space:nowrap!important","word-break:keep-all!important","width:760px!important"]){
    if(!heroCss.includes(token)) errors.push("GCSDA profile nowrap CSS missing "+token);
  }
}
if(errors.length){
  console.error("PROFILE IDENTITY QA FAILED: "+errors.join(", "));
  process.exit(1);
}

if(errors.length){
  console.error("PROFILE IDENTITY QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",profileIdentityQA:"PASS",branch:"gcsda"}));
