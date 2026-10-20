"""Read-only entry verification. Local built site or QA_BASE canonical production only."""
from pathlib import Path
from urllib.parse import urlparse, unquote
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from playwright.sync_api import sync_playwright
import os, json, threading, hashlib, time

BASE=os.environ.get('QA_BASE','http://127.0.0.1:4174').rstrip('/')
LIVE=BASE=='https://stt-003.vercel.app'
assert LIVE or BASE=='http://127.0.0.1:4174','Only the local build or existing canonical site is allowed'
OUT=Path('qa-interview-entry')/('live' if LIVE else 'local');OUT.mkdir(parents=True,exist_ok=True)
server=None
if not LIVE:
 class Site(SimpleHTTPRequestHandler):
  def log_message(self,*args):pass
  def do_GET(self):
   route=unquote(urlparse(self.path).path)
   if not (Path('dist')/route.lstrip('/')).exists():
    seo=Path('dist')/('seo-'+route.strip('/').replace('/','-')+'.html')
    self.path='/'+seo.name if seo.is_file() else '/index.html'
   super().do_GET()
 server=ThreadingHTTPServer(('127.0.0.1',4174),partial(Site,directory='dist'))
 threading.Thread(target=server.serve_forever,daemon=True).start()
results=[]
def check(label,ok,detail=None):
 results.append({'case':label,'pass':bool(ok),'detail':detail})
 (OUT/'results.json').write_text(json.dumps({'base':BASE,'physical_iphone_tested':False,'real_submissions':0,'results':results},ensure_ascii=False,indent=2))
 assert ok,label+': '+str(detail)
 print('PASS',label,flush=True)

with sync_playwright() as p:
 browser=p.chromium.launch()
 if LIVE:
  api=browser.new_context()
  for _ in range(36):
   r=api.request.get(BASE+'/humanistic-interview/',timeout=30000)
   if r.ok and 'stt-entry-version' in r.text() and '20261020.1' in r.text():break
   time.sleep(5)
  else:raise AssertionError('New canonical interview entry is not live; do not report deployed')
  for path,source in [('/humanistic-interview/','public/humanistic-interview/index.html'),('/humanistic-interview/interview.js?v=20261020.2','public/humanistic-interview/interview.js')]:
   r=api.request.get(BASE+path,timeout=30000)
   check('Production exact source '+path,r.ok and r.body()==Path(source).read_bytes(),hashlib.sha256(r.body()).hexdigest())
  for old in ['/humanistic-20q','/humanistic-20q/','/humanistic-20q/index.html','/humanistic-interview','/humanistic-interview/index.html']:
   r=api.request.get(BASE+old,timeout=30000)
   check('Old path converges '+old,r.ok and r.url==BASE+'/humanistic-interview/')
  api.close()
 for width in [390,768,1024,1280,1399,1400,1440,1920]:
  for route in ['/','/insights']:
   context=browser.new_context(viewport={'width':width,'height':900},has_touch=width<1024,reduced_motion='reduce')
   context.route('**/*',lambda r:r.abort() if r.request.method not in ('GET','HEAD') else r.continue_())
   page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   response=page.goto(BASE+route,wait_until='networkidle',timeout=45000)
   check(f'{width} {route} loads',response.ok and page.locator('#main-content').is_visible())
   check(f'{width} {route} no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
   label='受訪者專區'
   menu=page.locator('.stt-g0-menu-button')
   if menu.is_visible():
    menu.click();entry=page.locator('#stt-g0-mobile-menu').get_by_role('link',name=label,exact=True)
    check(f'{width} {route} menu includes six destinations',page.locator('.stt-g0-mobile-menu__primary a').count()==6)
    check(f'{width} {route} governance CTA in menu',page.locator('#stt-g0-mobile-menu a[href="/start"]').is_visible())
   else:
    entry=page.locator('.stt-g0-desktop-nav').get_by_role('link',name=label,exact=True)
    check(f'{width} {route} desktop includes six destinations',page.locator('.stt-g0-desktop-nav a').count()==6)
    boxes=page.evaluate('''()=>['.stt-g0-brand','.stt-g0-desktop-nav','.stt-g0-header__inner>.stt-g0-primary-cta'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,right:r.right,width:r.width}})''')
    check(f'{width} {route} logo navigation CTA separated',boxes[0]['right']<=boxes[1]['x']+1 and boxes[1]['right']<=boxes[2]['x']+1 and boxes[2]['right']<=width,boxes)
   check(f'{width} {route} single interview target',entry.is_visible() and entry.get_attribute('href')=='/humanistic-interview/' and entry.get_attribute('target') is None)
   if route=='/insights':
    check(f'{width} published works are not the questionnaire',page.locator('.stt-humanistic-entry').count()==0 and page.locator('[data-publication-cover]').count()==4)
    check(f'{width} published articles remain',page.locator('.stt-insights-results article').count()>0)
   if width in [390,1440] and route=='/':page.screenshot(path=str(OUT/f'header-{width}.png'))
   # Use keyboard activation from the publication page and normal clicks from home.
   if route=='/insights':entry.focus();page.keyboard.press('Enter')
   else:entry.click()
   page.wait_for_url(BASE+'/humanistic-interview/',timeout=30000)
   page.wait_for_function("typeof saveAll==='function' && document.querySelectorAll('textarea[data-q]').length===20")
   check(f'{width} {route} real document interview loaded',page.locator('#welcome.active').is_visible() and '受訪者專區' in page.title() and page.locator('#interview-purpose').is_visible() and len(context.pages)==1)
   check(f'{width} interview canonical',page.locator('link[rel="canonical"]').get_attribute('href')=='https://stt-003.vercel.app/humanistic-interview/')
   check(f'{width} interview no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
   check(f'{width} interview single controller',page.locator('script[src*="interview.js"]').count()==1)
   if width in [390,1440] and route=='/':page.screenshot(path=str(OUT/f'interview-{width}.png'))
   page.locator('#welcome [data-next]').click()
   check(f'{width} interview begins',not page.locator('#welcome').is_visible())
   page.locator('.stt-return-home').click();page.wait_for_url(BASE+'/',timeout=30000)
   check(f'{width} interview returns to mother site',page.locator('.stt-g0-header').is_visible())
   check(f'{width} {route} no runtime errors',not errors,errors)
   context.close()
 browser.close()
if server:server.shutdown()
print('ENTRY_CHECKS',len(results),flush=True)
