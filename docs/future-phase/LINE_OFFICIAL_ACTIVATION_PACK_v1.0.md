# STT Governance — LINE Official Activation Pack v1.0

Status: FUTURE_PHASE_PREP  
Formal activation: HOLD  
Unlock condition: WEBSITE_STATUS = QA_PASS / BUILD_LOCKED  
Date: 2026-10-26

## 1. Purpose

This package converts the approved LINE future-phase blueprint into an implementation-ready activation specification without changing the live LINE Official Account.

Until the website is QA_PASS / BUILD_LOCKED:

- do not change live LINE settings;
- do not upload or publish the Rich Menu;
- do not change live greeting or auto-response messages;
- do not enable Messaging API automation;
- do not create a second STT positioning, CTA system or content hierarchy.

## 2. Phase-1 Technical Decision

Preferred implementation path after unlock:

- Tool: LINE Official Account Manager
- Menu scope: default Rich Menu
- Messaging API: NOT REQUIRED for Phase 1
- Webhook: OFF for Phase 1 unless separately approved
- Chat: OFF by default unless a staffed human-response model is separately approved
- Greeting message: ON
- Auto-response: ON
- CRM/database: NOT REQUIRED

Reason: the approved LINE architecture only requires a fixed six-cell menu, greeting message, keyword auto-responses and website routing. It does not require per-user menu switching, postback workflows or custom bot logic.

If future requirements need per-user menus, webhook logic or account-specific automation, that must be a separate change request.

## 3. Rich Menu Production Standard

Canvas:
- width: 2500 px
- height: 1686 px
- format: PNG preferred; JPEG allowed
- final file size: <= 1 MB
- layout: 3 columns × 2 rows
- default state: visible when chat opens after activation
- chat bar text: STT Governance

The menu is not to be treated as a sales banner. It is an institutional navigation surface.

### Cell map

| Cell | Bounds (x,y,w,h) | Label | Function |
|---|---:|---|---|
| 01 | 0,0,833,843 | 你正在面對什麼 | Problem recognition |
| 02 | 833,0,834,843 | STT 如何判讀 | Governance method |
| 03 | 1667,0,833,843 | 治理委任 | Formal engagement |
| 04 | 0,843,833,843 | 研究與出版 | Research evidence |
| 05 | 833,843,834,843 | 莊鈞翔博士 | Founder / human authority |
| 06 | 1667,843,833,843 | 開始治理判讀 | Formal intake |

### Final routed URLs

01  
https://stt-003.vercel.app/problems?src=line&entry=richmenu&slot=01

02  
https://stt-003.vercel.app/how-stt-works?src=line&entry=richmenu&slot=02

03  
https://stt-003.vercel.app/engagement?src=line&entry=richmenu&slot=03

04  
https://stt-003.vercel.app/insights?src=line&entry=richmenu&slot=04

05  
https://stt-003.vercel.app/eric-chuang?src=line&entry=richmenu&slot=05

06  
https://stt-003.vercel.app/start?src=line&entry=richmenu&slot=06

## 4. Visual System

Required visual language:

- warm white / ivory base;
- near-black warm gray typography;
- restrained institutional gold;
- thin architectural rules / boundaries / axes;
- generous whitespace;
- no photography required for Phase 1 menu;
- no technology-blue gradient;
- no neon;
- no robot / AI brain / chip / data globe;
- no promotional badges;
- no sales-style highlighted package;
- cell 06 may use the strongest institutional gold rule or seal treatment, but not a promotional color block.

Recommended hierarchy inside each cell:

1. two-digit institutional index (01–06);
2. Chinese primary label;
3. optional short English descriptor in small type only if legibility remains adequate.

Do not add slogans, prices, offer language or secondary CTAs inside the menu.

## 5. Account Response Model

Phase-1 default after unlock:

Greeting message: ON  
Auto-response: ON  
Chat: OFF  
Webhook: OFF

This avoids implying immediate human consultation or real-time professional advice.

If Chat is later enabled:
- response hours and expected response time must be explicitly approved;
- human chat must not promise legal, financial, investment, medical or other regulated conclusions;
- formal governance intake still routes to /start.

## 6. Message Governance

All automatic messages must satisfy:

- informational / routing purpose only;
- no case-specific final judgment;
- no legal / financial / investment / medical conclusion;
- no price promotion;
- no “免費諮詢”;
- no urgency marketing;
- no implied immediate appointment;
- AI is not presented as final decision maker;
- external media remains identified as third-party;
- primary formal CTA remains 開始治理判讀 → /start.

Canonical message copy is stored in:
docs/future-phase/line_official_message_registry_v1.0.yaml

## 7. Attribution Standard

Use only first-party URL parameters for Phase 1:

src=line  
entry=richmenu | greeting | autoreply  
slot=01..06 when applicable  
msg=<message_id> for automatic-message links

Do not add third-party analytics, pixels, CRM or cookies solely for LINE attribution.

## 8. Pre-Activation Inventory

Before any live LINE change, capture and retain:

- account display name;
- LINE Official Account ID / basic ID;
- current profile image;
- current cover image;
- current status message;
- current greeting-message state and full copy;
- current auto-response state and full copy;
- current Chat state;
- current Rich Menu screenshot and destinations;
- Messaging API enabled/disabled state;
- webhook enabled/disabled state;
- current admin/manager access;
- screenshot evidence of all current settings.

If any existing live setting conflicts with the approved LINE blueprint, mark it RECONCILE_REQUIRED before changing it.

## 9. Activation Gate

Activation is permitted only when BOTH are true:

1. WEBSITE_STATUS = QA_PASS
2. WEBSITE_STATUS = BUILD_LOCKED

AND all LINE activation inputs are present.

If either website status is missing, activation stops.

## 10. Activation Sequence

After unlock:

1. capture current LINE state and screenshots;
2. export/copy existing greeting and auto-response text;
3. disable legacy publishing / author-recruitment auto-responses;
4. set approved profile/display identity only if change is required;
5. configure approved greeting message;
6. configure approved keyword auto-responses;
7. upload the approved 2500×1686 Rich Menu image;
8. assign all six URI actions;
9. publish as default Rich Menu;
10. test all six cells on LINE mobile;
11. test greeting on a controlled account;
12. test all keyword groups;
13. verify fallback behavior;
14. verify all website routes and attribution parameters;
15. retain screenshots and QA record.

## 11. Rollback

If activation causes wrong routing, legacy copy leakage, visual failure or duplicate automatic replies:

1. unpublish the new Rich Menu;
2. restore the captured previous Rich Menu state if it was valid;
3. disable the newly changed auto-response set;
4. restore the captured previous greeting only if governance-approved;
5. record the failure and affected setting;
6. do not reactivate until the defect is corrected and re-tested.

## 12. Current State

LINE_STATUS = FUTURE_PHASE_PREP  
ACTIVATION_PACK = READY_FOR_WEBSITE_UNLOCK  
LIVE_LINE_CHANGED = NO  
RICH_MENU_UPLOADED = NO  
LIVE_GREETING_CHANGED = NO  
LIVE_AUTOREPLY_CHANGED = NO  
MESSAGING_API_ENABLED_BY_THIS_WORK = NO
