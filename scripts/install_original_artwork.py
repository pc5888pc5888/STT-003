"""Install only the checksum-locked artwork supplied for the existing STT site."""
from __future__ import annotations
import argparse, hashlib, io, json, os, zipfile
from pathlib import Path
from PIL import Image

PACKAGE_SHA = 'fb9ddc782737573167c307ee160c29036a00bd2d68d1e14366ba85ca8695da5b'
MANIFEST_SHA = 'ffb3cace8de2290e3c5c8bfe61c7fc93515e21784a6cc0ad9b1c2126f2abb6aa'
PREFIX = '/visual-bank/stt/originals-20260910/'
EXPECTED = {
 'home-approved.webp':'30.png', 'major-decision.webp':'004.png',
 'owner-dependence.webp':'32.png','corporate-governance.webp':'32.png',
 'succession.webp':'006.png','family-ownership.webp':'006.png',
 'strategic-legal.webp':'33.png','system-failure.webp':'007.png',
 'internal-compliance.webp':'007.png','founder-legacy.webp':'013.png',
 'how-we-judge.webp':'31.png','insights.webp':'011.png',
 'publications.webp':'012.png','stt-platform.webp':'34.png','ai-governance.webp':'29.png',
}
CSS = '''/* Supplied original artwork. Display sizing never replaces source pixels. */
.stt-route-artwork img{height:auto!important;aspect-ratio:auto!important;object-fit:contain!important;image-rendering:auto!important;filter:none!important;opacity:1!important}
.stt-canon-visual,.stt-columns-visual,.stth-hero-media{filter:none!important;image-rendering:auto!important}
.stt-canon-visual::after{background:none!important}
.stt-canon-visual,.stt-columns-visual{width:100%;max-width:800px;min-height:0!important;aspect-ratio:1672/941;background-size:contain!important;background-repeat:no-repeat!important;justify-self:end}
@media(max-width:700px){.stth-hero-media{background-size:100% auto!important;background-position:center bottom!important}}
'''

def sha(data:bytes)->str:return hashlib.sha256(data).hexdigest()

def inspect(package:Path)->tuple[dict,dict[str,bytes]]:
    data=package.read_bytes()
    if sha(data)!=PACKAGE_SHA:raise ValueError('Artwork package checksum mismatch; no website files changed.')
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        text=z.read('manifest.json')
        if sha(text)!=MANIFEST_SHA:raise ValueError('Source manifest mismatch')
        manifest=json.loads(text)
        if manifest['mapping']!=EXPECTED:raise ValueError('Unexpected artwork mapping')
        assets=manifest['assets']
        names={'manifest.json'}|{v['file'] for v in assets.values()}
        if set(z.namelist())!=names or len(z.namelist())!=len(names):raise ValueError('Unexpected or duplicated package entries')
        decoded={}
        for name,entry in assets.items():
            raw=z.read(entry['file'])
            if sha(raw)!=entry['encodedSha256']:raise ValueError('Damaged artwork: '+name)
            image=Image.open(io.BytesIO(raw)).convert('RGB')
            if image.size!=(entry['width'],entry['height']) or min(image.size)<900:raise ValueError('Thumbnail rejected: '+name)
            if sha(image.tobytes())!=entry['pixelSha256']:raise ValueError('Pixel mismatch: '+name)
            decoded[name]=raw
    return manifest,decoded

def plan_code(root:Path)->dict[Path,str]:
    component=root/'src/components/RouteArtwork.tsx'
    changes={}
    for p in (root/'src').rglob('*'):
        if not p.is_file() or p.suffix not in {'.tsx','.ts','.css'}:continue
        old=p.read_text(encoding='utf-8');new=old
        for target in EXPECTED:new=new.replace('/visual-bank/stt/'+target,PREFIX+target)
        if p==component:
            new=new.replace('/visual-bank/stt/${filename}',PREFIX+'${filename}')
            new=new.replace('width={600} height={338}', 'width={filename === "ai-governance.webp" ? 3200 : 1672} height={filename === "ai-governance.webp" ? 2263 : 941}')
        if old!=new:changes[p]=new
    entry=root/'src/main.tsx';text=changes.get(entry,entry.read_text())
    css_import='import "./styles/stt-native-artwork.css";'
    if css_import not in text:
        anchor='import "./styles/stt-stage3.css";'
        if text.count(anchor)!=1:raise ValueError('Current stylesheet source has changed')
        changes[entry]=text.replace(anchor,anchor+'\n'+css_import,1)
    changes[root/'src/styles/stt-native-artwork.css']=CSS
    return changes

def install(root:Path, package:Path, check_only:bool=False)->dict:
    manifest,assets=inspect(package)
    protected=[root/'public/data/mmedia-catalog.json',root/'src/sttLogo.ts',*sorted((root/'src/assets/stt-logo-exact').glob('*.txt'))]
    before={str(p.relative_to(root)):sha(p.read_bytes()) for p in protected}
    if not (root/'src/components/RouteArtwork.tsx').is_file():raise ValueError('Expected existing STT route component is missing')
    if check_only:return {'sourceVerified':True,'sourceFiles':len(assets),'websiteAssets':len(EXPECTED),'installed':False}
    changes=plan_code(root)
    destination=root/'public/visual-bank/stt/originals-20260910';destination.mkdir(parents=True,exist_ok=True)
    for target,source in EXPECTED.items():
        temp=destination/(target+'.tmp');temp.write_bytes(assets[source]);os.replace(temp,destination/target)
    for p,text in changes.items():p.write_text(text,encoding='utf-8')
    for name,digest in before.items():
        if sha((root/name).read_bytes())!=digest:raise AssertionError('Protected original changed: '+name)
    public_manifest={**manifest,'urlPrefix':PREFIX,'packageSha256':PACKAGE_SHA,'installedAssets':{target:manifest['assets'][source] for target,source in EXPECTED.items()}}
    (root/'public/data/stt-original-artwork.json').write_text(json.dumps(public_manifest,ensure_ascii=False,indent=2))
    return {'sourceVerified':True,'sourceFiles':len(assets),'websiteAssets':len(EXPECTED),'installed':True,'protectedDataUnchanged':True,'changedTextFiles':[str(p.relative_to(root)) for p in changes],'urlPrefix':PREFIX}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--root',type=Path,default=Path('.'));parser.add_argument('--package',type=Path,default=Path('STT_Original_Artwork.zip'));parser.add_argument('--check-only',action='store_true');parser.add_argument('--code-only',action='store_true');args=parser.parse_args()
    if args.code_only:
        for p,text in plan_code(args.root.resolve()).items():p.write_text(text,encoding='utf-8')
        result={'sourceCodePrepared':True,'installed':False,'reason':'Artwork payload has not been installed; code-only validation is not website-quality acceptance.'}
    else:
        result=install(args.root.resolve(),args.package.resolve(),args.check_only)
    output=args.root/'native-artwork-evidence';output.mkdir(exist_ok=True)
    (output/'installation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2))
