import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import { STT_OFFICIAL_LOGO_SRC } from "../sttLogo";
import { applyGovernedMetadata } from "../seo";

const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";

const EN_NAVIGATION = [
  { label: "What You’re Facing", path: "/en/problems" },
  { label: "How STT Works", path: "/en/how-stt-works" },
  { label: "Governance Engagement", path: "/en/engagement" },
  { label: "Research & Publications", path: "/en/insights" },
  { label: "Eric Chuang, Ph.D.", path: "/eric-chuang" },
  { label: "Interviewee Area", path: "/humanistic-interview/" },
  { label: "About STT", path: "/en/about" },
] as const;

const EN_TO_ZH: Record<string, string> = {
  "/en": "/",
  "/en/": "/",
  "/en/problems": "/problems",
  "/en/insights": "/insights",
  "/en/how-stt-works": "/how-stt-works",
  "/en/engagement": "/engagement",
  "/en/about": "/about",
  "/en/start": "/start",
};

const EN_TO_JA: Record<string, string> = {
  "/en": "/ja",
  "/en/": "/ja",
  "/en/problems": "/ja/problems",
  "/en/insights": "/ja/insights",
  "/en/how-stt-works": "/ja/how-stt-works",
  "/en/engagement": "/ja/engagement",
  "/en/about": "/ja/about",
  "/en/start": "/ja/start",
};

const EN_TO_KO: Record<string, string> = {
  "/en": "/ko",
  "/en/": "/ko",
  "/en/problems": "/ko/problems",
  "/en/insights": "/ko/insights",
  "/en/how-stt-works": "/ko/how-stt-works",
  "/en/engagement": "/ko/engagement",
  "/en/about": "/ko/about",
  "/en/start": "/ko/start",
};

export function EnglishShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const zhPath = EN_TO_ZH[location.pathname] ?? "/";
  const jaPath = EN_TO_JA[location.pathname] ?? "/ja";
  const koPath = EN_TO_KO[location.pathname] ?? "/ko";

  useEffect(() => {
    setMenuOpen(false);
    applyGovernedMetadata(location.pathname);
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className="stt-g0-shell stt-en-shell">
      <a className="site-skip-link" href="#main-content">Skip to main content</a>
      <header className="stt-g0-header">
        <div className="stt-g0-header__inner">
          <Link to="/en" className="stt-g0-brand" aria-label="STT Governance English home">
            <img src={STT_OFFICIAL_LOGO_SRC} alt="STT Governance" />
          </Link>
          <nav className="stt-g0-desktop-nav" aria-label="Primary navigation">
            {EN_NAVIGATION.map((item) => (
              <NavLink key={item.path} to={item.path} reloadDocument={item.path === "/humanistic-interview/"} className={({ isActive }) => `stt-g0-nav-link${isActive ? " is-active" : ""}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/en/start" className="stt-g0-primary-cta">Start a Governance Review</Link>
          <div className="stt-g0-lang-cluster" aria-label="Language switcher">
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW" aria-label="切換至繁體中文">繁中</Link>
          <Link to={jaPath} hrefLang="ja" lang="ja" aria-label="日本語に切り替える">日本語</Link>
          <Link to={koPath} hrefLang="ko" lang="ko" aria-label="한국어로 전환">한국어</Link>
        </div>
          <button type="button" className="stt-g0-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="stt-en-mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav id="stt-en-mobile-menu" className="stt-g0-mobile-menu" aria-label="Mobile navigation">
            <div className="stt-g0-mobile-menu__inner">
              <div className="stt-g0-mobile-menu__primary">
                {EN_NAVIGATION.map((item, index) => (
                  <NavLink key={item.path} to={item.path} reloadDocument={item.path === "/humanistic-interview/"}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong></NavLink>
                ))}
              </div>
              <div className="stt-g0-mobile-menu__secondary">
                <Link to="/en/start">Start a Governance Review</Link>
                <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁體中文</Link>
                <Link to={jaPath} hrefLang="ja" lang="ja">日本語</Link>
            <Link to={koPath} hrefLang="ko" lang="ko">한국어</Link>
                <Link to={koPath} hrefLang="ko" lang="ko">한국어</Link>
              </div>
            </div>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1} className="stt-g0-main">{children}</main>
      <footer className="stt-g0-footer">
        <div className="stt-g0-footer__inner">
          <div className="stt-g0-footer__brand">
            <strong>STT Governance｜策略智庫智慧治理</strong>
            <span>Governance Judgment & Institutional Design</span>
          </div>
          <nav className="stt-g0-footer__links" aria-label="Footer navigation">
            <Link to="/en/how-stt-works">How STT Works</Link>
            <Link to="/en/engagement">Governance Engagement</Link>
            <Link to="/en/about">About STT</Link>
            <Link to="/en/start">Start a Governance Review</Link>
            <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer">STT Official LINE ↗</a>
            <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">Traditional Chinese site</Link>
            <Link to={jaPath} hrefLang="ja" lang="ja">日本語</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Section({ kicker, title, children, id }: { kicker?: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section className="stt-inst-section stt-en-section" id={id}>
      <div className="stt-inst-shell">
        {kicker && <p className="stt-inst-kicker">{kicker}</p>}
        <h2>{title}</h2>
        <div className="stt-inst-body">{children}</div>
      </div>
    </section>
  );
}

export function EnglishHome() {
  return (
    <div className="stt-inst-page stt-en-page">
      <UnifiedTitleHero
        kicker="STT GOVERNANCE · JUDGMENT · INSTITUTIONAL DESIGN"
        title="Make important decisions governable before they become irreversible."
        lead="STT Governance helps enterprises, families and major decision-makers clarify the real problem, evidence, authority, accountability and viable options before action is taken, then builds a governance structure whose authority, reasoning and accountability can be carried forward and traced."
        image="/visual-bank/stt/user-approved-six/home.png"
        imagePosition="center right"
        id="en-home-title"
      >
        <Link to="/en/how-stt-works">Understand how STT works →</Link>
        <Link className="cis-primary" to="/en/start">Start a governance review</Link>
      </UnifiedTitleHero>

      <Section kicker="START FROM THE REAL PROBLEM" title="Some situations should not move directly into solutions.">
        <div className="stt-inst-grid stt-en-situation-grid">
          <article><strong>Family & Succession</strong><p>Leadership is being handed over, but authority, ownership or family expectations have not actually been aligned.</p><Link to="/en/start?route=succession">Describe this situation →</Link></article>
          <article><strong>Ownership & Authority</strong><p>Shareholding, board authority, family influence and management control are beginning to pull in different directions.</p><Link to="/en/start?route=family-ownership">Describe this situation →</Link></article>
          <article><strong>Major Decisions</strong><p>A strategic cooperation, investment, disposal or dispute is approaching an irreversible point.</p><Link to="/en/start?route=major-decision">Describe this situation →</Link></article>
          <article><strong>AI & Decision Governance</strong><p>AI has entered a decision process, but authorization, accountability, evidence and human control remain unclear.</p><Link to="/en/start?route=ai-governance">Describe this situation →</Link></article>
        </div>
      </Section>

      <Section kicker="GOVERNANCE JUDGMENT" title="STT does not begin by giving more opinions.">
        <p>Governance judgment begins by defining the event, identifying who has authority and who bears consequences, testing the evidence, setting hard stops, comparing viable options and documenting why a decision can or cannot proceed.</p>
        <div className="stt-en-process-line" aria-label="Seven-stage governance judgment process">
          <span>Event</span><span>Authority</span><span>Evidence</span><span>Hard Stop</span><span>Options</span><span>Judgment</span><span>Governance</span>
        </div>
        <Link to="/en/how-stt-works">View the seven-stage process →</Link>
      </Section>

      <Section kicker="HUMAN AUTHORITY" title="AI can strengthen the staff function. It does not become the governing authority.">
        <p>AI may support research, comparison, tracking and working drafts. Whether evidence is accepted, authority is granted, action is permitted and consequences are assumed remains a human governance responsibility.</p>
        <Link to="/en/about">About STT Governance →</Link>
      </Section>
    </div>
  );
}

const METHOD_STEPS = [
  { number: "01", id: "event-definition", title: "Event Definition", input: "Statements, timeline and known constraints.", question: "What actually happened, and what is only a position, description or symptom?", output: "Event frame, problem statement and matters requiring confirmation." },
  { number: "02", id: "stakeholder-authority", title: "Stakeholders & Authority", input: "People, entities, ownership, office, contracts and actual control.", question: "Who can decide, veto or access information, and who bears the consequences?", output: "Stakeholder & Authority Map." },
  { number: "03", id: "evidence", title: "Evidence", input: "Documents, records, rules, contracts, financial information and other verifiable facts.", question: "What is fact, what is assumption, and what could overturn the current conclusion?", output: "Evidence ledger, gaps and propositions requiring proof." },
  { number: "04", id: "hard-stop", title: "Hard Stop", input: "Legal, trust, financial, reputational, governance and irreversible risks.", question: "Which outcomes would be unacceptable or exceptionally difficult to reverse?", output: "Hard stops, risk thresholds and prohibited conditions." },
  { number: "05", id: "options", title: "Options", input: "Feasible paths, conditions and constraints.", question: "Which options should be excluded first, and what does each remaining option cost?", output: "Option matrix and conditional paths." },
  { number: "06", id: "judgment", title: "Governance Judgment", input: "The event, authority, evidence, hard stops and options.", question: "What can be done now, what cannot, and under what conditions can action proceed?", output: "Decision Memo and, where appropriate, GO / CONDITIONAL GO / HOLD / NO-GO judgment." },
  { number: "07", id: "governance", title: "Governance Implementation", input: "Confirmed judgment, responsibilities and follow-up measures.", question: "How does the judgment become durable authority, process, documentation and follow-up?", output: "Governance architecture, policy record and accountability tracking." },
] as const;

export function EnglishMethod() {
  return (
    <div className="stt-g3-method stt-en-page">
      <UnifiedTitleHero
        kicker="GOVERNANCE JUDGMENT"
        title="How STT makes governance judgments"
        lead="STT does not rush to an answer. It returns first to the structure of the event: whether the problem is properly defined, whether the evidence is sufficient, whether authority has crossed its proper boundaries, who bears responsibility, and whether the risk remains reversible."
        id="en-method-title"
      />
      <nav className="stt-g3-index" aria-label="Seven-stage governance judgment process">
        <div className="stt-g3-shell stt-g3-index__grid">
          {METHOD_STEPS.map((step) => <a key={step.id} href={"#" + step.id}><span>{step.number}</span><strong>{step.title}</strong></a>)}
        </div>
      </nav>
      <section className="stt-g3-section stt-g3-foundations">
        <div className="stt-g3-shell">
          <p className="stt-g3-kicker">JUDGMENT FOUNDATIONS</p>
          <h2>Four dimensions keep a major judgment defensible.</h2>
          <p className="stt-g3-foundations__intro">Problem, Evidence, Trade-off, and Authority & Accountability are not separate services. They are the four foundations that must be tested together in every governance judgment.</p>
          <div className="stt-g3-foundation-grid">
            {[["01","Problem","The real problem"],["02","Evidence","Reliable evidence"],["03","Trade-off","Costs and trade-offs"],["04","Authority & Accountability","Who may decide; who is accountable"]].map(([number,en,desc]) => (
              <article key={number}><span>{number}</span><small>{en}</small><h3>{desc}</h3></article>
            ))}
          </div>
        </div>
      </section>
      <section className="stt-g3-section stt-g3-process">
        <div className="stt-g3-shell">
          <p className="stt-g3-kicker">SEVEN-STAGE JUDGMENT PROCESS</p>
          <h2>A governance judgment is not merely an answer. It is a traceable decision process.</h2>
          <div className="stt-g3-steps">
            {METHOD_STEPS.map((step) => (
              <article className="stt-g3-step" id={step.id} key={step.id}>
                <div className="stt-g3-step__number">{step.number}</div>
                <header><small>{step.title.toUpperCase()}</small><h3>{step.title}</h3></header>
                <dl>
                  <div><dt>Input</dt><dd>{step.input}</dd></div>
                  <div><dt>Core question</dt><dd>{step.question}</dd></div>
                  <div><dt>Output</dt><dd>{step.output}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="stt-g3-section stt-g3-ai-boundary">
        <div className="stt-g3-shell stt-g3-ai-boundary__grid">
          <div><p className="stt-g3-kicker">AI GOVERNANCE BOUNDARY</p><h2>AI is governance staff and operating-system support, not the governing subject.</h2></div>
          <div><p>AI may organize, compare, track and identify inconsistencies. Acceptance of evidence, authorization and execution remain with human decision-makers and the governance process. Sensitive case data is not presumed suitable for AI use.</p><Link to="/en/engagement">Understand governance engagement →</Link></div>
        </div>
      </section>
    </div>
  );
}

const ENGAGEMENTS = [
  { code: "GOVERNANCE REVIEW", title: "Initial Governance Review", fit: "A major event has not yet been fully defined, or relevant parties hold conflicting views.", role: "Frame the event, stakeholders, authority, evidence gaps, irreversible risks and the next path.", outputs: "Governance Dossier / Decision Brief / next-step information list.", excludes: "Legal opinions, statutory accounting, tax, investment or other regulated professional work, and continuing engagement unless separately agreed." },
  { code: "GOVERNANCE ARCHITECTURE", title: "Governance Architecture", fit: "The issue crosses family, ownership, corporate governance, contracts, professional tools or departmental authority.", role: "Place individual professional tools back into the overall governance purpose and design the institutional, authority, process and professional-collaboration structure.", outputs: "Governance Architecture / Role & Authority Map / Decision Rules / scoped external professional work packages.", excludes: "Execution of legal, tax, audit, investment or other work that must be performed by an appropriately authorized professional." },
  { code: "GOVERNANCE MANDATE", title: "Annual Governance Mandate", fit: "An enterprise or family repeatedly faces major decisions, succession, governance transition or multiple interlocking events.", role: "Establish decision gates for major matters, periodic governance reviews, major-decision judgment, policy and evidence records, and necessary professional coordination.", outputs: "Annual Governance Protocol / Decision Memo / Evidence & Policy Record / governance follow-up.", excludes: "Unlimited on-demand consulting, round-the-clock private customer service or blanket outsourcing of professional functions." },
] as const;

export function EnglishEngagement() {
  return (
    <div className="stt-g4-engagement stt-en-page">
      <UnifiedTitleHero
        kicker="GOVERNANCE ENGAGEMENT"
        title="When an issue deserves formal governance, it should not remain a one-off consultation."
        lead="STT engages at different depths according to complexity, decision level and duration: initial governance review, governance architecture and annual governance mandate. The depth of engagement should match the cost of getting the decision wrong."
        id="en-engagement-title"
      />
      <nav className="stt-g4-index" aria-label="Three levels of governance engagement">
        <div className="stt-g4-shell stt-g4-index__grid">
          {ENGAGEMENTS.map((item,index) => <a key={item.code} href={"#en-engagement-"+index}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><small>{item.code}</small></a>)}
        </div>
      </nav>
      <div className="stt-g4-engagements">
        {ENGAGEMENTS.map((item,index) => (
          <section className="stt-g4-engagement-row" id={"en-engagement-"+index} key={item.code}>
            <div className="stt-g4-shell stt-g4-engagement-row__grid">
              <div className="stt-g4-engagement-row__head"><span>{String(index+1).padStart(2,"0")}</span><p>{item.code}</p><h2>{item.title}</h2></div>
              <dl className="stt-g4-engagement-row__body">
                <div><dt>Best fit</dt><dd>{item.fit}</dd></div>
                <div><dt>STT's role</dt><dd>{item.role}</dd></div>
                <div><dt>Typical outputs</dt><dd>{item.outputs}</dd></div>
                <div><dt>Not included</dt><dd>{item.excludes}</dd></div>
              </dl>
              <div className="stt-g4-engagement-row__cta"><Link to="/en/start">Start a governance review →</Link></div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function EnglishAbout() {
  return (
    <div className="stt-inst-page stt-en-page">
      <UnifiedTitleHero
        kicker="ABOUT STT GOVERNANCE"
        title="STT Governance is a high-level governance platform, not a conventional consulting firm."
        subtitle="The objective is not to add more opinions. It is to establish an order of governance that can bear consequences."
        lead="STT Governance focuses on major decisions, enterprise governance and family governance. When strategy, authority, evidence, accountability, compliance or family relationships intersect, STT first constructs the governance structure, then brings the appropriate professional tools into that structure."
        image="/visual-bank/stt/user-approved-six/about-stt.png"
        imagePosition="center right"
        id="en-about-title"
      />
      <Section kicker="POSITION" title="STT addresses governance questions that sit above individual professional disciplines.">
        <p>Legal, financial, trust, AI and strategic tools are not treated as isolated products. STT first clarifies the governance purpose, authority boundaries, evidence base and unacceptable risks, then determines which professional tools are needed and how they should serve the same decision.</p>
        <Link to="/en/how-stt-works">How STT works →</Link>
      </Section>
      <Section kicker="ECOSYSTEM" title="One governance platform, distinct functions.">
        <div className="stt-inst-grid">
          <article><strong>STT Governance</strong><p>The core platform for governance intake, judgment and final institutional integration.</p></article>
          <article><strong>ESGAI</strong><p>Governance operating-system and staff support for evidence, policy and decision workflows. It is not a parallel brand or an autonomous decision-maker.</p></article>
          <article><strong>STT Press</strong><p>Publishing and governance texts.</p></article>
          <article><strong>STT Intelligence</strong><p>Research, judgment and long-term knowledge assets.</p></article>
          <article><strong>GCSDA</strong><p>An independent organization operating on its own institutional website and responsibility boundary.</p></article>
        </div>
      </Section>
      <Section kicker="HUMAN AUTHORITY" title="Technology may expand. Decision sovereignty cannot be outsourced.">
        <p>AI can significantly increase the efficiency of research, comparison, tracking and working drafts. Ultimate decision-making, authorization and responsibility for consequences remain with human decision-makers and the governance process.</p>
        <Link to="/en/start">Start a governance review →</Link>
      </Section>
    </div>
  );
}

type IntakeData = {
  name: string;
  contact: string;
  role: string;
  situation: string;
  undesired: string;
  desired: string;
  deadline_status: "" | "無" | "有";
  deadline_date: string;
  event_type: string;
  "bot-field": string;
};

const EMPTY_DATA: IntakeData = { name:"", contact:"", role:"", situation:"", undesired:"", desired:"", deadline_status:"", deadline_date:"", event_type:"", "bot-field":"" };
const ROLE_OPTIONS = [
  { value: "企業主", label: "Business owner" },
  { value: "家族成員", label: "Family member" },
  { value: "董事", label: "Director / board member" },
  { value: "經理人", label: "Executive / manager" },
  { value: "專業顧問", label: "Professional adviser" },
  { value: "其他", label: "Other" },
] as const;
const EVENT_OPTIONS = [
  { value: "重大決策", label: "Major decision" },
  { value: "家族接班", label: "Family succession" },
  { value: "股權治理", label: "Ownership governance" },
  { value: "AI 治理", label: "AI governance" },
  { value: "機構合作", label: "Institutional cooperation" },
  { value: "其他", label: "Other" },
] as const;
const ROUTE_DEFAULTS: Record<string,string> = {
  "major-decision":"重大決策",
  "owner-dependence":"重大決策",
  succession:"家族接班",
  "family-ownership":"股權治理",
  "strategic-legal":"重大決策",
  "ai-governance":"AI 治理",
  "system-failure":"重大決策",
  "founder-legacy":"家族接班",
};

export function EnglishStart() {
  const [searchParams] = useSearchParams();
  const requestKey = useRef("");
  const inFlight = useRef(false);
  const [data,setData] = useState<IntakeData>(EMPTY_DATA);
  const [submitted,setSubmitted] = useState(false);
  const [receiptId,setReceiptId] = useState("");
  const [sending,setSending] = useState(false);
  const [sendError,setSendError] = useState("");

  useEffect(() => {
    requestKey.current = "";
    const type = searchParams.get("type");
    const route = searchParams.get("route");
    const eventType = type === "institution" ? "機構合作" : route ? (ROUTE_DEFAULTS[route] ?? "") : "";
    setData({ ...EMPTY_DATA, event_type:eventType });
    setSubmitted(false);
    setReceiptId("");
    setSendError("");
  }, [searchParams]);

  const update = <K extends keyof IntakeData>(key:K,value:IntakeData[K]) => {
    requestKey.current = "";
    setData(current => ({ ...current, [key]:value }));
  };

  const submit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    setSendError("");
    if ([data.name,data.contact,data.situation,data.undesired,data.desired].some(value => !value.trim())) {
      setSendError("Please complete the required fields. Entries cannot contain only whitespace.");
      return;
    }
    if (data.deadline_status === "有" && !data.deadline_date) {
      setSendError("Please provide the decision deadline date.");
      return;
    }
    inFlight.current = true;
    requestKey.current ||= crypto.randomUUID();
    setSending(true);
    try {
      const response = await fetch("/api/cooperation-submit", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Idempotency-Key":requestKey.current },
        signal:AbortSignal.timeout(20000),
        body:JSON.stringify({
          route:"governance-intake",
          route_label:"Governance Intake (English)",
          ...data,
          source_channel:searchParams.get("utm_source") === "line" ? "line" : "website",
          source_account:"stt",
          landing_route:"/en/start",
          utm_source:(searchParams.get("utm_source") || "").slice(0,80),
          utm_medium:(searchParams.get("utm_medium") || "").slice(0,80),
          utm_campaign:(searchParams.get("utm_campaign") || "").slice(0,120),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || result.delivery !== "resend-email") throw new Error("delivery_failed");
      setReceiptId(String(result.receiptId || ""));
      setSubmitted(true);
      window.scrollTo({ top:0, behavior:"smooth" });
    } catch {
      setSendError("Submission was not completed. Your entries remain on this page so you can review and try again.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="stt-intake-page stt-en-page bg-[#fbfaf7] text-[#26231f]">
        <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="Submission received" lead="STT will first determine whether the situation is suitable for a governance process and what additional non-sensitive information may be needed. A successful email delivery does not by itself establish a formal engagement." id="en-start-success-title" />
        <section className="px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[900px] border-t border-[#d8c8ad] pt-8">
            {receiptId && <p role="status" className="text-sm text-[#8f693d]">Receipt ID｜{receiptId}</p>}
            <button type="button" onClick={() => setSubmitted(false)} className="mt-7 border border-[#b8925d] bg-transparent px-5 py-3 text-sm text-[#8f693d]">Return to the intake form</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="stt-intake-page stt-en-page bg-[#fbfaf7] text-[#26231f]">
      <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="Begin by describing what is actually happening." lead="Tell STT what is happening now, what outcome you most want to avoid, and what state you hope to achieve if the matter is handled properly." id="en-start-title" />
      <section className="stt-intake-brief">
        <div>
          <strong>The first submission is for problem framing and next-step triage.</strong>
          <p>This page does not provide an immediate legal conclusion and does not require large amounts of sensitive information. Do not submit identity documents, financial account credentials, medical information, complete trade secrets or other unnecessary highly sensitive data.</p>
        </div>
      </section>
      <section className="px-6 py-12 lg:px-10 lg:py-18" id="intake-form">
        <form onSubmit={submit} aria-busy={sending} className="mx-auto max-w-[980px]">
          <fieldset disabled={sending} className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">Governance intake information</legend>
            <div className="border-t border-[#d8c8ad]">
              <EnTextField number="01" label="Name or preferred form of address" value={data.name} onChange={(v)=>update("name",v)} required />
              <EnTextField number="02" label="Email or other contact method that can receive a reply" value={data.contact} onChange={(v)=>update("contact",v)} required />
              <EnSelectField number="03" label="Your role in this matter" value={data.role} onChange={(v)=>update("role",v)} options={ROLE_OPTIONS} required />
              <EnTextAreaField number="04" label="What is happening now?" value={data.situation} onChange={(v)=>update("situation",v)} required />
              <EnTextAreaField number="05" label="What outcome do you most want to avoid?" value={data.undesired} onChange={(v)=>update("undesired",v)} required />
              <EnTextAreaField number="06" label="If the matter is handled properly, what state do you want to achieve?" value={data.desired} onChange={(v)=>update("desired",v)} required />
              <fieldset className="grid gap-5 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
                <legend className="sr-only">Is there a specific decision deadline?</legend>
                <span className="font-serif text-xl text-[#b18a54]">07</span>
                <div>
                  <p className="font-serif text-xl leading-snug lg:text-2xl">Is there a specific decision deadline?</p>
                  <div className="mt-5 flex flex-wrap items-center gap-6">
                    {[{value:"無",label:"No"},{value:"有",label:"Yes"}].map(option => (
                      <label key={option.value} className="inline-flex items-center gap-2 text-sm text-[#514b43]">
                        <input type="radio" name="deadline_status" value={option.value} checked={data.deadline_status === option.value} onChange={() => { update("deadline_status", option.value as "無"|"有"); if(option.value==="無") update("deadline_date",""); }} required />
                        {option.label}
                      </label>
                    ))}
                    {data.deadline_status === "有" && <input type="date" aria-label="Decision deadline date" value={data.deadline_date} onChange={(e)=>update("deadline_date",e.target.value)} required className="border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm text-[#3b3732] outline-none focus:border-[#8f693d]" />}
                  </div>
                </div>
              </fieldset>
              <EnSelectField number="08" label="Type of matter" value={data.event_type} onChange={(v)=>update("event_type",v)} options={EVENT_OPTIONS} required />
            </div>
            <input type="text" name="bot-field" value={data["bot-field"]} onChange={(e)=>update("bot-field",e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          </fieldset>
          <div className="border-t border-[#d8c8ad] pt-8">
            <p className="mb-5 text-sm leading-7">The official <Link to="/privacy">privacy notice</Link> and <Link to="/professional-boundary">professional boundary notice</Link> are currently maintained in Traditional Chinese.</p>
            <p className="mb-5 text-sm leading-7 text-[#5f584f]">For continuing governance research and general contact, you may also add the <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">STT Official LINE account</a>. LINE does not replace this formal governance intake and should not be used to send highly sensitive information at the initial contact stage.</p>
            <button type="submit" disabled={sending} className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white disabled:opacity-60">{sending ? "Submitting…" : "Submit governance situation"}</button>
            {sendError && <p role="alert" className="mt-4 text-sm leading-7 text-[#8a4f3d]">{sendError}</p>}
          </div>
        </form>
      </section>
    </div>
  );
}

function EnTextField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}) {
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><input type="text" maxLength={number==="01"?120:300} autoComplete={number==="01"?"name":"off"} required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]" /></span></label>;
}
function EnTextAreaField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}) {
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><textarea maxLength={4000} required={required} value={value} onChange={(e)=>onChange(e.target.value)} rows={5} className="mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]" /></span></label>;
}
function EnSelectField({number,label,value,onChange,options,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;options:readonly {value:string;label:string}[];required?:boolean}) {
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><select required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"><option value="">Please select</option>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select></span></label>;
}
