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
	integrations: [clerk(), sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
