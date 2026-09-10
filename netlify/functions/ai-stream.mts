type AiRequestBody = {
  message?: string;
  conversationId?: string;
  userId?: string;
  inputs?: Record<string, unknown>;
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

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const apiBaseUrl = process.env.DIFY_API_BASE_URL?.trim();
  const apiKey = process.env.DIFY_API_KEY?.trim();

  if (!apiBaseUrl || !apiKey) {
    return jsonResponse(503, { error: "AI service is not configured" });
  }

  let body: AiRequestBody;
  try {
    body = (await request.json()) as AiRequestBody;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const message = body.message?.trim();
  if (!message) {
    return jsonResponse(400, { error: "Message is required" });
  }

  const userId = body.userId?.trim() || "stt-web-visitor";
  const conversationId = body.conversationId?.trim() || "";

  try {
    const upstream = await fetch(`${normalizeBaseUrl(apiBaseUrl)}/chat-messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        inputs: body.inputs ?? {},
        query: message,
        response_mode: "streaming",
        conversation_id: conversationId,
        user: userId,
      }),
      signal: request.signal,
    });

    if (!upstream.ok) {
      return jsonResponse(upstream.status >= 500 ? 502 : upstream.status, {
        error: "AI upstream request failed",
      });
    }

    if (!upstream.body) {
      return jsonResponse(502, { error: "AI upstream returned no stream" });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return jsonResponse(499, { error: "Request cancelled" });
    }
    return jsonResponse(502, { error: "AI service connection failed" });
  }
}
