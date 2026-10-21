# CR-GCSDA-NAV-20261022

Date: 2026-10-22
Requested by: Founder / site owner
Approval: YES — direct instruction in the current build task
Scope: GCSDA independent website header navigation only
Branch: `gcsda-release-20261005`

## Business reason

The header already contains 「會員與入會」 linking to `/membership`. The separate trailing 「申請入會」 item links to the same route and duplicates the same function.

## Change

Remove the redundant trailing 「申請入會」 header CTA from:
- desktop navigation
- mobile drawer navigation

Keep 「會員與入會」 → `/membership` as the sole primary navigation entry for membership.

## Unchanged

- `/membership` route and page content
- membership application workflow and API
- all other navigation labels and routes
- page copy, metadata, images, forms, footer, and STT main site
- GCSDA/STT institutional separation

## Acceptance

Desktop and mobile navigation must each show only one membership route entry: 「會員與入會」 → `/membership`. No other visible navigation item or route may change.
