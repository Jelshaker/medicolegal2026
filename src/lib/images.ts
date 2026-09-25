// Helpers for the responsive image pipeline.
//
// `scripts/optimise-images.mjs` (run by `prebuild`, `predev` and `npm run images`)
// writes the WebP ladder into `public/images/opt/` and records its geometry in
// `src/data/image-manifest.ts`. This module turns that manifest into the strings
// a `<picture>` needs — a `srcset` for the WebP `<source>`, and the intrinsic
// `width`/`height` that reserve layout space so the page does not shift while a
// picture loads.
//
// Pages and content reference images by their public path
// ("/images/ct_scanner.jpg"), so every lookup is by that path. Anything the
// manifest does not cover — the SVG placeholders, or an image added since the
// last pipeline run — is passed through untouched and rendered as a plain
// `<img>`, so a missing entry degrades to the original file rather than to a
// broken image.

import { IMAGE_MANIFEST, type ImageRecord, type ImageVariant } from "../data/image-manifest";

export type { ImageRecord, ImageVariant };

/** Public URL for a derivative (the manifest stores bare file names). */
function variantUrl(variant: ImageVariant): string {
	return `/images/opt/${variant.file}`;
}

/** The manifest record for a source image, or `undefined` when it has none. */
export function imageRecord(src: string): ImageRecord | undefined {
	return IMAGE_MANIFEST[src];
}

/** Derivatives for a source image, narrowest first. Empty when there are none. */
export function imageVariants(src: string): ImageVariant[] {
	return IMAGE_MANIFEST[src]?.variants ?? [];
}

/**
 * A `srcset` value listing the derivatives, optionally restricted to a set of
 * widths (`[768, 1440]`). Empty when the image has no derivatives, which is the
 * signal `ResponsiveImage.astro` uses to fall back to a plain `<img>`.
 */
export function imageSrcSet(src: string, widths?: number[]): string {
	return imageVariants(src)
		.filter((variant) => !widths || widths.includes(variant.w))
		.map((variant) => `${variantUrl(variant)} ${variant.w}w`)
		.join(", ");
}

/**
 * One derivative for a target width: the narrowest that is at least as wide, or
 * the widest available when the target is beyond the ladder. Used where
 * `srcset` cannot help — the page heroes are CSS backgrounds — and falls back to
 * the original file when the image has no derivatives.
 */
export function imageAtWidth(src: string, width: number): string {
	const variants = imageVariants(src);
	if (variants.length === 0) return src;
	return variantUrl(variants.find((variant) => variant.w >= width) ?? variants[variants.length - 1]);
}

/** The largest derivative (for the zoomable lightbox), or the original file. */
export function imageLargest(src: string): string {
	const variants = imageVariants(src);
	return variants.length === 0 ? src : variantUrl(variants[variants.length - 1]);
}
