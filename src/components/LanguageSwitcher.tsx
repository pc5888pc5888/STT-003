import { Languages, X } from "lucide-react";
import { useState } from "react";
import { supportedLocales, useI18n, type SupportedLocale } from "@/i18n/I18nProvider";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const handleSelect = (nextLocale: SupportedLocale) => {
    setLocale(nextLocale);
    setOpen(false);
  };

  return (
    <div className="relative">
      {open && (
        <div
          className="absolute bottom-[calc(100%+12px)] right-0 min-w-[190px] border bg-white p-2 shadow-[0_18px_60px_rgba(36,34,31,0.12)]"
          style={{ borderColor: "var(--stt-gold-line)", borderRadius: "var(--stt-radius-md)" }}
        >
          <div className="flex items-center justify-between px-2 py-2 border-b" style={{ borderColor: "var(--stt-line)" }}>
            <span className="text-[11px] tracking-[0.16em] uppercase" style={{ color: "var(--stt-ink-muted)" }}>
              {t("accessibility.selectLanguage")}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 bg-transparent border-0 cursor-pointer"
              aria-label={t("common.close")}
            >
              <X className="w-4 h-4" style={{ color: "var(--stt-ink-muted)" }} />
            </button>
          </div>

          <div className="py-1">
            {supportedLocales.map((item) => {
              const active = item.code === locale;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-transparent border-0 cursor-pointer text-left transition-colors"
                  style={{ color: active ? "var(--stt-gold-deep)" : "var(--stt-ink)" }}
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="text-[10px] tracking-[0.12em] uppercase" style={{ color: "var(--stt-ink-muted)" }}>
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-white border cursor-pointer transition-transform hover:scale-[1.03]"
        style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}
        title={t("accessibility.language")}
        aria-label={t("accessibility.language")}
        aria-expanded={open}
      >
        <Languages className="w-5 h-5" strokeWidth={1.4} />
      </button>
    </div>
  );
}
