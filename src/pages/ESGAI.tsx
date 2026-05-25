import { useState } from "react";
import { motion } from "motion/react";
import { 
  Database, 
  TrendingUp, 
  Cpu, 
  Activity, 
  FileText, 
  Share2, 
  Compass, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  Terminal, 
  Brain, 
  Sparkles, 
  AlertTriangle 
} from "lucide-react";

export default function ESGAI({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState("env");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  const gatingDomains = {
    env: {
      title: "環境治理資產門控",
      titleEn: "ENVIRONMENTAL CAPITAL GATING",
      desc: "自動對審供應鏈與多國碳權法律合規度。以預先防範超額碳排放造成的跨國實質行政罰鍰與環境侵權訴訟威脅。",
      metrics: [
        { label: "製程碳排放超標概率 Carbon Penalty Risk", value: "3.2%" },
        { label: "關係供應商零能耗合規比例 Supplier Compliance", value: "98.5%" },
        { label: "歐盟CBAM跨境碳關稅漏洞對接 EU Compliance Gate", value: "Secure [通過]" }
      ],
      verdict: "E級門控信號良好 · 無重大地質或綠洗法律涉訟風險"
    },
    soc: {
      title: "社會信任誠信自律門控",
      titleEn: "SOCIAL TRUST INTEGRITY GATING",
      desc: "稽查企業勞動安全指標、多國貿易制裁關係防火牆，以及智慧財產與跨境商業機密在協作中的保障效力。",
      metrics: [
        { label: "關係人高管競業利害衝突率 Executive Interlock", value: "0.0%" },
        { label: "跨國機敏合規資產流失概率 Confidentiality Leak", value: "0.05%" },
        { label: "海外反貪腐FCPA法律安全邊際 FCPA Safe Margin", value: "High [優異]" }
      ],
      verdict: "S級門控信號良好 · 已落實內部舉報盲盒與關係交易迴避機制"
    },
    gov: {
      title: "董事會公司治理與防火牆門控",
      titleEn: "BOARD GOVERNANCE FIREWALL GATING",
      desc: "專注防護董事會實質利益迴避。利用智慧算法檢視大股東與經理人持股集中度、表決權重疊，以及非常規關係人交易之法律定性。",
      metrics: [
        { label: "常務審議透明度係數 Board Independence Factor", value: "92.4%" },
        { label: "交叉持股控制黑洞威脅 Cross-holding Blackhole", value: "None [安全]" },
        { label: "非專利技術關聯收購定價合理性 Transaction Sizing", value: "Justified [合規]" }
      ],
      verdict: "G級門控信號頂級 · 決策層主權架構健康防禦已啟動"
    }
  };

  const currentDomainData = gatingDomains[activeTab as keyof typeof gatingDomains];

  const handleStartAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        score: Math.floor(Math.random() * 8) + 92, // 92-99
        verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        nodeStatus: "HEALTHY ACTIVE [策略合規]",
        encryption: "STT-SHA256 SECURED"
      });
    }, 1200);
  };

  const functions = [
    {
      title: "數據整合分析",
      titleEn: "DATA INTEGRATION & ANALYTICS",
      desc: "整合內外部數據 · 即時分析",
      descEn: "Integrate Internal & External Data · Real-time Analytics",
      detailed: "不留數據死角。將企業法遵、跨國子公司營運和財務利益流向，即時整合於大腦中樞，告別滯後的事後審查。",
      icon: <Database className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "風險預測與門控",
      titleEn: "RISK PREDICTION & GATING",
      desc: "AI 預測模型 · 風險評估",
      descEn: "AI Prediction Models · Risk Assessment",
      detailed: "在風險實質爆發前半步進行前瞻辨識。動態捕捉法規更新與競爭者地緣法律威脅，即時施加策略門控引導。",
      icon: <TrendingUp className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "智能決策建議",
      titleEn: "INTELLIGENT RECOMMENDATION",
      desc: "治理建議 · 決策優化",
      descEn: "Governance Recommendations · Decision Optimization",
      detailed: "莊博士與智庫算法大模型的完美雙螺旋合體。向經理人提供具備法條實證支持的最適策略資源配置方案。",
      icon: <Cpu className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "治理動態監控",
      titleEn: "GOVERNANCE MONITORING",
      desc: "即時監控 · 異常預警",
      descEn: "Real-time Monitoring · Anomaly Alerts",
      detailed: "7×24小時監看利害關係交易，一旦探測到授權跨限或迴避摩擦，立即冷靜預警，阻絕潛在合規事故火苗。",
      icon: <Activity className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "文明與永續披露",
      titleEn: "SUSTAINABILITY REPORTING",
      desc: "ESG 報告 · 資訊揭露",
      descEn: "ESG Reporting · Information Disclosure",
      detailed: "自動彙編對標 GRI、SASB 與國內外最新要求的優雅報告書，展現無懈可擊的公司永續形象，鎖定國際綠色融資便利。",
      icon: <FileText className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
    {
      title: "智庫生態連結",
      titleEn: "ECOSYSTEM CONNECTIVITY",
      desc: "利害關係人 · 生態整合",
      descEn: "Stakeholders Engagement · Ecosystem Integration",
      detailed: "打通產、官、學、研四維網絡。將個體企業數據在受法學保護下與策略智庫雲協同，獲取跨行業智庫預先推演紅利。",
      icon: <Share2 className="w-5 h-5 text-gold-400" strokeWidth={1.5} />,
    },
  ];

  const [activeTabSection, setActiveTabSection] = useState<'intro' | 'features' | 'console'>('intro');

  return (
    <div id="esgai-page" className="min-h-screen lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-[#050505] text-white flex flex-col justify-between selection:bg-gold-400 selection:text-black font-sans relative">
      
      {/* Laser light overlays */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[-10%] w-[500px] h-[500px] bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Glass Workspace Header & Tabs Container */}
      <div className="container mx-auto px-6 pt-6 relative z-30 max-w-7xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-400/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-gold-400 to-transparent" />
          <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-bold font-mono">INTELLIGENT ASSISTED GOVERNANCE</span>
        </div>
        
        {/* Dynamic Glass Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950/90 border border-gold-400/20 rounded-xl backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setActiveTabSection('intro')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='intro' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            系統引言
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('features')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='features' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            常設核心功能
          </button>
          <button 
            type="button"
            onClick={() => setActiveTabSection('console')}
            className={`px-4.5 py-1.5 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 border-0 cursor-pointer ${activeTabSection==='console' ? 'bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black shadow-lg shadow-gold-500/15' : 'text-stone-400 hover:text-white bg-transparent'}`}
          >
            實時智能門控
          </button>
        </div>
      </div>

      {/* Hero Workspace Content */}
      <div className="flex-grow container mx-auto px-6 relative z-10 max-w-7xl w-full flex items-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Ambient background image representing technology globe */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/bg-insights-globe.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent z-1" />

        <div className="w-full relative z-10">
          
          {/* TAB 1: INTRO */}
          {activeTabSection === 'intro' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-sans font-extralight tracking-tight text-white leading-tight">
                    ESGAI 智慧治理常設系統
                  </h1>
                  <p className="text-gold-500/80 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-bold">
                    INTELLIGENT DECISION & EXTREME TRUST GATING
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-gold-400/30 via-gold-400/10 to-transparent max-w-lg" />

                <div className="space-y-3 max-w-xl text-stone-300 text-sm leading-relaxed font-light font-sans">
                  <p className="text-stone-100 font-normal">
                    以演算法約束複雜風險，用智慧照亮治理主權盲區。
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    這是一套融合了莊鈞翔博士幾十年治理法規實務，與現代企業大數據門控模型的創新型決策輔助平台。將治理指標（G）、社會誠信責任（S）、環境碳權合規（E），與前沿大語言模型（AI）進行高度自動化與動態的治理稽核運算。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a 
                    href="https://lin.ee/yJrCTeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black hover:brightness-110 active:scale-95 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase shadow-[0_10px_30px_rgba(230,200,76,0.15)] inline-flex items-center justify-center gap-2 outline-none border-0 cursor-pointer no-underline"
                  >
                    聯絡開通系統權限 <ArrowRight className="w-4.5 h-4.5" />
                  </a>
                  <button 
                    onClick={() => setActiveTabSection('console')}
                    className="bg-stone-900 hover:bg-stone-800 text-white/90 border border-white/10 hover:border-gold-400/40 px-8 py-3.5 rounded font-sans font-bold tracking-[0.25em] text-xs transition-all uppercase inline-flex items-center justify-center gap-2 outline-none cursor-pointer"
                  >
                    智能門控控制台 <Compass className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Orbiting ESG-AI Nodes Diagram */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative pr-4 [perspective:1500px]">
                {/* Main high-tech ring panel with 3D tilts and depth */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center border border-gold-400/20 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-black/95 backdrop-blur-3xl shadow-[0_45px_90px_rgba(0,0,0,0.95),_0_0_50px_rgba(230,200,76,0.05)] [transform:rotateX(12deg)_rotateY(-8deg)] hover:[transform:rotateX(4deg)_rotateY(-2deg)] transition-all duration-700 ease-out">
                  
                  <div 
                    className="absolute inset-0 opacity-[0.22] bg-cover bg-center rounded-full pointer-events-none mix-blend-color-dodge" 
                    style={{ backgroundImage: "url('/images/background_image_002.png')" }}
                  />

                  {/* Central Glowing AI core node */}
                  <div className="w-20 h-20 rounded-full border-2 border-[#e6c84c] bg-zinc-950 flex flex-col items-center justify-center relative z-20 shadow-[0_0_40px_rgba(230,200,76,0.35)]">
                    <span className="text-xl font-black font-mono text-[#e6c84c] tracking-widest">STT</span>
                    <span className="text-[7px] font-mono tracking-[0.2em] text-[#e6c84c]/85 text-center uppercase font-bold mt-1">CORE ENGINE</span>
                    <div className="absolute inset-[-4px] border border-[#e6c84c]/20 rounded-full animate-ping" />
                  </div>

                  {/* 4 Orbiting ESG-AI nodes */}
                  {[
                    { label: "E", name: "環境治理", nameEn: "ENVIRONMENTAL", angle: 0 },
                    { label: "S", name: "社會信任", nameEn: "SOCIAL VALUE", angle: 90 },
                    { label: "G", name: "公司自律", nameEn: "GOVERNANCE", angle: 180 },
                    { label: "AI", name: "智慧核心", nameEn: "INTELLIGENCE", angle: 270 }
                  ].map((node, idx) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const distance = 115; // responsive radius distance 
                    const x = Math.cos(rad) * distance;
                    const y = Math.sin(rad) * distance;

                    return (
                      <div 
                        key={idx}
                        className="absolute flex flex-col items-center justify-center"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                      >
                        {/* Golden Laser Line to center */}
                        <div 
                          className="absolute w-0.5 bg-gradient-to-t from-gold-500/30 via-gold-400/10 to-transparent origin-bottom"
                          style={{ 
                            height: `${distance}px`, 
                            transform: `rotate(${node.angle + 90}deg) translateY(-${distance / 2}px)`,
                          }}
                        />
                        
                        {/* Massive 3D bubble */}
                        <div className="w-14 h-14 rounded-full border border-gold-400/70 bg-gradient-to-br from-zinc-800 via-zinc-950 to-stone-900 flex flex-col items-center justify-center z-20 hover:scale-110 hover:border-gold-200 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.95)] relative cursor-pointer group">
                          <span className="text-[#e6c84c] text-lg font-black font-mono tracking-wider">{node.label}</span>
                        </div>
                        {/* Label window underneath */}
                        <div className="bg-gradient-to-b from-zinc-900 to-black px-2 py-1 rounded-lg border border-gold-400/20 mt-1.5 z-10 shadow-[0_8px_16px_rgba(0,0,0,0.95)] max-w-[90px] text-center">
                          <p className="text-[9px] font-sans font-black text-stone-100 whitespace-nowrap leading-none">{node.name}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="absolute w-[230px] h-[230px] border border-dashed border-gold-400/20 rounded-full animate-[spin_40s_linear_infinite]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTabSection === 'features' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h2 className="text-xl sm:text-2xl font-sans font-light text-white leading-tight">
                  ESGAI 常設核心功能
                </h2>
                <p className="text-stone-400 text-xs font-light">
                  四維產學研網絡協同，活化企業長青文明基因，保障主權資產安全。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {functions.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950/90 border border-gold-400/20 hover:border-gold-400/60 p-5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-lg bg-gold-400/5 flex items-center justify-center border border-gold-400/20">
                        {mod.icon}
                      </div>
                      <div>
                        <h3 className="font-sans text-white text-sm font-bold tracking-wide">{mod.title}</h3>
                        <p className="text-[8px] font-mono text-gold-500 tracking-wider uppercase mt-0.5">{mod.titleEn}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t border-white/5 pt-2.5">
                      <p className="text-[11px] text-stone-300 leading-relaxed font-light">{mod.detailed}</p>
                      <p className="text-[10px] text-stone-500 leading-relaxed italic border-l border-gold-400/20 pl-2">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CONSOLE */}
          {activeTabSection === 'console' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Select Gating Domain (Left Column) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-gold-400/20 space-y-5">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#e6c84c] uppercase font-bold">SELECT ACTIVE GATING DOMAIN</span>
                    <p className="text-[11px] text-stone-400 mt-1">選取要稽核測試的智慧自律監控域：</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { id: "env", label: "環境治理自律門控", short: "E-Gate" },
                      { id: "soc", label: "社會信用誠信監控", short: "S-Gate" },
                      { id: "gov", label: "董事會公司治理自律", short: "G-Gate" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setActiveTab(btn.id);
                          setAuditResult(null);
                        }}
                        className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                          activeTab === btn.id 
                            ? "bg-gold-400/5 border-gold-400 text-gold-400" 
                            : "bg-black/80 border-white/5 text-stone-400 hover:border-white/10"
                        }`}
                      >
                        <span className="text-xs font-bold">{btn.label}</span>
                        <span className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-stone-500 font-bold">{btn.short}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleStartAudit}
                    disabled={isAuditing}
                    className="w-full bg-gradient-to-r from-gold-400 to-[#b89530] text-black hover:brightness-110 active:scale-95 disabled:opacity-50 h-11 rounded-lg font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-0 cursor-pointer transition-all"
                  >
                    {isAuditing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>RUNNING ESGAI AUDIT...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>運行實時自律門控稽查</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Display Result (Right Column) */}
              <div className="lg:col-span-7">
                <div className="bg-zinc-950 border border-gold-400/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative min-h-[300px] flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent blur-xl" />
                  
                  <div className="space-y-4">
                    {/* Title of Domain */}
                    <div className="border-b border-white/5 pb-3">
                      <p className="text-[9.5px] font-mono text-gold-500 tracking-widest uppercase font-bold">ESGAI GATE INFORMATION PROTOCOL</p>
                      <h3 className="text-base font-bold text-white mt-1">
                        {currentDomainData.title} <span className="text-[10px] font-mono font-normal text-stone-500 uppercase tracking-widest ml-1">{currentDomainData.titleEn}</span>
                      </h3>
                      <p className="text-[11px] text-stone-400 leading-relaxed mt-2.5 font-light">
                        {currentDomainData.desc}
                      </p>
                    </div>

                    {/* Operational Metrics list */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono text-stone-500 tracking-wider">ESTIMATED DIGITAL TELEMETRY METRICS:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {currentDomainData.metrics.map((met, midx) => (
                          <div key={midx} className="bg-black/60 p-3 border border-white/5 rounded-lg space-y-0.5">
                            <span className="text-[9px] text-stone-500 block leading-tight font-sans text-left">{met.label}</span>
                            <span className="text-xs font-semibold font-mono text-gold-400 block pt-0.5">{met.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Audit verdict representation */}
                  <div className="mt-4 border-t border-white/5 pt-4">
                    {isAuditing && (
                      <div className="flex items-center gap-2 text-gold-400/60 animate-pulse text-[11px] font-mono">
                        <Terminal className="w-3.5 h-3.5 animate-spin" />
                        <span>[COMPILE] CONNECTING CHUANG-AI TRUST NODE AND RUNNING VERIFICATION...</span>
                      </div>
                    )}

                    {!isAuditing && auditResult === null && (
                      <div className="flex items-center gap-2 text-stone-500 text-[11px] font-mono">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>控制台準備就緒。請點選左側按鈕「運行實時自律門控稽查」獲取診斷報告。</span>
                      </div>
                    )}

                    {!isAuditing && auditResult !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <h4 className="text-[11px] font-bold uppercase tracking-wider font-sans">稽查成功 · 安全等級頂級</h4>
                          </div>
                          <p className="text-xs text-stone-300 font-light mt-1">
                            測試信號：{currentDomainData.verdict}
                          </p>
                          <div className="text-[9px] font-mono text-stone-500 space-x-3 pt-1">
                            <span>TIMESTAMP: {auditResult.verifiedAt}</span>
                          </div>
                        </div>

                        {/* Gating Score badge */}
                        <div className="bg-black px-3 py-1.5 border border-emerald-500/30 rounded flex items-baseline gap-1.5 shrink-0 h-max w-max">
                          <span className="text-[#e2f5e0] text-[8px] font-mono tracking-widest font-bold leading-none">INTEGRITY</span>
                          <span className="text-base font-mono text-emerald-400 font-bold leading-none">{auditResult.score}</span>
                        </div>
                      </motion.div>
                    )}
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
