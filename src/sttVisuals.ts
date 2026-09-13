export const STT_VISUALS = {
  // Six first-level pages use six different user-approved source artworks.
  // Do not substitute generated variants, thumbnail assets, or same-image crops.
  // Always serve the verified native high-resolution masters for primary heroes.
  home: "/visual-bank/stt/hero-hires/home.webp",
  problems: "/visual-bank/stt/hero-hires/problems.png",
  method: "/visual-bank/stt/hero-hires/method.webp",
  columns: "/visual-bank/stt/hero-hires/columns.png",
  publications: "/visual-bank/stt/hero-hires/publications.png",
  aboutStt: "/visual-bank/stt/hero-hires/stt.png",
  problemMajorDecision: "/visual-bank/stt/originals-20260910/major-decision.webp",
  problemOwnerDependence: "/visual-bank/stt/originals-20260910/owner-dependence.webp",
  problemSuccession: "/visual-bank/stt/originals-20260910/succession.webp",
  problemFamilyOwnership: "/visual-bank/stt/originals-20260910/family-ownership.webp",
  problemStrategicLegal: "/visual-bank/stt/originals-20260910/strategic-legal.webp",
  problemAiGovernance: "/visual-bank/stt/originals-20260910/ai-governance.webp",
  problemSystemFailure: "/visual-bank/stt/originals-20260910/system-failure.webp",
  problemFounderLegacy: "/visual-bank/stt/originals-20260910/founder-legacy.webp",
  domainsIndex: "/visual-bank/stt/primary-semantic/stt-governance-dossiers.png",
  domainCorporateGovernance: "/visual-bank/stt/originals-20260910/corporate-governance.webp",
  domainFamilySuccession: "/visual-bank/stt/originals-20260910/succession.webp",
  domainStrategicLegal: "/visual-bank/stt/originals-20260910/strategic-legal.webp",
  domainComplianceContract: "/visual-bank/stt/originals-20260910/internal-compliance.webp",
  domainHumanAiGovernance: "/visual-bank/stt/originals-20260910/ai-governance.webp",
  books: "/visual-bank/stt/primary-semantic/publications-stt-press-library.png",
  internalCompliance: "/visual-bank/stt/originals-20260910/internal-compliance.webp",
  research: "/visual-bank/stt/originals-20260910/insights.webp",
  projects: "/visual-bank/stt/originals-20260910/stt-platform.webp",
  governanceResponsibility: "/visual-bank/stt/hero-hires/stt-portrait.png",
} as const;

export type STTVisualKey = keyof typeof STT_VISUALS;
export const sttVisual = (key: STTVisualKey) => STT_VISUALS[key];

// Let the browser use each original asset's intrinsic ratio.
// Do not impose the former 1491×1055 contract on higher-resolution source images.
export const STT_VISUAL_DIMENSIONS: Partial<Record<STTVisualKey, readonly [number, number]>> = {};
export const sttVisualDimensions = (key: STTVisualKey) => STT_VISUAL_DIMENSIONS[key];

export const PROBLEM_VISUALS: Record<string, STTVisualKey> = {
  "major-decision": "problemMajorDecision",
  "owner-dependence": "problemOwnerDependence",
  succession: "problemSuccession",
  "family-ownership": "problemFamilyOwnership",
  "strategic-legal": "problemStrategicLegal",
  "ai-governance": "problemAiGovernance",
  "system-failure": "problemSystemFailure",
  "founder-legacy": "problemFounderLegacy",
};

export const DOMAIN_VISUALS: Record<string, STTVisualKey> = {
  "corporate-governance": "domainCorporateGovernance",
  "family-succession": "domainFamilySuccession",
  "strategic-legal": "domainStrategicLegal",
  "compliance-contract": "domainComplianceContract",
  "human-ai-governance": "domainHumanAiGovernance",
};
