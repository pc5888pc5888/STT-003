import crypto from "node:crypto";

export const config = { api: { bodyParser: false } };

type AnyRecord = Record<string, unknown>;
function json(res:any,status:number,body:AnyRecord){res.status(status).setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.end(JSON.stringify(body));}
async function readRaw(req:any){
  if(Buffer.isBuffer(req.body)) return req.body;
  if(typeof req.body==="string") return Buffer.from(req.body,"utf8");
  const chunks:Buffer[]=[];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));
  return Buffer.concat(chunks);
}
function validSignature(raw:Buffer,signature:string,secret:string){
  const expected=crypto.createHmac("sha256",secret).update(raw).digest("base64");
  const a=Buffer.from(expected),b=Buffer.from(signature);
  return a.length===b.length&&crypto.timingSafeEqual(a,b);
}
async function replyWelcome(replyToken:string,token:string){
  const text="歡迎加入 STT Governance。\n\n本帳號用於治理資訊、研究出版與正式受理後之關係維護。若你正面對重大決策、企業／家族治理或 AI 決策責任問題，請先由「開始治理判讀」整理情境。\n\n首次提交不需傳送身分證件、金融帳戶、完整契約、醫療資料或其他高敏感文件。LINE 不取代正式治理受理；正式入口以 STT Governance 官網為準。";
  const response=await fetch("https://api.line.me/v2/bot/message/reply",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000),body:JSON.stringify({replyToken,messages:[{type:"text",text}]})});
  if(!response.ok) console.error("LINE_STT_WELCOME_FAILED",JSON.stringify({status:response.status}));
}
export default async function handler(req:any,res:any){
  if(req.method==="GET") return json(res,200,{ok:true,configured:Boolean(process.env.LINE_STT_CHANNEL_SECRET?.trim()&&process.env.LINE_STT_CHANNEL_ACCESS_TOKEN?.trim())});
  if(req.method!=="POST") return json(res,405,{ok:false,error:"Method not allowed"});
  const secret=process.env.LINE_STT_CHANNEL_SECRET?.trim(),token=process.env.LINE_STT_CHANNEL_ACCESS_TOKEN?.trim();
  if(!secret||!token) return json(res,503,{ok:false,error:"LINE configuration unavailable"});
  const signature=String(req.headers?.["x-line-signature"]||"");
  if(!signature) return json(res,401,{ok:false,error:"Missing signature"});
  const raw=await readRaw(req);
  if(!validSignature(raw,signature,secret)) return json(res,401,{ok:false,error:"Invalid signature"});
  let body:any; try{body=JSON.parse(raw.toString("utf8"));}catch{return json(res,400,{ok:false,error:"Invalid JSON"});}
  const events=Array.isArray(body?.events)?body.events:[];
  for(const event of events){
    if(event?.type==="follow"&&typeof event?.replyToken==="string") await replyWelcome(event.replyToken,token);
  }
  return json(res,200,{ok:true});
}
