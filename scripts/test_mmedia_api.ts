import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import handler from '../api/mmedia.ts';
const seed=JSON.parse(readFileSync('public/data/mmedia-catalog.json','utf8'));
const original=globalThis.fetch;
async function run(payload:unknown, fail=false, method='GET') {
  globalThis.fetch=async()=>{if(fail) throw new Error('simulated upstream outage'); return new Response(JSON.stringify(payload),{headers:{'content-type':'application/json'}})};
  const output:{status?:number;body?:any;headers:Record<string,string>}={headers:{}};
  const res={setHeader:(k:string,v:string)=>{output.headers[k]=v},status:(s:number)=>{output.status=s;return res},json:(b:unknown)=>{output.body=b;return b}};
  await handler({method},res); return output;
}
try {
  let r=await run(seed); assert.equal(r.status,200); assert.equal(r.body.mode,'archive'); assert.equal(r.body.stats.total,seed.articles.length);
  r=await run({...seed,articles:seed.articles.slice(0,12)}); assert.equal(r.body.stats.total,seed.articles.length);
  r=await run(null,true); assert.equal(r.body.mode,'bundled'); assert.equal(r.body.stats.total,seed.articles.length);
  r=await run({...seed,articles:[{...seed.articles[0],author:'另一位作者'}]}); assert.equal(r.body.mode,'bundled');
  r=await run({...seed,articles:[null]}); assert.equal(r.body.mode,'bundled');
  r=await run(seed,false,'POST'); assert.equal(r.status,405);
  console.log('API tests PASS: persistent baseline, partial input, outage, author gate, malformed data, method gate');
} finally {globalThis.fetch=original;}
