import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../consts";

export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
	const origin = (site?.toString() ?? SITE_URL).replace(/\/+$/, "");
	const posts = (await getCollection("recent-developments")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const items = posts
		.map((post) => {
			const link = `${origin}/recent-developments/${post.slug}/`;
			return `		<item>
			<title>${escapeXml(post.data.title)}</title>
			<link>${escapeXml(link)}</link>
			<guid isPermaLink="true">${escapeXml(link)}</guid>
			<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
			<description>${escapeXml(post.data.description)}</description>
		</item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE_TITLE)} — Recent Developments</title>
		<link>${escapeXml(`${origin}/recent-developments/`)}</link>
		<description>${escapeXml(SITE_DESCRIPTION)}</description>
		<language>en-gb</language>
		<atom:link href="${escapeXml(`${origin}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
};
