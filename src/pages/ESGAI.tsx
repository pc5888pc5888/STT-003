import { useState } from "react";
import { motion } from "motion/react";
import { 
  Database, 
  TrendingUp, 
  Cpu, 
  Activity, 
  FileText, 
  Share2, 
  Compass, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  Terminal, 
  Brain, 
  Sparkles, 
  AlertTriangle 
} from "lucide-react";

export default function ESGAI({ 
  onNavigate, 
  activeSection = 'intro' 
}: { 
  onNavigate?: (page: string) => void;
  activeSection?: 'intro' | 'features' | 'console' | 'academic';
}) {
  const [activeTab, setActiveTab] = useState("env");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const gatingDomains = {
    env: {
      title: "環境治理資產門控",
      titleEn: "ENVIRONMENTAL CAPITAL GATING",
      desc: "自動對審供應鏈與多國碳權法律合規度。以預先防範超額碳排放造成的跨國實質行政罰鍰與環境侵權訴訟威脅。",
      metrics: [
        { label: "製程碳排放超標概率 Carbon Penalty Risk", value: "3.2%" },
        { label: "關係供應商零能耗合規比例 Supplier Compliance", value: "98.5%" },
        { label: "歐盟CBAM跨境碳關稅漏洞對接 EU Compliance Gate", value: "Secure [通過]" }
      ],
      verdict: "E級門控信號良好 · 無重大地質或綠洗法律涉訟風險"
    },
    soc: {
      title: "社會信任誠信自律門控",
      titleEn: "SOCIAL TRUST INTEGRITY GATING",
      desc: "稽查企業勞動安全指標、多國貿易制裁關係防火牆，以及智慧財產與跨境商業機密在協作中的保障效力。",
      metrics: [
        { label: "關係人高管競業利害衝突率 Executive Interlock", value: "0.0%" },
        { label: "跨國機敏合規資產流失概率 Confidentiality Leak", value: "0.05%" },
        { label: "海外反貪腐FCPA法律安全邊際 FCPA Safe Margin", value: "High [優異]" }
      ],
      verdict: "S級門控信號良好 · 已落實內部舉報盲盒與關係交易迴避機制"
    },
    gov: {
      title: "董事會公司治理與防火牆門控",
      titleEn: "BOARD GOVERNANCE FIREWALL GATING",
      desc: "專注防護董事會實質利益迴避。利用智慧算法檢視大股東與經理人持股集中度、表決權重疊，以及非常規關係人交易之法律定性。",
      metrics: [
        { label: "常務審議透明度係數 Board Independence Factor", value: "92.4%" },
        { label: "交叉持股控制黑洞威脅 Cross-holding Blackhole", value: "None [安全]" },
        { label: "非專利技術關聯收購定價合理性 Transaction Sizing", value: "Justified [合規]" }
      ],
      verdict: "G級門控信號頂級 · 決策層主權架構健康防禦已啟動"
    }
  };

  const currentDomainData = gatingDomains[activeTab as keyof typeof gatingDomains];

  const handleStartAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        score: Math.floor(Math.random() * 8) + 92, // 92-99
        verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        nodeStatus: "HEALTHY ACTIVE [策略合規]",
        encryption: "STT-SHA256 SECURED"
      });
    }, 1200);
  };

  const functions = [
    {
      title: "數據整合分析",
      titleEn: "DATA INTEGRATION & ANALYTICS",
      desc: "整合內外部數據 · 即時分析",
      descEn: "Integrate Internal & External Data · Real-time Analytics",
      detailed: "不留數據死角。將企業法遵、跨國子公司營運和財務利益流向，即時整合於大腦中樞，告別滯後的事後審查。",
      icon: <Database className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "風險預測與門控",
      titleEn: "RISK PREDICTION & GATING",
      desc: "AI 預測模型 · 風險評估",
      descEn: "AI Prediction Models · Risk Assessment",
      detailed: "在風險實質爆發前半步進行前瞻辨識。動態捕捉法規更新與競爭者地緣法律威脅，即時施加策略門控引導。",
      icon: <TrendingUp className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "智能決策建議",
      titleEn: "INTELLIGENT RECOMMENDATION",
      desc: "治理建議 · 決策優化",
      descEn: "Governance Recommendations · Decision Optimization",
      detailed: "莊博士與智庫算法大模型的完美雙螺旋合體。向經理人提供具備法條實證支持的最適策略資源配置方案。",
      icon: <Cpu className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
  ];

  const handleTabClick = (section: 'intro' | 'features' | 'console' | 'academic') => {
    if (onNavigate) {
      if (section === 'intro') {
        onNavigate('esg-ai');
      } else {
        onNavigate(`esg-ai-${section}`);
      }
    }
  };

  return (
    <div id="esgai-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
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
                    INTELLIGENT DECISION & EXTREME TRUST GATING
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                  ESGAI 智慧治理常設系統
                </h1>
                <p className="text-gold-500/85 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                  INTELLIGENT ASSISTED GOVERNANCE
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
                  聯絡開通系統權限 <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  type="button"
                  onClick={() => handleTabClick('console')}
                  className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                >
                  智能門控控制台 <Compass className="w-4 h-4" />
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
                  onClick={() => handleTabClick('features')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='features' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  常設核心功能
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('console')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='console' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  實時智能門控
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
                      「以演算法約束複雜風險，用智慧照亮治理主權盲區。」
                    </p>
                    <p className="text-stone-300/90 text-xs sm:text-sm leading-relaxed font-light">
                      這是一套融合了莊鈞翔博士幾十年治理法規實務，與現代企業大數據門控模型的創新型決策輔助平台。將治理指標（G）、社會誠信責任（S）、環境碳權合規（E），與前沿大語言模型（AI）進行高度自動化與動態的治理稽核運算。
                    </p>
                  </motion.div>
                )}

                {activeSection === 'features' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      {functions.map((mod, idx) => (
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

                {activeSection === 'console' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start"
                  >
                    {/* Gating Selector Column */}
                    <div className="sm:col-span-5 bg-black/80 border border-white/5 p-3.5 rounded-xl space-y-2.5 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      <div className="space-y-1">
                        <span className="text-[7.5px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold block">GATING DOMAINS</span>
                        <p className="text-[10px] text-stone-450 leading-tight">選取自律監控系統域：</p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: "env", label: "環境治理自律門控", short: "E-Gate" },
                          { id: "soc", label: "社會信用誠信監控", short: "S-Gate" },
                          { id: "gov", label: "董事會公司治理自律", short: "G-Gate" }
                        ].map((btn) => {
                          const isActive = activeTab === btn.id;
                          return (
                            <button
                              key={btn.id}
                              type="button"
                              onClick={() => {
                                setActiveTab(btn.id);
                                setAuditResult(null);
                              }}
                              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                                isActive 
                                  ? "bg-gold-400/5 border-gold-400 text-gold-400 shadow-md shadow-gold-500/5" 
                                  : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                              }`}
                            >
                              <span className="text-[10.5px] font-bold">{btn.label}</span>
                              <span className="text-[7.5px] font-mono bg-white/5 px-2 py-0.5 rounded text-stone-500 font-bold">{btn.short}</span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handleStartAudit}
                        disabled={isAuditing}
                        className="w-full bg-gradient-to-r from-gold-400 to-[#b89530] text-black hover:brightness-110 active:scale-95 disabled:opacity-50 h-10 rounded-lg font-mono font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 border-0 cursor-pointer transition-all mt-2"
                      >
                        {isAuditing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>RUNNING AUDIT...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>運行實時門控稽查</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Report Diagnostics console */}
                    <div className="sm:col-span-7 bg-zinc-950 border border-gold-400/20 rounded-xl p-3.5 shadow-2x space-y-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1 text-left">
                      <div className="border-b border-white/5 pb-2">
                        <span className="text-[7.5px] font-mono text-gold-450 tracking-widest block font-bold uppercase">ESGAI GATE PROTOCOL</span>
                        <h4 className="text-[11.5px] font-bold text-white leading-normal mt-0.5">
                          {currentDomainData.title}
                        </h4>
                        <p className="text-[10px] text-stone-300 leading-relaxed bg-white/[0.01] p-2.5 rounded border border-white/5 mt-1.5 italic font-light">
                          「 {currentDomainData.desc} 」
                        </p>
                      </div>

                      {/* Operational Metrics list */}
                      <div className="space-y-1.5">
                        <p className="text-[7.5px] font-mono text-stone-500 tracking-wider font-bold">DIGITAL TELEMETRY METRICS:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {currentDomainData.metrics.map((met, midx) => (
                            <div key={midx} className="bg-black/60 p-2 border border-white/5 rounded-lg space-y-0.5">
                              <span className="text-[8px] text-stone-500 block leading-tight font-sans text-left">{met.label}</span>
                              <span className="text-[10.5px] font-semibold font-mono text-gold-450 block pt-0.5">{met.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Audit result bottom view */}
                      <div className="mt-2 text-[10px]">
                        {isAuditing && (
                          <div className="flex items-center gap-1.5 text-gold-400/60 animate-pulse font-mono">
                            <Terminal className="w-3.5 h-3.5 animate-spin" />
                            <span>CONNECTING CHUANG-AI TRUST NODE...</span>
                          </div>
                        )}

                        {!isAuditing && auditResult === null && (
                          <div className="flex items-center gap-1.5 text-stone-500 font-mono">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>控制台已就緒，請啟動實時門控。</span>
                          </div>
                        )}

                        {!isAuditing && auditResult !== null && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-0.5 text-left">
                              <div className="flex items-center gap-1 text-emerald-400">
                                <CheckCircle className="w-3 h-3" />
                                <h4 className="text-[9px] font-bold uppercase tracking-wider font-sans">稽查成功 · 安全等級頂級</h4>
                              </div>
                              <p className="text-[9.5px] text-stone-300 font-light mt-0.5">
                                測試信號：{currentDomainData.verdict}
                              </p>
                            </div>

                            <div className="bg-black px-2 py-1 border border-emerald-500/20 rounded flex items-baseline gap-1 shrink-0">
                              <span className="text-[#e2f5e0] text-[7.5px] font-mono tracking-widest font-bold">INTEGRITY</span>
                              <span className="text-xs font-mono text-emerald-400 font-bold leading-none">{auditResult.score}</span>
                            </div>
                          </motion.div>
                        )}
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
                          src="/images/paper_personality_innovation.png" 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5 flex-grow">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider">THEME IV ∥ 碩士學位研究著作</span>
                        <h3 className="text-xs sm:text-sm font-serif text-stone-100 font-bold leading-tight">不同世代企業家人格特質、創新能力對企業經營績效之影響-以領導風格為中介變數</h3>
                        <p className="text-[8.5px] text-stone-400 font-light leading-relaxed">研究生：莊鈞翔 博士 ∥ 指導教授：劉自強 博士、張旭玲 博士</p>
                        
                        <p className="text-[10px] text-stone-300 leading-relaxed font-light font-serif line-clamp-4">
                          摘要：探討在世代交替代際傳承之際，不同的領導者特徵如何經由變革型或交易型領導風格調配，對企業長青與經營績效奠定底層防禦優勢，協助經理人彈性配對資源。
                        </p>

                        <div className="flex gap-2 pt-1">
                          <a 
                            href="https://heyzine.com/flip-book/b7ec1c6436.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/20 text-[#e6c84c] text-[8px] font-sans font-bold px-2.5 py-1.5 uppercase rounded text-center transition-all no-underline inline-block"
                          >
                            📖 線上預覽
                          </a>
                          <a 
                            href="/papers/m1.pdf"
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
                  src="/images/Eric-Chuang-13.png" 
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
