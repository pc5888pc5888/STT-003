export const STT_VISUALS = {
  home: "/visual-bank/stt/approved-six-20260912/01-home.webp",
  problems: "/visual-bank/stt/approved-six-20260912/02-problems.webp",
  method: "/visual-bank/stt/approved-six-20260912/03-how-stt-works.webp",
  columns: "/visual-bank/stt/approved-six-20260912/04-insights.webp",
  publications: "/visual-bank/stt/approved-six-20260912/05-publications.webp",
  aboutStt: "/visual-bank/stt/approved-six-20260912/06-about-stt.webp",
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

export const STT_VISUAL_DIMENSIONS: Partial<Record<STTVisualKey, readonly [number, number]>> = {
  home: [1491, 1055],
  problems: [1491, 1055],
  method: [1491, 1055],
  columns: [1491, 1055],
  publications: [1491, 1055],
  aboutStt: [1491, 1055],
};

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
