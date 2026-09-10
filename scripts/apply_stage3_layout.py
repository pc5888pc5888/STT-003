"""Apply bounded stage-three edits, preserving all existing editorial text."""
from pathlib import Path
import hashlib, json, re
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'stage3-evidence'
OUT.mkdir(exist_ok=True)
CHANGED=[]

def digest(path):
    return hashlib.sha256((ROOT/path).read_bytes()).hexdigest()

def patch(path, expected, edits):
    p=ROOT/path
    source=p.read_text(encoding='utf-8')
    if digest(path) != expected:
        if all(new in source for old,new in edits):
            return
        raise ValueError('Source changed; refusing overwrite: '+path)
    result=source
    for old,new in edits:
        if result.count(old)!=1:
            raise ValueError('Ambiguous source anchor: '+path+' '+old[:70])
        result=result.replace(old,new,1)
    p.write_text(result,encoding='utf-8')
    CHANGED.append(path)

patch('src/pages/ProblemDetail.tsx','b4ca69ee85c73e47965d3cf5c714acd870e13b379d1eab3d9071c2c82c5a219e',[
 ('import { useNavigate, useParams } from "react-router-dom";', 'import { Navigate, useNavigate, useParams } from "react-router-dom";\nimport RouteArtwork from "../components/RouteArtwork";'),
 ('const cfg=data[id]??data["major-decision"];','const cfg=data[id];\n  if(!cfg) return <Navigate to="/problems" replace />;'),
 ('<section className="pd4-hero"><div className="pd4-wrap"><div className="pd4-eyebrow">','<section className="pd4-hero stt-route-hero"><div className="pd4-wrap stt-route-hero-grid"><div className="stt-route-hero-copy"><div className="pd4-eyebrow">'),
 ('← 回到問題入口</button></div></section>','← 回到問題入口</button></div><RouteArtwork /></div></section>'),
])
patch('src/pages/Domains.tsx','12995066d2e59d8417eef35b1d14c98f3ba82d7ae2c52df0f6480428885363dd',[
 ('import { useNavigate, useParams } from "react-router-dom";', 'import { Navigate, useNavigate, useParams } from "react-router-dom";\nimport RouteArtwork from "../components/RouteArtwork";'),
 ('const domain=domains.find((d)=>d.slug===slug)??domains[0];','const domain=domains.find((d)=>d.slug===slug);\n  if(!domain) return <Navigate to="/domains" replace />;'),
 ('<section className="domain-hero"><div className="domain-wrap"><div className="domain-kicker">{domain.eyebrow}</div><h1>{domain.title}</h1><p>{domain.subtitle}</p></div></section>', '<section className="domain-hero stt-route-hero"><div className="domain-wrap stt-route-hero-grid"><div className="stt-route-hero-copy"><div className="domain-kicker">{domain.eyebrow}</div><h1>{domain.title}</h1><p>{domain.subtitle}</p></div><RouteArtwork /></div></section>'),
])
p=ROOT/'src/pages/CanonicalLibrary.tsx'
s=p.read_text(encoding='utf-8')
if 'import RouteArtwork' not in s:
    if digest('src/pages/CanonicalLibrary.tsx')!='6576753e9216e84dcb16b2ed84e3a7f712fbb97b81b058f985c07c84236938f6':
        raise ValueError('Library source changed')
    s=s.replace('import type { ReactNode } from "react";', 'import type { ReactNode } from "react";\nimport RouteArtwork from "../components/RouteArtwork";',1)
    s,count=re.subn(r'<section className="lib-hero"><div className="lib-wrap">(.*?)</div></section>',lambda m:'<section className="lib-hero stt-route-hero"><div className="lib-wrap stt-route-hero-grid"><div className="stt-route-hero-copy">'+m[1]+'</div><RouteArtwork /></div></section>',s)
    if count!=3:raise ValueError('Expected exactly three library heroes')
    p.write_text(s,encoding='utf-8');CHANGED.append('src/pages/CanonicalLibrary.tsx')
patch('src/main.tsx','897985c899557a2c33f5451f09acfd9504cf9ac66ef4e913bce4cf46363ca6f7',[
 ('import "./styles/stt-stage2-polish.css";','import "./styles/stt-stage2-polish.css";\nimport "./styles/stt-stage3.css";'),
])
patch('src/titleRules.ts','ec1abc08e15889c6c8a08b03e129d3ce21ddd642f4fc50862cba6a1ef3b21f66',[
 ('  document.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach(applySentenceBreak);','  document.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach(applySentenceBreak);\n  const heading = document.querySelector("main h1")?.textContent?.trim();\n  const title = window.location.pathname === "/" ? "STT Governance｜策略智庫" : heading ? `${heading} · STT Governance` : "STT Governance｜策略智庫";\n  if (document.title !== title) document.title = title;'),
])
source='public/visual-bank/stt/succession.webp'
target='public/visual-bank/stt/family-ownership.webp'
assert digest(source)=='a16169764c54f6d46e318503ada6dba932b44025b7b531daf7e037d3817040ce'
assert digest(target) in ['2aa6814d825a51fa2e7b9c1233f569b9b344f6f6c932619b65bfb13837f036a1',digest(source)]
with Image.open(ROOT/source) as im:
    im.load();assert im.size==(600,338)
(ROOT/target).write_bytes((ROOT/source).read_bytes())
CHANGED.append(target)
# Decode every route asset, not just the RIFF header or HTTP status.
images=[]
for p in sorted((ROOT/'public/visual-bank/stt').glob('*.webp')):
    with Image.open(p) as im:
        im.load();images.append({'path':str(p.relative_to(ROOT)),'dimensions':im.size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
assert digest('public/visual-bank/stt/home-approved.webp')=='ff9d8d7a5470d6697f7e5ff10a8a776d4b86e64a9e22a46b20df1cce627353d9'
report={'changed':CHANGED,'allRouteAssetsDecoded':True,'routeAssets':images,'familySource':source,'familyTarget':target,'familyMethod':'Reinstall intact existing approved Family Constitution rendition, without generating new artwork.','homepageUnchanged':True,'bookAndCorporateComplianceSeparated':True,'scope':'Active STT route imagery and navigation; legacy unused image files were not modified.'}
(OUT/'asset-and-change-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
