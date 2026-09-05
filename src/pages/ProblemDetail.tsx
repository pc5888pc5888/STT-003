import { useNavigate, useParams } from "react-router-dom";

type VisualKind = "decision"|"owner"|"succession"|"family"|"strategicLegal"|"ai"|"system"|"legacy";

type ProblemConfig = {
  title:string; en:string; result:string; lead:string; visual:VisualKind;
  situations:string[]; misjudgments:string[]; risks:string[]; method:string[]; deliverables:string[];
};

const data:Record<string,ProblemConfig>={
  "major-decision":{
    title:"重大決策，不是先選 A、B、C；而是先確認這是不是正確的問題。",en:"MAJOR DECISION JUDGMENT",visual:"decision",
    result:"把重大決定整理成可以判斷、可以停止、可以驗收的 Decision Brief。",
    lead:"投資、併購、轉型、合作、退出或跨境決策，真正昂貴的錯誤往往不是資訊少，而是問題一開始就被形成錯了。",
    situations:["所有人都說機會很好，卻沒有人說清楚最壞會失去什麼。","資料很多，但來源其實互相轉述。","董事會已經在比較方案，真正目標卻沒有被定義。","執行到一半才發現退出代價遠高於預期。"],
    misjudgments:["把資訊量當成判斷品質。","先比較方案，後補問題定義。","用成功機率掩蓋最大損失。","沒有預先設定停止與重評條件。"],
    risks:["資本與時間被不可逆地鎖住。","錯誤前提被漂亮簡報放大。","組織因沉沒成本持續投入。","事後沒有人說得清楚當初為何做這個決定。"],
    method:["定義真正決策問題與勝利條件。","拆分事實、主張、證據、假設與未知。","建立反方情境與會推翻結論的證據。","評估最大損失、可逆性與 Option Value。","形成 GO／CONDITIONAL GO／HOLD／NO-GO。"],
    deliverables:["Governance Decision Brief","Decision Status","Evidence Gap List","Best / Base / Worst Case","Stop / Re-evaluation Conditions","P0–P3 Action Priorities"]
  },
  "owner-dependence":{
    title:"公司愈大，卻還是只有老闆能決定，這不是效率問題。",en:"OWNER DEPENDENCE",visual:"owner",
    result:"把個人權威轉成組織可承接的決策權、責任與例外處理機制。",
    lead:"真正的風險不是老闆很重要，而是公司離開某一個人之後，重要判斷、資訊與授權就一起停止。",
    situations:["主管都有職稱，但遇到例外仍回頭找老闆。","部門之間不知道誰有最後決定權。","老闆請假或出國，重大事項就卡住。","責任由經理人承擔，權力卻沒有一起移交。"],
    misjudgments:["把集中決策當成高效率。","以為授權等於放棄控制。","只寫組織圖，沒有寫 Decision Rights。","只處理日常流程，沒有處理重大例外。"],
    risks:["公司成長被單一人時間上限鎖住。","責任與權限錯置。","核心人才無法真正成熟。","接班時所有隱性權力一次爆發。"],
    method:["盤點真正的決策節點。","區分可授權、保留與必須升級事項。","建立 Decision Rights Matrix。","設計例外、代理與緊急接管。","用實際案件驗收授權是否成立。"],
    deliverables:["Decision Rights Matrix","Reserved Matters","Authorization SOP","Exception Escalation","Backup Authority Map","Governance Review"]
  },
  succession:{
    title:"職位交出去，不代表接班已經發生。",en:"SUCCESSION GOVERNANCE",visual:"succession",
    result:"讓權力、資訊、責任、關係與價值真正跨過世代，而不是只換名片。",
    lead:"企業接班如果只處理股權、職稱或交棒日期，創辦人的隱性控制與下一代的形式責任就可能長期並存。",
    situations:["二代已任總經理，但關鍵客戶仍只認創辦人。","授權寫在紙上，幹部仍等上一代點頭。","股權已移轉，資訊與印鑑權卻沒有。","第一代想退出，又擔心二代犯不可逆錯誤。"],
    misjudgments:["把財富移轉當成企業接班。","把職稱變更當成權力移交。","一次性交棒，沒有分階段驗收。","只問誰接，沒有問原權力如何退出。"],
    risks:["雙重權威造成組織站隊。","二代只有責任沒有實權。","創辦人退不下來、接班人長不出來。","關鍵資訊在臨界事件中斷裂。"],
    method:["畫出現在真正的權力地圖。","區分股權、經營權、資訊權與關係權。","建立分階段授權與保留事項。","設定接班驗收、回復與重大例外機制。","留下創辦人的治理記憶與判斷原則。"],
    deliverables:["Succession Roadmap","Authority Transfer Map","Reserved Matters","Information Handover","Founder Exit Protocol","Succession Acceptance Criteria"]
  },
  "family-ownership":{
    title:"家族有資產，不代表家族已經知道怎麼共同決定。",en:"FAMILY & OWNERSHIP",visual:"family",
    result:"把所有權、控制權、照護責任、異議與退出變成可以共同確認的安排。",
    lead:"真正容易引爆衝突的，往往不是財產本身，而是每個人把自己心裡的理解當成家族共同事實。",
    situations:["大家都說父母『以前講過』，版本卻不一樣。","持股相近，但重大事項沒有僵局處理。","照護責任與財產期待綁在一起。","家族企業與私人財產界線不清。"],
    misjudgments:["把愛與默契當成制度。","以為遺囑可以單獨解決所有家族治理問題。","只處理分配，不處理決定程序。","衝突發生後才第一次談權責。"],
    risks:["死亡或失能後只能靠猜測。","兄弟姊妹把不同理解變成道德指控。","公司治理被家族關係綁架。","下一代重複同一個結構性衝突。"],
    method:["辨識每一方真正關心與不能接受的事。","把口頭理解轉成可確認紀錄。","區分個人自主、共同決定與公司權限。","建立異議、僵局、退出與更新程序。","必要時接入法律、稅務、信託與公司治理專業。"],
    deliverables:["Family Constitution","Family Decision Rules","Ownership & Control Map","Deadlock Mechanism","Care & Responsibility Map","Succession Records"]
  },
  "strategic-legal":{
    title:"法律上可以做，和策略上值得做，是兩個不同問題。",en:"STRATEGIC + LEGAL DECISION",visual:"strategicLegal",
    result:"把法律位置、商業代價、現金流、關係、時間與可逆性收斂成一個可決策方案。",
    lead:"法律分析回答權利義務與程序位置；企業真正要做的決定，還必須知道值得不值得、何時做、做到哪裡，以及最壞會失去什麼。",
    situations:["律師認為勝算不低，但訴訟可能拖三年。","契約可以解除，卻可能失去最重要的通路。","法律責任可控，品牌與合作關係卻可能不可逆。","對方也有法律武器與談判選項。"],
    misjudgments:["把法律勝算當成商業答案。","只計算訴訟結果，不算時間與現金流。","只看自己的權利，不看對手最佳反方。","沒有比較談判、暫停、退出與訴訟的 Option Value。"],
    risks:["法律上贏，商業上輸。","程序成本吃掉實際利益。","關係與品牌損失無法回復。","策略決策被單一專業視角綁住。"],
    method:["先鎖定法律關係、時效與證據位置。","再建立戰略目標與可承擔結果。","同步評估對手、現金流、時間與聲譽。","比較 A／B／C 路徑及可逆性。","由必要專業者分工判讀，再形成治理綜合結論。"],
    deliverables:["Strategic-Legal Decision Review","Legal Position","Litigation / Action ROI","Option Comparison","Negotiation Route","Stop / Escalation Conditions"]
  },
  "ai-governance":{
    title:"AI 能做到，不代表公司已經授權它做到。",en:"AI GOVERNANCE",visual:"ai",
    result:"先把人與 AI 的權力邊界說清楚，再讓模型進入真正重要的工作。",
    lead:"企業導入 AI 真正改變的，不只是效率，而是誰能看資料、誰能形成建議、誰能執行、誰能停止，以及最後誰負責。",
    situations:["員工已把內部資料送進不同模型，卻沒有統一規則。","Agent 可以呼叫工具或付款，權限卻只靠帳號決定。","AI 建議進入人資、法務或財務，沒有清楚覆核。","供應商改版後，企業仍沿用原本的信任。"],
    misjudgments:["模型能力＝授權資格。","有人工審核＝人類仍有判斷能力。","供應商知名＝結果可直接信任。","有停止按鈕＝企業真的有退出能力。"],
    risks:["資料與人格權限漂移。","高影響決策責任真空。","平台依存變成無法退出。","組織逐漸失去獨立判斷與接管能力。"],
    method:["盤點 AI 使用情境與權力。","建立資料敏感度與可用環境。","區分建議、覆核、執行與無人值守。","配置停止、回滾、替代與重新驗證。","高影響領域保留正式專業與人類終局判斷。"],
    deliverables:["AI Use Register","Data Authorization Matrix","Human Review Matrix","Agent Authority Limits","Stop / Rollback SOP","Revalidation & Exit Plan"]
  },
  "system-failure":{
    title:"有 SOP，不等於制度真的會在壓力下運作。",en:"SYSTEM FAILURE",visual:"system",
    result:"找出文件與真實運作之間的責任斷點，讓制度可以被驗收而不是只被保存。",
    lead:"真正需要治理的不是制度有沒有寫，而是例外發生時，資訊是否到位、誰有權決定、誰能停止、誰負責，以及最後能不能重建。",
    situations:["文件很完整，但現場沒人知道最新版在哪。","例外一發生，所有流程都繞過原本制度。","事故後每個部門都說自己只是照前一個人的資料做。","制度更新很多次，沒有人知道哪些控制仍有效。"],
    misjudgments:["文件存在＝制度成立。","通過一次驗收＝永久有效。","責任寫在職務說明＝現場真的能承擔。","沒有事故＝制度運作正常。"],
    risks:["責任在部門之間消失。","事故被重複發生。","管理層只看到報表而非真實斷點。","制度變成事後證明文件。"],
    method:["沿真實事件重建流程。","找出權限、資訊、責任與例外斷點。","建立可觀察的控制證據。","設置重大變更與重驗觸發。","用 90 日工程形成最低可持續制度。"],
    deliverables:["Control Gap Map","Responsibility Breakpoints","Exception Protocol","90-Day Governance Launch","Acceptance Evidence","Periodic Revalidation"]
  },
  "founder-legacy":{
    title:"人離開以後，很多最重要的事情就再也問不到了。",en:"FOUNDER LEGACY",visual:"legacy",
    result:"把創辦人的經驗、判斷與價值轉成下一代仍然可以理解的企業記憶與知識資產。",
    lead:"大家都知道企業發生過什麼，卻未必知道那些事件對創辦人真正代表什麼；如果沒有在能說、能修正時留下，未來只能靠猜。",
    situations:["企業有完整年表，卻沒有創辦人為何做關鍵決定的記錄。","下一代知道公司文化口號，不知道哪些底線從何而來。","重大危機的經驗只存在幾位資深主管腦中。","家族與企業的故事散落在照片、訊息與口述中。"],
    misjudgments:["把企業史當成事件年表。","把形象採訪當成真正的思想保存。","等退休或告別後才整理。","只保存成功故事，不保存判斷如何形成。"],
    risks:["企業經驗跟著人離開。","下一代繼承口號卻無法理解判斷背景。","文化被重新包裝而失去真實。","家族與組織每一代都重新猜一次。"],
    method:["先建立可追溯的生命／企業時間軸。","以深度訪談找出重大判斷與轉折。","區分可公開、內部典藏與私人內容。","由當事人在仍可修正時完成確認。","轉成 Founder Archive、企業史、出版或治理記憶。"],
    deliverables:["Founder Legacy Interview","Enterprise History","Governance Memory","Founder Archive Folio","Culture & Values Record","Publication / Succession Source"]
  }
};

const visualImages:Record<VisualKind,string>={
  decision:"/images/paper_corporate_governance.png",
  owner:"/images/Corporate Governance Strategy Interpretation02.png",
  succession:"/images/paper_succession_family.png",
  family:"/images/Family Office02.png",
  strategicLegal:"/images/STT-Press-Law-Header.png",
  ai:"/images/ESGAI02.png",
  system:"/images/internal compliance02.png",
  legacy:"/images/bg-strategist-spotlight.png",
};

const visualPosition:Partial<Record<VisualKind,string>>={
  decision:"center", owner:"center", succession:"center", family:"center", strategicLegal:"center", ai:"center", system:"center", legacy:"center"
};

function Visual({kind}:{kind:VisualKind}){
  return <figure className={`pd-visual pd-${kind}`} aria-hidden="true">
    <img src={visualImages[kind]} alt="" className="pd-visual-img" style={{objectPosition:visualPosition[kind]??"center"}}/>
    <span className="pd-visual-glaze"/>
    <span className="pd-visual-line line-a"/><span className="pd-visual-line line-b"/>
  </figure>
}

export default function ProblemDetail(){
  const {id="major-decision"}=useParams(); const nav=useNavigate(); const cfg=data[id]??data["major-decision"];
  const blocks=[['你可能正在遇到什麼',cfg.situations],['大多數人哪裡誤判',cfg.misjudgments],['如果不處理，可能走到哪裡',cfg.risks],['STT 如何判讀',cfg.method],['最後可以形成什麼',cfg.deliverables]] as const;
  return <div className="pd-root"><style>{`
    .pd-root{--ink:#28241f;--muted:#726a60;--gold:#a9793e;--line:#ded0ba;--paper:#fbfaf7;min-height:100vh;background:var(--paper);color:var(--ink)}.pd-root *{box-sizing:border-box}.pd-wrap{max-width:1180px;margin:auto;padding:0 28px}.pd-hero{display:grid;grid-template-columns:1.04fr .96fr;gap:7vw;align-items:center;min-height:680px;padding:70px 0}.pd-eyebrow{font-size:10px;letter-spacing:.28em;color:var(--gold)}.pd-hero h1{font:400 clamp(40px,4.8vw,68px)/1.3 'Noto Serif TC',Georgia,serif;margin:20px 0 0}.pd-result{font:400 20px/1.8 'Noto Serif TC',Georgia,serif;color:#815b30;margin-top:25px}.pd-lead{max-width:720px;color:var(--muted);line-height:2;margin-top:18px}.pd-back{margin-top:25px;border:0;background:transparent;color:#8c673c;cursor:pointer}
    .pd-visual{position:relative;height:500px;margin:0;border:1px solid #dfd2bf;background:#f4eee5;overflow:hidden;box-shadow:0 28px 70px rgba(72,55,36,.10)}.pd-visual-img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.82) contrast(.96) brightness(1.04);transform:scale(1.002);transition:transform 900ms cubic-bezier(.22,1,.36,1)}.pd-visual:hover .pd-visual-img{transform:scale(1.018)}.pd-visual-glaze{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,253,248,.13),transparent 48%,rgba(149,103,50,.06));box-shadow:inset 0 0 0 12px rgba(255,253,248,.25);pointer-events:none}.pd-visual-line{position:absolute;height:1px;background:rgba(166,122,65,.26);pointer-events:none}.pd-visual-line.line-a{width:55%;right:-8%;top:26%;transform:rotate(-17deg)}.pd-visual-line.line-b{width:42%;left:-6%;bottom:21%;transform:rotate(13deg)}
    .pd-body{border-top:1px solid var(--line);padding:80px 0 120px}.pd-block{display:grid;grid-template-columns:260px 1fr;gap:50px;padding:45px 0;border-bottom:1px solid var(--line)}.pd-block h2{font:400 25px/1.5 'Noto Serif TC',Georgia,serif;margin:0}.pd-items{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1px solid var(--line);border-left:1px solid var(--line)}.pd-item{min-height:120px;padding:23px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:white;color:#655e55;line-height:1.8}.pd-method .pd-item{background:#2c2823;color:#eee7dc;border-color:#4b433a}.pd-method .pd-items{border-color:#4b433a}.pd-method{background:#2c2823;color:#f8f2e8;padding:45px}.pd-cta{margin-top:55px;border:1px solid var(--line);background:white;padding:38px;display:flex;align-items:center;justify-content:space-between;gap:30px}.pd-cta h3{font:400 28px/1.5 'Noto Serif TC',Georgia,serif;margin:0}.pd-cta button{border:1px solid #a9793e;background:#a9793e;color:white;padding:13px 20px;cursor:pointer}
    @media(max-width:900px){.pd-hero{grid-template-columns:1fr;min-height:auto;padding:70px 0}.pd-visual{height:380px}.pd-block{grid-template-columns:1fr}.pd-items{grid-template-columns:1fr}.pd-cta{display:block}.pd-cta button{margin-top:20px}}
  `}</style>
  <section><div className="pd-wrap pd-hero"><div><div className="pd-eyebrow">{cfg.en}</div><h1>{cfg.title}</h1><div className="pd-result">{cfg.result}</div><p className="pd-lead">{cfg.lead}</p><button className="pd-back" onClick={()=>nav('/problems')}>← 回到問題入口</button></div><Visual kind={cfg.visual}/></div></section>
  <section className="pd-body"><div className="pd-wrap">{blocks.map(([title,items],index)=><div className={`pd-block ${index===3?'pd-method':''}`} key={title}><h2>{title}</h2><div className="pd-items">{items.map((x)=><div className="pd-item" key={x}>{x}</div>)}</div></div>)}<div className="pd-cta"><div><div className="pd-eyebrow">GOVERNANCE INTAKE</div><h3>如果這正是你正在面對的問題，下一步不需要先選服務。</h3></div><button onClick={()=>nav(`/start?route=${id}`)}>從這個問題開始</button></div></div></section>
  </div>
}
