import { useNavigate } from "react-router-dom";

type PageKind = "method" | "publications" | "projects" | "stt";

type Section = {
  number: string;
  title: string;
  body: string;
  action?: string;
  path?: string;
};

type PageConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  statement: string;
  sections: Section[];
  finalTitle: string;
  finalBody: string;
  finalAction?: string;
  finalPath?: string;
};

const pages: Record<PageKind, PageConfig> = {
  method: {
    eyebrow: "HOW STT JUDGES",
    title: "先把問題判斷對，再談怎麼做。",
    subtitle: "STT 不從服務分類開始，而是把事件、真正問題、證據、反方、不可承擔結果、專業責任與執行條件放回同一個判讀程序。",
    statement: "看見 → 反推 → 舉證 → 理解 → 架構 → 執行 → 留下",
    sections: [
      { number: "01", title: "看見｜先分開事件與問題", body: "事件本身，不等於問題。先辨識正在發生的事、當事人真正擔心的結果，以及目前仍然不知道的部分。" },
      { number: "02", title: "反推｜從最不希望發生的未來往回看", body: "不是等結果發生才補救，而是先確認不可接受的終局，再往回辨識今天已經存在的斷點、依賴與不可逆條件。" },
      { number: "03", title: "舉證｜讓主張重新取得證據資格", body: "把事實、主張、證據、假設與未知分開。重要判斷必須知道什麼資料支持它，也必須知道什麼資料會推翻它。" },
      { number: "04", title: "理解｜建立反方、替代框架與失敗條件", body: "同一事件可能被形成成完全不同的問題。正式判讀必須保留替代解釋、反方情境、失敗條件與能夠顛覆結論的證據。" },
      { number: "05", title: "架構｜把判斷轉成權責、門檻與選項", body: "把問題轉成可以被治理的結構：誰能決定、誰必須覆核、什麼情況停止、如何退出、何時讓法律、會計、稅務、信託或其他專業者正式進場。" },
      { number: "06", title: "執行｜先有停止與驗收，再投入資源", body: "執行不是判讀的終點。重大行動需要里程碑、驗收條件、再評估觸發點與最大損失邊界，避免沉沒成本把組織推向不可逆。" },
      { number: "07", title: "留下｜把一次判斷轉成下一次的制度資產", body: "案件完成後保留依據、反對意見、例外、失敗條件與修正紀錄，使組織下一次不必重新從同一個錯誤開始。" },
    ],
    finalTitle: "判讀的目的，不是增加流程；而是降低不可逆錯誤。",
    finalBody: "如果你正在面對一個重大事件，下一步不用先選顧問類型。先把現在發生了什麼，以及最不希望接下來發生什麼說清楚。",
    finalAction: "開始治理判讀",
    finalPath: "/start",
  },
  publications: {
    eyebrow: "PUBLICATIONS & RESEARCH",
    title: "出版與研究，是治理思想被檢驗、被傳承的地方。",
    subtitle: "專欄用來辨識問題；著作用來建立完整思想；研究則必須回到原始論文、方法與可驗證資料。三者不混為同一種內容。",
    statement: "思想被留下，才可能被理解；被檢驗，才可能成為長期制度資產。",
    sections: [
      { number: "01", title: "著作正典", body: "集中呈現已正式出版或完成之著作，不以商城式促銷取代思想架構。每本書分開說明其問題意識、核心命題、章節結構與正式版本。", action: "進入著作", path: "/books" },
      { number: "02", title: "研究與論文", body: "研究頁只陳述原始論文真正支持的研究問題、方法、資料與發現；不得把後來的策略推論包裝成既有實證成果。", action: "進入研究", path: "/research" },
      { number: "03", title: "《內在法遵》思想正典", body: "《內在法遵》處理的是責任、邊界、自我治理與判斷主權。它不等同企業契約、採購、付款或稽核制度，兩者在網站上必須分流。", action: "進入《內在法遵》", path: "/books/internal-compliance" },
    ],
    finalTitle: "研究不是裝飾品牌的權威牆。",
    finalBody: "正式內容以可追溯原始資料為準；尚未完成實證驗證的理論與模型，會清楚標示為候選理論、概念模型或後續研究方向。",
  },
  projects: {
    eyebrow: "HUMANISTIC & GOVERNANCE MEMORY",
    title: "有些治理資產，只能在人還能說、還能修正時留下。",
    subtitle: "企業史、Founder Legacy、家族記憶與人文採訪，不只是內容製作，而是把散落在個人記憶中的判斷、價值與重大轉折，轉成下一代仍能理解的知識資產。",
    statement: "事件人人看得見；事件對一個人的意義，往往只有當事人知道。",
    sections: [
      { number: "01", title: "Founder Legacy", body: "保存創辦人如何形成判斷、如何面對危機、哪些底線不能被交換，以及企業文化真正從何而來。", action: "從 Founder Legacy 開始", path: "/problems/founder-legacy" },
      { number: "02", title: "Enterprise History", body: "企業史不只記錄年份與事件，而是建立可追溯時間軸、訪談、文件與影像來源，區分事實、記憶與後來詮釋。" },
      { number: "03", title: "Humanistic Landscape", body: "以受訪者權益、內容核對、影像授權、公開／內部／私人分級與編輯責任為前提，讓人文內容能被正式保存。" },
    ],
    finalTitle: "真正要保存的，不只是故事，而是判斷如何形成。",
    finalBody: "如需啟動企業史、創辦人典藏或治理記憶專案，可先說明希望留下的人、事件、時間範圍與未來使用方式。",
    finalAction: "說明專案需求",
    finalPath: "/start?route=founder-legacy",
  },
  stt: {
    eyebrow: "ABOUT STT GOVERNANCE",
    title: "STT 是治理判讀與制度設計平台，不是把更多意見堆在一起的顧問目錄。",
    subtitle: "前台從人的真實問題開始；後台才進入證據、反方、策略資格、專業路由、人機權力邊界與最終治理判讀。",
    statement: "外界看的是入口；系統承接的是複雜度；最終責任仍然必須回到人。",
    sections: [
      { number: "01", title: "Problem Framing｜問題形成", body: "先確認真正需要被回答的問題，而不是讓部門、既有分類、工具或 AI 自動替決策者預設問題。", action: "從問題入口開始", path: "/problems" },
      { number: "02", title: "Evidence & Counter-Case｜證據與反方", body: "重要判斷必須能追溯資料來源、假設與未知，也必須保留可能推翻結論的證據與替代情境。" },
      { number: "03", title: "Strategic Qualification｜策略資格", body: "不是每一個看似有利的方案都已具備執行資格。重大策略必須先檢查問題、證據、假設、價值邊界、不可逆風險、選項保留與再驗證能力。", action: "查看治理知識領域", path: "/domains" },
      { number: "04", title: "Professional Routing｜專業路由", body: "法律、會計、稅務、信託、產業與技術專業各自保有責任邊界；STT 的角色是辨識何時必須讓誰正式進場，而不是宣稱取代全部專業。" },
      { number: "05", title: "Human–AI Constitutional Gate｜人機治憲", body: "先決定資料能不能進 AI、AI 可以形成什麼主張、代理工具能執行到哪裡、誰能覆核、誰能停止，再讓模型參與重要工作。", action: "進入 AI Governance", path: "/domains/human-ai-governance" },
      { number: "06", title: "Final Governance Judgment｜最終治理判讀", body: "最終價值不是假裝系統會自動做出正確決定，而是確保問題定義、證據門檻、專業進場、衝突仲裁與最後判讀都有可以被追問的人。", action: "治理責任｜莊鈞翔博士", path: "/institution/eric-chuang" },
    ],
    finalTitle: "治理主權不外包。",
    finalBody: "能力可以被工具與專業者擴充，但最後的授權、否決、停止與責任歸屬，必須有明確的人類治理主體。",
  },
};

function CanonicalPage({ kind }: { kind: PageKind }) {
  const navigate = useNavigate();
  const page = pages[kind];
  return (
    <div className="stt-canon">
      <style>{`
        .stt-canon{min-height:100vh;background:#fbfaf7;color:#2b261f}.stt-canon *{box-sizing:border-box}.stt-canon-wrap{max-width:1180px;margin:0 auto;padding:0 28px}.stt-canon-hero{padding:92px 0 78px;border-bottom:1px solid #ddcfba}.stt-canon-eyebrow{font-size:10px;letter-spacing:.27em;color:#8b642f}.stt-canon h1{max-width:980px;margin:20px 0 0;font:400 clamp(42px,5vw,70px)/1.32 'Noto Serif TC',Georgia,serif;letter-spacing:-.02em}.stt-canon-sub{max-width:820px;margin:28px 0 0;color:#746b60;font-size:16px;line-height:2}.stt-canon-statement{max-width:900px;margin-top:34px;padding-top:22px;border-top:1px solid #ddcfba;color:#805a2e;font:400 18px/1.9 'Noto Serif TC',Georgia,serif}.stt-canon-body{padding:34px 0 90px}.stt-canon-row{display:grid;grid-template-columns:90px minmax(0,1fr) auto;gap:34px;padding:36px 0;border-bottom:1px solid #ddd0bc}.stt-canon-number{font:400 22px Georgia,serif;color:#b1874c}.stt-canon-row h2{margin:0;font:400 25px/1.55 'Noto Serif TC',Georgia,serif}.stt-canon-row p{max-width:760px;margin:13px 0 0;color:#6f675e;line-height:1.95}.stt-canon-action{align-self:center;border:0;border-bottom:1px solid #aa7c42;background:transparent;color:#825b2d;padding:0 0 5px;white-space:nowrap;cursor:pointer}.stt-canon-final{margin-top:58px;padding:42px;border:1px solid #d8c8ad;background:linear-gradient(135deg,#fffdf9,#f4ede2)}.stt-canon-final h2{margin:0;font:400 31px/1.5 'Noto Serif TC',Georgia,serif}.stt-canon-final p{max-width:820px;margin:16px 0 0;color:#6f675e;line-height:1.9}.stt-canon-final button{margin-top:24px;border:1px solid #a9793e;background:#a9793e;color:white;padding:12px 18px;cursor:pointer}@media(max-width:800px){.stt-canon-row{grid-template-columns:54px 1fr}.stt-canon-action{grid-column:2;justify-self:start}.stt-canon-hero{padding:70px 0 58px}.stt-canon-final{padding:28px}}
      `}</style>
      <section className="stt-canon-hero"><div className="stt-canon-wrap"><div className="stt-canon-eyebrow">{page.eyebrow}</div><h1>{page.title}</h1><p className="stt-canon-sub">{page.subtitle}</p><div className="stt-canon-statement">{page.statement}</div></div></section>
      <section className="stt-canon-body"><div className="stt-canon-wrap">{page.sections.map((section)=><article className="stt-canon-row" key={section.number}><div className="stt-canon-number">{section.number}</div><div><h2>{section.title}</h2><p>{section.body}</p></div>{section.action&&section.path&&<button className="stt-canon-action" onClick={()=>navigate(section.path!)}>{section.action} →</button>}</article>)}<div className="stt-canon-final"><h2>{page.finalTitle}</h2><p>{page.finalBody}</p>{page.finalAction&&page.finalPath&&<button onClick={()=>navigate(page.finalPath!)}>{page.finalAction} →</button>}</div></div></section>
    </div>
  );
}

export function HowWeJudge(){return <CanonicalPage kind="method"/>}
export function PublicationsHub(){return <CanonicalPage kind="publications"/>}
export function ProjectsHub(){return <CanonicalPage kind="projects"/>}
export function STTPlatform(){return <CanonicalPage kind="stt"/>}
