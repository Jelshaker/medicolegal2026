import type { APIRoute } from "astro";

export const prerender = false;

// POST /api/referrals — stores a secure GP/Consultant referral into the
// PATIENT_REFERRALS KV namespace. Data is kept encoded (Base64) and must be
// decrypted/read via the authenticated internal tooling — do not expose PII
// through this response.
export const POST: APIRoute = async ({ request, locals }) => {
	const kv = (locals as App.Locals).runtime?.env.PATIENT_REFERRALS;
	if (!kv) {
		return new Response(JSON.stringify({ error: "KV binding not configured" }), {
			status: 503,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const body = (await request.json()) as Record<string, string>;
		const required = ["referrerType", "referrerName", "referrerEmail", "patientRef"];
		for (const field of required) {
			if (!(body[field] || "").trim()) {
				return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		const id = crypto.randomUUID();
		const encoded = btoa(JSON.stringify(body));
		await kv.put(`referral:${id}`, encoded, { metadata: { createdAt: new Date().toISOString() } });

		return new Response(JSON.stringify({ success: true, reference: id }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to accept referral" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};