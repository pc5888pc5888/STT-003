# Council photograph resolution restoration

Owner requested correction of the low-resolution council photograph.

Source: existing public/images/group-001.png, native 3074 x 1728, git blob 7c0eb2002173a4badbcdd189614afec097be2997. The original source file remains byte-identical.

The old website used a 700 x 394, 12706-byte embedded thumbnail. The corrected delivery asset retains native 3074 x 1728 resolution and is losslessly encoded as WebP. No enlargement, crop, AI generation, face reconstruction or professional-identity changes.

White-canvas preservation: manual review found that the native file contains an opaque black exterior matte, unlike the prior white-background website image. Only the edge-connected exactly-black background was set to white. All other visible pixel values remain exactly unchanged. Interior disconnected dark regions and all non-black pixels were not altered. Final decoded RGB SHA-256: 0c618cbbe887a25d3cea438aa727b68af722304e0ce348b2307004cfbe53e012.

The full original canvas is retained without the old thumbnail padding. The 700px figure container, member list, roles, ordering, approved caption, alt, navigation, other association pages and all STT files are unchanged.

Caption: 策略治理聯席會成員團體照，人物辨識依照片由左至右列示如下。（學會提供）

Asset path: /images/gcsda-council-members-original-3074.webp

Three high-density viewport tests validated native image dimensions, full containment, caption equality and eight member cards. Final white delivery pixels were reviewed independently. Vercel login restrictions are not changed; this record does not assert full public accessibility or whole-site BUILD_LOCK.
