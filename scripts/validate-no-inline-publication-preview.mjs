import fs from "node:fs";

const targets = [
  "src/pages/ResearchPapers.tsx",
  "src/pages/PublicationLibrary.tsx",
];

const errors = [];
for (const path of targets) {
  const source = fs.readFileSync(path, "utf8");
  if (/<iframe\b/i.test(source)) errors.push(`${path}: inline iframe is prohibited`);
  if (/research-embed|stt-publication-reader/.test(source)) errors.push(`${path}: legacy inline preview container is prohibited`);
}

if (errors.length) {
  console.error("PUBLICATION INLINE PREVIEW QA FAILED\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(JSON.stringify({
  publicationInlinePreviewQA: "PASS",
  researchIframeCount: 0,
  ebookIframeCount: 0,
  policy: "external reading links only",
}));
