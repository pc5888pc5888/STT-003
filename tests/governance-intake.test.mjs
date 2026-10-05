import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/cooperation-submit.ts';
const valid={route:'governance-intake',name:'驗證測試',contact:'test@example.invalid',role:'董事',situation:'純測試情境',undesired:'純測試風險',desired:'純測試目標',deadline_status:'無',deadline_date:'',event_type:'重大決策','bot-field':''};
async function invoke(body,method='POST',extra={}){
 let status=200,result,headers={};const res={status(n){status=n;return this},setHeader(k,v){headers[k]=v;return this},end(raw){result=JSON.parse(raw)}};
 await handler({method,body,headers:{'content-type':'application/json',...extra}},res);return {status,result,headers};
}
test('governance intake contract and delivery states (mocked mail only)',async t=>{
 const original=globalThis.fetch,env=process.env.RESEND_API_KEY;let sent=[];process.env.RESEND_API_KEY='test-only-not-a-real-key';
 globalThis.fetch=async(url,options)=>{sent.push({url,options});return new Response(JSON.stringify({id:'mock-mail-id'}),{status:200})};
 try{
  await t.test('health never claims no retention',async()=>{const r=await invoke({},'GET');assert.equal(r.result.contentRetention,undefined);assert.equal(r.result.acceptsFiles,false)});
  await t.test('all required fields checked server-side',async()=>{for(const k of Object.keys(valid).filter(k=>!['route','deadline_date','bot-field'].includes(k))){const body={...valid};delete body[k];assert.equal((await invoke(body)).status,400,k)}});
  await t.test('whitespace is not valid content',async()=>assert.equal((await invoke({...valid,situation:'   '})).status,400));
  await t.test('reject invalid enum and date',async()=>{assert.equal((await invoke({...valid,role:'unknown'})).status,400);assert.equal((await invoke({...valid,event_type:'unknown'})).status,400);assert.equal((await invoke({...valid,deadline_status:'有',deadline_date:'2026-02-30'})).status,400);assert.equal((await invoke({...valid,deadline_status:'有',deadline_date:''})).status,400)});
  await t.test('reject excessive input and malformed bodies',async()=>{assert.equal((await invoke({...valid,situation:'x'.repeat(4001)})).status,400);assert.equal((await invoke([])).status,400);assert.equal((await invoke('{')).status,400);assert.equal((await invoke({...valid,extra:'x'.repeat(64001)})).status,413)});
  await t.test('unknown personal fields are not forwarded',async()=>{sent=[];const r=await invoke({...valid,ssn:'NEVER_FORWARD',file:'NEVER_FORWARD'});assert.equal(r.status,200);assert.equal(r.result.delivery,'resend-email');assert.ok(!sent[0].options.body.includes('NEVER_FORWARD'))});
  await t.test('same request key preserves mail body across retry',async()=>{sent=[];const h={'idempotency-key':'test-request-key-20260923'};const a=await invoke(valid,'POST',h),b=await invoke(valid,'POST',h);assert.equal(a.result.receiptId,b.result.receiptId);assert.equal(sent[0].options.body,sent[1].options.body);assert.equal(sent[0].options.headers['Idempotency-Key'],sent[1].options.headers['Idempotency-Key'])});
  await t.test('unsupported method and media type',async()=>{assert.equal((await invoke({},'PUT')).status,405);assert.equal((await invoke(valid,'POST',{'content-type':'multipart/form-data'})).status,415)});
  await t.test('missing configuration cannot return success',async()=>{delete process.env.RESEND_API_KEY;assert.equal((await invoke(valid)).status,503);process.env.RESEND_API_KEY='test-only-not-a-real-key'});
  await t.test('upstream rejection cannot return success',async()=>{globalThis.fetch=async()=>new Response('{}',{status:503});assert.equal((await invoke(valid)).status,503)});
  await t.test('HTTP 200 without mail id cannot return success',async()=>{globalThis.fetch=async()=>new Response('{}',{status:200});assert.equal((await invoke(valid)).status,503)});
  await t.test('network error remains retryable',async()=>{globalThis.fetch=async()=>{throw new Error('network test')};assert.equal((await invoke(valid)).status,503)});
  await t.test('bot trap never reports mail delivery',async()=>assert.equal((await invoke({...valid,'bot-field':'robot'})).result.delivery,undefined));
 }finally{globalThis.fetch=original;if(env===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=env}
});
