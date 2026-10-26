import fs from "node:fs";

const errors=[];
const lockPath="line/prep/line-oa-copy-lock-20261026.json";
const websiteLockPath="docs/governance/WEBSITE-BUILD-LOCK-20261025.md";
const progressPath="line/prep/line-oa-progress-20261026.json";
for(const p of [lockPath,websiteLockPath,progressPath]){
  if(!fs.existsSync(p)) errors.push("FILE_REQUIRED: "+p);
}
if(errors.length){console.error("LINE_PREP_LOCK_FAILED\n- "+errors.join("\n- "));process.exit(1)}

const lock=JSON.parse(fs.readFileSync(lockPath,"utf8"));
const website=fs.readFileSync(websiteLockPath,"utf8");
const progress=JSON.parse(fs.readFileSync(progressPath,"utf8"));
if(lock.version!=="20261026_ACTIVE_BUILD_LOCK_V2") errors.push("copy-lock version");
if(lock.status!=="ACTIVE_BUILD") errors.push("status");
if(lock.liveRelease!=="HOLD") errors.push("live release");
if(lock.websiteGateStatus!=="PASS") errors.push("website gate");
if(!website.includes("WEBSITE_STATUS = BUILD_LOCKED")) errors.push("website BUILD_LOCKED evidence");
if(!website.includes("QA_STATUS = PASS")) errors.push("website QA PASS evidence");
if(progress.phase!=="ACTIVE_BUILD"||progress.completedWorkstreams!==4||progress.totalWorkstreams!==9||progress.percent!==44) errors.push("progress state");

const expected={
 stt:{id:"@783xkknh",founder:"創辦人暨執行長｜莊鈞翔博士",english:"CHUANG CHUN HSIANG Ph.D.",institution:"STT Governance 創辦人暨執行長",json:"line/release/stt-richmenu-20261026.json"},
 gcsda:{id:"@387nbnjs",founder:"創會理事長｜莊鈞翔博士",english:"CHUANG CHUN HSIANG Ph.D.",institution:"中華企業策略永續發展學會｜創會理事長",json:"line/release/gcsda-richmenu-20261026.json"}
};
for(const account of ["stt","gcsda"]){
 const v=lock[account],e=expected[account];
 if(v.officialAccountId!==e.id) errors.push(account+" OA id");
 if(v.founderIdentity!==e.founder) errors.push(account+" founder identity");
 if(v.englishName!==e.english) errors.push(account+" English name");
 if(v.institutionLine!==e.institution) errors.push(account+" institution line");
 const cfg=JSON.parse(fs.readFileSync(e.json,"utf8"));
 if(!Array.isArray(v.richMenu)||v.richMenu.length!==6) errors.push(account+" rich menu count");
 for(let i=0;i<6;i++){
  if(v.richMenu?.[i]?.[0]!==cfg.areas[i]?.action?.label) errors.push(account+" label "+(i+1));
  if(v.richMenu?.[i]?.[1]!==cfg.areas[i]?.action?.uri) errors.push(account+" uri "+(i+1));
 }
}
if(lock.automation?.mode!=="DETERMINISTIC_ROUTING_ONLY") errors.push("automation mode");
if(errors.length){console.error("LINE_PREP_LOCK_FAILED\n- "+errors.join("\n- "));process.exit(1)}
console.log(JSON.stringify({linePrepLock:"PASS",phase:"ACTIVE_BUILD",websiteGate:"PASS",activeBuildProgress:"4/9",liveRelease:"HOLD"}));
