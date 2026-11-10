import fs from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { AppRoutes, PublicShell } from "../src/App";
import { sourceTextFromHtml } from "../src/i18n/translationText";
import { FORMAL_META } from "../src/seo";
import { ARTICLE_INDEX } from "../src/data/articleArchive";
import { normalizeTranslationText, hasChineseText } from "../src/i18n/translationText";

const sources = new Set<string>();
for (const article of ARTICLE_INDEX) for (const value of Object.values(article)) {
  if (typeof value === "string" && hasChineseText(value)) sources.add(normalizeTranslationText(value));
}
let pages = 0;
for (const path of Object.keys(FORMAL_META)) {
  if (/^\/(en|ja|ko)(\/|$)/.test(path) || path.startsWith("/columns/articles/")) continue;
  const markup = renderToStaticMarkup(<StaticRouter location={path}><PublicShell><AppRoutes /></PublicShell></StaticRouter>);
  for (const text of sourceTextFromHtml(markup)) sources.add(text);
  pages++;
}
for (const file of fs.readdirSync("dist").filter(name => name.startsWith("seo-columns-articles-") && name.endsWith(".html"))) {
  for (const text of sourceTextFromHtml(fs.readFileSync("dist/" + file, "utf8"))) sources.add(text);
  pages++;
}
for (const text of [...sources]) if (text.includes("。")) sources.add(text.replaceAll("。", ""));
fs.writeFileSync("dist/translation-source.json", JSON.stringify([...sources]));
console.log(JSON.stringify({ translationSourcePages: pages, publicTextSegments: sources.size }));
