import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Crown } from "lucide-react";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: "sovereignty", labelZh: "主旨聲明", labelEn: "SOVEREIGNTY" },
    { id: "positions",   labelZh: "現任職務", labelEn: "POSITIONS"   },
    { id: "scholarship", labelZh: "學術與實務", labelEn: "SCHOLARSHIP" },
    { id: "credentials", labelZh: "專業認證",  labelEn: "CREDENTIALS" },
    { id: "services",    labelZh: "服務項目",  labelEn: "SERVICES"    },
    { id: "contact",     labelZh: "治理委託",  labelEn: "CONTACT"     },
  ];

  const selectSlide = (index: number) => setCurrentSlide(index);

  /* ── 共用：右側人像 + 簽名 ── */
  const Portrait = ({ src, alt }: { src: string; alt: string }) => (
    <div className="hidden lg:flex lg:w-[42%] flex-col items-end justify-end relative overflow-hidden flex-shrink-0" style={{ height: '100%' }}>
      <img
        src={src}
        alt={alt}
        className="w-auto object-contain object-bottom"
        style={{ height: '100%', maxHeight: '100%', filter: 'contrast(1.05)' }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none select-none text-right flex flex-col items-end gap-1">
        <img
          src="/images/signature-eric001.png"
          alt="Signature"
          className="h-auto opacity-95"
          style={{ width: 'clamp(100px, 9vw, 170px)', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.95))' }}
          referrerPolicy="no-referrer"
        />
        <div className="text-right mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
          <p className="text-[#e6c84c] font-serif font-bold tracking-widest leading-none" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>莊鈞翔 博士</p>
          <p className="text-stone-300 font-mono tracking-widest uppercase mt-0.5 leading-none" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)' }}>ERIC CHUANG, Ph.D.</p>
          <p className="text-zinc-400 mt-1 opacity-90 leading-relaxed font-light" style={{ fontSize: 'clamp(7px, 0.6vw, 9px)' }}>企業策略資深顧問 ｜ 治理制度設計者 ｜ 策略智庫創辦人</p>
        </div>
      </div>
    </div>
  );

  /* ── 共用：左側標題前綴 ── */
  const SectionLabel = ({ en, zh }: { en: string; zh: string }) => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-px bg-[#e6c84c] flex-shrink-0"></div>
      <span className="text-[#e6c84c] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}>
        {en} ｜ {zh}
      </span>
    </div>
  );

  /* ── 共用：卡片 ── */
  const Card = ({ label, title, children }: { label: string; title: string; children: React.ReactNode }) => (
    <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
      <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>{label}</span>
      <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>{title}</h3>
      <div style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>{children}</div>
    </div>
  );

  /* ── 主容器高度 ── */
  const contentH = 'calc(100vh - 160px)';

  return (
    <div
      className="bg-[#050505] text-white selection:bg-gold-400/30 selection:text-white flex flex-col"
      id="about-viewport-container"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* 左側垂直文字 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none">
        <div className="w-px h-12 bg-[#e6c84c]/15"></div>
        <span className="font-mono text-white/20 uppercase [writing-mode:vertical-lr]" style={{ fontSize: '8px', letterSpacing: '0.4em' }}>STT PRESS THINK TANK PLATFORM</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/25"></div>
      </div>

      {/* 次導覽列 */}
      <div className="w-full bg-[#050505] border-b border-white/[0.02] flex-shrink-0 select-none hidden md:block" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => selectSlide(index)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-all cursor-pointer border-0 bg-transparent outline-none flex-1 max-w-[180px] ${currentSlide === index ? 'bg-white/[0.04] text-[#e6c84c]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span className={`font-sans font-bold tracking-wider ${currentSlide === index ? 'text-[#e6c84c]' : 'text-zinc-400'}`} style={{ fontSize: '11px' }}>{slide.labelZh}</span>
              <span className="font-mono tracking-widest mt-0.5 opacity-60" style={{ fontSize: '7.5px' }}>{slide.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 行動版次導覽 */}
      <div className="w-full bg-[#050505] border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 py-2 flex-shrink-0">
        {slides.map((slide, index) => (
          <button key={slide.id} type="button" onClick={() => selectSlide(index)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${currentSlide === index ? 'bg-[#e6c84c] text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>
            {slide.labelZh}
          </button>
        ))}
      </div>

      {/* 主內容區 */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%' }}
          >
            <div className="container mx-auto px-6 max-w-7xl font-sans" style={{ height: '100%' }}>

              {/* ═══ SLIDE 0: 主旨聲明 ═══ */}
              {currentSlide === 0 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  {/* 左欄 */}
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="SOVEREIGNTY OF THOUGHT" zh="思想主權" />
                    <h1 className="font-serif text-[#e6c84c] tracking-wider leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.5vw, 38px)', margin: 'clamp(4px, 0.8vh, 12px) 0' }}>
                      策略判讀的權威與思想的轉譯者
                    </h1>
                    <div className="flex-shrink-0" style={{ marginBottom: 'clamp(6px, 1.2vh, 16px)' }}>
                      <p className="text-white font-light tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}>企業策略家暨法遵顧問 | 學術出版家</p>
                      <p className="text-[#e6c84c] font-serif tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(12px, 1.3vw, 22px)', marginTop: '4px' }}>莊鈞翔 博士 CHUANG CHUN HSIANG Ph.D.</p>
                    </div>
                    <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
                      <p className="font-sans text-[#EBE7DF]/90 tracking-wider italic" style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: '1.7' }}>
                        　　在商業決策與治理博弈中，不應存在任何模糊空間；無懈可擊的學術分數、高素質的法遵精神、頂尖國際威權認證與紮實研究，才是捍衛委託人思想主權的堅實基石；我們始終秉持絕對真實的誠信操守，將學術卓越與實務脈動深層整合，輔助優質企業走在領先未來的安全航道上。」
                      </p>
                    </div>
                    <ul className="list-disc flex-shrink-0" style={{ paddingLeft: 'clamp(14px, 1.5vw, 22px)', marginBottom: 'clamp(6px, 1.5vh, 18px)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: '1.65' }}>
                      <li className="text-stone-300 font-light" style={{ marginBottom: 'clamp(4px, 0.6vh, 8px)' }}>莊博士深耕企業策略與營運管理領域逾二十年，以法學與商學雙重專業為基石，將學術智慧與實務經驗融會貫通，致力於為華人企業提供精準且具前瞻性的解決方案。</li>
                      <li className="text-stone-300 font-light">莊博士演講積上千場、數千小時演講紀錄，過去於大學擔任兼任助理教授，致力推廣公司治理法遵教育。</li>
                    </ul>
                    <p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                      「你不需要完美，你只需要可被信賴。」<span className="border-b border-[#e6c84c]/50 pb-0.5 ml-1">--- 內在法遵 Internal Compliance《為你的內心，打造一座不可侵犯的至聖所》</span>
                    </p>
                  </div>
                  <Portrait src="/images/Eric-Chuang-15.png" alt="莊鈞翔博士" />
                </div>
              )}

              {/* ═══ SLIDE 1: 現任職務 ═══ */}
              {currentSlide === 1 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="AFFILIATIONS & ROLES" zh="現任職務" />
                    <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>現任職務與組織</h2>
                    <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>企業策略家暨法遵顧問 | 高階組織創辦人</p>
                    <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                      <Card label="NGO CO-REGULATION" title="▮ 中華企業策略永續發展學會 GCSDA 創會理事長">
                        <p className="text-zinc-300 font-light leading-relaxed mt-1">內政部登記立案 NGO 組織，其理念：策略為先、治理為本、管理為終；促成高規格智庫互助與實質自律合規。</p>
                        <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜厚植產業價值基礎，弘揚公司治理與法遵精神</p>
                          <p>｜促進智庫策略應用，引導企業實踐社會責任</p>
                          <p>｜前瞻思維風險控管，賦予企業永續發展動能</p>
                        </div>
                      </Card>
                      <Card label="DIGITAL PUBLICATION" title="▮ 策略智庫數位集團 STT Group 執行長暨創辦人">
                        <p className="text-zinc-300 font-light leading-relaxed mt-1">營運學術出版與專業新聞傳媒，並藉由法律維度與策略專欄解讀。</p>
                        <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜STT Press 策略智庫數位出版</p>
                          <p>｜STT News 策略智庫數位新聞</p>
                          <p>｜STT Intelligence 策略智庫數位評論</p>
                          <p>｜STT Legal Insights 法律策略專欄</p>
                        </div>
                      </Card>
                      <Card label="MEDIA COLUMNIST" title="▮ M傳媒 法律策略專欄特約採訪暨專家評論">
                        <p className="text-zinc-300 font-light leading-relaxed mt-1">主筆企業戰略與高度內部控制稽核，協助企業將複雜法律條目轉譯為高實效性、活性兼具之決策底牌。</p>
                        <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                          <p>｜主筆企業法律戰略</p><p>｜公司治理企業營運</p><p>｜產業競爭力重構</p><p>｜數位轉型合規謀劃</p>
                        </div>
                      </Card>
                      <Card label="ACADEMIC APPOINTMENT" title="▮ 逢甲大學商學院 兼任助理教授">
                        <p className="text-zinc-300 font-light leading-relaxed mt-1">主授高等教育之數位治理與策略經營模型，貫通最新 AI 治理技術，推展高標準公司法遵教育。</p>
                      </Card>
                    </div>
                  </div>
                  <Portrait src="/images/Eric-Chuang-17.png" alt="莊鈞翔博士" />
                </div>
              )}

              {/* ═══ SLIDE 2: 學術與實務 ═══ */}
              {currentSlide === 2 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="ACADEMIC FOUNDATION" zh="學術與實務" />
                    <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>學術背景與實務經歷</h2>
                    <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>學術嚴謹性與高等治理實踐的核心印證</p>
                    <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                      <Card label="ACADEMIC FOUNDATION" title="▮ 學術背景">
                        <div className="mt-1.5 space-y-2 text-zinc-300">
                          <div><span className="font-semibold text-white">｜ 商學博士 Ph.D. in Business Administration</span><p className="text-zinc-400 pl-2 mt-0.5">最佳商管期刊論文獎得主 (2024)，深研企業策略與法治合規。</p></div>
                          <div><span className="font-semibold text-white">｜ 高階經營管理碩士 EMBA</span><p className="text-zinc-400 pl-2 mt-0.5">建立高維度的企業風險治理及商業模式模型，孕育前瞻科技視野。</p></div>
                        </div>
                      </Card>
                      <Card label="EMPIRICAL RIGOR" title="▮ 實務經歷">
                        <div className="mt-2 space-y-1.5 text-zinc-300">
                          <p className="text-white font-semibold">｜ 前 詹姆士國際法律事務所 永續長</p>
                          <p className="text-white font-semibold">｜ 前 菲爾茲科技國際股份有限公司 總經理</p>
                          <p className="text-white font-semibold">｜ 前 金豐企業管理顧問股份有限公司 營運總監</p>
                        </div>
                      </Card>
                    </div>
                    <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                      <p className="text-[#dbd7cf] font-light italic leading-relaxed">深耕產官學研界，透過演講與教學持續傳遞「數位治理」與「企業策略」的核心價值，「在無懈可擊的法商研究底層，是無數場高管談判與防弊實戰；策略智庫的核心基因，是絕對不依靠空泛理論盲推決策」。--- CHUANG CHUN HSIANG Ph.D.</p>
                    </div>
                  </div>
                  <Portrait src="/images/Eric-Chuang-14.png" alt="莊鈞翔博士" />
                </div>
              )}

              {/* ═══ SLIDE 3: 專業認證 ═══ */}
              {currentSlide === 3 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="REGULATORY ACCREDITATIONS" zh="專業認證" />
                    <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.4vw, 36px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>頂尖數位認知與 ESG 永續法遵認證</h2>
                    <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>高階技術能力與雙重法遵甲級權威認證 | 精英合規智庫背景</p>
                    <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(10px, 0.9vw, 14px)' }}>
                      <p className="text-[#EBE7DF]/95 tracking-wider italic leading-relaxed">「 在商業大變局下，卓越的國際專業認證不只是裝飾，更是輔助董事會安全航行、架設合規防火牆的頂端利器。我們深耕最前沿的官方 AI 認知模型與 ESG 碳中和戰略，將實行標準轉譯為最堅實的競爭底牌。」</p>
                    </div>
                    <div className="space-y-2 flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                      <p className="text-[#dbd7cf] leading-relaxed">• <strong className="text-white">Anthropic × Google 官方 AI 研習能力認證</strong>：包含 Anthropic × HEA × UCC 聯名之 AI Fluency 全系列架構認證、Claude 101/Code in Action、Amazon Bedrock 運算、Gemini AI 認證教師以及進階 Agent 技能認證。</p>
                      <p className="text-[#dbd7cf] leading-relaxed">• <strong className="text-white">中經院減碳管理與 TÜV 萊茵兩岸勞資法務認證</strong>：持有中華經濟研究院綠色中心「減碳管理師」認證、CEO 國際永續發展碳管理甲級管理師、ESG 不動產淨零、以及德國萊茵 TÜV 勞資法務管理甲級雙重專家資格。</p>
                    </div>
                    <p className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>「法遵不是企業經營的阻礙，而是引領頂級決策與家族傳承的最強武器。」 --- 內在法遵 Internal Compliance</p>
                  </div>
                  <Portrait src="/images/Eric-Chuang-18.png" alt="莊鈞翔博士" />
                </div>
              )}

              {/* ═══ SLIDE 4: 服務項目 ═══ */}
              {currentSlide === 4 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="PROFESSIONAL DOMAIN AREAS" zh="服務項目" />
                    <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>四大核心服務項目</h2>
                    <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS</p>
                    <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                      {[
                        { title: '策略佈局 STRATEGIC PLAN', roman: '壹 ｜ 洞察先機與駕馭變革', points: ['企業智慧財產與營業秘密全方位防衛策略', '高階經理人佈局、繼承權及商業模式優化', '企業策略性併購協調與戰略聯盟整合'] },
                        { title: '穩健營運 STEADY RUNNING', roman: '貳 ｜ 化解爭議與創造價值', points: ['股權架構設計、治理與多方利害關係人談判', '不對稱決策裂痕消除與內部控制流程稽核', '企業契約生命週期安全評估與商業合約'] },
                        { title: '永續治理 CORE GOVERNANCE', roman: '參 ｜ 傳承創新與法遵優化', points: ['人力資本戰略健全與和諧心理勞動契約', '家族資產辦公室策略整合與閉鎖公司傳承', '企業法遵合規防禦、公司自律自審規範'] },
                        { title: '專業養成 ACCOMODATION', roman: '肆 ｜ 國際認證與課程培訓', points: ['頂尖高階經理人公司治理實務教育設計', '2026高階技術認證引薦與代理培訓課綱', '企業智庫品牌哲思與常設法治文化推動'] },
                      ].map((pillar, idx) => (
                        <div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden">
                          <span className="text-[#e6c84c]/60 font-mono font-bold block" style={{ fontSize: '8px' }}>PILLAR 0{idx+1} ∥ {pillar.title}</span>
                          <h3 className="font-serif font-bold text-white mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>{pillar.roman}</h3>
                          <ul className="mt-1.5 border-t border-white/[0.02] pt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            {pillar.points.map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-zinc-400 leading-relaxed">
                                <span className="text-[#e6c84c] font-black shrink-0">｜</span><span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Portrait src="/images/Eric-Chuang-19.png" alt="莊鈞翔博士" />
                </div>
              )}

              {/* ═══ SLIDE 5: 治理委託 ═══ */}
              {currentSlide === 5 && (
                <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                  <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                    <SectionLabel en="INITIATE COREGULATION" zh="治理委託" />
                    <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(22px, 3vw, 46px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>實踐您的思想主權</h2>
                    <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE</p>
                    <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(11px, 1vw, 15px)' }}>
                      <p className="text-zinc-300 italic leading-relaxed">「我們絕不推銷任何廉價的建議，我們僅為真正珍視基業與秩序的領袖，建立無懈可擊的法商防火牆。」</p>
                    </div>
                    <p className="text-zinc-400 font-light leading-relaxed flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                      如果您需要為企業董事會注入實質的決策秩序、妥善保護個人智慧財產或營業秘密，或是進行系統化的家族接班人資產規劃，誠摯邀請您與莊鈞翔博士專屬智庫辦公室展開對話。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0" style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                      <a href="https://lin.ee/yJrCTeo" target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black rounded-xl flex flex-col items-start gap-1 hover:brightness-110 transition-all no-underline"
                        style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                        <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-black" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>治理委託 ENGAGEMENT</span></div>
                        <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>👉 點擊一鍵開啟 LINE 私人委託諮詢</span>
                      </a>
                      <a href="mailto:pc5888@gmail.com"
                        className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 rounded-xl flex flex-col items-start gap-1 transition-all no-underline"
                        style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#e6c84c]" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>聯絡智庫 CONNECT</span></div>
                        <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>✉️ 寫信至專屬辦公室秘書 pc5888@gmail.com</span>
                      </a>
                    </div>
                    <button type="button" onClick={() => selectSlide(0)}
                      className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2 rounded-full flex items-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer outline-none self-start"
                      style={{ fontSize: '10px' }}>
                      <span className="px-2">▲ 回到第一頁 START OVER</span>
                    </button>
                  </div>
                  <Portrait src="/images/Eric-Chuang-20.png" alt="莊鈞翔博士" />
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.02] bg-[#000] flex-shrink-0" style={{ padding: '10px 0' }}>
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-mono text-zinc-500" style={{ fontSize: '10px' }}>
          <p>© {new Date().getFullYear()} STT Press 策略智庫數位出版 · 莊鈞翔 博士 (Founder: Eric Chuang, Ph.D.) ∥ ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4"><span>TRUST FOUNDATION</span><span>·</span><span>INSTITUTIONAL LOGIC</span></div>
        </div>
      </footer>
    </div>
  );
}
