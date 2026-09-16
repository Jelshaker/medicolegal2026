// Metadata types and helpers shared by `BaseLayout` and `BaseHead`.

/**
 * Article-level metadata for a commentary post. Rendered as `article:` meta tags
 * and as a `BlogPosting` JSON-LD node — the signals that let a search engine
 * treat a page as a dated, authored piece rather than a generic document.
 */
export interface ArticleMeta {
	/** Headline used for the `article:` tags and the BlogPosting JSON-LD node. */
	headline: string;
	/** ISO 8601 publication date (YYYY-MM-DD). */
	datePublished: string;
	/** ISO 8601 last-revised date (YYYY-MM-DD), when the piece has been revised. */
	dateModified?: string;
	/** Subject area, e.g. "Negligence" — matches the BLOG_CATEGORIES labels. */
	section?: string;
}

/**
 * Content collections expose frontmatter dates as `Date` objects, but `article:`
 * and BlogPosting data expect ISO 8601, so normalise to `YYYY-MM-DD` — the
 * precision the frontmatter actually carries.
 */
export function isoDate(value: Date | string): string {
	return (value instanceof Date ? value : new Date(value)).toISOString().slice(0, 10);
}