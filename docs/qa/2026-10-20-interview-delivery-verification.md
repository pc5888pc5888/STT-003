# Interview delivery verification — 2026-10-20

Owner-authorized incident scope: restore one official twenty-question interview route and verify copy, save, download, and submission. No new public website, database, or public channel was created.

## Authoritative destination

https://stt-003.vercel.app/humanistic-interview/

The existing same-origin delivery endpoint remains `/api/humanistic-submit`. The twenty approved question sections and all 26 embedded artwork instances were compared with the pre-repair production snapshot and were byte-identical. Brand positioning and questionnaire content were not rewritten.

## Repairs and release controls

The checked-in interview HTML now loads exactly one external controller, `interview.js?v=20261020.2`, and uses the matching `interview-form` ID and recovery controls. Obsolete executable inline code and Netlify hosting metadata are absent from the served interview HTML. The obsolete Netlify-to-Vercel mirror workflow had already been removed.

`npm run build` now invokes `scripts/finalize-interview.mjs` as a READ-ONLY production gate. It verifies the canonical URL, controller/HTML version agreement, unique controls, same-origin form action, twenty answer fields, and unchanged question/artwork content between source and build output. It does not rewrite source or silently substitute markup.

Verified release with this gate: commit `3bcad7cbca21ae2d34465d1445e83b05e04bf763`; deployment `dpl_7f2S8Qc75ScrotdS4PqEXLRuuDe9`.

## Executed browser checks

Tests used synthetic material only. No real respondent content was submitted or reconstructed.

- PASS: actual clipboard contents contained the complete twenty-question backup, including Traditional Chinese, line breaks, ampersands and angle brackets.
- PASS: actual downloaded TXT contents retained the entered answers.
- PASS: actual downloaded JSON draft contained all twenty answers; a new browser context imported and restored those answers.
- PASS: page refresh restored the current per-tab draft.
- PASS: simulated storage denial and clipboard denial still left the complete answer text visible and selectable; actual backup download still worked.
- PASS: simulated HTTP 503 kept answers; repeated retries used the same submission identifier and creation timestamp.
- PASS: a simulated HTTP 200 HTML response without a valid delivery receipt did not clear answers.
- PASS: actual production POST returned a provider identifier and receipt; the receipt was displayed, and inputs/per-tab answer storage were cleared only after the acknowledged success.
- PASS: no JavaScript page errors occurred in the executed successful desktop/mobile-sized browser checks.
- PASS: question-page toolbar controls fit 320, 375, 390, 768 and 1280 pixel widths, with at least 44 pixel height. The mobile welcome screen intentionally differs from active question screens.

Browser automation used Chromium, including touch/mobile viewport emulation. This is NOT a physical iPhone or Safari/WebKit verification. Native OS share sheets and file-picker dialogs were not end-to-end verified; download fallback and manual text selection were exercised.

## Actual inbox receipt verified

Synthetic submission name: `STT-QA-20261020-FINAL-VERIFIED`.

Receipt: `HUM-0203B4FD-48B9-4C6C-BF08-554B09DAA9E4`.

Provider identifier: `01a15954-38c8-78a3-8e5e-5e2cb37e77ae`.

The designated existing recipient inbox contained message `1a159543aa175473`, received at 2026-10-20 12:40:54 UTC. The message body was read and contained Q01–Q20 with the expected synthetic text and line breaks. The mail was labeled INBOX, not merely acknowledged by the send API. No original lost respondent answers were recovered.

## Route checks

- `/humanistic-20q`: 308 to the canonical interview.
- `/humanistic-20q/`: 308 to the canonical interview.
- `/humanistic-interview/index.html`: 308 to the canonical interview.
- `/humanistic-interview`: 308 to `/humanistic-interview/`.
- `/humanistic-interview/`: 200, one external controller and one canonical link.

## Open issue — separate Netlify host

`shimmering-longma-509244.netlify.app` still served the obsolete interview when directly checked. Removal of its mirror workflow or references within STT does NOT delete or redirect this independent Netlify deployment. Authenticated Netlify site-management access was not available in this session; do not mark it deleted or retired.

`fluffy-crumble-cd749c.netlify.app` is a separate GCSDA website, not the duplicate STT interview, and must not be deleted under this incident.

Full cross-host retirement remains OPEN until the obsolete interview's actual Netlify site is disabled/deleted or configured to redirect under the owner's Netlify account, followed by a direct public-URL check. No claim of universal browser compatibility or permanent zero failure is made.
