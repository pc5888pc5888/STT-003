import fs from "node:fs";

const errors=[];
const lockPath="line/prep/line-oa-copy-lock-20261026.json";
if(!fs.existsSync(lockPath)){
  console.error("LINE_PREP_LOCK_FAILED\n- copy lock missing");
  process.exit(1);
}
const lock=JSON.parse(fs.readFileSync(lockPath,"utf8"));
if(lock.version!=="20261026_PREP_LOCK_V1") errors.push("copy-lock version");
if(lock.status!=="FUTURE_PHASE_PREP") errors.push("status");
if(lock.liveRelease!=="HOLD") errors.push("live release must remain HOLD");

const expected={
  stt:{
    id:"@783xkknh",
    founder:"創辦人暨執行長｜莊鈞翔博士",
    english:"CHUANG CHUN HSIANG Ph.D.",
    institution:"STT Governance 創辦人暨執行長",
    json:"line/release/stt-richmenu-20261026.json"
  },
  gcsda:{
    id:"@387nbnjs",
    founder:"創會理事長｜莊鈞翔博士",
    english:"CHUANG CHUN HSIANG Ph.D.",
    institution:"中華企業策略永續發展學會｜創會理事長",
    json:"line/release/gcsda-richmenu-20261026.json"
  }
};

for(const account of ["stt","gcsda"]){
  const v=lock[account],e=expected[account];
  if(v.officialAccountId!==e.id) errors.push(account+" OA id");
  if(v.founderIdentity!==e.founder) errors.push(account+" founder identity");
  if(v.englishName!==e.english) errors.push(account+" English name");
  if(v.institutionLine!==e.institution) errors.push(account+" institution line");
  if(!Array.isArray(v.richMenu)||v.richMenu.length!==6) errors.push(account+" rich-menu count");
  const cfg=JSON.parse(fs.readFileSync(e.json,"utf8"));
  const labels=cfg.areas.map(x=>x.action.label);
  const uris=cfg.areas.map(x=>x.action.uri);
  for(let i=0;i<6;i++){
    if(v.richMenu?.[i]?.[0]!==labels[i]) errors.push(account+" label "+(i+1));
    if(v.richMenu?.[i]?.[1]!==uris[i]) errors.push(account+" uri "+(i+1));
  }
}

if(lock.automation?.mode!=="DETERMINISTIC_ROUTING_ONLY") errors.push("automation mode");

const sttPublic=lock.stt.welcome+"\n"+lock.stt.defaultReply;
const gPublic=lock.gcsda.welcome+"\n"+lock.gcsda.defaultReply;
for(const phrase of ["免費諮詢","立即預約","作者招募","出書招募","熱門方案","立即購買"]){
  if(sttPublic.includes(phrase)) errors.push("STT forbidden public phrase: "+phrase);
  if(gPublic.includes(phrase)) errors.push("GCSDA forbidden public phrase: "+phrase);
}
if(!sttPublic.includes("正式入口以 STT Governance 官網為準")) errors.push("STT website-source boundary");
if(!gPublic.includes("請勿以 LINE 訊息取代正式入會申請")) errors.push("GCSDA membership boundary");

if(errors.length){
  console.error("LINE_PREP_LOCK_FAILED\n- "+errors.join("\n- "));
  process.exit(1);
}
console.log(JSON.stringify({
  linePrepLock:"PASS",
  copyLock:lock.version,
  accounts:["stt","gcsda"],
  liveRelease:"HOLD"
}));
