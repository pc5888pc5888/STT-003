type AnyRecord = Record<string, unknown>;

const FALLBACK_RECIPIENT = "pc5888@gmail.com";
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
    } else out[key] = value;
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

async function deliverViaResend(body: AnyRecord, fullMessage: string, receiptId: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { attempted: false, ok: false };

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
    to: [FALLBACK_RECIPIENT],
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

  const detail = await upstream.text().catch(() => "");
  return {
    attempted: true,
    ok: upstream.ok,
    status: upstream.status,
    detail: upstream.ok ? detail.slice(0, 500) : detail.slice(0, 1000),
  };
}

async function deliverViaEmailJs(body: AnyRecord, fullMessage: string) {
  const apiUrl = process.env.EMAILJS_API_URL?.trim();
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();
  if (!apiUrl || !serviceId || !templateId || !publicKey) return { attempted: false, ok: false };

  const name = participantName(body);
  const company = participantCompany(body);
  const email = participantEmail(body);
  const phone = firstText(body, ["phone", "mobile", "電話", "手機"]);
  const lineId = firstText(body, ["lineId", "line_id", "LINE", "LINE ID"]);

  const upstream = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey || undefined,
      template_params: {
        company_name: company || "人文地景產受訪申請",
        from_name: name || "人文地景產填表者",
        from_email: email || "未提供",
        phone: phone || "未提供",
        line_id: lineId || "",
        appointment_time: "",
        message: `【人文地景產｜20 Questions Journey】\n\n${fullMessage}`,
      },
    }),
  });
  return { attempted: true, ok: upstream.ok, status: upstream.status, detail: upstream.ok ? "" : (await upstream.text().catch(() => "")).slice(0, 500) };
}

async function deliverViaFormSubmit(body: AnyRecord, fullMessage: string) {
  const name = participantName(body) || "人文地景產填表者";
  const email = participantEmail(body);
  const company = participantCompany(body);
  const payload: Record<string, string> = {
    _subject: "【STT 人文地景產】20 Questions 新提交",
    _template: "table",
    _captcha: "false",
    姓名: name,
    企業品牌: company || "未提供",
    回覆Email: email || "未提供",
    完整內容: fullMessage,
  };
  const upstream = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FALLBACK_RECIPIENT)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const detail = await upstream.text().catch(() => "");
  let accepted = upstream.ok;
  try {
    const parsed = JSON.parse(detail);
    if (parsed && typeof parsed === "object" && "success" in parsed) accepted = Boolean(parsed.success);
  } catch {}
  return { ok: accepted, status: upstream.status, detail: detail.slice(0, 500) };
}

function recordServerReceipt(body: AnyRecord, fullMessage: string) {
  const receiptId = `HUM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  console.log("HUMANISTIC_SUBMISSION_RECEIVED", JSON.stringify({
    receiptId,
    receivedAt: new Date().toISOString(),
    body,
    fullMessage,
  }));
  return receiptId;
}

export default async function handler(req: any, res: any) {
  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
  const emailJsConfigured = Boolean(
    process.env.EMAILJS_API_URL?.trim() &&
    process.env.EMAILJS_SERVICE_ID?.trim() &&
    process.env.EMAILJS_TEMPLATE_ID?.trim() &&
    process.env.EMAILJS_PUBLIC_KEY?.trim()
  );

  if (req.method === "GET") return json(res, 200, { ok: true, resendConfigured, emailJsConfigured, fallbackConfigured: true, serverReceiptConfigured: true });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  if (firstText(body, ["bot-field"])) return json(res, 200, { ok: true });
  const fullMessage = stringifySubmission(body);
  if (!fullMessage.trim()) return json(res, 400, { ok: false, error: "Empty submission" });

  const receiptId = recordServerReceipt(body, fullMessage);

  try {
    const resendDelivery = await deliverViaResend(body, fullMessage, receiptId);
    if (resendDelivery.attempted && resendDelivery.ok) {
      console.log("HUMANISTIC_EMAIL_SENT", JSON.stringify({ receiptId, provider: "resend", detail: resendDelivery.detail }));
      return json(res, 200, { ok: true, delivery: "resend-email", receiptId });
    }
    if (resendDelivery.attempted && !resendDelivery.ok) {
      console.error("humanistic Resend delivery failed", resendDelivery.status, resendDelivery.detail);
    }

    const primary = await deliverViaEmailJs(body, fullMessage);
    if (primary.attempted && primary.ok) return json(res, 200, { ok: true, delivery: "email", receiptId });
    if (primary.attempted && !primary.ok) console.error("humanistic EmailJS delivery failed", primary.status, primary.detail);

    try {
      const fallback = await deliverViaFormSubmit(body, fullMessage);
      if (fallback.ok) return json(res, 200, { ok: true, delivery: "email-fallback", receiptId });
      console.error("humanistic fallback delivery failed", fallback.status, fallback.detail);
    } catch (fallbackError) {
      console.error("humanistic fallback connection failed", fallbackError);
    }

    return json(res, 200, { ok: true, delivery: "server-receipt", receiptId });
  } catch (error) {
    console.error("humanistic primary delivery failed after server receipt", error);
    return json(res, 200, { ok: true, delivery: "server-receipt", receiptId });
  }
}
