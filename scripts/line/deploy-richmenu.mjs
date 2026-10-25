import fs from "node:fs";
import path from "node:path";

const account=(process.argv[2]||"").toLowerCase();
if(!["stt","gcsda"].includes(account)){
  console.error("Usage: node scripts/line/deploy-richmenu.mjs <stt|gcsda>");
  process.exit(2);
}

/*
  RELEASE HARD GATE — 2026-10-26

  Current project phase keeps LINE Official Account live construction on HOLD.
  This script must fail closed unless a later, explicit website BUILD_LOCK / QA_PASS
  release process supplies the exact gate value below.
*/
const releaseGate=(process.env.LINE_RELEASE_GATE||"").trim();
if(releaseGate!=="WEBSITE_QA_PASS_BUILD_LOCKED"){
  console.error("LINE_HOLD: live rich-menu deployment is blocked until WEBSITE_QA_PASS_BUILD_LOCKED is explicitly supplied.");
  process.exit(3);
}

const releaseVisualVersion=(process.env.LINE_RELEASE_VISUAL_VERSION||"").trim();
if(releaseVisualVersion!=="20261026_LOCKED_DERIVATIVE"){
  console.error("LINE_HOLD: final rich-menu derivative is not authorized. Required LINE_RELEASE_VISUAL_VERSION=20261026_LOCKED_DERIVATIVE.");
  process.exit(3);
}

const tokenKey=account==="stt"?"LINE_STT_CHANNEL_ACCESS_TOKEN":"LINE_GCSDA_CHANNEL_ACCESS_TOKEN";
const token=process.env[tokenKey]?.trim();
if(!token){
  console.error("SOURCE_REQUIRED: "+tokenKey);
  process.exit(2);
}

const root=process.cwd();
const configPath=path.join(root,"line","release",account+"-richmenu-20261026.json");
const imagePath=path.join(root,"line","release",account+"-richmenu-20261026.png");

if(!fs.existsSync(configPath)){
  console.error("SOURCE_REQUIRED: final governed action map missing: "+configPath);
  process.exit(2);
}
if(!fs.existsSync(imagePath)){
  console.error("SOURCE_REQUIRED: final owner-approved locked derivative missing: "+imagePath);
  process.exit(2);
}

const config=JSON.parse(fs.readFileSync(configPath,"utf8"));
const image=fs.readFileSync(imagePath);

const expectedBounds=[{"x":0,"y":0,"width":833,"height":843},{"x":833,"y":0,"width":834,"height":843},{"x":1667,"y":0,"width":833,"height":843},{"x":0,"y":843,"width":833,"height":843},{"x":833,"y":843,"width":834,"height":843},{"x":1667,"y":843,"width":833,"height":843}];
const expectedByAccount={
  stt:{
    labels:["開始治理判讀","你正在面對什麼","STT 如何判讀","莊鈞翔博士","研究與出版","關於 STT"],
    uris:["https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu","https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu"]
  },
  gcsda:{
    labels:["關於學會","創會理事長","會員與入會","活動與大會","知識與研究","章程與公告"],
    uris:["https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu","https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu"]
  }
};

function sameBounds(a,b){
  return a?.x===b.x&&a?.y===b.y&&a?.width===b.width&&a?.height===b.height;
}
function releaseFail(message){
  throw new Error("RICHMENU_RELEASE_QA: "+message);
}

if(config?.size?.width!==2500||config?.size?.height!==1686){
  releaseFail("canvas must be exactly 2500x1686");
}
if(!Array.isArray(config?.areas)||config.areas.length!==6){
  releaseFail("exactly six action areas are required");
}
const expected=expectedByAccount[account];
for(let i=0;i<6;i++){
  const area=config.areas[i];
  if(!sameBounds(area?.bounds,expectedBounds[i])){
    releaseFail("cell "+(i+1)+" bounds mismatch");
  }
  if(area?.action?.type!=="uri"){
    releaseFail("cell "+(i+1)+" action must be uri");
  }
  if(area?.action?.label!==expected.labels[i]){
    releaseFail("cell "+(i+1)+" label mismatch");
  }
  if(area?.action?.uri!==expected.uris[i]){
    releaseFail("cell "+(i+1)+" uri mismatch");
  }
}

if(image.length>1024*1024){
  releaseFail("image exceeds LINE 1 MB limit");
}
if(image.length<24||image[0]!==0x89||image.toString("ascii",1,4)!=="PNG"){
  releaseFail("release image must be PNG");
}
const pngWidth=image.readUInt32BE(16);
const pngHeight=image.readUInt32BE(20);
if(pngWidth!==2500||pngHeight!==1686){
  releaseFail("PNG dimensions must be exactly 2500x1686");
}

const api="https://api.line.me";
const auth={Authorization:"Bearer "+token,"Content-Type":"application/json"};

const validate=await fetch(api+"/v2/bot/richmenu/validate",{
  method:"POST",
  headers:auth,
  body:JSON.stringify(config)
});
if(!validate.ok){
  throw new Error("Rich menu validation failed: "+validate.status+" "+await validate.text());
}

const create=await fetch(api+"/v2/bot/richmenu",{
  method:"POST",
  headers:auth,
  body:JSON.stringify(config)
});
const created=await create.json().catch(()=>({}));
if(!create.ok||!created.richMenuId){
  throw new Error("Rich menu creation failed: "+create.status+" "+JSON.stringify(created));
}

const id=created.richMenuId;
const upload=await fetch("https://api-data.line.me/v2/bot/richmenu/"+id+"/content",{
  method:"POST",
  headers:{Authorization:"Bearer "+token,"Content-Type":"image/png"},
  body:image
});
if(!upload.ok){
  throw new Error("Rich menu upload failed: "+upload.status+" "+await upload.text());
}

const setDefault=await fetch(api+"/v2/bot/user/all/richmenu/"+id,{
  method:"POST",
  headers:{Authorization:"Bearer "+token}
});
if(!setDefault.ok){
  throw new Error("Set default rich menu failed: "+setDefault.status+" "+await setDefault.text());
}

console.log(JSON.stringify({
  ok:true,
  account,
  richMenuId:id,
  imageBytes:image.length,
  releaseGate,
  releaseVisualVersion
}));
