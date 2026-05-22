import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Newspaper, GraduationCap, Users, Scale, Landmark, Brain, BookOpen, ExternalLink, Globe, Award } from "lucide-react";
import { articles } from "../data/mockData";

export default function Home({ onNavigate, currentPage }: { onNavigate: (page: string) => void; currentPage?: string }) {
  return (
    <div className="bg-[#050505] min-h-screen text-stone-200">
      {/* 1. Hero Section - Redesigned based on screenshot */}
      <section 
        className="relative flex flex-col pt-4 lg:pt-0 bg-[#050505] overflow-hidden justify-end border-b border-white/5 pb-0 lg:h-[calc(100vh-80px)] lg:min-h-0"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/images/bg-hero-boardroom.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-end h-full">
          <div className="flex flex-col lg:flex-row items-end gap-12 lg:gap-0 pt-4 lg:pt-0 w-full h-full">
            {/* Left Content */}
            <div className="w-full lg:w-[48%] flex flex-col justify-center space-y-5 lg:space-y-6 py-6 lg:py-8 lg:self-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-3 lg:space-y-4"
              >
                <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[45px] xl:text-[52px] font-serif font-light leading-[1.3] text-white tracking-widest max-w-[13.5em]">
                  ? 制度 ?始失序 ?<span className="text-[#e6c84c] font-normal">治 ?</span>便 ??  ?業 ?後 ?秩 ???                </h1>
                <div className="w-16 h-[1px] bg-[#e6c84c]/40 my-3 lg:my-4"></div>
                <div className="space-y-1.5">
                  <p className="text-sm sm:text-base md:text-[18px] font-sans font-light text-white/70 leading-tight">
                    以治? 設計決策 ??  ? ?                  </p>
                  <p className="text-sm sm:text-base md:text-[18px] font-sans font-light text-white/70 leading-tight">
                    讓 ?業在不確定中保 ?穩 ?? 信任 ?                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#positioning"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('positioning');
                      if (element) {
                        if ((window as any).lenis) {
                           (window as any).lenis.scrollTo(element, { offset: -80 });
                        } else {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-gold-600 hover:brightness-110 text-black px-8 py-3.5 rounded flex items-center gap-3 group transition-all font-bold shadow-2xl no-underline text-sm md:text-base cursor-pointer"
                  >
                    ? 入治 ??  ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="about.html"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('about');
                      window.history.pushState({}, '', 'about.html');
                    }}
                    className="px-8 py-3.5 rounded border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 transition-all font-bold flex items-center gap-3 no-underline text-sm md:text-base cursor-pointer"
                  >
                    ? 索 STT ? 庫 <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Core Focus Areas positioned directly under buttons */}
                <div className="flex items-center gap-1.5 sm:gap-3 pt-5 border-t border-white/5 max-w-3xl overflow-x-auto scrollbar-none">
                  {[
                    { en: "Governance Systems", zh: "治 ?系統" },
                    { en: "Decision Architecture", zh: "決 ??  ?" },
                    { en: "Family & Enterprise Governance", zh: "家 ??  ?業治?? }
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
              </motion.div>
            </div>

            {/* Right Portrait */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full lg:w-[52%] flex justify-end items-end relative h-[420px] sm:h-[520px] lg:h-[70vh] xl:h-[75vh] max-h-[640px] overflow-visible"
            >
              <div className="relative w-full h-full flex items-end justify-end overflow-visible">
<img
                  src="/images/portrait-read.png"""""
  alt="Dr. Eric Chuang"
  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
/>
                
                {/* Signature and Credentials overlay, positioned precisely as seen in the screenshot */}
                <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 right-0 sm:right-4 xl:right-12 z-20 flex flex-col items-start bg-transparent pl-4 pb-4">
                  <img 
                    src="/signature-eric001.png" 
                    alt="Eric Chuang, Ph.D. Signature" 
                    className="w-36 sm:w-48 lg:w-64 h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 2. Governance Portal - Portal Section */}
      <section 
        id="governance" 
        className="strategic-bg-container border-y border-white/5 pt-12 pb-12"
        style={{ 
          transform: "scale(0.88)", 
          transformOrigin: "top center", 
          minHeight: "calc(100vh / 0.88)",
          marginBottom: "-12vh"
        }}
      >
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 min-h-full flex flex-col justify-between py-2">
          <div className="text-center space-y-1.5 pb-4">
            <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">PORTALS OF INTERPRETATION</p>
            <h2 className="text-4xl font-display text-white">治 ?? 口</h2>
            <p className="text-stone-500 max-w-2xl mx-auto italic text-xs">
              不是?  ?建議，而是? 助建 ?不可?  ?? 治? 秩序 ??  ??  ???            </p>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed text-[11px]">?  ?? 目?  ?注 ?治 ??  ?，進入?  ??  ?業場?  ?? 們 ?? 助?  ?清 ?題本質 ?建 ?? 長?  ?作 ?治 ?系統??/p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                id: "01", 
                title: "企業治 ??  ?? 判讀", 
                icon: <Landmark className="w-8 h-8 md:w-9 md:h-9" />,
                desc: "?  ?策略? 風? 、制度 ??  ?， ??  ?業建立長? 競? 優?  ?治 ?秩 ???, 
                items: ["策略治 ?", "???? 治??, "? 度?  ?", "風險管 ?"],
                route: "service-portal",
                btnText: "? 入 企業治 ??  ?? 判讀 系統"
              },
              { 
                id: "02", 
                title: "家 ?治 ??  ?業接??, 
                icon: <Users className="w-8 h-8 md:w-9 md:h-9" />,
                desc: "建 ?家 ?信任? 治? 制度 ?確 ?財 ?? 價?  ?使命? 永續傳?  ?, 
                items: ["家 ?信任系統", "? 班計畫", "財 ?治 ?", "家 ??  ?"],
                route: "success",
                btnText: "? 入 家 ?治 ??  ?業接??系統"
              },
              { 
                id: "03", 
                title: "? 在法遵 Internal Compliance", 
                icon: <Scale className="w-8 h-8 md:w-9 md:h-9" />,
                desc: "從制度內?  ?規 ?識 ?? 造 ?業 ??  ??  ??  ??  ???, 
                items: ["? 部? 制", "法遵機制", "稽核機制", "?  ??  ?"],
                route: "internal-compliance",
                btnText: "? 入 ? 在法遵 INTERNAL COMPLIANCE 專 ?"
              },
              { 
                id: "04", 
                title: "ESGAI Governance System", 
                icon: <Brain className="w-8 h-8 md:w-9 md:h-9" />,
                desc: "AI 治 ?輔助系統， ?供決策 ?? 、風? 辨識 ?治 ?? 援??, 
                items: ["決 ?? ??, "風險辨 ?", "治 ?框架", "? 度? 援"],
                route: "service-portal",
                btnText: "? 入 ESGAI GOVERNANCE SYSTEM 系統"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className="group bg-zinc-950/80 border border-white/5 hover:border-gold-600/30 transition-all duration-500 backdrop-blur-sm flex flex-col items-center text-center h-full justify-between p-4"
                style={{ padding: "16px" }}
              >
                <div className="w-full flex-col flex items-center mb-2">
                  <span className="text-[10px] text-gold-600/40 font-mono tracking-widest block mb-1">{card.id}</span>
                  <div className="text-gold-600 opacity-60 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                </div>
                <h3 className="font-display text-white leading-tight text-xl font-medium mt-2 mb-2">{card.title}</h3>
                <p 
                  className="text-stone-500 text-xs font-light leading-relaxed max-w-[280px] mb-4"
                  style={{ fontSize: "14px", lineHeight: "1.5" }}
                >
                  {card.desc}
                </p>
                <div className="flex flex-col items-center mb-4">
                  {card.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 text-stone-400 text-[10px] my-1"
                      style={{ fontSize: "12.5px", lineHeight: "1.5" }}
                    >
                      <ShieldCheck className="w-3 h-3 text-gold-600/50" />
                      {item}
                    </div>
                  ))}
                </div>
                <a 
                  href={card.route === 'service-portal' ? 'governance.html' : `${card.route}.html`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(card.route);
                    window.history.pushState({}, '', card.route === 'service-portal' ? 'governance.html' : `${card.route}.html`);
                  }}
                  className="w-full mt-auto bg-gold-600/10 border border-gold-600/20 text-gold-500 font-bold tracking-widest uppercase group-hover:bg-gold-600 group-hover:text-black transition-all no-underline text-center flex items-center justify-center py-2.5 text-[11px]"
                  style={{ marginTop: "12px" }}
                >
                  {card.btnText} <ArrowRight className="inline ml-1.5 w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-gold-600/50 mt-6">
            <p className="flex items-center gap-3 opacity-80 hover:opacity-100 cursor-default transition-all">
               <ShieldCheck className="w-3 h-3" /> Governance First
            </p>
            <p className="flex items-center gap-3 opacity-80 hover:opacity-100 cursor-default transition-all">
               <ShieldCheck className="w-3 h-3" /> Decision with Order
            </p>
            <p className="flex items-center gap-3 opacity-80 hover:opacity-100 cursor-default transition-all">
               <ShieldCheck className="w-3 h-3" /> Trust across Generations
            </p>
          </div>
        </div>
      </section>

      {/* 3. Positioning Section */}
      <section id="positioning" className="strategic-bg-container py-40 border-t border-white/5">
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-platform-chess.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-gold-600/40"></div>
                <span className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">POSITIONING</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display text-white leading-tight">
                不是顧 ?? 司 ?? 是<span className="metallic-gold-text">治 ??  ?平台</span>??              </h2>
              <p className="text-stone-400 text-lg leading-relaxed max-w-xl">
                ?  ?確 ??  ? ??企業? 要 ?不是?  ?建議，而是一套能守 ?秩 ?? 創? 價?  ?治 ?系統??              </p>
              
              <div className="space-y-4 pt-8">
                <div className="metallic-gold-text text-4xl font-display font-medium">Eric Chuang</div>
                <p className="text-[10px] tracking-[0.4em] text-stone-500 uppercase font-black">Founder, STT Strategic Think Tank</p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-8 relative z-10">
                  {[
                    { label: "治 ?秩 ?", sub: "Governance Order" },
                    { label: "決 ?系統", sub: "Decision Systems" },
                    { label: "?  ?信任", sub: "Institutional Trust" },
                    { label: "法遵治 ?", sub: "Compliance Governance" },
                    { label: "家 ?? 承", sub: "Family Succession" },
                    { label: "高 ?策略?  ?", sub: "Executive Alliance" }
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-4">
                      <p className="text-lg text-white font-display">{p.label}</p>
                      <p className="text-[9px] text-gold-600/60 uppercase tracking-widest">{p.sub}</p>
                    </div>
                  ))}
               </div>
               
               <div className="mt-20 border border-white/10 p-8 bg-zinc-950/50 backdrop-blur-sm">
                  <p className="text-stone-300 italic text-sm leading-relaxed">
                    ? STT 不只?  ?供建議 ?? 是? 助企業建 ?不可?  ?? 治? 秩序 ??  ??  ??  ?                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Strategist Section */}
      <section 
        className="strategic-bg-container relative border-y border-white/5 pt-12 lg:pt-24 pb-0 overflow-hidden flex flex-col justify-end" 
        style={{ minHeight: "max(650px, 80vh)" }}
      >
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        {/* Vertical Text Sidebar on the far left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 z-20">
          <div className="w-px h-24 bg-[#e6c84c]/20"></div>
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase whitespace-nowrap [writing-mode:vertical-lr] select-none">
            STRATEGIC THINK TANK PLATFORM
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/40"></div>
          <div className="w-px h-12 bg-[#e6c84c]/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-end h-full">
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch h-full w-full">
             <div className="w-full lg:w-1/2 flex items-end justify-center lg:justify-start relative z-10 h-full">
                <div className="relative group w-full max-w-[480px] sm:max-w-[540px] lg:max-w-none flex justify-center lg:justify-start items-end h-[420px] sm:h-[520px] lg:h-[70vh] xl:h-[75vh] max-h-[640px]">
                  <div className="absolute -inset-4 bg-gold-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
<img
  src="/images/portrait-open.png"
  alt="?  ?翔 ? ?
  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
/>
                </div>
             </div>

             <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8 py-8 lg:py-16 font-sans text-left z-10 lg:pl-4">
               <div className="space-y-3">
                 <p className="text-[#e6c84c] text-[10px] tracking-[0.5em] uppercase font-bold">THE STRATEGIST</p>
                 <h2 className="text-4xl lg:text-5xl font-serif text-white tracking-wide font-normal">治 ??  ???/h2>
                 <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                   ?  ?翔 ?士長? 致? 於建 ?高信任、可?  ?存 ?? 治?  ?? 架構 ??  ?對「決策秩序」 ?深度?  ?，為企業? 判策略風險? 利潤風?  ?                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-4 max-w-xl">
                  {[
                    { label: "企業治 ??  ?治 ? ?, icon: <ShieldCheck className="w-4 h-4 text-[#e6c84c]" /> },
                    { label: "家 ?? 承? 長? 治??, icon: <Users className="w-4 h-4 text-[#e6c84c]" /> },
                    { label: "決 ?結 ?? 內? 秩 ?, icon: <Scale className="w-4 h-4 text-[#e6c84c]" /> },
                    { label: "?  ?法治??AI 治 ?", icon: <Brain className="w-4 h-4 text-[#e6c84c]" /> },
                    { label: "組 ?秩 ?之 ?策判讀", icon: <Globe className="w-4 h-4 text-[#e6c84c]" /> },
                    { label: "高信任治?  ?? 架 ?, icon: <Award className="w-4 h-4 text-[#e6c84c]" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5 group">
                      <div className="p-1.5 border border-white/5 bg-zinc-950/80 group-hover:border-[#e6c84c]/30 group-hover:bg-zinc-900 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-sm sm:text-[14.5px] font-sans font-light text-stone-300 group-hover:text-white transition-colors tracking-wide">{item.label}</span>
                    </div>
                  ))}
               </div>

               <div className="border-l border-[#e6c84c] bg-zinc-950/40 max-w-xl" style={{ padding: "16px 20px" }}>
                  <p className="text-stone-300 italic text-sm sm:text-base leading-relaxed">
                     ? 治?  ?? 質， ?? 控?  ?? 是確 ?秩 ?? 信任長?  ?? 。 ?                  </p>
                  <div className="mt-3 flex items-center gap-4">
                     <div className="text-stone-500 font-serif text-xs sm:text-sm font-medium">???  ?翔 ? ?/div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Governance Insights Section */}      {/* 5. Governance Insights Section */}
      <section className="strategic-bg-container py-32 bg-[#050505] border-t border-white/5">
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
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-20">
             <div className="space-y-4">
                <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">GOVERNANCE INSIGHTS</p>
                <h2 className="text-5xl font-display text-white">? 庫觀 ?/h2>
                <p className="text-stone-500">深入?  ?治 ??  ??  ?法 ??  ?? 議題 ??  ?專業洞 ?? 實?  ?引 ?/p>
             </div>
             <a 
               href="insights.html"
               onClick={(e) => {
                 e.preventDefault();
                 onNavigate('columns');
                 window.history.pushState({}, '', 'insights.html');
               }}
               className="text-stone-400 hover:text-gold-600 transition-colors text-xs font-bold tracking-widest uppercase flex items-center gap-3 no-underline"
             >
                ARCHIVE VIEW <ArrowRight className="w-4 h-4" />
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, i) => (
              <div 
                key={i} 
                className="group cursor-pointer bg-zinc-950 p-8 border border-white/5 hover:border-gold-600/30 transition-all duration-500"
                onClick={() => window.open(article.url, '_blank')}
              >
                <div className="flex justify-between items-center mb-8">
                   <div className="flex items-center gap-3">
                      <GradmarkIcon className="w-5 h-5 text-gold-600/60" />
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest">{article.category}</span>
                   </div>
                   <span className="text-[10px] text-stone-700 font-mono italic">{article.date}</span>
                </div>
                <h3 className="text-xl font-display text-white group-hover:text-gold-400 transition-colors mb-6 leading-snug">
                  {article.title}
                </h3>
                <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed mb-10 italic">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                   <button className="text-[10px] font-bold text-gold-600 tracking-widest uppercase flex items-center gap-3">
                      READ JOURNAL <ArrowRight className="w-3 h-3" />
                   </button>
                   <BookOpen className="w-4 h-4 text-stone-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Section (Optional if you want a lead-in before footer) */}
      <section className="py-24 bg-black border-t border-white/5">
        {/* We can leave this empty or add a simple call to action if needed, but the footer now handles the main navigation links. */}
        <div className="container mx-auto px-6 text-center">
           <div className="h-px w-24 bg-gold-600/20 mx-auto"></div>
        </div>
      </section>
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


