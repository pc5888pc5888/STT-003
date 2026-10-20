"""Anonymous canonical-site acceptance; no auth cookies, bypass tokens or form writes."""
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
from PIL import Image,ImageStat
import io,json,hashlib,sys
BASE='https://gcsda-governance.vercel.app'
OUT=Path('qa-gcsda-public-hero');OUT.mkdir(exist_ok=True)
ROUTES=['/','/about','/governance','/council','/membership','/events','/knowledge','/charter','/privacy']
report={'anonymous':True,'real_submissions':0,'checks':[],'physical_iphone':False,'paid_external_browser':False}
def check(label,value,detail=None):
 report['checks'].append({'case':label,'pass':bool(value),'detail':detail});save();assert value,f'{label}: {detail}';print('PASS',label,flush=True)
def save():
 report['count']=len(report['checks']);report['passed']=sum(x['pass'] for x in report['checks']);(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
with sync_playwright() as p:
 browser=p.chromium.launch();context=browser.new_context()
 first=context.request.get(BASE+'/',max_redirects=0,timeout=30000)
 report['initial_response']={'status':first.status,'location':first.headers.get('location'),'auth_cookie_supplied':False};save()
 check('Official homepage accessible without Vercel login',first.status==200,report['initial_response'])
 expected={'/':'council','/about':'about','/governance':'governance','/council':'council','/membership':'membership','/events':'events','/knowledge':'knowledge','/charter':'charter'}
 for route in ROUTES:
  r=context.request.get(BASE+route,max_redirects=0);check('Direct canonical response '+route,r.status==200,r.status)
  check('Static canonical '+route,'href="'+BASE+route+'"' in r.text())
 for name in sorted(set(expected.values())):
  route='/visual-bank/gcsda/'+name+'.png';r=context.request.get(BASE+route,max_redirects=0)
  local=Path('public'+route).read_bytes();raw=r.body()
  check('Public original image bytes '+name,r.status==200 and hashlib.sha256(raw).hexdigest()==hashlib.sha256(local).hexdigest())
  im=Image.open(io.BytesIO(raw));im.load();check('Public image fully decodes '+name,im.width>=1491)
 stt='https://stt-003.vercel.app'
 for route,want in [('/humanistic-interview/','8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d'),('/humanistic-interview/interview.js?v=20261020.2','18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609')]:
  r=context.request.get(stt+route);check('STT accepted interview unchanged '+route,r.status==200 and hashlib.sha256(r.body()).hexdigest()==want)
 # This is an already-known retired STT alias, not a new preview or guessed host.
 old='https://stt-003-git-g1-home-20260921-pc5888pc5888s-projects.vercel.app/'
 r=context.request.get(old,max_redirects=0);dest=r.headers.get('location','');check('Retired STT preview remains protected or redirected, not public old content',r.status in (301,302,307,308,401,403,404,410) and (r.status in (401,403,404,410) or urlparse(dest).hostname in ('vercel.com','vercel.live','stt-003.vercel.app')),{'status':r.status,'location':dest})
 context.close()
 for width in [390,768,1024,1440]:
  context=browser.new_context(viewport={'width':width,'height':1000},has_touch=width<=768,reduced_motion='reduce')
  context.route('**/*',lambda r:r.abort() if r.request.method not in ('GET','HEAD') else r.continue_())
  page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));requests=[];page.on('request',lambda r:requests.append(r.url))
  for route in ROUTES:
   response=page.goto(BASE+route,wait_until='networkidle',timeout=30000);hero=page.locator('[data-gcsda-hero="20261021.1"]');hero.wait_for()
   check(f'{width} {route} new hero on official URL',response.status==200 and urlparse(page.url).hostname=='gcsda-governance.vercel.app' and hero.count()==1)
   check(f'{width} {route} one H1 and canonical',page.locator('main h1').count()==1 and page.locator('link[rel=canonical]').get_attribute('href')==BASE+route)
   check(f'{width} {route} no horizontal overflow',not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'))
   check(f'{width} {route} no JS errors',not errors,errors)
   if route in expected:
    img=hero.locator('img');img.evaluate('(img)=>img.decode()');check(f'{width} {route} high-resolution original',img.get_attribute('src')=='/visual-bank/gcsda/'+expected[route]+'.png' and img.evaluate('(x)=>x.naturalWidth')>=1491)
    png=hero.locator('.cis-hero-art').screenshot();variance=max(ImageStat.Stat(Image.open(io.BytesIO(png)).convert('RGB')).stddev);check(f'{width} {route} image is painted',variance>10,variance)
   if route in ['/','/about','/council']:
    page.evaluate('scrollTo(0,0)');page.wait_for_timeout(100);page.screenshot(path=str(OUT/(('home' if route=='/' else route.strip('/'))+'-'+str(width)+'.png')))
  check(f'{width} no broken homepage image request',not any('home-approved.webp' in u for u in requests))
  page.goto(BASE+'/',wait_until='networkidle');page.locator('.cis-actions').get_by_role('link',name='認識學會',exact=True).click();page.wait_for_url(BASE+'/about');check(f'{width} home action works',page.locator('[data-gcsda-hero]').count()==1)
  context.close()
 browser.close()
save();print('GCSDA_PUBLIC_HERO_ACCEPTANCE',report['passed'],'/',report['count'],flush=True)
