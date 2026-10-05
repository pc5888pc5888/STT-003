# CR-20261005-AUTHOR-PROFILE-ALIGNMENT

Status: APPROVED / IMPLEMENTATION IN PROGRESS. Not a whole-site BUILD_LOCK.
Date: 2026-10-05, Asia/Taipei.
Owner: 莊鈞翔博士.
Approval: explicit follow-up instruction「請按上述說明執行」to the previously supplied author-profile alignment proposal.
Source: owner-supplied book-author introduction in the project conversation; not an independent verification of all books or appointments.

## Approved source of truth
`src/data/authorProfile.json` is the exact shared author-copy registry: English name, Chinese name, five current positions and eight publication titles in owner-supplied order. Both sites use byte-identical copies; `src/components/AuthorProfile.tsx` renders them without reclassification or abbreviation.

## Page specification / copy registry amendment
This approved amendment supersedes only ERIC-01 author identity, ERIC-05 publication list and ERIC-06 current-position list in PAGE-ERIC / the 2026-09-17 Master Build Specification / copy_registry. Unrelated LOCKED copy remains in force.
ERIC-01: Eric Chuang, Ph.D. / 莊鈞翔博士 -> englishName / chineseName from the shared registry, English displayed before Chinese.
ERIC-05: former publication overview -> all eight owner-supplied titles, preserving subtitles and sequence; no invented ISBN, dates, categories, covers or links.
ERIC-06: former academic/institutional list -> exactly the five supplied current positions and sequence. No claim that omitted historical roles are false.
STT target: existing /eric-chuang; retain URL, portrait, governance-role section, research section and third-party publication disclosure.
GCSDA target: /governance#author-profile; add the common introduction under the founding-chair context, without changing other directors, council members, charter, fees, navigation or routes.
STT Person metadata in src/seo.ts and vite.config.ts uses the same name, alternateName and primary position. Existing page titles/descriptions retain their approved governance-role description.
HOME-07 governance responsibility is deliberately unchanged: formal job titles and governance responsibilities are distinct.

## Boundaries and exclusions
No new routes, services, subscriptions, database, public AI, social-channel work or image generation.
STT and GCSDA remain separate entities. M傳媒 remains an external third-party source.
Existing /books redirects, publication-card images and reading links are unchanged.
The author list uses the supplied「2026 永續家族治理實務錄」. The separate existing publication-card title「2026 永續家族治理實務實錄」and cover remain outside this author-profile amendment; their discrepancy is not represented as resolved.

## Release and verification
STT source: main, official origin https://stt-003.vercel.app.
GCSDA source: gcsda-release-20261005, official origin https://gcsda-governance.vercel.app.
Only the association alias may be assigned to the new GCSDA build; never promote GCSDA over the STT production project.
Required: both builds, exact five/eight item arrays, displayed names, no stale English author identity, desktop/tablet/mobile rendering, preserved image paths and existing /books routing. Deployment READY alone does not constitute content acceptance.
Local-build and live-URL evidence is retained separately under the author-profile QA artifact. Runtime approval must use actual public URLs.
