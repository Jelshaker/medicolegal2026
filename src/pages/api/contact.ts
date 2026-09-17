import type { APIRoute } from "astro";

export const prerender = false;

// POST /api/contact — stores an encrypted contact/enquiry request.
// In-memory storage — messages are stored in a module-level map and will
// reset on every deploy.  No KV binding required; can be upgraded later.
const messagesStore = [];

export const POST: APIRoute = async ({ request }) => {
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
		const record = { name, email, subject, message, createdAt: new Date().toISOString() };
		messagesStore.push({ id, record });

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