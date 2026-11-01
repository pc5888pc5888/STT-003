import legacy from "../../public/data/mmedia-catalog.json";
import additions from "../../public/data/additional-publications.json";

export type Theme = "family" | "corporate" | "ai" | "civilization";
export type PublicationSource = { publisher: string; url: string; relation: "external" | "stt" };
export type PublishedWork = {
  id: string; title: string; excerpt: string; date: string; author: string;
  category: string; series: string; theme?: Theme; sources: PublicationSource[];
};
export type SeriesRecord = { key: string; label: string; description: string; route?: string };
export type BookRecord = {
  id: string;
  slug: string;
  title: string;
  enTitle: string;
  image: string;
  kicker: string;
  publicationType: string;
  theme: string[];
  positioning: string;
  summary: string[];
  coreTopics: Array<{ title: string; description: string }>;
  audience: string[];
  governanceConnection: string;
  previewUrl: string;
  isSample: boolean;
  author?: string;
  year?: string;
  publisher?: string;
};

// Canonical publication registry. Editorial summaries below are derived from each formal publication source;
// missing formal facts are intentionally omitted rather than inferred.
export const BOOKS: BookRecord[] = [
  {
    id: "sustainable-family-governance",
    slug: "sustainable-family-governance",
    title: "2026 永續家族治理實務實錄",
    enTitle: "Special Issue on Sustainable Family Governance Practices",
    image: "/books/2026-sustainable-family-governance.jpg",
    kicker: "STT PUBLICATIONS · FAMILY GOVERNANCE PRACTICES",
    publicationType: "家族治理實務典藏",
    theme: ["家族治理", "企業接班", "跨世代傳承", "制度化治理"],
    positioning: "一部處理家庭資產、失能照護、數位遺產、家族企業接班與代際秩序的家族治理實務出版品。",
    summary: [
      "本書把家庭生活、資產安排、失能風險、數位遺產與家族企業接班放在同一個治理視角下理解。",
      "它不是把接班視為單一人選問題，而是觀察家族、企業與制度如何在跨世代轉換中維持秩序與可延續性。"
    ],
    coreTopics: [
      { title: "家庭資產", description: "把資產安排放回家族治理與代際責任的整體脈絡。" },
      { title: "失能照護", description: "關注主要成員失能後，照護、授權與治理秩序如何持續。" },
      { title: "數位遺產", description: "面對數位資產與數位身分留下來的跨世代治理問題。" },
      { title: "家族企業接班", description: "處理企業交棒、角色轉換與制度承接，而非只處理人選。" },
      { title: "代際秩序", description: "觀察家族與企業如何把價值、責任與制度留給下一代。" }
    ],
    audience: ["家族企業創辦人", "接班世代", "家族企業經營者", "董事與高階管理者", "家族治理與專業顧問"],
    governanceConnection: "在 STT Governance 的知識體系中，本書屬於家族治理實務的年度觀察與制度化素材：把研究所得的接班、價值與權責問題，進一步放進真實家庭與企業所面對的資產、失能、數位遺產與代際秩序。",
    previewUrl: "https://heyzine.com/flip-book/cc95743e15.html",
    isSample: false,
    author: "莊鈞翔博士",
    year: "2026"
  },
  {
    id: "internal-compliance",
    slug: "internal-compliance",
    title: "內在法遵 Internal Compliance",
    enTitle: "Digital Canonical Edition",
    image: "/books/internal-compliance.jpg",
    kicker: "STT PUBLICATIONS · INTERNAL COMPLIANCE",
    publicationType: "治理思想主體著作",
    theme: ["內在法遵", "決策自律", "制度責任", "治理邊界"],
    positioning: "從外在規範的遵守，推進到個人與領導者能否建立一套在缺乏外部監督時仍能運作的內在治理結構。",
    summary: [
      "本書以界線、責任、承諾與後果為核心，討論決策者如何在制度不足、灰色地帶與壓力情境中維持可承擔的判斷。",
      "核心不是把法律語言搬進個人生活，而是追問：當外在規則失效、監督缺位、誘惑當前時，人憑什麼仍做出可被自己承擔的選擇。",
      "全書將「內在法遵」定位為一套自我治理系統，並以三十六個原則建立可持續運作的內在秩序。"
    ],
    coreTopics: [
      { title: "責任不可轉移", description: "只要後果無法由他人代為承擔，責任就不能被流程、工具或角色分工遮蔽。" },
      { title: "內在治理結構", description: "在外在監督之外，建立能維持判斷一致性與行動可信度的自我約束。" },
      { title: "界線與承諾", description: "把承諾、時間、情緒與選擇重新放進可被審視的治理框架。" },
      { title: "可承擔判準", description: "不以效率、勝負或表面合規作為最高價值，而回到結果是否仍可承擔。" }
    ],
    audience: ["企業創辦人", "董事與高階管理者", "重大決策者", "專業顧問", "治理制度設計者"],
    governanceConnection: "《內在法遵》是 STT 對決策責任、制度邊界與可追溯治理的重要思想來源。它先處理人的內在秩序，之後再延伸到企業治理、家族治理與 AI 治理：工具可以協助，責任與最終判斷不能因此消失。",
    previewUrl: "https://heyzine.com/flip-book/1791e68c21.html",
    isSample: true,
    author: "莊鈞翔博士｜Chuang Chun-Hsiang, Ph.D.",
    year: "2026",
    publisher: "策略智庫數位出版｜STT Press · Strategic Think Tank Digital Publishing"
  },
  {
    id: "ai-governance",
    slug: "ai-governance",
    title: "內在法遵 AI Governance",
    enTitle: "AI Governance",
    image: "/books/ai-governance.webp",
    kicker: "STT PUBLICATIONS · AI GOVERNANCE",
    publicationType: "人機治理體系著作",
    theme: ["AI 治理", "判斷主權", "AI 使用邊界", "責任治理"],
    positioning: "把「責任不可外包」的內在原則推進到 AI 環境，建立能力可以委任、但終局主權不能消失的人機治理邊界。",
    summary: [
      "本書不從模型技巧或 Prompt 教學開始，而是處理 AI 進入判斷、資料、人格、行動、平台與財產之後產生的權力關係。",
      "核心問題是：哪些能力可以交給 AI、授權可以到哪裡、何時需要重新檢查，以及哪些結果即使機器做得更快，也不能取消人的反對、退出與救濟。",
      "全書將 AI 治理放在判斷主權、資料授權、代理限制、技術依存、財產與共同體責任的連續治理脈絡中。"
    ],
    coreTopics: [
      { title: "判斷主權", description: "AI 可以提供答案與分析，但人仍須掌握問題如何定義、證據如何取得資格與最終決定權。" },
      { title: "資料與人格主權", description: "治理資料授權、數位痕跡、身分模擬與誰有權代表一個人。" },
      { title: "代理與行動邊界", description: "當 AI 能替人寄信、下單、修改資料或執行任務時，必須建立授權、撤回、停止與接管機制。" },
      { title: "技術依存與退出", description: "組織使用外部平台與模型時，仍需保留重新驗證、替換、退出與最低營運能力。" },
      { title: "證據、異議與責任", description: "AI 流程需要留下來源、版本、修改與決策紀錄，並保留申訴、覆核與責任追溯。" }
    ],
    audience: ["企業決策者", "董事與高階管理者", "AI 導入負責人", "法遵與風險管理者", "治理制度設計者"],
    governanceConnection: "本書把《內在法遵》的責任原則延伸為 STT 的 AI 治理核心：AI 是治理幕僚與能力工具，不是責任主體。人類判斷主權、證據資格、授權邊界、退出能力與終局責任必須被制度化保留。",
    previewUrl: "https://heyzine.com/flip-book/83cae21bf6.html",
    isSample: true,
    author: "莊鈞翔博士｜Chuang Chun-Hsiang, Ph.D.",
    publisher: "策略智庫數位出版｜STT Press · Strategic Think Tank Digital Publishing"
  },
  {
    id: "family-governance",
    slug: "family-governance",
    title: "內在法遵 Family Governance",
    enTitle: "Family Governance",
    image: "/books/family-governance.webp",
    kicker: "STT PUBLICATIONS · FAMILY GOVERNANCE",
    publicationType: "家族治理制度體系著作",
    theme: ["家族治理", "所有權", "經營權", "控制權", "接班", "家族價值"],
    positioning: "以制度工程處理家族的權力、財產、接班、照護、證據與跨世代責任，使傳承不只依賴關係與記憶。",
    summary: [
      "本書把家族治理從單一繼承或接班議題，提升為長期制度工程，處理家族共同體中的權利、責任、所有權、經營權與控制權。",
      "正式體系由六部、三十六章、三十六項家族憲約與二十項治理附錄構成，將判斷延伸成可執行的制度系統。",
      "內容特別重視證據工程、授權邊界、失能與死亡接管、家族憲法、下一代培育、爭議修復與長期維運。"
    ],
    coreTopics: [
      { title: "權力與財產治理", description: "區分所有權、經營權、控制權與家族成員角色，避免關係取代制度。" },
      { title: "接班與世代承接", description: "把下一代培育、授權、退出與交接納入長期治理安排。" },
      { title: "家族憲約與制度文件", description: "以家族憲約、文件系統與版本治理保存共同規則與制度記憶。" },
      { title: "證據與真實意願", description: "讓出資、照護、承諾、授權與意願可被後來者查核，而不依賴單一人的記憶。" },
      { title: "危機、爭議與長期維運", description: "建立危機接管、爭議修復、稽核、更新與終局治理機制。" }
    ],
    audience: ["家族企業創辦人", "家族股東", "接班世代", "家族企業董事與高階管理者", "家族治理專業顧問"],
    governanceConnection: "本書是 STT 家族治理制度層的體系化著作。它把研究中的接班與家族價值，進一步轉譯成所有權、經營權、控制權、證據、授權、危機與長期維運等制度模組；與《2026 永續家族治理實務實錄》的實務觀察定位不同。",
    previewUrl: "https://heyzine.com/flip-book/aeb7bf6cf5.html",
    isSample: true,
    author: "莊鈞翔博士｜Chuang Chun-Hsiang, Ph.D."
  },
];

export const THEMES: Array<{ key: Theme; label: string; en: string; description: string; anchor: string }> = [
  { key: "family", label: "家族與接班", en: "Family & Succession", description: "收錄家族企業接班、家庭憲法、所有權與控制、失能前治理、家族資產與治理記憶。", anchor: "family-succession" },
  { key: "corporate", label: "公司治理", en: "Corporate Governance", description: "收錄董事會、權責、法遵、重大決策、組織治理與企業制度。", anchor: "corporate-governance" },
  { key: "ai", label: "AI 與決策治理", en: "AI & Decision Governance", description: "收錄 AI 使用邊界、人機主權、證據、責任、平台與企業 AI 治理。", anchor: "ai-decision-governance" },
  { key: "civilization", label: "治理文明", en: "Governance Civilization", description: "收錄內在法遵、決策憲政、制度思想、出版與跨世代治理文本。", anchor: "governance-civilization" },
];

export const SERIES: SeriesRecord[] = [
  { key: "legal", label: "法律專欄", description: "從法律、制度與社會事件，理解權利、義務、證據與責任。", route: "/columns/legal" },
  { key: "humanistic", label: "人文地景產專欄", description: "閱讀已公開的人物、地方與產業故事。這裡呈現專欄作品，不是採訪前的二十題填答程序。", route: "/columns/humanistic" },
  { key: "news", label: "報導與其他發表", description: "收錄既有報導與其他公開發表，依每篇作品標示原始來源。", route: "/columns/news" },
  ...(additions.series as SeriesRecord[]),
];

const sourceName = (value: string) => value === "M傳媒" ? "M 傳媒" : value;
export const WORKS: PublishedWork[] = [
  ...legacy.articles.map(article => ({
    id: article.id, title: article.title, excerpt: article.excerpt, date: article.date,
    author: article.author, category: article.category, series: article.series,
    sources: [{ publisher: sourceName(article.source || legacy.source.publisher), url: article.url, relation: "external" as const }],
  })),
  ...(additions.works as PublishedWork[]),
];

export const CONTENT_META = {
  "/books": { title: "電子書與出版｜STT Governance", label: "電子書與出版", description: "STT Governance 的電子書與治理出版，收錄書籍資訊、正式封面與已提供的線上閱讀入口。", image: "/books/internal-compliance.jpg" },
  "/columns": { title: "專欄與報導｜STT Governance", label: "專欄與報導", description: "依系列與治理主題閱讀 STT Governance 的公開專欄與報導，逐篇標示作者、發表日期與原始來源。" },
  "/columns/legal": { title: "法律專欄｜STT Governance", label: "法律專欄", description: "法律專欄的獨立作品索引，依原始發表資料保留標題、作者、日期、摘要與原文連結。" },
  "/columns/humanistic": { title: "人文地景產專欄｜STT Governance", label: "人文地景產專欄", description: "人文地景產專欄的公開作品，呈現人物、地方與產業故事；與採訪前的二十題受訪程序分開。" },
  "/columns/news": { title: "報導與其他發表｜STT Governance", label: "報導與其他發表", description: "報導與其他公開發表的獨立索引，依各篇作品標示原始發表平台、作者、日期與原文連結。" },
};

export function normalized(value: string) { return value.normalize("NFKC").toLowerCase().replace(/\s+/g, ""); }
export function classifyTheme(work: PublishedWork): Theme {
  if (work.theme) return work.theme;
  const text = normalized(`${work.title} ${work.excerpt} ${work.category}`);
  if (/(家族|接班|傳承|繼承|遺產|遺囑|信託|特留份|照顧|高資產)/.test(text)) return "family";
  if (/(人工智慧|ai|deepfake|人機|數位分身|演算法|聊天機器人)/.test(text)) return "ai";
  if (/(公司治理|企業|董事|股東|股權|法遵|勞資|契約|工廠|碳費|淨零|策略|營運|金融|洗錢)/.test(text)) return "corporate";
  return "civilization";
}
export function seriesHref(series: SeriesRecord) { return series.route || `/columns?series=${encodeURIComponent(series.key)}`; }
export function sourceLabel(source: PublicationSource) { return `${source.relation === "stt" ? "STT 發表" : "外部發表／第三方媒體"} · ${source.publisher}`; }
export function isoDate(value: string) {
  const match = value.match(/^(\d{4})[/-](\d{2})[/-](\d{2})(?:[ T](\d{2}):(\d{2}))?/);
  return match ? `${match[1]}-${match[2]}-${match[3]}${match[4] ? `T${match[4]}:${match[5]}:00+08:00` : ""}` : undefined;
}

// Imported by the build-time metadata registry as well as the pages: invalid public
// additions stop the build instead of silently creating empty or misattributed cards.
function validateRegistry() {
  const seriesKeys = new Set<string>();
  for (const item of SERIES) {
    if (!/^[a-z0-9-]+$/.test(item.key) || !item.label?.trim() || !item.description?.trim() || seriesKeys.has(item.key)) throw new Error("Invalid or duplicate publication series");
    seriesKeys.add(item.key);
  }
  const ids = new Set<string>();
  const urls = new Set<string>();
  for (const work of WORKS) {
    if (!work.id || ids.has(work.id) || !work.title?.trim() || !work.author?.trim() || !seriesKeys.has(work.series) || !isoDate(work.date) || !Array.isArray(work.sources) || !work.sources.length) throw new Error(`Invalid publication: ${work.id}`);
    if (work.theme && !THEMES.some(item => item.key === work.theme)) throw new Error(`Invalid theme: ${work.id}`);
    ids.add(work.id);
    for (const source of work.sources) {
      const url = new URL(source.url);
      if (url.protocol !== "https:" || !source.publisher?.trim() || !["stt", "external"].includes(source.relation) || urls.has(source.url)) throw new Error(`Invalid/duplicate source: ${work.id}`);
      if (/(^|\.)94m\.com\.tw$/.test(url.hostname) && source.relation !== "external") throw new Error("M Media must remain external");
      urls.add(source.url);
    }
  }
}
validateRegistry();
