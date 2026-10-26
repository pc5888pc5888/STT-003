import fs from "node:fs";
import path from "node:path";
const account=(process.argv[2]||"").toLowerCase();
if(!["stt","gcsda"].includes(account)){console.error("Usage: node scripts/line/deploy-richmenu.mjs <stt|gcsda>");process.exit(2)}
const websitePath=path.join(process.cwd(),"docs","governance","WEBSITE-BUILD-LOCK-20261025.md");
if(!fs.existsSync(websitePath)){console.error("LINE_HOLD: website BUILD_LOCK evidence missing.");process.exit(3)}
const website=fs.readFileSync(websitePath,"utf8");
if(!website.includes("WEBSITE_STATUS = BUILD_LOCKED")||!website.includes("QA_STATUS = PASS")){console.error("LINE_HOLD: website gate invalid.");process.exit(3)}
if((process.env.LINE_RELEASE_GATE||"").trim()!=="WEBSITE_QA_PASS_BUILD_LOCKED"){console.error("LINE_HOLD: release gate not supplied.");process.exit(3)}
if((process.env.LINE_RELEASE_VISUAL_VERSION||"").trim()!=="20261026_LOCKED_DERIVATIVE"){console.error("LINE_HOLD: release visual version not authorized.");process.exit(3)}
const approvalKey=account==="stt"?"LINE_STT_VISUAL_APPROVAL":"LINE_GCSDA_VISUAL_APPROVAL";
if((process.env[approvalKey]||"").trim()!=="OWNER_APPROVED_20261026"){console.error("LINE_HOLD: explicit owner visual approval required.");process.exit(3)}
const tokenKey=account==="stt"?"LINE_STT_CHANNEL_ACCESS_TOKEN":"LINE_GCSDA_CHANNEL_ACCESS_TOKEN";
const token=process.env[tokenKey]?.trim();if(!token){console.error("SOURCE_REQUIRED: "+tokenKey);process.exit(2)}
const configPath=path.join(process.cwd(),"line","release",account+"-richmenu-20261026.json");
const imagePath=path.join(process.cwd(),"line","release",account+"-richmenu-20261026.png");
if(!fs.existsSync(configPath)||!fs.existsSync(imagePath)){console.error("SOURCE_REQUIRED: final governed JSON/PNG missing");process.exit(2)}
const config=JSON.parse(fs.readFileSync(configPath,"utf8")),image=fs.readFileSync(imagePath);
if(config?.size?.width!==2500||config?.size?.height!==1686||!Array.isArray(config?.areas)||config.areas.length!==6){throw new Error("RICHMENU_RELEASE_QA: invalid action map")}
if(image.length>1024*1024||image.length<24||image[0]!==0x89||image.toString("ascii",1,4)!=="PNG"||image.readUInt32BE(16)!==2500||image.readUInt32BE(20)!==1686){throw new Error("RICHMENU_RELEASE_QA: invalid image")}
const api="https://api.line.me",auth={Authorization:"Bearer "+token,"Content-Type":"application/json"};
const validate=await fetch(api+"/v2/bot/richmenu/validate",{method:"POST",headers:auth,body:JSON.stringify(config)});
if(!validate.ok)throw new Error("Rich menu validation failed: "+validate.status+" "+await validate.text());
const create=await fetch(api+"/v2/bot/richmenu",{method:"POST",headers:auth,body:JSON.stringify(config)});
const created=await create.json().catch(()=>({}));if(!create.ok||!created.richMenuId)throw new Error("Rich menu creation failed: "+create.status);
const id=created.richMenuId;
const upload=await fetch("https://api-data.line.me/v2/bot/richmenu/"+id+"/content",{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"image/png"},body:image});
if(!upload.ok)throw new Error("Rich menu upload failed: "+upload.status);
const setDefault=await fetch(api+"/v2/bot/user/all/richmenu/"+id,{method:"POST",headers:{Authorization:"Bearer "+token}});
if(!setDefault.ok)throw new Error("Set default rich menu failed: "+setDefault.status);
console.log(JSON.stringify({ok:true,account,richMenuId:id,imageBytes:image.length}));
