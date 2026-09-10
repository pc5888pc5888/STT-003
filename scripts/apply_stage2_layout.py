"""Apply only the approved text-layout corrections, idempotently."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def replace(path, old, new):
    p=ROOT/path; s=p.read_text(encoding='utf-8')
    if new in s: return
    if s.count(old)!=1: raise ValueError('Source lock mismatch: '+path)
    p.write_text(s.replace(old,new),encoding='utf-8')
replace('src/pages/HomeCanonical.tsx','<h1><span>讓重要的事，</span><span>走得更遠。</span></h1>','<h1>讓重要的事，走得更遠。</h1>')
replace('src/pages/PublicCore.tsx','<div className={`stt-canon-statement ${kind === "method" ? "stt-canon-method-sequence" : ""}`}>{page.statement}</div>','{kind !== "method" && <div className="stt-canon-statement">{page.statement}</div>}')
old='<div className="stt-canon-visual" aria-hidden="true" style={{ backgroundImage: `url(${page.visual})` }} />'
new=old+'\n          {kind === "method" && <div className="stt-canon-method-sequence stt-canon-method-rail" aria-label={page.statement}>{["看見", "反推", "舉證", "理解", "架構", "執行", "留下"].map((step, index) => <span className="stt-method-node" key={step}>{index > 0 && <span className="stt-method-arrow" aria-hidden="true">→</span>}{step}</span>)}</div>'
replace('src/pages/PublicCore.tsx',old,new)
replace('scripts/mmedia_sync.py',"        if old:\n            item['excerpt']", "        if old:\n            for field in ('title', 'excerpt'):\n                if re.sub(r'\\s+', ' ', old.get(field, '')).strip() == re.sub(r'\\s+', ' ', item[field]).strip():\n                    item[field] = old.get(field, '')\n            item['excerpt']")
print('Approved layout changes applied; unrelated copy and artwork untouched.')
