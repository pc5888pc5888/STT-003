type AnyRecord = Record<string, unknown>;

const FALLBACK_RECIPIENT = "pc5888@gmail.com";

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

async function deliverViaEmailJs(body: AnyRecord, fullMessage: string) {
  const apiUrl = process.env.EMAILJS_API_URL?.trim();
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();
  if (!apiUrl || !serviceId || !templateId || !publicKey) return { attempted: false, ok: false };

  const name = firstText(body, ["name", "姓名", "contact_name", "from_name", "受訪者姓名"]);
  const company = firstText(body, ["company", "companyName", "企業名稱", "公司名稱", "brand", "品牌名稱"]);
  const email = firstText(body, ["email", "Email", "電子郵件", "from_email"]);
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
  const name = firstText(body, ["name", "姓名", "contact_name", "from_name", "受訪者姓名"]) || "人文地景產填表者";
  const email = firstText(body, ["email", "Email", "電子郵件", "from_email"]);
  const company = firstText(body, ["company", "companyName", "企業名稱", "公司名稱", "brand", "品牌名稱"]);
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

export default async function handler(req: any, res: any) {
  const emailJsConfigured = Boolean(
    process.env.EMAILJS_API_URL?.trim() &&
    process.env.EMAILJS_SERVICE_ID?.trim() &&
    process.env.EMAILJS_TEMPLATE_ID?.trim() &&
    process.env.EMAILJS_PUBLIC_KEY?.trim()
  );

  if (req.method === "GET") return json(res, 200, { ok: true, emailJsConfigured, fallbackConfigured: true });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const body = parseBody(req);
  if (firstText(body, ["bot-field"])) return json(res, 200, { ok: true });
  const fullMessage = stringifySubmission(body);
  if (!fullMessage.trim()) return json(res, 400, { ok: false, error: "Empty submission" });

  try {
    const primary = await deliverViaEmailJs(body, fullMessage);
    if (primary.attempted && primary.ok) return json(res, 200, { ok: true, delivery: "primary" });
    if (primary.attempted && !primary.ok) console.error("humanistic EmailJS delivery failed", primary.status, primary.detail);

    const fallback = await deliverViaFormSubmit(body, fullMessage);
    if (!fallback.ok) {
      console.error("humanistic fallback delivery failed", fallback.status, fallback.detail);
      return json(res, 502, { ok: false, error: "Submission delivery failed" });
    }
    return json(res, 200, { ok: true, delivery: "fallback" });
  } catch (error) {
    console.error("humanistic submit failed", error);
    return json(res, 502, { ok: false, error: "Submission service connection failed" });
  }
}
