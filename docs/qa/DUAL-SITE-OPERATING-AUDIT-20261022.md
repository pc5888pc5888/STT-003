# DUAL-SITE OPERATING AUDIT — 2026-10-22

Status: WEBSITE ACTIVE_BUILD — NOT BUILD_LOCKED / NOT QA_PASS

Scope:
- STT Governance: https://stt-003.vercel.app
- GCSDA: https://gcsda-governance.vercel.app
- Public-route, metadata, routing, intake capability, conversion infrastructure and cross-site governance review.

## Verified working

### STT
- Public canonical routes resolve.
- robots.txt and sitemap.xml are real machine-readable resources.
- Current public routes expose unique title / description / canonical metadata.
- Current public pages use one H1 in the rendered route structure.
- /start has no file upload and exposes the approved data-minimization boundary.
- /api/cooperation-submit reports Resend delivery configuration present.
- 404 returns an actual HTTP 404.
- No grouped Vercel runtime errors were found in the seven-day review window.
- H1/H2/H3 full-stop prohibition is enforced by the site shell.
- /eric-chuang portrait geometry is locked to 1672:941 and narrative paragraphs use 2em first-line indentation.

### GCSDA
- All ten public canonical routes resolve.
- robots.txt and sitemap.xml resolve publicly.
- All public routes expose title / description / canonical metadata and one H1.
- 404 returns an actual HTTP 404.
- H1/H2/H3 full-stop prohibition is enforced by the site shell.
- /founder-chairman portrait geometry is locked to 1672:941 and narrative paragraphs use 2em first-line indentation.
- Founder page Open Graph / Person structured data has been upgraded to use the approved founder portrait and verified GCSDA role.

## Open operating issues

### 1. GCSDA online membership delivery is not enabled — HIGH
Live capability endpoint currently reports:
- resendConfigured: false
- recipientConfigured: false

The page correctly falls back to the existing LINE association contact instead of pretending online submission is available.

Required before enabling online membership submission:
- SOURCE_REQUIRED: official GCSDA membership recipient mailbox
- environment configuration for the GCSDA deployment environment
- controlled end-to-end submission QA

### 2. No conversion analytics / attribution baseline — HIGH
Vercel Web Analytics is not currently available for this project and no alternative public-site analytics implementation was found.

Operational consequence:
- no reliable page-level funnel baseline
- no reliable source attribution for website → governance intake
- future LINE / media campaigns cannot be compared by qualified-intake performance

Recommendation:
use privacy-minimized source attribution first (campaign-tagged links and intake-source capture) before considering heavier analytics.

### 3. Two institutional sites share one Vercel project — HIGH GOVERNANCE RISK
STT production and GCSDA branch/alias are operationally coupled to one Vercel project.

Observed consequence:
- environment-variable scope is harder to keep institution-specific
- analytics and deployment state are harder to separate
- GCSDA currently behaves as a branch deployment rather than its own production project

Recommendation:
before channel expansion, evaluate splitting GCSDA into its own Vercel project while retaining the existing source repository/branch if desired. This is an operational separation measure, not a brand redesign.

### 4. STT intake delivery is configured but controlled end-to-end mail QA remains open — HIGH
GET capability confirms Resend is configured.
A production POST was not generated during this audit because it creates a real external email submission.

Required:
- one owner-approved QA submission
- verify receipt ID, mailbox delivery, sender identity, failure state and duplicate/idempotency behavior

### 5. Full cross-device visual acceptance remains open — HIGH
Source-level responsive rules are present, and the founder portrait geometry is now explicitly locked, but the entire route set has not yet received final desktop/tablet/mobile visual sign-off.

Required before BUILD_LOCK:
- desktop / tablet / mobile route review
- hero height and crop
- bilingual heading wrap
- long-text overflow
- navigation/drawer
- form controls
- footer and external links

### 6. Formal traffic-to-revenue instrumentation is missing — OPERATING GAP
The website already expresses the correct high-value engagement ladder:
Governance Review → Governance Architecture → Governance Mandate.

What is missing is the internal operating ledger that connects:
source → qualified governance situation → accepted intake → engagement type → active mandate → renewal / institutional relationship.

Do not turn the public site into a sales funnel. The missing layer belongs behind the website.

## Recommended operating architecture

Public layer:
Research / problem recognition / governance method / authority / institutional boundary

Formal intake:
STT /start

Internal triage:
one governed intake ledger with source, issue class, decision urgency, qualification status, responsible reviewer and next action

Relationship layer:
LINE Official after website acceptance, used for private relationship continuity and authorized follow-up — not as a substitute for /start

Delivery:
Governance Review → Governance Architecture → Governance Mandate

Knowledge loop:
approved anonymized lessons → research/publication → stronger search/trust → qualified future intake

## LINE phase gate

Do not begin LINE redesign or expose new LINE CTAs until website G10 acceptance is passed, per current project governance.

Prepare now, but do not publish:
- STT LINE account identity / verified add-friend URL: SOURCE_REQUIRED
- GCSDA currently exposes its existing association LINE add-friend link
- separate rich-menu information architecture for STT and GCSDA
- separate welcome messages, routing rules and source-tagged website links
- no shared wording that collapses GCSDA into STT
- no free-consultation language

## BUILD-LOCK blockers

- GCSDA membership online-delivery configuration
- controlled STT intake end-to-end test
- final cross-device visual QA
- accessibility final audit
- owner review of remaining High findings / exception log

Until these are closed:
WEBSITE_STATUS = ACTIVE_BUILD
LINE = HOLD
