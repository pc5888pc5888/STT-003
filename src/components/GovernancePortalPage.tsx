import type { LucideIcon } from "lucide-react";
import { ArrowRight, CircleDot, Compass, FileText, ShieldCheck } from "lucide-react";

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

const motifConfig = {
  governance: {
    number: "01",
    word: "ORDER",
    rings: [150, 105, 62],
  },
  compliance: {
    number: "02",
    word: "BOUNDARY",
    rings: [158, 112, 72],
  },
  digital: {
    number: "03",
    word: "PROTOCOL",
    rings: [166, 116, 68],
  },
} as const;

function ArchitectureMotif({ variant }: { variant: GovernancePortalPageProps["variant"] }) {
  const config = motifConfig[variant];
  return (
    <div className="stt-portal-motif" aria-hidden="true">
      <svg viewBox="0 0 520 520" role="img">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {config.rings.map((radius) => (
            <circle key={radius} cx="260" cy="260" r={radius} opacity={radius === config.rings[0] ? 0.42 : 0.26} />
          ))}
          <line x1="32" y1="260" x2="488" y2="260" opacity="0.28" />
          <line x1="260" y1="28" x2="260" y2="492" opacity="0.28" />
          <path d="M91 393L260 260L430 393" strokeDasharray="7 9" opacity="0.28" />
          <rect x="155" y="155" width="210" height="210" opacity="0.16" />
        </g>
        <g fill="currentColor">
          <circle cx="260" cy="260" r="6" />
          <circle cx="260" cy="105" r="4" opacity="0.74" />
          <circle cx="415" cy="260" r="4" opacity="0.74" />
        </g>
        {variant === "governance" && (
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M193 328V230M327 328V230M174 341H346M186 212H334L260 173L186 212Z" />
            <path d="M224 235V319M260 235V319M296 235V319" opacity="0.68" />
          </g>
        )}
        {variant === "compliance" && (
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M260 170L338 204V259C338 309 306 344 260 361C214 344 182 309 182 259V204L260 170Z" />
            <path d="M224 263L250 289L301 231" />
          </g>
        )}
        {variant === "digital" && (
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="210" y="210" width="100" height="100" rx="10" />
            <rect x="238" y="238" width="44" height="44" />
            <path d="M210 232H177V202H153M210 288H177V318H153M310 232H343V202H367M310 288H343V318H367M232 210V177H202V153M288 210V177H318V153M232 310V343H202V367M288 310V343H318V367" />
          </g>
        )}
      </svg>
      <div className="stt-portal-motif-meta">
        <span>{config.number}</span>
        <span>{config.word}</span>
      </div>
    </div>
  );
}

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

  return (
    <div className={`stt-portal stt-portal--${variant}`}>
      <style>{`
        .stt-portal {
          min-height: calc(100svh - var(--stt-header-height));
          background: #fbfbfa;
          color: #1a1a1a;
          overflow: hidden;
        }
        .stt-portal * { box-sizing: border-box; }
        .stt-portal-hero {
          position: relative;
          min-height: 700px;
          display: grid;
          align-items: center;
          border-bottom: 1px solid rgba(197,168,128,.22);
          background:
            radial-gradient(circle at 79% 22%, rgba(197,168,128,.10), transparent 28%),
            linear-gradient(180deg, #fbfbfa 0%, #f8f5ef 100%);
        }
        .stt-portal-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, transparent calc(50% - .5px), rgba(197,168,128,.13) 50%, transparent calc(50% + .5px)),
            linear-gradient(to bottom, transparent calc(58% - .5px), rgba(197,168,128,.10) 58%, transparent calc(58% + .5px));
        }
        .stt-portal-shell {
          position: relative;
          z-index: 2;
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(420px, .96fr);
          gap: 56px;
          align-items: center;
          padding: 86px 0 72px;
        }
        .stt-portal-copy { max-width: 690px; }
        .stt-portal-eyebrow {
          margin: 0 0 22px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #a9895e;
          font-size: 10px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .stt-portal-eyebrow::before { content: ""; width: 52px; height: 1px; background: #c5a880; }
        .stt-portal-title {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(44px, 5vw, 76px);
          font-weight: 400;
          line-height: 1.18;
          letter-spacing: .035em;
        }
        .stt-portal-title-en {
          margin: 18px 0 0;
          color: #a9895e;
          font-size: 12px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .stt-portal-lead {
          margin: 34px 0 0;
          max-width: 630px;
          color: #5f5951;
          font-size: 15px;
          line-height: 2;
          letter-spacing: .02em;
        }
        .stt-portal-statement {
          margin: 30px 0 0;
          padding-left: 22px;
          border-left: 1px solid #c5a880;
          color: #1f1d1a;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(19px, 2vw, 26px);
          line-height: 1.75;
        }
        .stt-portal-actions { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 12px; }
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
          letter-spacing: .06em;
          cursor: pointer;
          transition: background .18s ease, color .18s ease, transform .18s ease;
        }
        .stt-portal-button:hover { background: #a9895e; color: white; }
        .stt-portal-button:active { transform: scale(.985); }
        .stt-portal-button--secondary { border-color: rgba(197,168,128,.34); color: #6e675e; }
        .stt-portal-motif { position: relative; color: #b68e59; width: min(520px, 100%); margin-left: auto; }
        .stt-portal-motif svg { width: 100%; height: auto; overflow: visible; }
        .stt-portal-motif::before {
          content: "";
          position: absolute;
          left: 14%; right: 4%; bottom: 9%;
          height: 32px;
          background: linear-gradient(180deg, #fff, #e8e2d9);
          box-shadow: 0 16px 30px rgba(76,61,41,.08);
          border-top: 1px solid rgba(197,168,128,.22);
        }
        .stt-portal-motif-meta {
          position: absolute;
          right: 4%; bottom: 1%;
          display: flex; gap: 10px;
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .18em;
        }
        .stt-portal-tabs {
          position: relative;
          z-index: 3;
          width: min(calc(100% - 72px), 1320px);
          margin: -1px auto 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0,1fr));
          border-left: 1px solid rgba(197,168,128,.22);
          border-top: 1px solid rgba(197,168,128,.22);
        }
        .stt-portal-tab {
          min-height: 84px;
          padding: 16px 18px;
          border: 0;
          border-right: 1px solid rgba(197,168,128,.22);
          border-bottom: 1px solid rgba(197,168,128,.22);
          background: rgba(255,255,255,.72);
          color: #6e675e;
          text-align: left;
          cursor: pointer;
          transition: background .18s ease, color .18s ease;
        }
        .stt-portal-tab span { display: block; }
        .stt-portal-tab-index { color: #a9895e; font-size: 9px; letter-spacing: .18em; }
        .stt-portal-tab-label { margin-top: 8px; font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif; font-size: 16px; }
        .stt-portal-tab[data-active="true"] { background: #f2ece2; color: #1a1a1a; }
        .stt-portal-body {
          width: min(calc(100% - 72px), 1320px);
          margin: 0 auto;
          padding: 70px 0 96px;
          display: grid;
          grid-template-columns: minmax(250px,.72fr) minmax(0,1.28fr);
          gap: 72px;
        }
        .stt-portal-section-label { margin:0 0 14px; color:#a9895e; font-size:10px; letter-spacing:.2em; text-transform:uppercase; }
        .stt-portal-section-title { margin:0; font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif; font-size:clamp(30px,3.3vw,46px); font-weight:400; line-height:1.4; }
        .stt-portal-section-rule { width:48px; height:1px; margin:22px 0; background:#c5a880; }
        .stt-portal-section-description { margin:0; color:#6e675e; font-size:14px; line-height:2; }
        .stt-portal-content { display:grid; gap:18px; }
        .stt-portal-point {
          display:grid;
          grid-template-columns: 42px minmax(0,1fr);
          gap:18px;
          align-items:start;
          padding:24px 26px;
          border:1px solid rgba(197,168,128,.19);
          background:rgba(255,255,255,.78);
        }
        .stt-portal-point-icon { width:42px; height:42px; display:grid; place-items:center; border:1px solid rgba(197,168,128,.32); border-radius:50%; color:#a9895e; }
        .stt-portal-point p { margin:0; color:#403c37; font-size:14px; line-height:1.9; }
        .stt-portal-note { margin-top:2px; padding:18px 20px; border-left:2px solid #c5a880; background:#f5f1ea; color:#6e675e; font-size:12px; line-height:1.8; }
        .stt-portal-metrics { margin-top:26px; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
        .stt-portal-metric { padding:20px; border-top:1px solid rgba(197,168,128,.28); background:rgba(255,255,255,.64); }
        .stt-portal-metric-value { color:#a9895e; font-family:"Noto Serif TC","Noto Serif JP",Georgia,serif; font-size:22px; }
        .stt-portal-metric-label { margin-top:8px; color:#1a1a1a; font-size:12px; }
        .stt-portal-metric-description { margin-top:8px; color:#7b746b; font-size:11px; line-height:1.65; }
        @media (max-width: 980px) {
          .stt-portal-shell { grid-template-columns:1fr; padding-top:62px; }
          .stt-portal-motif { width:min(440px,88vw); margin:0 auto; }
          .stt-portal-tabs { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .stt-portal-body { grid-template-columns:1fr; gap:38px; }
        }
        @media (max-width: 620px) {
          .stt-portal-shell, .stt-portal-tabs, .stt-portal-body { width:calc(100% - 30px); }
          .stt-portal-hero { min-height:auto; }
          .stt-portal-shell { gap:32px; padding:52px 0 48px; }
          .stt-portal-title { font-size:42px; }
          .stt-portal-tabs { grid-template-columns:1fr 1fr; }
          .stt-portal-tab { min-height:76px; padding:13px 14px; }
          .stt-portal-tab-label { font-size:14px; }
          .stt-portal-body { padding:48px 0 70px; }
          .stt-portal-metrics { grid-template-columns:1fr; }
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
                <PrimaryIcon className="w-4 h-4" strokeWidth={1.25} />
              </button>
              {secondaryLabel && onSecondary && (
                <button type="button" className="stt-portal-button stt-portal-button--secondary" onClick={onSecondary}>
                  <span>{secondaryLabel}</span>
                  <Compass className="w-4 h-4" strokeWidth={1.25} />
                </button>
              )}
            </div>
          </div>
          <ArchitectureMotif variant={variant} />
        </div>
      </section>

      <nav className="stt-portal-tabs" aria-label={`${title} sections`}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className="stt-portal-tab"
            data-active={active.id === section.id}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="stt-portal-tab-index">0{index + 1}</span>
            <span className="stt-portal-tab-label">{section.label}</span>
          </button>
        ))}
      </nav>

      <section className="stt-portal-body" data-stt-readable="true">
        <div>
          <p className="stt-portal-section-label">Governance Reading</p>
          <h2 className="stt-portal-section-title">{active.title}</h2>
          <div className="stt-portal-section-rule" />
          <p className="stt-portal-section-description">{active.description}</p>
          {metrics.length > 0 && (
            <div className="stt-portal-metrics">
              {metrics.map((metric) => (
                <div className="stt-portal-metric" key={metric.label}>
                  <div className="stt-portal-metric-value">{metric.value}</div>
                  <div className="stt-portal-metric-label">{metric.label}</div>
                  <div className="stt-portal-metric-description">{metric.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="stt-portal-content">
          {active.points.map((point, index) => (
            <article className="stt-portal-point" key={`${active.id}-${index}`}>
              <div className="stt-portal-point-icon">
                {index % 3 === 0 ? <ShieldCheck className="w-5 h-5" strokeWidth={1.25} /> : index % 3 === 1 ? <FileText className="w-5 h-5" strokeWidth={1.25} /> : <CircleDot className="w-5 h-5" strokeWidth={1.25} />}
              </div>
              <p>{point}</p>
            </article>
          ))}
          {active.note && <div className="stt-portal-note">{active.note}</div>}
        </div>
      </section>
    </div>
  );
}
