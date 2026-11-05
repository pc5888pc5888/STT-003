import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_PRESENTATION } from "../data/pagePresentation";
import "../styles/stt-founder-intact.css";

// Scoped to translated founder profiles; Chinese typography and other heroes remain unchanged.
const localizedProfileStyles = `
#root .stt-eric-page .stt-intact-hero[data-profile-locale] .stt-intact-hero__title {
  width:100%;
  max-width:100%;
  min-width:0;
  white-space:normal !important;
  overflow-wrap:anywhere;
  word-break:normal;
  font-size:clamp(28px,2.65vw,41px);
  line-height:1.3;
}
#root .stt-eric-page .stt-intact-hero[data-profile-locale] .stt-intact-hero__title span {
  display:block;
  width:100%;
  max-width:100%;
  min-width:0;
  white-space:normal !important;
  overflow-wrap:anywhere;
}
@media(max-width:1100px) {
  #root .stt-eric-page .stt-intact-hero[data-profile-locale] .stt-intact-hero__title {
    font-size:clamp(24px,4.2vw,36px);
    line-height:1.45;
  }
}
`;

type Props = { kicker: string; title: string; subtitle?: string; lead?: string; image?: string; id?: string; children?: ReactNode };
export default function GovernedHero({kicker,title,subtitle,lead,image,id,children}:Props){
  const {pathname}=useLocation();
  const route=pathname.replace(/\/$/,"")||"/";
  const page=PAGE_PRESENTATION[route];
  const profileLocale=route.match(/^\/(en|ja|ko)\/eric-chuang$/)?.[1];
  const lines=profileLocale ? title.split(/\s*[|｜]\s*/) : (page?.lines||[title]);
  const profileOriginal=route==="/eric-chuang" || Boolean(profileLocale);
  const picture=profileOriginal ? "/visual-approved/portrait-stt-20261106-8946x6330-original.png" : (image ?? page?.image ?? undefined);
  const titleId=id||"page-title";
  const clearLeft=Boolean(picture && (picture.includes("/user-approved-six/") || picture.includes("cooperation-hero-20260917")));
  const ownerOriginal=Boolean(picture?.includes("eric-page-owner-original.png") || picture?.includes("portrait-stt-20261101.webp" ) || picture?.includes("portrait-stt-20261102-hd.webp"));
  const profileParity=pathname==="/eric-chuang"||pathname==="/founder-chairman";
  const profileHires=profileOriginal;
  const portraitAlt=profileLocale==="en" ? "Portrait of Chuang Chun-Hsiang, Ph.D.; complete original composition" : profileLocale==="ja" ? "莊鈞翔博士の肖像。元の写真の構図を省略せず表示" : profileLocale==="ko" ? "좡쥔샹 박사의 초상. 원본 사진의 전체 구도" : "莊鈞翔博士雙手交叉肖像，完整保留原始照片構圖";

  // All four founder locales share the same photo-safe component and unchanged image.
  if (profileHires && picture) return <>
    {profileLocale&&<style>{localizedProfileStyles}</style>}
    <section className="stt-intact-hero" aria-labelledby={titleId} data-profile-locale={profileLocale} data-founder-visual-version="20261106-original-8946x6330">
      <div className="stt-intact-hero__stage">
        <img
          className="stt-intact-hero__image"
          src={picture}
          alt={portraitAlt}
          width={8946}
          height={6330}
          fetchPriority="high"
          decoding="async"
        />
        <div className="stt-intact-hero__copy">
          <p className="stt-intact-hero__kicker cis-kicker" lang="en" data-founder-name-kicker="20261106">CHUANG CHUN HSIANG Ph.D.</p>
          <h1 id={titleId} className="stt-intact-hero__title" aria-label={profileLocale ? title : undefined}>{lines.map((line,i)=><span key={i}>{line}</span>)}</h1>
          {subtitle&&<p className="stt-intact-hero__subtitle">{subtitle}</p>}
          {lead&&<p className="stt-intact-hero__lead">{lead}</p>}
          {children&&<div className="stt-intact-hero__actions">{children}</div>}
        </div>
      </div>
    </section>
    {page?.context&&<div className="cis-context"><p>{page.context}</p></div>}
  </>;
  return <>
    <section className={`cis-hero cis-title-${lines.length}${picture?" cis-with-image":" cis-text-only"}${page?.portrait?" cis-portrait":""}${clearLeft?" cis-clear-left":""}${profileParity?" cis-profile-parity":""}${ownerOriginal?" cis-owner-original":""}${profileHires?" cis-profile-hires":""}`} aria-labelledby={titleId}>
      <div className="cis-hero-inner">
        <div className="cis-hero-copy">
          {kicker&&<p className="cis-kicker">{kicker}</p>}
          {page?.byline && page.bylineBefore && <p className="cis-byline" lang="en">{page.byline}</p>}
          <h1 id={titleId} className="cis-title" aria-label={lines.join("")}>
            {lines.map((line,i)=><span key={i} className="cis-title-line">{line}</span>)}
          </h1>
          {page?.byline&&!page.bylineBefore&&<p className="cis-byline" lang="en">{page.byline}</p>}
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
