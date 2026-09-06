import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Landmark, Menu, Shield, Users, X } from "lucide-react";
import Lenis from "lenis";
import Home from "./pages/HomeCanonical";
import { ContactModal } from "./pages/About";
import GovernanceResponsibility from "./pages/GovernanceResponsibility";
import Columns from "./pages/Columns";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Start from "./pages/Start";
import Success from "./pages/Success";
import { HowWeJudge, PublicationsHub, ProjectsHub, STTPlatform } from "./pages/PublicCore";
import { DomainDetail, DomainsIndex } from "./pages/Domains";
import { BooksCanonical, InternalComplianceCanonical, ResearchCanonical } from "./pages/CanonicalLibrary";
import Legal from "./pages/Legal";
import ChatBot from "./components/ChatBot";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import { useI18n } from "./i18n/I18nProvider";

type ShellProps = { children: ReactNode; chatOpen: boolean; onChatToggle: () => void };

const GCSDA_URL = "https://stt-003-git-gcsda-approved-white-gold-v1-pc5888pc5888s-projects.vercel.app";

function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => { window.location.replace(url); }, [url]);
  return <div className="min-h-[50vh] bg-[#fbfaf7] px-6 py-24 text-center text-[#6f675e]">正在前往外部網站…</div>;
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
    { label: "關於 STT", path: "/stt" },
  ], []);

  const secondaryNavigation = useMemo(() => [
    { label: "治理知識領域", path: "/domains", icon: Landmark },
    { label: "治理責任｜莊鈞翔博士", path: "/institution/eric-chuang", icon: Shield },
    { label: "研究與論文", path: "/research", icon: GraduationCap },
    { label: "著作正典", path: "/books", icon: BookOpen },
    { label: "人文與治理記憶", path: "/projects", icon: Users },
  ], []);

  const go = (path: string) => { setMenuOpen(false); navigate(path); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openGcsda = () => { setMenuOpen(false); window.location.href = GCSDA_URL; };

  if (exactHome) return <div className="min-h-screen" style={{ background: "#fbfaf7", color: "var(--stt-ink)" }}><main>{children}</main><AccessibilityWidget onChatOpen={onChatToggle} isChatOpen={chatOpen} /></div>;

  return (
    <div className="min-h-screen" style={{ background: "#fbfaf7", color: "var(--stt-ink)" }}>
      <header className="sticky top-0 z-[70] border-b bg-white/95 backdrop-blur-xl" style={{ borderColor: "var(--stt-line)", minHeight: "var(--stt-header-height)" }}>
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center px-5 lg:px-8">
          <button type="button" onClick={() => go("/")} className="stt-official-brand mr-auto cursor-pointer border-0 bg-transparent p-0 text-left" aria-label="STT Governance 首頁">
            <img src="/首頁表頭logo.png" alt="STT Governance Strategic Think Tank Governance｜策略智庫｜治理出版｜法遵精神" className="stt-official-logo block h-auto w-auto object-contain" />
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
        {menuOpen && <div className="absolute left-0 right-0 top-[76px] border-b bg-white shadow-[0_22px_50px_rgba(36,34,31,0.08)]" style={{ borderColor: "var(--stt-line)" }}><div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"><div className="grid gap-px border bg-[var(--stt-line)] sm:grid-cols-2">{primaryNavigation.map((item, i) => <button key={item.path} type="button" onClick={() => go(item.path)} className="min-h-[106px] cursor-pointer bg-white p-5 text-left"><span className="text-[10px] tracking-[0.16em]" style={{ color: "var(--stt-gold-deep)" }}>0{i + 1}</span><span className="mt-5 block font-serif text-lg">{item.label}</span></button>)}</div><div className="space-y-2">{secondaryNavigation.map((item) => { const Icon = item.icon; return <button key={item.path} type="button" onClick={() => go(item.path)} className="flex w-full cursor-pointer items-center justify-between border-b bg-transparent px-2 py-3 text-left" style={{ borderColor: "var(--stt-line)" }}><span className="flex items-center gap-3 text-sm" style={{ color: "var(--stt-ink-soft)" }}><Icon className="h-4 w-4" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />{item.label}</span><ArrowRight className="h-3.5 w-3.5" strokeWidth={1.2} /></button>; })}<button type="button" onClick={openGcsda} className="flex w-full cursor-pointer items-center justify-between border-b bg-transparent px-2 py-3 text-left" style={{ borderColor: "var(--stt-line)", color: "var(--stt-ink-soft)" }}>GCSDA｜中華企業策略永續發展學會 <ArrowRight className="h-3.5 w-3.5"/></button><button type="button" onClick={() => go("/start")} className="mt-5 inline-flex cursor-pointer items-center gap-2 border bg-[var(--stt-ivory)] px-4 py-3 text-sm" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>開始<ArrowRight className="h-4 w-4" /></button></div></div></div>}
      </header>
      <main className="min-h-[60vh]">{children}</main>
      <footer className="border-t bg-white px-6 py-12 lg:px-8" style={{ borderColor: "var(--stt-line)" }}><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-serif text-xl tracking-[0.04em]">STT Governance</p><p className="mt-3 max-w-[620px] text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>把未來可能後悔的事情，提前帶到今天理解、判斷、安排與執行。</p></div><div className="flex max-w-[520px] flex-wrap justify-start gap-x-5 gap-y-3 text-xs md:justify-end" style={{ color: "var(--stt-ink-muted)" }}><button onClick={() => go("/problems")} className="border-0 bg-transparent">你正在面對什麼</button><button onClick={() => go("/domains")} className="border-0 bg-transparent">治理知識領域</button><button onClick={() => go("/institution/eric-chuang")} className="border-0 bg-transparent">治理責任</button><button onClick={openGcsda} className="border-0 bg-transparent">GCSDA ↗</button><button onClick={() => go("/legal/intellectual-property")} className="border-0 bg-transparent">智慧財產</button><button onClick={() => go("/legal/ai-disclosure")} className="border-0 bg-transparent">AI 使用揭露</button><button onClick={() => go("/legal/privacy")} className="border-0 bg-transparent">隱私</button></div></div></footer>
      <AccessibilityWidget onChatOpen={onChatToggle} isChatOpen={chatOpen} />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={() => undefined} />} />
      <Route path="/index.html" element={<Home onNavigate={() => undefined} />} />
      <Route path="/governance.html" element={<Navigate to="/problems" replace />} />

      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/:id" element={<ProblemDetail />} />
      <Route path="/how-stt-works" element={<HowWeJudge />} />
      <Route path="/domains" element={<DomainsIndex />} />
      <Route path="/domains/:slug" element={<DomainDetail />} />

      <Route path="/insights" element={<Columns />} />
      <Route path="/insights.html" element={<Navigate to="/insights" replace />} />
      <Route path="/insights/index" element={<Navigate to="/insights" replace />} />

      <Route path="/publications" element={<PublicationsHub />} />
      <Route path="/books" element={<BooksCanonical />} />
      <Route path="/books/internal-compliance" element={<InternalComplianceCanonical />} />
      <Route path="/research" element={<ResearchCanonical />} />
      <Route path="/papers" element={<Navigate to="/research" replace />} />

      <Route path="/projects" element={<ProjectsHub />} />
      <Route path="/stt" element={<STTPlatform />} />
      <Route path="/institution/eric-chuang" element={<GovernanceResponsibility />} />
      <Route path="/about.html" element={<Navigate to="/institution/eric-chuang" replace />} />
      <Route path="/start" element={<Start />} />

      <Route path="/institution/gcsda" element={<ExternalRedirect url={GCSDA_URL} />} />
      <Route path="/gcsda.html" element={<ExternalRedirect url={GCSDA_URL} />} />

      <Route path="/internal-compliance" element={<Navigate to="/books/internal-compliance" replace />} />
      <Route path="/internal-compliance/pillars" element={<Navigate to="/books/internal-compliance" replace />} />
      <Route path="/internal-compliance/simulator" element={<Navigate to="/domains/compliance-contract" replace />} />
      <Route path="/internal-compliance/academic" element={<Navigate to="/books/internal-compliance" replace />} />
      <Route path="/internal-compliance/publication" element={<Navigate to="/books/internal-compliance" replace />} />

      <Route path="/governance/corporate" element={<Navigate to="/domains/corporate-governance" replace />} />
      <Route path="/governance/corporate/modules" element={<Navigate to="/domains/corporate-governance" replace />} />
      <Route path="/governance/corporate/simulator" element={<Navigate to="/domains/corporate-governance" replace />} />
      <Route path="/governance/corporate/academic" element={<Navigate to="/domains/corporate-governance" replace />} />

      <Route path="/governance/family" element={<Navigate to="/domains/family-succession" replace />} />
      <Route path="/governance/family/framework" element={<Navigate to="/domains/family-succession" replace />} />
      <Route path="/governance/family/stages" element={<Navigate to="/domains/family-succession" replace />} />
      <Route path="/governance/family/academic" element={<Navigate to="/domains/family-succession" replace />} />

      <Route path="/governance/digital" element={<Navigate to="/domains/human-ai-governance" replace />} />
      <Route path="/governance/digital/features" element={<Navigate to="/domains/human-ai-governance" replace />} />
      <Route path="/governance/digital/console" element={<Navigate to="/domains/human-ai-governance" replace />} />
      <Route path="/governance/digital/academic" element={<Navigate to="/domains/human-ai-governance" replace />} />
      <Route path="/governance/esgai" element={<Navigate to="/domains/human-ai-governance" replace />} />

      <Route path="/legal" element={<Navigate to="/legal/intellectual-property" replace />} />
      <Route path="/legal/:slug" element={<Legal />} />
      <Route path="/digital-product-policy" element={<Navigate to="/legal/digital-content-policy" replace />} />
      <Route path="/contact.html" element={<Navigate to="/start" replace />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppFrame() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.2, lerp: 0.09 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const openAi = () => setChatOpen(true);
    const openContact = () => setShowContactModal(true);
    window.addEventListener("stt:open-ai", openAi);
    window.addEventListener("stt:open-contact", openContact);
    return () => { window.removeEventListener("stt:open-ai", openAi); window.removeEventListener("stt:open-contact", openContact); };
  }, []);

  return <><PublicShell chatOpen={chatOpen} onChatToggle={() => setChatOpen((v) => !v)}><AppRoutes /></PublicShell>{showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}<ChatBot open={chatOpen} onClose={() => setChatOpen(false)} onContactOpen={() => setShowContactModal(true)} /></>;
}

export default function App() { return <BrowserRouter><AppFrame /></BrowserRouter>; }
