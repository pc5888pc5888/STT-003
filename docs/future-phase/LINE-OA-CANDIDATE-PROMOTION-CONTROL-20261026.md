# LINE OA CANDIDATE PROMOTION CONTROL — 2026-10-26

STATUS: FUTURE_PHASE_INPUT  
LIVE RELEASE: HOLD

The two owner-review candidate PNGs are now pinned and hash-verified in Git.

Promotion into `line/release/*.png` is intentionally blocked until:
- WEBSITE_STATUS = QA_PASS / BUILD_LOCKED
- LINE_RELEASE_VISUAL_VERSION = 20261026_LOCKED_DERIVATIVE
- account-specific explicit owner approval exists

Required approval variables:
- STT: LINE_STT_VISUAL_APPROVAL=OWNER_APPROVED_20261026
- GCSDA: LINE_GCSDA_VISUAL_APPROVAL=OWNER_APPROVED_20261026

Promotion command after all gates are legitimately satisfied:

`node scripts/line/promote-approved-candidate.mjs stt`

`node scripts/line/promote-approved-candidate.mjs gcsda`

This script:
- verifies exact candidate SHA-256
- verifies PNG format
- verifies 2500×1686 dimensions
- verifies image ≤1 MB
- copies the immutable review candidate to the governed release filename

It does not contact LINE and does not publish anything.

The live `deploy-richmenu.mjs` script independently requires the same account-specific owner approval value, so promotion alone cannot authorize publication.
