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

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <article
      className="stt-editorial-row"
      onClick={() => article.url && window.open(article.url, "_blank", "noopener,noreferrer")}
      role={article.url ? "link" : undefined}
      tabIndex={article.url ? 0 : -1}
      onKeyDown={(event) => {
        if (article.url && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          window.open(article.url, "_blank", "noopener,noreferrer");
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
  const cleanArticles = useMemo(() => sortArticles(articles.filter((article) => !isLegacyExcluded(article))), []);
  const categories = useMemo(() => {
    const values = Array.from(new Set(cleanArticles.map((article) => article.category).filter(Boolean)));
    return values.slice(0, 8);
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

  return (
    <div className="stt-editorial-page">
      <style>{`
        .stt-editorial-page { min-height:100vh; background:#fbfbfa; color:#1a1a1a; }
        .stt-editorial-hero {
          position:relative;
          min-height:560px;
          display:grid;
          align-items:center;
          overflow:hidden;
          border-bottom:1px solid rgba(197,168,128,.22);
          background:linear-gradient(180deg,#fbfbfa 0%,#f7f4ee 100%);
        }
        .stt-editorial-hero::before {
          content:"";
          position:absolute;
          width:620px;
          height:620px;
          right:-40px;
          top:-120px;
          border:1px solid rgba(197,168,128,.28);
          border-radius:50%;
          box-shadow:0 0 0 86px rgba(197,168,128,.06),0 0 0 172px rgba(197,168,128,.04);
        }
        .stt-editorial-hero::after {
          content:"";
          position:absolute;
          right:0;
          bottom:0;
          width:47%;
          height:1px;
          background:linear-gradient(90deg,transparent,#c5a880);
        }
        .stt-editorial-hero-inner {
          position:relative;
          z-index:2;
          width:min(calc(100% - 72px),1280px);
          margin:0 auto;
          padding:88px 0 74px;
        }
        .stt-editorial-eyebrow { margin:0 0 22px; color:#a9895e; font-size:10px; letter-spacing:.24em; text-transform:uppercase; }
        .stt-editorial-title {
          margin:0;
          max-width:780px;
          font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif;
          font-size:clamp(48px,6vw,82px);
          font-weight:400;
          line-height:1.15;
          letter-spacing:.035em;
        }
        .stt-editorial-lead { max-width:680px; margin:30px 0 0; color:#625c54; font-size:15px; line-height:2; }
        .stt-editorial-rule { width:66px; height:1px; margin-top:28px; background:#c5a880; }
        .stt-editorial-tools {
          position:sticky;
          top:76px;
          z-index:30;
          border-bottom:1px solid rgba(197,168,128,.18);
          background:rgba(251,251,250,.94);
          backdrop-filter:blur(18px);
        }
        .stt-editorial-tools-inner {
          width:min(calc(100% - 72px),1280px);
          margin:0 auto;
          min-height:82px;
          display:flex;
          align-items:center;
          gap:22px;
        }
        .stt-editorial-search {
          flex:1;
          max-width:360px;
          height:44px;
          display:flex;
          align-items:center;
          gap:10px;
          padding:0 14px;
          border:1px solid rgba(197,168,128,.24);
          background:#fff;
        }
        .stt-editorial-search input { width:100%; border:0; outline:0; background:transparent; color:#1a1a1a; font-size:13px; }
        .stt-editorial-categories { display:flex; align-items:center; gap:8px; overflow-x:auto; padding:8px 0; }
        .stt-editorial-filter {
          flex:0 0 auto;
          min-height:38px;
          padding:0 14px;
          border:1px solid rgba(197,168,128,.18);
          background:transparent;
          color:#6e675e;
          font-size:11px;
          cursor:pointer;
        }
        .stt-editorial-filter[data-active="true"] { background:#efe7da; border-color:#c5a880; color:#1a1a1a; }
        .stt-editorial-library { width:min(calc(100% - 72px),1280px); margin:0 auto; padding:70px 0 104px; }
        .stt-editorial-library-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin-bottom:32px; }
        .stt-editorial-library-head h2 { margin:0; font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif; font-size:30px; font-weight:400; }
        .stt-editorial-count { color:#a9895e; font-size:10px; letter-spacing:.16em; text-transform:uppercase; }
        .stt-editorial-list { border-top:1px solid rgba(197,168,128,.22); }
        .stt-editorial-row {
          display:grid;
          grid-template-columns:64px minmax(0,1fr) 40px;
          gap:24px;
          align-items:start;
          padding:34px 4px;
          border-bottom:1px solid rgba(197,168,128,.18);
          cursor:pointer;
          transition:background .18s ease,padding .24s ease;
        }
        .stt-editorial-row:hover { background:rgba(197,168,128,.045); padding-left:14px; padding-right:14px; }
        .stt-editorial-index { color:#a9895e; font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif; font-size:14px; }
        .stt-editorial-meta { display:flex; flex-wrap:wrap; gap:14px; color:#a9895e; font-size:9px; letter-spacing:.12em; text-transform:uppercase; }
        .stt-editorial-main h2 { margin:13px 0 0; max-width:900px; font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif; font-size:clamp(22px,2.5vw,32px); font-weight:400; line-height:1.55; }
        .stt-editorial-main p { margin:14px 0 0; max-width:830px; color:#6e675e; font-size:13px; line-height:1.9; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .stt-editorial-arrow { padding-top:30px; color:#a9895e; font-size:22px; transition:transform .2s ease; }
        .stt-editorial-row:hover .stt-editorial-arrow { transform:translateX(6px); }
        .stt-editorial-empty { padding:70px 0; text-align:center; color:#6e675e; }
        @media (max-width:900px) {
          .stt-editorial-tools { top:0; }
          .stt-editorial-tools-inner { align-items:stretch; flex-direction:column; padding:14px 0; }
          .stt-editorial-search { max-width:none; width:100%; }
          .stt-editorial-categories { width:100%; }
        }
        @media (max-width:620px) {
          .stt-editorial-hero-inner,.stt-editorial-tools-inner,.stt-editorial-library { width:calc(100% - 30px); }
          .stt-editorial-hero { min-height:470px; }
          .stt-editorial-row { grid-template-columns:42px minmax(0,1fr) 24px; gap:12px; padding:28px 0; }
          .stt-editorial-main h2 { font-size:22px; }
        }
      `}</style>

      <section className="stt-editorial-hero" data-stt-readable="true">
        <div className="stt-editorial-hero-inner">
          <p className="stt-editorial-eyebrow">04 Press & Insights · Governance Intelligence</p>
          <h1 className="stt-editorial-title">出版與觀點</h1>
          <p className="stt-editorial-lead">
            STT 將法律、企業治理、重大決策與數位治理的判讀，持續沉澱成可以被搜尋、閱讀與引用的知識資產。這裡不是隨機內容牆，而是依時間與主題建立秩序的智庫資料庫。
          </p>
          <div className="stt-editorial-rule" />
        </div>
      </section>

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
          <div className="stt-editorial-count">{filtered.length} entries</div>
        </div>

        {filtered.length > 0 ? (
          <div className="stt-editorial-list">
            {filtered.map((article, index) => <ArticleRow key={article.id} article={article} index={index} />)}
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
