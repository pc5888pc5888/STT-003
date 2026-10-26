import crypto from "node:crypto";

export const config = { api: { bodyParser: false } };

type AnyRecord=Record<string,unknown>;
type Route={keywords:string[];label:string;url:string};

const WELCOME =
  "歡迎加入中華企業策略永續發展學會 GCSDA。\n\n本帳號用於會務聯絡、會員申請、活動與治理知識資訊。入會申請請由「會員與入會」進入正式流程；送出申請不代表會員資格成立，後續依章程及正式會務程序審查。\n\nGCSDA 與 STT Governance 為不同機構主體。";

const DEFAULT_REPLY =
  "這裡是中華企業策略永續發展學會 GCSDA 官方 LINE。\n\n會員申請請由「會員與入會」進入正式流程；活動、研究、組織治理及章程公告，請使用下方學會入口。\n\n請勿以 LINE 訊息取代正式入會申請或正式會務程序。";

const SENSITIVE_GUARD =
  "為降低不必要的資料暴露，請先不要透過 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。會員申請請依正式流程進行：\nhttps://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply";

const ROUTES:Route[]=[
  {keywords:["入會","會員","申請"],label:"會員與入會",url:"https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["活動","大會","講座"],label:"活動與大會",url:"https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["章程","公告"],label:"章程與公告",url:"https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["莊鈞翔","莊博士","創會理事長"],label:"創會理事長",url:"https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["組織治理","理監事","權責"],label:"組織治理",url:"https://gcsda-governance.vercel.app/governance?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["聯席會","策略治理"],label:"策略治理聯席會",url:"https://gcsda-governance.vercel.app/council?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["研究","知識"],label:"知識與研究",url:"https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["關於學會","gcsda 是什麼"],label:"關於學會",url:"https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"},
  {keywords:["stt governance","stt"],label:"STT Governance（不同機構）",url:"https://stt-003.vercel.app/?utm_source=line&utm_medium=oa&utm_campaign=gcsda_autoreply"}
];

function json(res:any,status:number,body:AnyRecord){
  res.status(status).setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  res.end(JSON.stringify(body));
}
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
async function replyText(replyToken:string,token:string,text:string){
  const response=await fetch("https://api.line.me/v2/bot/message/reply",{
    method:"POST",
    headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
    signal:AbortSignal.timeout(8000),
    body:JSON.stringify({replyToken,messages:[{type:"text",text}]})
  });
  if(!response.ok) console.error("LINE_GCSDA_REPLY_FAILED",JSON.stringify({status:response.status}));
}
function routeText(input:string){
  const normalized=input.trim().toLowerCase();
  if(!normalized) return null;
  return ROUTES.find(route=>route.keywords.some(keyword=>normalized.includes(keyword.toLowerCase())))||null;
}
function routeReply(route:Route){
  if(route.label==="STT Governance（不同機構）"){
    return `GCSDA 與 STT Governance 為不同機構主體。STT Governance 官方網站：\n${route.url}`;
  }
  return `請由「${route.label}」進入正式資訊頁：\n${route.url}`;
}

export default async function handler(req:any,res:any){
  if(req.method==="GET") return json(res,200,{
    ok:true,
    configured:Boolean(process.env.LINE_GCSDA_CHANNEL_SECRET?.trim()&&process.env.LINE_GCSDA_CHANNEL_ACCESS_TOKEN?.trim()),
    mode:"DETERMINISTIC_ROUTING_ONLY"
  });
  if(req.method!=="POST") return json(res,405,{ok:false,error:"Method not allowed"});

  const secret=process.env.LINE_GCSDA_CHANNEL_SECRET?.trim();
  const token=process.env.LINE_GCSDA_CHANNEL_ACCESS_TOKEN?.trim();
  if(!secret||!token) return json(res,503,{ok:false,error:"LINE configuration unavailable"});

  const signature=String(req.headers?.["x-line-signature"]||"");
  if(!signature) return json(res,401,{ok:false,error:"Missing signature"});

  const raw=await readRaw(req);
  if(!validSignature(raw,signature,secret)) return json(res,401,{ok:false,error:"Invalid signature"});

  let body:any;
  try{body=JSON.parse(raw.toString("utf8"));}catch{return json(res,400,{ok:false,error:"Invalid JSON"});}

  const events=Array.isArray(body?.events)?body.events:[];
  for(const event of events){
    const replyToken=typeof event?.replyToken==="string"?event.replyToken:"";
    if(!replyToken) continue;

    if(event?.type==="follow"){
      await replyText(replyToken,token,WELCOME);
      continue;
    }

    if(event?.type==="message"){
      const message=event?.message;
      if(message?.type==="text"){
        const route=routeText(String(message.text||""));
        await replyText(replyToken,token,route?routeReply(route):DEFAULT_REPLY);
        continue;
      }
      if(["image","file","audio","video"].includes(String(message?.type||""))){
        await replyText(replyToken,token,SENSITIVE_GUARD);
      }
    }
  }
  return json(res,200,{ok:true});
}
