const routeAssets:Record<string,string>={
  '/about':'/visual-bank/gcsda/about.webp',
  '/governance':'/visual-bank/gcsda/governance.webp',
  '/council':'/visual-bank/gcsda/council.webp',
  '/membership':'/visual-bank/gcsda/membership.webp',
  '/events':'/visual-bank/gcsda/events.webp',
  '/knowledge':'/visual-bank/gcsda/knowledge.webp',
  '/charter':'/visual-bank/gcsda/charter.webp'
};
function luminance(rgb:string){const m=rgb.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);if(!m)return 1;const [r,g,b]=[+m[1],+m[2],+m[3]].map(v=>v/255);return .2126*r+.7152*g+.0722*b;}
function enforceWhitePublicSurfaces(){
  document.documentElement.style.setProperty('background','#fbfaf7','important');
  document.body.style.setProperty('background','#fbfaf7','important');
  document.querySelectorAll<HTMLElement>('body *').forEach(el=>{
    const rect=el.getBoundingClientRect(); if(rect.width*rect.height<12000)return;
    const cs=getComputedStyle(el); const dark=luminance(cs.backgroundColor)<.22;
    const gradient=cs.backgroundImage.includes('gradient')&&!cs.backgroundImage.includes('url(');
    if(dark||gradient)el.classList.add('asset-bank-whitened');
  });
}
function apply(){
  const path=location.pathname.replace(/\/$/,'')||'/';
  const src=routeAssets[path];
  const img=document.querySelector<HTMLImageElement>('.g2-visual img');
  if(src&&img&&img.dataset.assetBank!==src){img.src=src;img.dataset.assetBank=src;}
  document.querySelectorAll<HTMLAnchorElement>('a[href*="stt-003-git-rebuild-white-gold-go-"]').forEach(a=>{a.href='https://stt-003-git-rebuild-white-gold-go-4eafa7-pc5888pc5888s-projects.vercel.app';});
  enforceWhitePublicSurfaces();
}
let scheduled=0;function schedule(){cancelAnimationFrame(scheduled);scheduled=requestAnimationFrame(()=>requestAnimationFrame(apply));}
const push=history.pushState.bind(history),replace=history.replaceState.bind(history);
history.pushState=(...args)=>{push(...args);schedule();};history.replaceState=(...args)=>{replace(...args);schedule();};
addEventListener('popstate',schedule);addEventListener('DOMContentLoaded',schedule);new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});schedule();
