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

export default function FamilyGovernance({ onNavigate }: { onNavigate?: (page: string) => void }) {
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

  const [activeTabSection, setActiveTabSection] = useState<'intro' | 'framework' | 'stages'>('intro');

  return (
    <div id="family-governance-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Exquisite Laser Lines & Visual Overlays */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-amber-500/[0.04] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Glass Workspace Header & Tabs Container */}
      <div className="container mx-auto px-6 pt-6 relative z-30 max-w-7xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-400/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-gold-400 to-transparent" />
          <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-bold font-mono">FAMILY GOVERNANCE & LEGACY TRUST</span>
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
            onClick={() => setActiveTabSection('framework')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='framework' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            治理核心架構
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('stages')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='stages' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            傳承接班階梯
          </button>
        </div>
      </div>

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Ambient background image representing pillars and columns */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] object-cover pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
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
                    家族治理與企業接班
                  </h1>
                  <p className="text-gold-500/80 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                    FAMILY GOVERNANCE & SUCCESSION PRACTICE
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

                <div className="space-y-3 max-w-xl text-stone-300 text-sm leading-relaxed font-light font-sans">
                  <p className="text-stone-100 font-normal">
                    「富過三代」不是財富的奇蹟，而是制度與誠信的法理必然。
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    協助華人頂尖企業家族起草「家族憲章」、規劃「閉鎖性控股、信託防火牆」等主權架構。在二代、三代接班歷程中，釐清產權與治理機制防火牆，昇華血緣情誼為世代不朽的文明名望與文明財富價值。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a 
                    href="https://lin.ee/yJrCTeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer no-underline"
                  >
                    聯絡首席智庫顧問 <ArrowRight className="w-4.5 h-4.5" />
                  </a>
                  <button 
                    type="button"
                    onClick={() => setActiveTabSection('stages')}
                    className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                  >
                    進展接班階梯 <Compass className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Stunning Graphic representing security */}
              <div className="lg:col-span-12 xl:col-span-5 flex justify-center lg:justify-end relative pb-6 lg:pb-0 h-[220px] sm:h-[300px]">
                {/* 3D Glass shield visual node rings */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center border border-gold-400/20 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-black/95 backdrop-blur-3xl shadow-[0_45px_90px_rgba(0,0,0,0.95),_0_0_50px_rgba(230,200,76,0.05)]">
                  <div 
                    className="absolute inset-0 opacity-[0.22] bg-cover bg-center rounded-full pointer-events-none mix-blend-color-dodge" 
                    style={{ backgroundImage: "url('/images/background_image_002.png')" }}
                  />

                  {/* Central Glow lock node */}
                  <div className="w-24 h-24 rounded-full border-2 border-[#e6c84c] bg-zinc-950 flex flex-col items-center justify-center relative z-20 shadow-[0_0_40px_rgba(230,200,76,0.25)]">
                    <FileLock2 className="w-8 h-8 text-[#e6c84c] mb-1" />
                    <span className="text-[8px] font-mono tracking-[0.2em] text-gold-400 font-bold uppercase font-sans">FAMILY LOCK</span>
                  </div>

                  <div className="absolute w-[200px] h-[200px] border border-dashed border-gold-400/10 rounded-full animate-[spin_40s_linear_infinite]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FRAMEWORK */}
          {activeTabSection === 'framework' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h2 className="text-xl sm:text-2xl font-sans font-light text-white leading-tight">
                  家族治理核心架構
                </h2>
                <p className="text-stone-400 text-xs font-light">
                  融合現代商事法與信託學、股權防火牆，鞏固卓越家風資產承襲。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frameworkItems.map((mod, idx) => (
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

          {/* TAB 3: STAGES */}
          {activeTabSection === 'stages' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Select Stage (Left Column) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-gold-400/20 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold font-sans">CHOOSE STAGE</span>
                    <p className="text-[11px] text-stone-400">選取家族傳承所處關鍵接班階段：</p>
                  </div>

                  <div className="space-y-2">
                    {successionStages.map((stage, sidx) => {
                      const isActive = sidx === activeStage;
                      return (
                        <button
                          key={sidx}
                          type="button"
                          onClick={() => setActiveStage(sidx)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isActive 
                              ? "bg-gold-400/5 border-gold-400 text-gold-400 shadow-md shadow-gold-500/5" 
                              : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-mono tracking-widest uppercase">STAGE 0{stage.index}</span>
                            <h3 className="text-xs font-bold tracking-wide block">{stage.title}</h3>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-gold-400 rotate-90" : "text-stone-600"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Display Result (Right Column) */}
              <div className="lg:col-span-8">
                <div className="bg-zinc-950 border border-gold-400/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative min-h-[300px] flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent blur-xl" />
                  
                  <div className="space-y-4">
                    {/* Top line with stage meta */}
                    <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-3 gap-2">
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-mono text-gold-500 tracking-widest">SUCCESSION ARCHITECTURE ENGINE</p>
                        <h3 className="text-base font-semibold tracking-wide text-white">
                          {successionStages[activeStage].title} <span className="text-[10px] font-mono font-normal text-stone-500 uppercase tracking-widest ml-1">{successionStages[activeStage].titleEn}</span>
                        </h3>
                      </div>

                      {/* Maturity meter */}
                      <div className="space-y-1 text-right min-w-[150px]">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-stone-400">平均治理制度化成熟度</span>
                          <span className="text-gold-400 font-bold">{successionStages[activeStage].maturity}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${successionStages[activeStage].maturity}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-gold-400 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Challenges vs Actions Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Common Pitfalls Card */}
                      <div className="space-y-2 text-left">
                        <div className="flex items-center gap-1.5 bg-rose-500/5 text-rose-400 px-2.5 py-1 border border-rose-500/10 rounded w-max">
                          <FileLock2 className="w-3.5 h-3.5" />
                          <span className="text-[9.5px] font-bold tracking-wider font-sans uppercase">常見法律與經營盲點</span>
                        </div>
                        <ul className="space-y-2 pl-0 list-none text-left">
                          {successionStages[activeStage].challenges.map((chal, cidx) => (
                            <li key={cidx} className="text-[11px] text-stone-300 leading-relaxed flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                              <span>{chal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Highly Recommended Advisory Actions */}
                      <div className="space-y-2 text-left">
                        <div className="flex items-center gap-1.5 bg-gold-400/10 text-gold-400 px-2.5 py-1 border border-gold-400/20 rounded w-max">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[9.5px] font-bold tracking-wider font-sans uppercase">智庫建議採行治理手續</span>
                        </div>
                        <ul className="space-y-2 pl-0 list-none text-left">
                          {successionStages[activeStage].actions.map((act, aidx) => (
                            <li key={aidx} className="text-[11px] text-stone-300 leading-relaxed flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* Dr. Eric's Quote of the stage */}
                  <div className="mt-4 border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                    <div className="italic text-[10.5px] text-stone-300 max-w-xl pl-3 border-l-2 border-gold-400">
                      {successionStages[activeStage].quote}
                    </div>
                    
                    <a
                      href="https://lin.ee/yJrCTeo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-gold-400 hover:bg-gold-500 text-black px-4 py-2.5 rounded font-bold tracking-wider text-[10px] uppercase transition-all inline-flex items-center gap-1 cursor-pointer no-underline"
                    >
                      預約閉門諮詢 <ArrowRight className="w-3 h-3" />
                    </a>
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
