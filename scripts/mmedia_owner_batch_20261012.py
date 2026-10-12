"""Apply the owner's 2026-10-12 batch from verified public author cards only.
A failed unrelated historical pagination must not prevent this bounded update.
Never turn preview visibility into a claim of public publication.
"""
from __future__ import annotations
import concurrent.futures, datetime as dt, json, pathlib, re, urllib.parse, urllib.request
from bs4 import BeautifulSoup
import mmedia_sync as sync

REPORT = sync.ROOT / 'data/mmedia-owner-batch-20261012-result.json'
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; STT-Owner-Batch/1.0)', 'Accept': 'text/html'}

def fetch(url: str) -> tuple[str, str, int]:
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=25) as response:
        final = response.geturl()
        if urllib.parse.urlparse(final).hostname != '94m.com.tw': raise ValueError('Unexpected source redirect')
        # Article bodies contain very large embedded images. Only the first HTML
        # fragment containing the title/byline is needed for link verification.
        # Author-index cards, the actual metadata source, must still be read fully.
        header_only = '/articles/' in urllib.parse.urlparse(url).path
        raw = response.read(2_000_000 if header_only else 8_000_001)
        if not header_only and len(raw) > 8_000_000: raise ValueError('Author index too large')
        return raw.decode('utf-8', errors='replace'), final, response.status

def inspect_source(article_id: str) -> dict:
    url = sync.ORIGIN + '/articles/' + article_id
    result = {'articleId': article_id, 'canonicalUrl': url}
    try:
        raw, final, status = fetch(url); soup = BeautifulSoup(raw, 'html.parser'); title = soup.find('h1')
        result.update({'httpStatus': status, 'finalUrl': final, 'publicArticleTitle': title.get_text(' ', strip=True) if title else None,
                       'publicArticleAvailable': bool(title) and sync.absolute(final) == url})
        if not result['publicArticleAvailable']:
            raw, final, status = fetch(url + '?from_admin=true'); soup = BeautifulSoup(raw, 'html.parser'); title = soup.find('h1')
            result['providedPreview'] = {'url': url + '?from_admin=true', 'httpStatus': status,
                                        'title': title.get_text(' ', strip=True) if title else None}
            if title:
                nearby = title.parent.get_text(' ', strip=True)
                result['providedPreview']['nearTitleDateCandidates'] = re.findall(r'20\d{2}/\d{2}/\d{2}\s+\d{2}:\d{2}', nearby)[:3]
    except Exception as error:
        result['error'] = str(error); result['publicArticleAvailable'] = False
    return result

def main() -> None:
    previous = json.loads(sync.CATALOG.read_text(encoding='utf-8'))
    old_by_id = {row['url'].rsplit('/', 1)[-1]: row for row in previous['articles']}
    raw, final, status = fetch(sync.AUTHOR)
    if sync.absolute(final) != sync.AUTHOR or status != 200: raise ValueError('Author index unavailable')
    cards, _, _ = sync.parse_initial(raw)
    if not cards: raise ValueError('No verified public author cards; keep existing catalog')
    selected = [row for row in cards if row['url'].rsplit('/', 1)[-1] in sync.OWNER_SERIES]
    missing_before = [article_id for article_id in sync.OWNER_SERIES if article_id not in old_by_id]
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        checks = {item['articleId']: item for item in pool.map(inspect_source, missing_before)}
    verified_rows = []
    for row in selected:
        article_id = row['url'].rsplit('/', 1)[-1]
        check = checks.get(article_id)
        if check:
            if not check['publicArticleAvailable']: continue
            normalize = lambda value: re.sub(r'\s+', '', str(value))
            if normalize(check['publicArticleTitle']) != normalize(row['title']):
                raise ValueError('Public title disagrees with author card: ' + article_id)
        verified_rows.append(row)
    checked = dt.datetime.now(dt.timezone.utc).isoformat()
    result = sync.merge(previous, verified_rows, checked, 1)
    result['sync']['method'] = 'owner-specified-public-author-cards'
    result['sync']['complete'] = False
    result['sync']['scope'] = 'Owner-specified 24 article IDs only; not a complete historical source crawl.'
    new_by_id = {row['url'].rsplit('/', 1)[-1]: row for row in result['articles']}
    added = [article_id for article_id in sync.OWNER_SERIES if article_id in new_by_id and article_id not in old_by_id]
    retained = [article_id for article_id in sync.OWNER_SERIES if article_id in old_by_id]
    awaiting = [article_id for article_id in sync.OWNER_SERIES if article_id not in new_by_id]
    if len(new_by_id) != len(result['articles']): raise ValueError('Duplicate article ID detected')
    if not set(old_by_id).issubset(new_by_id): raise ValueError('Historical article loss')
    if any(new_by_id[article_id]['series'] != 'legal' for article_id in sync.OWNER_SERIES if article_id in new_by_id):
        raise ValueError('Owner assignment violated')
    if any(new_by_id[article_id] != row for article_id, row in old_by_id.items() if article_id not in sync.OWNER_SERIES):
        raise ValueError('Out-of-scope article modification')
    report = {'checkedAt': checked, 'ownerAssignedSeries': 'legal', 'requestedUnique': len(sync.OWNER_SERIES),
              'baselineStats': previous['stats'], 'resultStats': result['stats'], 'newlyAddedIds': added,
              'existingRetainedOnceIds': retained, 'awaitingPublicSourceIds': awaiting,
              'sourceChecks': list(checks.values()),
              'articles': [{'articleId': article_id, 'status': 'ADDED' if article_id in added else 'EXISTING_RETAINED_ONCE' if article_id in retained else 'SOURCE_REQUIRED_PUBLICATION',
                            'series': 'legal', 'title': new_by_id.get(article_id, {}).get('title') or checks.get(article_id, {}).get('providedPreview', {}).get('title'),
                            'date': new_by_id.get(article_id, {}).get('date')} for article_id in sync.OWNER_SERIES],
              'qa': {'uniqueArticleIds': True, 'historicalArticlesRetained': True, 'outsideBatchUnchanged': True,
                     'allArchivedOwnerArticlesLegal': True, 'wholeSiteAcceptance': 'NOT_CLAIMED', 'productionVisualVerification': 'NOT_RUN_BY_THIS_SCRIPT'}}
    for path, data in ((sync.CATALOG, result), (REPORT, report)):
        temp = path.with_suffix('.tmp'); temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'); temp.replace(path)
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == '__main__': main()
