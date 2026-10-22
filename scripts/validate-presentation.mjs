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
console.log(JSON.stringify({presentationQA:"PASS",branch:isGcsda?"gcsda":"stt"}));
