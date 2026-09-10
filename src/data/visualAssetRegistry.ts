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

export const sttThematicGoldElements = {
  home: { show: true, element: 'Governance Core Sphere', zh: '治理核心金球', placement: 'hero-scene-secondary', scale: '5–7% hero width', note: '首頁既有治理核心；只保留一枚，不再疊加其他大型金色物件。' },
  majorDecision: { show: true, element: 'Decision Seal', zh: '決策裁決章', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '象徵重大決策取得資格與裁決狀態，不取代 Decision Dossier 主物件。' },
  ownerDependence: { show: true, element: 'Authority Valve', zh: '授權閥件', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵決策權由個人移轉至制度化權限。' },
  succession: { show: true, element: 'Succession Ring', zh: '傳承環', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '象徵權力、資訊、責任跨世代移交；避免獎盃、接力棒等俗套。' },
  familyOwnership: { show: true, element: 'Family Constitution Seal', zh: '家族憲制封印', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '與 Family Constitution 主物件形成制度認證關係。' },
  strategicLegal: { show: true, element: 'Dual-Axis Judgment Seal', zh: '策略法務雙軸裁決章', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '象徵法律位置與策略價值於同一治理判讀點收斂；避免法槌、天秤拼貼。' },
  aiGovernance: { show: true, element: 'Authority Core', zh: '權限核心', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '象徵 AI 可用能力與被授權權力之區別；禁止霓虹、機器人、HUD。' },
  systemFailure: { show: true, element: 'Recovery Coupling', zh: '回復耦合節點', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '象徵制度斷點、修復、接管與重新驗證。' },
  founderLegacy: { show: true, element: 'Legacy Archive Seal', zh: '治理記憶典藏章', placement: 'hero-visual-secondary', scale: '5–8% hero width', note: '象徵經驗從口述轉為可承接的治理記憶。' },
  howWeJudge: { show: true, element: 'Judgment Compass', zh: '判讀羅盤', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '只表達判讀方向與方法，不做成一般導航 icon。' },
  insights: { show: true, element: 'Research Seal', zh: '研究判讀印記', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '作為 Problem & Judgment Library 的典藏辨識。' },
  publications: { show: true, element: 'Canon Emblem', zh: '正典金章', placement: 'hero-visual-secondary', scale: '5–7% hero width', note: '與實體書／研究卷冊並存，金章不應大於書本主物件。' },
  start: { show: false, element: null, zh: null, placement: null, scale: null, note: 'Governance Intake 保持中性、安靜，不增加主題金色物件。' },
} as const;

export const sttVisualGrammar = {
  palette: ['ivory', 'warm-white', 'champagne-gold', 'warm-gray'],
  materials: ['limestone', 'marble', 'paper', 'metal', 'folio'],
  thematicGoldElementRules: [
    '僅用於有明確主題名稱與主題人格的核心頁 Hero；列表、搜尋、表單、純導流頁原則不用。',
    '每頁最多一個主題金色立體元素；它是象徵器件，不是導航 icon，也不是裝飾堆疊。',
    '材質以香檳金、霧金、細緻拉絲金屬為主，避免高飽和黃金與珠寶炫光。',
    '桌機視覺尺度原則約 Hero 寬度 5–8%，最高不超過 10%；手機再縮小，保持克制。',
    '金色元素必須從該頁主題語義抽取，不得只因版面空白而硬塞。',
  ],
  rules: [
    '同一文明、不同物件；同一治理骨架、不同問題人格',
    '首頁金球只作治理核心，不機械複製到每頁',
    '圖示比例維持首頁已核定的小型尺度',
    '優先查 Visual Asset Bank，再決定裁切、修正或新生成',
    '禁止同底圖換標題、CSS 假物件、霓虹 HUD 與一般顧問簡報感',
  ],
} as const;
