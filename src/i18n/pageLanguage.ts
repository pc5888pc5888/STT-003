import { LANGUAGE_PAIRS } from "../seo";

export type PageLanguage = "zh-Hant-TW" | "en" | "ja" | "ko";

export function nativeLanguagePath(pathname: string, language: PageLanguage) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const pair = LANGUAGE_PAIRS[path];
  return pair?.[language === "zh-Hant-TW" ? "zh" : language];
}
