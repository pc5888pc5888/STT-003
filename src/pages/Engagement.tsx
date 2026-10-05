import { useEffect } from "react";
import { Link } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";

const engagements = [
  {
    id: "governance-review",
    code: "GOVERNANCE REVIEW",
    title: "治理初步判讀",
    fit: "一項重大事件尚未被完整定義，或多方意見彼此衝突。",
    role: "整理事件、關係人、權責、證據缺口、不可逆紅線與後續路徑。",
    outputs: "Governance Dossier / Decision Brief / 下一步資料清單。",
    excludes: "代替律師出具法律意見、代替會計師/稅務/投資專業執行其法定專業工作，或未另行約定之長期陪同。",
    cta: "開始治理判讀",
    to: "/start",
  },
  {
    id: "governance-architecture",
    code: "GOVERNANCE ARCHITECTURE",
    title: "治理架構設計",
    fit: "問題同時牽涉家族、股權、公司治理、契約、專業工具或跨部門權責。",
    role: "把單一專業工具放回整體治理目的中，建立制度、權限、流程與專業協作架構。",
    outputs: "Governance Architecture、Role & Authority Map、Decision Rules、必要外部專業工作包。",
    excludes: "未經委任之法律文件簽證、稅務申報、財務查核、投資執行或其他依法需由特定專業負責之工作。",
    cta: "開始治理判讀",
    to: "/start",
  },
  {
    id: "governance-mandate",
    code: "GOVERNANCE MANDATE",
    title: "年度治理委任",
    fit: "企業或家族持續面對重大決策、接班、治理轉換或多事件交錯，需要在行動之前有固定門控機制。",
    role: "建立重大事項進入條件、定期治理盤點、重要決策判讀、政策/證據紀錄與必要專業協作。",
    outputs: "年度 Governance Protocol、Decision Memo、Evidence/Policy Record、治理追蹤。",
    excludes: "無限時數即時諮詢、全天候私人客服，或所有專業工作的代辦。",
    cta: "提交治理情境",
    to: "/start",
  },
] as const;

export default function Engagement() {
  useEffect(() => {
    document.title = "治理委任｜STT Governance";
    const description =
      "了解 STT Governance 如何以治理初步判讀、治理架構設計與年度治理委任三種深度介入重大決策、企業與家族治理。";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <div className="stt-g4-engagement">
      <UnifiedTitleHero
        kicker="GOVERNANCE ENGAGEMENT"
        title="當一件事情值得被正式治理，就不應只停留在一次諮詢。"
        lead="STT 依事件複雜度、決策層級與持續時間，以治理判讀、治理架構與年度治理委任三種方式介入；不是所有事件都需要長期委任，介入深度應與錯誤成本相稱。"
        id="engagement-title"
      />

      <nav className="stt-g4-index" aria-label="治理委任三種深度">
        <div className="stt-g4-shell stt-g4-index__grid">
          {engagements.map((item, index) => (
            <a key={item.id} href={"#" + item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <small>{item.code}</small>
            </a>
          ))}
        </div>
      </nav>

      <div className="stt-g4-engagements">
        {engagements.map((item, index) => (
          <section className="stt-g4-engagement-row" id={item.id} key={item.id}>
            <div className="stt-g4-shell stt-g4-engagement-row__grid">
              <div className="stt-g4-engagement-row__head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item.code}</p>
                <h2>{item.title}</h2>
              </div>

              <dl className="stt-g4-engagement-row__body">
                <div>
                  <dt>適用</dt>
                  <dd>{item.fit}</dd>
                </div>
                <div>
                  <dt>STT 介入</dt>
                  <dd>{item.role}</dd>
                </div>
                <div>
                  <dt>主要成果</dt>
                  <dd>{item.outputs}</dd>
                </div>
                <div>
                  <dt>不包含</dt>
                  <dd>{item.excludes}</dd>
                </div>
                <div className="stt-g4-engagement-row__action">
                  <dt>下一步</dt>
                  <dd><Link to={item.to}>{item.cta} →</Link></dd>
                </div>
              </dl>
            </div>
          </section>
        ))}
      </div>

      <section className="stt-g4-boundary">
        <div className="stt-g4-shell stt-g4-boundary__grid">
          <div>
            <p className="stt-g4-kicker">PROFESSIONAL BOUNDARY</p>
            <h2>治理整合不等於取代專業。</h2>
          </div>
          <div>
            <p>
              STT 的位置是問題架構、治理判讀、制度設計與跨專業協調；需要法律、會計、稅務、信託、投資、資安、醫療或其他依法由特定專業提供之服務時，由客戶既有專業團隊或另行確認之適當專業執行。
            </p>
            <Link to="/professional-boundary">查看專業服務邊界 →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
