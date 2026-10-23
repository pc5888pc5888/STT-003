# WEBSITE QA STATUS — 2026-10-24

WEBSITE_STATUS = ACTIVE_BUILD
QA_STATUS = BLOCKED_ON_RENDERED_VISUAL_ACCEPTANCE
LINE_OFFICIAL_ACCOUNT = HOLD

## Verified PASS

- STT production deployment READY.
- GCSDA production deployment READY.
- STT presentation/profile identity build QA PASS.
- GCSDA presentation/render-baseline build QA PASS.
- Formal production routes return 200.
- Unknown routes return real HTTP 404 with noindex.
- sitemap.xml returns XML on both sites.
- robots.txt returns text directives on both sites.
- html lang is zh-Hant-TW.
- STT formal routes have route-specific title, meta description and canonical.
- GCSDA formal routes have route-specific title, meta description and canonical.
- /start has no file upload.
- /start shows data-minimization guidance before submission.
- /start success state does not imply engagement/mandate acceptance.
- /engagement uses the restored approved bank-14.png asset.
- STT founder identity:
  - 創辦人暨執行長｜莊鈞翔博士
  - CHUANG CHUN HSIANG Ph.D.
  - STT Governance 創辦人暨執行長
- GCSDA founder identity:
  - 創會理事長｜莊鈞翔博士
  - CHUANG CHUN HSIANG Ph.D.
  - 中華企業策略永續發展學會 創會理事長
- Founder identity lines are locked nowrap by build/CSS rules.
- Legacy public Chinese wording requested for removal is absent from current STT/GCSDA production bundles.
- GCSDA spaced-name remnants were removed from active source and locale bundle.
- Owner-approved navigation overlay is recorded in NAVIGATION-SOURCE-OF-TRUTH-20261022.
- Owner-approved single AI-copy wording exception is recorded in CR-STT-AI-COPY-OWNER-EXCEPTION-20261024.

## Critical not yet accepted

19_QA_ACCEPTANCE section D requires:
- Mobile layout is readable and intentional.

The current available toolchain can verify code, production assets, CSS rules, metadata, routes and build output, but does not provide a rendered desktop/tablet/mobile browser view for the current production pages.

Therefore visual acceptance is NOT marked PASS by inference.

## High items not visually re-verified

- no CLS from hero media
- contrast passes WCAG AA for normal text

Source-level protections exist, but these remain rendered-runtime checks before BUILD_LOCK.

## Gate decision

Do not set WEBSITE_STATUS = QA_PASS / BUILD_LOCKED yet.
Do not begin formal LINE Official Account construction yet.

Formal LINE work may begin only after the rendered visual acceptance gate is explicitly passed.
