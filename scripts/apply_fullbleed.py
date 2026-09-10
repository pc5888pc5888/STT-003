"""Bounded primary-page edits; content datasets, source image pixels and identity remain read-only."""
from pathlib import Path
import re, json, hashlib
root=Path('.');out=root/'fullbleed-evidence';out.mkdir(exist_ok=True)
protected=['src/sttLogo.ts','src/data/mockData.ts','public/data/mmedia-catalog.json','api/mmedia.ts']
protected += [str(p) for p in (root/'public/visual-bank/stt/originals-20260910').glob('*')]
protected += [str(p) for p in (root/'src/assets/stt-logo-exact').glob('*')]
hash_file=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
before={p:hash_file(p) for p in protected}
changed=[]
def update(name, fn):
 p=root/name;old=p.read_text();new=fn(old)
 if new!=old:p.write_text(new);changed.append(name)
def once(s,old,new):
 assert s.count(old)==1, f'Expected one source anchor: {old[:100]}'
 return s.replace(old,new,1)
def subonce(s,pattern,new):
 s,n=re.subn(pattern,new,s,flags=re.S);assert n==1,(pattern,n);return s

def home(s):
 if 'const pillars=' not in s:return s
 s=subonce(s,r'const pillars=\[.*?\] as const;\s*','')
 s=subonce(s,r'const steps=\[.*?\] as const;\s*','')
 s=subonce(s,r'\n  <section className="stth-pillars">.*?</section>','')
 s=subonce(s,r'\n  <section className="stth-section soft"><div className="stth-wrap"><div className="stth-kicker">HOW STT JUDGES</div>.*?</section>','')
 s=once(s,'<section className="stth-hero">','<section className="stth-hero" id="hero">')
 return s
update('src/pages/HomeCanonical.tsx',home)
def problem(s):
 if 'FullBleedHero' in s:return s
 s='import FullBleedHero from "../components/FullBleedHero";\n'+s
 s=subonce(s,r'<section className="border-b border-\[#d8c8ad\].*?</section>','<FullBleedHero theme="problems" />')
 s=once(s,'<section className="px-6 py-12 lg:px-10 lg:py-18">','<section className="px-6 py-12 lg:px-10 lg:py-18" id="problem-index" aria-label="八個問題入口">')
 return s
update('src/pages/Problems.tsx',problem)
def columns(s):
 if 'FullBleedHero' in s:return s
 s='import FullBleedHero from "../components/FullBleedHero";\n'+s
 s=subonce(s,r'<section className="stt-columns-hero">.*?</section>','<FullBleedHero theme="columns"><div className="stt-columns-source"><span>收錄 {catalog.articles.length} 則專欄</span><a href={AUTHOR} target="_blank" rel="noopener noreferrer">M傳媒作者專區 ↗</a></div></FullBleedHero>')
 return once(s,'<section className="stt-series" aria-label="三大專欄系列">','<section className="stt-series" id="column-series" aria-label="三大專欄系列">')
update('src/pages/Columns.tsx',columns)
def public(s):
 if 'FullBleedHero' in s:return s
 s='import FullBleedHero, { JudgmentFoundations, STTRoles } from "../components/FullBleedHero";\n'+s
 pattern=r'      <section className="stt-canon-hero">.*?      </section>'
 m=re.search(pattern,s,re.S);assert m
 legacy=m[0].replace('{kind !== "method" && <div className="stt-canon-statement">{page.statement}</div>}', '<div className="stt-canon-statement">{page.statement}</div>')
 legacy=re.sub(r'          \{kind === "method" && <div.*?</div>\}\n', '', legacy)
 s=s[:m.start()]+'      {kind === "projects" ? (\n'+legacy+'\n      ) : <FullBleedHero theme={kind} />}\n      {kind === "method" && <JudgmentFoundations />}\n      {kind === "stt" && <STTRoles />}'+s[m.end():]
 s=once(s,'          {page.sections.map((section) => (','          {kind !== "method" && kind !== "projects" && <div className="stt-about-intro"><p>{page.title}</p><p>{page.statement}</p></div>}\n          {page.sections.map((section) => (')
 s=once(s,'<article className="stt-canon-row" key={section.number}>','<article className="stt-canon-row" key={section.number} id={kind === "method" ? `judgment-step-${Number(section.number)}` : undefined}>')
 return s
update('src/pages/PublicCore.tsx',public)
def app(s):
 old='className="relative h-full cursor-pointer border-0 bg-transparent px-3 text-[11px] tracking-[0.04em]"'
 return once(s,old,old+' aria-current={active ? "page" : undefined}') if 'aria-current={active ? "page"' not in s else s
update('src/App.tsx',app)
assert all(hash_file(p)==v for p,v in before.items()),'Protected source changed'
(out/'change-lock.json').write_text(json.dumps({'changed':changed,'protectedHashes':before,'protectedUnchanged':True,'newImagesGenerated':False},ensure_ascii=False,indent=2))
print(json.dumps({'changed':changed,'protectedUnchanged':True},ensure_ascii=False))
