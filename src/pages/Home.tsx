import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Newspaper, GraduationCap, Users, Scale, Landmark, Brain, BookOpen, ExternalLink, Globe, Award } from "lucide-react";
import { articles } from "../data/mockData";

export default function Home({ onNavigate, currentPage }: { onNavigate: (page: string) => void; currentPage?: string }) {
  return (
    <div className="bg-[#050505] min-h-screen text-stone-200">
      {/* 1. Hero Section - Redesigned based on screenshot */}
      <section 
        className="relative h-[100vh] max-h-[100vh] flex flex-col pt-[2vh] pb-[2vh] overflow-hidden justify-start"
        style={{ transform: "scale(0.88)", transformOrigin: "top center", marginBottom: "-12vh", height: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/images/bg-hero-boardroom.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-start">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0 pt-2 lg:pt-0">
            {/* Left Content */}
            <div className="w-full lg:w-[48%] space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-4"
              >
                <h1 className="text-[28px] xs:text-3xl md:text-[40px] lg:text-[48px] font-serif font-light leading-[1.4] text-white/95 max-w-none tracking-wider">
                  <div>?¶åˆ¶åº¦é?å§‹å¤±åºï?</div>
                  <div><span className="text-gold-400 font-normal">æ²»ç?</span>ä¾¿æ??ºä?æ¥­æ?å¾Œç?ç§©å???/div>
                </h1>
                <div className="w-16 h-[1px] bg-gold-400/40 my-4"></div>
                <div className="space-y-2">
                  <p className="text-base md:text-[20px] font-sans font-light text-white/70 leading-tight">
                    ä»¥æ²»?†è¨­è¨ˆæ±ºç­–ç??Šç?ï¼?                  </p>
                  <p className="text-base md:text-[20px] font-sans font-light text-white/70 leading-tight">
                    è®“ä?æ¥­åœ¨ä¸ç¢ºå®šä¸­ä¿æ?ç©©å??‡ä¿¡ä»»ã€?                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-5"
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
                    className="bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 hover:brightness-110 text-black px-8 py-3.5 rounded flex items-center gap-3 group transition-all font-bold shadow-2xl no-underline text-sm md:text-base"
                  >
                    ?²å…¥æ²»ç??¶æ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="about.html"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('about');
                      window.history.pushState({}, '', 'about.html');
                    }}
                    className="px-8 py-3.5 rounded border border-gold-400/40 text-gold-400 hover:bg-gold-400/5 transition-all font-bold flex items-center gap-3 no-underline text-sm md:text-base"
                  >
                    ?¢ç´¢ STT ?ºåº« <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Core Focus Areas positioned directly under buttons */}
                <div className="flex items-center gap-1.5 sm:gap-3 pt-5 border-t border-white/5 max-w-3xl overflow-x-auto scrollbar-none">
                  {[
                    { en: "Governance Systems", zh: "æ²»ç?ç³»çµ±" },
                    { en: "Decision Architecture", zh: "æ±ºç??¶æ?" },
                    { en: "Family & Enterprise Governance", zh: "å®¶æ??‡ä?æ¥­æ²»?? }
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
              className="w-full lg:w-[52%] flex justify-center lg:justify-end items-start relative"
            >
              <div className="relative flex flex-row items-end justify-center lg:justify-end">
                <img 
                  src="/images/portrait-read.png" 
                  alt="Dr. Eric Chuang" 
                  className="w-[260px] xs:w-[310px] sm:w-[360px] md:w-[410px] lg:w-[450px] xl:w-[530px] relative z-10 top-0 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] transform translate-x-6 xs:translate-x-10 sm:translate-x-12 md:translate-x-16 lg:translate-x-24 xl:translate-x-28"
                  style={{ height: "100%", maxHeight: "100vh", objectFit: "contain", objectPosition: "bottom" }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Signature aligned side-by-side to the right, bottom-aligned with character */}
                <div className="ml-3 sm:ml-5 md:ml-6 lg:ml-8 mb-6 sm:mb-10 md:mb-12 lg:mb-16 z-20 flex flex-col items-start w-[100px] xs:w-[130px] sm:w-[165px] md:w-[190px] lg:w-[220px] xl:w-[260px] shrink-0">
                  <img 
                    src="/signature-eric001.png" 
                    alt="Eric Chuang, Ph.D. Signature" 
                    className="w-full h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95"
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
        className={`strategic-bg-container border-y border-white/5 ${currentPage === "governance" ? "pt-[2vh] pb-[2vh]" : "py-32"}`}
        style={currentPage === "governance" ? { 
          transform: "scale(0.88)", 
          transformOrigin: "top center", 
          height: "calc(100vh / 0.88)", 
          overflow: "hidden" 
        } : undefined}
      >
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        <div className={`container mx-auto px-6 relative z-10 ${currentPage === "governance" ? "h-full flex flex-col justify-between py-2" : ""}`}>
          <div className={`text-center ${currentPage === "governance" ? "space-y-1.5" : "space-y-4 mb-24"}`} style={currentPage === "governance" ? { paddingBottom: "16px" } : undefined}>
            <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">PORTALS OF INTERPRETATION</p>
            <h2 className={`${currentPage === "governance" ? "text-4xl" : "text-5xl"} font-display text-white`}>æ²»ç??¥å£</h2>
            <p className="text-stone-500 max-w-2xl mx-auto italic text-xs">
              ä¸æ˜¯?ä?å»ºè­°ï¼Œè€Œæ˜¯?”åŠ©å»ºç?ä¸å¯?•æ??„æ²»?†ç§©åºè??‡æ??¶æ???            </p>
            <p className={`text-stone-400 max-w-2xl mx-auto leading-relaxed ${currentPage === "governance" ? "text-[11px]" : "text-sm"}`}>?¸æ??¨ç›®?é?æ³¨ç?æ²»ç??˜å?ï¼Œé€²å…¥?¸æ??„å?æ¥­å ´?Ÿï??‘å€‘å??”åŠ©?¨é?æ¸…å?é¡Œæœ¬è³ªï?å»ºç??¯é•·?Ÿé?ä½œç?æ²»ç?ç³»çµ±??/p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${currentPage === "governance" ? "gap-4 flex-grow items-center" : "gap-6"}`} style={currentPage === "governance" ? { paddingTop: "24px", paddingBottom: "24px" } : undefined}>
            {[
              { 
                id: "01", 
                title: "ä¼æ¥­æ²»ç??‡ç??¥åˆ¤è®€", 
                icon: <Landmark className="w-8 h-8" />,
                desc: "?´å?ç­–ç•¥?é¢¨?ªã€åˆ¶åº¦è??¶æ?ï¼Œå??©ä?æ¥­å»ºç«‹é•·?Ÿç«¶?­å„ª?¢è?æ²»ç?ç§©å???, 
                items: ["ç­–ç•¥æ²»ç?", "????ƒæ²»??, "?¶åº¦?¶æ?", "é¢¨éšªç®¡ç?"],
                route: "service-portal" 
              },
              { 
                id: "02", 
                title: "å®¶æ?æ²»ç??‡ä?æ¥­æ¥??, 
                icon: <Users className="w-8 h-8" />,
                desc: "å»ºç?å®¶æ?ä¿¡ä»»?‡æ²»?†åˆ¶åº¦ï?ç¢ºä?è²¡å??åƒ¹?¼è?ä½¿å‘½?„æ°¸çºŒå‚³?¿ã€?, 
                items: ["å®¶æ?ä¿¡ä»»ç³»çµ±", "?¥ç­è¨ˆç•«", "è²¡å?æ²»ç?", "å®¶æ??²ç?"],
                route: "success"
              },
              { 
                id: "03", 
                title: "?§åœ¨æ³•éµ Internal Compliance", 
                icon: <Scale className="w-8 h-8" />,
                desc: "å¾åˆ¶åº¦å…§?–å?è¦æ?è­˜ï??“é€ ä?æ¥­ä??¯å??–ç??ˆè??‡å???, 
                items: ["?§éƒ¨?§åˆ¶", "æ³•éµæ©Ÿåˆ¶", "ç¨½æ ¸æ©Ÿåˆ¶", "?ˆè??‡å?"],
                route: "internal-compliance"
              },
              { 
                id: "04", 
                title: "ESGAI Governance System", 
                icon: <Brain className="w-8 h-8" />,
                desc: "AI æ²»ç?è¼”åŠ©ç³»çµ±ï¼Œæ?ä¾›æ±ºç­–é??§ã€é¢¨?ªè¾¨è­˜è?æ²»ç??¯æ´??, 
                items: ["æ±ºç??€??, "é¢¨éšªè¾¨è?", "æ²»ç?æ¡†æ¶", "?¶åº¦?¯æ´"],
                route: "service-portal"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`group bg-zinc-950/80 border border-white/5 hover:border-gold-600/30 transition-all duration-500 backdrop-blur-sm flex flex-col items-center text-center h-full justify-between ${
                  currentPage === "governance" ? "p-4" : "p-8"
                }`}
                style={currentPage === "governance" ? { padding: "16px" } : undefined}
              >
                <div className={`w-full flex-col flex items-center ${currentPage === "governance" ? "" : "mb-10"}`} style={currentPage === "governance" ? { marginBottom: "8px" } : undefined}>
                  <span className={`text-[10px] text-gold-600/40 font-mono tracking-widest block ${currentPage === "governance" ? "mb-1" : "mb-3"}`}>{card.id}</span>
                  <div className="text-gold-600 opacity-60 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                </div>
                <h3 className={`font-display text-white leading-tight ${currentPage === "governance" ? "text-xl" : "text-2xl mb-6"}`} style={currentPage === "governance" ? { marginTop: "8px", marginBottom: "8px" } : undefined}>{card.title}</h3>
                <p 
                  className={`text-stone-500 text-xs font-light leading-relaxed max-w-[280px] ${currentPage === "governance" ? "mb-4" : "mb-8"}`}
                  style={currentPage === "governance" ? { fontSize: "15px", lineHeight: "1.5" } : undefined}
                >
                  {card.desc}
                </p>
                <div className={`flex flex-col items-center ${currentPage === "governance" ? "" : "space-y-3 mb-10"}`}>
                  {card.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2 text-stone-400 ${currentPage === "governance" ? "text-[10px]" : "text-[10px] gap-2.5"}`}
                      style={currentPage === "governance" ? { margin: "4px 0", padding: "4px 0", fontSize: "12.5px", lineHeight: "1.5" } : undefined}
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
                  className={`w-full bg-gold-600/10 border border-gold-600/20 text-gold-500 text-[10px] font-bold tracking-widest uppercase group-hover:bg-gold-600 group-hover:text-black transition-all no-underline text-center flex items-center justify-center ${
                    currentPage === "governance" ? "py-2" : "mt-auto py-3"
                  }`}
                  style={currentPage === "governance" ? { marginTop: "12px" } : undefined}
                >
                  ?²å…¥ {card.title} {card.id === "03" ? "å°ˆæ?" : "ç³»çµ±"} <ArrowRight className="inline ml-1 w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className={`flex justify-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-gold-600/50 ${currentPage === "governance" ? "mt-6" : "mt-20"}`}>
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
                ä¸æ˜¯é¡§å??¬å¸ï¼??Œæ˜¯<span className="metallic-gold-text">æ²»ç??‡æ?å¹³å°</span>??              </h2>
              <p className="text-stone-400 text-lg leading-relaxed max-w-xl">
                ?¨ä?ç¢ºå??„æ?ä»??ä¼æ¥­?€è¦ç?ä¸æ˜¯?´å?å»ºè­°ï¼Œè€Œæ˜¯ä¸€å¥—èƒ½å®ˆä?ç§©å??å‰µ? åƒ¹?¼ç?æ²»ç?ç³»çµ±??              </p>
              
              <div className="space-y-4 pt-8">
                <div className="metallic-gold-text text-4xl font-display font-medium">Eric Chuang</div>
                <p className="text-[10px] tracking-[0.4em] text-stone-500 uppercase font-black">Founder, STT Strategic Think Tank</p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-8 relative z-10">
                  {[
                    { label: "æ²»ç?ç§©å?", sub: "Governance Order" },
                    { label: "æ±ºç?ç³»çµ±", sub: "Decision Systems" },
                    { label: "?·æ?ä¿¡ä»»", sub: "Institutional Trust" },
                    { label: "æ³•éµæ²»ç?", sub: "Compliance Governance" },
                    { label: "å®¶æ??³æ‰¿", sub: "Family Succession" },
                    { label: "é«˜é?ç­–ç•¥?´å?", sub: "Executive Alliance" }
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-4">
                      <p className="text-lg text-white font-display">{p.label}</p>
                      <p className="text-[9px] text-gold-600/60 uppercase tracking-widest">{p.sub}</p>
                    </div>
                  ))}
               </div>
               
               <div className="mt-20 border border-white/10 p-8 bg-zinc-950/50 backdrop-blur-sm">
                  <p className="text-stone-300 italic text-sm leading-relaxed">
                    ?ŒSTT ä¸åª?¯æ?ä¾›å»ºè­°ï??Œæ˜¯?”åŠ©ä¼æ¥­å»ºç?ä¸å¯?•æ??„æ²»?†ç§©åºè??‡æ??¶æ??‚ã€?                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Strategist Section */}
      <section 
        className="strategic-bg-container py-12 lg:py-16" 
        style={{ maxHeight: "85vh", overflow: "hidden" }}
      >
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center h-full w-full">
             <div className="w-full lg:w-1/2 h-full flex items-end justify-center overflow-hidden">
                <div className="relative group h-full max-h-[75vh]">
                  <div className="absolute -inset-4 bg-gold-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                   <img 
                      src="/images/portrait-open.png" 
                      alt="?Šé?ç¿”å?å£? 
                      style={{ width: "100%", height: "auto", objectFit: "contain", objectPosition: "center bottom" }}
                      referrerPolicy="no-referrer"
                    />
                </div>
             </div>

             <div className="w-full lg:w-1/2 space-y-8 py-4 font-sans">
               <div className="space-y-3">
                 <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">THE STRATEGIST</p>
                 <h2 className="text-4xl lg:text-5xl font-display text-white">æ²»ç??¤è???/h2>
                 <p className="text-stone-400 text-sm leading-relaxed">
                   ?Šé?ç¿”å?å£«é•·?Ÿè‡´?›æ–¼å»ºç?é«˜ä¿¡ä»»ã€å¯?·æ?å­˜ç??„æ²»?†æ??æ¶æ§‹ï??é?å°ã€Œæ±ºç­–ç§©åºã€ç?æ·±åº¦?¡æ?ï¼Œç‚ºä¼æ¥­?åˆ¤ç­–ç•¥é¢¨éšª?‡åˆ©æ½¤é¢¨?ªã€?                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  {[
                    { label: "ä¼æ¥­æ²»ç??‡æ?æ²»å?è¦?, icon: <ShieldCheck className="w-5 h-5 text-gold-600" /> },
                    { label: "å®¶æ??³æ‰¿?‡é•·?Ÿæ²»??, icon: <Users className="w-5 h-5 text-gold-600" /> },
                    { label: "æ±ºç?çµæ??‡å…§?¨ç§©åº?, icon: <Scale className="w-5 h-5 text-gold-600" /> },
                    { label: "?¸ä?æ³•æ²»??AI æ²»ç?", icon: <Brain className="w-5 h-5 text-gold-600" /> },
                    { label: "çµ„ç?ç§©å?ä¹‹å?ç­–åˆ¤è®€", icon: <Globe className="w-5 h-5 text-gold-600" /> },
                    { label: "é«˜ä¿¡ä»»æ²»?†æ??æ¶æ§?, icon: <Award className="w-5 h-5 text-gold-600" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="p-2 border border-white/5 bg-zinc-950 group-hover:border-gold-600/30 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-sm font-sans text-stone-300 group-hover:text-white transition-colors">{item.label}</span>
                    </div>
                  ))}
               </div>

               <div className="border-l border-gold-600 bg-zinc-950/40 relative" style={{ padding: "12px" }}>
                  <p className="text-stone-300 italic text-base leading-relaxed">
                     ?Œæ²»?†ç??¬è³ªï¼Œä??¯æ§?¶ï??Œæ˜¯ç¢ºä?ç§©å??‡ä¿¡ä»»é•·?Ÿå??¨ã€‚ã€?                  </p>
                  <div className="mt-4 flex items-center gap-4">
                     <div className="text-stone-500 font-display italic">???Šé?ç¿”å?å£?/div>
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
                <h2 className="text-5xl font-display text-white">?ºåº«è§€é»?/h2>
                <p className="text-stone-500">æ·±å…¥?¢è?æ²»ç??ç??¥è?æ³•å??„é??µè­°é¡Œï??ä?å°ˆæ¥­æ´è??‡å¯¦?™æ?å¼•ã€?/p>
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
