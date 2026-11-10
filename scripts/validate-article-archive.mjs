import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const articles = JSON.parse(fs.readFileSync('public/data/article-index.json', 'utf8'));
const assets = JSON.parse(fs.readFileSync('public/data/article-assets.json', 'utf8'));
const legacy = JSON.parse(fs.readFileSync('public/data/mmedia-catalog.json', 'utf8'));
assert.equal(articles.length, 270);
assert.equal(new Set(articles.map(x => x.id)).size, 270);
assert.equal(assets.length, 309);
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
  assert.equal(new URL(article.sourceUrl).hostname, '94m.com.tw');
  assert.ok(article.html.length > 500 && article.textHash);
  assert.ok(!/<(?:script|iframe|object|embed|meta|title|main|h1)\b/i.test(article.html));
  assert.ok(!/\son\w+\s*=|javascript:/i.test(article.html));
  assert.equal(new Set(article.toc.map(x => x.id)).size, article.toc.length);
  for (const match of article.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) assert.ok(assetPaths.has(match[1]), match[1]);
  assert.equal([...article.html.matchAll(/<img\b/g)].length, article.bodyImageCount);
}
assert.ok(legacy.articles.some(x => x.id === 'mmedia-cee607'), 'Preserve legacy exception');
console.log('Article archive: 270 documents, 309 original-image hashes, safe markup, IDs and legacy preservation PASS');
