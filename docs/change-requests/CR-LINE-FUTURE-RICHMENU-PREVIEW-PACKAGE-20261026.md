# CR-LINE-FUTURE-RICHMENU-PREVIEW-PACKAGE-20261026

Date: 2026-10-26
Phase: FUTURE_PHASE_PREPARATION_ONLY
Live LINE OA change: NONE

## Changed

- Reverified both locked source SHA-256 values against Drive originals.
- Created offline 2500×1686 six-grid preview derivatives and stored them in Drive as NOT_FOR_RELEASE.
- Staged the 20261026 governed action maps under line/release/*.json.
- Added an offline package validator for all six bounds, labels and URIs.
- Hardened deploy-richmenu.mjs so future release also rejects wrong bounds, labels, URIs, image dimensions, file type, or >1 MB image.

## Intentionally not changed

- No LINE Manager login.
- No live rich menu publication.
- No default rich menu replacement.
- No welcome-message changes.
- No webhook changes.
- No credentials added.
- No final release PNG committed.

## Remaining gate

Final release PNG promotion requires:
1. owner visual approval;
2. WEBSITE_STATUS = QA_PASS / BUILD_LOCKED;
3. LINE_RELEASE_GATE=WEBSITE_QA_PASS_BUILD_LOCKED;
4. LINE_RELEASE_VISUAL_VERSION=20261026_LOCKED_DERIVATIVE;
5. valid external credentials.
