// The security policy applied to every response, in one place.
//
// Cloudflare reads `public/_headers` for **static assets only**, so the parts of
// this site that Astro server-renders on every request would otherwise be served
// with no CSP, HSTS or frame protection at all. `src/middleware.ts` applies these
// values to server-rendered responses; `public/_headers` applies the same policy
// to assets (`/robots.txt`, `/sitemap-0.xml`, images, the vendored DICOM parser).
//
// **Keep the two in step** — if you add a tag, font or endpoint, update the CSP
// here and the single-line copy in `public/_headers`.

// Google tags need `www.googletagmanager.com` for the tag script, for Tag
// Manager's container fetch (a `connect-src` request) and for its no-JavaScript
// iframe (`frame-src`); the google-analytics.com hosts receive the collection
// requests. `'unsafe-inline'` is required by the gtag/GTM bootstrap and by the
// small inline page scripts (viewer setup, comment posting, the login form
// handler).
export const CONTENT_SECURITY_POLICY = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"img-src 'self' data: blob: https:",
	"font-src 'self' https://fonts.gstatic.com",
	"connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://stats.g.doubleclick.net",
	"frame-src https://www.googletagmanager.com",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
].join("; ");

export const SECURITY_HEADERS: Record<string, string> = {
	"Content-Security-Policy": CONTENT_SECURITY_POLICY,
	"X-Frame-Options": "DENY",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
