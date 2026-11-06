import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_PRESENTATION } from "../data/pagePresentation";
import "../styles/gcsda-hero-repair.css";
import "../styles/gcsda-founder-intact.css";

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
  const lines = route === "/en/founder-chairman" ? ["Founding Chairman", "Chuang Chun-Hsiang, Ph.D."] : (page?.lines || [title]);
  const requestedPicture = image ?? page?.image ?? undefined;
  const profileOriginal = route === "/founder-chairman" || route === "/en/founder-chairman";
  const picture = profileOriginal ? "/visual-approved/portrait-gcsda-20261106-8946x6330-original.png" : (requestedPicture === INCOMPLETE_HOME_DERIVATIVE ? COMPLETE_HOME_ART : requestedPicture);
  const titleId = id || "page-title";
  const clearLeft = picture?.includes("/user-approved-six/");
  const ownerOriginal = Boolean(picture?.includes("eric-page-owner-original.png") || picture?.includes("portrait-gcsda-20261101.webp") || picture?.includes("portrait-gcsda-20261102-hd.webp"));
  const profileParity = route === "/founder-chairman";
  const profileHires = profileOriginal;

  // Founder-only photo-safe rendering. The global cis-hero crop system is not used.
  if (profileHires && picture) return <>
    <section className="gcsda-intact-hero" aria-labelledby={titleId} data-founder-visual-version="20261106-original-8946x6330">
      <div className="gcsda-intact-hero__stage">
        <img
          className="gcsda-intact-hero__image"
          src={picture}
          alt="莊鈞翔博士雙手插袋肖像，完整保留原始照片構圖"
          width={8946}
          height={6330}
          fetchPriority="high"
          decoding="async"
        />
        <div className="gcsda-intact-hero__copy">
          <p className="gcsda-intact-hero__kicker cis-kicker" lang="en" data-founder-name-kicker="20261106">CHUANG CHUN HSIANG Ph.D.</p>
          <h1 id={titleId} className="gcsda-intact-hero__title">{lines.map((line,i)=><span key={i}>{line}</span>)}</h1>
          {lead&&<p className="gcsda-intact-hero__lead">{lead}</p>}
          {children&&<div className="gcsda-intact-hero__actions">{children}</div>}
        </div>
      </div>
    </section>
    {page?.context&&<div className="cis-context"><p>{page.context}</p></div>}
  </>;
  return <>
    <section className={`cis-hero gcsda-hero${route === "/" ? " gcsda-hero--home" : ""} cis-title-${lines.length}${picture ? " cis-with-image" : " cis-text-only"}${page?.portrait ? " cis-portrait" : ""}${clearLeft ? " cis-clear-left" : ""}${profileParity ? " cis-profile-parity" : ""}${ownerOriginal ? " cis-owner-original" : ""}${profileHires ? " cis-profile-hires" : ""}`} aria-labelledby={titleId} data-gcsda-hero="20261021.1">
      <div className="cis-hero-inner">
        <div className="cis-hero-copy">
          {kicker && <p className="cis-kicker">{kicker}</p>}
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
