import { clerkMiddleware } from "@clerk/astro/server";

// Registers Clerk with the Astro server so that `Astro.locals.auth()` and
// `Astro.locals.currentUser()` are available on every request.
//
// If CLERK_SECRET_KEY is not configured (local/demo environments), the
// middleware is bypassed so pages and API routes still render.
export const onRequest = (context, next) => {
	if (!import.meta.env.CLERK_SECRET_KEY) return next();
	return clerkMiddleware()(context, next);
};