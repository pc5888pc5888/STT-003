# LINE OA PUBLIC CAPABILITY AUDIT — 2026-10-26

STATUS: CURRENT PUBLIC-ENDPOINT EVIDENCE  
LIVE LINE RELEASE: HOLD

This audit records only public capability flags and environment-variable presence by key. No secret value was read into this document.

## STT website intake

Endpoint:
https://stt-003.vercel.app/api/cooperation-submit

Observed:
- HTTP 200
- resendConfigured = true
- acceptsFiles = false

Judgment:
STT formal website intake delivery capability is configured.

## GCSDA membership

Endpoint:
https://gcsda-governance.vercel.app/api/gcsda-membership-submit

Observed:
- HTTP 200
- resendConfigured = false
- recipientConfigured = true
- formSubmitConfigured = true
- deliveryConfigured = true
- acceptsFiles = false

Environment-name audit:
- GCSDA_MEMBERSHIP_EMAIL exists for preview branch gcsda-release-20261005
- RESEND_API_KEY exists for production
- secret values were not decrypted or recorded

Judgment:
The earlier blocker "formal membership recipient missing" is no longer accurate.
GCSDA membership delivery is configured through the existing recipient and FormSubmit fallback.
A real POST E2E delivery test is still required before BUILD_LOCK / channel release.

## STT LINE webhook

Endpoint:
https://stt-003.vercel.app/api/line/stt-webhook

Observed:
- HTTP 200
- configured = false

Judgment:
Webhook code exists, but production credentials are not currently bound. This is correct while LINE remains HOLD.

## GCSDA LINE webhook

Endpoint:
https://gcsda-governance.vercel.app/api/line/gcsda-webhook

Observed:
- HTTP 200
- configured = false

Judgment:
Webhook code exists, but credentials are not currently bound. This is correct while LINE remains HOLD.

## Attribution

Code audit confirms:
- STT /start sends source_channel, source_account, landing_route, utm_source, utm_medium, utm_campaign
- STT backend validates attribution limits and source_account=stt
- GCSDA /membership sends the same privacy-minimized attribution fields
- GCSDA backend validates source_account=gcsda and records the attribution in delivery content

## Current blockers after this audit

Still blocked:
- WEBSITE_STATUS != QA_PASS / BUILD_LOCKED
- final Rich Menu release PNGs not promoted
- explicit owner visual approval not recorded for each candidate
- LINE STT token / secret / owner user ID not bound
- LINE GCSDA token / secret / owner user ID not bound
- real GCSDA membership POST E2E not yet evidenced
- mobile Rich Menu E2E not yet executed

No live LINE Manager publication is authorized.
