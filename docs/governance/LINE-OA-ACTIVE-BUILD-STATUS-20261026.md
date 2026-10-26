# LINE OFFICIAL ACCOUNT CURRENT GOVERNANCE STATUS — 2026-10-26

LINE_STATUS = FUTURE_PHASE_PREP
FORMAL_LINE_BUILD = HOLD
LIVE_RELEASE = HOLD
WEBSITE_PHASE = ACTIVE_BUILD

## Current project override

This document supersedes any earlier LINE_ACTIVE_BUILD interpretation.

Under the current Project Instructions:
- WEBSITE remains the active construction priority.
- LINE Official Account formal modification remains HOLD until WEBSITE_STATUS = QA_PASS / BUILD_LOCKED.
- Only non-live preparation is authorized.

## Authorized work while HOLD

Allowed:
- account identity lock
- website-derived CTA / route mapping
- Rich Menu information architecture
- owner-review candidate preparation
- welcome-message drafting
- deterministic auto-reply routing
- sensitive-data guard specification
- release / rollback documentation
- credential contract design
- offline/static QA

Not allowed:
- LINE Manager publication
- live Rich Menu replacement
- live account profile change
- live welcome-message change
- production credential binding
- live webhook activation
- LINE Pay activation
- outbound campaign launch

## Institutional lanes

### STT Governance

Official Account ID:
@783xkknh

Add-friend:
https://line.me/R/ti/p/@783xkknh

Founder identity lock:
創辦人暨執行長｜莊鈞翔博士
CHUANG CHUN HSIANG Ph.D.
STT Governance 創辦人暨執行長

Formal website intake remains:
/start

Rich Menu IA:
1. 開始治理判讀
2. 你正在面對什麼
3. STT 如何判讀
4. 莊鈞翔博士
5. 研究與出版
6. 關於 STT

### GCSDA

Official Account ID:
@387nbnjs

Add-friend:
https://line.me/R/ti/p/@387nbnjs

Founder identity lock:
創會理事長｜莊鈞翔博士
CHUANG CHUN HSIANG Ph.D.
中華企業策略永續發展學會｜創會理事長

Formal membership route remains:
/membership

Rich Menu IA:
1. 關於學會
2. 創會理事長
3. 會員與入會
4. 活動與大會
5. 知識與研究
6. 章程與公告

## Candidate visual state

STT:
line/candidates/stt-richmenu-20261026-owner-review.png
Status: PENDING_OWNER_VISUAL_APPROVAL

GCSDA:
line/candidates/gcsda-richmenu-20261026-owner-review.png
Status: PENDING_OWNER_VISUAL_APPROVAL

Do not promote either candidate into release assets while LINE remains HOLD.

## Current preparation package

Primary references:
- docs/future-phase/LINE-OA-INTEGRATION-BLUEPRINT-20261022.md
- docs/future-phase/LINE-OA-MESSAGE-AUTOMATION-SPEC-20261026.md
- docs/future-phase/LINE-OA-SIX-GRID-ASSET-LOCK-20261026.md
- docs/future-phase/LINE-OA-OWNER-REVIEW-CANDIDATES-20261026.md
- docs/line/LINE-MANAGER-FIELD-MAP-20261025.md
- docs/line/STT-LINE-OA-RELEASE-PACKAGE-20261025.md
- docs/line/GCSDA-LINE-OA-RELEASE-PACKAGE-20261025.md
- docs/qa/LINE-OA-FUTURE-PACKAGE-READINESS-20261026.md

## Release gate

Formal LINE build may begin only after:
WEBSITE_STATUS = QA_PASS / BUILD_LOCKED

Live release additionally requires:
- owner visual approval of final Rich Menu for the relevant OA
- secure account-specific credentials
- owner user ID binding
- webhook signature verification
- mobile tap-path validation
- institution-specific E2E delivery evidence

No LINE conversation constitutes STT formal engagement acceptance or GCSDA membership approval.
