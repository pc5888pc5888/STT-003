# CR-LINE-SIX-GRID-FUTURE-PHASE-ALIGNMENT-20261026

Date: 2026-10-26
Approval basis: explicit owner instruction to continue from the selected-and-locked six-grid assets.

## Change

- preserve LINE as HOLD / FUTURE_PHASE_INPUT under the current project phase
- supersede the conflicting 2026-10-25 ACTIVE_BUILD wording
- make the two 2026-10-26 locked backgrounds the only approved future visual sources
- deprecate the pre-lock rich-menu PNGs as final-release visuals
- preserve the existing six-cell action maps
- create a derivative specification and release QA gate

## No live change

No LINE Manager publication, rich-menu upload, welcome-message update, profile edit, credential binding, webhook activation or payment activation is performed by this change.


## Technical deployment safeguard

The rich-menu deployment script is now fail-closed.

It will refuse live deployment unless BOTH are explicitly supplied by a later authorized release:
- LINE_RELEASE_GATE=WEBSITE_QA_PASS_BUILD_LOCKED
- LINE_RELEASE_VISUAL_VERSION=20261026_LOCKED_DERIVATIVE

It also refuses to deploy the pre-lock files line/stt-richmenu.png and line/gcsda-richmenu.png. A future approved release must provide:
- line/release/stt-richmenu-20261026.png + .json
- line/release/gcsda-richmenu-20261026.png + .json

This is a guard only; no LINE API call or live account change is performed.
