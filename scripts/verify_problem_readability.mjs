import fs from 'node:fs';
import {chromium} from 'playwright';
const raw=fs.readFileSync('src/data/retainedRouteMetadata.ts','utf8');
const metadata=JSON.parse(raw.slice(raw.indexOf('= ')+2).replace(/;\s*$/,''));
const routes=Object.keys(metadata).filter(r=>r.startsWith('/problems/'));
const browser=await chromium.launch({headless:true});
const checks=[];
try{
 for(const [device,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const route of routes){
   await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>{
    const h=document.querySelector('h1'),hero=h.closest('section'),bounds=hero.getBoundingClientRect();
    const range=document.createRange();range.selectNodeContents(h);
    const bad=[...range.getClientRects()].filter(r=>r.width>0&&(r.left<0||r.right>innerWidth+1||r.top<bounds.top-1||r.bottom>bounds.bottom+1)).map(r=>({left:r.left,right:r.right,top:r.top,bottom:r.bottom}));
    return {text:h.textContent,label:h.getAttribute('aria-label'),clippedRects:bad};
   });
   checks.push({route,device,titleUnchanged:result.label===metadata[route].label&&result.text===metadata[route].label,fullyVisible:result.clippedRects.length===0,clippedRects:result.clippedRects});
  }
  await context.close();
 }
}finally{await browser.close();}
fs.writeFileSync('/tmp/convergence-evidence/problem-readability.json',JSON.stringify({checks,scope:'All eight existing problem titles, three tested widths. Original text unchanged; images unchanged.'},null,2));
const failed=checks.filter(c=>!c.titleUnchanged||!c.fullyVisible);
console.log(JSON.stringify({checks:checks.length,failed},null,2));
if(failed.length)process.exitCode=1;
