import fs from "node:fs";
const errors=[];
const status=JSON.parse(fs.readFileSync("line/prep/line-oa-progress-20261026.json","utf8"));
const lock=JSON.parse(fs.readFileSync("line/prep/line-oa-copy-lock-20261026.json","utf8"));
const website=fs.readFileSync("docs/governance/WEBSITE-BUILD-LOCK-20261025.md","utf8");
if(status.version!=="20261026_ACTIVE_BUILD_PROGRESS_V1") errors.push("version");
if(status.phase!=="ACTIVE_BUILD"||status.liveRelease!=="HOLD") errors.push("phase");
if(!website.includes("WEBSITE_STATUS = BUILD_LOCKED")||!website.includes("QA_STATUS = PASS")) errors.push("website gate");
if(lock.status!=="ACTIVE_BUILD"||lock.websiteGateStatus!=="PASS") errors.push("lock phase");
const ws=Array.isArray(status.workstreams)?status.workstreams:[];
const passed=ws.filter(x=>x.status==="PASS").length;
if(ws.length!==9||passed!==4||status.completedWorkstreams!==4||status.totalWorkstreams!==9||status.percent!==44) errors.push("workstream math");
if(errors.length){console.error("LINE_PROGRESS_FAILED\n- "+errors.join("\n- "));process.exit(1)}
console.log(JSON.stringify({linePhase:"ACTIVE_BUILD",prepPackage:"100%",activeBuild:"4/9",activeBuildPercent:44,liveRelease:"HOLD"}));
