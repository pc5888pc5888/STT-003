import assert from "node:assert/strict";
import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { PageLanguageLink } from "../src/components/PageLanguageLink";
import { nativeLanguagePath, publicTranslationUrl, type PageLanguage } from "../src/i18n/pageLanguage";
import { AUTHOR_PROFILE_TRANSLATIONS } from "../src/data/authorProfileTranslations";
import profile from "../src/data/authorProfile.json";

const pages = ["/", "/problems", "/insights", "/how-stt-works", "/engagement", "/about", "/eric-chuang", "/start"];
const languages: PageLanguage[] = ["zh-Hant-TW", "en", "ja", "ko"];
let switches = 0;
for (const page of pages) for (const from of languages) for (const to of languages) {
  const source = from === "zh-Hant-TW" ? page : `/${from}${page === "/" ? "" : page}`;
  const expected = to === "zh-Hant-TW" ? page : `/${to}${page === "/" ? "" : page}`;
  assert.equal(nativeLanguagePath(source, to), expected);
  assert.equal(nativeLanguagePath(source + "/", to), expected);
  const html = renderToStaticMarkup(<StaticRouter location={source}><PageLanguageLink hrefLang={to} lang={to}>{to}</PageLanguageLink></StaticRouter>);
  assert(html.includes(`href="${expected}"`));
  switches++;
}

const ids = fs.readdirSync("public/data/articles").filter(name => name.endsWith(".json"));
for (const name of ids) for (const language of ["en", "ja", "ko"] as const) {
  const path = "/columns/articles/" + name.replace(/\.json$/, "");
  assert.equal(nativeLanguagePath(path, language), undefined);
  const url = new URL(publicTranslationUrl(path, language));
  assert.equal(url.origin, "https://translate.google.com");
  assert.equal(url.searchParams.get("u"), "https://stt-003.vercel.app" + path);
  assert.equal(url.searchParams.get("tl"), language);
  const html = renderToStaticMarkup(<StaticRouter location={path}><PageLanguageLink hrefLang={language} lang={language}>{language}</PageLanguageLink></StaticRouter>);
  assert(html.includes("<button"));
  assert(!html.includes(`href="/${language}"`), "An untranslated article must not jump to a language homepage");
}
for (const language of ["en", "ja", "ko"] as const) for (const text of [...profile.positions, ...profile.publications]) {
  assert(AUTHOR_PROFILE_TRANSLATIONS[language][text], `Missing ${language} translation: ${text}`);
  assert.notEqual(AUTHOR_PROFILE_TRANSLATIONS[language][text], text);
}
console.log(JSON.stringify({ languageSwitches: switches, articleLanguageDestinations: ids.length * 3, profileTranslations: 48, status: "PASS" }));
