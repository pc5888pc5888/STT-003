import legacy from "../../public/data/mmedia-catalog.json";
import additions from "../../public/data/additional-publications.json";

export type Theme = "family" | "corporate" | "ai" | "civilization";
export type PublicationSource = { publisher: string; url: string; relation: "external" | "stt" };
export type PublishedWork = {
  id: string; title: string; excerpt: string; date: string; author: string;
  category: string; series: string; theme?: Theme; sources: PublicationSource[];
};
export type SeriesRecord = { key: string; label: string; description: string; route?: string };
export type BookRecord = { id: string; title: string; enTitle: string; image: string; previewUrl?: string; isSample?: boolean };

// Keep approved book metadata; reading URLs and sample labels follow the publication link manifest.
export const BOOKS: BookRecord[] = [
  { id: "sustainable-family-governance", title: "2026 永續家族治理實務實錄", enTitle: "Special Issue on Sustainable Family Governance Practices", image: "/books/2026-sustainable-family-governance.jpg", previewUrl: "https://heyzine.com/flip-book/cc95743e15.html" },
  { id: "internal-compliance", title: "內在法遵 Internal Compliance", enTitle: "Digital Canonical Edition", image: "/books/internal-compliance.jpg", previewUrl: "https://heyzine.com/flip-book/9319294c44.html", isSample: true },
  { id: "ai-governance", title: "內在法遵 AI Governance", enTitle: "AI Governance", image: "/books/ai-governance.webp", previewUrl: "https://heyzine.com/flip-book/0a14c7f49a.html", isSample: true },
  { id: "family-governance", title: "內在法遵 Family Governance", enTitle: "Family Governance", image: "/books/family-governance.webp", previewUrl: "https://heyzine.com/flip-book/82e2c4ab42.html", isSample: true },
];

export const THEMES: Array<{ key: Theme; label: string; en: string; description: string; anchor: string }> = [
  { key: "family", label: "家族與接班", en: "Family & Succession", description: "收錄家族企業接班、家庭憲法、所有權與控制、失能前治理、家族資產與治理記憶。", anchor: "family-succession" },
  { key: "corporate", label: "公司治理", en: "Corporate Governance", description: "收錄董事會、權責、法遵、重大決策、組織治理與企業制度。", anchor: "corporate-governance" },
  { key: "ai", label: "AI 與決策治理", en: "AI & Decision Governance", description: "收錄 AI 使用邊界、人機主權、證據、責任、平台與企業 AI 治理。", anchor: "ai-decision-governance" },
  { key: "civilization", label: "治理文明", en: "Governance Civilization", description: "收錄內在法遵、決策憲政、制度思想、出版與跨世代治理文本。", anchor: "governance-civilization" },
];

export const SERIES: SeriesRecord[] = [
  { key: "legal", label: "法律專欄", description: "從法律、制度與社會事件，理解權利、義務、證據與責任。", route: "/columns/legal" },
  { key: "humanistic", label: "人文地景產專欄", description: "閱讀已公開的人物、地方與產業故事。這裡呈現專欄作品，不是採訪前的二十題填答程序。", route: "/columns/humanistic" },
  { key: "news", label: "報導與其他發表", description: "收錄既有報導與其他公開發表，依每篇作品標示原始來源。", route: "/columns/news" },
  ...(additions.series as SeriesRecord[]),
];

const sourceName = (value: string) => value === "M傳媒" ? "M 傳媒" : value;
export const WORKS: PublishedWork[] = [
  ...legacy.articles.map(article => ({
    id: article.id, title: article.title, excerpt: article.excerpt, date: article.date,
    author: article.author, category: article.category, series: article.series,
    sources: [{ publisher: sourceName(article.source || legacy.source.publisher), url: article.url, relation: "external" as const }],
  })),
  ...(additions.works as PublishedWork[]),
];

export const CONTENT_META = {
  "/books": { title: "電子書與出版｜STT Governance", label: "電子書與出版", description: "STT Governance 的電子書與治理出版，收錄書籍資訊、正式封面與已提供的線上閱讀入口。", image: "/books/internal-compliance.jpg" },
  "/columns": { title: "專欄與報導｜STT Governance", label: "專欄與報導", description: "依系列與治理主題閱讀 STT Governance 的公開專欄與報導，逐篇標示作者、發表日期與原始來源。" },
  "/columns/legal": { title: "法律專欄｜STT Governance", label: "法律專欄", description: "法律專欄的獨立作品索引，依原始發表資料保留標題、作者、日期、摘要與原文連結。" },
  "/columns/humanistic": { title: "人文地景產專欄｜STT Governance", label: "人文地景產專欄", description: "人文地景產專欄的公開作品，呈現人物、地方與產業故事；與採訪前的二十題受訪程序分開。" },
  "/columns/news": { title: "報導與其他發表｜STT Governance", label: "報導與其他發表", description: "報導與其他公開發表的獨立索引，依各篇作品標示原始發表平台、作者、日期與原文連結。" },
};

export function normalized(value: string) { return value.normalize("NFKC").toLowerCase().replace(/\s+/g, ""); }
export function classifyTheme(work: PublishedWork): Theme {
  if (work.theme) return work.theme;
  const text = normalized(`${work.title} ${work.excerpt} ${work.category}`);
  if (/(家族|接班|傳承|繼承|遺產|遺囑|信託|特留份|照顧|高資產)/.test(text)) return "family";
  if (/(人工智慧|ai|deepfake|人機|數位分身|演算法|聊天機器人)/.test(text)) return "ai";
  if (/(公司治理|企業|董事|股東|股權|法遵|勞資|契約|工廠|碳費|淨零|策略|營運|金融|洗錢)/.test(text)) return "corporate";
  return "civilization";
}
export function seriesHref(series: SeriesRecord) { return series.route || `/columns?series=${encodeURIComponent(series.key)}`; }
export function sourceLabel(source: PublicationSource) { return `${source.relation === "stt" ? "STT 發表" : "外部發表／第三方媒體"} · ${source.publisher}`; }
export function isoDate(value: string) {
  const match = value.match(/^(\d{4})[/-](\d{2})[/-](\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  return match ? `${match[1]}-${match[2]}-${match[3]}${match[4] ? `T${match[4]}:${match[5]}:00+08:00` : ""}` : undefined;
}

// Imported by the build-time metadata registry as well as the pages: invalid public
// additions stop the build instead of silently creating empty or misattributed cards.
function validateRegistry() {
  const seriesKeys = new Set<string>();
  for (const item of SERIES) {
    if (!/^[a-z0-9-]+$/.test(item.key) || !item.label?.trim() || !item.description?.trim() || seriesKeys.has(item.key)) throw new Error("Invalid or duplicate publication series");
    seriesKeys.add(item.key);
  }
  const ids = new Set<string>();
  const urls = new Set<string>();
  for (const work of WORKS) {
    if (!work.id || ids.has(work.id) || !work.title?.trim() || !work.author?.trim() || !seriesKeys.has(work.series) || !isoDate(work.date) || !Array.isArray(work.sources) || !work.sources.length) throw new Error(`Invalid publication: ${work.id}`);
    if (work.theme && !THEMES.some(item => item.key === work.theme)) throw new Error(`Invalid theme: ${work.id}`);
    ids.add(work.id);
    for (const source of work.sources) {
      const url = new URL(source.url);
      if (url.protocol !== "https:" || !source.publisher?.trim() || !["stt", "external"].includes(source.relation) || urls.has(source.url)) throw new Error(`Invalid/duplicate source: ${work.id}`);
      if (/(^|\.)94m\.com\.tw$/.test(url.hostname) && source.relation !== "external") throw new Error("M Media must remain external");
      urls.add(source.url);
    }
  }
}
validateRegistry();
