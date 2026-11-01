import { useMemo, useRef } from "react";
import { Link, NavLink, Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import NotFound from "../components/NotFound";
import { BOOKS, SERIES, THEMES, WORKS, classifyTheme, isoDate, normalized, seriesHref, sourceLabel } from "../data/contentRegistry";
import "../styles/publication-library.css";

export function PublicationNavigation() {
  return <nav className="stt-library-nav" aria-label="研究與出版分類">
    <NavLink to="/insights" end>總覽</NavLink>
    <NavLink to="/research">研究與論文</NavLink>
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
        <p className="stt-library-kicker">CONTENT TYPES</p><h2 id="reading-paths-title">依內容類型閱讀。</h2>
        <div className="stt-library-paths">
          <Link className="stt-library-path" to="/research"><span>01 · RESEARCH</span><h3>研究與論文</h3><p>STT Research Papers｜研究論文典藏，建立研究、方法、制度與治理實務的可信脈絡。</p><strong>閱讀研究介紹 →</strong></Link>
          <Link className="stt-library-path" to="/books"><span>02 · PUBLICATIONS</span><h3>出版著作</h3><p>STT Publications Library 將治理思想、制度方法與正式出版品整理為可長期閱讀的知識資產。</p><strong>進入出版著作 →</strong></Link>
          <Link className="stt-library-path" to="/columns"><span>03 · INSIGHTS</span><h3>專欄與觀點</h3><p>法律、人文、治理與外部發表作品，依主題與來源整理。</p><strong>閱讀專欄與觀點 →</strong></Link>
        </div>
        <Link className="stt-library-text-link" to="/columns">搜尋全部專欄與報導 →</Link>
      </section>
      <section className="stt-library-section" aria-labelledby="themes-title">
        <p className="stt-library-kicker">GOVERNANCE THEMES</p><h2 id="themes-title">依治理主題閱讀。</h2>
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
      lead="STT Publications Library 將正式出版品整理為可理解、可追溯的治理知識資產。先理解一本書處理的治理問題與思想位置，再進入正式線上翻閱或試閱。"
      image="/visual-bank/stt/user-approved-six/publications.png"
      imagePosition="center right"
      id="books-title"
    />
    <div className="stt-library-wrap">
    <PublicationNavigation />
    <section className="stt-publications-intro" aria-labelledby="publications-library-title">
      <p className="stt-library-kicker">STT PUBLICATIONS LIBRARY</p>
      <h2 id="publications-library-title">正式出版資產</h2>
      <p>出版著作負責把研究、治理思想與制度方法整合成可被長期閱讀的知識體系；與研究論文的證據與研究命題層不同，但維持相同的內容治理與視覺位階。</p>
    </section>
    <section className="stt-book-grid stt-publication-assets" aria-label="書籍目錄">
      {BOOKS.map(book => <article className="stt-book-card stt-publication-card" key={book.id} id={book.id} data-book-id={book.id}>
        <figure><img src={book.image} alt={book.title} data-publication-cover={book.title} loading="eager" decoding="async" /></figure>
        <div className="stt-book-info">
          <p className="stt-book-type">{book.publicationType}</p>
          <h2>{book.title}</h2>
          <p lang="en" className="stt-book-en">{book.enTitle}</p>
          <p className="stt-book-positioning">{book.positioning}</p>
          <p className="stt-book-summary">{book.summary.slice(0,2).join(" ")}</p>
          <div className="stt-book-tags" aria-label="治理主題">{book.theme.map(item=><span key={item}>{item}</span>)}</div>
          <div className="stt-book-card-actions">
            <Link className="stt-publication-primary-link" to={"/books/"+book.slug}>閱讀本書介紹 →</Link>
            <a className="stt-publication-secondary-link" href={book.previewUrl} target="_blank" rel="noopener noreferrer">{book.isSample ? "快速進入線上試閱 ↗" : "快速進入線上翻閱 ↗"}</a>
          </div>
        </div>
      </article>)}
    </section>
    <div className="stt-library-ending"><Link to="/insights">← 返回研究與出版總覽</Link><Link to="/research">閱讀研究與論文 →</Link></div>
  </div></div>;
}

export function BookDetailPage() {
  const { slug = "" } = useParams();
  const book = BOOKS.find(item => item.slug === slug);
  if (!book) return <NotFound />;
  const readingLabel = book.isSample ? "線上試閱本書" : "線上翻閱本書";
  return <div className="stt-library stt-publication-detail">
    <section className={"stt-publication-hero book-"+book.slug}>
      <div className="stt-publication-hero__inner">
        <div className="stt-publication-hero__copy">
          <p className="stt-library-kicker">STT PUBLICATIONS / STT GOVERNANCE LIBRARY</p>
          <p className="stt-book-type">{book.publicationType}</p>
          <h1>{book.title}</h1>
          <p className="stt-publication-en" lang="en">{book.enTitle}</p>
          <dl className="stt-publication-meta">
            {book.author && <div><dt>作者／編著</dt><dd>{book.author}</dd></div>}
            {book.year && <div><dt>出版年份</dt><dd>{book.year}</dd></div>}
            {book.publisher && <div><dt>出版者</dt><dd>{book.publisher}</dd></div>}
          </dl>
          <div className="stt-book-tags" aria-label="治理主題">{book.theme.map(item=><span key={item}>{item}</span>)}</div>
          <p className="stt-publication-thesis">{book.positioning}</p>
          <div className="stt-publication-hero-actions">
            <a className="stt-publication-cta" href={book.previewUrl} target="_blank" rel="noopener noreferrer">{readingLabel} ↗</a>
            <Link to="/books">返回出版總覽 →</Link>
          </div>
        </div>
        <figure className="stt-publication-cover"><img src={book.image} alt={book.title+"正式封面"} /></figure>
      </div>
    </section>

    <div className="stt-library-wrap stt-publication-body">
      <PublicationNavigation />
      <section aria-labelledby="book-problem-title">
        <p className="stt-library-kicker">PUBLICATION QUESTION</p>
        <h2 id="book-problem-title">這本書在處理什麼</h2>
        {book.summary.map(p=><p key={p}>{p}</p>)}
      </section>

      <section aria-labelledby="book-core-title">
        <p className="stt-library-kicker">CORE READING THEMES</p>
        <h2 id="book-core-title">核心內容</h2>
        <div className="stt-publication-topics">{book.coreTopics.map((topic,index)=><article key={topic.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{topic.title}</h3><p>{topic.description}</p></article>)}</div>
      </section>

      <section aria-labelledby="book-audience-title">
        <p className="stt-library-kicker">READER CONTEXT</p>
        <h2 id="book-audience-title">適合誰閱讀</h2>
        <div className="stt-publication-audience">{book.audience.map(item=><span key={item}>{item}</span>)}</div>
      </section>

      <section className="stt-publication-governance" aria-labelledby="book-governance-title">
        <p className="stt-library-kicker">FROM PUBLICATION TO GOVERNANCE</p>
        <h2 id="book-governance-title">從本書到 STT Governance</h2>
        <p>{book.governanceConnection}</p>
        <p className="stt-publication-chain">研究 → 思想 → 出版 → 方法 → 制度 → 治理實務</p>
      </section>

      <section className="stt-publication-reading" aria-labelledby="book-reading-title">
        <p className="stt-library-kicker">OFFICIAL ONLINE READING</p>
        <h2 id="book-reading-title">正式線上閱讀</h2>
        <p>{book.isSample ? "本頁連結為正式線上試閱版本。" : "本頁連結為正式線上翻閱版本。"} 閱讀介面由 Heyzine 提供，內容仍屬本出版品之正式{book.isSample ? "試閱" : "閱讀"}版本。本站不提供 PDF 下載。</p>
        <div className="stt-publication-reading-actions">
          <a className="stt-publication-cta" href={book.previewUrl} target="_blank" rel="noopener noreferrer">{readingLabel} ↗</a>
          <a href={book.previewUrl} target="_blank" rel="noopener noreferrer">另開閱讀視窗 ↗</a>
        </div>
        <div className="stt-publication-reader"><iframe title={book.title+" 線上閱讀"} src={book.previewUrl} loading="lazy" allowFullScreen /></div>
      </section>

      <section aria-labelledby="book-related-title">
        <p className="stt-library-kicker">RELATED GOVERNANCE ASSETS</p>
        <h2 id="book-related-title">延伸閱讀</h2>
        <div className="stt-publication-related">
          {book.slug === "sustainable-family-governance" && <>
            <Link to="/research/family-business-succession">相關研究｜臺灣企業接班人的佈局規劃與傳承家族價值 →</Link>
            <Link to="/books/family-governance">相關出版｜內在法遵 Family Governance →</Link>
            <Link to="/problems#family-succession">相關治理主題｜家族與接班 →</Link>
          </>}
          {book.slug === "internal-compliance" && <>
            <Link to="/research/corporate-governance-compliance">相關研究｜企業策略導入公司治理法遵精神 →</Link>
            <Link to="/books/ai-governance">相關出版｜內在法遵 AI Governance →</Link>
            <Link to="/how-stt-works">相關治理主題｜STT 如何判讀 →</Link>
          </>}
          {book.slug === "ai-governance" && <>
            <Link to="/books/internal-compliance">思想來源｜內在法遵 Internal Compliance →</Link>
            <Link to="/columns?theme=ai">相關專欄｜AI 與決策治理 →</Link>
            <Link to="/problems#ai-decision-governance">相關治理主題｜AI 與決策治理 →</Link>
          </>}
          {book.slug === "family-governance" && <>
            <Link to="/research/family-business-succession">相關研究｜臺灣企業接班人的佈局規劃與傳承家族價值 →</Link>
            <Link to="/books/sustainable-family-governance">相關出版｜2026 永續家族治理實務實錄 →</Link>
            <Link to="/problems#family-succession">相關治理主題｜家族與接班 →</Link>
          </>}
        </div>
      </section>

      <div className="stt-library-ending"><Link to="/books">← 返回出版總覽</Link><Link to="/research">研究與論文 →</Link></div>
    </div>
  </div>;
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
