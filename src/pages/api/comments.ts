import type { APIRoute } from "astro";

export const prerender = false;

// In-memory storage — comments are stored in a module-level map and will
// reset on every deploy.  No KV binding required; can be upgraded later.
const commentsStore = new Map<string, Array<{ id: string; author: string; text: string; date: string }>>();

// ============================================================
// Rate limiting — simple in-memory store.
// ============================================================
interface RateEntry { count: number; windowStart: number; }
const rateLimitStore = new Map<string, RateEntry>();
const RATE_MAX = 20;
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

// CSRF
const csrfStore = new Map<string, { token: string; expires: number }>();
const CSRF_TTL_MS = 10 * 60 * 1000;

function generateCsrfToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Spam honeypot — bots fill hidden fields, humans don't see them.
// The form should include: <input name="_honey" class="sr-only" tabindex="-1" autocomplete="off" />
const MAX_TEXT = 500;
const MAX_AUTHOR = 50;

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const postId = url.searchParams.get("postId") || "general";

	const comments = commentsStore.get(postId) || [];

	return new Response(JSON.stringify(comments), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const ip = request.headers.get("x-forwarded-for") || "unknown";

		if (!checkRateLimit(ip)) {
			return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
				status: 429,
				headers: { "Content-Type": "application/json" },
			});
		}

		const body = (await request.json()) as { postId?: string; author?: string; text?: string; csrfToken?: string; _honey?: string };

		// Spam honeypot check — bots fill this, humans don't
		if (body._honey) {
			return new Response(JSON.stringify({ success: true, comment: { id: "", author: "", text: "", date: "" } }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Validate CSRF token
		const storedCsrf = csrfStore.get(ip);
		if (!storedCsrf || storedCsrf.expires < Date.now() || body.csrfToken !== storedCsrf.token) {
			return new Response(
				JSON.stringify({ error: "Invalid or expired CSRF token. Please reload the page and try again." }),
				{ status: 403, headers: { "Content-Type": "application/json" } },
			);
		}
		csrfStore.delete(ip);

		const postId = (body.postId || "general").slice(0, 120);
		const author = (body.author || "").trim().slice(0, MAX_AUTHOR);
		const text = (body.text || "").trim().slice(0, MAX_TEXT);

		if (!author || !text) {
			return new Response(JSON.stringify({ error: "Missing required fields" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const newComment = {
			id: crypto.randomUUID(),
			author,
			text,
			date: new Date().toISOString(),
		};

		const list = commentsStore.get(postId) || [];
		list.unshift(newComment);
		commentsStore.set(postId, list);

		return new Response(JSON.stringify({ success: true, comment: newComment }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to post comment" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
