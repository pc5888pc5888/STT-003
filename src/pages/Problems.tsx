import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type Scenario = {
  label: string;
  situation: string;
  focus: string;
  output: string;
};

type ProblemGroup = {
  id: string;
  code: string;
  title: string;
  scenarios: Scenario[];
  deepLinks: { to: string; label: string }[];
};

const groups: ProblemGroup[] = [
  {
    id: "major-decisions",
    code: "01 · MAJOR DECISIONS",
    title: "企業與重大決策",
    scenarios: [
      {
        label: "情境 A",
        situation: "一個重大決定，大家都說可以做，但真正不可承擔的風險仍不清楚。",
        focus: "先確認真正要解決的問題、會推翻結論的證據、不可逆後果與決策權限。",
        output: "Decision Brief、風險紅線、條件式決策、後續治理路徑。",
      },
      {
        label: "情境 B",
        situation: "合作、投資、出售、重組或重大爭議同時牽涉策略、法律、財務與關係。",
        focus: "不是把每個專業意見堆在一起，而是確認這些意見如何共同支持或阻止同一個決定。",
        output: "Stakeholder Map、Evidence Ledger、Option Matrix、Decision Memo。",
      },
    ],
    deepLinks: [
      { to: "/problems/major-decision", label: "重大決策｜完整判讀" },
      { to: "/problems/strategic-legal", label: "策略＋法務｜完整判讀" },
      { to: "/problems/system-failure", label: "制度失效｜完整判讀" },
    ],
  },
  {
    id: "family-succession",
    code: "02 · FAMILY & SUCCESSION",
    title: "家族與接班",
    scenarios: [
      {
        label: "情境 A",
        situation: "第二代已進入企業，但所有權、經營權、董事權與家族角色仍集中或混在一起。",
        focus: "接班不是職稱交接，而是權力與責任是否真的完成移轉。",
        output: "接班治理地圖、權責架構、過渡期安排、家族/企業界面。",
      },
      {
        label: "情境 B",
        situation: "家族成員開始對角色、分配、資訊或未來安排產生不一致。",
        focus: "把利益衝突與治理衝突分開，建立可以討論的制度邊界。",
        output: "Family Governance Map、資訊權與決策權規則、議題清單、治理會議架構。",
      },
      {
        label: "情境 C",
        situation: "創辦人希望留下企業思想、治理記憶與制度脈絡。",
        focus: "不是只做傳記，而是辨識哪些判斷、文化與制度是企業下一代仍需要理解的治理資產。",
        output: "Founder Legacy 訪談、企業史、治理記憶、知識資產與出版素材。",
      },
    ],
    deepLinks: [
      { to: "/problems/succession", label: "接班與權力交接｜完整判讀" },
      { to: "/problems/founder-legacy", label: "Founder Legacy｜完整判讀" },
    ],
  },
  {
    id: "ownership-authority",
    code: "03 · OWNERSHIP & AUTHORITY",
    title: "股權與治理權",
    scenarios: [
      {
        label: "情境 A",
        situation: "股份看起來已經安排，但實際控制權、董事會與經營決策仍不清楚。",
        focus: "所有權、控制權、收益權、資訊權與退出權是否被正確分開。",
        output: "Ownership & Authority Map、董事/股東權責邊界、重大事項清單。",
      },
      {
        label: "情境 B",
        situation: "公司資產、家族資產與個人安排彼此交錯。",
        focus: "辨識不同主體、不同權利與不同風險，避免交易工具先於治理目的。",
        output: "資產治理地圖、權利關係表、需外部法律/稅務/信託專業處理之清單。",
      },
    ],
    deepLinks: [
      { to: "/problems/owner-dependence", label: "企業承接與決策權｜完整判讀" },
      { to: "/problems/family-ownership", label: "家族與所有權｜完整判讀" },
    ],
  },
  {
    id: "ai-decision-governance",
    code: "04 · AI & DECISION GOVERNANCE",
    title: "AI 與決策責任",
    scenarios: [
      {
        label: "情境 A",
        situation: "AI 已進入分析、文件、客服、人資或管理決策，但公司沒有清楚授權。",
        focus: "哪些用途可以使用、哪些資料不能進入、誰可以採信、誰承擔後果。",
        output: "AI Use Boundary、Role & Permission Map、Policy Registry。",
      },
      {
        label: "情境 B",
        situation: "AI 產出的來源、證據與版本無法被追溯。",
        focus: "把 AI 答案視為待證主張，建立來源、版本、採信與人工覆核紀錄。",
        output: "Evidence Ledger、Human Review Gate、Decision Trace。",
      },
    ],
    deepLinks: [
      { to: "/problems/ai-governance", label: "AI Governance｜完整判讀" },
    ],
  },
];

export default function Problems() {
  const location = useLocation();

  useEffect(() => {
    document.title = "你正在面對什麼｜STT Governance";
    const description =
      "從企業重大決策、家族接班、股權治理到 AI 決策責任，先釐清真正問題、權責、證據與不可承擔風險，再決定下一步。";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);



  return (
    <div className="stt-g2-problems">
      <section
        className="stt-g2-hero"
        style={{ backgroundImage: 'url("/visual-bank/stt/user-approved-six/problems.png")' }}
        aria-labelledby="problems-title"
      >
        <div className="stt-g2-shell">
          <div className="stt-g2-hero__copy">
            <p className="stt-g2-kicker">PROBLEM FIRST · GOVERNANCE BEFORE SOLUTION</p>
            <h1 id="problems-title">你正在面對什麼</h1>
            <h2>先釐清你正在面對的是什麼，再決定怎麼處理。</h2>
            <p>
              企業重大決策、家族治理、接班安排、股權與控制、法遵壓力及 AI 使用，表面看似不同，底層往往都指向問題定義、權責配置、證據判讀與風險承擔。
            </p>
          </div>
        </div>
      </section>

      <nav className="stt-g2-index" aria-label="四大治理問題">
        <div className="stt-g2-shell stt-g2-index__grid">
          {groups.map((group) => (
            <a key={group.id} href={"#" + group.id}>
              <span>{group.code}</span>
              <strong>{group.title}</strong>
            </a>
          ))}
        </div>
      </nav>

      <div className="stt-g2-groups">
        {groups.map((group, groupIndex) => (
          <section className="stt-g2-group" id={group.id} key={group.id}>
            <div className="stt-g2-shell">
              <header className="stt-g2-group__head">
                <p className="stt-g2-kicker">{group.code}</p>
                <h2>{group.title}</h2>
              </header>

              <div className="stt-g2-scenarios">
                {group.scenarios.map((scenario, index) => (
                  <article className="stt-g2-scenario" key={scenario.label + scenario.situation}>
                    <div className="stt-g2-scenario__number">
                      {String(groupIndex + 1).padStart(2, "0")}.{String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="stt-g2-scenario__main">
                      <span>{scenario.label}</span>
                      <h3>{scenario.situation}</h3>
                    </div>
                    <dl className="stt-g2-scenario__analysis">
                      <div>
                        <dt>判讀焦點</dt>
                        <dd>{scenario.focus}</dd>
                      </div>
                      <div>
                        <dt>可能形成</dt>
                        <dd>{scenario.output}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              <div className="stt-g2-deep-links" aria-label={group.title + "完整判讀"}>
                <span>EXISTING DEEP JUDGMENT</span>
                <div>
                  {group.deepLinks.map((item) => (
                    <Link key={item.to} to={item.to}>{item.label} →</Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="stt-g2-final">
        <div className="stt-g2-shell">
          <p className="stt-g2-kicker">GOVERNANCE ENGAGEMENT</p>
          <h2>現在發生了什麼，而你最不希望接下來發生什麼？</h2>
          <p>
            如果事件已經跨越單一專業、單一部門或單一家庭成員可以獨立處理的範圍，可以先從治理入口整理問題。
          </p>
          <Link className="stt-g2-cta" to="/start">開始治理判讀 →</Link>
        </div>
      </section>
    </div>
  );
}
