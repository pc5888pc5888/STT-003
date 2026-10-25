import crypto from "node:crypto";

export const config = { api: { bodyParser: false } };
type AnyRecord=Record<string,unknown>;
function json(res:any,status:number,body:AnyRecord){res.status(status).setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.end(JSON.stringify(body));}
async function readRaw(req:any){
  if(Buffer.isBuffer(req.body)) return req.body;
  if(typeof req.body==="string") return Buffer.from(req.body,"utf8");
  const chunks:Buffer[]=[];
  for await(const chunk of req) chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));
  return Buffer.concat(chunks);
}
function validSignature(raw:Buffer,signature:string,secret:string){
  const expected=crypto.createHmac("sha256",secret).update(raw).digest("base64");
  const a=Buffer.from(expected),b=Buffer.from(signature);
  return a.length===b.length&&crypto.timingSafeEqual(a,b);
}
async function replyWelcome(replyToken:string,token:string){
  const text="歡迎加入中華企業策略永續發展學會 GCSDA。\n\n本帳號用於會務聯絡、會員申請、活動與治理知識資訊。入會申請請由「會員與入會」進入正式流程；送出申請不代表會員資格成立，後續依章程及正式會務程序審查。\n\nGCSDA 與 STT Governance 為不同機構主體。";
  const response=await fetch("https://api.line.me/v2/bot/message/reply",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000),body:JSON.stringify({replyToken,messages:[{type:"text",text}]})});
  if(!response.ok) console.error("LINE_GCSDA_WELCOME_FAILED",JSON.stringify({status:response.status}));
}
export default async function handler(req:any,res:any){
  if(req.method==="GET") return json(res,200,{ok:true,configured:Boolean(process.env.LINE_GCSDA_CHANNEL_SECRET?.trim()&&process.env.LINE_GCSDA_CHANNEL_ACCESS_TOKEN?.trim())});
  if(req.method!=="POST") return json(res,405,{ok:false,error:"Method not allowed"});
  const secret=process.env.LINE_GCSDA_CHANNEL_SECRET?.trim(),token=process.env.LINE_GCSDA_CHANNEL_ACCESS_TOKEN?.trim();
  if(!secret||!token) return json(res,503,{ok:false,error:"LINE configuration unavailable"});
  const signature=String(req.headers?.["x-line-signature"]||"");
  if(!signature) return json(res,401,{ok:false,error:"Missing signature"});
  const raw=await readRaw(req);
  if(!validSignature(raw,signature,secret)) return json(res,401,{ok:false,error:"Invalid signature"});
  let body:any;try{body=JSON.parse(raw.toString("utf8"));}catch{return json(res,400,{ok:false,error:"Invalid JSON"});}
  const events=Array.isArray(body?.events)?body.events:[];
  for(const event of events){
    if(event?.type==="follow"&&typeof event?.replyToken==="string") await replyWelcome(event.replyToken,token);
  }
  return json(res,200,{ok:true});
}
