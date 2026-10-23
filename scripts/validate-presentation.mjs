import fs from "node:fs";

const source=fs.readFileSync("src/data/pagePresentation.ts","utf8");
const page=fs.readFileSync("src/GCSDAStandaloneV3.tsx","utf8");
const css=fs.readFileSync("src/styles/gcsda-hero-repair.css","utf8");
const author=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
const errors=[];

const rules=[
  ["/",2],["/about",2],["/founder-chairman",1],["/governance",2],["/council",1],
  ["/membership",2],["/events",2],["/knowledge",2],["/charter",1],["/privacy",1]
];
for(const [route,count] of rules){
  const start=source.indexOf('"'+route+'": {');
  const ls=source.indexOf('"lines": [',start);
  const le=source.indexOf(']',ls);
  const block=source.slice(ls,le+1);
  const lines=[...block.matchAll(/"([^"]*)"/g)].map(m=>m[1]).slice(1);
  if(lines.length!==count) errors.push(route+" line-count");
  if(lines.some(line=>line.includes("。"))) errors.push(route+" full-stop");
}

for(const token of [
  '"創會理事長｜莊鈞翔博士"',
  '"byline": "CHUANG CHUN HSIANG Ph.D."'
]) if(!source.includes(token)) errors.push("founder registry "+token);

for(const token of [
  'eyebrow=""',
  'title="創會理事長｜莊鈞翔博士"',
  'subtitle="中華企業策略永續發展學會 創會理事長"',
  '本章節僅臚列與本學會「創會宗旨、學術脈絡及核心治理」直接關聯之代表性資歷',
  '治理、策略與永續：長期問題的動態多面體',
  '21 項 Anthropic AI / Claude 核心技術學程'
]) if(!page.includes(token)) errors.push("founder page "+token);

for(const token of [
  "top:181px!important",
  "left:56px!important",
  "font-size:48px!important",
  "max-width:760px!important",
  "height:83px!important",
  "padding:89px 24px 42px!important",
  "white-space:nowrap!important"
]) if(!css.includes(token)) errors.push("geometry "+token);

if(author.chineseName!=="莊鈞翔博士") errors.push("founder Chinese name");
if(author.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("founder English name");

if(errors.length){
  console.error("PRESENTATION QA FAILED: "+errors.join(", "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",branch:"gcsda",renderBaseline:"2026-10-24"}));
