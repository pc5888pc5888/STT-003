type Payload = Record<string, unknown>;

const LIMITS: Record<string, number> = {
  name: 120,
  phone: 80,
  email: 200,
  line_name: 120,
  city: 120,
  organization: 200,
  job_title: 160,
  other_expertise: 200,
  profile_url: 500,
  application_source: 60,
  referrer: 160,
  motivation: 300,
  professional_value: 1200,
};

const EXPERTISE_OPTIONS = [
  "企業經營／策略","公司治理／法遵","法律","會計／財稅","ESG／永續",
  "家族治理／企業接班","金融／資產治理","不動產／建築","科技／AI治理","學術／教育",
];

const PARTICIPATION_OPTIONS = [
  "會員大會與專題講座","企業治理與策略交流","家族治理與企業接班",
  "ESG與永續治理","AI治理與數位轉型","出版／研究／專欄協作",
];

const APPLICATION_SOURCES = ["自主申請","現任會員推薦","學會邀請","活動／講座後申請"];
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

function cleanList(value: unknown, allowed: readonly string[]) {
  if (!Array.isArray(value)) return [] as string[];
  return value.filter((item): item is string => typeof item === "string" && allowed.includes(item));
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
    phone: cleanText(body.phone, LIMITS.phone),
    email: cleanText(body.email, LIMITS.email),
    line_name: cleanText(body.line_name, LIMITS.line_name),
    city: cleanText(body.city, LIMITS.city),
    organization: cleanText(body.organization, LIMITS.organization),
    job_title: cleanText(body.job_title, LIMITS.job_title),
    expertise: cleanList(body.expertise, EXPERTISE_OPTIONS),
    other_expertise: cleanText(body.other_expertise, LIMITS.other_expertise),
    profile_url: cleanText(body.profile_url, LIMITS.profile_url),
    application_source: cleanText(body.application_source, LIMITS.application_source),
    referrer: cleanText(body.referrer, LIMITS.referrer),
    motivation: cleanText(body.motivation, LIMITS.motivation),
    participation_areas: cleanList(body.participation_areas, PARTICIPATION_OPTIONS),
    professional_value: cleanText(body.professional_value, LIMITS.professional_value),
    truth: body.truth === true,
    privacy: body.privacy === true,
  };

  if (
    !data.name || !data.phone || !data.email || !data.organization || !data.job_title ||
    !data.expertise.length || !APPLICATION_SOURCES.includes(data.application_source) ||
    data.motivation.length < 50 || !data.truth || !data.privacy
  ) {
    return json(res, 400, { ok: false, error: "Please check required fields" });
  }

  if (data.profile_url) {
    try {
      const url = new URL(data.profile_url);
      if (!["http:","https:"].includes(url.protocol)) return json(res, 400, { ok: false, error: "Invalid profile URL" });
    } catch {
      return json(res, 400, { ok: false, error: "Invalid profile URL" });
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.GCSDA_MEMBERSHIP_EMAIL?.trim();
  if (!apiKey || !recipient) return json(res, 503, { ok: false, error: "Delivery unavailable" });

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const receiptId = `GCSDA-${Date.now()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const text = [
    "【GCSDA｜會員資格申請】",
    `申請編號：${receiptId}`,
    "",
    "—— 基本資料 ——",
    `姓名：${data.name}`,
    `聯絡電話：${data.phone}`,
    `電子郵件：${data.email}`,
    `LINE 顯示名稱：${data.line_name || "未填"}`,
    `所在縣市：${data.city || "未填"}`,
    "",
    "—— 專業背景 ——",
    `現職單位／機構：${data.organization}`,
    `職稱：${data.job_title}`,
    `主要專業領域：${data.expertise.join("、")}`,
    `其他專業領域：${data.other_expertise || "未填"}`,
    `公開專業連結：${data.profile_url || "未填"}`,
    "",
    "—— 參與申請 ——",
    `申請來源：${data.application_source}`,
    `推薦人／邀請人：${data.referrer || "未填"}`,
    `申請加入學會的原因：${data.motivation}`,
    `希望參與的方向：${data.participation_areas.length ? data.participation_areas.join("、") : "未填"}`,
    `可提供的專業價值：${data.professional_value || "未填"}`,
    "",
    "申請人已確認資料真實，並同意學會於會員資格審查、聯繫、會務管理與必要行政作業範圍內處理本表資料。",
  ].join("\n");

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: `[GCSDA 會員資格申請] ${data.name}｜${receiptId}`,
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
