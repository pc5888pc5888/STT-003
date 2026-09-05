const problemAssets:Record<string,string>={
  '/problems/major-decision':'/visual-bank/stt/major-decision.webp',
  '/problems/owner-dependence':'/visual-bank/stt/owner-dependence.webp',
  '/problems/succession':'/visual-bank/stt/succession.webp',
  '/problems/family-ownership':'/visual-bank/stt/family-ownership.webp',
  '/problems/strategic-legal':'/visual-bank/stt/strategic-legal.webp',
  '/problems/ai-governance':'/visual-bank/stt/ai-governance.webp',
  '/problems/system-failure':'/visual-bank/stt/system-failure.webp',
  '/problems/founder-legacy':'/visual-bank/stt/founder-legacy.webp'
};

const artifactAssets:Record<string,string>={
  '/how-stt-works':'/visual-bank/stt/how-we-judge.webp',
  '/publications':'/visual-bank/stt/publications.webp',
  '/stt':'/visual-bank/stt/stt-platform.webp'
};

function setImage(el:HTMLImageElement|null,src:string){
  if(!el||el.dataset.assetBank===src)return;
  el.src=src; el.dataset.assetBank=src;
}
function setArtifact(el:HTMLElement|null,src:string){
  if(!el)return;
  el.dataset.assetBank=src;
  el.style.setProperty('--asset-bank-image',`url("${src}")`);
}
function luminance(rgb:string){
  const m=rgb.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i); if(!m)return 1;
  const [r,g,b]=[+m[1],+m[2],+m[3]].map(v=>v/255);
  return .2126*r+.7152*g+.0722*b;
}
function enforceWhitePublicSurfaces(){
  document.documentElement.style.setProperty('background','#fbfaf7','important');
  document.body.style.setProperty('background','#fbfaf7','important');
  document.querySelectorAll<HTMLElement>('body *').forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.width*rect.height<12000)return;
    const cs=getComputedStyle(el);
    const dark=luminance(cs.backgroundColor)<.22;
    const gradient=cs.backgroundImage.includes('gradient')&&!cs.backgroundImage.includes('url(');
    if(dark||gradient){
      el.classList.add('asset-bank-whitened');
    }
  });
}
function applyAssetBank(){
  const path=location.pathname.replace(/\/$/,'')||'/';
  const p=problemAssets[path];
  if(p)setImage(document.querySelector<HTMLImageElement>('.pd-visual-img'),p);
  const a=artifactAssets[path];
  if(a)setArtifact(document.querySelector<HTMLElement>('.pc-artifact'),a);
  if(path==='/insights'||path==='/insights/index')setArtifact(document.querySelector<HTMLElement>('.stt-editorial-index-panel'),'/visual-bank/stt/insights.webp');
  if(path.startsWith('/governance/corporate'))setArtifact(document.querySelector<HTMLElement>('[class*="portal"], [class*="visual"], [class*="hero"]'),'/visual-bank/stt/corporate-governance.webp');
  if(path.startsWith('/internal-compliance'))setArtifact(document.querySelector<HTMLElement>('[class*="portal"], [class*="visual"], [class*="hero"]'),'/visual-bank/stt/internal-compliance.webp');
  enforceWhitePublicSurfaces();
}

let scheduled=0;
function schedule(){cancelAnimationFrame(scheduled);scheduled=requestAnimationFrame(()=>requestAnimationFrame(applyAssetBank));}
const push=history.pushState.bind(history),replace=history.replaceState.bind(history);
history.pushState=(...args)=>{push(...args);schedule();};
history.replaceState=(...args)=>{replace(...args);schedule();};
addEventListener('popstate',schedule);
addEventListener('DOMContentLoaded',schedule);
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
schedule();
