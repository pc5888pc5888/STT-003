# CR-GCSDA-PROFILE-HERO-PIXEL-PARITY-20261022

Date: 2026-10-22
Approval: YES — owner supplied live desktop screenshots showing the profile Hero still rendered at different scales.

## Finding

The two public image URLs now serve identical bytes, but legacy Hero cascade rules still caused different rendered image size/origin.

## Correction

Both profile routes receive the same dedicated class:
`cis-profile-parity`

The class hard-locks:
- identical 1672:941 canvas
- image absolute-fill from top-left 0,0
- identical cover/object-position
- identical veil
- identical copy anchor
- zero profile-specific margin/padding drift

This rule is loaded after legacy Hero rules and is the final authority for the two profile pages.

## Routes

/founder-chairman

## Unchanged

Copy, route, approved image bytes, metadata, navigation and institutional identity.
