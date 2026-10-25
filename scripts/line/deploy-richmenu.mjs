import fs from "node:fs";
import path from "node:path";

const account=(process.argv[2]||"").toLowerCase();
if(!["stt","gcsda"].includes(account)){console.error("Usage: node scripts/line/deploy-richmenu.mjs <stt|gcsda>");process.exit(2);}
const tokenKey=account==="stt"?"LINE_STT_CHANNEL_ACCESS_TOKEN":"LINE_GCSDA_CHANNEL_ACCESS_TOKEN";
const token=process.env[tokenKey]?.trim();
if(!token){console.error("SOURCE_REQUIRED: "+tokenKey);process.exit(2);}
const root=process.cwd();
const configPath=path.join(root,"line",account+"-richmenu.json");
const imagePath=path.join(root,"line",account+"-richmenu.png");
const config=JSON.parse(fs.readFileSync(configPath,"utf8"));
const image=fs.readFileSync(imagePath);
if(image.length>1024*1024) throw new Error("Rich menu image exceeds LINE 1 MB limit");
const api="https://api.line.me";
const auth={Authorization:"Bearer "+token,"Content-Type":"application/json"};
const validate=await fetch(api+"/v2/bot/richmenu/validate",{method:"POST",headers:auth,body:JSON.stringify(config)});
if(!validate.ok) throw new Error("Rich menu validation failed: "+validate.status+" "+await validate.text());
const create=await fetch(api+"/v2/bot/richmenu",{method:"POST",headers:auth,body:JSON.stringify(config)});
const created=await create.json().catch(()=>({}));
if(!create.ok||!created.richMenuId) throw new Error("Rich menu creation failed: "+create.status+" "+JSON.stringify(created));
const id=created.richMenuId;
const upload=await fetch("https://api-data.line.me/v2/bot/richmenu/"+id+"/content",{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"image/png"},body:image});
if(!upload.ok) throw new Error("Rich menu upload failed: "+upload.status+" "+await upload.text());
const setDefault=await fetch(api+"/v2/bot/user/all/richmenu/"+id,{method:"POST",headers:{Authorization:"Bearer "+token}});
if(!setDefault.ok) throw new Error("Set default rich menu failed: "+setDefault.status+" "+await setDefault.text());
console.log(JSON.stringify({ok:true,account,richMenuId:id,imageBytes:image.length}));
