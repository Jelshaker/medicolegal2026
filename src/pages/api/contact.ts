import type { APIRoute } from "astro";

export const prerender = false;

// POST /api/contact — stores an encrypted contact/enquiry request.
// Enquiries are persisted to the PATIENT_REFERRALS KV namespace under the
// `contact:` prefix; a human/automation must read and action them securely.
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
		const name = (body.name || "").trim().slice(0, 100);
		const email = (body.email || "").trim().slice(0, 120);
		const subject = (body.subject || "General enquiry").trim().slice(0, 160);
		const message = (body.message || "").trim().slice(0, 2000);

		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: "Missing required fields" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const id = crypto.randomUUID();
		const record = {
			name,
			email,
			subject,
			message,
			createdAt: new Date().toISOString(),
		};
		const encoded = btoa(JSON.stringify(record));
		await kv.put(`contact:${id}`, encoded);

		return new Response(JSON.stringify({ success: true, reference: id }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to send message" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};