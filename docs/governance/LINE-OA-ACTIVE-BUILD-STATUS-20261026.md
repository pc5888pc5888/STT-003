# LINE OFFICIAL ACCOUNT ACTIVE BUILD STATUS — 2026-10-26

LINE_PHASE = ACTIVE_BUILD
LIVE_RELEASE = HOLD
WEBSITE_STATUS = BUILD_LOCKED
WEBSITE_QA_STATUS = PASS

## Phase interpretation

The website prerequisite has been satisfied. LINE Official Account work may now continue as an active implementation phase.

LIVE_RELEASE remains blocked until the account-specific release gates are satisfied. ACTIVE_BUILD does not mean live LINE Manager publication is authorized.

## Completed

- STT and GCSDA remain separate account lanes.
- website-derived identity, routing and CTA maps are frozen.
- two owner-review Rich Menu candidates are pinned and hash-verified.
- six-cell action maps are staged.
- welcome messages and deterministic auto-reply matrices are prepared.
- sensitive-data guard is prepared.
- webhook implementations exist but credentials are not bound.
- website attribution fields are implemented.
- release/rollback runbook exists.
- iOS/Android acceptance matrix exists.
- fail-closed promotion/deployment scripts exist.
- static pre-release CI verifies website build lock, candidate integrity, action geometry and identity lock.

## Remaining release gates

1. explicit owner visual approval for the STT Rich Menu candidate
2. explicit owner visual approval for the GCSDA Rich Menu candidate
3. promote approved candidates to line/release/*.png
4. secure STT token / secret / owner user ID
5. secure GCSDA token / secret / owner user ID
6. real GCSDA membership POST E2E delivery evidence
7. live webhook signature-path verification after credentials are bound
8. six Rich Menu taps on iOS and six on Android for each account
9. welcome/follow behavior verification
10. rollback evidence after live publication

## Governance

Locked source backgrounds remain immutable. Candidate derivatives may not be promoted without explicit owner visual approval.

No credential value may be committed to Git.

No LINE conversation constitutes STT formal engagement acceptance or GCSDA membership approval.
