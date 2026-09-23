import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";

const STT_PRESS_URL = "https://stt-003.vercel.app/#hero";
const M_MEDIA_URL = "https://94m.com.tw/editors/ed55fc";

function usePageMeta(title:string, description:string){
  useEffect(()=>{
    document.title=title;
    let meta=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(!meta){
      meta=document.createElement("meta");
      meta.name="description";
      document.head.appendChild(meta);
    }
    meta.content=description;
  },[title,description]);
}

function Section({kicker,title,children,id}:{kicker?:string;title:string;children:ReactNode;id?:string}){
  return <section className="stt-inst-section" id={id}><div className="stt-inst-shell">{kicker&&<p className="stt-inst-kicker">{kicker}</p>}<h2>{title}</h2><div className="stt-inst-body">{children}</div></div></section>;
}

export function AboutPage(){
  usePageMeta("關於 STT Governance｜治理判讀與制度設計","STT Governance 是以重大決策、企業與家族治理為核心的治理判讀與制度設計平台。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="ABOUT STT GOVERNANCE"
      title="STT Governance 不是一般顧問公司，而是高位階治理文明平台。"
      subtitle="STT 不以提供更多意見為目的，而是建立可以承擔後果的治理秩序。"
      lead="STT Governance 是以重大決策、企業與家族治理為核心的治理判讀與制度設計平台。當一個問題同時牽涉策略、權力、證據、責任、法遵或家族關係時，單一專業工具往往不足以回答「應不應該做」以及「誰應該承擔」。STT 的工作，是先建立治理結構，再讓適當的專業工具進入。"
      image="/visual-bank/stt/user-approved-six/about-stt.png"
      imagePosition="center right"
      id="about-title"
    />

    <Section kicker="POSITION" title="STT 處理的，是不同專業之上的治理問題。">
      <p>STT 不把法律、財務、信託、AI 或策略各自當成孤立產品。它先確認治理目的、權力邊界、證據基礎與不可承擔風險，再確認需要哪些專業工具，以及它們如何共同服務同一個決策。</p>
      <Link to="/how-stt-works">STT 如何判讀 →</Link>
    </Section>

    <Section kicker="ECOSYSTEM" title="一個母體，不同功能。">
      <div className="stt-inst-grid">
        <article><strong>STT Governance</strong><p>母平台、治理受理與最終制度整合。</p></article>
        <article><strong>ESGAI</strong><p>治理作業系統與幕僚層，支援資料、證據、政策與決策流程；不是平行品牌，也不是自動決策產品。</p></article>
        <article><strong>STT Press</strong><p>出版與治理文本。</p></article>
        <article><strong>STT Intelligence</strong><p>研究、判讀與長期知識資產。</p></article>
        <article><strong>GCSDA</strong><p>獨立組織，與 STT 分站運作。</p></article>
      </div>
    </Section>

    <Section kicker="HUMAN AUTHORITY" title="最終判讀仍須有人承擔。">
      <p>STT 使用 AI 協助研究、整理、比對與版本追蹤，但重大治理判讀、授權與是否執行，仍由人類決策者與治理程序承擔。</p>
      <Link to="/eric-chuang">莊鈞翔博士 →</Link>
    </Section>
  </div>;
}

export function EricPage(){
  usePageMeta("莊鈞翔博士｜治理判讀與制度設計｜STT Governance","莊鈞翔博士為 STT Governance 創辦人與治理總控者，研究與實務聚焦企業策略、公司治理與法遵、家族企業接班及 AI 治理。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="GOVERNANCE PRINCIPAL"
      title="莊鈞翔博士 Eric Chuang, Ph.D."
      titleLines={["莊鈞翔博士", "Eric Chuang, Ph.D."]}
      subtitle="STT Governance 創辦人｜治理總控者｜制度設計與重大決策判讀。"
      image="/images/eric-governance-principal-approved.jpg"
      imageFit="contain"
      imagePosition="right bottom"
      id="eric-title"
    />

    <Section kicker="GOVERNANCE ROLE" title="判讀者的工作，不是替別人做決定。">
      <p>莊鈞翔博士在 STT 的角色，是建立判讀架構、辨識不可承擔風險、設計治理制度，並在重大事件中維持問題、證據、權力與責任的邊界。最終決定仍由具決策權的人承擔。</p>
    </Section>

    <Section kicker="RESEARCH" title="長期研究主軸。">
      <ul className="stt-inst-list">
        <li>企業接班與家族價值。</li>
        <li>公司治理與法遵導入。</li>
        <li>專業服務與永續治理。</li>
        <li>AI 介入決策後的人機主權與責任。</li>
        <li>內在法遵、決策憲政與治理文明。</li>
      </ul>
      <Link to="/insights">進入研究與出版 →</Link>
    </Section>

    <Section kicker="PUBLIC INTERPRETATION" title="公開判讀與專欄。">
      <p>公開專欄與第三方媒體發表用來呈現研究如何進入現實事件。M 傳媒屬外部第三方媒體，僅標示為發表來源。</p>
      <a href={M_MEDIA_URL} target="_blank" rel="noreferrer">M 傳媒｜外部第三方發表來源 ↗</a>
    </Section>

    <Section kicker="PUBLICATION" title="出版與制度文本。">
      <p>由 STT Press 與其他正式通路發行之著作，以治理、決策、人機主權、家族與制度文明為核心。</p>
      <a href={STT_PRESS_URL}>STT Press →</a>
    </Section>

    <Section kicker="ACADEMIC & INSTITUTIONAL ROLES" title="學術與公共角色。">
      <ul className="stt-inst-list">
        <li>商學博士（逢甲大學）。</li>
        <li>逢甲大學商學院兼任助理教授。</li>
        <li>中華企業策略永續發展學會（GCSDA）創會理事長。</li>
        <li>STT Press 執行長暨創辦人。</li>
      </ul>
    </Section>
  </div>;
}

export function InstitutionsPage(){
  usePageMeta("機構合作｜STT Governance","STT Governance 與律師、會計師、信託、家族辦公室、金融及其他專業機構，以治理架構整合跨專業重大案件。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="INSTITUTIONAL GOVERNANCE"
      title="當單一專業工具不足以處理整體治理問題，需要的是一個更上位的判讀架構。"
      titleLines={["當單一專業工具不足以處理整體治理問題，", "需要的是一個更上位的判讀架構。"]}
      lead="重大治理事件可能同時牽涉法律、財務、家族、策略、權力與執行。STT 負責治理整合與問題架構；各專業仍在自身責任範圍內執行。"
      image="/visual-bank/stt/cooperation-hero-20260917.png"
      imagePosition="center right"
      id="institutions-title"
    >
      <Link to="/start?type=institution">提出機構合作情境 →</Link>
    </UnifiedTitleHero>

    <Section kicker="WHO" title="適合合作的專業場景。">
      <p>律師事務所、會計師與稅務專業、信託與私人銀行、家族辦公室、證券/投行、企業董事與其他長期服務高資產家族或企業決策者之機構。</p>
    </Section>

    <Section kicker="COLLABORATION" title="合作不是互相導客，而是把複雜問題放回正確層級。">
      <p>可合作方向：重大案件治理架構、家族與接班案件、AI 治理制度、Institutional Governance Protocol、跨專業決策卷宗。實際合作範圍依案件責任與保密需求另行確認。</p>
      <Link to="/start?type=institution">提出機構合作情境 →</Link>
    </Section>
  </div>;
}

export function PrivacyPage(){
  usePageMeta("隱私與資料使用｜STT Governance","STT Governance 網站表單與網站資料使用說明。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="PRIVACY & DATA USE"
      title="隱私與資料使用"
      subtitle="第一次提交，只整理問題與下一步。"
      lead="本網站第一階段只整理問題與下一步，不提供即時法律結論，也不要求第一次提交大量敏感資訊。正式受理後，才依案件建立資料與 AI 使用邊界。"
      id="privacy-title"
    />
    <Section kicker="DATA MINIMIZATION" title="第一次受理，不要求大量敏感資料。">
      <p>請不要在第一階段提供不必要的身分證件、金融帳戶、醫療資料、完整營業秘密或其他高度敏感資訊；Phase 1 不提供檔案上傳。</p>
    </Section>
    <Section kicker="IMPLEMENTATION BOUNDARY" title="網站只揭露可以被確認的資料處理事實。">
      <p>在實際表單工具、資料儲存位置、寄送服務與保存期間未被正式確認前，STT 不在網站上自行宣稱特定加密、ISO 認證、特定保存年限或跨境處理狀態。</p>
    </Section>
  </div>;
}

export function ProfessionalBoundaryPage(){
  usePageMeta("專業服務與資訊邊界｜STT Governance","STT Governance 的治理判讀、制度設計與外部專業協作邊界。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="PROFESSIONAL BOUNDARY"
      title="治理判讀與專業服務邊界"
      lead="STT 網站內容用於說明治理方法、研究觀點與受理流程，不構成對特定個案的即時法律、稅務、投資、醫療或其他依法需由特定專業人員提供之意見。正式案件如需特定專業工作，由客戶既有團隊或另行確認之適當專業執行。"
      id="boundary-title"
    />
  </div>;
}
