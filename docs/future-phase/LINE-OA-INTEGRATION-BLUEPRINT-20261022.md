# CURRENT PROJECT OVERRIDE — 2026-10-26

STATUS: LINE = HOLD / FUTURE_PHASE_INPUT ONLY

The earlier 2026-10-25 activation record is superseded for the current project phase. The owner has selected and locked two six-grid background assets, but live LINE Official Account construction/release remains gated by WEBSITE_STATUS = QA_PASS / BUILD_LOCKED.

Allowed now: asset governance, layout/action-map preparation, QA/release documentation.
Not allowed now: LINE Manager publication, live rich-menu replacement, live profile/welcome-message change, credential binding, live webhook activation.

Locked visuals:
- STT: LINE_STT_6GRID_BG_LOCKED_20261026.png
- GCSDA: LINE_GCSDA_6GRID_BG_LOCKED_20261026.png

See:
- docs/future-phase/LINE-OA-SIX-GRID-ASSET-LOCK-20261026.md
- docs/future-phase/LINE-OA-SIX-GRID-DERIVATIVE-SPEC-20261026.md

---

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


---

# Integrated Conversion & Notification Architecture — 2026-10-25

Status: FUTURE PHASE INPUT / WEBSITE-SIDE PREPARATION ALLOWED / LINE MANAGER RELEASE STILL GATED

## 1. Four endpoints, two institutional lanes

The system must operate as two separate institutional conversion lanes:

### STT lane
STT website → formal governance intake → STT LINE OA relationship → owner notification → engagement acceptance → optional payment.

### GCSDA lane
GCSDA website → membership application → GCSDA LINE OA relationship → owner/association notification → qualification review → membership approval → optional dues payment.

The two lanes may share technical infrastructure, but they must never share public identity, copy, rich menu, membership/service status, or legal meaning.

## 2. Website remains the source of truth

LINE is not the place where formal governance intake or membership approval is completed.

- STT formal intake remains: /start
- GCSDA formal membership application remains: /membership
- LINE rich-menu actions route back to the correct governed website page.
- LINE messages may acknowledge, remind, or route, but must not turn into an unstructured substitute for formal intake.
- Sensitive documents are not requested through LINE by default.

## 3. Unified event envelope

Every conversion-worthy action should produce an internal event with a receipt ID.

Minimum event types:

- STT_GOVERNANCE_INTAKE_CREATED
- STT_ENGAGEMENT_APPROVED
- GCSDA_MEMBERSHIP_APPLICATION_CREATED
- GCSDA_MEMBERSHIP_APPROVED
- ORDER_CREATED
- PAYMENT_REQUESTED
- PAYMENT_SUCCEEDED
- PAYMENT_FAILED

Minimum non-sensitive event metadata:

- receipt_id
- institution
- event_type
- submitted_at
- contact_name
- contact_channel
- source_channel
- source_account
- landing_route
- utm_source
- utm_medium
- utm_campaign

Detailed intake content remains in the formal delivery channel; LINE owner alerts should contain only enough information to identify and act on the event.

## 4. Owner notification rule

For every high-value event, use dual notification:

1. Detailed email delivery.
2. Short LINE push notification to the owner from the corresponding Official Account.

Examples:

STT:
「STT 新治理送件｜GOV-xxxx｜重大決策｜請查正式收件內容」

GCSDA:
「GCSDA 新入會申請｜GCSDA-xxxx｜申請人：○○｜請進行資格審查」

Payment:
「付款完成｜PAY-xxxx｜TWD ○○○○｜來源：STT / GCSDA」

LINE notifications must not include sensitive narrative, financial-account information, IDs, medical data, or full confidential case descriptions.

## 5. Messaging API wiring

Each Official Account requires its own Messaging API configuration.

Required per account:
- verified Official Account identity
- Messaging API enabled
- channel access credentials
- webhook signing secret
- owner user ID available to that channel

Owner user ID acquisition flow:
1. Owner adds the relevant Official Account.
2. Owner sends a controlled setup message.
3. Website backend receives the webhook.
4. Backend verifies LINE signature.
5. Owner user ID is recorded as the authorized notification target for that institution.

Do not reuse an STT recipient identity as a GCSDA public identity.

## 6. Minimal backend design

Do not build a CRM first.

Keep the existing formal endpoints:
- STT: /api/cooperation-submit
- GCSDA: /api/gcsda-membership-submit

Add one shared internal notification function:
- sendOwnerEventNotification(event)

Later, when LINE credentials are supplied, that function can fan out to:
- email
- STT LINE push, or
- GCSDA LINE push

Add only two webhook endpoints when LINE Manager release begins:
- /api/line/stt-webhook
- /api/line/gcsda-webhook

Webhook signature verification is mandatory.

## 7. Current delivery gap

STT:
- production email delivery is configured.
- website governance intake already has receipt IDs.

GCSDA:
- membership form exists.
- production membership email delivery is not yet configured.
- until the recipient and mail configuration are supplied, the current fallback remains the GCSDA LINE contact route.

Therefore GCSDA cannot be considered conversion-complete until membership delivery is resolved.

## 8. LINE Pay role

LINE Pay is a payment rail, not the governance-intake or membership-approval mechanism.

Recommended institutional sequence:

### STT
governance intake → suitability review → scope/mandate accepted → amount confirmed → payment request → payment confirmation → owner notification

Never:
public visitor → instant payment → implied governance engagement

### GCSDA
membership application → qualification review → approval → dues amount confirmed → payment request → payment confirmation → membership activation

Never:
payment → automatic membership qualification

### Publications / orders
If a future STT-controlled product or publication checkout exists:
order created → LINE Pay request → confirm → order paid → owner notification

Do not add a shopping cart merely to enable LINE Pay.

## 9. Payment event states

Use explicit status separation:

- CREATED
- REVIEW_REQUIRED
- APPROVED_FOR_PAYMENT
- PAYMENT_REQUESTED
- PAID
- FAILED
- REFUNDED / CANCELLED

No governance engagement or GCSDA membership becomes effective merely because a payment state is PAID unless the relevant institutional approval state is also satisfied.

## 10. Cross-channel linkage

STT website:
- links to STT LINE OA only for STT relationship / follow-up
- formal conversion remains /start

GCSDA website:
- links to GCSDA LINE OA only for association relationship / membership support
- formal conversion remains /membership

Cross-institution links:
- clearly labelled as separate institutions
- never pass a user into the other institution's LINE account without an explicit, labelled action

## 11. Attribution

The formal intake/membership forms should retain privacy-minimized attribution:

- source_channel = website / line
- source_account = stt / gcsda
- landing_route
- utm_source
- utm_medium
- utm_campaign

This is enough to know whether a conversion came from the website or the relevant LINE OA without deploying a heavy tracking stack.

## 12. Required inputs before live integration

SOURCE_REQUIRED:
- verified STT LINE Official Account ID and add-friend URL
- STT Messaging API credentials
- GCSDA Messaging API credentials
- authorized owner user ID for each account
- GCSDA formal membership notification recipient
- LINE Pay merchant approval and merchant integration credentials, if payment is activated
- approved membership dues/payment policy
- approved STT post-engagement payment policy

## 13. Release sequence

A. Finish current website copy/visual QA and BUILD_LOCK.
B. Resolve GCSDA membership delivery.
C. Add privacy-minimized attribution to both formal forms.
D. Enable Messaging API for each OA and verify webhook signatures.
E. Bind owner notification target for each OA.
F. Test website event → email + LINE owner alert.
G. Publish STT OA profile / welcome / rich menu.
H. Publish GCSDA OA profile / welcome / rich menu.
I. If approved, add LINE Pay only after the relevant institutional approval step.
J. Run end-to-end test for intake, membership, payment success/failure, and notification.

The system is not considered complete until a test submission can be traced from source channel to website receipt ID to owner notification and, where applicable, payment status.

## Founder profile input — 2026-10-25

Status: FUTURE PHASE INPUT ONLY / DO NOT PUBLISH BEFORE WEBSITE BUILD_LOCK

The two LINE Official Accounts must use the same verified current-position registry as the websites. Listing a role means Dr. Chuang currently holds that role; it must not be interpreted as ownership, founder status, or legal control of that institution unless the role itself explicitly states so.

Current positions:
- 策略智庫數媒出版｜創辦人暨執行長
- 策略智庫數媒新聞｜法遵長暨營運長
- 策略智庫數媒新聞｜專家評論發行人
- 中華企業策略永續發展學會｜創會理事長
- 臺灣厝文化發展協會｜永續長
- 數位媒體法遵暨審查委員會｜主委
- Ｍ傳媒法律策略專欄｜特約評論
- 逢甲大學商學院｜兼任助理教授

STT LINE OA profile principle:
- primary identity: 創辦人暨執行長｜莊鈞翔博士
- show selected current positions when profile space permits
- distinguish founder/executive roles from appointments at other organizations
- do not imply every listed institution is STT-owned or founded by Dr. Chuang

GCSDA LINE OA profile principle:
- primary identity: 創會理事長｜莊鈞翔博士
- the same current-position registry may be shown as personal professional context
- GCSDA remains an independent association
- external appointments must not be presented as GCSDA subsidiaries or controlled entities

Release remains gated by WEBSITE_STATUS = QA_PASS / BUILD_LOCKED.

## Approved founder profile copy for future LINE release — 2026-10-25

Status: FUTURE PHASE INPUT ONLY / DO NOT PUBLISH BEFORE WEBSITE QA_PASS / BUILD_LOCKED

### STT LINE Official Account — approved founder introduction

Primary identity:
創辦人暨執行長｜莊鈞翔博士

English name:
CHUANG CHUN HSIANG Ph.D.

Institution line:
STT Governance 創辦人暨執行長

Current professional positions:
- 策略智庫數媒出版｜創辦人暨執行長
- 策略智庫數媒新聞｜法遵長暨營運長
- 策略智庫數媒新聞｜專家評論發行人
- 中華企業策略永續發展學會｜創會理事長
- 臺灣厝文化發展協會｜永續長
- 數位媒體法遵暨審查委員會｜主委
- Ｍ傳媒法律策略專欄｜特約評論
- 逢甲大學商學院｜兼任助理教授

Relationship note:
上述職務分屬各自機構或法人。列示僅表示莊鈞翔博士之現任職務，不代表各機構均由莊博士創設、亦不代表均屬 STT Governance 所有。

### GCSDA LINE Official Account — approved founder-chairman introduction

Primary identity:
創會理事長｜莊鈞翔博士

English name:
CHUANG CHUN HSIANG Ph.D.

Institution line:
中華企業策略永續發展學會｜創會理事長

Current professional positions:
- 策略智庫數媒出版｜創辦人暨執行長
- 策略智庫數媒新聞｜法遵長暨營運長
- 策略智庫數媒新聞｜專家評論發行人
- 中華企業策略永續發展學會｜創會理事長
- 臺灣厝文化發展協會｜永續長
- 數位媒體法遵暨審查委員會｜主委
- Ｍ傳媒法律策略專欄｜特約評論
- 逢甲大學商學院｜兼任助理教授

Relationship note:
上述職務分屬各自機構或法人。GCSDA 為獨立專業學會；列示其他職務僅作莊鈞翔博士之專業背景，不代表相關機構為 GCSDA 之子單位、附屬機構或受其控制。

Publication gate:
- do not publish in LINE Manager before WEBSITE_STATUS = QA_PASS / BUILD_LOCKED
- once the gate passes, these exact identity lines and current-position registry become the profile source of truth for the two LINE Official Accounts


## Regression quarantine — 2026-10-25

Status: FUTURE PHASE INPUT ONLY / NO LINE MANAGER CHANGE

The BUILD_LOCKED website, not any older LINE marketing draft, will be the visual and copy source of truth.

The following pre-governance patterns are explicitly non-authoritative and must not be reused in the future LINE release:
- sales-funnel or limited-time-benefit language
- instant-consultation / instant-booking framing
- generic technology-blue / SaaS / neon visual language
- publication-recruitment menus presented as the primary STT Governance identity
- any rich menu or welcome message that creates a second STT positioning system

Future STT and GCSDA LINE surfaces must inherit from the final website CIS:
- warm ivory / institutional gold / near-black warm gray
- the frozen website typography hierarchy
- the exact founder identity lines approved in this blueprint
- the same institution separation rules
- the website CTA and content taxonomy after BUILD_LOCK

No live LINE OA modification is authorized by this audit. Release remains gated by WEBSITE_STATUS = QA_PASS / BUILD_LOCKED.


## Message automation continuation — 2026-10-26

A deterministic message-routing and sensitive-data guard specification has been prepared as FUTURE_PHASE_INPUT:
- docs/future-phase/LINE-OA-MESSAGE-AUTOMATION-SPEC-20261026.md

This does not authorize live LINE Manager changes or webhook activation.
