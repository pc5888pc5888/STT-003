import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { articles, type Article } from "../data/mockData";

const EXCLUDED_TOPICS = ["減碳", "碳排", "碳權"];

function isLegacyExcluded(article: Article) {
  if (article.category === "ESG") {
    return true;
  }
  const text = `${article.title} ${article.excerpt}`;
  return EXCLUDED_TOPICS.some((term) => text.includes(term));
}

function sortArticles(items: Article[]) {
  return [...items].sort((a, b) => {
    const aTime = Date.parse(a.date || "") || 0;
    const bTime = Date.parse(b.date || "") || 0;
    if (aTime !== bTime) {
      return bTime - aTime;
    }
    return String(b.id).localeCompare(String(a.id));
  });
}

function openArticle(article: Article) {
  if (!article.url) {
    return;
  }
  window.open(article.url, "_blank", "noopener,noreferrer");
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <article
      className="stt-editorial-row"
      onClick={() => openArticle(article)}
      role={article.url ? "link" : undefined}
      tabIndex={article.url ? 0 : -1}
      onKeyDown={(event) => {
        if (article.url && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          openArticle(article);
        }
      }}
    >
      <div className="stt-editorial-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="stt-editorial-main">
        <div className="stt-editorial-meta">
          <span>{article.category}</span>
          <span>{article.date}</span>
        </div>
        <h2>{article.title}</h2>
        {article.excerpt && <p>{article.excerpt}</p>}
      </div>
      <div className="stt-editorial-arrow" aria-hidden="true">→</div>
    </article>
  );
}

export default function Columns() {
  const cleanArticles = useMemo(
    () => sortArticles(articles.filter((article) => !isLegacyExcluded(article))),
    []
  );

  const categories = useMemo(() => {
    const values = Array.from(new Set(cleanArticles.map((article) => article.category).filter(Boolean)));
    return values.slice(0, 8);
  }, [cleanArticles]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    cleanArticles.forEach((article) => {
      counts.set(article.category, (counts.get(article.category) || 0) + 1);
    });
    return counts;
  }, [cleanArticles]);

  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return cleanArticles.filter((article) => {
      const categoryMatch = !category || article.category === category;
      const textMatch = !normalized || `${article.title} ${article.excerpt}`.toLowerCase().includes(normalized);
      return categoryMatch && textMatch;
    });
  }, [category, cleanArticles, query]);

  const featured = cleanArticles[0] ?? null;
  const showFeatured = Boolean(featured && !category && query.trim() === "");
  const libraryEntries = showFeatured && featured
    ? filtered.filter((article) => article.id !== featured.id)
    : filtered;

  return (
    <div className="stt-editorial-page">
      <style>{`
        .stt-editorial-page {
          min-height: 100vh;
          background: #fbfbfa;
          color: #1a1a1a;
        }
        .stt-editorial-page * { box-sizing: border-box; }
        .stt-editorial-hero {
          border-bottom: 1px solid rgba(197,168,128,.20);
          background: #fbfbfa;
        }
        .stt-editorial-hero-inner {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.32fr) minmax(320px, .68fr);
          gap: 88px;
          align-items: stretch;
          padding: 94px 0 84px;
        }
        .stt-editorial-hero-copy {
          align-self: center;
          max-width: 820px;
        }
        .stt-editorial-eyebrow {
          margin: 0 0 24px;
          color: #a9895e;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .stt-editorial-title {
          margin: 0;
          max-width: 800px;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(50px, 5.8vw, 84px);
          font-weight: 400;
          line-height: 1.16;
          letter-spacing: .03em;
        }
        .stt-editorial-title-en {
          margin: 20px 0 0;
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .stt-editorial-lead {
          max-width: 720px;
          margin: 36px 0 0;
          color: #625c54;
          font-size: 15px;
          line-height: 2.05;
          letter-spacing: .015em;
        }
        .stt-editorial-index-panel {
          min-height: 460px;
          padding: 32px 32px 28px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(197,168,128,.22);
          background: #f7f3ec;
        }
        .stt-editorial-index-kicker {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(197,168,128,.24);
          color: #81776c;
          font-size: 8px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .stt-editorial-index-number {
          margin-top: 30px;
          color: #b18a58;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 82px;
          line-height: .95;
          letter-spacing: -.04em;
        }
        .stt-editorial-index-name {
          margin-top: 16px;
          color: #28241f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .stt-editorial-index-list {
          margin-top: 30px;
          border-top: 1px solid rgba(197,168,128,.22);
        }
        .stt-editorial-index-item {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(197,168,128,.16);
          color: #5f584f;
          font-size: 11px;
        }
        .stt-editorial-index-item span:last-child {
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
        }
        .stt-featured {
          border-bottom: 1px solid rgba(197,168,128,.20);
          background: #f9f7f3;
        }
        .stt-featured-inner {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(220px, .42fr) minmax(0, 1.58fr);
          gap: 72px;
          padding: 68px 0 74px;
        }
        .stt-featured-label {
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .stt-featured-number {
          margin-top: 18px;
          color: #c5a880;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 54px;
          line-height: 1;
        }
        .stt-featured-copy {
          cursor: pointer;
        }
        .stt-featured-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .stt-featured-copy h2 {
          margin: 18px 0 0;
          max-width: 940px;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(30px, 3.7vw, 52px);
          font-weight: 400;
          line-height: 1.48;
          letter-spacing: .02em;
        }
        .stt-featured-copy p {
          margin: 22px 0 0;
          max-width: 840px;
          color: #625c54;
          font-size: 14px;
          line-height: 2;
        }
        .stt-featured-action {
          margin-top: 26px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #a9895e;
          font-size: 11px;
          letter-spacing: .08em;
        }
        .stt-editorial-tools {
          position: sticky;
          top: 76px;
          z-index: 30;
          border-bottom: 1px solid rgba(197,168,128,.18);
          background: rgba(251,251,250,.96);
          backdrop-filter: blur(18px);
        }
        .stt-editorial-tools-inner {
          width: min(calc(100% - 72px), 1320px);
          min-height: 84px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .stt-editorial-search {
          flex: 0 1 350px;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 2px;
          border-bottom: 1px solid rgba(197,168,128,.34);
          background: transparent;
        }
        .stt-editorial-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #1a1a1a;
          font-size: 13px;
        }
        .stt-editorial-categories {
          display: flex;
          align-items: center;
          gap: 18px;
          overflow-x: auto;
          padding: 8px 0;
        }
        .stt-editorial-filter {
          position: relative;
          flex: 0 0 auto;
          min-height: 36px;
          padding: 0 0 3px;
          border: 0;
          background: transparent;
          color: #756d64;
          font-size: 11px;
          cursor: pointer;
        }
        .stt-editorial-filter::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: transparent;
        }
        .stt-editorial-filter[data-active="true"] {
          color: #1a1a1a;
        }
        .stt-editorial-filter[data-active="true"]::after {
          background: #b18a58;
        }
        .stt-editorial-library {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          padding: 72px 0 108px;
        }
        .stt-editorial-library-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 34px;
        }
        .stt-editorial-library-head h2 {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 31px;
          font-weight: 400;
        }
        .stt-editorial-count {
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .stt-editorial-list {
          border-top: 1px solid rgba(197,168,128,.24);
        }
        .stt-editorial-row {
          display: grid;
          grid-template-columns: 64px minmax(0,1fr) 40px;
          gap: 24px;
          align-items: start;
          padding: 34px 4px;
          border-bottom: 1px solid rgba(197,168,128,.18);
          cursor: pointer;
          transition: background .18s ease, padding .24s ease;
        }
        .stt-editorial-row:hover {
          background: rgba(197,168,128,.04);
          padding-left: 14px;
          padding-right: 14px;
        }
        .stt-editorial-index {
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
        }
        .stt-editorial-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .stt-editorial-main h2 {
          margin: 13px 0 0;
          max-width: 930px;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(22px, 2.45vw, 32px);
          font-weight: 400;
          line-height: 1.58;
        }
        .stt-editorial-main p {
          margin: 14px 0 0;
          max-width: 850px;
          color: #6e675e;
          font-size: 13px;
          line-height: 1.95;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .stt-editorial-arrow {
          padding-top: 30px;
          color: #a9895e;
          font-size: 22px;
          transition: transform .2s ease;
        }
        .stt-editorial-row:hover .stt-editorial-arrow { transform: translateX(6px); }
        .stt-editorial-empty {
          padding: 72px 0;
          text-align: center;
          color: #6e675e;
        }
        @media (max-width: 940px) {
          .stt-editorial-hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .stt-editorial-index-panel { min-height: 0; }
          .stt-featured-inner { grid-template-columns: 1fr; gap: 26px; }
          .stt-editorial-tools { top: 0; }
          .stt-editorial-tools-inner {
            align-items: stretch;
            flex-direction: column;
            padding: 14px 0;
          }
          .stt-editorial-search { flex-basis: auto; width: 100%; }
          .stt-editorial-categories { width: 100%; }
        }
        @media (max-width: 620px) {
          .stt-editorial-hero-inner,
          .stt-featured-inner,
          .stt-editorial-tools-inner,
          .stt-editorial-library { width: calc(100% - 30px); }
          .stt-editorial-hero-inner { padding: 58px 0 54px; }
          .stt-editorial-title { font-size: clamp(43px, 13vw, 62px); }
          .stt-editorial-index-panel { padding: 26px 22px 24px; }
          .stt-editorial-row {
            grid-template-columns: 42px minmax(0,1fr) 24px;
            gap: 12px;
            padding: 28px 0;
          }
          .stt-editorial-main h2 { font-size: 22px; }
        }
      `}</style>

      <section className="stt-editorial-hero" data-stt-readable="true">
        <div className="stt-editorial-hero-inner">
          <div className="stt-editorial-hero-copy">
            <p className="stt-editorial-eyebrow">04 Press &amp; Insights · Governance Intelligence</p>
            <h1 className="stt-editorial-title">出版與觀點</h1>
            <p className="stt-editorial-title-en">Press, Legal Commentary &amp; Institutional Insight</p>
            <p className="stt-editorial-lead">
              STT 將法律、企業治理、重大決策與數位治理的判讀，持續沉澱為可以搜尋、閱讀、引用與回溯的知識資產。這裡不是內容流量牆，而是具有編輯秩序的智庫資料庫。
            </p>
          </div>

          <aside className="stt-editorial-index-panel" aria-label="Editorial index">
            <div className="stt-editorial-index-kicker">
              <span>STT Governance</span>
              <span>Editorial Index</span>
            </div>
            <div className="stt-editorial-index-number">04</div>
            <div className="stt-editorial-index-name">Press &amp; Insights</div>
            <div className="stt-editorial-index-list">
              {categories.slice(0, 5).map((item) => (
                <div key={item} className="stt-editorial-index-item">
                  <span>{item}</span>
                  <span>{String(categoryCounts.get(item) || 0).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {showFeatured && featured && (
        <section className="stt-featured" data-stt-readable="true">
          <div className="stt-featured-inner">
            <div>
              <div className="stt-featured-label">Featured Briefing</div>
              <div className="stt-featured-number">01</div>
            </div>
            <article
              className="stt-featured-copy"
              onClick={() => openArticle(featured)}
              role={featured.url ? "link" : undefined}
              tabIndex={featured.url ? 0 : -1}
              onKeyDown={(event) => {
                if (featured.url && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  openArticle(featured);
                }
              }}
            >
              <div className="stt-featured-meta">
                <span>{featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h2>{featured.title}</h2>
              {featured.excerpt && <p>{featured.excerpt}</p>}
              {featured.url && (
                <div className="stt-featured-action">
                  <span>閱讀完整判讀</span>
                  <ArrowRight size={15} strokeWidth={1.2} />
                </div>
              )}
            </article>
          </div>
        </section>
      )}

      <section className="stt-editorial-tools" aria-label="Press and insights filters">
        <div className="stt-editorial-tools-inner">
          <label className="stt-editorial-search">
            <Search className="w-4 h-4" strokeWidth={1.25} style={{ color: "#a9895e" }} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋治理、法律、決策議題" />
          </label>
          <div className="stt-editorial-categories">
            <button type="button" className="stt-editorial-filter" data-active={category === null} onClick={() => setCategory(null)}>全部</button>
            {categories.map((item) => (
              <button key={item} type="button" className="stt-editorial-filter" data-active={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-editorial-library" data-stt-readable="true">
        <div className="stt-editorial-library-head">
          <div>
            <p className="stt-editorial-eyebrow" style={{ marginBottom: 10 }}>Editorial Library</p>
            <h2>{category || "最新治理判讀"}</h2>
          </div>
          <div className="stt-editorial-count">{libraryEntries.length} entries</div>
        </div>

        {libraryEntries.length > 0 ? (
          <div className="stt-editorial-list">
            {libraryEntries.map((article, index) => <ArticleRow key={article.id} article={article} index={index} />)}
          </div>
        ) : (
          <div className="stt-editorial-empty">
            <BookOpen className="mx-auto mb-4 h-6 w-6" strokeWidth={1.2} style={{ color: "#a9895e" }} />
            目前沒有符合條件的內容。
          </div>
        )}
      </section>
    </div>
  );
}
