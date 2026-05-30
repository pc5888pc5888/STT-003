import { useState } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  ShieldAlert, 
  FileText, 
  Infinity as InfinityIcon, 
  TrendingUp, 
  Compass, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Award, 
  Activity, 
  Zap, 
  BookOpen, 
  Maximize2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CorporateGovernance({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [boardIndependence, setBoardIndependence] = useState(50);
  const [riskOrientation, setRiskOrientation] = useState(50);
  const [generationVision, setGenerationVision] = useState(50);

  const modules = [
    {
      title: "策略治理",
      titleEn: "STRATEGIC GOVERNANCE",
      desc: "治理架構設計 · 董事會治理 · 決策機制",
      descEn: "Governance Framework · Board Governance · Decision Mechanisms",
      detailedDesc: "確立董事會獨立監督職能，設計透明的高階經理人決策架構，防止權力過度集中，建立長效防弊防火牆。",
      icon: <Shield className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "風險管理",
      titleEn: "RISK MANAGEMENT",
      desc: "風險評估 · 情境分析 · 防禦機制",
      descEn: "Risk Assessment · Scenario Analysis · Defense Mechanisms",
      detailedDesc: "前瞻性地識別產業、法律、地緣與市場風險，利用動態情境模擬建立韌性防禦機制，保障企業資產續航力。",
      icon: <ShieldAlert className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "制度建構",
      titleEn: "SYSTEMS & STRUCTURES",
      desc: "內控制度 · 治理規範 · 流程建構",
      descEn: "Internal Control · Governance Systems · Process Architecture",
      icon: <FileText className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "將合規程序內化至日常營運流程，拒絕教條式的規條，推動活性化的高效內部稽核與流程自動合規化。",
    },
    {
      title: "長期價值與永續文明",
      titleEn: "LONG-TERM VALUE & CIVILIZATION",
      desc: "定義永續 · 社會責任 · 世代價值",
      descEn: "Sustainability · Responsibility · Generational Value",
      icon: <InfinityIcon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "不為追求單季盈餘妥協核心誠信，為社會、環境與下一代儲備文化資本與文明價值，構築長青企業靈魂。",
    },
    {
      title: "競爭優勢強化",
      titleEn: "COMPETITIVE ADVANTAGE",
      desc: "策略整合 · 資源配置 · 執行優化",
      descEn: "Strategic Integration · Resource Allocation · Execution Optimization",
      icon: <TrendingUp className="w-6 h-6 text-gold-400" strokeWidth={1.5} />,
      detailedDesc: "將合規優勢轉化為制度性品牌溢價，降低國際市場對接壁壘，在策略棋局中取得高維度的談判優勢。",
    },
  ];

  // Logic for the interactive terminal simulation
  const calculateIntegrityIndex = () => {
    const balancedValue = 
      boardIndependence * 0.4 + 
      riskOrientation * 0.3 + 
      generationVision * 0.3;
    return Math.round(balancedValue);
  };

  const getStrategicReport = () => {
    const score = calculateIntegrityIndex();
    if (score < 40) {
      return {
        rating: "急需治理重整 DEGRADED RESILIENCE",
        color: "text-red-400",
        summary: "決策權力過於集聚且缺乏前瞻防禦。企業面臨高度內部控制黑洞與關鍵法律訴訟風險漏洞。",
        expertAdvice: "應優先引進獨立董事查核機制，建立董事會健康審議秩序，並縮減風險槓桿暴露度，保護公司長期根基。",
      };
    } else if (score < 75) {
      return {
        rating: "制度健全但成長略顯遲滯 STABLE BALANCED",
        color: "text-gold-400",
        summary: "企業擁有基本的法律防線與治理架構，但在策略判讀前瞻度與世代傳承布局上偏向保守。",
        expertAdvice: "建議在穩健合規的前提下，注入數位化合規（如ESGAI）決策門控，活化董事會戰略格局，釋放智慧紅利。",
      };
    } else {
      return {
        rating: "頂級治理與領袖主權 ULTRA PRESTIGE",
        color: "text-emerald-400",
        summary: "董事會獨立決策力極高、風險判讀與合規文化完美平衡，永續世代價值完全轉化為深厚的品牌信任壁壘。",
        expertAdvice: "您已具備跨世代長青企業的卓越姿態，建議進一步建立產業治理生態系，以思想領袖（Thought Leadership）輸出治理規範。",
      };
    }
  };

  const currentReport = getStrategicReport();
  const [activeTab, setActiveTab] = useState<'intro' | 'modules' | 'simulator' | 'academic'>('intro');

  return (
    <div id="corporate-governance-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Decorative Gold Laser Lines & Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gold-400/3 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Glass Workspace Header & Tabs Container */}
      <div className="container mx-auto px-6 pt-6 relative z-30 max-w-7xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-400/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-gold-400 to-transparent" />
          <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-bold font-mono">PORTAL OF STRATEGIC INSIGHT</span>
        </div>
        
        {/* Dynamic Glass Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950/90 border border-gold-400/20 rounded-xl backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('intro')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTab==='intro' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            系統引言
          </button>
          <button 
            onClick={() => setActiveTab('modules')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTab==='modules' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            五大核心模組
          </button>
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTab==='simulator' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            智慧效效模擬
          </button>
          <button 
            onClick={() => setActiveTab('academic')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTab==='academic' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            學術著作文獻
          </button>
        </div>
      </div>

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        
        {/* Ambient background chess */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none z-0 transition-opacity duration-1000"
          style={{ backgroundImage: "url('/images/bg-platform-chess.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-1" />

        <div className="w-full relative z-10">
          
          {/* TAB 1: INTRO */}
          {activeTab === 'intro' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-sans font-light tracking-tight text-white leading-tight">
                    企業治理與策略判讀
                  </h1>
                  <p className="text-gold-500/80 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                    CORPORATE GOVERNANCE & STRATEGIC INSIGHT
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

                <div className="space-y-3 max-w-xl text-stone-300 text-sm leading-relaxed font-light">
                  <p className="text-stone-100 font-normal">
                    最高度的商業博弈，本質上是制度架構的競逐。
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    莊鈞翔博士將法學邏輯導入企業策略中，重塑經營層的「法治」與「策略」基因。協助現代企業在大變局的棋盤上理清決策迷霧，設計嚴謹而富有活力的抗震體制。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => onNavigate?.('positioning')}
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer"
                  >
                    進入定位評估系統 <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('simulator')}
                    className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                  >
                    效能指標測評 <Compass className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: High-Prestige Theme Portrait with Signature (No books, no circular avatar, no awkward badges) */}
              <div className="lg:col-span-12 xl:col-span-5 flex justify-center xl:justify-end relative pb-6 lg:pb-0 h-[380px] sm:h-[460px] lg:h-[480px] xl:h-[520px] overflow-visible">
                <div className="relative w-full h-full flex items-end justify-center xl:justify-end overflow-visible">
                  {/* Subtle ambient backglow */}
                  <div className="absolute w-72 h-72 bg-[#e6c84c]/[0.04] rounded-full blur-[100px] pointer-events-none bottom-10 right-0 z-0" />
                  
                  {/* High Prestige Portrait Image */}
                  <img 
                    src="/images/Eric-Chuang-11.png" 
                    alt="莊鈞翔 博士" 
                    className="h-full w-auto object-contain object-bottom relative z-10 filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Cinematic Bottom Fade to blend portrait smoothly */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/45 to-transparent z-15 pointer-events-none" />
                  
                  {/* Signature Overlay at bottom right */}
                  <div className="absolute bottom-6 right-4 sm:right-8 md:right-12 lg:right-4 xl:right-6 z-20 pointer-events-none select-none">
                    <img 
                      src="/signature-eric001.png" 
                      alt="莊鈞翔 博士 簽名" 
                      className="w-32 sm:w-40 xl:w-44 h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] opacity-95 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MODULES */}
          {activeTab === 'modules' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h2 className="text-xl sm:text-2xl font-sans font-light text-white leading-tight">
                  策略判讀的五大核心模組
                </h2>
                <p className="text-stone-400 text-xs font-light">
                  將生硬的條文變革為最靈敏的領袖商業決策模型，保障企業資產續航力。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950/90 border border-gold-400/20 hover:border-gold-400/60 p-5 rounded-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-400/5 flex items-center justify-center border border-gold-400/20">
                        {mod.icon}
                      </div>
                      <div>
                        <h3 className="font-sans text-white text-sm font-bold tracking-wide">{mod.title}</h3>
                        <p className="text-[8px] font-mono text-gold-500 tracking-wider uppercase mt-0.5">{mod.titleEn}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/5">
                      <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                        {mod.detailedDesc}
                      </p>
                      <p className="text-[10px] text-stone-500 leading-relaxed italic border-l border-gold-400/20 pl-2">
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: SIMULATOR */}
          {activeTab === 'simulator' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left slider panel */}
              <div className="lg:col-span-5 space-y-4 text-left bg-zinc-950/80 p-5 sm:p-6 border border-gold-400/20 rounded-2xl">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 px-2.5 py-0.5 rounded-full uppercase font-bold">INTERACTIVE SIMULATION</span>
                  <h2 className="text-lg font-sans font-light text-white">
                    董事會治理 <span className="font-bold text-[#e6c84c]">效能指標模擬器</span>
                  </h2>
                </div>
                
                <p className="text-[11px] text-stone-400">
                  拖曳下方各項治理決策權重拉桿。系統將根據您的配置即時給予成熟度結論。
                </p>

                <div className="space-y-3.5 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-stone-350 select-none">董事長與總經理職權劃分量</span>
                      <span className="font-mono text-gold-400 font-bold">{boardIndependence} / 100</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={boardIndependence}
                      onChange={(e) => setBoardIndependence(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-stone-350 select-none">防弊防火牆與風險回饋</span>
                      <span className="font-mono text-gold-400 font-bold">{riskOrientation} / 100</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={riskOrientation}
                      onChange={(e) => setRiskOrientation(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-stone-350 select-none">永續及跨代文明策略定位</span>
                      <span className="font-mono text-gold-400 font-bold">{generationVision} / 100</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={generationVision}
                      onChange={(e) => setGenerationVision(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-gold-400 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right diagnostics panel */}
              <div className="lg:col-span-7">
                <div className="bg-zinc-950 border border-gold-400/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#e6c84c] animate-pulse" />
                      <h3 className="text-xs font-bold font-sans tracking-widest text-white uppercase">STT Strategic Matrix Console</h3>
                    </div>
                    
                    <div className="bg-black/80 px-2.5 py-1 border border-gold-400/20 rounded flex items-center gap-1.5">
                      <span className="text-stone-500 text-[8px] font-mono tracking-widest">INTEGRITY INDEX</span>
                      <span className="text-sm font-mono text-gold-400 font-bold">{calculateIntegrityIndex()}%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-mono text-stone-500 tracking-wider">DIAGNOSTIC STATUS</p>
                      <h4 className={`text-xs sm:text-sm tracking-wide font-bold uppercase ${currentReport.color}`}>
                        {currentReport.rating}
                      </h4>
                    </div>
                    
                    <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed bg-[#0a0a0a] p-3 border border-white/5 rounded-lg max-h-[100px] overflow-y-auto">
                      {currentReport.summary}
                    </p>
                    
                    <div className="border-t border-white/5 pt-3">
                      <p className="text-[8px] font-mono text-[#e6c84c] uppercase font-bold tracking-widest">DR. ERIC RECOMMENDATION</p>
                      <p className="text-xs text-stone-450 mt-1 leading-relaxed text-stone-400">
                        {currentReport.expertAdvice}
                      </p>
                    </div>

                    <a 
                      href="https://lin.ee/yJrCTeo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/25 text-[#e6c84c] text-[10px] font-sans font-bold tracking-[0.2em] py-2.5 uppercase rounded text-center block transition-all no-underline"
                    >
                      申請客製化深度診斷 <ChevronRight className="w-3 h-3 inline pb-0.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'academic' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl mx-auto space-y-6"
            >
              {/* Back Button to Papers Hall */}
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('papers')}
                  className="flex items-center gap-1.5 text-gold-450 hover:text-white transition-colors font-mono text-[10px] tracking-wider uppercase bg-transparent border-0 cursor-pointer outline-none"
                >
                  ← 返回學術策展大廳 (Back to Exhibition Hall)
                </button>
              )}

              {/* High-Prestige Academic Curation Card */}
              <div className="bg-zinc-950/90 border border-gold-400/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/[0.03] rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left Column: Cover and Action Buttons */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="aspect-[3/4] w-full max-w-[200px] mx-auto bg-stone-900 rounded-xl border border-gold-400/20 shadow-lg relative group overflow-hidden">
                      <img 
                        src="/images/paper_corporate_governance.png" 
                        alt="企業策略導入公司治理法遵精神 論文封面" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-2 pt-2">
                      <a 
                        href="https://heyzine.com/flip-book/dec98b2e5b.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#e6c84c]/10 hover:bg-[#e6c84c] hover:text-black border border-gold-400/25 text-[#e6c84c] text-[10px] font-sans font-bold tracking-[0.11em] py-2.5 uppercase rounded text-center block transition-all no-underline"
                      >
                        📖 線上翻頁電子書預覽
                      </a>
                      <a 
                        href="/papers/phd2.pdf"
                        download
                        className="w-full bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-200 text-[10px] font-sans font-bold tracking-[0.11em] py-2.5 uppercase rounded text-center block transition-all no-underline"
                      >
                        📥 下載論文 PDF 成果
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Title and Content */}
                  <div className="w-full md:w-2/3 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#e6c84c]/10 border border-[#e6c84c]/30 text-[#e6c84c] px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest font-bold">THEME II ∥ 博士學位研究著作</span>
                        <span className="text-stone-500 text-[9px] font-mono">文獻編號：PHD2</span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-serif text-stone-100 leading-tight">
                        企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例
                      </h3>
                      <p className="text-stone-400 text-[10.5px] font-mono leading-relaxed tracking-wide">
                        Introducing corporate governance in law compliance into business strategy: a case study of external legal advisory teams
                      </p>

                      <div className="text-[11px] text-stone-400 py-2 border-y border-white/5 font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div>
                            <strong className="text-stone-300">研究生 ∥ </strong> 莊鈞翔 博士
                          </div>
                          <div>
                            <strong className="text-stone-300">關鍵字 ∥ </strong> 企業策略、法律風險、公司治理、企業永續、預防法學
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 py-1 px-3 rounded-lg shrink-0 select-none self-start sm:self-center">
                          <div className="w-10 h-10 rounded-full border border-gold-400/30 overflow-hidden bg-stone-900 shadow animate-fade-in">
                            <img 
                              src="/images/Eric-Chuang-11.png" 
                              alt="莊鈞翔 博士" 
                              className="w-full h-full object-cover scale-110 object-top"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="text-left leading-tight">
                            <span className="block text-[8px] text-gold-400 font-mono tracking-wider">AUTHOR</span>
                            <span className="block text-xs font-serif font-semibold text-stone-200">莊鈞翔 博士</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1 text-[#F8F7F4]/90 font-serif text-[11.5px] leading-relaxed">
                        <strong className="text-gold-400 text-[10px] tracking-widest uppercase font-mono block">摘要 ∥ abstract</strong>
                        <p className="font-light text-stone-300">
                          本研究將公司治理法遵精神延伸運用於臺灣企業，企業負責人藉由外部專業法律團隊之協助，提供企業長期企業經營策略、降低企業法律風險、協助企業談判磋商等，同時給予企業內部控制管理評估、營運管理評量、企業經營佈局之策略建議，讓企業遵循各項法令制度，進而提升內部營運管理，讓企業負責人凡事做出正確無誤地決策，往永續經營目標邁進。
                        </p>
                        <p className="font-light text-stone-300">
                          透過全球疫情事件，以及近期的中美貿易大戰延續等事件持續發生下，深刻呈現企業未來所面臨的企業營運風險管理的困難度。因此，本研究強烈建議企業導入建置「企業策略預防法學」之主動思維，化合規程序為最高利潤防火牆與競爭溢價。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Prestige Sub-Footnote Block */}
      <div className="border-t border-gold-400/10 bg-[#050505] py-4 relative z-20 shrink-0">
        <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center sm:justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[10px] font-mono text-stone-500">
            © {new Date().getFullYear()} STT Press 策略智庫數位出版 · 莊鈞翔 博士 (Founder: Eric Chuang, Ph.D.)
          </p>
          <div className="flex gap-4 text-[8px] font-mono text-stone-400 tracking-widest uppercase">
            <span>GOVERNANCE FIRST</span>
            <span className="text-[#e6c84c]/60">PRESTIGE MODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
