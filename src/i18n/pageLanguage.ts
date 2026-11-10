import { LANGUAGE_PAIRS } from "../seo";

export type PageLanguage = "zh-Hant-TW" | "en" | "ja" | "ko";

export function nativeLanguagePath(pathname: string, language: PageLanguage) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const pair = LANGUAGE_PAIRS[path];
  return pair?.[language === "zh-Hant-TW" ? "zh" : language];
}

// Only the public page URL is sent; intake parameters and form contents never are.
export function publicTranslationUrl(pathname: string, language: PageLanguage) {
  const path = pathname.startsWith("/") && !pathname.startsWith("//") ? pathname : "/";
  const url = new URL("https://translate.google.com/translate");
  url.searchParams.set("sl", "zh-TW");
  url.searchParams.set("tl", language === "zh-Hant-TW" ? "zh-TW" : language);
  url.searchParams.set("u", "https://stt-003.vercel.app" + path);
  return url.toString();
}
