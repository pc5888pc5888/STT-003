import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ARTICLE_INDEX, type ArticleDocument } from '../data/articleArchive';
import { SERIES, isoDate } from '../data/contentRegistry';
import NotFound from '../components/NotFound';
import '../styles/article-archive.css';

export function ArticleContent({ article }: { article: ArticleDocument }) {
  const series = SERIES.find(item => item.key === article.series);
  const related = ARTICLE_INDEX.filter(item => item.series === article.series && item.id !== article.id).slice(0, 3);
  return <div className="stt-archive" data-preserve-source>
    <nav className="stt-archive-breadcrumb" aria-label="文章導覽"><Link to="/insights">研究與出版</Link><span aria-hidden="true">／</span><Link to="/columns">專欄與報導</Link><span aria-hidden="true">／</span><Link to={series?.route || '/columns'}>{series?.label}</Link></nav>
    <article aria-labelledby="archive-title">
      <header className="stt-archive-heading">
        <p className="stt-archive-kicker">STT GOVERNANCE · ARTICLES</p>
        <h1 id="archive-title">{article.title}</h1>
        <div className="stt-archive-byline"><Link to="/eric-chuang">{article.author}</Link><span>原刊日期 <time dateTime={isoDate(article.date)}>{article.date}</time></span><span>原刊於 M 傳媒</span></div>
        <p className="stt-archive-provenance">本文於 {article.collectedAt} 收錄於 STT。正文與圖片依原刊版本保存；原文中的日期、觀點及連結保留其發表時的脈絡。</p>
        <a className="stt-archive-source" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">查看 M 傳媒原刊 ↗<span className="stt-library-sr-only">（另開分頁）</span></a>
      </header>
      <figure className="stt-archive-cover"><img src={article.cover.src} alt={article.cover.alt} width={article.cover.width} height={article.cover.height} decoding="async" fetchPriority="high" /></figure>
      {article.toc.length > 1 && <details className="stt-archive-toc"><summary>本文目錄</summary><nav aria-label="本文目錄"><ul>{article.toc.map(item => <li key={item.id}><a href={'#' + item.id}>{item.title}</a></li>)}</ul></nav></details>}
      {article.css && <style>{article.css}</style>}
      <div className="stt-article-body" data-article-id={article.id} dangerouslySetInnerHTML={{ __html: article.html }} />
      <footer className="stt-archive-attribution"><p>作者：{article.author}　原始發表：M 傳媒</p><p>M 傳媒為獨立第三方媒體。STT 收錄作者作品，保留原刊來源與原始發表日期。</p><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">原刊網址：{article.sourceUrl}</a></footer>
    </article>
    <aside className="stt-archive-related" aria-labelledby="related-title"><h2 id="related-title">繼續閱讀</h2><ul>{related.map(item => <li key={item.id}><Link to={item.path}>{item.title}</Link></li>)}</ul><div className="stt-archive-actions"><Link to={series?.route || '/columns'}>返回{series?.label || '專欄總覽'} →</Link><Link to="/books">研究與出版著作 →</Link><Link to="/start">開始治理判讀 →</Link></div></aside>
  </div>;
}

function embeddedArticle(id: string | undefined): ArticleDocument | undefined {
  if (typeof document === 'undefined') return undefined;
  const node = document.getElementById('stt-article-data');
  if (!node?.textContent) return undefined;
  try { const data = JSON.parse(node.textContent) as ArticleDocument; return data.id === id ? data : undefined; } catch { return undefined; }
}
export default function ArticleArchive() {
  const { id } = useParams();
  const known = ARTICLE_INDEX.some(item => item.id === id);
  const [article, setArticle] = useState<ArticleDocument | undefined>(() => embeddedArticle(id));
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    if (!known) return;
    const embedded = embeddedArticle(id);
    if (embedded) { setArticle(embedded); return; }
    const controller = new AbortController();
    fetch(`/data/articles/${id}.json`, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Article unavailable');
      return response.json();
    }).then((data: ArticleDocument) => { if (data.id !== id) throw new Error('Article mismatch'); setArticle(data); }).catch(error => { if (error.name !== 'AbortError') setFailed(true); });
    return () => controller.abort();
  }, [id, known]);
  if (!known) return <NotFound />;
  if (failed) return <section className="stt-archive"><h1>文章暫時無法載入</h1><p>請重新載入此頁，或返回專欄總覽。</p><button onClick={() => window.location.reload()}>重新載入</button><Link to="/columns">返回專欄總覽</Link></section>;
  if (!article || article.id !== id) return <div className="stt-archive" role="status">正在載入文章…</div>;
  return <ArticleContent article={article} />;
}
