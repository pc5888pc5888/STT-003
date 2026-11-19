# GCSDA Chinese/English closing and footer alignment — 2026-11-19

Request: correct the Chinese/English presentation discrepancy shown in the owner's two GCSDA homepage screenshots.

## Before / after
- English home inherited `g4-page` inner-page padding (40 CSS px from cis-page-system.css); Chinese home did not. Remove that class from English home only. Other inner-page spacing remains intact.
- English shared footer omitted the privacy utility. Restore Privacy, linking to the existing `/privacy` notice, with a Traditional Chinese accessible label and hreflang. No new policy text or route is introduced.
- Browser QA found the legacy I18nProvider overwrote the route's html lang on an English-configured browser. Add an opt-out and enable it for GCSDA: route metadata remains the document-language authority.

## Preserved
All approved copy, name, logos, portrait bytes, image aspect ratios, header navigation, institutional boundaries, forms, external destinations, other page layouts and STT main branch remain unchanged.

## Candidate verification
- Production baseline: 813fea842302e08a1bc4d114c5b01fe4b9d64d73; formal /en page measured 40 px gap before change.
- Browser rendered / and /en in 1440, 768 and 390 px iframe boxes (actual document viewports 1425, 753 and 375 px due scrollbar).
- All six results: closing-to-footer gap 0 px, horizontal overflow 0 px, three footer groups, two utilities, headings left aligned.
- Each language pair has identical footer container widths/left edges: 1180/122.5, 673/40, 327/24 px respectively.
- Desktop footers both 406 px high. Smaller screens allow content-driven text wrapping (tablet 466.375/476.375 px, phone 454.5625/504.9375 px); text is not shortened or clipped to force equal heights.
- Both locales retain original portrait ratio 2048:969.
- Mobile English group expands and exposes four corresponding links.
- Privacy link click renders existing Chinese privacy notice.
- Direct Chinese reload has html lang zh-Hant-TW; switch to English has lang en; six iframe checks confirm locale metadata.
- Production STT home /, /en, /ja, /ko read-only check: closing-to-footer gap 0 px and privacy link present in all four.
- npm run build passes existing presentation, English foundation, navigator and LINE validators plus Vite/server build. git diff --check passes.

Scope: affected closing/footer presentation, language metadata and related navigation. This does not claim a complete site audit or new form-submission test. Production verification follows publication and is recorded in the task result.
