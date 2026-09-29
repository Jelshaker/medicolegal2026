import type { APIRoute } from "astro";
import { DEMO_PORTAL_ACCOUNT } from "../../consts";

export const prerender = false;

// ============================================================
// Rate limiting — simple in-memory store.
// In production (Cloudflare), replace with a KV-backed limiter.
// ============================================================
interface RateEntry {
	count: number;
	windowStart: number;
}
const rateLimitStore = new Map<string, RateEntry>();
const RATE_MAX = 5;          // max attempts
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

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

// ============================================================
// CSRF token — generated during page render, validated on POST.
// ============================================================
/** Generate a random hex token (32 bytes). */
function generateCsrfToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Store a CSRF token tied to an IP for a short window.
 * In production, tie this to a session cookie instead.
 */
const csrfStore = new Map<string, { token: string; expires: number }>();
const CSRF_TTL_MS = 10 * 60 * 1000; // 10 minutes

export const GET: APIRoute = async ({ request }) => {
	// Return a CSRF token via a GET request so the client can seed the form.
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

		// Rate limit first
		if (!checkRateLimit(ip)) {
			return new Response(
				JSON.stringify({ error: "Too many attempts. Please wait a few minutes." }),
				{ status: 429, headers: { "Content-Type": "application/json" } },
			);
		}

		// Validate CSRF token
		const body = (await request.json()) as { email?: string; password?: string; csrfToken?: string };
		const email = (body.email || "").trim().toLowerCase();
		const password = body.password || "";

		const storedCsrf = csrfStore.get(ip);
		if (!storedCsrf || storedCsrf.expires < Date.now() || body.csrfToken !== storedCsrf.token) {
			return new Response(
				JSON.stringify({ error: "Invalid or expired CSRF token. Please reload the page and try again." }),
				{ status: 403, headers: { "Content-Type": "application/json" } },
			);
		}
		// Consume the CSRF token
		csrfStore.delete(ip);

		const valid =
			email === DEMO_PORTAL_ACCOUNT.email &&
			password === (import.meta.env.DEMO_ADMIN_PASSWORD || "DrJE-Demo-2026");

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
