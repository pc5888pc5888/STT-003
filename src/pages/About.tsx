import { motion } from "motion/react";
import { SignatureHeader } from "../components/SignatureHeader";
import { Shield, GraduationCap, Quote } from "lucide-react";

export default function About() {
  return (
    <div 
      className="min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white"
      style={{ overflowX: "hidden" }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section - Refined Proportions with appropriate main scale */}
        <section 
          className="about-hero-section relative min-h-[92vh] flex items-center overflow-hidden border-b border-white/5 mb-24 pt-24 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[100px] -z-10"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center w-full relative z-10">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="h-[2px] w-12 bg-gold-600"></span>
                  <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.5em]">FOUNDER'S PROFILE</span>
                </div>
                <div className="relative w-full max-w-2xl px-1">
                  <div className="space-y-4">
                    <p className="text-lg sm:text-2xl lg:text-[1.6rem] font-bold text-white font-serif leading-tight">
                      Strategist & Scholar Eric Chuang, Ph.D.
                    </p>
                    <p className="text-xs sm:text-base lg:text-[1.2rem] tracking-[0.15em] sm:tracking-[0.3em] text-stone-300 font-sans">
                      企業策略顧問 ｜ 學術出版家
                    </p>
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-[#C9A84C] font-bold my-4 tracking-[0.05em] whitespace-nowrap break-keep">
                      莊鈞翔 博士
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {["逢甲大學商學博士", "GCSDA 創會理事長", "策略智庫出版人"].map(tag => (
                  <span key={tag} className="px-6 py-3 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase bg-white/5 rounded-none backdrop-blur-sm hover:border-gold-500/50 hover:text-gold-500 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-10 max-w-4xl" style={{ textAlign: "left", marginLeft: "0", marginTop: "40px" }}>
                <p className="font-serif text-stone-300 leading-relaxed font-light" style={{ fontSize: "1.45rem", textAlign: "left", marginLeft: "0", paddingLeft: "0" }}>
                  「最堅固的商業帝國，往往崩塌於領導者內在秩序的失衡；真正的策劃，始於內在法治張力的建立與校準。」
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 h-[75vh] lg:h-[85vh] relative flex items-end justify-center lg:justify-end overflow-visible">
              <motion.div 
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full flex items-end justify-center lg:justify-end"
              >
                <div className="relative h-full w-full max-w-[500px] lg:max-w-none flex items-end justify-end">
                  {/* Cinematic Light Beam */}
                  <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-600/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

                  <img 
                    src="/images/portrait-007.png" 
                    alt="Dr. Eric Chuang" 
                    className="w-full h-auto max-h-[75vh] lg:max-h-[90vh] object-contain object-bottom filter drop-shadow-[0_0_50px_rgba(212,175,55,0.1)] contrast-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic Bottom Fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/95 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Clean Signature Overlay */}
                  <div className="absolute bottom-6 md:bottom-12 right-6 md:right-8 z-20 pointer-events-none select-none">
                    <img 
                      src="/signature-eric001.png" 
                      alt="Dr. Eric Chuang Signature" 
                      className="w-32 sm:w-44 lg:w-52 h-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] opacity-95 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Academic Depth - Symmetrical Design */}
        <section className="space-y-28 border-t border-white/10 pt-32 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-6 px-2">
                <GraduationCap className="h-8 w-8 mx-auto text-gold-400/50" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-gold-metallic tracking-tight leading-[1.2] md:leading-tight">
                  <span className="inline-block">卓越學術背景與</span>
                  <span className="inline-block">學者型實務家之實踐</span>
                </h2>
                <p className="text-gold-200/40 text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.5em] uppercase whitespace-nowrap">
                  Scholar-Practitioner Paradigm
                </p>
              </div>
            
            <div className="space-y-10 text-white/70 text-lg leading-relaxed font-light">
              <p>
                Eric Chuang, Ph.D.，華人企業界深具影響力的「企業策略軍師」、「當代法商作家」與「年度策略評論家」，深耕企業策略與營運管理領域逾二十載。以法學與商學雙重專業為基石，致力於將嚴謹的學術智慧與複雜的實務經驗融會貫通。
              </p>
              <p>
                於逢甲大學商學博士研究所深造期間，精修企業策略理論、國際政經環境、產業創新趨勢及品牌哲思。其研究視角聚焦於企業接班、公司治理法遵及企業策略永續發展等關鍵議題，並以 <span className="text-gold-400 font-medium">Cumulative GPA 4.3</span> 的優異表現取得商學博士學位，曾榮獲「最佳商管期刊論文獎」。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-sans">
             <div className="space-y-12">
               <div className="group space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(230,200,76,0.1)] transition-all duration-500">
                 <h3 className="text-2xl text-white group-hover:text-gold-metallic transition-colors font-display font-medium tracking-wide">學術型實務家的典範</h3>
                 <p className="text-white/60 leading-relaxed text-lg font-light">現為策略智庫平台與數位媒體之創辦人，並受邀擔任公司治理法律新聞專欄之作家與評論顧問。將學術底蘊轉化為「策略智庫 Strategic Think Tank, STT」系列品牌。整合「產、學、研」三方智力，為企業領袖提供精準戰略判讀。</p>
               </div>
               <div className="group space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(230,200,76,0.1)] transition-all duration-500">
                 <h3 className="text-2xl text-white group-hover:text-gold-metallic transition-colors font-display font-medium tracking-wide">內在法遵與心靈治理</h3>
                 <p className="text-white/60 leading-relaxed text-lg font-light">主張「法遵 Compliance」不應僅是外部規範的被動遵守，而應是企業核心價值的內在延伸。其代表著作《內在法遵：為你的內心，打造一座不可侵犯的至聖所》將法遵精神昇華至心靈境界，被譽為當代企業家必讀的管理寶典。</p>
               </div>
             </div>
             
             <div className="space-y-12">
               <div className="group space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(230,200,76,0.1)] transition-all duration-500">
                 <h3 className="text-2xl text-white group-hover:text-gold-metallic transition-colors font-display font-medium tracking-wide">家族企業治理專家</h3>
                 <p className="text-white/60 leading-relaxed text-lg font-light">研究著作如《臺灣企業接班人的佈局規劃與傳承家族價值》、《2025 永續家族治理實務實錄》與《企業策略導入公司治理法遵精神》已成為當代治理的重要參考。透過閱讀教育養成對法律的認知與尊重，使法律不再因門檻而被束之高閣。</p>
               </div>
               <div className="group space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(230,200,76,0.1)] transition-all duration-500">
                 <h3 className="text-2xl text-white group-hover:text-gold-metallic transition-colors font-display font-medium tracking-wide">國際視野與 AI 防護網</h3>
                 <p className="text-white/60 leading-relaxed text-lg font-light">創立「中華企業策略永續發展學會 GCSDA」，弘揚公司治理精神。並代理「Lawsnote 法務掌 AI 法律顧問系統」，實現 AI 即時處理與專業律師協作的「一站式法律協助」，確保企業在 AI 世代下能實施 365 天不限時數的法律保障。</p>
               </div>
             </div>
          </div>
        </section>

        {/* Four Pillars of Service - New Section */}
        <section className="py-40 border-t border-white/5 relative bg-[#080808]">
           <div className="space-y-24">
              <div className="text-center space-y-6 px-4">
                <Quote className="h-8 w-8 mx-auto text-gold-400/30" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-[0.1em] sm:tracking-widest uppercase leading-snug">
                  <span className="inline-block">企業策略軍師：</span>
                  <span className="inline-block">四大核心服務維度</span>
                </h2>
                <div className="h-px w-24 sm:w-32 bg-gold-600/30 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                {[
                  { title: "策略佈局", desc: "洞察先機與駕馭變革。專注於智慧財產與營業秘密防禦策略、高階經理人佈局與商業模式創新，策劃策略性併購整合。" },
                  { title: "穩健營運", desc: "化解爭議與創造價值。協助解決股權與利害關係人爭議，執行企業營運韌性之風險應對，主導高階商業談判。" },
                  { title: "永續治理", desc: "傳承創新與法遵優化。推動家族企業永續傳承、戰略財富管理，優化法遵風險防禦體質，建立和諧的勞資心理契約。" },
                  { title: "專業養成", desc: "國際認證與深度轉型。設計專業認證培訓課綱；擁有「減碳管理師」、「ESG 不動產淨零甲級管理師」及「AI 認證教師」等專業資歷。" }
                ].map((pillar, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-10 border border-white/5 hover:border-gold-500/30 group transition-all duration-700 bg-white/[0.01]"
                  >
                    <div className="mb-8 font-display text-gold-400 text-sm tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Dimension 0{idx + 1}</div>
                    <h3 className="text-2xl font-display font-medium text-white mb-6 group-hover:text-gold-200">{pillar.title}</h3>
                    <div className="h-[2px] w-8 bg-gold-900 group-hover:w-16 transition-all duration-500 mb-8"></div>
                    <p className="text-white/50 leading-relaxed font-light group-hover:text-white/80 transition-colors">{pillar.desc}</p>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>



        {/* Global Protection Credo - Minimalistic & Polished */}
        <section className="py-32 border-t border-white/5">
           <div className="max-w-3xl mx-auto text-center space-y-16">
              <div className="space-y-6 px-4">
                <Shield className="h-10 w-10 mx-auto text-gold-400/30" />
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-gold-metallic tracking-tight leading-tight">
                  <span className="inline-block">法務保障與</span><span className="inline-block">智財維護</span>
                </h2>
              </div>
              
              <p className="text-white/60 text-xl font-sans leading-relaxed px-12 font-light">
                STT Press 策略智庫全體出版品與理論架構，均聘任「七法法律事務所」郭榮彥律師為常年法律顧問。我們確保每一項學術主張與策略觀點，皆在最嚴謹的法治框架與智財保護下完整呈現。
              </p>
              
              <div className="pt-12 flex flex-col items-center gap-6">
                <div className="h-px w-20 bg-white/20"></div>
                <span className="text-gold-400 text-[10px] sm:text-sm font-display tracking-[0.3em] sm:tracking-[0.6em] uppercase whitespace-nowrap flex items-center justify-center gap-4 sm:gap-8 px-2">
                  <span className="inline-block">策略為先</span>
                  <span className="h-1 w-1 bg-gold-400/50 rounded-full shrink-0"></span>
                  <span className="inline-block">治理為本</span>
                  <span className="h-1 w-1 bg-gold-400/50 rounded-full shrink-0"></span>
                  <span className="inline-block">管理為終</span>
                </span>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
