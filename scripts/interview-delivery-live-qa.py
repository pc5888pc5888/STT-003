"""Live delivery QA: synthetic answers only, one test email plus idempotent retry."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from urllib.parse import urlparse
import json,os,time
URL='https://stt-003.vercel.app/humanistic-interview/'
BASE='https://stt-003.vercel.app'
OUT=Path('qa-interview-live');OUT.mkdir(exist_ok=True)
marker='STT-QA-20261020-'+os.environ['GITHUB_RUN_ID']
texts={str(i):f'{marker}｜第{i:02d}題｜純系統驗收，非真實受訪內容。\n繁體中文 📝 & 加號+ / <tag> 完整保留。' for i in range(1,21)}
checks=[]
def record(label,ok):
 assert ok,label
 checks.append({'case':label,'pass':True});print('PASS',label,flush=True)
 (OUT/'live-results.json').write_text(json.dumps({'qa_marker':marker,'checks':checks,'inbox_verification':'REQUIRES_SEPARATE_GMAIL_READ','physical_iphone_tested':False},ensure_ascii=False,indent=2))
with sync_playwright() as p:
 browser=p.chromium.launch()
 c=browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,accept_downloads=True,reduced_motion='reduce')
 c.grant_permissions(['clipboard-read','clipboard-write'],origin=BASE)
 c.add_init_script("window.showSaveFilePicker=undefined;Object.defineProperty(navigator,'share',{value:undefined,configurable:true})")
 for attempt in range(40):
  r=c.request.get(URL,timeout=30000);h=r.text();api=c.request.get(BASE+'/api/humanistic-submit',timeout=30000)
  if r.ok and 'stt-delivery-version' in h and '20261020.2' in h and api.ok and api.json().get('version')=='20261020.2':break
  time.sleep(10)
 else:raise AssertionError('Tested production release unavailable; no test submitted')
 record('Canonical and API release confirmed',True)
 record('Production mail provider configured',api.json().get('resendConfigured') is True)
 for path in ['/humanistic-20q','/humanistic-20q/','/humanistic-interview/index.html','/humanistic-interview']:
  rr=c.request.get(BASE+path,timeout=30000);record('Legacy alias converges '+path,rr.ok and rr.url==URL)
 page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('dialog',lambda d:d.accept())
 for path in ['/','/insights']:
  page.goto(BASE+path);page.locator('a[href="/humanistic-interview/"]').first.wait_for();record('Managed interview entry on '+path,page.locator('a[href*="shimmering-longma"]').count()==0)
 page.goto(URL);page.wait_for_function("typeof saveAll==='function'")
 record('Canonical metadata',page.locator('link[rel=canonical]').get_attribute('href')==URL)
 visited=[]
 for step in range(40):
  active=page.locator('.screen.active');sid=active.get_attribute('id')
  if sid=='submit':break
  q=active.get_attribute('data-qscreen')
  if q:active.locator('textarea[data-q]').fill(texts[q]);visited.append(int(q));active.locator('.q-next').click()
  else:
   if sid=='mid-review':page.locator('#mid-note').fill(marker+'｜中場測試補充')
   active.locator('[data-next]').click()
 record('All20 via visible mobile navigation',visited==list(range(1,21)) and page.locator('#submit').is_visible())
 page.locator('#participant-name').fill(marker)
 page.locator('#copy-backup').click();page.wait_for_function("document.getElementById('backup-feedback').textContent.includes('已複製')")
 clipboard=page.evaluate('navigator.clipboard.readText()');record('Live actual clipboard all20',all(v in clipboard for v in texts.values()))
 with page.expect_download() as d:page.locator('#download-backup').click()
 downloaded=Path(d.value.path()).read_text(encoding='utf-8-sig');record('Live actual TXT all20',all(v in downloaded for v in texts.values()))
 with page.expect_download() as d:page.locator('#save-draft-final').click()
 draft=Path(d.value.path()).read_bytes();record('Live actual saved draft all20',json.loads(draft.decode('utf-8-sig'))['answers']==texts)
 page.screenshot(path=str(OUT/'mobile-before-submit.png'))
 requests=[]
 page.on('request',lambda r:requests.append(r.post_data) if r.method=='POST' and urlparse(r.url).path=='/api/humanistic-submit' else None)
 page.locator('#consent').check()
 with page.expect_response(lambda r:urlparse(r.url).path=='/api/humanistic-submit' and r.request.method=='POST',timeout=45000) as reply:page.locator('#submit-btn').click()
 response=reply.value;result=response.json()
 (OUT/'delivery-result.json').write_text(json.dumps({'qa_marker':marker,'http_status':response.status,'response':result,'synthetic_only':True},ensure_ascii=False,indent=2))
 record('Actual provider accepts synthetic email',response.ok and result.get('ok') is True and bool(result.get('providerId')))
 page.wait_for_selector('#success.active');record('Receipt shown and answers cleared after acceptance',result['receiptId'] in page.locator('#success-message').inner_text() and page.locator('#q20').input_value()=='')
 page.screenshot(path=str(OUT/'mobile-after-submit.png'))
 retry=c.request.post(BASE+'/api/humanistic-submit',data=requests[0],headers={'Content-Type':'application/x-www-form-urlencoded'},timeout=30000)
 record('Actual provider retry deduplicated',retry.ok and retry.json().get('providerId')==result['providerId'])
 record('No production JS exceptions',not errors);c.close()
 c=browser.new_context(viewport={'width':768,'height':1024},has_touch=True,accept_downloads=True,reduced_motion='reduce');page=c.new_page();page.goto(URL);page.wait_for_function("typeof saveAll==='function'")
 page.locator('#draft-file').set_input_files({'name':'qa-draft.json','mimeType':'application/json','buffer':draft});page.wait_for_function("document.getElementById('draft-import-status').textContent.includes('已讀回')")
 record('Saved file restores all20 in new tablet context',all(page.locator('#q'+str(i)).input_value()==texts[str(i)] for i in range(1,21)))
 page.locator('#toolbar-submit').click();page.locator('#copy-backup').click();page.wait_for_timeout(300);page.screenshot(path=str(OUT/'tablet-backup.png'))
 record('Tablet backup is visible',page.locator('#backup-full-text').is_visible())
 c.close();browser.close()
print('SYNTHETIC_MAIL_MARKER',marker);print('TOTAL_LIVE',len(checks))
