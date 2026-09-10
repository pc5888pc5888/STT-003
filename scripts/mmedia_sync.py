"""Read the public author index; never delete an archived article on absence.
The /articles/more POST is the site's public read-only '查看更多' operation.
No login, CMS credentials, article-body scraping or title-based classification.
"""
from __future__ import annotations
import argparse, datetime as dt, hashlib, http.cookiejar, json, pathlib, re, sys, time
import urllib.parse, urllib.request
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'public/data/mmedia-catalog.json'
CONTRACT = ROOT / 'data/mmedia-baseline-contract.json'
AUTHOR = 'https://94m.com.tw/editors/ed55fc'
ORIGIN = 'https://94m.com.tw'
FIELDS = ('url', 'title', 'date', 'category', 'author', 'authorUrl', 'excerpt')
SERIES = {'法律': 'legal', '社會': 'humanistic', '熱門社會': 'humanistic', 'M-news': 'news', 'M-NEWS': 'news', 'Ｍ-NEWS': 'news'}
TITLES = {'legal': '莊博士法律新聞專欄', 'humanistic': '莊博士人文地景產專欄', 'news': '莊博士新聞採訪專欄'}

def absolute(value: str) -> str:
    u = urllib.parse.urlparse(urllib.parse.urljoin(ORIGIN, str(value or '')))
    return urllib.parse.urlunparse((u.scheme, u.netloc, u.path, '', '', ''))

def verified(row: dict) -> bool:
    return (row.get('authorUrl') == AUTHOR and re.sub(r'\s+', '', str(row.get('author', ''))) == '莊鈞翔博士'
            and bool(re.fullmatch(r'https://94m\.com\.tw/articles/[A-Za-z0-9_-]+', str(row.get('url', ''))))
            and isinstance(row.get('title'), str) and bool(row['title'].strip())
            and bool(re.fullmatch(r'20\d{2}/\d{2}/\d{2} \d{2}:\d{2}', str(row.get('date', '')))))

def parse_initial(raw: str) -> tuple[list[dict], dict, str]:
    soup = BeautifulSoup(raw, 'html.parser'); rows = []
    for card in soup.select('div.box'):
        title = card.select_one('dl.text_dl > dt > a'); writer = card.select_one('dd.writer a')
        category = card.select_one('dfn.func'); date = card.select_one('dd.writer'); excerpt = card.select_one('dd.summary')
        if not all([title, writer, category, date]): continue
        if absolute(writer.get('href', '')) != AUTHOR: continue
        match = re.search(r'20\d{2}/\d{2}/\d{2}\s+\d{2}:\d{2}', date.get_text(' ', strip=True))
        row = {'url': absolute(title.get('href', '')), 'title': title.get_text(' ', strip=True),
               'date': re.sub(r'\s+', ' ', match.group(0)) if match else '',
               'category': category.get_text(' ', strip=True), 'author': writer.get_text(' ', strip=True),
               'authorUrl': absolute(writer.get('href', '')), 'excerpt': excerpt.get_text(' ', strip=True) if excerpt else ''}
        if not verified(row): raise ValueError('Author card failed validation')
        rows.append(row)
    more = soup.find('more-block'); csrf = soup.find('meta', attrs={'name': 'csrf-token'})
    return rows, dict(more.attrs) if more else {}, str(csrf.get('content', '')) if csrf else ''

def parse_more(items: list[dict]) -> list[dict]:
    fields = {'url': 'article_path', 'title': 'title', 'date': 'start_at_time', 'category': 'sub_category_title',
              'author': 'editor_name', 'authorUrl': 'editor_url', 'excerpt': 'intro'}
    rows = []
    for item in items:
        if not isinstance(item, dict): raise ValueError('Invalid article response')
        row = {key: str(item.get(field) or '').strip() for key, field in fields.items()}
        row['url'] = absolute(row['url']); row['authorUrl'] = absolute(row['authorUrl'])
        if not verified(row): raise ValueError('Unexpected author or malformed article in pagination')
        rows.append(row)
    return rows

def canonical_hash(rows: list[dict]) -> str:
    records = sorted([{key: row[key] for key in FIELDS} for row in rows], key=lambda r: r['url'])
    return hashlib.sha256(json.dumps(records, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()

def crawl() -> tuple[list[dict], int]:
    jar = http.cookiejar.CookieJar(); opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; STT-Author-Index/3.0)', 'Accept': 'text/html'}
    def read(request: urllib.request.Request) -> str:
        with opener.open(request, timeout=25) as response:
            if urllib.parse.urlparse(response.geturl()).hostname != '94m.com.tw': raise ValueError('Unexpected source redirect')
            data = response.read(8_000_001)
            if len(data) > 8_000_000: raise ValueError('Source response exceeds expected size')
            return data.decode('utf-8')
    initial, props, csrf = parse_initial(read(urllib.request.Request(AUTHOR, headers=headers)))
    if not initial or not csrf or props.get('model') != 'administrator' or props.get('id') != 'ed55fc':
        raise ValueError('Author index structure changed; previous catalog is retained')
    limit = int(props.get('default_limit', '0'))
    if not 1 <= limit <= 50: raise ValueError('Unexpected public page size')
    records = {r['url']: r for r in initial}
    if len(records) != len(initial): raise ValueError('Duplicate initial source cards')
    for page in range(2, 102):
        payload = {'model': props['model'], 'id': props['id'], 'page': page, 'limit': limit, 'special': props.get('special', '')}
        request = urllib.request.Request(ORIGIN + '/articles/more', data=json.dumps(payload).encode(), method='POST',
            headers={**headers, 'Accept': 'application/json', 'Content-Type': 'application/json', 'Origin': ORIGIN, 'Referer': AUTHOR, 'X-CSRF-Token': csrf})
        result = json.loads(read(request))
        if result.get('status') != 'success' or not isinstance(result.get('articles'), list):
            raise ValueError('Public pagination did not return a verified successful response')
        items = result['articles']; rows = parse_more(items)
        if len(rows) > limit: raise ValueError('Unexpected pagination length')
        fresh = sum(row['url'] not in records for row in rows)
        if rows and fresh == 0: raise ValueError('Pagination repeated a page; do not declare completion')
        for row in rows:
            if row['url'] in records and row != records[row['url']]: raise ValueError('Conflicting duplicate source record')
            records[row['url']] = row
        if len(items) < limit: return list(records.values()), page
        time.sleep(.25)
    raise ValueError('Pagination safety limit reached; previous catalog is retained')

def preserve_excerpt(previous: str, fresh: str) -> str:
    # Preserve a previously captured full excerpt when pagination returns only its truncation.
    for ending in ('...', '…'):
        if fresh.endswith(ending):
            prefix = re.sub(r'\s+', ' ', fresh[:-len(ending)]).strip()
            if prefix and re.sub(r'\s+', ' ', previous).startswith(prefix): return previous
    return fresh

def merge(previous: dict, rows: list[dict], checked_at: str, pages: int) -> dict:
    archive = {row['url']: dict(row) for row in previous.get('articles', [])}
    pending = {row['url']: row for row in previous.get('pending', [])}
    seen = set(); changes = {'added': 0, 'updated': 0, 'reclassified': 0}
    for row in rows:
        if not verified(row): raise ValueError('Merge input failed author validation')
        seen.add(row['url']); series = SERIES.get(row['category'])
        if not series:
            pending[row['url']] = {**row, 'reason': '來源分類尚未授權對應，不以標題猜測。'}
            continue
        pending.pop(row['url'], None)
        source_id = row['url'].rsplit('/', 1)[-1]
        item = {**row, 'id': 'mmedia-' + source_id, 'sourceArticleId': source_id, 'series': series, 'seriesTitle': TITLES[series], 'source': 'M傳媒'}
        old = archive.get(row['url'])
        if old:
            item['excerpt'] = preserve_excerpt(old.get('excerpt', ''), item['excerpt'])
            if old.get('series') != series: changes['reclassified'] += 1
            if any(old.get(k) != item.get(k) for k in (*FIELDS, 'series')): changes['updated'] += 1
        else: changes['added'] += 1
        archive[row['url']] = item
    articles = sorted(archive.values(), key=lambda r: (r['date'], r['url']), reverse=True)
    return {**previous, 'schemaVersion': '2.0', 'syncedAt': checked_at,
            'sync': {'method': 'public-author-index-and-more', 'complete': True, 'pagesFetched': pages, 'observed': len(rows),
                     'retainedNotSeen': len(set(archive) - seen), 'changes': changes},
            'stats': {'total': len(articles), 'uniqueUrls': len(archive), **{key: sum(r['series'] == key for r in articles) for key in TITLES}, 'pending': len(pending)},
            'articles': articles, 'pending': sorted(pending.values(), key=lambda r: r['url'])}

def main() -> None:
    parser = argparse.ArgumentParser(); parser.add_argument('--bootstrap', action='store_true'); args = parser.parse_args()
    contract = json.loads(CONTRACT.read_text(encoding='utf-8'))
    previous = json.loads(CATALOG.read_text(encoding='utf-8')) if CATALOG.exists() else None
    if previous is None and not args.bootstrap: raise ValueError('No verified baseline exists')
    rows, pages = crawl(); checked = dt.datetime.now(dt.timezone.utc).isoformat()
    if previous is None:
        if canonical_hash(rows) != contract['canonicalSha256']: raise ValueError('Live data differs from uploaded baseline; bootstrap is blocked')
        previous = {'source': contract['source'], 'baseline': {'total': contract['total'], 'canonicalSha256': contract['canonicalSha256'],
                    'verifiedAt': checked, 'verification': 'All seven source fields exactly match the uploaded 212-record snapshot.'}}
    result = merge(previous, rows, checked, pages)
    if result['stats']['total'] < contract['total']: raise ValueError('Baseline article loss detected')
    CATALOG.parent.mkdir(parents=True, exist_ok=True)
    temp = CATALOG.with_suffix('.tmp'); temp.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'); temp.replace(CATALOG)
    print(json.dumps({'checkedAt': checked, 'stats': result['stats'], 'sync': result['sync'], 'baseline': result['baseline']}, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    try: main()
    except Exception as error:
        print('SYNC BLOCKED: ' + str(error), file=sys.stderr); sys.exit(1)
