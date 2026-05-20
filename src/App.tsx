import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import Home from "./pages/Home";
import About from "./pages/About";
import Columns from "./pages/Columns";
import Books from "./pages/Books";
import Papers from "./pages/Papers";
import GCSDA from "./pages/GCSDA";
import InternalCompliance from "./pages/InternalCompliance";
import ServicePortal from "./pages/ServicePortal";
import Success from "./pages/Success";
import ArticleIndex from "./pages/ArticleIndex";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Newspaper, BookText, BookOpen, GraduationCap, Globe, User, Menu, X, ShieldAlert, Scale, Users, Library, ArrowUpRight, Mail, Award, Landmark, Shield, Crown, ArrowRight } from "lucide-react";
import { AccessibilityWidget } from "./components/AccessibilityWidget";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashAndPathChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.replace('/', '').replace('.html', '');
      
      const validPages = ['home', 'about', 'columns', 'books', 'internal-compliance', 'service-portal', 'success', 'papers', 'gcsda', 'article-index', 'governance', 'insights', 'contact'];
      
      const targetPage = hash || path;
      
      if (validPages.includes(targetPage)) {
        const pageMap: Record<string, string> = {
          'insights': 'columns',
          'contact': 'service-portal'
        };
        setCurrentPage(pageMap[targetPage] || targetPage);
      }
    };

    window.addEventListener('hashchange', handleHashAndPathChange);
    window.addEventListener('popstate', handleHashAndPathChange);
    handleHashAndPathChange(); 

    return () => {
      window.removeEventListener('hashchange', handleHashAndPathChange);
      window.removeEventListener('popstate', handleHashAndPathChange);
    };
  }, []);

  // Update hash when page changes
  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      lerp: 0.08,
      infinite: false,
    });

    // Make lenis globally accessible for scrolling to top
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home onNavigate={setCurrentPage} />;
      case "about": return <About />;
      case "columns": return <Columns />;
      case "books": return <Books onNavigate={setCurrentPage} />;
      case "governance": 
      case "internal-compliance": return <InternalCompliance />;
      case "service-portal": return <ServicePortal />;
      case "success": return <Success />;
      case "papers": return <Papers />;
      case "gcsda": return <GCSDA />;
      case "article-index": return <ArticleIndex />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  const navItems = [
    { id: "governance", labelZh: "法理入口", labelEn: "GOVERNANCE", icon: Landmark },
    { id: "columns", labelZh: "法律研究", labelEn: "LEGAL RESEARCH", icon: Scale },
    { id: "books", labelZh: "治理出版", labelEn: "PUBLICATION", icon: BookText },
    { id: "papers", labelZh: "學術體系", labelEn: "ACADEMIC EXCELLENCE", icon: GraduationCap },
    { id: "gcsda", labelZh: "策略發展學會", labelEn: "STRATEGY FORUM", icon: Users },
    { id: "about", labelZh: "智庫主權", labelEn: "ABOUT STT", icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold-400/30 selection:text-white bg-[#050505]">
      {/* Navigation - High Prestige Design */}
      <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-2xl border-b border-gold-400/10">
        <div className="container mx-auto px-6 h-20 flex items-center">
          <a 
            className="flex items-center cursor-pointer group outline-none mr-auto no-underline"
            href="index.html"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.history.pushState({}, '', 'index.html');
            }}
            aria-label="回首頁"
          >
              <div className="relative w-40 lg:w-56 h-12 flex-shrink-0">
               <img src="/images/logo-header.png" alt="STT Press Logo" className="w-full h-full object-contain transition-transform group-hover:scale-[1.02]" />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center h-full">
            {navItems.map((item, idx) => {
              const hrefMap: Record<string, string> = {
                'governance': 'governance.html',
                'columns': 'insights.html',
                'books': 'books.html',
                'papers': 'papers.html',
                'gcsda': 'gcsda.html',
                'about': 'about.html',
              };
              const href = hrefMap[item.id] || `${item.id.toLowerCase()}.html`;
              return (
                <div key={item.id} className="flex h-full items-center">
                  {idx === 0 && <div className="h-10 w-px bg-white/10"></div>}
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.id);
                      window.history.pushState({}, '', href);
                    }}
                    className={`relative flex flex-col items-center justify-center px-4 h-full transition-all group min-w-[100px] no-underline ${
                      currentPage === item.id ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mb-1.5 transition-all duration-300 group-hover:scale-110 ${
                      currentPage === item.id ? "text-gold-400 drop-shadow-[0_0_10px_rgba(230,200,76,0.2)]" : "text-gold-400/50 group-hover:text-gold-400/80"
                    }`} strokeWidth={1.2} />
                    <span className={`text-[12px] font-sans font-medium tracking-[0.05em] mb-0.5 transition-colors whitespace-nowrap ${
                      currentPage === item.id ? "text-gold-400" : "text-white/60 group-hover:text-white"
                    }`}>{item.labelZh}</span>
                    <span className={`text-[7px] font-mono tracking-[0.15em] font-light transition-opacity whitespace-nowrap ${
                      currentPage === item.id ? "text-gold-400/60" : "text-white/30 group-hover:text-white/50"
                    }`}>{item.labelEn}</span>

                    {currentPage === item.id && (
                      <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400/80" />
                    )}
                  </a>
                  <div className="h-10 w-px bg-white/10"></div>
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 ml-8">
              <a 
                href="contact.html"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('service-portal');
                  window.history.pushState({}, '', 'contact.html');
                }}
                className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] hover:brightness-110 text-black px-5 py-3.5 rounded-lg flex flex-col items-center justify-center gap-0 group transition-all shadow-lg font-sans border-0 cursor-pointer no-underline"
              >
                <div className="flex items-center gap-1.5 mb-0.5 whitespace-nowrap">
                  <Crown className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
                  <span className="text-[14px] font-bold tracking-[0.05em] leading-none">治理委託</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-black" strokeWidth={1.5} />
                </div>
                <span className="text-[7px] font-mono font-black tracking-[0.15em] opacity-80 uppercase leading-none">GOVERNANCE ENGAGEMENT</span>
              </a>

              <a 
                href="contact.html"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('service-portal');
                  window.history.pushState({}, '', 'contact.html');
                }}
                className="border border-gold-400/40 text-gold-400 hover:bg-gold-400/5 px-5 py-3.5 rounded-lg flex flex-col items-center justify-center gap-0 group transition-all shadow-lg font-sans cursor-pointer no-underline"
              >
                <div className="flex items-center gap-1.5 mb-0.5 whitespace-nowrap">
                  <Mail className="w-3.5 h-3.5 text-gold-400" strokeWidth={1.5} />
                  <span className="text-[14px] font-bold tracking-[0.05em] leading-none">聯絡智庫</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-gold-400" strokeWidth={1.5} />
                </div>
                <span className="text-[7px] font-mono font-black tracking-[0.15em] opacity-80 uppercase leading-none">CONTACT STT</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="xl:hidden hover:bg-transparent text-gold-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Login Modal */}
        <AnimatePresence>
          {isLoginModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-zinc-900 border border-gold-400/20 p-8 rounded-xl shadow-[0_0_50px_rgba(230,200,76,0.1)]"
              >
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2">ESGAI 核心系統</h3>
                  <p className="text-white/40 text-xs tracking-widest uppercase italic">Governance Protocol Login</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">治理帳號</label>
                    <input type="text" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-gold-400 outline-none transition-colors" placeholder="請輸入帳號" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">安全密鑰</label>
                    <input type="password" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-gold-400 outline-none transition-colors" placeholder="請輸入密碼" />
                  </div>
                  <Button className="w-full bg-gold-400 hover:bg-gold-500 text-black font-bold h-12 mt-4">
                    啟動治理協議
                  </Button>
                </div>
                <p className="mt-8 text-center text-[10px] text-white/20">
                  PRIVATE SYSTEM &nbsp;·&nbsp; AUTHORIZED PERSONNEL ONLY
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-24 bg-black border-b border-gold-400/10 overflow-hidden z-40 shadow-2xl"
            >
              <div className="flex flex-col p-8 gap-6">
                {navItems.map((item) => {
                  const hrefMap: Record<string, string> = {
                    'governance': 'governance.html',
                    'columns': 'insights.html',
                    'books': 'books.html',
                    'papers': 'papers.html',
                    'gcsda': 'gcsda.html',
                    'about': 'about.html',
                  };
                  const href = hrefMap[item.id] || `${item.id.toLowerCase()}.html`;
                  return (
                    <a
                      key={item.id}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(item.id);
                        setIsMenuOpen(false);
                        window.history.pushState({}, '', href);
                      }}
                      className={`flex items-center gap-6 group transition-colors text-left py-2 no-underline ${
                        currentPage === item.id ? "text-gold-400" : "text-gold-50/60"
                      }`}
                    >
                      <item.icon className="w-6 h-6 text-gold-400/50" />
                      <div className="flex flex-col">
                        <span className="text-xl font-display font-light">{item.labelZh}</span>
                        <span className="text-[10px] font-mono tracking-widest opacity-40 uppercase">{item.labelEn}</span>
                      </div>
                    </a>
                  );
                })}

                {/* Mobile action links */}
                <div className="border-t border-gold-400/10 pt-6 mt-2 flex flex-col gap-4">
                  <a 
                    href="contact.html"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('service-portal');
                      setIsMenuOpen(false);
                      window.history.pushState({}, '', 'contact.html');
                    }}
                    className="bg-gradient-to-br from-[#e6c84c] via-gold-500 to-[#b89530] text-black px-6 py-4 rounded-lg flex items-center justify-between group no-underline"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-black" strokeWidth={1.5} />
                      <span className="text-base font-bold">治理委託</span>
                    </div>
                    <span className="text-[8px] font-mono font-black tracking-widest uppercase opacity-80">GOVERNANCE ENGAGEMENT</span>
                  </a>
                  <a 
                    href="contact.html"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('service-portal');
                      setIsMenuOpen(false);
                      window.history.pushState({}, '', 'contact.html');
                    }}
                    className="border border-gold-400/40 text-gold-400 px-6 py-4 rounded-lg flex items-center justify-between group no-underline"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                      <span className="text-base font-bold">聯絡智庫</span>
                    </div>
                    <span className="text-[8px] font-mono font-black tracking-widest uppercase opacity-80">CONTACT STT</span>
                  </a>
                  {/* Discreet Core system login */}
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="text-white/20 hover:text-white/40 text-[10px] uppercase tracking-widest text-center mt-4 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0"
                  >
                    <Crown className="w-3 h-3" />
                    <span>System Login</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AccessibilityWidget />

      {/* Footer - Redesigned per User Image */}
      <footer className="relative bg-black text-white pt-24 pb-16 overflow-hidden border-t-[0.5px] border-gold-400/20">
        {/* Subtle Background Glow/Map Effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(230,200,76,0.1)_0%,transparent_70%)]"></div>
          {/* We can simulate the world map with a CSS pattern if needed, but a focused glow is cleaner for now */}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            
            {/* Left Section: Brand & Slogan */}
            <div className="lg:col-span-4 space-y-8 pr-8">
              <div className="flex flex-col gap-6">
                <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                  {/* Seal Logo */}
                  <img 
                    src="/images/logo-seal-footer.png" 
                    alt="STT Press Seal" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(230,200,76,0.2)]" 
                  />
                  {/* Mirror reflection effect below */}
                  <div className="absolute -bottom-16 left-0 w-full h-full scale-y-[-0.3] opacity-10 pointer-events-none blur-[2px]">
                    <img src="/images/logo-seal-footer.png" alt="" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-serif text-[#e6c84c] tracking-tight">
                    STT Governance
                  </h3>
                  <p className="text-white text-lg lg:text-xl font-display tracking-widest">
                    策略為先 &nbsp;|&nbsp; 治理為本 &nbsp;|&nbsp; 管理為終
                  </p>
                  <div className="w-12 h-px bg-[#e6c84c]/40"></div>
                  <p className="text-white/40 max-w-sm font-sans text-sm leading-loose font-light">
                    協助領導者在變革中實現專業長青，我們將企業治理的嚴謹法遵精神，轉化為個人心智運作的底層邏輯。
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Section: Explore */}
            <div className="lg:col-span-4 border-l border-white/10 lg:pl-12 lg:pr-8">
              <h4 className="text-gold-400 text-sm font-medium tracking-[0.4em] uppercase mb-12">EXPLORE</h4>
              
              <div className="space-y-6">
                {[
                  { id: "governance", zh: "法理入口", en: "GOVERNANCE", icon: Landmark, href: "governance.html" },
                  { id: "columns", zh: "法律研究", en: "LEGAL RESEARCH", icon: Scale, href: "insights.html" },
                  { id: "books", zh: "治理出版", en: "PUBLICATION", icon: BookText, href: "books.html" },
                  { id: "papers", zh: "學術體系", en: "ACADEMIC EXCELLENCE", icon: GraduationCap, href: "papers.html" },
                  { id: "gcsda", zh: "策略發展學會", en: "STRATEGY FORUM", icon: Users, href: "gcsda.html" },
                  { id: "about", zh: "智庫主權", en: "ABOUT STT", icon: Shield, href: "about.html" },
                ].map((item, idx) => (
                  <a 
                    key={idx}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.id);
                      window.history.pushState({}, '', item.href);
                    }}
                    className="flex items-center gap-6 group text-left w-full transition-colors hover:text-gold-400 no-underline"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-gold-400/60 group-hover:text-gold-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-white/80 font-sans text-sm font-medium tracking-wider group-hover:text-white">{item.zh}</div>
                      <div className="text-white/30 font-sans text-[10px] tracking-wide uppercase">{item.en}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section: Connect & Support */}
            <div className="lg:col-span-4 border-l border-white/10 lg:pl-12">
              <h4 className="text-gold-400 text-sm font-medium tracking-[0.4em] uppercase mb-12">CONNECT & SUPPORT</h4>
              
              <div className="space-y-10">
                {/* Line Item 1 */}
                <a 
                  href="https://line.me/R/ti/p/@stt-group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group no-underline"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-gold-400/5 group-hover:bg-gold-400/20 transition-all">
                      <span className="text-[8px] font-black text-gold-400 leading-none">LINE</span>
                    </div>
                    <div>
                      <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold mb-1">Digital Fulfillment</div>
                      <div className="text-white/80 group-hover:text-gold-400 transition-colors inline-flex items-center gap-2">
                        STT 智庫治理 Line 🤙
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gold-400/40 group-hover:text-gold-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                {/* Line Item 2 */}
                <a 
                  href="https://line.me/R/ti/p/@387nbnjs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group no-underline"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-gold-400/5 group-hover:bg-gold-400/20 transition-all">
                      <span className="text-[8px] font-black text-gold-400 leading-none">LINE</span>
                    </div>
                    <div>
                      <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold mb-1">Academic Society</div>
                      <div className="text-white/80 group-hover:text-gold-400 transition-colors inline-flex items-center gap-2">
                        GCSDA 學會 Line 🤙
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gold-400/40 group-hover:text-gold-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <div className="h-px bg-white/10 w-full"></div>

                {/* Email Item */}
                <div className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                      <Mail className="w-5 h-5 text-gold-400/60" />
                    </div>
                    <div>
                      <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold mb-1">Email</div>
                      <div className="text-white/60 font-sans text-sm tracking-wide">pc5888@gmail.com</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gold-400/20" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Final Bottom Bar */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex gap-10">
              {[
                { zh: "信任為本", en: "TRUST FOUNDATION" },
                { zh: "制度為本", en: "INSTITUTIONAL LOGIC" },
                { zh: "長期為本", en: "LONG-TERM VALUE" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-gold-400/60 text-[11px] mb-1 tracking-widest font-medium uppercase">{item.zh}</div>
                  <div className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-medium">{item.en}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-end gap-3">
              <div className="flex gap-8 text-[9px] font-sans font-medium tracking-[0.3em] text-white/20 uppercase">
                <button onClick={() => setCurrentPage('service-portal')} className="hover:text-gold-400 transition-colors">合規與退換貨 Compliance</button>
                <button onClick={() => setCurrentPage('service-portal')} className="hover:text-gold-400 transition-colors">隱私權保護 Privacy</button>
              </div>
              <span className="text-[9px] font-sans font-black tracking-[0.3em] text-white/10 uppercase">
                © 2026 STT PRESS. ALL RIGHTS RESERVED.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
