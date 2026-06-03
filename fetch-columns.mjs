/**
 * fetch-columns.mjs
 * 莊鈞翔博士 M傳媒專欄文章爬蟲
 * 執行方式：node fetch-columns.mjs
 * 輸出：public/data/columns.json
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// ── 全部136篇文章代碼 ──────────────────────────────────────
const ARTICLE_CODES = [
  // Part 1
  'bfda8d','ff03a5','dfac31','f37690','058701','64bb75','4940e1','8b6971',
  '26dc74','79e099','7ea473','960c1d','93c04d','3b192f','ce9ae5','28edac',
  'f8a845','0894ff','63db7b','1dd256','30d334','010669','9d9a24','142b60',
  '2c2011','3e9fb1','c55f23','c4c596','cc7a57','28d5b1',
  // Part 2
  '1556d8','36ef25','0b8245','13f155','1acdb2','af7bcd','dc6df5','2c4519',
  '278f98','c4ba72','dd41ad','9fcbcc','ad4afb','56538c','5a1954','a6aa3d',
  'f90a12','aaadd3','934731','cce5a0','9ab1b2','10cf1b','91cd09','915111',
  '7d28cf','97b15c','d35e8b','6d1d59','b175d6','159e8a',
  // Part 3
  'a8f418','2fcde8','062c5e','15ee3c','e69a0a','4b4d58','2a901d','6bee15',
  'ee4d0f','097505','dd6d1b','b0179f','873170','79d702','a3ed58','454e69',
  '862197','44d9e9','f12f11','3d38af','678767','8097f4','8a173e','cc711c',
  '20219d','c7f232','c9e732','5290fc','7f94e3','3fba5a','1751b8',
  // 103-108
  '43d31a','211629','309372','fbb16e','03882e','e70018',
  // 109-114
  'eb111e','1567fb','b2795c','cfe646','068583','0dc0e4',
  // 115-120
  '28ec68','e1d6b8','4190d6','4bb107','d3c5a3','568f85',
  // 附錄 7篇專訪暨活動新聞
  '8754db','4d98e3','d04a9e','89aa05','1dc5db','dc8532','9262bf',
];

const BASE_URL = 'https://94m.com.tw/articles/';
const OUTPUT_DIR = 'public/data';
const OUTPUT_FILE = join(OUTPUT_DIR, 'columns.json');
const DELAY_MS = 800; // 每篇間隔，避免被限速

// ── 工具函式 ──────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractText(html) {
  // 移除 script / style
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  // 移除 HTML 標籤
  html = html.replace(/<[^>]+>/g, ' ');
  // 解碼常見 HTML entities
  html = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  // 壓縮空白
  return html.replace(/\s+/g, ' ').trim();
}

function extractTitle(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
            || html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return extractText(m[1]).replace(/\s*[|\-–]\s*M傳媒.*$/i, '').trim();
}

function extractBody(html) {
  // 嘗試抓文章主體區塊
  const patterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m && m[1].length > 200) return extractText(m[1]);
  }
  // 退而求其次：取 body 全文
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return body ? extractText(body[1]) : extractText(html);
}

// ── 主程序 ────────────────────────────────────────────────

async function fetchArticle(code) {
  const url = BASE_URL + code;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-TW,zh;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const title = extractTitle(html);
    const body  = extractBody(html);
    // 擷取前1500字作為摘要（控制知識庫大小）
    const excerpt = body.slice(0, 1500);
    return { code, url, title, excerpt, status: 'ok' };
  } catch (err) {
    console.error(`  ✗ ${code}: ${err.message}`);
    return { code, url, title: '', excerpt: '', status: 'error', error: err.message };
  }
}

async function main() {
  console.log(`\n🚀 開始抓取，共 ${ARTICLE_CODES.length} 篇\n`);
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const results = [];
  let ok = 0, fail = 0;

  for (let i = 0; i < ARTICLE_CODES.length; i++) {
    const code = ARTICLE_CODES[i];
    process.stdout.write(`[${String(i+1).padStart(3,'0')}/${ARTICLE_CODES.length}] ${code} ... `);
    const article = await fetchArticle(code);
    results.push(article);
    if (article.status === 'ok') {
      ok++;
      console.log(`✓ ${article.title.slice(0,30)}`);
    } else {
      fail++;
    }
    if (i < ARTICLE_CODES.length - 1) await sleep(DELAY_MS);
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify({
    meta: {
      generated_at: new Date().toISOString(),
      total: results.length,
      ok,
      fail,
      source: 'https://94m.com.tw/editors/ed55fc',
      author: '莊鈞翔博士 Chuang Chun-Hsiang, Ph.D.',
    },
    articles: results,
  }, null, 2), 'utf-8');

  console.log(`\n✅ 完成！成功 ${ok} 篇，失敗 ${fail} 篇`);
  console.log(`📁 輸出：${OUTPUT_FILE}\n`);
}

main();
