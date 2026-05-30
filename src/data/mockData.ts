export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image: string;
  url?: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  author: string;
  publisher: string;
  tags: string[];
  previewUrl?: string;
}

export const categories = [
  "法律與公司治理",
  "AI 人工智慧法制",
  "數位資產與虛擬貨幣",
  "企業策略與營運管理",
  "智庫領航與品牌哲思",
  "勞資關係與心理契約",
  "資產傳承與家族治理",
  "社會正義與專欄評論"
];

export const articles: Article[] = [
  {
    id: "a_new_col_1",
    title: "「一筆千億遺產，台灣政府課得到嗎？」從尹衍樑身後，看台灣遺產稅制的真實邊界",
    excerpt: "剖析台灣遺產稅制、實質課稅原則與海外信託架構的真實攻防，揭示千億資產在法理與租稅主權下的邊界。",
    content: "莊鈞翔博士指出，高淨值資產的跨境傳承往往面臨極為嚴峻的租稅審查。從著名企業家的身後規劃，我們看見遺產稅法中「實質課稅原則」的強大支配力。純粹的節稅迷思在剛性法理前往往淪為虛妄，唯有建立合規合法的全球信託主權架構與永續治理框架，方能於台灣與多國法遵邊界中保全家族經營成果。",
    date: "2026-05-28",
    category: "資產傳承與家族治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/tax-boundary/1200/800",
    url: "https://94m.com.tw/articles/30c072?from_admin=true"
  },
  {
    id: "a_new_col_2",
    title: "「同樣是華人高資產家族，為何他選擇把財富留在新加坡？」觀台灣、新加坡、香港、日本的傳承稅制比較，以及合法合規的規劃工具全解析",
    excerpt: "深度橫向評比亞太四大金融法治區的傳承稅務成本與信託保護強度，剖析高資產家族進行跨國傳承的決策指引。",
    content: "莊鈞翔博士對標星、港、台、日四地的法律體制。新加坡憑藉極致的信託隱私保護與稅務豁免，成為全球財富綠洲；而日本的超高名義贈與稅率，則逼使傳承手段轉向更複雜的剛性股權分配。理解這些法制邊界的差異，能幫助高資產家族在合規框架下，建立兼具控制權與抗震強度的全球資產保全計畫。",
    date: "2026-05-26",
    category: "資產傳承與家族治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/sg-wealth-legacy/1200/800",
    url: "https://94m.com.tw/articles/2bf8ea?from_admin=true"
  },
  {
    id: "a_new_col_3",
    title: "「千億集團的傳承困局，保單贈與遺囑能解套嗎？」企業主股東的傳承框架解析：看見冰山的形狀，理解它水面下的重量",
    excerpt: "解構企業主傳承拼圖中的隱性合規風險，透視保險金信託、特留份爭議與股權鎖定在實務操作中的底層角力。",
    content: "莊鈞翔博士強調，許多企業主慣用簡單的保單贈與或口頭遺言，卻忽略了水面下巨大的「產權扣減與特留份扞格」冰山。當繼承人與經理人利益衝突，單薄的法律防禦將不堪一擊。我們必須透過「閉鎖性控股公司、防衛型遺嘱與分配信託」的交叉重組，建立剛性的權力交接渠道，以制度化防線承載千億集團的代際安全。",
    date: "2026-05-24",
    category: "資產傳承與家族治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/ocean-iceberg-wealth/1200/800",
    url: "https://94m.com.tw/articles/873721?from_admin=true"
  },
  {
    id: "a_new_col_4",
    title: "「專業光環下的司法背叛？」法律專業人員涉入組織犯罪、洩密與洗錢之刑事責任與倫理重構",
    excerpt: "直擊少數法律守門人失控涉案的法理盲區，重整專業律師與法學專家在金融秩序、信託責任與組織法遵中的倫理防守線。",
    content: "法律專業是守護正義的最後防線，然而當守門人涉入組織犯罪、洗錢或洩密時，摧毀的是大眾對法治社會的根本信仰。莊鈞翔博士指出，這類案件反映出「專業光環下的自律防線空洞」。在嚴格的洗錢防制法規與刑事責任追訴下，司法專業團隊必須重建更高規格的內部倫理合規牆（Ethics Wall），以剛性內控杜絕利害衝突與違法風險。",
    date: "2026-05-22",
    category: "社會正義與專欄評論",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/legal-ethics-justice/1200/800",
    url: "https://94m.com.tw/articles/68fcd5?from_admin=true"
  },
  {
    id: "a_new_col_5",
    title: "「當 AI 走進 LINE 智慧客服！」自動聊天機器人與新型數位詐騙時代",
    excerpt: "分析生成式 AI 對 LINE 智慧客服與社群網絡的顛覆性進駐，警示自動化欺詐在新型態社交網絡中的高風險滲透。",
    content: "莊鈞翔博士警告，當AI自動客服普及，它能完美擬真客服人員的親和力與專業語調，這同時為「擬態詐騙」提供了無限繁衍的演算法武器。高資產族群與企業在享受LINE客服便利的同時，極易因AI生成的信任假象而让移核心密鑰、帳戶授權或簽署虛假條約。企業必須將AI交互納入合規審計門控，並在技術底層部署真實性防偽機制。",
    date: "2026-05-20",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/ai-line-chatbot/1200/800",
    url: "https://94m.com.tw/articles/1ff3f5?from_admin=true"
  },
  {
    id: "a_new_col_6",
    title: "「AI 工業化詐騙演算法軍備競賽下的企業治理主權與制度防禦！」觀近九百億財損的社會病理探討《打詐新條例》實務下的戰略性轉向",
    excerpt: "深度剖析演算法犯罪與工業化詐騙對企業及社會主權的系統性侵蝕，從《打詐新條例》實務評估制度防禦的戰略防線。",
    content: "莊鈞翔博士分析，當前詐騙已走向「演算法與AI工業化組裝」的規模，年財損逼近千億。在《打詐專法》（打詐新條例）實施的關鍵時刻，企業內部治理也面臨嚴峻的防禦升級挑戰。這不再是簡單的防毒防駭，而是涉及公司在供應鏈、財務撥付與權限分配上的「制度武裝」。我們必須採取戰略性轉向，部署抗AI擬態的自律架構，守護決策主權。",
    date: "2026-05-18",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/algorithm-crime-defense/1200/800",
    url: "https://94m.com.tw/articles/3d93ec?from_admin=true"
  },
  {
    id: "a_latest_1",
    title: "【四萬點下的企業決策責任重構 • 從市場狂熱中奪回治理主權】論董事注意義務之質變與預防型內控之必要性",
    excerpt: "在市場狂熱與高點壓力下，企業決策者如何重新審視注意義務，從治理層面奪回主權，建立預防型內控機制。",
    content: "莊鈞翔博士指出，當市場處於極端高位時，董事的注意義務面臨前所未有的考驗。這不僅是法律門檻，更是對治理主權的防衛戰。透過預防型內控的建立，才能在資本市場的狂熱中，確保企業治理的穩健性與主動權。",
    date: "2026-05-10",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/governance-40k/1200/800",
    url: "https://94m.com.tw/articles/6fe7f6"
  },
  {
    id: "a_latest_2",
    title: "【治理主權的陷落與重構】生成式 AI 蔓延與資本市場時代下的雙重治理革命",
    excerpt: "面對生成式 AI 的全面滲透與資本市場的新局勢，企業治理正經歷一場深刻的革命與主權重構。",
    content: "莊鈞翔博士解析 AI 時代下的治理變革。當決策權被演算法與市場情緒共同蠶食時，如何重構具備韌性的管理體系。這是一場關於治理主權的陷落與重構的辯論，企業必須在技術浪潮中重新定位自己的治理核心。",
    date: "2026-05-10",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/ai-governance-revolution/1200/800",
    url: "https://94m.com.tw/articles/fdf1ea"
  },
  {
    id: "a1",
    title: "特定工廠登記的制度套利與產業正義危機：2026碳費元年下法治的價差",
    excerpt: "當守法成為企業經營的沉重負擔，而精巧的法律規避反能獲取補助與市場優勢時，我們所摧毀的，將是台灣產業賴以生存的誠信基石與公平競爭環境。",
    content: "中華企業策略永續發展學會創會理事長莊鈞翔博士表示，特定工廠登記制度在實務上的運作，往往產生了意想不到的副作用。在2026年碳費元年即將到來之際，法治的價差正日益擴大。當精巧的法律規避（套利）成為企業生存的捷徑，誠實守法的企業反而面臨不公平競爭。這不僅是法律議題，更是產業正義的危機，必須穿透法律文字表層，直指制度套利的核心痛點，守護台灣產業的誠信基石。",
    date: "2026-04-12",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/industrial-factory-law/1200/800",
    url: "https://94m.com.tw/articles/0dc0e4?from_admin=true"
  },
  {
    id: "a2",
    title: "企業內部無法形成策略共識：內部的決策結構天然是分裂的",
    excerpt: "許多策略是在會議中由多數人討論形成，但最終責任卻集中在少數高層身上，這就形成一種典型的不對稱結構：提出意見的人不需要承擔後果。",
    content: "莊鈞翔博士指出，許多策略共識達成之所以困難，源於決策結構本身的不對稱性。在會議中，往往是由多數人討論方案，但最終的成敗後後果卻僅由少數高層承擔。這種「提意見者不擔後果」的結構天然導致分裂，使得決策與執行之間產生巨大的鴻溝。唯有打破這種不對稱性，方能建立真正的策略共識。",
    date: "2026-04-10",
    category: "企業策略與營運管理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/business-strategy-meeting/1200/800",
    url: "https://94m.com.tw/articles/28ec68?from_admin=true"
  },
  {
    id: "a3",
    title: "數位分身的法律紅線：網路帳號交易下的洗錢防制、詐欺共犯與治理缺口",
    excerpt: "看似單純的「賺取零用錢」或「無本創業」行為，一旦落入不法分子手中，無論出租方或租借方，皆可能捲入刑事、民事乃至契約責任的嚴密追訴網絡。",
    content: "莊鈞翔博士提醒，隨意將網路帳號出租或交易，看似是無本的「零用錢」行為，實則暗藏巨大的法律紅線。在洗錢防制、詐欺共犯的嚴密追訴網絡下，個人帳號的轉讓極易成為不法集團的數位工具。這不僅是個人法律風險，更是當代科技治理的巨大缺口，亟需重新審視數位分身的法律邊界，守護個人數位資產的安全與秩序。",
    date: "2026-04-08",
    category: "數位資產與虛擬貨幣",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/digital-twins-law/1200/800",
    url: "https://94m.com.tw/articles/e1d6b8?from_admin=true"
  },
  {
    id: "a4",
    title: "數位擬態的法律重塑：Deepfake風險下的企業治理、著作權與人格權攻防",
    excerpt: "這場「擬態」風暴不僅是科技的躍進，更是對既有法理秩序的挑戰。面對高度逼真、低成本複製的數位內容，現行《著作權法》能否有效保護權利？",
    content: "莊鈞翔博士直指，Deepfake所引發的數位擬態風暴，正在重塑法律的人本秩序。當AI能輕易模擬人類形象、聲音乃至創作風格時，現行的著作權法與人格權保障體系面臨崩解危機。企業必須在享受AI帶來的效率提升之際，同步建立防範虛構內容攻擊的治理策略，確保在數位擬態時代，企業基業與人格尊嚴不被科技浪潮沖毀。",
    date: "2026-04-05",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/deepfake-protection/1200/800",
    url: "https://94m.com.tw/articles/4190d6?from_admin=true"
  },
  {
    id: "a5",
    title: "數位法遵軍師：AI智能法務系統如何重塑企業管理顧問的法律韌性策略",
    excerpt: "探討「企業AI智能法務系統」如何從一個單純的數位工具，躍升為企業管理顧問團隊的策略性輔助夥伴與最強大的法治防護網。",
    content: "這場挑戰的關鍵解方，在於將科技創新與高階管理顧問的專業深度進行策略性整合。莊鈞翔博士觀察到，企業AI智能法務系統不應只是工具，而應成為企業的數位軍師。透過AI的即時監測與預警，法律韌性能從事後被動反應轉為主動的前瞻治理，助企業在充滿不確定性的環境中穩舵前行。",
    date: "2026-04-01",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/legal-ai-brain/1200/800",
    url: "https://94m.com.tw/articles/4bb107?from_admin=true"
  },
  {
    id: "a6",
    title: "數位分身時代的邊界之戰：肖像權保障與企業治理的策略重構",
    excerpt: "在面對「虛擬分身」與「AI深度應用」的新興挑戰時，傳統的認知與法規實務應用已產生巨大的結構性鴻溝。",
    content: "在數位分身時代，肖像權作為人格權的延伸正遭受結構性挑戰。許多企業與學術機構在追求創新的名義下，往往忽略了肖像權的法律邊界。莊鈞翔博士強調，當虛擬分身能代表自然人行使行為時，傳統的認知已產生巨大鴻溝，企業必須透過治理策略的重構，為員工與個人的肖像權劃定清晰的保護邊界。",
    date: "2026-03-28",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/biometric-identity/1200/800",
    url: "https://94m.com.tw/articles/d3c5a3?from_admin=true"
  },
  {
    id: "a7",
    title: "債權的盾與矛：論借貸交易的法律前置程序與主動風險治理",
    excerpt: "探討借貸交易中的主動風險治理，分析法律前置程序如何成為債權保障的堅實護盾。",
    content: "債權管理不應是事後的追討，而應是事前的治理。透過法律前置程序的完善，企業能將法律風險降至最低，達成穩健營運的目標。",
    date: "2026-03-25",
    category: "企業策略與營運管理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/factory-env/1200/800",
    url: "https://94m.com.tw/articles/0dc0e4"
  },
  {
    id: "a14_legacy",
    title: "企業內部無法形成策略共識：內部的決策結構自然是分裂的",
    excerpt: "探討企業內部決策結構的先天分裂性，以及如何克服溝通斷層形成真正的策略共識。",
    content: "策略的執行基於共識，但企業內部不同的部門利益與角色權責，往往讓決策結構趨向分裂。莊博士提出，唯有建立透明的內在法治秩序，方能彌合裂痕。",
    date: "2026-03-18",
    category: "企業策略與營運管理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/split-decision/1200/800",
    url: "https://94m.com.tw/articles/28ec68"
  },
  {
    id: "a15_legacy",
    title: "數位分身的法律紅線：網路帳戶交易下的洗錢防制、詐欺共犯與治理缺口",
    excerpt: "分析網路帳號交易行為背後的法律紅線，檢視現行治理機制在數位身份保護上的缺口。",
    content: "在數位經濟時代，個人帳號已成為數位分身。莊博士警示，隨意的帳戶交易不僅違反洗錢防制法，更可能讓個人陷入詐欺共犯的法律風暴中。",
    date: "2026-03-15",
    category: "數位資產與虛擬貨幣",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/digital-redline/1200/800",
    url: "https://94m.com.tw/articles/e1d6b8"
  },
  {
    id: "a16_legacy",
    title: "數位擬態的法律門檻：Deepfake 風險下的企業治理、著作權與人格權攻防",
    excerpt: "探討 Deepfake 技術對企業治理的衝擊，以及在著作權與人格權法律防禦上的新挑戰。",
    content: "Deepfake 技術讓數位擬態真假難辨. 莊博士認為，企業必須建立新型態的數位法遵體體系，以應對日益嚴峻的身份盜用與版權侵害風險。",
    date: "2026-03-12",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/deepfake-law/1200/800",
    url: "https://94m.com.tw/articles/4190d6"
  },
  {
    id: "a17_legacy",
    title: "數位法遵軍師：AI 智能法務系統如何挖掘企業管理顧問的法律彈性策略",
    excerpt: "解析 AI 智能法務系統如何成為企業的新型法遵軍師，提供更具彈性的法律應用策略。",
    content: "AI 不僅是自動化工具，更是企業策略的放大器。莊博士指出，透過 AI 挖掘法律條文間的彈性空間，能為企業管理提供更主動的策略布局。",
    date: "2026-03-10",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/ai-advisor/1200/800",
    url: "https://94m.com.tw/articles/4bb107"
  },
  {
    id: "a18_legacy",
    title: "數位分身時代的邊界之戰：肖像權與企業治理的策略重構",
    excerpt: "在數位分身普及的時代，重新定義肖像權的法律邊界，並探討企業治理的應對之道。",
    content: "當虛擬形象能產生實質價值，肖像權的保護即成為企業治理的戰場。莊博士強調，肖像權範疇的界定將是數位時代法治重建的關鍵。",
    date: "2026-03-05",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/portrait-boundary/1200/800",
    url: "https://94m.com.tw/articles/d3c5a3"
  },
  {
    id: "a19_legacy",
    title: "債權的盾與矛：論借貸交易的法律前置程序與主動風險治理",
    excerpt: "分析借貸交易中的法律防禦與進攻手段，強調事前程序對風險治理的重要性。",
    content: "借貸不僅是財務行為，更是法律攻防。莊博士指出，完備的法律前置程序是守護債權的「盾」，而主動的風險治理則是確保回收的「矛」。",
    date: "2026-03-01",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/debt-shield/1200/800",
    url: "https://94m.com.tw/articles/568f85"
  },
  {
    id: "a20_legacy",
    title: "區塊鏈的黑暗面：虛擬資產犯罪對國家金融主權與科技治理的系統性衝擊",
    excerpt: "剖析虛擬資產犯罪如何侵蝕金融主權，以及對現行科技治理體系帶來的系統性衝擊。",
    content: "區塊鏈技術在帶來創新的同時，也成為金融犯罪的溫床。莊博士警示，若不加強跨國界的科技治理，虛擬資產可能動搖傳統的金融主權根基。",
    date: "2026-02-25",
    category: "數位資產與虛擬貨幣",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/blockchain-darkside/1200/800",
    url: "https://94m.com.tw/articles/068583"
  },
  {
    id: "a21_labor_legacy",
    title: "看不見的職場：遠距辦公時代的勞資信任與心理契約重塑",
    excerpt: "在看不見的職場中，勞資雙方的信任基礎如何從「物理在場」轉向「績效承諾」？",
    content: "莊鈞翔博士指出，遠距辦公帶來的數位監控浪潮，正在深刻影響勞資間的心理契約。當物理邊界模糊，法律必須為勞工的隱私與企業的效率定調。心理契約的重塑不僅是管理議題，更是法治精神在勞動領域的新實踐。透過建立透明的績效評估機制，方能化解數位監控帶來的治理摩擦。",
    date: "2026-03-10",
    category: "勞資關係與心理契約",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/labor-trust-digital/1200/800",
    url: "https://94m.com.tw/articles/labor-contract"
  },
  {
    id: "a11",
    title: "家族信託與閉鎖性公司：資產傳承中的治理權力與利益平衡術",
    excerpt: "資產的傳承不只是財富的轉移，更是權力的永續。如何透過精確的法律工具，防止家族二代、三代間的內耗與分歧？",
    content: "家族企業的長青，建立在穩定的治理結構之上。莊鈞翔博士深入解析了家族信託與閉鎖性公司的法律連結，探討如何在資產保護與管理權利之間達成動態平衡。這是一場關於智慧傳承的法律長征，唯有透過系統化的治理規劃，才能將先輩的經營理念化為守護家族的法制堡壘。",
    date: "2026-03-05",
    category: "資產傳承與家族治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/family-legacy-vault/1200/800",
    url: "https://94m.com.tw/articles/family-governance"
  },
  {
    id: "a12",
    title: "智庫領航：品牌哲思在數位治理時代的法治化演繹",
    excerpt: "品牌不僅是商標，更是企業價值觀的法治化呈現。智庫如何協助企業將經營哲學轉化為可執行的合規路徑？",
    content: "品牌精神的存續與企業的法治底色息息相關。莊鈞翔博士認為，智庫的角色在於將抽象的品牌哲思進行法治化轉譯。透過建立完善的內部法遵體系，品牌信任度能從行銷層面提升至制度層面。在數位治理時代，法治化的品牌哲思是企業最具競爭力的核心資產。",
    date: "2026-03-01",
    category: "智庫領航與品牌哲思",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/think-tank-philosophy/1200/800",
    url: "https://94m.com.tw/articles/think-tank"
  },
  {
    id: "a13",
    title: "工廠特定登記制度套利與產業正義危機：2026 碳費元年下基礎的價差",
    excerpt: "探討特定工廠登記制度如何在2026碳費元年背景下產生法治價差，衝擊產業正義。",
    content: "莊鈞翔博士分析，工廠特定登記制度在實務執行中，若缺乏嚴謹法治配套，易成為企業套利的法律漏洞，尤其在2026年碳費徵收後，其價差將進一步考驗產業競爭的公平性。",
    date: "2026-03-20",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/factory-env/1200/800",
    url: "https://94m.com.tw/articles/001"
  },
  {
    id: "a14",
    title: "企業內部無法形成策略共識：內部的決策結構自然是分裂的",
    excerpt: "探討企業內部決策結構的先天分裂性，以及如何克服溝通斷層形成真正的策略共識。",
    content: "策略的執行基於共識，但企業內部不同的部門利益與角色權責，往往讓決策結構趨向分裂。莊博士提出，唯有建立透明的內在法治秩序，方能彌合裂痕。",
    date: "2026-03-18",
    category: "企業策略與營運管理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/split-decision/1200/800",
    url: "https://94m.com.tw/articles/002"
  },
  {
    id: "a15",
    title: "數位分身的法律紅線：網路帳戶交易下的洗錢防制、詐欺共犯與治理缺口",
    excerpt: "分析網路帳號交易行為背後的法律紅線，檢視現行治理機制在數位身份保護上的缺口。",
    content: "在數位經濟時代，個人帳號已成為數位分身。莊博士警示，隨意的帳戶交易不僅違反洗錢防制法，更可能讓個人陷入詐欺共犯的法律風暴中。",
    date: "2026-03-15",
    category: "數位資產與虛擬貨幣",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/digital-redline/1200/800",
    url: "https://94m.com.tw/articles/003"
  },
  {
    id: "a16_stt",
    title: "數位擬態的法律門檻：Deepfake 風險下的企業治理、著作權與人格權攻防",
    excerpt: "探討 Deepfake 技術對企業治理的衝擊，以及在著作權與人格權法律防禦上的新挑戰。",
    content: "Deepfake 技術讓數位擬態真假難辨。莊博士認為，企業必須建立新型態的數位法遵體系，以應對日益嚴峻的身份盜用與版權侵害風險。",
    date: "2026-03-12",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/deepfake-law/1200/800",
    url: "https://94m.com.tw/articles/004"
  },
  {
    id: "a17_stt",
    title: "數位法遵軍師：AI 智能法務系統如何挖掘企業管理顧問的法律彈性策略",
    excerpt: "解析 AI 智能法務系統如何成為企業的新型法遵軍師，提供更具彈性的法律應用策略。",
    content: "AI 不僅是自動化工具，更是企業策略的放大器。莊博士指出，透過 AI 挖掘法律條文間的彈性空間，能為企業管理提供更主動的策略布局。",
    date: "2026-03-10",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/ai-advisor/1200/800",
    url: "https://94m.com.tw/articles/005"
  },
  {
    id: "a18",
    title: "數位分身時代的邊界之戰：肖像權與企業治理的策略重構",
    excerpt: "在數位分身普及的時代，重新定義肖像權的法律邊界，並探討企業治理的應對之道。",
    content: "當虛擬形象能產生實質價值，肖像權的保護即成為企業治理的戰場。莊博士強調，肖像權範疇的界定將是數位時代法治重建的關鍵。",
    date: "2026-03-05",
    category: "AI 人工智慧法制",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/portrait-boundary/1200/800",
    url: "https://94m.com.tw/articles/006"
  },
  {
    id: "a19_stt",
    title: "債權的盾與矛：論借貸交易的法律前置程序與主動風險治理",
    excerpt: "分析借貸交易中的法律防禦與進攻手段，強調事前程序對風險治理的重要性。",
    content: "借貸不僅是財務行為，更是法律攻防。莊博士指出，完備的法律前置程序是守護債權的「盾」，而主動的風險治理則是確保回收的「矛」。",
    date: "2026-03-01",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/debt-shield/1200/800",
    url: "https://94m.com.tw/articles/007"
  },
  {
    id: "a20",
    title: "區塊鏈的黑暗面：虛擬資產犯罪對國家金融主權與科技治理的系統性衝擊",
    excerpt: "剖析虛擬資產犯罪如何侵蝕金融主權，以及對現行科技治理體系帶來的系統性衝擊。",
    content: "區塊鏈技術在帶來創新的同時，也成為金融犯罪的溫床。莊博士警示，若不加強跨國界的科技治理，虛擬資產可能動搖傳統的金融主權根基。",
    date: "2026-02-25",
    category: "數位資產與虛擬貨幣",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/blockchain-darkside/1200/800",
    url: "https://94m.com.tw/articles/008"
  },  {
    id: "a21_labor_stt",
    title: "策略性法律賦能：從成本中心到競爭核心的治理躍升",
    excerpt: "探討如何將法律職能從單純的法規遵循（成本中心），轉化為企業競爭優勢的動力來源。",
    content: "法律不應只是發展的門檻。莊博士認為，透過策略性賦能，法律能成為企業排除對手、建立壟斷防禦與提升治理層次的關鍵鑰匙。",
    date: "2026-02-20",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/legal-empowerment/1200/800",
    url: "https://94m.com.tw/articles/009"
  },
  {
    id: "a22",
    title: "國土鏈金術的終局：特登工廠「擬制合規」下的法規套利與資產崩解",
    excerpt: "針砭特登工廠制度下的「擬制合規」現象，警示可能的法規套利風險與資產價值虛浮。",
    content: "當土地法規成為一種可以被「創造」的合規，資本的積累即充滿了不確定性。莊博士揭露土地法規套利背後的資產泡沫風險。",
    date: "2026-02-15",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/land-alchemy/1200/800",
    url: "https://94m.com.tw/articles/010"
  },
  {
    id: "a23",
    title: "綠色通膨下的生存賽局：論碳費機制與違規工廠轉型之法律策略",
    excerpt: "分析碳費機制對產業的衝擊，並為違規工廠提供轉型合規的法律應對策略。",
    content: "在綠色通膨時代，碳排放成本將重新定義工廠的生存權。莊博士分析，違規工廠若不儘速透過法律手段達成轉型，將在碳費賽局中被淘汰。",
    date: "2026-02-10",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/green-inflation/1200/800",
    url: "https://94m.com.tw/articles/011"
  },
  {
    id: "a24",
    title: "淨零賽局的邊界從「合規成本」到「永續競爭」的策略轉型",
    excerpt: "探討淨零碳排趨勢下，企業如何將合規視角轉向長期的永續競爭力建構。",
    content: "淨零不只是開銷，而是未來市場的入場券。莊博士指出，領先者已將碳管理視為核心競爭力，而非單純的法律遵循。",
    date: "2026-02-05",
    category: "法律與公司治理",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/netzero-strategy/1200/800",
    url: "https://94m.com.tw/articles/012"
  },
  {
    id: "a25",
    title: "內在律法遵行 InternalCompliance《為你的心，打造一個不可侵犯的至聖所》",
    excerpt: "探討如何將外在的法律規範內化為內在的自律秩序，建構企業領導者的核心精神防線。",
    content: "最強大的治理來自內在的法。莊博士認為，唯有領導者心中具備不可侵犯的法感，企業才能在外界誘惑與壓力中始終維持正路。",
    date: "2026-01-20",
    category: "智庫領航與品牌哲思",
    author: "莊鈞翔博士",
    image: "https://picsum.photos/seed/internal-law/1200/800",
    url: "https://94m.com.tw/articles/031"
  }
];

export const books: Book[] = [
  {
    id: "b1",
    title: "內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》",
    description: "真正導致失誤與崩壞的，往往不是制度本身，而是「人」。為您的內在王國，出版永恆的秩序與不可侵犯的至聖所。將法遵精神昇華至心靈境界，轉譯為當代企業家必讀的內在管理聖經。",
    price: 349,
    cover: "/images/paper_internal_compliance_002.png",
    author: "莊鈞翔博士",
    publisher: "策略智庫數位出版 STT Press",
    tags: ["內在管理", "法遵精神", "企業家必讀"],
    previewUrl: "https://heyzine.com/flip-book/12d94f8d4b.html"
  },
  {
    id: "b2",
    title: "《2025 永續家族治理實務實錄》",
    description: "法律架構、資本效率與策略演進之整合判讀。莊博士以系統化方法將法律精要融入管理實務之作。",
    price: 0,
    cover: "/images/paper_family_governance_white_paper.png",
    author: "莊鈞翔博士",
    publisher: "策略智庫數位出版 STT Press",
    tags: ["家族治理", "法律架構", "策略演進"],
    previewUrl: "https://heyzine.com/flip-book/a6e96eff8e.html"
  }
];

export const phdPapers = [
  {
    id: "phd1",
    title: "臺灣企業接班人的佈局規劃與傳承家族價值",
    enTitle: "Factors for Successful Succession of Taiwanese Family Businesses",
    description: "本研究深入探討臺灣家族企業在傳承過程中的關鍵成功因素，分析如何透過精確的佈局規劃，將創辦人的家族價值與經營理念，系統化地轉移至下下一代接班人，確保企業基業長青並維持核心競爭力。",
    type: "博士論文",
    cover: "/images/paper_succession_family.png",
    previewUrl: "https://heyzine.com/flip-book/ff46f2b661.html",
    downloadUrl: "/papers/phd1.txt"
  },
  {
    id: "phd2",
    title: "企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
    enTitle: "Introducing corporate governance in law compliance into business strategy: a case study of external legal advisory teams",
    description: "探討企業如何將法律合規精神內化至核心策略中，而非僅視其為外部限制決策精神。透過外部專業團隊的深度協助，將法務防護網轉化為企業競爭優勢，建立穩健的風險治理結構與策略執行地圖。",
    type: "博士論文",
    cover: "/images/paper_corporate_governance.png",
    previewUrl: "https://heyzine.com/flip-book/dec98b2e5b.html",
    downloadUrl: "/papers/phd2.txt"
  },
  {
    id: "phd3",
    title: "顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    enTitle: "Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm",
    description: "以大型國際專業服務機構為研究對象，分析高階專業服務業在顧客關係管理中的獨特性與挑戰。本研究提出透過精準的關係治理，提升服務的永續性與品牌信任感，為知識型產業提供可執行的管理範式。",
    type: "博士論文",
    cover: "/images/paper_customer_relationship.png",
    previewUrl: "https://heyzine.com/flip-book/5a08b85184.html",
    downloadUrl: "/papers/phd3.txt"
  }
];

export const masterPapers = [
  {
    id: "m1",
    title: "不同世代企業家人格特質、創新能力對企業經營績效之影響-以領導風格為中介變數",
    enTitle: "The Relationship among Personality Traits of Different Generation Entrepreneurs, Innovation Ability and Performance – Leadership Style as an Intermediary Variable",
    description: "跨世代研究不同背景企業家的心理特質與創新路徑，實證分析領導風格如何中介人格特質對業績的影響。為家族企業轉型與職業經理人選任提供量化依據與策略建議。",
    type: "碩士論文",
    cover: "/images/paper_personality_innovation.png",
    previewUrl: "https://heyzine.com/flip-book/b7ec1c6436.html",
    downloadUrl: "/papers/m1.txt"
  }
];
