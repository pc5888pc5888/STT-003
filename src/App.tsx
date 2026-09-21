import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Lenis from "lenis";
import Home from "./pages/HomeCanonical";
import Columns from "./pages/Columns";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Start from "./pages/Start";
import Success from "./pages/Success";
import { HowWeJudge, ProjectsHub } from "./pages/PublicCore";
import { DomainDetail, DomainsIndex } from "./pages/Domains";
import { BooksCanonical, InternalComplianceCanonical, ResearchCanonical } from "./pages/CanonicalLibrary";
import Legal from "./pages/Legal";
import { STT_OFFICIAL_LOGO_SRC } from "./sttLogo";

type ShellProps = { children: ReactNode };

const GCSDA_URL = "https://stt-003-git-gcsda-approved-white-gold-v1-pc5888pc5888s-projects.vercel.app";
const HUMANISTIC_INTERVIEW_URL = "/humanistic-interview/";
const STT_PRESS_URL = "https://sttpress.my.canva.site/dahakyytby8";

const PRIMARY_NAVIGATION = [
  { label: "你正在面對什麼", path: "/problems" },
  { label: "STT 如何判讀", path: "/how-stt-works" },
  { label: "治理委任", path: "/engagement" },
  { label: "研究與出版", path: "/insights" },
  { label: "關於 STT", path: "/about" },
] as const;

const SECONDARY_NAVIGATION = [
  { label: "莊鈞翔博士", path: "/eric-chuang" },
  { label: "機構合作", path: "/institutions" },
] as const;

function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => { window.location.replace(url); }, [url]);
  return <div className="stt-g0-redirect">正在前往外部頁面…</div>;
}

function GatePending({ gate, title }: { gate: string; title: string }) {
  return (
    <section className="stt-g0-gate" aria-labelledby="g0-gate-title">
      <div className="stt-g0-gate__inner">
        <p className="stt-g0-kicker">G0 PREVIEW · ROUTE ESTABLISHED</p>
        <h1 id="g0-gate-title">{title}</h1>
        <p>此路由已納入正式網站骨架；正文內容刻意保留至 {gate} Gate 依已核准 Page Specification 施工。</p>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="stt-g0-gate" aria-labelledby="not-found-title">
      <div className="stt-g0-gate__inner">
        <p className="stt-g0-kicker">404</p>
        <h1 id="not-found-title">找不到這個頁面。</h1>
        <p>這個網址不在目前的 STT Governance 正式路由中。</p>
        <div className="stt-g0-gate__actions">
          <Link to="/">回到首頁</Link>
          <Link to="/start">開始治理判讀</Link>
        </div>
      </div>
    </section>
  );
}

function PublicShell({ children }: ShellProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="stt-g0-shell">
      <header className="stt-g0-header">
        <div className="stt-g0-header__inner">
          <Link to="/" className="stt-g0-brand" aria-label="STT Governance 首頁">
            <img src={STT_OFFICIAL_LOGO_SRC} alt="STT Governance" />
          </Link>

          <nav className="stt-g0-desktop-nav" aria-label="主要導覽">
            {PRIMARY_NAVIGATION.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `stt-g0-nav-link${isActive ? " is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/start" className="stt-g0-primary-cta">
            開始治理判讀
          </Link>

          <button
            type="button"
            className="stt-g0-menu-button"
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            aria-controls="stt-g0-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <nav id="stt-g0-mobile-menu" className="stt-g0-mobile-menu" aria-label="行動版導覽">
            <div className="stt-g0-mobile-menu__inner">
              <div className="stt-g0-mobile-menu__primary">
                {PRIMARY_NAVIGATION.map((item, index) => (
                  <NavLink key={item.path} to={item.path}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.label}</strong>
                  </NavLink>
                ))}
              </div>
              <div className="stt-g0-mobile-menu__secondary">
                {SECONDARY_NAVIGATION.map((item) => (
                  <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      <main className="stt-g0-main">{children}</main>

      <footer className="stt-g0-footer">
        <div className="stt-g0-footer__inner">
          <div className="stt-g0-footer__brand">
            <strong>STT Governance</strong>
            <span>治理判讀與制度設計</span>
          </div>

          <nav className="stt-g0-footer__links" aria-label="頁尾導覽">
            <Link to="/eric-chuang">莊鈞翔博士</Link>
            <Link to="/institutions">機構合作</Link>
            <Link to="/research">研究與論文</Link>
            <a href={STT_PRESS_URL} target="_blank" rel="noreferrer">STT Press ↗</a>
            <a href={GCSDA_URL} target="_blank" rel="noreferrer">GCSDA｜中華企業策略永續發展學會 ↗</a>
            <Link to="/privacy">隱私</Link>
            <Link to="/professional-boundary">專業服務邊界</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={() => undefined} />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/governance.html" element={<Navigate to="/problems" replace />} />

      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/:id" element={<ProblemDetail />} />
      <Route path="/how-stt-works" element={<HowWeJudge />} />

      <Route path="/engagement" element={<GatePending gate="G4" title="治理委任" />} />
      <Route path="/insights" element={<Columns />} />
      <Route path="/about" element={<GatePending gate="G5" title="關於 STT Governance" />} />
      <Route path="/eric-chuang" element={<GatePending gate="G5" title="莊鈞翔博士" />} />
      <Route path="/institutions" element={<GatePending gate="G7" title="機構合作" />} />
      <Route path="/start" element={<Start />} />
      <Route path="/privacy" element={<GatePending gate="G8" title="隱私與資料使用" />} />
      <Route path="/professional-boundary" element={<GatePending gate="G8" title="專業服務邊界" />} />

      <Route path="/research" element={<ResearchCanonical />} />
      <Route path="/books" element={<BooksCanonical />} />
      <Route path="/books/internal-compliance" element={<InternalComplianceCanonical />} />

      <Route path="/domains" element={<DomainsIndex />} />
      <Route path="/domains/:slug" element={<DomainDetail />} />
      <Route path="/projects" element={<ProjectsHub />} />
      <Route path="/success" element={<Success />} />

      <Route path="/publications" element={<Navigate to="/insights" replace />} />
      <Route path="/insights.html" element={<Navigate to="/insights" replace />} />
      <Route path="/insights/index" element={<Navigate to="/insights" replace />} />
      <Route path="/papers" element={<Navigate to="/research" replace />} />
      <Route path="/stt" element={<Navigate to="/about" replace />} />
      <Route path="/about.html" element={<Navigate to="/about" replace />} />
      <Route path="/institution/eric-chuang" element={<Navigate to="/eric-chuang" replace />} />
      <Route path="/cooperation" element={<Navigate to="/engagement" replace />} />
      <Route path="/contact.html" element={<Navigate to="/start" replace />} />

      <Route path="/humanistic-20q" element={<ExternalRedirect url={HUMANISTIC_INTERVIEW_URL} />} />
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
      <Route path="/legal/privacy" element={<Navigate to="/privacy" replace />} />
      <Route path="/legal/ai-usage-disclosure" element={<Navigate to="/legal/ai-disclosure" replace />} />
      <Route path="/legal/:slug" element={<Legal />} />
      <Route path="/digital-product-policy" element={<Navigate to="/legal/digital-content-policy" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppFrame() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.2, lerp: 0.09 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return <PublicShell><AppRoutes /></PublicShell>;
}

export default function App() {
  return <BrowserRouter><AppFrame /></BrowserRouter>;
}
