import { Link, useParams } from "react-router-dom";
import { PublicationNavigation } from "./PublicationLibrary";
import ContentTypeHero from "../components/ContentTypeHero";
import "../styles/research-papers.css";

type Paper = {
  slug:string; series:string; theme:string; title:string; english:string; author:string; identity:string; year:string; heyzine:string; cover:string; audience:string[];
  publication?: { journal:string; volumeIssue:string; pages?:string; citation:string; sourceUrl:string };
  positioning:string; problem:string; abstract:string; propositions:string[]; method:string; findings:string[]; today:string; related:{label:string;href:string}[];
};
const PAPERS: Paper[] = [
  {
    slug:"legal-service-sustainability", series:"01", theme:"法律服務 × 信任 × CRM × 服務永續",
    title:"顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    english:"Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm",
    author:"莊鈞翔", identity:"逢甲大學商學博士學位學程｜博士論文｜指導教授：翁慈青博士", year:"2024 年 1 月",
    heyzine:"https://heyzine.com/flip-book/1631fcf2b8.html", cover:"/research-covers/series-01.webp",
    audience:["法律服務機構合夥人與治理者","專業服務與企業客戶關係管理主管","研究信任、服務品質與長期關係者"],
    positioning:"從法律服務業的顧客關係管理出發，研究專業服務如何透過信任、服務設計與持續關係，形成可延續的服務能力。",
    problem:"高度專業、個人化的法律服務，如何從一次性案件交易，轉向能理解顧客需求、建立信任並維持長期合作的服務關係。",
    abstract:"研究以 A 國際法律事務所為個案，分析顧客關係管理在法律服務中的具體做法，包括專案經理、顧客管理系統、溝通服務與回饋機制，並討論其對服務品質、顧客忠誠與服務永續的影響。",
    propositions:["A 國際法律事務所如何透過專案經理及專業分工處理顧客需求？","如何透過顧客溝通、資訊管理與回饋改善服務流程？","如何建立顧客信任、滿意度與持續性的合作關係？"],
    method:"質性個案研究；以 A 國際法律事務所為對象，結合文獻回顧及深度訪談，訪談所內八位律師與法務，整理內部協作與外部顧客關係的實務資料。並非量化因果驗證。",
    findings:["研究訪談整理出專業分工、專案管理、顧客資訊管理及溝通回饋等具體服務作法。","原論文將顧客需求、信任、滿意與忠誠視為長期關係管理的重要面向。","原論文建議法律服務可從單次案件交易，延伸至持續性的顧客關係及企業策略支援。"],
    today:"今日 STT Governance 將這條研究線索延伸為「高信任專業服務治理」：先建立資訊邊界、角色責任、決策節點與持續回饋，再談工具與效率。",
    related:[{label:"公司治理與法遵",href:"/research/corporate-governance-compliance"},{label:"治理委任",href:"/engagement"},{label:"專業服務與資訊邊界",href:"/professional-boundary"}]
  },
  {
    slug:"corporate-governance-compliance", series:"02", theme:"公司治理 × 法遵 × 風險管理 × 法律策略",
    title:"企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
    english:"Introducing corporate governance in law compliance into business strategy: a case study of external legal advisory teams",
    author:"莊鈞翔", identity:"逢甲大學商學博士學位學程博士生｜研究論文", year:"2023 年 10 月",
    publication:{journal:"《僑光學報》",volumeIssue:"第 46 期",citation:"莊鈞翔（2023）。〈企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例〉。《僑光學報》，第 46 期。",sourceUrl:"https://lib.ocu.edu.tw/wSite/lp?ctNode=885&idPath=290_775_895_782_885&mp=1"},
    heyzine:"https://heyzine.com/flip-book/df41ab25a0.html", cover:"/research-covers/series-02.webp",
    audience:["董事會、企業治理與策略決策者","法遵、法務、風險與內稽管理者","外部法律顧問與跨專業治理團隊"],
    positioning:"把公司治理與法遵由事後處理，前移到企業策略、風險辨識、內控管理與決策形成的前端。",
    problem:"企業如何在日常營運與重大決策中，把法律風險、利害關係人、內控與永續要求納入策略，而不是等爭議發生後再處理。",
    abstract:"研究探討外部法律顧問團隊如何協助企業導入公司治理法遵精神，涵蓋長期經營策略、法律風險、談判協商、內控與營運管理評估，並以預防性思維降低企業決策風險。",
    propositions:["企業策略如何納入公司治理與法律遵循？","外部法律顧問團隊如何提供風險辨識、協商與內控管理的支援？","企業聘請內部法務、傳統法律顧問及外部專業團隊有何服務差異？"],
    method:"質性研究；採半結構式訪談，遴選律師與法務共十二位專業人士，將訪談內容轉為逐字資料並依研究問題歸納分析；研究並未以企業導入前後的量化績效檢驗成效。",
    findings:["研究受訪意見支持在企業決策前納入法律風險辨識、契約與商務協商等專業判斷。","研究比較內部法務、傳統法律顧問與外部專業團隊，提出專業分工及跨領域合作的建議。","原文主張將預防法學與公司治理納入企業策略；降低風險與提升績效屬研究的管理建議，而非已量化證實的因果效果。"],
    today:"這項研究是 STT「先治理、後執行」方法的早期研究來源之一：重大決策先看權責、風險、利害關係人與制度邊界，再決定執行工具。",
    related:[{label:"法律服務與服務永續",href:"/research/legal-service-sustainability"},{label:"STT 如何判讀",href:"/how-stt-works"},{label:"公司治理主題",href:"/columns?theme=corporate-governance"}]
  },
  {
    slug:"family-business-succession", series:"03", theme:"家族治理 × 接班 × 世代 × 家族價值",
    title:"臺灣企業接班人的佈局規劃與傳承家族價值",
    english:"Factors for Successful Succession of Taiwanese Family Businesses",
    author:"紀又綺、莊鈞翔", identity:"紀又綺｜逢甲大學會計研究所碩士；莊鈞翔｜逢甲大學商學博士學位學程博士生", year:"2023 年 6 月",
    publication:{journal:"《會計與公司治理》",volumeIssue:"第 18 卷第 1 期",pages:"73–101",citation:"紀又綺、莊鈞翔（2023）。〈臺灣企業接班人的佈局規劃與傳承家族價值〉。《會計與公司治理》，18（1），73–101。",sourceUrl:"https://lawdata.com.tw/tw/detail.aspx?no=497758"},
    heyzine:"https://heyzine.com/flip-book/eba7786a8a.html", cover:"/research-covers/series-03.webp",
    audience:["家族企業創辦人與接班人","家族辦公室與企業治理成員","關注家族價值與跨世代傳承者"],
    positioning:"把企業接班從『誰來接』提升為家族價值、治理制度、人才梯隊與權力移轉的整體設計。",
    problem:"臺灣家族企業如何降低世代交替中的權力衝突、能力斷層與家族價值流失，使接班不只是職位移轉，而是企業與家族共同續存。",
    abstract:"研究整理東西方家族企業與接班文獻，討論接班考量、接班人培育、佈局規劃與家族價值傳承，指出成功接班需及早建立接班梯隊、策略團隊、公司治理與溝通機制。",
    propositions:["家族企業接班人選任與培育需要哪些準備？","內部資深管理者與外部專業顧問如何協助成立接班策略團隊？","家族價值及企業治理如何在代際交接中延續？"],
    method:"採敘述式文獻分析法，蒐集東西方家族企業、接班規劃、接班人培育及家族價值相關文獻。原論文研究限制明載，未對臺灣知名家族企業管理者進行深度訪談；不應描述為已完成企業個案實證研究。",
    findings:["原論文歸納接班不僅是人選更替，還涉及職位、權力、經營責任與組織制度移轉。","原論文建議提早規劃接班梯隊，結合內部資深主管及外部專業顧問協助培育與溝通。","原論文強調家族價值及德性的傳承；此為敘述式文獻分析所得研究觀點，並非量化因果驗證。"],
    today:"STT 將接班視為『家族治理工程』：把人選、權力、資產、角色、董事會、家族價值與退出機制放在同一張治理圖上處理。",
    related:[{label:"世代企業家與領導",href:"/research/generational-entrepreneurs"},{label:"家族與接班",href:"/problems#family-succession"},{label:"開始治理判讀",href:"/start"}]
  },
  {
    slug:"generational-entrepreneurs", series:"04", theme:"企業領導 × 創新 × 世代企業家 × 經營績效",
    title:"不同世代企業家人格特質、創新能力對企業經營績效之影響－以領導風格為中介變數",
    english:"The Relationship among Personality Traits of Different Generation Entrepreneurs, Innovation Ability and Performance – Leadership Style as an Intermediary Variable",
    author:"莊鈞翔", identity:"嶺東科技大學高階主管企管碩士在職專班（EMBA）｜碩士論文｜指導教授：劉自強博士、張旭玲博士", year:"2017 年 6 月",
    heyzine:"https://heyzine.com/flip-book/0793d084ff.html", cover:"/research-covers/series-04.webp",
    audience:["企業主、經營團隊與接班人","組織發展與人才培育主管","研究領導風格、創新與績效者"],
    positioning:"從不同世代企業家的個人特質、創新能力與領導風格，探討其如何透過領導影響企業經營績效。",
    problem:"當企業進入世代交替，企業主、二代接班人與專業經理人的差異，如何透過人格特質、創新能力與領導風格反映在組織績效。",
    abstract:"研究以不同世代企業家為研究對象，探討人格特質與創新能力如何影響領導風格與企業經營績效，並檢驗領導風格的中介效果。",
    propositions:["人格特質及創新能力與領導風格是否呈統計關聯？","領導風格與企業經營績效是否呈統計關聯？","領導風格是否呈現人格特質、創新能力與經營績效間的中介效果？"],
    method:"問卷調查法，以中部地區國際扶輪社會員為研究對象，2016 年 11 月 10 日至 12 月 31 日發放 120 份問卷，取得有效問卷 100 份（有效回收率約 83.3%）；以 SPSS 21.0 進行描述統計、信效度、相關與迴歸分析。原論文亦揭示樣本與事後回溯填答的限制。",
    findings:["原論文統計分析指出，人格特質與領導風格呈顯著正向關係。","原論文分析指出，創新能力與領導風格、領導風格與企業經營績效呈顯著正向關係。","原論文報告領導風格具有中介效果；受樣本及研究設計限制，不宜將統計關聯直接表述為所有企業普遍成立的因果結論。"],
    today:"這項研究形成 STT 對『接班不是換人，而是治理能力移轉』的基礎視角：人格、創新與領導必須再被轉譯為角色、權責與制度。",
    related:[{label:"家族企業接班",href:"/research/family-business-succession"},{label:"STT 如何判讀",href:"/how-stt-works"},{label:"治理委任",href:"/engagement"}]
  }
];

export function getResearchPaper(slug:string){ return PAPERS.find(p=>p.slug===slug); }
export { PAPERS };


const researchTopics = [
  { number:"01", title:"專業服務的長期信任", detail:"從顧客關係管理理解專業服務如何建立可持續的合作能力。" },
  { number:"02", title:"治理法遵進入企業策略", detail:"從法律顧問與企業決策的協作，思考治理如何前移。" },
  { number:"03", title:"家族企業的制度性傳承", detail:"接班不只是人選，還包括價值、權責與組織安排。" },
  { number:"04", title:"領導與創新的實證關係", detail:"以人格特質、創新能力和領導風格理解經營績效。" }
] as const;

function PaperCard({paper}:{paper:Paper}) {
  const href="/research/"+paper.slug;
  return <article className={"research-card series-"+paper.series}>
    <Link className="research-card__cover" to={href} aria-label={"閱讀"+paper.title+"的研究介紹"}>
      <img src={paper.cover} alt={paper.title+"｜STT 研究論文正式閱讀版封面"} loading="lazy" decoding="async" />
    </Link>
    <div className="research-card__text">
      <p className="research-series">STT RESEARCH PAPERS <span>／ SERIES {paper.series}</span></p>
      <p className="research-card-theme">{paper.theme}</p>
      <h2><Link to={href}>{paper.title}</Link></h2>
      <p className="research-card-english" lang="en">{paper.english}</p>
      <p className="research-card-meta">{paper.author} <span aria-hidden="true">｜</span> {paper.year}</p>
      <p className="research-card-lead">{paper.positioning}</p>
      <p className="research-card-problem"><strong>研究問題</strong>{paper.problem}</p>
      <div className="research-card-actions">
        <Link className="research-card-primary" to={href}>閱讀完整研究介紹 →</Link>
        <a href={paper.heyzine} target="_blank" rel="noopener noreferrer">直接線上閱覽 ↗</a>
      </div>
    </div>
  </article>;
}

export function ResearchOverview(){
  return <div className="research-shell">
    <ContentTypeHero
      id="research-overview-title"
      image="/visual-bank/stt/content-types-20261105/research-hero.png"
      kicker="STT RESEARCH PAPERS / RESEARCH SERIES 01–04"
      englishTitle="STT Research Papers"
      title="研究論文典藏"
      thesis="以研究證據理解治理問題，以制度設計承接長期判斷。"
      description="四篇研究分別討論專業服務與信任、企業策略與公司治理法遵、家族企業接班，以及跨世代領導與創新績效。每一篇均設有研究介紹、方法與主要發現，以及正式線上閱讀入口。"
      anchorHref="#research-catalog"
      anchorText="瀏覽四篇研究介紹 ↓"
    />
    <div className="research-wrap">
      <PublicationNavigation />
      <section className="research-intro" aria-labelledby="research-intro-title">
        <p className="research-section-kicker">THE RESEARCH FOUNDATION</p>
        <h2 id="research-intro-title">研究的價值，在於使治理判斷有可追溯的依據。</h2>
        <p>研究論文與出版著作有不同的功能。論文呈現研究問題、方法、資料範圍及發現；出版則把研究與實務理解整合為可持續閱讀的治理思想。本典藏保留學術來源的辨識性，也讓讀者看見研究如何進入今日 STT Governance 的制度視角。</p>
      </section>
      <section className="research-series-overview" aria-labelledby="series-heading">
        <h2 id="series-heading">四條研究脈絡</h2>
        <div className="research-series-steps">{researchTopics.map(topic=><div key={topic.number}><span>{topic.number}</span><h3>{topic.title}</h3><p>{topic.detail}</p></div>)}</div>
      </section>
      <section className="research-catalog" id="research-catalog" aria-labelledby="catalog-heading">
        <div className="research-catalog-heading"><p className="research-section-kicker">PAPERS & READING EDITIONS</p><h2 id="catalog-heading">研究典藏目錄</h2><p>封面取自四篇正式閱讀版本；選取論文即可進入完整的研究介紹、重點發現與 Heyzine 線上閱讀。</p></div>
        <div className="research-grid">{PAPERS.map(p=><PaperCard key={p.slug} paper={p}/>)}</div>
      </section>
      <div className="research-back"><Link to="/insights">← 返回研究與出版</Link><Link to="/books">前往出版著作 →</Link></div>
    </div>
  </div>;
}

function NumberedResearchList({items}:{items:string[]}) {
  return <ol className="research-numbered-list">{items.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol>;
}

export function ResearchPaperPage(){
  const {slug=""}=useParams(); const p=getResearchPaper(slug);
  if(!p) return <div className="research-wrap research-missing"><h1>找不到此研究</h1><Link to="/research">返回研究總覽 →</Link></div>;
  return <article className={"research-shell paper-page series-"+p.series}>
    <section className="research-hero research-detail-hero" aria-labelledby="research-paper-title">
      <div className="research-detail-art" style={{backgroundImage:"url("+p.cover+")"}} aria-hidden="true" />
      <div className="research-hero-inner research-detail-layout">
        <div className="research-detail-copy">
          <p className="research-eyebrow">STT RESEARCH PAPERS / RESEARCH SERIES {p.series}</p>
          <p className="research-theme">{p.theme}</p>
          <h1 id="research-paper-title">{p.title}</h1>
          <p className="research-english" lang="en">{p.english}</p>
          <dl className="research-meta">
            <div><dt>作者</dt><dd>{p.author}</dd></div>
            <div><dt>研究身份與學術來源</dt><dd>{p.identity}</dd></div>
            <div><dt>{p.publication ? "正式發表日期" : "學位論文日期"}</dt><dd>{p.year}</dd></div>
             {p.publication && <div><dt>刊登期刊</dt><dd>{p.publication.journal} {p.publication.volumeIssue}{p.publication.pages ? `，頁 ${p.publication.pages}` : ""}</dd></div>}
          </dl>
          <p className="research-hero-thesis">{p.positioning}</p>
          <div className="research-hero-actions"><a className="research-primary" href={p.heyzine} target="_blank" rel="noopener noreferrer">線上閱讀研究全文 ↗</a><a href="#research-structure">先閱讀研究介紹 ↓</a></div>
        </div>
        <figure className="research-detail-cover">
          <img src={p.cover} alt={p.title+"｜STT 研究論文正式閱讀版封面"} loading="eager" decoding="async" />
          <figcaption>STT RESEARCH PAPERS <span>— SERIES {p.series}</span></figcaption>
        </figure>
      </div>
    </section>
    <div className="research-wrap research-body">
      <PublicationNavigation />
      <section id="research-structure" className="research-editorial-intro" aria-labelledby="paper-positioning-title">
        <p className="research-section-kicker">RESEARCH POSITIONING</p>
        <h2 id="paper-positioning-title">這篇研究在處理什麼治理問題</h2>
        <p className="research-emphasis">{p.positioning}</p>
        <p>{p.problem}</p>
      </section>
      <section aria-labelledby="paper-abstract-title">
        <p className="research-section-kicker">RESEARCH ABSTRACT</p>
        <h2 id="paper-abstract-title">研究摘要與核心脈絡</h2>
        <p>{p.abstract}</p>
      </section>
      <section aria-labelledby="paper-propositions-title">
        <p className="research-section-kicker">RESEARCH QUESTIONS & PROPOSITIONS</p>
        <h2 id="paper-propositions-title">核心研究議題（依原文整理）</h2>
        <p>以下是依原論文研究問題與討論重點整理的閱讀提問，並非原文另外提出或驗證的新假說；研究依據及限制以原始論文為準。</p>
        <NumberedResearchList items={p.propositions}/>
      </section>
      <section className="research-method-section" aria-labelledby="paper-method-title">
        <p className="research-section-kicker">METHODOLOGY & EVIDENCE</p>
        <h2 id="paper-method-title">研究方法與資料範圍</h2>
        <p>{p.method}</p>
      </section>
      {p.publication && <section aria-labelledby="paper-publication-title">
        <p className="research-section-kicker">ACADEMIC PUBLICATION RECORD</p>
        <h2 id="paper-publication-title">正式期刊書目與學術引用</h2>
        <p>{p.publication.citation}</p>
        <p><a href={p.publication.sourceUrl} target="_blank" rel="noopener noreferrer">查核正式期刊書目 ↗</a></p>
      </section>}
      <section aria-labelledby="paper-findings-title">
        <p className="research-section-kicker">KEY RESEARCH FINDINGS</p>
        <h2 id="paper-findings-title">主要研究發現</h2>
        <NumberedResearchList items={p.findings}/>
        <p className="research-evidence-note">本頁為研究閱讀導引。質性訪談、敘述式文獻分析與問卷統計有各自的適用範圍；不能將本文摘要解讀為已對所有企業完成因果或成效驗證。</p>
      </section>
      <section className="research-governance" aria-labelledby="paper-governance-title">
        <div className="research-governance-copy">
          <p className="research-section-kicker">FROM RESEARCH TO GOVERNANCE</p>
          <h2 id="paper-governance-title">STT 後續治理延伸（非原論文實證結論）</h2>
          <p>{p.today}</p>
          <p className="research-governance-chain">研究命題 → 證據理解 → 治理判讀 → 制度設計</p>
        </div>
        <figure className="research-governance-visual">
          <img className="research-governance-image" src={p.cover} alt={p.title+"｜治理主題圖像"} loading="lazy" decoding="async" />
        </figure>
      </section>
      <section aria-labelledby="paper-audience-title">
        <p className="research-section-kicker">READERS & RESEARCH CONTEXT</p>
        <h2 id="paper-audience-title">適合誰閱讀</h2>
        <div className="research-audience">{p.audience.map(a=><span key={a}>{a}</span>)}</div>
      </section>
      <section className="research-reader" aria-labelledby="paper-reading-title">
        <p className="research-section-kicker">OFFICIAL EXTERNAL READING</p>
        <h2 id="paper-reading-title">正式外部閱讀入口</h2>
        <p>本站不內嵌、不預覽論文全文，也不提供 PDF 下載。需要閱讀完整論文時，請由下方正式外部入口前往 Heyzine。</p>
        <div className="research-actions"><a className="research-primary" href={p.heyzine} target="_blank" rel="noopener noreferrer">前往 Heyzine 閱讀全文 ↗</a><Link to="/research">返回研究典藏 →</Link></div>
      </section>
      <section aria-labelledby="paper-related-title">
        <p className="research-section-kicker">RELATED RESEARCH & GOVERNANCE</p>
        <h2 id="paper-related-title">相關研究與治理主題</h2>
        <div className="research-related">{p.related.map(x=><Link key={x.href} to={x.href}>{x.label} →</Link>)}</div>
      </section>
      <div className="research-back"><Link to="/research">← 返回研究典藏</Link><Link to="/books">瀏覽出版著作 →</Link></div>
    </div>
  </article>;
}
