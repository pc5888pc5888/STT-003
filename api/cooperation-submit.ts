type AnyRecord = Record<string, unknown>;

const INTAKE_LIMITS: Record<string, number> = {
  name: 120, contact: 300, role: 30, situation: 4000,
  undesired: 4000, desired: 4000, deadline_status: 1,
  deadline_date: 10, event_type: 30,
};
const ROLES = ["企業主", "家族成員", "董事", "經理人", "專業顧問", "其他"];
const EVENT_TYPES = ["重大決策", "家族接班", "股權治理", "AI 治理", "機構合作", "其他"];
function validateIntake(body: AnyRecord): Record<string, string> | null {
  const clean: Record<string, string> = {};
  for (const [key, max] of Object.entries(INTAKE_LIMITS)) {
    if (typeof body[key] !== "string" || String(body[key]).length > max) return null;
    clean[key] = String(body[key]).trim();
    if (key !== "deadline_date" && !clean[key]) return null;
  }
  if (!ROLES.includes(clean.role) || !EVENT_TYPES.includes(clean.event_type)) return null;
  if (!["無", "有"].includes(clean.deadline_status)) return null;
  if (clean.deadline_status === "有") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.deadline_date)) return null;
    const date = new Date(clean.deadline_date + "T00:00:00.000Z");
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== clean.deadline_date) return null;
  } else { clean.deadline_date = ""; }
  // Only the eight specified information categories reach the mail service.
  return clean;
}

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

function createReceiptId(route: string) {
  const prefix = route === "governance-intake" ? "GOV" : "COOP";
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
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
    acceptsFiles: false,
  });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const contentType = String(req.headers?.["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json") && !contentType.includes("application/x-www-form-urlencoded")) {
    return json(res, 415, { ok: false, error: "Unsupported content type" });
  }
  const body = parseBody(req);
  if (!body || Array.isArray(body) || typeof body !== "object") return json(res, 400, { ok: false, error: "Invalid submission" });
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > 64000) return json(res, 413, { ok: false, error: "Submission too large" });
  if (textValue(body, "bot-field")) return json(res, 200, { ok: true });

  const route = textValue(body, "route");
  if (!routeNames[route]) return json(res, 400, { ok: false, error: "Unsupported cooperation route" });

  const clean = route === "governance-intake" ? validateIntake(body) : body;
  if (!clean) return json(res, 400, { ok: false, error: "Please check required fields" });
  const content = stringifySubmission(clean);
  if (!content.trim()) return json(res, 400, { ok: false, error: "Empty submission" });

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return json(res, 503, { ok: false, error: "Delivery unavailable" });

  const keyHeader = req.headers?.["idempotency-key"];
  const requestKey = typeof keyHeader === "string" ? keyHeader : "";
  if (requestKey && !/^[a-zA-Z0-9_-]{16,80}$/.test(requestKey)) return json(res, 400, { ok: false, error: "Invalid request key" });
  const receiptId = requestKey ? `${route === "governance-intake" ? "GOV" : "COOP"}-${requestKey}` : createReceiptId(route);
  const contact = textValue(body, "contact");
  const receivedAt = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM;
  const routeName = routeNames[route];

  const intakeKind = route === "governance-intake" ? "治理受理" : "合作受理";
  const mailText = [
    `【STT Governance｜${intakeKind}新送件】`,
    `受理類型：${routeName}`,
    `收件編號：${receiptId}`,
    ...(requestKey ? [] : [`收件時間：${receivedAt}`]),
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
        ...(requestKey ? { "Idempotency-Key": `stt-${route}-${requestKey}` } : {}),
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        subject: `[STT ${intakeKind}] ${routeName}｜${receiptId}`,
        text: mailText,
      }),
    });

    const result = await upstream.json().catch(() => ({})) as { id?: unknown };
    if (!upstream.ok || typeof result.id !== "string" || !result.id.trim()) {
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
