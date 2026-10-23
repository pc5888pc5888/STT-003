import fs from "node:fs";

const source=fs.readFileSync("src/data/pagePresentation.ts","utf8");
const page=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
const css=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
const rules=[
  ["/",2],["/about",2],["/founder-chairman",1],["/governance",2],["/council",1],
  ["/membership",2],["/events",2],["/knowledge",2],["/charter",1],["/privacy",1]
];
const errors=[];
for(const [route,count] of rules){
  const start=source.indexOf('"'+route+'": {');
  const ls=source.indexOf('"lines": [',start);
  const le=source.indexOf(']',ls);
  const block=source.slice(ls,le+1);
  const lines=[...block.matchAll(/"([^"]*)"/g)].map(m=>m[1]).slice(1);
  if(lines.length!==count) errors.push(route+" line-count");
  if(lines.some(line=>line.includes("。"))) errors.push(route+" full-stop");
}
if(!source.includes('"創會理事長｜莊鈞翔博士"')) errors.push("founder exact title missing");
if(source.includes('"創辦人暨執行長｜莊鈞翔博士"')) errors.push("STT title leaked into GCSDA founder registry");
if(!source.includes('"byline": "CHUANG CHUN HSIANG Ph.D."')) errors.push("founder English byline missing");
if(!page.includes('title="創會理事長｜莊鈞翔博士"')) errors.push("founder page title mismatch");
if(!page.includes('subtitle="中華企業策略永續發展學會 創會理事長"')) errors.push("founder subtitle mismatch");
for(const token of ["top:164px!important","left:56px!important","font-size:48px!important","max-width:760px!important","PROFILE IDENTITY THREE-LINE LOCK","white-space:nowrap!important","text-wrap:nowrap!important"]){
  if(!css.includes(token)) errors.push("geometry/identity "+token);
}

const founderPage=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
const author=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
if(author.chineseName!=="莊鈞翔博士") errors.push("founder Chinese name mismatch");
if(author.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("founder English name mismatch");
for(const token of [
  'title="創會理事長｜莊鈞翔博士"',
  'subtitle="中華企業策略永續發展學會 創會理事長"',
  '本章節僅臚列與本學會「創會宗旨、學術脈絡及核心治理」直接關聯之代表性資歷',
  '治理、策略與永續：長期問題的動態多面體',
  '相關專業訓練課程均通過 <strong>TÜV Rheinland（德國萊因）</strong>之嚴謹審查與認證'
]){
  if(!founderPage.includes(token)) errors.push("founder page required content missing");
}
if(!source.includes('"byline": "CHUANG CHUN HSIANG Ph.D."')) errors.push("founder byline mismatch");
if(!css.includes("white-space:nowrap!important")) errors.push("founder nowrap lock missing");

if(errors.length){
  console.error("PRESENTATION QA FAILED: "+errors.join(", "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",branch:"gcsda"}));
