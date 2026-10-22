import fs from "node:fs";

const presentation=fs.readFileSync("src/data/pagePresentation.ts","utf8");
const pageSource=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
const profile=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
const css=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
const errors=[];

const rules=[
  ["/",2],["/about",2],["/founder-chairman",1],["/governance",2],["/council",1],
  ["/membership",2],["/events",2],["/knowledge",2],["/charter",1],["/privacy",1]
];

for(const [route,count] of rules){
  const start=presentation.indexOf('"'+route+'": {');
  const ls=presentation.indexOf('"lines": [',start);
  const le=presentation.indexOf(']',ls);
  const block=presentation.slice(ls,le+1);
  const lines=[...block.matchAll(/"([^"]*)"/g)].map(m=>m[1]).slice(1);
  if(lines.length!==count) errors.push(route+" line-count");
  if(lines.some(line=>line.includes("。"))) errors.push(route+" full-stop");
}

if(profile.chineseName!=="莊鈞翔博士") errors.push("profile Chinese name");
if(profile.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("profile English name");

if(!presentation.includes('"創辦人暨執行長｜莊鈞翔博士"')) errors.push("founder presentation title");
if(!presentation.includes('"byline": "CHUANG CHUN HSIANG Ph.D."')) errors.push("founder byline");
if(!pageSource.includes('title="創辦人暨執行長｜莊鈞翔博士"')) errors.push("FounderChairman title");
if(!pageSource.includes('subtitle="STT Governance 創辦人暨執行長"')) errors.push("FounderChairman subtitle");
const heroSource=fs.readFileSync("src/components/GovernedHero.tsx","utf8");
if(!heroSource.includes('{kicker && <p className="cis-kicker">{kicker}</p>}')) errors.push("empty profile kicker must not render");

for(const token of [
  "top:164px!important",
  "left:56px!important",
  "font-size:48px!important",
  "max-width:760px!important",
  "white-space:nowrap!important",
  "word-break:keep-all!important"
]){
  if(!css.includes(token)) errors.push("profile geometry "+token);
}

const blocked="\u6cbb\u7406"+"\u7e3d\u63a7\u8005";
for(const file of ["src/GCSDAStandaloneV3.tsx","src/data/pagePresentation.ts","src/data/authorProfile.json"]){
  if(fs.readFileSync(file,"utf8").includes(blocked)) errors.push("blocked wording in "+file);
}

if(errors.length){
  console.error("PRESENTATION QA FAILED: "+errors.join(", "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",profileIdentityQA:"PASS",branch:"gcsda"}));
