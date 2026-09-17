import type { APIRoute } from "astro";

export const prerender = false;

// POST /api/referrals — stores a secure GP/Consultant referral.
// In-memory storage — referrals are stored in a module-level map and will
// reset on every deploy.  No KV binding required; can be upgraded later.
const referralsStore = [];

export const POST: APIRoute = async ({ request }) => {
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
		const record = { ...body, createdAt: new Date().toISOString() };
		referralsStore.push({ id, record });

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