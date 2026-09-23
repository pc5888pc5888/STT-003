# G8 — Start + Utility QA / 2026-09-23

Scope:
- /start
- /privacy
- /professional-boundary
- governance intake delivery support

## /start acceptance

- [x] Page title: 開始治理判讀｜STT Governance
- [x] Formal START-01 hero copy retained.
- [x] Formal START-02 safety note retained.
- [x] START-03 uses exactly eight required intake fields.
- [x] No file upload field.
- [x] Institution CTA query `?type=institution` preselects 機構合作.
- [x] Legacy public speaking-invitation and enterprise-evaluation intake variants removed from the Start UI.
- [x] Required-field browser validation is present.
- [x] Deadline date becomes required only when 「有」 is selected.
- [x] START-04 success state uses the formal post-submit boundary.
- [x] No 客服將盡快聯絡 / 免費諮詢 / instant legal-answer language.
- [x] Governance intake can be delivered through the existing serverless delivery endpoint using the governance-intake route.

## /privacy acceptance

- [x] Page title and meta remain formal PAGE-PRIVACY values.
- [x] Utility page is text-first; no decorative hero asset.
- [x] Public copy does not invent encryption, ISO certification, retention period, or cross-border processing facts.
- [x] Formal TBD_OWNER_INPUT boundary is preserved.

## /professional-boundary acceptance

- [x] Page title and meta remain formal PAGE-BOUNDARY values.
- [x] BOUND-01 wording retained.
- [x] No claim that STT replaces regulated professional services.

## Runtime check required before G10

- Confirm production form delivery configuration.
- Confirm actual data destination / storage / mail service / retention facts.
- Replace TBD_OWNER_INPUT on /privacy only after owner review of those verified facts.

## Production

Preview only. No production merge before G10 final acceptance.
