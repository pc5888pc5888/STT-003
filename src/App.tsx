import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, GraduationCap, Menu, Shield, Users, X } from "lucide-react";
import Lenis from "lenis";
import Home from "./pages/HomeV2";
import About, { ContactModal } from "./pages/About";
import Columns from "./pages/Columns";
import Books from "./pages/Books";
import Papers from "./pages/Papers";
import GCSDA from "./pages/GCSDA";
import InternalComplianceBook from "./pages/InternalCompliance";
import CorporateGovernance from "./pages/CorporateGovernance";
import FamilyGovernance from "./pages/FamilyGovernance";
import InternalCompliancePortal from "./pages/InternalCompliancePortal";
import ESGAI from "./pages/ESGAI";
import ServicePortal from "./pages/ServicePortal";
import Success from "./pages/Success";
import ArticleIndex from "./pages/ArticleIndex";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Start from "./pages/Start";
import { HowWeJudge, PublicationsHub, ProjectsHub, STTPlatform } from "./pages/PublicCore";
import ChatBot from "./components/ChatBot";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import { useI18n } from "./i18n/I18nProvider";

type LegacyNavigate = (page: string) => void;
type ShellProps = { children: ReactNode; onContactOpen: () => void; chatOpen: boolean; onChatToggle: () => void };

const legacyPathMap: Record<string, string> = {
  home: "/", problems: "/problems", start: "/start", about: "/institution/eric-chuang", columns: "/insights", books: "/books", papers: "/papers", gcsda: "/institution/gcsda",
  "article-index": "/insights/index", "service-portal": "/digital-product-policy", success: "/success",
  "internal-compliance": "/internal-compliance", "internal-compliance-pillars": "/internal-compliance/pillars", "internal-compliance-simulator": "/internal-compliance/simulator", "internal-compliance-academic": "/internal-compliance/academic", "internal-compliance-book": "/internal-compliance/publication",
  "corporate-governance": "/governance/corporate", "corporate-governance-modules": "/governance/corporate/modules", "corporate-governance-simulator": "/governance/corporate/simulator", "corporate-governance-academic": "/governance/corporate/academic",
  "family-governance": "/governance/family", "family-governance-framework": "/governance/family/framework", "family-governance-stages": "/governance/family/stages", "family-governance-academic": "/governance/family/academic",
  esgai: "/governance/digital", "esg-ai": "/governance/digital", "esgai-features": "/governance/digital/features", "esg-ai-features": "/governance/digital/features", "esgai-console": "/governance/digital/console", "esg-ai-console": "/governance/digital/console", "esgai-academic": "/governance/digital/academic", "esg-ai-academic": "/governance/digital/academic",
};

function useLegacyNavigate(): LegacyNavigate {
  const navigate = useNavigate();
  return (page: string) => navigate(legacyPathMap[page] ?? "/");
}

function PublicShell({ children, chatOpen, onChatToggle }: ShellProps) {
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const exactHome = location.pathname === "/" || location.pathname === "/index.html";

  const primaryNavigation = useMemo(() => [
    { label: "你正在面對什麼", path: "/problems" },
    { label: "如何判讀", path: "/how-stt-works" },
    { label: "專欄判讀", path: "/insights" },
    { label: "出版研究", path: "/publications" },
    { label: "人文專案", path: "/projects" },
    { label: "關於 STT", path: "/stt" },
  ], []);

  const secondaryNavigation = useMemo(() => [
    { label: "治理責任｜莊鈞翔博士", path: "/institution/eric-chuang", icon: Shield },
    { label: "研究論文", path: "/papers", icon: GraduationCap },
    { label: "AI Governance", path: "/governance/digital", icon: Brain },
    { label: "內在法遵", path: "/internal-compliance", icon: BookOpen },
    { label: "GCSDA", path: "/institution/gcsda", icon: Users },
  ], []);

  const go = (path: string) => { setMenuOpen(false); navigate(path); };

  if (exactHome) return <div className="min-h-screen" style={{ background: "#fbfaf7", color: "var(--stt-ink)" }}><main>{children}</main><AccessibilityWidget onChatOpen={onChatToggle} isChatOpen={chatOpen} /></div>;

  return (
    <div className="min-h-screen" style={{ background: "var(--stt-canvas)", color: "var(--stt-ink)" }}>
      <header className="sticky top-0 z-[70] border-b bg-white/95 backdrop-blur-xl" style={{ borderColor: "var(--stt-line)", minHeight: "var(--stt-header-height)" }}>
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center px-5 lg:px-8">
          <button type="button" onClick={() => go("/")} className="mr-auto cursor-pointer border-0 bg-transparent p-0 text-left">
            <span className="block font-serif text-lg tracking-[0.06em]">STT Governance</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.28em]" style={{ color: "var(--stt-gold-deep)" }}>Strategic Think Tank</span>
          </button>
          <nav className="hidden h-full items-center 2xl:flex" aria-label="Primary">
            {primaryNavigation.map((item) => {
              const active = location.pathname === item.path || (item.path !== "/stt" && location.pathname.startsWith(`${item.path}/`));
              return <button key={item.path} type="button" onClick={() => go(item.path)} className="relative h-full cursor-pointer border-0 bg-transparent px-3 text-[11px] tracking-[0.04em]" style={{ color: active ? "var(--stt-gold-deep)" : "var(--stt-ink-soft)" }}>{item.label}{active && <span className="absolute bottom-0 left-3 right-3 h-px" style={{ background: "var(--stt-gold)" }} />}</button>;
            })}
          </nav>
          <div className="ml-4 hidden items-center gap-3 xl:flex">
            <button type="button" onClick={() => go("/start")} className="inline-flex cursor-pointer items-center gap-2 border bg-transparent px-4 py-2.5 text-xs font-semibold" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>開始<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.3} /></button>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent" aria-label={menuOpen ? t("common.close") : "Menu"}>{menuOpen ? <X className="h-5 w-5" strokeWidth={1.2} /> : <Menu className="h-5 w-5" strokeWidth={1.2} />}</button>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} className="ml-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent xl:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" strokeWidth={1.2} /> : <Menu className="h-5 w-5" strokeWidth={1.2} />}</button>
        </div>
        {menuOpen && <div className="absolute left-0 right-0 top-[76px] border-b bg-white shadow-[0_22px_50px_rgba(36,34,31,0.08)]" style={{ borderColor: "var(--stt-line)" }}><div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"><div className="grid gap-px border bg-[var(--stt-line)] sm:grid-cols-2">{primaryNavigation.map((item, i) => <button key={item.path} type="button" onClick={() => go(item.path)} className="min-h-[106px] cursor-pointer bg-white p-5 text-left"><span className="text-[10px] tracking-[0.16em]" style={{ color: "var(--stt-gold-deep)" }}>0{i + 1}</span><span className="mt-5 block font-serif text-lg">{item.label}</span></button>)}</div><div className="space-y-2">{secondaryNavigation.map((item) => { const Icon = item.icon; return <button key={item.path} type="button" onClick={() => go(item.path)} className="flex w-full cursor-pointer items-center justify-between border-b bg-transparent px-2 py-3 text-left" style={{ borderColor: "var(--stt-line)" }}><span className="flex items-center gap-3 text-sm" style={{ color: "var(--stt-ink-soft)" }}><Icon className="h-4 w-4" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />{item.label}</span><ArrowRight className="h-3.5 w-3.5" strokeWidth={1.2} /></button>; })}<button type="button" onClick={() => go("/start")} className="mt-5 inline-flex cursor-pointer items-center gap-2 border bg-[var(--stt-ivory)] px-4 py-3 text-sm" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>開始<ArrowRight className="h-4 w-4" /></button></div></div></div>}
      </header>
      <main className="min-h-[60vh]">{children}</main>
      <footer className="border-t bg-white px-6 py-12 lg:px-8" style={{ borderColor: "var(--stt-line)" }}><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-serif text-xl tracking-[0.04em]">STT Governance</p><p className="mt-3 max-w-[620px] text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>把未來可能後悔的事情，提前帶到今天理解、判斷、安排與執行。</p></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: "var(--stt-ink-muted)" }}><button onClick={() => go("/problems")} className="border-0 bg-transparent">你正在面對什麼</button><button onClick={() => go("/how-stt-works")} className="border-0 bg-transparent">如何判讀</button><button onClick={() => go("/stt")} className="border-0 bg-transparent">關於 STT</button><button onClick={() => go("/start")} className="border-0 bg-transparent">開始</button></div></div></footer>
      <AccessibilityWidget onChatOpen={onChatToggle} isChatOpen={chatOpen} />
    </div>
  );
}

function AppRoutes() {
  const onNavigate = useLegacyNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={onNavigate} />} />
      <Route path="/index.html" element={<Home onNavigate={onNavigate} />} />
      <Route path="/governance.html" element={<Navigate to="/problems" replace />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/:id" element={<ProblemDetail />} />
      <Route path="/how-stt-works" element={<HowWeJudge />} />
      <Route path="/publications" element={<PublicationsHub />} />
      <Route path="/projects" element={<ProjectsHub />} />
      <Route path="/stt" element={<STTPlatform />} />
      <Route path="/start" element={<Start />} />
      <Route path="/insights" element={<Columns />} /><Route path="/insights.html" element={<Columns />} /><Route path="/insights/index" element={<ArticleIndex />} />
      <Route path="/books" element={<Books onNavigate={onNavigate} />} /><Route path="/papers" element={<Papers onNavigate={onNavigate} />} />
      <Route path="/institution/eric-chuang" element={<About />} /><Route path="/about.html" element={<About />} /><Route path="/institution/gcsda" element={<GCSDA onContactOpen={() => window.dispatchEvent(new CustomEvent("stt:open-contact"))} />} /><Route path="/gcsda.html" element={<GCSDA onContactOpen={() => window.dispatchEvent(new CustomEvent("stt:open-contact"))} />} />
      <Route path="/internal-compliance" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="intro" />} /><Route path="/internal-compliance/pillars" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="pillars" />} /><Route path="/internal-compliance/simulator" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="simulator" />} /><Route path="/internal-compliance/academic" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="academic" />} /><Route path="/internal-compliance/publication" element={<InternalComplianceBook onNavigate={onNavigate} />} />
      <Route path="/governance/corporate" element={<CorporateGovernance onNavigate={onNavigate} activeSection="intro" />} /><Route path="/governance/corporate/modules" element={<CorporateGovernance onNavigate={onNavigate} activeSection="modules" />} /><Route path="/governance/corporate/simulator" element={<CorporateGovernance onNavigate={onNavigate} activeSection="simulator" />} /><Route path="/governance/corporate/academic" element={<CorporateGovernance onNavigate={onNavigate} activeSection="academic" />} />
      <Route path="/governance/family" element={<FamilyGovernance onNavigate={onNavigate} activeSection="intro" />} /><Route path="/governance/family/framework" element={<FamilyGovernance onNavigate={onNavigate} activeSection="framework" />} /><Route path="/governance/family/stages" element={<FamilyGovernance onNavigate={onNavigate} activeSection="stages" />} /><Route path="/governance/family/academic" element={<FamilyGovernance onNavigate={onNavigate} activeSection="academic" />} />
      <Route path="/governance/digital" element={<ESGAI onNavigate={onNavigate} activeSection="intro" />} /><Route path="/governance/digital/features" element={<ESGAI onNavigate={onNavigate} activeSection="features" />} /><Route path="/governance/digital/console" element={<ESGAI onNavigate={onNavigate} activeSection="console" />} /><Route path="/governance/digital/academic" element={<ESGAI onNavigate={onNavigate} activeSection="academic" />} />
      <Route path="/governance/esgai" element={<Navigate to="/governance/digital" replace />} /><Route path="/digital-product-policy" element={<ServicePortal />} /><Route path="/contact.html" element={<ServicePortal />} /><Route path="/success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppFrame() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => { const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.2, lerp: 0.09 }); let frame = 0; const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); }; frame = requestAnimationFrame(raf); return () => { cancelAnimationFrame(frame); lenis.destroy(); }; }, []);
  useEffect(() => { const openAi = () => setChatOpen(true); const openContact = () => setShowContactModal(true); window.addEventListener("stt:open-ai", openAi); window.addEventListener("stt:open-contact", openContact); return () => { window.removeEventListener("stt:open-ai", openAi); window.removeEventListener("stt:open-contact", openContact); }; }, []);
  return <><PublicShell onContactOpen={() => setShowContactModal(true)} chatOpen={chatOpen} onChatToggle={() => setChatOpen((v) => !v)}><AppRoutes /></PublicShell>{showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}<ChatBot open={chatOpen} onClose={() => setChatOpen(false)} onContactOpen={() => setShowContactModal(true)} /></>;
}

export default function App() { return <BrowserRouter><AppFrame /></BrowserRouter>; }
