import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import zhTW from "./locales/zh-TW.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

export type SupportedLocale = "zh-TW" | "en" | "ja";

type TranslationTree = Record<string, unknown>;

type I18nContextValue = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, fallback?: string) => string;
  languageName: string;
};

const resources: Record<SupportedLocale, TranslationTree> = {
  "zh-TW": zhTW,
  en,
  ja,
};

export const supportedLocales: Array<{ code: SupportedLocale; label: string; shortLabel: string }> = [
  { code: "zh-TW", label: "繁體中文", shortLabel: "繁中" },
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "ja", label: "日本語", shortLabel: "日本語" },
];

const STORAGE_KEY = "stt-governance-locale";

function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return value === "zh-TW" || value === "en" || value === "ja";
}

function detectInitialLocale(): SupportedLocale {
  if (typeof window === "undefined") {
    return "zh-TW";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isSupportedLocale(stored)) {
    return stored;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ja")) {
    return "ja";
  }
  if (browserLanguage.startsWith("en")) {
    return "en";
  }
  return "zh-TW";
}

function resolveTranslation(tree: TranslationTree, key: string): unknown {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[segment];
  }, tree);
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(detectInitialLocale);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.sttLocale = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, fallback?: string) => {
      const activeValue = resolveTranslation(resources[locale], key);
      if (typeof activeValue === "string") {
        return activeValue;
      }

      const fallbackValue = resolveTranslation(resources["zh-TW"], key);
      if (typeof fallbackValue === "string") {
        return fallbackValue;
      }

      return fallback ?? key;
    };

    const languageNameValue = resolveTranslation(resources[locale], "meta.languageName");

    return {
      locale,
      setLocale,
      t,
      languageName: typeof languageNameValue === "string" ? languageNameValue : locale,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
