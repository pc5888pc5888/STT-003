# CHANGE REQUEST — Global Title Line-Break Governance

- CR ID: CR-20260922-TITLE-LINE-BREAK
- Date: 2026-09-22
- Requested by: Project owner via project chat
- Change type: Global visual / typographic governance rule + brand-name precision

## Owner instruction

When a visible page title needs to change from one line to multiple lines, the first intentional line break must occur immediately after the first structural punctuation mark in the original title.

Example:

Original:
STT Governance 不是一般顧問公司，而是高位階治理文明平台。

Governed two-line form:
STT Governance 不是一般顧問公司，
而是高位階治理文明平台。

## Rules

1. Do not rewrite LOCKED copy to improve wrapping.
2. Do not add, delete, or move punctuation merely for layout.
3. Preserve the original title text exactly.
4. Use the first structural punctuation mark as the first intentional break point.
5. Structural punctuation recognized by the implementation:
   ， 。 ； ： ！ ？ ｜ , ; : ! ? |
6. If there is no structural punctuation before the end of the title, do not invent a break point; allow normal responsive wrapping.
7. Hero titles governed by STTPageHero use this rule at render time.
8. Plain H1/H2 titles use the same rule only when the rendered heading actually requires multiple lines.
9. Responsive layouts may still produce additional natural wrapping on very narrow screens; the first intentional break remains governed by this rule.

## Brand precision correction

Old:
STT 不是一般顧問公司，而是高位階治理文明平台。

New:
STT Governance 不是一般顧問公司，而是高位階治理文明平台。

Reason:
STT Governance is the mother brand and formal governance intake entity; STT may be used as a shorthand only after the identity has been established.

## Implementation scope

- src/utils/titleBreak.ts
- src/titleRules.ts
- src/components/STTPageHero.tsx
- src/components/FullBleedHero.tsx
- src/pages/ProblemDetail.tsx
- src/pages/Domains.tsx
- src/pages/PublicCore.tsx
- src/pages/Start.tsx
- src/index.css
- src/main.tsx

## QA

- Explicit hero titleLines audited to max two governed lines.
- Problem-detail hero titles corrected to break after first punctuation.
- Start/intake hero titles corrected.
- Domain and Humanistic hero title arrays corrected.
- About identity corrected to STT Governance.
- Plain active-route H1/H2 headings are covered by the global responsive rule.
- No production merge at this stage.
