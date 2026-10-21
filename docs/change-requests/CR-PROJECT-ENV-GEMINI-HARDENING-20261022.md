# CR-PROJECT-ENV-GEMINI-HARDENING-20261022

Date: 2026-10-22
Approval: YES — owner requested professional dual-site technical audit and correction
Scope: Shared Vercel project environment

## Finding

The project contained a sensitive environment variable named `VITE_GEMINI_API_KEY` targeted to production and preview. In Vite, `VITE_` variables are eligible for client-side exposure when referenced by frontend code.

Current formal STT/GCSDA public builds do not require this variable.

## Change

Retarget `VITE_GEMINI_API_KEY` to development only.

The secret value was not read, copied or exposed during this change.

## Governance reason

- Public AI chatbot is not part of the approved website phase.
- AI must remain a governed supporting layer.
- Unneeded client-prefixed secrets must not be present in public deployment targets.
