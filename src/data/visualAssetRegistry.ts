export const gcsdaVisualAssets = {
  home: { source: '20', role: '創會初心／永續治理／跨域連結', treatment: 'hero-inspiration' },
  about: { source: '22', role: 'Institutional Identity／學會正典', treatment: 'hero-inspiration' },
  governance: { source: '18', role: '章程／理監事權責／正式制度卷冊', treatment: 'hero-inspiration' },
  council: { source: '19', role: '策略治理聯席會／正式機構文件', treatment: 'hero-inspiration' },
  membership: { source: '21', role: '會員／入會／申請與會務文件', treatment: 'hero-inspiration' },
  events: { source: '24', role: '會員大會／理監事會／講座典藏', treatment: 'hero-inspiration' },
  knowledge: { source: '26', role: '知識／研究／學術交流', treatment: 'hero-inspiration' },
  charter: { source: '18', role: '章程與公告', treatment: 'secondary-inspiration' },
} as const;

export const gcsdaThematicGoldElements = {
  home: { show: true, element: 'Institutional Emblem', zh: '學會制度徽件', placement: 'hero-scene-secondary', scale: '5–7% hero width', note: '以正式機構感為主，不與 GCSDA Logo 競爭，也不做大型金色雕塑。' },
  about: { show: true, element: 'Institutional Seal', zh: '學會正典章', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵組織身分、宗旨與制度正典。' },
  governance: { show: true, element: 'Charter Seal', zh: '章程治理印記', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '與章程／理監事治理主視覺形成制度性關係。' },
  council: { show: true, element: 'Council Node', zh: '聯席治理節點', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵法律、會計、策略與產業專業在責任邊界內協作，不做多人頭像 icon。' },
  membership: { show: true, element: 'Membership Seal', zh: '會員共同體金章', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵加入正式共同體，而非購買服務或會員卡商品化。' },
  events: { show: true, element: 'Assembly Emblem', zh: '議事典藏徽件', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '只作會員大會與正式會務辨識；避免獎盃、麥克風、舞台燈光俗套。' },
  knowledge: { show: true, element: 'Research Index Emblem', zh: '研究索引金章', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵知識被編目、研究、引用與累積。' },
  charter: { show: true, element: 'Constitutional Mark', zh: '制度卷冊印記', placement: 'hero-visual-secondary', scale: '4–6% hero width', note: '章程頁以文件本身為主，金色元素更小、更克制。' },
} as const;

export const gcsdaVisualGrammar = {
  palette: ['ivory', 'warm-white', 'champagne-gold', 'warm-gray'],
  materials: ['marble', 'paper', 'metal', 'seal', 'folio'],
  thematicGoldElementRules: [
    '只在有明確主題名稱的機構核心頁 Hero 使用；列表、公告內文、表單與一般資訊段落不機械重複。',
    '每個主題頁最多一個金色立體主題元素，且須從該頁制度角色抽取。',
    '材質使用香檳金、霧金或細緻拉絲金屬，不使用高飽和黃金底或精品珠寶式高光。',
    '桌機尺度約 Hero 寬度 4–8%，最高不超過 10%；學會網站整體比 STT 更克制。',
    '金色元素是制度辨識，不是服務 icon、卡片徽章或裝飾品。',
  ],
  rules: [
    '同一治理文明，不複製 STT 頁面模板',
    '大型主物件依頁面制度角色改變',
    '圖示維持小比例，不做卡片牆',
    '避免黑金舊站、霓虹科技、豪宅與商業業配感',
  ],
} as const;
