# LINE OA RELEASE & ROLLBACK RUNBOOK — 2026-10-26

STATUS: ACTIVE_BUILD RELEASE RUNBOOK  
WEBSITE GATE: BUILD_LOCKED / QA_PASS — SATISFIED  
LIVE EXECUTION: HOLD UNTIL REMAINING RELEASE GATES PASS

## 1. Release entry condition

Do not enter LINE Manager publication until all are true:

1. WEBSITE_STATUS = QA_PASS / BUILD_LOCKED.
2. Final STT Rich Menu PNG is owner-approved.
3. Final GCSDA Rich Menu PNG is owner-approved.
4. GCSDA membership delivery is resolved.
5. Both credential sets are present in secure release environment.
6. Both owner user IDs are bound to the correct OA.
7. `npm run line:future:verify` passes.
8. `npm run line:release:check` passes.

If any condition fails, stop.

## 2. Frozen release identities

### STT
Display name: STT Governance  
Status: 讓重要的事，走得更遠  
Founder: 創辦人暨執行長｜莊鈞翔博士  
English: CHUANG CHUN HSIANG Ph.D.  
Institution line: STT Governance 創辦人暨執行長

Six cells:
1. 開始治理判讀
2. 你正在面對什麼
3. STT 如何判讀
4. 莊鈞翔博士
5. 研究與出版
6. 關於 STT

### GCSDA
Display name: 中華企業策略永續發展學會｜GCSDA  
Status: 策略為先｜治理為本｜管理為終  
Founder: 創會理事長｜莊鈞翔博士  
English: CHUANG CHUN HSIANG Ph.D.  
Institution line: 中華企業策略永續發展學會｜創會理事長

Six cells:
1. 關於學會
2. 創會理事長
3. 會員與入會
4. 活動與大會
5. 知識與研究
6. 章程與公告

## 3. Preflight

Run:

`npm run line:future:verify`

Then, only after all release gates are genuinely satisfied:

`npm run line:release:check`

Never bypass a failing check by editing the script or fabricating environment values.

## 4. Publication order

Release STT and GCSDA separately.

For each account:
1. confirm OA identity in LINE Manager
2. confirm welcome message against approved release package
3. confirm profile fields against LINE-MANAGER-FIELD-MAP
4. create Rich Menu from governed JSON
5. upload owner-approved final PNG
6. set Rich Menu as default
7. record Rich Menu ID and hashes
8. verify six taps on iOS
9. verify six taps on Android
10. verify welcome/follow behavior
11. verify no cross-institution destination
12. verify formal conversion remains website-based

Do not release the second account because the first account passed. Each lane requires its own evidence.

## 5. Webhook activation

Webhook activation occurs only after:
- signature verification is confirmed
- correct account secret is bound
- correct owner user ID is bound
- welcome/follow behavior is approved
- logging excludes confidential narrative

STT endpoint:
https://stt-003.vercel.app/api/line/stt-webhook

GCSDA endpoint:
https://gcsda-governance.vercel.app/api/line/gcsda-webhook

A URL being documented does not mean the endpoint is authorized live.

## 6. E2E minimum

STT:
LINE tap → governed website route → /start submission → receipt ID → detailed delivery → minimal owner notification.

GCSDA:
LINE tap → /membership → application → receipt/delivery → owner/association review notification.

No engagement or membership is approved by LINE conversation alone.

## 7. Rollback triggers

Rollback immediately if:
- wrong institution branding appears
- any of six cells opens the wrong route
- sensitive information is exposed in LINE notification
- webhook signature validation fails
- duplicate welcome messages are generated
- Rich Menu is visually cropped/misaligned on mobile
- GCSDA appears to be an STT subsidiary
- STT appears to be a membership association
- website route is unavailable or no longer the frozen source of truth

## 8. Rollback method

Preferred:
1. unset new default Rich Menu
2. restore the last known-good Rich Menu ID if one exists
3. if none exists, temporarily remove default Rich Menu rather than publish an ungoverned fallback
4. disable webhook delivery if webhook behavior is implicated
5. preserve event evidence without storing sensitive narrative
6. record incident and affected account
7. correct offline
8. rerun full preflight and mobile E2E before republishing

Deprecated files `line/stt-richmenu.png` and `line/gcsda-richmenu.png` must never be used as rollback visuals.

## 9. Completion condition

LINE release is complete only when both accounts separately have:
- approved final visual
- correct default Rich Menu
- six verified mobile actions
- correct welcome message
- correct account identity
- verified webhook signature path if enabled
- owner notification path if enabled
- recorded release evidence
- tested rollback path

Until then:
LIVE_RELEASE = INCOMPLETE
