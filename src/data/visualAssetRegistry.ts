export const sttVisualAssets = {
  home: { source: '2', role: '首頁 Visual Canon：白金文明入口／科林斯柱／治理核心／小比例圖示', treatment: 'approved-canon' },
  majorDecision: { source: '004/005', role: 'Decision Dossier／證據／責任重量', treatment: 'hero-master-source' },
  corporateGovernance: { source: '31/32/33', role: 'Governance Charter／董事會／權責卷冊', treatment: 'hero-master-source' },
  familyGovernance: { source: '14', role: 'Family Constitution／世代傳承', treatment: 'hero-master-source' },
  internalCompliance: { source: '007/15', role: 'Compliance Ledger／制度封印', treatment: 'hero-master-source' },
  aiGovernance: { source: '23/29', role: 'Human–AI Constitutional Governance／權限核心', treatment: 'hero-master-source' },
  intelligence: { source: '010/011', role: 'Research Archive／Editorial Folio', treatment: 'hero-master-source' },
  publications: { source: '012/013/16', role: '典藏書室／實體精裝書／研究卷冊', treatment: 'hero-master-source' },
  engagement: { source: '34', role: 'Governance Engagement／能力索引', treatment: 'section-source' },
} as const;

export const sttVisualGrammar = {
  palette: ['ivory', 'warm-white', 'champagne-gold', 'warm-gray'],
  materials: ['limestone', 'marble', 'paper', 'metal', 'folio'],
  rules: [
    '同一文明、不同物件；同一治理骨架、不同問題人格',
    '首頁金球只作治理核心，不機械複製到每頁',
    '圖示比例維持首頁已核定的小型尺度',
    '優先查 Visual Asset Bank，再決定裁切、修正或新生成',
    '禁止同底圖換標題、CSS 假物件、霓虹 HUD 與一般顧問簡報感',
  ],
} as const;
