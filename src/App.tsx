import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, GraduationCap, Menu, Shield, Users, X } from "lucide-react";
import Lenis from "lenis";
import Home from "./pages/Home";
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
import ChatBot from "./components/ChatBot";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import { useI18n } from "./i18n/I18nProvider";

type LegacyNavigate = (page: string) => void;

type ShellProps = {
  children: ReactNode;
  onContactOpen: () => void;
  chatOpen: boolean;
  onChatToggle: () => void;
};

const legacyPathMap: Record<string, string> = {
  home: "/",
  about: "/institution/eric-chuang",
  columns: "/insights",
  books: "/books",
  papers: "/papers",
  gcsda: "/institution/gcsda",
  "article-index": "/insights/index",
  "service-portal": "/digital-product-policy",
  success: "/success",
  "internal-compliance": "/internal-compliance",
  "internal-compliance-pillars": "/internal-compliance/pillars",
  "internal-compliance-simulator": "/internal-compliance/simulator",
  "internal-compliance-academic": "/internal-compliance/academic",
  "internal-compliance-book": "/internal-compliance/publication",
  "corporate-governance": "/governance/corporate",
  "corporate-governance-modules": "/governance/corporate/modules",
  "corporate-governance-simulator": "/governance/corporate/simulator",
  "corporate-governance-academic": "/governance/corporate/academic",
  "family-governance": "/governance/family",
  "family-governance-framework": "/governance/family/framework",
  "family-governance-stages": "/governance/family/stages",
  "family-governance-academic": "/governance/family/academic",
  esgai: "/governance/esgai",
  "esg-ai": "/governance/esgai",
  "esgai-features": "/governance/esgai/features",
  "esg-ai-features": "/governance/esgai/features",
  "esgai-console": "/governance/esgai/console",
  "esg-ai-console": "/governance/esgai/console",
  "esgai-academic": "/governance/esgai/academic",
  "esg-ai-academic": "/governance/esgai/academic",
};

const homeAnchorMap: Record<string, string> = {
  hero: "hero",
  governance: "governance",
  positioning: "architecture",
  strategist: "authority",
  insights: "intelligence",
};

function useLegacyNavigate(): LegacyNavigate {
  const navigate = useNavigate();

  return (page: string) => {
    const anchor = homeAnchorMap[page];
    if (anchor) {
      navigate(`/#${anchor}`);
      return;
    }
    navigate(legacyPathMap[page] ?? "/");
  };
}

function PublicShell({ children, onContactOpen, chatOpen, onChatToggle }: ShellProps) {
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const exactHome = location.pathname === "/" || location.pathname === "/index.html";

  const primaryNavigation = useMemo(
    () => [
      { label: t("navigation.governance"), path: "/#governance" },
      { label: t("navigation.internalCompliance"), path: "/internal-compliance" },
      { label: t("navigation.digitalGovernance", "數位（AI）治理"), path: "/governance/esgai" },
      { label: t("navigation.pressInsights"), path: "/insights" },
    ],
    [t]
  );

  const secondaryNavigation = useMemo(
    () => [
      { label: t("navigation.institution"), path: "/institution/eric-chuang", icon: Shield },
      { label: t("home.intelligence.publications"), path: "/books", icon: BookOpen },
      { label: t("home.intelligence.research"), path: "/papers", icon: GraduationCap },
      { label: t("navigation.digitalGovernance", "數位（AI）治理"), path: "/governance/esgai", icon: Brain },
      { label: "GCSDA", path: "/institution/gcsda", icon: Users },
    ],
    [t]
  );

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  if (exactHome) {
    return (
      <div className="min-h-screen" style={{ background: "#fbfbfa", color: "var(--stt-ink)" }}>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--stt-canvas)", color: "var(--stt-ink)" }}>
      <header className="sticky top-0 z-[70] border-b bg-white/95 backdrop-blur-xl" style={{ borderColor: "var(--stt-line)", minHeight: "var(--stt-header-height)" }}>
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center px-5 lg:px-8">
          <button type="button" onClick={() => go("/")} className="mr-auto bg-transparent border-0 p-0 text-left cursor-pointer">
            <span className="block font-serif text-lg tracking-[0.06em]" style={{ color: "var(--stt-ink)" }}>STT Governance</span>
            <span className="mt-1 block text-[8px] tracking-[0.28em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>Strategic Think Tank</span>
          </button>

          <nav className="hidden xl:flex items-center h-full" aria-label="Primary">
            {primaryNavigation.map((item) => {
              const active = item.path.startsWith("/#") ? location.pathname === "/" : location.pathname.startsWith(item.path);
              return (
                <button key={item.path} type="button" onClick={() => go(item.path)} className="relative h-full bg-transparent border-0 px-5 text-[12px] tracking-[0.08em] cursor-pointer" style={{ color: active ? "var(--stt-gold-deep)" : "var(--stt-ink-soft)" }}>
                  {item.label}
                  {active && <span className="absolute bottom-0 left-5 right-5 h-px" style={{ background: "var(--stt-gold)" }} />}
                </button>
              );
            })}
          </nav>

          <div className="ml-4 hidden xl:flex items-center gap-3">
            <button type="button" onClick={onContactOpen} className="inline-flex items-center gap-2 border bg-transparent px-4 py-2.5 text-xs font-semibold cursor-pointer" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>
              {t("navigation.engagement")}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.3} />
            </button>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="w-10 h-10 inline-flex items-center justify-center bg-transparent border-0 cursor-pointer" aria-label={menuOpen ? t("common.close") : "Menu"}>
              {menuOpen ? <X className="w-5 h-5" strokeWidth={1.2} /> : <Menu className="w-5 h-5" strokeWidth={1.2} />}
            </button>
          </div>

          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="ml-3 w-10 h-10 inline-flex items-center justify-center bg-transparent border-0 cursor-pointer xl:hidden" aria-label={menuOpen ? t("common.close") : "Menu"}>
            {menuOpen ? <X className="w-5 h-5" strokeWidth={1.2} /> : <Menu className="w-5 h-5" strokeWidth={1.2} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-[76px] border-b bg-white shadow-[0_22px_50px_rgba(36,34,31,0.08)]" style={{ borderColor: "var(--stt-line)" }}>
            <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
              <div className="grid gap-px border bg-[var(--stt-line)] sm:grid-cols-2" style={{ borderColor: "var(--stt-line)" }}>
                {primaryNavigation.map((item, index) => (
                  <button key={item.path} type="button" onClick={() => go(item.path)} className="min-h-[110px] bg-white p-5 text-left cursor-pointer">
                    <span className="text-[10px] tracking-[0.16em]" style={{ color: "var(--stt-gold-deep)" }}>0{index + 1}</span>
                    <span className="mt-5 block font-serif text-lg">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {secondaryNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.path} type="button" onClick={() => go(item.path)} className="flex w-full items-center justify-between border-b bg-transparent px-2 py-3 text-left cursor-pointer" style={{ borderColor: "var(--stt-line)" }}>
                      <span className="flex items-center gap-3 text-sm" style={{ color: "var(--stt-ink-soft)" }}>
                        <Icon className="w-4 h-4" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
                        {item.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
                    </button>
                  );
                })}

                <button type="button" onClick={() => { setMenuOpen(false); onContactOpen(); }} className="mt-5 inline-flex items-center gap-2 border bg-[var(--stt-ivory)] px-4 py-3 text-sm cursor-pointer" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>
                  {t("navigation.engagement")}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-[60vh]">{children}</main>

      <footer className="border-t bg-white px-6 py-12 lg:px-8" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-serif text-xl tracking-[0.04em]">STT Governance</p>
            <p className="mt-3 max-w-[620px] text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>{t("home.hero.description")}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: "var(--stt-ink-muted)" }}>
            <button type="button" onClick={() => go("/insights")} className="bg-transparent border-0 p-0 cursor-pointer">{t("navigation.pressInsights")}</button>
            <button type="button" onClick={() => go("/institution/eric-chuang")} className="bg-transparent border-0 p-0 cursor-pointer">{t("navigation.institution")}</button>
            <button type="button" onClick={onContactOpen} className="bg-transparent border-0 p-0 cursor-pointer">{t("navigation.engagement")}</button>
          </div>
        </div>
      </footer>

      <AccessibilityWidget onChatOpen={onChatToggle} isChatOpen={chatOpen} />
    </div>
  );
}

function HomeRoute({ onNavigate }: { onNavigate: LegacyNavigate }) {
  const location = useLocation();
  const hash = location.hash.replace("#", "");
  const activeSection = hash === "governance" ? "governance" : hash === "architecture" ? "positioning" : hash === "authority" ? "strategist" : hash === "intelligence" ? "insights" : "hero";
  return <Home onNavigate={onNavigate} currentPage={hash === "governance" ? "governance" : "home"} activeSection={activeSection} />;
}

function AppRoutes({ onContactOpen }: { onContactOpen: () => void }) {
  const onNavigate = useLegacyNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomeRoute onNavigate={onNavigate} />} />
      <Route path="/index.html" element={<HomeRoute onNavigate={onNavigate} />} />
      <Route path="/governance.html" element={<Navigate to="/#governance" replace />} />

      <Route path="/insights" element={<Columns />} />
      <Route path="/insights.html" element={<Columns />} />
      <Route path="/insights/index" element={<ArticleIndex />} />
      <Route path="/books" element={<Books onNavigate={onNavigate} />} />
      <Route path="/papers" element={<Papers onNavigate={onNavigate} />} />

      <Route path="/institution/eric-chuang" element={<About />} />
      <Route path="/about.html" element={<About />} />
      <Route path="/institution/gcsda" element={<GCSDA onContactOpen={onContactOpen} />} />
      <Route path="/gcsda.html" element={<GCSDA onContactOpen={onContactOpen} />} />

      <Route path="/internal-compliance" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="intro" />} />
      <Route path="/internal-compliance/pillars" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="pillars" />} />
      <Route path="/internal-compliance/simulator" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="simulator" />} />
      <Route path="/internal-compliance/academic" element={<InternalCompliancePortal onNavigate={onNavigate} activeSection="academic" />} />
      <Route path="/internal-compliance/publication" element={<InternalComplianceBook onNavigate={onNavigate} />} />

      <Route path="/governance/corporate" element={<CorporateGovernance onNavigate={onNavigate} activeSection="intro" />} />
      <Route path="/governance/corporate/modules" element={<CorporateGovernance onNavigate={onNavigate} activeSection="modules" />} />
      <Route path="/governance/corporate/simulator" element={<CorporateGovernance onNavigate={onNavigate} activeSection="simulator" />} />
      <Route path="/governance/corporate/academic" element={<CorporateGovernance onNavigate={onNavigate} activeSection="academic" />} />

      <Route path="/governance/family" element={<FamilyGovernance onNavigate={onNavigate} activeSection="intro" />} />
      <Route path="/governance/family/framework" element={<FamilyGovernance onNavigate={onNavigate} activeSection="framework" />} />
      <Route path="/governance/family/stages" element={<FamilyGovernance onNavigate={onNavigate} activeSection="stages" />} />
      <Route path="/governance/family/academic" element={<FamilyGovernance onNavigate={onNavigate} activeSection="academic" />} />

      <Route path="/governance/esgai" element={<ESGAI onNavigate={onNavigate} activeSection="intro" />} />
      <Route path="/governance/esgai/features" element={<ESGAI onNavigate={onNavigate} activeSection="features" />} />
      <Route path="/governance/esgai/console" element={<ESGAI onNavigate={onNavigate} activeSection="console" />} />
      <Route path="/governance/esgai/academic" element={<ESGAI onNavigate={onNavigate} activeSection="academic" />} />

      <Route path="/digital-product-policy" element={<ServicePortal />} />
      <Route path="/contact.html" element={<ServicePortal />} />
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
    const runtimeWindow = window as unknown as { lenis?: Lenis };
    runtimeWindow.lenis = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      delete runtimeWindow.lenis;
    };
  }, []);

  useEffect(() => {
    const openAi = () => setChatOpen(true);
    const openContact = () => setShowContactModal(true);
    window.addEventListener("stt:open-ai", openAi);
    window.addEventListener("stt:open-contact", openContact);
    return () => {
      window.removeEventListener("stt:open-ai", openAi);
      window.removeEventListener("stt:open-contact", openContact);
    };
  }, []);

  return (
    <>
      <PublicShell onContactOpen={() => setShowContactModal(true)} chatOpen={chatOpen} onChatToggle={() => setChatOpen((value) => !value)}>
        <AppRoutes onContactOpen={() => setShowContactModal(true)} />
      </PublicShell>
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} onContactOpen={() => setShowContactModal(true)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}
