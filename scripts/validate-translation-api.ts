import assert from "node:assert/strict";
import fs from "node:fs";
import handler, { translateTexts } from "../api/translate";

const source = JSON.parse(fs.readFileSync("dist/translation-source.json", "utf8")) as string[];
assert(source.length > 20000);
let providerCalls = 0;
const provider = async (_url: unknown, options: any) => {
  providerCalls++;
  assert.equal(options.headers["x-goog-api-key"], "test-credential");
  const request = JSON.parse(options.body);
  const { texts } = JSON.parse(request.contents[0].parts[0].text);
  return new Response(JSON.stringify({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify({ translations: texts.map((_: string, i: number) => "Translated paragraph " + i) }) }] } }] }));
};
assert.deepEqual(await translateTexts(["企業治理", "莊鈞翔博士"], "en", "test-credential", provider as typeof fetch), ["Translated paragraph 0", "Translated paragraph 1"]);
let transientCalls = 0;
await translateTexts(["企業治理"], "en", "test-credential", (async (url: unknown, options: any) => ++transientCalls === 1 ? new Response("", { status: 503 }) : provider(url, options)) as typeof fetch);
assert.equal(transientCalls, 2, "A temporary provider failure should recover once");
await assert.rejects(() => translateTexts(["企業治理"], "en", "test-credential", async () => new Response(JSON.stringify({ candidates: [{ finishReason: "MAX_TOKENS" }] }))), /INCOMPLETE_TRANSLATION/);
await assert.rejects(() => translateTexts(["企業治理"], "en", "test-credential", async () => new Response(JSON.stringify({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: '{"translations":[]}' }] } }] }))), /INCOMPLETE_TRANSLATION/);

const previous = process.env.STT_TRANSLATION_API_KEY;
process.env.STT_TRANSLATION_API_KEY = "test-credential";
const originalFetch = globalThis.fetch;
globalThis.fetch = provider as typeof fetch;
async function request(body: unknown, method = "POST", origin = "https://stt-003.vercel.app") {
  let status = 0; let output: any;
  const res = { setHeader() {}, status(code: number) { status = code; return this; }, end(text: string) { output = JSON.parse(text); } };
  await handler({ method, headers: { origin, "x-forwarded-for": "unit-test" }, body }, res);
  return { status, output };
}
try {
  assert.equal((await request({ language: "toString", texts: [source[0]] })).status, 400);
  assert.equal((await request({ language: "en", texts: ["PRIVATE-DATA-UNREGISTERED-8729"] })).status, 400);
  assert.equal((await request({ language: "en", texts: [source[0]] }, "POST", "https://untrusted.example")).status, 403);
  assert.equal((await request({}, "GET")).status, 405);
  const result = await request({ language: "en", texts: [source[0], source[1]] });
  assert.equal(result.status, 200); assert.equal(result.output.translations.length, 2);
  const count = providerCalls;
  assert.equal((await request({ language: "en", texts: [source[0], source[1]] })).status, 200);
  assert.equal(providerCalls, count, "Cached requests must not call the translation provider again");
} finally { globalThis.fetch = originalFetch; if (previous === undefined) delete process.env.STT_TRANSLATION_API_KEY; else process.env.STT_TRANSLATION_API_KEY = previous; }
for (const name of fs.readdirSync("dist/assets")) if (name.endsWith(".js")) {
  const js = fs.readFileSync("dist/assets/" + name, "utf8");
  assert(!js.includes("stt-secret-sentinel-must-never-reach-browser"));
  assert(!js.includes("translate.google.com/translate"));
}
console.log(JSON.stringify({ incompleteTranslationRejected: true, unknownPrivateTextRejected: true, foreignOriginRejected: true, credentialNotInBrowser: true, serverCacheVerified: true, status: "PASS" }));
