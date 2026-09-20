import { useEffect } from "react";
import { Link } from "react-router-dom";

const situations = [
  {
    code: "01 · FAMILY / SUCCESSION",
    title: "企業正在交棒，但權力並沒有真正完成交接。",
    to: "/problems#family-succession",
  },
  {
    code: "02 · OWNERSHIP / AUTHORITY",
    title: "股權、家族、董事會與經營權開始互相牽動。",
    to: "/problems#ownership-authority",
  },
  {
    code: "03 · MAJOR DECISION",
    title: "一項重大合作、投資、處分或爭議正在逼近不可逆點。",
    to: "/problems#major-decisions",
  },
  {
    code: "04 · AI / DECISION GOVERNANCE",
    title: "AI 已經進入決策流程，但授權、責任與證據邊界仍不清楚。",
    to: "/problems#ai-decision-governance",
  },
] as const;

const judgmentSteps = [
  ["01", "事件", "Event"],
  ["02", "問題", "Problem"],
  ["03", "證據", "Evidence"],
  ["04", "權責", "Authority"],
  ["05", "紅線", "Hard Stop"],
  ["06", "選項", "Options"],
  ["07", "判讀", "Judgment"],
] as const;

const outputs = [
  {
    code: "GOVERNANCE DOSSIER",
    title: "治理判讀卷宗",
    body: "將事件、關係人、風險、證據與待決事項形成可繼續工作的治理基礎。",
  },
  {
    code: "DECISION MEMO",
    title: "重大決策判讀書",
    body: "留下判斷依據、選項、紅線、代價與決策理由。",
  },
  {
    code: "GOVERNANCE ARCHITECTURE",
    title: "治理架構",
    body: "把權力、責任、流程、制度與必要專業工具組成可執行結構。",
  },
  {
    code: "EVIDENCE & POLICY RECORD",
    title: "證據與制度紀錄",
    body: "讓重要決策不只存在於口頭、記憶或個人判斷。",
  },
] as const;

const engagements = [
  {
    code: "01 · REVIEW",
    title: "治理初步判讀",
    body: "先把重大事件定義清楚並建立下一步。",
    output: "Governance Dossier / Decision Brief",
  },
  {
    code: "02 · ARCHITECTURE",
    title: "治理架構設計",
    body: "當問題跨越多個角色、工具與專業領域，建立可執行的制度結構。",
    output: "Authority Map / Decision Rules",
  },
  {
    code: "03 · MANDATE",
    title: "年度治理委任",
    body: "對企業、家族或重大決策者建立持續性的治理門控與重大事件判讀機制。",
    output: "Governance Protocol / Decision Record",
  },
] as const;

const researchThemes = [
  ["FAMILY & SUCCESSION", "家族與接班"],
  ["CORPORATE GOVERNANCE", "公司治理"],
  ["AI & DECISION GOVERNANCE", "AI 與決策治理"],
  ["GOVERNANCE CIVILIZATION", "治理文明"],
] as const;

export default function HomeCanonical() {
  useEffect(() => {
    document.title = "STT Governance｜重大決策・企業治理・家族治理";
    const description =
      "STT Governance 協助企業、家族與重大決策者，在結果尚未不可逆之前，釐清問題、證據、權力、責任與選項，建立可承擔、可追溯的治理結構。";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <div className="stt-g1-home">
      <section
        className="stt-g1-hero"
        style={{ backgroundImage: 'url("/visual-bank/stt/user-approved-six/home.png")' }}
        aria-labelledby="home-hero-title"
      >
        <div className="stt-g1-shell">
          <div className="stt-g1-hero__copy">
            <p className="stt-g1-kicker">STT GOVERNANCE · STRATEGY · GOVERNANCE · JUDGMENT</p>
            <h1 id="home-hero-title">讓重要的事，走得更遠。</h1>
            <p className="stt-g1-lead">
              STT Governance 協助企業、家族與重大決策者，在結果尚未不可逆之前，先釐清問題、證據、權力、責任與選項，再決定是否行動，以及如何留下可以承擔、可以追溯的治理結構。
            </p>
            <div className="stt-g1-actions">
              <Link className="stt-g1-button is-primary" to="/problems">從正在發生的問題開始 →</Link>
              <Link className="stt-g1-button" to="/how-stt-works">理解 STT 如何判讀</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stt-g1-section">
        <div className="stt-g1-shell">
          <div className="stt-g1-split">
            <div>
              <p className="stt-g1-kicker">START FROM THE REAL PROBLEM</p>
              <h2>有些事情，不應直接進入解決方案。</h2>
            </div>
            <p className="stt-g1-lead is-secondary">
              一項決策看起來可能只是股權、接班、AI、法遵、投資或家族衝突；真正需要先確認的，往往是誰有權決定、什麼證據可以採信、誰承擔後果，以及一旦執行之後是否仍然能夠回復。
            </p>
          </div>

          <div className="stt-g1-thresholds" aria-label="四種常見的治理臨界點">
            <div className="stt-g1-thresholds__head">
              <span>GOVERNANCE THRESHOLDS</span>
              <strong>四種常見的治理臨界點。</strong>
            </div>
            {situations.map((item) => (
              <Link key={item.code} to={item.to} className="stt-g1-threshold">
                <span>{item.code}</span>
                <h3>{item.title}</h3>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-g1-section stt-g1-band">
        <div className="stt-g1-shell">
          <p className="stt-g1-kicker">JUDGMENT BEFORE EXECUTION</p>
          <h2>STT 不急著回答，而是先完成判讀。</h2>
          <p className="stt-g1-lead is-narrow">
            每一步的目的都不是增加文件，而是降低錯誤問題、錯誤證據與不可承擔後果進入執行的機率。
          </p>

          <div className="stt-g1-spine" aria-label="事件到判讀的治理路徑">
            {judgmentSteps.map(([number, zh, en]) => (
              <div className="stt-g1-spine__step" key={number}>
                <span className="stt-g1-spine__number">{number}</span>
                <strong>{zh}</strong>
                <small>{en}</small>
              </div>
            ))}
          </div>
          <div className="stt-g1-actions">
            <Link className="stt-g1-button" to="/how-stt-works">查看完整判讀方法 →</Link>
          </div>
        </div>
      </section>

      <section className="stt-g1-section">
        <div className="stt-g1-shell">
          <p className="stt-g1-kicker">GOVERNANCE OUTPUT</p>
          <h2>你最後得到的，不只是一個答案。</h2>

          <div className="stt-g1-output-grid">
            {outputs.map((item, index) => (
              <article className="stt-g1-output" key={item.code}>
                <div className="stt-g1-output__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{item.code}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="stt-g1-actions">
            <Link className="stt-g1-button" to="/engagement">理解治理介入 →</Link>
          </div>
        </div>
      </section>

      <section className="stt-g1-section stt-g1-engagement">
        <div className="stt-g1-shell">
          <p className="stt-g1-kicker">GOVERNANCE ENGAGEMENT</p>
          <h2>不同的問題，需要不同深度的治理介入。</h2>

          <div className="stt-g1-depth-flow">
            {engagements.map((item) => (
              <article className="stt-g1-depth" key={item.code}>
                <span>{item.code}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <small>{item.output}</small>
              </article>
            ))}
          </div>

          <p className="stt-g1-note">
            正式介入範圍依事件複雜度、資料狀態、決策層級與所需專業協作確認，不採標準套裝方案。
          </p>
          <div className="stt-g1-actions">
            <Link className="stt-g1-button is-primary" to="/engagement">理解正式治理介入 →</Link>
          </div>
        </div>
      </section>

      <section className="stt-g1-section stt-g1-band">
        <div className="stt-g1-shell stt-g1-authority">
          <div className="stt-g1-authority__copy">
            <p className="stt-g1-kicker">JUDGMENT AUTHORITY</p>
            <h2>重大治理判讀，最終仍須由人承擔。</h2>
            <p className="stt-g1-lead is-secondary">
              莊鈞翔博士為 STT Governance 創辦人與治理總控者，長期研究與實務聚焦於企業策略、公司治理與法遵、家族企業接班以及 AI 治理。STT 以 AI 作為研究、整理、比對與治理作業系統，但不將最終判斷權交由 AI。
            </p>
            <div className="stt-g1-actions">
              <Link className="stt-g1-button" to="/eric-chuang">認識治理判讀者 →</Link>
            </div>
          </div>
          <figure className="stt-g1-authority__portrait">
            <img src="/images/eric-home-authority-20260921.jpg" alt="莊鈞翔博士正式坐姿肖像" />
            <figcaption>FOUNDER · GOVERNANCE PRINCIPAL · FINAL JUDGMENT</figcaption>
          </figure>
        </div>
      </section>

      <section className="stt-g1-section">
        <div className="stt-g1-shell">
          <div className="stt-g1-split">
            <div>
              <p className="stt-g1-kicker">RESEARCH & PUBLICATION</p>
              <h2>判讀不是臨時形成的意見，而是長期累積的制度研究。</h2>
            </div>
            <p className="stt-g1-lead is-secondary">
              研究與出版內容依四個主題呈現：家族與接班、公司治理、AI 與決策治理、治理文明。來源可包含 STT Intelligence、STT Press，以及莊鈞翔博士於第三方媒體正式發表之文章。
            </p>
          </div>

          <div className="stt-g1-research-grid">
            {researchThemes.map(([en, zh], index) => (
              <article key={en} className="stt-g1-research-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{en}</small>
                <h3>{zh}</h3>
              </article>
            ))}
          </div>

          <div className="stt-g1-evidence-strip">
            <img
              src="/images/內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》 數位閱讀完整版.png"
              alt="內在法遵 Internal Compliance 出版封面"
            />
            <div>
              <span>RESEARCH EVIDENCE</span>
              <strong>研究、論文、出版與第三方公開發表，分層呈現，不混成權威宣稱。</strong>
              <p>四份學術資料統一歸在「研究與論文」；出版則依正式出版狀態呈現。</p>
            </div>
          </div>

          <div className="stt-g1-actions">
            <Link className="stt-g1-button" to="/insights">進入研究與出版 →</Link>
          </div>
        </div>
      </section>

      <section className="stt-g1-final">
        <div className="stt-g1-shell">
          <p className="stt-g1-kicker">GOVERNANCE ENGAGEMENT</p>
          <h2>如果一件事情的錯誤成本已經不能只靠直覺承擔，就應先完成判讀。</h2>
          <p className="stt-g1-lead is-narrow">
            先告訴 STT 現在發生了什麼、你最不希望接下來發生什麼，以及希望事情最後變成什麼。
          </p>
          <div className="stt-g1-actions">
            <Link className="stt-g1-button is-primary" to="/start">開始治理判讀 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
