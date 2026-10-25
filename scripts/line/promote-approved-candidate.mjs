import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const account=(process.argv[2]||"").toLowerCase();
if(!["stt","gcsda"].includes(account)){
  console.error("Usage: node scripts/line/promote-approved-candidate.mjs <stt|gcsda>");
  process.exit(2);
}

const requiredGate="WEBSITE_QA_PASS_BUILD_LOCKED";
if((process.env.LINE_RELEASE_GATE||"").trim()!==requiredGate){
  console.error("LINE_HOLD: WEBSITE gate is not open.");
  process.exit(3);
}
if((process.env.LINE_RELEASE_VISUAL_VERSION||"").trim()!=="20261026_LOCKED_DERIVATIVE"){
  console.error("LINE_HOLD: release visual version is not authorized.");
  process.exit(3);
}
const approvalKey=account==="stt"?"LINE_STT_VISUAL_APPROVAL":"LINE_GCSDA_VISUAL_APPROVAL";
if((process.env[approvalKey]||"").trim()!=="OWNER_APPROVED_20261026"){
  console.error("LINE_HOLD: explicit owner visual approval is required for "+account+".");
  process.exit(3);
}

const expectedHash={
  stt:"9842c42d45ad4c82492f0e104dcc0b180aba15809b41cf1ee0842a7f4e47872a",
  gcsda:"de51c70b72b3f5fa237ef60afe7daa0251d1e294d7e24c1a08d615ba764717c0"
}[account];

const root=process.cwd();
const src=path.join(root,"line","candidates",account+"-richmenu-20261026-owner-review.png");
const dst=path.join(root,"line","release",account+"-richmenu-20261026.png");

if(!fs.existsSync(src)){
  console.error("FILE_REQUIRED: "+src);
  process.exit(2);
}
const b=fs.readFileSync(src);
const sha=crypto.createHash("sha256").update(b).digest("hex");
if(sha!==expectedHash){
  console.error("LINE_HOLD: candidate hash drift for "+account);
  process.exit(3);
}
if(b.length>1024*1024){
  console.error("LINE_HOLD: candidate exceeds 1 MB");
  process.exit(3);
}
if(b.length<24||b[0]!==0x89||b.toString("ascii",1,4)!=="PNG"){
  console.error("LINE_HOLD: candidate is not PNG");
  process.exit(3);
}
const w=b.readUInt32BE(16),h=b.readUInt32BE(20);
if(w!==2500||h!==1686){
  console.error("LINE_HOLD: candidate dimensions must be 2500x1686");
  process.exit(3);
}
fs.copyFileSync(src,dst);
console.log(JSON.stringify({
  promoted:true,
  account,
  source:path.relative(root,src),
  destination:path.relative(root,dst),
  sha256:sha,
  bytes:b.length,
  releaseGate:requiredGate
}));
