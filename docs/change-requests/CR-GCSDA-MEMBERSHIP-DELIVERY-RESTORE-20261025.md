# CR-GCSDA-MEMBERSHIP-DELIVERY-RESTORE-20261025

Date: 2026-10-25
Approval: YES — owner required correction of the misleading membership fallback state.

## Finding

The current production page hid the membership form whenever Resend was unavailable, even though an earlier GCSDA membership implementation already used a working form-delivery recipient.

## Correction

- Preserve the existing four-step membership form.
- Resend remains the preferred transport when configured.
- FormSubmit is restored as the fallback transport using the existing GCSDA membership recipient.
- Frontend now checks deliveryConfigured instead of equating Resend availability with form availability.
- Privacy copy now describes the actual backend transfer through delegated email/form-delivery services.
- LINE remains an emergency fallback only when all online delivery paths are unavailable.

## Acceptance

GET /api/gcsda-membership-submit must report deliveryConfigured=true.
The membership page must render the online application form when that value is true.
