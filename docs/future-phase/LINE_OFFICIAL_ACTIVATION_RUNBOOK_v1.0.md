# STT Governance — LINE Official Activation Runbook v1.0

Status: FUTURE_PHASE_PREP  
Formal activation: HOLD  
Live execution: PROHIBITED UNTIL WEBSITE QA_PASS / BUILD_LOCKED  
Date: 2026-10-26

## A. Gate Check

Do not enter LINE Official Account Manager unless the implementation session is explicitly authorized after website lock.

Required before activation:

- WEBSITE_STATUS = QA_PASS
- WEBSITE_STATUS = BUILD_LOCKED
- approved Rich Menu image exists
- current LINE account inventory captured
- account manager access confirmed
- final greeting approved
- final auto-responses approved
- all six routes verified
- rollback screenshots and old copy captured

If any item is missing: STOP.

## B. Recommended Phase-1 Settings

- Rich Menu: default Rich Menu
- Tool: LINE Official Account Manager
- Greeting: ON
- Auto-response: ON
- Chat: OFF
- Messaging API / webhook: OFF unless separately approved

This configuration is deliberately low-maintenance and does not create a bot platform.

## C. Pre-change Capture

Record:

1. display name
2. basic ID
3. status message
4. profile image
5. cover image
6. current Rich Menu
7. all current Rich Menu links
8. greeting message
9. auto-response messages and keywords
10. Chat setting
11. Messaging API state
12. webhook state
13. account managers/admins

Save screenshots before making any change.

## D. Legacy Reconciliation

Search existing account configuration for:

- 電子書銷售
- 限時福利
- 30 天出書
- 作者招募
- 採訪出書
- 預約總監
- 免費諮詢
- course / training funnel language
- any CTA that bypasses /start as the formal governance intake

Mark each finding:
KEEP / REPLACE / DISABLE / DELETE_AFTER_APPROVAL.

No deletion without captured rollback evidence.

## E. Build Order

1. Create the approved Rich Menu draft in LINE Official Account Manager.
2. Upload approved 2500×1686 PNG/JPEG.
3. Define six tap areas using the geometry registry.
4. Assign the six approved tracked URLs.
5. Do not publish yet.
6. Enter the approved greeting.
7. Enter six keyword auto-response groups.
8. Enter fallback behavior.
9. Confirm Chat remains OFF unless approved.
10. Preview all settings.
11. Publish Rich Menu.
12. Enable greeting / auto-response.
13. Test using a controlled LINE account.

## F. Acceptance Test

Test from LINE mobile:

- add/follow account and receive one greeting only;
- menu opens correctly;
- each of six cells opens the correct STT website route;
- parameters src=line, entry, slot/msg persist in URL;
- no menu label wraps into unreadable form;
- no legacy publishing recruitment copy appears;
- keyword reply fires only for intended keywords;
- no duplicate reply from Chat/webhook/auto-response overlap;
- founder reply says 創辦人暨執行長;
- AI reply preserves human-decision boundary;
- fallback routes to website, not to an implied consultation;
- /start remains the only formal intake CTA.

## G. Rollback

Rollback immediately if:

- wrong route;
- duplicate automatic messages;
- old funnel remains visible;
- Rich Menu image is cropped or illegible;
- formal title is wrong;
- live chat creates unstaffed response expectations;
- any message implies a professional conclusion.

Rollback order:

1. unpublish new Rich Menu;
2. disable changed auto-responses;
3. restore captured previous valid state if appropriate;
4. document failure;
5. correct in staging/prep;
6. re-run acceptance before reactivation.

## H. Evidence Package

Final LINE acceptance must retain:

- before screenshots;
- after screenshots;
- Rich Menu image source;
- Rich Menu six-area map;
- final greeting copy;
- final auto-response registry;
- route test record;
- activation date/time;
- operator;
- rollback record if any;
- QA_PASS sign-off.

## I. Current Status

RUNBOOK_READY = YES  
LIVE_EXECUTION_AUTHORIZED = NO  
WEBSITE_UNLOCK_CONFIRMED = NO  
LINE_LIVE_CHANGED = NO
