import { Link, useLocation } from "react-router-dom";
import GovernedHero from "../components/GovernedHero";

type Locale = "en" | "ja" | "ko";

const PROBLEM_COPY = {
  en: {
    kicker: "PROBLEM FIRST · GOVERNANCE BEFORE SOLUTION",
    title: "What You’re Facing",
    lead: "Major corporate decisions, family governance, succession, ownership and control, compliance pressure, and AI use may look different on the surface. Underneath, they often converge on problem definition, authority, evidence, accountability, and irreversible risk.",
    groups: [
      ["01 · MAJOR DECISIONS", "Enterprise & Major Decisions", "Clarify the real decision, evidence, authority, red lines, and consequences before action becomes difficult to reverse."],
      ["02 · FAMILY & SUCCESSION", "Family & Succession", "Separate ownership, management, board authority, family roles, and transition responsibilities so succession becomes governable."],
      ["03 · OWNERSHIP & AUTHORITY", "Ownership & Governance Rights", "Distinguish ownership, control, economic rights, information rights, and exit rights before tools or transactions dictate the governance objective."],
      ["04 · AI & DECISION GOVERNANCE", "AI & Decision Accountability", "Define permitted use, data boundaries, evidence traceability, human review, and final responsibility when AI enters a decision process."],
    ],
    action: "Start a Governance Review",
    method: "See How STT Works",
  },
  ja: {
    kicker: "PROBLEM FIRST · GOVERNANCE BEFORE SOLUTION",
    title: "いま直面している課題",
    lead: "重大な企業意思決定、ファミリーガバナンス、事業承継、所有と支配、コンプライアンス圧力、AI利用は表面上異なって見えても、根底では問題定義、権限、証拠、責任、不可逆リスクに収れんします。",
    groups: [
      ["01 · MAJOR DECISIONS", "企業・重大意思決定", "実行が不可逆になる前に、本当に決めるべきこと、証拠、権限、レッドライン、結果責任を整理します。"],
      ["02 · FAMILY & SUCCESSION", "ファミリー・事業承継", "所有、経営、取締役会権限、家族の役割、移行責任を分け、承継を統治可能な構造にします。"],
      ["03 · OWNERSHIP & AUTHORITY", "所有・ガバナンス権限", "所有権、支配権、経済的権利、情報権、退出権を分け、取引手段がガバナンス目的を先取りしないようにします。"],
      ["04 · AI & DECISION GOVERNANCE", "AI・意思決定責任", "AIが意思決定に入る際の利用範囲、データ境界、証拠追跡、人間のレビュー、最終責任を明確にします。"],
    ],
    action: "ガバナンス判断を始める",
    method: "STTの判断方法を見る",
  },
  ko: {
    kicker: "PROBLEM FIRST · GOVERNANCE BEFORE SOLUTION",
    title: "현재 직면한 문제",
    lead: "중대한 기업 의사결정, 가족 거버넌스, 승계, 소유와 통제, 컴플라이언스 압력, AI 활용은 겉으로 달라 보여도 실제로는 문제 정의, 권한, 증거, 책임, 비가역 위험으로 수렴합니다.",
    groups: [
      ["01 · MAJOR DECISIONS", "기업과 중대한 의사결정", "실행이 되돌리기 어려워지기 전에 실제 결정 사안, 증거, 권한, 레드라인, 결과 책임을 정리합니다."],
      ["02 · FAMILY & SUCCESSION", "가족과 승계", "소유권, 경영권, 이사회 권한, 가족 역할, 전환 책임을 분리해 승계를 통치 가능한 구조로 만듭니다."],
      ["03 · OWNERSHIP & AUTHORITY", "소유와 거버넌스 권한", "소유권, 통제권, 경제적 권리, 정보권, 이탈권을 구분해 거래 수단이 거버넌스 목적을 앞서지 않도록 합니다."],
      ["04 · AI & DECISION GOVERNANCE", "AI와 의사결정 책임", "AI가 의사결정에 들어올 때 허용 범위, 데이터 경계, 증거 추적, 인간 검토, 최종 책임을 명확히 합니다."],
    ],
    action: "거버넌스 판단 시작",
    method: "STT의 판단 방식 보기",
  },
} as const;

const INSIGHT_COPY = {
  en: {
    kicker: "RESEARCH · PUBLICATIONS · GOVERNANCE INTELLIGENCE",
    title: "Research & Publications",
    lead: "STT turns governance judgment into cumulative institutional capital through research papers, publications, columns, and long-form governance knowledge.",
    items: [
      ["Research Papers", "Academic work on family-business succession, corporate governance and compliance, legal-service sustainability, leadership, and generational transition.", "/research"],
      ["Governance Publications", "Books and structured publications that convert governance methods into durable reference systems.", "/books"],
      ["Columns & Published Works", "Legal, humanistic, and governance commentary that records how judgment is applied to real institutional questions.", "/columns"],
    ],
    action: "Start a Governance Review",
  },
  ja: {
    kicker: "RESEARCH · PUBLICATIONS · GOVERNANCE INTELLIGENCE",
    title: "研究・出版",
    lead: "STTは研究論文、出版、コラム、長文のガバナンス知識を通じて、判断方法を蓄積可能な制度資産へ変換します。",
    items: [
      ["研究論文", "ファミリービジネス承継、コーポレートガバナンス・コンプライアンス、法律サービスの持続可能性、リーダーシップ、世代交代に関する研究。", "/research"],
      ["ガバナンス出版", "ガバナンス方法論を継続利用できる参照体系へ変換する書籍・体系的出版物。", "/books"],
      ["コラム・公開著作", "現実の制度課題に判断をどう適用するかを記録する法律、人文、ガバナンスの論考。", "/columns"],
    ],
    action: "ガバナンス判断を始める",
  },
  ko: {
    kicker: "RESEARCH · PUBLICATIONS · GOVERNANCE INTELLIGENCE",
    title: "연구·출판",
    lead: "STT는 연구 논문, 출판물, 칼럼, 장문 거버넌스 지식을 통해 판단 방법을 축적 가능한 제도 자산으로 전환합니다.",
    items: [
      ["연구 논문", "가족기업 승계, 기업 거버넌스와 컴플라이언스, 법률서비스 지속가능성, 리더십, 세대 전환에 관한 연구.", "/research"],
      ["거버넌스 출판", "거버넌스 방법론을 지속적으로 활용할 수 있는 참조 체계로 전환하는 도서와 구조화된 출판물.", "/books"],
      ["칼럼·발표 저작", "실제 제도 문제에 판단을 어떻게 적용하는지 기록하는 법률·인문·거버넌스 논고.", "/columns"],
    ],
    action: "거버넌스 판단 시작",
  },
} as const;

function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith("/ja")) return "ja";
  if (pathname.startsWith("/ko")) return "ko";
  return "en";
}

export function LocalizedProblems() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const copy = PROBLEM_COPY[locale];
  const base = `/${locale}`;

  return (
    <div className="stt-g2-problems">
      <GovernedHero kicker={copy.kicker} title={copy.title} lead={copy.lead} />
      <div className="stt-g2-groups">
        {copy.groups.map(([code, title, description], index) => (
          <section className="stt-g2-group" id={`problem-${index + 1}`} key={code}>
            <div className="stt-g2-shell">
              <header className="stt-g2-group__head">
                <p className="stt-g2-kicker">{code}</p>
                <h2>{title}</h2>
              </header>
              <div className="stt-g2-scenarios">
                <article className="stt-g2-scenario">
                  <div className="stt-g2-scenario__number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="stt-g2-scenario__main"><h3>{description}</h3></div>
                </article>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="stt-g2-final">
        <div className="stt-g2-shell">
          <Link className="stt-g2-cta" to={`${base}/start`}>{copy.action} →</Link>
          <Link className="stt-g2-cta" to={`${base}/how-stt-works`}>{copy.method} →</Link>
        </div>
      </section>
    </div>
  );
}

export function LocalizedInsights() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const copy = INSIGHT_COPY[locale];
  const base = `/${locale}`;

  return (
    <div className="stt-inst-page">
      <GovernedHero kicker={copy.kicker} title={copy.title} lead={copy.lead} />
      <section className="stt-inst-section">
        <div className="stt-inst-shell">
          <div className="stt-inst-grid">
            {copy.items.map(([title, description, href]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{description}</p>
                <Link to={href}>{title} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="stt-inst-section">
        <div className="stt-inst-shell">
          <Link className="cis-primary" to={`${base}/start`}>{copy.action}</Link>
        </div>
      </section>
    </div>
  );
}
