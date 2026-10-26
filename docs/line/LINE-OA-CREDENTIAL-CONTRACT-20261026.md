# LINE OA CREDENTIAL & RELEASE CONTRACT — 2026-10-26

STATUS: ACTIVE_BUILD  
WEBSITE GATE: BUILD_LOCKED / QA_PASS — SATISFIED  
LIVE RELEASE: HOLD UNTIL VISUAL APPROVAL, SECURE CREDENTIAL BINDING, GCSDA POST E2E AND RELEASE QA

## 1. Purpose

This document defines the minimum secure configuration required to release the two LINE Official Accounts without placing secrets in Git.

No credential value belongs in repository files, screenshots, issue comments, commit messages, or public documentation.

## 2. Institutional separation

### STT Governance
- LINE OA ID: @783xkknh
- Add-friend: https://line.me/R/ti/p/@783xkknh
- Primary identity: 創辦人暨執行長｜莊鈞翔博士
- Website source of truth: https://stt-003.vercel.app/

Required secure variables:
- LINE_STT_CHANNEL_ACCESS_TOKEN
- LINE_STT_CHANNEL_SECRET
- LINE_STT_OWNER_USER_ID

### GCSDA
- LINE OA ID: @387nbnjs
- Add-friend: https://line.me/R/ti/p/@387nbnjs
- Primary identity: 創會理事長｜莊鈞翔博士
- Website source of truth: https://gcsda-governance.vercel.app/

Required secure variables:
- LINE_GCSDA_CHANNEL_ACCESS_TOKEN
- LINE_GCSDA_CHANNEL_SECRET
- LINE_GCSDA_OWNER_USER_ID

Do not reuse one account's token, secret, owner binding, public identity, welcome copy, or Rich Menu in the other institutional lane.

## 3. Release-gate variables

The release process must fail closed unless all are explicitly supplied:

- LINE_RELEASE_GATE=WEBSITE_QA_PASS_BUILD_LOCKED
- LINE_RELEASE_VISUAL_VERSION=20261026_LOCKED_DERIVATIVE
- GCSDA_MEMBERSHIP_DELIVERY_GATE=RESOLVED

These values are release controls, not substitutes for actual evidence. WEBSITE QA evidence, visual approval and membership-delivery evidence must still exist.

## 4. Secret handling

Allowed:
- Vercel sensitive environment variables
- owner-controlled secure credential manager
- local ephemeral shell environment during an authorized release

Prohibited:
- committing secrets
- embedding secrets in frontend code
- placing secrets in Rich Menu JSON
- pasting secrets into LINE welcome copy or public documentation
- sharing STT credentials with GCSDA or vice versa

## 5. Owner user ID binding

Each owner user ID must be obtained through the corresponding OA lane only:

1. owner adds the relevant OA
2. owner sends a controlled setup message
3. webhook receives the event
4. signature is verified
5. user ID is recorded as the authorized notification target for that institution
6. a one-time test push is sent only after release authorization

The STT owner binding must not be silently reused as the GCSDA owner binding.

## 6. Webhook boundary

Before accepting any POST event:
- read raw request body
- verify x-line-signature using that account's channel secret
- reject missing/invalid signatures
- do not log raw high-sensitivity user content
- process asynchronously once the live phase is authorized
- return minimal status payloads

## 7. Release evidence required

For each account retain:
- OA ID
- channel identity confirmation
- secret/token environment variable names
- owner user ID binding evidence
- webhook endpoint
- Rich Menu ID after publication
- final PNG SHA-256
- final action-map JSON SHA-256
- iOS E2E evidence
- Android E2E evidence
- rollback Rich Menu ID or explicit no-menu fallback procedure

Actual secret values are never part of release evidence.
