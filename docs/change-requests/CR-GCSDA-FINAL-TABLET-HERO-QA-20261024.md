# CR-GCSDA-FINAL-TABLET-HERO-QA-20261024

Date: 2026-10-24
Approval: YES — final page-by-page visual QA ordered by owner.

## Defects verified by production Chromium QA
- Tablet image-backed Hero art was constrained to the legacy 78% right column and rendered with contain.
- Tablet titles had only ~430px of usable width, forcing approved one/two-line titles into extra lines.
- Founder title screen baseline was 16–25px above the STT reference.

## Correction
- Tablet image-backed Hero canvas is full 16:9.
- Hero image fills the full canvas using cover.
- Tablet copy measure is expanded to 590px / 58%.
- Founder screen baseline is aligned to STT: desktop internal top 221px; tablet internal top 91px.

No copy, route, asset, navigation, or institutional role is changed.
