type Payload = Record<string, unknown>;

const LIMITS: Record<string, number> = {
  name: 120,
  contact: 300,
  organization: 200,
  title: 160,
  member_type: 40,
  participation: 2000,
};

const ALLOWED_MEMBER_TYPES = ["個人會員", "榮譽會員", "贊助會員"];
const DEFAULT_FROM = "GCSDA Website <onboarding@resend.dev>";

function json(res: any, status: number, body: Record<string, unknown>) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function parseBody(req: any): Payload {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body as Payload;
  const raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";
  try { return JSON.parse(raw || "{}"); } catch { return {}; }
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export default async function handler(req: any, res: any) {
  if (req.method === "GET") return json(res, 200, {
    ok: true,
    resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    recipientConfigured: Boolean(process.env.GCSDA_MEMBERSHIP_EMAIL?.trim()),
    acceptsFiles: false,
  });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  if (cleanText(body["bot-field"], 100)) return json(res, 200, { ok: true });

  const data = {
    name: cleanText(body.name, LIMITS.name),
    contact: cleanText(body.contact, LIMITS.contact),
    organization: cleanText(body.organization, LIMITS.organization),
    title: cleanText(body.title, LIMITS.title),
    member_type: cleanText(body.member_type, LIMITS.member_type),
    participation: cleanText(body.participation, LIMITS.participation),
  };

  if (!data.name || !data.contact || !data.participation || !ALLOWED_MEMBER_TYPES.includes(data.member_type)) {
    return json(res, 400, { ok: false, error: "Please check required fields" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.GCSDA_MEMBERSHIP_EMAIL?.trim();
  if (!apiKey || !recipient) return json(res, 503, { ok: false, error: "Delivery unavailable" });

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const receiptId = `GCSDA-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const text = [
    "【GCSDA｜入會申請】",
    `申請編號：${receiptId}`,
    "",
    `姓名或稱謂：${data.name}`,
    `聯絡方式：${data.contact}`,
    `公司／機構：${data.organization || "未填"}`,
    `職務／專業角色：${data.title || "未填"}`,
    `申請會員類別：${data.member_type}`,
    "",
    "參與學會的主要期待：",
    data.participation,
  ].join("\n");

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: `[GCSDA 入會申請] ${data.name}｜${receiptId}`,
        text,
      }),
    });

    const result = await upstream.json().catch(() => ({})) as { id?: unknown };
    if (!upstream.ok || typeof result.id !== "string" || !result.id.trim()) {
      return json(res, 503, { ok: false, error: "Delivery unavailable", receiptId });
    }

    return json(res, 200, { ok: true, receiptId });
  } catch {
    return json(res, 503, { ok: false, error: "Delivery unavailable", receiptId });
  }
}
