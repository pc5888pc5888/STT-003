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
if(errors.length){
  console.error("PRESENTATION QA FAILED: "+errors.join(", "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",branch:"gcsda"}));
