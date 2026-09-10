import { useLocation } from "react-router-dom";

// Approved route assets only. This is an editorial mapping, not AI classification.
export const ROUTE_ARTWORK: Record<string, string> = {
  "/problems/major-decision": "major-decision.webp",
  "/problems/owner-dependence": "owner-dependence.webp",
  "/problems/succession": "succession.webp",
  "/problems/family-ownership": "family-ownership.webp",
  "/problems/strategic-legal": "strategic-legal.webp",
  "/problems/ai-governance": "ai-governance.webp",
  "/problems/system-failure": "system-failure.webp",
  "/problems/founder-legacy": "founder-legacy.webp",
  "/domains/corporate-governance": "corporate-governance.webp",
  "/domains/family-succession": "family-ownership.webp",
  "/domains/strategic-legal": "strategic-legal.webp",
  "/domains/compliance-contract": "internal-compliance.webp",
  "/domains/human-ai-governance": "ai-governance.webp",
  "/books": "publications.webp",
  "/books/internal-compliance": "publications.webp",
  "/research": "publications.webp",
};

export default function RouteArtwork() {
  const { pathname } = useLocation();
  const filename = ROUTE_ARTWORK[pathname];
  if (!filename) return null;
  return <div className="stt-route-artwork" aria-hidden="true">
    <img src={`/visual-bank/stt/originals-20260910/${filename}`} alt="" width={filename === "ai-governance.webp" ? 3200 : 1672} height={filename === "ai-governance.webp" ? 2263 : 941} decoding="async" />
  </div>;
}
