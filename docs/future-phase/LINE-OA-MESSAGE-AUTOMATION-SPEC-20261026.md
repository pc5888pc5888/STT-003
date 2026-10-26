# LINE OA MESSAGE AUTOMATION SPEC — 2026-10-26

STATUS: ACTIVE_BUILD IMPLEMENTATION SPEC
WEBSITE GATE: QA_PASS / BUILD_LOCKED — SATISFIED\nLIVE RELEASE: HOLD UNTIL REMAINING RELEASE GATES PASS
SCOPE: formal deterministic routing implementation; live credential binding/publication remains gated

This specification governs the active-build implementation for both LINE lanes. Deterministic webhook routing may be implemented and deployed in fail-closed mode; live LINE Manager publication, production credential binding and outbound campaigns remain release-gated.

## 1. Governing principle

LINE is a governed private relationship and routing channel.

It must not become:
- a free-consultation chat
- an unstructured substitute for STT /start
- a substitute for GCSDA /membership
- an AI decision service
- a place to request high-sensitivity documents by default
- a second brand system separate from the websites

The website remains the public source of truth.

## 2. Account identity lock

### STT Governance

Official Account ID:
@783xkknh

Add-friend:
https://line.me/R/ti/p/@783xkknh

Primary founder identity:
創辦人暨執行長｜莊鈞翔博士

English name:
CHUANG CHUN HSIANG Ph.D.

Institution line:
STT Governance 創辦人暨執行長

### GCSDA

Official Account ID:
@387nbnjs

Add-friend:
https://line.me/R/ti/p/@387nbnjs

Primary founder-chairman identity:
創會理事長｜莊鈞翔博士

English name:
CHUANG CHUN HSIANG Ph.D.

Institution line:
中華企業策略永續發展學會｜創會理事長

Institutional separation is mandatory.

## 3. STT welcome message — release candidate

歡迎加入 STT Governance。

本帳號用於治理資訊、研究出版與正式受理後之關係維護。若你正面對重大決策、企業／家族治理或 AI 決策責任問題，請先由「開始治理判讀」整理情境。

首次提交不需傳送身分證件、金融帳戶、完整契約、醫療資料或其他高敏感文件。LINE 不取代正式治理受理；正式入口以 STT Governance 官網為準。

## 4. GCSDA welcome message — release candidate

歡迎加入中華企業策略永續發展學會 GCSDA。

本帳號用於會務聯絡、會員申請、活動與治理知識資訊。入會申請請由「會員與入會」進入正式流程；送出申請不代表會員資格成立，後續依章程及正式會務程序審查。

GCSDA 與 STT Governance 為不同機構主體。

## 5. STT deterministic auto-reply matrix

The first release must use deterministic routing. Do not use a generative AI answer layer for case-specific advice.

| Intent / keyword group | Reply purpose | Governed destination |
|---|---|---|
| 問題、怎麼開始、不知道從哪開始 | identify current situation before discussing solutions | /problems |
| 開始、送件、正式受理、治理判讀 | formal intake | /start |
| 判讀、方法、STT 如何判讀 | explain method | /how-stt-works |
| 委任、合作、正式合作、治理介入 | explain engagement structure | /engagement |
| 莊鈞翔、莊博士、創辦人、執行長 | founder profile | /eric-chuang |
| 研究、文章、出版、著作 | research/publication | /insights |
| 關於 STT、STT 是什麼 | institutional identity | /about |
| 機構合作、律師、會計、信託、家族辦公室 | professional/institutional cooperation | /institutions |
| 隱私、資料、個資 | privacy notice | /privacy |
| 法律、稅務、投資、醫療、專業意見 | boundary notice before any case-specific discussion | /professional-boundary |

All routed website links should carry:
utm_source=line
utm_medium=oa
utm_campaign=stt_autoreply

## 6. STT default reply — release candidate

這裡是 STT Governance 官方 LINE。

若你正在處理重大決策、企業治理、家族治理或 AI 決策責任問題，建議先從「你正在面對什麼」確認問題類型；如需正式進入受理程序，請使用「開始治理判讀」。

為降低不必要的資料暴露，請先不要在 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。

## 7. GCSDA deterministic auto-reply matrix

| Intent / keyword group | Reply purpose | Governed destination |
|---|---|---|
| 入會、會員、申請 | formal membership route | /membership |
| 活動、大會、講座 | association events | /events |
| 章程、公告 | formal rules/notices | /charter |
| 莊鈞翔、莊博士、創會理事長 | founder-chairman profile | /founder-chairman |
| 組織治理、理監事、權責 | association governance | /governance |
| 聯席會、策略治理 | strategic governance council | /council |
| 研究、知識 | knowledge/research | /knowledge |
| 關於學會、GCSDA 是什麼 | institutional identity | /about |
| STT、STT Governance | clarify separate institution; no implied subsidiary relationship | https://stt-003.vercel.app/ |

All GCSDA website links should carry:
utm_source=line
utm_medium=oa
utm_campaign=gcsda_autoreply

## 8. GCSDA default reply — release candidate

這裡是中華企業策略永續發展學會 GCSDA 官方 LINE。

會員申請請由「會員與入會」進入正式流程；活動、研究、組織治理及章程公告，請使用下方學會入口。

請勿以 LINE 訊息取代正式入會申請或正式會務程序。

## 9. Sensitive-data guard

Active-build webhook behavior:

### Text
If a user starts sending detailed case facts, the system may acknowledge receipt but must route to the formal website flow rather than solicit additional confidential detail in chat.

### Image / file / audio / video
Default first-release reply:
「為降低不必要的資料暴露，請先不要透過 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。若需正式受理，請依官網流程進行。」

Do not automatically download, persist, summarize or send attachments to an AI model in the first release.

## 10. Human follow-up rule

The automatic layer may:
- acknowledge
- classify by deterministic intent
- route
- provide formal website links
- state institutional boundaries

The automatic layer must not:
- promise immediate human response
- promise acceptance of an engagement or membership
- provide case-specific legal, tax, investment, medical or other regulated advice
- quote a price or create a payment obligation
- imply that a LINE message itself constitutes formal intake or approval

When a user requests human contact, route to the applicable formal website process first.

## 11. Webhook event policy — active implementation

STT:
- follow -> STT welcome message
- text message -> deterministic router
- image/file/audio/video -> sensitive-data guard
- unfollow -> no outbound reply
- unknown event -> no case-specific automated answer

GCSDA:
- follow -> GCSDA welcome message
- text message -> deterministic router
- image/file/audio/video -> sensitive-data guard
- unfollow -> no outbound reply
- unknown event -> no case-specific automated answer

Webhook signature verification is mandatory before event processing.

## 12. Owner alert policy

Future owner push notifications may contain only minimum non-sensitive event metadata.

Allowed example:
STT 新治理送件｜GOV-xxxx｜重大決策｜請查正式收件內容

Not allowed in push:
- full case narrative
- identification numbers
- financial account data
- medical information
- complete contracts
- high-sensitivity attachments

## 13. Rich-menu relationship

This message specification does not change the locked six-cell architecture.

STT:
1. 開始治理判讀
2. 你正在面對什麼
3. STT 如何判讀
4. 莊鈞翔博士
5. 研究與出版
6. 關於 STT

GCSDA:
1. 關於學會
2. 創會理事長
3. 會員與入會
4. 活動與大會
5. 知識與研究
6. 章程與公告

## 14. Technical release rules

Before live activation:
- WEBSITE_STATUS = QA_PASS / BUILD_LOCKED
- final rich-menu derivative visually approved
- both release JSON maps pass offline QA
- official account identities reverified
- channel tokens/secrets supplied outside repository
- webhook signatures verified
- STT and GCSDA credentials kept separate
- iOS / Android link tests complete
- welcome and fallback messages checked against final website copy
- no high-sensitivity attachment automation enabled

## 15. Platform verification notes

Current LINE Messaging API documentation confirms:
- rich menus can use URI and other actions
- Messaging API rich menus are separate from LINE Official Account Manager-created rich menus
- webhook events are delivered when users follow or message the account
- webhook signature verification is required
- asynchronous webhook processing is recommended

Official references:
- https://developers.line.biz/en/docs/messaging-api/rich-menus-overview/
- https://developers.line.biz/en/docs/messaging-api/receiving-messages/

## 16. Release status

PROFILE COPY: PREPARED
WELCOME COPY: PREPARED
RICH MENU ACTION MAP: PREPARED
RICH MENU FINAL PNG: PENDING OWNER VISUAL APPROVAL
AUTO-REPLY MATRIX: PREPARED
SENSITIVE-DATA GUARD: PREPARED
WEBHOOK IMPLEMENTATION: BUILT / LIVE CREDENTIAL ACTIVATION: HOLD
LINE MANAGER PUBLICATION: HOLD
