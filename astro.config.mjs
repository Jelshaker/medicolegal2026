// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";

// `site` is the canonical origin: it feeds <link rel="canonical">, the OpenGraph
// URLs, the XML sitemap and — via `src/pages/robots.txt.ts` — robots.txt, so all
// four can never disagree. Set PUBLIC_SITE_URL in `.env` (or as a build
// environment variable); `src/consts.ts` → SITE_URL reads the same value.
const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const site = (env.PUBLIC_SITE_URL || "https://medicolegal2026.pages.dev").replace(/\/+$/, "");

// https://astro.build/config
export default defineConfig({
	site,
	output: "server",
	integrations: [
		clerk(),
		sitemap({
			// Only real pages belong in the sitemap. `/login` is an access screen
			// (and is disallowed in robots.txt); endpoints such as `/robots.txt`
			// carry a file extension and are not pages.
			filter: (page) => {
				const { pathname } = new URL(page);
				if (pathname.startsWith("/login")) return false;
				return !/\.[a-z0-9]+$/i.test(pathname);
			},
		}),
	],

	// Canonical 6-section hierarchy. These legacy routes duplicated canonical
	// pages (or the retired parallel blog tree); they redirect permanently so
	// old inbound links and any indexed URLs keep resolving.
	redirects: {
		"/legal-blog": "/recent-developments",
		"/legal-blog/[slug]": "/recent-developments/[slug]",
		"/image-review": "/dicom-viewer",
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
