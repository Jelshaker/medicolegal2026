import type { APIRoute } from "astro";
import { SITE_URL } from "../consts";

export const prerender = true;

// Generated at build time from the configured `site` rather than kept as a
// static file in `public/`, so the `Sitemap:` line can never point at a
// different domain from the sitemap URLs and canonicals it is advertising.
//
// `/login` is an access screen (it also carries a `noindex` meta tag) and
// `/api/*` are JSON endpoints. Neither is content, so neither is crawled.
export const GET: APIRoute = ({ site }) => {
	const origin = site?.toString().replace(/\/+$/, "") ?? SITE_URL;

	const body = `# robots.txt — ${origin}
User-agent: *
Allow: /

Disallow: /login
Disallow: /api/

Sitemap: ${origin}/sitemap-index.xml
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
