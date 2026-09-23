export const STT_CANONICAL_ORIGIN = "https://stt-003.vercel.app";

export type MetaRecord = {
  title: string;
  description: string;
  image?: string;
  label: string;
  robots?: string;
};

export const FORMAL_META: Record<string, MetaRecord> = {
  "/": {
    title: "STT Governance｜重大決策・企業治理・家族治理",
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
    image: "/visual-bank/stt/cooperation-hero-20260917.png",
    label: "治理委任",
  },
  "/insights": {
    title: "研究與出版｜STT Governance",
    description: "STT Governance 的研究、專欄與出版，聚焦家族與接班、公司治理、AI 與決策治理，以及治理文明。",
    image: "/visual-bank/stt/user-approved-six/columns.png",
    label: "研究與出版",
  },
  "/about": {
    title: "關於 STT Governance｜治理判讀與制度設計",
    description: "STT Governance 是以重大決策、企業與家族治理為核心的治理判讀與制度設計平台。",
    image: "/visual-bank/stt/user-approved-six/about-stt.png",
    label: "關於 STT",
  },
  "/eric-chuang": {
    title: "莊鈞翔博士｜治理判讀與制度設計｜STT Governance",
    description: "莊鈞翔博士為 STT Governance 創辦人與治理總控者，研究與實務聚焦企業策略、公司治理與法遵、家族企業接班及 AI 治理。",
    image: "/images/eric-governance-principal-approved.jpg",
    label: "莊鈞翔博士",
  },
  "/institutions": {
    title: "機構合作｜STT Governance",
    description: "STT Governance 與律師、會計師、信託、家族辦公室、金融及其他專業機構，以治理架構整合跨專業重大案件。",
    image: "/visual-bank/stt/cooperation-hero-20260917.png",
    label: "機構合作",
  },
  "/start": {
    title: "開始治理判讀｜STT Governance",
    description: "先告訴 STT 現在發生了什麼、最不希望接下來發生什麼，以及希望事情最後變成什麼。第一次只整理問題與下一步，不要求大量敏感資料。",
    image: "/images/STT-Governance-Official-Logo.png",
    label: "開始治理判讀",
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

  if (formal) {
    document.title = formal.title;
    upsertMeta('meta[name="description"]', { name: "description", content: formal.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: formal.robots ?? "index,follow" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "STT Governance" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: formal.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: formal.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: normalized === "/eric-chuang" ? "profile" : "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "zh_TW" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${STT_CANONICAL_ORIGIN}${formal.image ?? "/images/STT-Governance-Official-Logo.png"}` });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: formal.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: formal.description });
    upsertCanonical(canonical);
  } else {
    upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex,follow" });
    upsertCanonical(canonical);
  }

  removeSchemas();

  addSchema({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "STT Governance",
    url: `${STT_CANONICAL_ORIGIN}/`,
    logo: `${STT_CANONICAL_ORIGIN}/images/STT-Governance-Official-Logo.png`,
  });

  if (formal && normalized !== "/") {
    addSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "STT Governance",
          item: `${STT_CANONICAL_ORIGIN}/`,
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

  if (normalized === "/eric-chuang") {
    addSchema({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "莊鈞翔博士 Eric Chuang, Ph.D.",
      url: canonical,
      image: `${STT_CANONICAL_ORIGIN}/images/eric-governance-principal-approved.jpg`,
      jobTitle: "STT Governance 創辦人｜治理總控者｜制度設計與重大決策判讀",
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
