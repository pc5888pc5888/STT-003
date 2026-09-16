from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one occurrence, found {count}")
    return text.replace(old, new, 1)


# -----------------------------------------------------------------------------
# Cooperation: the approved uploaded hero already contains Dr. Chuang.
# Never render a second portrait layer on top of it.
# -----------------------------------------------------------------------------
page = Path("src/pages/Cooperation.tsx")
s = page.read_text(encoding="utf-8")
s = s.replace('const PORTRAIT_SRC = "/visual-bank/stt/hero-hires/stt-portrait.png";\n', "")
s = s.replace(
    '          <img className="stt-coop-person" src={PORTRAIT_SRC} alt="莊鈞翔博士" draggable={false} />\n',
    "",
)
if "PORTRAIT_SRC" in s or 'className="stt-coop-person"' in s:
    raise SystemExit("Cooperation portrait overlay was not completely removed")
page.write_text(s, encoding="utf-8")

css = Path("src/styles/stt-approved-heroes-20260915.css")
c = css.read_text(encoding="utf-8")
old_bg = "background-image:url('/visual-bank/stt/hero-hires/stt.png');"
new_bg = "background-image:url('/visual-bank/stt/user-approved-cooperation/cooperation-hero-20260916.png');"
if old_bg in c:
    c = c.replace(old_bg, new_bg, 1)
elif new_bg not in c:
    raise SystemExit("Cooperation background declaration not found")
c = c.replace("filter:saturate(.92) brightness(1.06);", "filter:none;", 1)
if ".stt-coop-portrait{\n  pointer-events:none!important;" not in c:
    c = c.replace(
        ".stt-coop-portrait{\n",
        ".stt-coop-portrait{\n  pointer-events:none!important;\n",
        1,
    )
css.write_text(c, encoding="utf-8")


# -----------------------------------------------------------------------------
# Humanistic browser: browser storage is optional, never a delivery prerequisite.
# -----------------------------------------------------------------------------
humanistic = Path("public/humanistic-interview/index.html")
h = humanistic.read_text(encoding="utf-8")

old_consent = '<label class="consent"><input type="checkbox" id="consent"><span>'
new_consent = '<label class="consent"><input type="checkbox" id="consent" name="consent" value="accepted" form="netlify-form"><span>'
if old_consent in h:
    h = replace_once(h, old_consent, new_consent, "consent form binding")
elif new_consent not in h:
    raise SystemExit("consent checkbox markup not found")

save_pattern = re.compile(
    r"function saveAll\(\)\{\n"
    r"  document\.querySelectorAll\('textarea\[data-q\]'\)\.forEach\(t=>answers\[t\.dataset\.q\]=t\.value\);\n"
    r"  sessionStorage\.setItem\(storageKey,JSON\.stringify\(answers\)\);\n"
    r"  const meta=\{\n"
    r"    midNote:document\.getElementById\('mid-note'\)\?\.value\|\|'',\n"
    r"    name:document\.getElementById\('participant-name'\)\?\.value\|\|'',\n"
    r"    email:document\.getElementById\('participant-email'\)\?\.value\|\|''\n"
    r"  \};\n"
    r"  sessionStorage\.setItem\(metaKey,JSON\.stringify\(meta\)\);\n"
    r"\}\n"
)
if "function safeSessionSet(key,value)" not in h:
    safe_block = """function safeSessionGet(key){
  try{return sessionStorage.getItem(key)}catch{return null}
}
function safeSessionSet(key,value){
  try{sessionStorage.setItem(key,value);return true}catch{return false}
}
function safeSessionRemove(key){
  try{sessionStorage.removeItem(key);return true}catch{return false}
}
function saveAll(){
  document.querySelectorAll('textarea[data-q]').forEach(t=>answers[t.dataset.q]=t.value);
  safeSessionSet(storageKey,JSON.stringify(answers));
  const meta={
    midNote:document.getElementById('mid-note')?.value||'',
    name:document.getElementById('participant-name')?.value||'',
    email:document.getElementById('participant-email')?.value||''
  };
  safeSessionSet(metaKey,JSON.stringify(meta));
}
"""
    h, n = save_pattern.subn(safe_block, h, count=1)
    if n != 1:
        raise SystemExit(f"safe session patch failed: {n}")

h = h.replace(
    "const m=JSON.parse(sessionStorage.getItem(metaKey)||'{}');",
    "const m=JSON.parse(safeSessionGet(metaKey)||'{}');",
    1,
)
h = h.replace(
    "try{Object.assign(answers,JSON.parse(sessionStorage.getItem(storageKey)||'{}'))}catch{}",
    "try{Object.assign(answers,JSON.parse(safeSessionGet(storageKey)||'{}'))}catch{}",
    1,
)

submit_pattern = re.compile(
    r"const form=document\.getElementById\('netlify-form'\);\n"
    r"form\.addEventListener\('submit',async e=>\{.*?\n\}\);",
    re.S,
)
submit_new = """const form=document.getElementById('netlify-form');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const status=document.getElementById('submit-status');
  const btn=document.getElementById('submit-btn');

  // Draft persistence is best-effort only. It must never block the network POST.
  saveAll();
  syncFormFields();

  if(!document.getElementById('consent').checked){
    status.textContent='請先勾選使用說明與隱私提醒，再進行送出。';
    return;
  }
  const email=document.getElementById('participant-email').value.trim();
  if(email && !document.getElementById('participant-email').checkValidity()){
    status.textContent='Email 格式似乎不完整，請修正或留白。';
    return;
  }
  if(location.protocol==='file:'){
    status.textContent='目前是本機預覽，尚未送出。';
    return;
  }

  btn.disabled=true;
  status.textContent='正在送出……';
  const fd=new FormData(form);
  const payload=new URLSearchParams();
  for(const [k,v] of fd.entries())payload.append(k,v);

  const controller=new AbortController();
  const timeoutId=setTimeout(()=>controller.abort(),20000);
  let r;
  let result={};
  try{
    r=await fetch('/api/humanistic-submit',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:payload.toString(),
      signal:controller.signal,
      credentials:'same-origin',
      cache:'no-store'
    });
    result=await r.json().catch(()=>({}));
  }catch(err){
    clearTimeout(timeoutId);
    status.textContent=err?.name==='AbortError'
      ?'送件連線逾時。你的回答仍保留在目前頁面，請稍後再試。'
      :'目前網路連線中斷，尚未送出。你的回答仍保留在目前頁面，請恢復連線後再試。';
    btn.disabled=false;
    return;
  }
  clearTimeout(timeoutId);

  if(r.status===503){
    status.textContent='送件服務暫時無法完成郵件傳送。你的回答尚未清除，請稍後再試；如需先離開，請先下載回答備份。';
    btn.disabled=false;
    return;
  }
  if(!r.ok || !result.ok){
    status.textContent='送件回應異常，尚未完成送出。你的回答仍保留在目前頁面，請稍後再試。';
    btn.disabled=false;
    return;
  }
  if(result.delivery!=='resend-email'){
    status.textContent='郵件交付尚未獲得確認，因此本頁不會宣告送件完成。你的回答仍保留，請稍後再試。';
    btn.disabled=false;
    return;
  }

  safeSessionSet(purgeMarker,'1');
  purgeSubmittedData();
  const successIdx=screens.findIndex(s=>s.id==='success');
  showScreen(successIdx);
  const msg=document.getElementById('success-message');
  const er=document.getElementById('email-result');
  msg.textContent=result.receiptId?`你的回答已完成送出。收件編號：${result.receiptId}`:'你的回答已完成送出。';
  er.textContent='為保護個人資料，成功送出後，本網站已清除本頁與目前瀏覽器分頁暫存中的姓名、Email 與 20 題回答；本網站不保留您輸入的文字。';
});"""
h, n = submit_pattern.subn(submit_new, h, count=1)
if n != 1:
    raise SystemExit(f"submit handler patch failed: {n}")

h = h.replace(
    "if(sessionStorage.getItem(purgeMarker)==='1')purgeSubmittedData();else hydrate();",
    "if(safeSessionGet(purgeMarker)==='1')purgeSubmittedData();else hydrate();",
    1,
)
h = h.replace(
    "window.addEventListener('pageshow',()=>{if(sessionStorage.getItem(purgeMarker)==='1')purgeSubmittedData()});",
    "window.addEventListener('pageshow',()=>{if(safeSessionGet(purgeMarker)==='1')purgeSubmittedData()});",
    1,
)
h = h.replace(
    "  sessionStorage.removeItem(purgeMarker);\n  location.reload();",
    "  safeSessionRemove(purgeMarker);\n  location.reload();",
    1,
)

for needle in (
    "function safeSessionSet(key,value)",
    'form="netlify-form"',
    "const timeoutId=setTimeout(()=>controller.abort(),20000);",
    "送件服務暫時無法完成郵件傳送",
    "result.delivery!=='resend-email'",
):
    if needle not in h:
        raise SystemExit(f"Humanistic browser gate missing: {needle}")

humanistic.write_text(h, encoding="utf-8")


# -----------------------------------------------------------------------------
# Humanistic server: structured delivery failures, no submitted content in logs.
# -----------------------------------------------------------------------------
api = Path("api/humanistic-submit.ts")
a = api.read_text(encoding="utf-8")

old_delivery = """    const delivery = await deliverViaResend(body, fullMessage, receiptId);
    if (delivery.attempted && delivery.ok) {
      // Privacy rule: never log submitted names, emails, answers, or the full message.
      console.log("HUMANISTIC_EMAIL_SENT", JSON.stringify({
        receiptId,
        provider: "resend",
        sentAt: new Date().toISOString(),
      }));
      return json(res, 200, { ok: true, delivery: "resend-email", receiptId });
    }

    console.error("HUMANISTIC_EMAIL_FAILED", JSON.stringify({
      receiptId,
      provider: "resend",
      status: delivery.status,
      failedAt: new Date().toISOString(),
    }));
    return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });
"""
new_delivery = """    const delivery = await deliverViaResend(body, fullMessage, receiptId);
    if (delivery.attempted && delivery.ok) {
      // Privacy rule: never log submitted names, emails, answers, or the full message.
      console.log("HUMANISTIC_EMAIL_SENT", JSON.stringify({
        receiptId,
        provider: "resend",
        sentAt: new Date().toISOString(),
      }));
      return json(res, 200, { ok: true, delivery: "resend-email", receiptId });
    }

    const code = delivery.attempted ? "DELIVERY_REJECTED" : "DELIVERY_NOT_CONFIGURED";
    console.error("HUMANISTIC_EMAIL_FAILED", JSON.stringify({
      receiptId,
      provider: "resend",
      code,
      status: delivery.status,
      failedAt: new Date().toISOString(),
    }));
    return json(res, 503, {
      ok: false,
      code,
      retryable: delivery.attempted,
      error: "Delivery unavailable. Please retry.",
      receiptId,
    });
"""
if "DELIVERY_REJECTED" not in a:
    a = replace_once(a, old_delivery, new_delivery, "server delivery block")

old_catch = '    return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });\n  }\n}\n'
new_catch = """    return json(res, 503, {
      ok: false,
      code: "DELIVERY_EXCEPTION",
      retryable: true,
      error: "Delivery unavailable. Please retry.",
      receiptId,
    });
  }
}
"""
if "DELIVERY_EXCEPTION" not in a:
    a = replace_once(a, old_catch, new_catch, "server exception block")

if "serverContentLogging: false" not in a:
    raise SystemExit("Server privacy contract missing")
api.write_text(a, encoding="utf-8")


# Release marker and operating note.
Path("public/stt-release-humanistic-cooperation-20260916.txt").write_text(
    "STT-COOP-HUMANISTIC-20260916-V2\n", encoding="utf-8"
)
Path("docs/HUMANISTIC_PRODUCTION_DELIVERY.md").write_text(
    """# Humanistic 20 Questions — production delivery contract

The public form submits to `/api/humanistic-submit` on the same origin.

Production success is declared only when the server confirms `delivery: \"resend-email\"` and returns a `receiptId`.
Failed or timed-out delivery never clears the participant's current-page answers.
Successful delivery clears the page and tab-session draft immediately.
Browser session storage is an optional draft convenience and must never be a prerequisite for POST delivery.

Required Vercel production environment variables:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — use an address on a domain verified in the STT Resend account for unrestricted production delivery.

Privacy rule: submitted names, email addresses, and answers must not be written to server logs or a server-side content store by this endpoint.
""",
    encoding="utf-8",
)

print("PASS deterministic STT Humanistic + Cooperation patch")
