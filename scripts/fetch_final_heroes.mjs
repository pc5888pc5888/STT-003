import fs from 'node:fs/promises';
import path from 'node:path';

const assets = [
  {
    name: 'cooperation',
    url: 'https://media.canva.com/v2/image-resize/format:WEBP/height:941/quality:100/uri:ifs%3A%2F%2FM%2Faee2f1f5-aed9-428a-ad7e-48547f947aa6/watermark:F/width:1672?csig=AAAAAAAAAAAAAAAAAAAAACLjb3WljhRZp5WAncAOhyd2veQln5wDYPyj_Lx3j6g5&exp=1789553759&osig=AAAAAAAAAAAAAAAAAAAAABfucQXCF8OPjlMk0WtZdlPCK22qPx5DJhZvTSRSNrbl&signer=media-rpc&x-canva-quality=screen',
    out: 'public/visual-bank/stt/final-20260916/cooperation-hero.webp',
    minBytes: 50000,
  },
  {
    name: 'eric-chuang',
    url: 'https://media.canva.com/v2/image-resize/format:WEBP/height:941/quality:100/uri:ifs%3A%2F%2FM%2F6cbb47ee-d964-4b9f-9a79-6d243ff55674/watermark:F/width:1672?csig=AAAAAAAAAAAAAAAAAAAAADWSoqbcc-fYnqpXymL7sGAoxtjPPhG5aHbXZ-uvtnnB&exp=1789552867&osig=AAAAAAAAAAAAAAAAAAAAAKKj7VKRP02R1IvDn3Bka_mGXLQB-RfjZzoSXr9t4pnE&signer=media-rpc&x-canva-quality=screen',
    out: 'public/visual-bank/stt/final-20260916/eric-chuang-hero.webp',
    minBytes: 40000,
  },
];

for (const asset of assets) {
  const response = await fetch(asset.url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`${asset.name}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const type = response.headers.get('content-type') || '';
  if (!type.includes('image/')) throw new Error(`${asset.name}: unexpected content-type ${type}`);
  if (bytes.length < asset.minBytes) throw new Error(`${asset.name}: image too small (${bytes.length} bytes)`);
  await fs.mkdir(path.dirname(asset.out), { recursive: true });
  await fs.writeFile(asset.out, bytes);
  console.log(`${asset.name}: wrote ${bytes.length} bytes -> ${asset.out}`);
}
