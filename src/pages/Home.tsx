import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Newspaper, GraduationCap, Users, Scale, Landmark, Brain, BookOpen, ExternalLink, Globe, Award } from "lucide-react";
import { articles } from "../data/mockData";

export default function Home({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="bg-[#050505] min-h-screen text-stone-200">
      {/* 1. Hero Section - Redesigned based on screenshot */}
      <section className="relative h-screen flex flex-col pt-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/images/bg-hero-boardroom.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            {/* Left Content */}
            <div className="w-full lg:w-[48%] space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-light leading-[1.4] text-white/95 max-w-[14em] tracking-wider">
                  ?¶åˆ¶åº¦é?å§‹å¤±åºï?<br />
                  <span className="text-gold-400 font-normal">æ²»ç?</span>ä¾¿æ??ºä?æ¥­æ?å¾Œç?ç§©å???                </h1>
                <div className="w-16 h-[1px] bg-gold-400/40 my-8"></div>
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-sans font-light text-white/70 leading-tight">
                    ä»¥æ²»?†è¨­è¨ˆæ±ºç­–ç??Šç?ï¼?                  </p>
                  <p className="text-xl md:text-2xl font-sans font-light text-white/70 leading-tight">
                    è®“ä?æ¥­åœ¨ä¸ç¢ºå®šä¸­ä¿æ?ç©©å??‡ä¿¡ä»»ã€?                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-10"
              >
                <div className="flex flex-wrap gap-8">
                  <a 
                    href="governance.html"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('service-portal');
                      window.history.pushState({}, '', 'governance.html');
                    }}
                    className="bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 hover:brightness-110 text-black px-12 py-5 rounded flex items-center gap-4 group transition-all font-bold shadow-2xl no-underline"
                  >
                    ?²å…¥æ²»ç??¶æ? <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a 
                    href="about.html"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('about');
                      window.history.pushState({}, '', 'about.html');
                    }}
                    className="px-12 py-5 rounded border border-gold-400/40 text-gold-400 hover:bg-gold-400/5 transition-all font-bold flex items-center gap-4 no-underline"
                  >
                    ?¢ç´¢ STT ?ºåº« <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Core Focus Areas positioned directly under buttons */}
                <div className="flex items-center gap-3 sm:gap-6 pt-10 border-t border-white/5 max-w-3xl overflow-x-auto scrollbar-none">
                  {[
                    { en: "Governance Systems", zh: "æ²»ç?ç³»çµ±" },
                    { en: "Decision Architecture", zh: "æ±ºç??¶æ?" },
                    { en: "Family & Enterprise Governance", zh: "å®¶æ??‡ä?æ¥­æ²»?? }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left group px-2 sm:px-4 ${
                        i !== 2 ? 'border-r border-white/10' : ''
                      }`}
                    >
                      <span className="font-serif text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-light text-gold-200/90 tracking-wide transition-colors group-hover:text-gold-300 leading-normal mb-1 whitespace-nowrap">
                        {item.en}
                      </span>
                      <span className="font-serif text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-light text-white/70 tracking-[0.2em] transition-colors group-hover:text-white leading-normal pl-[0.2em] whitespace-nowrap">
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
              className="w-full lg:w-[52%] flex justify-center lg:justify-end items-end relative"
            >
              <div className="relative flex flex-row items-end justify-center lg:justify-end">
                <img 
                  src="/images/portrait-open.png"
                  alt="Dr. Eric Chuang" 
                  className="w-[260px] xs:w-[310px] sm:w-[360px] md:w-[410px] lg:w-[450px] xl:w-[530px] h-auto relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] transform translate-x-6 xs:translate-x-10 sm:translate-x-12 md:translate-x-16 lg:translate-x-24 xl:translate-x-28"
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
      <section className="strategic-bg-container py-32 border-y border-white/5">
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-portal-columns.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-24">
            <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">PORTALS OF INTERPRETATION</p>
            <h2 className="text-5xl font-display text-white">æ²»ç??¥å£</h2>
            <p className="text-stone-500 max-w-2xl mx-auto italic">
              ä¸æ˜¯?ä?å»ºè­°ï¼Œè€Œæ˜¯?”åŠ©å»ºç?ä¸å¯?•æ??„æ²»?†ç§©åºè??‡æ??¶æ???            </p>
            <p className="text-stone-400 text-sm">?¸æ??¨ç›®?é?æ³¨ç?æ²»ç??˜å?ï¼Œé€²å…¥?¸æ??„å?æ¥­å ´?Ÿï??‘å€‘å??”åŠ©?¨é?æ¸…å?é¡Œæœ¬è³ªï?å»ºç??¯é•·?Ÿé?ä½œç?æ²»ç?ç³»çµ±??/p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={i} className="group bg-zinc-950/80 p-8 border border-white/5 hover:border-gold-600/30 transition-all duration-500 backdrop-blur-sm flex flex-col items-center text-center">
                <div className="w-full flex-col flex items-center mb-10">
                  <span className="text-[10px] text-gold-600/40 font-mono tracking-widest mb-3 block">{card.id}</span>
                  <div className="text-gold-600 opacity-60 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                </div>
                <h3 className="text-2xl font-display text-white mb-6 leading-tight">{card.title}</h3>
                <p className="text-stone-500 text-xs font-light leading-relaxed mb-8 max-w-[280px]">{card.desc}</p>
                <div className="space-y-3 mb-10 flex flex-col items-center">
                  {card.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-[10px] text-stone-400">
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
                  className="w-full py-3 bg-gold-600/10 border border-gold-600/20 text-gold-500 text-[10px] font-bold tracking-widest uppercase group-hover:bg-gold-600 group-hover:text-black transition-all no-underline text-center flex items-center justify-center mt-auto"
                >
                  ?²å…¥ {card.title} {card.id === "03" ? "å°ˆæ?" : "ç³»çµ±"} <ArrowRight className="inline ml-1 w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-gold-600/50">
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
      <section className="strategic-bg-container py-40 border-t border-white/5">
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
      <section className="strategic-bg-container h-screen flex items-center">
        <div 
          className="strategic-bg-image" 
          style={{ backgroundImage: "url('/images/bg-strategist-spotlight.png')" }}
        ></div>
        <div className="strategic-bg-overlay"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-24 items-center">
             <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gold-600/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                   <img 
                      src="/images/portrait-phd.png" 
                      alt="Dr. Eric Strategic Reading" 
                      className="w-full h-auto portrait-render"
                   />
                </div>
             </div>

             <div className="w-full lg:w-1/2 space-y-12">
               <div className="space-y-4">
                 <p className="text-gold-600 text-[10px] tracking-[0.5em] uppercase font-bold">THE STRATEGIST</p>
                 <h2 className="text-5xl font-display text-white">æ²»ç??¤è???/h2>
                 <p className="text-stone-400">
                   ?Šé?ç¿”å?å£«é•·?Ÿè‡´?›æ–¼å»ºç?é«˜ä¿¡ä»»ã€å¯?·æ?å­˜ç??„æ²»?†æ??æ¶æ§‹ï??é?å°ã€Œæ±ºç­–ç§©åºã€ç?æ·±åº¦?¡æ?ï¼Œç‚ºä¼æ¥­?åˆ¤ç­–ç•¥é¢¨éšª?‡åˆ©æ½¤é¢¨?ªã€?                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
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

               <div className="p-10 border-l border-gold-600 bg-zinc-950/40 relative">
                  <p className="text-stone-300 italic text-lg leading-relaxed">
                    ?Œæ²»?†ç??¬è³ªï¼Œä??¯æ§?¶ï??Œæ˜¯ç¢ºä?ç§©å??‡ä¿¡ä»»é•·?Ÿå??¨ã€‚ã€?                  </p>
                  <div className="mt-6 flex items-center gap-4">
                     <div className="text-stone-500 font-display italic">???Šé?ç¿”å?å£?/div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Governance Insights Section */}
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
