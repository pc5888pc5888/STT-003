# CR-GCSDA-FOUNDER-IA-20261022

Date: 2026-10-22
Requested by: Founder / site owner
Approval: YES — direct instruction in current conversation
Scope: GCSDA information architecture
Branch: `gcsda-release-20261005`

## Problem

The `/governance` page incorrectly appended a full personal AuthorProfile after the first board/supervisor directory. This mixed an institutional governance page with an individual profile page.

## Approved correction

1. Remove the full AuthorProfile section from `/governance`.
2. Keep 莊鈞翔博士 in the board directory only in his organizational capacity as 創會理事長.
3. Create dedicated route `/founder-chairman`.
4. Add 「創會理事長」 to GCSDA navigation immediately after 「關於學會」.
5. The founder page is text-first until an owner-approved portrait/hero asset is explicitly supplied.
6. Reuse the existing verified AuthorProfile registry only on the dedicated founder page.
7. Preserve the institutional boundary: GCSDA and STT Governance remain separate organizations.

## Unchanged

- Existing GCSDA board directory facts
- Membership form/API
- Existing approved 001–008 hero assets and their route mapping
- Other GCSDA page copy/routes
- STT main branch and STT website

## Implementation note

The first deployment exposed a routing defect: Vite generated `gcsda-founder-chairman.html`, but `vercel.json` did not yet rewrite `/founder-chairman` to that static route, so the public URL returned 404. The rewrite is now explicitly added and must be verified on the canonical public alias before this change is considered QA complete.
