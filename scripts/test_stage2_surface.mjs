import fs from 'node:fs';
import assert from 'node:assert/strict';
const {chromium}=await import('/tmp/stt-browser/node_modules/playwright/index.mjs');
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const report={};
try {
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  report.hero=await page.locator('.stth-hero-media').evaluate(e=>{const s=getComputedStyle(e);return {image:s.backgroundImage,display:s.display,opacity:s.opacity,width:e.clientWidth,height:e.clientHeight,after:getComputedStyle(e,':after').background}});
  const path='public/visual-bank/stt/home-approved.webp';
  fs.copyFileSync(path,'stage2-evidence/home-approved-source.webp');
  report.sourceBytes=fs.statSync(path).size;
  report.image=await page.evaluate(()=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve({width:i.naturalWidth,height:i.naturalHeight});i.onerror=reject;i.src='/visual-bank/stt/home-approved.webp'}));
  assert.ok(report.image.width>500&&report.image.height>300);
  await page.goto('http://127.0.0.1:4173/insights',{waitUntil:'networkidle'});
  report.footer=await page.locator('footer').evaluate(e=>({background:getComputedStyle(e).backgroundColor,image:getComputedStyle(e).backgroundImage}));
  assert.equal(report.footer.background,'rgb(255, 255, 255)');assert.equal(report.footer.image,'none');
  report.passed=true;
}finally{fs.writeFileSync('stage2-evidence/surface-report.json',JSON.stringify(report,null,2));await browser.close();}
