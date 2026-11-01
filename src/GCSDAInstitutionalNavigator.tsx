import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GovernedHero from "./components/GovernedHero";

type RouteItem = {
  id:string;
  zhTitle:string;
  enTitle:string;
  zhDescription:string;
  enDescription:string;
  zhPath:string;
  enPath?:string;
  terms:string[];
};

const ROUTES:RouteItem[]=[
  {
    id:"membership",
    zhTitle:"會員與入會",
    enTitle:"Membership",
    zhDescription:"入會資格、申請流程、會費、會員權利義務與正式審查。",
    enDescription:"Eligibility, application steps, fees, member rights and formal qualification review.",
    zhPath:"/membership",
    enPath:"/en/membership",
    terms:["入會","會員","會費","申請會員","加入學會","membership","join","member","membership fee","application"],
  },
  {
    id:"charter",
    zhTitle:"章程與公告",
    enTitle:"Charter & Notices",
    zhDescription:"查閱學會章程、法定資訊、制度依據與正式公告原則。",
    enDescription:"Review the association's bylaws, institutional basis and formal notice framework.",
    zhPath:"/charter",
    terms:["章程","法定","公告","條文","內政部","charter","bylaw","bylaws","notice","statute"],
  },
  {
    id:"governance",
    zhTitle:"組織治理",
    enTitle:"Institutional Governance",
    zhDescription:"了解會員大會、理事會、監事會、理監事名錄與正式治理架構。",
    enDescription:"Understand the General Assembly, Board of Directors, Board of Supervisors and formal governance structure.",
    zhPath:"/governance",
    enPath:"/en/governance",
    terms:["理事","監事","理監事","會員大會","治理架構","董事","組織治理","board","director","supervisor","general assembly","governance"],
  },
  {
    id:"council",
    zhTitle:"策略治理聯席會",
    enTitle:"Strategic Governance Council",
    zhDescription:"了解跨域專業協作、議題交流與策略治理聯席會的制度邊界。",
    enDescription:"Understand cross-disciplinary professional exchange and the council's institutional boundary.",
    zhPath:"/council",
    terms:["聯席會","策略治理","跨域","專家","專業協作","council","strategic governance","cross-disciplinary","expert"],
  },
  {
    id:"events",
    zhTitle:"活動與大會",
    enTitle:"Events & Assemblies",
    zhDescription:"查閱會員大會、理監事會、活動與學會正式歷史紀錄。",
    enDescription:"Review assemblies, board meetings, programs and formal institutional history.",
    zhPath:"/events",
    terms:["活動","大會","會員大會","會議","理監事會","講座","events","assembly","meeting","program","lecture"],
  },
  {
    id:"knowledge",
    zhTitle:"知識與研究",
    enTitle:"Knowledge & Research",
    zhDescription:"查閱企業策略、治理、法遵、永續與跨域研究及公開知識內容。",
    enDescription:"Explore strategy, governance, compliance, sustainability and public research content.",
    zhPath:"/knowledge",
    terms:["研究","知識","出版","文章","企業策略","永續","法遵","research","knowledge","publication","article","sustainability","compliance"],
  },
  {
    id:"founder",
    zhTitle:"創會理事長",
    enTitle:"Founding Chairman",
    zhDescription:"了解創會理事長莊鈞翔博士在 GCSDA 的角色、創會理念與研究脈絡。",
    enDescription:"Learn about Dr. Eric Chuang's role as founding chairman, founding vision and research context.",
    zhPath:"/founder-chairman",
    terms:["莊鈞翔","創會理事長","理事長","創辦人","founder","founding chairman","eric chuang","chairman"],
  },
  {
    id:"contact",
    zhTitle:"會務聯絡與 LINE",
    enTitle:"Association Contact & LINE",
    zhDescription:"若需要會務聯絡、網站導引或會員相關基本詢問，可使用 GCSDA 官方 LINE。",
    enDescription:"For association contact, site guidance or basic membership questions, use GCSDA Official LINE.",
    zhPath:"/membership",
    enPath:"/en/membership",
    terms:["聯絡","line","客服","會務","詢問","秘書處","contact","secretariat","question","help"],
  },
];

const SENSITIVE_TERMS=[
  "身分證","身份證","護照","銀行帳號","帳戶密碼","信用卡","卡號","醫療紀錄","病歷","密碼",
  "passport","bank account","password","credit card","medical record"
];

function normalize(value:string){
  return value.toLowerCase().replace(/\s+/g," ").trim();
}

function escapeRegExp(value:string){
  return value.replace(/[.*+?^$()|[\]\\{}]/g,"\\$&");
}

function includesTerm(text:string,term:string){
  const normalized=term.toLowerCase();
  if(/^[a-z0-9 ]+$/.test(normalized)&&normalized.length<=3){
    return new RegExp("(^|[^a-z0-9])"+escapeRegExp(normalized)+"([^a-z0-9]|$)","i").test(text);
  }
  return text.includes(normalized);
}

function score(text:string,item:RouteItem){
  return item.terms.reduce((total,term)=>{
    if(!includesTerm(text,term)) return total;
    return total+(term.length>=6?3:term.length>=3?2:1);
  },0);
}

export default function GCSDAInstitutionalNavigator({lineUrl}:{lineUrl:string}){
  const {pathname}=useLocation();
  const isEnglish=pathname.startsWith("/en/");
  const [input,setInput]=useState("");
  const [query,setQuery]=useState("");

  const results=useMemo(()=>{
    const text=normalize(query);
    if(!text) return [];
    return ROUTES
      .map(item=>({item,score:score(text,item)}))
      .filter(result=>result.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,3);
  },[query]);

  const sensitive=useMemo(()=>{
    const text=normalize(input);
    return SENSITIVE_TERMS.some(term=>includesTerm(text,term));
  },[input]);

  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setQuery(input.trim());
  };

  const t=isEnglish?{
    kicker:"INSTITUTIONAL NAVIGATOR · LOCAL SITE GUIDANCE",
    title:"Tell us what you are looking for. The navigator will point you to the formal institutional page.",
    lead:"Use one or two sentences. This tool only classifies your request into GCSDA website destinations. It does not determine membership eligibility, interpret bylaws or make decisions on behalf of the association.",
    describe:"What are you looking for?",
    placeholder:"For example: I want to understand membership requirements, find the bylaws, or check recent association activities.",
    action:"Find the institutional route",
    local:"Your text is classified locally in this browser page. It is not sent to an external AI model, not submitted to GCSDA, and not written to localStorage or sessionStorage.",
    warning:"Potentially sensitive information detected. Remove identity, account, medical or other unnecessary sensitive details before using navigation.",
    result:"Suggested institutional routes",
    fallback:"No reliable match was found. Start from the association overview or the formal membership page.",
    boundary:"Navigation can be automated. Institutional authority cannot.",
    boundaryBody:"This navigator only helps users find the correct page. Membership approval, bylaw interpretation, board authority and formal association matters remain governed by GCSDA's bylaws and institutional procedures.",
    about:"About GCSDA",
    membership:"Membership",
    chinese:"Traditional Chinese navigator",
  }:{
    kicker:"INSTITUTIONAL NAVIGATOR · LOCAL SITE GUIDANCE",
    title:"告訴學會你想找什麼，系統直接帶你到正式制度頁面。",
    lead:"用一兩句描述需求即可。這個導引只做網站分流，不判定會員資格、不解釋章程效力，也不代替學會的正式會務程序。",
    describe:"你現在想找什麼？",
    placeholder:"例如：我想了解入會資格、找章程、查看最近活動，或了解理監事治理架構。",
    action:"辨識制度入口",
    local:"本頁文字只在目前瀏覽器頁面中進行本地分類，不會送到外部 AI 模型、不會提交到 GCSDA，也不寫入 localStorage 或 sessionStorage。",
    warning:"偵測到可能包含敏感資訊的字詞。請先刪除身分、帳務、醫療或其他不必要敏感內容，再進行網站導引。",
    result:"建議前往以下制度入口",
    fallback:"目前無法可靠分類，先從學會介紹或會員制度開始。",
    boundary:"導航可以自動化；機構權力不能外包。",
    boundaryBody:"Institutional Navigator 只協助找到正確頁面。會員資格、章程解釋、理監事職權與正式會務決定，仍依 GCSDA 章程與正式程序處理。",
    about:"關於學會",
    membership:"會員與入會",
    chinese:"繁體中文導引",
  };

  return <div className="g4-page gcsda-navigator-page">
    <GovernedHero
      kicker={t.kicker}
      title={t.title}
      lead={t.lead}
    />

    <section className="g4-section">
      <div className="g4-wrap gcsda-navigator-wrap">
        <form className="gcsda-navigator-form" onSubmit={submit}>
          <label htmlFor="gcsda-institutional-navigator-input">{t.describe}</label>
          <textarea
            id="gcsda-institutional-navigator-input"
            rows={6}
            maxLength={900}
            value={input}
            onChange={event=>setInput(event.target.value)}
            placeholder={t.placeholder}
          />
          <div className="gcsda-navigator-form__meta">
            <span>{input.length} / 900</span>
            <button type="submit" disabled={!input.trim()}>{t.action}</button>
          </div>
          <p className="gcsda-navigator-local">{t.local}</p>
          {sensitive&&<p className="gcsda-navigator-warning" role="alert">{t.warning}</p>}
        </form>
      </div>
    </section>

    {query&&<section className="g4-section soft">
      <div className="g4-wrap gcsda-navigator-wrap">
        <div className="g4-kicker">NAVIGATION RESULT</div>
        <h2 className="g4-title">{results.length?t.result:t.fallback}</h2>

        {results.length?
          <div className="gcsda-navigator-grid">
            {results.map(({item},index)=>{
              const title=isEnglish?item.enTitle:item.zhTitle;
              const description=isEnglish?item.enDescription:item.zhDescription;
              const path=isEnglish&&item.enPath?item.enPath:item.zhPath;
              return <article className="gcsda-navigator-card" key={item.id}>
                <span>{String(index+1).padStart(2,"0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={path}>{isEnglish?"Open formal page →":"前往正式頁面 →"}</Link>
              </article>;
            })}
          </div>
          :
          <div className="g4-actions">
            <Link to={isEnglish?"/en/about":"/about"}>{t.about}</Link>
            <Link className="primary" to={isEnglish?"/en/membership":"/membership"}>{t.membership}</Link>
          </div>
        }
      </div>
    </section>}

    <section className="g4-section">
      <div className="g4-wrap gcsda-navigator-wrap">
        <div className="g4-kicker">INSTITUTIONAL BOUNDARY</div>
        <h2 className="g4-title">{t.boundary}</h2>
        <p className="g4-lead">{t.boundaryBody}</p>
        <div className="g4-actions">
          <a href={lineUrl} target="_blank" rel="noopener noreferrer">GCSDA Official LINE ↗</a>
          <Link to={isEnglish?"/navigator":"/en/navigator"}>{t.chinese}</Link>
        </div>
      </div>
    </section>
  </div>;
}
