# 21 — Mobile-First Editorial System

Status: ACTIVE IMPLEMENTATION STANDARD
Owner instruction: 2026-09-19
Scope: presentation/editorial layout only. This document does not override 00_PROJECT_CHARTER.md, 01_NON_DRIFT_RULES.md, site_source_of_truth.yaml, LOCKED copy, approved assets, routes, or governance positioning.

## 1. Governing principle

STT web presentation is designed mobile-first. Desktop/laptop is an expansion of the mobile editorial composition, not the source layout that mobile must shrink to fit.

The visual unit is not "image + text". It is:
1. subject window
2. editorial eyebrow
3. proposition/title
4. explanatory lead
5. primary action
6. supporting content

Mobile must preserve the subject of the approved artwork and the semantic rhythm of the copy.

## 2. Mobile canvas

Target reference widths: 360, 390, 430 CSS px.

Default horizontal safe area:
- 24px on STT main-site editorial pages
- never less than 20px for ordinary reading copy
- fixed tools must respect env(safe-area-inset-bottom)

Hero subject window:
- default 4:3
- approved artwork remains unchanged
- object-position/background-position is set per artwork by subject, not by global center-center
- no requirement to show the entire source image on mobile; show the most meaningful subject

## 3. Editorial type hierarchy

### Eyebrow
- 10–11px
- 600 weight
- 0.16–0.22em tracking
- 1.5–1.7 line-height
- 16–18px space before H1

### Hero H1
- default 32–38px
- homepage may use 38–44px
- short identity title may use 36–42px
- line-height 1.34–1.44
- weight 500
- no artificial ultra-bold display weight
- line-break: strict
- text-wrap: pretty

### Section H2
- 26–31px
- line-height 1.48–1.58
- weight 500

### H3
- 20–24px
- line-height 1.5–1.65

### Lead
- 15.5–17px
- line-height 1.85–1.95
- preferred measure 20–24 CJK characters per line where layout permits

### Body
- 15–16.5px
- line-height 1.85–2.0
- paragraphs are separated by vertical rhythm, not repeated visual decoration

## 4. Chinese line-breaking rules

Hero titles are editorially composed, not left entirely to browser wrapping.

Priority:
1. preserve semantic phrase
2. preserve punctuation with the preceding phrase where possible
3. avoid one-character orphan lines
4. avoid starting a line with closing punctuation
5. avoid ending a line with opening punctuation
6. do not break personal names, institution names, or fixed governance terms unless unavoidable

Mobile H1 target:
- preferably 8–12 full-width Chinese characters per line
- 2–4 lines preferred
- 5 lines allowed only for genuinely long propositions; reduce scale before allowing 6+
- never create "一兩個字一行" as a design pattern

Desktop may reflow the same semantic segments into fewer lines.

## 5. Emphasis / bold rules

Bold is semantic emphasis, not decoration.

Use stronger weight only for:
- named institution/role when identification matters
- a governance concept that changes interpretation
- hard-stop / boundary / responsibility concept
- a primary conclusion inside a paragraph

Do not bold:
- entire paragraphs
- multiple consecutive phrases
- generic marketing adjectives
- text merely because it should look important

Maximum guideline:
- ordinary paragraph: 0–2 emphasized spans
- hero lead: usually 0–1 emphasized span

## 6. Vertical rhythm

Mobile hero:
- subject window
- 28–32px gap to eyebrow/copy block
- 16–18px eyebrow → H1
- 18–22px H1 → lead
- 24–28px lead → actions
- 48–56px bottom padding

Mobile section:
- 56–72px section padding
- 14–18px eyebrow → H2
- 16–22px H2 → body
- 28–36px body → grid/list/action

## 7. Controls

Primary mobile CTA:
- min-height 48px
- text 14–15px
- one primary action per visual decision point

Floating accessibility controls:
- 40px circular controls on mobile
- 6px gap
- 12px right edge
- safe-area bottom
- must not cover H1, lead, CTA, or form controls in initial viewport

## 8. Page-specific art direction

Every hero may define its own mobile focal point.
A page may not override the typography scale, horizontal safe area, or editorial rhythm without an explicit page-level reason.

## 9. Acceptance criteria

At 360 / 390 / 430px:
- approved visual subject is meaningful and not accidentally cropped
- H1 has no one-character orphan line
- H1 has no uncontrolled 6+ line fragmentation
- H1 / H2 scale is recognizably consistent across routes
- ordinary body text remains readable without zoom
- floating controls do not cover meaningful text/actions
- page looks like the same STT institution even when content type differs

At desktop:
- no regression to approved artwork, navigation, copy, or route behavior
- mobile semantic line segments may collapse into fewer lines