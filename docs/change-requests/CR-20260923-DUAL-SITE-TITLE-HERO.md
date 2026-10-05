# CHANGE REQUEST — Dual-Site Title Hero Golden Reference & No Public Build States

- CR ID: CR-20260923-DUAL-SITE-TITLE-HERO
- Date: 2026-09-23
- Requested by: Project owner via project chat
- Scope: STT Governance + GCSDA public websites

## Golden Reference

The uploaded Problems screenshot is the visual reference for all public page-title heroes on both sites.

Required title-hero composition:
- fixed white institutional header
- large first-screen hero
- left text / right approved visual composition
- warm white veil from left into the visual
- small gold kicker above title
- large serif H1
- optional serif subtitle below H1
- descriptive body copy below subtitle
- restrained gold accents
- Desktop / Tablet / Mobile preserve the same hierarchy
- if no owner-approved image exists, use the same composition with institutional linework / whitespace; do not generate replacement art

## Title wrapping

When a title requires multiple lines:
- preserve original words and punctuation
- break at an existing structural punctuation mark
- prefer semantic completeness and visually balanced lines
- do not blindly break at the first punctuation mark
- do not invent punctuation for layout

## No public build-state screens

The public sites must not show:
- maintenance mode
- coming soon
- under construction
- route established / gate pending
- G0/G1/Gx preview placeholder copy
- internal implementation notes presented as public content

Internal build gates remain allowed in project management, but not in visitor-facing UI.

When an approved asset is missing:
- render a finished text-first hero with institutional linework
- keep the asset issue internal

When factual content is missing:
- publish only verified content
- do not fabricate a public placeholder

## STT implementation
- unified title-hero component and CSS reference layer
- Home / Problems / Method / Engagement / Start / shared STTPageHero routes aligned
- About / Eric / Institutions / Privacy / Professional Boundary no longer use GatePending
- Legal utility pages aligned to unified hero
- production main unchanged

## GCSDA implementation
- approved white / stone-white / champagne-gold visual system retained
- page title heroes aligned to the same geometry
- page-specific approved GCSDA visuals used where they already exist
- Privacy uses linework fallback rather than generated art
- public construction-state wording removed
- production remains separate from STT

## Production rule
Do not merge to production until route, responsive, accessibility and content QA are complete.
