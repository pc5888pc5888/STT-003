import translations from "./publicationTranslations.json";
import { normalizeTranslationText } from "./translationText";

export const isPublicationPage = (pathname: string) => pathname === "/books" || pathname.startsWith("/books/");
export type PublicationLocale = keyof typeof translations;
const dictionaries = Object.fromEntries(Object.entries(translations).map(([locale, entries]) => {
  const dictionary = new Map<string, string>();
  for (const [source, translated] of Object.entries(entries)) {
    dictionary.set(normalizeTranslationText(source), translated);
    if (source.includes("。")) dictionary.set(normalizeTranslationText(source.replaceAll("。", "")), translated);
    // React renders a dynamic link label and its trailing arrow as separate text nodes.
    if (source.endsWith(" ↗")) dictionary.set(source.slice(0, -2), translated.replace(/ ↗$/, ""));
  }
  return [locale, dictionary];
})) as Record<PublicationLocale, Map<string, string>>;

export function publicationCopy(locale: PublicationLocale, source: string) {
  return dictionaries[locale].get(normalizeTranslationText(source));
}

export function publicationCopyEntries(locale: PublicationLocale) {
  return dictionaries[locale].entries();
}
