import fs from "node:fs";

const src=fs.readFileSync("src/data/pagePresentation.ts","utf8");
const page=fs.readFileSync("src/pages/InstitutionalPages.tsx","utf8");
const css=fs.readFileSync("src/styles/cis-page-system.css","utf8");
const hero=fs.readFileSync("src/components/GovernedHero.tsx","utf8");
const profile=JSON.parse(fs.readFileSync("src/data/authorProfile.json","utf8"));
const errors=[];
const allowedThree=new Set(["/about"]);
const weighted=s=>[...s].reduce((n,ch)=>n+(ch.charCodeAt(0)<128?0.55:1),0);
const routeRe=/"(\/[^"]*)"\s*:\s*\{([\s\S]*?)\n\s*\},/g;

for(const m of src.matchAll(routeRe)){
  const route=m[1],body=m[2];
  if(route==="/projects") continue;
  const lm=body.match(/"lines"\s*:\s*\[([\s\S]*?)\]/);
  if(!lm) continue;
  const items=lm[1].split(",").map(x=>x.trim()).filter(Boolean);
  const literals=items.map(x=>x.match(/^"([\s\S]*)"$/)?.[1]).filter(v=>v!==undefined);
  if(items.length>3) errors.push(route+": more than 3 title lines");
  if(items.length===3&&!allowedThree.has(route)) errors.push(route+": 3 lines not approved");
  for(const line of literals){
    if(line.includes("。")) errors.push(route+": H1 full-stop");
    if(weighted(line)>15.2) errors.push(route+": title line too long");
  }
  if(literals.length===items.length&&items.length>1&&weighted(literals.join(""))<=15.2){
    errors.push(route+": should be one line");
  }
}

const eric=src.match(/"\/eric-chuang"\s*:\s*\{([\s\S]*?)\n\s*\},/)?.[1]||"";
if(!eric.includes('"創辦人暨執行長｜莊鈞翔博士"')) errors.push("founder exact title missing");
if(!eric.includes("AUTHOR_PROFILE.englishName")) errors.push("English byline binding missing");
if(profile.chineseName!=="莊鈞翔博士") errors.push("Chinese name mismatch");
if(profile.englishName!=="CHUANG CHUN HSIANG Ph.D.") errors.push("English name mismatch");
for(const token of [
  'kicker=""',
  'title="創辦人暨執行長｜莊鈞翔博士"',
  'subtitle="STT Governance 創辦人暨執行長"',
  '治理判讀，是重新定義問題的頂層架構',
  'Claude 技術實務',
  'AI 素養與教育脈絡',
  '智能代理與模型協定',
  'Google 教育應用認證'
]){
  if(!page.includes(token)) errors.push("Eric required content missing: "+token);
}
if(!hero.includes('{kicker&&<p className="cis-kicker">{kicker}</p>}')) errors.push("empty kicker suppression missing");

const engagement=src.match(/"\/engagement"\s*:\s*\{([\s\S]*?)\n\s*\},/)?.[1]||"";
if(!engagement.includes('"image": "/visual-approved/bank-14.png"')) errors.push("engagement hero missing");
if(!fs.existsSync("public/visual-approved/bank-14.png")) errors.push("engagement hero file missing");

for(const token of [
  "top:180px!important",
  "left:56px!important",
  "font-size:48px!important",
  "width:760px!important",
  "PROFILE IDENTITY THREE-LINE LOCK",
  "white-space:nowrap!important",
  "text-wrap:nowrap!important",
  "word-break:keep-all!important"
]){
  if(!css.includes(token)) errors.push("profile/title CSS missing "+token);
}

const banned="\u6cbb\u7406\u7e3d\u63a7\u8005";
function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const p=dir+"/"+entry.name;
    return entry.isDirectory()?walk(p):[p];
  });
}
for(const file of walk("src").filter(p=>/\.(ts|tsx|js|jsx|json|css)$/.test(p))){
  if(fs.readFileSync(file,"utf8").includes(banned)) errors.push("prohibited legacy wording in "+file);
}

if(errors.length){
  console.error("PRESENTATION QA FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({presentationQA:"PASS",profileIdentityQA:"PASS",branch:"stt"}));
