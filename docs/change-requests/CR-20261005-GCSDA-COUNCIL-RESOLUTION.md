# Council photo resolution correction

Owner request: 策略治理聯席會成員團體照你的解析度太低了

Implementation: Restore the existing group-001.png master at native 3074 x 1728 resolution using lossless WebP, replacing the 700 x 394, 12706-byte embedded thumbnail. Original master remains byte-identical; visible pixels are verified identical after encoding. Other source candidates were excluded because their arrangement differs. No AI generation, facial editing, retouching, crop or upscaling.

Keep the existing 700px figure container, all names, roles, order, caption, alt, navigation, author profile and STT files unchanged. The original PNG canvas is retained in full, without the old thumbnail delivery padding. Only image delivery and its intrinsic aspect ratio change.

Caption preserved: 策略治理聯席會成員團體照，人物辨識依照片由左至右列示如下。（學會提供）

Asset: /images/gcsda-council-members-original-3074.webp
Master git blob: 7c0eb2002173a4badbcdd189614afec097be2997

Build and responsive evidence: docs/qa/COUNCIL_RESOLUTION_20261005.json. Public unauthenticated access is a separate known blocker; no deployment protection or routing change is authorized by this correction. This record does not assert whole-site BUILD_LOCK.
