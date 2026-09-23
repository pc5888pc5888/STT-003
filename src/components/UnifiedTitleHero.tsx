import type { ReactNode } from "react";
import { splitTitleAtBalancedPunctuation } from "../utils/titleBreak";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  lead?: string;
  image?: string;
  imagePosition?: string;
  id?: string;
  children?: ReactNode;
};

export default function UnifiedTitleHero({
  kicker,
  title,
  subtitle,
  lead,
  image,
  imagePosition = "center",
  id,
  children,
}: Props) {
  const lines = splitTitleAtBalancedPunctuation(title);
  return (
    <section className="stt-title-hero" aria-labelledby={id}>
      {image ? (
        <img
          className="stt-title-hero__image"
          src={image}
          alt=""
          aria-hidden="true"
          style={{ objectPosition: imagePosition }}
          draggable={false}
        />
      ) : (
        <div className="stt-title-hero__linework" aria-hidden="true">
          <span /><span /><span />
        </div>
      )}
      <div className="stt-title-hero__veil" aria-hidden="true" />
      <div className="stt-title-hero__shell">
        <div className="stt-title-hero__copy">
          <p className="stt-title-hero__kicker">{kicker}</p>
          <h1 id={id} aria-label={title}>
            {lines.map((line, index) => (
              <span className="stt-editorial-title-line" key={index}>{line}</span>
            ))}
          </h1>
          {subtitle && <h2>{subtitle}</h2>}
          {lead && <p className="stt-title-hero__lead">{lead}</p>}
          {children && <div className="stt-title-hero__actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
