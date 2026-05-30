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

export default function InternalCompliancePortal({ 
  onNavigate, 
  activeSection = 'intro' 
}: { 
  onNavigate?: (page: string) => void;
  activeSection?: 'intro' | 'pillars' | 'simulator' | 'academic';
}) {
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

  const handleTabClick = (section: 'intro' | 'pillars' | 'simulator' | 'academic') => {
    if (onNavigate) {
      if (section === 'intro') {
        onNavigate('internal-compliance');
      } else {
        onNavigate(`internal-compliance-${section}`);
      }
    }
  };

  return (
    <div id="internal-compliance-portal-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Exquisite Laser Lines & Visual Overlays */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-yellow-500/[0.04] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Ambient background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] object-cover pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-1" />

        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title, Buttons, Tabs bar and dynamic content */}
            <div className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center h-full">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 mb-11">
                  <div className="w-6 h-px bg-gold-400" />
                  <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-bold font-mono">
                    INTERNAL RISK DEFENSE & COMPLIANCE PORTAL
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                  企業法律風險自律與稽核
                </h1>
                <p className="text-gold-500/85 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                  INTERNAL LAW & COMPLIANCE SYSTEM
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="https://lin.ee/yJrCTeo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer no-underline"
                >
                  聯絡首席法遵顧問 <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  type="button"
                  onClick={() => handleTabClick('simulator')}
                  className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                >
                  決策盲檢測試 <Compass className="w-4 h-4" />
                </button>
              </div>

              {/* Options Navigation Tabs placed directly under the action buttons */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-950/90 border border-gold-400/20 rounded-xl backdrop-blur-md w-max max-w-full">
                <button 
                  type="button"
                  onClick={() => handleTabClick('intro')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='intro' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  系統引言
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('pillars')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='pillars' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  法遵五大支柱
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('simulator')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='simulator' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  防禦決策模擬
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('academic')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='academic' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  學術著作文獻
                </button>
              </div>

              {/* Dynamic Content Area below navigation bar */}
              <div className="pt-1.5 w-full">
                {activeSection === 'intro' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 max-w-xl text-[#F8F7F4]/90 text-sm leading-relaxed font-light"
                  >
                    <p className="text-[#e6c84c] font-serif font-extralight text-base leading-relaxed">
                      「合規不是不犯法的底線，而是企業對外宣告商業文明的崇高品位。」
                    </p>
                    <p className="text-stone-300/90 text-xs sm:text-sm leading-relaxed font-light">
                      提供「權責授權、法遵稽核與匿名舉報（吹哨人機制）」的頂級制度自淨程式。莊鈞翔博士親領智庫團隊，剖析內部利害關係衝突，運用剛性法規門控防禦不當決策、防止核心智慧產權流失、及降低企業全球融資成本。
                    </p>
                  </motion.div>
                )}

                {activeSection === 'pillars' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      {pillars.map((mod, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-950/90 border border-gold-400/20 hover:border-gold-400/60 p-4 rounded-xl flex flex-col justify-between space-y-2 relative overflow-hidden"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gold-400/5 flex items-center justify-center border border-gold-400/20">
                                {mod.icon}
                              </div>
                              <div>
                                <h3 className="font-sans text-white text-xs font-bold tracking-wide">{mod.title}</h3>
                                <p className="text-[7.5px] font-mono text-gold-500 tracking-wider uppercase mt-0.5">{mod.titleEn}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 border-t border-white/5 pt-2">
                            <p className="text-[10px] text-stone-300 leading-relaxed font-light">{mod.detailed}</p>
                            <p className="text-[9px] text-stone-500 leading-relaxed italic border-l border-gold-400/20 pl-1.5">{mod.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'simulator' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start"
                  >
                    {/* Simulator Inputs in Column */}
                    <div className="sm:col-span-5 bg-black/80 border border-white/5 p-3.5 rounded-xl space-y-2.5 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      <div className="space-y-1">
                        <span className="text-[7.5px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold block">SCENARIO LIST</span>
                        <p className="text-[10px] text-stone-450 leading-tight">點擊切換衝突場景：</p>
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
                              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                                isActive 
                                  ? "bg-gold-400/5 border-gold-400 text-gold-400 shadow-md shadow-gold-500/5" 
                                  : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                              }`}
                            >
                              <div className="space-y-0.5 pr-1 text-left">
                                <h3 className="text-[10.5px] font-bold block truncate max-w-[140px] sm:max-w-[160px]">{sc.title}</h3>
                              </div>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${isActive ? "text-gold-400 rotate-90" : "text-stone-600"}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simulator Diagnostics */}
                    <div className="sm:col-span-7 bg-zinc-950 border border-gold-400/20 rounded-xl p-3.5 shadow-2x space-y-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1 text-left">
                      <div className="border-b border-white/5 pb-2">
                        <span className="text-[7.5px] font-mono text-gold-400 tracking-widest block font-bold">CASE UNDER STUDY</span>
                        <h4 className="text-[11.5px] font-bold text-white leading-normal mt-1">
                          {complianceScenarios[selectedScenario].title}
                        </h4>
                        <p className="text-[10px] text-stone-300 leading-relaxed bg-white/[0.01] p-2 rounded border border-white/5 mt-1.5 italic font-light">
                          「 {complianceScenarios[selectedScenario].context} 」
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[7.5px] font-mono text-stone-500 font-bold uppercase tracking-wider">選擇您推動的法遵決策分支 ∥ Choose Option</p>
                        <div className="grid grid-cols-1 gap-2">
                          {complianceScenarios[selectedScenario].options.map((opt, oidx) => {
                            const isSelected = selectedAction === oidx;
                            return (
                              <button
                                key={oidx}
                                type="button"
                                onClick={() => setSelectedAction(oidx)}
                                className={`text-left p-2.5 rounded-lg border transition-all flex items-start gap-2 cursor-pointer ${
                                  isSelected 
                                    ? "bg-gold-400/5 border-gold-400 text-gold-400" 
                                    : "bg-black/60 border-white/5 text-stone-200 hover:border-white/10"
                                }`}
                              >
                                <div className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSelected ? "border-gold-400 text-gold-400" : "border-stone-600 text-transparent"
                                }`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">{opt.type}</span>
                                  <p className="text-[10px] leading-tight font-bold">{opt.label}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Doctor's Verdict Feedback */}
                      {selectedAction !== null && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-t border-white/10 pt-2 mt-2 space-y-1.5"
                        >
                          <div className="flex items-center gap-1.5 bg-gold-400/10 text-gold-400 px-2.5 py-0.5 border border-gold-400/20 rounded w-max leading-none">
                            <span className="text-[8.5px] font-bold tracking-wider font-sans uppercase">
                              {complianceScenarios[selectedScenario].options[selectedAction].verdict}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-300 leading-relaxed pl-1.5 border-l-2 border-[#e6c84c] font-light">
                            {complianceScenarios[selectedScenario].options[selectedAction].feedback}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'academic' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-left max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start bg-zinc-950/90 border border-gold-400/20 p-4 rounded-xl">
                      <div className="w-20 sm:w-24 shrink-0 aspect-[3/4] bg-stone-900 rounded-lg border border-gold-400/20 shadow-lg overflow-hidden self-center sm:self-start">
                        <img 
                          src="/images/paper_customer_relationship.png" 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5 flex-grow">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider">THEME III ∥ 博士學位研究著作</span>
                        <h3 className="text-xs sm:text-sm font-serif text-stone-100 font-bold leading-tight">顧客關係管理對服務永續之探討：以 A 國際法律事務所為例</h3>
                        <p className="text-[8.5px] text-stone-400 font-light leading-relaxed">研究生：莊鈞翔 博士 ∥ 指導教授：翁慈青 博士</p>
                        
                        <p className="text-[10px] text-stone-300 leading-relaxed font-light font-serif line-clamp-4">
                          摘要：將公司法學服務有形化、軌跡化。藉由系統與深度紀錄書之機制，為原本高度無形的法律服務賦予可預測的高維保障，使大型家族與公司產生制度信賴。
                        </p>

                        <div className="flex gap-2 pt-1">
                          <a 
                            href="https://heyzine.com/flip-book/5a08b85184.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/20 text-[#e6c84c] text-[8px] font-sans font-bold px-2.5 py-1.5 uppercase rounded text-center transition-all no-underline inline-block"
                          >
                            📖 線上預覽
                          </a>
                          <a 
                            href="/papers/phd3.zip"
                            download
                            className="bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-200 text-[8px] font-sans font-bold px-2.5 py-1.5 uppercase rounded text-center transition-all no-underline inline-block"
                          >
                            📥 下載 PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Dynamic Portrait from the Academic Exhibition Curation Page (Always stays proudly visible & matches Papers.tsx exactly) */}
            <div className="lg:col-span-5 flex justify-center xl:justify-end relative pb-6 lg:pb-0 h-[380px] sm:h-[460px] lg:h-[480px] xl:h-[580px] overflow-visible z-20">
              <div className="relative w-full h-full flex items-end justify-center xl:justify-end overflow-visible">
                {/* Subtle ambient backglow */}
                <div className="absolute w-80 h-80 bg-[#e6c84c]/[0.05] rounded-full blur-[110px] pointer-events-none bottom-10 right-0 z-0" />
                
                {/* High Prestige Portrait Image - Highly Prominent */}
                <img 
                  src="/images/Eric-Chuang-12.png" 
                  alt="莊鈞翔 博士" 
                  className="h-[105%] xl:h-[110%] w-auto object-contain object-bottom relative z-10 filter drop-shadow-[0_20px_55px_rgba(0,0,0,0.85)] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Cinematic Bottom Fade to blend portrait smoothly */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/45 to-transparent z-15 pointer-events-none" />
                
                {/* Signature Overlay at bottom right */}
                <div className="absolute bottom-6 right-4 sm:right-8 md:right-12 lg:right-4 xl:right-6 tracking-normal z-20 pointer-events-none select-none">
                  <img 
                    src="/signature-eric001.png" 
                    alt="莊鈞翔 博士 簽名" 
                    className="w-32 sm:w-40 xl:w-44 h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
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
