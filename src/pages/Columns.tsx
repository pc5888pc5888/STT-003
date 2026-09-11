import FullBleedHero from "../components/FullBleedHero";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import bundled from "../../public/data/mmedia-catalog.json";

type Series = "legal" | "humanistic" | "news";
type Column = { id: string; title: string; excerpt: string; date: string; category: string; author: string; authorUrl: string; url: string; series: Series };
type Catalog = { articles: Column[]; syncedAt: string; mode?: "archive" | "bundled" };
const AUTHOR = "https://94m.com.tw/editors/ed55fc";
const PAGE_SIZE = 12;
const MAPPING: Record<string, Series> = { "法律": "legal", "社會": "humanistic", "熱門社會": "humanistic", "M-news": "news", "M-NEWS": "news", "Ｍ-NEWS": "news" };
const SERIES: Array<{ key: Series; name: string; short: string; en: string; description: string }> = [
  { key: "legal", name: "莊博士法律新聞專欄", short: "法律新聞專欄", en: "LEGAL INSIGHTS", description: "從法律新聞辨識權利、責任與制度風險，將事件帶回可被檢驗的策略判讀。" },
  { key: "humanistic", name: "莊博士人文地景產專欄", short: "人文地景產專欄", en: "HUMANISTIC LANDSCAPE", description: "從人物、生活與地方經驗，理解人的選擇、價值的形成，以及記憶如何延續。" },
  { key: "news", name: "莊博士新聞採訪專欄", short: "新聞採訪專欄", en: "NEWS & INTERVIEWS", description: "以新聞採訪與現場觀察，記錄人物、組織與公共事件的發展脈絡。" },
];
function validArticle(a: unknown): a is Column {
  if (!a || typeof a !== "object") return false;
  const r = a as Column;
  return typeof r.title === "string" && !!r.title.trim() && typeof r.excerpt === "string" && typeof r.id === "string"
    && typeof r.author === "string" && r.author.replace(/\s/g, "") === "莊鈞翔博士" && r.authorUrl === AUTHOR
    && typeof r.url === "string" && /^https:\/\/94m\.com\.tw\/articles\/[A-Za-z0-9_-]+$/.test(r.url)
    && /^20\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(r.date) && SERIES.some(s => s.key === r.series) && MAPPING[r.category] === r.series;
}
const INITIAL = bundled as unknown as Catalog;
function mergeArchive(incoming: Catalog): Catalog {
  if (!Array.isArray(incoming.articles) || !incoming.articles.every(validArticle) || !Number.isFinite(Date.parse(incoming.syncedAt))) throw new Error("Invalid catalog");
  if (Date.parse(incoming.syncedAt) < Date.parse(INITIAL.syncedAt)) return INITIAL;
  const map = new Map(INITIAL.articles.map(a => [a.url, a]));
  for (const a of incoming.articles) map.set(a.url, a);
  return { ...incoming, articles: [...map.values()].sort((a, b) => b.date.localeCompare(a.date) || b.url.localeCompare(a.url)) };
}
function checkedTime(value: string) {
  return new Intl.DateTimeFormat("zh-TW", { timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));
}
function normalized(value: string) { return value.normalize("NFKC").toLowerCase().replace(/\s+/g, ""); }

export default function Columns() {
  const catalog = INITIAL;
  const archiveState: "bundled" = "bundled";
  const [params, setParams] = useSearchParams();
  const listRef = useRef<HTMLElement>(null);
  const selected = SERIES.find(s => s.key === params.get("series"));
  const series = selected?.key || "all";
  const query = params.get("q") || "";
  const order = params.get("order") === "oldest" ? "oldest" : "newest";
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "莊鈞翔博士｜專欄判讀 · STT Governance";
    return () => { document.title = originalTitle; };
  }, []);
  const counts = useMemo(() => Object.fromEntries(SERIES.map(s => [s.key, catalog.articles.filter(a => a.series === s.key).length])) as Record<Series, number>, [catalog]);
  const filtered = useMemo(() => {
    const q = normalized(query);
    const items = catalog.articles.filter(a => (series === "all" || a.series === series) && (!q || normalized(`${a.title} ${a.excerpt} ${a.category}`).includes(q)));
    return [...items].sort((a, b) => (order === "oldest" ? 1 : -1) * (a.date.localeCompare(b.date) || a.url.localeCompare(b.url)));
  }, [catalog, series, query, order]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Number(params.get("page") || 1);
  const page = Math.min(pageCount, Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function update(key: string, value: string, scroll = false) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: key === "q" });
    if (scroll) requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: "start", behavior: "auto" }));
  }
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1).filter(n => n === 1 || n === pageCount || Math.abs(n - page) <= 1);
  return (
    <div className="stt-columns-v2 stt-columns-v3">
      <FullBleedHero theme="columns"><div className="stt-columns-source"><span>收錄 {catalog.articles.length} 則專欄</span><a href={AUTHOR} target="_blank" rel="noopener noreferrer">M傳媒作者專區 ↗</a></div></FullBleedHero>
      <section className="stt-series" id="column-series" aria-label="三大專欄系列">
        <div className="stt-columns-wrap stt-series-grid">
          {SERIES.map((s, i) => <article className="stt-series-card" key={s.key}>
            <div className="stt-series-index"><small>0{i + 1} · {s.en}</small><span>{counts[s.key]}<small> 則</small></span></div>
            <h2>{s.name}</h2><p>{s.description}</p>
            <button type="button" className="stt-series-enter" onClick={() => update("series", s.key, true)} aria-label={`瀏覽${s.name}`}>瀏覽這個系列 <ArrowUpRight size={16} aria-hidden="true" /></button>
          </article>)}
        </div>
      </section>
      <section className="stt-columns-tools" aria-label="專欄篩選">
        <div className="stt-columns-wrap stt-columns-tools-inner">
          <label className="stt-columns-search"><Search size={18} aria-hidden="true" /><input aria-label="搜尋專欄" value={query} onChange={e => update("q", e.target.value)} placeholder="搜尋標題、主題或關鍵字" />{query && <button type="button" onClick={() => update("q", "")} aria-label="清除搜尋">×</button>}</label>
          <div className="stt-series-tabs" aria-label="選擇專欄系列">
            <button type="button" className="stt-series-tab" data-active={series === "all"} aria-pressed={series === "all"} onClick={() => update("series", "")}>全部專欄</button>
            {SERIES.map(s => <button type="button" key={s.key} className="stt-series-tab" data-active={series === s.key} aria-pressed={series === s.key} onClick={() => update("series", s.key)}>{s.short}</button>)}
          </div>
        </div>
      </section>
      <section className="stt-columns-list" id="column-list" ref={listRef}>
        <div className="stt-columns-wrap">
          <div className="stt-columns-list-head"><div><p className="stt-columns-eyebrow">COLUMN ARCHIVE</p><h2>{selected?.name || "全部專欄"}</h2><p className="stt-columns-count" role="status">{query ? `搜尋「${query}」 · ` : ""}共 {filtered.length} 則{filtered.length > 0 ? ` · 顯示 ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} 則` : ""}</p></div>
            <label className="stt-columns-sort">排序<select aria-label="專欄排序" value={order} onChange={e => update("order", e.target.value)}><option value="newest">最新優先</option><option value="oldest">最早優先</option></select></label>
          </div>
          <div className="stt-column-results">
            {visible.map((article, i) => <article className="stt-column-row" key={article.url} data-series={article.series}>
              <span className="stt-column-index" aria-hidden="true">{String((page - 1) * PAGE_SIZE + i + 1).padStart(2, "0")}</span>
              <div><div className="stt-column-meta"><span>{SERIES.find(s => s.key === article.series)!.short}</span><time dateTime={article.date.replace(/\//g, "-").replace(" ", "T") + ":00+08:00"}>{article.date}</time><span>M傳媒</span></div>
                <h3><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                {article.excerpt && <p className="stt-column-excerpt">{article.excerpt}</p>}
                <a className="stt-column-read" href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`閱讀M傳媒原文：${article.title}`}>閱讀M傳媒原文 <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </article>)}
          </div>
          {visible.length === 0 && <div className="stt-columns-empty"><p>目前沒有符合條件的專欄。</p><button type="button" onClick={() => setParams({})}>清除篩選，回到全部專欄</button></div>}
          {pageCount > 1 && <nav className="stt-column-pagination" aria-label="專欄分頁">
            <button type="button" disabled={page <= 1} onClick={() => update("page", String(page - 1), true)}>上一頁</button>
            {pageNumbers.map((n, i) => <span key={n}>{i > 0 && n - pageNumbers[i - 1] > 1 && <span className="stt-page-gap" aria-hidden="true">…</span>}<button type="button" aria-label={`第 ${n} 頁`} aria-current={n === page ? "page" : undefined} onClick={() => update("page", String(n), true)}>{n}</button></span>)}
            <button type="button" disabled={page >= pageCount} onClick={() => update("page", String(page + 1), true)}>下一頁</button>
          </nav>}
          <p className="stt-catalog-note">索引最後核對：{checkedTime(catalog.syncedAt)}（臺灣時間）。{archiveState === "bundled" ? "目前顯示網站保存的完整清冊。" : ""}標題、分類與摘錄依M傳媒來源保留；完整內容請閱讀原文。</p>
        </div>
      </section>
    </div>
  );
}
