# GCSDA G10 Final Acceptance — 2026-10-05

## Status

- Site: 中華企業策略永續發展學會｜GCSDA
- Validated source branch: `gcsda-convergence-20260923`
- Validated source head: `cc67786ae4bbc513d45e7afcacc1e84cd0113cb9`
- Frozen release branch: `gcsda-release-20261005`
- Browser audit workflow source head: `c2336dd585de586e4510c1892087a8fc342ec0d0`
- QA evidence publisher head: `706cb1cd3a37891c2b2b38e948df7560b9b6e27b`
- Website build status: **G10_QA_PASS / BUILD_LOCKED**
- Production publication status: **LIVE_COMPLETE**
- Official free origin: **https://gcsda-governance.vercel.app**

This acceptance uses the owner-approved no-cost Vercel-hosted origin `https://gcsda-governance.vercel.app` as the association's official public URL. STT remains at its own hostname and organizational identity; the GCSDA public hostname resolves only to the frozen GCSDA release.

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

## Public launch state

Owner approved a no-cost hosting model equivalent to the STT Vercel approach. The official public GCSDA origin is:

- https://gcsda-governance.vercel.app

The release was rebuilt with this origin and verified after deployment:
1. homepage and canonical public routes return HTTP 200;
2. `robots.txt` returns `Allow: /`;
3. `sitemap.xml` lists all nine public routes using the official GCSDA origin;
4. page canonical, Open Graph URL/image and Organization JSON-LD use the official GCSDA origin;
5. unknown routes return real HTTP 404;
6. the site is indexable (`index,follow`).

Membership delivery remains governance-safe: when the optional mail backend is not configured, the site does not expose a form that cannot deliver and routes applicants to the existing LINE secretariat entry. The previously approved membership application source identifies `pc5888@gmail.com` as the migration reference should a dedicated mail backend later be enabled.

Status: **LIVE_COMPLETE / BUILD_LOCKED**.
