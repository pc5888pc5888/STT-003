import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import GovernedHero from "./components/GovernedHero";
import { applyGcsdaMetadata } from "./gcsdaMetadata";

const EN_NAV = [
  ["About", "/en/about"],
  ["Founding Chairman", "/en/founder-chairman"],
  ["Institutional Governance", "/en/governance"],
  ["Strategy Governance Council", "/en/council"],
  ["Membership", "/en/membership"],
  ["Assemblies & Events", "/en/events"],
  ["Knowledge & Research", "/en/knowledge"],
  ["Charter & Notices", "/en/charter"],
] as const;

const EN_TO_ZH: Record<string,string> = {
  "/en": "/",
  "/en/": "/",
  "/en/about": "/about",
  "/en/founder-chairman": "/founder-chairman",
  "/en/governance": "/governance",
  "/en/council": "/council",
  "/en/membership": "/membership",
  "/en/events": "/events",
  "/en/knowledge": "/knowledge",
  "/en/charter": "/charter",
};

const VISUALS: Record<string,string> = {
  "/en": "/visual-bank/gcsda/001.webp",
  "/en/about": "/visual-bank/gcsda/002.webp",
  "/en/founder-chairman": "/visual-bank/gcsda/founder-chairman-hero.webp",
  "/en/governance": "/visual-bank/gcsda/003.webp",
  "/en/council": "/visual-bank/gcsda/004.webp",
  "/en/membership": "/visual-bank/gcsda/005.webp",
  "/en/events": "/visual-bank/gcsda/006.webp",
  "/en/knowledge": "/visual-bank/gcsda/007.webp",
  "/en/charter": "/visual-bank/gcsda/008.webp",
};

export function GCSDAEnglishShell({
  children,
  logoSrc,
  lineUrl,
  sttUrl,
}:{
  children:ReactNode;
  logoSrc:string;
  lineUrl:string;
  sttUrl:string;
}){
  const loc=useLocation();
  const [open,setOpen]=useState(false);
  const zhPath=EN_TO_ZH[loc.pathname]??"/";

  useEffect(()=>{
    applyGcsdaMetadata(loc.pathname);
    setOpen(false);
    window.scrollTo({top:0,behavior:"auto"});
  },[loc.pathname]);

  useEffect(()=>{
    if(!open)return;
    const panel=document.getElementById("gcsda-en-mobile-menu");
    panel?.querySelector<HTMLButtonElement>("button")?.focus();
    const main=document.getElementById("main-content");
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    if(main) main.inert=true;
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){
        event.preventDefault();
        setOpen(false);
        document.querySelector<HTMLButtonElement>(".g4-menu")?.focus();
      }
      if(event.key==="Tab"&&panel){
        const items=Array.from(panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener("keydown",key);
    return()=>{
      document.removeEventListener("keydown",key);
      document.body.style.overflow=previous;
      if(main) main.inert=false;
    };
  },[open]);

  return <div className="g4 g4-en">
    <a className="site-skip-link" href="#main-content">Skip to main content</a>
    <header className="g4-head">
      <div className="g4-wrap g4-headin">
        <Link className="g4-brand" to="/en" aria-label="GCSDA English home">
          <img src={logoSrc} alt="GCSDA｜中華企業策略永續發展學會"/>
        </Link>
        <nav className="g4-nav" aria-label="Primary navigation">
          {EN_NAV.map(([label,path])=><NavLink key={path} className={({isActive})=>isActive?"active":""} to={path}>{label}</NavLink>)}
        </nav>
        <Link className="g4-join g4-head-cta" to="/en/membership">Membership</Link>
        <Link className="g4-lang-top" to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁中</Link>
        <button className="g4-menu" onClick={()=>setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="gcsda-en-mobile-menu"><Menu/></button>
      </div>
    </header>

    {open&&<div className="g4-drawer" onClick={()=>setOpen(false)}>
      <div id="gcsda-en-mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" className="g4-drawerpanel" onClick={event=>event.stopPropagation()}>
        <button className="g4-close" onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button>
        {EN_NAV.map(([label,path])=><Link key={path} to={path} onClick={()=>setOpen(false)}>{label}</Link>)}
        <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW" onClick={()=>setOpen(false)}>繁體中文</Link>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer" onClick={()=>setOpen(false)}>GCSDA Official LINE ↗</a>
        <a className="g4-drawer-stt" href={sttUrl} target="_blank" rel="noreferrer" onClick={()=>setOpen(false)}>STT Governance ↗</a>
      </div>
    </div>}

    <main id="main-content" tabIndex={-1}>{children}</main>

    <footer className="g4-footer">
      <div className="g4-wrap g4-footergrid">
        <div>
          <b>GCSDA｜中華企業策略永續發展學會</b>
          <p>GCSDA is an independent professional association. Its membership, bylaws, board governance, institutional records and responsibilities remain under GCSDA's own formal procedures.</p>
        </div>
        <div>
          <Link to="/en/navigator">Institutional Navigator</Link>
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">Traditional Chinese</Link>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer">GCSDA Official LINE ↗</a>
          <a href={sttUrl} target="_blank" rel="noreferrer">STT Governance ↗</a>
        </div>
      </div>
    </footer>
  </div>;
}

function Section({kicker,title,children,soft=false}:{kicker:string;title:string;children:ReactNode;soft?:boolean}){
  return <section className={"g4-section"+(soft?" soft":"")}>
    <div className="g4-wrap">
      <div className="g4-kicker">{kicker}</div>
      <h2 className="g4-title">{title}</h2>
      {children}
    </div>
  </section>;
}

export function GCSDAEnglishHome({lineUrl}:{lineUrl:string}){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="GCSDA · INSTITUTIONAL ENGLISH EDITION · TAIWAN"
      title="Strategy, governance and sustainability as a shared professional language."
      lead="GCSDA connects enterprise, professional and academic communities through formal organization, bylaws, membership and cross-disciplinary exchange, building governance knowledge that can be carried forward over time."
      image={VISUALS["/en"]}
    >
      <Link className="cis-primary" to="/en/about">Understand GCSDA</Link>
      <Link to="/en/membership">Membership framework</Link>
    </GovernedHero>

    <Section kicker="INSTITUTIONAL POSITION" title="A professional association with its own governance and institutional responsibilities.">
      <p className="g4-lead">GCSDA is not a consulting funnel and does not merge its institutional identity with STT Governance. Its membership, board governance, bylaws and formal records are administered within the association's own responsibility boundary.</p>
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>Enterprise Strategy</h3><p>Exchange around strategy, organizational decision-making and practical governance.</p></div>
        <div className="g4-card"><span>02</span><h3>Governance & Compliance</h3><p>Institutional discussion of authority, accountability, risk control and compliance.</p></div>
        <div className="g4-card"><span>03</span><h3>Sustainability & Cross-disciplinary Exchange</h3><p>Long-term knowledge connecting enterprise sustainability with governance practice.</p></div>
      </div>
    </Section>

    <Section kicker="INSTITUTIONAL NAVIGATOR" title="Find the formal institutional page without guessing the site structure.">
      <p className="g4-lead">Describe what you are looking for and the local navigator will point you to the relevant GCSDA page. It does not make membership decisions or interpret bylaws.</p>
      <div className="g4-actions"><Link className="primary" to="/en/navigator">Open Institutional Navigator →</Link></div>
    </Section>

    <Section kicker="FORMAL ENTRY" title="Institutional participation begins with the association's formal procedures." soft>
      <p className="g4-lead">Membership applications, qualification review, fees and member records are governed by GCSDA's bylaws and administrative procedures. The English edition explains the framework; the formal application remains on the association's Traditional Chinese intake page.</p>
      <div className="g4-actions">
        <Link className="primary" to="/en/membership">Review membership framework</Link>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">GCSDA Official LINE ↗</a>
      </div>
    </Section>
  </div>;
}

export function GCSDAEnglishAbout(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="ABOUT GCSDA"
      title="An independent professional association built around strategy, governance, compliance and sustainable development."
      lead="GCSDA provides an institutional platform for exchange among enterprises, professionals and academia. Its purpose is to strengthen governance knowledge, risk awareness and long-term organizational capability through formal association structures."
      image={VISUALS["/en/about"]}
    />

    <Section kicker="PURPOSE" title="The association exists to build durable professional exchange, not a temporary campaign.">
      <p className="g4-lead">GCSDA develops a professional community around corporate strategy, governance, compliance, risk control and sustainability. Activities, research and institutional records are published only when they are formally established and suitable for public disclosure.</p>
    </Section>

    <Section kicker="INSTITUTIONAL BOUNDARY" title="GCSDA and STT Governance remain separate institutional actors." soft>
      <p className="g4-lead">The two may connect through governance knowledge, research and public content, but GCSDA's membership, bylaws, board and supervisory governance, administrative procedures and legal responsibilities remain with GCSDA itself.</p>
      <div className="g4-actions">
        <Link to="/en/governance">View governance structure</Link>
        <Link to="/about">Open the formal Traditional Chinese institutional page</Link>
      </div>
    </Section>
  </div>;
}

export function GCSDAEnglishGovernance(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="INSTITUTIONAL GOVERNANCE"
      title="Institutional governance begins with clear sources of authority, terms, duties and accountability."
      lead="GCSDA operates through its General Assembly, Board of Directors, Board of Supervisors, bylaws and formal association procedures. Detailed legal powers and procedures remain governed by the official bylaws and institutional records."
      image={VISUALS["/en/governance"]}
    />

    <Section kicker="GOVERNANCE STRUCTURE" title="The association's governance is institutional, not personal.">
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>General Assembly</h3><p>A formal component of the association's governance system. Its authority is determined by the bylaws and applicable rules governing civic organizations.</p></div>
        <div className="g4-card"><span>02</span><h3>Board of Directors</h3><p>The board structure, officers, terms and responsibilities are governed by the association's formal bylaws and meeting procedures.</p></div>
        <div className="g4-card"><span>03</span><h3>Board of Supervisors</h3><p>Supervisory responsibilities and institutional checks operate within the powers established by the bylaws and formal association procedures.</p></div>
      </div>
    </Section>

    <Section kicker="OFFICIAL RECORD" title="The English edition is explanatory; the official institutional record remains the governed source." soft>
      <p className="g4-lead">For the current board roster, detailed numerical composition, formal powers, terms and complete bylaw language, refer to the association's Traditional Chinese governance and charter pages.</p>
      <div className="g4-actions">
        <Link className="primary" to="/governance">Official governance page</Link>
        <Link to="/charter">Official charter and notices</Link>
      </div>
    </Section>
  </div>;
}


export function GCSDAEnglishFounderChairman(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="FOUNDING CHAIRMAN"
      title="Founding Chairman | Chuang Chun-Hsiang, Ph.D."
      subtitle="Founder & CEO, STT Governance"
      lead="Dr. Chuang Chun-Hsiang serves as the founding chairman of GCSDA. The founding purpose is not to add another event platform, but to build a durable professional community in which enterprise, professional and academic participants can develop a shared language for governance."
      image={VISUALS["/en/founder-chairman"]}
    />
    <Section kicker="FOUNDING VISION" title="Professional exchange becomes durable only when it enters an institutional structure.">
      <p className="g4-lead">Major enterprise questions increasingly cross strategy, law, finance, succession, authority, sustainability, digital transformation and AI. GCSDA was established as a standing professional platform where different disciplines can collaborate while retaining their own qualifications, duties and accountability.</p>
      <p className="g4-lead">The objective is not to combine professions into an all-purpose advisory identity. It is to make cross-disciplinary exchange more useful by keeping roles and responsibility boundaries explicit.</p>
    </Section>
    <Section kicker="INSTITUTIONAL BOUNDARY" title="The founding chairman provides direction; the association's formal institutions govern authority." soft>
      <p className="g4-lead">The founding chairman represents the association's founding vision and institutional direction, but does not constitute the whole authority of GCSDA. Formal governance remains with the General Assembly, Board of Directors, Board of Supervisors, bylaws and formal association procedures.</p>
      <p className="g4-lead">Dr. Chuang is also the founder of STT Governance. GCSDA and STT Governance may connect through governance knowledge, research and public content, while remaining separate institutional actors with separate membership, bylaws, governance and legal responsibilities.</p>
      <div className="g4-actions"><Link className="primary" to="/founder-chairman">Open the formal Traditional Chinese profile</Link></div>
    </Section>
  </div>;
}

export function GCSDAEnglishCouncil(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="STRATEGY GOVERNANCE COUNCIL"
      title="Cross-disciplinary participation does not mean blurred authority."
      lead="The Strategy Governance Council is issue-led. It connects legal, accounting, strategy, industry and academic perspectives while keeping each professional participant within the boundaries of their own qualifications, authority and responsibility."
      image={VISUALS["/en/council"]}
    />
    <Section kicker="COUNCIL PRINCIPLES" title="Shared language is built without turning professional boundaries into a single advisory identity.">
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>Issue-led exchange</h3><p>Discussion begins with enterprise governance, strategy, compliance, sustainability and other defined institutional questions, not with a claim of an all-purpose expert team.</p></div>
        <div className="g4-card"><span>02</span><h3>Professional boundaries</h3><p>Participants contribute only within the scope of their qualifications, experience and responsibility. Regulated professional work remains with appropriately authorized professionals.</p></div>
        <div className="g4-card"><span>03</span><h3>Records & outputs</h3><p>Lectures, exchanges, research or other outputs are published only after they have actually taken place and can be formally verified.</p></div>
      </div>
    </Section>
    <Section kicker="INSTITUTIONAL BOUNDARY" title="The Council does not replace the association's statutory governance bodies." soft>
      <p className="g4-lead">Unless the bylaws or a formal resolution expressly provide otherwise, the Strategy Governance Council is a professional collaboration and exchange mechanism. It does not replace the General Assembly, Board of Directors or Board of Supervisors.</p>
      <div className="g4-actions"><Link className="primary" to="/council">Open the formal Traditional Chinese Council page</Link></div>
    </Section>
  </div>;
}

export function GCSDAEnglishEvents(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="ASSEMBLIES & EVENTS"
      title="Events are institutional records, not one-off promotional moments."
      lead="GCSDA records its formation process, charter approval, General Assembly meetings, board and supervisory meetings, and formal programs according to the records available for public disclosure."
      image={VISUALS["/en/events"]}
    />
    <Section kicker="INSTITUTIONAL RECORD" title="Administrative procedures, formal meetings and public records remain distinguishable.">
      <p className="g4-lead">The association does not present unavailable official letters, minutes, photographs or program outcomes as if they had already been published. Each record is disclosed only when the underlying material is available and suitable for public use.</p>
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>Formation</h3><p>Records concerning the association's organizational formation are separated from later meeting and program records.</p></div>
        <div className="g4-card"><span>02</span><h3>Assemblies & boards</h3><p>General Assembly, Board of Directors and Board of Supervisors records are treated as distinct institutional events.</p></div>
        <div className="g4-card"><span>03</span><h3>Public evidence</h3><p>Website explanations do not substitute for formal official letters, minutes or other primary records.</p></div>
      </div>
      <div className="g4-actions"><Link className="primary" to="/events">Open the formal Traditional Chinese archive</Link></div>
    </Section>
  </div>;
}

export function GCSDAEnglishKnowledge(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="KNOWLEDGE & RESEARCH"
      title="Professional exchange should accumulate into knowledge that can be learned, cited and carried forward."
      lead="This page provides the English institutional entry to GCSDA's knowledge assets across enterprise strategy, corporate governance, compliance, risk control, sustainability and cross-disciplinary exchange."
      image={VISUALS["/en/knowledge"]}
    />
    <Section kicker="KNOWLEDGE DOMAINS" title="Knowledge is organized by verified subject matter, not by inflated claims of influence.">
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>Enterprise Strategy</h3><p>Direction, resource allocation, decision structures and strategy practice.</p></div>
        <div className="g4-card"><span>02</span><h3>Governance & Compliance</h3><p>Corporate governance, authority, accountability, risk control, compliance and institutional operation.</p></div>
        <div className="g4-card"><span>03</span><h3>Sustainability & Cross-disciplinary Knowledge</h3><p>Enterprise sustainability and long-term governance knowledge that organizations can retain and reuse.</p></div>
      </div>
    </Section>
    <Section kicker="RECORD PRINCIPLE" title="Research, publications and public documents are listed only when they are complete and verifiable." soft>
      <p className="g4-lead">GCSDA does not substitute invented publication counts, partnerships, research programs or impact figures for actual completed work.</p>
      <div className="g4-actions"><Link className="primary" to="/knowledge">Open the formal Traditional Chinese knowledge page</Link></div>
    </Section>
  </div>;
}

export function GCSDAEnglishCharter(){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="CHARTER & NOTICES"
      title="The charter is the formal source of institutional authority, membership rights and governance procedure."
      lead="GCSDA's formal charter contains six chapters and thirty-eight articles. It was approved by the first General Assembly on July 1, 2025. The Traditional Chinese text remains the authoritative published charter."
      image={VISUALS["/en/charter"]}
    />
    <Section kicker="OFFICIAL SOURCE" title="The English edition explains the institutional structure without creating a second legal text.">
      <p className="g4-lead">The charter governs the association's purpose, membership, organizational bodies, terms, authority, duties and other formal procedures. Because translated wording can affect legal interpretation, the complete Traditional Chinese charter remains the formal reference.</p>
      <div className="g4-grid">
        <div className="g4-card"><span>01</span><h3>Purpose & scope</h3><p>The association is national in scope and operates under the institutional framework stated in its charter and registration records.</p></div>
        <div className="g4-card"><span>02</span><h3>Boards & supervision</h3><p>Board and supervisory composition, terms and duties remain governed by the formal charter.</p></div>
        <div className="g4-card"><span>03</span><h3>Membership governance</h3><p>Member qualifications, rights, obligations and formal procedures are governed by the charter and association resolutions.</p></div>
      </div>
      <div className="g4-actions"><Link className="primary" to="/charter">Read the complete formal Traditional Chinese charter</Link></div>
    </Section>
  </div>;
}

export function GCSDAEnglishMembership({lineUrl}:{lineUrl:string}){
  return <div className="g4-page g4-en-page">
    <GovernedHero
      kicker="MEMBERSHIP"
      title="Membership is a formal institutional relationship, not an instant signup."
      lead="Applicants provide necessary contact information, professional background and participation interests. GCSDA then conducts information review and qualification review under its bylaws and administrative procedures."
      image={VISUALS["/en/membership"]}
    />

    <Section kicker="MEMBERSHIP PROCESS" title="Application first; membership status only after formal review.">
      <div className="g4-membership-flow" aria-label="Membership application process">
        {[
          ["01","Application","Provide basic contact information and participation intent."],
          ["02","Information Review","The secretariat verifies the submitted information."],
          ["03","Qualification Review","Eligibility is reviewed under the bylaws and association procedures."],
          ["04","Membership Activation","Membership takes effect after approval, fee notice and member record completion."],
        ].map(([n,title,description])=><div className="g4-membership-flow-item" key={n}><b>{n}</b><strong>{title}</strong><span>{description}</span></div>)}
      </div>
    </Section>

    <Section kicker="CURRENT FRAMEWORK" title="The formal application remains on the governed Traditional Chinese intake page." soft>
      <p className="g4-lead">The current published framework includes individual membership for applicants aged 25 or above who support the association's purpose and complete the required application and review. The published joining fee is NT$2,000 and the annual membership fee is NT$2,000. Eligibility, rights, obligations and final approval remain subject to the official bylaws and association procedures.</p>
      <div className="g4-actions">
        <Link className="primary" to="/membership">Open formal membership application</Link>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">GCSDA Official LINE ↗</a>
      </div>
      <div className="g4-note"><h3>Information boundary</h3><p>The initial application process does not request identity numbers, financial credentials or other unnecessary highly sensitive information. Additional documents, if formally required after review, are handled through the association's administrative process.</p></div>
    </Section>
  </div>;
}
