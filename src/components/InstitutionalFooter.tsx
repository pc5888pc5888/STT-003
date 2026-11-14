import { useSyncExternalStore, type ReactNode } from "react";
import { Globe } from "lucide-react";

type Group = { title: string; links: ReactNode };
type FooterProps = {
  name: string;
  description: string;
  groups: Group[];
  utilities?: ReactNode;
  languages: ReactNode;
  navigationLabel: string;
  utilitiesLabel: string;
  languageLabel: string;
};

const narrowScreen = "(max-width: 620px)";
function subscribeToWidth(notify: () => void) {
  const media = window.matchMedia(narrowScreen);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

export default function InstitutionalFooter(props: FooterProps) {
  const compact = useSyncExternalStore(subscribeToWidth,
    () => window.matchMedia(narrowScreen).matches, () => false);

  return (
    <footer id="site-footer" className="institutional-footer">
      <div className="footer-wrap">
        <div className="footer-identity">
          <strong>{props.name}</strong>
          <p>{props.description}</p>
        </div>
        <nav className="footer-directory" aria-label={props.navigationLabel}>
          {props.groups.map(({ title, links }) => {
            const entries = <div className="footer-entries">{links}</div>;
            return compact ? (
              <details key={title} className="footer-group">
                <summary>{title}</summary>
                {entries}
              </details>
            ) : (
              <div key={title} className="footer-group">
                <h2>{title}</h2>
                {entries}
              </div>
            );
          })}
        </nav>
        <div className="footer-base">
          {props.utilities && <nav className="footer-tools" aria-label={props.utilitiesLabel}>{props.utilities}</nav>}
          <nav className="footer-languages" aria-label={props.languageLabel}>
            <Globe size={15} strokeWidth={1.5} aria-hidden="true" />
            {props.languages}
          </nav>
        </div>
      </div>
    </footer>
  );
}
