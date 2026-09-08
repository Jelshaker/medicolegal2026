import type { APIRoute } from "astro";
import { DEMO_PORTAL_ACCOUNT } from "../../consts";

export const prerender = false;

// POST /api/login — professional portal sign-in.
//
// DEMO IMPLEMENTATION: validates a fixed demo referrer account defined in
// src/consts.ts. In production this must be replaced with a real identity
// provider (e.g. Clerk — already part of this stack) plus session cookies
// and role-based access. Never ship plaintext credentials.
export const POST: APIRoute = async ({ request }) => {
	try {
		const body = (await request.json()) as { email?: string; password?: string };
		const email = (body.email || "").trim().toLowerCase();
		const password = body.password || "";

		const valid =
			email === DEMO_PORTAL_ACCOUNT.email &&
			password === DEMO_PORTAL_ACCOUNT.password;

		if (!valid) {
			return new Response(JSON.stringify({ error: "Invalid credentials" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Placeholder token — replace with a signed session token (JWT) in production.
		const token = crypto.randomUUID();
		return new Response(JSON.stringify({ success: true, token }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Login failed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};