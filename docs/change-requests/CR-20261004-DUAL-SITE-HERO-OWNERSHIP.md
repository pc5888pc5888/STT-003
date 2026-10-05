# CHANGE REQUEST — Dual-Site Hero Asset Ownership

- CR ID: CR-20261004-DUAL-SITE-HERO-OWNERSHIP
- Date: 2026-10-04
- Requested / approved for preview implementation by: Project owner via project chat
- Scope: STT Governance + GCSDA
- Status: IMPLEMENTED ON PREVIEW BRANCHES / SSOT UPDATE REQUIRED BEFORE BUILD-LOCK MERGE

## Governance rule

1. STT Governance and GCSDA must not use the same active Hero / page-background image.
2. Asset exclusivity is evaluated by actual Git blob / file hash, not filename alone.
3. A shared visual language may be inherited (warm white, stone, paper, restrained gold, institutional geometry), but the same Hero artwork must not be duplicated across the two websites.
4. Formal evidence assets such as an official book cover, official logo, or approved portrait are exempt only when the same evidence itself must appear in both contexts; they are not to be reused as generic Hero backgrounds.
5. Missing or unsuitable imagery remains text-first / ASSET_REQUIRED. Do not generate a substitute merely to fill space.

## STT active public Hero ownership

- / → /visual-bank/stt/user-approved-six/home.png
- /problems → /visual-bank/stt/user-approved-six/problems.png
- /how-stt-works → /visual-bank/stt/user-approved-six/method.png
- /insights → /visual-bank/stt/user-approved-six/columns.png
- /about → /visual-bank/stt/user-approved-six/about-stt.png
- /eric-chuang → approved owner portrait
- /engagement → text-first until separately approved
- /institutions → text-first until separately approved
- /start → text-first by specification
- /privacy → text-first
- /professional-boundary → text-first

## GCSDA active public Hero ownership

- / → /visual-bank/gcsda/home-approved.webp (existing locked home master)
- /about → /visual-bank/gcsda/about.png
- /governance → /visual-bank/gcsda/governance.png
- /council → /visual-bank/gcsda/council.png
- /membership → /visual-bank/gcsda/membership.png
- /events → /visual-bank/gcsda/events.png
- /knowledge → /visual-bank/gcsda/knowledge.png
- /charter → /visual-bank/gcsda/charter.png
- /privacy → text-first

The seven GCSDA inner-page masters correspond to the association-only Visual Asset Bank semantics: institutional identity / governance folio / cross-domain linkage / membership records / assembly archive / knowledge archive / charter records. They must not be reassigned by filename guesswork.

## Automated acceptance

- Cross-site active Hero SHA collisions = 0.
- GCSDA inner-page Hero masters (excluding the separately locked homepage master) must render from high-resolution source files; browser QA rejects natural dimensions below 1400 × 900.
- Expected route-to-image paths must match.
- Desktop / tablet / mobile must load the image without broken assets.
- Mobile keeps image and copy vertically separated.
- Existing governed Hero reading-zone geometry remains unchanged.

## Implementation evidence

- GCSDA route-to-asset correction: b780b7cc718c757462d4b3ea9723a6ad96495033
- GCSDA exclusive council asset assignment: ddc9130a4157ad16325b7239d8cb60241bae2ab8
- Dual-site ownership / resolution QA: 3c2870329a9651c01e703505809dd591541835e4

## Production rule

No production merge is authorized by this CR alone. Final merge still requires the normal G10 / BUILD-LOCK acceptance process.
