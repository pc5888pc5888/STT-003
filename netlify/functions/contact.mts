type ContactRequestBody = {
  companyName?: string;
  name?: string;
  email?: string;
  phone?: string;
  lineId?: string;
  appointmentTime?: string;
  message?: string;
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

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const apiUrl = process.env.EMAILJS_API_URL?.trim();
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

  if (!apiUrl || !serviceId || !templateId || !publicKey) {
    return jsonResponse(503, { error: "Contact service is not configured" });
  }

  let body: ContactRequestBody;
  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const companyName = body.companyName?.trim();
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!companyName || !name || !email || !phone) {
    return jsonResponse(400, { error: "Required contact fields are missing" });
  }

  try {
    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey || undefined,
        template_params: {
          company_name: companyName,
          from_name: name,
          from_email: email,
          phone,
          line_id: body.lineId?.trim() || "",
          appointment_time: body.appointmentTime?.trim() || "",
          message: body.message?.trim() || "",
        },
      }),
    });

    if (!upstream.ok) {
      return jsonResponse(502, { error: "Contact service request failed" });
    }

    return jsonResponse(200, { ok: true });
  } catch {
    return jsonResponse(502, { error: "Contact service connection failed" });
  }
}
