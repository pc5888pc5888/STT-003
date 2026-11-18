import PortraitClosing from "./PortraitClosing";

const copy = {
  "zh-Hant": {
    title: <><span>把一次性的交流，</span><span>轉化為可以逐年累積的</span><span>制度與知識。</span></>,
    description: "學會不以尚未發生的成果裝飾網站；網站僅收錄資料已完成並可核對之正式活動、研究、出版與公告紀錄。",
  },
  en: {
    title: "Turn one-off exchanges into institutional practices and knowledge that build year after year.",
    description: "GCSDA does not present outcomes that have yet to occur. This website includes only formal records of activities, research, publications and announcements for which the supporting materials are complete and verifiable.",
  },
};

export default function GCSDAHomeClosing({ lang }: { lang: keyof typeof copy }) {
  const content = copy[lang];
  return <PortraitClosing id="institutional-knowledge" lang={lang} eyebrow="GCSDA"
    title={content.title} description={content.description}
    image="/visual-approved/closing/gcsda-knowledge-20261118.jpg" />;
}
