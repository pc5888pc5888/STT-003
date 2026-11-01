import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GovernedHero from "../components/GovernedHero";

type Topic = {
  id:string;
  title:string;
  description:string;
  problemPath:string;
  startPath:string;
  terms:string[];
};

const TOPICS:Topic[]=[
  {
    id:"succession",
    title:"家族與企業接班",
    description:"涉及交棒、二代接班、家族角色、創辦人退場或跨世代安排。",
    problemPath:"/problems/succession",
    startPath:"/start?route=succession",
    terms:["接班","交棒","傳承","二代","下一代","父親","母親","兒子","女兒","兄弟","姊妹","家族企業","succession","handover","next generation","family business"],
  },
  {
    id:"ownership-authority",
    title:"股權、控制權與權責",
    description:"涉及股權、董事會、經營權、表決權、實際控制或權責不一致。",
    problemPath:"/problems/family-ownership",
    startPath:"/start?route=family-ownership",
    terms:["股權","股份","持股","董事會","董事","經營權","控制權","表決權","權責","授權","ownership","shareholder","shares","board","control","authority"],
  },
  {
    id:"major-decision",
    title:"重大決策與不可逆風險",
    description:"涉及投資、合作、處分、併購、重大簽約、退出或其他高錯誤成本決策。",
    problemPath:"/problems/major-decision",
    startPath:"/start?route=major-decision",
    terms:["重大決策","投資","合作","併購","出售","處分","簽約","交易","退出","不可逆","決定要不要","investment","transaction","merger","acquisition","deal","major decision","irreversible"],
  },
  {
    id:"strategic-legal",
    title:"策略、法遵與爭議交界",
    description:"涉及法律工具、契約、爭議或訴訟，但真正問題可能仍是策略、權責與治理選擇。",
    problemPath:"/problems/strategic-legal",
    startPath:"/start?route=strategic-legal",
    terms:["法遵","法律","律師","契約","合約","訴訟","爭議","違約","責任","legal","lawyer","contract","litigation","dispute","compliance"],
  },
  {
    id:"ai-governance",
    title:"AI 與決策治理",
    description:"涉及 AI 進入決策、授權、證據、資料使用、人機責任或自動化治理。",
    problemPath:"/problems/ai-governance",
    startPath:"/start?route=ai-governance",
    terms:["人工智慧","生成式","模型","演算法","自動化","代理人","ai","generative ai","model","algorithm","automation","agent","decision ai"],
  },
  {
    id:"system-failure",
    title:"制度失靈與治理結構",
    description:"問題反覆發生、流程失效、權責模糊，或組織過度依賴特定個人。",
    problemPath:"/problems/system-failure",
    startPath:"/start?route=system-failure",
    terms:["制度","流程","內控","失靈","反覆發生","沒有人負責","權責不清","依賴老闆","依賴創辦人","system failure","process","internal control","governance structure"],
  },
  {
    id:"founder-legacy",
    title:"創辦人價值與制度承接",
    description:"涉及創辦人的價值、品牌、關係網絡或決策方式如何被制度化承接。",
    problemPath:"/problems/founder-legacy",
    startPath:"/start?route=founder-legacy",
    terms:["創辦人","創業者","老闆退場","品牌價值","企業文化","留下來","legacy","founder","founder legacy","institutionalize"],
  },
  {
    id:"institutional-cooperation",
    title:"機構合作、研究與演講邀約",
    description:"涉及機構合作、研究、出版、講座或演講邀請，應進入正式機構受理路徑。",
    problemPath:"/institutions",
    startPath:"/start?type=institution",
    terms:["機構合作","研究合作","演講","講座","邀請","學校","學會","論壇","出版合作","institutional cooperation","research collaboration","speaking","lecture","conference","publication"],
  },
];

const SENSITIVE_TERMS=[
  "身分證","身份證","護照","銀行帳號","帳戶密碼","信用卡","卡號","病歷","醫療紀錄","完整合約","營業秘密","密碼",
  "passport","bank account","password","credit card","medical record","trade secret"
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

function scoreTopic(text:string,topic:Topic){
  return topic.terms.reduce((score,term)=>{
    if(!includesTerm(text,term)) return score;
    return score+(term.length>=6?3:term.length>=3?2:1);
  },0);
}

export default function GovernanceNavigator(){
  const [input,setInput]=useState("");
  const [query,setQuery]=useState("");

  const results=useMemo(()=>{
    const text=normalize(query);
    if(!text) return [];
    return TOPICS
      .map(topic=>({topic,score:scoreTopic(text,topic)}))
      .filter(item=>item.score>0)
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

  return <div className="stt-navigator-page">
    <GovernedHero
      kicker="GOVERNANCE NAVIGATOR · LOCAL TRIAGE"
      title="不知道應該從哪裡開始？先辨識你正在面對的治理問題。"
      lead="用一兩句描述目前正在發生的情況。治理導航只協助辨識較可能的治理主題與網站入口，不替你做治理判讀，也不提供法律、會計、投資或其他專業結論。"
      id="governance-navigator-title"
    />

    <section className="stt-navigator-section" aria-labelledby="navigator-input-title">
      <div className="stt-navigator-shell">
        <div className="stt-navigator-intro">
          <p className="stt-navigator-kicker">DESCRIBE THE SITUATION</p>
          <h2 id="navigator-input-title">描述情況，不需要先知道專業名稱。</h2>
          <p>例如：「父親準備交棒，但兄弟之間的股權與實際經營權並不一致。」可輸入繁中或英文。</p>
        </div>

        <form className="stt-navigator-form" onSubmit={submit}>
          <label htmlFor="governance-navigator-input">目前正在發生什麼？</label>
          <textarea
            id="governance-navigator-input"
            rows={6}
            maxLength={1200}
            value={input}
            onChange={event=>setInput(event.target.value)}
            placeholder="請用一兩句描述事件、角色與你最在意的問題；不要輸入身分證、帳號密碼、完整商業機密或其他不必要敏感資料。"
          />
          <div className="stt-navigator-form__meta">
            <span>{input.length} / 1200</span>
            <button type="submit" disabled={!input.trim()}>辨識治理入口</button>
          </div>
          <p className="stt-navigator-local-note">本頁文字只在目前瀏覽器頁面中進行本地分類，不會送到外部 AI 模型、不會提交到 STT，也不寫入 localStorage 或 sessionStorage。</p>
          {sensitive&&<p className="stt-navigator-warning" role="alert">偵測到可能包含敏感資訊的字詞。建議先刪除可識別個人、帳務、醫療或完整商業機密內容，再進行導航。</p>}
        </form>
      </div>
    </section>

    {query&&<section className="stt-navigator-section stt-navigator-results" aria-labelledby="navigator-results-title">
      <div className="stt-navigator-shell">
        <p className="stt-navigator-kicker">NAVIGATION RESULT</p>
        <h2 id="navigator-results-title">{results.length?"較接近以下治理主題。":"目前無法可靠分類，先從正式問題入口開始。"}</h2>
        <p className="stt-navigator-result-note">這是網站分流結果，不是莊鈞翔博士或 STT 對個案作出的治理判讀。</p>

        {results.length?
          <div className="stt-navigator-grid">
            {results.map(({topic},index)=><article className="stt-navigator-card" key={topic.id}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="stt-navigator-card__actions">
                <Link to={topic.problemPath}>先理解這類問題 →</Link>
                <Link className="is-primary" to={topic.startPath}>進入正式治理判讀 →</Link>
              </div>
            </article>)}
          </div>
          :
          <div className="stt-navigator-fallback">
            <Link to="/problems">你正在面對什麼 →</Link>
            <Link to="/how-stt-works">理解 STT 如何判讀 →</Link>
            <Link className="is-primary" to="/start">開始治理判讀 →</Link>
          </div>
        }
      </div>
    </section>}

    <section className="stt-navigator-boundary" aria-labelledby="navigator-boundary-title">
      <div className="stt-navigator-shell">
        <p className="stt-navigator-kicker">HUMAN AUTHORITY</p>
        <h2 id="navigator-boundary-title">導航可以自動化；治理判讀不能外包。</h2>
        <p>Governance Navigator 的工作是把訪客帶到正確的正式內容與受理入口。證據是否成立、權力是否適法、風險是否可承擔、是否應該行動，仍由人類治理程序與決策者承擔。</p>
        <div className="stt-navigator-boundary__actions">
          <Link to="/how-stt-works">理解判讀方法 →</Link>
          <Link to="/professional-boundary">查看專業服務邊界 →</Link>
        </div>
      </div>
    </section>
  </div>;
}
