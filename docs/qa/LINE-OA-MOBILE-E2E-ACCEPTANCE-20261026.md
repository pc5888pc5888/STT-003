# LINE OA MOBILE E2E ACCEPTANCE — 2026-10-26

STATUS: FUTURE_PHASE QA SPEC  
EXECUTION: AFTER WEBSITE BUILD_LOCK AND AUTHORIZED LINE RELEASE

## Test devices

Required:
- one current iOS LINE client
- one current Android LINE client

PC is not an acceptance surface for Rich Menu.

## Shared visual acceptance

For each OA on each mobile platform:
- Rich Menu opens without crop, stretch or blurred scaling
- all six cells are legible
- no cell label crosses cell boundaries
- tappable area corresponds to visible cell
- chat-bar label matches the account
- no deprecated pre-lock image appears

## STT tap matrix

| Cell | Label | Expected destination |
|---|---|---|
| 1 | 開始治理判讀 | /start + governed LINE UTM |
| 2 | 你正在面對什麼 | /problems + governed LINE UTM |
| 3 | STT 如何判讀 | /how-stt-works + governed LINE UTM |
| 4 | 莊鈞翔博士 | /eric-chuang + governed LINE UTM |
| 5 | 研究與出版 | /insights + governed LINE UTM |
| 6 | 關於 STT | /about + governed LINE UTM |

Acceptance:
- no cell opens GCSDA
- no sales funnel replaces /start
- founder identity remains 創辦人暨執行長｜莊鈞翔博士
- formal intake occurs on website, not inside free-form LINE chat

## GCSDA tap matrix

| Cell | Label | Expected destination |
|---|---|---|
| 1 | 關於學會 | /about + governed LINE UTM |
| 2 | 創會理事長 | /founder-chairman + governed LINE UTM |
| 3 | 會員與入會 | /membership + governed LINE UTM |
| 4 | 活動與大會 | /events + governed LINE UTM |
| 5 | 知識與研究 | /knowledge + governed LINE UTM |
| 6 | 章程與公告 | /charter + governed LINE UTM |

Acceptance:
- no cell opens STT as if it were the parent institution
- founder identity remains 創會理事長｜莊鈞翔博士
- membership application remains subject to formal review

## Welcome/follow test

For each account:
1. remove/add or use controlled test account
2. trigger follow event
3. receive exactly the approved welcome message
4. confirm no request for ID document, bank data, complete contract, medical record or other high-sensitivity document
5. confirm message directs user to governed website route
6. confirm no generative case advice is emitted

## Webhook negative tests

For each live-authorized endpoint:
- POST without x-line-signature → reject
- POST with invalid signature → reject
- malformed JSON after valid signature → reject safely
- duplicate event delivery → must not create duplicated institutional action
- event for wrong institutional account → must not be processed under other account credentials

## Conversion trace test

STT:
source=line → source_account=stt → governed landing route → /start → receipt ID → owner notification.

GCSDA:
source=line → source_account=gcsda → governed landing route → /membership → application receipt/delivery → review notification.

Privacy requirement:
LINE owner alerts contain only minimum event metadata needed to identify the event. Confidential narrative remains in the formal delivery path.

## Evidence record

For every tested cell record:
- account
- OS
- LINE app version
- date/time
- cell number
- destination
- PASS/FAIL
- screenshot reference
- tester
- notes

Do not record access tokens, secrets or raw confidential user payloads in QA evidence.

## Acceptance result

STT_LINE_MOBILE_E2E = PASS only when 12/12 cell tests pass across iOS + Android and shared welcome/conversion controls pass.

GCSDA_LINE_MOBILE_E2E = PASS only when 12/12 cell tests pass across iOS + Android and membership controls pass.

A single wrong destination, wrong institution identity or sensitive-data breach is a release blocker.
