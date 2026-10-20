import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Read-only production gate: the checked-in HTML is the only markup source.
// Fail the build rather than silently publishing a disconnected controller.
const file = process.argv[2] || 'dist/humanistic-interview/index.html';
const html = fs.readFileSync(file, 'utf8');
const source = fs.readFileSync('public/humanistic-interview/index.html', 'utf8');
const script = fs.readFileSync(path.join(path.dirname(file), 'interview.js'), 'utf8');
const version = script.match(/const DELIVERY_VERSION\s*=\s*['"]([^'"]+)['"]/)[1];
const canonical = 'https://stt-003.vercel.app/humanistic-interview/';
const images = s => [...s.matchAll(/data:image\/[^'"\s)<>]+/g)].map(m => createHash('sha256').update(m[0]).digest('hex'));
const questions = s => [...s.matchAll(/<section[^>]*\bid="question-\d+"[\s\S]*?<\/section>/g)].map(m => m[0]);
assert.equal(questions(html).length, 20, 'Expected the approved twenty question sections');
assert.deepEqual(questions(html), questions(source), 'Build must preserve all approved question sections');
assert.deepEqual(images(html), images(source), 'Build must preserve approved image bytes');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Exactly one interview controller is permitted');
assert.ok(scripts[0][1].includes(`src="/humanistic-interview/interview.js?v=${version}"`), 'Controller version must match HTML');
assert.equal(scripts[0][2].trim(), '', 'Legacy inline interview code is forbidden');
assert.equal((html.match(/<link\s+rel="canonical"/g) || []).length, 1, 'Exactly one canonical URL is required');
assert.ok(html.includes(`rel="canonical" href="${canonical}"`), 'Interview canonical must remain on the official STT site');
assert.ok(!/netlify-form|netlify\.app|netlify-deploy|hosting-provider/.test(html), 'Obsolete host references remain');
assert.ok(!/localStorage|api\/send-backup/.test(script), 'Do not reintroduce undeclared storage or duplicate delivery');
assert.ok(html.includes('action="/api/humanistic-submit"'), 'Form must target the existing same-origin delivery endpoint');
for (const id of ['interview-form','save-now','read-draft','draft-file','draft-import-status','toolbar-copy','toolbar-download','toolbar-submit','save-draft-final','submit-btn','submit-status','success-message','restart-clean']) {
  assert.equal((html.match(new RegExp(`id="${id}"`, 'g')) || []).length, 1, `Control ID ${id} must be unique`);
}
for (let n = 1; n <= 20; n++) {
  const field = `q${String(n).padStart(2, '0')}`;
  assert.equal((html.match(new RegExp(`id="form-${field}"`, 'g')) || []).length, 1, `Missing or duplicate answer field ${field}`);
}
console.log(JSON.stringify({deliveryVersion:version,questionsUnchanged:20,approvedImagesUnchanged:images(html).length,singleController:true,canonical,readOnlyGate:true}));
