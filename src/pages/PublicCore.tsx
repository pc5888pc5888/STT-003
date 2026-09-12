import FullBleedHero, { JudgmentFoundations } from "../components/FullBleedHero";
import STTPageHero from "../components/STTPageHero";
import { useNavigate } from "react-router-dom";

type MethodStep = { number: string; title: string; body: string };
type ProjectSection = { number: string; title: string; body: string; action?: string; path?: string };

const methodSteps: MethodStep[] = [
  { number: "01", title: "看見｜先分開事件與問題", body: "事件本身，不等於問題。先辨識正在發生的事、當事人真正擔心的結果，以及目前仍然不知道的部分。" },
  { number: "02", title: "反推｜從最不希望發生的未來往回看", body: "不是等結果發生才補救，而是先確認不可接受的終局，再往回辨識今天已經存在的斷點、依賴與不可逆條件。" },
  { number: "03", title: "舉證｜讓主張重新取得證據資格", body: "把事實、主張、證據、假設與未知分開。重要判斷必須知道什麼資料支持它，也必須知道什麼資料會推翻它。" },
  { number: "04", title: "理解｜建立反方、替代框架與失敗條件", body: "同一事件可能被形成成完全不同的問題。正式判讀必須保留替代解釋、反方情境、失敗條件與能夠顛覆結論的證據。" },
  { number: "05", title: "架構｜把判斷轉成權責、門檻與選項", body: "把問題轉成可以被治理的結構：誰能決定、誰必須覆核、什麼情況停止、如何退出、何時讓法律、會計、稅務、信託或其他專業者正式進場。" },
  { number: "06", title: "執行｜先有停止與驗收，再投入資源", body: "執行不是判讀的終點。重大行動需要里程碑、驗收條件、再評估觸發點與最大損失邊界，避免沉沒成本把組織推向不可逆。" },
  { number: "07", title: "留下｜把一次判斷轉成下一次的制度資產", body: "案件完成後保留依據、反對意見、例外、失敗條件與修正紀錄，使組織下一次不必重新從同一個錯誤開始。" },
];

const projectSections: ProjectSection[] = [
  { number: "01", title: "Founder Legacy", body: "保存創辦人如何形成判斷、如何面對危機、哪些底線不能被交換，以及企業文化真正從何而來。", action: "從 Founder Legacy 開始", path: "/problems/founder-legacy" },
  { number: "02", title: "Enterprise History", body: "企業史不只記錄年份與事件，而是建立可追溯時間軸、訪談、文件與影像來源，區分事實、記憶與後來詮釋。" },
  { number: "03", title: "Humanistic Landscape", body: "以受訪者權益、內容核對、影像授權、公開／內部／私人分級與編輯責任為前提，讓人文內容能被正式保存。", action: "進入人文地景產採訪", path: "/humanistic-interview" },
];

function MethodPage() {
  const navigate = useNavigate();
  return <div className="stt-canon">
    <FullBleedHero theme="method" />
    <JudgmentFoundations />
    <section className="stt-canon-body"><div className="stt-canon-wrap">
      <p className="stt-canon-statement">看見 → 反推 → 舉證 → 理解 → 架構 → 執行 → 留下</p>
      <div className="stt-canon-grid">{methodSteps.map((step) => <article className="stt-canon-card" id={`judgment-step-${Number(step.number)}`} key={step.number}>
        <small>{step.number}</small><h2>{step.title}</h2><p>{step.body}</p>
      </article>)}</div>
    </div></section>
    <section className="stt-canon-final"><div className="stt-canon-wrap"><p className="stt-master-kicker">FINAL JUDGMENT</p><h2>判讀的目的，不是增加流程；而是降低不可逆錯誤。</h2><p>如果你正在面對一個重大事件，下一步不用先選顧問類型。先把現在發生了什麼，以及最不希望接下來發生什麼說清楚。</p><button type="button" onClick={() => navigate("/start")}>開始治理判讀 →</button></div></section>
  </div>;
}

function PublicationsPage() {
  const navigate = useNavigate();
  return <div className="stt-publications-page">
    <FullBleedHero theme="publications" />
    <section className="stt-publication-entrances" aria-label="出版研究入口">
      <div className="stt-editorial-wrap">
        <div className="stt-publication-grid">
          <article className="stt-publication-entry">
            <p className="stt-editorial-label">BOOKS</p><h2>書籍｜著作正典</h2>
            <p>集中呈現已正式出版或完成之著作。每本書分開說明其問題意識、核心命題、章節結構與正式版本，讓思想本身成為入口。</p>
            <button type="button" onClick={() => navigate("/books")}>進入書籍 →</button>
          </article>
          <article className="stt-publication-entry">
            <p className="stt-editorial-label">RESEARCH</p><h2>研究｜方法與資料</h2>
            <p>研究內容回到原始研究問題、方法、資料與發現；後來形成的策略推論與候選理論，必須和既有實證成果清楚分開。</p>
            <button type="button" onClick={() => navigate("/research")}>進入研究 →</button>
          </article>
          <article className="stt-publication-entry">
            <p className="stt-editorial-label">PAPERS</p><h2>論文｜可被追溯的學術基礎</h2>
            <p>論文保留可以被檢驗的學術基礎與來源脈絡，讓治理觀點不是權威裝飾，而有清楚可追溯的知識根據。</p>
            <button type="button" onClick={() => navigate("/papers")}>查看論文 →</button>
          </article>
        </div>
      </div>
    </section>
    <section className="stt-canon-final"><div className="stt-canon-wrap"><p className="stt-master-kicker">PUBLICATION PRINCIPLE</p><h2>研究不是裝飾品牌的權威牆。</h2><p>正式內容以可追溯原始資料為準；尚未完成實證驗證的理論與模型，會清楚標示為候選理論、概念模型或後續研究方向。</p></div></section>
  </div>;
}

function ProjectsPage() {
  const navigate = useNavigate();
  return <div className="stt-canon">
    <STTPageHero visual="projects" eyebrow="HUMANISTIC & GOVERNANCE MEMORY" title="有些治理資產，只能在人還能說、還能修正時留下。" lead="企業史、Founder Legacy、家族記憶與人文採訪，不只是內容製作，而是把散落在個人記憶中的判斷、價值與重大轉折，轉成下一代仍能理解的知識資產。" />
    <section className="stt-canon-body"><div className="stt-canon-wrap">
      <p className="stt-canon-statement">事件人人看得見；事件對一個人的意義，往往只有當事人知道。</p>
      <div className="stt-canon-grid">{projectSections.map((section) => <article className="stt-canon-card" key={section.number}>
        <small>{section.number}</small><h2>{section.title}</h2><p>{section.body}</p>{section.action && section.path && <button type="button" onClick={() => navigate(section.path!)}>{section.action} →</button>}
      </article>)}</div>
    </div></section>
    <section className="stt-canon-final"><div className="stt-canon-wrap"><p className="stt-master-kicker">GOVERNANCE MEMORY</p><h2>真正要保存的，不只是故事，而是判斷如何形成。</h2><p>如需啟動企業史、創辦人典藏或治理記憶專案，可先說明希望留下的人、事件、時間範圍與未來使用方式。</p><button type="button" onClick={() => navigate("/start?route=founder-legacy")}>說明專案需求 →</button></div></section>
  </div>;
}

function STTPage() {
  const navigate = useNavigate();
  return <div className="stt-about-page">
    <FullBleedHero theme="stt" />
    <section className="stt-about-modules" aria-label="STT 平台定位與角色">
      <div className="stt-editorial-wrap">
        <article className="stt-about-row">
          <div><p className="stt-editorial-label">PLATFORM</p><h2>平台定位｜高位階治理文明平台</h2></div>
          <div><p>STT Governance 不是一般顧問公司，也不是服務項目的集合。它從人的真實問題開始，統合問題形成、證據、專業責任與制度設計，讓重大決策能被理解、被追問、被承接。</p><button type="button" onClick={() => navigate("/problems")}>從真實問題開始 →</button></div>
        </article>
        <article className="stt-about-row">
          <div><p className="stt-editorial-label">GOVERNANCE CONTROLLER</p><h2>莊鈞翔博士｜治理總控者與制度設計者</h2></div>
          <div><p>莊博士負責問題形成、制度設計、決策判讀與專業協作的總控；最終價值取捨、授權、否決與責任，不外包給模型、工具或第三方建議。</p><button type="button" onClick={() => navigate("/institution/eric-chuang")}>認識莊鈞翔博士 →</button></div>
        </article>
        <article className="stt-about-row">
          <div><p className="stt-editorial-label">AI BOUNDARY</p><h2>AI 邊界｜治理幕僚與作業輔助</h2></div>
          <div><p>AI 可以協助整理資料、核對來源、形成工作底稿與執行已授權作業，但不自行擴張權限，也不取代人類的判斷主權、最後授權與責任。</p><button type="button" onClick={() => navigate("/domains/human-ai-governance")}>進入 AI Governance →</button></div>
        </article>
        <article className="stt-about-row">
          <div><p className="stt-editorial-label">ENGAGEMENT</p><h2>合作入口｜先把真正的問題說清楚</h2></div>
          <div><p>不必先判斷自己需要哪一種顧問。先說明現在發生了什麼、最不希望接下來發生什麼，再決定需要哪些專業、制度與下一步。</p><button type="button" onClick={() => navigate("/start")}>合作洽詢 →</button></div>
        </article>
      </div>
    </section>
    <section className="stt-canon-final"><div className="stt-canon-wrap"><p className="stt-master-kicker">FINAL GOVERNANCE</p><h2>治理主權不外包。</h2><p>能力可以被工具與專業者擴充，但最後的授權、否決、停止與責任歸屬，必須有明確的人類治理主體。</p></div></section>
  </div>;
}

export function HowWeJudge(){ return <MethodPage />; }
export function PublicationsHub(){ return <PublicationsPage />; }
export function ProjectsHub(){ return <ProjectsPage />; }
export function STTPlatform(){ return <STTPage />; }