import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum([
			"musculoskeletal",
			"gastrointestinal",
			"neuroradiology",
			"interventional",
			"negligence",
			"quantum",
			"practice",
		]),
		tags: z.array(z.string()).default([]),
		author: z.string().default("Dr Joseph El-Sheikha, MBChB MRCS FRCR"),
		featured: z.boolean().default(false),
		anonymised: z.boolean().default(true),
		keyTakeaways: z.array(z.string()).optional(),
		figures: z.array(z.string()).optional(),
	}),
});

export const collections = { blog };