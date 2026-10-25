import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const failures=[];
const notices=[];

function requireEnv(key, expected){
  const value=(process.env[key]||"").trim();
  if(!value){failures.push("SOURCE_REQUIRED: "+key);return ""}
  if(expected && value!==expected) failures.push(key+" must equal "+expected);
  return value;
}
function requireFile(p){
  const full=path.join(root,p);
  if(!fs.existsSync(full)){failures.push("FILE_REQUIRED: "+p);return null}
  return full;
}
function checkPng(p){
  const full=requireFile(p);
  if(!full) return;
  const b=fs.readFileSync(full);
  if(b.length>1024*1024) failures.push(p+" exceeds 1 MB");
  if(b.length<24||b[0]!==0x89||b.toString("ascii",1,4)!=="PNG") failures.push(p+" is not PNG");
  if(b.length>=24){
    const w=b.readUInt32BE(16),h=b.readUInt32BE(20);
    if(w!==2500||h!==1686) failures.push(p+" must be 2500x1686, got "+w+"x"+h);
  }
}
function checkJson(p){
  const full=requireFile(p);
  if(!full) return;
  try{
    const cfg=JSON.parse(fs.readFileSync(full,"utf8"));
    if(cfg?.size?.width!==2500||cfg?.size?.height!==1686) failures.push(p+" canvas mismatch");
    if(!Array.isArray(cfg?.areas)||cfg.areas.length!==6) failures.push(p+" must contain 6 areas");
  }catch(e){failures.push(p+" invalid JSON")}
}

requireEnv("LINE_RELEASE_GATE","WEBSITE_QA_PASS_BUILD_LOCKED");
requireEnv("LINE_RELEASE_VISUAL_VERSION","20261026_LOCKED_DERIVATIVE");
requireEnv("GCSDA_MEMBERSHIP_DELIVERY_GATE","RESOLVED");

for(const key of [
  "LINE_STT_CHANNEL_ACCESS_TOKEN",
  "LINE_STT_CHANNEL_SECRET",
  "LINE_STT_OWNER_USER_ID",
  "LINE_GCSDA_CHANNEL_ACCESS_TOKEN",
  "LINE_GCSDA_CHANNEL_SECRET",
  "LINE_GCSDA_OWNER_USER_ID"
]) requireEnv(key);

checkJson("line/release/stt-richmenu-20261026.json");
checkJson("line/release/gcsda-richmenu-20261026.json");
checkPng("line/release/stt-richmenu-20261026.png");
checkPng("line/release/gcsda-richmenu-20261026.png");

if(!failures.length){
  notices.push("WEBSITE gate confirmed");
  notices.push("both final PNGs present and dimension-checked");
  notices.push("both account credential sets present");
  notices.push("GCSDA membership delivery gate resolved");
}

if(failures.length){
  console.error("LINE_RELEASE_GATE_BLOCKED\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({lineReleaseGate:"PASS",notices}));
