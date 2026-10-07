import type { APIRoute } from "astro";

export const prerender = false;

// ============================================================
// In-memory storage — messages are stored in a module-level array and will
// reset on every deploy.  No KV binding required; can be upgraded later.
//
// TODO: Replace with a persistent backing store (e.g. D1, KV) before
// production use. Currently, all submitted messages are lost on deploy.
// ============================================================
const messagesStore: Array<{ id: string; record: { name: string; email: string; subject: string; message: string; createdAt: string } }> = [];

// ============================================================
// Rate limiting — simple in-memory store.
// In production, replace with a KV-backed limiter.
// ============================================================
interface RateEntry {
	count: number;
	windowStart: number;
}
const rateLimitStore = new Map<string, RateEntry>();
const RATE_MAX = 10;
const RATE_WINDOW_MS = 5 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitStore.get(ip);
	if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
		rateLimitStore.set(ip, { count: 1, windowStart: now });
		return true;
	}
	if (entry.count >= RATE_MAX) return false;
	entry.count++;
	return true;
}

// CSRF protection
const csrfStore = new Map<string, { token: string; expires: number }>();
const CSRF_TTL_MS = 10 * 60 * 1000;

function generateCsrfToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Basic RFC 5322 email validation
function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const GET: APIRoute = async ({ request }) => {
	// Return a CSRF token
	const ip = request.headers.get("x-forwarded-for") || "unknown";
	const token = generateCsrfToken();
	csrfStore.set(ip, { token, expires: Date.now() + CSRF_TTL_MS });
	return new Response(
		JSON.stringify({ csrfToken: token }),
		{ status: 200, headers: { "Content-Type": "application/json" } },
	);
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const ip = request.headers.get("x-forwarded-for") || "unknown";

		if (!checkRateLimit(ip)) {
			return new Response(
				JSON.stringify({ error: "Too many requests. Please wait a moment." }),
				{ status: 429, headers: { "Content-Type": "application/json" } },
			);
		}

		const body = (await request.json()) as Record<string, string>;
		const storedCsrf = csrfStore.get(ip);
		if (!storedCsrf || storedCsrf.expires < Date.now() || body.csrfToken !== storedCsrf.token) {
			return new Response(
				JSON.stringify({ error: "Invalid or expired CSRF token. Please reload the page and try again." }),
				{ status: 403, headers: { "Content-Type": "application/json" } },
			);
		}
		csrfStore.delete(ip);

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

		if (!isValidEmail(email)) {
			return new Response(JSON.stringify({ error: "Please provide a valid email address" }), {
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
