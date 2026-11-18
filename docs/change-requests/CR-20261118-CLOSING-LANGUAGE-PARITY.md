# Closing section language parity — 2026-11-18

Owner follow-up: English, Japanese and Korean versions must receive the same closing-section design as Traditional Chinese.

Implementation: a shared PortraitClosing component holds the composition. STT HomeClosing supplies Traditional Chinese, English, Japanese and Korean copy and locale-specific /start destinations. GCSDAHomeClosing supplies its existing Traditional Chinese and English homepages. GCSDA has no Japanese or Korean homepage routes; this bounded change does not invent those site editions.

Content: existing Traditional Chinese copy remains unchanged. STT localized descriptions and CTA terminology reuse the existing native intake/home content. The newly added closing headlines and GCSDA English closing copy translate the corresponding existing Chinese content for the requested language parity; they are not represented as previously approved translations. Original portrait image files are unchanged.

Validation: both npm run build commands passed. Actual browser checks covered STT /en, /ja and /ko and GCSDA /en at 390, 768 and 1440 px. Traditional Chinese versions were regression-checked at mobile and tablet sizes (GCSDA also at 1440). All inspected closing sections were left-aligned, without page overflow, with original image ratio preserved and text outside the portrait area. STT closing CTAs were clicked and reached /en/start, /ja/start and /ko/start with the matching native intake heading. This is closing-section verification, not a full-site QA claim.

Rollback: revert this commit, preserving the earlier Chinese portrait-section deployment and all pre-existing localized page content.
