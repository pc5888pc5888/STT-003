import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_PRESENTATION } from "../data/pagePresentation";
import "../styles/gcsda-hero-repair.css";

type Props = { kicker: string; title: string; subtitle?: string; lead?: string; image?: string; id?: string; children?: ReactNode };

// The archived approved homepage uses source key 3eeb5a932e9582c5e602.
// Its complete 1672×941 original already exists at this path; the misleading
// filename is not its publication role. No new image or altered pixels are used.
const COMPLETE_HOME_ART = "/visual-bank/gcsda/council.png";
const INCOMPLETE_HOME_DERIVATIVE = "/visual-bank/gcsda/home-approved.webp";

export default function GovernedHero({ kicker, title, subtitle, lead, image, id, children }: Props) {
  const { pathname } = useLocation();
  const route = pathname.replace(/\/$/, "") || "/";
  const page = PAGE_PRESENTATION[route];
  const lines = page?.lines || [title];
  const requestedPicture = image ?? page?.image ?? undefined;
  const picture = requestedPicture === INCOMPLETE_HOME_DERIVATIVE ? COMPLETE_HOME_ART : requestedPicture;
  const titleId = id || "page-title";
  const clearLeft = picture?.includes("/user-approved-six/");
  return <>
    <section className={`cis-hero gcsda-hero${route === "/" ? " gcsda-hero--home" : ""} cis-title-${lines.length}${picture ? " cis-with-image" : " cis-text-only"}${page?.portrait ? " cis-portrait" : ""}${clearLeft ? " cis-clear-left" : ""}`} aria-labelledby={titleId} data-gcsda-hero="20261021.1">
      <div className="cis-hero-inner">
        <div className="cis-hero-copy">
          <p className="cis-kicker">{kicker}</p>
          <h1 id={titleId} className="cis-title" aria-label={lines.join("")}>
            {lines.map((line, index) => <span key={index} className="cis-title-line">{line}</span>)}
          </h1>
          {page?.byline && <p className="cis-byline" lang="en">{page.byline}</p>}
          {subtitle && <p className="cis-subtitle">{subtitle}</p>}
          {lead && <p className="cis-lead">{lead}</p>}
          {children && <div className="cis-actions">{children}</div>}
        </div>
        {picture && <figure className="cis-hero-art"><img src={picture} alt={page?.portrait ? "莊鈞翔博士人物基準照片" : ""} width={page?.imageWidth || 1672} height={page?.imageHeight || 941} fetchPriority="high" decoding="async" /></figure>}
      </div>
    </section>
    {page?.context && <div className="cis-context"><p>{page.context}</p></div>}
  </>;
}
