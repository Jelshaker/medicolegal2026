import { defineCollection, z } from "astro:content";

const recentDevelopmentsSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	category: z.enum([
		"musculoskeletal",
		"gastrointestinal",
		"peritoneal-malignancy",
		"neuroradiology",
		"interventional",
		"negligence",
		"quantum",
		"practice",
		"regulation",
		"case-law",
	]),
	tags: z.array(z.string()).default([]),
	author: z.string().default("Dr Joseph El-Sheikha, MBChB MRCS FRCR"),
	featured: z.boolean().default(false),
	anonymised: z.boolean().default(true),
	keyTakeaways: z.array(z.string()).optional(),
	figures: z.array(z.string()).optional(),
});

const recentDevelopments = defineCollection({
	type: "content",
	schema: recentDevelopmentsSchema,
});

export const collections = { "recent-developments": recentDevelopments };
