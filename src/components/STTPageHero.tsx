import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { sttVisual, sttVisualDimensions, type STTVisualKey } from "../sttVisuals";

type Action = { text: string; to: string; primary?: boolean };

type Props = {
  visual: STTVisualKey;
  eyebrow: string;
  title: string;
  titleLines?: readonly string[];
  lead?: string;
  actions?: Action[];
  primary?: boolean;
  children?: ReactNode;
  id?: string;
};

export default function STTPageHero({ visual, eyebrow, title, titleLines, lead, actions = [], primary = false, children, id }: Props) {
  const dimensions = sttVisualDimensions(visual);
  const editorialTitleLines = titleLines?.length ? titleLines : [title];

  return (
    <section id={id} className={`stt-master-hero${primary ? " is-primary" : " is-secondary"}`} data-stt-visual={visual} aria-labelledby={`stt-hero-${visual}`}>
      <img
        className="stt-master-hero__image"
        src={sttVisual(visual)}
        alt=""
        aria-hidden="true"
        width={dimensions?.[0]}
        height={dimensions?.[1]}
        decoding="async"
        loading={primary ? "eager" : "lazy"}
        fetchPriority={primary ? "high" : "auto"}
        draggable={false}
      />
      <div className="stt-master-hero__veil" aria-hidden="true" />
      <div className="stt-master-shell stt-master-hero__inner">
        <div className="stt-master-hero__copy">
          <p className="stt-master-kicker">{eyebrow}</p>
          <h1 id={`stt-hero-${visual}`} aria-label={title}>
            {editorialTitleLines.map((line, index) => (
              <span className="stt-editorial-title-line" key={`${visual}-title-${index}`}>{line}</span>
            ))}
          </h1>
          {lead && <p className="stt-master-lead">{lead}</p>}
          {actions.length > 0 && <div className="stt-master-actions">{actions.map((a) => a.to.startsWith("#")
            ? <a key={a.to} className={a.primary ? "is-primary" : undefined} href={a.to}>{a.text}<span aria-hidden="true">↓</span></a>
            : <Link key={a.to} className={a.primary ? "is-primary" : undefined} to={a.to}>{a.text}<span aria-hidden="true">→</span></Link>)}</div>}
          {children && <div className="stt-master-hero__meta">{children}</div>}
        </div>
      </div>
    </section>
  );
}
