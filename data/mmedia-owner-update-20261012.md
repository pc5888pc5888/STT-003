# 2026-10-12 owner-requested legal-column update

Scope: STT /insights external publication archive only. All 24 supplied M傳媒 article IDs are explicitly assigned by 莊鈞翔博士 to the existing legal series. Their subjects are not grounds for changing this assignment.

Baseline read: main commit 2f488dba995fd7eedd3949eab08778f647c5b873; public/data/mmedia-catalog.json had 244 unique articles, including 228 legal, 5 humanistic and 11 news. Of the supplied IDs, 10 were already archived and 14 were not present. These figures describe the pre-update state, not a deployment-completion claim.

Existing IDs (retain one record each): b60ae0, 3a43d6, d8eb94, 088d9f, e884f0, 087264, 0364df, baaf84, 04edae, e479da.

Not present at baseline: f30f4f, 73e350, 503bd6, c3a49d, 60fee1, a715b9, 96a310, 71a227, e93863, c788fa, a20485, 32f4bd, 2b8798, eb48c1.

Implementation: data/mmedia-owner-series.json records the explicit assignments; scripts/mmedia_sync.py consults them before any other series mapping and retains assignments for archived records absent from a later source page. Existing source title/date/excerpt fields remain source-derived. Canonical article ID is the deduplication key; from_admin=true is not another article.

Publication boundary: the owner assignment and public-source availability are separate. A preview that cannot yet be verified in the public source index remains assigned legal in the registry; no publication date, article record or public availability is invented. The generated catalog's ownerAssignments.awaitingPublicSource lists such IDs. They are not rejected or reclassified on subject grounds.

Unchanged: LOCKED positioning/copy, navigation, CTA, homepage, visual assets, logo, GCSDA, Facebook and LINE. M傳媒 remains an external third-party publisher. No new public route or product is introduced. No change to LOCKED baseline is requested.

Acceptance for this update: unique URLs remain unique; existing IDs are not appended a second time; all archived owner-specified IDs resolve to legal; source fields remain traceable; production /insights must be checked separately from GitHub test/build results. This update does not declare whole-site QA_PASS or BUILD_LOCKED.
