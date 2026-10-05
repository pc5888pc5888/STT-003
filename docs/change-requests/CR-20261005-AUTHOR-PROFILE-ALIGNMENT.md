# CR-20261005-AUTHOR-PROFILE-ALIGNMENT

Status: APPROVED / AUTHOR COPY IMPLEMENTED ON BOTH SITES / STT PUBLIC CONTENT VERIFIED / GCSDA PUBLIC ACCESS BLOCKED. Not a whole-site BUILD_LOCK or G10 PASS.
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
GCSDA source: gcsda-release-20261005, designated origin https://gcsda-governance.vercel.app.
Only the association alias may be assigned to the new GCSDA build; never promote GCSDA over the STT production project.
Required: both builds, exact five/eight item arrays, displayed names, no stale English author identity, desktop/tablet/mobile rendering, preserved image paths and existing /books routing. Deployment READY alone does not constitute content acceptance.

## Execution and evidence — 2026-10-05
- STT implementation commit: b7493a5167399a54bfa756d7aa8d3f8425879458; production deployment dpl_3wZNdRksqosj53REXGeojNPToL1h.
- GCSDA implementation commit: c08fd3f365014f43ad0dd6c9ec1fbd58d53c2e2d; deployment dpl_E1PtN4UxBkQ1fnouDctNvsk3XiHH, assigned to the designated association hostname only.
- Shared author-profile blob SHA: 015738d5619a9d3f583814649823c85a3f0ff749.
- Both builds and all six built-browser checks passed before release-branch writes: desktop 1440x1000, tablet 768x1024, mobile 390x844 for each site. Assertions covered exact five positions/eight titles, names, one H1, no author-block overflow, no page exceptions, STT Person schema and retained human/third-party boundaries. Screenshots were captured and the mobile author blocks/hero were visually reviewed.
- GitHub Actions run: https://github.com/pc5888pc5888/STT-003/actions/runs/37286308929 ; built evidence artifact ID 11335100025. Built checks are not labelled as public-site checks.
- Unauthenticated public rendered-page reads of https://stt-003.vercel.app/eric-chuang showed the new English/Chinese identity, all five roles and all eight titles.
- Unauthenticated public /books read resolved to /insights?theme=civilization; existing four publication cards and reading entries remained unchanged.
- The GCSDA hostname was registered as a project domain specifically tracked to gcsda-release-20261005. This prevents treating it as a main-branch STT domain, but does not by itself remove deployment authentication.

## Open acceptance item: GCSDA public access
Unauthenticated checks of https://gcsda-governance.vercel.app/governance returned login_required after the new deployment and hostname registration. The connected Vercel authenticated fetch returned the new page bundle, but that tool automatically bypasses protection and is NOT proof of public access.
The author copy and built-site acceptance are complete. GCSDA public delivery is NOT accepted, and the combined live-URL gate cannot pass while authentication blocks ordinary visitors.
No project-wide authentication protection was disabled, no other preview was exposed, no new hosting project or paid plan was created, and no GCSDA build was promoted over STT production.
