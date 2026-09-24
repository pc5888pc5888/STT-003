import { useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import bundled from "../../public/data/mmedia-catalog.json";

type Series = "legal" | "humanistic" | "news";
type Theme = "family" | "corporate" | "ai" | "civilization";
type Column = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  authorUrl: string;
  url: string;
  series: Series;
};
type Catalog = { articles: Column[]; syncedAt: string; mode?: "archive" | "bundled" };

const AUTHOR = "https://94m.com.tw/editors/ed55fc";
const PAGE_SIZE = 12;

const THEMES: Array<{ key: Theme; label: string; en: string; description: string; anchor: string }> = [
  {
    key: "family",
    label: "家族與接班",
    en: "Family & Succession",
    description: "收錄家族企業接班、家庭憲法、所有權與控制、失能前治理、家族資產與治理記憶。",
    anchor: "family-succession",
  },
  {
    key: "corporate",
    label: "公司治理",
    en: "Corporate Governance",
    description: "收錄董事會、權責、法遵、重大決策、組織治理與企業制度。",
    anchor: "corporate-governance",
  },
  {
    key: "ai",
    label: "AI 與決策治理",
    en: "AI & Decision Governance",
    description: "收錄 AI 使用邊界、人機主權、證據、責任、平台與企業 AI 治理。",
    anchor: "ai-decision-governance",
  },
  {
    key: "civilization",
    label: "治理文明",
    en: "Governance Civilization",
    description: "收錄內在法遵、決策憲政、制度思想、出版與跨世代治理文本。",
    anchor: "governance-civilization",
  },
];

const INITIAL = bundled as unknown as Catalog;

function normalized(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}

function classifyTheme(article: Column): Theme {
  const text = normalized(`${article.title} ${article.excerpt} ${article.category}`);

  if (/(家族|接班|傳承|繼承|遺產|遺囑|信託|特留份|照顧|高資產)/.test(text)) return "family";
  if (/(人工智慧|ai|deepfake|人機|數位分身|演算法|聊天機器人)/.test(text)) return "ai";
  if (/(公司治理|企業|董事|股東|股權|法遵|勞資|契約|工廠|碳費|淨零|策略|營運|金融|洗錢)/.test(text)) return "corporate";
  return "civilization";
}

function checkedTime(value: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default function Columns() {
  const catalog = INITIAL;
  const [params, setParams] = useSearchParams();
  const listRef = useRef<HTMLElement>(null);

  const selectedTheme = THEMES.find((theme) => theme.key === params.get("theme"));
  const theme = selectedTheme?.key || "all";
  const query = params.get("q") || "";
  const order = params.get("order") === "oldest" ? "oldest" : "newest";

  useEffect(() => {
    document.title = "研究與出版｜STT Governance";
    const description =
      "STT Governance 的研究、專欄與出版，聚焦家族與接班、公司治理、AI 與決策治理，以及治理文明。";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        THEMES.map((item) => [item.key, catalog.articles.filter((article) => classifyTheme(article) === item.key).length]),
      ) as Record<Theme, number>,
    [catalog],
  );

  const filtered = useMemo(() => {
    const q = normalized(query);
    const items = catalog.articles.filter((article) => {
      const matchesTheme = theme === "all" || classifyTheme(article) === theme;
      const matchesQuery = !q || normalized(`${article.title} ${article.excerpt} ${article.category}`).includes(q);
      return matchesTheme && matchesQuery;
    });
    return [...items].sort((a, b) => (order === "oldest" ? 1 : -1) * (a.date.localeCompare(b.date) || a.url.localeCompare(b.url)));
  }, [catalog, theme, query, order]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Number(params.get("page") || 1);
  const page = Math.min(pageCount, Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function update(key: string, value: string, scroll = false) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: key === "q" });
    if (scroll) requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: "start", behavior: "auto" }));
  }

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (number) => number === 1 || number === pageCount || Math.abs(number - page) <= 1,
  );

  return (
    <div className="stt-insights-g6">
      <UnifiedTitleHero
        kicker="RESEARCH & PUBLICATION"
        title="判讀不是臨時形成的意見，而是長期累積的制度研究。"
        lead="STT 將研究、公開專欄與出版依治理主題整理，使每一篇內容都回到同一個問題：在重要決策進入執行之前，人應如何保有判斷主權、制度邊界與可追溯責任。"
        image="/visual-bank/stt/user-approved-six/columns.png"
        imagePosition="center right"
        id="insights-title"
      />

      <section className="stt-insights-themes" aria-label="治理研究四大主題">
        <div className="stt-insights-shell">
          <div className="stt-insights-theme-grid">
            {THEMES.map((item, index) => (
              <article id={item.anchor} key={item.key}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{item.en}</small>
                <h2>{item.label}</h2>
                <p>{item.description}</p>
                <button type="button" onClick={() => update("theme", item.key, true)}>
                  查看此主題內容 <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-insights-evidence" aria-labelledby="insights-evidence-title">
        <div className="stt-insights-shell stt-insights-evidence-grid">
          <div>
            <p className="stt-insights-kicker">RESEARCH EVIDENCE</p>
            <h2 id="insights-evidence-title">研究與出版，分層呈現。</h2>
          </div>
          <div className="stt-insights-evidence-links">
            <Link to="/research">
              <strong>研究與論文</strong>
              <span>四份學術資料依原始文件身分如實呈現。</span>
            </Link>
            <Link to="/books">
              <strong>出版與治理文本</strong>
              <span>出版內容依正式出版狀態呈現，不把研究論文改寫成未核准的新書承諾。</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="stt-insights-source">
        <div className="stt-insights-shell stt-insights-source-grid">
          <div>
            <p className="stt-insights-kicker">SOURCE DISCLOSURE</p>
            <h2>來源要被清楚標示。</h2>
          </div>
          <div>
            <p>
              STT 自有來源標示為 STT Press / STT Intelligence 等實際來源；於 M 傳媒或其他媒體發表的文章必須標示「外部發表／第三方媒體」並連到原始來源，不得將 M 傳媒描述為 STT 旗下、合作自媒體或自有新聞平台。
            </p>
            <a href={AUTHOR} target="_blank" rel="noreferrer">
              M 傳媒｜莊鈞翔博士外部第三方作者頁 <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="stt-insights-tools" aria-label="研究與公開發表篩選">
        <div className="stt-insights-shell stt-insights-tools-inner">
          <label className="stt-insights-search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label="搜尋公開發表"
              value={query}
              onChange={(event) => update("q", event.target.value)}
              placeholder="搜尋標題、主題或關鍵字"
            />
            {query && (
              <button type="button" onClick={() => update("q", "")} aria-label="清除搜尋">
                ×
              </button>
            )}
          </label>
          <div className="stt-insights-tabs" aria-label="選擇治理主題">
            <button type="button" data-active={theme === "all"} onClick={() => update("theme", "")}>
              全部
            </button>
            {THEMES.map((item) => (
              <button
                type="button"
                key={item.key}
                data-active={theme === item.key}
                onClick={() => update("theme", item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-insights-archive" id="external-publications" ref={listRef}>
        <div className="stt-insights-shell">
          <header className="stt-insights-archive-head">
            <div>
              <p className="stt-insights-kicker">EXTERNAL PUBLICATION ARCHIVE</p>
              <h2>{selectedTheme ? selectedTheme.label : "公開判讀與第三方發表"}</h2>
              <p role="status">
                {query ? `搜尋「${query}」 · ` : ""}
                共 {filtered.length} 則
                {filtered.length > 0
                  ? ` · 顯示 ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} 則`
                  : ""}
              </p>
            </div>
            <label>
              排序
              <select value={order} onChange={(event) => update("order", event.target.value)}>
                <option value="newest">最新優先</option>
                <option value="oldest">最早優先</option>
              </select>
            </label>
          </header>

          <div className="stt-insights-results">
            {visible.map((article, index) => {
              const articleTheme = THEMES.find((item) => item.key === classifyTheme(article));
              return (
                <article key={article.url}>
                  <span className="stt-insights-index">
                    {String((page - 1) * PAGE_SIZE + index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="stt-insights-meta">
                      <span>{articleTheme?.label}</span>
                      <time dateTime={article.date.replace(/\//g, "-").replace(" ", "T") + ":00+08:00"}>{article.date}</time>
                      <span>外部發表／第三方媒體 · M 傳媒</span>
                    </div>
                    <h3>
                      <a href={article.url} target="_blank" rel="noreferrer">
                        {article.title}
                      </a>
                    </h3>
                    {article.excerpt && <p>{article.excerpt}</p>}
                    <a className="stt-insights-read" href={article.url} target="_blank" rel="noreferrer">
                      閱讀第三方原文 <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {visible.length === 0 && (
            <div className="stt-insights-empty">
              <p>目前沒有符合條件的內容。</p>
              <button type="button" onClick={() => setParams({})}>清除篩選</button>
            </div>
          )}

          {pageCount > 1 && (
            <nav className="stt-insights-pagination" aria-label="公開發表分頁">
              <button type="button" disabled={page <= 1} onClick={() => update("page", String(page - 1), true)}>
                上一頁
              </button>
              {pageNumbers.map((number, index) => (
                <span key={number}>
                  {index > 0 && number - pageNumbers[index - 1] > 1 && <span aria-hidden="true">…</span>}
                  <button
                    type="button"
                    aria-current={number === page ? "page" : undefined}
                    onClick={() => update("page", String(number), true)}
                  >
                    {number}
                  </button>
                </span>
              ))}
              <button type="button" disabled={page >= pageCount} onClick={() => update("page", String(page + 1), true)}>
                下一頁
              </button>
            </nav>
          )}

          <p className="stt-insights-catalog-note">
            外部文章索引最後核對：{checkedTime(catalog.syncedAt)}（臺灣時間）。標題、分類與摘錄依第三方來源保存，完整內容請閱讀原始來源。
          </p>
        </div>
      </section>
    </div>
  );
}
