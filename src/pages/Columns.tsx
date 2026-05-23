import { useState, useEffect, useMemo, useRef, FC } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { articles, categories, Article } from "../data/mockData";
import { ArrowRight, Search, RefreshCcw, Filter, List, Sparkles, Tag } from "lucide-react";

import { ContributorLabel } from "../components/ContributorLabel";

const ArticleCard: FC<{ article: Article, index: number }> = ({ article, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const categoryStyles: Record<string, string> = {
    "治理": "border-blue-500/30 text-blue-400 bg-blue-500/5",
    "策略": "border-gold-500/30 text-gold-400 bg-gold-500/5",
    "ESG": "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    "風險": "border-red-500/30 text-red-400 bg-red-500/5",
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="group cursor-pointer border-b border-gold-900/10 pb-12 last:border-0 hover:bg-gold-400/[0.01] -mx-4 px-4 transition-all rounded-lg"
      onClick={() => article.url && window.open(article.url, '_blank')}
    >
      <div className="space-y-4 py-4 max-w-4xl">
        <div className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase">
          <span className={`px-3 py-1 border rounded-full transition-colors ${categoryStyles[article.category] || "border-gold-600/30 text-gold-600"}`}>
            {article.category}
          </span>
          <span className="opacity-40 text-stone-500">{article.date}</span>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-gold-500">
             <Sparkles size={10} />
             <span className="text-[8px]">DIGITAL CANON</span>
          </div>
        </div>
        <h3 className="text-2xl lg:text-3xl font-display font-light text-stone-200 group-hover:text-gold-400 transition-colors leading-tight">
          {article.title}
        </h3>
        <p className="text-stone-400 font-sans font-light leading-relaxed line-clamp-2 text-sm">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-gold-600 font-sans text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-gold-200 transition-colors pt-2">
           深入解析 <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Columns() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial and manual shuffle logic
  const shuffleAndFilter = () => {
    setIsRefreshing(true);
    
    // 1. Filter by category and search
    let filtered = articles.filter(art => {
      const matchesCategory = !selectedCategory || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 2. Shuffle the filtered pool
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    
    // 3. Take 12 (or whatever is available)
    setTimeout(() => {
      setDisplayArticles(shuffled.slice(0, 12));
      setIsRefreshing(false);
    }, 600); // Cinematic delay
  };

  // Trigger shuffle on category/search change or mount
  useEffect(() => {
    shuffleAndFilter();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-gold-400/30 selection:text-white">
      {/* Dark Prestige Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 lg:py-0 lg:h-[80vh] flex items-center border-b border-gold-900/30">
        {/* Background Visual Tension */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-900/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`, backgroundSize: '80px 80px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative z-10 h-full">
          {/* Left: Elite Column Identity - Image Replacement */}
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="h-[2px] w-16 bg-gold-600"></span>
                <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.6em]">最新法律專欄：莊博士策略判讀</span>
              </div>
              
              <div className="relative pt-4 max-w-[600px] mx-auto lg:mx-0">
                <img 
                  src="/images/stt-word-001.png?v=20260522" 
                  alt="STT Press Law Strategic Review" 
                  className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="space-y-10 max-w-2xl"
            >
              <p className="text-stone-500 text-lg font-sans leading-relaxed">
                將卓越的策略思維數位正典化，為您的商業決策提供具有廣度與深度的專業判讀。這不是故事，這是權力的邏輯。
              </p>
              
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
                <div className="flex flex-col border-l border-gold-900/50 pl-6">
                  <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Frequency</span>
                  <span className="text-sm font-medium text-stone-300 tracking-wider">Weekly Intelligence</span>
                </div>
                <div className="flex flex-col border-l border-gold-900/50 pl-6">
                  <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Focus</span>
                  <span className="text-sm font-medium text-stone-300 tracking-wider">Governance & Strategy</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: The Portrait - Integrated Cinematic Style */}
          <div className="lg:col-span-5 h-full relative flex items-end justify-center lg:justify-end overflow-visible">
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full flex items-end justify-center lg:justify-end"
            >
              {/* Cinematic Light Beam */}
              <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-tr from-gold-600/10 via-transparent to-transparent -rotate-12 pointer-events-none"></div>

              <div className="relative h-full w-full max-w-[500px] lg:max-w-none flex items-end justify-end">
                <img 
                  src="/images/Eric-Chuang-05.png" 
                  alt="Dr. Eric Chuang" 
                  className="w-full h-auto max-h-[75vh] lg:max-h-[90vh] object-contain object-bottom filter drop-shadow-[0_0_50px_rgba(212,175,55,0.1)] contrast-[1.1]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Integration Scrim - Strengthened */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10"></div>
                
                {/* Standardized Contributor Label */}
                <ContributorLabel 
                  title="Main Contributor" 
                  className="absolute bottom-24 right-6" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Category Selection Hub / Table of Contents */}
      <section className="bg-zinc-950/50 border-b border-gold-900/10 backdrop-blur-sm sticky top-24 z-30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 h-20 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => window.location.hash = 'article-index'}
              className="flex-shrink-0 flex items-center gap-3 px-6 h-10 rounded-full bg-white/10 text-white border border-white/20 hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all text-xs font-black tracking-widest uppercase shadow-lg group"
            >
              <List className="w-3 h-3 group-hover:scale-110 transition-transform" /> 專欄精選索引目錄
            </button>
            <div className="h-4 w-px bg-gold-900/30 flex-shrink-0"></div>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 flex items-center gap-3 px-6 h-10 rounded-full transition-all text-xs font-black tracking-widest uppercase border ${
                selectedCategory === null 
                ? "bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(230,200,76,0.2)]" 
                : "text-stone-500 border-white/5 hover:border-gold-500/20 hover:text-gold-200"
              }`}
            >
              <List className="w-3 h-3" /> 全部判讀
            </button>
            <div className="h-4 w-px bg-gold-900/30 flex-shrink-0"></div>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-6 h-10 rounded-full transition-all text-xs font-black tracking-widest uppercase border whitespace-nowrap ${
                  selectedCategory === cat 
                  ? "bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(230,200,76,0.2)]" 
                  : "text-stone-500 border-white/5 hover:border-gold-500/20 hover:text-gold-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Main Content: Intelligence Feed */}
          <div className="flex-grow space-y-24">
            <div className="flex items-center justify-between gap-6 mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <h2 className="text-xl sm:text-2xl font-display font-light text-white uppercase tracking-widest whitespace-nowrap">
                  {selectedCategory || "即時判讀"}
                </h2>
                <div className="flex items-center gap-3 text-gold-600/40 text-[9px] sm:text-[10px] font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-pulse"></span>
                  Live Feed
                </div>
              </div>
              
              <button 
                onClick={shuffleAndFilter}
                disabled={isRefreshing}
                className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-gold-400 hover:bg-gold-400/10 transition-all font-display text-[10px] tracking-widest uppercase group disabled:opacity-50"
              >
                <RefreshCcw className={`w-3 h-3 group-hover:rotate-180 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                換一批隨機判讀
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={displayArticles.map(a => a.id).join('')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                {displayArticles.length > 0 ? (
                  displayArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))
                ) : (
                  <div className="py-20 text-center space-y-6">
                    <p className="text-stone-500 font-display text-xl">目前該分類下無符合條件的判讀內容</p>
                    <button 
                      onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                      className="text-gold-500 underline text-sm tracking-widest uppercase hover:text-gold-200"
                    >
                      重置搜索
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar: Control Center */}
          <aside className="lg:w-80 space-y-24">
            <div className="space-y-8">
              <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest block border-b border-gold-900/30 pb-4">精準檢索 Query</span>
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-600/40 group-focus-within:text-gold-400 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋關鍵判讀內容..." 
                  className="w-full pl-8 pr-4 py-3 rounded-none bg-transparent border-b border-gold-900/20 focus:border-gold-600 focus:outline-none transition-all placeholder:text-stone-700 text-stone-300 font-sans text-sm"
                />
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest block border-b border-gold-900/30 pb-4">權力範疇 Domains</span>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`group flex justify-between items-center py-3 px-4 rounded transition-all text-left ${
                      selectedCategory === cat ? 'bg-gold-500/10 border-l-2 border-gold-500' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className={`text-sm font-display font-light transition-colors ${
                      selectedCategory === cat ? 'text-gold-400' : 'text-stone-500 group-hover:text-gold-200'
                    }`}>
                      {cat}
                    </span>
                    <ArrowRight className={`w-3 h-3 text-gold-600 transition-all ${
                      selectedCategory === cat ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-stone-900 to-black p-8 border border-gold-900/20 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-light text-gold-400">訂閱判讀報告</h3>
                <p className="text-sm text-stone-500 font-sans leading-relaxed">我們將不定期發送深度策略分析報告，這是一份專為高階經理人準備的法律洞察。</p>
              </div>
              <div className="space-y-6">
                <input 
                  type="email" 
                  placeholder="Official Email Address" 
                  className="w-full bg-stone-900/50 border border-gold-900/20 px-4 py-3 text-white placeholder:text-stone-700 focus:border-gold-600 focus:outline-none transition-all text-sm rounded"
                />
                <button className="w-full bg-gold-600 hover:bg-gold-500 text-black font-sans font-bold text-xs uppercase tracking-widest py-4 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  確 認 訂 閱
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
