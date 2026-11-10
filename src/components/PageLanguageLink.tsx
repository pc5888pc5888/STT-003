import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { nativeLanguagePath, type PageLanguage } from "../i18n/pageLanguage";
import { usePageTranslation } from "../i18n/PageTranslation";
import "../styles/page-language.css";

type Props = { hrefLang: PageLanguage; lang: string; children: ReactNode; "aria-label"?: string };
export function PageLanguageLink({ children, ...props }: Props) {
  const location = useLocation();
  const translation = usePageTranslation();
  const path = nativeLanguagePath(location.pathname, props.hrefLang);
  const params = new URLSearchParams(location.search);
  params.delete("lang");
  const search = params.size ? "?" + params.toString() : "";
  if (path) return <Link to={path + search + location.hash} {...props} data-stt-no-translate="true">{children}</Link>;
  return <button type="button" className="stt-page-language-trigger" lang={props.lang} aria-label={props["aria-label"]}
    data-stt-no-translate="true" aria-pressed={translation.language === props.hrefLang}
    onClick={() => translation.select(props.hrefLang)}>{children}</button>;
}
