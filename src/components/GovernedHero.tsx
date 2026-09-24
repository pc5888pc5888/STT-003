import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_PRESENTATION } from "../data/pagePresentation";

type Props = { kicker: string; title: string; subtitle?: string; lead?: string; image?: string; id?: string; children?: ReactNode };
export default function GovernedHero({kicker,title,subtitle,lead,image,id,children}:Props){
  const {pathname}=useLocation();
  const page=PAGE_PRESENTATION[pathname.replace(/\/$/,"")||"/"];
  const lines=page?.lines||[title];
  const picture=page ? page.image : image;
  const titleId=id||"page-title";
  const clearLeft=Boolean(picture && (picture.includes("/user-approved-six/") || picture.includes("cooperation-hero-20260917")));
  return <>
    <section className={`cis-hero cis-title-${lines.length}${picture?" cis-with-image":" cis-text-only"}${page?.portrait?" cis-portrait":""}${clearLeft?" cis-clear-left":""}`} aria-labelledby={titleId}>
      <div className="cis-hero-inner">
        <div className="cis-hero-copy">
          <p className="cis-kicker">{kicker}</p>
          <h1 id={titleId} className="cis-title" aria-label={lines.join("")}>
            {lines.map((line,i)=><span key={i} className="cis-title-line">{line}</span>)}
          </h1>
          {page?.byline&&<p className="cis-byline" lang="en">{page.byline}</p>}
          {subtitle&&<p className="cis-subtitle">{subtitle}</p>}
          {lead&&<p className="cis-lead">{lead}</p>}
          {children&&<div className="cis-actions">{children}</div>}
        </div>
        {picture&&<figure className="cis-hero-art"><img src={picture} alt={page?.portrait?"莊鈞翔博士人物基準照片":""} width={page?.imageWidth||1491} height={page?.imageHeight||1055} fetchPriority="high" decoding="async"/></figure>}
      </div>
    </section>
    {page?.context&&<div className="cis-context"><p>{page.context}</p></div>}
  </>;
}
