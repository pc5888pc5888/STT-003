# CHANGE REQUEST — CR-2026-10-27-005

**Title:** STT 品牌顯示順序修正暨雙站對應 LINE 官方帳號網站聯動
**Date:** 2026-10-27
**Founder authorization:** YES — 莊鈞翔博士本次明確指示。
**Status:** FOUNDER_AUTHORIZED / PUBLIC_SITE_LINK_IMPLEMENTED / LINE_MANAGER_OPERATIONS_PENDING_ACCESS
**Supersedes:** CR-2026-10-27-004 的 STT display-name 順序（僅此項）；其他既有治理規格不變。

## Identity before → after
- STT: `策略智庫智慧治理｜STT Governance` → `STT Governance｜策略智庫智慧治理`
- GCSDA: `GCSDA｜中華企業策略永續發展學會` → UNCHANGED
- Apply STT name consistently to homepage title, client and build-generated OG site_name and title, Organization / Breadcrumb structured data, header accessibility identity, footer label.

## Official LINE mapping (approved existing public sources)
- STT website: https://stt-003.vercel.app/ ; LINE OA ID `@783xkknh` ; public add-friend URL https://line.me/R/ti/p/@783xkknh
- GCSDA independent website: https://gcsda-governance.vercel.app/ ; LINE OA ID `@387nbnjs` ; public add-friend URL https://line.me/R/ti/p/@387nbnjs
- The two founder-supplied `manager.line.biz/invitation/...` references are private administrator invitations, NOT public follower URLs. Do not publish, forward into source control or embed invitation tokens in client bundles.
- Invitation URLs cannot independently prove account mapping or confer a logged-in Manager session to this execution environment.
- Public web-to-LINE linking is **CHANNEL_ACTIVATED_WEBSITE_LINKS** by founder authorization. Live LINE Manager welcome, rich menu, messaging automation and admin-permission changes remain **ACCESS_REQUIRED / QA_EVIDENCE_GAP** until authenticated verification, not falsely marked completed.

## Site changes
- STT: update public identity strings in `index.html`, `src/seo.ts`, `src/pages/HomeCanonical.tsx`, `src/App.tsx`, `vite.config.ts`; add official-account link in footer and an explanatory optional contact link on `/start`.
- GCSDA: retain own identity; explicitly label existing site / LINE links in footer and mobile navigation while preserving GCSDA membership procedures.
- LINE → website action source: `docs/line/DUAL-SITE-LINE-WEBSITE-ROUTING-20261027.md` contains route templates for manual configuration via Manager (not an assertion of live rich-menu changes).
- Allowed routing: STT LINE → STT governance pages; GCSDA LINE → GCSDA official association pages. No cross-institution auto-forward, shared credentials, follower-data pooling or LINE-as-substitute-for-formal-intake.

## Unchanged
- Existing official logos, legal statuses, organization boundaries, Hero imagery / geometry, primary navigation, core home headline, LOCKED governance copy, routing/canonical origins, privacy requirements, website formal intake.
- No user messages, branches, old documents or deployments deleted; no new paid tool, DB, CRM, webhook or extra API.

## QA gates
- Require Vercel READY of exact commit plus fresh live server-side HTML title / OG / schema, and JS bundle verification of actual footer links.
- Verify public LINE URLs are the previously approved IDs. As LINE apps may require sign-in, live chat functionality and Manager-side changes are not automatically verified.
- Record responsive/browser QA gap if screenshots are unavailable. No whole-site QA_PASS or BUILD_LOCKED inferred.
