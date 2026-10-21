# FUTURE PHASE INPUT — LINE Official Account Integration Blueprint
Date: 2026-10-22
Status: HOLD UNTIL WEBSITE G10 PASS
Manager entrypoint supplied by owner: https://manager.line.biz/

## Governance rule

LINE is a private relationship / authorization channel. It does not replace the website as the formal source of truth or STT /start as the formal governance intake.

STT Governance and GCSDA must remain separate institutional identities. Do not use one rich menu, welcome message or account description that makes GCSDA appear to be an STT subsidiary or makes STT appear to be a membership association.

## STT LINE OA — proposed role

Purpose:
- maintain authorized private relationship after a visitor understands STT
- route users back to governed website pages
- notify followers of new research/publication
- support post-intake follow-up without turning LINE into free consultation

Required account fact before build:
- SOURCE_REQUIRED: verified STT LINE Official Account ID / add-friend URL

Proposed rich menu:
1. 開始治理判讀 → https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu
2. 你正在面對什麼 → https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu
3. STT 如何判讀 → https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu
4. 莊鈞翔博士 → https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu
5. 研究與出版 → https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu
6. 關於 STT → https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Welcome-message principles:
- no 免費諮詢 / 立即預約 / 限時 / 銷售話術
- explain that major matters should first be organized through the formal governance intake
- no request for sensitive documents in LINE
- AI must not be presented as final decision maker

## GCSDA LINE OA — proposed role

Current public association LINE add-friend route in site code:
https://line.me/R/ti/p/@387nbnjs

Purpose:
- membership and association contact
- meeting/event notifications
- formal association information
- governance knowledge distribution

Proposed rich menu:
1. 關於學會 → https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu
2. 創會理事長 → https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu
3. 會員與入會 → https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu
4. 活動與大會 → https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu
5. 知識與研究 → https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu
6. 章程與公告 → https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Welcome-message principles:
- identify GCSDA as an independent professional association
- membership questions route to /membership
- no STT governance-service sales language
- if STT is linked, label it as a separate institution

## Attribution

Before LINE launch, add privacy-minimized source attribution to formal intake:
- utm_source
- utm_medium
- utm_campaign
- landing route

Do not deploy heavy CRM, tracking pixels or hidden profiling by default.

## Release gate

Do not publish LINE changes until:
- WEBSITE_STATUS = QA_PASS / BUILD_LOCKED
- STT controlled intake test passed
- GCSDA membership delivery decision is resolved
- final mobile/desktop visual QA passed
- official STT LINE account identity is verified

## Manager execution

Once the release gate passes, implementation in manager.line.biz should follow this blueprint exactly:
- account profile
- welcome message
- rich menu
- website links
- source tags
- test on iOS / Android
- verify each link resolves to correct institution
