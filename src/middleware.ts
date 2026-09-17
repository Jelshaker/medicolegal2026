import type { APIContext, MiddlewareNext } from "astro";

// All requests pass through without authentication.
// Clerk-based auth can be added later if needed.
export const onRequest = (_context: APIContext, next: MiddlewareNext) => {
	return next();
};