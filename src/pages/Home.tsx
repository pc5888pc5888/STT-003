import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, Users, Scale, Landmark, Brain, BookOpen, Globe, Award } from "lucide-react";
import { articles } from "../data/mockData";

export default function Home({ onNavigate, currentPage }: { onNavigate: (page: string) => void; currentPage?: string }) {
  const [activeSection, setActiveSection] = useState<'hero' | 'governance' | 'positioning' | 'strategist' | 'insights'>('hero');

  useEffect(() => {
    if (currentPage === "governance") {
      setActiveSection("governance");
    } else if (currentPage === "home") {
      setActiveSection("hero");
    }
  }, [currentPage]);

  // Handle section transition and sync header nav state
  const goToSection = (section: 'hero' | 'governance' | 'positioning' | 'strategist' | 'insights') => {
    setActiveSection(section);
    if (section === 'hero') {
      onNavigate('home');
    } else if (section === 'governance') {
      onNavigate('governance');
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <motion.section 
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col pt-4 lg:pt-0 bg-[#050505] lg:overflow-hidden justify-end border-b border-white/5 pb-0 h-auto lg:h-[calc(100vh-80px)] min-h-[calc(100vh-80px)]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url('/images/bg-hero-boardroom.png')" }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex-grow flex flex-col justify-end h-full">
              <div className="flex flex-col-reverse md:flex-row items-end md:justify-between gap-12 md:gap-4 lg:gap-4 pt-4 lg:pt-0 w-full h-full">
                {/* Left Content */}
                <div className="w-full md:w-1/2 lg:w-[43%] flex flex-col justify-center space-y-5 lg:space-y-6 py-6 md:py-8 lg:self-center">
                  <div className="space-y-3 lg:space-y-4">
                    <h1 className="text-[1.8rem] md:text-[2.2rem] lg:text-[36px] xl:text-[42px] font-serif font-light leading-[1.35] text-white tracking-widest max-w-none">
                      <span className="block md:inline lg:block whitespace-normal md:whitespace-nowrap">當制度開始失序；</span>
                      <span className="block md:inline lg:block mt-1 sm:mt-2 whitespace-normal md:whitespace-nowrap">
                        <span className="text-[#e6c84c] font-normal">治理</span>便成為企業最後的秩序。
                      </span>
                    </h1>
                    <div className="w-16 h-[1px] bg-[#e6c84c]/40 my-3 lg:my-4"></div>
                    <div className="space-y-1.5">
                      <p className="text-sm sm:text-base md:text-[18px] font-sans font-light text-white/70 leading-tight">
                        以治理設計決策的邊界，
                      </p>
                      <p className="text-sm sm:text-base md:text-[18px] font-sans font-light text-white/70 leading-tight">
                        讓企業在不確定中保持穩定與信任。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 lg:space-y-8">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
                      <button 
                        onClick={() => goToSection('governance')}
                        className="w-full sm:w-auto bg-gradient-to-br from-[#e6c84c] via-gold-500 to-gold-600 hover:brightness-110 text-black px-8 py-3.5 rounded flex items-center justify-center gap-3 group transition-all font-bold shadow-2xl no-underline text-sm md:text-base cursor-pointer border-0"
                      >
                        進入治理架構 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => onNavigate('about')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 transition-all font-bold flex items-center justify-center gap-3 no-underline text-sm md:text-base cursor-pointer bg-transparent border-0"
                      >
                        探索 STT 智庫 <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Core Focus Areas */}
                    <div className="flex items-center gap-1.5 sm:gap-3 pt-5 border-t border-white/5 max-w-3xl overflow-x-auto scrollbar-none">
                      {[
                        { en: "Governance Systems", zh: "治理系統" },
                        { en: "Decision Architecture", zh: "決策架構" },
                        { en: "Family & Enterprise Governance", zh: "家族與企業治理" }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left group px-1 sm:px-2 ${
                            i !== 2 ? 'border-r border-white/10' : ''
                          }`}
                        >
                          <span className="font-serif text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-light text-gold-200/90 tracking-wide transition-colors group-hover:text-gold-300 leading-normal mb-0.5 whitespace-nowrap">
                            {item.en}
                          </span>
                          <span className="font-serif text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-light text-white/70 tracking-[0.2em] transition-colors group-hover:text-white leading-normal pl-[0.2em] whitespace-nowrap">
                            {item.zh}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Portrait */}
                <div className="w-full md:w-1/2 lg:w-[55%] flex justify-center md:justify-end items-end relative h-[280px] xs:h-[340px] sm:h-[440px] md:h-auto lg:h-[70vh] xl:h-[75vh] max-h-[640px] overflow-visible">
                  <div className="relative w-full h-[280px] xs:h-[340px] sm:h-[440px] md:h-full flex items-end justify-center md:justify-end overflow-visible">
                    <img
                      src="/images/portrait-001.png"
                      alt="Dr. Eric Chuang"
                      style={{ 
                        display: 'block', 
                        width: 'auto', 
                        objectFit: 'contain', 
                        objectPosition: 'bottom center',
                        transformOrigin: 'bottom center',
                        pointerEvents: 'none'
                      }}
                      className="hero-portrait h-[280px] xs:h-[340px] sm:h-[440px] md:h-full max-w-full md:max-w-none relative z-10 md:mr-12 lg:mr-32 xl:mr-36 transition-all pb-4 md:pb-0"
                    />
                    
                    <div className="absolute bottom-4 xs:bottom-6 sm:bottom-10 md:bottom-16 lg:bottom-24 right-0 sm:right-4 lg:right-4 xl:right-8 z-20 flex flex-col items-start bg-transparent pointer-events-none select-none">
                      <img 
                        src="/signature-eric001.png" 
                        alt="Eric Chuang, Ph.D. Signature" 
                        className="w-40 sm:w-52 lg:w-60 xl:w-72 h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        );

      case 'governance':
        return (
          <motion.section 
            key="governance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="strategic-bg-container border-y border-white/5 w-full h-auto lg:h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col justify-center py-12 lg:py-6"
          >
            <div 
              className="strategic-bg-image" 
              style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
            ></div>
            <div className="strategic-bg-overlay"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-between py-2 max-w-7xl">
              <div className="text-center space-y-1 pb-2">
                <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">PORTALS OF INTERPRETATION</p>
                <h2 className="text-3xl sm:text-4xl font-display text-white">治理入口</h2>
                <p className="text-stone-500 max-w-2xl mx-auto italic text-xs leading-normal">
                  不是提供建議，而是協助建立不可動搖的治理秩序與文明架構。
                </p>
                <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed text-[11px] mt-1">
                  選擇您目前關注的治理領域，進入相應的專業場域，我們將協助您釐清問題本質，建立可長期運作的治理系統。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {[
                  { 
                    id: "01", 
                    title: "企業治理與策略判讀", 
                    icon: <Landmark className="w-8 h-8 md:w-9 md:h-9" />,
                    desc: "整合策略、風險、制度與架構，協助企業建立長期競爭優勢與治理秩序。", 
                    items: ["策略治理", "董事會治理", "制度架構", "風險管理"],
                    route: "service-portal",
                    btnText: "進入 企業治理與策略判讀 系統"
                  },
                  { 
                    id: "02", 
                    title: "家族治理與企業接班", 
                    icon: <Users className="w-8 h-8 md:w-9 md:h-9" />,
                    desc: "建立家族信任與治理制度，確保財富、價值與使命的永續傳承。", 
                    items: ["家族信任系統", "接班計畫", "財富治理", "家族憲章"],
                    route: "success",
                    btnText: "進入 家族治理與企業接班 系統"
                  },
                  { 
                    id: "03", 
                    title: "內在法遵 Internal Compliance", 
                    icon: <Scale className="w-8 h-8 md:w-9 md:h-9" />,
                    desc: "從制度內化合規意識，打造企業不可動搖的合規文化。", 
                    items: ["內部控制", "法遵機制", "稽核機制", "合規文化"],
                    route: "internal-compliance",
                    btnText: "進入 內在法遵 INTERNAL COMPLIANCE 專欄"
                  },
                  { 
                    id: "04", 
                    title: "ESGAI Governance System", 
                    icon: <Brain className="w-8 h-8 md:w-9 md:h-9" />,
                    desc: "AI 治理輔助系統，提供決策門控、風險辨識與治理支援。", 
                    items: ["決策門控", "風險辨識", "治理框架", "制度支援"],
                    route: "service-portal",
                    btnText: "進入 ESGAI GOVERNANCE SYSTEM 系統"
                  }
                ].map((card, i) => (
                  <div 
                    key={i} 
                    className="group bg-zinc-950/80 border border-white/5 hover:border-gold-600/30 transition-all duration-500 backdrop-blur-sm flex flex-col items-center text-center justify-between p-4 flex-1 w-full"
                  >
                    <div className="w-full flex-col flex items-center mb-2">
                      <span className="text-[10px] text-gold-600/40 font-mono tracking-widest block mb-1">{card.id}</span>
                      <div className="text-gold-600 opacity-60 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                    </div>
                    <h3 className="font-display text-white leading-tight text-lg sm:text-xl font-medium mt-1 mb-1">{card.title}</h3>
                    <p className="text-stone-500 text-xs font-light leading-relaxed max-w-[280px] mb-2">
                      {card.desc}
                    </p>
                    <div className="flex flex-col items-center mb-3">
                      {card.items.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center gap-1.5 text-stone-400 text-xs my-0.5"
                        >
                          <ShieldCheck className="w-3 h-3 text-gold-600/50" />
                          {item}
                        </div>
                      ))}
                    </div>

                    {card.id === "01" ? (
                      <button 
                        onClick={() => goToSection('positioning')}
                        className="w-full mt-auto bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold tracking-widest uppercase hover:bg-gold-600 hover:text-black transition-all text-center flex items-center justify-center py-2 text-[11px] cursor-pointer"
                      >
                        {card.btnText} <ArrowRight className="inline ml-1.5 w-3 h-3" />
                      </button>
                    ) : (
                      <a 
                        href={card.route === 'service-portal' ? 'governance.html' : `${card.route}.html`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(card.route);
                          window.history.pushState({}, '', card.route === 'service-portal' ? 'governance.html' : `${card.route}.html`);
                        }}
                        className="w-full mt-auto bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold tracking-widest uppercase hover:bg-gold-600 hover:text-black transition-all no-underline text-center flex items-center justify-center py-2 text-[11px]"
                      >
                        {card.btnText} <ArrowRight className="inline ml-1.5 w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-gold-600/50 mt-4">
                <p className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-default transition-all">
                   <ShieldCheck className="w-3 h-3" /> Governance First
                </p>
                <p className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-default transition-all">
                   <ShieldCheck className="w-3 h-3" /> Decision with Order
                </p>
                <p className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-default transition-all">
                   <ShieldCheck className="w-3 h-3" /> Trust across Generations
                </p>
              </div>
            </div>
          </motion.section>
        );

      case 'positioning':
        return (
          <motion.section 
            key="positioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="strategic-bg-container w-full h-auto lg:h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col justify-center py-12 lg:py-8"
          >
            <div 
              className="strategic-bg-image" 
              style={{ backgroundImage: "url('/images/bg-platform-chess.png')" }}
            ></div>
            <div className="strategic-bg-overlay"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center">
                
                {/* Left Column */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-gold-600/40"></div>
                    <span className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">POSITIONING</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-tight">
                    <span className="block">不是顧問公司；</span>
                    <span className="block mt-2">
                      而是<span className="metallic-gold-text">治理文明平台</span>。
                    </span>
                  </h2>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    在不確定的時代，企業需要的不是更多建議，而是一套能守住秩序、創造價值的治理系統。
                  </p>
                  
                  <div className="space-y-1 pt-2">
                    <div className="metallic-gold-text text-3xl font-display font-medium">Eric Chuang</div>
                    <p className="text-[9px] tracking-[0.4em] text-stone-500 uppercase font-black">Founder, STT Strategic Think Tank</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                   <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10 w-full">
                      {[
                        { label: "治理秩序", sub: "Governance Order" },
                        { label: "決策系統", sub: "Decision Systems" },
                        { label: "長期信任", sub: "Institutional Trust" },
                        { label: "法遵治理", sub: "Compliance Governance" },
                        { label: "家族傳承", sub: "Family Succession" },
                        { label: "高階策略整合", sub: "Executive Alliance" }
                      ].map((p, i) => (
                        <div key={i} className="flex flex-col gap-0.5 border-b border-white/5 pb-2">
                          <p className="text-base sm:text-lg text-white font-display">{p.label}</p>
                          <p className="text-[9px] text-gold-600/60 uppercase tracking-widest">{p.sub}</p>
                        </div>
                      ))}
                   </div>
                   
                   {/* Clickable Quote Box as requested */}
                   <div 
                     onClick={() => goToSection('strategist')}
                     className="border border-white/10 p-5 sm:p-6 bg-zinc-950/70 hover:bg-zinc-900/80 hover:border-gold-400/40 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative overflow-hidden"
                   >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gold-400/0 group-hover:bg-[#e6c84c] transition-colors duration-300"></div>
                      <p className="text-stone-200 text-sm sm:text-base leading-relaxed tracking-wide group-hover:text-[#e6c84c] transition-colors">
                        「STT 不只是提供建議，而是協助企業建立不可動搖的治理秩序與文明架構。」
                      </p>
                      <p className="text-[9px] text-gold-500/60 tracking-wider text-right mt-2.5 font-mono uppercase group-hover:text-gold-400 transition-colors">
                        CLICK TO VIEW STRATEGIST ➔
                      </p>
                   </div>
                </div>

              </div>
            </div>
          </motion.section>
        );

      case 'strategist':
        return (
          <motion.section 
            key="strategist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="strategic-bg-container relative border-y border-white/5 w-full h-auto lg:h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col justify-end py-12 lg:py-0"
          >
            <div 
              className="strategic-bg-image" 
              style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
            ></div>
            <div className="strategic-bg-overlay"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-end max-w-7xl">
              <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center lg:items-stretch h-full w-full justify-between">
                 
                 {/* Left Column (Portrait) */}
                 <div className="w-full lg:w-[42%] flex items-end justify-center lg:justify-start relative z-10 h-auto lg:h-full">
                    <div className="relative group w-[440px] max-w-full flex justify-center items-end h-[280px] xs:h-[340px] sm:h-[440px] md:h-auto lg:h-[70vh] xl:h-[75vh] max-h-[640px]">
                      <div className="absolute -inset-4 bg-gold-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
                      
                      {/* Perfectly centered vertical gold thin frame design directly behind the portrait */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-0 pointer-events-none select-none">
                        <div className="w-px h-32 bg-[#e6c84c]/25"></div>
                        <span className="font-mono text-[9px] tracking-[0.4em] text-white/35 uppercase whitespace-nowrap [writing-mode:vertical-lr]">
                          STRATEGIC THINK TANK PLATFORM
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/50"></div>
                        <div className="w-px h-24 bg-[#e6c84c]/25"></div>
                      </div>

                      <img
                        src="/images/portrait-002.png"
                        alt="莊鈞翔博士"
                        style={{ 
                          display: 'block', 
                          width: 'auto', 
                          objectFit: 'contain', 
                          objectPosition: 'bottom center',
                          transformOrigin: 'bottom center'
                        }}
                        onClick={() => goToSection('insights')}
                        className="strategist-portrait h-[280px] xs:h-[340px] sm:h-[440px] md:h-full max-w-full md:max-w-none relative z-10 cursor-pointer hover:brightness-110 transition-all duration-300"
                      />

                      {/* Floating overlay click indicator */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-[#e6c84c]/30 px-3 py-1.5 rounded-full text-[9px] tracking-widest text-[#e6c84c] z-20 pointer-events-none uppercase">
                        點擊肖像 進入智庫觀點 ➔
                      </div>
                    </div>
                  </div>

                 {/* Right Column (Text / Info) */}
                 <div className="w-full lg:w-[54%] flex flex-col justify-center space-y-4 lg:space-y-6 py-6 lg:py-10 font-sans text-left z-10 lg:pl-4">
                   <div className="space-y-1.5">
                     <p className="text-[#e6c84c] text-[10px] tracking-[0.5em] uppercase font-bold">THE STRATEGIST</p>
                     <h2 className="text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal">治理判讀者</h2>
                     <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                       莊鈞翔博士長期致力於建立高信任、可長期存續的治理文明架構；透過對「決策秩序」的深度校準，為企業預判策略風險與利潤風險。
                     </p>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 pt-2 max-w-xl">
                      {[
                        { label: "企業治理與法治合規", icon: <ShieldCheck className="w-4 h-4 text-[#e6c84c]" /> },
                        { label: "家族傳承與長期治理", icon: <Users className="w-4 h-4 text-[#e6c84c]" /> },
                        { label: "決策結構與內在秩序", icon: <Scale className="w-4 h-4 text-[#e6c84c]" /> },
                        { label: "數位法治與 AI 治理", icon: <Brain className="w-4 h-4 text-[#e6c84c]" /> },
                        { label: "組織秩序之對策判讀", icon: <Globe className="w-4 h-4 text-[#e6c84c]" /> },
                        { label: "高信任治理文明架構", icon: <Award className="w-4 h-4 text-[#e6c84c]" /> }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="p-1 border border-white/5 bg-zinc-950/80 group-hover:border-[#e6c84c]/30 group-hover:bg-zinc-900 transition-all">
                            {item.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-sans font-light text-stone-300 group-hover:text-white transition-colors tracking-wide">{item.label}</span>
                        </div>
                      ))}
                   </div>

                   <div className="border-l border-[#e6c84c] bg-zinc-950/40 max-w-xl p-4">
                      <p className="text-stone-300 italic text-xs sm:text-sm leading-relaxed">
                         「治理的本質，不是控制，而是確保秩序與信任長期存在。」
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                         <div className="text-stone-500 font-serif text-xs font-medium">— 莊鈞翔博士</div>
                      </div>
                   </div>
                 </div>

              </div>
            </div>
          </motion.section>
        );

      case 'insights':
        return (
          <motion.section 
            key="insights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="strategic-bg-container w-full h-auto lg:h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col justify-center py-12 lg:py-10 bg-[#050505] border-t border-white/5"
          >
            <div 
              className="strategic-bg-image opacity-30" 
              style={{ 
                backgroundImage: "url('/images/bg-insights-globe.png')",
                backgroundPosition: "right top",
                backgroundRepeat: "no-repeat",
                backgroundSize: "600px"
              }}
            ></div>
            <div className="strategic-bg-overlay bg-[#050505]/30"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center max-w-7xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4 mb-10">
                 <div className="space-y-2">
                    <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">GOVERNANCE INSIGHTS</p>
                    <h2 className="text-4xl font-display text-white">智庫觀點</h2>
                    <p className="text-stone-500 text-xs sm:text-sm">深入探討治理、策略與法律的關鍵議題，提供專業洞見與實務指引。</p>
                 </div>
                 <button 
                   onClick={() => onNavigate('columns')}
                   className="text-stone-400 hover:text-gold-600 transition-colors text-xs font-bold tracking-widest uppercase flex items-center gap-3 no-underline bg-transparent border-0 cursor-pointer"
                 >
                    ARCHIVE VIEW <ArrowRight className="w-4 h-4" />
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(0, 3).map((article, i) => (
                  <div 
                    key={i} 
                    className="group cursor-pointer bg-zinc-950 p-6 border border-white/5 hover:border-gold-600/30 transition-all duration-500 flex flex-col justify-between min-h-[280px]"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-3">
                            <GradmarkIcon className="w-4 h-4 text-gold-600/60" />
                            <span className="text-[9px] text-stone-500 uppercase tracking-widest">{article.category}</span>
                         </div>
                         <span className="text-[9px] text-stone-700 font-mono italic">{article.date}</span>
                      </div>
                      <h3 className="text-lg font-display text-white group-hover:text-gold-400 transition-colors mb-4 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed italic mb-6">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                       <button className="text-[9px] font-bold text-[#e6c84c] tracking-widest uppercase flex items-center gap-2 bg-transparent border-0 cursor-pointer">
                          READ JOURNAL <ArrowRight className="w-3 h-3" />
                       </button>
                       <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-stone-200">
      <AnimatePresence mode="wait">
        {renderActiveSection()}
      </AnimatePresence>
    </div>
  );
}

function GradmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5L2 10z" />
      <path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}
