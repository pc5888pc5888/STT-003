import GovernedHero from "../components/GovernedHero";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const foundations = [
  ["01", "Problem", "真正問題"],
  ["02", "Evidence", "可採信證據"],
  ["03", "Trade-off", "取捨與代價"],
  ["04", "Authority & Accountability", "誰有權、誰承擔"],
] as const;

const steps = [
  {
    id: "event-definition",
    number: "01",
    en: "EVENT DEFINITION",
    title: "事件界定",
    input: "當事人陳述、事件時間線、已知限制。",
    question: "到底發生了什麼？哪些只是描述、立場或症狀？",
    output: "Event Frame、問題陳述、待確認事項。",
  },
  {
    id: "stakeholder-authority",
    number: "02",
    en: "STAKEHOLDER & AUTHORITY",
    title: "關係人與權力",
    input: "人、組織、股權、職務、契約或實際控制關係。",
    question: "誰有決定權、否決權、資訊權？誰承擔後果？",
    output: "Stakeholder & Authority Map。",
  },
  {
    id: "evidence",
    number: "03",
    en: "EVIDENCE",
    title: "證據",
    input: "文件、紀錄、法規、契約、財務或其他可驗證資訊。",
    question: "哪些是事實、哪些是假設、哪些資訊足以推翻現有結論？",
    output: "Evidence Ledger、缺口清單、待證主張。",
  },
  {
    id: "hard-stop",
    number: "04",
    en: "HARD STOP",
    title: "不可承擔紅線",
    input: "法律、信任、財務、聲譽、治理與不可逆風險。",
    question: "哪些結果一旦發生就不能接受，或難以回復？",
    output: "Hard Stop、風險門檻、禁止條件。",
  },
  {
    id: "options",
    number: "05",
    en: "OPTIONS",
    title: "選項",
    input: "可行方案、條件與限制。",
    question: "不是哪個選項最吸引人，而是哪一些選項應先被排除，以及剩下選項各自代價。",
    output: "Option Matrix、條件式路徑。",
  },
  {
    id: "judgment",
    number: "06",
    en: "JUDGMENT",
    title: "治理判讀",
    input: "前述事實、權責、證據、紅線與選項。",
    question: "此刻可以做什麼、不能做什麼、在什麼條件下才可以做。",
    output: "Decision Memo / GO、CONDITIONAL GO、HOLD、NO-GO 類型判讀（依個案需要使用）。",
  },
  {
    id: "governance",
    number: "07",
    en: "GOVERNANCE",
    title: "治理落地",
    input: "已確認的判斷、責任與後續措施。",
    question: "如何把判斷變成可持續的權限、流程、文件與追蹤機制。",
    output: "Governance Architecture、Policy Registry、責任/追蹤清單。",
  },
] as const;

export default function Method() {
  useEffect(() => {
    document.title = "STT 如何判讀｜治理判讀方法";
    const description =
      "STT 以事件界定、權力與關係人、證據、不可承擔紅線、選項、治理判讀與制度落地七階段，建立重大決策可承擔、可追溯的判斷基礎。";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <div className="stt-g3-method">
      <GovernedHero kicker="GOVERNANCE JUDGMENT" title="如何判讀" lead="STT 的判讀，不是快速給答案，而是先回到事件結構：問題是否被正確定義、證據是否足夠、權力是否越界、責任如何承擔、風險是否可逆，然後才決定是否進入下一步。"></GovernedHero>

      <nav className="stt-g3-index" aria-label="七階段判讀路徑">
        <div className="stt-g3-shell stt-g3-index__grid">
          {steps.map((step) => (
            <a key={step.id} href={"#" + step.id}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
            </a>
          ))}
        </div>
      </nav>

      <section className="stt-g3-section stt-g3-foundations">
        <div className="stt-g3-shell">
          <p className="stt-g3-kicker">JUDGMENT FOUNDATIONS</p>
          <h2>四個面向，讓重要判斷站得住。</h2>
          <p className="stt-g3-foundations__intro">
            Problem｜真正問題；Evidence｜可採信證據；Trade-off｜取捨與代價；Authority & Accountability｜誰有權、誰承擔，這四項不是四種服務，也不是另一套流程，而是每個治理判讀都必須同時檢查的基礎。
          </p>
          <div className="stt-g3-foundation-grid">
            {foundations.map(([number, en, zh]) => (
              <article key={en}>
                <span>{number}</span>
                <small>{en}</small>
                <h3>{zh}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-g3-section stt-g3-process">
        <div className="stt-g3-shell">
          <p className="stt-g3-kicker">SEVEN-STAGE JUDGMENT PROCESS</p>
          <h2>判讀不是一個答案，而是一條可被追溯的治理程序。</h2>

          <div className="stt-g3-steps">
            {steps.map((step) => (
              <article className="stt-g3-step" id={step.id} key={step.id}>
                <div className="stt-g3-step__number">{step.number}</div>
                <header>
                  <small>{step.en}</small>
                  <h3>{step.title}</h3>
                </header>
                <dl>
                  <div>
                    <dt>輸入</dt>
                    <dd>{step.input}</dd>
                  </div>
                  <div>
                    <dt>核心問題</dt>
                    <dd>{step.question}</dd>
                  </div>
                  <div>
                    <dt>輸出</dt>
                    <dd>{step.output}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-g3-section stt-g3-ai-boundary">
        <div className="stt-g3-shell stt-g3-ai-boundary__grid">
          <div>
            <p className="stt-g3-kicker">AI GOVERNANCE BOUNDARY</p>
            <h2>AI 是治理幕僚與作業系統，不是治理主體。</h2>
          </div>
          <div>
            <p>
              AI 可以協助整理、比對、追蹤、發現矛盾並形成工作底稿；是否採信、是否授權、是否進入執行，仍由人類決策者與 STT 的治理判讀程序完成，正式案件則依資料敏感度建立使用邊界，不預設所有資料都可以進入 AI。
            </p>
            <Link to="/engagement">理解治理介入 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
