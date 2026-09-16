// Consent state shared by the banner, <head> bootstrap and the footer
// "Cookie settings" button. A single versioned localStorage entry records the
// visitor's choice; GA4 is never requested until that entry says granted.
//
// Key shape: { version: 1, analytics: boolean, decidedAt: string }
// Value is localStorage (not a cookie) so merely remembering "reject" does not
// itself set a tracking cookie.
export const CONSENT_KEY = "ml-consent-v1";
export const CONSENT_VERSION = 1;

// Default-denied Consent Mode v2 state applied before any Google tag loads.
// `security_storage` stays granted (fraud/abuse prevention); everything that
// needs consent stays denied until the visitor accepts analytics.
export const CONSENT_DEFAULTS = {
	ad_storage: "denied",
	ad_user_data: "denied",
	ad_personalization: "denied",
	analytics_storage: "denied",
	functionality_storage: "denied",
	personalization_storage: "denied",
	security_storage: "granted",
} as const;

export const CONSENT_GRANTED_UPDATE = {
	analytics_storage: "granted",
	functionality_storage: "granted",
	personalization_storage: "granted",
} as const;

export const CONSENT_DENIED_UPDATE = {
	analytics_storage: "denied",
	ad_storage: "denied",
	ad_user_data: "denied",
	ad_personalization: "denied",
	functionality_storage: "denied",
	personalization_storage: "denied",
} as const;
