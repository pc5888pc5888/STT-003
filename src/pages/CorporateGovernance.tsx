import { useState } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  ShieldAlert, 
  FileText, 
  Infinity as InfinityIcon, 
  TrendingUp, 
  Compass, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Award, 
  Activity, 
  Zap, 
  BookOpen, 
  Maximize2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CorporateGovernance({ 
  onNavigate, 
  activeSection = 'intro' 
}: { 
  onNavigate?: (page: string) => void;
  activeSection?: 'intro' | 'modules' | 'simulator' | 'academic';
}) {
  const [boardIndependence, setBoardIndependence] = useState(50);
  const [riskOrientation, setRiskOrientation] = useState(50);
  const [generationVision, setGenerationVision] = useState(50);

  const modules = [
    {
      title: "策略治理",
      titleEn: "STRATEGIC GOVERNANCE",
      desc: "治理架構設計 · 董事會治理 · 決策機制",
      descEn: "Governance Framework · Board Governance · Decision Mechanisms",
      detailedDesc: "確立董事會獨立監督職能，設計透明的高階經理人決策架構，防止權力過度集中，建立長效防弊防火牆。",
      icon: <Shield className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "風險管理",
      titleEn: "RISK MANAGEMENT",
      desc: "風險評估 · 情境分析 · 防禦機制",
      descEn: "Risk Assessment · Scenario Analysis · Defense Mechanisms",
      detailedDesc: "前瞻性地識別產業、法律、地緣與市場風險，利用動態情境模擬建立韌性防禦機制，保障企業資產續航力。",
      icon: <ShieldAlert className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "制度建構",
      titleEn: "SYSTEMS & STRUCTURES",
      desc: "內控制度 · 治理規範 · 流程建構",
      descEn: "Internal Control · Governance Systems · Process Architecture",
      icon: <FileText className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "將合規程序內化至日常營運流程，拒絕教條式的規條，推動活性化的高效內部稽核與流程自動合規化。",
    },
    {
      title: "長期價值與永續文明",
      titleEn: "LONG-TERM VALUE & CIVILIZATION",
      desc: "定義永續 · 社會責任 · 世代價值",
      descEn: "Sustainability · Responsibility · Generational Value",
      icon: <InfinityIcon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "不為追求單季盈餘妥協核心誠信，為社會、環境與下一代儲備文化資本與文明價值，構築長青企業靈魂。",
    },
    {
      title: "競爭優勢強化",
      titleEn: "COMPETITIVE ADVANTAGE",
      desc: "策略整合 · 資源配置 · 執行優化",
      descEn: "Strategic Integration · Resource Allocation · Execution Optimization",
      icon: <TrendingUp className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "將合規優勢轉化為制度性品牌溢價，降低國際市場對接壁壘，在策略棋局中取得高維度的談判優勢。",
    },
  ];

  // Logic for the interactive terminal simulation
  const calculateIntegrityIndex = () => {
    const balancedValue = 
      boardIndependence * 0.4 + 
      riskOrientation * 0.3 + 
      generationVision * 0.3;
    return Math.round(balancedValue);
  };

  const getStrategicReport = () => {
    const score = calculateIntegrityIndex();
    if (score < 40) {
      return {
        rating: "急需治理重整 DEGRADED RESILIENCE",
        color: "text-red-400",
        summary: "決策權力過於集聚且缺乏前瞻防禦。企業面臨高度內部控制黑洞與關鍵法律訴訟風險漏洞。",
        expertAdvice: "應優先引進獨立董事查核機制，建立董事會健康審議秩序，並縮減風險槓桿暴露度，保護公司長期根基。",
      };
    } else if (score < 75) {
      return {
        rating: "制度健全但成長略顯遲滯 STABLE BALANCED",
        color: "text-gold-400",
        summary: "企業擁有基本的法律防線與治理架構，但在策略判讀前瞻度與世代傳承布局上偏向保守。",
        expertAdvice: "建議在穩健合規的前提下，注入數位化合規（如ESGAI）決策門控，活化董事會戰略格局，釋放智慧紅利。",
      };
    } else {
      return {
        rating: "頂級治理與領袖主權 ULTRA PRESTIGE",
        color: "text-emerald-400",
        summary: "董事會獨立決策力極高、風險判讀與合規文化完美平衡，永續世代價值完全轉化為深厚的品牌信任壁壘。",
        expertAdvice: "您已具備跨世代長青企業的卓越姿態，建議進一步建立產業治理生態系，以思想領袖（Thought Leadership）輸出治理規範。",
      };
    }
  };

  const currentReport = getStrategicReport();

  const handleTabClick = (section: 'intro' | 'modules' | 'simulator' | 'academic') => {
    if (onNavigate) {
      if (section === 'intro') {
        onNavigate('corporate-governance');
      } else {
        onNavigate(`corporate-governance-${section}`);
      }
    }
  };

  return (
    <div id="corporate-governance-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Decorative Gold Laser Lines & Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        
        {/* Ambient background chess */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none z-0 transition-opacity duration-1000"
          style={{ backgroundImage: "url('/images/bg-platform-chess.png')" }}
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
                    STRATEGIC GOVERNANCE & LAW COMPLIANCE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                  企業治理與策略判讀
                </h1>
                <p className="text-gold-500/85 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                  CORPORATE GOVERNANCE & STRATEGIC INSIGHT
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  type="button"
                  onClick={() => onNavigate?.('positioning')}
                  className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer"
                >
                  進入定位評估系統 <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('simulator')}
                  className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                >
                  效能指標測評 <Compass className="w-4 h-4" />
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
                  onClick={() => handleTabClick('modules')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='modules' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  五大核心模組
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('simulator')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='simulator' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  效能指標模擬
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
                      最高度的商業博弈，本質上是制度架構的競逐。
                    </p>
                    <p className="text-stone-300/90 text-xs sm:text-sm leading-relaxed font-light">
                      莊鈞翔博士將法學邏輯導入企業策略中，重塑經營層的「法治」與「策略」基因。協助現代企業在大變局的棋盤上理清決策迷霧，設計嚴謹而富有活力的抗震體制。
                    </p>
                  </motion.div>
                )}

                {activeSection === 'modules' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      {modules.map((mod, idx) => (
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
                            <p className="text-[10px] text-stone-300 leading-relaxed font-light">{mod.detailedDesc}</p>
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
                    <div className="sm:col-span-5 bg-black/80 border border-white/5 p-3.5 rounded-xl space-y-3.5 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      <div className="space-y-1">
                        <span className="text-[7.5px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold block">SIMULATOR CONTROLS</span>
                        <p className="text-[10px] text-stone-400 leading-tight">調整治理參數分析決策成熟：</p>
                      </div>

                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-stone-300 text-[10px]">董事長與總經理職權劃分</span>
                            <span className="font-mono text-gold-400 font-bold">{boardIndependence}</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={boardIndependence}
                            onChange={(e) => setBoardIndependence(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-stone-300 text-[10px]">防弊防火牆與風險回饋</span>
                            <span className="font-mono text-gold-400 font-bold">{riskOrientation}</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={riskOrientation}
                            onChange={(e) => setRiskOrientation(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-stone-300 text-[10px]">永續及跨代文明策略</span>
                            <span className="font-mono text-gold-400 font-bold">{generationVision}</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={generationVision}
                            onChange={(e) => setGenerationVision(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Simulator Diagnostics */}
                    <div className="sm:col-span-7 bg-zinc-950 border border-gold-400/20 rounded-xl p-3.5 shadow-2x space-y-3.5 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      <div className="border-b border-white/5 pb-2 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-[7.5px] font-mono text-gold-400 tracking-widest block leading-none">STRATEGIC MATRIX DIAGNOSTICS</span>
                          <h4 className={`text-[11.5px] tracking-wide font-bold uppercase mt-1 leading-tight ${currentReport.color}`}>
                            {currentReport.rating}
                          </h4>
                        </div>
                        <div className="bg-black border border-gold-500/20 px-2 py-0.5 rounded leading-none text-right">
                          <span className="text-gold-400 font-mono text-[10px] font-bold">{calculateIntegrityIndex()}%</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-left">
                        <div className="text-[9px] text-[#e6c84c] font-bold tracking-wider font-sans uppercase">⚖️ 企業法律內控狀態</div>
                        <p className="text-[10px] text-stone-300 leading-relaxed bg-[#0c0c0c] p-2.5 rounded border border-white/5 font-light">
                          {currentReport.summary}
                        </p>

                        <div className="text-[9px] text-gold-400 font-bold tracking-wider font-sans uppercase mt-2">🧭 智庫建議採行治理手續</div>
                        <p className="text-[10px] text-stone-450 leading-relaxed border-l border-gold-400/25 pl-2 font-light">
                          {currentReport.expertAdvice}
                        </p>
                      </div>
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
                          src="/images/paper_corporate_governance.png" 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5 flex-grow">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider">THEME II ∥ 博士學位研究著作</span>
                        <h3 className="text-xs sm:text-sm font-serif text-stone-100 font-bold leading-tight">企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例</h3>
                        <p className="text-[8.5px] text-stone-400 font-light leading-relaxed">研究生：莊鈞翔 博士 ∥ 關鍵字：企業策略、法律風險、公司治理、預防法學</p>
                        
                        <p className="text-[10px] text-stone-300 leading-relaxed font-light font-serif line-clamp-4">
                          摘要：將公司治理法制化，提供高維度指導。外部專業力量協助企業評量，預先審慎評估，落實「預防法學」思維，防杜人情及內幕侵蝕，鞏固頂格永續。
                        </p>

                        <div className="flex gap-2 pt-1">
                          <a 
                            href="https://heyzine.com/flip-book/dec98b2e5b.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/20 text-[#e6c84c] text-[8px] font-sans font-bold px-2.5 py-1.5 uppercase rounded text-center transition-all no-underline inline-block"
                          >
                            📖 線上預覽
                          </a>
                          <a 
                            href="/papers/phd2.pdf"
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
                  src="/images/Eric-Chuang-11.png" 
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
          <div className="flex gap-4 text-[8px] font-mono text-stone-400 tracking-widest uppercase">
            <span>GOVERNANCE FIRST</span>
            <span className="text-[#e6c84c]/60">PRESTIGE MODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
