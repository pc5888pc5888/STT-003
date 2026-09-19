type AnyRecord = Record<string, unknown>;

function json(res: any, status: number, body: AnyRecord) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

export default function handler(req: any, res: any) {
  if (req.method !== "GET") return json(res, 405, { ok: false, error: "Method not allowed" });
  return json(res, 200, {
    ok: true,
    sha: process.env.VERCEL_GIT_COMMIT_SHA || "",
    ref: process.env.VERCEL_GIT_COMMIT_REF || "",
    environment: process.env.VERCEL_ENV || "",
  });
}
