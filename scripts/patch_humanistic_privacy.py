from pathlib import Path
import re

p = Path('public/humanistic-interview/index.html')
s = p.read_text(encoding='utf-8')


def replace_once(old: str, new: str, label: str):
    global s
    n = s.count(old)
    if n != 1:
        raise SystemExit(f'{label}: expected 1 occurrence, found {n}')
    s = s.replace(old, new, 1)


# Privacy-first browser storage: keep drafts only in the current tab session.
s = s.replace('localStorage', 'sessionStorage')

replace_once(
    "const metaKey='stt20q.v02.meta';",
    "const metaKey='stt20q.v02.meta';\nconst purgeMarker='stt20q.v02.purge';",
    'purge marker',
)

replace_once(
    '<div class="confirm-list"><div id="review-1-20" class="review-grid"></div></div>\n    <div class="contact-grid">',
    '<div class="confirm-list"><div id="review-1-20" class="review-grid"></div></div>\n    <div class="soft-note" id="privacy-final-notice"><strong>隱私提醒｜送出前請確認</strong><br>文字送出後，本網站不保留您輸入的文字。填寫期間的內容僅暫存在目前瀏覽器分頁，以避免換題或重新整理時遺失；成功送出後，姓名、Email、20 題回答與暫存資料會立即從本頁及瀏覽器暫存中清除。送件內容僅透過郵件服務傳送至 STT 指定收件信箱。</div>\n    <div class="contact-grid">',
    'final privacy notice',
)

replace_once('回答備份 Email（選填）', '聯絡 Email（選填）', 'email label')
replace_once('autocomplete="name"', 'autocomplete="off"', 'name autocomplete')
replace_once('type="email" autocomplete="email"', 'type="email" autocomplete="off"', 'email autocomplete')
replace_once(
    '<form id="netlify-form" name="humanistic-20q" method="POST" action="/api/humanistic-submit" data-netlify="true" netlify-honeypot="bot-field">',
    '<form id="netlify-form" name="humanistic-20q" method="POST" action="/api/humanistic-submit" autocomplete="off" data-netlify="true" netlify-honeypot="bot-field">',
    'form autocomplete',
)

s = re.sub(r'<textarea id="q(\d+)"', r'<textarea autocomplete="off" id="q\1"', s)

replace_once(
    '不論是否填 Email，都可以先下載一份回答備份；若網站已啟用郵件服務，送出後也會寄一份到你填寫的信箱。',
    '如果希望自行留存，請務必在送出前使用「下載我的回答備份」或「複製全部回答」。成功送出後，本頁輸入文字與暫存資料會立即清除，本網站無法再替你取回。',
    'backup note',
)

replace_once(
    '我了解這些回答將作為人物專訪之整理與撰稿素材；正式公開前，我仍可就涉及本人的內容與直接引言進行確認或修正。',
    '我了解這些回答將作為人物專訪之整理與撰稿素材；正式公開前，我仍可就涉及本人的內容與直接引言進行確認或修正；並已閱讀上方隱私提醒，了解成功送出後本網站會立即清除本頁及瀏覽器暫存中的輸入文字。',
    'consent text',
)

replace_once('<h2>這一份回答，也留一份給你自己。</h2>', '<h2>送件完成，輸入內容已清除。</h2>', 'success title')
replace_once('<p class="lead" id="success-message">你的回答已完成封存。</p>', '<p class="lead" id="success-message">你的回答已完成送出。</p>', 'success message')
replace_once(
    '<div class="post-submit-note" id="email-result">回答備份可立即下載；如果你剛才填寫 Email，系統會回報郵件是否已寄出。</div>',
    '<div class="post-submit-note" id="email-result">為保護個人資料，成功送出後，本網站已清除本頁與目前瀏覽器分頁暫存中的姓名、Email 與 20 題回答；本網站不保留您輸入的文字。</div>',
    'success privacy text',
)

success_actions_pattern = r'<div class="success-actions">\s*<button class="primary" id="download-backup-success" type="button">下載我的回答備份</button>\s*<button class="ghost" id="copy-backup-success" type="button">複製全部回答</button>\s*</div>'
s, n = re.subn(
    success_actions_pattern,
    '<div class="success-actions"><button class="primary" id="restart-clean" type="button">完成並返回乾淨首頁</button></div>',
    s,
    count=1,
)
if n != 1:
    raise SystemExit(f'success actions: expected 1 occurrence, found {n}')

replace_once(
    "document.getElementById('save-now').onclick=()=>{saveAll();alert('目前回答已保存在這台裝置。')};",
    "document.getElementById('save-now').onclick=()=>{saveAll();alert('目前回答僅暫存在這個瀏覽器分頁；成功送出後會立即清除。')};",
    'save-now message',
)

purge_fn = r'''function purgeSubmittedData(){
  try{
    sessionStorage.removeItem(storageKey);
    sessionStorage.removeItem(metaKey);
    sessionStorage.removeItem('stt20q.v02.submitted');
  }catch{}
  Object.keys(answers).forEach(k=>delete answers[k]);
  document.querySelectorAll('textarea[data-q]').forEach(t=>{
    t.value='';
    const n=t.dataset.q;
    const c=document.querySelector(`[data-count-for="${n}"]`);if(c)c.textContent='0';
    const st=document.querySelector(`[data-save-for="${n}"]`);if(st){st.textContent='尚未填寫';st.classList.remove('saved')}
  });
  ['mid-note','participant-name','participant-email'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
  document.querySelectorAll('#netlify-form input').forEach(el=>{if(el.name!=='form-name' && el.type!=='checkbox')el.value=''});
  const consent=document.getElementById('consent');if(consent)consent.checked=false;
  const status=document.getElementById('submit-status');if(status)status.textContent='';
  updateReviews();
  updateFinal();
  const tools=document.querySelector('.bottom-tools');if(tools)tools.style.display='none';
}

'''
marker = 'function updateMeta(n){'
if s.count(marker) != 1:
    raise SystemExit('updateMeta marker not unique')
s = s.replace(marker, purge_fn + marker, 1)

submit_pattern = r"const form=document\.getElementById\('netlify-form'\);.*?\n\}\);\n\nhydrate\(\);\nshowScreen\(0\);"
submit_replacement = r'''const form=document.getElementById('netlify-form');
form.addEventListener('submit',async e=>{
  e.preventDefault(); saveAll(); syncFormFields();
  const status=document.getElementById('submit-status');
  const btn=document.getElementById('submit-btn');
  if(!document.getElementById('consent').checked){status.textContent='請先勾選使用說明與隱私提醒，再進行送出。';return}
  const email=document.getElementById('participant-email').value.trim();
  if(email && !document.getElementById('participant-email').checkValidity()){status.textContent='Email 格式似乎不完整，請修正或留白。';return}
  if(location.protocol==='file:'){status.textContent='目前是本機預覽，尚未送出。';return}

  btn.disabled=true;status.textContent='正在送出……';
  const fd=new FormData(form);
  const payload=new URLSearchParams();
  for(const [k,v] of fd.entries())payload.append(k,v);

  try{
    const r=await fetch('/api/humanistic-submit',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString()});
    const result=await r.json().catch(()=>({}));
    if(!r.ok || !result.ok || result.delivery!=='resend-email')throw new Error('delivery_failed');

    sessionStorage.setItem(purgeMarker,'1');
    purgeSubmittedData();
    const successIdx=screens.findIndex(s=>s.id==='success');
    showScreen(successIdx);
    const msg=document.getElementById('success-message');
    const er=document.getElementById('email-result');
    msg.textContent=result.receiptId?`你的回答已完成送出。收件編號：${result.receiptId}`:'你的回答已完成送出。';
    er.textContent='為保護個人資料，成功送出後，本網站已清除本頁與目前瀏覽器分頁暫存中的姓名、Email 與 20 題回答；本網站不保留您輸入的文字。';
  }catch(err){
    status.textContent='送出未完成。為避免資料遺失，本頁回答暫時仍保留在目前瀏覽器分頁；請稍後再試，或先下載備份。';
    btn.disabled=false;
  }
});

if(sessionStorage.getItem(purgeMarker)==='1')purgeSubmittedData();else hydrate();
showScreen(0);
window.addEventListener('pageshow',()=>{if(sessionStorage.getItem(purgeMarker)==='1')purgeSubmittedData()});
document.getElementById('restart-clean')?.addEventListener('click',()=>{
  sessionStorage.removeItem(purgeMarker);
  location.reload();
});'''

s, n = re.subn(submit_pattern, submit_replacement, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f'submit handler: expected 1 replacement, found {n}')

checks = {
    'privacy notice': '文字送出後，本網站不保留您輸入的文字。',
    'purge function': 'function purgeSubmittedData()',
    'temporary session storage': 'sessionStorage.setItem(storageKey',
    'delivery verification': "result.delivery!=='resend-email'",
    'clean success': '送件完成，輸入內容已清除。',
}
for label, needle in checks.items():
    if needle not in s:
        raise SystemExit(f'missing {label}')
if 'localStorage' in s:
    raise SystemExit('localStorage remains in Humanistic page')

p.write_text(s, encoding='utf-8')
print('privacy patch applied', len(s))
