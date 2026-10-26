# LINE OA FUTURE PHASE PREP — CURRENT PACKAGE INDEX
Date: 2026-10-26
Status: FUTURE_PHASE_PREP / NO LIVE CHANGE

## 1. Purpose

This file is the current entrypoint for LINE Official Account preparation while WEBSITE remains ACTIVE_BUILD.

The websites remain the source of truth. LINE inherits frozen website identity, CTA, route taxonomy and institutional boundaries only after website QA_PASS / BUILD_LOCKED.

## 2. STT Governance lane

Display name:
STT Governance

Status message candidate:
讓重要的事，走得更遠

Founder identity:
創辦人暨執行長｜莊鈞翔博士
CHUANG CHUN HSIANG Ph.D.
STT Governance 創辦人暨執行長

Official Account:
@783xkknh

Rich Menu:
1. 開始治理判讀 → /start
2. 你正在面對什麼 → /problems
3. STT 如何判讀 → /how-stt-works
4. 莊鈞翔博士 → /eric-chuang
5. 研究與出版 → /insights
6. 關於 STT → /about

Welcome-message release candidate:
歡迎加入 STT Governance。

本帳號用於治理資訊、研究出版與正式受理後之關係維護。若你正面對重大決策、企業／家族治理或 AI 決策責任問題，請先由「開始治理判讀」整理情境。

首次提交不需傳送身分證件、金融帳戶、完整契約、醫療資料或其他高敏感文件。LINE 不取代正式治理受理；正式入口以 STT Governance 官網為準。

## 3. GCSDA lane

Display name:
中華企業策略永續發展學會｜GCSDA

Status message candidate:
策略為先｜治理為本｜管理為終

Founder identity:
創會理事長｜莊鈞翔博士
CHUANG CHUN HSIANG Ph.D.
中華企業策略永續發展學會｜創會理事長

Official Account:
@387nbnjs

Rich Menu:
1. 關於學會 → /about
2. 創會理事長 → /founder-chairman
3. 會員與入會 → /membership
4. 活動與大會 → /events
5. 知識與研究 → /knowledge
6. 章程與公告 → /charter

Welcome-message release candidate:
歡迎加入中華企業策略永續發展學會 GCSDA。

本帳號用於會務聯絡、會員申請、活動與治理知識資訊。入會申請請由「會員與入會」進入正式流程；送出申請不代表會員資格成立，後續依章程及正式會務程序審查。

GCSDA 與 STT Governance 為不同機構主體。

## 4. Automation boundary

First release uses deterministic routing only.

Allowed:
- acknowledge
- route by keyword / intent
- provide governed website links
- state privacy / professional boundaries

Not allowed:
- generative case-specific advice
- free consultation framing
- instant engagement acceptance
- automatic membership approval
- price quotation
- high-sensitivity attachment processing

## 5. Rich Menu visual candidates

STT:
line/candidates/stt-richmenu-20261026-owner-review.png

GCSDA:
line/candidates/gcsda-richmenu-20261026-owner-review.png

Current state:
PENDING_OWNER_VISUAL_APPROVAL

These are review candidates only and must not be promoted or published while LINE remains HOLD.

## 6. Remaining inputs before formal release

- WEBSITE_STATUS = QA_PASS / BUILD_LOCKED
- owner visual approval for account-specific Rich Menu
- LINE channel access token
- LINE channel secret
- owner user ID
- webhook signature-path verification
- GCSDA membership POST E2E evidence
- iOS / Android tap-path test
- final welcome-message check against frozen website copy

## 7. Non-drift rule

Do not reuse prior ebook-sales, author-recruitment, instant-booking or publication-funnel LINE structures as the governing architecture.

LINE must remain a governed relationship and routing channel subordinate to the frozen website source of truth.


## 8. Pre-launch frozen input

Human-readable lock:
- docs/future-phase/LINE-OA-PRELAUNCH-FROZEN-INPUT-20261026.md

Machine-readable copy lock:
- line/prep/line-oa-copy-lock-20261026.json

Route-health evidence:
- docs/qa/LINE-OA-ROUTE-HEALTH-20261026.md

Offline validation:
- npm run line:prep:lock

Current state:
PREP_LOCK = READY
LIVE_RELEASE = HOLD
