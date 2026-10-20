# CR-INTERVIEW-20261020-02

Date: 2026-10-20. Owner: STT Governance / 莊鈞翔博士.
Authorization: owner explicitly requested removal of erroneous routes and one interview entry supporting copy, save, download and submit. Approved by Founder: YES, for this stated functional scope only.
Status: implementation in progress; not a website-wide QA_PASS or BUILD_LOCK.

## Scope and unchanged boundaries

Canonical interview: https://stt-003.vercel.app/humanistic-interview/ . Existing mother site stays https://stt-003.vercel.app/ . No new website or social-media phase.

Affected files: src/App.tsx (interview destination only); vercel.json (interview aliases/headers only); public/humanistic-interview/index.html; public/humanistic-interview/interview.js; api/humanistic-submit.ts; scoped repair and acceptance scripts/workflow.

All 20 approved question sections and original embedded/station image references must remain byte-identical. Existing brand positioning, navigation labels, main CTA, privacy notice, recipient, and separate GCSDA destination are unchanged.

## Before / after and reason

Before: main-site footer and /humanistic-20q client redirect pointed to obsolete shimmering-longma-509244.netlify.app. A same-site repaired page therefore did not ensure visitors used that repair.
After: all managed entry links and legacy interview aliases resolve to the one canonical same-site interview. Old Netlify hosting metadata is removed from the Vercel document; this does not delete the remote Netlify site.

Before: a save action could mean only sessionStorage; backup fallback could be located in a currently hidden screen; failed copy could only tell the visitor to try another failing control.
After: session-only status is explicit. Save produces a user-owned JSON draft with local-only re-import. Download produces readable UTF-8 TXT containing all answers. A selectable complete answer view is located in the current screen. Clipboard, download, file picker and sharing failures retain the open answers and provide an independently usable fallback. Local draft import never uploads files to STT.

Before: delivery success depended only on provider HTTP status.
After: provider email ID is required. Same unchanged retries use a stable identity and deterministic payload with provider-supported idempotency. The provider's deduplication window is 24 hours, not an unlimited guarantee. Server stores no answer database and logs no answer bodies. Existing success-only clearing remains. A provider acceptance response is not falsely described as confirmed final inbox delivery.

## Dependencies and acceptance

Production RESEND_API_KEY remains managed in Vercel, never in the repository. Existing recipient pc5888@gmail.com is unchanged.

Required: exact-source guards; all20 question/art preservation; actual browser navigation/copy/download/draft reload; rejected clipboard/storage fallback; failed request and false-success response retention; valid receipt clearing; no uncaught JS; build; live canonical redirects; one synthetic actual submission and separate inbox verification.

Chromium/WebKit automation is not physical iPhone/Safari validation. Mocked provider tests are not real delivery confirmation. Results must be separately reported.

## Outstanding dependency

Obsolete Netlify interview remote deletion/unpublishing still requires verified Netlify account management access. It is not accomplished by deleting the old mirror workflow. The GCSDA Netlify registration site is a different organization/service and is excluded from this change.

Original lost respondent answers have not been recovered; no recovery or permanent browser-storage guarantee is made.
