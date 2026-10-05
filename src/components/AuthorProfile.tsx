import profile from "../data/authorProfile.json";
import "../styles/author-profile.css";

// The same owner-approved registry and component are published to both independent sites.
export default function AuthorProfile({ showName = false }: { showName?: boolean }) {
  const Heading = showName ? "h3" : "h2";
  return <div id="author-profile" className="author-profile" data-author-profile={profile.version}>
    {showName && <header className="author-profile__identity">
      <p lang="en" className="author-profile__english">{profile.englishName}</p>
      <h2 className="author-profile__name">{profile.chineseName}</h2>
    </header>}
    <section aria-labelledby="author-positions-title">
      <Heading id="author-positions-title" className="author-profile__heading">{profile.positionsHeading}</Heading>
      <ul className="author-profile__positions" data-author-positions>
        {profile.positions.map(position => <li key={position}>{position}</li>)}
      </ul>
    </section>
    <section aria-labelledby="author-publications-title">
      <Heading id="author-publications-title" className="author-profile__heading">{profile.publicationsHeading}</Heading>
      <ul className="author-profile__publications" data-author-publications>
        {profile.publications.map(title => <li key={title}>{title}</li>)}
      </ul>
    </section>
  </div>;
}
