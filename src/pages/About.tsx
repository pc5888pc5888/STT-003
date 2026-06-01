import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Fingerprint, 
  ChevronRight, 
  ChevronLeft,
  Mail,
  Crown,
  Sparkles,
  Zap,
  Globe,
  CornerDownRight,
  Bookmark,
  Scale
} from "lucide-react";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "sovereignty",
      title: "思想主權 SOVEREIGNTY OF THOUGHT",
      labelZh: "主旨聲明",
      labelEn: "SOVEREIGNTY",
      image: "/images/Eric-Chuang-15.png"
    },
    {
      id: "positions",
      title: "現任職務 POSITIONS",
      labelZh: "現任職務",
      labelEn: "POSITIONS",
      image: "/images/Eric-Chuang-17.png"
    },
    {
      id: "scholarship",
      title: "學術背景與實務 SCHOLARSHIP",
      labelZh: "學術與實務",
      labelEn: "SCHOLARSHIP",
      image: "/images/Eric-Chuang-14.png"
    },
    {
      id: "credentials",
      title: "2026 國際專業認證 CREDENTIALS",
      labelZh: "專業認證",
      labelEn: "CREDENTIALS",
      image: "/images/Eric-Chuang-18.png"
    },
    {
      id: "services",
      title: "四大核心服務項目 SERVICES",
      labelZh: "服務項目",
      labelEn: "SERVICES",
      image: "/images/Eric-Chuang-19.png"
    },
    {
      id: "contact",
      title: "智庫連結與委託 CONTACT",
      labelZh: "治理委託",
      labelEn: "CONTACT",
      image: "/images/Eric-Chuang-20.png"
    }
  ];

  // Instantly navigate to slide and center screen
  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    // Smooth scroll page back to top container to align the viewport perfectly
    const element = document.getElementById("about-viewport-container");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white selection:bg-gold-400/30 selection:text-white relative flex flex-col justify-between"
      id="about-viewport-container"
    >
      {/* Floating coordinates indicator on the left for brand prestige */}
      <div className="fixed left-8 top-1/3 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none origin-left">
        <div className="w-px h-16 bg-[#e6c84c]/15"></div>
        <span className="font-mono text-[9px] tracking-[0.4em] text-white/25 uppercase [writing-mode:vertical-lr]">
          STT PRESS THINK TANK PLATFORM
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/30"></div>
      </div>

      {/* Horizontal Premium Sub-navigation Tab Bar */}
      <div className="w-full bg-[#050505] py-2.5 border-b border-white/[0.02] sticky top-[80px] z-30 select-none hidden md:block">
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => selectSlide(index)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-all cursor-pointer border-0 bg-transparent outline-none flex-1 max-w-[180px] ${
                currentSlide === index 
                  ? "bg-white/[0.04] text-[#e6c84c]" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className={`text-[11px] font-sans font-bold tracking-wider ${currentSlide === index ? "text-[#e6c84c]" : "text-zinc-400"}`}>
                {slide.labelZh}
              </span>
              <span className="text-[7.5px] font-mono tracking-widest mt-0.5 opacity-60">
                {slide.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Tab Bar */}
      <div className="w-full bg-[#050505] py-2 border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 z-30 select-none">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => selectSlide(index)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${
              currentSlide === index 
                ? "bg-[#e6c84c] text-black" 
                : "bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
          >
            {slide.labelZh}
          </button>
        ))}
      </div>

      {/* ================= SCREEN ACTIVE WORKSPACE ================= */}
      <div className="flex-grow flex items-center relative py-6 lg:py-0 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full font-sans">
              
              {/* SLIDE 0: sovereignty (主旨聲明) */}
              {currentSlide === 0 && (
                <div className="flex flex-row w-full">
                  {/* Left Content Column */}
                  <div className="w-full lg:w-[54%] flex flex-col justify-start text-left pr-0 lg:pr-8 overflow-hidden">
                    
                    {/* Title Area */}
                    <div className="flex-shrink-0 w-full overflow-hidden">
                      <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-4">
                        <div className="w-8 lg:w-12 h-px bg-[#e6c84c]"></div>
                        <span className="text-[#e6c84c] text-[10px] sm:text-[11px] lg:text-sm tracking-[0.25em] font-medium uppercase font-sans whitespace-nowrap">
                          SOVEREIGNTY OF THOUGHT <span className="mx-1 sm:mx-2">|</span> 思想主權
                        </span>
                      </div>
                      <h1 className="text-[20px] sm:text-2xl lg:text-3xl xl:text-[40px] 2xl:text-[46px] font-serif text-[#e6c84c] tracking-wider md:tracking-wide mb-2 lg:mb-3 xl:mb-4 leading-tight lg:leading-[1.15] whitespace-nowrap">
                        策略判讀的權威與思想的轉譯者
                      </h1>

                      <div className="mb-2 lg:mb-4 xl:mb-5 space-y-1">
                        <p className="text-white font-sans font-light text-xs sm:text-sm lg:text-base tracking-wider whitespace-nowrap">
                          企業策略家暨法遵顧問 <span className="mx-1">|</span> 學術出版家
                        </p>
                        <p className="text-[#e6c84c] font-serif text-[14px] sm:text-lg lg:text-xl xl:text-[26px] 2xl:text-[30px] tracking-widest pt-1 whitespace-nowrap">
                          莊鈞翔 博士 CHUANG CHUN HSIANG Ph.D.
                        </p>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="flex flex-col min-h-0 flex-1 justify-around py-1 lg:py-2">
                      <p className="font-sans text-[#EBE7DF]/95 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] leading-relaxed sm:leading-[1.6] lg:leading-[1.8] tracking-wider antialiased p-3 lg:p-4 border-l-2 border-[#e6c84c]/75 italic bg-zinc-950/45">
                        「在商業決策與治理博弈中，不應存在任何模糊空間；無懈可擊的學術分數、高素質的法遵精神、頂尖國際威權認證與紮實研究，才是捍衛委託人思想主權的堅實基石；我們始終秉持絕對真實的誠信操守，將學術卓越與實務脈動深層整合，輔助優質企業走在領先未來的安全航道上。」
                      </p>
                      
                      <ul className="text-stone-300 font-sans font-light text-[11px] sm:text-[11px] lg:text-[14px] xl:text-[15px] leading-relaxed sm:leading-[1.6] lg:leading-[1.8] list-disc pl-4 lg:pl-6 space-y-1.5 lg:space-y-3 my-2 lg:my-3">
                        <li className="pl-1 text-justify">
                          莊博士深耕企業策略與營運管理領域逾二十年，以法學與商學雙重專業為基石，將學術智慧與實務經驗融會貫通，致力於為華人企業提供精準且具前瞻性的解決方案。
                        </li>
                        <li className="pl-1 text-justify">
                          莊博士演講積上千場、數千小時演講紀錄，過去於大學擔任兼任助理教授，致力推廣公司治理法遵教育。
                        </li>
                      </ul>

                      <div className="flex-shrink-0 mt-1 lg:mt-2">
                        <p className="text-[#e6c84c] font-serif italic text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[14px] tracking-wide inline-block">
                          「你不需要完美，你只需要可靠被信賴。」 
                          <span className="ml-1 sm:ml-2 border-b border-[#e6c84c]/50 pb-0.5 inline-block text-[#e6c84c]">
                            --- 內在法遵 Internal Compliance《為你的內心，打造一座不可侵犯的至聖所》
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Portrait Column */}
                  <div className="w-full lg:w-[45%] flex-[1.2] lg:flex-[0_0_auto] flex items-end justify-center lg:justify-end relative min-h-0 h-[280px] sm:h-[400px] lg:h-full overflow-hidden lg:overflow-visible">
                    {/* Spotlight gradient effect */}
                    <div className="absolute -bottom-16 right-0 w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] bg-[#e6c84c]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

                    <img 
                      src="/images/Eric-Chuang-15.png" 
                      alt="Dr. Eric Chuang Portrait" 
                      className="max-w-full max-h-full w-auto object-contain relative z-10 filter drop-shadow-[0_0_55px_rgba(230,200,76,0.18)] contrast-[1.1]"
                      style={{ 
                        objectPosition: 'bottom right',
                        transformOrigin: 'bottom right'
                      }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Bottom Fade - Seamless Matching Page Background (especially on mobile) */}
                    <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none lg:hidden"></div>

                    {/* Signature Overlay */}
                    <div className="absolute bottom-4 right-0 lg:-right-4 xl:right-4 z-20 pointer-events-none select-none">
                      <img 
                        src="/signature-eric001.png" 
                        alt="Dr. Eric Chuang Signature" 
                        className="w-24 sm:w-36 lg:w-48 xl:w-60 max-w-[80vw] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: positions (現任職務與組織) */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 lg:pt-[4.5rem]">
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 space-y-4 text-left py-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-[2px] w-6 bg-[#e6c84c]"></span>
                        <span className="text-[#e6c84c] font-sans font-bold text-xs sm:text-sm tracking-[0.25em]">AFFILIATIONS & ROLES ｜ 現任職務</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.6rem] font-serif font-black text-[#e6c84c] leading-tight select-none">
                        現任職務與組織
                      </h2>
                      <p className="text-stone-300 font-sans text-xs sm:text-sm tracking-wide">
                        企業策略家暨法遵顧問 | 高階組織創辦人
                      </p>
                    </div>

                    {/* Grid of 4 modular cards without heavy borders to prevent lines */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-4">
                      {/* NGO Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">NGO CO-REGULATION</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ 中華企業策略永續發展學會 GCSDA 創會理事長</h3>
                        <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed mt-1">
                          內政部登記立案 NGO 組織，其理念：策略為先、治理為本、管理為終；促成高規格智庫互助與實質自律合規。
                        </p>
                        <div className="text-[10px] md:text-[11px] text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜厚植產業價值基礎，弘揚公司治理與法遵精神</p>
                          <p>｜促進智庫策略應用，引導企業實踐社會責任</p>
                          <p>｜前瞻思維風險控管，賦予企業永續發展動能</p>
                        </div>
                      </div>

                      {/* Media Group Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">DIGITAL PUBLICATION</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ 策略智庫數位集團 STT Group 執行長暨創辦人</h3>
                        <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed mt-1">
                          營運學術出版與專業新聞傳媒，並藉由法律維度與策略專欄解讀。
                        </p>
                        <div className="text-[10px] md:text-[11px] text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜STT Press 策略智庫數位出版</p>
                          <p>｜STT News 策略智庫數位新聞</p>
                          <p>｜STT Intelligence 策略智庫數位評論</p>
                          <p>｜STT Legal Insights 法律策略專欄</p>
                        </div>
                      </div>

                      {/* Columns Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">MEDIA COLUMNIST</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ M傳媒 法律策略專欄特約採訪暨專家評論</h3>
                        <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed mt-1">
                          主筆企業戰略與高度內部控制稽核，協助企業將複雜法律條目轉譯為高實效性、活性兼具之決策底牌。
                        </p>
                        <div className="text-[10px] md:text-[11px] text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜主筆企業法律戰略</p>
                          <p>｜公司治理企業營運</p>
                          <p>｜產業競爭力重構</p>
                          <p>｜數位轉型合規謀劃</p>
                        </div>
                      </div>

                      {/* Academic Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">ACADEMIC APPOINTMENT</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ 逢甲大學商學院 兼任助理教授</h3>
                        <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed mt-1">
                          主授高等教育之數位治理與策略經營模型，貫通最新 AI 治理技術，推展高標準公司法遵教育。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Portrait Column */}
                  <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[78vh] xl:h-[84vh] self-end relative flex items-end justify-center lg:justify-end overflow-visible">
                    <div className="relative h-full w-full max-w-[400px] lg:max-w-none flex items-end justify-center lg:justify-end">
                      <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e6c84c]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
                      <img 
                        src="/images/Eric-Chuang-17.png" 
                        alt="Dr. Eric Chuang Position Portrait" 
                        className="w-full h-auto max-h-[100%] object-bottom object-contain filter drop-shadow-[0_0_55px_rgba(230,200,76,0.15)] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Bottom Fade - Seamless Matching Page Background */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Signature & Title Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1 font-sans">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-36 lg:w-[136px] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          <p className="text-[#e6c84c] text-sm sm:text-base font-serif font-bold tracking-widest leading-none">莊鈞翔 博士</p>
                          <p className="text-stone-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-0.5 leading-none">ERIC CHUANG, Ph.D.</p>
                          <p className="text-zinc-400 text-[8.5px] sm:text-[9.5px] tracking-widest mt-1 opacity-90 leading-relaxed font-light">
                            企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: scholarship (學術背景與實務經歷) */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 lg:pt-[4.5rem]">
                  
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 space-y-4 text-left py-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-[2px] w-6 bg-[#e6c84c]"></span>
                        <span className="text-[#e6c84c] font-sans font-bold text-xs sm:text-sm tracking-[0.25em]">ACADEMIC FOUNDATION ｜ 學術與實務</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.6rem] font-serif font-black text-[#e6c84c] leading-tight select-none">
                        學術背景與實務經歷
                      </h2>
                      <p className="text-stone-300 font-sans text-xs sm:text-sm tracking-wide">
                        學術嚴謹性與高等治理實踐的核心印證
                      </p>
                    </div>

                    {/* Grid of 2 modular cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-4">
                      {/* Academic Credentials Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">ACADEMIC FOUNDATION</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ 學術背景</h3>
                        
                        <div className="mt-1.5 space-y-2 text-zinc-300">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-[11px] md:text-xs text-white">｜ 商學博士 Ph.D. in Business Administration</span>
                            <p className="text-[10px] md:text-[11px] leading-relaxed text-zinc-400 pl-2">
                              最佳商管期刊論文獎得主 (2024)，深研企業策略與法治合規。
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <span className="font-semibold text-[11px] md:text-xs text-white">｜ 高階經營管理碩士 Executive Master of Business Administration</span>
                            <p className="text-[10px] md:text-[11px] leading-relaxed text-zinc-400 pl-2">
                              建立高維度的企業風險治理及商業模式模型，孕育前瞻科技視野。
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Practical Experience Card */}
                      <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
                        <span className="text-[9px] text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold">EMPIRICAL RIGOR</span>
                        <h3 className="text-xs md:text-[13px] font-serif font-black text-[#e6c84c] mt-0.5">▮ 實務經歷</h3>
                        
                        <div className="mt-2.5 space-y-1.5 text-zinc-300 text-[11px] md:text-xs pl-1 font-sans">
                          <p className="text-white font-semibold">｜ 前 詹姆士國際法律事務所 永續長</p>
                          <p className="text-white font-semibold">｜ 前 菲爾茲科技國際股份有限公司 總經理</p>
                          <p className="text-white font-semibold">｜ 前 金豐企業管理顧問股份有限公司 營運總監</p>
                        </div>
                      </div>
                    </div>

                    {/* Core value quote text */}
                    <div className="p-3.5 bg-zinc-950/45 border-l-2 border-[#e6c84c]/75 text-[#dbd7cf] text-xs sm:text-[13px] md:text-sm leading-relaxed max-w-2xl font-sans font-light italic">
                      深耕產官學研界，透過演講與教學持續傳遞「數位治理」與「企業策略」的核心價值，「在無懈可擊的法商研究底層，是無數場高管談判與防弊實戰；策略智庫的核心基因，是絕對不依靠空泛理論盲推決策」。--- CHUANG CHUN HSIANG Ph.D.
                    </div>
                  </div>

                  {/* Right Portrait Column */}
                  <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[78vh] xl:h-[84vh] self-end relative flex items-end justify-center lg:justify-end overflow-visible">
                    <div className="relative h-full w-full max-w-[400px] lg:max-w-none flex items-end justify-center lg:justify-end">
                      <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e6c84c]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
                      <img 
                        src="/images/Eric-Chuang-14.png" 
                        alt="Dr. Eric Chuang Academic Portrait" 
                        className="w-full h-auto max-h-[100%] object-bottom object-contain filter drop-shadow-[0_0_55px_rgba(230,200,76,0.15)] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Bottom Fade - Seamless Matching Page Background */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Signature & Title Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1 font-sans">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-36 lg:w-[136px] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          <p className="text-[#e6c84c] text-sm sm:text-base font-serif font-bold tracking-widest leading-none">莊鈞翔 博士</p>
                          <p className="text-stone-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-0.5 leading-none">ERIC CHUANG, Ph.D.</p>
                          <p className="text-zinc-400 text-[8.5px] sm:text-[9.5px] tracking-widest mt-1 opacity-90 leading-relaxed font-light">
                            企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: credentials (2026 國際專業認證) */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 lg:pt-[4.5rem]">
                  
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 space-y-4 text-left py-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-[2px] w-6 bg-[#e6c84c]"></span>
                        <span className="text-[#e6c84c] font-sans font-bold text-xs sm:text-sm tracking-[0.25em]">REGULATORY ACCREDITATIONS ｜ 專業認證</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.3rem] xl:text-[2.6rem] font-serif font-black text-[#e6c84c] leading-tight select-none">
                        頂尖數位認知與 ESG 永續法遵認證
                      </h2>
                      <p className="text-stone-300 font-sans text-xs sm:text-sm tracking-wide">
                        高階技術能力與雙重法遵甲級權威認證 | 精英合規智庫背景
                      </p>
                    </div>

                    {/* Main statement quote */}
                    <div className="space-y-4">
                      <p className="font-sans text-[#EBE7DF]/95 text-xs sm:text-[13px] md:text-sm leading-relaxed tracking-wider antialiased bg-zinc-950/45 p-4 border-l-2 border-[#e6c84c]/75 italic">
                        「 在商業大變局下，卓越的國際專業認證不只是裝飾，更是輔助董事會安全航行、架設合規防火牆的頂端利器。我們深耕最前沿的官方 AI 認知模型與 ESG 碳中和戰略，將實行標準轉譯為最堅實的競爭底牌。」
                      </p>
                      
                      <div className="space-y-2 text-[#dbd7cf] text-[11px] sm:text-xs md:text-[13px] font-sans leading-relaxed">
                        <p>• <strong className="text-white font-semibold">Anthropic × Google 官方 AI 研習能力認證</strong>：包含 Anthropic × HEA × UCC 聯名之 AI Fluency 全系列架構認證、Claude 101/Code in Action、Amazon Bedrock 運算、Gemini AI 認證教師以及進階 Agent 技能認證。</p>
                        <p>• <strong className="text-white font-semibold">中經院減碳管理與 TÜV 萊茵兩岸勞資法務認證</strong>：持有中華經濟研究院綠色中心「減碳管理師」認證、CEO 國際永續發展碳管理甲級管理師、ESG 不動產淨零、以及德國萊茵 TÜV 勞資法務管理甲級雙重專家資格。</p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.02]">
                        <p className="text-[#e6c84c]/90 text-[11px] sm:text-xs font-serif leading-relaxed italic">
                          「法遵不是企業經營的阻礙，而是引領頂級決策與家族傳承的最強武器。」 --- 內在法遵 Internal Compliance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Portrait Column */}
                  <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[78vh] xl:h-[84vh] self-end relative flex items-end justify-center lg:justify-end overflow-visible">
                    <div className="relative h-full w-full max-w-[400px] lg:max-w-none flex items-end justify-center lg:justify-end">
                      <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e6c84c]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
                      <img 
                        src="/images/Eric-Chuang-18.png" 
                        alt="Dr. Eric Chuang Credentials Portrait" 
                        className="w-full h-auto max-h-[100%] object-bottom object-contain filter drop-shadow-[0_0_55px_rgba(230,200,76,0.15)] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Bottom Fade - Seamless Matching Page Background Container */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Signature & Title Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1 font-sans">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-36 lg:w-[136px] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          <p className="text-[#e6c84c] text-sm sm:text-base font-serif font-bold tracking-widest leading-none">莊鈞翔 博士</p>
                          <p className="text-stone-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-0.5 leading-none">ERIC CHUANG, Ph.D.</p>
                          <p className="text-zinc-400 text-[8.5px] sm:text-[9.5px] tracking-widest mt-1 opacity-90 leading-relaxed font-light">
                            企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: services (四大核心服務項目) */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 lg:pt-[4.5rem]">
                  
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 space-y-4 text-left py-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="h-[2px] w-12 bg-[#e6c84c]"></span>
                        <span className="text-[#e6c84c] font-sans font-black text-xs uppercase tracking-[0.4em]">PROFESSIONAL DOMAIN AREAS</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl text-white font-serif tracking-wide leading-tight">
                        四大核心服務項目
                      </h2>
                      <p className="text-zinc-400 text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold">
                        THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS
                      </p>
                    </div>

                    {/* Grid of the 4 Pillars without heavy borders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          title: "策略佈局 STRATEGIC PLAN",
                          roman: "壹 ｜ 洞察先機與駕馭變革",
                          points: [
                            "企業智慧財產與營業秘密全方位防衛策略",
                            "高階經理人佈局、繼承權及商業模式優化",
                            "企業策略性併購協調與戰略聯盟整合"
                          ]
                        },
                        {
                          title: "穩健營運 STEADY RUNNING",
                          roman: "貳 ｜ 化解爭議與創造價值",
                          points: [
                            "股權架構設計、治理與多方利害關係人談判",
                            "不對稱決策裂痕消除與內部控制流程稽核",
                            "企業契約生命週期安全評估與商業合約"
                          ]
                        },
                        {
                          title: "永續治理 CORE GOVERNANCE",
                          roman: "參 ｜ 傳承創新與法遵優化",
                          points: [
                            "人力資本戰略健全與和諧心理勞動契約",
                            "家族資產辦公室策略整合與閉鎖公司傳承",
                            "企業法遵合規防禦、公司自律自審規範"
                          ]
                        },
                        {
                          title: "專業養成 ACCOMODATION",
                          roman: "肆 ｜ 國際認證與課程培訓",
                          points: [
                            "頂尖高階經理人公司治理實務教育設計",
                            "2026高階技術認證引薦與代理培訓課綱",
                            "企業智庫品牌哲思與常設法治文化推動"
                          ]
                        }
                      ].map((pillar, idx) => (
                        <div 
                          key={idx}
                          className="p-4 sm:p-5 border border-white/[0.03] hover:border-[#e6c84c]/20 group transition-all duration-300 bg-zinc-950/80 rounded-lg flex flex-col justify-between shadow-2xl"
                        >
                          <div className="space-y-2">
                            <span className="text-[7.5px] text-[#e6c84c]/60 font-mono tracking-wider block font-bold">PILLAR 0{idx + 1} &nbsp;∥&nbsp; {pillar.title}</span>
                            <h3 className="text-sm font-bold font-serif text-white">{pillar.roman}</h3>
                            <ul className="space-y-1.5 text-[11px] text-zinc-400 pl-0 border-t border-white/[0.02] pt-2 select-all">
                              {pillar.points.map((p, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-[#e6c84c] font-black shrink-0">｜</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Portrait Column */}
                  <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[78vh] xl:h-[84vh] self-end relative flex items-end justify-center lg:justify-end overflow-visible">
                    <div className="relative h-full w-full max-w-[400px] lg:max-w-none flex items-end justify-center lg:justify-end">
                      <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e6c84c]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
                      <img 
                        src="/images/Eric-Chuang-19.png" 
                        alt="Dr. Eric Chuang Services Portrait" 
                        className="w-full h-auto max-h-[100%] object-bottom object-contain filter drop-shadow-[0_0_55px_rgba(230,200,76,0.15)] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Bottom Fade - Seamless Matching Page Background Container */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Signature & Title Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1 font-sans">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-36 lg:w-[136px] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          <p className="text-[#e6c84c] text-sm sm:text-base font-serif font-bold tracking-widest leading-none">莊鈞翔 博士</p>
                          <p className="text-stone-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-0.5 leading-none">ERIC CHUANG, Ph.D.</p>
                          <p className="text-zinc-400 text-[8.5px] sm:text-[9.5px] tracking-widest mt-1 opacity-90 leading-relaxed font-light">
                            企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: contact (治理委託與智庫連結) */}
              {currentSlide === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 lg:pt-[4.5rem]">
                  
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 space-y-5 text-left py-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <span className="h-[2px] w-12 bg-[#e6c84c]"></span>
                        <span className="text-[#e6c84c] font-sans font-black text-xs uppercase tracking-[0.4em]">INITIATE COREGULATION</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl text-white font-serif tracking-wide leading-tight">
                        實踐您的思想主權
                      </h2>
                      <p className="text-zinc-400 text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold">
                        GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE
                      </p>
                    </div>

                    {/* Engagement description */}
                    <div className="space-y-4 text-zinc-300">
                      <p className="text-sm sm:text-base leading-relaxed bg-zinc-950/45 p-4 border-l-2 border-[#e6c84c]/75 italic">
                        「我們絕不推銷任何廉價的建議，我們僅為真正珍視基業與秩序的領袖，建立無懈可擊的法商防火牆。」
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        如果您需要為企業董事會注入實質的決策秩序、妥善保護個人智慧財產或營業秘密，或是進行系統化的家族接班人資產規劃，誠摯邀請您與莊鈞翔博士專屬智庫辦公室展開對話。
                      </p>
                    </div>

                    {/* Action layout cards without outline borders */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a 
                        href="https://lin.ee/yJrCTeo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black px-6 py-5 rounded-xl flex flex-col items-start gap-1 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg no-underline"
                      >
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5 text-black" strokeWidth={1.5} />
                          <span className="text-base font-bold tracking-wider font-sans">治理委託 ENGAGEMENT</span>
                        </div>
                        <span className="text-[9px] font-mono font-black tracking-widest opacity-80 uppercase leading-none">
                          👉 點擊一鍵開啟 LINE 私人委託諮詢
                        </span>
                      </a>

                      <a 
                        href="mailto:pc5888@gmail.com"
                        className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 px-6 py-5 rounded-xl flex flex-col items-start gap-1 active:scale-[0.98] transition-all cursor-pointer shadow-lg no-underline"
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-[#e6c84c]" strokeWidth={1.5} />
                          <span className="text-base font-bold tracking-wider font-sans">聯絡智庫 CONNECT</span>
                        </div>
                        <span className="text-[9px] font-mono font-black tracking-widest opacity-80 uppercase leading-none">
                          ✉️ 寫信至專屬辦公室秘書 pc5888@gmail.com
                        </span>
                      </a>
                    </div>

                    {/* Bottom return to top trigger */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => selectSlide(0)}
                        className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2.5 rounded-full flex items-center justify-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer text-[10px] font-mono tracking-widest outline-none"
                      >
                        <span className="px-2">▲ 回到第一頁 START OVER</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Portrait Column */}
                  <div className="lg:col-span-5 h-[340px] sm:h-[400px] lg:h-[78vh] xl:h-[84vh] self-end relative flex items-end justify-center lg:justify-end overflow-visible">
                    <div className="relative h-full w-full max-w-[400px] lg:max-w-none flex items-end justify-center lg:justify-end">
                      <div className="absolute -bottom-16 -right-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#e6c84c]/4 rounded-full blur-[140px] pointer-events-none z-0"></div>
                      <img 
                        src="/images/Eric-Chuang-20.png" 
                        alt="Dr. Eric Chuang Connection Portrait" 
                        className="w-full h-auto max-h-[100%] object-bottom object-contain filter drop-shadow-[0_0_55px_rgba(230,200,76,0.15)] contrast-[1.05]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Bottom Fade - Seamless Matching Page Background Container */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Signature & Title Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1 font-sans">
                        <img 
                          src="/signature-eric001.png" 
                          alt="Dr. Eric Chuang Signature" 
                          className="w-32 sm:w-36 lg:w-[136px] h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          <p className="text-[#e6c84c] text-sm sm:text-base font-serif font-bold tracking-widest leading-none">莊鈞翔 博士</p>
                          <p className="text-stone-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-0.5 leading-none">ERIC CHUANG, Ph.D.</p>
                          <p className="text-zinc-400 text-[8.5px] sm:text-[9.5px] tracking-widest mt-1 opacity-90 leading-relaxed font-light">
                            企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Honor footprint metadata at the bottom */}
      <footer className="border-t border-white/[0.02] bg-[#000] py-4 relative z-20 select-none">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} STT Press 策略智庫數位出版 · 莊鈞翔 博士 (Founder: Eric Chuang, Ph.D.) ∥ ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="hover:text-gold-200 cursor-default">TRUST FOUNDATION</span>
            <span>·</span>
            <span className="hover:text-gold-200 cursor-default">INSTITUTIONAL LOGIC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
