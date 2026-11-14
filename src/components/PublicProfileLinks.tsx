import { useLocation } from "react-router-dom";
import translations from "../i18n/publicationTranslations.json";
import "./public-profile-links.css";

const profiles = {
  vocus: "https://vocus.cc/salon/STTGovernance",
  linkedin: "https://www.linkedin.com/in/stt-governance/",
};

const navigationLabels = {
  zh: "公開專欄與個人檔案",
  en: "Columns and author profile",
  ja: "コラムと著者プロフィール",
  ko: "칼럼 및 저자 프로필",
};

export default function PublicProfileLinks({ id }: { id?: string }) {
  const { pathname, search } = useLocation();
  const selected = pathname.match(/^\/(en|ja|ko)(?:\/|$)/)?.[1] ?? new URLSearchParams(search).get("lang");
  const language = selected === "en" || selected === "ja" || selected === "ko" ? selected : "zh";
  const names = language === "zh" ? undefined : translations[language];
  const salon = names?.["STT 方格子沙龍"] ?? "STT 方格子沙龍";
  const profile = names?.["莊鈞翔博士的 LinkedIn"] ?? "莊鈞翔博士的 LinkedIn";

  return (
    <nav id={id} className="stt-public-profiles" aria-label={navigationLabels[language]} data-stt-no-translate="true">
      <a href={profiles.vocus} target="_blank" rel="noopener noreferrer">
        {salon} <span aria-hidden="true">↗</span>
      </a>
      <a href={profiles.linkedin} target="_blank" rel="noopener noreferrer">
        {profile} <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}
