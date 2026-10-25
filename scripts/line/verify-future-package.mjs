import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root=process.cwd();
const bounds=[{"x":0,"y":0,"width":833,"height":843},{"x":833,"y":0,"width":834,"height":843},{"x":1667,"y":0,"width":833,"height":843},{"x":0,"y":843,"width":833,"height":843},{"x":833,"y":843,"width":834,"height":843},{"x":1667,"y":843,"width":833,"height":843}];
const expected={
  stt:{name:"STT Governance｜治理入口｜20261026",chat:"治理入口",labels:["開始治理判讀","你正在面對什麼","STT 如何判讀","莊鈞翔博士","研究與出版","關於 STT"],uris:["https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu"]},
  gcsda:{name:"GCSDA｜學會入口｜20261026",chat:"學會入口",labels:["關於學會","創會理事長","會員與入會","活動與大會","知識與研究","章程與公告"],uris:["https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu"]}
};

const errors=[];
const candidateHashes={
  stt:"9842c42d45ad4c82492f0e104dcc0b180aba15809b41cf1ee0842a7f4e47872a",
  gcsda:"de51c70b72b3f5fa237ef60afe7daa0251d1e294d7e24c1a08d615ba764717c0"
};
function verifyCandidate(account){
  const p=path.join(root,"line","candidates",account+"-richmenu-20261026-owner-review.png");
  if(!fs.existsSync(p)){errors.push(account+": owner-review candidate missing");return;}
  const b=fs.readFileSync(p);
  if(b.length>1024*1024) errors.push(account+": candidate exceeds 1 MB");
  if(b.length<24||b[0]!==0x89||b.toString("ascii",1,4)!=="PNG"){errors.push(account+": candidate not PNG");return;}
  const w=b.readUInt32BE(16),h=b.readUInt32BE(20);
  if(w!==2500||h!==1686) errors.push(account+": candidate dimensions");
  const sha=crypto.createHash("sha256").update(b).digest("hex");
  if(sha!==candidateHashes[account]) errors.push(account+": candidate hash drift");
}
verifyCandidate("stt");
verifyCandidate("gcsda");
for(const account of ["stt","gcsda"]){
  const p=path.join(root,"line","release",account+"-richmenu-20261026.json");
  if(!fs.existsSync(p)){errors.push(account+": json missing");continue;}
  const cfg=JSON.parse(fs.readFileSync(p,"utf8"));
  const exp=expected[account];
  if(cfg?.size?.width!==2500||cfg?.size?.height!==1686) errors.push(account+": canvas");
  if(cfg?.name!==exp.name) errors.push(account+": name/version");
  if(cfg?.chatBarText!==exp.chat) errors.push(account+": chatBarText");
  if(!Array.isArray(cfg?.areas)||cfg.areas.length!==6){errors.push(account+": area count");continue;}
  for(let i=0;i<6;i++){
    const a=cfg.areas[i], b=bounds[i];
    if(a?.bounds?.x!==b.x||a?.bounds?.y!==b.y||a?.bounds?.width!==b.width||a?.bounds?.height!==b.height) errors.push(account+": bounds "+(i+1));
    if(a?.action?.type!=="uri") errors.push(account+": type "+(i+1));
    if(a?.action?.label!==exp.labels[i]) errors.push(account+": label "+(i+1));
    if(a?.action?.uri!==exp.uris[i]) errors.push(account+": uri "+(i+1));
  }
}
if(errors.length){
  console.error("LINE_FUTURE_PACKAGE_QA_FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({lineFuturePackageQA:"PASS",ownerReviewCandidates:"PINNED_AND_HASH_VERIFIED",releaseImages:"PENDING_OWNER_APPROVAL",liveRelease:"HOLD"}));
