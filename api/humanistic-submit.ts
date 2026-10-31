import { createHash, randomUUID } from 'node:crypto';

type AnyRecord = Record<string, unknown>;

const RECIPIENT = 'pc5888@gmail.com';
const DEFAULT_RESEND_FROM = 'STT 人文地景產 <onboarding@resend.dev>';
const MAX_BYTES = 400000;
const DELIVERY_VERSION = '20261101.1';

const STATIONS = [
  ['第一站｜今天，什麼都不用趕', [
    '假設今天有人送您一張環球樂園全天通行證，沒有工作電話、沒有既定行程，進園後您第一件事情會做什麼？',
    '園區裡有五條完全不同的路，但入口沒有地圖，您會先選一條走，還是先想辦法弄清楚方向？',
    '假如今天整天都不能說自己的職稱、學歷與工作，您會用哪三個詞讓一位陌生人認識您？',
    '園區宣布，只要您放棄一項自己原本很在意的原則，就可以永遠不用排隊，您會選擇放棄哪一項？還是寧願繼續排隊？',
  ]],
  ['第二站｜旅途中突然收到一張任務卡', [
    '如果人生是一部電影，哪一幕之後，主角就再也回不到原來的想法？',
    '假設有一台攝影機，可以拍到您工作時別人永遠看不到的那一面，您最希望它拍到什麼？',
    '如果今天可以邀請一位曾經出現在您生命或工作中的人一起吃晚餐，您第一個會想到誰？',
    '旅途中突然下起大雨，原本安排好的行程全部取消，您通常會先抱怨五分鐘、重新規劃，還是乾脆看看雨天會發生什麼？',
  ]],
  ['第三站｜下一班，是時間列車', [
    '如果時間列車可以把您送回某一年，但只能停留一天，您最想回到哪一年？',
    '如果可以偷偷坐在「剛走進現在這條路的自己」旁邊五分鐘，您最想先告訴他什麼？',
    '假設有一位十年前的朋友突然來到今天，您最想先提醒他：「現在這個世界，有哪件事情已經不一樣了？」',
    '如果一位二十幾歲的年輕人明天準備走進您現在的領域，您希望他先懂一件什麼事，而不是急著學會什麼？',
  ]],
  ['第四站｜今天，城市暫時交給您', [
    '假設今天這座城市只准您保留三種東西，其餘都必須重新開始，您最捨不得拿掉哪三種？',
    '如果您可以在城市裡掛上一塊很大的提醒牌，而且每個人每天都會看見，您最想寫什麼？',
    '假設有人問您：「您每天做的事情，放到整個社會裡，到底是在幫忙解決什麼？」您會怎麼回答？',
    '如果可以帶一位完全不了解您工作的人，到一個地方待上一個下午，您會帶他去哪裡？',
  ]],
  ['第五站｜離開以前，只能帶走一些東西', [
    '如果今晚突然要搬家，而且只能帶走一件「不是生活必需品」的東西，您第一件會拿什麼？',
    '如果您現在手邊的一件老東西突然會說話，您覺得它最可能說出您的哪一段故事？',
    '假設未來的人只能用一件事情認識您，不能看您的履歷、職稱與獎項，您希望留下什麼？',
    '這趟二十題的小旅行結束了，出口有一張空白卡片，可以留一句話給十年後的自己，也可以留給下一個走進來的人，您會寫什麼？',
  ]],
] as const;

const QUESTIONS = STATIONS.flatMap(([, questions]) => questions);

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
    for(const [key,value]of new URLSearchParams(raw)){
      if(Object.prototype.hasOwnProperty.call(data,key))return null;
      Object.defineProperty(data,key,{value,enumerable:true});
    }
    return data;
  }catch{return null;}
}

function escapeHtml(value:string){
  return value.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]||ch));
}

function formatTaipeiTime(value:string){
  if(!value)return '';
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return value;
  return new Intl.DateTimeFormat('zh-TW',{
    timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit',
    hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false
  }).format(date);
}

export default async function handler(req:any,res:any){
  const apiKey=process.env.RESEND_API_KEY?.trim();
  if(req.method==='GET')return json(res,200,{ok:true,resendConfigured:Boolean(apiKey),version:DELIVERY_VERSION,contentRetention:'none',serverContentLogging:false});
  if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return json(res,405,{ok:false,error:'Method not allowed'});}

  const body=parseBody(req);
  if(!body)return json(res,400,{ok:false,error:'Invalid submission'});
  if(body['bot-field'])return json(res,400,{ok:false,error:'Invalid submission'});
  if(body.protocol_version==='2'&&body.consent!=='true')return json(res,422,{ok:false,error:'Consent required'});

  const text=(key:string)=>typeof body[key]==='string'?body[key] as string:'';
  const name=text('participant_name').trim();
  const email=(text('participant_email')||text('email')).trim();
  const mid=text('mid_note').trim();
  const qs=QUESTIONS.map((question,i)=>{
    const key=`q${String(i+1).padStart(2,'0')}`;
    return {number:i+1,key,question,answer:text(key)};
  });
  const answeredCount=qs.filter(item=>item.answer.trim()).length;

  if(answeredCount===0)return json(res,422,{ok:false,error:'Answer content required'});
  if(email&&(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)))return json(res,422,{ok:false,error:'Invalid email'});

  const rawMessage=[name,email,mid,...qs.map(item=>item.answer)].join('\n\n');
  if(Buffer.byteLength(rawMessage,'utf8')>MAX_BYTES)return json(res,413,{ok:false,error:'Submission too large; save a backup before continuing'});
  if(!apiKey)return json(res,503,{ok:false,error:'Delivery unavailable'});

  const origin=String(req.headers?.origin||'');
  const host=String(req.headers?.host||'');
  if(origin&&origin!==`https://${host}`)return json(res,403,{ok:false,error:'Invalid origin'});

  const suppliedId=text('submission_id');
  if(suppliedId&&!/^[a-zA-Z0-9-]{16,80}$/.test(suppliedId))return json(res,422,{ok:false,error:'Invalid submission identifier'});
  const submissionId=suppliedId||randomUUID();
  const receiptId=`HUM-${submissionId.toUpperCase()}`;
  const submittedAt=text('submitted_at');
  const displayName=name||'未署名';
  const taipeiTime=formatTaipeiTime(submittedAt);

  const textLines=[
    '【STT 人文地景產｜20 Questions 新送件】',
    `收件編號：${receiptId}`,
    `完成度：${answeredCount} / 20 題`,
    `姓名／署名：${displayName}`,
    `聯絡 Email：${email||'未提供'}`,
    taipeiTime?`送件時間（台灣）：${taipeiTime}`:'',
    submittedAt?`送件識別時間（ISO）：${submittedAt}`:'',
    email?'回覆方式：直接按郵件「回覆」即可回覆受訪者。':'回覆方式：受訪者未提供 Email。',
    mid?'': '',
    mid?'【中場補充】':'',
    mid||'',
  ].filter(Boolean);

  let questionIndex=0;
  for(const [stationTitle, stationQuestions] of STATIONS){
    textLines.push('',`—— ${stationTitle} ——`);
    for(const question of stationQuestions){
      const item=qs[questionIndex++];
      textLines.push('',`【${String(item.number).padStart(2,'0')}】${question}`,item.answer.trim()||'（未填寫）');
    }
  }
  const deliveryText=textLines.join('\n');

  let htmlQuestions='';
  questionIndex=0;
  for(const [stationTitle, stationQuestions] of STATIONS){
    htmlQuestions+=`<h2 style="margin:30px 0 12px;font-size:18px;line-height:1.6;color:#76552f;border-bottom:1px solid #dfd2bd;padding-bottom:8px;">${escapeHtml(stationTitle)}</h2>`;
    for(const question of stationQuestions){
      const item=qs[questionIndex++];
      const answer=item.answer.trim();
      htmlQuestions+=`<section style="margin:0 0 22px;"><div style="font-size:12px;letter-spacing:.08em;color:#8a6a43;margin-bottom:6px;">QUESTION ${String(item.number).padStart(2,'0')}</div><div style="font-weight:600;line-height:1.8;color:#2f2922;">${escapeHtml(question)}</div><div style="margin-top:8px;padding:12px 14px;background:#f8f4ed;border-left:3px solid #9a7445;white-space:pre-wrap;line-height:1.8;color:#494137;">${escapeHtml(answer||'（未填寫）')}</div></section>`;
    }
  }

  const deliveryHtml=`<!doctype html><html><body style="margin:0;background:#f5f1e9;color:#2f2922;font-family:-apple-system,BlinkMacSystemFont,'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;"><div style="max-width:760px;margin:0 auto;padding:28px 18px;"><div style="background:#fff;border:1px solid #dfd2bd;padding:28px;"><div style="font-size:12px;letter-spacing:.12em;color:#8a6a43;">STT HUMANISTIC INTERVIEW</div><h1 style="margin:10px 0 20px;font-size:24px;line-height:1.5;">20 Questions 新送件</h1><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.7;"><tr><td style="padding:5px 10px 5px 0;color:#766b5e;width:120px;">收件編號</td><td style="padding:5px 0;font-weight:600;">${escapeHtml(receiptId)}</td></tr><tr><td style="padding:5px 10px 5px 0;color:#766b5e;">完成度</td><td style="padding:5px 0;">${answeredCount} / 20 題</td></tr><tr><td style="padding:5px 10px 5px 0;color:#766b5e;">姓名／署名</td><td style="padding:5px 0;">${escapeHtml(displayName)}</td></tr><tr><td style="padding:5px 10px 5px 0;color:#766b5e;">聯絡 Email</td><td style="padding:5px 0;">${email?`<a href="mailto:${escapeHtml(email)}" style="color:#76552f;">${escapeHtml(email)}</a>`:'未提供'}</td></tr>${taipeiTime?`<tr><td style="padding:5px 10px 5px 0;color:#766b5e;">送件時間</td><td style="padding:5px 0;">${escapeHtml(taipeiTime)}（台灣）</td></tr>`:''}</table>${email?'<p style="margin:16px 0 0;padding:10px 12px;background:#f8f4ed;color:#5a5045;font-size:13px;">可直接使用郵件的「回覆」功能回覆受訪者；Reply-To 已設定為受訪者 Email。</p>':''}${mid?`<div style="margin:22px 0 0;padding:14px;border:1px solid #dfd2bd;"><strong>中場補充</strong><div style="margin-top:8px;white-space:pre-wrap;line-height:1.8;">${escapeHtml(mid)}</div></div>`:''}${htmlQuestions}<div style="margin-top:30px;padding-top:14px;border-top:1px solid #dfd2bd;color:#817568;font-size:12px;line-height:1.7;">本郵件由 STT 人文地景產正式訪談頁送出。網站成功送件後即清除受訪者在頁面與瀏覽器暫存中的輸入文字；伺服器不記錄送件內容。</div></div></div></body></html>`;

  const safeSubjectName=displayName.replace(/[\r\n]/g,' ').slice(0,80);
  const payload:AnyRecord={
    from:process.env.RESEND_FROM_EMAIL?.trim()||DEFAULT_RESEND_FROM,
    to:[RECIPIENT],
    subject:`[STT 人文地景產] 新送件｜${safeSubjectName}｜${answeredCount}/20｜${receiptId}`,
    text:deliveryText,
    html:deliveryHtml,
  };
  if(email)payload.reply_to=email;

  const encoded=JSON.stringify(payload);
  const idempotencyKey=`humanistic/${submissionId}/${createHash('sha256').update(encoded).digest('hex')}`;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),15000);

  try{
    const upstream=await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`,'Idempotency-Key':idempotencyKey},
      body:encoded,
      signal:controller.signal
    });
    const result=await upstream.json().catch(()=>null) as {id?:unknown}|null;
    if(!upstream.ok||typeof result?.id!=='string'||!result.id){
      console.error('HUMANISTIC_EMAIL_FAILED',JSON.stringify({receiptId,provider:'resend',status:upstream.status}));
      return json(res,503,{ok:false,error:'Delivery not confirmed; retain answers and retry',receiptId});
    }
    console.log('HUMANISTIC_EMAIL_ACCEPTED',JSON.stringify({receiptId,provider:'resend',providerId:result.id,answeredCount}));
    return json(res,200,{ok:true,delivery:'resend-email',receiptId,providerId:result.id,answeredCount});
  }catch{
    console.error('HUMANISTIC_EMAIL_FAILED',JSON.stringify({receiptId,provider:'resend'}));
    return json(res,503,{ok:false,error:'Delivery not confirmed; retain answers and retry',receiptId});
  }finally{
    clearTimeout(timer);
  }
}
