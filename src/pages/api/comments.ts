import type { APIRoute } from "astro";

export const prerender = false;

// GET /api/comments?postId=<slug>  ->  list comments for a post
// POST /api/comments               ->  submit a comment for a post
// In-memory storage — comments are stored in a module-level map and will
// reset on every deploy.  No KV binding required; can be upgraded later.
const commentsStore = new Map<string, Array<{ id: string; author: string; text: string; date: string }>>();

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