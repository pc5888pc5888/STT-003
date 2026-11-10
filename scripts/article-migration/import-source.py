"""Import an audited private export. No private records are written to this repo.
Usage: python scripts/article-migration/import-source.py /path/to/verified_output
Requires lxml; the published site/build does not require Python.
"""
import sys,json,re,hashlib,shutil
from pathlib import Path
from urllib.parse import urljoin
from lxml import html,etree

root=Path(__file__).resolve().parents[2]
source=Path(sys.argv[1]); data=json.loads((source/'M_Articles_274_20261110.json').read_text())
active=[a for a in data['articles'] if a['backend_status']=='啟動']
assert len(active)==270 and len({a['id'] for a in active})==270
manifest={x['local_path']:x for x in data['image_manifest']}
out=root/'public/data/articles'; out.mkdir(parents=True,exist_ok=True)
assets=root/'public/article-images'; assets.mkdir(parents=True,exist_ok=True)
normalize=lambda s:re.sub(r'\s+','',s)
sha=lambda s:hashlib.sha256(s.encode()).hexdigest()
index=[]; used={}; email_count=0
for a in active:
    images={}
    for im in a['images']:
        local=im['local_path']; m=manifest[local]
        assert hashlib.sha256((source/local).read_bytes()).hexdigest()==m['sha256']
        dest='/article-images/'+Path(local).name
        shutil.copyfile(source/local,root/'public'/dest.lstrip('/'))
        used[dest]={'path':dest,'sourceUrl':m['url'],'sha256':m['sha256'],'bytes':m['bytes'],'width':m['width'],'height':m['height']}
        for url in (im['display_url'],im['original_url']): images[url]=(dest,m,im['alt'])
    fragment=html.fragment_fromstring(a['content_html'],create_parent='div')
    styles=[]
    for el in list(fragment.xpath('.//meta|.//title|.//script|.//style|.//link')):
        if el.tag=='title' and (el.text or '').strip():
            el.tag='p'; el.set('class','stt-source-document-title'); continue
        if el.tag=='style':
            css=el.text or ''
            assert '#stt-legal-v2' in css and not re.search(r'@import|url\s*\(|</style',css,re.I)
            styles.append(css.replace('#stt-legal-v2','#source-'+a['id']+'-stt-legal-v2').replace('h1','h2'))
        el.drop_tree()
    original_text=''.join(fragment.itertext())
    assert normalize(original_text)==normalize(a['content_text']), a['id']
    toc=[]; ids={}
    for el in fragment.iter():
        if not isinstance(el.tag,str): continue
        if el.get('id'):
            old=el.get('id'); new='source-'+a['id']+'-'+old; ids[old]=new; el.set('id',new)
        if el.tag=='h1': el.tag='h2'
        if el.tag=='main': el.tag='div'
        protected_email=el.get('data-cfemail')
        for attr in list(el.attrib):
            if attr.lower().startswith('on') or attr in ['jscontroller','jsaction','data-cfemail','srcset','contenteditable']:
                del el.attrib[attr]
        if el.tag=='img':
            src=urljoin(a['url'],el.get('src',''))
            assert src in images,(a['id'],src)
            dest,m,alt=images[src]
            el.set('src',dest);el.set('width',str(m['width']));el.set('height',str(m['height']))
            el.set('loading','lazy');el.set('decoding','async');el.attrib.pop('fetchpriority',None)
            if not el.get('alt'):el.set('alt',alt or a['title']+'（內文圖片）')
        if el.tag=='a' and el.get('href'):
            href=el.get('href')
            if '/cdn-cgi/l/email-protection' in href:
                encoded=protected_email or (href.split('#',1)[1] if '#' in href else '')
                assert encoded,(a['id'],'missing email cipher')
                code=bytes.fromhex(encoded); href='mailto:'+bytes(x^code[0] for x in code[1:]).decode(); email_count+=1
            if not href.startswith('#'):href=urljoin(a['url'],href)
            assert re.match(r'^(https?://|mailto:|tel:|#)',href), (a['id'],href)
            el.set('href',href)
            if href.startswith('http'):el.set('target','_blank');el.set('rel','noopener noreferrer')
        if el.tag in ('h2','h3','h4','h5','h6'):
            title=''.join(el.itertext()).strip()
            if title:
                anchor=el.get('id') or 'source-'+a['id']+'-section-'+str(len(toc)+1)
                el.set('id',anchor);toc.append({'id':anchor,'title':title,'level':int(el.tag[1])})
    for el in fragment.xpath('.//a[starts-with(@href,"#")]'):
        frag=el.get('href')[1:]
        if frag in ids:el.set('href','#'+ids[frag])
    for table in list(fragment.xpath('.//table[not(ancestor::table)]')):
        wrapper=etree.Element('div',{'class':'stt-article-table-scroll','tabindex':'0','role':'region','aria-label':'文章表格，可左右捲動'})
        parent=table.getparent();parent.replace(table,wrapper);wrapper.append(table)
    body=''.join(html.tostring(el,encoding='unicode') for el in fragment)
    assert normalize(''.join(fragment.itertext()))==normalize(original_text),a['id']
    cover,m,_=images[a['cover_image_url']]
    row={'id':a['id'],'title':a['title'],'author':a['author'],'date':a['published_at'],
         'category':a['category'],'series':{'法律':'legal','社會':'humanistic','M-news':'news'}[a['category']],
         'excerpt':a['summary'],'sourceUrl':a['source_url'],'path':'/columns/articles/'+a['id'],
         'cover':{'src':cover,'width':m['width'],'height':m['height'],'alt':a['title']},
         'collectedAt':'2026-11-10','textHash':sha(normalize(original_text)),
         'sourceHtmlHash':sha(a['content_html']),'bodyImageCount':len(fragment.xpath('.//img'))}
    payload={**row,'html':body,'css':'\n'.join(styles),'toc':toc}
    (out/(a['id']+'.json')).write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':'))+'\n')
    index.append(row)
(root/'public/data/article-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2)+'\n')
(root/'public/data/article-assets.json').write_text(json.dumps(list(used.values()),ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'publicArticles':len(index),'originalImages':len(used),'decodedEmailLinks':email_count,'bodyTextMatches':len(index)},ensure_ascii=False))
