import crypto from "node:crypto";

export const config = { api: { bodyParser: false } };

type AnyRecord = Record<string, unknown>;
type Route = { keywords: string[]; label: string; url: string };

const WELCOME =
  "歡迎加入 STT Governance。\n\n本帳號用於治理資訊、研究出版與正式受理後之關係維護。若你正面對重大決策、企業／家族治理或 AI 決策責任問題，請先由「開始治理判讀」整理情境。\n\n首次提交不需傳送身分證件、金融帳戶、完整契約、醫療資料或其他高敏感文件。LINE 不取代正式治理受理；正式入口以 STT Governance 官網為準。";

const DEFAULT_REPLY =
  "這裡是 STT Governance 官方 LINE。\n\n若你正在處理重大決策、企業治理、家族治理或 AI 決策責任問題，建議先從「你正在面對什麼」確認問題類型；如需正式進入受理程序，請使用「開始治理判讀」。\n\n為降低不必要的資料暴露，請先不要在 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。";

const SENSITIVE_GUARD =
  "為降低不必要的資料暴露，請先不要透過 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。若需正式受理，請依官網流程進行：\nhttps://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply";

const ROUTES: Route[] = [
  { keywords:["法律","稅務","投資","醫療","專業意見"], label:"專業服務邊界", url:"https://stt-003.vercel.app/professional-boundary?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["開始","送件","正式受理","治理判讀","受理"], label:"開始治理判讀", url:"https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["委任","合作","正式合作","治理介入"], label:"治理委任", url:"https://stt-003.vercel.app/engagement?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["判讀","方法","stt 如何判讀","怎麼判讀"], label:"STT 如何判讀", url:"https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["莊鈞翔","莊博士","創辦人","執行長"], label:"莊鈞翔博士", url:"https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["研究","文章","出版","著作"], label:"研究與出版", url:"https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["機構合作","律師","會計","信託","家族辦公室"], label:"機構合作", url:"https://stt-003.vercel.app/institutions?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["隱私","資料","個資"], label:"隱私與資料使用", url:"https://stt-003.vercel.app/privacy?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["關於 stt","stt 是什麼"], label:"關於 STT", url:"https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" },
  { keywords:["問題","怎麼開始","不知道從哪開始","我適合嗎"], label:"你正在面對什麼", url:"https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_autoreply" }
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
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));
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
  if(!response.ok) console.error("LINE_STT_REPLY_FAILED",JSON.stringify({status:response.status}));
}
function routeText(input:string){
  const normalized=input.trim().toLowerCase();
  if(!normalized) return null;
  return ROUTES.find(route=>route.keywords.some(keyword=>normalized.includes(keyword.toLowerCase())))||null;
}
function routeReply(route:Route){
  return `請由「${route.label}」進入正式資訊頁：\n${route.url}`;
}
export default async function handler(req:any,res:any){
  if(req.method==="GET") return json(res,200,{
    ok:true,
    configured:Boolean(process.env.LINE_STT_CHANNEL_SECRET?.trim()&&process.env.LINE_STT_CHANNEL_ACCESS_TOKEN?.trim()),
    mode:"DETERMINISTIC_ROUTING_ONLY"
  });
  if(req.method!=="POST") return json(res,405,{ok:false,error:"Method not allowed"});

  const secret=process.env.LINE_STT_CHANNEL_SECRET?.trim();
  const token=process.env.LINE_STT_CHANNEL_ACCESS_TOKEN?.trim();
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
