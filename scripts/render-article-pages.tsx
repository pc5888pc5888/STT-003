import fs from 'node:fs';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { PublicShell } from '../src/App';
import { ArticleContent } from '../src/pages/ArticleArchive';
import { ARTICLE_INDEX, type ArticleDocument } from '../src/data/articleArchive';
import { createHash } from 'node:crypto';
import { articleReadingView, ARTICLE_READING_RULES } from '../src/data/articleReadingView';

for (const item of ARTICLE_INDEX) {
  const source = JSON.parse(fs.readFileSync(path.resolve('public/data/articles', item.id + '.json'), 'utf8')) as ArticleDocument;
  const rule = ARTICLE_READING_RULES[item.id];
  const sha256 = (text: string) => createHash('sha256').update(text).digest('hex');
  if (!rule || sha256(source.html) !== rule.sourceSha256) throw new Error('Source changed; review display edits: ' + item.id);
  const article = articleReadingView(source);
  if (sha256(article.html) !== rule.resultSha256) throw new Error('Display edits mismatch: ' + item.id);
  const file = path.resolve('dist', 'seo-' + item.path.slice(1).replaceAll('/', '-') + '.html');
  const markup = renderToString(<StaticRouter location={item.path}><PublicShell><ArticleContent article={article} /></PublicShell></StaticRouter>);
  const embedded = JSON.stringify(article).replaceAll('<', '\\u003c');
  const base = fs.readFileSync(file, 'utf8');
  if (!base.includes('<div id="root"></div>')) throw new Error('Missing static root: ' + item.id);
  fs.writeFileSync(file, base.replace('<div id="root"></div>', `<div id="root">${markup}</div><script id="stt-article-data" type="application/json">${embedded}</script>`));
}
console.log(`Rendered ${ARTICLE_INDEX.length} complete article pages with static metadata and source content.`);
