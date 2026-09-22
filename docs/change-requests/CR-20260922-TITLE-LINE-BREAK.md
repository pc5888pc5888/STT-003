# CHANGE REQUEST — Global Title Line-Break Governance

- CR ID: CR-20260922-TITLE-LINE-BREAK
- Date: 2026-09-22
- Requested by: Project owner via project chat
- Change type: Global visual / typographic governance rule + brand-name precision

## Owner instruction

When a visible page title needs to change from one line to multiple lines, do not break automatically at the first punctuation mark. Choose the punctuation break that preserves semantic completeness and produces the most balanced two-line title.

Primary examples:

STT Governance 不是一般顧問公司，而是高位階治理文明平台。

Governed form:
STT Governance 不是一般顧問公司，
而是高位階治理文明平台。

重大決策，不是先選 A、B、C；而是先確認這是不是正確的問題。

Governed form:
重大決策，不是先選 A、B、C；
而是先確認這是不是正確的問題。

## Rules

1. Do not rewrite LOCKED copy to improve wrapping.
2. Do not add, delete, or move punctuation merely for layout.
3. Preserve the original title text exactly.
4. Prefer an existing structural punctuation mark that keeps both lines semantically complete.
5. Among viable punctuation marks, prefer the break closest to a balanced two-line composition rather than blindly selecting the first punctuation mark.
6. Avoid a fragmentary first line or an excessively short second line.
7. Structural punctuation recognized by the implementation:
   ， ； ： ！ ？ ｜ , ; : ! ? |
8. A sentence-ending full stop is not used as an internal break point.
9. If no suitable punctuation exists, do not invent one; allow natural responsive wrapping.
10. Responsive layouts may still create additional natural wrapping on very narrow screens, but the intentional editorial break follows this rule.

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

- Problem-detail example now renders:
  重大決策，不是先選 A、B、C；
  而是先確認這是不是正確的問題。
- About identity renders:
  STT Governance 不是一般顧問公司，
  而是高位階治理文明平台。
- Explicit hero titleLines are aligned to the balanced punctuation rule.
- Plain active-route H1/H2 headings use the same balanced punctuation logic when they actually require multiple lines.
- No production merge at this stage.
