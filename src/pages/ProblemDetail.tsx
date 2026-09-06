import { useNavigate, useParams } from "react-router-dom";

type ProblemConfig = {
  title: string;
  en: string;
  lead: string;
  event: string[];
  framing: string[];
  evidence: string[];
  counter: string[];
  downside: string[];
  judgment: string[];
  outputs: string[];
  professional: string[];
};

const data: Record<string, ProblemConfig> = {
  "major-decision": {
    title: "重大決策，不是先選 A、B、C；而是先確認這是不是正確的問題。",
    en: "MAJOR DECISION JUDGMENT",
    lead: "投資、併購、轉型、合作、退出或跨境行動，真正昂貴的錯誤可能不是資訊不足，而是錯誤問題、錯誤證據或不可逆風險被提前資源化。",
    event: ["市場、顧問或內部團隊都在比較方案，但真正目標仍模糊。", "資料很多，來源卻可能互相轉述或建立在同一個假設上。", "機會看似有時效，組織因而被迫快速承諾資本、時間或聲譽。"],
    framing: ["先確認真正要決定的是什麼，而不是直接接受既有 A／B／C 選項。", "把成功條件、不可接受結果與必須保留的選項寫清楚。"],
    evidence: ["核心財務、契約、技術、市場與交易資料的來源、日期與可驗證性。", "哪些主張仍只是估計、預測、口頭說法或利益關係人的判斷。", "哪些資訊若不存在，結論就不應升格成正式策略。"],
    counter: ["建立 Best／Base／Worst Case，而不是只做單一成功敘事。", "要求反方情境說明：什麼事實會推翻目前最想相信的結論？", "把競爭者、監管者、交易對手與受影響者的最佳反應納入。"],
    downside: ["最大損失不只看金額，也看控制權、流動性、時間、信任與退出成本。", "確認承諾是否可逆、退出是否真實存在，以及一旦停止還能保留什麼。"],
    judgment: ["問題資格 → 證據資格 → 假設可反駁性 → 策略價值 → 不可逆風險 → 選項保留 → 執行與再驗證。", "形成 GO／CONDITIONAL GO／HOLD／NO-GO，而不是只給模糊建議。"],
    outputs: ["Governance Decision Brief", "Evidence Gap List", "Counter-Case / Failure Conditions", "Best / Base / Worst Case", "Stop / Re-evaluation Conditions", "P0–P3 Action Priorities"],
    professional: ["涉及法律權利義務、稅務、會計認列、投資契約、估值、技術安全或其他專業資格事項時，由相應專業者正式進場。", "STT 不以治理判讀取代應由具資格專業者承擔的正式意見。"],
  },
  "owner-dependence": {
    title: "公司愈大，卻還是只有老闆能決定，真正的風險是組織沒有承接能力。",
    en: "OWNER DEPENDENCE & DECISION RIGHTS",
    lead: "治理重點不是削弱創辦人，而是把決策權、保留事項、代理、例外與責任轉成公司在關鍵人物不在場時仍能運作的制度。",
    event: ["主管有職稱，但重大例外仍回頭等老闆指示。", "責任已交給經理人，實際權限與資訊卻沒有一起移交。", "關鍵人物不在場時，付款、客戶、採購、重大合約或人事決策就停住。"],
    framing: ["真正問題不是『老闆太重要』，而是哪些決策沒有可承接的第二路徑。", "區分必須保留於最高權責人的事項與其實可以制度化授權的事項。"],
    evidence: ["實際決策流而不是名義組織圖：誰提出、誰核准、誰能否決、誰承擔。", "最近一年遇到例外時真正如何處理，以及哪些事項曾因等待個人決定而延誤。", "授權文件、印鑑、付款、系統權限與對外簽署是否一致。"],
    counter: ["檢查『集中決策比較快』是否只在平時成立，而在成長、危機或接班時成為瓶頸。", "模擬關鍵人物 30 天無法工作時，公司哪些決策會失效。"],
    downside: ["單一人時間上限會成為公司成長上限。", "責任與權限錯置，可能使經理人承擔結果卻無法真正管理風險。", "接班時隱性權力一次暴露，形成雙重權威與組織站隊。"],
    judgment: ["盤點 Decision Rights、Reserved Matters、代理與例外升級。", "用真實案件測試授權是否能在沒有老闆臨場指示下運作。"],
    outputs: ["Decision Rights Matrix", "Reserved Matters", "Authorization SOP", "Exception Escalation", "Backup Authority Map", "Governance Review"],
    professional: ["涉及公司法定權限、董事會／股東會程序、印鑑與簽署權、勞動或契約責任時，需由適當法律、會計或內控專業者核對。"],
  },
  succession: {
    title: "職位交出去，不代表接班已經發生。",
    en: "SUCCESSION & AUTHORITY TRANSFER",
    lead: "接班必須同時處理所有權、經營權、資訊權、關係權與上一代權力的退出機制；否則二代可能只有責任，沒有真正決定權。",
    event: ["二代已任總經理或董事，重要客戶、幹部與付款仍只認創辦人。", "股權已移轉，資訊、印鑑、資金與重大事項保留權卻沒有同步。", "上一代想退，又擔心下一代做出不可逆錯誤。"],
    framing: ["接班不是單一日期，而是權力、資訊、責任與關係逐步轉移並被驗收的過程。", "除了問誰接班，也要問原本的權力何時、以什麼條件真正退出。"],
    evidence: ["實際權力地圖：股權、董事席次、印鑑、帳戶、系統、客戶、供應商與關鍵幹部。", "目前哪些決策已由下一代獨立完成，哪些仍需上一代口頭同意。", "接班人的能力、資訊取得與重大失誤後的回復機制是否已被測試。"],
    counter: ["模擬第一代突然無法介入，公司是否仍能完成薪資、付款、客戶、資金與重大決策。", "模擬二代判斷失誤時，制度能否限制最大損失，而不是只能由上一代重新接管全部權力。"],
    downside: ["雙重權威造成組織站隊與責任真空。", "二代長期只有名義職位，無法形成真正判斷能力。", "關鍵資訊與外部關係在臨界事件中斷裂。"],
    judgment: ["分階段移交決策權、資訊權、關係權與責任。", "設定每一階段的保留事項、驗收條件、例外與回復機制。"],
    outputs: ["Succession Roadmap", "Authority Transfer Map", "Reserved Matters", "Information Handover", "Founder Exit Protocol", "Succession Acceptance Criteria"],
    professional: ["股權、遺產、稅務、信託、董事會與勞動關係等事項應依具體架構讓法律、會計、稅務或信託專業者正式進場。"],
  },
  "family-ownership": {
    title: "家族有資產，不代表家族已經知道怎麼共同決定。",
    en: "FAMILY & OWNERSHIP GOVERNANCE",
    lead: "真正容易引爆衝突的，往往不是財產本身，而是每個人把自己心裡的理解當成家族共同事實。",
    event: ["大家都說長輩以前講過，但每個人記得的版本不同。", "持股或資產已分配，重大事項卻沒有共同決定與僵局機制。", "照護責任、居住安排、公司控制權與財產期待混在同一場爭議裡。"],
    framing: ["先把所有權、控制權、照護責任、個人自主與家族共同事項分開。", "治理不是要求家人沒有衝突，而是預先決定衝突發生時怎麼處理。"],
    evidence: ["股權、資產、契約、遺囑、授權與公司章程等正式文件。", "重要口頭理解是否有可確認紀錄，以及不同家族成員對同一件事的版本差異。", "誰目前實際承擔照護、經營、資金與管理責任。"],
    counter: ["把不同家族成員的立場各自寫成最強版本，而不是只採用單一敘事。", "測試死亡、失能、婚姻變動、股東衝突或資金需求出現時，現有安排是否仍成立。"],
    downside: ["事件發生後只能靠猜測長輩意志。", "不同理解被道德化，進一步破壞公司與家族關係。", "公司治理被家族私人衝突綁架。"],
    judgment: ["建立家族重大事項清單與不同決策層級。", "建立異議、僵局、退出、更新與記錄機制。"],
    outputs: ["Family Decision Rules", "Ownership & Control Map", "Deadlock Mechanism", "Care & Responsibility Map", "Family Governance Record", "Succession Issues List"],
    professional: ["遺囑、信託、稅務、特留分、公司股權、婚姻財產或其他法律效果，必須由具體事實與適用法律決定，不能由治理頁面直接替代正式專業意見。"],
  },
  "strategic-legal": {
    title: "法律上可以做，和策略上值得做，是兩個不同問題。",
    en: "STRATEGIC + LEGAL JUDGMENT",
    lead: "法律分析回答權利義務與程序位置；企業真正要做的決定，還必須知道值得不值得、何時做、做到哪裡，以及最壞會失去什麼。",
    event: ["法律上有主張空間，但訴訟、談判或執行可能耗時很久。", "契約可以解除，卻可能失去重要通路、合作方或現金流。", "法律責任可控，但品牌、關係或管理注意力的代價可能不可逆。"],
    framing: ["先把『能不能做』與『值不值得做』分成兩個問題。", "把法律位置放進商業目標、時間、現金流與替代方案中一起判斷。"],
    evidence: ["契約、通知、往來紀錄、時效、權利義務與可用證據。", "實際商業損益、現金流、客戶／供應商依賴與聲譽影響。", "對手可用的程序、談判與反制選項。"],
    counter: ["建立對手最有利的法律與商業版本。", "比較訴訟、談判、暫停、持續履行、退出或其他替代路徑。"],
    downside: ["法律上贏，商業上仍可能輸。", "程序成本與時間可能吃掉實際利益。", "過早升級可能讓原本可逆的關係變成不可逆對抗。"],
    judgment: ["先由具資格專業者確認法律位置，再由治理判讀比較各行動路徑的價值與代價。", "設定談判、訴訟、退出或升級的觸發條件與停止條件。"],
    outputs: ["Strategic-Legal Decision Review", "Legal Position Questions", "Option Comparison", "Negotiation Route", "Action Thresholds", "Stop / Escalation Conditions"],
    professional: ["具體法律責任、訴訟策略、稅務、會計與其他法定專業事項，必須由相應專業者承擔正式意見與責任；STT 負責跨視角決策整合，不取代執業資格。"],
  },
  "ai-governance": {
    title: "AI 能做到，不代表公司已經授權它做到。",
    en: "AI GOVERNANCE · HUMAN–AI CONSTITUTION",
    lead: "企業導入 AI 真正改變的，不只是效率，而是誰能看資料、誰能形成建議、誰能執行、誰能停止，以及最後誰負責。",
    event: ["員工已把內部資料送進不同模型，卻沒有統一資料邊界。", "Agent 能呼叫工具、發信、改資料或付款，權限卻只靠帳號決定。", "AI 建議開始進入人資、法務、財務或其他高影響領域，但覆核方式不清楚。"],
    framing: ["問題不是『要不要用 AI』，而是每一種 AI 能力取得什麼權力。", "先確定授權、限制、覆核、停止、退出與責任，再談模型能力與效率。"],
    evidence: ["目前實際使用的模型、帳號、工具、資料來源、API／MCP 與責任人。", "哪些輸出會影響外部承諾、法律、財務、人事、個資或商業秘密。", "是否保留輸入、來源、工具操作與人工覆核的可稽核紀錄。"],
    counter: ["如果模型版本、供應商或資料來源明天改變，原本驗證是否仍成立？", "如果 AI 錯誤但人類因長期依賴已失去獨立判斷能力，人工覆核是否還是真正覆核？"],
    downside: ["資料與權限漂移。", "高影響決策責任真空。", "供應商鎖定造成無法退出。", "組織判斷資本逐步退化。"],
    judgment: ["建立 AI Use Register、資料敏感度、Human Review Matrix、Tool / Agent Authority、Stop / Rollback 與 Revalidation。", "高影響用途以人類終局責任與可退出能力為最低門檻。"],
    outputs: ["AI Use Register", "Data Authorization Matrix", "Human Review Matrix", "Agent Authority Limits", "Stop / Rollback SOP", "Revalidation & Exit Plan"],
    professional: ["涉及個資、勞動、人事、醫療、金融、法律責任、資安或其他受規管事項時，必須讓相關專業者與組織責任人共同進場。"],
  },
  "system-failure": {
    title: "有 SOP，不等於制度真的會在壓力下運作。",
    en: "SYSTEM FAILURE & GOVERNANCE RECOVERY",
    lead: "真正需要治理的不是制度有沒有寫，而是例外發生時，資訊是否到位、誰有權決定、誰能停止、誰負責，以及最後能不能重建。",
    event: ["制度文件完整，真正出事時大家仍回到口頭指示與私人訊息。", "同一個例外每次由不同人處理，沒有一致升級與紀錄。", "事故結束後只有補文件，沒有回頭檢查制度為何沒有被使用。"],
    framing: ["問題不只是『員工沒有照 SOP』，而是 SOP 是否符合真實權限、資訊與壓力情境。", "把正常流程與例外流程分開檢查。"],
    evidence: ["最近發生過的真實異常事件、通知、決策、時間軸與後續紀錄。", "制度文件與實際行為之間的差異。", "責任人是否真正擁有需要的資訊、權限與停止能力。"],
    counter: ["用壓力測試驗證：關鍵人不在、系統故障、資料錯誤、外部期限逼近時，制度是否仍能運作。", "檢查制度是否因太複雜、權限不一致或缺乏例外路徑而被自然繞過。"],
    downside: ["制度成為形式，真實權力回到不可追溯的私人指示。", "同一問題反覆發生，但每次都被當成獨立事件。", "責任在事故後才被重新分配。"],
    judgment: ["建立責任斷點、例外流程、升級、停止、恢復與事後回顧。", "用真實案例驗收制度，而不是只做文件審閱。"],
    outputs: ["Governance Gap Map", "Responsibility Breakpoints", "Exception / Escalation Flow", "Stop & Recovery Conditions", "90-Day Governance Actions", "Acceptance Checklist"],
    professional: ["若制度失效涉及法定內控、資安事件、個資、勞動、財務揭露、董事責任或其他專業義務，應讓對應專業者正式進場。"],
  },
  "founder-legacy": {
    title: "人離開以後，很多最重要的事情就再也問不到了。",
    en: "FOUNDER LEGACY & GOVERNANCE MEMORY",
    lead: "企業史、家族記憶與 Founder Legacy 的價值，不只是保存事件，而是在當事人仍能說明、修正與確認時，把判斷如何形成留下來。",
    event: ["企業有完整年表，卻沒有創辦人為何做關鍵決定的記錄。", "下一代知道公司文化口號，不知道哪些底線從何而來。", "重大危機的經驗只存在幾位資深主管或家族成員腦中。"],
    framing: ["企業史不是公關年表；真正要保存的是事件對當事人的意義、判斷與代價。", "先決定內容未來要公開、內部典藏、家族保存或作為接班治理資料。"],
    evidence: ["可追溯時間軸、正式文件、照片、會議紀錄、媒體資料與不同人的口述。", "對重大事件保留多方版本，區分事實、個人記憶與後來詮釋。"],
    counter: ["不能只保留成功故事，也要保存失敗、反對意見、判斷修正與當時不知道的事。", "重要內容應在當事人仍能校正時完成確認，避免日後以單一版本重寫歷史。"],
    downside: ["經驗跟著人離開。", "下一代繼承口號卻失去判斷背景。", "企業文化被過度美化，反而失去可用性與可信度。"],
    judgment: ["建立時間軸 → 深度訪談 → 文件交叉核對 → 公開層級 → 當事人確認 → 編輯與典藏。", "將故事轉成可供接班、文化、出版或治理使用的知識資產。"],
    outputs: ["Founder Legacy Interview", "Enterprise History", "Governance Memory", "Founder Archive Folio", "Culture & Values Record", "Publication / Succession Source"],
    professional: ["涉及個資、肖像、著作權、商業秘密、未決爭議或其他敏感內容時，應在公開前完成授權、法律與編輯責任確認。"],
  },
};

const sectionNames = [
  "01｜你看到的事件",
  "02｜真正可能被形成錯的問題",
  "03｜需要確認的事實與證據",
  "04｜反方、替代框架與失敗條件",
  "05｜不可承擔結果、可逆性與退出能力",
  "06｜STT 如何形成判讀",
  "07｜可以形成的治理輸出",
  "08｜什麼情況必須讓專業者正式進場",
] as const;

export default function ProblemDetail(){
  const {id="major-decision"}=useParams();
  const navigate=useNavigate();
  const cfg=data[id]??data["major-decision"];
  const groups=[cfg.event,cfg.framing,cfg.evidence,cfg.counter,cfg.downside,cfg.judgment,cfg.outputs,cfg.professional];
  return <div className="pd4-root"><style>{`
    .pd4-root{min-height:100vh;background:#fbfaf7;color:#2b261f}.pd4-root *{box-sizing:border-box}.pd4-wrap{max-width:1180px;margin:0 auto;padding:0 28px}.pd4-hero{padding:90px 0 74px;border-bottom:1px solid #ddcfba}.pd4-eyebrow{font-size:10px;letter-spacing:.27em;color:#8b642f}.pd4-hero h1{max-width:980px;margin:20px 0 0;font:400 clamp(42px,5vw,68px)/1.32 'Noto Serif TC',Georgia,serif}.pd4-hero p{max-width:850px;margin:26px 0 0;color:#746b60;line-height:2}.pd4-back{margin-top:28px;border:0;border-bottom:1px solid #a9793e;background:transparent;color:#805a30;padding:0 0 5px;cursor:pointer}.pd4-body{padding:28px 0 110px}.pd4-block{display:grid;grid-template-columns:300px 1fr;gap:48px;padding:38px 0;border-bottom:1px solid #ddcfba}.pd4-block h2{margin:0;font:400 24px/1.55 'Noto Serif TC',Georgia,serif}.pd4-items{display:grid;gap:12px}.pd4-item{padding:18px 20px;border:1px solid #e0d4c3;background:#fffdf9;color:#625b52;line-height:1.85}.pd4-cta{margin-top:54px;padding:38px;border:1px solid #d8c8ad;background:linear-gradient(135deg,#fffdf9,#f4ede2);display:flex;justify-content:space-between;align-items:center;gap:30px}.pd4-cta h3{max-width:760px;margin:0;font:400 29px/1.5 'Noto Serif TC',Georgia,serif}.pd4-cta button{border:1px solid #9f7138;background:#9f7138;color:#fff;padding:12px 18px;cursor:pointer;white-space:nowrap}@media(max-width:820px){.pd4-block{grid-template-columns:1fr}.pd4-cta{display:block}.pd4-cta button{margin-top:24px}.pd4-hero{padding:66px 0 54px}}
  `}</style><section className="pd4-hero"><div className="pd4-wrap"><div className="pd4-eyebrow">{cfg.en}</div><h1>{cfg.title}</h1><p>{cfg.lead}</p><button className="pd4-back" onClick={()=>navigate('/problems')}>← 回到問題入口</button></div></section><section className="pd4-body"><div className="pd4-wrap">{groups.map((items,index)=><article className="pd4-block" key={sectionNames[index]}><h2>{sectionNames[index]}</h2><div className="pd4-items">{items.map((item)=><div className="pd4-item" key={item}>{item}</div>)}</div></article>)}<div className="pd4-cta"><h3>如果這正是你正在面對的問題，下一步不用先選服務；先把事件與最不希望出現的結果說清楚。</h3><button onClick={()=>navigate(`/start?route=${id}`)}>從這個問題開始 →</button></div></div></section></div>;
}
