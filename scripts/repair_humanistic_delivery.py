"""One-time, guarded repair of interview delivery. No questions/artwork are changed."""
from pathlib import Path
import hashlib
import re
import sys

p = Path(sys.argv[1] if len(sys.argv) > 1 else 'public/humanistic-interview/index.html')
s = p.read_text(encoding='utf-8')
MARKER = 'STT_DELIVERY_REPAIR_20261020'
if MARKER in s:
    print('Already repaired; no changes')
    raise SystemExit(0)
raw = p.read_bytes()
expected = 'd4e1381f63e28742156e1f7c9c041b87a0275a39'
actual = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
if actual != expected:
    raise SystemExit(f'Source changed: expected {expected}, got {actual}; review before repair')
original_assets = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', s)

def replace_between(start, end, replacement):
    global s
    if s.count(start) != 1 or s.count(end) != 1:
        raise SystemExit('Repair anchors are not unique')
    a, b = s.index(start), s.index(end)
    if b <= a:
        raise SystemExit('Invalid repair anchor order')
    s = s[:a] + replacement + '\n' + s[b:]

helpers = r'''
// STT_DELIVERY_REPAIR_20261020: storage failure must never block delivery.
let storageAvailable = true;
let deliveryPending = false;
let deliveryAccepted = false;
const backupUrls = new Set();
function sessionRead(key){try{return window.sessionStorage.getItem(key)}catch{storageAvailable=false;return null}}
function sessionRemove(key){try{window.sessionStorage.removeItem(key);return true}catch{storageAvailable=false;return false}}
function sessionWrite(key,value){try{window.sessionStorage.setItem(key,value);return true}catch{storageAvailable=false;return false}}
function storageNotice(){
  let el=document.getElementById('storage-warning');
  if(!el){el=document.createElement('div');el.id='storage-warning';el.className='soft-note';el.setAttribute('role','status');el.style.cssText='margin:12px auto;max-width:960px;padding:12px 18px;';document.querySelector('.topbar').insertAdjacentElement('afterend',el)}
  el.hidden=storageAvailable;
  el.textContent=storageAvailable?'':'這個瀏覽器目前無法暫存。回答仍在目前開啟的頁面，可直接複製、下載或送出；關閉或重新整理可能遺失內容，請先開啟回答備份並自行留存。';
}
function collectAnswers(){document.querySelectorAll('textarea[data-q]').forEach(t=>answers[t.dataset.q]=t.value)}
'''
s = s.replace("const purgeMarker='stt20q.v02.purge';", "const purgeMarker='stt20q.v02.purge';\n" + helpers, 1)
replace_between('function saveAll(){', 'function hydrate(){', r'''function saveAll(){
  collectAnswers();
  if(deliveryAccepted)return false;
  const meta={midNote:document.getElementById('mid-note')?.value||'',name:document.getElementById('participant-name')?.value||'',email:document.getElementById('participant-email')?.value||''};
  const a=sessionWrite(storageKey,JSON.stringify(answers));
  const b=sessionWrite(metaKey,JSON.stringify(meta));
  storageAvailable=a&&b;
  sessionRemove(purgeMarker);
  document.querySelectorAll('textarea[data-q]').forEach(t=>updateMeta(t.dataset.q));
  storageNotice();
  return storageAvailable;
}''')
s = s.replace('sessionStorage.getItem(', 'sessionRead(').replace('sessionStorage.removeItem(', 'sessionRemove(')
s = s.replace('window.sessionRead(', 'window.sessionStorage.getItem(').replace('window.sessionRemove(', 'window.sessionStorage.removeItem(')
s = s.replace("s.textContent=t.value.trim()?'已自動保存':'尚未填寫';", "s.textContent=t.value.trim()?(storageAvailable?'已暫存於本分頁':'僅保留於目前頁面'):'尚未填寫';")
s = s.replace("function purgeSubmittedData(){", "function purgeSubmittedData(){\n  const preview=document.getElementById('backup-preview');if(preview)preview.remove();\n  for(const url of backupUrls)URL.revokeObjectURL(url);backupUrls.clear();", 1)
replace_between('function backupText(){', 'function syncFormFields(){', r'''function backupText(){
  collectAnswers();
  const name=document.getElementById('participant-name')?.value||'未填';
  const email=document.getElementById('participant-email')?.value||'未填';
  const lines=['人文地景產｜20 Questions Journey','回答備份','',`姓名／署名：${name}`,`Email：${email}`,`產生時間：${new Date().toLocaleString('zh-TW')}`,''];
  for(let n=1;n<=20;n++){
    const q=document.querySelector(`#question-${n} h3`)?.textContent.trim()||'';
    const tip=document.querySelector(`#question-${n} .tip`)?.textContent.trim()||'';
    lines.push(`【${String(n).padStart(2,'0')}】${q}`,tip,`回答：${answers[n]||'（未填寫）'}`,'');
  }
  const mid=document.getElementById('mid-note')?.value||'';
  if(mid)lines.push('【中場補充】',mid,'');
  return lines.join('\n');
}
function backupPreview(text){
  let panel=document.getElementById('backup-preview');
  if(!panel){
    panel=document.createElement('section');panel.id='backup-preview';panel.className='soft-note';
    panel.innerHTML='<h3>完整回答備份</h3><p>下方包含目前的全部回答。可選取全文複製；手機也可使用「分享／儲存檔案」。請確認備份已留存，勿只依賴畫面上的下載按鈕。</p><label for="backup-full-text">可選取的完整回答</label><textarea id="backup-full-text" readonly rows="12" spellcheck="false" autocomplete="off"></textarea><div class="success-actions"><button id="backup-select-all" class="ghost" type="button">選取全部文字</button><button id="backup-share-file" class="ghost" type="button">分享／儲存檔案</button><button id="backup-close" class="ghost" type="button">收起備份</button></div><p id="backup-feedback" role="status" aria-live="polite"></p>';
    panel.style.cssText='margin:18px 0;max-width:100%;';
    const area=panel.querySelector('textarea');area.style.cssText='display:block;width:100%;max-width:100%;box-sizing:border-box;min-height:260px;font-size:16px;white-space:pre-wrap;user-select:text;-webkit-user-select:text;touch-action:auto;';
    document.getElementById('download-backup').parentElement.insertAdjacentElement('afterend',panel);
    panel.querySelector('#backup-select-all').onclick=selectBackup;
    panel.querySelector('#backup-share-file').onclick=shareBackup;
    panel.querySelector('#backup-close').onclick=()=>{panel.hidden=true};
  }
  panel.hidden=false;panel.querySelector('textarea').value=text;
  return panel;
}
function backupFeedback(message){const el=document.getElementById('backup-feedback');if(el)el.textContent=message}
function selectBackup(){const el=document.getElementById('backup-full-text');if(!el)return;el.focus();el.select();el.setSelectionRange(0,el.value.length);backupFeedback('已選取全文；請使用瀏覽器的「複製」或鍵盤複製指令。')}
function backupFilename(extension='txt'){const name=(document.getElementById('participant-name')?.value.trim()||'受訪者').replace(/[\\/:*?"<>|\x00-\x1f]/g,'_').slice(0,60);return `人文地景產_20Questions_${name}_回答備份.${extension}`}
function launchDownload(text,type,filename){
  const blob=new Blob(['\ufeff',text],{type});const url=URL.createObjectURL(blob);backupUrls.add(url);
  const link=document.createElement('a');link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>{URL.revokeObjectURL(url);backupUrls.delete(url)},60000);
}
function downloadBackup(){
  saveAll();const text=backupText();backupPreview(text);
  try{launchDownload(text,'text/plain;charset=utf-8',backupFilename());backupFeedback('已發出下載請求，請確認瀏覽器的下載清單或檔案。若未出現檔案，可選取下方全文，或使用「分享／儲存檔案」。')}
  catch{backupFeedback('此瀏覽器未能啟動下載。完整回答已顯示在下方，請選取全文複製或使用分享。')}
}
function copyBackup(){
  saveAll();const text=backupText();backupPreview(text);
  const fallback=()=>{selectBackup();backupFeedback('自動複製未完成。全文已選取，請長按文字選擇「複製」，或使用鍵盤複製指令。')};
  try{
    if(!navigator.clipboard?.writeText){fallback();return}
    const operation=navigator.clipboard.writeText(text);
    const timer=setTimeout(fallback,3000);
    operation.then(()=>{clearTimeout(timer);backupFeedback('已複製全部回答。')},()=>{clearTimeout(timer);fallback()});
  }catch{fallback()}
}
function shareBackup(){
  const text=backupText();backupPreview(text);
  try{
    const file=new File(['\ufeff',text],backupFilename(),{type:'text/plain'});
    if(!navigator.share||!navigator.canShare?.({files:[file]})){backupFeedback('此瀏覽器未提供檔案分享；請使用下載或選取全文複製。');return}
    navigator.share({files:[file],title:'人文地景產｜回答備份'}).then(()=>backupFeedback('已交由系統分享功能處理，請確認儲存位置。'),()=>backupFeedback('分享未完成；完整回答仍顯示在下方，可再次選擇儲存或複製。'));
  }catch{backupFeedback('分享未啟動；請使用下載或選取全文複製。')}
}
['download-backup','download-backup-success'].forEach(id=>document.getElementById(id)?.addEventListener('click',downloadBackup));
['copy-backup','copy-backup-success'].forEach(id=>document.getElementById(id)?.addEventListener('click',copyBackup));
document.getElementById('save-now').onclick=()=>{const ok=saveAll();alert(ok?'目前回答僅暫存在這個瀏覽器分頁；成功送出後會立即清除。':'瀏覽器無法暫存；目前頁面仍有回答。請先複製或下載，關閉或重新整理可能遺失內容。')};
document.getElementById('export-json').onclick=()=>{
  saveAll();backupPreview(backupText());
  const data={answers,mid_note:document.getElementById('mid-note')?.value||'',participant_name:document.getElementById('participant-name')?.value||'',participant_email:document.getElementById('participant-email')?.value||'',exported_at:new Date().toISOString()};
  try{launchDownload(JSON.stringify(data,null,2),'application/json;charset=utf-8',backupFilename('json'));backupFeedback('已發出 JSON 下載請求，請確認檔案已留存。')}
  catch{backupFeedback('JSON 下載未啟動，請使用下方完整回答備份。')}
};
''')
replace_between('async function sendEmailBackup(){', '</script></body>', r'''const form=document.getElementById('netlify-form');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(deliveryPending||deliveryAccepted)return;
  const status=document.getElementById('submit-status');
  const btn=document.getElementById('submit-btn');
  saveAll();
  if(!document.getElementById('consent').checked){status.textContent='請先勾選使用說明與隱私提醒，再進行送出。';return}
  const email=document.getElementById('participant-email');
  if(email.value.trim()&&!email.checkValidity()){status.textContent='Email 格式似乎不完整，請修正或留白。';return}
  if(location.protocol==='file:'){status.textContent='目前是本機預覽，尚未送出。';return}
  if(!Object.values(answers).some(v=>String(v).trim())){status.textContent='目前沒有回答內容，請先填寫再送出。';return}
  deliveryPending=true;btn.disabled=true;status.textContent='正在送出……';
  let timer;let controller;
  try{
    syncFormFields();
    const payload=new URLSearchParams();for(const[k,v]of new FormData(form))payload.append(k,String(v));
    controller=new AbortController();
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('timeout'))},20000)});
    const operation=(async()=>{
      const r=await fetch('/api/humanistic-submit',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString(),signal:controller.signal,cache:'no-store'});
      const result=await r.json();
      if(!r.ok||result.ok!==true||result.delivery!=='resend-email'||typeof result.receiptId!=='string'||!/^HUM-[A-Z0-9-]+$/i.test(result.receiptId))throw new Error('delivery_failed');
      return result;
    })();
    const result=await Promise.race([operation,timeout]);
    clearTimeout(timer);
    deliveryAccepted=true;
    sessionWrite(purgeMarker,'1');
    purgeSubmittedData();
    showScreen(screens.findIndex(s=>s.id==='success'));
    document.getElementById('success-message').textContent=`你的回答已完成送出。收件編號：${result.receiptId}`;
  }catch{
    if(deliveryAccepted){status.textContent='已取得收件回覆；成功畫面未完整更新，請勿重複送出。'}
    else{status.textContent='未取得有效收件確認，請勿關閉或重新整理。本頁回答未清除；可先複製、下載或使用下方完整回答備份，再重試。';backupPreview(backupText())}
  }finally{clearTimeout(timer);deliveryPending=false;btn.disabled=deliveryAccepted}
});
if(sessionRead(purgeMarker)==='1')purgeSubmittedData();else hydrate();
showScreen(0);storageNotice();
window.addEventListener('pageshow',()=>{if(deliveryAccepted||sessionRead(purgeMarker)==='1')purgeSubmittedData()});
window.addEventListener('beforeunload',e=>{
  if(deliveryAccepted)return;
  if([...document.querySelectorAll('textarea[data-q]')].some(t=>t.value.trim())){e.preventDefault();e.returnValue=''}
});
document.getElementById('restart-clean')?.addEventListener('click',()=>{sessionRemove(purgeMarker);location.reload()});
''')
s = s.replace(' data-netlify="true" netlify-honeypot="bot-field"','')
for required in [MARKER, 'backup-full-text', 'navigator.canShare', 'Promise.race', 'result.receiptId', 'storageNotice()']:
    if required not in s:raise SystemExit('Missing repair requirement: '+required)
if 'localStorage' in s or '/api/send-backup' in s:raise SystemExit('Obsolete transport/storage present')
if original_assets != re.findall(r'(?:src|href)=["\']([^"\']+)["\']', s):
    raise SystemExit('Asset/link references changed unexpectedly')
p.write_text(s,encoding='utf-8')
print('Repaired delivery without changing question/artwork/link references:',len(s))
