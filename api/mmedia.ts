import bundled from "../public/data/mmedia-catalog.json" with { type: "json" };
const AUTHOR = "https://94m.com.tw/editors/ed55fc";
const ARCHIVE = "https://raw.githubusercontent.com/pc5888pc5888/STT-003/refs/heads/rebuild/stt-approved-white-gold-v1/public/data/mmedia-catalog.json";
const EXPECTED_BASELINE = "6bc22afe721807e841c05643003d935b33f5d11c6e170572f148943c57993b20";
const SERIES: Record<string, string> = { "法律": "legal", "社會": "humanistic", "熱門社會": "humanistic", "M-news": "news", "M-NEWS": "news", "Ｍ-NEWS": "news" };
type Article = { id: string; url: string; title: string; excerpt: string; date: string; author: string; authorUrl: string; category: string; series: string; [key: string]: unknown };
type Catalog = { source: { authorUrl: string }; baseline: { canonicalSha256: string }; syncedAt: string; articles: Article[]; pending?: unknown[]; [key: string]: unknown };
function valid(value: unknown): value is Catalog {
  if (!value || typeof value !== "object") return false;
  const c = value as Catalog;
  return c.source?.authorUrl === AUTHOR && c.baseline?.canonicalSha256 === EXPECTED_BASELINE && Number.isFinite(Date.parse(c.syncedAt))
    && Array.isArray(c.articles) && c.articles.length > 0 && c.articles.length <= 10000
    && c.articles.every(a => a && typeof a === "object" && a.authorUrl === AUTHOR && typeof a.author === "string" && a.author.replace(/\s/g, "") === "莊鈞翔博士"
      && typeof a.title === "string" && !!a.title.trim() && typeof a.excerpt === "string" && typeof a.id === "string"
      && /^https:\/\/94m\.com\.tw\/articles\/[A-Za-z0-9_-]+$/.test(a.url) && /^20\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(a.date)
      && ["legal", "humanistic", "news"].includes(a.series) && SERIES[a.category] === a.series)
    && new Set(c.articles.map(a => a.url)).size === c.articles.length;
}
export default async function handler(req: { method?: string }, res: any) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") { res.setHeader("Allow", "GET, HEAD"); return res.status(405).json({ ok: false }); }
  const seed = bundled as unknown as Catalog;
  let catalog = seed; let mode: "archive" | "bundled" = "bundled";
  try {
    const response = await fetch(ARCHIVE, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(6500) });
    if (!response.ok) throw new Error("Archive unavailable");
    const incoming: unknown = await response.json();
    if (!valid(incoming) || Date.parse(incoming.syncedAt) < Date.parse(seed.syncedAt)) throw new Error("Invalid or older archive");
    const records = new Map(seed.articles.map(a => [a.url, a]));
    for (const article of incoming.articles) records.set(article.url, article);
    catalog = { ...incoming, articles: [...records.values()].sort((a, b) => b.date.localeCompare(a.date) || b.url.localeCompare(a.url)) };
    mode = "archive";
  } catch {
    // A request failure is not a deletion instruction. Retain the verified archive.
  }
  const articles = catalog.articles;
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-STT-Catalog-Mode", mode);
  return res.status(200).json({ ...catalog, ok: true, mode, sourcePolicy: "verified-author-and-exact-category", stats: {
    total: articles.length, uniqueUrls: new Set(articles.map(a => a.url)).size,
    legal: articles.filter(a => a.series === "legal").length, humanistic: articles.filter(a => a.series === "humanistic").length,
    news: articles.filter(a => a.series === "news").length, pending: catalog.pending?.length || 0,
  } });
}
