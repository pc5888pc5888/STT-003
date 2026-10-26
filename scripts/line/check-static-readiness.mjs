import fs from "node:fs";
import crypto from "node:crypto";

const failures=[];
const notices=[];
const root=process.cwd();

function read(p){return fs.readFileSync(p,"utf8")}
function requireText(p,needle,label){
  if(!fs.existsSync(p)){failures.push("FILE_REQUIRED: "+p);return}
  if(!read(p).includes(needle)) failures.push(label||p+" missing "+needle);
}
function pngInfo(p){
  if(!fs.existsSync(p)){failures.push("FILE_REQUIRED: "+p);return null}
  const b=fs.readFileSync(p);
  if(b.length<24||b[0]!==0x89||b.toString("ascii",1,4)!=="PNG"){failures.push(p+" invalid PNG");return null}
  return {bytes:b.length,width:b.readUInt32BE(16),height:b.readUInt32BE(20),sha256:crypto.createHash("sha256").update(b).digest("hex")}
}
function checkJson(p,expected){
  if(!fs.existsSync(p)){failures.push("FILE_REQUIRED: "+p);return}
  let cfg;try{cfg=JSON.parse(read(p))}catch{failures.push(p+" invalid JSON");return}
  if(cfg?.size?.width!==2500||cfg?.size?.height!==1686) failures.push(p+" canvas mismatch");
  if(!Array.isArray(cfg?.areas)||cfg.areas.length!==6){failures.push(p+" must contain six areas");return}
  const bounds=[{x:0,y:0,width:833,height:843},{x:833,y:0,width:834,height:843},{x:1667,y:0,width:833,height:843},{x:0,y:843,width:833,height:843},{x:833,y:843,width:834,height:843},{x:1667,y:843,width:833,height:843}];
  for(let i=0;i<6;i++){
    const a=cfg.areas[i],b=bounds[i];
    if(!a||a.bounds?.x!==b.x||a.bounds?.y!==b.y||a.bounds?.width!==b.width||a.bounds?.height!==b.height) failures.push(p+" cell "+(i+1)+" bounds");
    if(a?.action?.type!=="uri") failures.push(p+" cell "+(i+1)+" type");
    if(a?.action?.label!==expected.labels[i]) failures.push(p+" cell "+(i+1)+" label");
    if(a?.action?.uri!==expected.uris[i]) failures.push(p+" cell "+(i+1)+" uri");
  }
}

requireText("docs/governance/WEBSITE-BUILD-LOCK-20261025.md","WEBSITE_STATUS = BUILD_LOCKED","website build lock missing");
requireText("docs/governance/WEBSITE-BUILD-LOCK-20261025.md","QA_STATUS = PASS","website QA pass missing");
requireText("docs/line/LINE-OA-RELEASE-RUNBOOK-20261026.md","創辦人暨執行長｜莊鈞翔博士","STT founder identity drift");
requireText("docs/line/LINE-OA-RELEASE-RUNBOOK-20261026.md","創會理事長｜莊鈞翔博士","GCSDA founder identity drift");

const candidates={
 stt:{path:"line/candidates/stt-richmenu-20261026-owner-review.png",sha:"9842c42d45ad4c82492f0e104dcc0b180aba15809b41cf1ee0842a7f4e47872a",bytes:996634},
 gcsda:{path:"line/candidates/gcsda-richmenu-20261026-owner-review.png",sha:"de51c70b72b3f5fa237ef60afe7daa0251d1e294d7e24c1a08d615ba764717c0",bytes:936460}
};
for(const [account,c] of Object.entries(candidates)){
  const info=pngInfo(c.path); if(!info) continue;
  if(info.width!==2500||info.height!==1686) failures.push(account+" candidate dimensions");
  if(info.bytes!==c.bytes) failures.push(account+" candidate bytes drift");
  if(info.sha256!==c.sha) failures.push(account+" candidate hash drift");
  if(info.bytes>1024*1024) failures.push(account+" candidate exceeds 1 MB");
}

checkJson("line/release/stt-richmenu-20261026.json",{
 labels:["開始治理判讀","你正在面對什麼","STT 如何判讀","莊鈞翔博士","研究與出版","關於 STT"],
 uris:[
 "https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu",
 "https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu",
 "https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu",
 "https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu",
 "https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu",
 "https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu"]
});
checkJson("line/release/gcsda-richmenu-20261026.json",{
 labels:["關於學會","創會理事長","會員與入會","活動與大會","知識與研究","章程與公告"],
 uris:[
 "https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu",
 "https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu",
 "https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu",
 "https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu",
 "https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu",
 "https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu"]
});

const manifest=JSON.parse(read("line/candidates/manifest-20261026.json"));
for(const account of ["stt","gcsda"]){
  if(manifest?.candidates?.[account]?.approval!=="PENDING_OWNER_VISUAL_APPROVAL") failures.push(account+" manifest approval state unexpected");
}

const releasePngs=["line/release/stt-richmenu-20261026.png","line/release/gcsda-richmenu-20261026.png"];
for(const p of releasePngs){
  if(fs.existsSync(p)) failures.push("UNAUTHORIZED_RELEASE_FILE_PRESENT: "+p);
}

notices.push("WEBSITE_BUILD_LOCK=PASS");
notices.push("STATIC_LINE_PACKAGE=READY");
notices.push("OWNER_VISUAL_APPROVAL=PENDING");
notices.push("LIVE_RELEASE=HOLD");

if(failures.length){
  console.error("LINE_STATIC_READINESS_FAILED\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({lineStaticReadiness:"PASS",notices}));
