import { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Landmark, 
  ShieldCheck, 
  Award, 
  Heart, 
  Coins, 
  ChevronRight, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  Bookmark, 
  FileLock2, 
  Building 
} from "lucide-react";

export default function FamilyGovernance({ 
  onNavigate, 
  activeSection = 'intro' 
}: { 
  onNavigate?: (page: string) => void;
  activeSection?: 'intro' | 'framework' | 'stages' | 'academic';
}) {
  const [activeStage, setActiveStage] = useState(0);

  const successionStages = [
    {
      index: 1,
      title: "創始聚核期",
      titleEn: "FOUNDERS ANCHOR",
      period: "第一代掌權 · 核心積累中",
      maturity: 35,
      challenges: [
        "股權集中於創辦人個人，缺乏多股東治理思維",
        "接班意願未明，接班人缺乏體系化的治理與實戰歷練",
        "未雨綢繆意識不足，意定監護或遺囑法律程序處於空白狀態"
      ],
      actions: [
        "確立創辦人「意定監護、信託遺囑」等底層資產安全機制",
        "起草「家族憲章」初稿，提煉創辦精神與家族核心信仰價值",
        "設立下一代接班培育工作坊，融合現代法律與企業經營心法"
      ],
      quote: "「傳承的首要任務不是分配資產，而是確立在沒有創始人時，家族依然可以有序決策的法律根基。」"
    },
    {
      index: 2,
      title: "跨代共治期",
      titleEn: "CO-GOVERNANCE TRANSITION",
      period: "一代與二代交接 · 跨體系博弈",
      maturity: 65,
      challenges: [
        "「情比法大」的家族糾紛干預公司營運，使經理人無所適從",
        "新舊思維摩擦，多個子女間持股分散可能導致公司決策徹底流產",
        "資產多重跨境、稅務法律合規風險與重分配不公造成的家族撕裂"
      ],
      actions: [
        "建立正式的「家族理事會 (Family Council)」與常務議事規則",
        "執行股權結構實質重組：引進閉鎖性持股公司或家族信託鎖定控制權",
        "明訂家族成員與非成員高階經理人之權限邊界（權責透明分治）"
      ],
      quote: "「共治不是妥協，而是利用清晰的組織章程、權責邊界，將感性親情昇華為理性信託結構。」"
    },
    {
      index: 3,
      title: "家族辦公室永續期",
      titleEn: "MULTIGENERATIONAL SUITE",
      period: "多代傳承 · 家族辦公室運作",
      maturity: 95,
      challenges: [
        "家族人口繁茂，缺乏共同使命，凝聚力逐漸稀釋",
        "大型基金資產配置在法律變革與資產泡沫中的抗震韌性挑戰",
        "接班世代跨界多元化，傳統實體產業運作與新潮科技投資的鴻溝"
      ],
      actions: [
        "建立完善的「單一/聯合家族辦公室 (Family Office)」治理框架",
        "設立「家族慈善信託基金」，融合ESG價值，提升世代社會影響力",
        "啟動「跨代常設智庫」，運用ESGAI實施多維度的治理稽核監督"
      ],
      quote: "「此時的家族已成為一種文化文明的載體。我們維護的不是紙面財富，而是超越時代的跨世代文明價值。」"
    }
  ];

  const frameworkItems = [
    {
      title: "家族憲章",
      titleEn: "FAMILY CHARTER",
      desc: "價值凝聚、使命共識、治理原則",
      descEn: "Values · Mission · Governance Principles",
      detailed: "釐清家族立身之本，將非金錢性質 of 家族精神與誠信準則，撰擬為具有約束與引導力的家族內部根本憲條。",
      icon: <Heart className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "家族信託與資產傳承",
      titleEn: "TRUST & WEALTH TRANSFER",
      desc: "信託架構、資產傳承、稅務規劃",
      descEn: "Trust Architecture · Wealth Transfer · Tax Planning",
      detailed: "防範繼承人因意外、訴訟等導致股權向海外或旁系流失，設計安全的信託分配條款，永續控管股權防火牆。",
      icon: <Coins className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "治理架構",
      titleEn: "GOVERNANCE STRUCTURE",
      desc: "家族治理權責、運作分工、決策機制",
      descEn: "Structure · Roles · Decision Mechanisms",
      detailed: "成立家族議會與家族辦公室運作細則，在家族成員與企業核心業務、專業經理人間建立三維隔離與引導帶動。",
      icon: <Landmark className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "世代培育",
      titleEn: "NEXT GEN DEVELOPMENT",
      desc: "教育培育、思維培養、領導力塑造",
      descEn: "Education · Succession · Leadership",
      detailed: "不局限於傳統學歷學識，而致力於二代實戰決策「法學邏輯、治理判讀、人本經營」等領袖主權思維的高端學府培力。",
      icon: <Users className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "財富與風險治理",
      titleEn: "WEALTH & RISK GOVERNANCE",
      desc: "資產保護、風險控管、永續配置",
      descEn: "Asset Protection · Risk Control · Allocation",
      detailed: "進行跨地區資產與債務法律隔離。透過精細的動態壓力測試，防範婚姻破裂、債權人追討等對家族血統基業之侵襲。",
      icon: <ShieldCheck className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "家族永續",
      titleEn: "FAMILY SUSTAINABILITY",
      desc: "傳承延續、家族影響力、永續使命",
      descEn: "Legacy · Impact · Sustainable Mission",
      detailed: "打造永續長存的名望與文化資產。引導家族資本投入利他的學術教育與社會貢獻，讓家族名譽化為受世代崇敬的文明地標。",
      icon: <Award className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
  ];

  const handleTabClick = (section: 'intro' | 'framework' | 'stages' | 'academic') => {
    if (onNavigate) {
      if (section === 'intro') {
        onNavigate('family-governance');
      } else {
        onNavigate(`family-governance-${section}`);
      }
    }
  };

  return (
    <div id="family-governance-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Exquisite Laser Lines & Visual Overlays */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-amber-500/[0.04] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Ambient background image representing pillars and columns */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] object-cover pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-1" />

        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Title, Buttons, Tabs bar and dynamic content */}
            <div className="lg:col-span-7 space-y-5 text-left flex flex-col justify-center h-full">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-6 h-px bg-gold-400" />
                  <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-bold font-mono">
                    FAMILY GOVERNANCE & LEGACY TRUST
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                  家族治理與企業接班
                </h1>
                <p className="text-gold-500/85 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                  FAMILY GOVERNANCE & SUCCESSION PRACTICE
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
                  聯絡首席智庫顧問 <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  type="button"
                  onClick={() => handleTabClick('stages')}
                  className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-6 sm:px-8 py-3 rounded font-sans font-bold tracking-[0.2em] text-[10px] sm:text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                >
                  進展接班階梯 <Compass className="w-4 h-4" />
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
                  onClick={() => handleTabClick('framework')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='framework' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  治理核心架構
                </button>
                <button 
                  type="button"
                  onClick={() => handleTabClick('stages')}
                  className={`px-3.5 py-1.5 text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.1em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeSection==='stages' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
                >
                  傳承接班階梯
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
                      「富過三代」不是財富的奇蹟，而是制度與誠信的法理必然。
                    </p>
                    <p className="text-stone-300/90 text-xs sm:text-sm leading-relaxed font-light">
                      協助華人頂尖企業家族起草「家族憲章」、規劃「閉鎖性控股、信託防火牆」等主權架構。在二代、三代接班歷程中，釐清產權與治理機制防火牆，昇華血緣情誼為世代不朽的文明名望與文明財富價值。
                    </p>
                  </motion.div>
                )}

                {activeSection === 'framework' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      {frameworkItems.map((mod, idx) => (
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

                {activeSection === 'stages' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start"
                  >
                    {/* Select Stage */}
                    <div className="sm:col-span-5 space-y-1.5 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      {successionStages.map((stage, sidx) => {
                        const isActive = sidx === activeStage;
                        return (
                          <button
                            key={sidx}
                            type="button"
                            onClick={() => setActiveStage(sidx)}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                              isActive 
                                ? "bg-gold-400/5 border-gold-400 text-gold-400 shadow-md shadow-gold-500/5" 
                                : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                            }`}
                          >
                            <div className="space-y-0.5 leading-tight">
                              <span className="text-[7.5px] font-mono tracking-widest uppercase block">STAGE 0{stage.index}</span>
                              <h3 className="text-[10.5px] font-bold tracking-wide block">{stage.title}</h3>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-gold-400 rotate-90" : "text-stone-600"}`} />
                          </button>
                        );
                      })}
                    </div>

                    {/* Stage detail screen */}
                    <div className="sm:col-span-7 bg-zinc-950 border border-gold-400/20 rounded-xl p-3.5 shadow-2x space-y-3 max-h-[260px] sm:max-h-[300px] xl:max-h-[380px] overflow-y-auto pr-1">
                      <div className="border-b border-white/5 pb-2">
                        <p className="text-[7.5px] font-mono text-gold-500 tracking-widest leading-none">SUCCESSION ARCHITECTURE ENGINE</p>
                        <h3 className="text-xs font-semibold tracking-wide text-white mt-1 leading-tight">
                          {successionStages[activeStage].title} <span className="text-[8px] font-mono font-normal text-stone-500 uppercase tracking-widest block mt-0.5">{successionStages[activeStage].titleEn}</span>
                        </h3>
                      </div>

                      <div className="space-y-2 text-left">
                        <div className="text-[9.5px] text-rose-450 font-bold tracking-wider uppercase">⚠️ 常見法律與經營盲點</div>
                        <ul className="space-y-1 pl-0 list-none text-left">
                          {successionStages[activeStage].challenges.map((chal, cidx) => (
                            <li key={cidx} className="text-[10.5px] text-stone-300 leading-relaxed flex items-start gap-1">
                              <span className="w-1 h-1 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                              <span>{chal}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="text-[9.5px] text-gold-400 font-bold tracking-wider uppercase mt-2">🧭 智庫建議採行治理手續</div>
                        <ul className="space-y-1 pl-0 list-none text-left">
                          {successionStages[activeStage].actions.map((act, aidx) => (
                            <li key={aidx} className="text-[10.5px] text-stone-300 leading-relaxed flex items-start gap-1">
                              <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
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
                          src="/images/paper_succession_family.png" 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1.5 flex-grow">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider">PHD1 ∥ 博士學位研究著作</span>
                        <h3 className="text-xs sm:text-sm font-serif text-stone-100 font-bold leading-tight">臺灣企業接班人的佈局規劃與傳承家族價值</h3>
                        <p className="text-[8.5px] text-stone-400 font-light leading-relaxed">指導團隊：紀又綺、莊鈞翔 博士 ∥ 關鍵字：家族企業、接班佈局、家族價值</p>
                        
                        <p className="text-[10px] text-stone-300 leading-relaxed font-light font-serif line-clamp-4">
                          摘要：探討接班傳承概念，採取深度文獻分析法。臺灣家族成功接班不僅是職位及權力移轉，而是完善溝通、以憲章和信託制度將新代公司治理及早佈建，永續德性。
                        </p>

                        <div className="flex gap-2 pt-1">
                          <a 
                            href="https://heyzine.com/flip-book/ff46f2b661.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/20 text-[#e6c84c] text-[8px] font-sans font-bold px-2.5 py-1.5 uppercase rounded text-center transition-all no-underline inline-block"
                          >
                            📖 線上預覽
                          </a>
                          <a 
                            href="/papers/phd1.pdf"
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
                  src="/images/Eric-Chuang-10.png" 
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
