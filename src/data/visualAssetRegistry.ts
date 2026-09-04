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

export const gcsdaVisualGrammar = {
  palette: ['ivory', 'warm-white', 'champagne-gold', 'warm-gray'],
  materials: ['marble', 'paper', 'metal', 'seal', 'folio'],
  rules: [
    '同一治理文明，不複製 STT 頁面模板',
    '大型主物件依頁面制度角色改變',
    '圖示維持小比例，不做卡片牆',
    '避免黑金舊站、霓虹科技、豪宅與商業業配感',
  ],
} as const;
