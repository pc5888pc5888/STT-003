import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export type PortalSection = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  note?: string;
};

export type PortalMetric = {
  label: string;
  value: string;
  description: string;
};

export type GovernancePortalPageProps = {
  eyebrow: string;
  title: string;
  titleEn: string;
  lead: string;
  statement: string;
  variant: "governance" | "compliance" | "digital";
  activeSection: string;
  sections: PortalSection[];
  metrics?: PortalMetric[];
  primaryLabel: string;
  secondaryLabel?: string;
  primaryIcon?: LucideIcon;
  onPrimary: () => void;
  onSecondary?: () => void;
  onSectionChange: (id: string) => void;
};

type RegisterRow = {
  label: string;
  value: string;
};

const portalIdentity: Record<GovernancePortalPageProps["variant"], {
  number: string;
  word: string;
  caption: string;
  registerTitle: string;
  registerRows: RegisterRow[];
  closing: string;
}> = {
  governance: {
    number: "01",
    word: "GOVERNANCE",
    caption: "Decision Order · Institutional Responsibility",
    registerTitle: "Decision Charter",
    registerRows: [
      { label: "Decision Rights", value: "權責邊界" },
      { label: "Reserved Matters", value: "重大事項" },
      { label: "Evidence Gate", value: "證據門檻" },
      { label: "Accountability", value: "責任軌跡" },
    ],
    closing: "Strategy becomes governable only when authority and responsibility can be traced.",
  },
  compliance: {
    number: "02",
    word: "INTERNAL COMPLIANCE",
    caption: "Contract Discipline · Internal Control",
    registerTitle: "Compliance Ledger",
    registerRows: [
      { label: "Contract Gate", value: "契約治理" },
      { label: "Authorization", value: "授權矩陣" },
      { label: "Audit Trail", value: "稽核軌跡" },
      { label: "Escalation", value: "例外升級" },
    ],
    closing: "Compliance is credible when the organization can prove how a decision was made.",
  },
  digital: {
    number: "03",
    word: "DIGITAL GOVERNANCE",
    caption: "Model Boundary · Human Authority",
    registerTitle: "AI Control Register",
    registerRows: [
      { label: "Model Gate", value: "模型邊界" },
      { label: "Data Gate", value: "資料權限" },
      { label: "Tool Gate", value: "工具控制" },
      { label: "Human Gate", value: "人工主權" },
    ],
    closing: "AI may accelerate operations. It does not inherit governance authority.",
  },
};

export function GovernancePortalPage({
  eyebrow,
  title,
  titleEn,
  lead,
  statement,
  variant,
  activeSection,
  sections,
  metrics = [],
  primaryLabel,
  secondaryLabel,
  primaryIcon: PrimaryIcon = ArrowRight,
  onPrimary,
  onSecondary,
  onSectionChange,
}: GovernancePortalPageProps) {
  const active = sections.find((section) => section.id === activeSection) ?? sections[0];
  const identity = portalIdentity[variant];

  return (
    <div className={`stt-portal stt-portal--${variant}`}>
      <style>{`
        .stt-portal {
          min-height: calc(100svh - var(--stt-header-height));
          background: #fbfbfa;
          color: #1a1a1a;
        }
        .stt-portal * { box-sizing: border-box; }
        .stt-portal-hero {
          border-bottom: 1px solid rgba(197,168,128,.22);
          background: #fbfbfa;
        }
        .stt-portal-shell {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.34fr) minmax(340px, .66fr);
          gap: 90px;
          align-items: stretch;
          padding: 96px 0 86px;
        }
        .stt-portal-copy {
          align-self: center;
          max-width: 820px;
          padding-right: 24px;
        }
        .stt-portal-eyebrow {
          margin: 0 0 26px;
          color: #a9895e;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .stt-portal-title {
          margin: 0;
          max-width: 800px;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(46px, 5.25vw, 80px);
          font-weight: 400;
          line-height: 1.22;
          letter-spacing: .025em;
        }
        .stt-portal-title-en {
          margin: 20px 0 0;
          color: #a9895e;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .stt-portal-lead {
          margin: 38px 0 0;
          max-width: 720px;
          color: #625c54;
          font-size: 15px;
          line-height: 2.05;
          letter-spacing: .02em;
        }
        .stt-portal-statement {
          margin: 34px 0 0;
          max-width: 740px;
          padding-left: 24px;
          border-left: 1px solid #c5a880;
          color: #28241f;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(20px, 1.95vw, 28px);
          font-weight: 400;
          line-height: 1.78;
        }
        .stt-portal-actions {
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .stt-portal-button {
          min-height: 50px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid #c5a880;
          background: transparent;
          color: #1a1a1a;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .05em;
          cursor: pointer;
          transition: background .18s ease, color .18s ease, border-color .18s ease, transform .18s ease;
        }
        .stt-portal-button:hover {
          border-color: #a9895e;
          background: #a9895e;
          color: #ffffff;
        }
        .stt-portal-button:active { transform: scale(.985); }
        .stt-portal-button--secondary {
          border-color: rgba(197,168,128,.34);
          color: #6e675e;
        }
        .stt-portal-register {
          align-self: stretch;
          min-height: 540px;
          padding: 34px 34px 30px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(197,168,128,.24);
          background: #f7f3ec;
        }
        .stt-portal--compliance .stt-portal-register { background: #f8f6f1; }
        .stt-portal--digital .stt-portal-register { background: #f4f2ed; }
        .stt-portal-register-kicker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(197,168,128,.26);
          color: #80766b;
          font-size: 8px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .stt-portal-register-number {
          margin-top: 34px;
          color: #b18a58;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(62px, 6vw, 92px);
          font-weight: 400;
          line-height: .95;
          letter-spacing: -.04em;
        }
        .stt-portal-register-word {
          margin-top: 18px;
          color: #26221e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .stt-portal-register-caption {
          margin-top: 10px;
          color: #857c72;
          font-size: 9px;
          line-height: 1.75;
          letter-spacing: .08em;
        }
        .stt-portal-register-list {
          margin-top: 34px;
          border-top: 1px solid rgba(197,168,128,.22);
        }
        .stt-portal-register-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 18px;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid rgba(197,168,128,.18);
        }
        .stt-portal-register-row span:first-child {
          color: #6f685f;
          font-size: 10px;
          letter-spacing: .06em;
        }
        .stt-portal-register-row span:last-child {
          color: #2d2925;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 12px;
          letter-spacing: .04em;
        }
        .stt-portal-register-closing {
          margin-top: auto;
          padding-top: 22px;
          color: #8c8176;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 10px;
          font-style: italic;
          line-height: 1.75;
        }
        .stt-portal-tabs-wrap {
          border-bottom: 1px solid rgba(197,168,128,.20);
          background: rgba(255,255,255,.72);
        }
        .stt-portal-tabs {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .stt-portal-tab {
          position: relative;
          min-height: 88px;
          padding: 18px 22px 17px 0;
          border: 0;
          border-right: 1px solid rgba(197,168,128,.16);
          background: transparent;
          color: #6e675e;
          text-align: left;
          cursor: pointer;
          transition: color .18s ease, background .18s ease;
        }
        .stt-portal-tab:not(:first-child) { padding-left: 22px; }
        .stt-portal-tab:last-child { border-right: 0; }
        .stt-portal-tab::after {
          content: "";
          position: absolute;
          left: 0;
          right: 22px;
          bottom: -1px;
          height: 1px;
          background: transparent;
        }
        .stt-portal-tab:not(:first-child)::after { left: 22px; }
        .stt-portal-tab[data-active="true"] {
          background: rgba(197,168,128,.045);
          color: #1a1a1a;
        }
        .stt-portal-tab[data-active="true"]::after { background: #b18a58; }
        .stt-portal-tab span { display: block; }
        .stt-portal-tab-index {
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 9px;
          letter-spacing: .16em;
        }
        .stt-portal-tab-label {
          margin-top: 9px;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 16px;
          letter-spacing: .025em;
        }
        .stt-portal-body {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          padding: 78px 0 106px;
          display: grid;
          grid-template-columns: minmax(250px, .72fr) minmax(0, 1.28fr);
          gap: 86px;
        }
        .stt-portal-section-meta {
          position: sticky;
          top: 110px;
          align-self: start;
        }
        .stt-portal-section-label {
          margin: 0 0 15px;
          color: #a9895e;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .stt-portal-section-title {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", "Songti TC", "PMingLiU", Georgia, serif;
          font-size: clamp(30px, 3.15vw, 46px);
          font-weight: 400;
          line-height: 1.46;
          letter-spacing: .02em;
        }
        .stt-portal-section-description {
          margin: 24px 0 0;
          color: #6e675e;
          font-size: 14px;
          line-height: 2.05;
        }
        .stt-portal-content {
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(197,168,128,.24);
        }
        .stt-portal-point {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
          padding: 28px 0;
          border-bottom: 1px solid rgba(197,168,128,.18);
        }
        .stt-portal-point-index {
          padding-top: 2px;
          color: #b18a58;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          letter-spacing: .08em;
        }
        .stt-portal-point p {
          margin: 0;
          color: #403c37;
          font-size: 14px;
          line-height: 2;
          letter-spacing: .01em;
        }
        .stt-portal-note {
          margin-top: 26px;
          padding: 20px 22px;
          border-left: 1px solid #c5a880;
          background: #f5f1ea;
          color: #6e675e;
          font-size: 12px;
          line-height: 1.9;
        }
        .stt-portal-metrics {
          margin-top: 42px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid rgba(197,168,128,.24);
          border-bottom: 1px solid rgba(197,168,128,.24);
        }
        .stt-portal-metric { padding: 24px 26px 25px 0; }
        .stt-portal-metric + .stt-portal-metric {
          padding-left: 26px;
          border-left: 1px solid rgba(197,168,128,.18);
        }
        .stt-portal-metric-value {
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .stt-portal-metric-label {
          margin-top: 10px;
          color: #1a1a1a;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 13px;
        }
        .stt-portal-metric-description {
          margin-top: 8px;
          color: #7b746b;
          font-size: 11px;
          line-height: 1.75;
        }
        @media (max-width: 1040px) {
          .stt-portal-shell {
            grid-template-columns: minmax(0, 1fr) minmax(290px, .62fr);
            gap: 52px;
          }
        }
        @media (max-width: 900px) {
          .stt-portal-shell {
            grid-template-columns: 1fr;
            gap: 48px;
            padding-top: 66px;
          }
          .stt-portal-copy { padding-right: 0; }
          .stt-portal-register { min-height: 0; }
          .stt-portal-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .stt-portal-tab:nth-child(2) { border-right: 0; }
          .stt-portal-tab:nth-child(-n+2) { border-bottom: 1px solid rgba(197,168,128,.16); }
          .stt-portal-body { grid-template-columns: 1fr; gap: 42px; }
          .stt-portal-section-meta { position: static; }
        }
        @media (max-width: 620px) {
          .stt-portal-shell,
          .stt-portal-tabs,
          .stt-portal-body { width: calc(100% - 30px); }
          .stt-portal-shell { padding: 54px 0 52px; }
          .stt-portal-title { font-size: clamp(40px, 12vw, 58px); }
          .stt-portal-register { padding: 28px 24px 26px; }
          .stt-portal-tabs { grid-template-columns: 1fr; }
          .stt-portal-tab,
          .stt-portal-tab:not(:first-child) {
            min-height: 72px;
            padding: 15px 0;
            border-right: 0;
            border-bottom: 1px solid rgba(197,168,128,.16);
          }
          .stt-portal-tab::after,
          .stt-portal-tab:not(:first-child)::after { left: 0; right: 0; }
          .stt-portal-body { padding: 58px 0 78px; }
          .stt-portal-point { grid-template-columns: 40px minmax(0, 1fr); gap: 14px; }
          .stt-portal-metrics { grid-template-columns: 1fr; }
          .stt-portal-metric + .stt-portal-metric {
            padding-left: 0;
            border-left: 0;
            border-top: 1px solid rgba(197,168,128,.18);
          }
        }
      `}</style>

      <section className="stt-portal-hero" data-stt-readable="true">
        <div className="stt-portal-shell">
          <div className="stt-portal-copy">
            <p className="stt-portal-eyebrow">{eyebrow}</p>
            <h1 className="stt-portal-title">{title}</h1>
            <p className="stt-portal-title-en">{titleEn}</p>
            <p className="stt-portal-lead">{lead}</p>
            <p className="stt-portal-statement">{statement}</p>

            <div className="stt-portal-actions">
              <button type="button" className="stt-portal-button" onClick={onPrimary}>
                <span>{primaryLabel}</span>
                <PrimaryIcon size={15} strokeWidth={1.25} />
              </button>

              {secondaryLabel && onSecondary && (
                <button type="button" className="stt-portal-button stt-portal-button--secondary" onClick={onSecondary}>
                  <span>{secondaryLabel}</span>
                  <ArrowRight size={15} strokeWidth={1.2} />
                </button>
              )}
            </div>
          </div>

          <aside className="stt-portal-register" aria-label={identity.word}>
            <div className="stt-portal-register-kicker">
              <span>STT Governance</span>
              <span>{identity.registerTitle}</span>
            </div>
            <div className="stt-portal-register-number">{identity.number}</div>
            <div className="stt-portal-register-word">{identity.word}</div>
            <div className="stt-portal-register-caption">{identity.caption}</div>

            <div className="stt-portal-register-list">
              {identity.registerRows.map((row) => (
                <div key={row.label} className="stt-portal-register-row">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="stt-portal-register-closing">{identity.closing}</div>
          </aside>
        </div>
      </section>

      <div className="stt-portal-tabs-wrap">
        <nav className="stt-portal-tabs" aria-label={`${title} sections`}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className="stt-portal-tab"
              data-active={section.id === active.id}
              onClick={() => onSectionChange(section.id)}
            >
              <span className="stt-portal-tab-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="stt-portal-tab-label">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <section className="stt-portal-body" data-stt-readable="true">
        <div className="stt-portal-section-meta">
          <p className="stt-portal-section-label">{active.label}</p>
          <h2 className="stt-portal-section-title">{active.title}</h2>
          <p className="stt-portal-section-description">{active.description}</p>
        </div>

        <div>
          <div className="stt-portal-content">
            {active.points.map((point, index) => (
              <div key={`${active.id}-${index}`} className="stt-portal-point">
                <div className="stt-portal-point-index">{String(index + 1).padStart(2, "0")}</div>
                <p>{point}</p>
              </div>
            ))}
          </div>

          {active.note && <div className="stt-portal-note">{active.note}</div>}

          {metrics.length > 0 && (
            <div className="stt-portal-metrics" aria-label={`${title} governance dimensions`}>
              {metrics.map((metric) => (
                <div key={metric.label} className="stt-portal-metric">
                  <div className="stt-portal-metric-value">{metric.value}</div>
                  <div className="stt-portal-metric-label">{metric.label}</div>
                  <div className="stt-portal-metric-description">{metric.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
