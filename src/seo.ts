import AUTHOR_PROFILE from "./data/authorProfile.json";
import { RETAINED_META } from "./data/retainedRouteMetadata";
import { BOOKS } from "./data/contentRegistry";
export const STT_CANONICAL_ORIGIN = "https://stt-003.vercel.app";

export type MetaRecord = {
  title: string;
  description: string;
  image?: string;
  label: string;
  robots?: string;
  language?: "zh-Hant-TW" | "en";
  locale?: "zh_TW" | "en_US";
};

export const FORMAL_META: Record<string, MetaRecord> = {
  ...RETAINED_META,
  "/": {
    title: "STT Governance｜策略智庫智慧治理",
    description: "STT Governance 協助企業、家族與重大決策者，在結果尚未不可逆之前，釐清問題、證據、權力、責任與選項，建立可承擔、可追溯的治理結構。",
    image: "/visual-bank/stt/user-approved-six/home.png",
    label: "首頁",
  },
  "/problems": {
    title: "你正在面對什麼｜STT Governance",
    description: "從企業重大決策、家族接班、股權治理到 AI 決策責任，先釐清真正問題、權責、證據與不可承擔風險，再決定下一步。",
    image: "/visual-bank/stt/user-approved-six/problems.png",
    label: "你正在面對什麼",
  },
  "/how-stt-works": {
    title: "STT 如何判讀｜治理判讀方法",
    description: "STT 以事件界定、權力與關係人、證據、不可承擔紅線、選項、治理判讀與制度落地七階段，建立重大決策可承擔、可追溯的判斷基礎。",
    image: "/visual-bank/stt/user-approved-six/method.png",
    label: "STT 如何判讀",
  },
  "/engagement": {
    title: "治理委任｜STT Governance",
    description: "了解 STT Governance 如何以治理初步判讀、治理架構設計與年度治理委任三種深度介入重大決策、企業與家族治理。",
    image: "/visual-approved/bank-14.png",
    label: "治理委任",
  },
  "/insights": {
    title: "研究與出版｜STT Governance",
    description: "STT Governance 的研究、專欄與出版，聚焦家族與接班、公司治理、AI 與決策治理，以及治理文明。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "研究與出版",
  },
  ...Object.fromEntries(BOOKS.map((book) => [`/books/${book.slug}`, {
    title: `${book.title}｜STT Publications`,
    description: book.positioning,
    image: book.image,
    label: book.title,
  }])),
  "/research": {
    title: "STT Research Papers｜研究論文典藏｜STT Governance",
    description: "STT Governance 研究論文典藏，整理家族治理、公司治理與法遵、法律服務永續、企業領導與世代接班等研究脈絡。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "研究與論文",
  },
  "/research/legal-service-sustainability": {
    title: "顧客關係管理對服務永續之探討｜STT Research Papers",
    description: "莊鈞翔博士論文研究：以 A 國際法律事務所為例，探討顧客關係管理、信任、服務創新與服務永續。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "顧客關係管理對服務永續之探討",
  },
  "/research/corporate-governance-compliance": {
    title: "企業策略導入公司治理法遵精神｜STT Research Papers",
    description: "研究外部法律顧問團隊如何協助企業將公司治理、法遵、風險管理與企業策略整合進決策。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "企業策略導入公司治理法遵精神",
  },
  "/research/family-business-succession": {
    title: "臺灣企業接班人的佈局規劃與傳承家族價值｜STT Research Papers",
    description: "研究臺灣家族企業接班、接班人培育、接班梯隊、家族價值與家族治理的制度化議題。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "臺灣企業接班人的佈局規劃與傳承家族價值",
  },
  "/research/generational-entrepreneurs": {
    title: "不同世代企業家人格特質、創新能力與經營績效｜STT Research Papers",
    description: "研究不同世代企業家人格特質、創新能力、領導風格與企業經營績效之關係。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "不同世代企業家人格特質、創新能力與企業經營績效",
  },
  "/about": {
    title: "關於 STT Governance｜治理判讀與制度設計",
    description: "STT Governance 是以重大決策、企業與家族治理為核心的治理判讀與制度設計平台。",
    image: "/visual-bank/stt/user-approved-six/about-stt.png",
    label: "關於 STT",
  },
  "/eric-chuang": {
    title: "莊鈞翔博士｜治理判讀與制度設計｜STT Governance",
    description: "莊鈞翔博士為 STT Governance 創辦人暨執行長，研究與實務聚焦企業策略、公司治理與法遵、家族企業接班及 AI 治理。",
    image: "/visual-bank/stt/eric-governance-principal-hero.webp",
    label: "莊鈞翔博士",
  },
  "/institutions": {
    title: "機構合作｜STT Governance",
    description: "STT Governance 與律師、會計師、信託、家族辦公室、金融及其他專業機構，以治理架構整合跨專業重大案件。",
    image: "/visual-approved/secondary-05.png",
    label: "機構合作",
  },
  "/start": {
    title: "開始治理判讀｜STT Governance",
    description: "先告訴 STT 現在發生了什麼、最不希望接下來發生什麼，以及希望事情最後變成什麼。第一次只整理問題與下一步，不要求大量敏感資料。",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "開始治理判讀",
  },
  "/navigator": {
    title: "治理導航｜STT Governance",
    description: "用自然語言描述目前情況，由 STT Governance Navigator 協助辨識較接近的治理主題與正式網站入口；導航不取代正式治理判讀。",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "治理導航",
  },
  "/privacy": {
    title: "隱私與資料使用｜STT Governance",
    description: "STT Governance 網站表單與網站資料使用說明。",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "隱私與資料使用",
    robots: "noindex,follow",
  },
  "/professional-boundary": {
    title: "專業服務與資訊邊界｜STT Governance",
    description: "STT Governance 的治理判讀、制度設計與外部專業協作邊界。",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "專業服務與資訊邊界",
  },
  "/en": {
    title: "STT Governance | Governance Judgment & Institutional Design",
    description: "STT Governance helps enterprises, families and major decision-makers clarify problems, evidence, authority, accountability and viable options before decisions become irreversible.",
    image: "/visual-bank/stt/user-approved-six/home.png",
    label: "Home",
    language: "en",
    locale: "en_US",
  },
  "/en/how-stt-works": {
    title: "How STT Works | Governance Judgment",
    description: "A seven-stage governance judgment process covering event definition, authority, evidence, hard stops, options, judgment and governance implementation.",
    image: "/visual-bank/stt/user-approved-six/method.png",
    label: "How STT Works",
    language: "en",
    locale: "en_US",
  },
  "/en/engagement": {
    title: "Governance Engagement | STT Governance",
    description: "Explore STT Governance engagement through initial governance review, governance architecture and annual governance mandate.",
    image: "/visual-approved/bank-14.png",
    label: "Governance Engagement",
    language: "en",
    locale: "en_US",
  },
  "/en/about": {
    title: "About STT Governance | Governance Judgment & Institutional Design",
    description: "STT Governance is a high-level governance platform for major decisions, enterprise governance and family governance.",
    image: "/visual-bank/stt/user-approved-six/about-stt.png",
    label: "About STT",
    language: "en",
    locale: "en_US",
  },
  "/en/start": {
    title: "Start a Governance Review | STT Governance",
    description: "Describe what is happening, what outcome you most want to avoid, and what state you hope to achieve. The first submission is for problem framing and next-step triage.",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "Start a Governance Review",
    language: "en",
    locale: "en_US",
  },
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => node!.setAttribute(key, value));
}

function upsertCanonical(href: string) {
  let node = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!node) {
    node = document.createElement("link");
    node.rel = "canonical";
    document.head.appendChild(node);
  }
  node.href = href;
}

export const LANGUAGE_PAIRS: Record<string, { zh: string; en: string }> = {
  "/": { zh: "/", en: "/en" },
  "/en": { zh: "/", en: "/en" },
  "/how-stt-works": { zh: "/how-stt-works", en: "/en/how-stt-works" },
  "/en/how-stt-works": { zh: "/how-stt-works", en: "/en/how-stt-works" },
  "/engagement": { zh: "/engagement", en: "/en/engagement" },
  "/en/engagement": { zh: "/engagement", en: "/en/engagement" },
  "/about": { zh: "/about", en: "/en/about" },
  "/en/about": { zh: "/about", en: "/en/about" },
  "/start": { zh: "/start", en: "/en/start" },
  "/en/start": { zh: "/start", en: "/en/start" },
};

function syncLanguageAlternates(pathname: string) {
  document.head.querySelectorAll('link[data-stt-language-alternate="true"]').forEach((node) => node.remove());
  const pair = LANGUAGE_PAIRS[pathname];
  if (!pair) return;
  [
    ["zh-Hant-TW", pair.zh],
    ["en", pair.en],
    ["x-default", pair.zh],
  ].forEach(([hreflang, path]) => {
    const node = document.createElement("link");
    node.rel = "alternate";
    node.hreflang = hreflang;
    node.href = `${STT_CANONICAL_ORIGIN}${path}`;
    node.dataset.sttLanguageAlternate = "true";
    document.head.appendChild(node);
  });
}

const BOOK_SCHEMA = Object.fromEntries(BOOKS.map((book) => [`/books/${book.slug}`, book]));

const RESEARCH_SCHEMA: Record<string, { headline:string; name:string; author:string[]; datePublished:string; about:string[] }> = {
  "/research/legal-service-sustainability": {
    headline: "顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    name: "Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm",
    author: ["莊鈞翔"], datePublished: "2024-01", about: ["顧客關係管理","法律服務","服務永續","信任"]
  },
  "/research/corporate-governance-compliance": {
    headline: "企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
    name: "Integrating the Spirit of Corporate Governance and Legal Compliance into Business Strategy: The Assistance of External Legal Advisory Teams",
    author: ["莊鈞翔"], datePublished: "2024-01", about: ["公司治理","法遵","企業策略","法律風險"]
  },
  "/research/family-business-succession": {
    headline: "臺灣企業接班人的佈局規劃與傳承家族價值",
    name: "Factors for Successful Succession of Taiwanese Family Businesses",
    author: ["紀又綺","莊鈞翔"], datePublished: "2024-01", about: ["家族企業","接班","家族治理","家族價值"]
  },
  "/research/generational-entrepreneurs": {
    headline: "不同世代企業家人格特質、創新能力對企業經營績效之影響－以領導風格為中介變數",
    name: "The Relationship among Personality Traits of Different Generation Entrepreneurs, Innovation Ability and Performance – Leadership Style as an Intermediary Variable",
    author: ["莊鈞翔"], datePublished: "2017-06", about: ["企業家","人格特質","創新能力","領導風格","經營績效"]
  },
};

function removeSchemas() {
  document.head.querySelectorAll('script[data-stt-schema="true"]').forEach((node) => node.remove());
}

function addSchema(data: unknown) {
  const node = document.createElement("script");
  node.type = "application/ld+json";
  node.dataset.sttSchema = "true";
  node.textContent = JSON.stringify(data);
  document.head.appendChild(node);
}

export function applyGovernedMetadata(pathname: string) {
  const normalized = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
  const formal = FORMAL_META[normalized];
  const canonical = `${STT_CANONICAL_ORIGIN}${normalized === "/" ? "/" : normalized}`;
  const isEnglish = formal?.language === "en" || normalized === "/en" || normalized.startsWith("/en/");
  document.documentElement.lang = isEnglish ? "en" : "zh-Hant-TW";
  syncLanguageAlternates(normalized);

  if (formal) {
    document.title = formal.title;
    upsertMeta('meta[name="description"]', { name: "description", content: formal.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: formal.robots ?? "index,follow" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "STT Governance｜策略智庫智慧治理" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: formal.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: formal.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: normalized === "/eric-chuang" ? "profile" : "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: formal.locale ?? (isEnglish ? "en_US" : "zh_TW") });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${STT_CANONICAL_ORIGIN}${formal.image ?? "/images/STT-Governance-Official-Logo.png"}` });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: formal.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: formal.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${STT_CANONICAL_ORIGIN}${formal.image ?? "/images/STT-Governance-Official-Logo.png"}` });
    upsertCanonical(canonical);
  } else {
    upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex,follow" });
    document.head.querySelectorAll('link[rel="canonical"],meta[property^="og:"],meta[name^="twitter:"]').forEach(node=>node.remove());
    document.head.querySelectorAll('link[data-stt-language-alternate="true"]').forEach(node=>node.remove());
  }

  removeSchemas();

  addSchema({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "STT Governance｜策略智庫智慧治理",
    alternateName: "STT Governance",
    url: `${STT_CANONICAL_ORIGIN}/`,
    logo: `${STT_CANONICAL_ORIGIN}/images/STT-Governance-Official-Logo.png`,
  });

  if (formal && normalized !== "/" && normalized !== "/en") {
    addSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEnglish ? "STT Governance" : "STT Governance｜策略智庫智慧治理",
          item: isEnglish ? `${STT_CANONICAL_ORIGIN}/en` : `${STT_CANONICAL_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: formal.label,
          item: canonical,
        },
      ],
    });
  }

  const bookSchema = BOOK_SCHEMA[normalized];
  if (bookSchema) {
    addSchema({
      "@context": "https://schema.org",
      "@type": "Book",
      name: bookSchema.title,
      alternateName: bookSchema.enTitle,
      url: canonical,
      image: `${STT_CANONICAL_ORIGIN}${bookSchema.image}`,
      ...(bookSchema.author ? { author: { "@type": "Person", name: bookSchema.author } } : {}),
      ...(bookSchema.year ? { datePublished: bookSchema.year } : {}),
      ...(bookSchema.publisher ? { publisher: { "@type": "Organization", name: bookSchema.publisher } } : {
        publisher: { "@type": "Organization", name: "STT Governance｜策略智庫智慧治理", url: STT_CANONICAL_ORIGIN + "/" }
      }),
      about: bookSchema.theme,
      description: bookSchema.positioning,
      isPartOf: {
        "@type": "CollectionPage",
        name: "STT Publications Library",
        url: STT_CANONICAL_ORIGIN + "/books",
      },
    });
  }

  const researchSchema = RESEARCH_SCHEMA[normalized];
  if (researchSchema) {
    addSchema({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: researchSchema.headline,
      name: researchSchema.name,
      author: researchSchema.author.map(name => ({ "@type": "Person", name })),
      datePublished: researchSchema.datePublished,
      about: researchSchema.about,
      url: canonical,
      isPartOf: {
        "@type": "CollectionPage",
        name: "STT Research Papers｜研究論文典藏",
        url: STT_CANONICAL_ORIGIN + "/research",
      },
      publisher: {
        "@type": "Organization",
        name: "STT Governance｜策略智庫智慧治理",
        url: STT_CANONICAL_ORIGIN + "/",
      },
    });
  }

  if (normalized === "/eric-chuang") {
    addSchema({
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR_PROFILE.chineseName,
      alternateName: AUTHOR_PROFILE.englishName,
      url: canonical,
      image: `${STT_CANONICAL_ORIGIN}/visual-bank/stt/eric-governance-principal-hero.webp`,
      jobTitle: AUTHOR_PROFILE.positions[0],
      affiliation: {
        "@type": "Organization",
        name: "STT Governance",
        url: `${STT_CANONICAL_ORIGIN}/`,
      },
    });
  }
}

export function isFormalCanonicalRoute(pathname: string) {
  const normalized = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
  return Boolean(FORMAL_META[normalized]);
}
