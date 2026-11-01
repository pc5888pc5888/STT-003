import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";

import AUTHOR_PROFILE from "../data/authorProfile.json";

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
      lead="STT Governance 是以重大決策、企業與家族治理為核心的治理判讀與制度設計平台；當一個問題同時牽涉策略、權力、證據、責任、法遵或家族關係時，STT 先建立治理結構，再讓適當的專業工具進入。"
      image="/visual-bank/stt/user-approved-six/about-stt.png"
      imagePosition="center right"
      id="about-title"
    />

    <Section kicker="POSITION" title="STT 處理的，是不同專業之上的治理問題。">
      <p>STT 不把法律、財務、信託、AI 或策略各自當成孤立產品，而是先確認治理目的、權力邊界、證據基礎與不可承擔風險，再確認需要哪些專業工具，以及它們如何共同服務同一個決策。</p>
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

    <Section kicker="HUMAN AUTHORITY｜頂層裁量" title="「AI 負責判斷之效率，人類重構決策之價值。」 莊鈞翔博士">
      <p><strong>STT</strong> 系統深度導入 AI 技術，極大化研究、文獻整理、數據比對與版本控管之綜效，協助企業全面跨越「資訊層」與「判斷層」之痛點。</p>
      <p style={{marginTop:18}}>然而，涉及重大治理判讀、權限授權與執行合規性，<strong>其終局決策權（Ultimate Decision-making）與信託責任（Fiduciary Duty），仍由人類決策者與治理程序全權承擔。</strong> 我們深信，技術輔助無上限，但唯有「核心決策與後果承擔」，是機器永遠無法跨越的邊界。</p>
      <Link to="/eric-chuang">莊鈞翔博士 →</Link>
    </Section>
  </div>;
}

export function EricPage(){
  usePageMeta("莊鈞翔博士｜治理判讀與制度設計｜STT Governance","莊鈞翔博士為 STT Governance 創辦人暨執行長，並負責制度設計與重大決策判讀；研究與實務聚焦企業策略、公司治理與法遵、家族企業接班及 AI 治理。");
  return <div className="stt-inst-page stt-eric-page">
    <UnifiedTitleHero
      kicker=""
      title="創辦人暨執行長｜莊鈞翔博士"
      subtitle="STT Governance 創辦人暨執行長"
      image="/visual-approved/portrait-front.png"
      imageFit="contain"
      imagePosition="right bottom"
      id="eric-title"
    />

    <Section kicker="ABOUT ERIC" title="制度設計與重大決策判讀">
      <p className="stt-eric-quote"><strong>「AI 負責判斷之效率，人類重構決策之價值。」—— 莊鈞翔博士</strong></p>
      <p style={{marginTop:18}}>真正困難的決策，往往不是因為資訊不足，而是問題、證據、權力、責任與後果同時交錯，卻沒有人先把它們放回正確的位置。</p>
      <p style={{marginTop:18}}>莊鈞翔博士為 STT Governance 創辦人暨執行長，長期深耕企業治理、策略判讀、法遵風險、組織決策、家族治理與數位治理。以公司治理策略與內部合規架構的雙重視角，他所處理的核心，不是替決策者增加更多意見，而是在重大事情進入不可逆結果之前，先釐清真正的問題、證據基礎、權力來源、責任歸屬、可行選項與不可承擔風險，再建立可執行、可追溯並能承擔後果的治理結構。</p>
    </Section>

    <Section kicker="GOVERNANCE ROLE" title="治理判讀，是重新定義問題的頂層架構">
      <p className="stt-eric-quote"><strong>「判讀者的工作，從不是替別人做決定，而是為決策者廓清迷霧。」—— 莊鈞翔博士</strong></p>
      <p style={{marginTop:18}}>莊博士身為執行長在<strong>策略智庫智慧治理 STT Governance</strong>的核心角色，在於建構頂層的「重大決策判讀架構」；當一項戰略同時交織著商戰策略、股權結構、家族傳承、法律風險、財務合規、組織變革、企業聲譽甚至 AI 浪潮時，首要之務並非盲目尋求單一領域的專家，而是精準釐清「治理的本質是什麼」。</p>
      <p style={{marginTop:18}}>我們必須在局勢交錯時，率先錨定：誰是終局裁決者？何種客觀證據足以支持判斷？何種核心責任絕不容轉移？以及何種風險結果一旦發生即無法承擔？</p>
      <p style={{marginTop:18}}><strong>策略智庫智慧治理 STT Governance</strong>在此架構之上，引導法律、財務、信託或科技等多元專業，在最精準的時機與節點配置進入，畢竟，<strong>「專業可以分工，但最終治理責任絕不能失焦。」</strong></p>
    </Section>

    <Section kicker="CORE GOVERNANCE DOMAINS" title="核心治理領域">
      <div className="stt-inst-grid stt-eric-domain-grid">
        <article><span className="stt-eric-domain-number">01</span><h3>企業治理與重大決策</h3><p>釐清重大選擇中的權力、責任、風險、證據與不可承擔結果。</p></article>
        <article><span className="stt-eric-domain-number">02</span><h3>家族治理與企業接班</h3><p>處理家族價值、接班安排、權責配置與跨世代治理秩序。</p></article>
        <article><span className="stt-eric-domain-number">03</span><h3>公司治理與內部合規</h3><p>建立公司治理、法遵風險與內部制度之間可以被執行與追溯的結構。</p></article>
        <article><span className="stt-eric-domain-number">04</span><h3>營運風險與契約治理</h3><p>將交易、營運與契約風險放回整體治理目的與責任邊界中判讀。</p></article>
        <article><span className="stt-eric-domain-number">05</span><h3>組織決策與高階管理</h3><p>釐清決策權、授權、責任與程序，避免權力存在卻沒有可承擔的治理結構。</p></article>
        <article><span className="stt-eric-domain-number">06</span><h3>AI Governance 與數位治理</h3><p>界定 AI 能力、限制、人機責任與企業導入後不可外包的最終決策權。</p></article>
      </div>
    </Section>

    <Section kicker="AI GOVERNANCE & TECHNICAL PRACTICE" title="技術可以擴張，決策主權不能外包">
      <p><strong>策略智庫智慧治理 STT Governance</strong>深度導入前沿科技，全面賦能文獻研究、跨版本比對與幕僚分析。</p>
      <p style={{marginTop:18}}><strong>莊鈞翔博士</strong>對 AI 的技術實踐已超越一般工具應用，他將核心研究聚焦於企業級模型整合、智能代理（Agentic AI）與自動化工作流之動態治理架構；目前，莊博士已實質推進並完成 <strong>21 項 Anthropic AI / Claude 核心技術學程</strong>，並取得 <strong>Google Gemini 專家資格</strong>。</p>
      <p style={{marginTop:18}}>基於誠信揭露，所有技術實務、核心課程與認證成果，<strong>均依其客觀實質屬性分項獨立呈現如下：</strong></p>
      <div className="stt-inst-grid stt-eric-ai-grid">
        <article><strong>Claude Technical Practice</strong><em className="stt-inst-card-subtitle">Claude 技術實務</em><p>涵蓋 Claude 101、Claude Platform 101、Claude Code 101、Claude Code in Action、Anthropic API、Amazon Bedrock、Google Vertex AI 與 Claude Cowork 等技術應用。</p></article>
        <article><strong>AI Fluency & Education</strong><em className="stt-inst-card-subtitle">AI 素養與教育脈絡</em><p>涵蓋 AI Fluency Framework & Foundations、AI Capabilities & Limitations，以及面向 Builders、Educators、Students、K-12、Nonprofits 與 Small Businesses 等應用與教學脈絡。</p></article>
        <article><strong>Agentic AI & Model Protocol</strong><em className="stt-inst-card-subtitle">智能代理與模型協定</em><p>涵蓋 Model Context Protocol (MCP)、MCP Advanced Topics、Agent Skills、Subagents 與多模型工作流治理。</p></article>
        <article><strong>Google for Education</strong><em className="stt-inst-card-subtitle">Google 教育應用認證</em><p>Gemini Certified Educator ｜ Gemini 教育應用專家資格。</p></article>
      </div>
    </Section>

    <Section kicker="HUMAN AUTHORITY" title="最終決策與後果，仍由人承擔">
      <p>技術可以加速研究、比對大量資料，也可以協助形成更完整的選項；但涉及重大治理判讀、權限授權、是否執行，以及最終後果承擔時，<strong>終局決策權（Ultimate Decision-making）與責任仍屬於人。</strong></p>
      <p style={{marginTop:18}}>莊博士所建立的人機治理邊界，是讓 AI 成為更強大的治理幕僚，而不是把決策責任交給模型。技術輔助可以持續擴張，但核心決策與後果承擔，始終必須保有人類主權。</p>
    </Section>

    <Section kicker="PROFESSIONAL QUALIFICATIONS & TECHNICAL PRACTICE" title="專業資格與技術實務">
      <p>以下資格與技術實務用來證明跨領域理解與持續專業訓練；它們是治理判讀能力的佐證，而不是治理權力本身的來源。</p>
      <div className="stt-inst-grid">
        <article><strong>永續發展碳管理 SDCMM</strong><p>CEO 國際認證中心｜甲級管理師認證。</p></article>
        <article><strong>ESG 不動產淨零 RENZM</strong><p>CEO 國際認證中心｜甲級管理師認證。</p></article>
        <article><strong>減碳管理師</strong><p>中華經濟研究院綠色經濟研究中心｜Carbon Reduction Professional。</p></article>
        <article><strong>兩岸勞資法務管理</strong><p>CEO 國際認證中心｜甲級管理師認證；相關訓練課程經 TÜV Rheinland 審查認證。</p></article>
      </div>
    </Section>

    <Section kicker="CURRENT POSITION" title="現任職務" id="eric-current-position">
      <div className="stt-eric-position-list">{AUTHOR_PROFILE.positions.map(position=><div className="stt-eric-position-row" key={position}><b>POSITION</b><div>{position}</div></div>)}</div>
      <p className="stt-eric-position-note">上述職務分屬各自機構或法人，列示僅表示莊鈞翔博士之現任職務，不代表各機構均由莊博士創設、亦不代表均屬 GCSDA 或 STT Governance 所有；Ｍ傳媒為外部第三方媒體。</p>
    </Section>

    <Section kicker="RESEARCH & PUBLICATIONS" title="研究與出版">
      <p>莊博士的研究與出版主軸，長期圍繞企業接班、家族價值、公司治理、法遵導入、專業服務永續、AI Governance，以及「內在法遵」所延伸的人類判斷與決策主權。</p>
      <div className="stt-eric-publication-list">{AUTHOR_PROFILE.publications.map(title=><div className="stt-eric-publication-row" key={title}><b>PUBLICATION</b><div>{title}</div></div>)}</div>
      <Link to="/insights">進入研究與出版 →</Link>
    </Section>

    <Section kicker="PUBLIC INTERPRETATION" title="公開判讀與第三方專欄">
      <p>公開專欄與第三方媒體發表用來呈現研究如何進入現實事件；M 傳媒屬外部第三方媒體，僅標示為發表來源。</p>
      <a href={M_MEDIA_URL} target="_blank" rel="noreferrer">M 傳媒｜外部第三方發表來源 ↗</a>
    </Section>

    <Section kicker="GOVERNANCE INTAKE" title="最後需要被回答的，不是誰給答案，而是誰能承擔決定">
      <p>在事情真正發生之前，是否已經有人把問題看清楚；是否知道哪些風險不能承擔；是否知道誰有權決定；以及最後，誰願意為這個決定負責。這就是 STT Governance 所說的治理判讀。</p>
      <Link to="/start">開始治理判讀 →</Link>
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
      lead="重大治理事件可能同時牽涉法律、財務、家族、策略、權力與執行；STT 負責治理整合與問題架構，各專業則在自身責任範圍內執行。"
      id="institutions-title"
    >
      <Link to="/start?type=institution">提出機構合作情境 →</Link>
    </UnifiedTitleHero>

    <Section kicker="WHO" title="適合合作的專業場景。">
      <p>律師事務所、會計師與稅務專業、信託與私人銀行、家族辦公室、證券/投行、企業董事與其他長期服務高資產家族或企業決策者之機構。</p>
    </Section>

    <Section kicker="COLLABORATION" title="合作不是互相導客，而是把複雜問題放回正確層級。">
      <p>可合作方向包括重大案件治理架構、家族與接班案件、AI 治理制度、Institutional Governance Protocol 與跨專業決策卷宗，實際合作範圍則依案件責任與保密需求另行確認。</p>
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
      lead="第一次受理以整理治理情境與必要聯絡資訊為限，請勿提供身分證件、金融帳戶、醫療資料、完整營業秘密或其他不必要的敏感內容。"
      id="privacy-title"
    />
    <Section title="初次受理的必要資訊">
      <p>受理表收集姓名或稱謂、可回覆之聯絡方式、事件中的角色、目前發生的事情、不希望發生的結果、期待形成的狀態、決策期限與事件類型。</p>
      <p>本表不提供檔案上傳，請以足以理解情境的文字說明，避免提交不必要的個人或第三人敏感資料。</p>
    </Section>
    <Section title="表單寄送流程">
      <p>本站受理程式以 Resend 作為指定郵件寄送服務；只有郵件服務回覆受理時頁面才顯示送件成功，若部署環境尚未完成寄送設定或郵件服務未受理，系統會回報送件失敗而不把未寄出的內容宣告為成功，且送件不等於正式委任成立。</p>
      <p>目前受理程式未實作自建資料庫寫入；送件成功或失敗的程式日誌只記錄送件編號、受理類型與時間／狀態，不記錄表單全文。表單內容經郵件服務寄送至 STT 指定收件信箱；前往或使用外部郵件服務後，相關資料亦受該服務之條款與隱私規則約束。</p>
      <p>寄送失敗時，填寫內容保留在目前頁面，供檢查與重試；重新整理或離開頁面可能使尚未送出的內容消失。</p>
    </Section>
    <Section title="資料提供與後續處理">
      <p>初次提交只整理問題與下一步，進一步提供案件資料之前，應先確認正式受理範圍、資料需求與使用邊界。</p>
      <p>前往外部平台聯絡或瀏覽出版內容時，該平台依其自身服務條款與隱私規則處理相關資料。</p>
      <Link to="/professional-boundary">專業服務與資訊邊界 →</Link>
    </Section>
  </div>;
}

export function ProfessionalBoundaryPage(){
  usePageMeta("專業服務與資訊邊界｜STT Governance","STT Governance 的治理判讀、制度設計與外部專業協作邊界。");
  return <div className="stt-inst-page">
    <UnifiedTitleHero
      kicker="PROFESSIONAL BOUNDARY"
      title="治理判讀與專業服務邊界"
      lead="STT 網站內容用於說明治理方法、研究觀點與受理流程，不構成對特定個案的即時法律、稅務、投資、醫療或其他依法需由特定專業人員提供之意見；正式案件如需特定專業工作，則由客戶既有團隊或另行確認之適當專業執行。"
      id="boundary-title"
    />
  </div>;
}
