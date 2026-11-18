# Homepage closing portrait composition — 2026-11-18

Owner request: replace the two plain closing sections above the footers with the supplied portrait compositions (reference 3 for STT, reference 4 for GCSDA).

Scope: Chinese homepage closing section only; preserve existing institutional text and STT /start CTA. Shared responsive typography, spacing and cream/gold reading surface. Existing source image is served byte-for-byte unchanged, proportionally sized without cover cropping. Left embedded lettering is visually covered so real semantic HTML carries the correct institution's text. Decorative duplicate artwork is hidden from assistive technology.

Asset: public/visual-approved/closing/gcsda-knowledge-20261118.jpg
SHA-256: 2aa9434860a6d406029f1d806306e69c6dbe12aa13167110bb055610950b684d
Original dimensions: 2048 × 969. No generated or upscaled portrait.

Validation: browser checked actual application at 320, 390, 768 and 1440 px iframe widths: no horizontal overflow; image natural dimensions correct; aspect ratio preserved; title and description left-aligned. Desktop visual inspection confirmed separation of text and portrait. STT CTA was clicked and reached /start with the existing intake heading. Both npm run build gates passed before final publication. This is scoped validation, not a claim of unrelated full-site QA.

Rollback: revert only this change; original text, images, routing and footer records remain in Git history.
