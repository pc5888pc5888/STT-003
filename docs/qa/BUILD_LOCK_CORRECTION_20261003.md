# BUILD-LOCK CORRECTION 01 — 2026-10-03

Status: ACTIVE BUILD — correction applied to `stt-convergence-20260923`; production main unchanged.

## Authority
- Project Charter / Non-Drift Rules / site_source_of_truth.yaml / Master Build Spec / QA Acceptance.
- Project owner instruction on 2026-10-03 to execute the previously identified drift corrections.
- Owner-provided M Media author-page HTML used only to refresh the external-publication index.

## Corrected
1. /about rendered H1 restored to the approved identity statement without abbreviation.
2. /start restored to TEXT_FIRST (Hero NONE).
3. /engagement and /institutions no longer consume unapproved substitute hero assets; both remain ASSET_REQUIRED internally and render the governed text-first hero.
4. GCSDA preview deployment hostname removed as a formal STT outbound destination. Legacy GCSDA paths return to /about until an independently confirmed official URL is supplied.
5. Unapproved top-level content routes are no longer public canonical destinations:
   - /research, /books, /projects → /insights
   - /domains and /domains/:slug → /how-stt-works
   - /success → /start
   - /legal/* → approved utility routes
   Legacy governance URLs remain redirects into approved /problems, /insights, or /professional-boundary routes.
6. sitemap.xml now includes the approved /privacy route.
7. M Media external-publication catalog reconciled to the owner-uploaded author page: 24 new legal-column articles relative to the 214-record convergence baseline, plus one Humanistic Landscape interview already present in the newer main snapshot. One stale duplicate article ID was removed; final catalog contains 239 unique article URLs.

## Deliberately unresolved
- STT Press formal destination: existing specification and later correction record conflict. No temporary /books destination is presented as STT Press.
- Official GCSDA production URL: SOURCE_REQUIRED / TBD_OWNER_INPUT.
- ENGAGEMENT-HERO and INSTITUTIONS-HERO: ASSET_REQUIRED; no generated substitute used.
- Publication high-resolution replacement work remains a separate asset task.

## Unchanged
- Primary navigation remains the approved five labels.
- Primary CTA remains 開始治理判讀 → /start.
- M Media remains labeled and modeled as an external third-party publication source.
- Humanistic 20 Questions remains the approved external journey URL.
- No Facebook or LINE work started.

## Next gate
Run build/type/regression and browser QA. Do not mark BUILD_LOCKED or G10 PASS until Critical QA is zero.
