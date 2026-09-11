export const STT_VISUAL_ROOT = "/visual-bank/stt/final-25/";

export const STT_VISUALS = {
  home: "home.webp",
  problems: "problems.webp",
  method: "method.webp",
  columns: "columns.webp",
  publications: "publications.webp",
  aboutStt: "about-stt.webp",
  problemMajorDecision: "problem-major-decision.webp",
  problemOwnerDependence: "problem-owner-dependence.webp",
  problemSuccession: "problem-succession.webp",
  problemFamilyOwnership: "problem-family-ownership.webp",
  problemStrategicLegal: "problem-strategic-legal.webp",
  problemAiGovernance: "problem-ai-governance.webp",
  problemSystemFailure: "problem-system-failure.webp",
  problemFounderLegacy: "problem-founder-legacy.webp",
  domainsIndex: "domains-index.webp",
  domainCorporateGovernance: "domain-corporate-governance.webp",
  domainFamilySuccession: "domain-family-succession.webp",
  domainStrategicLegal: "domain-strategic-legal.webp",
  domainComplianceContract: "domain-compliance-contract.webp",
  domainHumanAiGovernance: "domain-human-ai-governance.webp",
  books: "books.webp",
  internalCompliance: "internal-compliance.webp",
  research: "research.webp",
  projects: "projects.webp",
  governanceResponsibility: "governance-responsibility.webp",
} as const;

export type STTVisualKey = keyof typeof STT_VISUALS;
export const sttVisual = (key: STTVisualKey) => STT_VISUAL_ROOT + STT_VISUALS[key];

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
