// Shared helpers used by page frontmatter and client scripts.

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);
}

export function formatDateShort(date: Date): string {
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

/** Approximate reading time in minutes for a markdown string (200 wpm). */
export function readingTime(bodyMarkdown: string): number {
	const words = bodyMarkdown
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/[#*`>_\[\]()!|~-]/g, " ")
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export function initials(name: string): string {
	return name
		.split(/\s+/)
		.filter((w) => w && /^[A-Za-z]/.test(w))
		.slice(0, 2)
		.map((w) => w[0]!.toUpperCase())
		.join("");
}