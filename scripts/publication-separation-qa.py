"""Read-only publication acceptance. No real submissions, mail, credentials or paid browser service."""
from pathlib import Path
from urllib.parse import urlparse, urljoin, quote
from playwright.sync_api import sync_playwright
import json, os, re, time, hashlib

BASE = 'https://stt-003.vercel.app'
OUT = Path('qa-publication-separation'); OUT.mkdir(exist_ok=True)
catalog = json.loads(Path('public/data/mmedia-catalog.json').read_text())
articles = catalog['articles']
expected = {key: [a for a in articles if a['series'] == key] for key in ['legal','humanistic','news']}
routes = {'/insights':'研究與出版','/books':'電子書與出版','/columns':'專欄與報導','/columns/legal':'法律專欄','/columns/humanistic':'人文地景產專欄','/columns/news':'報導與其他發表'}
checks=[]
def save():
    (OUT/'results.json').write_text(json.dumps({'source_commit':os.environ.get('GITHUB_SHA'),'checks':checks,'count':len(checks),'passed':sum(x['pass'] for x in checks),'catalog_counts':{k:len(v) for k,v in expected.items()},'real_submissions':0,'physical_iphone':False,'paid_external_browser':False},ensure_ascii=False,indent=2))
def check(label, value, detail=None):
    checks.append({'case':label,'pass':bool(value),'detail':detail});save()
    assert value, f'{label}: {detail}'
    print('PASS',label,flush=True)

with sync_playwright() as p:
    browser=p.chromium.launch()
    context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
    # Wait only for this same site's new content build; never create a second site.
    for attempt in range(45):
        r=context.request.get(BASE+'/columns/legal',timeout=30000)
        if r.status==200 and '法律專欄｜STT Governance' in r.text():break
        time.sleep(8)
    else:raise AssertionError('Canonical publication release unavailable')
    for route,label in routes.items():
        r=context.request.get(BASE+route,max_redirects=0)
        check('Direct 200 '+route,r.status==200,r.status)
        html=r.text()
        check('Static canonical '+route, f'href="{BASE+route}"' in html)
        check('Static title '+route, '<title>'+label+'｜STT Governance</title>' in html)
        check('Static description '+route, bool(re.search(r'<meta name="description" content="[^"]+"',html)))
        check('Open Graph '+route, f'content="{BASE+route}"' in html and 'og:title' in html)
    sitemap=context.request.get(BASE+'/sitemap.xml').text()
    for route in routes:check('Sitemap '+route,f'<loc>{BASE+route}</loc>' in sitemap)
    check('Redirect pages absent from sitemap',f'<loc>{BASE}/books/internal-compliance</loc>' not in sitemap and f'<loc>{BASE}/research</loc>' not in sitemap)
    old={'/books/internal-compliance':'/books#internal-compliance','/publications':'/books','/books/':'/books','/columns/legal/':'/columns/legal'}
    for route,dest in old.items():
        r=context.request.get(BASE+route,max_redirects=0)
        check('Server redirect '+route,r.status in [301,308] and urljoin(BASE+route,r.headers.get('location',''))==BASE+dest,{'status':r.status,'location':r.headers.get('location')})
    check('Unknown series HTTP404',context.request.get(BASE+'/columns/not-a-real-series',max_redirects=0).status==404)
    for route,sha in [('/humanistic-interview/','8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d'),('/humanistic-interview/interview.js?v=20261020.2','18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609')]:
        r=context.request.get(BASE+route);check('Accepted questionnaire bytes unchanged '+route,r.status==200 and hashlib.sha256(r.body()).hexdigest()==sha)
    context.close()
    for width in [390,768,1440]:
        context=browser.new_context(viewport={'width':width,'height':1000},has_touch=width<1000,reduced_motion='reduce')
        context.route('**/*',lambda r:r.abort() if r.request.method not in ['GET','HEAD'] else r.continue_())
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        for route,label in routes.items():
            response=page.goto(BASE+route,wait_until='networkidle');page.locator('.stt-library').wait_for()
            check(f'{width} rendered '+route,response.status==200 and page.locator('main h1').count()==1)
            check(f'{width} canonical '+route,page.locator('link[rel=canonical]').count()==1 and page.locator('link[rel=canonical]').get_attribute('href')==BASE+route)
            check(f'{width} no overflow '+route,not page.evaluate('document.documentElement.scrollWidth>innerWidth+1'))
            check(f'{width} no runtime error '+route,not errors,errors)
            check(f'{width} no Netlify link '+route,page.locator('a[href*="shimmering-longma"]').count()==0)
            check(f'{width} no interview form embedded '+route,page.locator('#interview-form').count()==0)
            if route=='/insights':check(f'{width} overview no full archive',page.locator('[data-book-id],[data-work-id],.stt-humanistic-entry').count()==0)
            if route=='/books':
                check(f'{width} four books retained',page.locator('[data-book-id]').count()==4)
                check(f'{width} no articles in books',page.locator('[data-work-id]').count()==0)
                check(f'{width} book images decoded',page.locator('[data-publication-cover]').evaluate_all('(els)=>els.every(x=>x.complete&&x.naturalWidth>0)'))
                check(f'{width} exactly two existing reading links',page.locator('main a[href*="heyzine.com"]').count()==2)
            if route.startswith('/columns'):
                key=route.rsplit('/',1)[-1];count=len(expected[key]) if key in expected else len(articles)
                check(f'{width} count '+route,int(page.locator('[data-result-count]').get_attribute('data-result-count'))==count)
                if key in expected:check(f'{width} series isolation '+route,page.locator('[data-work-id]').evaluate_all('(els)=>els.map(x=>x.dataset.series)')==[key]*min(12,count))
            page.screenshot(path=str(OUT/(route.strip('/').replace('/','-')+'-'+str(width)+'.png')),full_page=route in ['/books','/insights','/columns/humanistic'])
        page.goto(BASE+'/insights',wait_until='networkidle')
        link=page.locator('.stt-library-path[href="/books"]');link.focus();page.keyboard.press('Enter');page.wait_for_url(BASE+'/books')
        check(f'{width} keyboard navigation to books',page.locator('[data-book-id]').count()==4)
        # Use the already accepted primary interview entry from a new content page.
        if width<1400:page.get_by_role('button',name='開啟選單',exact=True).click();entry=page.locator('#stt-g0-mobile-menu a[href="/humanistic-interview/"]')
        else:entry=page.locator('.stt-g0-desktop-nav a[href="/humanistic-interview/"]')
        entry.click();page.wait_for_url(BASE+'/humanistic-interview/');page.locator('.screen.active').wait_for()
        check(f'{width} accepted respondent entry still loads',page.locator('textarea[data-q]').count()==20)
        context.close()
    # Walk every page, not only the first twelve records.
    context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce');page=context.new_page()
    for key,items in expected.items():
        seen=[];page.goto(BASE+'/columns/'+key,wait_until='networkidle')
        for index in range((len(items)+11)//12):
            seen+=page.locator('[data-work-id]').evaluate_all('(els)=>els.map(x=>x.dataset.workId)')
            if index<(len(items)+11)//12-1:
                page.get_by_role('button',name='下一頁',exact=True).click();page.wait_for_function('(n)=>new URLSearchParams(location.search).get("page")===String(n)',arg=index+2)
        check('All source records reachable '+key,len(seen)==len(set(seen))==len(items) and set(seen)=={x['id'] for x in items})
    page.goto(BASE+'/columns/legal',wait_until='networkidle');page.get_by_role('searchbox',name='搜尋作品').fill('___NO_MATCH_STT_QA___')
    check('Empty search state',page.locator('[data-result-count]').get_attribute('data-result-count')=='0' and page.locator('.stt-library-empty').is_visible())
    page.get_by_role('button',name='重新瀏覽',exact=True).click();check('Clear restores legal series',int(page.locator('[data-result-count]').get_attribute('data-result-count'))==len(expected['legal']))
    term=expected['legal'][0]['title'];page.get_by_role('searchbox',name='搜尋作品').fill(term)
    check('Search exact retained title',page.locator('[data-work-id]').count()==1 and page.locator('[data-work-id]').get_attribute('data-work-id')==expected['legal'][0]['id'])
    page.get_by_role('button',name='清除篩選',exact=True).click();page.get_by_label('排序',exact=True).select_option('oldest')
    check('Oldest ordering',page.locator('[data-work-id]').first.get_attribute('data-work-id')==sorted(expected['legal'],key=lambda x:(x['date'],x['id']))[0]['id'])
    page.goto(BASE+'/insights?theme=family',wait_until='networkidle');check('Legacy topic link preserved',urlparse(page.url).path=='/columns' and 'theme=family' in page.url)
    page.goto(BASE+'/insights#publications',wait_until='networkidle');check('Legacy publication fragment preserved',urlparse(page.url).path=='/books')
    context.close();browser.close()
save();print('PUBLICATION_ACCEPTANCE',len(checks),flush=True)
