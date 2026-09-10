from pathlib import Path
import json
p=Path('src/components/FullBleedHero.tsx');s=p.read_text()
lines={'problems':['不是先選服務；','先從你正在面對的','真實問題開始。'],'method':['先把問題判斷對，','再談怎麼做。'],'columns':['莊鈞翔博士｜專欄判讀'],'publications':['思想被留下，','才可能被理解、','被檢驗、被承接。'],'stt':['策略為先，','治理為本，','管理為終。']}
if 'const TITLE_LINES' not in s:
    anchor='export default function FullBleedHero('
    assert s.count(anchor)==1
    s=s.replace(anchor,'const TITLE_LINES: Record<PrimaryTheme, string[]> = '+json.dumps(lines,ensure_ascii=False)+';\n\n'+anchor,1)
    old='<h1 id={`hero-title-${theme}`}>{item.title}</h1>'
    assert s.count(old)==1
    s=s.replace(old,'<h1 id={`hero-title-${theme}`} aria-label={item.title}>{TITLE_LINES[theme].map((line, index) => <span key={index} style={{ display: "block" }}>{line}</span>)}</h1>')
    p.write_text(s)
p=Path('src/App.tsx');s=p.read_text();anchor='className="min-h-[106px] cursor-pointer bg-white p-5 text-left"'
if anchor+' aria-label={item.label}' not in s:
    assert s.count(anchor)==1
    s=s.replace(anchor,anchor+' aria-label={item.label}',1);p.write_text(s)
print('Editorial phrase boundaries and exact mobile navigation labels applied; no original assets altered.')
