// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://medicolegal2026.pages.dev",
	output: "server",
	integrations: [
		clerk(),
		sitemap({
			// `/login` is an access screen, not content, and is disallowed in
			// robots.txt — keep it out of the sitemap so the two agree.
			filter: (page) => !page.includes("/login"),
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
