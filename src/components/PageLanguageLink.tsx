import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { nativeLanguagePath, publicTranslationUrl, type PageLanguage } from "../i18n/pageLanguage";
import "../styles/page-language.css";

type Props = {
  hrefLang: PageLanguage;
  lang: string;
  children: ReactNode;
  "aria-label"?: string;
};

const LABELS = {
  en: { name: "English", title: "Read this page in English", note: "An English edition of this page has not been published. You can open an automatic translation in Google Translate. The Chinese original remains authoritative.", action: "Open Google Translate ↗", close: "Continue reading the Chinese original" },
  ja: { name: "日本語", title: "このページを日本語で読む", note: "このページの日本語版はまだ公開されていません。Google 翻訳で自動翻訳を開けます。内容の確認には中国語の原文をご参照ください。", action: "Google 翻訳で開く ↗", close: "中国語の原文を読み続ける" },
  ko: { name: "한국어", title: "이 페이지를 한국어로 읽기", note: "이 페이지의 한국어판은 아직 발행되지 않았습니다. Google 번역에서 자동 번역을 열 수 있습니다. 내용 확인 시 중국어 원문을 기준으로 해 주세요.", action: "Google 번역에서 열기 ↗", close: "중국어 원문 계속 읽기" },
  "zh-Hant-TW": { name: "繁體中文", title: "閱讀繁體中文原文", note: "此頁尚未建立對應語言版本。", action: "開啟 Google 翻譯 ↗", close: "繼續閱讀" },
};

export function PageLanguageLink({ children, ...props }: Props) {
  const location = useLocation();
  const dialog = useRef<HTMLDialogElement>(null);
  const path = nativeLanguagePath(location.pathname, props.hrefLang);
  if (path) return <Link to={path + location.search + location.hash} {...props}>{children}</Link>;
  const copy = LABELS[props.hrefLang];
  return <>
    <button type="button" className="stt-page-language-trigger" {...props} title={copy.title}
      onClick={() => dialog.current?.showModal()}>{children}</button>
    {typeof document !== "undefined" && createPortal(
      <dialog ref={dialog} className="stt-page-language-dialog" lang={props.lang} aria-label={copy.title}>
        <h2>{copy.title}</h2>
        <p>{copy.note}</p>
        <p lang="zh-Hant">此頁尚無正式外語版本。可另開 Google 自動翻譯，或留在目前的中文原文。</p>
        <a href={publicTranslationUrl(location.pathname, props.hrefLang)} target="_blank" rel="noopener noreferrer">{copy.action}</a>
        <button type="button" autoFocus onClick={() => dialog.current?.close()}>{copy.close}</button>
      </dialog>, document.body)}
  </>;
}
