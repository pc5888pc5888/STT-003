# CR-STT-FINAL-VISUAL-QA-DEFECTS-20261024

Date: 2026-10-24
Approval: YES — owner ordered completion of the final desktop/tablet/mobile page-by-page visual QA.

## Production defects verified by first Chromium run
- /books was a formal publication page but used a text-only LibraryHeading despite an approved publication Hero asset.
- Three tablet problem-detail titles reflowed from the approved two-line grouping into three rendered lines.
- Redirect/legacy routes were incorrectly classified by the first QA script as independent visual-baseline pages.

## Correction
- /books now uses the approved publications Hero and preserves its existing public title: 電子書與出版.
- Tablet non-profile Hero copy measure is expanded to 590px / 58%.
- Redirect and compatibility routes remain tested for availability, broken images and overflow, but are excluded from independent Hero-baseline expectations.

No user-approved Humanistic Interview content is changed.
