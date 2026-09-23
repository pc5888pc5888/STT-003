import { createHash } from 'node:crypto';
const SOURCE = 'https://94m.com.tw/articles/ed1d40';
const HASHES = ['e66844396150c5e7face75849865aa5d8a117fe34fee76f9b666dc688d7da470','848227ae83d17435b672463c3e4715df20cd4c1dcdf01fda85f1687034747315','e929231a0899dd719bf429c7fe64b7057341f703cc936bb845aacd88c1ce3e80'];
export default async function handler(req,res){
res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
res.setHeader('Cache-Control','no-store');
try{
 const response=await fetch(SOURCE,{signal:AbortSignal.timeout(18000)});
 if(!response.ok)throw new Error('SOURCE_HTTP_'+response.status);
 const raw=await response.text();
 const assets=[...raw.matchAll(/data:image\/[^\"\s<>]+/g)].map(m=>m[0]);
 const facts=assets.map(s=>({sha:createHash('sha256').update(s).digest('hex'),length:s.length}));
 res.status(200).json({stage:'ASSET_CHECK_ONLY',source:SOURCE,bytes:Buffer.byteLength(raw),matches:HASHES.map(h=>facts.some(f=>f.sha===h)),assets:facts});
}catch(e){res.status(502).json({stage:'SOURCE_UNAVAILABLE',error:String(e.message)});}
}
