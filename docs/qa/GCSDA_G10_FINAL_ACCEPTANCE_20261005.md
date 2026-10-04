# GCSDA G10 Final Acceptance — 2026-10-05

## Status

- Site: 中華企業策略永續發展學會｜GCSDA
- Validated source branch: `gcsda-convergence-20260923`
- Validated source head: `cc67786ae4bbc513d45e7afcacc1e84cd0113cb9`
- Frozen release branch: `gcsda-release-20261005`
- Browser audit workflow source head: `c2336dd585de586e4510c1892087a8fc342ec0d0`
- QA evidence publisher head: `706cb1cd3a37891c2b2b38e948df7560b9b6e27b`
- Website build status: **G10_QA_PASS / READY_FOR_PRODUCTION_ORIGIN**
- Production publication status: **SOURCE_REQUIRED — official standalone GCSDA origin/domain not yet supplied**

This acceptance does not promote the shared STT Vercel project to GCSDA production and does not treat a branch preview hostname as the association's official URL.

## Canonical public routes

- /
- /about
- /governance
- /council
- /membership
- /events
- /knowledge
- /charter
- /privacy
- 404

Legacy aliases remain redirect-only where defined. No STT member/activity system is copied into GCSDA.

## Visual acceptance

- Association-only Hero asset ownership is active.
- GCSDA inner-page Hero masters render at 1672×941.
- Active cross-site STT/GCSDA Hero SHA collisions: 0.
- Desktop thematic Hero title anchor: 180px from Hero image top.
- Tablet thematic Hero title anchor: 50px from Hero image top.
- Mobile remains image-first, text-second.
- Logo optical difference against STT: approximately 0.65px; PASS.
- Council group photo is owner-supplied real institutional evidence; no face generation or identity inference is used.

## Council evidence

The /council page includes the owner-supplied Strategic Governance Council group photograph in the body evidence section rather than replacing the institutional Hero.

Browser acceptance:
- natural size: 700×394 web delivery asset
- rendered size: 670×377 in 1440px audit viewport
- opacity: 1
- visibility: visible
- object-fit: contain
- non-white pixel ratio: 0.4397
- alt: 策略治理聯席會成員團體照

This pixel-ratio gate prevents a technically loaded but visually blank image from passing QA.

## Membership acceptance

The membership page performs a capability check before exposing personal-data fields.

When mail delivery is unavailable:
- membership form is not shown;
- LINE meeting/secretariat contact entry is shown;
- users are not allowed to fill a form that cannot be delivered.

When the mail backend is enabled:
- the four-step application wizard passes automated browser completion;
- required fields, expertise, motivation, truth confirmation and privacy consent are validated;
- success state is confirmed without sending real QA data.

A prior GCSDA membership application source routed applications to `pc5888@gmail.com`. This address is retained as the verified migration reference; it should be configured only in the dedicated GCSDA production environment, not activated on the shared STT production project.

## SEO / technical production acceptance

A production-equivalent build was generated with a QA-only HTTPS origin and passed:

- all canonical routes appear in sitemap.xml;
- robots.txt allows public routes and points to sitemap.xml;
- page canonical is emitted;
- Open Graph URL/image metadata is emitted;
- Organization JSON-LD is emitted;
- zh-Hant-TW language remains set;
- real 404 returns HTTP 404;
- page-specific titles/descriptions are present.

The live preview intentionally remains noindex until an owner-approved standalone GCSDA production origin is supplied.

## Final browser audit

- browserRenderedRoutes: 60
- automatedFailures: 0
- GCSDA metadata failures: 0
- GCSDA Hero resolution failures: 0
- Hero copy anchor failures: 0
- cross-site Hero collisions: 0
- council evidence failure: false
- membership fallback failure: false
- membership online-flow failure: false
- GCSDA production-build failure: false
- STT publication book failures: 0

## Open owner input before indexed public launch

### SOURCE_REQUIRED — official standalone GCSDA origin/domain

No formal standalone GCSDA domain is present in the approved project sources or current Vercel team domains. Do not invent one and do not use `stt-003.vercel.app` as the association canonical.

Once the owner supplies/approves the official origin:
1. deploy this frozen release to an independent GCSDA production target;
2. set `VITE_GCSDA_SITE_ORIGIN=https://<official-domain>`;
3. configure the production membership mail environment in that GCSDA target;
4. rebuild;
5. verify DNS/TLS/canonical/robots/sitemap and one real controlled membership delivery;
6. then mark **LIVE_COMPLETE / BUILD_LOCKED**.

Until then the branch-preview site is suitable for final owner review and functional use, but remains intentionally non-indexed.
