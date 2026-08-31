type TtsRequestBody = {
  text?: string;
  locale?: string;
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function requestOpenAiTts(text: string) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const apiUrl = process.env.OPENAI_TTS_API_URL?.trim();
  const model = process.env.OPENAI_TTS_MODEL?.trim();
  const voice = process.env.OPENAI_TTS_VOICE?.trim();

  if (!apiKey || !apiUrl || !model || !voice) {
    return jsonResponse(503, { error: "OpenAI TTS is not configured" });
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      model,
      voice,
      input: text,
      format: "mp3",
    }),
  });

  if (!response.ok || !response.body) {
    return jsonResponse(502, { error: "OpenAI TTS request failed" });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}

async function requestElevenLabsTts(text: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const apiUrl = process.env.ELEVENLABS_TTS_API_URL?.trim();
  const modelId = process.env.ELEVENLABS_MODEL_ID?.trim();

  if (!apiKey || !apiUrl || !modelId) {
    return jsonResponse(503, { error: "ElevenLabs TTS is not configured" });
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
    }),
  });

  if (!response.ok || !response.body) {
    return jsonResponse(502, { error: "ElevenLabs TTS request failed" });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  let body: TtsRequestBody;
  try {
    body = (await request.json()) as TtsRequestBody;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const text = body.text?.trim();
  if (!text) {
    return jsonResponse(400, { error: "Text is required" });
  }

  if (text.length > 6000) {
    return jsonResponse(413, { error: "Text is too long" });
  }

  const provider = process.env.TTS_PROVIDER?.trim().toLowerCase() || "openai";

  try {
    if (provider === "elevenlabs") {
      return await requestElevenLabsTts(text);
    }
    if (provider === "openai") {
      return await requestOpenAiTts(text);
    }
    return jsonResponse(503, { error: "TTS provider is not supported" });
  } catch {
    return jsonResponse(502, { error: "TTS service connection failed" });
  }
}
