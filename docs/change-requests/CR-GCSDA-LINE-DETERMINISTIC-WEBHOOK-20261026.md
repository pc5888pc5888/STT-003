# CR-GCSDA-LINE-DETERMINISTIC-WEBHOOK-20261026

Date: 2026-10-26
Phase: LINE ACTIVE_BUILD
Website gate: QA_PASS / BUILD_LOCKED

## Implemented

- follow event -> approved GCSDA welcome message
- text message -> deterministic keyword routing only
- image/file/audio/video -> sensitive-data guard
- x-line-signature verification required before processing
- STT keyword -> explicit separate-institution clarification
- no generative case-specific advice
- no automatic membership approval

## Live boundary

The webhook is deployed in fail-closed mode. Without LINE_GCSDA_CHANNEL_SECRET and LINE_GCSDA_CHANNEL_ACCESS_TOKEN it reports configured=false and rejects live processing.
