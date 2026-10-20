import { createHash, randomUUID } from 'node:crypto';
type AnyRecord = Record<string, unknown>;
const RECIPIENT = 'pc5888@gmail.com';
const DEFAULT_RESEND_FROM = 'STT 人文地景產 <onboarding@resend.dev>';
const MAX_BYTES = 400000;
function json(res: any, status: number, body: AnyRecord) {
  res.status(status).setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  res.end(JSON.stringify(body));
}
function parseBody(req: any): AnyRecord | null {
  try {
    if(req.body && typeof req.body==='object' && !Buffer.isBuffer(req.body))return Array.isArray(req.body)?null:req.body;
    const raw=Buffer.isBuffer(req.body)?req.body.toString('utf8'):typeof req.body==='string'?req.body:'';
    if(Buffer.byteLength(raw)>MAX_BYTES*3)return null;
    if(String(req.headers?.['content-type']||'').includes('application/json')){
      const value=JSON.parse(raw);return value&&typeof value==='object'&&!Array.isArray(value)?value:null;
    }
    const data:AnyRecord={};
    for(const [key,value]of new URLSearchParams(raw)){if(Object.prototype.hasOwnProperty.call(data,key))return null;Object.defineProperty(data,key,{value,enumerable:true});}
    return data;
  }catch{return null;}
}
export default async function handler(req:any,res:any){
  const apiKey=process.env.RESEND_API_KEY?.trim();
  if(req.method==='GET')return json(res,200,{ok:true,resendConfigured:Boolean(apiKey),version:'20261020.2',contentRetention:'none',serverContentLogging:false});
  if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return json(res,405,{ok:false,error:'Method not allowed'});}
  const body=parseBody(req);
  if(!body)return json(res,400,{ok:false,error:'Invalid submission'});
  if(body['bot-field'])return json(res,400,{ok:false,error:'Invalid submission'});
  if(body.protocol_version==='2'&&body.consent!=='true')return json(res,422,{ok:false,error:'Consent required'});
  const text=(key:string)=>typeof body[key]==='string'?body[key] as string:'';
  const name=text('participant_name');
  const email=(text('participant_email')||text('email')).trim();
  const mid=text('mid_note');
  const qs=Array.from({length:20},(_,i)=>{const key=`q${String(i+1).padStart(2,'0')}`;return [key,text(key)] as const;});
  if(!qs.some(([,value])=>value.trim()))return json(res,422,{ok:false,error:'Answer content required'});
  if(email&&(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)))return json(res,422,{ok:false,error:'Invalid email'});
  const message=[['participant_name',name],['participant_email',email],['mid_note',mid],...qs].map(([key,value])=>`${key}: ${value}`).join('\n\n');
  if(Buffer.byteLength(message,'utf8')>MAX_BYTES)return json(res,413,{ok:false,error:'Submission too large; save a backup before continuing'});
  if(!apiKey)return json(res,503,{ok:false,error:'Delivery unavailable'});
  const origin=String(req.headers?.origin||'');
  const host=String(req.headers?.host||'');
  if(origin&&origin!==`https://${host}`)return json(res,403,{ok:false,error:'Invalid origin'});
  const suppliedId=text('submission_id');
  if(suppliedId&&!/^[a-zA-Z0-9-]{16,80}$/.test(suppliedId))return json(res,422,{ok:false,error:'Invalid submission identifier'});
  const submissionId=suppliedId||randomUUID();
  const receiptId=`HUM-${submissionId.toUpperCase()}`;
  // Deterministic retry content: do not add a fresh timestamp on each retry.
  const submittedAt=text('submitted_at');
  const deliveryText=['【STT 人文地景產｜20 Questions 新送件】',`收件編號：${receiptId}`,submittedAt?`送件識別建立時間：${submittedAt}`:'', '', '—— 完整填寫內容 ——',message].join('\n');
  const payload:AnyRecord={from:process.env.RESEND_FROM_EMAIL?.trim()||DEFAULT_RESEND_FROM,to:[RECIPIENT],subject:`[STT 人文地景產] 新送件｜${name.replace(/[\r\n]/g,' ').slice(0,80)||'未署名'}｜${receiptId}`,text:deliveryText};
  if(email)payload.reply_to=email;
  const encoded=JSON.stringify(payload);
  const idempotencyKey=`humanistic/${submissionId}/${createHash('sha256').update(encoded).digest('hex')}`;
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
  try{
    const upstream=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`,'Idempotency-Key':idempotencyKey},body:encoded,signal:controller.signal});
    const result=await upstream.json().catch(()=>null) as {id?:unknown}|null;
    if(!upstream.ok||typeof result?.id!=='string'||!result.id){
      console.error('HUMANISTIC_EMAIL_FAILED',JSON.stringify({receiptId,provider:'resend',status:upstream.status}));
      return json(res,503,{ok:false,error:'Delivery not confirmed; retain answers and retry',receiptId});
    }
    console.log('HUMANISTIC_EMAIL_ACCEPTED',JSON.stringify({receiptId,provider:'resend',providerId:result.id}));
    return json(res,200,{ok:true,delivery:'resend-email',receiptId,providerId:result.id});
  }catch{
    // Never log submitted content, request bodies, or provider error bodies.
    console.error('HUMANISTIC_EMAIL_FAILED',JSON.stringify({receiptId,provider:'resend'}));
    return json(res,503,{ok:false,error:'Delivery not confirmed; retain answers and retry',receiptId});
  }finally{clearTimeout(timer);}
}
