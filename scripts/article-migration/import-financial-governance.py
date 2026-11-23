"""Import the nine owner-supplied PUB05-R1 columns without rewriting their prose.

Usage: python scripts/article-migration/import-financial-governance.py SOURCE_DIR UPLOAD_DIR
Requires beautifulsoup4 and Pillow only at import time; production builds use Node.
The approved CMS source is retained separately from the site's reading projection.
"""
import copy
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys

from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE, UPLOADS = map(Path, sys.argv[1:3])
ORIGIN = 'https://stt-003.vercel.app'
SOURCE_ORIGIN = 'https://stt-003-d46evfrzn-pc5888pc5888s-projects.vercel.app'
IMPORT = ROOT / 'content/financial-governance-20261122'
IMPORT.mkdir(parents=True, exist_ok=True)
(IMPORT / 'source').mkdir(exist_ok=True)
(ROOT / 'public/article-images').mkdir(exist_ok=True)
sha = lambda value: hashlib.sha256(value).hexdigest()
text_hash = lambda value: sha(re.sub(r'\s+', '', value).encode())
read_json = lambda path: json.loads(path.read_text())
write_json = lambda path, data: path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
catalog = read_json(SOURCE / 'catalog.json')
assert [x['id'] for x in catalog] == [f'{i:02d}' for i in range(1, 10)]
index_path = ROOT / 'public/data/article-index.json'
assets_path = ROOT / 'public/data/article-assets.json'
rules_path = ROOT / 'src/data/articleReadingRules.json'
old_index, assets, rules = map(read_json, (index_path, assets_path, rules_path))
assert len(old_index) == 270, 'Import only onto the verified 270-article baseline'
original_assets = copy.deepcopy(assets)
manifest, new_index = [], []

for item in catalog:
    number = item['id']
    article_id = 'financial-governance-' + number
    assert all(x['id'] != article_id for x in old_index)
    raw = (SOURCE / (number + '.txt')).read_bytes()
    assert sha(raw) == item['sha256'] and len(raw) == item['htmlBytes'], number
    shutil.copyfile(SOURCE / (number + '.txt'), IMPORT / 'source' / (number + '.html'))
    soup = BeautifulSoup(raw.decode('utf-8'), 'html.parser')
    title = soup.select_one('[data-stt-field="article-title"]').get_text('', strip=True)
    subtitle = soup.select_one('[data-stt-field="article-subtitle"]').get_text('', strip=True)
    assert (title, subtitle) == (item['title'], item['subtitle']), number

    # Keep every abstract, article, legal-source and responsibility paragraph.
    # The existing STT reading layout supplies title/byline, copyright and artwork.
    sections = [soup.select_one('.' + cls) for cls in ('abstract', 'article-body', 'legal-zone', 'ai-full')]
    assert all(sections) and len(soup.select('.article-body h2')) == 9
    source_fields = [(x.get('data-stt-field'), x.get_text()) for section in sections for x in section.select('[data-stt-field]')]
    source_links = [(x.get('href'), x.get_text()) for section in sections for x in section.select('a[href]')]
    projection = BeautifulSoup('<div></div>', 'html.parser')
    wrapper = projection.div
    wrapper['id'] = 'source-' + article_id + '-stt-legal-v2'
    toc = []
    for section in sections:
        node = copy.deepcopy(section)
        if node.name == 'main':
            node.name = 'div'
        for heading in node.find_all(['h2', 'h3', 'h4']):
            anchor = f'source-{article_id}-section-{len(toc) + 1}'
            heading['id'] = anchor
            toc.append({'id': anchor, 'title': heading.get_text('', strip=True), 'level': int(heading.name[1])})
        wrapper.append(node)
    assert [(x.get('data-stt-field'), x.get_text()) for x in wrapper.select('[data-stt-field]')] == source_fields
    assert [(x.get('href'), x.get_text()) for x in wrapper.select('a[href]')] == source_links
    assert not wrapper.find_all(['script', 'iframe', 'object', 'embed', 'meta', 'title', 'main', 'h1', 'img'])
    for el in wrapper.find_all(True):
        assert not any(key.lower().startswith('on') for key in el.attrs)
        assert not str(el.get('href', '')).lower().startswith('javascript:')
    body = str(wrapper)
    css = '\n'.join(style.get_text() for style in soup.find_all('style'))
    assert not re.search(r'@import|url\s*\(|</style', css, re.I)
    css = css.replace('#stt-legal-v2', '#' + wrapper['id'])

    files = list(UPLOADS.glob(f'*AM-{int(number)}(1).png'))
    assert len(files) == 1, (number, files)
    image_file = files[0]
    image_bytes = image_file.read_bytes()
    image_sha = sha(image_bytes)
    with Image.open(image_file) as im:
        width, height = im.size
        assert im.format == 'PNG' and (width, height) == (1672, 941)
    image_path = '/article-images/' + image_sha[:16] + '.png'
    shutil.copyfile(image_file, ROOT / 'public' / image_path.lstrip('/'))
    assert sha((ROOT / 'public' / image_path.lstrip('/')).read_bytes()) == image_sha
    assets.append({'path': image_path, 'sourceUrl': ORIGIN + image_path, 'sha256': image_sha,
                   'bytes': len(image_bytes), 'width': width, 'height': height})
    article_path = '/columns/articles/' + number.zfill(6)
    record = {
        'id': article_id, 'title': title, 'author': '莊鈞翔博士', 'date': '2026/11/22',
        'category': '法律', 'series': 'legal',
        'excerpt': '\n\n'.join(x.get_text('', strip=True) for x in sections[0].find_all('p')),
        'sourceUrl': ORIGIN + article_path, 'sourcePublisher': 'STT Governance｜策略智庫智慧治理',
        'sourceRelation': 'stt', 'path': article_path,
        'cover': {'src': image_path, 'width': width, 'height': height, 'alt': title + '｜' + subtitle},
        'collectedAt': '2026-11-22', 'textHash': text_hash(wrapper.get_text()),
        'sourceHtmlHash': sha(raw), 'bodyImageCount': 0,
    }
    payload = {**record, 'html': body, 'css': css, 'toc': toc}
    (ROOT / 'public/data/articles' / (article_id + '.json')).write_text(json.dumps(payload, ensure_ascii=False, separators=(',', ':')) + '\n')
    body_sha = sha(body.encode())
    rules[article_id] = {'sourceSha256': body_sha, 'sourceLength': len(body.encode('utf-16-le')) // 2,
                         'resultSha256': body_sha, 'edits': [], 'removedTocIds': [],
                         'intro': {'title': title, 'subtitles': [subtitle], 'subjects': [], 'editorialNotes': []}}
    new_index.append(record)
    manifest.append({'id': article_id, 'number': number, 'title': title, 'subtitle': subtitle,
                     'sourceUrl': SOURCE_ORIGIN + '/' + item['source'], 'sourceVersion': 'PUB05-R1',
                     'sourceFile': f'source/{number}.html', 'sourceSha256': sha(raw), 'sourceBytes': len(raw),
                     'fieldCount': len(source_fields), 'referenceLinkCount': len(source_links),
                     'readingHtmlSha256': body_sha, 'imageOriginalName': image_file.name,
                     'imagePath': image_path, 'imageSha256': image_sha, 'imageBytes': len(image_bytes),
                     'width': width, 'height': height, 'path': article_path})

assert assets[:len(original_assets)] == original_assets
write_json(index_path, new_index + old_index)
write_json(assets_path, assets)
rules_path.write_text(json.dumps(rules, ensure_ascii=False, separators=(',', ':')) + '\n')
shutil.copyfile(SOURCE / 'catalog.json', IMPORT / 'catalog.json')
write_json(IMPORT / 'manifest.json', manifest)
print(json.dumps({'imported': len(new_index), 'totalArticles': len(new_index + old_index), 'totalImages': len(assets),
                  'originalArticlesUnchanged': len(old_index), 'matchedSourceHashes': len(manifest),
                  'matchedOriginalImages': len(manifest)}, ensure_ascii=False))
