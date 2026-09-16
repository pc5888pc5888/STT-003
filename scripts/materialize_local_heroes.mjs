import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const jobs = [
  {
    dir: 'src/assets/localHeroBase64/cooperation',
    out: 'public/images/stt-cooperation-hero-20260916.webp',
  },
  {
    dir: 'src/assets/localHeroBase64/eric',
    out: 'public/images/stt-eric-chuang-hero-20260916.webp',
  },
];

for (const job of jobs) {
  const dir = path.join(ROOT, job.dir);
  const files = fs.readdirSync(dir).filter((f) => /^c\d+\.txt$/.test(f)).sort();
  if (!files.length) throw new Error(`No hero chunks in ${job.dir}`);
  const b64 = files.map((f) => fs.readFileSync(path.join(dir, f), 'utf8').trim()).join('');
  const bytes = Buffer.from(b64, 'base64');
  if (bytes.length < 50000) throw new Error(`Hero asset too small: ${job.out} (${bytes.length} bytes)`);
  const out = path.join(ROOT, job.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, bytes);
  console.log(`materialized ${job.out}: ${bytes.length} bytes`);
}
