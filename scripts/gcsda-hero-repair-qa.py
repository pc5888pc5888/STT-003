"""Scoped, read-only GCSDA hero QA. Both builds are local; all form POSTs are blocked."""
from pathlib import Path
from PIL import Image, ImageStat
from playwright.sync_api import sync_playwright
import subprocess, time, json, hashlib, re, io, os

BASELINE='60303eb4370fa0738430af3f78ce171428b56fa4'
ROOT=Path.cwd();OUT=ROOT/'qa-gcsda-hero-repair';OUT.mkdir(exist_ok=True)
OLD=Path(os.environ['GCSDA_BASELINE_DIR'])
routes=['/','/about','/governance','/council','/membership','/events','/knowledge','/charter','/privacy']
visuals={'/':'council','/about':'about','/governance':'governance','/council':'council','/membership':'membership','/events':'events','/knowledge':'knowledge','/charter':'charter'}
report={'baseline':BASELINE,'current':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'checks':[],'source_images':[],'screenshots':[],'real_submissions':0,'physical_iphone':False,'paid_external_browser':False}
def save():
    report['count']=len(report['checks']);report['passed']=sum(x['pass'] for x in report['checks']);(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
def check(label,value,detail=None):
    report['checks'].append({'case':label,'pass':bool(value),'detail':detail});save();assert value,f'{label}: {detail}';print('PASS',label,flush=True)
def normalized(text):return re.sub(r'\s+','',text)

for path in sorted(set('/visual-bank/gcsda/'+name+'.png' for name in visuals.values())):
    raw=(ROOT/('public'+path)).read_bytes();im=Image.open(io.BytesIO(raw));im.load()
    item={'path':path,'bytes':len(raw),'size':im.size,'sha256':hashlib.sha256(raw).hexdigest(),'fully_decoded':True};report['source_images'].append(item)
    check('Complete original pixels '+path,im.width>=1491 and im.height>=900)
check('Verified archived home original SHA',hashlib.sha256((ROOT/'public/visual-bank/gcsda/council.png').read_bytes()).hexdigest()=='3eeb5a932e9582c5e602ff56a712e1fdd504ef4c14d9c1ebb417e9f9bfa90f42')

servers=[]
try:
    for directory,port in [(OLD,4173),(ROOT,4174)]:
        servers.append(subprocess.Popen(['node',str(ROOT/'node_modules/vite/bin/vite.js'),'preview','--host','127.0.0.1','--port',str(port),'--strictPort'],cwd=directory,stdout=open(OUT/f'preview-{port}.log','w'),stderr=subprocess.STDOUT))
    time.sleep(3)
    with sync_playwright() as p:
        browser=p.chromium.launch()
        def guard(route):
            if route.request.method not in ('GET','HEAD'):route.abort();return
            if '/api/' in route.request.url:route.fulfill(status=200,content_type='application/json',body='{"resendConfigured":false,"recipientConfigured":false}');return
            route.continue_()
        c=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');c.route('**/*',guard);page=c.new_page();baseline={}
        for route in routes:
            page.goto('http://127.0.0.1:4173'+route,wait_until='networkidle')
            baseline[route]={'text':normalized(page.locator('main').inner_text()),'nonhero_images':page.locator('img').evaluate_all('(els)=>els.filter(x=>!x.closest(".cis-hero")).map(x=>x.getAttribute("src"))'),'h1':page.locator('h1').inner_text()}
            if route in ['/','/about']:page.screenshot(path=str(OUT/('before-'+('home' if route=='/' else 'about')+'-1440.png')))
        c.close()
        for width in [390,768,1024,1440]:
            c=browser.new_context(viewport={'width':width,'height':1000},has_touch=width<=768,reduced_motion='reduce');c.route('**/*',guard);page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            requested=[];page.on('request',lambda r:requested.append(r.url))
            for route in routes:
                key='home' if route=='/' else route.strip('/')
                response=page.goto('http://127.0.0.1:4174'+route,wait_until='networkidle');hero=page.locator('[data-gcsda-hero="20261021.1"]');hero.wait_for()
                check(f'{width} {route} one H1 and hero',response.status==200 and page.locator('h1').count()==1 and hero.count()==1)
                check(f'{width} {route} all main text unchanged',normalized(page.locator('main').inner_text())==baseline[route]['text'])
                check(f'{width} {route} other images and logo unchanged',page.locator('img').evaluate_all('(els)=>els.filter(x=>!x.closest(".cis-hero")).map(x=>x.getAttribute("src"))')==baseline[route]['nonhero_images'])
                check(f'{width} {route} no overflow',not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'))
                check(f'{width} {route} no JS exceptions',not errors,errors)
                title=hero.locator('h1');copy=hero.locator('.cis-hero-copy');tb=title.bounding_box();cb=copy.bounding_box()
                check(f'{width} {route} title within reading field',tb['x']>=cb['x']-1 and tb['x']+tb['width']<=cb['x']+cb['width']+1 and tb['height']<=cb['height'])
                if route in visuals:
                    img=hero.locator('img');img.evaluate('(img)=>img.decode()')
                    actual=img.get_attribute('src');expected='/visual-bank/gcsda/'+visuals[route]+'.png'
                    check(f'{width} {route} full PNG requested',actual==expected)
                    check(f'{width} {route} no stretching or clipping',img.evaluate('(img)=>getComputedStyle(img).objectFit')=='contain')
                    if width<=1000:
                        box=hero.locator('.cis-hero-art').bounding_box();check(f'{width} {route} image and text separate',box['y']+box['height']<=cb['y']+1)
                    else:check(f'{width} {route} bounded hero height',hero.bounding_box()['height']<=800)
                    png=hero.locator('.cis-hero-art').screenshot();variation=max(ImageStat.Stat(Image.open(io.BytesIO(png)).convert('RGB')).stddev)
                    check(f'{width} {route} actual image pixels nonblank',variation>10,variation)
                else:check(f'{width} privacy remains text only',hero.locator('img').count()==0)
                page.evaluate('scrollTo(0,0)');page.wait_for_timeout(100);filename=f'{key}-{width}.png';page.screenshot(path=str(OUT/filename));report['screenshots'].append(filename)
            check(f'{width} broken derivative never requested',not any('home-approved.webp' in url for url in requested))
            page.goto('http://127.0.0.1:4174/',wait_until='networkidle');page.locator('.cis-actions').get_by_role('link',name='認識學會',exact=True).click();page.wait_for_url('**/about')
            check(f'{width} homepage action navigates',page.locator('[data-gcsda-hero]').count()==1)
            c.close()
        browser.close()
finally:
    for server in servers:server.terminate()
save();print('GCSDA_HERO_REPAIR_ACCEPTANCE',report['passed'],'/',report['count'],flush=True)
