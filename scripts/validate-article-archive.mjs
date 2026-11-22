import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const articles = JSON.parse(fs.readFileSync('public/data/article-index.json', 'utf8'));
const assets = JSON.parse(fs.readFileSync('public/data/article-assets.json', 'utf8'));
const legacy = JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json', 'utf8'));
const nativeImport = JSON.parse(fs.readFileSync('content/financial-governance-20261122/manifest.json', 'utf8'));
assert.equal(nativeImport.length, 9);
assert.deepEqual(nativeImport.map(x => x.id), Array.from({ length: 9 }, (_, i) => `financial-governance-${String(i + 1).padStart(2, '0')}`));
const nativeById = new Map(nativeImport.map(x => [x.id, x]));
assert.equal(articles.length, 279);
assert.equal(new Set(articles.map(x => x.id)).size, 279);
assert.equal(articles.filter(x => x.sourceRelation === 'stt').length, 9);
assert.equal(articles.filter(x => x.sourceRelation !== 'stt').length, 270);
assert.equal(assets.length, 318);
const assetPaths = new Set(assets.map(x => x.path));
for (const asset of assets) {
  const data = fs.readFileSync('public' + asset.path);
  assert.equal(data.length, asset.bytes);
  assert.equal(crypto.createHash('sha256').update(data).digest('hex'), asset.sha256);
}
const files = fs.readdirSync('public/data/articles').filter(x => x.endsWith('.json'));
assert.equal(files.length, articles.length);
for (const entry of articles) {
  const article = JSON.parse(fs.readFileSync(`public/data/articles/${entry.id}.json`, 'utf8'));
  assert.equal(article.title, entry.title);
  assert.equal(article.path, '/columns/articles/' + entry.id);
  if (article.sourceRelation === 'stt') {
    const approved = nativeById.get(article.id);
    assert.ok(approved, `Unregistered STT article: ${article.id}`);
    assert.equal(article.sourcePublisher, 'STT Governance｜策略智庫智慧治理');
    assert.equal(article.sourceUrl, 'https://stt-003.vercel.app' + article.path);
    assert.equal(article.title, approved.title);
    assert.equal(article.cover.src, approved.imagePath);
    assert.equal(article.cover.width, approved.width);
    assert.equal(article.cover.height, approved.height);
    assert.equal(crypto.createHash('sha256').update(article.html).digest('hex'), approved.readingHtmlSha256);
    const source = fs.readFileSync('content/financial-governance-20261122/' + approved.sourceFile);
    assert.equal(source.length, approved.sourceBytes);
    assert.equal(crypto.createHash('sha256').update(source).digest('hex'), approved.sourceSha256);
    assert.equal(article.sourceHtmlHash, approved.sourceSha256);
    const originalImage = fs.readFileSync('public' + approved.imagePath);
    assert.equal(originalImage.length, approved.imageBytes);
    assert.equal(crypto.createHash('sha256').update(originalImage).digest('hex'), approved.imageSha256);
  } else {
    assert.equal(new URL(article.sourceUrl).hostname, '94m.com.tw');
  }
  assert.ok(assetPaths.has(article.cover.src), article.cover.src);
  assert.ok(article.html.length > 500 && article.textHash);
  assert.ok(!/<(?:script|iframe|object|embed|meta|title|main|h1)\b/i.test(article.html));
  assert.ok(!/\son\w+\s*=|javascript:/i.test(article.html));
  assert.equal(new Set(article.toc.map(x => x.id)).size, article.toc.length);
  for (const match of article.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) assert.ok(assetPaths.has(match[1]), match[1]);
  assert.equal([...article.html.matchAll(/<img\b/g)].length, article.bodyImageCount);
}
assert.ok(legacy.articles.some(x => x.id === 'mmedia-cee607'), 'Preserve legacy exception');
console.log('Article archive: 279 documents (270 external + 9 approved STT), 318 original-image hashes, source provenance, safe markup, IDs and legacy preservation PASS');
