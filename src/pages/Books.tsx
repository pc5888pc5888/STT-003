import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { books } from "../data/mockData";
import { X, Eye, Landmark } from "lucide-react";
import { ContributorLabel } from "../components/ContributorLabel";

const recommenders = [
  { name: "許茂新", title: "國家科學及技術委員會中部科學園區管理局 局長" },
  { name: "楊世和", title: "大智澈見管理顧問公司 執行顧問 / 台灣麥當勞前營運 副總裁" },
  { name: "郭于誠", title: "中國醫藥大學新竹附設醫院放射腫瘤科 主任" },
  { name: "張昭焚", title: "前國碩工業科技股份有限公司董事長 / 前鈺德科技股份有限公司董事長 / 嶺東科技大學客座教授暨諮詢顧問" },
  { name: "何瓊珍", title: "松鶴二仙堂中醫診所 院長" },
  { name: "謝秉錡", title: "謝秉錡律師事務所所長 主持律師" },
  { name: "林柏劭", title: "欣成法律事務所所長 主持律師" },
  { name: "高毓謙", title: "博理法律事務所 律師" },
  { name: "董峰如", title: "社團法人中華勞資法務顧問協會 創辦人 / 金豐集團 總經理" },
  { name: "黃朝福", title: "朝陽會計師事務所所長 會計師" },
  { name: "陳富強", title: "富築天相建築師事務所所長 主持建築師" },
  { name: "劉自強", title: "台中嶺東科技大學會計資訊系 專任副教授" },
  { name: "陳文亮", title: "中華民國室內裝修專業技術人員學會第七屆理事長 / 逢甲大學建築專業學院兼任助理教授" },
  { name: "許鎦響", title: "嶺東科技大學商管學院企業管理系 副教授" },
  { name: "鄭安席", title: "社團法人中華海洋遊艇協會理事長 / 恆忻遊艇股份有限公司董事長" },
  { name: "張政隆", title: "欣居建設開發有限公司總經理 / 大雅區調解委員會委員" },
  { name: "江承燁", title: "東遊有限公司共同創辦人" }
];

export default function Books({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    if (bookId === "b1") {
      onNavigate("internal-compliance");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-gold-400/30 selection:text-white">
      {/* Header - Editorial Canon Presentation (Revised for Columns-Style Beauty) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-gold-900/20">
        {/* Background Visual Tension */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-900/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`, backgroundSize: '80px 80px' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">
            
            {/* Left Block: Theme Text (Filling the "Green Box" area) */}
            <div className="lg:col-span-7 z-20 space-y-12 text-center lg:text-left py-12 lg:py-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="h-[2px] w-16 bg-gold-600"></span>
                  <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.6em]">Digital Publishing Hub</span>
                </div>
                
                <div className="relative pt-4 max-w-[600px] mx-auto lg:mx-0">
                  <img 
                    src="/images/STT-Press-Digital-Header.png" 
                    alt="STT Press 2026年度戰略鉅獻" 
                    className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-10 max-w-2xl mx-auto lg:mx-0"
              >
                <p className="text-stone-400 text-xl md:text-2xl font-serif leading-relaxed font-light">
                  「這不是一本書，這是一套權力治理的數位正典。」
                </p>
                <p className="text-stone-500 text-lg font-sans leading-relaxed">
                  《內在法遵》不再只是出版品，它是一套治理系統，是一套決策門控邏輯。
                  隨著 Eric 策略智庫 AI 的啟動，我們正式進入「數位正典治理」時代。
                </p>
                
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
                  <div className="flex flex-col border-l border-gold-900/50 pl-6">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Edition</span>
                    <span className="text-sm font-medium text-stone-300 tracking-wider">Foundational Canon</span>
                  </div>
                  <div className="flex flex-col border-l border-gold-900/50 pl-6">
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">System</span>
                    <span className="text-sm font-medium text-stone-300 tracking-wider">Governance Gating</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Block: The Portrait (Filling the "Blue Box" area - Integrated Cinematic) */}
            <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end h-full">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full flex items-end justify-center lg:justify-end"
              >
                {/* Cinematic Backglow */}
                <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-900/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>
                
                <div className="relative h-full w-full flex items-end justify-end">
                  <img 
                    src="/images/Eric-Chuang-06.png" 
                    alt="Dr. Eric Chuang" 
                    className="h-auto max-h-[75vh] lg:max-h-[90vh] w-full object-contain object-bottom filter drop-shadow-[0_0_80px_rgba(212,175,55,0.15)] contrast-[1.1] brightness-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Integration Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/95 to-transparent z-10 pointer-events-none"></div>

                  {/* Standardized Contributor Label - Fixed Positioning to avoid clipping */}
                  <div className="absolute bottom-24 right-12 lg:right-16 z-20 transform scale-110 origin-right">
                    <ContributorLabel 
                      title="Author & Visionary" 
                      name="莊鈞翔 博士"
                      className="shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                    />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-40 space-y-40">
        {/* Recommendation Section - Resonance from a governance perspective */}
        <section className="space-y-16">
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="h-[1px] w-12 bg-gold-600"></span>
              <span className="micro-label text-gold-500 tracking-[0.5em]">∎ 治理視角共鳴︱Resonance</span>
            </div>
            <div className="space-y-6 px-4">
              {books[0].id === 'b1' ? (
                <div className="space-y-4">
                  <h2 className="text-3xl xs:text-4xl sm:text-7xl font-display font-light text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    內在法遵
                  </h2>
                  <h3 className="text-xl xs:text-2xl sm:text-5xl font-sans font-light text-white/50 tracking-wide uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                    Internal Compliance
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-3xl text-gold-400 font-display font-light italic whitespace-nowrap">
                    《 為你的內心，打造一座不可侵犯的至聖所 》
                  </p>
                </div>
              ) : (
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-white leading-tight">
                   <span className="inline-block">{books[0].title}</span>
                </h2>
              )}
            </div>
            <div className="h-[2px] w-24 bg-gold-400/40 my-8 mx-auto lg:mx-0"></div>
            <p className="text-stone-400 text-xl font-serif max-w-4xl font-light leading-relaxed mx-auto lg:mx-0">
              本書所呈現之內在治理觀點，來自不同專業領域的實務觀察與長期經驗，以下人士基於各自的專業背景，對本書所探討之責任、界線、決策與長期秩序之理念，提供其理解與共鳴。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16 border-t border-gold-400/10 pt-16">
            {recommenders.map((person, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group border-b border-white/5 pb-8 hover:border-gold-400/30 transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-[2px] bg-gold-600 group-hover:h-10 transition-all duration-500"></span>
                    <h4 className="text-2xl font-display font-light text-white group-hover:text-gold-metallic transition-colors">
                      {person.name}
                    </h4>
                  </div>
                  <p className="text-stone-500 text-sm font-sans tracking-wide leading-relaxed pl-4 group-hover:text-stone-300 transition-colors">
                    {person.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Book Grid - Premium Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 pt-12">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group"
            >
              <div className="space-y-12 group">
                <div 
                  className="ornate-frame p-4 bg-gold-400/[0.02] group-hover:bg-gold-400/[0.08] transition-all duration-700 shadow-2xl shadow-gold-400/5 hover:shadow-gold-400/10 cursor-pointer"
                  onClick={() => handleBookClick(book.id)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black rounded-lg">
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="h-[95%] w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}/800/1200`;
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px] gap-4">
                      {book.id === "b1" && (
                        <button 
                          className="prestige-button bg-gold-400 text-black border border-gold-400/30 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate("internal-compliance");
                          }}
                        >
                          <Landmark className="inline-block mr-3 h-5 w-5" /> 走入至聖所
                        </button>
                      )}
                      {book.previewUrl && (
                        <button 
                          className="prestige-button bg-black text-gold-400 border border-gold-400/30 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(book.previewUrl!);
                          }}
                        >
                          <Eye className="inline-block mr-3 h-5 w-5" /> 立即試閱
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8 px-4 text-center">
                  <div className="space-y-4">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="micro-label text-gold-400/40"
                    >
                      {book.publisher}
                    </motion.span>
                    <h3 
                      className="text-4xl font-display font-light text-[#F8F7F4] group-hover:text-gold-metallic transition-colors leading-tight cursor-pointer"
                      onClick={() => handleBookClick(book.id)}
                    >
                      {book.title}
                    </h3>
                  </div>
                  
                  <p className="text-gold-200/40 font-display leading-relaxed font-light line-clamp-2 text-xl">
                    {book.description}
                  </p>

                  <div className="pt-8 flex flex-col items-center gap-8">
                    {book.price === 0 ? (
                      <span className="text-3xl font-display text-gold-500 font-bold">限時0元</span>
                    ) : (
                      <span className="text-3xl font-display text-gold-metallic font-bold">
                        NT$ {book.price}
                      </span>
                    )}
                    <div className="flex flex-col w-full gap-4">
                      {book.id === "b1" ? (
                        <>
                          <button 
                            className="prestige-button w-full border border-gold-400/40 bg-gold-400/5 py-4 font-black uppercase text-[10px] tracking-widest"
                            onClick={() => onNavigate("internal-compliance")}
                          >
                            深入了解
                          </button>
                          <div className="grid grid-cols-2 gap-4">
                            <a 
                              href={book.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="prestige-button border border-gold-400/20 text-white/80 hover:border-gold-400 py-4 flex items-center justify-center no-underline font-black uppercase text-[10px] tracking-widest"
                            >
                              試閱
                            </a>
                            <a 
                              href="https://p.ecpay.com.tw/201592D"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="prestige-button bg-gold-400 text-black py-4 flex items-center justify-center no-underline font-black uppercase text-[10px] tracking-widest"
                            >
                              立即購買
                            </a>
                          </div>
                        </>
                      ) : (
                        <button 
                          className="prestige-button w-full border border-gold-400/20"
                          onClick={() => {
                            if (book.price > 0) {
                              alert("此書籍目前僅供預購，最新資訊將同步於電子報。");
                            } else if (book.previewUrl) {
                              setPreviewUrl(book.previewUrl);
                            }
                          }}
                        >
                          {book.price === 0 ? "立即閱讀" : "立即預購"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heyzine Preview Modal - Luxury Style */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center text-gold-400 border-b border-gold-400/10">
                <div className="flex flex-col">
                  <span className="micro-label">Digital Preview</span>
                  <h3 className="text-2xl font-display font-light text-gold-metallic">STT | Press 數位試閱</h3>
                </div>
                <button 
                  onClick={() => setPreviewUrl(null)} 
                  className="p-4 hover:bg-gold-400/10 transition-colors border border-gold-400/20"
                >
                  <X className="h-8 w-8 text-gold-400" />
                </button>
              </div>
              <div className="flex-grow p-4 md:p-12 relative">
                <iframe 
                  src={previewUrl} 
                  className="w-full h-full ornate-frame bg-white shadow-[0_0_100px_rgba(212,175,55,0.1)]"
                  title="Book Preview"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CRM / Newsletter Section - Prestige Presentation */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ornate-frame bg-gold-400/[0.03] p-16 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16"
        >
          <div className="space-y-8 text-center md:text-left max-w-2xl">
            <span className="micro-label">Preserve the Legacy</span>
            <h2 className="text-5xl font-display font-light text-gold-metallic">獲取專家最新著作</h2>
            <p className="text-gold-200/40 text-2xl font-display font-light leading-relaxed">
              留下您的 Email，我們將在有新書發布或智庫優惠活動時第一時間與您聯繫。
            </p>
          </div>
          <div className="flex flex-col w-full md:w-auto gap-8">
            <input 
              type="email" 
              placeholder="您的 Email" 
              className="w-full md:w-96 bg-transparent border-b border-gold-400/20 py-4 text-gold-200 placeholder:text-gold-400/20 focus:border-gold-400 focus:outline-none transition-all text-xl font-display font-light"
            />
            <button className="prestige-button">
              立即訂閱
            </button>
          </div>
        </motion.section>

        {/* Purchase Process & Integrity - Royal Protocol */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-24 border-t border-gold-400/10">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="micro-label">The Protocol</span>
              <h3 className="text-4xl font-display font-light text-[#F8F7F4]">購買流程說明</h3>
            </div>
            <ul className="space-y-8 text-gold-200/40 text-xl font-display font-light">
              {[
                "點擊「立即購買」跳轉至綠界 (ECPay) 支付系統",
                "填寫您的 Email 並完成扣款審核",
                "系統將自動發送數位書籍連結至您的電子信箱"
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-8">
                  <span className="text-gold-400 font-sans font-black text-xs pt-1">0{i+1}</span>
                  <span className="leading-relaxed border-b border-gold-400/5 pb-4 block flex-grow">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="micro-label">Security & Integrity</span>
              <h3 className="text-4xl font-display font-light text-[#F8F7F4]">誠信與安全保障</h3>
            </div>
            <p className="text-gold-200/40 text-xl font-display leading-relaxed font-light border-l border-gold-400/20 pl-12 py-2">
              STT Press 採用綠界金流系統，確保每一筆交易的透明與安全。本平台發行之所有電子書均經過嚴格的版權與內容審查，致力於為讀者提供最真確的數位正典閱讀體驗。
            </p>
            <div className="flex gap-6 flex-wrap pt-4">
              {["綠界特約商店", "資安加密保障", "內容權威認證"].map(badge => (
                <span key={badge} className="micro-label border border-gold-400/20 px-6 py-2 text-[10px]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
