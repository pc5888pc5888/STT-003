import { motion } from "motion/react";
import { Clock, Brain, FastForward, Target, Map, Download, Landmark, Scroll, Layers, Award, Info, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InternalCompliance({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const recommenders = [
    "許茂新 | 國家科學及技術委員會中部科學園區管理局 局長",
    "楊世和 | 大智澈見管理顧問公司 執行顧問 / 台灣麥當勞前營運 副總裁",
    "郭于誠 | 中國醫藥大學新竹附設醫院放射腫瘤科 主任",
    "張昭焚 | 前國碩工業科技股份有限公司董事長 / 前鈺德科技股份有限公司董事長 / 嶺東科技大學客座教授暨諮詢顧問",
    "何瓊珍 | 松鶴二仙堂中醫診所 院長",
    "謝秉錡 | 謝秉錡律師事務所所長 主持律師",
    "林柏劭 | 欣成法律事務所所長 主持律師",
    "高毓謙 | 博理法律事務所 律師",
    "董峰如 | 社團法人中華勞資法務顧問協會 創辦人 / 金豐集團 總經理",
    "黃朝福 | 朝陽會計師事務所所長 會計師",
    "陳富強 | 富築天相建築師事務所所長 主持建築師",
    "劉自強 | 台中嶺東科技大學會計資訊系 專任副教授",
    "陳文亮 | 中華民國室內裝修專業技術人員學會第七屆理事長 / 逢甲大學建築專業學院兼任助理教授",
    "許鎦響 | 嶺東科技大學商管學院企業管理系 副教授",
    "鄭安席 | 社團法人中華海洋遊艇協會理事長 / 恆忻遊艇股份有限公司董事長",
    "張政隆 | 欣居建設開發有限公司總經理 / 大雅區調解委員會委員",
    "江承燁 | 東遊有限公司共同創辦人"
  ];

  const gates = [
    { title: "時間之門", en: "Gate of Time", desc: "承諾與審計", icon: <Clock /> },
    { title: "心智之門", en: "Gate of Mind", desc: "信念與立法", icon: <Brain /> },
    { title: "行動之門", en: "Gate of Action", desc: "決策與執行", icon: <FastForward /> },
    { title: "專注之門", en: "Gate of Focus", desc: "司法與外交", icon: <Target /> },
    { title: "界線之門", en: "Gate of Boundaries", desc: "審查與擴張", icon: <Map /> },
    { title: "進化之門", en: "Gate of Evolution", desc: "資源與校準", icon: <Landmark /> },
  ];

  const corePrinciples = [
    {
      chapter: "第壹篇章：承諾與時間的法律審計",
      principles: [
        { id: "01", name: "Sunk Cost", text: "將遺憾視為「沉沒成本」——後悔是已破產的資產。" },
        { id: "03", name: "Breach of Contract", text: "將拖延視為「惡意違約」——這是對自我主權的藐視。" }
      ]
    },
    {
      chapter: "第參篇章：心態與信念的立法原則",
      principles: [
        { id: "13", name: "Unconstitutional", text: "將受害者心態視為「違憲思想」——君王不應在自己的宮殿流亡。" },
        { id: "14", name: "Injunction", text: "將不可能視為「暫時性禁令」——這只是過往經驗的參考判例，而非終局判決。" }
      ]
    },
    {
      chapter: "第肆篇章：決策與行動的權力分立",
      principles: [
        { id: "19", name: "Filibustering", text: "將完美主義視為「惡意阻撓議事」——為了追求虛幻的完美而癱瘓議程。" },
        { id: "24", name: "Enforcement", text: "將行動視為「唯一執法單位」——未經執行的法律，只是廢紙。" }
      ]
    },
    {
      chapter: "第伍篇章：關係與界線的司法審查",
      principles: [
        { id: "26", name: "Invalid Testimony", text: "將他人評價視為「無傳票的證詞」——在本庭不具備法律效力。" },
        { id: "29", name: "Foreign Laws", text: "將比較視為「適用外國法律」——你的王國有獨立的憲法。" }
      ]
    },
    {
      chapter: "第陸篇章：策略執行的內在驅動力與迭代",
      principles: [
        { id: "34", name: "Grand Justices", text: "將複盤視為「大法官會議」——不是刑事審判，而是憲法修正。" },
        { id: "35", name: "Expansion", text: "將成長視為「領土的合法擴張」——從已知向未知的主權延伸。" }
      ]
    },
    {
      chapter: "第貳拾篇章：神聖的校準",
      principles: [
        { id: "20", name: "Constitutional Violation", text: "將多重目標視為「多頭馬車違憲」——能量向量互相抵消，導致王國靜止。" },
        { id: "22", name: "Interference", text: "將資訊過載視為「惡意干擾司法」——拒絕雜訊，只接受核心證據。" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden selection:bg-gold-400 selection:text-black">
      {/* Hero Header */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          {/* Subtle star/dust background effect */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-px h-px bg-gold-400 rounded-full"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px rgba(212,175,55,0.8)'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          {onNavigate && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onNavigate('books')}
              className="mb-8 bg-zinc-900/80 hover:bg-zinc-800 text-gold-400 hover:text-gold-300 border border-gold-400/20 hover:border-gold-400/50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-sans text-xs tracking-wider uppercase cursor-pointer bg-transparent"
            >
              ← 返回治理出版 (Back to Publications)
            </motion.button>
          )}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 space-y-12 text-left"
            >
              {/* Top Label */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-[1px] bg-gold-400" />
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gold-400" />
                  <span className="text-gold-400/80 text-sm md:text-base tracking-[0.4em] font-sans font-medium uppercase whitespace-nowrap">
                    治理視角共鳴 | RESONANCE
                  </span>
                </div>
              </div>

            <div className="flex flex-col items-start gap-4 px-2">
              <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl font-display font-black text-gold-400 tracking-tighter leading-none whitespace-nowrap">
                內在法遵
              </h2>
              <h3 className="text-lg xs:text-xl sm:text-3xl md:text-5xl font-sans font-light text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap">
                INTERNAL COMPLIANCE
              </h3>
              <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
                <p className="text-[10px] xs:text-xs sm:text-2xl md:text-4xl font-display font-light text-gold-400 leading-relaxed italic whitespace-nowrap">
                  《 為你的內心，打造一座不可侵犯的至聖所 》
                </p>
                <p className="text-stone-500/60 text-[10px] xs:text-xs sm:text-2xl md:text-3xl font-display font-light tracking-[0.2em] sm:tracking-[0.4em] uppercase whitespace-nowrap">
                  【 數位閱讀完整版 】
                </p>
              </div>
            </div>

              {/* Description */}
              <p className="text-xl md:text-2xl font-display font-light text-gold-200/50 leading-relaxed max-w-2xl text-justify">
                本書所呈現之內在治理觀點，來自不同專業領域的實務觀察與長期經驗，以下各界決策領袖對本書理念提供其理解與共鳴。
              </p>

              {/* Desktop CTA Placeholder area (matching the image layout footer) */}
              <div className="hidden lg:flex items-center gap-12 pt-12">
                 <div className="border border-gold-400/20 bg-gold-400/[0.03] px-10 py-6">
                    <p className="text-xs text-gold-400/50 uppercase tracking-widest font-black mb-1">DIGITAL CANON EDITION</p>
                    <p className="text-3xl font-display font-light text-white">NT$ 349</p>
                 </div>
                 <a 
                    href="https://p.ecpay.com.tw/201592D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-shimmer h-24 px-16 flex items-center justify-center bg-gold-400 text-black text-2xl hover:bg-gold-200 transition-all font-black no-underline tracking-widest"
                  >
                    立即購買數位正式版
                  </a>
              </div>
            </motion.div>

            {/* Right Book Cover Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative group"
            >
              <div className="relative">
                {/* Glow behind book */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-gold-400/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-gold-400/20 transition-all duration-1000"></div>
                
                <img 
                  src="/images/paper_internal_compliance_002.png" 
                  alt="Internal Compliance Book Cover" 
                  className="w-full max-w-md mx-auto drop-shadow-[0_40px_80px_rgba(212,175,55,0.4)] transition-transform duration-1000 group-hover:scale-105 group-hover:-translate-y-4"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Badge Overlay */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-4 -right-4 md:bottom-0 md:right-0"
              >
                {/* Placeholder for the badge/curated emblem if needed */}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Preface Section */}
      <section id="preface" className="py-40 bg-gold-400/[0.02]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-16">
            <div className="flex flex-col items-center text-center space-y-6">
               <Scroll className="h-12 w-12 text-gold-400/30" />
               <h2 className="text-5xl font-display font-light text-gold-metallic">作者自序︱Preface</h2>
               <div className="space-y-2">
                 <h3 className="text-3xl font-display font-light text-gold-100">始於內省：策略之法遵基石</h3>
                 <p className="text-gold-400/60 text-sm tracking-widest font-sans uppercase">BY ERIC CHUANG PH.D.</p>
               </div>
            </div>

            <div className="space-y-10 font-display font-light text-xl text-gold-50/80 leading-[1.8] text-justify">
              <p className="first-letter:text-6xl first-letter:text-gold-metallic first-letter:float-left first-letter:mr-4 first-letter:font-display first-letter:font-light">
                身為一名企業策略顧問，我畢生的職志是為企業客戶擘劃藍圖，構築一座座足以抵禦 市場浪潮、堅不可摧的商業堡壘，在無數次的征戰中，我見證過無數組織憑藉精密的策 略，在波譎雲詭的競爭中屹立不搖。
              </p>
              <p>
                然而，我也曾沉痛地目睹許多看似無懈可擊的堡壘，其崩坍並非源於外敵的砲火，而是始於內部最微小的一道裂痕，那是一道「源自創始者或核心團隊內心」的深層裂縫。
              </p>
              <p className="ornate-frame p-8 bg-gold-400/5 border-gold-400/20 text-gold-metallic text-2xl text-center">
                「若一個領導者無法治理他內心的國度，又遑論治理真實的企業王國？ 若連對自己的 承諾都無法遵守，又如何要求團隊與市場信守盟約？」
              </p>
              <p>
                在法律與治理的領域中，存在一個反覆出現卻常被忽略的核心：真正導致失誤與崩壞的，往往不是制度本身，而是「人」。制度可以被設計，流程可以被監督，規範可以被張貼在牆上；但在決定興衰的關鍵時刻，做出抉擇的依舊是人，那個人是否擁有一套足以自我約束的「內在結構」，才是決定最終成敗的關鍵。
              </p>
              <p>
                「內在法遵」並非要將生硬的法律語言強加於個人生活，而是要探究一個根本命題：當外在規則失效、監督缺位、誘惑當前時，一個人究竟憑藉什麼做出正確的選擇？
              </p>
              <p>
                內在法遵 Internal Compliance《為你的內心，打造一座不可侵犯的至聖所》是一本關於界線、責任與後果的著作。它不關心「你想成為誰」，它只在乎：「當無人看見 時，你是否仍能信任自己？」
              </p>
              <p className="text-right pt-10 text-gold-400 font-sans not-font-light font-black text-sm uppercase tracking-widest">
                — 寫於一個決心從內心開始重建秩序的夜晚；
                Eric Chuang Ph.D.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Structure Section */}
      <section className="py-40 border-t border-gold-400/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <Layers className="h-16 w-16 text-gold-400/20" />
                <h2 className="text-5xl font-display font-light text-gold-metallic">全書治理結構總覽</h2>
                <p className="text-gold-200/40 text-xl font-display font-light uppercase tracking-widest">Governance Structure Overview</p>
              </div>
              <div className="space-y-8 font-display font-light text-lg text-gold-100/70">
                <div className="space-y-2 border-l-2 border-gold-400/30 pl-8">
                  <h4 className="text-gold-metallic text-2xl">第一層 內在法遵之本體定位層</h4>
                  <p>確立責任不可被轉移之原則。無論專業角色如何分工，只要後果無法由他人代為承擔，其責任即不可被制度所遮蔽。</p>
                </div>
                <div className="space-y-2 border-l-2 border-gold-400/30 pl-8">
                  <h4 className="text-gold-metallic text-2xl">第二層 治理審查與否決層</h4>
                  <p>先行阻止不可承擔的選擇。任務不在於優化方案，而在於辨識哪些行動即使形式合規，仍對人格造成不可逆之損害。</p>
                </div>
                <div className="space-y-2 border-l-2 border-gold-400/30 pl-8">
                  <h4 className="text-gold-metallic text-2xl">第三層 三十六位基路伯原則層</h4>
                  <p>最核心的治理語彙。三十六組反覆出現在治理失序案例中的結構性風險模式，引導決策者正視內在界線。</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gold-400/10 border border-gold-400/10">
              {gates.map((gate, i) => (
                <div key={i} className="bg-black p-8 flex flex-col justify-center items-center text-center space-y-4 hover:bg-gold-400/5 transition-all">
                  <div className="text-gold-400/50">{gate.icon}</div>
                  <h5 className="text-xl font-display font-light text-gold-200">{gate.title}</h5>
                  <p className="text-[10px] text-gold-400/30 uppercase tracking-widest">{gate.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Cards - New Added Section */}
      <section className="py-40 bg-black relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center mb-24 space-y-6 text-center">
            <Award className="h-12 w-12 text-gold-400/30" />
            <h2 className="text-5xl font-display font-light text-gold-metallic">基路伯核心原則精選</h2>
            <p className="text-gold-200/40 text-xl font-display font-light uppercase tracking-[0.4em]">Selected Cherubim Principles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {corePrinciples.map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-gold-400/10 bg-gold-400/[0.02] hover:bg-gold-400/[0.04] transition-all group"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-grow bg-gold-400/20" />
                  <h3 className="text-gold-400 font-display font-light text-xl tracking-widest">{chapter.chapter}</h3>
                  <div className="h-px flex-grow bg-gold-400/20" />
                </div>
                
                <div className="space-y-10">
                  {chapter.principles.map((p, pi) => (
                    <div key={pi} className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="text-gold-400/30 font-mono text-sm uppercase tracking-tighter">Principle {p.id}</span>
                         <span className="text-gold-400 text-lg font-display font-medium tracking-wide">({p.name})</span>
                      </div>
                      <p className="text-2xl font-display font-light text-gold-100 leading-relaxed border-l-2 border-gold-600/30 pl-6 group-hover:border-gold-400 transition-colors">
                        {p.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommenders Section */}
      <section className="py-40 bg-black border-t border-b border-gold-400/10 relative overflow-hidden">
        {/* Animated Background Gold Dust */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0 
              }}
              animate={{ 
                y: [null, "-20%"],
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center mb-24 text-center space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-gold-400" />
              <span className="text-gold-400/60 text-sm tracking-[0.3em] font-sans uppercase">各界決策領袖 共同推薦</span>
              <div className="w-8 h-[1px] bg-gold-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">治理視角共鳴︱Resonance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 text-left max-w-6xl mx-auto">
            {recommenders.map((name, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                className="py-4 border-b border-gold-400/5 font-display font-light text-gold-100/60 hover:text-gold-400 transition-colors"
              >
                <div className="flex gap-4 items-start">
                   <ChevronRight className="h-4 w-4 mt-1 text-gold-400/30 shrink-0" />
                   <p className="text-lg leading-relaxed">{name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Profile */}
      <section className="py-40 border-t border-gold-400/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative flex justify-center lg:justify-start items-end h-[600px] overflow-visible">
              <div className="relative h-full aspect-[3/4] flex items-end justify-center lg:justify-start">
                  {/* Cinematic Light Beam */}
                  <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-600/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

                  <img 
                    src="/images/portrait-006.png" 
                    alt="Dr. Eric Chuang" 
                    className="h-full w-auto object-contain object-bottom filter drop-shadow-[0_0_50px_rgba(212,175,55,0.1)] contrast-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Integration Scrim - Strengthened */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10"></div>

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
            </div>
            <div className="space-y-12">
               <div className="space-y-6">
                 <span className="micro-label">The Visionary</span>
                 <h2 className="text-4xl lg:text-5xl font-display font-light text-gold-metallic">關於作者：莊鈞翔 博士</h2>
                 <p className="text-gold-200/60 text-lg lg:text-xl font-display font-light">企業策略顧問 · 智庫出版家</p>
               </div>
               <p className="text-gold-50/60 text-lg font-display font-light leading-relaxed text-justify">
                 莊博士不僅是一位在學術領域取得傲人成績（GPA 4.3）的學者，更是一位長期穿梭於企業治理前線的實務家。他創立 STT Press 的初衷，是為了將卓越的策略思維數位正典化，讓每一位追求卓越的領導人，都能擁有一套可供即時查閱、精確判讀的內在秩序。
               </p>
               <div className="flex gap-4">
                 <div className="p-6 border border-gold-400/10 bg-gold-400/[0.02]">
                    <p className="text-gold-400/50 text-[10px] uppercase tracking-widest mb-2">Academic</p>
                    <p className="text-gold-100 font-display font-light">逢甲大學商學博士</p>
                 </div>
                 <div className="p-6 border border-gold-400/10 bg-gold-400/[0.02]">
                    <p className="text-gold-400/50 text-[10px] uppercase tracking-widest mb-2">Leadership</p>
                    <p className="text-gold-100 font-display font-light">GCSDA 創會理事長</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Information Table */}
      <section className="py-40 pb-60">
        <div className="container mx-auto px-6 max-w-5xl space-y-20">
          <div className="flex items-center gap-6 justify-center">
            <Info className="h-10 w-10 text-gold-400/40" />
            <h2 className="text-4xl font-display font-light text-gold-metallic">版權與發行資料</h2>
          </div>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 border-y border-gold-400/10 py-16">
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">書名 Title</h5>
                 <p className="text-xl font-display font-light text-gold-100">內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》</p>
               </div>
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">作者 Author</h5>
                 <p className="text-xl font-display font-light text-gold-100">莊鈞翔 博士 Eric Chuang, Ph.D.</p>
               </div>
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">出版地 Origin</h5>
                 <p className="text-xl font-display font-light text-gold-100">臺 灣 Taiwan</p>
               </div>
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">出版者 Publisher</h5>
                 <p className="text-xl font-display font-light text-gold-100">© 2026 策略智庫數位出版 (STT Press)</p>
               </div>
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">ISBN (EPUB)</h5>
                 <p className="text-xl font-display font-light text-gold-100">978-626-447-054-4</p>
               </div>
               <div className="space-y-2">
                 <h5 className="text-gold-400 text-[10px] font-black tracking-widest uppercase">ISBN (PDF)</h5>
                 <p className="text-xl font-display font-light text-gold-100">978-626-447-055-1</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-display font-light text-lg leading-relaxed">
               <div className="space-y-6">
                 <h4 className="text-gold-400 text-sm font-black tracking-[0.3em] uppercase border-b border-gold-400/20 pb-2 w-fit">著作權聲明</h4>
                 <p className="text-gold-200/60">
                   本書內容屬於《中華民國著作權法》所保護之語文著作，作者依法享有完整之著作權；未經書面同意，不得以任何形式重製、傳輸或引用部分內容。違反者將依法追究責任。
                 </p>
               </div>
               <div className="space-y-6">
                 <h4 className="text-gold-400 text-sm font-black tracking-[0.3em] uppercase border-b border-gold-400/20 pb-2 w-fit">法律依據與聲明</h4>
                 <p className="text-gold-200/60 text-sm">
                   本書觀點屬作者學術研究與思想創作之表達，不構成任何形式之具體法律意見、訴訟代理或個案建議。本書亦為 Eric 策略智庫 AI 理論來源文本之一。
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-8 flex justify-center pointer-events-none"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-gold-400/30 p-4 flex items-center gap-8 pointer-events-auto">
           <div className="hidden lg:block px-6">
             <p className="text-xs text-gold-400 uppercase tracking-widest font-black">Digital Canon Edition</p>
             <p className="text-lg font-display font-light text-white">NT$ 349</p>
           </div>
           <a 
             href="https://p.ecpay.com.tw/201592D"
             target="_blank"
             rel="noopener noreferrer"
             className="gold-shimmer px-12 h-14 flex items-center justify-center bg-gold-400 text-black font-black uppercase tracking-widest text-lg no-underline"
           >
             立即購買數位正式版
           </a>
        </div>
      </motion.div>
    </div>
  );
}
