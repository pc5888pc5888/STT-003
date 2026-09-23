# DUAL-SITE TITLE HERO VISUAL AUDIT — 2026-09-23

Status: ACTIVE BUILD QA
Rule: No page may be presented as visually complete while its required hero asset is unresolved.

## STT Governance

| Route | Hero status | Source / action |
|---|---|---|
| / | APPROVED_READY | /visual-bank/stt/user-approved-six/home.png |
| /problems | APPROVED_READY | /visual-bank/stt/user-approved-six/problems.png |
| /problems/:id | EXISTING_RETAIN | existing approved/current problem visual bank; no replacement generation |
| /how-stt-works | APPROVED_READY | /visual-bank/stt/user-approved-six/method.png |
| /engagement | ASSET_REQUIRED | formal spec requires ENGAGEMENT-HERO; no owner-approved final image currently deployed |
| /insights | APPROVED_READY | /visual-bank/stt/user-approved-six/columns.png |
| /about | APPROVED_READY | /visual-bank/stt/user-approved-six/about-stt.png; restored 2026-09-23 |
| /eric-chuang | APPROVED_ASSET_DEPLOY_REQUIRED | formal portrait lock selects S__96100405_0.jpg / ERIC-PORTRAIT-HERO-001; do not substitute generated portrait |
| /institutions | ASSET_REQUIRED | formal spec requires INSTITUTIONS-HERO; no owner-approved final image currently deployed |
| /start | TEXT_ONLY_BY_SPEC | Hero NONE; finished text-first layout, no placeholder art |
| /privacy | TEXT_ONLY_BY_SPEC | Hero NONE; finished text-first layout, no placeholder art |
| /professional-boundary | TEXT_ONLY_BY_SPEC | Hero NONE; finished text-first layout, no placeholder art |
| /research | EXISTING_RETAIN | existing research visual retained |
| /books | EXISTING_RETAIN | existing publication-library visual retained |
| /domains | EXISTING_RETAIN | existing governance dossier / domain visual bank retained |
| /success | LEGACY_COMMERCE_ROUTE | title layout normalized; route remains outside primary governance flow |

### STT asset decisions requiring owner discussion before generation
1. ENGAGEMENT-HERO
2. INSTITUTIONS-HERO

### STT asset already approved and must be deployed, not regenerated
1. ERIC-PORTRAIT-HERO-001 = S__96100405_0.jpg

## GCSDA

| Route | Hero status | Source / action |
|---|---|---|
| / | APPROVED_READY | /visual-bank/gcsda/home-approved.webp |
| /about | APPROVED_READY | /visual-bank/gcsda/about.webp |
| /governance | APPROVED_READY | /visual-bank/gcsda/governance.webp |
| /council | APPROVED_READY | /visual-bank/gcsda/council.webp |
| /membership | APPROVED_READY | /visual-bank/gcsda/membership.webp |
| /events | APPROVED_READY | /visual-bank/gcsda/events.webp |
| /knowledge | APPROVED_READY | /visual-bank/gcsda/knowledge.webp |
| /charter | APPROVED_READY | /visual-bank/gcsda/charter.webp |
| /privacy | TEXT_ONLY_BY_DESIGN | finished text-first layout; no faux geometry / placeholder image |

## Shared visual rule

- Problems screenshot supplied by owner on 2026-09-23 is the composition reference, not a command to force identical content onto every page.
- Short title: large serif scale permitted.
- Medium/long title: font size reduces automatically and text block widens to avoid oppressive 4–5 line stacking.
- Intentional line breaks use semantic punctuation and balanced line lengths.
- Missing images do not produce faux placeholder geometry.
- A required missing image is raised as ASSET_REQUIRED before a page is presented as final.
- No public Coming Soon / maintenance / under-construction / GatePending screen.
