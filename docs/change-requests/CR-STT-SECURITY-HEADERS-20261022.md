# CR-STT-SECURITY-HEADERS-20261022

Date: 2026-10-22
Approval: YES — owner requested professional dual-site audit and correction
Scope: STT Governance global HTTP response hardening

## Change

Add baseline response headers for all public routes:
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: SAMEORIGIN
- Permissions-Policy: camera=(), microphone=(), geolocation=()

No CSP is introduced in this change to avoid breaking approved Google Fonts, external reading links or existing intake functionality without a separate compatibility audit.
