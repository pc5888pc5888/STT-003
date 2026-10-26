# CR-LINE-GCSDA-OIDC-DELIVERY-RELAY-20261026

Date: 2026-10-26
Phase: LINE ACTIVE_BUILD

## Purpose

Restore GCSDA membership delivery without duplicating or exposing the existing production Resend credential.

## Architecture

- GCSDA preview deployment supplies its short-lived Vercel OIDC identity.
- Production internal relay validates issuer, audience, project and preview-environment subject.
- Relay accepts only GCSDA membership subject/body formats.
- Relay uses the existing production Resend credential.
- No secret is copied into Git or the GCSDA branch.
- No database, queue, CRM or new third-party service is introduced.

## Institutional boundary

This is shared hosting infrastructure only. It does not represent GCSDA as an STT subsidiary or merge the two public institutional identities.
