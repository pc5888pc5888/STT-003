# CR-GCSDA-GLOBAL-HEADING-TYPOGRAPHY-20261022

Date: 2026-10-22
Requested by: Founder / site owner
Approval: YES — explicit global typography instruction
Scope: GCSDA public website H1/H2/H3 headings

## Locked rule

All public H1, H2 and H3 headings must not display the Chinese full stop character `。`.

This is a global typography rule. It applies to large, medium and small headings across all public routes.

## Implementation

A render-layer heading typography guard runs in the GCSDA site shell and:
- scans all H1/H2/H3 text nodes;
- removes `。` wherever it appears inside a heading;
- observes later dynamic rendering so the rule also applies to future route content.

Normal body paragraphs and descriptive copy retain ordinary punctuation.

## Acceptance

Formal live-route QA must return zero H1/H2/H3 headings containing `。`.
