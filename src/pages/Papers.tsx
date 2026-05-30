import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { phdPapers, masterPapers } from "../data/mockData";
import { PaperCard } from "../components/PaperCard";
import { 
  FileText, 
  GraduationCap, 
  Award, 
  ArrowLeft, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Users, 
  Sliders, 
  BookOpen, 
  Eye, 
  TrendingUp, 
  Zap, 
  Activity, 
  Check, 
  ShieldAlert,
  X,
  ExternalLink,
  Download
} from "lucide-react";

const themeDetails: Record<string, {
  painPoints: Array<{ title: string; desc: string }>;
  solutions: Array<{ title: string; desc: string }>;
  methodology: string;
}> = {
  theme1: {
    painPoints: [
      {
        title: "家族股權分散與外部掠奪",
        desc: "未導入閉鎖性股權鎖定與法律信託；致使控制權隨代際繼承稀釋；外部市場派伺機介入或惡意併購。"
      },
      {
        title: "二三代接班精神與理念磨損",
        desc: "創辦人的企業家精神與核心家族價值未能轉譯；接班人缺乏對承先啟後之歷史使命感；產生接班怠惰與治理衝突。"
      },
      {
        title: "民法特留份與重稅資產衝擊",
        desc: "缺乏家族憲章與前瞻性信託框架；在代際移轉時面臨繼承人特留份爭產爭端；以及未妥善租稅佈局面臨之巨額遺產稅挑戰。"
      }
    ],
    solutions: [
      {
        title: "閉鎖性控股公司鎖定",
        desc: "利用閉鎖控股公司章程限售條款；剛性鎖死最高家族控制主權；限制股份自由轉讓；確保股權結構不外流。"
      },
      {
        title: "代際套合與精神常態化傳遞",
        desc: "建構家族理事會並制訂剛性家族約法；將道德約束升級為實體法遵規範；保障共同願景對企業日常經營之引領權。"
      },
      {
        title: "保險信託與遺囑剛性防護",
        desc: "佈局民事特別信託框架，融合合規防禦型遺囑；降低持股拆分爭議；構築無法突破的法律與合規雙重防護網。"
      }
    ],
    methodology: "本主題以臺灣北中南多個歷史傳承之上市家族企業為實證樣本；採取半結構化高階決策者深度訪談與文獻內容分析法；建構一套可重複檢證的「代際價值鏈轉化模型」；實證股權鎖定與憲章治理之正向交互作用。"
  },
  theme2: {
    painPoints: [
      {
        title: "教條被動與事件驅動型救火",
        desc: "僅將法律法規視為不得不服從的外部約束與成本；日常缺乏預防性內控；往往至爭端爆發或監管重罰才尋求外部救火。"
      },
      {
        title: "重大戰略決策法學諮詢盲區",
        desc: "董事會在核心商業戰略轉型或開拓地緣市場時；缺乏外部高級法律專家顧問作為核心智囊參議；決策曝露於巨大未知風險之中。"
      },
      {
        title: "合規套利失效與監管劇變觸礁",
        desc: "未能將合規體系轉化為競爭壁壘；在ESG新法、地緣政治合規、反壟斷等法案劇烈更迭時；承受難以負荷之產能磨損。"
      }
    ],
    solutions: [
      {
        title: "前置預防型合規門控系統",
        desc: "將法律審查與合規門控（Compliance Gates）嵌入商業策略提案的最前端；使專業法律諮詢早於任何商業投資決策實施。"
      },
      {
        title: "外部顧問戰略深度黏合",
        desc: "建立外部法律專家顧問與高階經營團隊（TMT）的常規聯席會議；使專家顧問從被動之合約審查者轉化為董事會不可或缺之參謀。"
      },
      {
        title: "法規競爭優先權確立",
        desc: "將高規格合規體系塑造成全球頂級客戶信賴之綠色安全盾牌；利用制度法規的超前佈局；獲取跨國貿易與再融資之溢價權力。"
      }
    ],
    methodology: "本主題探討現代企業如何將法遵精神融入核心策略中；結合組織防禦論與資源基礎觀點；論證外部專業力量對建構動態策略之正面效應；為現代化董事會重建高維度策略視角。"
  },
  theme3: {
    painPoints: [
      {
        title: "高專業壁壘與資訊不對稱黑箱",
        desc: "在高級律所、國際智庫等高階知識型服務中；客戶難以在事前與事中評估交付品質；信任基礎天生薄弱、容易產生焦慮。"
      },
      {
        title: "合意契約與實質滿意空隙磨損",
        desc: "交付流程由專家單向壟斷，缺乏客戶互動協同；客戶在履約後常因隱性期望值落差產生不滿；難以維持長期永續關係。"
      },
      {
        title: "交付專家個人化與機構產權空洞",
        desc: "智慧資產高度綑綁於個別明星專家身上；一旦明星專家流失，其維繫之高淨值客戶隨之崩落；機構核心價值極不永續。"
      }
    ],
    solutions: [
      {
        title: "去中心化機構關係治理模型",
        desc: "建立流程透明度與多點對接之信任體制；將人際特徵信任（Interpersonal Trust）升格為機構治理信任（Institutional Trust）。"
      },
      {
        title: "智慧價值共同創造 (Co-Creation)",
        desc: "打破單向交付，建立客戶與專家的協同工作流；將客戶深度納入服務設計與決策研析中；形成不可分割的命運共同體。"
      },
      {
        title: "倫理聲譽防護牆防禦體系",
        desc: "設立零瑕疵之利益衝突審查與最高安全層級的保密與智產隔離機制；構築高階諮詢機構無懈可擊之專家信用聲譽壁壘。"
      }
    ],
    methodology: "本主題以 A 國際法律事務所為深水區實證對象；探討高階專業服務業（PSFs）在顧客關係管理對服務永續性之關聯；提出獨特的關係資產度量矩陣與信任交互方程式。"
  },
  theme4: {
    painPoints: [
      {
        title: "創業家天賦與組織制度脫節",
        desc: "第一代創辦人擁有極高之商機敏銳度與狼性直覺；但天賦與能力並非等同於組織能力；無法複製創新成功經驗。"
      },
      {
        title: "轉型變革激起成員劇烈反彈",
        desc: "在核心業務變革過程中；若領導風格流於僵硬威權；將刺激基層組織產生反動抗性與消極怠工；致使變革流於形式。"
      },
      {
        title: "創新高昂度與利潤轉化率空轉",
        desc: "企業內部不乏創新點子與研發試驗；但缺乏適當之中介領導風格調和；導致研發投入無法安全反映於經營績效與盈餘。"
      }
    ],
    solutions: [
      {
        title: "變革型領導主動中介調適",
        desc: "透過願景啟迪、智力溫床激發與一對一客製化關懷；成功消弭基層成員變革心理排斥；順暢導流創辦人之天賦直覺。"
      },
      {
        title: "交易型領導例外管控制度化",
        desc: "輔以明確的利益承諾、剛性指標追蹤與例外偏差管理；穩固創新落地的執行基本盤；確保創新成效不至失焦或偏逸。"
      },
      {
        title: "動態雙軌調和矩陣(Ambidextrous)",
        desc: "因應市場動態性劇烈更迭；在探索期大幅度激勵變革型領導；在落實期則收緊交易型領導剛度；實現極致利潤。"
      }
    ],
    methodology: "本主題橫跨臺灣多個中大型組織高階企業家樣本；回收上百份高階主管問卷；採取多重中介結構方程模型（SEM）分析數據；實證並量化領導风格不可替代的經營績效中介轉載率。"
  }
};

export default function Papers() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [showPhd3Warning, setShowPhd3Warning] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"insight" | "pains" | "simulator" | "resource">("insight");

  // Theme Constants & Data for Exhibition
  const exhibitionThemes = [
    {
      id: "theme1",
      paperId: "phd1",
      number: "THEME I",
      title: "世代接班與家族傳承佈局",
      subtitle: "臺灣企業接班人的佈局規劃與傳承家族價值",
      desc: "剖析臺灣家族企業如何透過閉鎖控股、信託及家族憲章，將創辦人的靈魂價值與治理主權代際套合，達成不朽傳承。",
      icon: <Users className="h-6 w-6 text-gold-400" />,
      color: "from-gold-950/20 to-gold-900/10 border-gold-800/20",
      accent: "gold",
      paperObj: phdPapers[0]
    },
    {
      id: "theme2",
      paperId: "phd2",
      number: "THEME II",
      title: "策略性公司治理與法遵精神",
      subtitle: "企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
      desc: "論述法律合規如何從企業被動防守的「限制與成本」，轉化為董事會自我防禦及跨國擴張的剛性「競爭溢價」。",
      icon: <ShieldCheck className="h-6 w-6 text-gold-400" />,
      color: "from-blue-950/20 to-gold-900/10 border-blue-900/20",
      accent: "blue",
      paperObj: phdPapers[1]
    },
    {
      id: "theme3",
      paperId: "phd3",
      number: "THEME III",
      title: "關係治理與專業服務永續系統",
      subtitle: "顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
      desc: "以高階專業服務業（PSFs）為實證，建立去中心化、高壁壘的關係治理模型，解決資訊不對稱與永續信任維繫。",
      icon: <Compass className="h-6 w-6 text-gold-400" />,
      color: "from-emerald-950/20 to-gold-900/10 border-emerald-900/20",
      accent: "emerald",
      paperObj: phdPapers[2]
    },
    {
      id: "theme4",
      paperId: "m1",
      number: "THEME IV",
      title: "領袖人格特質與變革中介分析",
      subtitle: "不同世代企業家人格特質、創新能力對企業經營績效之影響：以領導風格為中介變數",
      desc: "實證跨世代創業家的人格模型與變革驅動力，量化分析如何透過變革型與交易型領導中介，將創新極致轉化為利潤紅利。",
      icon: <TrendingUp className="h-6 w-6 text-gold-400" />,
      color: "from-purple-950/20 to-gold-900/10 border-purple-900/20",
      accent: "purple",
      paperObj: masterPapers[0]
    }
  ];

  // Simulator States for Theme 1
  const [theme1Sliders, setTheme1Sliders] = useState({ ownership: 60, alignment: 50, rules: 40 });
  const calculateTheme1Maturity = () => {
    const { ownership, alignment, rules } = theme1Sliders;
    const score = Math.round(ownership * 0.4 + alignment * 0.35 + rules * 0.25);
    let advice = "";
    let rate = "";
    if (score < 50) {
      rate = "高度權力分裂風險 (HIGH RISK)";
      advice = "家族股權結構面臨特留份衝擊，且下代價值鏈極度不合。建議立刻導入閉鎖性公司控股鎖定、建立常態性家族理事會與防護型遺囑。";
    } else if (score < 80) {
      rate = "中度過渡期安全 (STABLE BALANCED)";
      advice = "具備基礎傳承架構，但因制度化規約不足，容易在主導權爭議中出現磨損。建議完善保險信託及家族憲章，將人為默契升格為法遵規約。";
    } else {
      rate = "極致主權合規傳承 (ULTRA SECURE)";
      advice = "恭喜，家族核心權力經剛性治理鎖定，且代際價值觀與決策主權完美過渡。您已具備建置家族辦公室（Family Office）之基石。";
    }
    return { score, rate, advice };
  };

  // Simulator States for Theme 2
  const [theme2Sliders, setTheme2Sliders] = useState({ adviceDepth: 40, dynamicAudit: 50, incidentDrills: 30 });
  const calculateTheme2Engine = () => {
    const { adviceDepth, dynamicAudit, incidentDrills } = theme2Sliders;
    const score = Math.round(adviceDepth * 0.4 + dynamicAudit * 0.3 + incidentDrills * 0.3);
    let advice = "";
    let status = "";
    if (score < 45) {
      status = "被動補救型內控 (VULNERABLE)";
      advice = "治理決策僅在法律爭端發生後才尋求補正，屬教條式法遵，極易在碳費衝擊或新法遵重調時遭受破壞性罰款。應立即建立前置門控。";
    } else if (score < 75) {
      status = "守法型流程合規 (COMPLIANT)";
      advice = "具備基本的法律守法框架。但未將法遵精神融入核心商業策略，外部法律顧問資源未得到最優化運用。建議朝主權預防型內控戰略轉型。";
    } else {
      status = "預防型主權防禦 (ULTRA IMMUNE)";
      advice = "極高維度的防禦型治理。外部專家顧問與董事會實行高黏合度戰略演訓，將法規升級轉變為產業壁壘，享有卓越的制度信用溢價。";
    }
    return { score, status, advice };
  };

  // Simulator States for Theme 3
  const [theme3Sliders, setTheme3Sliders] = useState({ symmetry: 50, coCreation: 50, ethicsWall: 60 });
  const calculateTheme3Trust = () => {
    const { symmetry, coCreation, ethicsWall } = theme3Sliders;
    const score = Math.round(symmetry * 0.35 + coCreation * 0.35 + ethicsWall * 0.3);
    let advice = "";
    let status = "";
    if (score < 50) {
      status = "高流失信任磨損期 (HIGH FRICTION)";
      advice = "專業交付依賴個人能力而非制度治理，資訊傳遞空隙過大，極易導致大客戶隨專家星散而流失。應立即升格關係治理倫理牆。";
    } else if (score < 75) {
      status = "常態制度型黏合 (INSTITUTIONAL TRUST)";
      advice = "基本建立標準服務界面與共同創造程序。但缺乏系統性關係治理資產。能維持中等合約週期，但缺乏對高價值客戶之智慧同盟感。";
    } else {
      status = "高信賴命運共同體 (PRESTIGE ALLIANCE)";
      advice = "完美跨越專業服務不對稱鴻溝。客戶高度信任組織治理體系，服務永續性極強，溢價空間深厚，具備高度行業溢價優勢。";
    }
    return { score, status, advice };
  };

  // Simulator States for Theme 4
  const [theme4Sliders, setTheme4Sliders] = useState({ innovation: 50, transformational: 50, transactional: 50 });
  const calculateTheme4Mediation = () => {
    const { innovation, transformational, transactional } = theme4Sliders;
    // Transformational leadership acts as high mediator for innovation, transactional as stabilizer
    const pathMultiplier = (transformational / 100) * 1.2 + (transactional / 100) * 0.5;
    const convertedPerformance = Math.min(100, Math.round(innovation * pathMultiplier));
    let advice = "";
    if (convertedPerformance < 40) {
      advice = "企業雖有創辦人創新因子，但變革阻力與日常治理風格不契合，導致大部分創新流失在內部協調中。應急需強化變革型領導。";
    } else if (convertedPerformance < 75) {
      advice = "創新策略獲得合理落實，績效穩定。可適度提高領導的願景共啟與活性授權度，以釋放深層利潤。";
    } else {
      advice = "頂級變革型績效！變革與制度化領導雙軌驅動，完美釋放組織成員智識，創新轉化率極高，擁有引領產業重塑之魄力。";
    }
    return { score: convertedPerformance, advice };
  };

  const downloadPaper = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      // Prepend UTF-8 BOM (\uFEFF) to guarantee correct decoding in Windows Notepad / other editors
      const bom = "\uFEFF";
      const blob = new Blob([bom + text], { type: "text/plain;charset=utf-8" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, "_blank");
    }
  };

  const selectedThemeObj = exhibitionThemes.find(t => t.id === selectedTheme);
  const details = selectedTheme ? themeDetails[selectedTheme] : null;

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-gold-500 selection:text-black">
      <AnimatePresence mode="wait">
        {!selectedTheme ? (
          /* ========================================================
             1. PORTAL LOBBY (策劃大廳)
             ======================================================== */
          <motion.div
            key="portal-lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header - Academic Excellence */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-gold-900/10 pt-24 lg:pt-0">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-400/5 skew-x-12 translate-x-1/2"></div>
              
              <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative z-10">
                {/* Left: Content */}
                <div className="lg:col-span-7 space-y-12 py-12 lg:py-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4">
                      <span className="h-[2px] w-16 bg-gold-600"></span>
                      <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.6em]">Academic Curator</span>
                    </div>
                    
                    <div className="relative w-full max-w-4xl py-4 lg:py-6">
                      <img 
                        src="/images/stt-word-003.png" 
                        alt="學術研究：卓越引領策略新典範" 
                        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] filter brightness-110 contrast-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="space-y-10 max-w-2xl"
                  >
                    <div className="space-y-6">
                      <div className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs tracking-widest font-mono rounded">
                        ★ 學術策展 ➔ 點選專題探索一頁式文獻導讀與動態模擬
                      </div>
                      <p className="text-gold-200/40 text-xl md:text-2xl font-serif leading-relaxed font-light border-l border-gold-400/20 pl-10 py-2">
                        莊鈞翔博士學術成就累積超過十二萬字的商管博士及企業管理碩士論文，研究聚焦於公司治理法遵及服務永續。此處以四大主題形式，提供具高度互動的數位合規智庫特展。
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Right: The Portrait - Standardized to High Prestige Suit */}
                <div className="lg:col-span-5 h-full relative flex items-end justify-center lg:justify-end overflow-visible">
                  <motion.div 
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full flex items-end justify-center lg:justify-end"
                  >
                    {/* Cinematic Light Beam */}
                    <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-600/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

                    <div className="relative h-full w-full max-w-[500px] lg:max-w-none flex items-end justify-end font-serif">
                      <img 
                        src="/images/portrait-005.png" 
                        alt="Dr. Eric Chuang" 
                        className="w-full h-auto max-h-[75vh] lg:max-h-[90vh] object-contain object-bottom filter drop-shadow-[0_0_50px_rgba(212,175,55,0.1)] contrast-[1.1]"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Integration Scrim - Strengthened */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10"></div>

                      {/* Clean Signature Overlay */}
                      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-8 z-20 pointer-events-none select-none">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-44 lg:w-52 h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Curated Themes Entry Points */}
            <div className="container mx-auto px-6 py-24 space-y-16" id="catalog-section">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-gold-500 font-mono text-[10px] tracking-[0.4em] uppercase">Academic Thematic Exhibit Halls</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#F8F7F4] font-light leading-tight">
                  學術智慧：四大核心治理特展
                </h2>
                <div className="h-[1px] w-24 bg-gold-400/20 mx-auto"></div>
                <p className="text-gold-200/40 text-sm leading-relaxed pb-6 font-serif">
                  點選下方專題門戶，直接進入一頁式學術展，包含研究成果精華、實務工具導覽及動態風險模擬儀。
                </p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {exhibitionThemes.map((theme, idx) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setActiveSubTab("insight");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`relative p-8 rounded-lg border bg-gradient-to-br ${theme.color} hover:border-gold-400/40 transition-all duration-500 cursor-pointer group flex flex-col justify-between h-full shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.08)]`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gold-500 font-mono text-xs tracking-widest font-bold">
                          {theme.number}
                        </span>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-md group-hover:scale-110 transition-transform duration-300">
                          {theme.icon}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-serif text-[#F8F7F4] font-medium tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                          {theme.title}
                        </h3>
                        <p className="text-gold-400/90 text-[11px] font-sans tracking-wide leading-relaxed">
                          {theme.subtitle}
                        </p>
                      </div>

                      <p className="text-gold-200/40 text-xs leading-relaxed font-serif line-clamp-3">
                        {theme.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gold-400/10 flex items-center justify-between text-[11px] font-mono tracking-widest text-gold-400">
                      <span>文獻編號 ∥ {theme.paperId.toUpperCase()}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                        進入特展 <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             2. THEMATIC EXHIBIT HALL (主題獨立特展展廳)
             ======================================================== */
          <motion.div
            key={`exhibit-hall-${selectedTheme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 py-24 space-y-16"
          >
            {/* Header / Navigation bar back to hall */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold-400/10 pb-6 mb-12">
              <button
                onClick={() => setSelectedTheme(null)}
                className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> 返回策劃大廳
              </button>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-white/50">
                <span>學術展廳</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gold-400">{selectedThemeObj?.number}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white">{selectedThemeObj?.title}</span>
              </div>
            </div>

            {/* Prestigious Curated Sub-navigation Controls */}
            <div className="flex border-b border-gold-400/10 gap-2 sm:gap-6 flex-wrap pb-1">
              <button
                onClick={() => setActiveSubTab("insight")}
                className={`py-3 px-5 font-mono text-xs tracking-widest uppercase transition-all border-b-2 hover:text-[#F8F7F4] cursor-pointer ${
                  activeSubTab === "insight"
                    ? "border-gold-450 text-gold-450 font-bold"
                    : "border-transparent text-gold-200/45"
                }`}
                id="tab-btn-insight"
              >
                專題創見 ∥ Insight
              </button>
              <button
                onClick={() => setActiveSubTab("pains")}
                className={`py-3 px-5 font-mono text-xs tracking-widest uppercase transition-all border-b-2 hover:text-[#F8F7F4] cursor-pointer ${
                  activeSubTab === "pains"
                    ? "border-gold-450 text-gold-450 font-bold"
                    : "border-transparent text-gold-200/45"
                }`}
                id="tab-btn-pains"
              >
                危機痛點與實務解方 ∥ Strategy
              </button>
              <button
                onClick={() => setActiveSubTab("resource")}
                className={`py-3 px-5 font-mono text-xs tracking-widest uppercase transition-all border-b-2 hover:text-[#F8F7F4] cursor-pointer ${
                  activeSubTab === "resource"
                    ? "border-gold-450 text-gold-450 font-bold"
                    : "border-transparent text-gold-200/45"
                }`}
                id="tab-btn-resource"
              >
                學術研究成果下載 ∥ Download
              </button>
            </div>

            {/* Tab 1: Insight (專題創見) */}
            {activeSubTab === "insight" && (
              <motion.div
                key="tab-insight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-center"
              >
                {/* Left: Dynamic Academic Insight details */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                  <div className="space-y-3 font-serif">
                    <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.4em] block">
                      {selectedThemeObj?.number} ∥ THEMATIC PRESTIGE ONE-SHEETER
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#F8F7F4] font-medium leading-tight tracking-[0.02em]">
                      {selectedThemeObj?.title}
                    </h1>
                    <p className="text-gold-400 text-xs sm:text-sm font-sans bg-gold-400/5 px-4 py-2 border-l-2 border-gold-400 inline-block font-light">
                      {selectedThemeObj?.subtitle}
                    </p>
                  </div>

                  {/* Elegant High-Prestige Quote Plate */}
                  <div className="relative p-6 lg:p-8 bg-zinc-950/60 border border-gold-400/15 rounded-md md:rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                    <span className="absolute -top-6 -left-3 text-8xl font-sans text-gold-400/10 pointer-events-none select-none" style={{ fontFamily: 'Georgia, serif' }}>“</span>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[18px] xl:text-xl text-[#F8F7F4]/95 font-serif leading-relaxed font-light relative z-10 italic">
                      {selectedTheme === "theme1" && "「家族企業傳承的失控，往往不是因為股權移轉的數字出了問題，而是原因於『代際價值鏈與組織主權』未能融入剛性治理結構。」"}
                      {selectedTheme === "theme2" && "「真正的合規，不應只是企業的外部成本拘束；那是董事會保護經營主導權，抵禦極致監管與市場動態性劇變的最強悍策略法袍。」"}
                      {selectedTheme === "theme3" && "「當產品與技術愈發同質化，高階專業機構的存續唯一解，在於建立去中心化、高門檻與利他並重的 CRM 的信任體制關係治理。」"}
                      {selectedTheme === "theme4" && "「企業家的個人天賦能開創帝國，但是唯有透過變革型與交易型中介風格的交併調和，其創意才能淬鍊為穩定的極致利潤。」"}
                    </p>
                    <div className="pt-3 border-t border-gold-400/5 text-right flex items-center justify-end gap-3 mt-4">
                      <span className="w-8 h-[1px] bg-gold-400/20"></span>
                      <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-[#F8F7F4]/50">— 莊鈞翔博士 學術創見與實務總結</span>
                    </div>
                  </div>
                </div>

                {/* Right: Immersive Portrait - Standardized to High Prestige Suit */}
                <div className="lg:col-span-12 xl:col-span-5 h-full relative flex items-end justify-center xl:justify-end overflow-visible">
                  <div className="relative h-full w-full max-w-[450px] xl:max-w-none flex items-end justify-center xl:justify-end font-serif">
                    {/* Cinematic Light Beam */}
                    <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-600/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

                    <img 
                      src={
                        selectedTheme === "theme1" ? "/images/Eric-Chuang-10.png" :
                        selectedTheme === "theme2" ? "/images/Eric-Chuang-11.png" :
                        selectedTheme === "theme3" ? "/images/Eric-Chuang-12.png" :
                        "/images/Eric-Chuang-13.png"
                      }
                      alt="莊鈞翔博士"
                      className="w-full h-auto max-h-[75vh] lg:max-h-[90vh] object-contain object-bottom filter drop-shadow-[0_0_50px_rgba(212,175,55,0.1)] contrast-[1.1]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Integration Scrim - Strengthened */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10"></div>

                    {/* Clean Signature Overlay */}
                    <div className="absolute bottom-6 md:bottom-12 right-6 md:right-8 z-20 pointer-events-none select-none">
                      <img 
                        src="/signature-eric001.png" 
                        alt="Dr. Eric Chuang Signature" 
                        className="w-32 sm:w-44 lg:w-52 h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Strategy, Pains & Solutions (治理機制) */}
            {activeSubTab === "pains" && (
              <motion.div
                key="tab-pains"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Red-accented Painpoints Section (Strategic Tension / 傳承痛點與治理危機) */}
                  {details && (
                    <div className="space-y-6 bg-black/40 p-6 rounded border border-red-950/20 shadow-xl">
                      <div className="flex items-center gap-3 border-b border-red-900/10 pb-3">
                        <span className="w-1.5 h-5 bg-red-650 rounded"></span>
                        <h3 className="text-base font-serif text-red-450 font-medium tracking-wider uppercase">
                          傳承痛點與治理危機 (Critical Pains & Governance Tension)
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {details.painPoints.map((pt, i) => (
                          <div 
                            key={i} 
                            className="p-5 bg-[#0c0505] border border-red-950/40 hover:border-red-900/30 transition-all rounded duration-300 relative overflow-hidden group"
                          >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-800/10 group-hover:bg-red-800/50 transition-all" />
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-red-500 font-mono text-xs font-bold">0{i+1}.</span>
                              <h4 className="text-sm font-bold text-[#F8F7F4] tracking-wide font-serif">{pt.title}</h4>
                            </div>
                            <p className="text-red-200/40 text-xs leading-relaxed font-sans">
                              {pt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gold-accented Solutions Section (Empirical Solutions / 實證對策與主權重建) */}
                  {details && (
                    <div className="space-y-6 bg-black/40 p-6 rounded border border-gold-950/20 shadow-xl">
                      <div className="flex items-center gap-3 border-b border-gold-900/10 pb-3">
                        <span className="w-1.5 h-5 bg-gold-450 rounded"></span>
                        <h3 className="text-base font-serif text-gold-450 font-medium tracking-wider uppercase">
                          實務解方與主權重建 (Empirical Solutions & Governance Sovereignty)
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {details.solutions.map((sol, i) => (
                          <div 
                            key={i} 
                            className="p-6 bg-[#050605] border border-gold-950/40 hover:border-gold-800/40 transition-all rounded duration-300 relative overflow-hidden group"
                          >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-800/15 group-hover:bg-gold-500/50 transition-all" />
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-gold-500 font-mono text-sm font-bold">A{i+1}.</span>
                              <h4 className="text-sm font-bold text-gold-400 tracking-wide">{sol.title}</h4>
                            </div>
                            <p className="text-gold-200/40 text-xs md:text-sm leading-relaxed font-sans">
                              {sol.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Resource (學術研究成果下載) */}
            {activeSubTab === "resource" && (
              <motion.div
                key="tab-resource"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start"
              >
                {/* Left Column: Methodology */}
                <div className="lg:col-span-8 space-y-8">
                  {details && (
                    <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded space-y-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-gold-400" />
                        <h4 className="text-sm font-semibold text-gold-300 font-serif tracking-widest uppercase">學術文獻實證方法 (Research Methodology)</h4>
                      </div>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed leading-loose font-sans">
                        {details.methodology}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Area: Cover & Download Options with multiple file formats */}
                <div className="lg:col-span-4 space-y-8 bg-gradient-to-b from-zinc-950 to-black p-8 border border-gold-400/10 rounded-lg">
                  <div className="space-y-4">
                    <span className="text-gold-500 font-mono text-[9px] tracking-[0.2em] block uppercase text-center font-bold">EXHIBIT MASTER RESOURCE</span>
                    <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto overflow-hidden shadow-2xl border border-gold-400/20 group hover:border-gold-400 transition-all duration-300">
                      <img 
                        src={selectedThemeObj?.paperObj.cover} 
                        alt={selectedThemeObj?.paperObj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-[#F8F7F4] text-sm font-serif font-medium px-4 leading-relaxed">
                        {selectedThemeObj?.paperObj.title}
                      </p>
                      <span className="text-[10px] font-mono text-gold-500 tracking-widest block mt-2 uppercase">
                        {selectedThemeObj?.paperObj.type} ∥ 論文文獻著作
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gold-900/10">
                    <span className="text-white/40 text-[10px] font-sans tracking-wider block mb-2 uppercase text-center font-bold">
                      — 智庫導讀與實體文獻下載通道 —
                    </span>

                    {/* Heyzine Link */}
                    <a
                      href={selectedThemeObj?.paperObj.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 py-4 px-4 text-xs bg-gold-400 text-black hover:bg-gold-500 transition-all font-bold tracking-widest uppercase no-underline rounded shadow-[0_5px_15px_rgba(206,163,56,0.3)] cursor-pointer"
                    >
                      <BookOpen className="h-4 w-4" strokeWidth={2.5} /> 線上翻頁展閱 Heyzine
                    </a>
                    
                    {/* Handout (TXT) with UTF-8 BOM protection */}
                    <button
                      onClick={() => {
                        if (selectedThemeObj?.paperObj.downloadUrl) {
                          downloadPaper(
                            selectedThemeObj.paperObj.downloadUrl,
                            `【莊鈞翔博士文獻手札】${selectedThemeObj.paperObj.title}.txt`
                          );
                        }
                      }}
                      className="w-full flex items-center justify-center gap-3 py-4 px-4 text-xs bg-black text-gold-400 hover:bg-gold-400/10 border border-gold-400/30 transition-all font-mono tracking-widest uppercase rounded cursor-pointer"
                    >
                      <FileText className="h-4 w-4" /> 下載博士文獻手札 (.TXT)
                    </button>

                    {/* PDF/ZIP Download Link */}
                    {selectedThemeObj?.paperObj.id === "phd3" ? (
                      <button
                        onClick={() => setShowPhd3Warning(true)}
                        className="w-full flex items-center justify-center gap-3 py-4 px-4 text-xs bg-black text-[#facc15] hover:bg-gold-400/10 border border-gold-400/30 transition-all font-mono tracking-widest uppercase rounded cursor-pointer"
                      >
                        <Download className="h-4 w-4" /> 下載完整研究論文 (.ZIP)
                      </button>
                    ) : (
                      <a
                        href={`/papers/${selectedThemeObj?.paperObj.id}.pdf`}
                        download={`【莊鈞翔博士完整論文】${selectedThemeObj?.paperObj.title}.pdf`}
                        className="w-full flex items-center justify-center gap-3 py-4 px-4 text-xs bg-black text-[#facc15] hover:bg-gold-400/10 border border-gold-400/30 transition-all font-mono tracking-widest uppercase rounded no-underline cursor-pointer"
                      >
                        <FileText className="h-4 w-4" /> 讀取完整研究論文 (.PDF)
                      </a>
                    )}

                    <div className="rounded bg-gold-400/5 p-4 border border-rose-900/10">
                      <p className="text-[11px] text-gold-400/60 leading-relaxed font-sans text-center">
                        ※ 註：完整學術論文 PDF 檔案已配置本地高規路由；論文手札（TXT版本）已整合 UTF-8 BOM 解碼安全鎖；可確保於任何 Windows 及 Mac 閱讀器中完美呈現，絕不產生任何亂碼與格式錯誤。
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

              {/* Part 3: Interactive Simulation Engine (交互式智能治理模擬儀) */}
              <div className="border border-gold-400/10 bg-gradient-to-b from-[#090909] to-black p-8 md:p-12 space-y-10 rounded">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Sliders className="h-5 w-5 text-gold-400" />
                    <span className="text-gold-500 font-mono text-[10px] tracking-widest uppercase">DYNAMIC DECISION SIMULATOR</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#F8F7F4] font-light">
                    學術智慧決策判讀儀: {selectedTheme === "theme1" ? "傳承結構與防禦成熟評估" : 
                                         selectedTheme === "theme2" ? "公司抗風險預防合規評核" : 
                                         selectedTheme === "theme3" ? "專業機構永續信頼資本儀" : 
                                         "領導风格中介變革績效路徑計"}
                  </h3>
                  <p className="text-gold-200/30 text-xs font-display">
                    調整下方核心研究變數（滑移滑塊），實時檢視論文實證模型所推算之策略指標與莊博士專家診斷：
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-center">
                  
                  {/* Theme 1 Simulator Inputs */}
                  {selectedTheme === "theme1" && (
                    <>
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>股權閉鎖與結構成熟度 (Ownership Lock-in)</span>
                            <span>{theme1Sliders.ownership}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme1Sliders.ownership}
                            onChange={(e) => setTheme1Sliders({...theme1Sliders, ownership: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>下代利害關係人價值鏈認同度 (Successor Alignment)</span>
                            <span>{theme1Sliders.alignment}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme1Sliders.alignment}
                            onChange={(e) => setTheme1Sliders({...theme1Sliders, alignment: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>治理機制健全性（如憲章與契約）(Governance Rules)</span>
                            <span>{theme1Sliders.rules}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme1Sliders.rules}
                            onChange={(e) => setTheme1Sliders({...theme1Sliders, rules: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-black p-8 border border-gold-400/10 space-y-6">
                        <div className="flex items-center justify-between border-b border-gold-400/10 pb-4">
                          <span className="text-[11px] font-mono tracking-widest text-gold-500">Maturity Score</span>
                          <span className="text-4xl font-mono text-gold-300 font-bold">{calculateTheme1Maturity().score} / 100</span>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-mono text-gold-400">當前安全等級:</div>
                          <div className="text-lg font-serif font-semibold text-white">{calculateTheme1Maturity().rate}</div>
                        </div>
                        <div className="p-4 bg-gold-400/5 text-[#F8F7F4]/60 text-xs leading-relaxed font-display border-l border-gold-400">
                          {calculateTheme1Maturity().advice}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Theme 2 Simulator Inputs */}
                  {selectedTheme === "theme2" && (
                    <>
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>專家顧問決策融入深度 (Advisory Integration)</span>
                            <span>{theme2Sliders.adviceDepth}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme2Sliders.adviceDepth}
                            onChange={(e) => setTheme2Sliders({...theme2Sliders, adviceDepth: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>動態流程審查活性化 (Dynamic Internal Audit)</span>
                            <span>{theme2Sliders.dynamicAudit}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme2Sliders.dynamicAudit}
                            onChange={(e) => setTheme2Sliders({...theme2Sliders, dynamicAudit: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>法規與新合規情境演訓率 (Incident Simulation Drills)</span>
                            <span>{theme2Sliders.incidentDrills}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme2Sliders.incidentDrills}
                            onChange={(e) => setTheme2Sliders({...theme2Sliders, incidentDrills: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-black p-8 border border-gold-400/10 space-y-6">
                        <div className="flex items-center justify-between border-b border-gold-400/10 pb-4">
                          <span className="text-[11px] font-mono tracking-widest text-gold-500">Compliance Firewall Health</span>
                          <span className="text-4xl font-mono text-gold-300 font-bold">{calculateTheme2Engine().score} / 100</span>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-mono text-gold-400">董事防禦主權狀態:</div>
                          <div className="text-lg font-serif font-semibold text-white">{calculateTheme2Engine().status}</div>
                        </div>
                        <div className="p-4 bg-gold-400/5 text-[#F8F7F4]/60 text-xs leading-relaxed font-display border-l border-gold-400">
                          {calculateTheme2Engine().advice}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Theme 3 Simulator Inputs */}
                  {selectedTheme === "theme3" && (
                    <>
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>資訊不對稱縮減成熟度 (Information Symmetry)</span>
                            <span>{theme3Sliders.symmetry}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme3Sliders.symmetry}
                            onChange={(e) => setTheme3Sliders({...theme3Sliders, symmetry: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>智慧共同創造與服務重整度 (Service Value Co-Creation)</span>
                            <span>{theme3Sliders.coCreation}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme3Sliders.coCreation}
                            onChange={(e) => setTheme3Sliders({...theme3Sliders, coCreation: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>合規倫理防禦牆強度 (Ethics Firewall Health)</span>
                            <span>{theme3Sliders.ethicsWall}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme3Sliders.ethicsWall}
                            onChange={(e) => setTheme3Sliders({...theme3Sliders, ethicsWall: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-black p-8 border border-gold-400/10 space-y-6">
                        <div className="flex items-center justify-between border-b border-gold-400/10 pb-4">
                          <span className="text-[11px] font-mono tracking-widest text-gold-500">Service Sustainability Index</span>
                          <span className="text-4xl font-mono text-gold-300 font-bold">{calculateTheme3Trust().score} / 100</span>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-mono text-gold-400">關係治理安全等級:</div>
                          <div className="text-lg font-serif font-semibold text-white">{calculateTheme3Trust().status}</div>
                        </div>
                        <div className="p-4 bg-gold-400/5 text-[#F8F7F4]/60 text-xs leading-relaxed font-display border-l border-gold-400">
                          {calculateTheme3Trust().advice}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Theme 4 Simulator Inputs */}
                  {selectedTheme === "theme4" && (
                    <>
                      <div className="lg:col-span-6 space-y-8">
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>創業家基本創新驅動力 (Entrepreneurial Innovation)</span>
                            <span>{theme4Sliders.innovation}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme4Sliders.innovation}
                            onChange={(e) => setTheme4Sliders({...theme4Sliders, innovation: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>變革型領導風格中介度 (Transformational Mediation)</span>
                            <span>{theme4Sliders.transformational}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme4Sliders.transformational}
                            onChange={(e) => setTheme4Sliders({...theme4Sliders, transformational: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono text-gold-300">
                            <span>交易型領導風格中介度 (Transactional Mediation)</span>
                            <span>{theme4Sliders.transactional}%</span>
                          </div>
                          <input 
                            type="range" min="10" max="100" value={theme4Sliders.transactional}
                            onChange={(e) => setTheme4Sliders({...theme4Sliders, transactional: parseInt(e.target.value)})}
                            className="w-full accent-gold-400 h-1 bg-gold-450/10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-black p-8 border border-gold-400/10 space-y-6">
                        <div className="flex items-center justify-between border-b border-gold-400/10 pb-4">
                          <span className="text-[11px] font-mono tracking-widest text-gold-500">Predicted Business Performance Yield</span>
                          <span className="text-4xl font-mono text-gold-300 font-bold">{calculateTheme4Mediation().score}%</span>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-mono text-gold-400">變革轉化與實證診斷:</div>
                        </div>
                        <div className="p-4 bg-gold-400/5 text-[#F8F7F4]/60 text-xs leading-relaxed font-display border-l border-gold-400">
                          {calculateTheme4Mediation().advice}
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* Back to Hall option */}
              <div className="pt-8 text-center">
                <button
                  onClick={() => {
                    setSelectedTheme(null);
                    setTimeout(() => {
                      const el = document.getElementById("catalog-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className="px-8 py-4 bg-transparent border border-gold-400/20 text-gold-400 hover:text-black hover:bg-gold-400 font-mono text-xs tracking-widest uppercase transition-all rounded"
                >
                  回大廳查看完整大目錄
                </button>
              </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* PhD3 30MB Limit Warning/Download Modal Overlay */}
      <AnimatePresence>
        {showPhd3Warning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhd3Warning(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0e0e0e] border border-gold-400/20 p-8 md:p-10 rounded shadow-[0_10px_50px_rgba(206,163,56,0.15)] space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPhd3Warning(false)}
                className="absolute top-4 right-4 p-2 text-gold-400/60 hover:text-gold-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-gold-400/15 pb-4">
                <Download className="h-6 w-6 text-gold-400 shrink-0" />
                <h3 className="text-[#F8F7F4] text-lg md:text-xl font-serif tracking-wide font-medium">
                  系統原稿極速下載通道 (.ZIP)
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm leading-relaxed text-[#F8F7F4]/85">
                <p className="font-serif text-gold-300 font-medium text-center md:text-left">
                  《顧客關係管理對服務永續之探討：以 A 國際法律事務所為例》
                </p>
                <p>
                  由於本篇論文包含深度實務實證、關係數據矩陣與核心學術附錄，高精度排版使得原始 PDF 檔案容量達 <strong className="text-gold-400 font-mono">30MB+</strong>。
                </p>
                <p className="text-white/70">
                  為保障您的閱讀流暢度並維持系統載入力，我們已將完整原始 PDF 高度壓縮打包為
                  <strong className="text-gold-300 font-mono"> `.ZIP 壓縮封包`</strong>。點擊下方通道即可一鍵下載至您的設備。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2">
                {/* Channel - Direct ZIP */}
                <a
                  href="/papers/phd3.zip"
                  download="【莊鈞翔博士完整論文】顧客關係管理對服務永續之探討_A國際法律事務所.zip"
                  className="flex items-center justify-between p-4 bg-[#b45309] hover:bg-[#92400e] text-white rounded transition-all font-bold group no-underline text-xs shadow-[0_5px_15px_rgba(180,83,9,0.3)] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4 shrink-0" />
                    1. 立即下載完整論文壓縮檔 (.ZIP) — 推薦
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">
                    隨身檔案包
                  </span>
                </a>

                {/* Channel - Heyzine */}
                <a
                  href="https://heyzine.com/flip-book/5a08b85184.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gold-400 hover:bg-gold-500 text-black rounded transition-all font-bold group no-underline text-xs cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 shrink-0" />
                    2. 線上極速 3D 翻頁展閱 (免解壓)
                  </span>
                  <ExternalLink className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </a>

                {/* Channel - LINE */}
                <a
                  href="https://line.me/R/ti/p/@sttpress" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 text-[#F8F7F4]/60 rounded hover:bg-zinc-800/50 transition-all font-bold group no-underline text-xs cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-zinc-500 shrink-0" />
                    3. 聯絡 STT 官方 LINE 索取 (專人備分通道)
                  </span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40">
                    專人發送
                  </span>
                </a>
              </div>

              <div className="bg-gold-400/[0.03] p-4 border border-gold-400/10 rounded">
                <p className="text-[11px] text-gold-400/50 leading-relaxed font-sans text-center">
                  💡 貼心提醒：本主題之「博士論文手札摘要 (.TXT)」已由 UTF-8 BOM 協定妥善封存，在 Windows 或 Mac 中皆可直接在此頁面下載點擊閱讀，絕無格式亂碼之虞。
                </p>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowPhd3Warning(false)}
                  className="px-6 py-2 bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase rounded cursor-pointer"
                >
                  關閉視窗
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
