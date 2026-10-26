# CR-GCSDA-MEMBERSHIP-OIDC-RELAY-20261026

Date: 2026-10-26
Phase: LINE ACTIVE_BUILD

## Change

Before the FormSubmit fallback, GCSDA membership delivery now uses the deployment's short-lived Vercel OIDC identity to call the governed production email relay.

## Security

- no Resend key copied to the GCSDA branch
- no long-lived relay secret
- relay validates Vercel OIDC issuer/audience/project/environment
- FormSubmit remains a last fallback only
- owner LINE alert remains optional and credential-gated

## Acceptance

Real POST E2E must return HTTP 200 with transport=resend-oidc-relay before the delivery workstream can pass.
