import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.FINANCIAL_QA_PLAYWRIGHT_PATH || 'playwright');
const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'temp/financial-governance-qa');
const IMPORT = path.join(ROOT, 'content/financial-governance-20261122');
const ORIGIN = 'https://stt-003.vercel.app';
const PUBLISHER = 'STT Governance｜策略智庫智慧治理';
const VIEWPORTS = [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }];
const sha256 = value => createHash('sha256').update(value).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const manifest = readJson(path.join(IMPORT, 'manifest.json'));
const rewriteMap = new Map(readJson(path.join(ROOT, 'vercel.json')).rewrites
  .filter(item => !item.source.includes(':')).map(item => [item.source, item.destination]));
fs.mkdirSync(OUT, { recursive: true });
assert.equal(manifest.length, 9, 'The source manifest must contain exactly nine articles');
assert.deepEqual(manifest.map(item => item.id), Array.from({ length: 9 }, (_, i) => `financial-governance-${String(i + 1).padStart(2, '0')}`));

const report = {
  startedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  scope: 'Nine new financial-governance articles and their legal-column listing; no forms or unrelated site-wide claims.',
  mode: 'Built candidate served locally with the existing Vercel article and SEO rewrites.',
  manifestSha256: sha256(fs.readFileSync(path.join(IMPORT, 'manifest.json'))),
  viewports: VIEWPORTS,
  buildFiles: manifest.map(item => {
    const file = `seo-${item.path.slice(1).replaceAll('/', '-')}.html`;
    return { file, sha256: sha256(fs.readFileSync(path.join(DIST, file))) };
  }),
  cases: [],
  requestFailures: [],
};

function check(result, name, passed, evidence = {}) {
  result.checks.push({ name, passed: Boolean(passed), evidence });
}

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function serve(req, res) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
  if (pathname.startsWith('/api/')) { res.writeHead(404).end('API outside this static QA scope'); return; }
  if (/^\/columns\/articles\/[^/]+\/$/.test(pathname)) {
    res.writeHead(308, { Location: pathname.slice(0, -1) }).end(); return;
  }
  const article = pathname.match(/^\/columns\/articles\/([a-z0-9-]+)$/);
  let requested = article ? `/seo-columns-articles-${article[1]}.html` : rewriteMap.get(pathname) || pathname;
  if (requested === '/') requested = '/index.html';
  let filename = path.resolve(DIST, '.' + requested);
  if (!filename.startsWith(DIST + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');
  let status = 200;
  if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
    if (article) { status = 404; filename = path.join(DIST, 'index.html'); }
    else if (path.extname(pathname)) { res.writeHead(404).end('Not found'); return; }
    else filename = path.join(DIST, 'index.html');
  }
  res.writeHead(status, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(filename).on('error', () => res.destroy()).pipe(res);
}

async function settle(page) {
  await page.evaluate(async () => {
    let previous = window.scrollY, stable = 0;
    for (let frame = 0; frame < 180 && stable < 6; frame++) {
      await new Promise(resolve => requestAnimationFrame(resolve));
      const next = window.scrollY;
      stable = Math.abs(next - previous) < 0.1 ? stable + 1 : 0;
      previous = next;
    }
  });
}

async function capture(page, result, label) {
  const filename = `${result.id}-${result.viewport.width}-${label}.png`;
  await page.screenshot({ path: path.join(OUT, filename), fullPage: false });
  result.screenshots.push(filename);
}

async function articleChecks(context, baseUrl, item, viewport) {
  const result = { id: item.id, viewport, checks: [], screenshots: [], pageErrors: [] };
  report.cases.push(result);
  const page = await context.newPage();
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('requestfailed', request => report.requestFailures.push({ id: item.id, width: viewport.width, url: request.url(), reason: request.failure()?.errorText }));
  page.setDefaultTimeout(15000);
  try {
    const source = fs.readFileSync(path.join(IMPORT, item.sourceFile), 'utf8');
    const document = readJson(path.join(ROOT, 'public/data/articles', `${item.id}.json`));
    check(result, 'source hash matches approved manifest', sha256(source) === item.sourceSha256);
    check(result, 'original PNG hash matches approved manifest', sha256(fs.readFileSync(path.join(DIST, item.imagePath))) === item.imageSha256);
    const response = await page.goto(baseUrl + item.path, { waitUntil: 'networkidle' });
    check(result, 'article HTTP response', response?.status() === 200, { status: response?.status() });
    await page.locator('#archive-title').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const facts = await page.evaluate(({ source, item }) => {
      const body = document.querySelector('.stt-article-body');
      const parsed = new DOMParser().parseFromString(source, 'text/html');
      const expectedSections = ['abstract', 'article-body', 'legal-zone', 'ai-full'].map(name => parsed.querySelector('.' + name));
      const normal = value => (value || '').replace(/\s+/g, '');
      const fields = nodes => nodes.map(node => [node.getAttribute('data-stt-field'), normal(node.textContent)]);
      const expectedFields = fields(expectedSections.flatMap(section => [...section.querySelectorAll('[data-stt-field]')]));
      const actualFields = fields([...body.querySelectorAll('[data-stt-field]')]);
      const links = nodes => nodes.map(node => [node.getAttribute('href'), normal(node.textContent)]);
      const expectedLinks = links(expectedSections.flatMap(section => [...section.querySelectorAll('a[href]')]));
      const actualLinks = links([...body.querySelectorAll('a[href]')]);
      const mismatchedFields = actualFields.flatMap((field, index) => JSON.stringify(field) === JSON.stringify(expectedFields[index]) ? [] : [{ index, field: field[0] }]);
      const headings = [...body.querySelectorAll('.article-body h2')].map(node => node.textContent.trim());
      const expectedHeadings = [...parsed.querySelectorAll('.article-body h2')].map(node => node.textContent.trim());
      const responsibility = [...body.querySelectorAll('.ai-full p')].map(node => normal(node.textContent));
      const expectedResponsibility = [...parsed.querySelectorAll('.ai-full p')].map(node => normal(node.textContent));
      const toc = [...document.querySelectorAll('.stt-archive-toc a')].map(node => {
        const id = node.getAttribute('href').slice(1);
        return { id, title: node.textContent.trim(), matches: document.querySelectorAll('[id="' + CSS.escape(id) + '"]').length,
          targetTitle: document.getElementById(id)?.textContent.trim() };
      });
      const meta = selector => document.querySelector(selector)?.getAttribute('content');
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
        try { const data = JSON.parse(node.textContent); return Array.isArray(data) ? data : data['@graph'] || [data]; } catch { return []; }
      });
      const prose = [...body.querySelectorAll('.article-body p')].filter(node => node.textContent.trim()
        && !node.closest('blockquote,figure,table,li,header,footer')
        && !node.matches('.pq,.no-indent,[data-stt-prose-role="heading"]')
        && !['center', 'right', 'end'].includes(node.style.textAlign));
      const indents = prose.map(node => { const css = getComputedStyle(node); return { fontSize: parseFloat(css.fontSize), textIndent: parseFloat(css.textIndent), alignment: css.textAlign }; });
      const overflow = [...document.querySelectorAll('.stt-archive *')].filter(node => {
        const rect = node.getBoundingClientRect(); return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
      }).slice(0, 8).map(node => ({ tag: node.tagName, class: node.className }));
      return {
        title: document.querySelector('#archive-title')?.textContent, subtitles: [...document.querySelectorAll('.stt-archive-subtitle')].map(node => node.textContent),
        h1Count: document.querySelectorAll('h1').length, mainCount: document.querySelectorAll('main').length,
        mainH2Count: headings.length, headingsEqual: JSON.stringify(headings) === JSON.stringify(expectedHeadings),
        fieldCount: actualFields.length, expectedFieldCount: expectedFields.length, mismatchedFields,
        referenceLinkCount: actualLinks.length, linksEqual: JSON.stringify(actualLinks) === JSON.stringify(expectedLinks),
        legalFields: body.querySelectorAll('.legal-zone [data-stt-field]').length,
        expectedLegalFields: parsed.querySelectorAll('.legal-zone [data-stt-field]').length,
        responsibilityParagraphs: responsibility.length, expectedResponsibilityParagraphs: expectedResponsibility.length,
        responsibilityTextEqual: JSON.stringify(responsibility) === JSON.stringify(expectedResponsibility)
          && normal(body.querySelector('.ai-full')?.textContent) === normal(parsed.querySelector('.ai-full')?.textContent),
        publication: document.querySelector('.stt-archive-publication')?.textContent,
        publicationLinks: [...document.querySelectorAll('.stt-archive-publication a')].map(node => node.href),
        documentTitle: document.title, description: meta('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
        ogTitle: meta('meta[property="og:title"]'), ogUrl: meta('meta[property="og:url"]'), ogImage: meta('meta[property="og:image"]'),
        robots: meta('meta[name="robots"]'), language: document.documentElement.lang,
        articleSchema: schemas.find(schema => schema['@type'] === 'Article'),
        toc, proseCount: indents.length, badIndents: indents.filter(value => Math.abs(value.textIndent - value.fontSize * 2) > 0.25),
        indentExamples: indents.slice(0, 3), scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth, overflow,
      };
    }, { source, item });
    check(result, 'exact approved title and subtitle', facts.title === item.title && JSON.stringify(facts.subtitles) === JSON.stringify([item.subtitle]), { title: facts.title, subtitles: facts.subtitles });
    check(result, 'one H1 and semantic main', facts.h1Count === 1 && facts.mainCount === 1, { h1: facts.h1Count, main: facts.mainCount });
    check(result, 'all nine main section headings retained', facts.mainH2Count === 9 && facts.headingsEqual, { count: facts.mainH2Count });
    check(result, 'all source fields and source links retained', facts.fieldCount === item.fieldCount && facts.expectedFieldCount === item.fieldCount && facts.mismatchedFields.length === 0 && facts.referenceLinkCount === item.referenceLinkCount && facts.linksEqual,
      { fields: facts.fieldCount, expectedFields: item.fieldCount, referenceLinks: facts.referenceLinkCount, expectedReferenceLinks: item.referenceLinkCount, mismatchedFields: facts.mismatchedFields });
    check(result, 'legal sources and responsibility sections retained', facts.legalFields > 0 && facts.legalFields === facts.expectedLegalFields && facts.responsibilityParagraphs === 2 && facts.expectedResponsibilityParagraphs === 2 && facts.responsibilityTextEqual,
      { legalFields: facts.legalFields, responsibilityParagraphs: facts.responsibilityParagraphs, responsibilityTextEqual: facts.responsibilityTextEqual });
    check(result, 'STT publication attribution', facts.publication.includes('發表日期') && facts.publication.includes('2026/11/22') && facts.publication.includes(PUBLISHER) && !facts.publication.includes('M 傳媒') && facts.publicationLinks.length === 0);
    check(result, 'title, description and canonical metadata', facts.documentTitle === `${item.title}｜STT Governance` && facts.description === (document.excerpt || item.title).slice(0, 160) && facts.canonical === ORIGIN + item.path && facts.canonicalCount === 1,
      { title: facts.documentTitle, description: facts.description, canonical: facts.canonical });
    check(result, 'Open Graph and language', facts.ogTitle === facts.documentTitle && facts.ogUrl === ORIGIN + item.path && facts.ogImage === ORIGIN + item.imagePath && facts.language === 'zh-Hant-TW' && !facts.robots?.includes('noindex'));
    check(result, 'native article schema uses real date and no self attribution', facts.articleSchema?.headline === item.title && facts.articleSchema?.datePublished === '2026-11-22' && facts.articleSchema?.url === ORIGIN + item.path && facts.articleSchema?.publisher?.name === PUBLISHER && !('isBasedOn' in (facts.articleSchema || {})), { schema: facts.articleSchema });
    check(result, 'no horizontal overflow', facts.scrollWidth <= facts.clientWidth + 1 && facts.overflow.length === 0, { scrollWidth: facts.scrollWidth, clientWidth: facts.clientWidth, overflowingElements: facts.overflow });
    if (viewport.width === 390) check(result, 'mobile prose uses two-character indentation', facts.proseCount > 0 && facts.badIndents.length === 0, { proseCount: facts.proseCount, badIndents: facts.badIndents, examples: facts.indentExamples });
    check(result, 'every TOC entry targets exactly one matching heading', facts.toc.length === document.toc.length && facts.toc.every(entry => entry.matches === 1 && entry.title === entry.targetTitle), { entries: facts.toc.length, expected: document.toc.length });
    await capture(page, result, 'top');

    const cover = page.locator('.stt-archive-cover img');
    await cover.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const img = document.querySelector('.stt-archive-cover img'); return img?.complete && img.naturalWidth > 0; });
    const coverFacts = await cover.evaluate(img => {
      const rect = img.getBoundingClientRect(), parent = img.parentElement.getBoundingClientRect(), css = getComputedStyle(img);
      return { src: img.getAttribute('src'), alt: img.alt, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, width: rect.width, height: rect.height, objectFit: css.objectFit, contained: rect.width <= parent.width + 1 && rect.height <= parent.height + 1 };
    });
    check(result, 'original 1672 by 941 cover displays completely without crop', coverFacts.src === item.imagePath && coverFacts.naturalWidth === 1672 && coverFacts.naturalHeight === 941 && coverFacts.alt === document.cover.alt && coverFacts.objectFit === 'contain' && coverFacts.contained && Math.abs(coverFacts.width / coverFacts.height - 1672 / 941) < 0.005, coverFacts);
    const coverShot = `${item.id}-${viewport.width}-cover.png`;
    await cover.screenshot({ path: path.join(OUT, coverShot) }); result.screenshots.push(coverShot);

    await page.locator('.stt-archive-toc summary').click();
    const samples = [...new Set([0, Math.floor(facts.toc.length / 2), facts.toc.length - 1])];
    for (const index of samples) {
      const entry = facts.toc[index];
      await page.locator(`.stt-archive-toc a[href="#${entry.id}"]`).click();
      await page.waitForURL(url => decodeURIComponent(url.hash) === '#' + entry.id);
      await settle(page);
      const geometry = await page.locator('#' + entry.id).evaluate(node => {
        const rect = node.getBoundingClientRect();
        const header = document.querySelector('.stt-g0-header')?.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, headerBottom: Math.max(0, header?.bottom || 0), viewportHeight: innerHeight, scrollMarginTop: getComputedStyle(node).scrollMarginTop };
      });
      check(result, `TOC click leaves heading visible: ${entry.id}`, geometry.top >= geometry.headerBottom - 1 && geometry.top < geometry.viewportHeight - 24, geometry);
      if (index === samples[0]) await capture(page, result, 'reading');
    }

    const images = page.locator('img');
    for (let index = 0; index < await images.count(); index++) {
      if (await images.nth(index).isVisible()) await images.nth(index).scrollIntoViewIfNeeded();
    }
    await page.locator('.stt-article-share').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].filter(img => img.getBoundingClientRect().width > 0).every(img => img.complete), null, { timeout: 15000 });
    const brokenImages = await page.evaluate(() => [...document.images].filter(img => img.getBoundingClientRect().width > 0 && (!img.complete || img.naturalWidth === 0)).map(img => img.currentSrc || img.src));
    check(result, 'no broken displayed images after scrolling through footer', brokenImages.length === 0, { brokenImages });
    const copy = page.getByRole('button', { name: '複製本文網址', exact: true });
    await copy.click();
    await page.locator('.stt-article-share [role="status"]').filter({ hasText: '已複製本文網址' }).waitFor();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    check(result, 'share copies the exact public canonical URL', clipboard === ORIGIN + item.path, { clipboard });
    await capture(page, result, 'footer');
    await page.locator('.stt-archive-actions').getByRole('link', { name: '返回法律專欄 →', exact: true }).click();
    await page.waitForURL(baseUrl + '/columns/legal');
    await page.locator(`.stt-work[data-work-id="stt-${item.id}"]`).waitFor();
    check(result, 'return-to-legal-columns navigation', new URL(page.url()).pathname === '/columns/legal');
  } catch (error) {
    check(result, 'case completed without interruption', false, { error: error.stack || String(error) });
    try { await capture(page, result, 'failure'); } catch {}
  } finally {
    check(result, 'no JavaScript page errors', result.pageErrors.length === 0, { errors: result.pageErrors });
    result.passed = result.checks.every(item => item.passed);
    console.log(`${result.passed ? 'PASS' : 'FAIL'} ${item.id} ${viewport.width}px: ${result.checks.filter(item => item.passed).length}/${result.checks.length} checks`);
    await page.close();
  }
}

async function listingChecks(context, baseUrl, viewport) {
  const result = { id: 'legal-column-list', viewport, checks: [], screenshots: [], pageErrors: [] };
  report.cases.push(result);
  const page = await context.newPage();
  page.on('pageerror', error => result.pageErrors.push(error.message));
  try {
    const response = await page.goto(baseUrl + '/columns/legal', { waitUntil: 'networkidle' });
    await page.locator('.stt-work').first().waitFor();
    const works = await page.locator('.stt-work').evaluateAll(nodes => nodes.map(node => ({
      id: node.getAttribute('data-work-id'), title: node.querySelector('h2')?.textContent,
      path: node.querySelector('h2 a')?.getAttribute('href'), source: node.querySelector('.stt-work-sources')?.textContent,
    })));
    const expected = [...manifest].sort((a, b) => b.id.localeCompare(a.id));
    check(result, 'legal listing returns HTTP 200', response?.status() === 200);
    check(result, 'all nine new articles lead the newest listing in stable order', JSON.stringify(works.slice(0, 9).map(work => work.id)) === JSON.stringify(expected.map(item => `stt-${item.id}`)), { firstNine: works.slice(0, 9).map(work => work.id) });
    for (const item of manifest) {
      const work = works.find(work => work.id === `stt-${item.id}`);
      check(result, `listing title, link and STT source: ${item.id}`, work?.title === item.title && work?.path === item.path && work?.source?.includes('STT 發表 · ' + PUBLISHER) && !work?.source?.includes('M 傳媒'), work);
    }
    const layout = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    check(result, 'listing has no horizontal overflow', layout.scrollWidth <= layout.clientWidth + 1, layout);
    await page.locator('.stt-library-results').scrollIntoViewIfNeeded();
    await capture(page, result, 'newest');
    await page.locator(`.stt-work[data-work-id="stt-${manifest[0].id}"] h2 a`).click();
    await page.waitForURL(baseUrl + manifest[0].path);
    await page.locator('#archive-title').filter({ hasText: manifest[0].title }).waitFor();
    check(result, 'listing opens the actual article', await page.locator('#archive-title').textContent() === manifest[0].title);
  } catch (error) {
    check(result, 'listing case completed', false, { error: error.stack || String(error) });
    try { await capture(page, result, 'failure'); } catch {}
  } finally {
    check(result, 'no JavaScript page errors', result.pageErrors.length === 0, { errors: result.pageErrors });
    result.passed = result.checks.every(item => item.passed);
    console.log(`${result.passed ? 'PASS' : 'FAIL'} legal-column-list ${viewport.width}px`);
    await page.close();
  }
}

const server = http.createServer(serve);
let browser;
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  report.localOrigin = baseUrl;
  browser = await chromium.launch({ headless: true });
  report.browserVersion = browser.version();
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({ viewport, locale: 'zh-TW', timezoneId: 'Asia/Taipei', reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
    for (const item of manifest) await articleChecks(context, baseUrl, item, viewport);
    await listingChecks(context, baseUrl, viewport);
    await context.close();
  }
  const missing = await fetch(baseUrl + '/columns/articles/financial-governance-nonexistent');
  report.unknownArticle = { status: missing.status, passed: missing.status === 404 };
} catch (error) {
  report.fatalError = error.stack || String(error);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
  report.finishedAt = new Date().toISOString();
  const checks = report.cases.flatMap(result => result.checks);
  report.summary = { articleCases: report.cases.filter(result => result.id.startsWith('financial-governance-')).length, listingCases: report.cases.filter(result => result.id === 'legal-column-list').length,
    checks: checks.length, passedChecks: checks.filter(check => check.passed).length, failedChecks: checks.filter(check => !check.passed).length,
    screenshots: report.cases.reduce((count, result) => count + result.screenshots.length, 0) };
  report.passed = !report.fatalError && report.summary.articleCases === 27 && report.summary.listingCases === 3 && report.summary.failedChecks === 0 && report.unknownArticle?.passed === true;
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ passed: report.passed, ...report.summary, fatalError: report.fatalError }));
  if (!report.passed) process.exitCode = 1;
}
