import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const out='/tmp/convergence-evidence';
const site=process.env.QA_SITE;
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const checks=[];
async function check(name,fn){try{await fn();checks.push({name,passed:true});}catch(error){checks.push({name,passed:false,error:String(error)});}fs.writeFileSync(out+'/trust-path-checks.json',JSON.stringify({site,checks,realMailVerified:false,productionHttpVerified:false},null,2));}
async function visit(route){await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);}
async function head(){return page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,robots:document.querySelector('meta[name="robots"]')?.content,og:document.querySelector('meta[property="og:title"]')?.content}));}
if(site==='stt'){
 const text=fs.readFileSync('src/data/retainedRouteMetadata.ts','utf8');
 const meta=JSON.parse(text.slice(text.indexOf('= ')+2).replace(/;\s*$/,''));
 for(const [route,expected] of Object.entries(meta))await check('direct metadata '+route,async()=>{
  await visit(route);const actual=await head();assert.equal(actual.title,expected.title);assert.equal(actual.description,expected.description);assert.equal(actual.og,expected.title);assert.equal(actual.canonical,'https://stt-003.vercel.app'+route);assert.equal(actual.robots,'index,follow');
  const html=fs.readFileSync('dist/seo-'+route.slice(1).replaceAll('/','-')+'.html','utf8');
  const staticHead=await page.evaluate(html=>{const d=new DOMParser().parseFromString(html,'text/html');return {title:d.title,description:d.querySelector('meta[name="description"]')?.content,canonical:d.querySelector('link[rel="canonical"]')?.getAttribute('href'),og:d.querySelector('meta[property="og:title"]')?.content,canonicals:d.querySelectorAll('link[rel="canonical"]').length}},html);
  assert.equal(staticHead.title,expected.title);assert.equal(staticHead.description,expected.description);assert.equal(staticHead.og,expected.title);assert.equal(staticHead.canonical,actual.canonical);assert.equal(staticHead.canonicals,1);
 });
 const eventTypes={'major-decision':'重大決策','owner-dependence':'重大決策',succession:'家族接班','family-ownership':'股權治理','strategic-legal':'重大決策','ai-governance':'AI 治理','system-failure':'重大決策','founder-legacy':'家族接班'};
 for(const [id,type] of Object.entries(eventTypes))await check('event-to-intake '+id,async()=>{await visit('/problems/'+id);await page.getByRole('link',{name:'從這個問題開始 →',exact:true}).click();await page.waitForURL('**/start?route='+id);assert.equal(await page.locator('select').last().inputValue(),type);assert.equal(await page.locator('input[type="file"]').count(),0);});
 await check('privacy to research clears inherited noindex and metadata',async()=>{await visit('/privacy');await page.locator('footer a[href="/research"]').click();await page.waitForURL('**/research');await page.waitForTimeout(100);const actual=await head();assert.equal(actual.title,meta['/research'].title);assert.equal(actual.robots,'index,follow');assert.equal(actual.og,meta['/research'].title)});
 await check('book detail uses a semantic link and its own metadata',async()=>{await visit('/books');await page.getByRole('link',{name:'正典頁',exact:true}).click();await page.waitForURL('**/books/internal-compliance');await page.waitForTimeout(100);assert.equal((await head()).title,meta['/books/internal-compliance'].title)});
 for(const id of ['event-definition','stakeholder-authority','evidence','hard-stop','options','judgment','governance'])await check('direct method fragment '+id,async()=>{await visit('/how-stt-works#'+id);const top=await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top);assert.ok(top>=60&&top<250,`target top=${top}`)});
 for(const id of ['family-succession','ownership-authority','major-decisions','ai-decision-governance'])await check('home threshold fragment '+id,async()=>{await visit('/');await page.locator('a[href="/problems#'+id+'"]').click();await page.waitForURL('**/problems#'+id);await page.waitForTimeout(200);const top=await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top);assert.ok(top>=60&&top<250,`target top=${top}`)});
 await check('unknown problem keeps URL and displays not-found without canonical',async()=>{await visit('/problems/verification-nonexistent');assert.equal(new URL(page.url()).pathname,'/problems/verification-nonexistent');assert.equal(await page.locator('h1').innerText(),'找不到這個頁面。');const actual=await head();assert.equal(actual.title,'找不到頁面｜STT Governance');assert.equal(actual.canonical,undefined);assert.ok(actual.robots.includes('noindex'));assert.equal(actual.og,undefined)});
 await check('retained route rewrites are exact and aliases match existing meanings',async()=>{const cfg=JSON.parse(fs.readFileSync('vercel.json','utf8'));assert.ok(!cfg.rewrites.some(r=>r.source==='/problems/:path*'||r.source==='/books/:path*'));for(const route of Object.keys(meta))assert.ok(cfg.rewrites.some(r=>r.source===route&&r.destination==='/seo-'+route.slice(1).replaceAll('/','-')+'.html'));for(const [a,b] of [['/cooperation','/engagement'],['/papers','/research'],['/contact.html','/start']])assert.ok(cfg.redirects.some(r=>r.source===a&&r.destination===b&&r.permanent))});
 await check('sitemap contains retained records and excludes provisional privacy',async()=>{const xml=fs.readFileSync('dist/sitemap.xml','utf8');for(const route of Object.keys(meta))assert.ok(xml.includes('<loc>https://stt-003.vercel.app'+route+'</loc>'));assert.ok(!xml.includes('/privacy</loc>'));assert.equal((xml.match(/<loc>/g)||[]).length,21)});
}else{
 await check('assembly date and source are explicit, without publishing internal records',async()=>{await visit('/events');assert.equal(await page.locator('#assembly-20260816 time').getAttribute('datetime'),'2026-08-16');assert.ok((await page.locator('.gcsda-source-note').innerText()).includes('會員大會正式簡報'));assert.ok((await page.locator('.gcsda-source-note').innerText()).includes('不代替正式議事紀錄'))});
 await check('association privacy reflects the actual LINE route, not STT intake',async()=>{await visit('/privacy');assert.equal(await page.locator('main form,main input[type="file"]').count(),0);const contact=page.getByRole('link',{name:'入會與會務聯絡 ↗',exact:true});assert.equal(await contact.getAttribute('href'),'https://line.me/R/ti/p/@387nbnjs');assert.equal(await contact.getAttribute('target'),'_blank');const text=await page.locator('main').innerText();assert.ok(text.includes('學會入會不等於 STT 治理委任'));assert.ok(!/TBD_OWNER_INPUT|固定保存|完全加密|不會進 AI/.test(text));assert.equal(await page.locator('main a[href="/start"]').count(),0)});
 await check('association stays unindexed without an approved independent origin',async()=>{await visit('/privacy');const h=await head();assert.equal(h.canonical,undefined);assert.ok(h.robots.includes('noindex'));assert.ok(!fs.readFileSync('dist/sitemap.xml','utf8').includes('<loc>'));assert.ok(fs.readFileSync('dist/robots.txt','utf8').includes('Disallow: /'))});
}
await browser.close();
const failed=checks.filter(c=>!c.passed);
console.log(JSON.stringify({site,checks:checks.length,failed},null,2));
if(failed.length)process.exitCode=1;
