// Where the Google tags come from, and what is allowed to run before consent.
//
// Two placements are supported and they are mutually exclusive on purpose:
//
//   * `PUBLIC_GA_MEASUREMENT_ID` (`G-XXXXXXXXXX`) — the direct gtag.js tag.
//     BaseHead loads it from googletagmanager.com and configures it with
//     `anonymize_ip`. This is the simple option, and the one the site uses.
//   * `PUBLIC_GTM_ID` (`GTM-XXXXXXX`) — a Google Tag Manager container. Use this
//     when tags should be manageable without a deploy; the container then owns
//     the GA4 configuration, so the direct tag is switched off. Loading both
//     would count every page view twice.
//
// Both values are `PUBLIC_`, so they are inlined at BUILD time: change one and
// rebuild (`npm run build`) before deploying. The documented placeholder values
// are rejected, so a copy-paste cannot ship hits to an ID that does not exist.
//
// Consent (Google Consent Mode v2, UK GDPR / PECR): BaseHead emits
// `gtag('consent','default', …)` BEFORE any tag loads and every category that
// needs consent starts denied — see `src/lib/consent.ts`. The tags therefore
// load in consent-denied mode and remain inert (no cookies, no identifiers)
// until `src/components/CookieConsent.astro` fires the `consent update` after
// the visitor accepts analytics.

/** Values shipped in `.env.example`; treated as "not configured". */
const PLACEHOLDERS = new Set(["G-XXXXXXXXXX", "GTM-XXXXXXX"]);

function readEnv(value: string | undefined, pattern: RegExp): string | undefined {
	const trimmed = value?.trim();
	return trimmed && !PLACEHOLDERS.has(trimmed) && pattern.test(trimmed) ? trimmed : undefined;
}

/** GA4 measurement ID for the direct tag. `undefined` when unset or a placeholder. */
export const GA_MEASUREMENT_ID = readEnv(import.meta.env.PUBLIC_GA_MEASUREMENT_ID, /^G-[A-Z0-9]{4,}$/i);

/** Google Tag Manager container ID. `undefined` when unset or a placeholder. */
export const GTM_ID = readEnv(import.meta.env.PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,}$/i);

/**
 * The ID the direct gtag.js include should use. A container supersedes the
 * standalone GA4 tag, so this is `undefined` whenever `GTM_ID` is set.
 */
export const GA_TAG_ID = GTM_ID ? undefined : GA_MEASUREMENT_ID;

/** True when some Google tag will load — the condition for the preconnects. */
export const GOOGLE_TAGS_ENABLED = Boolean(GTM_ID ?? GA_MEASUREMENT_ID);

/**
 * The standard GTM loader, with the container ID substituted in. Returned as a
 * string because it is emitted through `set:html` on an `is:inline` script:
 * interpolation written inside such a script would ship the literal `${id}` to
 * the browser instead of the value.
 */
export function gtmLoader(id: string): string {
	return (
		"(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime()," +
		"event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?" +
		`'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;` +
		"f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer'," +
		`'${id}');`
	);
}

/**
 * The `<noscript>` fallback iframe URL. Rendered in `<body>` (BaseLayout), not
 * `<head>`, which is why this is exposed separately.
 */
export function gtmNoscriptSrc(id: string): string {
	return `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}`;
}
