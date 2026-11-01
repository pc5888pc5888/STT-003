import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import { STT_OFFICIAL_LOGO_SRC } from "../sttLogo";
import { applyGovernedMetadata } from "../seo";

const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";

const KO_NAVIGATION = [
  { label: "현재 직면한 문제", path: "/problems" },
  { label: "STT의 판단 방식", path: "/ko/how-stt-works" },
  { label: "거버넌스 위임", path: "/ko/engagement" },
  { label: "연구·출판", path: "/insights" },
  { label: "STT 소개", path: "/ko/about" },
] as const;

const KO_TO_ZH:Record<string,string>={
  "/ko":"/",
  "/ko/":"/",
  "/ko/how-stt-works":"/how-stt-works",
  "/ko/engagement":"/engagement",
  "/ko/about":"/about",
  "/ko/start":"/start",
};

const KO_TO_EN:Record<string,string>={
  "/ko":"/en",
  "/ko/":"/en",
  "/ko/how-stt-works":"/en/how-stt-works",
  "/ko/engagement":"/en/engagement",
  "/ko/about":"/en/about",
  "/ko/start":"/en/start",
};

const KO_TO_JA:Record<string,string>={
  "/ko":"/ja",
  "/ko/":"/ja",
  "/ko/how-stt-works":"/ja/how-stt-works",
  "/ko/engagement":"/ja/engagement",
  "/ko/about":"/ja/about",
  "/ko/start":"/ja/start",
};

export function KoreanShell({children}:{children:ReactNode}){
  const location=useLocation();
  const [menuOpen,setMenuOpen]=useState(false);
  const zhPath=KO_TO_ZH[location.pathname]??"/";
  const enPath=KO_TO_EN[location.pathname]??"/en";
  const jaPath=KO_TO_JA[location.pathname]??"/ja";

  useEffect(()=>{
    setMenuOpen(false);
    applyGovernedMetadata(location.pathname);
    const frame=requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"instant"}));
    return()=>cancelAnimationFrame(frame);
  },[location.pathname]);

  return <div className="stt-g0-shell stt-ko-shell">
    <a className="site-skip-link" href="#main-content">본문으로 이동</a>
    <header className="stt-g0-header">
      <div className="stt-g0-header__inner">
        <Link to="/ko" className="stt-g0-brand" aria-label="STT Governance 한국어 홈">
          <img src={STT_OFFICIAL_LOGO_SRC} alt="STT Governance"/>
        </Link>
        <nav className="stt-g0-desktop-nav" aria-label="주요 내비게이션">
          {KO_NAVIGATION.map(item=><NavLink key={item.path} to={item.path} className={({isActive})=>`stt-g0-nav-link${isActive?" is-active":""}`}>{item.label}</NavLink>)}
        </nav>
        <Link to="/ko/start" className="stt-g0-primary-cta">거버넌스 판단 시작</Link>
        <div className="stt-g0-lang-cluster" aria-label="언어 전환">
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁中</Link>
          <Link to={enPath} hrefLang="en" lang="en">EN</Link>
          <Link to={jaPath} hrefLang="ja" lang="ja">日本語</Link>
        </div>
        <button type="button" className="stt-g0-menu-button" aria-label={menuOpen?"메뉴 닫기":"메뉴 열기"} aria-expanded={menuOpen} aria-controls="stt-ko-mobile-menu" onClick={()=>setMenuOpen(v=>!v)}>
          {menuOpen?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}
        </button>
      </div>
      {menuOpen&&<nav id="stt-ko-mobile-menu" className="stt-g0-mobile-menu" aria-label="모바일 내비게이션">
        <div className="stt-g0-mobile-menu__inner">
          <div className="stt-g0-mobile-menu__primary">
            {KO_NAVIGATION.map((item,index)=><NavLink key={item.path} to={item.path}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.label}</strong></NavLink>)}
          </div>
          <div className="stt-g0-mobile-menu__secondary">
            <Link to="/ko/start">거버넌스 판단 시작</Link>
            <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁體中文</Link>
            <Link to={enPath} hrefLang="en" lang="en">English</Link>
            <Link to={jaPath} hrefLang="ja" lang="ja">日本語</Link>
          </div>
        </div>
      </nav>}
    </header>

    <main id="main-content" tabIndex={-1} className="stt-g0-main">{children}</main>

    <footer className="stt-g0-footer">
      <div className="stt-g0-footer__inner">
        <div className="stt-g0-footer__brand">
          <strong>STT Governance｜策略智庫智慧治理</strong>
          <span>거버넌스 판단과 제도 설계</span>
        </div>
        <nav className="stt-g0-footer__links" aria-label="푸터 내비게이션">
          <Link to="/ko/how-stt-works">STT의 판단 방식</Link>
          <Link to="/ko/engagement">거버넌스 위임</Link>
          <Link to="/ko/about">STT 소개</Link>
          <Link to="/ko/start">거버넌스 판단 시작</Link>
          <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer">STT 공식 LINE ↗</a>
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁體中文</Link>
          <Link to={enPath} hrefLang="en" lang="en">English</Link>
          <Link to={jaPath} hrefLang="ja" lang="ja">日本語</Link>
        </nav>
      </div>
    </footer>
  </div>;
}

function Section({kicker,title,children}:{kicker?:string;title:string;children:ReactNode}){
  return <section className="stt-inst-section stt-ko-section">
    <div className="stt-inst-shell">
      {kicker&&<p className="stt-inst-kicker">{kicker}</p>}
      <h2>{title}</h2>
      <div className="stt-inst-body">{children}</div>
    </div>
  </section>;
}

export function KoreanHome(){
  return <div className="stt-inst-page stt-ko-page">
    <UnifiedTitleHero
      kicker="STT GOVERNANCE · JUDGMENT · INSTITUTIONAL DESIGN"
      title="중요한 의사결정이 되돌릴 수 없게 되기 전에, 통치 가능한 구조로."
      lead="STT Governance는 기업, 가족, 주요 의사결정자가 행동에 들어가기 전에 실제 문제, 증거, 권한, 책임, 선택지를 명확히 하고, 그 판단이 설명되고 승계되며 추적될 수 있는 거버넌스 구조를 설계합니다."
      image="/visual-bank/stt/user-approved-six/home.png"
      imagePosition="center right"
      id="ko-home-title"
    >
      <Link to="/ko/how-stt-works">STT의 판단 방식 보기 →</Link>
      <Link className="cis-primary" to="/ko/start">거버넌스 판단 시작</Link>
    </UnifiedTitleHero>

    <Section kicker="START FROM THE REAL PROBLEM" title="어떤 문제는 곧바로 해결책으로 들어가면 안 됩니다.">
      <div className="stt-inst-grid stt-ko-situation-grid">
        <article><strong>가족과 기업승계</strong><p>경영 승계가 시작됐지만 권한, 지분, 가족의 기대가 실제로 정렬되지 않은 상황.</p><Link to="/ko/start?route=succession">이 상황 설명하기 →</Link></article>
        <article><strong>지분과 권한</strong><p>주주구조, 이사회, 가족 영향력, 경영권이 서로 다른 방향으로 움직이기 시작한 상황.</p><Link to="/ko/start?route=family-ownership">이 상황 설명하기 →</Link></article>
        <article><strong>중대한 의사결정</strong><p>협력, 투자, 처분, 분쟁 등이 되돌리기 어려운 지점에 가까워지고 있는 상황.</p><Link to="/ko/start?route=major-decision">이 상황 설명하기 →</Link></article>
        <article><strong>AI와 의사결정 거버넌스</strong><p>AI가 의사결정 과정에 들어왔지만 권한, 책임, 증거, 인간의 통제가 명확하지 않은 상황.</p><Link to="/ko/start?route=ai-governance">이 상황 설명하기 →</Link></article>
      </div>
    </Section>

    <Section kicker="GOVERNANCE JUDGMENT" title="STT는 의견을 더하는 것보다 먼저 판단 구조를 정리합니다.">
      <p>거버넌스 판단은 사건을 정의하고, 누가 결정권을 가지며 누가 결과를 부담하는지 확인하는 데서 시작합니다. 그 후 증거, 중단 기준, 선택지를 비교하고 왜 진행할 수 있는지 또는 왜 멈춰야 하는지를 기록 가능한 상태로 만듭니다.</p>
      <div className="stt-ko-process-line" aria-label="7단계 거버넌스 판단 프로세스">
        <span>사건</span><span>권한</span><span>증거</span><span>중단 기준</span><span>선택지</span><span>판단</span><span>제도화</span>
      </div>
      <Link to="/ko/how-stt-works">7단계 판단 프로세스 보기 →</Link>
    </Section>

    <Section kicker="HUMAN AUTHORITY" title="AI는 참모 기능을 강화할 수 있지만 통치 주체가 되지는 않습니다.">
      <p>AI는 조사, 비교, 추적, 초안 작성에 도움을 줄 수 있습니다. 그러나 증거의 채택, 권한 부여, 실행 허용, 결과 책임은 인간 의사결정자와 거버넌스 절차에 남습니다.</p>
      <Link to="/ko/about">STT Governance 소개 →</Link>
    </Section>
  </div>;
}

const METHOD_STEPS=[
  {n:"01",id:"event-definition",title:"사건 정의",input:"진술, 타임라인, 알려진 제약조건",question:"실제로 무엇이 일어났으며, 무엇이 입장·설명·증상에 불과한가.",output:"사건 프레임, 문제 정의, 확인 필요 사항"},
  {n:"02",id:"stakeholder-authority",title:"이해관계자와 권한",input:"사람, 법인, 지분, 직위, 계약, 실질 통제",question:"누가 결정하고 거부하며 정보에 접근할 수 있고, 누가 결과를 부담하는가.",output:"이해관계자·권한 맵"},
  {n:"03",id:"evidence",title:"증거",input:"문서, 기록, 규정, 계약, 재무정보 등",question:"무엇이 사실이고 무엇이 가정인가. 현재 결론을 뒤집을 수 있는 것은 무엇인가.",output:"증거 목록, 결손, 입증 필요 사항"},
  {n:"04",id:"hard-stop",title:"중단 기준",input:"법률, 신뢰, 재무, 평판, 거버넌스, 비가역 위험",question:"어떤 결과가 수용 불가능하거나 회복하기 매우 어려운가.",output:"중단 조건, 위험 임계치, 금지 조건"},
  {n:"05",id:"options",title:"선택지",input:"실행 가능한 경로, 조건, 제약",question:"먼저 제외해야 할 선택지는 무엇이며, 남은 각 안의 비용은 무엇인가.",output:"선택지 매트릭스, 조건부 경로"},
  {n:"06",id:"judgment",title:"거버넌스 판단",input:"사건, 권한, 증거, 중단 기준, 선택지",question:"지금 할 수 있는 것과 할 수 없는 것은 무엇이며 어떤 조건에서 진행 가능한가.",output:"Decision Memo, 필요 시 GO / CONDITIONAL GO / HOLD / NO-GO"},
  {n:"07",id:"governance",title:"제도 실행",input:"확정된 판단, 책임, 후속조치",question:"판단을 지속 가능한 권한, 절차, 기록, 추적으로 어떻게 전환할 것인가.",output:"거버넌스 구조, 제도 기록, 책임 추적"},
] as const;

export function KoreanMethod(){
  return <div className="stt-g3-method stt-ko-page">
    <UnifiedTitleHero
      kicker="GOVERNANCE JUDGMENT"
      title="STT는 어떻게 거버넌스 판단을 하는가"
      lead="STT는 결론을 서두르지 않습니다. 먼저 문제가 정확히 정의됐는지, 증거가 충분한지, 권한의 경계를 넘고 있지 않은지, 누가 책임을 지는지, 위험이 아직 되돌릴 수 있는지 확인합니다."
      id="ko-method-title"
    />
    <nav className="stt-g3-index" aria-label="7단계 거버넌스 판단">
      <div className="stt-g3-shell stt-g3-index__grid">
        {METHOD_STEPS.map(step=><a key={step.id} href={"#"+step.id}><span>{step.n}</span><strong>{step.title}</strong></a>)}
      </div>
    </nav>
    <section className="stt-g3-section stt-g3-foundations"><div className="stt-g3-shell">
      <p className="stt-g3-kicker">JUDGMENT FOUNDATIONS</p>
      <h2>중대한 판단을 지탱하는 네 가지 기반.</h2>
      <p className="stt-g3-foundations__intro">문제, 증거, 트레이드오프, 권한과 책임은 서로 분리된 서비스가 아닙니다. 하나의 중대한 의사결정 안에서 함께 검증돼야 하는 기반입니다.</p>
      <div className="stt-g3-foundation-grid">
        {[["01","Problem","실제 문제"],["02","Evidence","신뢰 가능한 증거"],["03","Trade-off","비용과 트레이드오프"],["04","Authority & Accountability","누가 결정하고 누가 책임지는가"]].map(([number,en,desc])=><article key={number}><span>{number}</span><small>{en}</small><h3>{desc}</h3></article>)}
      </div>
    </div></section>
    <section className="stt-g3-section stt-g3-process"><div className="stt-g3-shell">
      <p className="stt-g3-kicker">SEVEN-STAGE JUDGMENT PROCESS</p>
      <h2>거버넌스 판단은 답변이 아니라 추적 가능한 의사결정 과정입니다.</h2>
      <div className="stt-g3-steps">
        {METHOD_STEPS.map(step=><article className="stt-g3-step" id={step.id} key={step.id}>
          <div className="stt-g3-step__number">{step.n}</div>
          <header><small>{step.id.toUpperCase()}</small><h3>{step.title}</h3></header>
          <dl>
            <div><dt>입력</dt><dd>{step.input}</dd></div>
            <div><dt>핵심 질문</dt><dd>{step.question}</dd></div>
            <div><dt>산출물</dt><dd>{step.output}</dd></div>
          </dl>
        </article>)}
      </div>
    </div></section>
    <section className="stt-g3-section stt-g3-ai-boundary"><div className="stt-g3-shell stt-g3-ai-boundary__grid">
      <div><p className="stt-g3-kicker">AI GOVERNANCE BOUNDARY</p><h2>AI는 거버넌스 참모이며 통치 주체가 아닙니다.</h2></div>
      <div><p>AI는 정리, 비교, 추적, 불일치 발견을 지원할 수 있습니다. 증거의 채택, 권한 부여, 실행 여부는 인간 의사결정자와 거버넌스 절차에 남습니다.</p><Link to="/ko/engagement">거버넌스 위임 보기 →</Link></div>
    </div></section>
  </div>;
}

const ENGAGEMENTS=[
  {code:"GOVERNANCE REVIEW",title:"초기 거버넌스 리뷰",fit:"중대한 사건이 아직 충분히 정의되지 않았거나 관계자들의 인식이 충돌하는 경우.",role:"사건, 관계자, 권한, 증거 공백, 비가역 위험, 다음 경로를 정리합니다.",outputs:"Governance Dossier / Decision Brief / 다음 단계 정보 목록",excludes:"법률 의견, 법정 회계, 세무, 투자 등 규제 전문업무와 별도 합의 없는 지속 자문."},
  {code:"GOVERNANCE ARCHITECTURE",title:"거버넌스 구조 설계",fit:"가족, 지분, 회사 거버넌스, 계약, 전문 도구, 부서 권한을 가로지르는 문제.",role:"개별 전문 도구를 전체 거버넌스 목적 안에 다시 배치하고 제도, 권한, 절차, 전문 협업 구조를 설계합니다.",outputs:"Governance Architecture / Role & Authority Map / Decision Rules",excludes:"변호사, 세무, 감사, 투자 등 적절한 자격자가 수행해야 하는 전문업무 자체."},
  {code:"GOVERNANCE MANDATE",title:"연간 거버넌스 위임",fit:"기업이나 가족이 중대한 의사결정, 승계, 거버넌스 전환, 여러 연동 사건에 지속적으로 직면하는 경우.",role:"중대 사안 게이트, 정기 리뷰, 의사결정 판단, 제도·증거 기록, 필요한 전문 협업을 구축합니다.",outputs:"Annual Governance Protocol / Decision Memo / Evidence & Policy Record",excludes:"무제한 수시 상담, 24시간 개인 지원, 전문기능의 포괄적 외주."},
] as const;

export function KoreanEngagement(){
  return <div className="stt-g4-engagement stt-ko-page">
    <UnifiedTitleHero
      kicker="GOVERNANCE ENGAGEMENT"
      title="공식 거버넌스가 필요한 문제를 단발성 상담으로 남겨두지 않습니다."
      lead="STT는 복잡성, 의사결정 수준, 지속 기간에 따라 초기 거버넌스 리뷰, 거버넌스 구조 설계, 연간 거버넌스 위임의 서로 다른 깊이로 개입합니다."
      id="ko-engagement-title"
    />
    <nav className="stt-g4-index" aria-label="세 가지 거버넌스 위임 단계"><div className="stt-g4-shell stt-g4-index__grid">
      {ENGAGEMENTS.map((item,index)=><a key={item.code} href={"#ko-engagement-"+index}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><small>{item.code}</small></a>)}
    </div></nav>
    <div className="stt-g4-engagements">
      {ENGAGEMENTS.map((item,index)=><section className="stt-g4-engagement-row" id={"ko-engagement-"+index} key={item.code}><div className="stt-g4-shell stt-g4-engagement-row__grid">
        <div className="stt-g4-engagement-row__head"><span>{String(index+1).padStart(2,"0")}</span><p>{item.code}</p><h2>{item.title}</h2></div>
        <dl className="stt-g4-engagement-row__body">
          <div><dt>적합한 상황</dt><dd>{item.fit}</dd></div>
          <div><dt>STT의 역할</dt><dd>{item.role}</dd></div>
          <div><dt>주요 산출물</dt><dd>{item.outputs}</dd></div>
          <div><dt>포함되지 않음</dt><dd>{item.excludes}</dd></div>
        </dl>
        <div className="stt-g4-engagement-row__cta"><Link to="/ko/start">거버넌스 판단 시작 →</Link></div>
      </div></section>)}
    </div>
  </div>;
}

export function KoreanAbout(){
  return <div className="stt-inst-page stt-ko-page">
    <UnifiedTitleHero
      kicker="ABOUT STT GOVERNANCE"
      title="STT Governance는 일반 컨설팅 회사가 아니라 고위 거버넌스 판단 플랫폼입니다."
      subtitle="목표는 의견을 더하는 것이 아니라 결과를 감당할 수 있는 통치 질서를 세우는 것입니다."
      lead="STT Governance는 중대한 의사결정, 기업 거버넌스, 가족 거버넌스를 핵심으로 합니다. 전략, 권한, 증거, 책임, 준법, 가족관계가 교차할 때 먼저 거버넌스 구조를 정하고 그 안에 필요한 전문 도구를 배치합니다."
      image="/visual-bank/stt/user-approved-six/about-stt.png"
      imagePosition="center right"
      id="ko-about-title"
    />
    <Section kicker="POSITION" title="STT는 개별 전문분야보다 상위에 있는 거버넌스 문제를 다룹니다.">
      <p>법무, 재무, 신탁, AI, 전략을 분리된 상품으로 보지 않습니다. 먼저 거버넌스 목적, 권한 경계, 증거 기반, 수용할 수 없는 위험을 정리한 뒤 어떤 전문 도구가 필요한지 결정합니다.</p>
      <Link to="/ko/how-stt-works">STT의 판단 방식 →</Link>
    </Section>
    <Section kicker="ECOSYSTEM" title="하나의 거버넌스 기반, 서로 다른 기능.">
      <div className="stt-inst-grid">
        <article><strong>STT Governance</strong><p>거버넌스 접수, 판단, 최종 제도 통합을 담당하는 핵심 플랫폼.</p></article>
        <article><strong>ESGAI</strong><p>증거, 제도, 의사결정 워크플로를 지원하는 거버넌스 운영체제·참모 기능. 독립 의사결정 주체가 아닙니다.</p></article>
        <article><strong>STT Press</strong><p>출판과 거버넌스 텍스트.</p></article>
        <article><strong>STT Intelligence</strong><p>연구, 판단, 장기 지식자산.</p></article>
        <article><strong>GCSDA</strong><p>독립 기관으로서 자체 웹사이트와 책임 경계에 따라 운영됩니다.</p></article>
      </div>
    </Section>
    <Section kicker="HUMAN AUTHORITY" title="기술은 확장될 수 있지만 의사결정 주권은 외주화할 수 없습니다.">
      <p>AI는 조사, 비교, 추적, 초안 작성의 효율을 높일 수 있습니다. 그러나 최종 의사결정, 권한 부여, 결과 책임은 인간 의사결정자와 거버넌스 절차에 남습니다.</p>
      <Link to="/ko/start">거버넌스 판단 시작 →</Link>
    </Section>
  </div>;
}

type IntakeData={
  name:string;contact:string;role:string;situation:string;undesired:string;desired:string;
  deadline_status:""|"無"|"有";deadline_date:string;event_type:string;"bot-field":string;
};
const EMPTY_DATA:IntakeData={name:"",contact:"",role:"",situation:"",undesired:"",desired:"",deadline_status:"",deadline_date:"",event_type:"","bot-field":""};

const ROLE_OPTIONS=[
  {value:"企業主",label:"기업 오너"},
  {value:"家族成員",label:"가족 구성원"},
  {value:"董事",label:"이사 / 보드 멤버"},
  {value:"經理人",label:"경영진 / 관리자"},
  {value:"專業顧問",label:"전문 자문가"},
  {value:"其他",label:"기타"},
] as const;

const EVENT_OPTIONS=[
  {value:"重大決策",label:"중대한 의사결정"},
  {value:"家族接班",label:"가족·기업승계"},
  {value:"股權治理",label:"지분·소유 거버넌스"},
  {value:"AI 治理",label:"AI 거버넌스"},
  {value:"機構合作",label:"기관 협력"},
  {value:"其他",label:"기타"},
] as const;

const ROUTE_DEFAULTS:Record<string,string>={
  "major-decision":"重大決策",
  "owner-dependence":"重大決策",
  succession:"家族接班",
  "family-ownership":"股權治理",
  "strategic-legal":"重大決策",
  "ai-governance":"AI 治理",
  "system-failure":"重大決策",
  "founder-legacy":"家族接班",
};

export function KoreanStart(){
  const [searchParams]=useSearchParams();
  const requestKey=useRef("");
  const inFlight=useRef(false);
  const [data,setData]=useState<IntakeData>(EMPTY_DATA);
  const [submitted,setSubmitted]=useState(false);
  const [receiptId,setReceiptId]=useState("");
  const [sending,setSending]=useState(false);
  const [sendError,setSendError]=useState("");

  useEffect(()=>{
    requestKey.current="";
    const type=searchParams.get("type"),route=searchParams.get("route");
    const eventType=type==="institution"?"機構合作":route?(ROUTE_DEFAULTS[route]??""):"";
    setData({...EMPTY_DATA,event_type:eventType});
    setSubmitted(false);setReceiptId("");setSendError("");
  },[searchParams]);

  const update=<K extends keyof IntakeData>(key:K,value:IntakeData[K])=>{
    requestKey.current="";
    setData(current=>({...current,[key]:value}));
  };

  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(inFlight.current)return;
    setSendError("");
    if([data.name,data.contact,data.situation,data.undesired,data.desired].some(value=>!value.trim())){
      setSendError("필수 항목을 입력해 주세요. 공백만 입력한 경우 전송할 수 없습니다.");return;
    }
    if(data.deadline_status==="有"&&!data.deadline_date){setSendError("의사결정 기한 날짜를 입력해 주세요.");return;}
    inFlight.current=true;requestKey.current||=crypto.randomUUID();setSending(true);
    try{
      const response=await fetch("/api/cooperation-submit",{
        method:"POST",
        headers:{"Content-Type":"application/json","Idempotency-Key":requestKey.current},
        signal:AbortSignal.timeout(20000),
        body:JSON.stringify({
          route:"governance-intake",route_label:"Governance Intake (Korean)",...data,
          source_channel:searchParams.get("utm_source")==="line"?"line":"website",
          source_account:"stt",landing_route:"/ko/start",
          utm_source:(searchParams.get("utm_source")||"").slice(0,80),
          utm_medium:(searchParams.get("utm_medium")||"").slice(0,80),
          utm_campaign:(searchParams.get("utm_campaign")||"").slice(0,120),
        }),
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok||!result.ok||result.delivery!=="resend-email")throw new Error("delivery_failed");
      setReceiptId(String(result.receiptId||""));setSubmitted(true);window.scrollTo({top:0,behavior:"smooth"});
    }catch{
      setSendError("전송이 완료되지 않았습니다. 입력 내용은 이 페이지에 그대로 남아 있습니다. 확인 후 다시 시도해 주세요.");
    }finally{inFlight.current=false;setSending(false);}
  };

  if(submitted)return <div className="stt-intake-page stt-ko-page bg-[#fbfaf7] text-[#26231f]">
    <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="접수가 완료되었습니다" lead="STT는 먼저 이 상황이 거버넌스 절차에 적합한지, 추가로 어떤 비민감 정보가 필요한지 확인합니다. 이메일 전달 성공만으로 공식 위임이 성립하는 것은 아닙니다." id="ko-start-success-title"/>
    <section className="px-6 py-14 lg:px-10 lg:py-20"><div className="mx-auto max-w-[900px] border-t border-[#d8c8ad] pt-8">
      {receiptId&&<p role="status" className="text-sm text-[#8f693d]">접수번호｜{receiptId}</p>}
      <button type="button" onClick={()=>setSubmitted(false)} className="mt-7 border border-[#b8925d] bg-transparent px-5 py-3 text-sm text-[#8f693d]">입력 양식으로 돌아가기</button>
    </div></section>
  </div>;

  return <div className="stt-intake-page stt-ko-page bg-[#fbfaf7] text-[#26231f]">
    <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="먼저 실제로 어떤 일이 일어나고 있는지 설명해 주세요." lead="현재 상황, 가장 피하고 싶은 결과, 적절히 처리되었을 때 도달하고 싶은 상태를 알려 주세요." id="ko-start-title"/>
    <section className="stt-intake-brief"><div><strong>첫 제출은 문제 구조화와 다음 단계 확인을 위한 것입니다.</strong><p>이 페이지는 즉시 법률 결론을 제공하지 않습니다. 신분증, 금융계정 인증정보, 의료정보, 완전한 영업비밀 등 초기 단계에서 불필요한 고위험 민감정보는 보내지 마세요.</p></div></section>
    <section className="px-6 py-12 lg:px-10 lg:py-18" id="intake-form"><form onSubmit={submit} aria-busy={sending} className="mx-auto max-w-[980px]">
      <fieldset disabled={sending} className="m-0 min-w-0 border-0 p-0"><legend className="sr-only">거버넌스 접수 정보</legend><div className="border-t border-[#d8c8ad]">
        <KoTextField number="01" label="성명 또는 호칭" value={data.name} onChange={v=>update("name",v)} required/>
        <KoTextField number="02" label="답변을 받을 수 있는 이메일 또는 연락 방법" value={data.contact} onChange={v=>update("contact",v)} required/>
        <KoSelectField number="03" label="이 사안에서의 역할" value={data.role} onChange={v=>update("role",v)} options={ROLE_OPTIONS} required/>
        <KoTextAreaField number="04" label="현재 어떤 일이 일어나고 있습니까?" value={data.situation} onChange={v=>update("situation",v)} required/>
        <KoTextAreaField number="05" label="가장 피하고 싶은 결과는 무엇입니까?" value={data.undesired} onChange={v=>update("undesired",v)} required/>
        <KoTextAreaField number="06" label="적절히 처리된다면 어떤 상태에 도달하고 싶습니까?" value={data.desired} onChange={v=>update("desired",v)} required/>
        <fieldset className="grid gap-5 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><legend className="sr-only">의사결정 기한 여부</legend><span className="font-serif text-xl text-[#b18a54]">07</span><div>
          <p className="font-serif text-xl leading-snug lg:text-2xl">명확한 의사결정 기한이 있습니까?</p>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            {[{value:"無",label:"없음"},{value:"有",label:"있음"}].map(option=><label key={option.value} className="inline-flex items-center gap-2 text-sm text-[#514b43]"><input type="radio" name="deadline_status" value={option.value} checked={data.deadline_status===option.value} onChange={()=>{update("deadline_status",option.value as "無"|"有");if(option.value==="無")update("deadline_date","");}} required/>{option.label}</label>)}
            {data.deadline_status==="有"&&<input type="date" aria-label="의사결정 기한" value={data.deadline_date} onChange={e=>update("deadline_date",e.target.value)} required className="border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm text-[#3b3732] outline-none focus:border-[#8f693d]"/>}
          </div>
        </div></fieldset>
        <KoSelectField number="08" label="사안 유형" value={data.event_type} onChange={v=>update("event_type",v)} options={EVENT_OPTIONS} required/>
      </div>
      <input type="text" name="bot-field" value={data["bot-field"]} onChange={e=>update("bot-field",e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden"/>
      </fieldset>
      <div className="border-t border-[#d8c8ad] pt-8">
        <p className="mb-5 text-sm leading-7">공식 <Link to="/privacy">개인정보 안내</Link> 와 <Link to="/professional-boundary">전문서비스 경계</Link> 는 현재 번체중문 원문을 공식 기준으로 관리합니다.</p>
        <p className="mb-5 text-sm leading-7 text-[#5f584f]">지속적인 거버넌스 연구와 일반 연락에는 <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">STT 공식 LINE</a> 도 이용할 수 있습니다. LINE은 공식 거버넌스 접수를 대체하지 않습니다.</p>
        <button type="submit" disabled={sending} className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white disabled:opacity-60">{sending?"전송 중…":"거버넌스 상황 전송"}</button>
        {sendError&&<p role="alert" className="mt-4 text-sm leading-7 text-[#8a4f3d]">{sendError}</p>}
      </div>
    </form></section>
  </div>;
}

function KoTextField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><input type="text" maxLength={number==="01"?120:300} required={required} value={value} onChange={e=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"/></span></label>;
}
function KoTextAreaField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><textarea maxLength={4000} required={required} value={value} onChange={e=>onChange(e.target.value)} rows={5} className="mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"/></span></label>;
}
function KoSelectField({number,label,value,onChange,options,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;options:readonly {value:string;label:string}[];required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><select required={required} value={value} onChange={e=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"><option value="">선택해 주세요</option>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select></span></label>;
}
