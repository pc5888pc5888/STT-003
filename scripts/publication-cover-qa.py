"""Read-only cover paint checks: scroll into view, await full decode, inspect actual pixels."""
from pathlib import Path
from PIL import Image, ImageStat
from playwright.sync_api import sync_playwright
import io, json, hashlib
OUT=Path('qa-publication-separation');OUT.mkdir(exist_ok=True)
BASE='https://stt-003.vercel.app'
paths=['/books/2026-sustainable-family-governance.jpg','/books/internal-compliance.jpg','/books/ai-governance.webp','/books/family-governance.webp']
report={'files':[],'rendering':[],'external_reading_links':[]}
for path in paths:
    raw=Path('public'+path).read_bytes();im=Image.open(io.BytesIO(raw));im.load()
    report['files'].append({'path':path,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'dimensions':im.size,'full_decode':True})
with sync_playwright() as p:
    browser=p.chromium.launch()
    for width in [390,768,1440]:
        c=browser.new_context(viewport={'width':width,'height':900},reduced_motion='reduce');page=c.new_page()
        c.route('**/*',lambda r:r.abort() if r.request.method not in ('GET','HEAD') else r.continue_())
        page.goto(BASE+'/books',wait_until='networkidle');page.locator('[data-book-id]').last.wait_for()
        for i,path in enumerate(paths):
            cover=page.locator('[data-publication-cover]').nth(i);cover.scroll_into_view_if_needed();cover.evaluate('(img)=>img.decode()');page.wait_for_timeout(200)
            styles=cover.evaluate('(img)=>({src:new URL(img.currentSrc).pathname,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,opacity:getComputedStyle(img).opacity,visibility:getComputedStyle(img).visibility,display:getComputedStyle(img).display,renderWidth:img.getBoundingClientRect().width,renderHeight:img.getBoundingClientRect().height})')
            png=cover.screenshot(path=str(OUT/f'cover-{i+1}-{width}.png'))
            pixels=Image.open(io.BytesIO(png)).convert('RGB');variation=max(ImageStat.Stat(pixels).stddev)
            row={'width':width,'index':i+1,**styles,'pixel_standard_deviation':variation,'pass':styles['src']==path and variation>20 and styles['visibility']=='visible' and styles['opacity']=='1'}
            report['rendering'].append(row);assert row['pass'],row
        page.evaluate('scrollTo(0,0)');page.wait_for_timeout(200);page.screenshot(path=str(OUT/f'books-scrolled-{width}.png'),full_page=True);c.close()
    c=browser.new_context()
    for url in ['https://heyzine.com/flip-book/cc95743e15.html','https://heyzine.com/flip-book/c700d8beb2.html']:
        try:
            r=c.request.get(url,timeout=30000);report['external_reading_links'].append({'url':url,'status':r.status,'final_url':r.url,'http_available':r.ok})
        except Exception as e:report['external_reading_links'].append({'url':url,'error':str(e),'http_available':False})
    c.close();browser.close()
(OUT/'cover-rendering.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
