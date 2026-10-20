"""Synthetic-only pre-publication tests. Provider requests are mocked in this test."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from urllib.parse import urlparse,parse_qs
import json,os
ROOT=Path.cwd();WORK=ROOT/'public/humanistic-interview';OUT=ROOT/'qa-interview';OUT.mkdir(exist_ok=True)
ENGINE=os.environ.get('QA_ENGINE','chromium');ORIGIN='http://127.0.0.1:8765'
texts={str(i):f'【QA {i:02d}】中文測試 📝\n換行 & 加號+ / <tag> {i}' for i in range(1,21)}
results=[]
def record(case,ok):
 assert ok,case
 results.append({'case':case,'pass':True});print('PASS',case,flush=True)
def safe_click(page,locator,label,errors):
 try:locator.click(timeout=10000)
 except Exception:
  samples=[]
  for _ in range(8):
   samples.append(page.evaluate("""()=>{const b=document.querySelector('.screen.active .q-next');if(!b)return {screen:document.querySelector('.screen.active')?.id};const c=getComputedStyle(b);return {screen:document.querySelector('.screen.active')?.id,rect:b.getBoundingClientRect().toJSON(),transform:c.transform,animation:c.animation,transition:c.transition,hover:b.matches(':hover'),scrollY,active:document.activeElement?.id,animations:document.getAnimations().map(x=>({state:x.playState,target:x.effect?.target?.className}))}}"""));page.wait_for_timeout(100)
  report={'step':label,'errors':errors,'samples':samples};print('NAV_DIAGNOSTIC',json.dumps(report,ensure_ascii=False),flush=True)
  (OUT/(ENGINE+'-nav-error.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2));page.screenshot(path=str(OUT/(ENGINE+'-nav-error.png')),full_page=True);raise
with sync_playwright() as p:
 browser=getattr(p,ENGINE).launch()
 def context(mobile=False,blocked=False):
  c=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},is_mobile=mobile,has_touch=mobile,accept_downloads=True,reduced_motion='reduce')
  c.add_init_script("window.showSaveFilePicker=undefined;Object.defineProperty(navigator,'share',{value:undefined,configurable:true});")
  if blocked:c.add_init_script("Storage.prototype.setItem=function(){throw new DOMException('blocked','SecurityError')};Storage.prototype.getItem=function(){throw new DOMException('blocked','SecurityError')}")
  if ENGINE=='chromium':c.grant_permissions(['clipboard-read','clipboard-write'],origin=ORIGIN)
  else:c.add_init_script("Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.__qaClipboard=text}},configurable:true})")
  mode={'kind':'fail','posts':[]};errors=[]
  def route(r):
   u=urlparse(r.request.url)
   if u.path=='/api/humanistic-submit':
    mode['posts'].append(parse_qs(r.request.post_data or '',keep_blank_values=True));kind=mode['kind']
    if kind=='offline':return r.abort('internetdisconnected')
    if kind=='html':return r.fulfill(status=200,content_type='text/html',body='<html>not a receipt</html>')
    if kind=='missing':return r.fulfill(status=200,json={'ok':True,'delivery':'resend-email','receiptId':'HUM-QA'})
    if kind=='success':return r.fulfill(status=200,json={'ok':True,'delivery':'resend-email','receiptId':'HUM-QA-TEST','providerId':'provider-qa'})
    return r.fulfill(status=503,json={'ok':False})
   if u.path.endswith('interview.js'):return r.fulfill(path=str(WORK/'interview.js'),content_type='application/javascript')
   if u.path.endswith('stt-mobile-bridge.css'):return r.fulfill(path=str(WORK/'stt-mobile-bridge.css'),content_type='text/css')
   if u.path=='/humanistic-interview/':return r.fulfill(path=str(WORK/'index.html'),content_type='text/html')
   if u.path.startswith('/humanistic-interview/assets/'):
    f=ROOT/'public'/u.path.lstrip('/')
    if f.is_file():return r.fulfill(path=str(f))
   return r.fulfill(status=200,body='')
  c.route('**/*',route);page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('dialog',lambda d:d.accept());page.goto(ORIGIN+'/humanistic-interview/');page.wait_for_function("typeof saveAll==='function'")
  return c,page,mode,errors
 def fill(page):
  page.evaluate("data=>{for(let n=1;n<=20;n++)document.getElementById('q'+n).value=data[n];document.getElementById('participant-name').value='QA 純測試';document.getElementById('mid-note').value='QA 中場補充';saveAll();showScreen(questionScreenIndex(1));}",texts)
 def submit(page):
  page.evaluate("showScreen(screens.findIndex(s=>s.id==='submit'))");page.locator('#consent').check();page.locator('#submit-btn').click()
 for mobile in [False,True]:
  name=('mobile ' if mobile else 'desktop ')+ENGINE
  c,page,mode,errors=context(mobile)
  visited=[]
  for step in range(40):
   active=page.locator('.screen.active');sid=active.get_attribute('id')
   if sid=='submit':break
   q=active.get_attribute('data-qscreen');print('NAV',name,sid,flush=True)
   if q:
    active.locator('textarea[data-q]').fill(texts[q]);visited.append(int(q));safe_click(page,active.locator('.q-next'),sid,errors)
   else:safe_click(page,active.locator('[data-next]'),sid,errors)
  record(name+' visible 20-question journey in correct order',visited==list(range(1,21)) and page.locator('#submit').is_visible())
  fill(page)
  page.locator('#toolbar-copy').click();page.wait_for_function("document.getElementById('backup-feedback').textContent.includes('已複製')")
  clipboard=page.evaluate('navigator.clipboard.readText()' if ENGINE=='chromium' else 'window.__qaClipboard')
  record(name+(' actual clipboard' if ENGINE=='chromium' else ' clipboard adapter')+' contains all20',all(v in clipboard for v in texts.values()))
  record(name+' backup visible on Q1',page.locator('#backup-preview').is_visible())
  with page.expect_download() as d:page.locator('#toolbar-download').click()
  text=Path(d.value.path()).read_text(encoding='utf-8-sig');record(name+' actual TXT download preserves answers',all(v in text for v in texts.values()))
  with page.expect_download() as d:page.locator('#save-now').click()
  draft=Path(d.value.path()).read_bytes();record(name+' actual JSON download preserves answers',json.loads(draft.decode('utf-8-sig'))['answers']==texts)
  page.reload();record(name+' refresh restores all20',all(page.locator('#q'+str(i)).input_value()==texts[str(i)] for i in range(1,21)))
  for kind in ['fail','html','missing','offline']:
   mode['kind']=kind;submit(page);page.wait_for_function("document.getElementById('submit-status').textContent.includes('尚未取得')")
   record(name+' '+kind+' retains answers',page.locator('#q20').input_value()==texts['20'])
  record(name+' unchanged retries reuse identity',len(set(m['submission_id'][0] for m in mode['posts']))==1)
  record(name+' POST contains exact all20',all(mode['posts'][0][f'q{i:02d}'][0]==texts[str(i)] for i in range(1,21)))
  page.screenshot(path=str(OUT/(name.replace(' ','-')+'-failure.png')))
  mode['kind']='success';submit(page);page.wait_for_selector('#success.active')
  record(name+' clear only after valid provider receipt',page.locator('#q20').input_value()=='' and page.evaluate('sessionStorage.getItem(storageKey)') is None)
  page.reload();record(name+' reload never revives submitted data',page.locator('#success').is_visible() and page.locator('#q1').input_value()=='')
  record(name+' no runtime exceptions',not errors);c.close()
  c,page,mode,errors=context(mobile);page.locator('#draft-file').set_input_files({'name':'saved.json','mimeType':'application/json','buffer':draft});page.wait_for_function("document.getElementById('draft-import-status').textContent.includes('已讀回')")
  record(name+' saved draft imports after context closed',all(page.locator('#q'+str(i)).input_value()==texts[str(i)] for i in range(1,21)))
  record(name+' local import never posts',len(mode['posts'])==0)
  page.locator('#draft-file').set_input_files({'name':'invalid.json','mimeType':'application/json','buffer':b'{"answers":{"1":42}}'});page.wait_for_function("document.getElementById('draft-import-status').textContent.includes('不是可讀取')")
  record(name+' invalid import preserves answers',page.locator('#q20').input_value()==texts['20']);c.close()
 c,page,mode,errors=context(True,True);fill(page)
 page.evaluate("Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(Error('blocked'))},configurable:true});document.execCommand=()=>false")
 page.locator('#toolbar-copy').click();page.wait_for_function("document.getElementById('backup-feedback').textContent.includes('自動複製未完成')")
 record(ENGINE+' blocked storage/clipboard: selectable full text',page.locator('#backup-full-text').is_visible() and page.evaluate("document.getElementById('backup-full-text').selectionEnd>0"))
 with page.expect_download() as d:page.locator('#toolbar-download').click()
 record(ENGINE+' blocked storage still downloads',all(v in Path(d.value.path()).read_text(encoding='utf-8-sig') for v in texts.values()))
 mode['kind']='success';submit(page);page.wait_for_selector('#success.active');record(ENGINE+' blocked storage still sends',page.locator('#success').is_visible())
 record(ENGINE+' blocked storage no runtime exception',not errors);c.close();browser.close()
(OUT/(ENGINE+'-results.json')).write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('TOTAL',ENGINE,len(results))
