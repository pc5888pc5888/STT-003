import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const manifest = JSON.parse(await fs.readFile('public/data/article-assets.json', 'utf8'));
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const valid = (data, item) => data.length === item.bytes && hash(data) === item.sha256;
let cursor = 0, downloaded = 0, cached = 0;
async function worker() {
  while (cursor < manifest.length) {
    const item = manifest[cursor++];
    if (!/^\/article-images\/[a-f0-9]+\.(?:png|jpg|jpeg|webp)$/i.test(item.path)) throw new Error('Invalid image path');
    const url = new URL(item.sourceUrl);
    if (url.protocol !== 'https:' || !['chuyi-mmedia.s3.ap-southeast-1.amazonaws.com', 'stt-003.vercel.app', 'uploads.posu.tw'].includes(url.hostname)) throw new Error('Unexpected original image host');
    const target = path.join('public', item.path);
    const existing = await fs.readFile(target).catch(() => null);
    if (existing && valid(existing, item)) { cached++; continue; }
    let bytes;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
        if (!response.ok) throw new Error(`Original image HTTP ${response.status}`);
        bytes = Buffer.from(await response.arrayBuffer());
        if (!valid(bytes, item)) throw new Error(`Original image hash mismatch: ${item.path}`);
        break;
      } catch (error) { if (attempt === 2) throw error; }
    }
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bytes);
    downloaded++;
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`Article images: ${manifest.length} original files verified (${cached} cached, ${downloaded} fetched).`);
