# CR-STT-NAVIGATION-SSOT-RECONCILIATION-20261025

Date: 2026-10-25
Status: CHANGE REQUEST REQUIRED
Scope: STT Governance global navigation governance records only

## Observed production state

Current desktop/mobile primary navigation in `src/App.tsx` is:

1. 你正在面對什麼 → /problems
2. STT 如何判讀 → /how-stt-works
3. 治理委任 → /engagement
4. 研究與出版 → /insights
5. 莊鈞翔博士 → /eric-chuang
6. 受訪者專區 → /humanistic-interview/
7. 關於 STT → /about

Global CTA remains:
開始治理判讀 → /start

## Formal-governance conflict

The Project-level `02_SITE_TREE.md` and `19_QA_ACCEPTANCE.md` currently define/expect the older five-item primary navigation.

This mismatch prevents a formal WEBSITE_STATUS = BUILD_LOCKED / QA_PASS under the current acceptance rules, even though the deployed navigation is functional.

## Required resolution

Do not change production navigation in this CR.

Owner / governance approval is required to choose one formal resolution:

A. Ratify the current seven-item production navigation and update the formal Site Tree / QA acceptance records accordingly; or
B. Revert production navigation to the older five-item formal baseline.

## Current implementation

UNCHANGED by this CR.
This file records the mismatch only and prevents silent normalization.
