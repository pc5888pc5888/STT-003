import assert from "node:assert/strict";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { AppRoutes, PublicShell } from "../src/App";
import { sourceTextFromHtml } from "../src/i18n/translationText";
import { BOOKS } from "../src/data/contentRegistry";
import { publicationCopy } from "../src/i18n/publicationCopy";

const paths = ["/books", ...BOOKS.map(book => "/books/" + book.slug)];
const sources = new Set<string>();
for (const path of paths) {
  const html = renderToString(<StaticRouter location={path}><PublicShell><AppRoutes /></PublicShell></StaticRouter>);
  sourceTextFromHtml(html).forEach(text => sources.add(text));
}
for (const locale of ["en", "ja", "ko"] as const) {
  const missing = [...sources].filter(text => !publicationCopy(locale, text));
  assert.deepEqual(missing, [], `${locale}: every publication text must be available without a translation API`);
  assert.equal(publicationCopy(locale, "內在法遵 Internal Compliance")?.match(/Internal Compliance/g)?.length ?? 0, 1);
  assert(!publicationCopy(locale, "莊鈞翔博士｜Chuang Chun-Hsiang, Ph.D.")?.includes("Ph.D. Ph.D."));
}
console.log(JSON.stringify({ pages: paths.length, languages: 3, completePageTranslations: paths.length * 3, coveredSourceSegments: sources.size, status: "PASS" }));
