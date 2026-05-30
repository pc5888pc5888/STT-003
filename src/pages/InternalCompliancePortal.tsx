import { useState } from "react";
import { motion } from "motion/react";
import { 
  Scale, 
  FileCheck, 
  Search, 
  Eye, 
  Users, 
  Lock, 
  Compass, 
  ArrowRight, 
  FileLock2,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function InternalCompliancePortal({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  const complianceScenarios = [
    {
      title: "關鍵業務競合與保密豁免利害衝突",
      titleEn: "Commercial Trade Conflict & Executive Restraint",
      context: "某子公司正與具有大股東背景的合作方談判排他性合約，該合作方同時投資了企業的直接競合對手。此時，主要董事施壓要求豁免法遵保密審查，以加速投資交割利潤。",
      options: [
        {
          label: "妥協審查，依董事口頭保證採取通融，先加速資金到位擴增短期毛利",
          type: "Short-term Expediency Risk",
          feedback: "⚠️ 嚴重紅線警告！莊鈞翔博士分析：口頭保證在法律訴訟中不合防禦效力，豁免法遵程序將使董事會承擔實質背信責任，面臨法律訴訟與合規信用雪崩風險。",
          verdict: "不當決策 - 增加背信訴訟威脅 (FAIL)"
        },
        {
          label: "堅持法定門控防禦程序，撰理專案利益迴避合規報告，簽訂更為嚴密之違約金信託阻絕防火牆",
          type: "Institutional Defensibility",
          feedback: "✅ 卓越決策！莊鈞翔博士分析：堅持制度門控，將個人權威關入制度鐵籠。這不僅防護了重大股權資產漏洞，更維護了董事會的最高廉潔與外部機構投資者對企業主權的長期信任。",
          verdict: "卓越合規 - 保護公司最高資產與治理主權 (EXCELLENT)"
        }
      ]
    },
    {
      title: "內部舉報人（吹哨者）保護與股東權利博弈",
      titleEn: "Whistleblower Protection versus Major Shareholder Influence",
      context: "合規稽核部收到匿名檢舉，控訴某高階共同創辦人涉及跨境關係人虛假交易。然而該創辦人握有極高的技術專利股權，有其他大股東強力為其抗辯，甚至意圖調閱舉報人來源。",
      options: [
        {
          label: "屈從大股東意圖，以維持融資氛圍為由，私下調查並架空吹哨者，避免擴大對立面",
          type: "Cultural Demise",
          feedback: "⚠️ 企業靈魂潰散！莊鈞翔博士分析：吹哨者機制的瓦解代表自律防線徹底洞開。這不仅損害員工對文化的信心，一旦外部司法機關介入，將使企業喪失法官量刑豁免的寬減優惠條件（如優良內控抗辯權）。",
          verdict: "嚴重盲點 - 企業倫理與實質司法優勢雙失 (FAIL)"
        },
        {
          label: "落實雙重盲盒匿名吹哨保護底層，成立獨立第三方合規調查小組，向監事會及獨董專案匯報",
          type: "Core Integrity",
          feedback: "✅ 永續文明秩序！莊鈞翔博士分析：雖然短期可能引發董事會部分博弈，但這套剛性稽核機制向全公司宣告了誠信文化不容侵犯，將在未來替企業阻絕大筆潛在的關係人交易資產流失與行政鉅額裁罰。",
          verdict: "卓越自律 - 打造銅牆鐵壁般的自淨機制 (EXCELLENT)"
        }
      ]
    }
  ];

  const pillars = [
    {
      title: "內部控制",
      titleEn: "INTERNAL CONTROL",
      desc: "制度設計，流程控制，權責明確",
      descEn: "System Design · Process Control · Clear Responsibilities",
      detailed: "告別僵硬的規約，重整層級授權矩陣（Authorization Matrix），使每一次資金挪動、每一份關鍵簽署皆有跡可循且相互平衡。",
      icon: <Lock className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "法遵機制",
      titleEn: "COMPLIANCE MECHANISM",
      desc: "法規遵循，內部自律，合規監督",
      descEn: "Regulatory Compliance · Internal Audit · Compliance Oversight",
      detailed: "動態對接跨國最新商業法規、營業秘密保護法與洗錢防制規範，建構具備前瞻反應力的常設守法防線。",
      icon: <FileCheck className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "稽核機制",
      titleEn: "AUDIT MECHANISM",
      desc: "稽核監控，場景檢驗，持續改善",
      descEn: "Audit Process · Review Mechanism · Continuous Improvement",
      detailed: "以數位追蹤審計與無預警現場抽檢相結合，將稽核工作化為幫助各事業體自我優化、防杜欺詐風險的智力夥伴。",
      icon: <Search className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "治理透明",
      titleEn: "GOVERNANCE TRANSPARENCY",
      desc: "資訊透明，揭露機制，信任建立",
      descEn: "Transparency · Disclosure · Trust Building",
      detailed: "健全上市櫃規格的資訊揭露（Full Disclosure）體制，增強與利害關係者溝通誠信，降低公司的制度融資溢價成本。",
      icon: <Eye className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "合規文化",
      titleEn: "COMPLIANCE CULTURE",
      desc: "教育訓練，價值內化，行為準則",
      descEn: "Code of Conduct · Value Alignment",
      detailed: "將冰冷的法條提煉成發人深省的決策美學。全面提升全體同仁、幹部的守法自律品位，使誠信成為不耗費稽核成本的自覺本能。",
      icon: <Users className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
  ];

  const [activeTabSection, setActiveTabSection] = useState<'intro' | 'pillars' | 'simulator' | 'academic'>('intro');

  return (
    <div id="internal-compliance-portal-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Exquisite Laser Lines & Visual Overlays */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-yellow-500/[0.04] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Glass Workspace Header & Tabs Container */}
      <div className="container mx-auto px-6 pt-6 relative z-30 max-w-7xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-400/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-gold-400 to-transparent" />
          <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-bold font-mono">INTERNAL LAW & COMPLIANCE SYSTEM</span>
        </div>
        
        {/* Dynamic Glass Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950/90 border border-gold-400/20 rounded-xl backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setActiveTabSection('intro')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='intro' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            本期引言
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('pillars')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='pillars' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            法遵五大支柱
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('simulator')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='simulator' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            防禦決策模擬
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('academic')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='academic' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            學術著作文獻
          </button>
        </div>
      </div>

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Ambient background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] object-cover pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-1" />

        <div className="w-full relative z-10">
          
          {/* TAB 1: INTRO */}
          {activeTabSection === 'intro' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                    企業法律風險自律與稽核
                  </h1>
                  <p className="text-gold-500/80 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                    INTERNAL RISK DEFENSE & COMPLIANCE PORTAL
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

                <div className="space-y-3 max-w-xl text-stone-300 text-sm leading-relaxed font-light font-sans">
                  <p className="text-stone-100 font-normal">
                    「合規不是不犯法的底線，而是企業對外宣告商業文明的崇高品位。」
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    提供「權責授權、法遵稽核與匿名舉報（吹哨人機制）」的頂級制度自淨程式。莊鈞翔博士親領智庫團隊，剖析內部利害關係衝突，運用剛性法規門控防禦不當決策、防止核心智慧產權流失、及降低企業全球融資成本。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a 
                    href="https://lin.ee/yJrCTeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer no-underline"
                  >
                    聯絡首席法遵顧問 <ArrowRight className="w-4.5 h-4.5" />
                  </a>
                  <button 
                    type="button"
                    onClick={() => setActiveTabSection('simulator')}
                    className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                  >
                    決策盲檢測試 <Compass className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: High-Prestige Theme Portrait with Signature (No books, no circular avatar, no awkward badges) */}
              <div className="lg:col-span-12 xl:col-span-5 flex justify-center xl:justify-end relative pb-6 lg:pb-0 h-[380px] sm:h-[460px] lg:h-[480px] xl:h-[520px] overflow-visible">
                <div className="relative w-full h-full flex items-end justify-center xl:justify-end overflow-visible">
                  {/* Subtle ambient backglow */}
                  <div className="absolute w-72 h-72 bg-[#e6c84c]/[0.04] rounded-full blur-[100px] pointer-events-none bottom-10 right-0 z-0" />
                  
                  {/* High Prestige Portrait Image */}
                  <img 
                    src="/images/Eric-Chuang-12.png" 
                    alt="莊鈞翔 博士" 
                    className="h-full w-auto object-contain object-bottom relative z-10 filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Cinematic Bottom Fade to blend portrait smoothly */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/45 to-transparent z-15 pointer-events-none" />
                  
                  {/* Signature Overlay at bottom right */}
                  <div className="absolute bottom-6 right-4 sm:right-8 md:right-12 lg:right-4 xl:right-6 z-20 pointer-events-none select-none">
                    <img 
                      src="/signature-eric001.png" 
                      alt="莊鈞翔 博士 簽名" 
                      className="w-32 sm:w-40 xl:w-44 h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PILLARS */}
          {activeTabSection === 'pillars' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h2 className="text-xl sm:text-2xl font-sans font-light text-white leading-tight">
                  內在法遵五大自律支柱
                </h2>
                <p className="text-stone-400 text-xs font-light">
                  將剛性條款內塑為常態決策程序，擺脫傳統「高管授權漏洞」。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {pillars.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950/90 border border-gold-400/20 hover:border-gold-400/60 p-5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-lg bg-gold-400/5 flex items-center justify-center border border-gold-400/20">
                        {mod.icon}
                      </div>
                      <div>
                        <h3 className="font-sans text-white text-sm font-bold tracking-wide">{mod.title}</h3>
                        <p className="text-[8px] font-mono text-gold-500 tracking-wider uppercase mt-0.5">{mod.titleEn}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t border-white/5 pt-2.5">
                      <p className="text-[11px] text-stone-300 leading-relaxed font-light">{mod.detailed}</p>
                      <p className="text-[10px] text-stone-500 leading-relaxed italic border-l border-gold-400/20 pl-2">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: SIMULATOR */}
          {activeTabSection === 'simulator' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left Selector */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-gold-400/20 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold font-sans">SCENARIO ANALYSIS</span>
                    <p className="text-[11px] text-stone-400">選取高度敏感的企業法理衝突：</p>
                  </div>

                  <div className="space-y-2">
                    {complianceScenarios.map((sc, idx) => {
                      const isActive = idx === selectedScenario;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedScenario(idx);
                            setSelectedAction(null);
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isActive 
                              ? "bg-gold-400/5 border-gold-400 text-gold-400 shadow-md shadow-gold-500/5" 
                              : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                          }`}
                        >
                          <div className="space-y-0.5 pr-2">
                            <h3 className="text-xs font-bold tracking-wide block truncate max-w-[200px]">{sc.title}</h3>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isActive ? "text-gold-400 rotate-90" : "text-stone-600"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Simulator details */}
              <div className="lg:col-span-8">
                <div className="bg-zinc-950 border border-gold-400/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative min-h-[300px] flex flex-col justify-between overflow-hidden">
                  
                  <div className="space-y-4">
                    <div className="border-b border-white/5 pb-2">
                      <span className="text-[9px] font-mono text-gold-500 tracking-widest block font-bold uppercase">CONFLICT DILEMMA CASE STUDY</span>
                      <h4 className="text-sm font-bold text-white leading-normal mt-0.5">
                        {complianceScenarios[selectedScenario].title}
                      </h4>
                      <p className="text-[11px] text-stone-300 leading-relaxed bg-white/[0.02] p-3 border border-white/5 rounded-lg mt-2 italic">
                        「 {complianceScenarios[selectedScenario].context} 」
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] font-mono text-stone-500">PICK ADVISORY OPTION DECISION:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {complianceScenarios[selectedScenario].options.map((opt, oidx) => {
                          const isSelected = selectedAction === oidx;
                          return (
                            <button
                              key={oidx}
                              type="button"
                              onClick={() => setSelectedAction(oidx)}
                              className={`text-left p-3 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer ${
                                isSelected 
                                  ? "bg-gold-400/5 border-gold-400 text-gold-400" 
                                  : "bg-black/60 border-white/5 text-stone-200 hover:border-white/10"
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? "border-gold-400 text-gold-400" : "border-stone-600 text-transparent"
                              }`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[8px] font-mono text-stone-500 block uppercase">{opt.type}</span>
                                <p className="text-[11px] leading-relaxed font-bold">{opt.label}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Doctor's Verdict Feedback */}
                  {selectedAction !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-white/10 pt-3 mt-3 space-y-2"
                    >
                      <div className="flex items-center gap-1.5 bg-gold-400/10 text-gold-400 px-2.5 py-1 border border-gold-400/20 rounded w-max">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[9.5px] font-bold tracking-wider font-sans uppercase">
                          {complianceScenarios[selectedScenario].options[selectedAction].verdict}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-stone-300 leading-relaxed pl-2 border-l-2 border-[#e6c84c]">
                        {complianceScenarios[selectedScenario].options[selectedAction].feedback}
                      </p>
                    </motion.div>
                  )}

                </div>
              </div>
            </motion.div>
          )}

          {activeTabSection === 'academic' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl mx-auto space-y-6"
            >
              {/* Back Button to Papers Hall */}
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('papers')}
                  className="flex items-center gap-1.5 text-gold-450 hover:text-white transition-colors font-mono text-[10px] tracking-wider uppercase bg-transparent border-0 cursor-pointer outline-none"
                >
                  ← 返回學術策展大廳 (Back to Exhibition Hall)
                </button>
              )}

              {/* High-Prestige Academic Curation Card */}
              <div className="bg-zinc-950/90 border border-gold-400/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/[0.03] rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left Column: Cover and Action Buttons */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="aspect-[3/4] w-full max-w-[200px] mx-auto bg-stone-900 rounded-xl border border-gold-400/20 shadow-lg relative group overflow-hidden">
                      <img 
                        src="/images/paper_customer_relationship.png" 
                        alt="顧客關係管理對服務永續之探討 論文封面" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-2 pt-2">
                      <a 
                        href="https://heyzine.com/flip-book/5a08b85184.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/25 text-[#e6c84c] text-[10px] font-sans font-bold tracking-[0.11em] py-2.5 uppercase rounded text-center block transition-all no-underline"
                      >
                        📖 線上翻頁電子書預覽
                      </a>
                      <a 
                        href="/papers/phd3.zip"
                        download
                        className="w-full bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-200 text-[10px] font-sans font-bold tracking-[0.11em] py-2.5 uppercase rounded text-center block transition-all no-underline"
                      >
                        📥 下載論文 ZIP / PDF
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Title and Content */}
                  <div className="w-full md:w-2/3 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest font-bold">THEME III ∥ 博士學位研究著作</span>
                        <span className="text-stone-500 text-[9px] font-mono">文獻編號：PHD3</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-serif text-stone-100 leading-tight">
                        顧客關係管理對服務永續之探討：以 A 國際法律事務所為例
                      </h3>
                      <p className="text-stone-400 text-[10.5px] font-mono leading-relaxed tracking-wide">
                        Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm
                      </p>

                      <div className="text-[11px] text-stone-400 py-2 border-y border-white/5 font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div>
                            <strong className="text-stone-300">研究生 ∥ </strong> 莊鈞翔 博士 ∥ 指導教授：翁慈青 博士
                          </div>
                          <div>
                            <strong className="text-stone-300">關鍵字 ∥ </strong> 顧客關係管理、永續服務、法律服務、國際法律事務所、關係治理
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 py-1 px-3 rounded-lg shrink-0 select-none self-start sm:self-center">
                          <div className="w-10 h-10 rounded-full border border-gold-400/30 overflow-hidden bg-stone-900 shadow animate-fade-in">
                            <img 
                              src="/images/Eric-Chuang-12.png" 
                              alt="莊鈞翔 博士" 
                              className="w-full h-full object-cover scale-110 object-top"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="text-left leading-tight">
                            <span className="block text-[8px] text-gold-400 font-mono tracking-wider">AUTHOR</span>
                            <span className="block text-xs font-serif font-semibold text-stone-200">莊鈞翔 博士</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1 text-[#F8F7F4]/90 font-serif text-[11.5px] leading-relaxed">
                        <strong className="text-gold-400 text-[10px] tracking-widest uppercase font-mono block">摘要 ∥ abstract</strong>
                        <p className="font-light text-stone-300">
                          本研究探討國際法律事務所如何運用顧客關係管理來實現服務永續，並以 A 知名國際法律事務所為例，分析其在顧客關係管理上的具體做法和成效。
                        </p>
                        <p className="font-light text-stone-300">
                          本研究指出 A 國際法律事務所在顧客關係管理上之實踐，包括顧客管理、顧客溝通、顧客服務、顧客回饋等方面，並評估了其在提升顧客服務品質和忠誠度、增加業務營收和市場佔有率、降低營運成本和風險等方面的成效。
                        </p>
                        <p className="font-light text-stone-300">
                          同時，本研究創新提出實施「法律服務紀錄書」之核心方法；此制度能顯著協助客戶針對原本具高度無形、深奧之法律與智權交付過程，產生清晰的「可視性」及「可量化」成果，確立服務深度黏性，順利達成法律服務之長期永續委任！
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Prestige Sub-Footnote Block */}
      <div className="border-t border-gold-400/10 bg-[#050505] py-4 relative z-20 shrink-0">
        <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center sm:justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[10px] font-mono text-stone-500">
            © {new Date().getFullYear()} STT Press 策略智庫數位出版 · 莊鈞翔 博士 (Founder: Eric Chuang, Ph.D.)
          </p>
          <div className="flex gap-4 text-[8px] font-mono text-stone-400 tracking-widest uppercase font-sans">
            <span>GOVERNANCE FIRST</span>
            <span className="text-[#e6c84c]/60">PRESTIGE MODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
