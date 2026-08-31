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

const portalIdentity = {
  governance: {
    number: "01",
    word: "GOVERNANCE",
    caption: "Decision Order · Institutional Responsibility",
  },
  compliance: {
    number: "02",
    word: "COMPLIANCE",
    caption: "Internal Control · Contractual Discipline",
  },
  digital: {
    number: "03",
    word: "DIGITAL GOVERNANCE",
    caption: "Model Boundary · Human Authority",
  },
} as const;

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
          min-height: 650px;
          display: grid;
          align-items: center;
          border-bottom: 1px solid rgba(197,168,128,.20);
          background: linear-gradient(180deg, #fbfbfa 0%, #f9f7f3 100%);
        }
        .stt-portal-shell {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.24fr) minmax(300px, .76fr);
          gap: 88px;
          align-items: center;
          padding: 92px 0 78px;
        }
        .stt-portal-copy { max-width: 760px; }
        .stt-portal-eyebrow {
          margin: 0 0 24px;
          color: #a9895e;
          font-size: 10px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .stt-portal-title {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(46px, 5.3vw, 82px);
          font-weight: 400;
          line-height: 1.18;
          letter-spacing: .025em;
        }
        .stt-portal-title-en {
          margin: 20px 0 0;
          color: #a9895e;
          font-size: 12px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .stt-portal-lead {
          margin: 36px 0 0;
          max-width: 690px;
          color: #625c54;
          font-size: 15px;
          line-height: 2;
          letter-spacing: .02em;
        }
        .stt-portal-statement {
          margin: 32px 0 0;
          max-width: 710px;
          color: #24211e;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(20px, 2vw, 28px);
          line-height: 1.75;
        }
        .stt-portal-actions {
          margin-top: 38px;
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
          letter-spacing: .05em;
          cursor: pointer;
          transition: background .18s ease, color .18s ease, transform .18s ease;
        }
        .stt-portal-button:hover { background: #a9895e; color: #ffffff; }
        .stt-portal-button:active { transform: scale(.985); }
        .stt-portal-button--secondary { border-color: rgba(197,168,128,.34); color: #6e675e; }
        .stt-portal-identity {
          align-self: stretch;
          min-height: 390px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 38px 0 38px 54px;
          border-left: 1px solid rgba(197,168,128,.24);
        }
        .stt-portal-identity-number {
          color: #c5a880;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(58px, 7vw, 104px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -.035em;
        }
        .stt-portal-identity-word {
          margin-top: 24px;
          color: #28241f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .stt-portal-identity-caption {
          margin-top: 14px;
          max-width: 280px;
          color: #857c72;
          font-size: 11px;
          line-height: 1.9;
          letter-spacing: .08em;
        }
        .stt-portal-tabs {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-left: 1px solid rgba(197,168,128,.20);
          border-top: 1px solid rgba(197,168,128,.20);
        }
        .stt-portal-tab {
          min-height: 82px;
          padding: 16px 18px;
          border: 0;
          border-right: 1px solid rgba(197,168,128,.20);
          border-bottom: 1px solid rgba(197,168,128,.20);
          background: rgba(255,255,255,.72);
          color: #6e675e;
          text-align: left;
          cursor: pointer;
          transition: background .18s ease, color .18s ease;
        }
        .stt-portal-tab span { display: block; }
        .stt-portal-tab-index { color: #a9895e; font-size: 9px; letter-spacing: .18em; }
        .stt-portal-tab-label {
          margin-top: 8px;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 16px;
        }
        .stt-portal-tab[data-active="true"] { background: #f3eee6; color: #1a1a1a; }
        .stt-portal-body {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          padding: 74px 0 100px;
          display: grid;
          grid-template-columns: minmax(250px, .72fr) minmax(0, 1.28fr);
          gap: 76px;
        }
        .stt-portal-section-label {
          margin: 0 0 14px;
          color: #a9895e;
          font-size: 10px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .stt-portal-section-title {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(31px, 3.3vw, 47px);
          font-weight: 400;
          line-height: 1.42;
        }
        .stt-portal-section-description {
          margin: 24px 0 0;
          color: #6e675e;
          font-size: 14px;
          line-height: 2;
        }
        .stt-portal-content {
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(197,168,128,.22);
        }
        .stt-portal-point {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 22px;
          align-items: start;
          padding: 25px 0;
          border-bottom: 1px solid rgba(197,168,128,.18);
        }
        .stt-portal-point-index {
          color: #b18a58;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          letter-spacing: .08em;
        }
        .stt-portal-point p {
          margin: 0;
          color: #403c37;
          font-size: 14px;
          line-height: 1.95;
        }
        .stt-portal-note {
          margin-top: 22px;
          padding: 18px 20px;
          background: #f4f0e9;
          color: #6e675e;
          font-size: 12px;
          line-height: 1.85;
        }
        .stt-portal-metrics {
          margin-top: 34px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border-top: 1px solid rgba(197,168,128,.22);
          border-bottom: 1px solid rgba(197,168,128,.22);
        }
        .stt-portal-metric { padding: 22px 24px 24px 0; }
        .stt-portal-metric + .stt-portal-metric {
          padding-left: 24px;
          border-left: 1px solid rgba(197,168,128,.18);
        }
        .stt-portal-metric-value {
          color: #a9895e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          letter-spacing: .04em;
        }
        .stt-portal-metric-label { margin-top: 9px; color: #1a1a1a; font-size: 12px; }
        .stt-portal-metric-description { margin-top: 8px; color: #7b746b; font-size: 11px; line-height: 1.7; }
        @media (max-width: 980px) {
          .stt-portal-shell { grid-template-columns: 1fr; gap: 46px; padding-top: 66px; }
          .stt-portal-identity {
            min-height: 0;
            padding: 30px 0 8px;
            border-left: 0;
            border-top: 1px solid rgba(197,168,128,.22);
          }
          .stt-portal-identity-number { font-size: 64px; }
          .stt-portal-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .stt-portal-body { grid-template-columns: 1fr; gap: 42px; }
        }
        @media (max-width: 620px) {
          .stt-portal-shell, .stt-portal-tabs, .stt-portal-body { width: calc(100% - 30px); }
          .stt-portal-hero { min-height: auto; }
          .stt-portal-shell { padding: 54px 0 48px; }
          .stt-portal-title { font-size: clamp(40px, 12vw, 58px); }
          .stt-portal-tabs { grid-template-columns: 1fr 1fr; }
          .stt-portal-tab { min-height: 76px; }
          .stt-portal-body { padding: 56px 0 76px; }
          .stt-portal-point { grid-template-columns: 38px minmax(0, 1fr); gap: 14px; }
          .stt-portal-metrics { grid-template-columns: 1fr; }
          .stt-portal-metric + .stt-portal-metric {
            padding-left: 0;
            border-left: 0;
            border-top: 1px solid rgba(197,168,128,.18);
          }
        }
      `}</style>

      <section className="stt-portal-hero">
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

          <aside className="stt-portal-identity" aria-label={identity.word}>
            <div className="stt-portal-identity-number">{identity.number}</div>
            <div className="stt-portal-identity-word">{identity.word}</div>
            <div className="stt-portal-identity-caption">{identity.caption}</div>
          </aside>
        </div>
      </section>

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

      <section className="stt-portal-body">
        <div>
          <p className="stt-portal-section-label">{active.label}</p>
          <h2 className="stt-portal-section-title">{active.title}</h2>
          <p className="stt-portal-section-description">{active.description}</p>

          {metrics.length > 0 && (
            <div className="stt-portal-metrics">
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

        <div>
          <div className="stt-portal-content">
            {active.points.map((point, index) => (
              <article key={`${active.id}-${index}`} className="stt-portal-point">
                <div className="stt-portal-point-index">{String(index + 1).padStart(2, "0")}</div>
                <p>{point}</p>
              </article>
            ))}
          </div>

          {active.note && <div className="stt-portal-note">{active.note}</div>}
        </div>
      </section>
    </div>
  );
}
