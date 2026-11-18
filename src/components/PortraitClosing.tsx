import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  lang: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  action?: { to: string; label: string };
};

/** One composition for every language; copy and destination remain locale-specific. */
export default function PortraitClosing({ id, lang, eyebrow, title, description, image, action }: Props) {
  return (
    <section id={id} lang={lang} className="portrait-closing" aria-labelledby={`${id}-heading`}>
      <div className="portrait-closing__art" aria-hidden="true">
        <img src={image} width="2048" height="969" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="portrait-closing__copy">
        <p className="portrait-closing__eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
        <p className="portrait-closing__lead">{description}</p>
        {action && <Link className="portrait-closing__action" to={action.to}>{action.label}</Link>}
      </div>
    </section>
  );
}
