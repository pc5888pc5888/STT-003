# STT Governance Runtime Environment Setup

This project follows a server-only secret policy. API keys, access tokens, provider URLs that reveal private infrastructure, and credential-like values must never be committed to the repository or exposed through Vite client variables.

## Primary runtime: Netlify

Open the Netlify project, then go to Site configuration or Project configuration → Environment variables.

Add only the variables required by the providers you enable.

### Dify

- `DIFY_API_BASE_URL`
- `DIFY_API_KEY`
- `DIFY_APP_ID` when the selected Dify application flow requires it

The browser never reads these variables. It calls `/api/ai/stream`, and the Netlify Function reads the Dify variables at runtime.

### Text-to-speech

Provider selector:

- `TTS_PROVIDER` = `openai` or `elevenlabs`

OpenAI:

- `OPENAI_API_KEY`
- `OPENAI_TTS_API_URL`
- `OPENAI_TTS_MODEL`
- `OPENAI_TTS_VOICE`

ElevenLabs:

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_TTS_API_URL`
- `ELEVENLABS_MODEL_ID`

The browser calls `/api/tts`. Provider credentials remain server-side.

### Contact delivery

- `EMAILJS_API_URL`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY` when used by the account configuration

The browser calls `/api/contact`; the delivery configuration is resolved in the server function.

### Application origin

- `APP_URL`

Use this only when a server-side function needs the canonical public application origin.

## GitHub environment variables and secrets

GitHub repository or environment secrets are appropriate for GitHub Actions workflows. They are not automatically available inside Netlify Functions. If Netlify is the production runtime, runtime provider credentials should be stored in Netlify Environment Variables unless a deliberate CI synchronization process is implemented.

## Prohibited patterns

Do not use any of these patterns for secrets:

- `VITE_DIFY_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_ELEVENLABS_API_KEY`
- `VITE_GEMINI_API_KEY`
- API keys inside `.ts`, `.tsx`, `.js`, `.json`, `.html`, or CSS files
- secrets committed to `.env`, `.env.local`, `.env.production`, or any other environment file

The repository keeps `.env.example` as a name-only contract. Real values must remain in the deployment platform's protected environment store.
