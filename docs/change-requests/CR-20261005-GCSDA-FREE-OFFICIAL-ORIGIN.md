# CHANGE REQUEST — GCSDA Free Official Origin

- CR ID: CR-20261005-GCSDA-FREE-OFFICIAL-ORIGIN
- Date: 2026-10-05
- Owner approval: explicit project-chat instruction to use the same no-cost hosting approach as STT
- Status: APPROVED / IMPLEMENTED
- Affected systems: GCSDA release, STT external routing/footer, SEO canonical/sitemap/robots

## Previous state

Formal project sources treated the GCSDA official URL as `TBD_OWNER_INPUT`. GCSDA remained an independent organization and was not to be linked as an official external site until the owner supplied/approved an official URL.

## Approved change

The owner approved use of a no-cost Vercel-hosted official origin rather than purchasing a custom domain.

Official GCSDA public origin:

`https://gcsda-governance.vercel.app`

This URL is the association's public website origin for the current phase. It does not make GCSDA part of STT and does not change either institution's legal/organizational identity.

## Implementation

GCSDA:
- canonical URLs use the approved origin;
- robots.txt permits indexing;
- sitemap.xml uses the approved origin;
- Open Graph URL/image metadata and Organization JSON-LD use the approved origin;
- unknown routes return HTTP 404;
- frozen release branch remains `gcsda-release-20261005`.

STT:
- footer ecosystem link points to the approved GCSDA origin;
- legacy `/institution/gcsda` and `/gcsda.html` routes external-redirect to the approved GCSDA origin;
- STT primary navigation remains unchanged.

## Governance boundaries

- GCSDA remains an independent external entity.
- No GCSDA member/activity system is mirrored into STT.
- No paid custom domain is required for this phase.
- Facebook and LINE redesign phases remain governed by the existing project phase rules.

## Source-of-truth follow-up

The canonical project attachment `site_source_of_truth.yaml` should replace the former GCSDA URL `TBD_OWNER_INPUT` state with this approved origin at the next SSOT package refresh. Until that package file is refreshed, this approved CR and the GCSDA G10 Final Acceptance record govern implementation.
