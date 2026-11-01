import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import { STT_OFFICIAL_LOGO_SRC } from "../sttLogo";
import { applyGovernedMetadata } from "../seo";

const STT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40783xkknh";

const JA_NAVIGATION = [
  { label: "STTの判断方法", path: "/ja/how-stt-works" },
  { label: "ガバナンス委任", path: "/ja/engagement" },
  { label: "STTについて", path: "/ja/about" },
] as const;

const JA_TO_ZH:Record<string,string>={
  "/ja":"/",
  "/ja/":"/",
  "/ja/how-stt-works":"/how-stt-works",
  "/ja/engagement":"/engagement",
  "/ja/about":"/about",
  "/ja/start":"/start",
};

const JA_TO_EN:Record<string,string>={
  "/ja":"/en",
  "/ja/":"/en",
  "/ja/how-stt-works":"/en/how-stt-works",
  "/ja/engagement":"/en/engagement",
  "/ja/about":"/en/about",
  "/ja/start":"/en/start",
};

const JA_TO_KO:Record<string,string>={
  "/ja":"/ko",
  "/ja/":"/ko",
  "/ja/how-stt-works":"/ko/how-stt-works",
  "/ja/engagement":"/ko/engagement",
  "/ja/about":"/ko/about",
  "/ja/start":"/ko/start",
};

export function JapaneseShell({children}:{children:ReactNode}){
  const location=useLocation();
  const [menuOpen,setMenuOpen]=useState(false);
  const zhPath=JA_TO_ZH[location.pathname]??"/";
  const enPath=JA_TO_EN[location.pathname]??"/en";
  const koPath=JA_TO_KO[location.pathname]??"/ko";

  useEffect(()=>{
    setMenuOpen(false);
    applyGovernedMetadata(location.pathname);
    const frame=requestAnimationFrame(()=>window.scrollTo({top:0,behavior:"instant"}));
    return()=>cancelAnimationFrame(frame);
  },[location.pathname]);

  return <div className="stt-g0-shell stt-ja-shell">
    <a className="site-skip-link" href="#main-content">本文へ移動</a>
    <header className="stt-g0-header">
      <div className="stt-g0-header__inner">
        <Link to="/ja" className="stt-g0-brand" aria-label="STT Governance 日本語版ホーム">
          <img src={STT_OFFICIAL_LOGO_SRC} alt="STT Governance"/>
        </Link>
        <nav className="stt-g0-desktop-nav" aria-label="メインナビゲーション">
          {JA_NAVIGATION.map(item=><NavLink key={item.path} to={item.path} className={({isActive})=>`stt-g0-nav-link${isActive?" is-active":""}`}>{item.label}</NavLink>)}
        </nav>
        <Link to="/ja/start" className="stt-g0-primary-cta">ガバナンス判断を始める</Link>
        <div className="stt-g0-lang-cluster" aria-label="言語切替">
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁中</Link>
          <Link to={enPath} hrefLang="en" lang="en">EN</Link>
          <Link to={koPath} hrefLang="ko" lang="ko">한국어</Link>
        </div>
        <button type="button" className="stt-g0-menu-button" aria-label={menuOpen?"メニューを閉じる":"メニューを開く"} aria-expanded={menuOpen} aria-controls="stt-ja-mobile-menu" onClick={()=>setMenuOpen(v=>!v)}>
          {menuOpen?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}
        </button>
      </div>
      {menuOpen&&<nav id="stt-ja-mobile-menu" className="stt-g0-mobile-menu" aria-label="モバイルナビゲーション">
        <div className="stt-g0-mobile-menu__inner">
          <div className="stt-g0-mobile-menu__primary">
            {JA_NAVIGATION.map((item,index)=><NavLink key={item.path} to={item.path}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.label}</strong></NavLink>)}
          </div>
          <div className="stt-g0-mobile-menu__secondary">
            <Link to="/ja/start">ガバナンス判断を始める</Link>
            <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁體中文</Link>
            <Link to={enPath} hrefLang="en" lang="en">English</Link>
          <Link to={koPath} hrefLang="ko" lang="ko">한국어</Link>
            <Link to={koPath} hrefLang="ko" lang="ko">한국어</Link>
          </div>
        </div>
      </nav>}
    </header>

    <main id="main-content" tabIndex={-1} className="stt-g0-main">{children}</main>

    <footer className="stt-g0-footer">
      <div className="stt-g0-footer__inner">
        <div className="stt-g0-footer__brand">
          <strong>STT Governance｜策略智庫智慧治理</strong>
          <span>ガバナンス判断と制度設計</span>
        </div>
        <nav className="stt-g0-footer__links" aria-label="フッターナビゲーション">
          <Link to="/ja/how-stt-works">STTの判断方法</Link>
          <Link to="/ja/engagement">ガバナンス委任</Link>
          <Link to="/ja/about">STTについて</Link>
          <Link to="/ja/start">ガバナンス判断を始める</Link>
          <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer">STT 公式LINE ↗</a>
          <Link to={zhPath} hrefLang="zh-Hant-TW" lang="zh-Hant-TW">繁體中文</Link>
          <Link to={enPath} hrefLang="en" lang="en">English</Link>
        </nav>
      </div>
    </footer>
  </div>;
}

function Section({kicker,title,children}:{kicker?:string;title:string;children:ReactNode}){
  return <section className="stt-inst-section stt-ja-section">
    <div className="stt-inst-shell">
      {kicker&&<p className="stt-inst-kicker">{kicker}</p>}
      <h2>{title}</h2>
      <div className="stt-inst-body">{children}</div>
    </div>
  </section>;
}

export function JapaneseHome(){
  return <div className="stt-inst-page stt-ja-page">
    <UnifiedTitleHero
      kicker="STT GOVERNANCE · JUDGMENT · INSTITUTIONAL DESIGN"
      title="重要な意思決定が不可逆になる前に、統治可能な構造へ。"
      lead="STT Governanceは、企業・ファミリー・重大意思決定者が行動に移る前に、真の問題、証拠、権限、責任、選択肢を整理し、その判断が説明でき、引き継がれ、追跡できるガバナンス構造へと整えます。"
      image="/visual-bank/stt/user-approved-six/home.png"
      imagePosition="center right"
      id="ja-home-title"
    >
      <Link to="/ja/how-stt-works">STTの判断方法を見る →</Link>
      <Link className="cis-primary" to="/ja/start">ガバナンス判断を始める</Link>
    </UnifiedTitleHero>

    <Section kicker="START FROM THE REAL PROBLEM" title="すぐに解決策へ進むべきではない問題があります。">
      <div className="stt-inst-grid stt-ja-situation-grid">
        <article><strong>ファミリーと事業承継</strong><p>経営の引継ぎが始まっていても、権限、株式、家族の期待が一致していない。</p><Link to="/ja/start?route=succession">この状況を説明する →</Link></article>
        <article><strong>株式と権限</strong><p>株主構成、取締役会、家族の影響力、経営権が互いにずれ始めている。</p><Link to="/ja/start?route=family-ownership">この状況を説明する →</Link></article>
        <article><strong>重大意思決定</strong><p>提携、投資、資産処分、紛争などが不可逆な段階に近づいている。</p><Link to="/ja/start?route=major-decision">この状況を説明する →</Link></article>
        <article><strong>AIと意思決定ガバナンス</strong><p>AIが意思決定に入っている一方で、権限、責任、証拠、人間の統制が明確ではない。</p><Link to="/ja/start?route=ai-governance">この状況を説明する →</Link></article>
      </div>
    </Section>

    <Section kicker="GOVERNANCE JUDGMENT" title="STTは、最初から答えを増やすのではなく、判断構造を整えます。">
      <p>ガバナンス判断では、まず出来事を定義し、誰が決定権を持ち、誰が結果を引き受けるのかを確認します。その上で証拠、レッドライン、選択肢を比較し、なぜ進めるのか、あるいは進めないのかを記録できる状態にします。</p>
      <div className="stt-ja-process-line" aria-label="7段階のガバナンス判断プロセス">
        <span>出来事</span><span>権限</span><span>証拠</span><span>レッドライン</span><span>選択肢</span><span>判断</span><span>制度化</span>
      </div>
      <Link to="/ja/how-stt-works">7段階の判断プロセスを見る →</Link>
    </Section>

    <Section kicker="HUMAN AUTHORITY" title="AIはスタッフ機能を強化できますが、統治主体にはなりません。">
      <p>AIは調査、比較、追跡、作業草案を支援できます。しかし、証拠の採否、権限付与、実行可否、結果責任は、人間の意思決定者とガバナンス手続に残ります。</p>
      <Link to="/ja/about">STT Governanceについて →</Link>
    </Section>
  </div>;
}

const METHOD_STEPS=[
  {n:"01",id:"event-definition",title:"出来事の定義",input:"発言、時系列、既知の制約",question:"実際に何が起きたのか。何が立場、説明、症状にすぎないのか。",output:"出来事の枠組み、問題定義、確認事項"},
  {n:"02",id:"stakeholder-authority",title:"関係者と権限",input:"関係者、法人、株式、役職、契約、実質的支配",question:"誰が決められ、拒否でき、情報へアクセスでき、誰が結果を負うのか。",output:"関係者・権限マップ"},
  {n:"03",id:"evidence",title:"証拠",input:"文書、記録、規則、契約、財務情報など",question:"何が事実で、何が仮定か。現在の判断を覆し得るものは何か。",output:"証拠一覧、欠落、要立証事項"},
  {n:"04",id:"hard-stop",title:"レッドライン",input:"法務、信頼、財務、評判、統治、不可逆リスク",question:"どの結果が受け入れ難く、または極めて回復困難か。",output:"停止条件、リスク閾値、禁止条件"},
  {n:"05",id:"options",title:"選択肢",input:"実行可能な道筋、条件、制約",question:"まず除外すべき選択肢は何か。残る各案のコストは何か。",output:"選択肢マトリクス、条件付きルート"},
  {n:"06",id:"judgment",title:"ガバナンス判断",input:"出来事、権限、証拠、レッドライン、選択肢",question:"今できること、できないこと、どの条件なら進められるのか。",output:"Decision Memo、必要に応じ GO / CONDITIONAL GO / HOLD / NO-GO"},
  {n:"07",id:"governance",title:"制度への実装",input:"確認済み判断、責任、フォローアップ",question:"判断を継続可能な権限、プロセス、記録、追跡へどう変えるか。",output:"ガバナンス設計、制度記録、責任追跡"},
] as const;

export function JapaneseMethod(){
  return <div className="stt-g3-method stt-ja-page">
    <UnifiedTitleHero
      kicker="GOVERNANCE JUDGMENT"
      title="STTはどのようにガバナンス判断を行うのか"
      lead="STTは結論を急ぎません。まず、問題が正しく定義されているか、証拠は十分か、権限の境界を越えていないか、誰が責任を負うか、リスクはまだ可逆かを確認します。"
      id="ja-method-title"
    />
    <nav className="stt-g3-index" aria-label="7段階のガバナンス判断">
      <div className="stt-g3-shell stt-g3-index__grid">
        {METHOD_STEPS.map(step=><a key={step.id} href={"#"+step.id}><span>{step.n}</span><strong>{step.title}</strong></a>)}
      </div>
    </nav>
    <section className="stt-g3-section stt-g3-foundations"><div className="stt-g3-shell">
      <p className="stt-g3-kicker">JUDGMENT FOUNDATIONS</p>
      <h2>重大判断を支える4つの基礎。</h2>
      <p className="stt-g3-foundations__intro">問題、証拠、トレードオフ、権限と責任は別々のサービスではありません。一つの重大判断の中で同時に検証されるべき基礎です。</p>
      <div className="stt-g3-foundation-grid">
        {[["01","Problem","真の問題"],["02","Evidence","信頼できる証拠"],["03","Trade-off","コストとトレードオフ"],["04","Authority & Accountability","誰が決め、誰が責任を負うか"]].map(([number,en,desc])=><article key={number}><span>{number}</span><small>{en}</small><h3>{desc}</h3></article>)}
      </div>
    </div></section>
    <section className="stt-g3-section stt-g3-process"><div className="stt-g3-shell">
      <p className="stt-g3-kicker">SEVEN-STAGE JUDGMENT PROCESS</p>
      <h2>ガバナンス判断は答えではなく、追跡可能な意思決定プロセスです。</h2>
      <div className="stt-g3-steps">
        {METHOD_STEPS.map(step=><article className="stt-g3-step" id={step.id} key={step.id}>
          <div className="stt-g3-step__number">{step.n}</div>
          <header><small>{step.id.toUpperCase()}</small><h3>{step.title}</h3></header>
          <dl>
            <div><dt>入力</dt><dd>{step.input}</dd></div>
            <div><dt>核心質問</dt><dd>{step.question}</dd></div>
            <div><dt>成果</dt><dd>{step.output}</dd></div>
          </dl>
        </article>)}
      </div>
    </div></section>
    <section className="stt-g3-section stt-g3-ai-boundary"><div className="stt-g3-shell stt-g3-ai-boundary__grid">
      <div><p className="stt-g3-kicker">AI GOVERNANCE BOUNDARY</p><h2>AIはガバナンススタッフであり、統治主体ではありません。</h2></div>
      <div><p>AIは整理、比較、追跡、不整合の発見を支援できます。証拠の採否、権限付与、実行判断は、人間の意思決定者とガバナンス手続に残ります。</p><Link to="/ja/engagement">ガバナンス委任を見る →</Link></div>
    </div></section>
  </div>;
}

const ENGAGEMENTS=[
  {code:"GOVERNANCE REVIEW",title:"初期ガバナンスレビュー",fit:"重大な出来事がまだ十分に定義されていない、または関係者の認識が対立している場合。",role:"出来事、関係者、権限、証拠の欠落、不可逆リスク、次の道筋を整理します。",outputs:"Governance Dossier / Decision Brief / 次段階の情報リスト",excludes:"法的意見、法定会計、税務、投資その他の規制専門業務、別途合意のない継続支援。"},
  {code:"GOVERNANCE ARCHITECTURE",title:"ガバナンス設計",fit:"家族、株式、会社統治、契約、専門ツール、部門権限をまたぐ問題。",role:"個別の専門ツールを全体のガバナンス目的に戻し、制度、権限、プロセス、専門協働の構造を設計します。",outputs:"Governance Architecture / Role & Authority Map / Decision Rules",excludes:"弁護士、税務、監査、投資など適切な資格者が実施すべき専門業務そのもの。"},
  {code:"GOVERNANCE MANDATE",title:"年間ガバナンス委任",fit:"企業やファミリーが重大意思決定、承継、統治移行、複数の連動事案に継続的に直面する場合。",role:"重大事項のゲート、定期レビュー、意思決定判断、制度・証拠記録、必要な専門連携を構築します。",outputs:"Annual Governance Protocol / Decision Memo / Evidence & Policy Record",excludes:"無制限の随時相談、24時間の私的サポート、専門機能の包括的外注。"},
] as const;

export function JapaneseEngagement(){
  return <div className="stt-g4-engagement stt-ja-page">
    <UnifiedTitleHero
      kicker="GOVERNANCE ENGAGEMENT"
      title="正式なガバナンスが必要な問題を、単発相談のままにしない。"
      lead="STTは、複雑性、意思決定レベル、継続期間に応じて、初期ガバナンスレビュー、ガバナンス設計、年間ガバナンス委任という異なる深度で関与します。"
      id="ja-engagement-title"
    />
    <nav className="stt-g4-index" aria-label="3つのガバナンス委任レベル"><div className="stt-g4-shell stt-g4-index__grid">
      {ENGAGEMENTS.map((item,index)=><a key={item.code} href={"#ja-engagement-"+index}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><small>{item.code}</small></a>)}
    </div></nav>
    <div className="stt-g4-engagements">
      {ENGAGEMENTS.map((item,index)=><section className="stt-g4-engagement-row" id={"ja-engagement-"+index} key={item.code}><div className="stt-g4-shell stt-g4-engagement-row__grid">
        <div className="stt-g4-engagement-row__head"><span>{String(index+1).padStart(2,"0")}</span><p>{item.code}</p><h2>{item.title}</h2></div>
        <dl className="stt-g4-engagement-row__body">
          <div><dt>適合する状況</dt><dd>{item.fit}</dd></div>
          <div><dt>STTの役割</dt><dd>{item.role}</dd></div>
          <div><dt>主な成果物</dt><dd>{item.outputs}</dd></div>
          <div><dt>含まれないもの</dt><dd>{item.excludes}</dd></div>
        </dl>
        <div className="stt-g4-engagement-row__cta"><Link to="/ja/start">ガバナンス判断を始める →</Link></div>
      </div></section>)}
    </div>
  </div>;
}

export function JapaneseAbout(){
  return <div className="stt-inst-page stt-ja-page">
    <UnifiedTitleHero
      kicker="ABOUT STT GOVERNANCE"
      title="STT Governanceは、一般的なコンサルティング会社ではなく、高位のガバナンス判断プラットフォームです。"
      subtitle="目的は意見を増やすことではなく、結果を引き受けられる統治秩序をつくることです。"
      lead="STT Governanceは、重大意思決定、企業ガバナンス、ファミリーガバナンスを中核に据えます。戦略、権限、証拠、責任、法令遵守、家族関係が交差する場面で、まずガバナンス構造を定め、その中に必要な専門ツールを配置します。"
      image="/visual-bank/stt/user-approved-six/about-stt.png"
      imagePosition="center right"
      id="ja-about-title"
    />
    <Section kicker="POSITION" title="STTは、個別専門分野の上位にあるガバナンス課題を扱います。">
      <p>法務、財務、信託、AI、戦略を個別商品として扱うのではなく、まずガバナンス目的、権限境界、証拠、許容できないリスクを整理し、その後に必要な専門ツールと役割を決めます。</p>
      <Link to="/ja/how-stt-works">STTの判断方法 →</Link>
    </Section>
    <Section kicker="ECOSYSTEM" title="一つのガバナンス基盤、異なる機能。">
      <div className="stt-inst-grid">
        <article><strong>STT Governance</strong><p>ガバナンス受理、判断、制度統合を担う中核プラットフォーム。</p></article>
        <article><strong>ESGAI</strong><p>証拠、制度、意思決定ワークフローを支えるガバナンスOS／スタッフ機能。独立した意思決定主体ではありません。</p></article>
        <article><strong>STT Press</strong><p>出版とガバナンステキスト。</p></article>
        <article><strong>STT Intelligence</strong><p>研究、判断、長期知識資産。</p></article>
        <article><strong>GCSDA</strong><p>独立した機関として、独自のウェブサイトと責任境界で運営されます。</p></article>
      </div>
    </Section>
    <Section kicker="HUMAN AUTHORITY" title="技術は拡張できても、意思決定主権は外部化できません。">
      <p>AIは調査、比較、追跡、草案作成の効率を高めます。しかし最終意思決定、権限付与、結果責任は人間の意思決定者とガバナンス手続に残ります。</p>
      <Link to="/ja/start">ガバナンス判断を始める →</Link>
    </Section>
  </div>;
}

type IntakeData={
  name:string;contact:string;role:string;situation:string;undesired:string;desired:string;
  deadline_status:""|"無"|"有";deadline_date:string;event_type:string;"bot-field":string;
};
const EMPTY_DATA:IntakeData={name:"",contact:"",role:"",situation:"",undesired:"",desired:"",deadline_status:"",deadline_date:"",event_type:"","bot-field":""};

const ROLE_OPTIONS=[
  {value:"企業主",label:"企業オーナー"},
  {value:"家族成員",label:"ファミリーメンバー"},
  {value:"董事",label:"取締役／ボードメンバー"},
  {value:"經理人",label:"経営幹部／マネージャー"},
  {value:"專業顧問",label:"専門アドバイザー"},
  {value:"其他",label:"その他"},
] as const;

const EVENT_OPTIONS=[
  {value:"重大決策",label:"重大意思決定"},
  {value:"家族接班",label:"ファミリー・事業承継"},
  {value:"股權治理",label:"株式・所有ガバナンス"},
  {value:"AI 治理",label:"AIガバナンス"},
  {value:"機構合作",label:"機関協力"},
  {value:"其他",label:"その他"},
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

export function JapaneseStart(){
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
      setSendError("必須項目を入力してください。空白のみの入力は送信できません。");return;
    }
    if(data.deadline_status==="有"&&!data.deadline_date){setSendError("意思決定期限の日付を入力してください。");return;}
    inFlight.current=true;requestKey.current||=crypto.randomUUID();setSending(true);
    try{
      const response=await fetch("/api/cooperation-submit",{
        method:"POST",
        headers:{"Content-Type":"application/json","Idempotency-Key":requestKey.current},
        signal:AbortSignal.timeout(20000),
        body:JSON.stringify({
          route:"governance-intake",route_label:"Governance Intake (Japanese)",...data,
          source_channel:searchParams.get("utm_source")==="line"?"line":"website",
          source_account:"stt",landing_route:"/ja/start",
          utm_source:(searchParams.get("utm_source")||"").slice(0,80),
          utm_medium:(searchParams.get("utm_medium")||"").slice(0,80),
          utm_campaign:(searchParams.get("utm_campaign")||"").slice(0,120),
        }),
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok||!result.ok||result.delivery!=="resend-email")throw new Error("delivery_failed");
      setReceiptId(String(result.receiptId||""));setSubmitted(true);window.scrollTo({top:0,behavior:"smooth"});
    }catch{
      setSendError("送信は完了していません。入力内容はこのページに残っています。確認後、もう一度お試しください。");
    }finally{inFlight.current=false;setSending(false);}
  };

  if(submitted)return <div className="stt-intake-page stt-ja-page bg-[#fbfaf7] text-[#26231f]">
    <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="送信を受け付けました" lead="STTはまず、この状況がガバナンスプロセスに適しているか、追加でどのような非機密情報が必要かを確認します。メール送信成功だけで正式な委任が成立するわけではありません。" id="ja-start-success-title"/>
    <section className="px-6 py-14 lg:px-10 lg:py-20"><div className="mx-auto max-w-[900px] border-t border-[#d8c8ad] pt-8">
      {receiptId&&<p role="status" className="text-sm text-[#8f693d]">受付番号｜{receiptId}</p>}
      <button type="button" onClick={()=>setSubmitted(false)} className="mt-7 border border-[#b8925d] bg-transparent px-5 py-3 text-sm text-[#8f693d]">入力フォームへ戻る</button>
    </div></section>
  </div>;

  return <div className="stt-intake-page stt-ja-page bg-[#fbfaf7] text-[#26231f]">
    <UnifiedTitleHero kicker="GOVERNANCE ENGAGEMENT" title="まず、実際に何が起きているのかを説明してください。" lead="現在何が起きているか、最も避けたい結果は何か、適切に処理された場合にどのような状態を目指したいかをお知らせください。" id="ja-start-title"/>
    <section className="stt-intake-brief"><div><strong>最初の送信は、問題整理と次のステップ確認のためです。</strong><p>このページで即時の法的結論は提供しません。身分証明書、金融口座の認証情報、医療情報、完全な営業秘密など、初期段階で不要な高機密情報は送信しないでください。</p></div></section>
    <section className="px-6 py-12 lg:px-10 lg:py-18" id="intake-form"><form onSubmit={submit} aria-busy={sending} className="mx-auto max-w-[980px]">
      <fieldset disabled={sending} className="m-0 min-w-0 border-0 p-0"><legend className="sr-only">ガバナンス受理情報</legend><div className="border-t border-[#d8c8ad]">
        <JaTextField number="01" label="お名前または呼び名" value={data.name} onChange={v=>update("name",v)} required/>
        <JaTextField number="02" label="返信を受け取れるメールまたは連絡方法" value={data.contact} onChange={v=>update("contact",v)} required/>
        <JaSelectField number="03" label="この件におけるあなたの立場" value={data.role} onChange={v=>update("role",v)} options={ROLE_OPTIONS} required/>
        <JaTextAreaField number="04" label="現在、何が起きていますか？" value={data.situation} onChange={v=>update("situation",v)} required/>
        <JaTextAreaField number="05" label="最も避けたい結果は何ですか？" value={data.undesired} onChange={v=>update("undesired",v)} required/>
        <JaTextAreaField number="06" label="適切に処理された場合、どのような状態を目指しますか？" value={data.desired} onChange={v=>update("desired",v)} required/>
        <fieldset className="grid gap-5 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><legend className="sr-only">意思決定期限の有無</legend><span className="font-serif text-xl text-[#b18a54]">07</span><div>
          <p className="font-serif text-xl leading-snug lg:text-2xl">明確な意思決定期限はありますか？</p>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            {[{value:"無",label:"なし"},{value:"有",label:"あり"}].map(option=><label key={option.value} className="inline-flex items-center gap-2 text-sm text-[#514b43]"><input type="radio" name="deadline_status" value={option.value} checked={data.deadline_status===option.value} onChange={()=>{update("deadline_status",option.value as "無"|"有");if(option.value==="無")update("deadline_date","");}} required/>{option.label}</label>)}
            {data.deadline_status==="有"&&<input type="date" aria-label="意思決定期限" value={data.deadline_date} onChange={e=>update("deadline_date",e.target.value)} required className="border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm text-[#3b3732] outline-none focus:border-[#8f693d]"/>}
          </div>
        </div></fieldset>
        <JaSelectField number="08" label="案件の種類" value={data.event_type} onChange={v=>update("event_type",v)} options={EVENT_OPTIONS} required/>
      </div>
      <input type="text" name="bot-field" value={data["bot-field"]} onChange={e=>update("bot-field",e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden"/>
      </fieldset>
      <div className="border-t border-[#d8c8ad] pt-8">
        <p className="mb-5 text-sm leading-7">正式な <Link to="/privacy">プライバシー通知</Link> と <Link to="/professional-boundary">専門サービス境界</Link> は現在、繁体字中国語版を正式原文として管理しています。</p>
        <p className="mb-5 text-sm leading-7 text-[#5f584f]">継続的なガバナンス研究や一般的な連絡には <a href={STT_LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">STT公式LINE</a> も利用できます。LINEは正式なガバナンス受理を代替しません。</p>
        <button type="submit" disabled={sending} className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white disabled:opacity-60">{sending?"送信中…":"ガバナンス状況を送信"}</button>
        {sendError&&<p role="alert" className="mt-4 text-sm leading-7 text-[#8a4f3d]">{sendError}</p>}
      </div>
    </form></section>
  </div>;
}

function JaTextField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><input type="text" maxLength={number==="01"?120:300} required={required} value={value} onChange={e=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"/></span></label>;
}
function JaTextAreaField({number,label,value,onChange,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><textarea maxLength={4000} required={required} value={value} onChange={e=>onChange(e.target.value)} rows={5} className="mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"/></span></label>;
}
function JaSelectField({number,label,value,onChange,options,required=false}:{number:string;label:string;value:string;onChange:(value:string)=>void;options:readonly {value:string;label:string}[];required?:boolean}){
  return <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8"><span className="font-serif text-xl text-[#b18a54]">{number}</span><span><span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span><select required={required} value={value} onChange={e=>onChange(e.target.value)} className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"><option value="">選択してください</option>{options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}</select></span></label>;
}
