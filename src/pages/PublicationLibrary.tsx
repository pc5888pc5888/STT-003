import { useMemo, useRef } from "react";
import { Link, NavLink, Navigate, useLocation, useSearchParams } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import { BOOKS, SERIES, THEMES, WORKS, classifyTheme, isoDate, normalized, seriesHref, sourceLabel } from "../data/contentRegistry";
import "../styles/publication-library.css";

export function PublicationNavigation() {
  return <nav className="stt-library-nav" aria-label="研究與出版分類">
    <NavLink to="/insights" end>總覽</NavLink>
    <NavLink to="/books">電子書與出版</NavLink>
    <NavLink to="/columns" end>全部專欄與報導</NavLink>
    {SERIES.filter(item => item.route).map(item => <NavLink key={item.key} to={seriesHref(item)}>{item.label}</NavLink>)}
  </nav>;
}

function LibraryHeading({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return <header className="stt-library-heading">
    <p className="stt-library-kicker">{kicker}</p>
    <h1>{title}</h1><p className="stt-library-lead">{lead}</p>
  </header>;
}

export function PublicationOverview() {
  const location = useLocation();
  const [params] = useSearchParams();
  // Preserve old shared links without keeping the complete archives on the overview.
  if (location.hash === "#publications") return <Navigate to="/books" replace />;
  if (["theme", "q", "page", "order", "series", "source"].some(key => params.has(key))) return <Navigate to={`/columns${location.search}`} replace />;
  return <div className="stt-library stt-publication-overview">
    <UnifiedTitleHero kicker="RESEARCH & PUBLICATION" title="判讀不是臨時形成的意見，而是長期累積的制度研究。" lead="STT 將研究、公開專欄與出版依治理主題整理，使每一篇內容都回到同一個問題：在重要決策進入執行之前，人應如何保有判斷主權、制度邊界與可追溯責任。" image="/visual-bank/stt/user-approved-six/columns.png" imagePosition="center right" id="insights-title" />
    <div className="stt-library-wrap">
      <PublicationNavigation />
      <section className="stt-library-section" aria-labelledby="reading-paths-title">
        <p className="stt-library-kicker">READING PATHS</p><h2 id="reading-paths-title">從你想閱讀的內容開始。</h2>
        <div className="stt-library-paths">
          <Link className="stt-library-path" to="/books"><span>01 · BOOKS</span><h3>電子書與出版</h3><p>書籍資訊、正式封面與已提供的線上翻閱入口。</p><strong>進入書籍頁 →</strong></Link>
          {SERIES.filter(item => item.route).map((item, index) => <Link className="stt-library-path" key={item.key} to={seriesHref(item)}><span>{String(index + 2).padStart(2, "0")} · {item.key.toUpperCase()}</span><h3>{item.label}</h3><p>{item.description}</p><strong>閱讀作品 →</strong></Link>)}
        </div>
        <Link className="stt-library-text-link" to="/columns">搜尋全部專欄與報導 →</Link>
      </section>
      <section className="stt-library-section" aria-labelledby="themes-title">
        <p className="stt-library-kicker">GOVERNANCE THEMES</p><h2 id="themes-title">也可以沿著治理主題閱讀。</h2>
        <div className="stt-library-themes">{THEMES.map(item => <article id={item.anchor} key={item.key}><p className="stt-library-kicker">{item.en}</p><h3>{item.label}</h3><p>{item.description}</p><Link to={`/columns?theme=${item.key}`}>查看此主題內容 →</Link></article>)}</div>
      </section>
      <section className="stt-library-note" aria-label="發表來源說明"><h2>作品與發表來源，分別標示。</h2><p>書籍、法律專欄、人物故事與報導各有自己的閱讀入口。每篇作品保留作者、日期與原始發表連結；M 傳媒及其他第三方平台的文章，均標示為外部發表。</p></section>
    </div>
  </div>;
}

export function BooksPage() {
  return <div className="stt-library">
    <UnifiedTitleHero
      kicker="STT GOVERNANCE · BOOKS & PUBLICATIONS"
      title="電子書與出版"
      lead="從完整著作閱讀治理思想。書籍資訊與線上翻閱入口集中於此，專欄與報導另有各自的作品頁。"
      image="/visual-bank/stt/user-approved-six/publications.png"
      imagePosition="center right"
      id="books-title"
    />
    <div className="stt-library-wrap">
    <PublicationNavigation />
    <section className="stt-book-grid" aria-label="書籍目錄">
      {BOOKS.map(book => <article className="stt-book-card" key={book.id} id={book.id} data-book-id={book.id}>
        <figure><img src={book.image} alt={book.title} data-publication-cover={book.title} loading="eager" decoding="async" /></figure>
        <div className="stt-book-info"><h2>{book.title}</h2><p lang="en">{book.enTitle}</p>
          {book.previewUrl ? <a className="stt-library-reading-link" href={book.previewUrl} target="_blank" rel="noopener noreferrer">{book.isSample ? "線上試閱" : "線上翻閱"}《{book.title}》<span aria-hidden="true"> ↗</span><span className="stt-library-sr-only">（另開分頁）</span></a> : <p className="stt-library-availability">本書目前未提供線上翻閱連結。</p>}
        </div>
      </article>)}
    </section>
    <div className="stt-library-ending"><Link to="/insights">← 返回研究與出版總覽</Link><Link to="/columns">閱讀專欄與報導 →</Link></div>
  </div></div>;
}

export function PublishedWorksPage({ series: fixedSeries }: { series?: string }) {
  const [params, setParams] = useSearchParams();
  const listRef = useRef<HTMLElement>(null);
  const seriesKey = fixedSeries || params.get("series") || "";
  const selectedSeries = SERIES.find(item => item.key === seriesKey);
  const themeKey = params.get("theme") || "";
  const selectedTheme = THEMES.find(item => item.key === themeKey);
  const query = params.get("q") || "";
  const source = params.get("source") || "";
  const order = params.get("order") === "oldest" ? "oldest" : "newest";
  const publishers = [...new Set(WORKS.flatMap(work => work.sources.map(item => item.publisher)))].sort();
  const filtered = useMemo(() => {
    const needle = normalized(query);
    return WORKS.filter(work => (!seriesKey || work.series === seriesKey) && (!themeKey || classifyTheme(work) === themeKey) && (!source || work.sources.some(item => item.publisher === source)) && (!needle || normalized(`${work.title} ${work.excerpt} ${work.author} ${work.category}`).includes(needle)))
      .sort((a, b) => (order === "oldest" ? 1 : -1) * ((isoDate(a.date) || "").localeCompare(isoDate(b.date) || "") || a.id.localeCompare(b.id)));
  }, [seriesKey, themeKey, source, query, order]);
  const pageSize = 12, pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requested = Number(params.get("page") || 1);
  const page = Math.min(pageCount, Math.max(1, Number.isFinite(requested) ? Math.floor(requested) : 1));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(n => n === 1 || n === pageCount || Math.abs(n - page) <= 1);
  function update(key: string, value: string, scroll = false) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: key === "q" });
    if (scroll) requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: "start", behavior: "auto" }));
  }
  function clearFilters() { setParams({}); }
  return <div className="stt-library"><div className="stt-library-wrap">
    <LibraryHeading kicker="STT GOVERNANCE · PUBLISHED WORKS" title={selectedSeries?.label || "專欄與報導"} lead={selectedSeries?.description || "從系列、治理主題與關鍵字閱讀公開作品。每篇內容均保留其原始發表來源，不以單一媒體作為全部作品的分類。"} />
    <PublicationNavigation />
    {!fixedSeries && <nav className="stt-library-series" aria-label="作品系列"><Link to="/columns" aria-current={!seriesKey ? "page" : undefined}>全部作品</Link>{SERIES.filter(item => WORKS.some(work => work.series === item.key)).map(item => <Link key={item.key} to={seriesHref(item)}>{item.label}</Link>)}</nav>}
    <section className="stt-library-tools" aria-label="作品篩選">
      <label className="stt-library-search">搜尋作品<input type="search" aria-label="搜尋作品" value={query} onChange={event => update("q", event.target.value)} placeholder="標題、作者或關鍵字" /></label>
      <label>治理主題<select aria-label="治理主題" value={themeKey} onChange={event => update("theme", event.target.value)}><option value="">全部主題</option>{THEMES.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}{themeKey && !selectedTheme && <option value={themeKey}>未辨識的主題</option>}</select></label>
      {publishers.length > 1 && <label>發表來源<select aria-label="發表來源" value={source} onChange={event => update("source", event.target.value)}><option value="">全部來源</option>{publishers.map(item => <option key={item} value={item}>{item}</option>)}</select></label>}
      <label>排序<select aria-label="排序" value={order} onChange={event => update("order", event.target.value)}><option value="newest">最新優先</option><option value="oldest">最早優先</option></select></label>
    </section>
    <section className="stt-library-results" ref={listRef} aria-label="作品清單">
      <div className="stt-library-results-head"><p role="status" aria-live="polite" data-result-count={filtered.length}>{selectedTheme ? `${selectedTheme.label} · ` : ""}{query ? `搜尋「${query}」 · ` : ""}共 {filtered.length} 則{filtered.length > 0 ? ` · 顯示 ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} 則` : ""}</p>{(query || themeKey || source || (!fixedSeries && seriesKey)) && <button type="button" onClick={clearFilters}>清除篩選</button>}</div>
      {visible.map(work => <article className="stt-work" key={work.id} data-work-id={work.id} data-series={work.series}>
        <div className="stt-work-meta"><span>{work.author}</span><time dateTime={isoDate(work.date)}>{work.date}</time><span>{SERIES.find(item => item.key === work.series)?.label}</span></div>
        <h2><a href={work.sources[0].url} target="_blank" rel="noopener noreferrer">{work.title}<span className="stt-library-sr-only">（另開原文分頁）</span></a></h2>
        {work.excerpt && <><p className="stt-work-excerpt">{work.excerpt.length > 180 ? work.excerpt.slice(0, 180) + "…" : work.excerpt}</p>{work.excerpt.length > 180 && <details className="stt-work-summary"><summary>展開完整摘要</summary><p>{work.excerpt}</p></details>}</>}
        <div className="stt-work-sources">{work.sources.map(item => <div key={item.url}><span>{sourceLabel(item)}</span><a href={item.url} target="_blank" rel="noopener noreferrer">閱讀原文<span aria-hidden="true"> ↗</span><span className="stt-library-sr-only"> · {item.publisher}（另開分頁）</span></a></div>)}</div>
      </article>)}
      {visible.length === 0 && <div className="stt-library-empty"><h2>目前沒有符合條件的作品。</h2><p>調整關鍵字或清除篩選，即可重新瀏覽本區內容。</p><button type="button" onClick={clearFilters}>重新瀏覽</button></div>}
      {pageCount > 1 && <nav className="stt-library-pagination" aria-label="作品分頁"><button type="button" disabled={page <= 1} onClick={() => update("page", String(page - 1), true)}>上一頁</button>{pages.map((n, i) => <span key={n}>{i > 0 && n - pages[i - 1] > 1 && <span aria-hidden="true">…</span>}<button type="button" aria-label={`第 ${n} 頁`} aria-current={n === page ? "page" : undefined} onClick={() => update("page", String(n), true)}>{n}</button></span>)}<button type="button" disabled={page >= pageCount} onClick={() => update("page", String(page + 1), true)}>下一頁</button></nav>}
    </section>
    <aside className="stt-library-note"><p>此處提供公開作品的標題、摘要與原文入口。第三方發表的完整內容及使用條件，以原始來源為準；本站不因收錄而成為該媒體的所有人。</p>{fixedSeries === "legal" && <Link to="/professional-boundary">專業服務與資訊邊界 →</Link>}</aside>
    <div className="stt-library-ending"><Link to="/insights">← 返回研究與出版總覽</Link><Link to="/books">電子書與出版 →</Link></div>
  </div></div>;
}
