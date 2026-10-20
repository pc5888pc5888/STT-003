// STT interview delivery 20261020.2. Approved questions and art remain in index.html.
const screens=[...document.querySelectorAll('.screen')];
let current=0,editReturnIndex=null;
const answers={};
const storageKey='stt20q.v02.answers',metaKey='stt20q.v02.meta',purgeMarker='stt20q.v02.purge';
const positionKey='stt20q.v02.position',deliveryKey='stt20q.v02.delivery',receiptKey='stt20q.v02.receipt';
const DELIVERY_VERSION='20261020.2';
let storageAvailable=true,deliveryPending=false,deliveryAccepted=false,memoryEnvelope=null;
const backupUrls=new Set();
function sessionRead(key){try{return sessionStorage.getItem(key)}catch{storageAvailable=false;return null}}
function sessionRemove(key){try{sessionStorage.removeItem(key);return true}catch{storageAvailable=false;return false}}
function sessionWrite(key,value){try{sessionStorage.setItem(key,value);return true}catch{storageAvailable=false;return false}}
function storageNotice(){
 let el=document.getElementById('storage-warning');
 if(!el){el=document.createElement('div');el.id='storage-warning';el.className='soft-note';el.setAttribute('role','status');el.style.cssText='margin:12px auto;max-width:960px;padding:12px 18px;';document.querySelector('.topbar').insertAdjacentElement('afterend',el)}
 el.hidden=storageAvailable||deliveryAccepted;
 el.textContent=storageAvailable?'':'這個瀏覽器目前無法暫存。回答仍在目前開啟的頁面，可直接複製、下載或送出；關閉或重新整理可能遺失內容，請先開啟回答備份並自行留存。';
}
function collectAnswers(){document.querySelectorAll('textarea[data-q]').forEach(t=>answers[t.dataset.q]=t.value)}
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))}
function currentQuestionNumber(){const n=screens[current]?.dataset?.qscreen;return n?Number(n):null}
function showScreen(index){
 if(index<0||index>=screens.length)return;
 screens[current]?.classList.remove('active');current=index;
 if(!deliveryAccepted)sessionWrite(positionKey,String(index));
 screens[current].classList.add('active');
 const p=Number(screens[current].dataset.progress||0),q=currentQuestionNumber();
 document.getElementById('progress-bar').style.width=(p/20*100)+'%';
 document.getElementById('step-label').textContent=q?`Q ${String(q).padStart(2,'0')} / 20`:(p>=20?'20 / 20':`${p} / 20`);
 updateQuestionNav();updateReviews();updateFinal();window.scrollTo({top:0,behavior:'smooth'});
}
function saveAll(){
 collectAnswers();if(deliveryAccepted)return false;
 const meta={midNote:document.getElementById('mid-note')?.value||'',name:document.getElementById('participant-name')?.value||'',email:document.getElementById('participant-email')?.value||''};
 const a=sessionWrite(storageKey,JSON.stringify(answers)),b=sessionWrite(metaKey,JSON.stringify(meta));storageAvailable=a&&b;
 sessionRemove(purgeMarker);document.querySelectorAll('textarea[data-q]').forEach(t=>updateMeta(t.dataset.q));storageNotice();return storageAvailable;
}
function hydrate(){
 try{const saved=JSON.parse(sessionRead(storageKey)||'{}');for(let n=1;n<=20;n++)if(typeof saved?.[n]==='string')answers[n]=saved[n]}catch{}
 document.querySelectorAll('textarea[data-q]').forEach(t=>{t.value=answers[t.dataset.q]||'';updateMeta(t.dataset.q)});
 try{const m=JSON.parse(sessionRead(metaKey)||'{}');for(const[id,key]of [['mid-note','midNote'],['participant-name','name'],['participant-email','email']])if(typeof m?.[key]==='string')document.getElementById(id).value=m[key]}catch{}
 updateReviews();updateFinal();
}
function purgeSubmittedData(){
 document.getElementById('backup-preview')?.remove();for(const url of backupUrls)URL.revokeObjectURL(url);backupUrls.clear();
 [storageKey,metaKey,'stt20q.v02.submitted',positionKey,deliveryKey].forEach(sessionRemove);
 Object.keys(answers).forEach(k=>delete answers[k]);
 document.querySelectorAll('textarea[data-q]').forEach(t=>{t.value='';const n=t.dataset.q,c=document.querySelector(`[data-count-for="${n}"]`),st=document.querySelector(`[data-save-for="${n}"]`);if(c)c.textContent='0';if(st){st.textContent='尚未填寫';st.classList.remove('saved')}});
 ['mid-note','participant-name','participant-email'].forEach(id=>{document.getElementById(id).value=''});
 document.querySelectorAll('#interview-form input').forEach(el=>{if(el.name!=='form-name'&&el.type!=='checkbox')el.value=''});
 document.getElementById('consent').checked=false;document.getElementById('submit-status').textContent='';updateReviews();updateFinal();
 const tools=document.querySelector('.bottom-tools');if(tools)tools.style.display='none';
}
function updateMeta(n){
 const t=document.getElementById('q'+n);if(!t)return;answers[n]=t.value;
 const c=document.querySelector(`[data-count-for="${n}"]`);if(c)c.textContent=[...t.value].length;
 const s=document.querySelector(`[data-save-for="${n}"]`);if(s){s.textContent=t.value.trim()?(storageAvailable?'已暫存於本分頁':'僅保留於目前頁面'):'尚未填寫';s.classList.toggle('saved',!!t.value.trim())}
}
document.querySelectorAll('textarea[data-q]').forEach(t=>t.addEventListener('input',()=>{updateMeta(t.dataset.q);saveAll();updateReviews();updateFinal()}));
['mid-note','participant-name','participant-email'].forEach(id=>document.getElementById(id)?.addEventListener('input',saveAll));
function reviewHtml(limit){return Array.from({length:limit},(_,i)=>{const n=i+1,a=(answers[n]||'').trim();return `<button type="button" class="review-item ${a?'':'empty'}" data-jump-q="${n}"><strong>第 ${String(n).padStart(2,'0')} 題｜點一下即可修改</strong>${a?escapeHtml(a.slice(0,72))+(a.length>72?'…':''):'尚未填寫，點一下回去補上'}</button>`}).join('')}
function updateReviews(){const a=document.getElementById('review-1-12'),b=document.getElementById('review-1-20');if(a)a.innerHTML=reviewHtml(12);if(b)b.innerHTML=reviewHtml(20)}
function updateFinal(){const c=Array.from({length:20},(_,i)=>(answers[i+1]||'').trim()).filter(Boolean).length;document.getElementById('answered-count').textContent=c+' / 20'}
function questionScreenIndex(n){return screens.findIndex(s=>Number(s.dataset.qscreen||0)===Number(n))}
function jumpToQuestion(n,returnIndex){saveAll();editReturnIndex=returnIndex;const idx=questionScreenIndex(n);if(idx<0)return;showScreen(idx);document.getElementById('edit-context-'+n)?.classList.add('show');setTimeout(()=>document.getElementById('q'+n)?.focus(),250)}
document.addEventListener('click',e=>{
 if(deliveryPending||deliveryAccepted)return;
 const item=e.target.closest('[data-jump-q]');if(item)jumpToQuestion(Number(item.dataset.jumpQ),screens.indexOf(item.closest('.screen')));
 if(e.target.closest('[data-next]')){saveAll();showScreen(current+1)}
 if(e.target.closest('[data-prev]')){saveAll();showScreen(current-1)}
});
function updateQuestionNav(){
 document.querySelectorAll('.edit-context').forEach(x=>x.classList.remove('show'));const q=currentQuestionNumber();if(!q)return;
 const prev=screens[current].querySelector('.q-prev'),next=screens[current].querySelector('.q-next');
 if(editReturnIndex!==null){document.getElementById('edit-context-'+q)?.classList.add('show');if(prev)prev.textContent='返回確認頁';if(next)next.textContent='儲存並返回確認頁'}
 else{if(prev)prev.textContent='上一頁';if(next)next.textContent=[4,8,12,16,20].includes(q)?'完成這一站':'下一題'}
}
document.addEventListener('click',e=>{
 if(deliveryPending||deliveryAccepted||(!e.target.closest('.q-prev')&&!e.target.closest('.q-next')))return;saveAll();
 if(editReturnIndex!==null){const target=editReturnIndex;editReturnIndex=null;showScreen(target);return}
 if(e.target.closest('.q-prev'))showScreen(current-1);if(e.target.closest('.q-next'))showScreen(current+1);
});
function draftData(){collectAnswers();return {schema:'stt-humanistic-20q',version:1,answers:{...answers},mid_note:document.getElementById('mid-note').value,participant_name:document.getElementById('participant-name').value,participant_email:document.getElementById('participant-email').value,exported_at:new Date().toISOString()}}
function backupText(){
 const data=draftData(),lines=['人文地景產｜20 Questions Journey','回答備份','',`姓名／署名：${data.participant_name||'未填'}`,`Email：${data.participant_email||'未填'}`,`產生時間：${data.exported_at}`,''];
 for(let n=1;n<=20;n++)lines.push(`【${String(n).padStart(2,'0')}】${document.querySelector(`#question-${n} h3`).textContent.trim()}`,document.querySelector(`#question-${n} .tip`).textContent.trim(),`回答：${data.answers[n]||'（未填寫）'}`,'');
 if(data.mid_note)lines.push('【中場補充】',data.mid_note,'');return lines.join('\n');
}
function backupPreview(text){
 let panel=document.getElementById('backup-preview');
 if(!panel){
  panel=document.createElement('section');panel.id='backup-preview';panel.className='soft-note';panel.setAttribute('aria-label','回答備份');
  panel.innerHTML='<h3>完整回答備份</h3><p>「儲存草稿」會產生可重新讀回的草稿檔；「下載文字」可直接閱讀。檔案由你自行保管，不會自動上傳。請確認檔案已儲存，再關閉分頁。</p><label for="backup-full-text">可選取的完整回答</label><textarea id="backup-full-text" readonly rows="12" spellcheck="false" autocomplete="off"></textarea><div class="success-actions"><button id="backup-select-all" class="ghost" type="button">選取全部文字</button><button id="backup-save-draft" class="ghost" type="button">儲存草稿檔</button><button id="backup-share-file" class="ghost" type="button">分享／儲存文字檔</button><button id="backup-download-text" class="ghost" type="button">下載文字備份</button><button id="backup-close" class="ghost" type="button">收起備份</button></div><p id="backup-feedback" role="status" aria-live="polite"></p>';
  panel.style.cssText='margin:20px auto;max-width:920px;scroll-margin-top:90px;';panel.querySelector('textarea').style.cssText='display:block;width:100%;box-sizing:border-box;min-height:260px;font-size:16px;white-space:pre-wrap;user-select:text;-webkit-user-select:text;touch-action:auto;';
  panel.querySelector('#backup-select-all').onclick=selectBackup;panel.querySelector('#backup-save-draft').onclick=saveDraftFile;panel.querySelector('#backup-share-file').onclick=shareTextFile;panel.querySelector('#backup-download-text').onclick=downloadBackup;panel.querySelector('#backup-close').onclick=()=>{panel.hidden=true};
 }
 const active=screens[current],host=active.querySelector('.copy-panel')||active;if(panel.parentElement!==host)host.appendChild(panel);
 panel.hidden=false;panel.querySelector('textarea').value=text;panel.scrollIntoView({block:'start',behavior:'auto'});return panel;
}
function backupFeedback(message){const el=document.getElementById('backup-feedback');if(el)el.textContent=message}
function selectBackup(){const el=document.getElementById('backup-full-text');if(!el)return;el.focus();el.select();el.setSelectionRange(0,el.value.length);backupFeedback('已選取全文；請使用瀏覽器的「複製」或鍵盤複製指令。')}
function backupFilename(extension='txt'){const name=(document.getElementById('participant-name').value.trim()||'受訪者').replace(/[\\/:*?"<>|\x00-\x1f]/g,'_').slice(0,60);return `人文地景產_20Questions_${name}_回答備份.${extension}`}
function launchDownload(text,type,filename){const url=URL.createObjectURL(new Blob(['\ufeff',text],{type}));backupUrls.add(url);const link=document.createElement('a');link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>{URL.revokeObjectURL(url);backupUrls.delete(url)},60000)}
function downloadBackup(){
 saveAll();const text=backupText();backupPreview(text);
 try{launchDownload(text,'text/plain;charset=utf-8',backupFilename());backupFeedback('已發出文字下載請求，請確認下載清單或檔案。未出現檔案時，可用「分享／儲存文字檔」或選取全文複製。')}
 catch{backupFeedback('瀏覽器未能啟動下載。完整回答已顯示，請選取全文複製或使用分享／儲存文字檔。')}
}
function copyBackup(){
 saveAll();const text=backupText();backupPreview(text);
 const fallback=()=>{selectBackup();let copied=false;try{copied=document.execCommand('copy')}catch{}backupFeedback(copied?'已複製全部回答。':'自動複製未完成。完整回答已選取，請長按文字選擇「複製」，或使用鍵盤複製指令。')};
 try{if(!navigator.clipboard?.writeText){fallback();return}const operation=navigator.clipboard.writeText(text),timer=setTimeout(fallback,3000);operation.then(()=>{clearTimeout(timer);backupFeedback('已複製全部回答。')},()=>{clearTimeout(timer);fallback()})}catch{fallback()}
}
function shareTextFile(){
 saveAll();const text=backupText();backupPreview(text);
 try{const file=new File(['\ufeff',text],backupFilename(),{type:'text/plain'});if(!navigator.share||!navigator.canShare?.({files:[file]})){downloadBackup();return}navigator.share({files:[file],title:'人文地景產｜回答備份'}).then(()=>backupFeedback('已交由系統分享功能處理，請確認儲存位置。'),()=>backupFeedback('分享未完成；回答未清除，可改用下載文字或選取全文複製。'))}catch{downloadBackup()}
}
async function saveDraftFile(){
 saveAll();const text=JSON.stringify(draftData(),null,2),filename=backupFilename('json');backupPreview(backupText());
 try{
  if(typeof window.showSaveFilePicker==='function'){
   const handle=await window.showSaveFilePicker({suggestedName:filename,types:[{description:'STT 訪談草稿',accept:{'application/json':['.json']}}]});
   const writable=await handle.createWritable();await writable.write(text);await writable.close();backupFeedback('草稿檔已儲存。下次可在此頁選擇「讀取草稿檔」繼續填寫。');return;
  }
  const file=new File([text],filename,{type:'application/json'});
  if(navigator.share&&navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'STT 訪談草稿'});backupFeedback('已交由系統分享功能處理；請確認草稿檔已儲存。下次可用「讀取草稿檔」繼續填寫。');return}
  launchDownload(text,'application/json;charset=utf-8',filename);backupFeedback('已發出草稿檔下載請求，請確認檔案已儲存。下次可用「讀取草稿檔」繼續填寫。');
 }catch(error){
  if(error?.name==='AbortError'){backupFeedback('已取消儲存，回答未清除。');return}
  try{launchDownload(text,'application/json;charset=utf-8',filename);backupFeedback('直接儲存未完成，已改發出草稿下載請求。請確認檔案；完整回答仍可選取複製。')}catch{backupFeedback('瀏覽器未能儲存檔案。回答未清除，請選取下方全文複製。')}
 }
}
async function importDraftFile(event){
 const file=event.target.files?.[0];event.target.value='';if(!file||deliveryPending||deliveryAccepted)return;
 const note=document.getElementById('draft-import-status');
 try{
  if(file.size>2*1024*1024)throw new Error('size');const data=JSON.parse((await file.text()).replace(/^\ufeff/,''));
  if(!data||typeof data!=='object'||!data.answers||typeof data.answers!=='object'||Array.isArray(data.answers))throw new Error('schema');
  if(data.schema&&data.schema!=='stt-humanistic-20q')throw new Error('schema');
  const clean={};for(let n=1;n<=20;n++){const v=data.answers[n]??'';if(typeof v!=='string')throw new Error('schema');clean[n]=v}
  for(const k of ['mid_note','participant_name','participant_email'])if(data[k]!==undefined&&typeof data[k]!=='string')throw new Error('schema');
  collectAnswers();if(Object.values(answers).some(v=>v.trim())&&!window.confirm('讀取草稿會取代目前頁面的回答。尚未留存的內容請先儲存；確定要讀取嗎？'))return;
  for(let n=1;n<=20;n++)document.getElementById('q'+n).value=clean[n];
  document.getElementById('mid-note').value=data.mid_note||'';document.getElementById('participant-name').value=data.participant_name||'';document.getElementById('participant-email').value=data.participant_email||'';document.getElementById('consent').checked=false;
  sessionRemove(deliveryKey);memoryEnvelope=null;saveAll();updateReviews();updateFinal();note.textContent='草稿已讀回。檔案只在此裝置讀取，尚未送出。';
 }catch{note.textContent='這不是可讀取的 STT 草稿檔，或檔案過大／已損壞。目前回答未變更。'}
}
['download-backup','toolbar-download'].forEach(id=>document.getElementById(id)?.addEventListener('click',downloadBackup));
['copy-backup','toolbar-copy'].forEach(id=>document.getElementById(id)?.addEventListener('click',copyBackup));
['save-now','save-draft-final'].forEach(id=>document.getElementById(id)?.addEventListener('click',saveDraftFile));
document.getElementById('read-draft').onclick=()=>document.getElementById('draft-file').click();document.getElementById('draft-file').onchange=importDraftFile;
document.getElementById('toolbar-submit').onclick=()=>{if(deliveryPending||deliveryAccepted)return;saveAll();editReturnIndex=null;showScreen(screens.findIndex(s=>s.id==='submit'))};
function syncFormFields(){
 document.getElementById('form-participant-name').value=document.getElementById('participant-name').value;document.getElementById('form-participant-email').value=document.getElementById('participant-email').value.trim();document.getElementById('form-email').value=document.getElementById('participant-email').value.trim();document.getElementById('form-mid-note').value=document.getElementById('mid-note').value;
 for(let n=1;n<=20;n++)document.getElementById(`form-q${String(n).padStart(2,'0')}`).value=answers[n]||'';
}
async function deliveryEnvelope(payload){
 const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(payload.toString())),digest=Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,'0')).join('');
 let prior=memoryEnvelope;try{prior=prior||JSON.parse(sessionRead(deliveryKey)||'null')}catch{}
 if(!prior||prior.digest!==digest||typeof prior.id!=='string'||!/^[-a-z0-9]{16,80}$/i.test(prior.id)){
  const id=crypto.randomUUID?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint8Array(16)),v=>v.toString(16).padStart(2,'0')).join('');prior={digest,id,created:new Date().toISOString()};
 }
 memoryEnvelope=prior;sessionWrite(deliveryKey,JSON.stringify(prior));return prior;
}
function lockEditing(locked){document.querySelectorAll('textarea[data-q],#mid-note,#participant-name,#participant-email,#consent,[data-next],[data-prev],.q-next,.q-prev,[data-jump-q],#toolbar-submit,#read-draft').forEach(el=>{el.disabled=locked})}
const form=document.getElementById('interview-form');
form.addEventListener('submit',async e=>{
 e.preventDefault();if(deliveryPending||deliveryAccepted)return;
 const status=document.getElementById('submit-status'),btn=document.getElementById('submit-btn');saveAll();
 if(!document.getElementById('consent').checked){status.textContent='請先勾選使用說明與隱私提醒，再進行送出。';return}
 const email=document.getElementById('participant-email');email.value=email.value.trim();if(email.value&&!email.checkValidity()){status.textContent='Email 格式似乎不完整，請修正或留白。';email.focus();return}
 if(location.protocol==='file:'){status.textContent='本機預覽不能送出，請使用正式訪談網址。';return}
 if(!Object.values(answers).some(v=>v.trim())){status.textContent='目前沒有回答內容，請先填寫再送出。';return}
 deliveryPending=true;btn.disabled=true;lockEditing(true);status.textContent='正在送出，請保留此分頁……';let timer;
 try{
  syncFormFields();const payload=new URLSearchParams();for(const[k,v]of new FormData(form))payload.append(k,String(v));payload.set('consent','true');payload.set('protocol_version','2');
  const envelope=await deliveryEnvelope(payload);payload.set('submission_id',envelope.id);payload.set('submitted_at',envelope.created);
  const controller=new AbortController(),timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('timeout'))},30000)});
  const operation=(async()=>{const response=await fetch('/api/humanistic-submit',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:payload.toString(),signal:controller.signal,cache:'no-store'}),result=await response.json();
   if(!response.ok||result.ok!==true||result.delivery!=='resend-email'||typeof result.receiptId!=='string'||!/^HUM-[A-Z0-9-]+$/i.test(result.receiptId)||typeof result.providerId!=='string'||!result.providerId)throw new Error('delivery_failed');return result})();
  const result=await Promise.race([operation,timeout]);clearTimeout(timer);deliveryAccepted=true;sessionWrite(receiptKey,result.receiptId);sessionWrite(purgeMarker,'1');purgeSubmittedData();memoryEnvelope=null;showScreen(screens.findIndex(s=>s.id==='success'));document.getElementById('success-message').textContent=`郵件服務已接受送件。收件編號：${result.receiptId}`;
 }catch{
  if(deliveryAccepted){status.textContent='已取得收件回覆；成功畫面未完整更新，請勿重複送出。'}
  else{status.textContent='尚未取得有效收件確認，回答未清除。請先儲存草稿或下載備份，不要關閉分頁；可再按送出重試。';backupPreview(backupText());backupFeedback('尚未確認送件成功。請先儲存草稿；未修改的重試會沿用同一送件識別。')}
 }finally{clearTimeout(timer);deliveryPending=false;btn.disabled=deliveryAccepted;lockEditing(deliveryAccepted)}
});
function showReceipt(){deliveryAccepted=true;purgeSubmittedData();showScreen(screens.findIndex(s=>s.id==='success'));const receipt=sessionRead(receiptKey);document.getElementById('success-message').textContent=receipt?`郵件服務已接受送件。收件編號：${receipt}`:'先前送件已完成，本頁輸入內容已清除。'}
const storedPosition=Number(sessionRead(positionKey)||0);
if(sessionRead(purgeMarker)==='1')showReceipt();else{hydrate();showScreen(Number.isInteger(storedPosition)&&storedPosition>=0&&storedPosition<screens.length-1?storedPosition:0)}
storageNotice();window.addEventListener('pageshow',()=>{if(deliveryAccepted||sessionRead(purgeMarker)==='1')showReceipt()});
window.addEventListener('beforeunload',e=>{if(!deliveryAccepted&&[...document.querySelectorAll('textarea[data-q]')].some(t=>t.value.trim())){e.preventDefault();e.returnValue=''}});
document.getElementById('restart-clean').onclick=()=>{sessionRemove(purgeMarker);sessionRemove(receiptKey);location.reload()};
