import "../styles/content-type-hero.css";

type ContentTypeHeroProps = {
  id: string;
  image: string;
  kicker: string;
  title: string;
  englishTitle?: string;
  thesis?: string;
  description: string;
  anchorHref?: string;
  anchorText?: string;
};

/**
 * Only the three /insights content-type landing pages use this hero.
 * Artwork remains a standalone, text-free image. All copy is real HTML.
 */
export default function ContentTypeHero({
  id, image, kicker, title, englishTitle, thesis, description, anchorHref, anchorText,
}: ContentTypeHeroProps) {
  return (
    <section className="stt-content-type-hero" aria-labelledby={id}>
      <div className="stt-content-type-hero__stage">
        <img
          className="stt-content-type-hero__art"
          src={image}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
        />
        <div className="stt-content-type-hero__copy">
          <p className="stt-content-type-hero__kicker">{kicker}</p>
          <h1 id={id} className="stt-content-type-hero__title">
            {englishTitle && <span className="stt-content-type-hero__english" lang="en">{englishTitle}</span>}
            <span className="stt-content-type-hero__chinese">{title}</span>
          </h1>
          {thesis && <p className="stt-content-type-hero__thesis">{thesis}</p>}
          <div className="stt-content-type-hero__rule" aria-hidden="true" />
          <p className="stt-content-type-hero__description">{description}</p>
          {anchorHref && anchorText && (
            <a className="stt-content-type-hero__anchor" href={anchorHref}>{anchorText}</a>
          )}
        </div>
      </div>
    </section>
  );
}
