import PortraitClosing from "./PortraitClosing";

const copy = {
  "zh-Hant": {
    title: <><span>如果一件事情的錯誤成本</span><span>已經不能只靠直覺承擔，</span><span>就應先完成判讀。</span></>,
    description: "先告訴 STT 現在發生了什麼、你最不希望接下來發生什麼，以及希望事情最後變成什麼。",
    label: "開始治理判讀 →",
    to: "/start",
  },
  en: {
    title: "When the cost of getting a decision wrong is too high to rely on intuition alone, begin with a governance review.",
    description: "Tell STT what is happening now, what outcome you most want to avoid, and what state you hope to achieve if the matter is handled properly.",
    label: "Start a governance review →",
    to: "/en/start",
  },
  ja: {
    title: "判断を誤った場合の損失が、もはや直感だけでは引き受けられないほど大きいなら、まずガバナンス判断を行うべきです。",
    description: "現在何が起きているか、最も避けたい結果は何か、適切に処理された場合にどのような状態を目指したいかをお知らせください。",
    label: "ガバナンス判断を始める →",
    to: "/ja/start",
  },
  ko: {
    title: "잘못된 판단의 대가를 더 이상 직관만으로 감당할 수 없다면, 먼저 거버넌스 판단을 거쳐야 합니다.",
    description: "현재 상황, 가장 피하고 싶은 결과, 적절히 처리되었을 때 도달하고 싶은 상태를 알려 주세요.",
    label: "거버넌스 판단 시작 →",
    to: "/ko/start",
  },
};

export default function HomeClosing({ lang }: { lang: keyof typeof copy }) {
  const content = copy[lang];
  return <PortraitClosing id="governance-engagement" lang={lang}
    eyebrow="GOVERNANCE ENGAGEMENT" title={content.title} description={content.description}
    image="/visual-approved/closing/stt-engagement-20261118.jpg"
    action={{ to: content.to, label: content.label }} />;
}
