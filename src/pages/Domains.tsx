import type { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Domain = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  principles: { title: string; body: string }[];
  related: { label: string; path: string }[];
};

const domains: Domain[] = [
  {
    slug: "corporate-governance",
    eyebrow: "CORPORATE GOVERNANCE & DECISION RIGHTS",
    title: "公司治理與決策權",
    subtitle: "治理不是增加程序，而是讓誰能決定、誰能否決、誰必須說明，以及哪些事項必須被升級處理，都有清楚制度位置。",
    principles: [
      { title: "Decision Rights", body: "把個人權威與組織權限分開，明確界定董事會、經營團隊、負責人與代理人的決策範圍。" },
      { title: "Reserved Matters", body: "重大投資、併購、融資、跨境、關係人交易與不可逆承諾，不應只依一般授權邏輯處理。" },
      { title: "Evidence & Record", body: "重大決定需要保留資料來源、反對意見、假設、會議紀錄與責任鏈，使日後能夠重建判斷。" },
      { title: "Exception & Recovery", body: "治理必須處理例外、代理、緊急接管與回復能力，而不只是描述正常情況下的組織圖。" },
    ],
    related: [{ label: "企業承接與決策權", path: "/problems/owner-dependence" }, { label: "重大決策", path: "/problems/major-decision" }],
  },
  {
    slug: "family-succession",
    eyebrow: "FAMILY GOVERNANCE & SUCCESSION",
    title: "家族治理與接班",
    subtitle: "家族治理不是資產分配的同義詞；接班也不是職稱與股權移轉的同義詞。真正需要治理的是所有權、控制權、資訊權、關係權、異議與退出。",
    principles: [
      { title: "Ownership & Control", body: "區分誰擁有、誰控制、誰經營，以及重大事項究竟由個人、家族或公司制度決定。" },
      { title: "Authority Transfer", body: "接班要處理權力何時移交、如何驗收、上一代保留哪些事項，以及原權力何時真正退出。" },
      { title: "Family Decision Rules", body: "家族重大事項需要共同確認的程序、僵局處理、異議與退出，而不能只靠默契或口頭理解。" },
      { title: "Governance Memory", body: "創辦人的判斷、底線與重大事件背景必須被留下，否則下一代只能繼承口號，無法理解判斷如何形成。" },
    ],
    related: [{ label: "接班與權力交接", path: "/problems/succession" }, { label: "家族與所有權", path: "/problems/family-ownership" }],
  },
  {
    slug: "strategic-legal",
    eyebrow: "STRATEGIC + LEGAL JUDGMENT",
    title: "策略＋法務",
    subtitle: "法律上可以主張，不代表商業上值得執行。法律位置、時間、現金流、談判籌碼、關係、聲譽與可逆性必須進入同一張決策地圖。",
    principles: [
      { title: "Legal Position", body: "先確認權利義務、程序位置、時效與證據，再談行動，不以商業直覺取代法律判讀。" },
      { title: "Strategic Value", body: "同時評估執行成本、時間、現金流、關係與替代方案，避免法律勝算被誤當成商業答案。" },
      { title: "Counterparty Options", body: "正式判讀必須把對手可以採取的最佳反方行動納入，而不是只看自己的權利。" },
      { title: "Action Threshold", body: "比較談判、暫停、退出、訴訟或其他路徑的可逆性與最大損失，再決定何時升級。" },
    ],
    related: [{ label: "策略＋法務判讀", path: "/problems/strategic-legal" }],
  },
  {
    slug: "compliance-contract",
    eyebrow: "ENTERPRISE COMPLIANCE & CONTRACT GOVERNANCE",
    title: "企業法遵與契約治理",
    subtitle: "這一領域處理企業的契約、授權、交易、付款、證據、例外與法律風險；它與《內在法遵》所處理的內在治理思想明確分流。",
    principles: [
      { title: "Compliance Gate", body: "重要交易在執行前就要知道哪些條件需要法律、法遵或權限審查，而不是事後救火。" },
      { title: "Contract Governance", body: "契約不只管理簽署，也管理版本、核准、履約、變更、證據與責任。" },
      { title: "Authorization", body: "支付、採購、對外承諾、資料與印鑑等高影響行為，必須具有清楚授權與例外升級規則。" },
      { title: "Audit Trail", body: "重大交易、指示與異常事件保留可追溯紀錄，讓責任與後續修正有依據。" },
    ],
    related: [{ label: "制度失效", path: "/problems/system-failure" }, { label: "《內在法遵》思想正典", path: "/books/internal-compliance" }],
  },
  {
    slug: "human-ai-governance",
    eyebrow: "HUMAN–AI CONSTITUTIONAL GOVERNANCE",
    title: "AI Governance｜人機治憲",
    subtitle: "AI 治理真正處理的不是模型有多強，而是能力變成權力之前，誰有權授權、限制、覆核、停止、退出、申訴與承擔最後責任。",
    principles: [
      { title: "Authority", body: "模型可以分析、建議或執行到什麼程度，必須由治理主體預先決定，而不是由工具能力自然擴張。" },
      { title: "Data & Evidence", body: "資料能否進模型、輸出是否可以被當成證據、哪些來源必須被驗證，都需要明確門檻。" },
      { title: "Human Review", body: "高影響領域需要真正可介入、可否決、可停止的人類覆核，而不是形式上的按鈕或名義審批。" },
      { title: "Exit & Recovery", body: "治理成熟度不只看是否能使用 AI，也看供應商、模型或工作流失效時，組織是否仍有替代路徑與接管能力。" },
    ],
    related: [{ label: "AI Governance 問題入口", path: "/problems/ai-governance" }, { label: "理解 STT 如何判讀", path: "/how-stt-works" }],
  },
];

function DomainShell({ children }: { children: ReactNode }) {
  return <div className="domain-root"><style>{`
    .domain-root{min-height:100vh;background:#fbfaf7;color:#2b261f}.domain-root *{box-sizing:border-box}.domain-wrap{max-width:1180px;margin:0 auto;padding:0 28px}.domain-hero{padding:88px 0 72px;border-bottom:1px solid #ddcfba}.domain-kicker{font-size:10px;letter-spacing:.26em;color:#8b642f}.domain-hero h1{max-width:940px;margin:20px 0 0;font:400 clamp(42px,5vw,68px)/1.32 'Noto Serif TC',Georgia,serif}.domain-hero p{max-width:820px;margin:26px 0 0;color:#746b60;line-height:2}.domain-body{padding:68px 0 110px}.domain-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #ddcfba;border-left:1px solid #ddcfba}.domain-card{min-height:230px;padding:30px;border-right:1px solid #ddcfba;border-bottom:1px solid #ddcfba;background:#fffdf9}.domain-card small{color:#9a6f3b;letter-spacing:.14em}.domain-card h2,.domain-card h3{margin:16px 0 0;font:400 24px/1.5 'Noto Serif TC',Georgia,serif}.domain-card p{margin:12px 0 0;color:#6f675e;line-height:1.9}.domain-card button,.domain-link{margin-top:22px;border:0;border-bottom:1px solid #a9793e;background:transparent;color:#805a30;padding:0 0 5px;cursor:pointer;text-decoration:none}.domain-detail{display:grid;grid-template-columns:260px 1fr;gap:48px;padding:34px 0;border-bottom:1px solid #ddcfba}.domain-detail h2{margin:0;font:400 23px/1.5 'Noto Serif TC',Georgia,serif}.domain-detail p{margin:0;color:#6f675e;line-height:1.95}.domain-related{display:flex;gap:18px;flex-wrap:wrap;margin-top:40px}.domain-related button{border:1px solid #c7a16b;background:#fffdf9;color:#805a30;padding:11px 15px;cursor:pointer}@media(max-width:780px){.domain-grid{grid-template-columns:1fr}.domain-detail{grid-template-columns:1fr}.domain-hero{padding:66px 0 54px}}
  `}</style>{children}</div>;
}

export function DomainsIndex(){
  const navigate=useNavigate();
  return <DomainShell><section className="domain-hero"><div className="domain-wrap"><div className="domain-kicker">GOVERNANCE KNOWLEDGE DOMAINS</div><h1>這些不是服務套餐，而是 STT 用來理解複雜問題的治理知識領域。</h1><p>同一個事件可能同時涉及公司治理、接班、法務、契約或 AI。知識領域的作用，是幫助判讀與專業路由，而不是要求使用者先替自己選對顧問種類。</p></div></section><section className="domain-body"><div className="domain-wrap"><div className="domain-grid">{domains.map((d,i)=><article className="domain-card" key={d.slug}><small>{String(i+1).padStart(2,"0")}</small><h2>{d.title}</h2><p>{d.subtitle}</p><button onClick={()=>navigate(`/domains/${d.slug}`)}>進入領域 →</button></article>)}</div></div></section></DomainShell>;
}

export function DomainDetail(){
  const {slug="corporate-governance"}=useParams();
  const navigate=useNavigate();
  const domain=domains.find((d)=>d.slug===slug)??domains[0];
  return <DomainShell><section className="domain-hero"><div className="domain-wrap"><div className="domain-kicker">{domain.eyebrow}</div><h1>{domain.title}</h1><p>{domain.subtitle}</p></div></section><section className="domain-body"><div className="domain-wrap">{domain.principles.map((p)=><article className="domain-detail" key={p.title}><h2>{p.title}</h2><p>{p.body}</p></article>)}<div className="domain-related"><button onClick={()=>navigate('/domains')}>← 回到治理知識領域</button>{domain.related.map((r)=><button key={r.path} onClick={()=>navigate(r.path)}>{r.label} →</button>)}</div></div></section></DomainShell>;
}
