type Req = { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> };

type Submission = {
  name?: string;
  email?: string;
  companyName?: string;
  phone?: string;
  backup?: string;
  answers?: Record<string, unknown>;
};

function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function configured() {
  return Boolean(
    process.env.EMAILJS_API_URL?.trim() &&
    process.env.EMAILJS_SERVICE_ID?.trim() &&
    process.env.EMAILJS_TEMPLATE_ID?.trim() &&
    process.env.EMAILJS_PUBLIC_KEY?.trim()
  );
}

function asText(body: Submission) {
  const supplied = clean(body.backup, 50000);
  if (supplied) return supplied;
  const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
  return Object.entries(answers)
    .map(([key, value]) => `${key}: ${clean(value, 6000)}`)
    .filter((line) => !line.endsWith(": "))
    .join("\n\n")
    .slice(0, 50000);
}

export default async function handler(req: Req, res: any) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "GET" || req.method === "HEAD") {
    return res.status(200).json({ ok: true, configured: configured(), service: "humanistic-interview" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, HEAD, POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  if (!configured()) {
    return res.status(503).json({ ok: false, error: "delivery_not_configured" });
  }

  let body: Submission = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : ((req.body || {}) as Submission);
  } catch {
    return res.status(400).json({ ok: false, error: "invalid_json" });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const companyName = clean(body.companyName, 300) || "人文地景產 20Q 訪談";
  const phone = clean(body.phone, 100);
  const message = asText(body);

  if (!name || !message) {
    return res.status(400).json({ ok: false, error: "required_fields_missing" });
  }

  const apiUrl = process.env.EMAILJS_API_URL!.trim();
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID!.trim(),
    template_id: process.env.EMAILJS_TEMPLATE_ID!.trim(),
    user_id: process.env.EMAILJS_PUBLIC_KEY!.trim(),
    accessToken: process.env.EMAILJS_PRIVATE_KEY?.trim() || undefined,
    template_params: {
      company_name: companyName,
      from_name: name,
      from_email: email,
      reply_to: email,
      phone,
      line_id: "",
      appointment_time: "",
      subject: `人文地景產 20Q 訪談｜${name}`,
      form_name: "humanistic-20q",
      message,
      backup: message,
      to_email: "pc5888@gmail.com",
    },
  };

  try {
    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });
    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 500);
      console.error("humanistic delivery rejected", upstream.status, detail);
      return res.status(502).json({ ok: false, error: "delivery_rejected" });
    }
    return res.status(200).json({ ok: true, delivered: true });
  } catch (error) {
    console.error("humanistic delivery connection failed", error instanceof Error ? error.message : "unknown");
    return res.status(502).json({ ok: false, error: "delivery_connection_failed" });
  }
}
