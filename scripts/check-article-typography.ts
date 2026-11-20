import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ARTICLE_INDEX, type ArticleDocument } from '../src/data/articleArchive';
import { ARTICLE_READING_RULES, articleReadingView } from '../src/data/articleReadingView';
import { normalizeArticleParagraphIndentation } from '../src/data/articleTypography';

const fixtures: Array<[string, string]> = [
  ['<p>\u3000\u3000正文</p>', '<p>正文</p>'],
  ['<p> &nbsp;&#160;&#xA0;&#12288;&#x3000;正文</p>', '<p>正文</p>'],
  ['<p class="body"><span style="color: brown">\u3000<strong> &nbsp;正文</strong></span> 後續文字</p>', '<p class="body"><span style="color: brown"><strong>正文</strong></span> 後續文字</p>'],
  ['<p> <font face="serif"> <a href="/test?a=1&amp;b=2"><b>\u3000正文</b></a></font></p>', '<p><font face="serif"><a href="/test?a=1&amp;b=2"><b>正文</b></a></font></p>'],
  ['<p>第一句。 &nbsp;第二句。</p>', '<p>第一句。 &nbsp;第二句。</p>'],
  ['<p>\u3000<img src="/portrait.jpg" alt="人物"> 圖片後文字</p>', '<p><img src="/portrait.jpg" alt="人物"> 圖片後文字</p>'],
  ['<p style="text-align: center">\u3000引文</p>', '<p style="text-align: center">\u3000引文</p>'],
  ["<p style='color:red; text-align:right!important'> &nbsp;署名</p>", "<p style='color:red; text-align:right!important'> &nbsp;署名</p>"],
  ['<p align=RIGHT>\u3000署名</p>', '<p align=RIGHT>\u3000署名</p>'],
  ['<p style="text-align:end;">\u3000署名</p>', '<p style="text-align:end;">\u3000署名</p>'],
  ['<h2>\u3000標題</h2><div>\u3000文字</div>', '<h2>\u3000標題</h2><div>\u3000文字</div>'],
  ['<p><strong><span>一、法律風險的認知不足</span></strong></p>', '<p data-stt-prose-role="heading"><strong><span>一、法律風險的認知不足</span></strong></p>'],
  ['<p><span><b>實務挑戰一：資訊孤島與實質審查的授權缺口</b></span></p>', '<p data-stt-prose-role="heading"><span><b>實務挑戰一：資訊孤島與實質審查的授權缺口</b></span></p>'],
  ['<p><strong>第三節：治理責任</strong></p>', '<p data-stt-prose-role="heading"><strong>第三節：治理責任</strong></p>'],
  ['<p><strong>結語</strong></p>', '<p data-stt-prose-role="heading"><strong>結語</strong></p>'],
  ['<p><strong>一、責任</strong>需要持續落實</p>', '<p><strong>一、責任</strong>需要持續落實</p>'],
  ['<p><strong>一、企業內部控制機制不足，難以即時偵測異常交易；</strong></p>', '<p><strong>一、企業內部控制機制不足，難以即時偵測異常交易；</strong></p>'],
  ['<p><strong>「一、責任需要持續落實」</strong></p>', '<p><strong>「一、責任需要持續落實」</strong></p>'],
  ['<p><strong>治理應從日常開始</strong></p>', '<p><strong>治理應從日常開始</strong></p>'],
];
for (const [input, expected] of fixtures) {
  assert.equal(normalizeArticleParagraphIndentation(input), expected, `Fixture: ${input}`);
  assert.equal(normalizeArticleParagraphIndentation(expected), expected, `Fixture must be idempotent: ${input}`);
}

const markupPattern = /<!--[\s\S]*?-->|<![^>]*>|<\/?[a-z](?:"[^"]*"|'[^']*'|[^'">])*>/gi;
const markup = (html: string) => html.replace(/ data-stt-prose-role="heading"/g, '').match(markupPattern) ?? [];
const nonWhitespaceText = (html: string) => html
  .replace(markupPattern, '')
  .replace(/&nbsp;|&#0*(?:9|10|12|13|32|160|12288);|&#x0*(?:9|a|c|d|20|a0|3000);/gi, '')
  .replace(/\s/g, '');
const sha256 = (text: string) => createHash('sha256').update(text).digest('hex');
let changedArticles = 0;
let removedCharacters = 0;
const headings: Array<{ article: string; text: string }> = [];

for (const item of ARTICLE_INDEX) {
  const source = JSON.parse(fs.readFileSync(path.resolve('public/data/articles', `${item.id}.json`), 'utf8')) as ArticleDocument;
  const rule = ARTICLE_READING_RULES[item.id];
  assert.ok(rule, `Missing reading rule: ${item.id}`);
  assert.equal(sha256(source.html), rule.sourceSha256, `Source changed: ${item.id}`);
  const reading = articleReadingView(source);
  assert.equal(sha256(reading.html), rule.resultSha256, `Reading projection changed: ${item.id}`);
  const normalized = normalizeArticleParagraphIndentation(reading.html);
  assert.equal(normalizeArticleParagraphIndentation(normalized), normalized, `Not idempotent: ${item.id}`);
  assert.equal(nonWhitespaceText(normalized), nonWhitespaceText(reading.html), `Non-whitespace text changed: ${item.id}`);
  assert.deepEqual(markup(normalized), markup(reading.html), `Markup changed: ${item.id}`);
  if (normalized !== reading.html) changedArticles += 1;
  removedCharacters += reading.html.length - normalized.replace(/ data-stt-prose-role="heading"/g, '').length;
  for (const match of normalized.matchAll(/<p\b[^>]*data-stt-prose-role="heading"[^>]*>([\s\S]*?)<\/p\s*>/gi)) {
    headings.push({ article: item.id, text: match[1].replace(markupPattern, '').trim() });
  }
}

console.log(`Article typography PASS: ${ARTICLE_INDEX.length} reading projections; ${fixtures.length} targeted fixtures; source hashes, reading hashes, non-whitespace text, original markup and idempotence verified. ${changedArticles} articles adjusted; ${removedCharacters} leading whitespace source characters removed from display only; ${headings.length} explicit short headings marked across ${new Set(headings.map(heading => heading.article)).size} articles.`);
const headingList = process.argv.find(argument => argument === '--list-headings' || argument.startsWith('--list-headings='));
if (headingList) {
  const articleIds = headingList.split('=')[1]?.split(',');
  console.log(headings.filter(heading => !articleIds || articleIds.includes(heading.article)).map(heading => `${heading.article}\t${heading.text}`).join('\n'));
}
