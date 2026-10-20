"""Read-only canonical entry checks; no form submissions or source writes."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,hashlib,time
BASE='https://stt-003.vercel.app'
OUT=Path('qa-interview-entry');OUT.mkdir(exist_ok=True)
results=[]
def check(label,ok,detail=None):
 results.append({'case':label,'pass':bool(ok),'detail':detail})
 (OUT/'results.json').write_text(json.dumps({'base':BASE,'physical_iphone_tested':False,'real_submissions':0,'results':results},ensure_ascii=False,indent=2))
 assert ok,label+': '+str(detail)
 print('PASS',label,flush=True)
with sync_playwright() as p:
 browser=p.chromium.launch()
 probe=browser.new_context();page=probe.new_page()
 for attempt in range(24):
  page.goto(BASE+'/',wait_until='networkidle',timeout=45000)
  if page.locator('.stt-g0-desktop-nav a[href="/humanistic-interview/"]').count():break
  time.sleep(5)
 else:raise AssertionError('Respondent navigation is not deployed')
 for path,source in [('/humanistic-interview/','public/humanistic-interview/index.html'),('/humanistic-interview/interview.js?v=20261020.2','public/humanistic-interview/interview.js')]:
  r=probe.request.get(BASE+path,timeout=30000)
  check('Original questionnaire exact source '+path,r.ok and r.body()==Path(source).read_bytes(),hashlib.sha256(r.body()).hexdigest())
 for old in ['/humanistic-20q','/humanistic-20q/','/humanistic-20q/index.html','/humanistic-interview','/humanistic-interview/index.html']:
  r=probe.request.get(BASE+old,timeout=30000)
  check('Old path converges '+old,r.ok and r.url==BASE+'/humanistic-interview/')
 probe.close()
 for width in [390,768,1024,1280,1399,1400,1440,1920]:
  for route in ['/','/insights']:
   context=browser.new_context(viewport={'width':width,'height':900},has_touch=width<1024,reduced_motion='reduce')
   context.route('**/*',lambda r:r.abort() if r.request.method not in ('GET','HEAD') else r.continue_())
   page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   response=page.goto(BASE+route,wait_until='networkidle',timeout=45000)
   check(f'{width} {route} loads',response.ok and page.locator('#main-content').is_visible())
   check(f'{width} {route} no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
   menu=page.locator('.stt-g0-menu-button')
   if menu.is_visible():
    menu.click();entry=page.locator('#stt-g0-mobile-menu').get_by_role('link',name='受訪者專區',exact=True)
    check(f'{width} {route} menu has six destinations',page.locator('.stt-g0-mobile-menu__primary a').count()==6)
    check(f'{width} {route} governance CTA remains in menu',page.locator('#stt-g0-mobile-menu a[href="/start"]').is_visible())
   else:
    entry=page.locator('.stt-g0-desktop-nav').get_by_role('link',name='受訪者專區',exact=True)
    check(f'{width} {route} desktop has six destinations',page.locator('.stt-g0-desktop-nav a').count()==6)
    boxes=page.evaluate('''()=>['.stt-g0-brand','.stt-g0-desktop-nav','.stt-g0-header__inner>.stt-g0-primary-cta'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,right:r.right,width:r.width}})''')
    check(f'{width} {route} logo navigation CTA separated',boxes[0]['right']<=boxes[1]['x']+1 and boxes[1]['right']<=boxes[2]['x']+1 and boxes[2]['right']<=width,boxes)
   check(f'{width} {route} canonical same-tab entry',entry.is_visible() and entry.get_attribute('href')=='/humanistic-interview/' and entry.get_attribute('target') is None)
   if route=='/insights':
    check(f'{width} works distinct from questionnaire',page.locator('.stt-humanistic-entry').count()==0 and page.locator('[data-publication-cover]').count()==4)
    check(f'{width} published articles retained',page.locator('.stt-insights-results article').count()>0)
   if width in [390,1440] and route=='/':page.screenshot(path=str(OUT/f'header-{width}.png'))
   if route=='/insights':entry.focus();page.keyboard.press('Enter')
   else:entry.click()
   page.wait_for_url(BASE+'/humanistic-interview/',timeout=30000)
   page.wait_for_function("typeof saveAll==='function' && document.querySelectorAll('textarea[data-q]').length===20")
   check(f'{width} {route} real questionnaire loaded',page.locator('#welcome.active').is_visible() and len(context.pages)==1)
   check(f'{width} interview canonical',page.locator('link[rel="canonical"]').get_attribute('href')==BASE+'/humanistic-interview/')
   check(f'{width} interview no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
   check(f'{width} interview single controller',page.locator('script[src*="interview.js"]').count()==1)
   if width in [390,1440] and route=='/':page.screenshot(path=str(OUT/f'interview-{width}.png'))
   page.locator('#welcome [data-next]').click()
   check(f'{width} interview begins',not page.locator('#welcome').is_visible())
   page.locator('.stt-return-home').click();page.wait_for_url(BASE+'/',timeout=30000)
   check(f'{width} returns to mother site',page.locator('.stt-g0-header').is_visible())
   check(f'{width} {route} no runtime errors',not errors,errors)
   context.close()
 browser.close()
print('ENTRY_CHECKS',len(results),flush=True)
