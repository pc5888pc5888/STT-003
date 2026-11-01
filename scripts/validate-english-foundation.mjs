import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const errors = [];
const requireToken = (source, token, label) => {
  if (!source.includes(token)) errors.push(label);
};

const app = read("src/App.tsx");
const english = read("src/pages/EnglishFoundation.tsx");
const seo = read("src/seo.ts");
const vite = read("vite.config.ts");
const css = read("src/styles/stt-english-foundation.css");
const methodCss = read("src/styles/stt-g3-method.css");
const engagementCss = read("src/styles/stt-g4-engagement.css");
const institutionalCss = read("src/styles/stt-institutional-pages.css");
const vercel = JSON.parse(read("vercel.json"));

const routes = [
  "/en",
  "/en/how-stt-works",
  "/en/engagement",
  "/en/about",
  "/en/start",
];

for (const route of routes) {
  requireToken(app, `path="${route}"`, `App route missing: ${route}`);
  requireToken(seo, `"${route}": {`, `SEO record missing: ${route}`);
}

requireToken(app, 'const HUMANISTIC_INTERVIEW_URL = "/humanistic-interview/";', "Humanistic Interview route changed");
requireToken(app, 'const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";', "STT LINE public URL changed");
requireToken(app, '<Link to="/start" className="stt-g0-primary-cta">開始治理判讀</Link>', "Chinese primary CTA changed");
requireToken(app, 'hrefLang="en"', "Chinese-to-English language switch missing");
requireToken(english, 'hrefLang="zh-Hant-TW"', "English-to-Chinese language switch missing");
requireToken(english, 'fetch("/api/cooperation-submit"', "English intake is not using the existing governed intake API");
requireToken(english, 'source_account:"stt"', "English intake attribution changed");
requireToken(english, 'landing_route:"/en/start"', "English intake landing route missing");
requireToken(english, 'https://line.me/R/ti/p/%40783xkknh', "English LINE public URL changed");

const fetchCount = (english.match(/fetch\(/g) || []).length;
if (fetchCount !== 1) errors.push(`English layer must have exactly one fetch call; found ${fetchCount}`);
for (const banned of ["@google/generative-ai", "openai", "anthropic", "firebase", "supabase"]) {
  if (english.toLowerCase().includes(banned.toLowerCase())) errors.push(`Unapproved dependency/service reference in English layer: ${banned}`);
}

requireToken(seo, 'export const LANGUAGE_PAIRS', "LANGUAGE_PAIRS export missing");
requireToken(seo, 'document.documentElement.lang = isEnglish ? "en" : "zh-Hant-TW";', "Runtime html lang governance missing");
requireToken(seo, 'hreflang = hreflang', "Runtime hreflang assignment missing");
requireToken(vite, 'LANGUAGE_PAIRS', "Static SEO language-pair support missing");
requireToken(vite, 'const locale = meta.locale ?? (language === "en" ? "en_US" : "zh_TW");', "Static OG locale governance missing");
requireToken(vite, '.replace(/<html lang="[^"]*">/, `<html lang="${language}">`)', "Static html lang governance missing");
requireToken(css, '.stt-g0-lang-switch', "Language-switch styling missing");
requireToken(css, 'grid-template-columns:340px minmax(0,1fr) auto auto!important', "Desktop language-switch header geometry missing");
requireToken(css, 'grid-template-columns:minmax(0,1fr) auto auto!important', "Intermediate language-switch header geometry missing");
requireToken(methodCss, "@media(max-width:980px)", "Method tablet breakpoint missing");
requireToken(methodCss, "grid-template-columns:repeat(4,1fr)", "Method tablet index geometry missing");
requireToken(methodCss, "@media(max-width:680px)", "Method mobile breakpoint missing");
requireToken(methodCss, "grid-template-columns:repeat(2,1fr)", "Method mobile index geometry missing");
requireToken(engagementCss, "@media(max-width:900px)", "Engagement tablet breakpoint missing");
requireToken(engagementCss, "grid-template-columns:1fr;", "Engagement single-column responsive geometry missing");
requireToken(engagementCss, "@media(max-width:640px)", "Engagement mobile breakpoint missing");
requireToken(institutionalCss, "@media(max-width:720px)", "Institutional mobile breakpoint missing");
requireToken(institutionalCss, ".stt-inst-grid{grid-template-columns:1fr}", "Institutional mobile card geometry missing");
requireToken(css, "@media(max-width:760px)", "English mobile breakpoint missing");
requireToken(css, ".stt-en-process-line{\n    grid-template-columns:1fr;", "English process-line mobile geometry missing");

const rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : [];
if (rewrites.some((item) => item?.source === "/en/:path*")) errors.push("Broad /en/:path* fallback is prohibited");
const expectedRewrites = {
  "/en": "/seo-en.html",
  "/en/how-stt-works": "/seo-en-how-stt-works.html",
  "/en/engagement": "/seo-en-engagement.html",
  "/en/about": "/seo-en-about.html",
  "/en/start": "/seo-en-start.html",
};
for (const [source, destination] of Object.entries(expectedRewrites)) {
  if (!rewrites.some((item) => item?.source === source && item?.destination === destination)) {
    errors.push(`Exact English rewrite missing: ${source} -> ${destination}`);
  }
}

const redirects = Array.isArray(vercel.redirects) ? vercel.redirects : [];
for (const route of routes) {
  const source = route + "/";
  if (!redirects.some((item) => item?.source === source && item?.destination === route && item?.permanent === true)) {
    errors.push(`Trailing-slash canonical redirect missing: ${source}`);
  }
}

if (errors.length) {
  console.error("STT ENGLISH FOUNDATION QA FAILED\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  englishFoundationQA: "PASS",
  formalEnglishRoutes: routes.length,
  exactRewrites: true,
  strictUnknownEnglish404: true,
  existingIntakeApiReused: true,
  noNewAiService: true,
  coreChineseCtaRetained: true,
  humanisticRouteRetained: true,
  sttLineUrlRetained: true,
  responsiveSourceLocks: true,
}));
