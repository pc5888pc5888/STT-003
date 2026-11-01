import { Link, useParams } from "react-router-dom";
import "../styles/research-papers.css";

type Paper = {
  slug:string; series:string; theme:string; title:string; english:string; author:string; identity:string; year:string; heyzine:string;
  positioning:string; problem:string; abstract:string; propositions:string[]; method:string; findings:string[]; today:string; related:{label:string;href:string}[];
};
const PAPERS: Paper[] = [
  {
    slug:"legal-service-sustainability", series:"01", theme:"法律服務 × 信任 × CRM × 服務永續",
    title:"顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    english:"Discussion on Customer Relationship Management in Service Sustainability: A Case Study of A International Attorney Firm",
    author:"莊鈞翔", identity:"逢甲大學商學博士學位學程｜博士論文｜指導教授：翁慈青博士", year:"2024 年 1 月",
    heyzine:"https://heyzine.com/flip-book/5b35a9e836.html",
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
    heyzine:"https://heyzine.com/flip-book/beb87825ff.html",
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
    heyzine:"https://heyzine.com/flip-book/e98bb4535f.html",
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
    heyzine:"https://heyzine.com/flip-book/a46332e65b.html",
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

function PaperCard({paper}:{paper:Paper}) {
  return <article className={"research-card series-"+paper.series}>
    <p className="research-series">RESEARCH SERIES {paper.series}</p>
    <h2>{paper.title}</h2><p className="research-card-theme">{paper.theme}</p>
    <p className="research-year">{paper.year}</p><p>{paper.positioning}</p>
    <Link to={"/research/"+paper.slug}>閱讀研究介紹 →</Link>
  </article>;
}
export function ResearchOverview(){
  return <div className="research-shell">
    <section className="research-hero overview-hero"><div className="research-hero-inner">
      <p className="research-eyebrow">STT RESEARCH PAPERS / Research Series</p>
      <h1>STT Research Papers｜研究論文典藏</h1>
      <p>研究不是履歷陳列，而是 STT 治理思想、方法與制度設計的可追溯來源。這裡整理研究脈絡，完整閱讀統一進入 Heyzine。</p>
    </div></section>
    <main className="research-wrap"><div className="research-grid">{PAPERS.map(p=><PaperCard key={p.slug} paper={p}/>)}</div>
      <div className="research-back"><Link to="/insights">← 返回研究與出版</Link></div>
    </main>
  </div>;
}
export function ResearchPaperPage(){
  const {slug=""}=useParams(); const p=getResearchPaper(slug);
  if(!p) return <div className="research-wrap research-missing"><h1>找不到此研究</h1><Link to="/research">返回研究總覽 →</Link></div>;
  return <article className={"research-shell paper-page series-"+p.series}>
    <section className="research-hero"><div className="research-hero-inner">
      <p className="research-eyebrow">STT RESEARCH PAPERS / Research Series {p.series}</p>
      <p className="research-theme">{p.theme}</p><h1>{p.title}</h1><p className="research-english">{p.english}</p>
      <dl className="research-meta"><div><dt>作者</dt><dd>{p.author}</dd></div><div><dt>研究身份</dt><dd>{p.identity}</dd></div><div><dt>年份</dt><dd>{p.year}</dd></div></dl>
    </div></section>
    <div className="research-wrap research-body">
      <section><p className="research-section-kicker">RESEARCH POSITIONING</p><h2>研究定位</h2><p>{p.positioning}</p></section>
      <section><h2>這篇研究處理什麼問題</h2><p>{p.problem}</p></section>
      <section><h2>研究摘要</h2><p>{p.abstract}</p></section>
      <section><h2>核心研究命題</h2><ul>{p.propositions.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section><h2>研究方法</h2><p>{p.method}</p></section>
      <section><h2>主要研究發現</h2><ul>{p.findings.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section className="research-today"><p className="research-section-kicker">FROM RESEARCH TO GOVERNANCE</p><h2>從這篇研究到今日 STT Governance</h2><p>{p.today}</p></section>
      <section className="research-reader"><h2>線上閱覽論文</h2><p>本站不提供 PDF 下載。正式閱讀端使用 Heyzine。</p>
        <div className="research-actions"><a className="research-primary" href={p.heyzine} target="_blank" rel="noopener noreferrer">線上閱覽論文 ↗</a><a href={p.heyzine} target="_blank" rel="noopener noreferrer">另開閱讀視窗 ↗</a></div>
        <div className="research-embed"><iframe title={p.title+" 線上閱讀"} src={p.heyzine} loading="lazy" allowFullScreen /></div>
      </section>
      <section><h2>相關研究／相關治理主題</h2><div className="research-related">{p.related.map(x=><Link key={x.href} to={x.href}>{x.label} →</Link>)}</div></section>
      <div className="research-back"><Link to="/research">← 返回研究總覽</Link></div>
    </div>
  </article>;
}
