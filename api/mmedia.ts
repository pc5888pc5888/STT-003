const AUTHOR_URL = "https://94m.com.tw/editors/ed55fc";
const MAX_PUBLIC_PAGES = 40;
const PAGE_BATCH = 6;

type Series = "legal" | "humanistic";

type MArticle = {
  id: string;
  title: string;
  date: string;
  category: "法律" | "社會";
  author: string;
  url: string;
  series: Series;
  excerpt: string;
};

type PendingArticle = {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  url: string;
  reason: string;
};

type ParsedPage = {
  articles: MArticle[];
  pending: PendingArticle[];
};

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripTags(value: string) {
  return decodeEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(href: string) {
  try {
    const url = new URL(href, AUTHOR_URL);
    if (url.hostname !== "94m.com.tw" || !/^\/articles\/[a-zA-Z0-9_-]+/.test(url.pathname)) return "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function articleId(url: string) {
  return url.match(/\/articles\/([^/?#]+)/)?.[1] || url;
}

function categoryBeforeAnchor(html: string, anchorIndex: number) {
  const before = html.slice(Math.max(0, anchorIndex - 1600), anchorIndex);
  const categoryAnchor = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  let category = "";
  while ((match = categoryAnchor.exec(before))) {
    const label = stripTags(match[1]);
    if (label === "法律" || label === "社會") category = label;
  }
  return category;
}

function parseAuthorPage(html: string): ParsedPage {
  const articles: MArticle[] = [];
  const pending: PendingArticle[] = [];
  const seen = new Set<string>();
  const anchor = /<a\b[^>]*href=["']([^"']*\/articles\/[a-zA-Z0-9_-]+[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = anchor.exec(html))) {
    const url = absoluteUrl(match[1]);
    const title = stripTags(match[2]);
    if (!url || seen.has(url) || title.length < 8) continue;
    if (/^(更多|熱門文章|最新文章|專欄|法律|社會|生活|M-news)$/i.test(title)) continue;

    const after = stripTags(html.slice(anchor.lastIndex, Math.min(html.length, anchor.lastIndex + 1200)));
    const nearby = stripTags(html.slice(Math.max(0, match.index - 300), Math.min(html.length, anchor.lastIndex + 900)));

    // Author identity is the first gate. Site-wide popular links are deliberately excluded.
    if (!/莊\s*鈞\s*翔\s*博士/.test(after) && !/莊\s*鈞\s*翔\s*博士/.test(nearby)) continue;

    const date = after.match(/20\d{2}[\/-]\d{1,2}[\/-]\d{1,2}(?:\s+\d{1,2}:\d{2})?/)?.[0] || "";
    const category = categoryBeforeAnchor(html, match.index);
    const id = articleId(url);

    if (category === "法律") {
      articles.push({
        id: `mmedia-${id}`,
        title,
        date,
        category: "法律",
        author: "莊鈞翔博士",
        url,
        series: "legal",
        excerpt: "",
      });
    } else if (category === "社會") {
      articles.push({
        id: `mmedia-${id}`,
        title,
        date,
        category: "社會",
        author: "莊鈞翔博士",
        url,
        series: "humanistic",
        excerpt: "",
      });
    } else {
      pending.push({
        id: `mmedia-${id}`,
        title,
        date,
        category: category || "未辨識",
        author: "莊鈞翔博士",
        url,
        reason: "莊博士專區文章，但 M傳媒類別不是「法律」或「社會」，不自動猜測系列。",
      });
    }

    seen.add(url);
  }

  return { articles, pending };
}

async function fetchHtml(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "STT-Governance-MMedia-Author-Index/2.0",
        accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`M Media ${response.status} @ ${url}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function mergePage(target: Map<string, MArticle>, pendingTarget: Map<string, PendingArticle>, page: ParsedPage) {
  let added = 0;
  for (const item of page.articles) {
    if (!target.has(item.url)) added += 1;
    target.set(item.url, item);
    pendingTarget.delete(item.url);
  }
  for (const item of page.pending) {
    if (!target.has(item.url)) pendingTarget.set(item.url, item);
  }
  return added;
}

async function crawlAuthorZone() {
  const articles = new Map<string, MArticle>();
  const pending = new Map<string, PendingArticle>();
  const fetchedPages: number[] = [];

  const firstHtml = await fetchHtml(AUTHOR_URL);
  mergePage(articles, pending, parseAuthorPage(firstHtml));
  fetchedPages.push(1);

  // Probe page=2. If the public author page ignores pagination and returns page 1 again,
  // stop immediately instead of hammering M傳媒.
  let page2Added = 0;
  try {
    const secondHtml = await fetchHtml(`${AUTHOR_URL}?page=2`);
    page2Added = mergePage(articles, pending, parseAuthorPage(secondHtml));
    fetchedPages.push(2);
  } catch {
    page2Added = 0;
  }

  if (page2Added > 0) {
    let page = 3;
    let consecutiveEmptyBatches = 0;

    while (page <= MAX_PUBLIC_PAGES && consecutiveEmptyBatches < 1) {
      const numbers = Array.from({ length: Math.min(PAGE_BATCH, MAX_PUBLIC_PAGES - page + 1) }, (_, index) => page + index);
      const batch = await Promise.all(
        numbers.map(async (number) => {
          try {
            const html = await fetchHtml(`${AUTHOR_URL}?page=${number}`);
            return { number, parsed: parseAuthorPage(html) };
          } catch {
            return { number, parsed: { articles: [], pending: [] } as ParsedPage };
          }
        }),
      );

      let batchAdded = 0;
      for (const item of batch) {
        fetchedPages.push(item.number);
        batchAdded += mergePage(articles, pending, item.parsed);
      }
      consecutiveEmptyBatches = batchAdded === 0 ? consecutiveEmptyBatches + 1 : 0;
      page += PAGE_BATCH;
    }
  }

  const list = Array.from(articles.values()).sort((a, b) => b.date.localeCompare(a.date));
  const pendingList = Array.from(pending.values()).sort((a, b) => b.date.localeCompare(a.date));
  return {
    articles: list,
    pending: pendingList,
    fetchedPages: [...new Set(fetchedPages)].sort((a, b) => a - b),
    paginationDetected: page2Added > 0,
  };
}

export default async function handler(_req: any, res: any) {
  try {
    const crawl = await crawlAuthorZone();
    const legal = crawl.articles.filter((item) => item.series === "legal").length;
    const humanistic = crawl.articles.filter((item) => item.series === "humanistic").length;

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=21600");
    res.status(200).json({
      ok: true,
      source: AUTHOR_URL,
      sourcePolicy: "author-first",
      classificationPolicy: {
        legal: "M傳媒莊鈞翔博士專區 + 類別「法律」",
        humanistic: "M傳媒莊鈞翔博士專區 + 類別「社會」",
        other: "待確認，不自動猜測",
      },
      syncedAt: new Date().toISOString(),
      stats: {
        pagesFetched: crawl.fetchedPages.length,
        pageNumbers: crawl.fetchedPages,
        paginationDetected: crawl.paginationDetected,
        totalClassified: crawl.articles.length,
        legal,
        humanistic,
        pending: crawl.pending.length,
      },
      articles: crawl.articles,
      pending: crawl.pending,
    });
  } catch (error) {
    res.status(502).json({
      ok: false,
      source: AUTHOR_URL,
      sourcePolicy: "author-first",
      articles: [],
      pending: [],
      error: error instanceof Error ? error.message : "sync failed",
    });
  }
}
