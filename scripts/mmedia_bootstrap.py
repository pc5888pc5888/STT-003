"""Reconstruct the uploaded snapshot losslessly from verified public data.
Only whitespace representation differs. Both the normalized source and the
restored exact seven-field dataset must pass their independent SHA-256 gates.
"""
import datetime as dt
import json
import re
import mmedia_sync as m

if m.CATALOG.exists():
    raise SystemExit('A baseline already exists; use the regular non-destructive sync.')
contract = json.loads(m.CONTRACT.read_text(encoding='utf-8'))
layout = json.loads((m.ROOT / 'data/mmedia-baseline-whitespace.json').read_text(encoding='utf-8'))
rows, pages = m.crawl()
normalized = [{key: re.sub(r'\s+', ' ', row[key]).strip() for key in m.FIELDS} for row in rows]
if m.canonical_hash(normalized) != layout['normalizedSha256']:
    raise SystemExit('Source content changed; baseline import blocked.')
for row in normalized:
    row.update(layout['overrides'].get(row['url'], {}))
if len(normalized) != contract['total'] or m.canonical_hash(normalized) != contract['canonicalSha256']:
    raise SystemExit('Exact uploaded snapshot not reproduced; import blocked.')
checked = dt.datetime.now(dt.timezone.utc).isoformat()
previous = {'source': contract['source'], 'baseline': {
    'total': contract['total'], 'canonicalSha256': contract['canonicalSha256'], 'verifiedAt': checked,
    'verification': 'All seven source fields exactly match the uploaded 212-record snapshot after restoring its original whitespace.'}}
result = m.merge(previous, normalized, checked, pages)
assert result['stats'] == {'total': 212, 'uniqueUrls': 212, 'legal': 199, 'humanistic': 2, 'news': 11, 'pending': 0}
m.CATALOG.parent.mkdir(parents=True, exist_ok=True)
temp = m.CATALOG.with_suffix('.tmp')
temp.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
temp.replace(m.CATALOG)
print(json.dumps({'baseline': result['baseline'], 'stats': result['stats'], 'sync': result['sync']}, ensure_ascii=False, indent=2))
