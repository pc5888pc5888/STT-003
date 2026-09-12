import FullBleedHero, { JudgmentFoundations } from "../components/FullBleedHero";
import STTPageHero from "../components/STTPageHero";
import { useNavigate } from "react-router-dom";

type PageKind = "method" | "publications" | "projects" | "stt";
type Section = { number: string; title: string; body: string; action?: string; path?: string };
type PageConfig = { eyebrow: string; title: string; subtitle: string; statement: string; sections: Section[]; finalTitle: string; finalBody: string; finalAction?: string; finalPath?: string };

const pages: Record<PageKind, PageConfig> = {
  method: {
    eyebrow: "HOW STT JUDGES", title: "先把問題判斷對，再談怎麼做。",
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
    finalAction: "開始治理判讀", finalPath: "/start",
  },
  publications: {
    eyebrow: "PUBLICATIONS & RESEARCH", title: "出版與研究，是治理思想被檢驗、被傳承的地方。",
    subtitle: "專欄用來辨識問題；著作用來建立完整思想；研究則必須回到原始論文、方法與可驗證資料。三者不混為同一種內容。",
    statement: "思想被留下，才可能被理解；被檢驗，才可能成為長期制度資產。",
    sections: [
      { number: "", title: "書籍｜著作正典", body: "集中呈現正式出版或完成之著作，從問題意識、核心命題、章節結構與正式版本進入，不把出版頁做成促銷商城。", action: "進入書籍", path: "/books" },
      { number: "", title: "研究｜可追溯的研究成果", body: "研究內容回到原始研究問題、方法、資料與發現，清楚區分實證結果、後續推論與尚待驗證的候選理論。", action: "進入研究", path: "/research" },
      { number: "", title: "論文｜方法、資料與可檢驗基礎", body: "論文作為研究判斷的證據基礎，保留原始方法、研究限制與可追溯來源，使治理主張能被重新檢驗。", action: "查看研究論文", path: "/research" },
    ],
    finalTitle: "研究不是裝飾品牌的權威牆。",
    finalBody: "正式內容以可追溯原始資料為準；尚未完成實證驗證的理論與模型，會清楚標示為候選理論、概念模型或後續研究方向。",
  },
  projects: {
    eyebrow: "HUMANISTIC LANDSCAPE INTERVIEW", title: "人文地景產採訪｜把仍能被說清楚的記憶留下。",
    subtitle: "20 Questions Journey 從人的生活、地方、選擇與記憶開始，不急著替受訪者下結論，而是先讓答案被本人說出、補充、修正與確認。",
    statement: "事件人人看得見；事件對一個人的意義，往往只有當事人知道。",
    sections: [
      { number: "", title: "20 Questions Journey", body: "以二十個問題形成一段可被回看、補充與確認的人文採訪旅程；回答先保留在受訪者自己的語言裡，再進入後續整理與編輯。", action: "開始人文地景產採訪", path: "/humanistic-20q" },
      { number: "", title: "最新人文地景產專欄", body: "新的人文地景產專欄已加入 STT 的內容入口。文章標題與完整內容以 M傳媒正式頁面為準，STT 不自行改寫來源標題。", action: "閱讀 M傳媒最新專欄", path: "https://94m.com.tw/articles/9feb5e?from_admin=true" },
      { number: "", title: "Founder Legacy 與治理記憶", body: "當人物採訪延伸到企業、家族與創辦人治理記憶時，重點不只是故事，而是保存判斷如何形成、哪些底線不能交換，以及重大轉折如何被理解。", action: "了解 Founder Legacy", path: "/problems/founder-legacy" },
    ],
    finalTitle: "真正要保存的，不只是故事，而是判斷如何形成。",
    finalBody: "人文地景產採訪與治理記憶可以彼此銜接，但受訪者的原始回答、公開版本與後續詮釋仍須清楚分層。",
  },
  stt: {
    eyebrow: "ABOUT STT GOVERNANCE", title: "STT 是治理判讀與制度設計平台，不是把更多意見堆在一起的顧問目錄。",
    subtitle: "前台從人的真實問題開始；後台才進入證據、反方、策略資格、專業路由、人機權力邊界與最終治理判讀。",
    statement: "外界看的是入口；系統承接的是複雜度；最終責任仍然必須回到人。",
    sections: [
      { number: "", title: "平台定位｜高位階治理文明平台", body: "STT Governance 以治理判讀、制度設計與責任歸屬為核心，處理企業、家族與重大決策中真正需要被形成、驗證與承接的問題。", action: "從真實問題開始", path: "/problems" },
      { number: "", title: "莊鈞翔博士｜治理總控者與制度設計者", body: "治理總控者統合問題形成、證據判讀、專業協作與最終決策責任；能力可以被擴充，但主權裁量不外包。", action: "認識莊鈞翔博士", path: "/institution/eric-chuang" },
      { number: "", title: "AI 邊界｜治理幕僚與作業系統輔助", body: "AI 協助整理、核對、形成工作底稿與執行已授權作業；不自行擴張權限，不取代人類的價值取捨、最終授權與責任。", action: "進入 AI Governance", path: "/domains/human-ai-governance" },
      { number: "", title: "合作入口｜從正在面對的事情開始", body: "合作不是先選一個服務名稱，而是先說清楚現在發生了什麼、最不希望發生什麼，以及目前有哪些證據、限制與必須保留的選項。", action: "合作洽詢", path: "/start" },
    ],
    finalTitle: "治理主權不外包。",
    finalBody: "能力可以被工具與專業者擴充，但最後的授權、否決、停止與責任歸屬，必須有明確的人類治理主體。",
  },
};

function CanonicalPage({ kind }: { kind: PageKind }) {
  const navigate = useNavigate();
  const page = pages[kind];
  const primary = kind === "method" || kind === "publications" || kind === "stt";
  const openPath = (path: string) => {
    if (/^https?:\/\//.test(path)) window.open(path, "_blank", "noopener,noreferrer");
    else navigate(path);
  };
  return <div className="stt-canon">
    {primary ? <FullBleedHero theme={kind as "method" | "publications" | "stt"} /> : <STTPageHero visual="projects" eyebrow={page.eyebrow} title={page.title} lead={page.subtitle} />}
    {kind === "method" && <JudgmentFoundations />}
    <section className="stt-canon-body"><div className="stt-canon-wrap">
      <p className="stt-canon-statement">{page.statement}</p>
      <div className="stt-canon-grid">{page.sections.map((section, index) => <article className="stt-canon-card" id={kind === "method" ? `judgment-step-${Number(section.number)}` : undefined} key={`${kind}-${index}-${section.title}`}>
        {section.number && <small>{section.number}</small>}<h2>{section.title}</h2><p>{section.body}</p>{section.action && section.path && <button type="button" onClick={() => openPath(section.path!)}>{section.action} →</button>}
      </article>)}</div>
    </div></section>
    <section className="stt-canon-final"><div className="stt-canon-wrap"><p className="stt-master-kicker">FINAL JUDGMENT</p><h2>{page.finalTitle}</h2><p>{page.finalBody}</p>{page.finalAction && page.finalPath && <button type="button" onClick={() => openPath(page.finalPath!)}>{page.finalAction} →</button>}</div></section>
  </div>;
}

export function HowWeJudge(){ return <CanonicalPage kind="method" />; }
export function PublicationsHub(){ return <CanonicalPage kind="publications" />; }
export function ProjectsHub(){ return <CanonicalPage kind="projects" />; }
export function STTPlatform(){ return <CanonicalPage kind="stt" />; }