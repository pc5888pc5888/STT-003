type AnyRecord = Record<string, unknown>;

const RECIPIENT = "pc5888@gmail.com";
const DEFAULT_RESEND_FROM = "STT Governance <onboarding@resend.dev>";

function json(res: any, status: number, body: AnyRecord) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function textValue(source: AnyRecord, key: string) {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function stringifySubmission(source: AnyRecord) {
  return Object.entries(source)
    .filter(([key]) => !["bot-field"].includes(key))
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value ?? "")}`)
    .join("\n\n");
}

function parseBody(req: any): AnyRecord {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body as AnyRecord;
  const raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";
  const contentType = String(req.headers?.["content-type"] || "").toLowerCase();
  if (contentType.includes("application/json")) {
    try { return JSON.parse(raw || "{}"); } catch { return {}; }
  }
  const params = new URLSearchParams(raw);
  const out: AnyRecord = {};
  for (const [key, value] of params.entries()) out[key] = value;
  return out;
}

function createReceiptId() {
  return `COOP-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

const routeNames: Record<string, string> = {
  "governance-intake": "治理判讀受理",
  "enterprise-evaluation": "企業經營診斷與策略評估",
  "speaking-invitation": "主題演講與論壇邀約",
};

export default async function handler(req: any, res: any) {
  if (req.method === "GET") return json(res, 200, {
    ok: true,
    resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    contentRetention: "none",
  });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  if (textValue(body, "bot-field")) return json(res, 200, { ok: true });

  const route = textValue(body, "route");
  if (!routeNames[route]) return json(res, 400, { ok: false, error: "Unsupported cooperation route" });

  const content = stringifySubmission(body);
  if (!content.trim()) return json(res, 400, { ok: false, error: "Empty submission" });

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return json(res, 503, { ok: false, error: "Delivery unavailable" });

  const receiptId = createReceiptId();
  const contact = textValue(body, "contact");
  const receivedAt = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM;
  const routeName = routeNames[route];

  const mailText = [
    "【STT Governance｜合作受理新送件】",
    `受理類型：${routeName}`,
    `收件編號：${receiptId}`,
    `收件時間：${receivedAt}`,
    "",
    "—— 完整填寫內容 ——",
    content,
  ].join("\n");

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        subject: `[STT 合作受理] ${routeName}｜${receiptId}`,
        text: mailText,
      }),
    });

    if (!upstream.ok) {
      console.error("COOPERATION_EMAIL_FAILED", JSON.stringify({
        receiptId,
        route,
        status: upstream.status,
        failedAt: new Date().toISOString(),
      }));
      return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });
    }

    console.log("COOPERATION_EMAIL_SENT", JSON.stringify({
      receiptId,
      route,
      sentAt: new Date().toISOString(),
    }));

    return json(res, 200, { ok: true, delivery: "resend-email", receiptId });
  } catch (error) {
    console.error("COOPERATION_EMAIL_FAILED", JSON.stringify({
      receiptId,
      route,
      failedAt: new Date().toISOString(),
      error: error instanceof Error ? error.name : "UnknownError",
    }));
    return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });
  }
}
