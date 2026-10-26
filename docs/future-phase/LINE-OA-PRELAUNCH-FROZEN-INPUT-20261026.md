# LINE OA PRE-LAUNCH FROZEN INPUT — 2026-10-26

STATUS: FUTURE_PHASE_PREP_LOCKED
FORMAL_LINE_BUILD: HOLD
LIVE_RELEASE: HOLD

## Purpose

This is the sole human-readable pre-launch handoff for the two LINE Official Accounts.
Website remains the source of truth. No live LINE Manager change is authorized.

## STT Governance

Official Account: @783xkknh

Identity:
- 創辦人暨執行長｜莊鈞翔博士
- CHUANG CHUN HSIANG Ph.D.
- STT Governance 創辦人暨執行長

Rich Menu:
1. 開始治理判讀 → /start
2. 你正在面對什麼 → /problems
3. STT 如何判讀 → /how-stt-works
4. 莊鈞翔博士 → /eric-chuang
5. 研究與出版 → /insights
6. 關於 STT → /about

Formal conversion remains /start.

## GCSDA

Official Account: @387nbnjs

Identity:
- 創會理事長｜莊鈞翔博士
- CHUANG CHUN HSIANG Ph.D.
- 中華企業策略永續發展學會｜創會理事長

Rich Menu:
1. 關於學會 → /about
2. 創會理事長 → /founder-chairman
3. 會員與入會 → /membership
4. 活動與大會 → /events
5. 知識與研究 → /knowledge
6. 章程與公告 → /charter

Formal conversion remains /membership.

## Automation

First release:
DETERMINISTIC_ROUTING_ONLY

Allowed:
- acknowledgement
- keyword/intent routing
- governed website links
- privacy and professional-boundary notices

Forbidden:
- case-specific generative advice
- free-consultation funnel
- instant engagement acceptance
- automatic membership approval
- public price quotation
- high-sensitivity attachment processing

## Visual state

Owner-review candidates remain:
- line/candidates/stt-richmenu-20261026-owner-review.png
- line/candidates/gcsda-richmenu-20261026-owner-review.png

State:
PENDING_OWNER_VISUAL_APPROVAL

Do not promote or publish until WEBSITE_STATUS = QA_PASS / BUILD_LOCKED and explicit owner visual approval exists.

## Machine-readable source

`line/prep/line-oa-copy-lock-20261026.json`

## Current release blockers

1. Website BUILD_LOCK / QA_PASS
2. owner visual approval
3. secure Messaging API credentials
4. authorized owner user IDs
5. GCSDA membership real POST E2E evidence
6. iOS / Android release evidence
