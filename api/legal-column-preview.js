import { createHash } from 'node:crypto';
const SOURCE='https://94m.com.tw/articles/ed1d40';
const HASHES=['e66844396150c5e7face75849865aa5d8a117fe34fee76f9b666dc688d7da470','848227ae83d17435b672463c3e4715df20cd4c1dcdf01fda85f1687034747315','e929231a0899dd719bf429c7fe64b7057341f703cc936bb845aacd88c1ce3e80'];
const LEGAL=['https://www.law.cbc.gov.tw/Law/ShowAllPrint?LawID=LA03B026014&SerialNumber=True','https://glrs.moi.gov.tw/LawContent.aspx?id=FL003296'];
export default async function handler(req,res){
res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('Cache-Control','no-store');
try{
const q=new URL(req.url,'https://preview.invalid').searchParams;
if(q.get('mode')==='law'){
const i=Number(q.get('i'));if(!Number.isInteger(i)||i<0||i>=LEGAL.length)return res.status(400).json({error:'invalid index'});
const r=await fetch(LEGAL[i],{signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error('HTTP_'+r.status);
const raw=await r.text();let text=raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,'\n').replace(/&nbsp;/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\n[\t \r]*\n/g,'\n').trim();
return res.status(200).json({source:LEGAL[i],status:r.status,sha256:createHash('sha256').update(raw).digest('hex'),text:text.slice(0,65000)});
}
const response=await fetch(SOURCE,{signal:AbortSignal.timeout(20000)});if(!response.ok)throw new Error('SOURCE_HTTP_'+response.status);
const raw=await response.text();const assets=[...raw.matchAll(/data:image\/[^\"\s<>]+/g)].map(m=>m[0]);const facts=assets.map(s=>({sha:createHash('sha256').update(s).digest('hex'),length:s.length}));
res.status(200).json({stage:'ASSET_CHECK_ONLY',source:SOURCE,bytes:Buffer.byteLength(raw),matches:HASHES.map(h=>facts.some(f=>f.sha===h)),assets:facts});
}catch(e){res.status(502).json({stage:'SOURCE_UNAVAILABLE',error:String(e.message)});}
}
