# CR-STT-METHOD-CONTRAST-20261025

Date: 2026-10-25
Approval basis: G10 rendered accessibility failure correction.

## Finding
Axe identified 28 WCAG 2 AA color-contrast failures on /how-stt-works at desktop, tablet and mobile.
The affected small governance labels use the method-page deep-gold token over the light institutional background.

## Change
Method-page deep gold:
- before: #8f693d
- after: #835c2e

The new token exceeds AA contrast on both #fbfaf7 and #f5f1e8 backgrounds while preserving the existing warm institutional palette.

## Unchanged
- copy
- layout
- typography
- routes
- images
- all other site color tokens
