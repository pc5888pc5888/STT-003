import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const jobs = [
  {
    payload: 'src/assets/localHeroPayload/cooperation.txt',
    out: 'public/images/stt-cooperation-hero-20260916.webp',
    minBytes: 50000,
  },
  {
    payload: 'src/assets/localHeroPayload/eric.txt',
    out: 'public/images/stt-eric-chuang-hero-20260916.webp',
    minBytes: 40000,
  },
];

for (const job of jobs) {
  const payloadPath = path.join(ROOT, job.payload);
  if (!fs.existsSync(payloadPath)) throw new Error(`Missing local hero payload: ${job.payload}`);
  const b64 = fs.readFileSync(payloadPath, 'utf8').replace(/\s+/g, '');
  const bytes = Buffer.from(b64, 'base64');
  if (bytes.length < job.minBytes) throw new Error(`Hero asset too small: ${job.out} (${bytes.length} bytes)`);
  if (bytes.subarray(0, 4).toString('ascii') !== 'RIFF' || bytes.subarray(8, 12).toString('ascii') !== 'WEBP') {
    throw new Error(`Hero payload is not WebP: ${job.payload}`);
  }
  const out = path.join(ROOT, job.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, bytes);
  console.log(`materialized ${job.out}: ${bytes.length} bytes`);
}
