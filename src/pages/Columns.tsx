import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { articles, type Article } from "../data/mockData";

type Series = "legal" | "humanistic";

type ColumnArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  url?: string;
  series: Series;
  source: "M傳媒";
};

type SyncStats = {
  pagesFetched: number;
  pageNumbers: number[];
  paginationDetected: boolean;
  totalClassified: number;
  legal: number;
  humanistic: number;
  pending: number;
};

type SyncPayload = {
  ok: boolean;
  syncedAt?: string;
  stats?: SyncStats;
  articles?: Array<Partial<ColumnArticle> & { id: string; title: string; url: string; series: Series }>;
};

const MMEDIA_AUTHOR_URL = "https://94m.com.tw/editors/ed55fc";

const HUMANISTIC_FALLBACK: ColumnArticle[] = [
  {
    id: "mmedia-fea32f",
    title: "在人還健康的時候，先替未來留下一次選擇｜人文地景產專欄",
    excerpt: "從健康、選擇與生命安排切入，留下人在仍能決定時的判斷與生活尺度。",
    date: "2026/08/27 21:20",
    category: "社會",
    author: "莊鈞翔博士",
    url: "https://94m.com.tw/articles/fea32f",
    series: "humanistic",
    source: "M傳媒",
  },
  {
    id: "mmedia-36f160",
    title: "〖茗香與墨痕交織的儒者交響〗｜人文地景產專欄",
    excerpt: "以人物專訪、教育志業與美學視界，保存一段可被理解與傳承的人文記憶。",
    date: "2026/08/25 04:20",
    category: "社會",
    author: "莊鈞翔博士",
    url: "https://94m.com.tw/articles/36f160",
    series: "humanistic",
    source: "M傳媒",
  },
];

const EXCLUDED_TOPICS = ["減碳", "碳排", "碳權"];

function legacySeries(article: Article): Series {
  const text = `${article.title} ${article.excerpt}`;
  return /人文地景產/.test(text) ? "humanistic" : "legal";
}

function legacyArticle(article: Article): ColumnArticle {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    category: article.category,
    author: article.author,
    url: article.url,
    series: legacySeries(article),
    source: "M傳媒",
  };
}

function isLegacyExcluded(article: ColumnArticle) {
  const text = `${article.title} ${article.excerpt}`;
  return article.category === "ESG" || EXCLUDED_TOPICS.some((term) => text.includes(term));
}

function timeValue(value: string) {
  if (!value) return 0;
  const normalized = value.replace(/\//g, "-").replace(" ", "T");
  return Date.parse(normalized) || 0;
}

function sortArticles(items: ColumnArticle[]) {
  return [...items].sort((a, b) => timeValue(b.date) - timeValue(a.date));
}

function dedupe(items: ColumnArticle[]) {
  const map = new Map<string, ColumnArticle>();
  for (const item of items) {
    const key = item.url || item.id;
    const previous = map.get(key);
    map.set(key, previous ? { ...previous, ...item, excerpt: item.excerpt || previous.excerpt } : item);
  }
  return Array.from(map.values());
}

function openArticle(article: ColumnArticle) {
  if (!article.url) return;
  window.open(article.url, "_blank", "noopener,noreferrer");
}

function seriesLabel(series: Series) {
  return series === "humanistic" ? "人文地景產" : "法律策略專欄";
}

export default function Columns() {
  const [remote, setRemote] = useState<ColumnArticle[]>([]);
  const [syncState, setSyncState] = useState<"loading" | "live" | "fallback">("loading");
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);
  const [series, setSeries] = useState<Series | "all">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/mmedia", { headers: { accept: "application/json" } })
      .then((response) => response.json() as Promise<SyncPayload>)
      .then((payload) => {
        if (!active) return;
        const synced = (payload.articles || []).map((item): ColumnArticle => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || "",
          date: item.date || "",
          category: item.category || (item.series === "humanistic" ? "社會" : "法律"),
          author: item.author || "莊鈞翔博士",
          url: item.url,
          series: item.series,
          source: "M傳媒",
        }));
        setRemote(sortArticles(dedupe(synced)));
        setSyncStats(payload.stats || null);
        setSyncState(payload.ok && synced.length > 0 ? "live" : "fallback");
      })
      .catch(() => {
        if (active) setSyncState("fallback");
      });
    return () => { active = false; };
  }, []);

  const fallbackCatalog = useMemo(() => {
    const legacy = articles.map(legacyArticle).filter((item) => !isLegacyExcluded(item));
    return sortArticles(dedupe([...HUMANISTIC_FALLBACK, ...legacy]));
  }, []);

  // Live mode is authoritative: only items discovered from Dr. Chuang's M Media author zone
  // are shown. Local data is used only when the upstream index cannot be read.
  const catalog = remote.length > 0 ? remote : fallbackCatalog;

  const counts = useMemo(() => ({
    legal: catalog.filter((item) => item.series === "legal").length,
    humanistic: catalog.filter((item) => item.series === "humanistic").length,
  }), [catalog]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalog.filter((article) => {
      const seriesMatch = series === "all" || article.series === series;
      const textMatch = !normalized || `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(normalized);
      return seriesMatch && textMatch;
    });
  }, [catalog, query, series]);

  const syncLabel = syncState === "live"
    ? `M傳媒｜莊鈞翔博士專區已連線${syncStats ? ` · 法律 ${syncStats.legal} · 社會／人文 ${syncStats.humanistic}${syncStats.pending ? ` · 待確認 ${syncStats.pending}` : ""}` : ""}`
    : syncState === "loading"
      ? "正在讀取 M傳媒｜莊鈞翔博士專區"
      : "M傳媒暫時無法讀取，目前使用 STT 本地備援索引";

  return (
    <div className="stt-columns-v2">
      <section className="stt-columns-hero">
        <div className="stt-columns-wrap stt-columns-hero-grid">
          <div>
            <p className="stt-columns-eyebrow">DR. CHUANG · COLUMN JUDGMENT</p>
            <h1 className="stt-columns-title">莊鈞翔博士｜專欄判讀</h1>
            <p className="stt-columns-lead" data-stt-title-sentence>
              這裡只收錄莊鈞翔博士對外發表的專欄。M傳媒「法律」對應法律策略專欄；M傳媒「社會」對應人文地景產，出版與研究另行歸入「出版研究」。
            </p>
            <div className="stt-columns-source">
              <span>{syncLabel}</span>
              <button type="button" onClick={() => window.open(MMEDIA_AUTHOR_URL, "_blank", "noopener,noreferrer")}>M傳媒｜莊鈞翔博士專區 ↗</button>
            </div>
          </div>
          <div className="stt-columns-visual" aria-hidden="true" />
        </div>
      </section>

      <section className="stt-series">
        <div className="stt-columns-wrap stt-series-grid">
          <article className="stt-series-card">
            <small>LEGAL INSIGHTS · {String(counts.legal).padStart(2, "0")}</small>
            <h2>法律策略專欄｜STT Legal Insights</h2>
            <p>唯一上游為莊鈞翔博士 M傳媒專區；文章類別「法律」自動進入此系列。</p>
          </article>
          <article className="stt-series-card">
            <small>HUMANISTIC LANDSCAPE · {String(counts.humanistic).padStart(2, "0")}</small>
            <h2>人文地景產｜Humanistic Landscape</h2>
            <p>唯一上游同為莊鈞翔博士 M傳媒專區；文章類別「社會」自動進入此系列。</p>
          </article>
        </div>
      </section>

      <section className="stt-columns-tools" aria-label="專欄篩選">
        <div className="stt-columns-wrap stt-columns-tools-inner">
          <label className="stt-columns-search">
            <Search size={16} strokeWidth={1.25} style={{ color: "#8f6f47", marginRight: 10 }} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋專欄主題" />
          </label>
          <div className="stt-series-tabs">
            <button className="stt-series-tab" data-active={series === "all"} onClick={() => setSeries("all")}>全部專欄</button>
            <button className="stt-series-tab" data-active={series === "legal"} onClick={() => setSeries("legal")}>法律策略專欄</button>
            <button className="stt-series-tab" data-active={series === "humanistic"} onClick={() => setSeries("humanistic")}>人文地景產</button>
          </div>
        </div>
      </section>

      <section className="stt-columns-list">
        <div className="stt-columns-wrap">
          <div className="stt-columns-list-head">
            <div>
              <p className="stt-columns-eyebrow">EDITORIAL INDEX</p>
              <h2>{series === "all" ? "最新專欄" : seriesLabel(series)}</h2>
            </div>
            <div className="stt-columns-count">{filtered.length} ARTICLES</div>
          </div>

          {filtered.length > 0 ? filtered.map((article, index) => (
            <article
              key={`${article.id}-${article.url || index}`}
              className="stt-column-row"
              role={article.url ? "link" : undefined}
              tabIndex={article.url ? 0 : -1}
              onClick={() => openArticle(article)}
              onKeyDown={(event) => {
                if (article.url && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  openArticle(article);
                }
              }}
            >
              <div className="stt-column-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="stt-column-meta">
                  <span>{seriesLabel(article.series)}</span>
                  <span>M傳媒／{article.category}</span>
                  <span>{article.date}</span>
                  <span>{article.source}</span>
                </div>
                <h3 data-stt-title-sentence>{article.title}</h3>
                {article.excerpt && <p>{article.excerpt}</p>}
              </div>
              <div className="stt-column-arrow">→</div>
            </article>
          )) : <div className="stt-columns-empty">目前沒有符合條件的專欄。</div>}
        </div>
      </section>
    </div>
  );
}
