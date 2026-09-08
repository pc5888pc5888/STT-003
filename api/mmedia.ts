const AUTHOR_URL = "https://94m.com.tw/editors/ed55fc";

type Series = "legal" | "humanistic";

type MArticle = {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  url: string;
  series: Series;
  excerpt: string;
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
  return decodeEntities(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(href: string) {
  try {
    return new URL(href, AUTHOR_URL).toString();
  } catch {
    return "";
  }
}

function parseArticles(html: string): MArticle[] {
  const results: MArticle[] = [];
  const seen = new Set<string>();
  const anchor = /<a\b[^>]*href=["']([^"']*\/articles\/[a-zA-Z0-9_-]+[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = anchor.exec(html))) {
    const url = absoluteUrl(match[1]);
    const title = stripTags(match[2]);
    if (!url || seen.has(url) || title.length < 8) continue;
    if (/^(更多|熱門文章|最新文章|專欄|法律|社會|生活|M-news)$/i.test(title)) continue;

    const start = Math.max(0, match.index - 700);
    const end = Math.min(html.length, anchor.lastIndex + 1300);
    const context = stripTags(html.slice(start, end));

    // The author page also contains site-wide popular links. Only retain entries
    // whose local context identifies 莊鈞翔博士, or whose title is explicitly
    // marked as the Humanistic Landscape column.
    const explicitHumanistic = /人文地景產/.test(`${title} ${context}`);
    if (!explicitHumanistic && !/莊\s*鈞\s*翔\s*博士/.test(context)) continue;

    const dateMatch = context.match(/20\d{2}[\/-]\d{1,2}[\/-]\d{1,2}(?:\s+\d{1,2}:\d{2})?/);
    const date = dateMatch?.[0] || "";
    const category = explicitHumanistic ? "人文地景產" : (/法律/.test(context) ? "法律" : "法律策略專欄");
    const idMatch = url.match(/\/articles\/([^/?#]+)/);
    const id = idMatch?.[1] || url;

    results.push({
      id: `mmedia-${id}`,
      title,
      date,
      category,
      author: "莊鈞翔博士",
      url,
      series: explicitHumanistic ? "humanistic" : "legal",
      excerpt: "",
    });
    seen.add(url);
  }

  return results.sort((a, b) => b.date.localeCompare(a.date));
}

export default async function handler(_req: any, res: any) {
  try {
    const response = await fetch(AUTHOR_URL, {
      headers: {
        "user-agent": "STT-Governance-MMedia-Index/1.0",
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      res.status(502).json({ ok: false, source: AUTHOR_URL, articles: [], error: `M Media ${response.status}` });
      return;
    }

    const html = await response.text();
    const articles = parseArticles(html);
    res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ ok: true, source: AUTHOR_URL, syncedAt: new Date().toISOString(), articles });
  } catch (error) {
    res.status(502).json({ ok: false, source: AUTHOR_URL, articles: [], error: error instanceof Error ? error.message : "sync failed" });
  }
}
