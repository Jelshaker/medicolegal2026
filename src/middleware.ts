import type { APIContext, MiddlewareNext } from "astro";
import { SECURITY_HEADERS } from "./lib/security-headers";
import { clerkMiddleware } from "@clerk/astro/server";

// Registers Clerk with the Astro server so that `Astro.locals.auth()` and
// `Astro.locals.currentUser()` are available on every request.
//
// If CLERK_SECRET_KEY is not configured (local/demo environments), the
// middleware is bypassed so pages and API routes still render.
//
// The same wrapper is where the security policy is applied: Cloudflare only
// consults `public/_headers` for static assets, so without this the
// server-rendered pages would go out with no CSP, HSTS or frame protection.
export const onRequest = async (context: APIContext, next: MiddlewareNext) => {
	// Clerk's middleware is typed as `Response | void` (it returns a Response
	// when it intercepts the request — e.g. a sign-in challenge — and otherwise
	// defers to `next`). Resolve that to a real Response either way.
	const handled = await (import.meta.env.CLERK_SECRET_KEY
		? clerkMiddleware()(context, next)
		: next());
	const response = handled instanceof Response ? handled : await next();

	// `public/_headers` is only consulted for static assets, so without this the
	// server-rendered pages would go out with no CSP, HSTS or frame protection.
	// The guard stops a response that already carries the policy (served with
	// `_headers`) from being sent it a second time, and skips read-only Responses.
	if (!response.headers.has("content-security-policy")) {
		for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
			response.headers.set(name, value);
		}
	}

	return response;
};