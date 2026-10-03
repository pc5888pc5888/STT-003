"""One-use source-locked maintenance; execution workflow permits only isolated branches."""
from pathlib import Path
import hashlib,json,re,sys
site=sys.argv[1]
changes={}
def read(path,sha=None):
    raw=Path(path).read_bytes()
    if sha:
        actual=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
        if actual!=sha:raise RuntimeError('Source changed: '+path)
    return raw.decode()
def once(text,old,new):
    if text.count(old)!=1:raise RuntimeError('Replacement is not unique: '+old[:100])
    return text.replace(old,new,1)
def put(path,text):changes[path]=text

if site=='stt':
    p='src/App.tsx';t=read(p,'cfa51bc2bca95884417cbddea81c318f43cb7982')
    t=once(t,'<Home onNavigate={() => undefined} />','<Home />')
    t=once(t,'<div className="stt-g0-shell">','<div className="stt-g0-shell">\n      <a className="site-skip-link" href="#main-content">跳至主要內容</a>')
    t=once(t,'<main className="stt-g0-main">','<main id="main-content" tabIndex={-1} className="stt-g0-main">')
    t=once(t,'  return (\n    <div className="stt-g0-shell">','''  useEffect(() => {
    if (!menuOpen) return;
    document.querySelector<HTMLAnchorElement>("#stt-g0-mobile-menu a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenuOpen(false);
      document.querySelector<HTMLButtonElement>(".stt-g0-menu-button")?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="stt-g0-shell">''')
    put(p,t)
    p='src/pages/InstitutionalPages.tsx';t=read(p,'2107473cbe2a25eb615babb56b405d7538f4ad36')
    t=once(t,'本頁應由站主依實際表單工具、資料儲存位置、寄送服務與保存期間完成最終版本。AI 不得自行宣稱加密、ISO 認證、特定保存年限或跨境處理狀態。未確認項目一律標示 TBD_OWNER_INPUT，不得發布虛構內容。','第一次受理以整理治理情境與必要聯絡資訊為限。請勿提供身分證件、金融帳戶、醫療資料、完整營業秘密或其他不必要的敏感內容。')
    t=once(t,'      id="privacy-title"\n    />\n  </div>;','''      id="privacy-title"
    />
    <Section title="初次受理的必要資訊">
      <p>受理表收集姓名或稱謂、可回覆之聯絡方式、事件中的角色、目前發生的事情、不希望發生的結果、期待形成的狀態、決策期限與事件類型。</p>
      <p>本表不提供檔案上傳。請以足以理解情境的文字說明，避免提交不必要的個人或第三人敏感資料。</p>
    </Section>
    <Section title="表單寄送流程">
      <p>提交的內容交由本站受理程式處理，並透過 Resend 郵件服務寄送至 STT 指定收件信箱。郵件服務回覆受理後，頁面才顯示送件狀態；送件不等於正式委任成立。</p>
      <p>寄送失敗時，填寫內容保留在目前頁面，供檢查與重試；重新整理或離開頁面可能使尚未送出的內容消失。</p>
    </Section>
    <Section title="資料提供與後續處理">
      <p>初次提交只整理問題與下一步。進一步提供案件資料之前，應先確認正式受理範圍、資料需求與使用邊界。</p>
      <p>前往外部平台聯絡或瀏覽出版內容時，該平台依其自身服務條款與隱私規則處理相關資料。</p>
      <Link to="/professional-boundary">專業服務與資訊邊界 →</Link>
    </Section>
  </div>;''')
    put(p,t)
    p='src/pages/Start.tsx';t=read(p,'09c8f11699837e41fb5260a1f211f27a72124e23')
    t=once(t,'FormEvent, useEffect, useState','FormEvent, useEffect, useRef, useState')
    t=once(t,'import { useSearchParams }','import { Link, useSearchParams }')
    t=once(t,'  const [searchParams] = useSearchParams();','  const [searchParams] = useSearchParams();\n  const requestKey = useRef("");\n  const inFlight = useRef(false);')
    t=once(t,'    setMeta();','    setMeta();\n    requestKey.current = "";')
    t=once(t,'    setData((current) => ({ ...current, [key]: value }));','    requestKey.current = "";\n    setData((current) => ({ ...current, [key]: value }));')
    t=once(t,'    event.preventDefault();\n    setSendError("");','''    event.preventDefault();
    if (inFlight.current) return;
    setSendError("");
    if ([data.name, data.contact, data.situation, data.undesired, data.desired].some(value => !value.trim())) {
      setSendError("請填寫必要資訊，內容不能僅包含空白。");
      return;
    }''')
    t=once(t,'    setSending(true);\n    try {','''    inFlight.current = true;
    requestKey.current ||= crypto.randomUUID();
    setSending(true);
    try {''')
    t=once(t,'        headers: { "Content-Type": "application/json" },','        headers: { "Content-Type": "application/json", "Idempotency-Key": requestKey.current },\n        signal: AbortSignal.timeout(20000),')
    t=once(t,'    } finally {\n      setSending(false);','    } finally {\n      inFlight.current = false;\n      setSending(false);')
    t=once(t,'{receiptId && <p className="text-sm text-[#8f693d]">收件編號｜{receiptId}</p>}','{receiptId && <p role="status" className="text-sm text-[#8f693d]">送件編號｜{receiptId}</p>}\n            <p className="mt-4 text-sm leading-7">郵件服務已受理這次送件。此狀態不代表正式委任成立。</p>')
    t=once(t,'<form onSubmit={submit} className="mx-auto max-w-[980px]" noValidate={false}>','<form onSubmit={submit} aria-busy={sending} className="mx-auto max-w-[980px]" noValidate={false}>\n          <fieldset disabled={sending} className="m-0 min-w-0 border-0 p-0"><legend className="sr-only">治理受理必要資訊</legend>')
    t=once(t,'          <div className="border-t border-[#d8c8ad] pt-8">','          </fieldset>\n          <div className="border-t border-[#d8c8ad] pt-8">\n            <p className="mb-5 text-sm leading-7"><Link to="/privacy">隱私與資料使用</Link>｜<Link to="/professional-boundary">專業服務與資訊邊界</Link></p>')
    t=once(t,'          type="text"\n          required={required}','          type="text"\n          maxLength={number === "01" ? 120 : 300}\n          autoComplete={number === "01" ? "name" : "off"}\n          required={required}')
    t=once(t,'        <textarea\n          required={required}','        <textarea\n          maxLength={4000}\n          required={required}')
    put(p,t)
    p='api/cooperation-submit.ts';t=read(p,'6f7932ff664ed2e56a50c39806fb77333a879c36')
    t=once(t,'type AnyRecord = Record<string, unknown>;','''type AnyRecord = Record<string, unknown>;

const INTAKE_LIMITS: Record<string, number> = {
  name: 120, contact: 300, role: 30, situation: 4000,
  undesired: 4000, desired: 4000, deadline_status: 1,
  deadline_date: 10, event_type: 30,
};
const ROLES = ["企業主", "家族成員", "董事", "經理人", "專業顧問", "其他"];
const EVENT_TYPES = ["重大決策", "家族接班", "股權治理", "AI 治理", "機構合作", "其他"];
function validateIntake(body: AnyRecord): Record<string, string> | null {
  const clean: Record<string, string> = {};
  for (const [key, max] of Object.entries(INTAKE_LIMITS)) {
    if (typeof body[key] !== "string" || String(body[key]).length > max) return null;
    clean[key] = String(body[key]).trim();
    if (key !== "deadline_date" && !clean[key]) return null;
  }
  if (!ROLES.includes(clean.role) || !EVENT_TYPES.includes(clean.event_type)) return null;
  if (!["無", "有"].includes(clean.deadline_status)) return null;
  if (clean.deadline_status === "有") {
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(clean.deadline_date)) return null;
    const date = new Date(clean.deadline_date + "T00:00:00.000Z");
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== clean.deadline_date) return null;
  } else { clean.deadline_date = ""; }
  // Only the eight specified information categories reach the mail service.
  return clean;
}''')
    t=once(t,'    contentRetention: "none",','    acceptsFiles: false,')
    t=once(t,'  const body = parseBody(req);','''  const contentType = String(req.headers?.["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json") && !contentType.includes("application/x-www-form-urlencoded")) {
    return json(res, 415, { ok: false, error: "Unsupported content type" });
  }
  const body = parseBody(req);
  if (!body || Array.isArray(body) || typeof body !== "object") return json(res, 400, { ok: false, error: "Invalid submission" });
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > 64000) return json(res, 413, { ok: false, error: "Submission too large" });''')
    t=once(t,'  const content = stringifySubmission(body);','''  const clean = route === "governance-intake" ? validateIntake(body) : body;
  if (!clean) return json(res, 400, { ok: false, error: "Please check required fields" });
  const content = stringifySubmission(clean);''')
    t=once(t,'  const receiptId = createReceiptId(route);','''  const keyHeader = req.headers?.["idempotency-key"];
  const requestKey = typeof keyHeader === "string" ? keyHeader : "";
  if (requestKey && !/^[a-zA-Z0-9_-]{16,80}$/.test(requestKey)) return json(res, 400, { ok: false, error: "Invalid request key" });
  const receiptId = requestKey ? `${route === "governance-intake" ? "GOV" : "COOP"}-${requestKey}` : createReceiptId(route);''')
    t=once(t,'    `收件時間：${receivedAt}`,','    ...(requestKey ? [] : [`收件時間：${receivedAt}`]),')
    t=once(t,'        Authorization: `Bearer ${apiKey}`,','        Authorization: `Bearer ${apiKey}`,\n        ...(requestKey ? { "Idempotency-Key": `stt-${route}-${requestKey}` } : {}),')
    t=once(t,'      body: JSON.stringify({\n        from,','      signal: AbortSignal.timeout(12000),\n      body: JSON.stringify({\n        from,')
    t=once(t,'    if (!upstream.ok) {','    const result = await upstream.json().catch(() => ({})) as { id?: unknown };\n    if (!upstream.ok || typeof result.id !== "string" || !result.id.trim()) {')
    put(p,t)
    p='src/main.tsx';t=read(p);t=once(t,'import "./titleRules";','import "./titleRules";\nimport "./styles/convergence-accessibility.css";');put(p,t)
    put('src/styles/convergence-accessibility.css','''/* Internal QA correction: text contrast only; images, crop and layout untouched. */
.site-skip-link{position:fixed;left:16px;top:-100px;z-index:10000;background:#fff;color:#65461f;padding:12px 18px;border:2px solid #805b32}.site-skip-link:focus{top:12px}
.stt-g0-primary-cta,.stt-g1-button.is-primary,.stt-g2-cta,.stt-intake-page button[type="submit"]{background:#805b32!important;border-color:#805b32!important;color:#fff!important}
.stt-g1-kicker,.stt-g1-button:not(.is-primary),.stt-g1-evidence-strip span,.stt-g2-scenario__number,.stt-g2-scenario__main>span,.stt-g2-scenario dt,.stt-g2-scenarios dt,.stt-g2-coverage>span,.stt-g3-kicker,.stt-g3-page a,.stt-g4-engagement-row__head>p,.stt-g4-engagement-row dt,.stt-g4-engagement-row dd>a,.stt-inst-kicker,.stt-inst-body a,.stt-insights-kicker,.stt-insights-page button[data-active="true"]{color:#805b32!important}
.stt-insights-index,.lib-index,.stt-intake-page span.text-xl{color:#805b32!important}
.stt-insights-catalog-note{color:#70665a!important}.stt-intake-page a{text-decoration:underline;text-underline-offset:4px}
''')
    put('tests/governance-intake.test.mjs',r'''import test from 'node:test';
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
''')
elif site=='gcsda':
    p='src/GCSDAStandaloneV3.tsx';t=read(p,'127374cf00da94dd7b65944ef76e4ab478966599')
    t=once(t,'import { Menu, X } from "lucide-react";','import { Menu, X } from "lucide-react";\nimport { applyGcsdaMetadata } from "./gcsdaMetadata";\nimport "./styles/gcsda-accessibility.css";')
    t=once(t,'    setOpen(false);','    applyGcsdaMetadata(loc.pathname);\n    setOpen(false);')
    t=once(t,'  return <div className="g4"><Styles/>','''  useEffect(()=>{
    if(!open) return;
    const panel=document.querySelector<HTMLElement>("#gcsda-mobile-menu");
    panel?.querySelector<HTMLButtonElement>("button")?.focus();
    const main=document.getElementById("main-content");
    const oldOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
    if(main)main.inert=true;
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();setOpen(false);document.querySelector<HTMLButtonElement>(".g4-menu")?.focus();}
      if(event.key==="Tab"&&panel){
        const items=Array.from(panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener("keydown",key);
    return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=oldOverflow;if(main)main.inert=false;};
  },[open]);
  return <div className="g4"><a className="site-skip-link" href="#main-content">跳至主要內容</a><Styles/>''')
    t=once(t,'aria-label="開啟選單" aria-expanded={open}','aria-label="開啟選單" aria-expanded={open} aria-controls="gcsda-mobile-menu"')
    t=once(t,'<div className="g4-drawerpanel" onClick=','<div id="gcsda-mobile-menu" role="dialog" aria-modal="true" aria-label="網站導覽" className="g4-drawerpanel" onClick=')
    t=once(t,'<main>{children}</main>','<main id="main-content" tabIndex={-1}>{children}</main>')
    for name in ['About','Council','Knowledge','Charter']:
        start=t.index('function '+name+'()');end=t.index('\nfunction ',start+1)
        part=t[start:end].replace('<h3>','<h2>').replace('</h3>','</h2>');t=t[:start]+part+t[end:]
    t=once(t,'<div className="g4-value" key={n}><span>{n}</span><h3>{t}</h3>','<div className="g4-value" key={n}><span>{n}</span><h2>{t}</h2>')
    for name in ['Governance','Membership']:
        start=t.index('function '+name+'()');end=t.index('\nfunction ',start+1);part=t[start:end]
        part=once(part,'<h3>{x[1]}</h3>','<h2>{x[1]}</h2>') if name=='Governance' else once(part,'<h3>{x[0]}</h3>','<h2>{x[0]}</h2>')
        t=t[:start]+part+t[end:]
    for selector in ['.g4-value h3','.g4-card h3','.g4-note h3']:t=t.replace(selector,selector.replace(' h3',' :is(h2,h3)'))
    put(p,t)
    put('src/styles/gcsda-accessibility.css','''.site-skip-link{position:fixed;left:16px;top:-100px;z-index:10000;background:#fff;color:#65461f;padding:12px 18px;border:2px solid #805b32}.site-skip-link:focus{top:12px}.g4 .g4-actions .primary{background:#805b32!important;border-color:#805b32!important;color:#fff!important}.g4 :where(a,button,[tabindex]):focus-visible{outline:2px solid #805b32;outline-offset:4px}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.g4 *{animation:none!important;transition:none!important}}
''')
    descriptions=re.search(r'const pageDescriptions:Record<string,string>=\{([\s\S]*?)\n\};',t).group(1)
    labels=re.search(r'const labels:Record<string,string>=\{([\s\S]*?)\n    \};',t).group(1)
    ds=dict(re.findall(r'"([^"\n]+)":"([^"\n]+)"',descriptions));ls=dict(re.findall(r'"([^"\n]+)":"([^"\n]+)"',labels))
    metadata={r:{'title':ls[r],'description':ds[r]} for r in ls}
    put('src/gcsdaMetadata.ts','''// Independent organizational identity. Production origin requires owner confirmation.
export const GCSDA_META: Record<string,{title:string;description:string}> = '''+json.dumps(metadata,ensure_ascii=False,indent=2)+''';
export function verifiedGcsdaOrigin(value?:string){
 if(!value)return "";
 try{const url=new URL(value);if(url.protocol!=="https:"||url.pathname!=="/"||url.search||url.hash||url.username||url.password||url.hostname==="stt-003.vercel.app"||url.hostname.includes("-git-"))return "";return url.origin;}catch{return "";}
}
export function applyGcsdaMetadata(path:string){
 const meta=GCSDA_META[path],origin=verifiedGcsdaOrigin((import.meta as any).env.VITE_GCSDA_SITE_ORIGIN);
 function set(key:string,value:string,property=false){const attr=property?"property":"name";let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);if(!el){el=document.createElement("meta");el.setAttribute(attr,key);document.head.appendChild(el);}el.content=value;}
 const title=meta?.title||"找不到頁面｜GCSDA",description=meta?.description||"中華企業策略永續發展學會網站導覽。";
 document.title=title;set("description",description);set("robots",origin&&meta?"index,follow":"noindex,follow");
 set("og:title",title,true);set("og:description",description,true);set("og:site_name","中華企業策略永續發展學會｜GCSDA",true);set("og:type","website",true);set("og:locale","zh_TW",true);
 document.head.querySelectorAll('link[rel="canonical"]').forEach(el=>el.remove());
 if(origin&&meta){const link=document.createElement("link");link.rel="canonical";link.href=origin+path;document.head.appendChild(link);set("og:url",origin+path,true);set("og:image",origin+"/images/gcsda-logo.png",true);}
 else{document.head.querySelectorAll('meta[property="og:url"],meta[property="og:image"]').forEach(el=>el.remove());}
}
''')
    put('vite.config.ts','''import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { GCSDA_META, verifiedGcsdaOrigin } from "./src/gcsdaMetadata";
const esc=(v:string)=>v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),""),origin=verifiedGcsdaOrigin(env.VITE_GCSDA_SITE_ORIGIN);
 return {base:"/",plugins:[react(),tailwindcss(),{name:"gcsda-route-metadata",apply:"build",closeBundle(){
  const root=path.resolve("dist"),base=fs.readFileSync(path.join(root,"index.html"),"utf8");
  for(const [route,meta] of Object.entries(GCSDA_META)){
   let html=base.replace(/<title>[\\s\\S]*?<\\/title>/,`<title>${esc(meta.title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(meta.description)}" />`);
   const tags=[`<meta name="robots" content="${origin?"index,follow":"noindex,follow"}" />`,`<meta property="og:title" content="${esc(meta.title)}" />`,`<meta property="og:description" content="${esc(meta.description)}" />`,`<meta property="og:site_name" content="中華企業策略永續發展學會｜GCSDA" />`,`<meta property="og:locale" content="zh_TW" />`,`<meta property="og:type" content="website" />`];
   if(origin)tags.push(`<link rel="canonical" href="${origin+route}" />`,`<meta property="og:url" content="${origin+route}" />`,`<meta property="og:image" content="${origin}/images/gcsda-logo.png" />`);
   html=html.replace("</head>",tags.join("\\n")+"\\n</head>");fs.writeFileSync(path.join(root,route==="/"?"index.html":"gcsda-"+route.slice(1)+".html"),html);
  }
  fs.writeFileSync(path.join(root,"sitemap.xml"),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(origin?Object.keys(GCSDA_META).map(route=>`<url><loc>${origin+route}</loc></url>`).join(""):"")+"</urlset>");
  fs.writeFileSync(path.join(root,"robots.txt"),origin?`User-agent: *\\nAllow: /\\nSitemap: ${origin}/sitemap.xml\\n`:"User-agent: *\\nDisallow: /\\n");
 }}],resolve:{alias:{"@":path.resolve(__dirname,"src")}},server:{hmr:process.env.DISABLE_HMR!=="true"}};
});
''')
    config=json.loads(read('vercel.json'))
    for rule in config['rewrites']:
        if rule['source'] in metadata:rule['destination']='/gcsda-'+rule['source'][1:]+'.html'
    config['redirects']=[{'source':a,'destination':b,'permanent':True} for a,b in [('/about.html','/about'),('/governance.html','/governance'),('/insights.html','/knowledge'),('/contact.html','/membership')]]
    put('vercel.json',json.dumps(config,indent=2)+'\n')
    put('tests/gcsda-config.test.mjs','''import test from 'node:test';import assert from 'node:assert/strict';import {GCSDA_META,verifiedGcsdaOrigin} from '../src/gcsdaMetadata.ts';
test('GCSDA formal route set is independent',()=>{assert.equal(Object.keys(GCSDA_META).length,9);assert.ok(GCSDA_META['/charter']);assert.equal(GCSDA_META['/engagement'],undefined);assert.equal(new Set(Object.values(GCSDA_META).map(m=>m.title)).size,9)});
test('no invented production origin',()=>{for(const value of [undefined,'','http://example.org','https://stt-003.vercel.app','https://example-git-draft.vercel.app','https://example.org/private','https://user:password@example.org'])assert.equal(verifiedGcsdaOrigin(value),'');assert.equal(verifiedGcsdaOrigin('https://example.org'),'https://example.org')});
''')
else:raise RuntimeError('Unknown site')
for path,text in changes.items():
    Path(path).parent.mkdir(parents=True,exist_ok=True);Path(path).write_text(text)
print(json.dumps({'site':site,'changed':list(changes)},ensure_ascii=False,indent=2))
