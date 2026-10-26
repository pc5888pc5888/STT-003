import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const account=(process.argv[2]||"").toLowerCase();
if(!["stt","gcsda"].includes(account)){console.error("Usage: node scripts/line/promote-approved-candidate.mjs <stt|gcsda>");process.exit(2)}
const websitePath=path.join(process.cwd(),"docs","governance","WEBSITE-BUILD-LOCK-20261025.md");
if(!fs.existsSync(websitePath)){console.error("LINE_HOLD: website BUILD_LOCK evidence missing.");process.exit(3)}
const website=fs.readFileSync(websitePath,"utf8");
if(!website.includes("WEBSITE_STATUS = BUILD_LOCKED")||!website.includes("QA_STATUS = PASS")){console.error("LINE_HOLD: website gate invalid.");process.exit(3)}
if((process.env.LINE_RELEASE_GATE||"").trim()!=="WEBSITE_QA_PASS_BUILD_LOCKED"){console.error("LINE_HOLD: release gate not supplied.");process.exit(3)}
if((process.env.LINE_RELEASE_VISUAL_VERSION||"").trim()!=="20261026_LOCKED_DERIVATIVE"){console.error("LINE_HOLD: release visual version not authorized.");process.exit(3)}
const approvalKey=account==="stt"?"LINE_STT_VISUAL_APPROVAL":"LINE_GCSDA_VISUAL_APPROVAL";
if((process.env[approvalKey]||"").trim()!=="OWNER_APPROVED_20261026"){console.error("LINE_HOLD: explicit owner visual approval required for "+account+".");process.exit(3)}
const expected={stt:"9842c42d45ad4c82492f0e104dcc0b180aba15809b41cf1ee0842a7f4e47872a",gcsda:"de51c70b72b3f5fa237ef60afe7daa0251d1e294d7e24c1a08d615ba764717c0"}[account];
const src=path.join(process.cwd(),"line","candidates",account+"-richmenu-20261026-owner-review.png");
const dst=path.join(process.cwd(),"line","release",account+"-richmenu-20261026.png");
if(!fs.existsSync(src)){console.error("FILE_REQUIRED: "+src);process.exit(2)}
const b=fs.readFileSync(src),sha=crypto.createHash("sha256").update(b).digest("hex");
if(sha!==expected||b.length>1024*1024||b.length<24||b[0]!==0x89||b.toString("ascii",1,4)!=="PNG"||b.readUInt32BE(16)!==2500||b.readUInt32BE(20)!==1686){console.error("LINE_HOLD: candidate integrity check failed for "+account);process.exit(3)}
fs.copyFileSync(src,dst);
console.log(JSON.stringify({promoted:true,account,sha256:sha,bytes:b.length}));
