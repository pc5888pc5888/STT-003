import { useNavigate } from "react-router-dom";

type ReferenceRoute = "/" | "/index.html" | "/problems" | "/how-stt-works" | "/insights" | "/publications" | "/stt" | "/cooperation";
type Hotspot = { label: string; to: string; left: number; top: number; width: number; height: number };

const imageByRoute: Record<ReferenceRoute, string> = {
  "/": "/visual-reference/home.svg",
  "/index.html": "/visual-reference/home.svg",
  "/problems": "/visual-reference/problems.svg",
  "/how-stt-works": "/visual-reference/how-stt-works.svg",
  "/insights": "/visual-reference/insights.svg",
  "/publications": "/visual-reference/publications.svg",
  "/stt": "/visual-reference/stt.svg",
  "/cooperation": "/visual-reference/cooperation.svg",
};

const navHotspots: Hotspot[] = [
  { label: "STT Governance 首頁", to: "/", left: 3.5, top: 1.4, width: 25, height: 10 },
  { label: "你正在面對什麼", to: "/problems", left: 43.4, top: 2.1, width: 9.8, height: 8.5 },
  { label: "如何判讀", to: "/how-stt-works", left: 53.7, top: 2.1, width: 8.4, height: 8.5 },
  { label: "專欄判讀", to: "/insights", left: 62.3, top: 2.1, width: 8.6, height: 8.5 },
  { label: "出版研究", to: "/publications", left: 71.0, top: 2.1, width: 8.2, height: 8.5 },
  { label: "關於 STT", to: "/stt", left: 79.4, top: 2.1, width: 7.7, height: 8.5 },
  { label: "預約與合作", to: "/cooperation", left: 87.0, top: 1.4, width: 10.5, height: 9.6 },
];

const actionHotspots: Partial<Record<ReferenceRoute, Hotspot[]>> = {
  "/": [
    { label: "看看我正在面對的問題", to: "/problems", left: 5.5, top: 45.0, width: 19.5, height: 8.0 },
    { label: "理解 STT 如何判讀", to: "/how-stt-works", left: 25.6, top: 45.0, width: 17.7, height: 8.0 },
  ],
  "/index.html": [
    { label: "看看我正在面對的問題", to: "/problems", left: 5.5, top: 45.0, width: 19.5, height: 8.0 },
    { label: "理解 STT 如何判讀", to: "/how-stt-works", left: 25.6, top: 45.0, width: 17.7, height: 8.0 },
  ],
  "/problems": [
    { label: "展開問題盤點", to: "#problem-index", left: 3.7, top: 62.2, width: 14.0, height: 7.0 },
    { label: "進入治理入口", to: "/start", left: 18.2, top: 62.2, width: 14.0, height: 7.0 },
  ],
  "/how-stt-works": [
    { label: "理解判讀方法", to: "#judgment-step-1", left: 5.1, top: 69.0, width: 13.8, height: 7.0 },
    { label: "檢視治理流程", to: "#judgment-step-1", left: 19.4, top: 69.0, width: 14.7, height: 7.0 },
  ],
  "/insights": [
    { label: "閱讀專欄", to: "#columns", left: 4.8, top: 61.5, width: 12.3, height: 7.0 },
    { label: "進入判讀", to: "/how-stt-works", left: 17.6, top: 61.5, width: 12.4, height: 7.0 },
  ],
  "/publications": [
    { label: "查看出版研究", to: "/books", left: 4.8, top: 62.0, width: 14.7, height: 7.0 },
    { label: "進入 STT Press", to: "/books", left: 20.1, top: 62.0, width: 15.3, height: 7.0 },
  ],
  "/stt": [
    { label: "認識 STT", to: "/institution/eric-chuang", left: 5.2, top: 61.7, width: 12.2, height: 7.0 },
    { label: "理解治理定位", to: "/problems", left: 17.9, top: 61.7, width: 13.2, height: 7.0 },
  ],
  "/cooperation": [
    { label: "立即預約諮詢", to: "/start", left: 5.2, top: 72.2, width: 14.0, height: 7.0 },
    { label: "了解合作通道", to: "#cooperation-options", left: 19.8, top: 72.2, width: 13.0, height: 7.0 },
  ],
};

export const REFERENCE_HERO_ROUTES = new Set<string>(Object.keys(imageByRoute));

export default function ReferenceHero({ route }: { route: string }) {
  const navigate = useNavigate();
  const key = (route === "/index.html" ? "/index.html" : route) as ReferenceRoute;
  const src = imageByRoute[key];
  if (!src) return null;

  const go = (to: string) => {
    if (to.startsWith("#")) {
      const target = document.querySelector(to);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate(to);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const hotspots = [...navHotspots, ...(actionHotspots[key] || [])];
  return (
    <section aria-label="STT Governance 主視覺" style={{ position: "relative", width: "100%", aspectRatio: "1672 / 941", overflow: "hidden", background: "#fff" }}>
      <img src={src} alt="" aria-hidden="true" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", display: "block", userSelect: "none" }} />
      {hotspots.map((spot) => (
        <button
          key={`${key}-${spot.label}`}
          type="button"
          aria-label={spot.label}
          onClick={() => go(spot.to)}
          title={spot.label}
          style={{ position: "absolute", left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, height: `${spot.height}%`, border: 0, padding: 0, margin: 0, cursor: "pointer", background: "transparent", color: "transparent", outlineOffset: 2 }}
        >
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{spot.label}</span>
        </button>
      ))}
    </section>
  );
}
