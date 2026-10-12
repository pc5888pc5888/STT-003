# 2026-10-12 owner-requested legal-column update

Scope: STT /insights external publication archive only. All 24 supplied M傳媒 article IDs are explicitly assigned by 莊鈞翔博士 to the existing legal series. Their subjects are not grounds for changing this assignment.

Baseline read: main commit 2f488dba995fd7eedd3949eab08778f647c5b873; public/data/mmedia-catalog.json had 244 unique articles, including 228 legal, 5 humanistic and 11 news. Of the supplied IDs, 10 were already archived and 14 were not present. These figures describe the pre-update state, not a deployment-completion claim.

Existing IDs (retain one record each): b60ae0, 3a43d6, d8eb94, 088d9f, e884f0, 087264, 0364df, baaf84, 04edae, e479da.

Not present at baseline: f30f4f, 73e350, 503bd6, c3a49d, 60fee1, a715b9, 96a310, 71a227, e93863, c788fa, a20485, 32f4bd, 2b8798, eb48c1.

Implementation: data/mmedia-owner-series.json records the explicit assignments; scripts/mmedia_sync.py consults them before any other series mapping and retains assignments for archived records absent from a later source page. Existing source title/date/excerpt fields remain source-derived. Canonical article ID is the deduplication key; from_admin=true is not another article.

Publication boundary: the owner assignment and public-source availability are separate. A preview that cannot yet be verified in the public source index remains assigned legal in the registry; no publication date, article record or public availability is invented. The generated catalog's ownerAssignments.awaitingPublicSource lists such IDs. They are not rejected or reclassified on subject grounds.

Unchanged: LOCKED positioning/copy, navigation, CTA, homepage, visual assets, logo, GCSDA, Facebook and LINE. M傳媒 remains an external third-party publisher. No new public route or product is introduced. No change to LOCKED baseline is requested.

Acceptance for this update: unique URLs remain unique; existing IDs are not appended a second time; all archived owner-specified IDs resolve to legal; source fields remain traceable; production /insights must be checked separately from GitHub test/build results. This update does not declare whole-site QA_PASS or BUILD_LOCKED.

## Actual execution result

The successful bounded batch was checked at 2026-10-12T07:08:16.142347+00:00 (2026-10-12 15:08 Asia/Taipei). The public catalog gained 9 articles, retained the 10 previously archived supplied articles once each, and recorded the remaining 5 owner-assigned legal articles as awaiting a working public source. Total 253 unique articles: legal 237, humanistic 5, news 11. No historical article was removed, and articles outside the owner batch were unchanged. Evidence: data/mmedia-owner-batch-20261012-result.json.

Newly added IDs: a715b9, 96a310, 71a227, e93863, c788fa, a20485, 32f4bd, 2b8798, eb48c1. Each new article's public canonical URL returned its matching title; title, date, author and excerpt were read from the public author-index cards rather than generated.

Awaiting public source: f30f4f, 73e350, 503bd6, c3a49d, 60fee1. At the check above, each canonical URL without from_admin=true redirected to the M傳媒 homepage. The provided parameterized URLs returned their respective article titles. This is an observed public-link issue, not a determination that the articles are not legal columns, nor a claim about the publisher's underlying draft/publishing status. Their exact titles and preview-date candidates are preserved in the batch evidence; preview dates were not substituted as verified public publication dates.

## Deployment and page verification

Catalog commit: 75ab807c0f12ef05106f299c6b9e2a08a2d4a86b. Vercel production deployment: dpl_dU6Gwv5NMeQ64MWCxfnjn85WwDg5, project prj_lASDpLR6RkkVmJuZuDMM1LU8pD0F, team team_F50JteWE5b42WDsruhQlNWFj. The deployment reported READY. Separately, a live rendered fetch of https://stt-003.vercel.app/insights showed archive total 253 and retained the external-third-party disclosure. A scoped rendered-HTML fetch showed the newly added a715b9 and 96a310 titles and original-article links with target=_blank and rel=noreferrer; a715b9, 96a310 and 71a227 link destinations were visible in the returned extraction. The title link and read-original link on one card are not duplicate article records.

The owner-batch workflow run 38216020391 completed successfully, including the 15-test suite before and after the catalog update. Tests cover owner assignment precedence, idempotency, unique articles, author verification, preservation of history, and unchanged out-of-scope articles.

Interactive desktop/mobile, search/filter clicking, and screenshot checks were NOT executed: the TinyFish interactive browser did not start because its wallet lacked funds. Rendered-page extraction is not represented as an interactive or full visual QA pass.

## Remaining operational issues

The existing full-history scheduled sync encountered an invalid public-pagination response in run 38215550931 and retained its previous catalog. This owner update used a separate bounded public-card updater without changing the scheduled cadence or claiming a successful full-history crawl. Recovery of full-source pagination remains unverified; no future synchronization success is promised. The 5 source-link exceptions remain open. No whole-site QA_PASS or BUILD_LOCKED status is asserted.
