import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Production-artifact repair. Never rewrites approved source questions or images.
const file = process.argv[2] || 'dist/humanistic-interview/index.html';
const html = fs.readFileSync(file, 'utf8');
const version = '20261020.2';
if (html.includes(`data-stt-delivery="${version}"`)) process.exit(0);
const images = s => [...s.matchAll(/data:image\/[^'"\s)<>]+/g)].map(m => createHash('sha256').update(m[0]).digest('hex'));
const questions = s => [...s.matchAll(/<section[^>]*\bid="question-\d+"[\s\S]*?<\/section>/g)].map(m => m[0]);
assert.equal(questions(html).length, 20, 'Expected the approved twenty question sections');
let output = html;
function replaceOne(pattern, value, label) {
  assert.equal([...output.matchAll(new RegExp(pattern.source, 'g'))].length, 1, `Expected one ${label}`);
  output = output.replace(pattern, value);
}
replaceOne(/<script>\s*const screens=\[\.\.\.document\.querySelectorAll\('\.screen'\)\];[\s\S]*?<\/script>/,
  `<script defer src="/humanistic-interview/interview.js?v=${version}" data-stt-delivery="${version}"></script>`, 'legacy controller');
replaceOne(/id="netlify-form"/, 'id="interview-form"', 'interview form');
replaceOne(/<div class="bottom-tools">[\s\S]*?<\/div>/, `<div class="bottom-tools" aria-label="訪談操作">
<button class="ghost" id="save-now" type="button">儲存草稿</button>
<button class="ghost" id="read-draft" type="button">讀取草稿檔</button>
<button class="ghost" id="toolbar-copy" type="button">複製回答</button>
<button class="ghost" id="toolbar-download" type="button">下載文字</button>
<button class="primary" id="toolbar-submit" type="button">確認與送出</button>
<input id="draft-file" type="file" accept=".json,application/json" hidden aria-label="選擇本機草稿檔">
<p id="draft-import-status" role="status" aria-live="polite"></p>
</div>`, 'operation toolbar');
replaceOne(/<div class="backup-actions">/, '<div class="backup-actions"><button class="ghost" id="save-draft-final" type="button">儲存可讀回草稿</button>', 'backup actions');
output = output.replace(/<meta\s+name="(?:hosting-provider|netlify-deploy)"[^>]*>\s*/g, '');
output = output.replace(/<link\s+rel="canonical"[^>]*>\s*/g, '');
const controls = `<link rel="canonical" href="https://stt-003.vercel.app/humanistic-interview/">
<style id="stt-delivery-controls">
.bottom-tools{position:fixed!important;left:50%!important;right:auto!important;bottom:12px!important;transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:calc(100vw - 24px);width:max-content;padding:10px;background:var(--paper,#fffdf8);border:1px solid var(--line,#ded8cc);border-radius:14px;z-index:60;box-sizing:border-box}
.bottom-tools button{width:auto!important;height:auto!important;min-height:44px;white-space:nowrap;padding:10px 14px;font-size:14px}
.bottom-tools [hidden]{display:none!important}#draft-import-status{width:100%;margin:0;font-size:13px}#draft-import-status:empty{display:none}
main{padding-bottom:140px}#backup-preview textarea{user-select:text!important;-webkit-user-select:text!important}#backup-preview .success-actions{display:flex;flex-wrap:wrap;gap:8px}
@media(max-width:600px){.bottom-tools{width:calc(100vw - 24px);gap:6px}.bottom-tools button{flex:1 1 auto;padding:9px 10px;font-size:13px}main{padding-bottom:180px}}
</style>`;
output = output.replace('</head>', controls + '\n</head>');
assert.deepEqual(images(output), images(html), 'Approved image bytes must not change');
assert.deepEqual(questions(output), questions(html), 'Approved questions must not change');
assert.equal((output.match(/<script\b/g)||[]).length, 1, 'Only the single delivery controller may execute');
assert.ok(!/netlify-form|netlify\.app|netlify-deploy|hosting-provider/.test(output), 'Obsolete host references remain');
for(const id of ['interview-form','save-now','read-draft','draft-file','draft-import-status','toolbar-copy','toolbar-download','toolbar-submit','submit-btn','submit-status','success-message','restart-clean']) {
  assert.equal((output.match(new RegExp(`id="${id}"`, 'g'))||[]).length, 1, `Control ID ${id} must be unique`);
}
fs.writeFileSync(file, output);
console.log(JSON.stringify({deliveryVersion:version,questionsUnchanged:20,approvedImagesUnchanged:images(html).length,singleController:true,file}));
