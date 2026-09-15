type AnyRecord = Record<string, unknown>;

const RECIPIENT = "pc5888@gmail.com";
const DEFAULT_RESEND_FROM = "STT 人文地景產 <onboarding@resend.dev>";

function json(res: any, status: number, body: AnyRecord) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function firstText(source: AnyRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function stringifySubmission(source: AnyRecord) {
  return Object.entries(source)
    .filter(([key]) => key !== "bot-field" && key !== "form-name")
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
  for (const [key, value] of params.entries()) {
    if (key in out) {
      const prior = out[key];
      out[key] = Array.isArray(prior) ? [...prior, value] : [String(prior), value];
    } else {
      out[key] = value;
    }
  }
  return out;
}

function participantName(body: AnyRecord) {
  return firstText(body, ["participant_name", "name", "姓名", "contact_name", "from_name", "受訪者姓名"]);
}

function participantEmail(body: AnyRecord) {
  return firstText(body, ["participant_email", "email", "Email", "電子郵件", "from_email"]);
}

function participantCompany(body: AnyRecord) {
  return firstText(body, ["participant_company", "company", "companyName", "企業名稱", "公司名稱", "brand", "品牌名稱"]);
}

function createReceiptId() {
  return `HUM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

async function deliverViaResend(body: AnyRecord, fullMessage: string, receiptId: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { attempted: false, ok: false, status: 503 };

  const name = participantName(body);
  const email = participantEmail(body);
  const company = participantCompany(body);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM;
  const receivedAt = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });

  const text = [
    "【STT 人文地景產｜20 Questions 新送件】",
    `收件編號：${receiptId}`,
    `收件時間：${receivedAt}`,
    `姓名：${name || "未提供"}`,
    `企業／品牌：${company || "未提供"}`,
    `回覆 Email：${email || "未提供"}`,
    "",
    "—— 完整填寫內容 ——",
    fullMessage,
  ].join("\n");

  const payload: AnyRecord = {
    from,
    to: [RECIPIENT],
    subject: `[STT 人文地景產] 新送件｜${name || "未署名"}｜${receiptId}`,
    text,
  };
  if (email) payload.reply_to = email;

  const upstream = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  return { attempted: true, ok: upstream.ok, status: upstream.status };
}

export default async function handler(req: any, res: any) {
  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());

  if (req.method === "GET") {
    return json(res, 200, {
      ok: true,
      resendConfigured,
      contentRetention: "none",
      serverContentLogging: false,
    });
  }
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  if (firstText(body, ["bot-field"])) return json(res, 200, { ok: true });

  const fullMessage = stringifySubmission(body);
  if (!fullMessage.trim()) return json(res, 400, { ok: false, error: "Empty submission" });

  const receiptId = createReceiptId();

  try {
    const delivery = await deliverViaResend(body, fullMessage, receiptId);
    if (delivery.attempted && delivery.ok) {
      // Privacy rule: never log submitted names, emails, answers, or the full message.
      console.log("HUMANISTIC_EMAIL_SENT", JSON.stringify({
        receiptId,
        provider: "resend",
        sentAt: new Date().toISOString(),
      }));
      return json(res, 200, { ok: true, delivery: "resend-email", receiptId });
    }

    console.error("HUMANISTIC_EMAIL_FAILED", JSON.stringify({
      receiptId,
      provider: "resend",
      status: delivery.status,
      failedAt: new Date().toISOString(),
    }));
    return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });
  } catch (error) {
    console.error("HUMANISTIC_EMAIL_FAILED", JSON.stringify({
      receiptId,
      provider: "resend",
      failedAt: new Date().toISOString(),
      error: error instanceof Error ? error.name : "UnknownError",
    }));
    return json(res, 503, { ok: false, error: "Delivery unavailable. Please retry.", receiptId });
  }
}
