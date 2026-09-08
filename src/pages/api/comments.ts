import type { APIRoute } from "astro";

export const prerender = false;

// GET /api/comments?postId=<slug>  ->  list comments for a post
// POST /api/comments               ->  submit a comment for a post
// Uses the LEGAL_BLOG_COMMENTS KV namespace bound in wrangler.json.
export const GET: APIRoute = async ({ request, locals }) => {
	const url = new URL(request.url);
	const postId = url.searchParams.get("postId") || "general";

	const kv = (locals as App.Locals).runtime?.env.LEGAL_BLOG_COMMENTS;
	if (!kv) {
		return new Response(JSON.stringify({ error: "KV binding not configured" }), {
			status: 503,
			headers: { "Content-Type": "application/json" },
		});
	}

	const raw = await kv.get(`comments:${postId}`);
	const comments = raw ? JSON.parse(raw) : [];

	return new Response(JSON.stringify(comments), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};

export const POST: APIRoute = async ({ request, locals }) => {
	const kv = (locals as App.Locals).runtime?.env.LEGAL_BLOG_COMMENTS;
	if (!kv) {
		return new Response(JSON.stringify({ error: "KV binding not configured" }), {
			status: 503,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const body = (await request.json()) as { postId?: string; author?: string; text?: string };
		const postId = (body.postId || "general").slice(0, 120);
		const author = (body.author || "").trim().slice(0, 50);
		const text = (body.text || "").trim().slice(0, 500);

		if (!author || !text) {
			return new Response(JSON.stringify({ error: "Missing required fields" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const key = `comments:${postId}`;
		const raw = await kv.get(key);
		const comments = raw ? JSON.parse(raw) : [];

		const newComment = {
			id: crypto.randomUUID(),
			author,
			text,
			date: new Date().toISOString(),
		};

		comments.unshift(newComment);
		await kv.put(key, JSON.stringify(comments));

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