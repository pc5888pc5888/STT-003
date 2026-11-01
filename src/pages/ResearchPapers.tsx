import { Link, useParams } from "react-router-dom";
import { PublicationNavigation } from "./PublicationLibrary";
import "../styles/research-papers.css";

type Paper = {
  slug:string; series:string; theme:string; title:string; english:string; author:string; identity:string; year:string; heyzine:string; cover:string; audience:string[];
  positioning:string; problem:string; abstract:string; propositions:string[]; method:string; findings:string[]; today:string; related:{label:string;href:string}[];
};
const PAPERS: Paper[] = [
  {
    slug:"legal-service-sustainability", series:"01", theme:"法律服務 × 信任 × CRM × 服務永續",
    title:"顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    english:"Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm",
    author:"莊鈞翔", identity:"逢甲大學商學博士學位學程｜博士論文｜指導教授：翁慈青博士", year:"2024 年 1 月",
    heyzine:"https://heyzine.com/flip-book/5b35a9e836.html", cover:"/research-covers/series-01.webp",
    audience:["法律服務機構合夥人與治理者","專業服務與企業客戶關係管理主管","研究信任、服務品質與長期關係者"],
    positioning:"從法律服務業的顧客關係管理出發，研究專業服務如何透過信任、服務設計與持續關係，形成可延續的服務能力。",
    problem:"高度專業、個人化的法律服務，如何從一次性案件交易，轉向能理解顧客需求、建立信任並維持長期合作的服務關係。",
    abstract:"研究以 A 國際法律事務所為個案，分析顧客關係管理在法律服務中的具體做法，包括專案經理、顧客管理系統、溝通服務與回饋機制，並討論其對服務品質、顧客忠誠與服務永續的影響。",
    propositions:["顧客關係管理不只是業務工具，而是專業服務的治理結構。","信任、溝通、專業分工與資訊管理共同影響顧客關係的持續性。","服務創新需回到顧客需求與可持續交付，而非單次案件完成。"],
    method:"質性研究，以 A 國際法律事務所為個案，採文獻回顧與深度訪談，訪談所內八位律師及法務，整理內部關係與外部顧客關係之實務。",
    findings:["建立專案管理、專業分工、顧客資訊管理與持續回訪，有助於提升服務品質與顧客關係。","顧客滿意、忠誠與長期合作並非單一結果，而是由服務流程、信任與持續互動共同形成。","法律服務可由單一案件供應模式，轉向更接近企業夥伴與策略支援的關係。"],
    today:"今日 STT Governance 將這條研究線索延伸為「高信任專業服務治理」：先建立資訊邊界、角色責任、決策節點與持續回饋，再談工具與效率。",
    related:[{label:"公司治理與法遵",href:"/research/corporate-governance-compliance"},{label:"治理委任",href:"/engagement"},{label:"專業服務與資訊邊界",href:"/professional-boundary"}]
  },
  {
    slug:"corporate-governance-compliance", series:"02", theme:"公司治理 × 法遵 × 風險管理 × 法律策略",
    title:"企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
    english:"Integrating the Spirit of Corporate Governance and Legal Compliance into Business Strategy: The Assistance of External Legal Advisory Teams",
    author:"莊鈞翔", identity:"逢甲大學商學博士學位學程博士生｜研究論文", year:"2024 年 1 月",
    heyzine:"https://heyzine.com/flip-book/beb87825ff.html", cover:"/research-covers/series-02.webp",
    audience:["董事會、企業治理與策略決策者","法遵、法務、風險與內稽管理者","外部法律顧問與跨專業治理團隊"],
    positioning:"把公司治理與法遵由事後處理，前移到企業策略、風險辨識、內控管理與決策形成的前端。",
    problem:"企業如何在日常營運與重大決策中，把法律風險、利害關係人、內控與永續要求納入策略，而不是等爭議發生後再處理。",
    abstract:"研究探討外部法律顧問團隊如何協助企業導入公司治理法遵精神，涵蓋長期經營策略、法律風險、談判協商、內控與營運管理評估，並以預防性思維降低企業決策風險。",
    propositions:["法遵應成為企業策略的一部分，而非單獨的法律檢查。","外部法律顧問團隊的價值，在於將法律、管理與風險判斷整合進決策。","公司治理的核心是使權力、責任、資訊與監督機制可被辨識與承擔。"],
    method:"質性研究，採半結構式訪談，遴選律師與法務共十二位專業人士，並依研究問題整理訪談內容與實務觀點。",
    findings:["企業若能將法遵精神前移，可降低法律與營運風險並改善內部管理。","外部法律顧問團隊可提供多專業觀點，補足單一內部法務或單一律師的限制。","治理、風險與策略並非分離議題，需在企業決策過程中被整合。"],
    today:"這項研究是 STT「先治理、後執行」方法的早期研究來源之一：重大決策先看權責、風險、利害關係人與制度邊界，再決定執行工具。",
    related:[{label:"法律服務與服務永續",href:"/research/legal-service-sustainability"},{label:"STT 如何判讀",href:"/how-stt-works"},{label:"公司治理主題",href:"/columns?theme=corporate-governance"}]
  },
  {
    slug:"family-business-succession", series:"03", theme:"家族治理 × 接班 × 世代 × 家族價值",
    title:"臺灣企業接班人的佈局規劃與傳承家族價值",
    english:"Factors for Successful Succession of Taiwanese Family Businesses",
    author:"紀又綺、莊鈞翔", identity:"紀又綺｜逢甲大學會計研究所碩士；莊鈞翔｜逢甲大學商學博士學位學程博士生", year:"2024 年 1 月",
    heyzine:"https://heyzine.com/flip-book/e98bb4535f.html", cover:"/research-covers/series-03.webp",
    audience:["家族企業創辦人與接班人","家族辦公室與企業治理成員","關注家族價值與跨世代傳承者"],
    positioning:"把企業接班從『誰來接』提升為家族價值、治理制度、人才梯隊與權力移轉的整體設計。",
    problem:"臺灣家族企業如何降低世代交替中的權力衝突、能力斷層與家族價值流失，使接班不只是職位移轉，而是企業與家族共同續存。",
    abstract:"研究整理東西方家族企業與接班文獻，討論接班考量、接班人培育、佈局規劃與家族價值傳承，指出成功接班需及早建立接班梯隊、策略團隊、公司治理與溝通機制。",
    propositions:["接班是權力、所有權、經營權、角色與價值的多重移轉。","接班人培育必須與企業治理、人才梯隊及制度化同步。","家族價值若無法被轉譯為可傳承的行為與制度，單純財富與職位移轉不足以支撐永續。"],
    method:"採敘述式文獻分析法，蒐集家族企業背景、東西方傳承、接班因素、接班人培育等文獻，整理臺灣家族企業成功接班的關鍵因素。",
    findings:["成功接班需提早規劃，讓接班人有足夠時間理解組織、文化與治理責任。","內部資深主管與外部專業顧問可共同形成接班策略團隊，協助第一代與接班人完成移轉。","企業傳承同時是家族價值與德性的傳遞，不能只處理資產與職位。"],
    today:"STT 將接班視為『家族治理工程』：把人選、權力、資產、角色、董事會、家族價值與退出機制放在同一張治理圖上處理。",
    related:[{label:"世代企業家與領導",href:"/research/generational-entrepreneurs"},{label:"家族與接班",href:"/problems#family-succession"},{label:"開始治理判讀",href:"/start"}]
  },
  {
    slug:"generational-entrepreneurs", series:"04", theme:"企業領導 × 創新 × 世代企業家 × 經營績效",
    title:"不同世代企業家人格特質、創新能力對企業經營績效之影響－以領導風格為中介變數",
    english:"The Relationship among Personality Traits of Different Generation Entrepreneurs, Innovation Ability and Performance – Leadership Style as an Intermediary Variable",
    author:"莊鈞翔", identity:"嶺東科技大學高階主管企管碩士在職專班（EMBA）｜碩士論文｜指導教授：劉自強博士、張旭玲博士", year:"2017 年 6 月",
    heyzine:"https://heyzine.com/flip-book/a46332e65b.html", cover:"/research-covers/series-04.webp",
    audience:["企業主、經營團隊與接班人","組織發展與人才培育主管","研究領導風格、創新與績效者"],
    positioning:"從不同世代企業家的個人特質、創新能力與領導風格，探討其如何透過領導影響企業經營績效。",
    problem:"當企業進入世代交替，企業主、二代接班人與專業經理人的差異，如何透過人格特質、創新能力與領導風格反映在組織績效。",
    abstract:"研究以不同世代企業家為研究對象，探討人格特質與創新能力如何影響領導風格與企業經營績效，並檢驗領導風格的中介效果。",
    propositions:["人格特質影響領導風格。","創新能力影響領導風格。","領導風格影響經營績效，並可能形成中介效果。"],
    method:"問卷調查法。2016 年 11 月 10 日至 12 月 31 日發放 120 份問卷，回收有效問卷 100 份，有效回收率 83%；使用 SPSS 21.0 進行描述統計、信效度、相關與迴歸分析。",
    findings:["人格特質對領導能力呈正向影響。","創新能力對領導能力呈正向影響。","領導能力對績效能力呈正向影響。","人格特質與創新能力皆會透過領導能力的中介效果影響企業經營績效。"],
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
    <section className="research-hero research-overview-hero" aria-labelledby="research-overview-title">
      <div className="research-hero-inner research-overview-layout">
        <div className="research-overview-copy">
          <p className="research-eyebrow">STT RESEARCH PAPERS / RESEARCH SERIES 01–04</p>
          <h1 id="research-overview-title">STT Research Papers<span className="research-title-chinese">研究論文典藏</span></h1>
          <p className="research-overview-lead">以研究證據理解治理問題，以制度設計承接長期判斷。</p>
          <p>四篇研究分別討論專業服務與信任、企業策略與公司治理法遵、家族企業接班，以及跨世代領導與創新績效。每一篇均設有研究介紹、方法與主要發現，以及正式線上閱讀入口。</p>
          <a className="research-text-jump" href="#research-catalog">瀏覽四篇研究介紹 ↓</a>
        </div>
        <div className="research-cover-shelf" aria-label="四篇 STT 研究論文封面">
          {PAPERS.map(p=><Link key={p.slug} className={"research-shelf-cover research-shelf-"+p.series} to={"/research/"+p.slug} aria-label={"研究系列 "+p.series+"："+p.title}>
            <img src={p.cover} alt={p.title+"封面"} loading="eager" decoding="async" />
          </Link>)}
        </div>
      </div>
    </section>
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
            <div><dt>研究年份</dt><dd>{p.year}</dd></div>
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
        <h2 id="paper-propositions-title">核心研究命題</h2>
        <p>從研究問題進入具體命題，辨識研究所關注的變數、制度關係與實務脈絡；完整論證及引用資料仍以原論文為準。</p>
        <NumberedResearchList items={p.propositions}/>
      </section>
      <section className="research-method-section" aria-labelledby="paper-method-title">
        <p className="research-section-kicker">METHODOLOGY & EVIDENCE</p>
        <h2 id="paper-method-title">研究方法與資料範圍</h2>
        <p>{p.method}</p>
      </section>
      <section aria-labelledby="paper-findings-title">
        <p className="research-section-kicker">KEY RESEARCH FINDINGS</p>
        <h2 id="paper-findings-title">主要研究發現</h2>
        <NumberedResearchList items={p.findings}/>
        <p className="research-evidence-note">本頁為閱讀導引與研究重點整理，不以摘要取代原始研究論證；各項方法、資料與結論應以正式論文內容為準。</p>
      </section>
      <section className="research-governance" aria-labelledby="paper-governance-title">
        <div className="research-governance-copy">
          <p className="research-section-kicker">FROM RESEARCH TO GOVERNANCE</p>
          <h2 id="paper-governance-title">研究如何進入 STT Governance 的制度視角</h2>
          <p>{p.today}</p>
          <p className="research-governance-chain">研究命題 → 證據理解 → 治理判讀 → 制度設計</p>
        </div>
        <div className="research-governance-image" style={{backgroundImage:"url("+p.cover+")"}} role="img" aria-label={p.title+"封面下方的治理主題圖像"} />
      </section>
      <section aria-labelledby="paper-audience-title">
        <p className="research-section-kicker">READERS & RESEARCH CONTEXT</p>
        <h2 id="paper-audience-title">適合誰閱讀</h2>
        <div className="research-audience">{p.audience.map(a=><span key={a}>{a}</span>)}</div>
      </section>
      <section className="research-reader" aria-labelledby="paper-reading-title">
        <p className="research-section-kicker">OFFICIAL ONLINE READING</p>
        <h2 id="paper-reading-title">正式線上閱覽</h2>
        <p>完整論文使用正式 Heyzine 線上翻閱版本。桌面裝置可於下方閱覽；手機與小型螢幕請使用外部閱讀入口。本站不提供 PDF 下載。</p>
        <div className="research-actions"><a className="research-primary" href={p.heyzine} target="_blank" rel="noopener noreferrer">進入 Heyzine 閱讀全文 ↗</a><Link to="/research">返回研究典藏 →</Link></div>
        <div className="research-embed"><iframe title={p.title+"｜正式線上閱覽"} src={p.heyzine} loading="lazy" allowFullScreen /></div>
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
