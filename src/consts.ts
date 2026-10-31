// Global site configuration — update once and it propagates site-wide.

// The site is framed as a reference resource, not a service brochure: the
// library is the product, and the expert-witness practice sits behind it.
export const SITE_TITLE = "Radiology & Medicolegal Law";
export const SITE_TAGLINE = "A small working resource on radiology and the law";
export const SITE_DESCRIPTION =
	"A small, curated reference resource on radiology and medicolegal law, with commentary on recent cases. It sets out how imaging investigations are performed, interpreted and reported, the standards and statutory duties that govern them, and the decisions that show what happens when they fail.";

// Repeated site-branding strings — update once and propagate everywhere.
export const SITE_BRAND_SUBTITLE = "Radiology &amp; medicolegal law";

// Canonical origin, with no trailing slash. Read at build time from
// PUBLIC_SITE_URL (see `.env` / `.env.example`) and kept in step with `site` in
// `astro.config.mjs`. Astro supplies the same value as `Astro.site`, which is
// what `<link rel="canonical">`, the XML sitemap and robots.txt are built from;
// this fallback exists only so the site still renders a sane absolute URL when
// the variable is missing.
export const SITE_URL = (
	import.meta.env.PUBLIC_SITE_URL?.trim() || "https://medicolegal2026.pages.dev"
).replace(/\/+$/, "");

// Default social preview image (1200×630), used when a page does not supply its
// own. Served from `public/images`, so it is referenced by path on the site.
export const DEFAULT_SOCIAL_IMAGE = "/images/og-default.jpg";

export const NAVIGATION_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/radiology-fundamentals", label: "Radiology Fundamentals" },
	{ href: "/medicolegal-fundamentals", label: "Medicolegal Fundamentals" },
	{ href: "/radiology-legislation", label: "Radiology Legislation" },
	{ href: "/recent-developments", label: "Recent Developments" },
	{ href: "/free-dicom-viewer", label: "DICOM Viewer" },
	{ href: "/about", label: "About" },
	// { href: "/referrals", label: "Referrals and terms" },
	// --- REQUIRES RE-ENABLEMENT when the referral function is ready again (see src/pages/referrals.astro) ---
] as const;

// The two reference libraries the resource is organised around. Referenced by the
// home page, the footer and the radiology hub so the framing cannot drift.
export const RESOURCE_LIBRARIES = [
	{
		id: "radiology",
		eyebrow: "Radiology library",
		title: "Clinical imaging reference",
		description:
			"What each modality does and what it can reasonably answer, the professional standards governing interpretation and reporting, dose and safety, quality assurance, and the storage, transfer and viewing of images. A short, sourced set of entries rather than an exhaustive text.",
		href: "/radiology-fundamentals",
		cta: "Open the radiology library",
		topics: ["Modalities and protocols", "Reporting standards", "Dose and safety", "Image handling"],
	},
	{
		id: "medicolegal-law",
		eyebrow: "Medicolegal law library",
		title: "Law and the radiological opinion",
		description:
			"The standard of care, breach and causation, consent to investigation and intervention, the statutory duties attached to ionising radiation, and the decisions in which imaging evidence determined the outcome. Kept deliberately selective: the principles that actually decide imaging disputes.",
		href: "/medicolegal-fundamentals",
		cta: "Open the law library",
		topics: ["Bolam and Bolitho", "Montgomery consent", "IRMER and IRR17", "Case law"],
	},
] as const;

export const BLOG_CATEGORIES = [
	{ id: "all", label: "All updates" },
	{ id: "musculoskeletal", label: "Musculoskeletal" },
	{ id: "gastrointestinal", label: "Gastrointestinal" },
	{ id: "peritoneal-malignancy", label: "Peritoneal Malignancy" },
	{ id: "neuroradiology", label: "Neuroradiology" },
	{ id: "interventional", label: "Interventional" },
	{ id: "negligence", label: "Negligence" },
	{ id: "quantum", label: "Quantum and Causation" },
	{ id: "practice", label: "Practice and Procedure" },
	{ id: "regulation", label: "Regulation" },
	{ id: "case-law", label: "Case Law" },
] as const;

// Flat palette of muted marker colours used on the dot indicators in the
// recent-developments listing. One per category so the marker row is
// instantly scannable while staying inside the house style.
export const CATEGORY_MARKERS: Record<string, string> = {
	musculoskeletal: "#7c9a6e",
	gastrointestinal: "#b8935a",
	"peritoneal-malignancy": "#a86b6b",
	neuroradiology: "#6b8fa1",
	interventional: "#8a8452",
	negligence: "#a05c5c",
	quantum: "#8b7499",
	practice: "#7a8b99",
	regulation: "#9a7e59",
	"case-law": "#5a8a6e",
};

export const DEMO_PORTAL_ACCOUNT = {
	// Demo scaffolding — replace with a real identity provider (e.g. Clerk) in production.
	// See src/pages/api/login.ts for the auth logic this is paired with.
	//
	// ⚠ SECURITY: The password MUST be set via the DEMO_ADMIN_PASSWORD
	// environment variable (see .env.example). Never hardcode credentials.
	email: "referrer@elsheikha-imaging.legal",
	label: "Demo referrer account",
};

// Shared UI strings used in the header navigation, footer, and cookie banner.
export const LOGIN_BUTTON_TEXT = "Secure Login";
export const LOGIN_BUTTON_TEXT_MOBILE = "Secure Client Login";
export const LOGIN_PAGE_TITLE = "Secure Login";
export const COOKIE_SETTINGS_LABEL = "Cookie settings";
export const COOKIE_BANNER_TITLE = "Cookies on this site";
export const COOKIE_ACCEPT_LABEL = "Accept analytics";
export const COOKIE_REJECT_LABEL = "Reject analytics";

export const PRACTITIONER = {
	name: "Dr Joseph El-Sheikha, MBChB MD FRCR LLM (Master of Laws)",
	shortName: "Dr Joseph El-Sheikha",
	title: "Consultant Radiologist",
	qualifications: "MBChB, FRCR, Medical Doctorate (MD) PGDip (Research Training) PGDip (Clinical Education) PGCert (Diagnostic Imaging)",
	subspecialty: "Gastrointestinal, Hepatobiliary, Peritoneal & Interventional Radiology",
	role: "Consultant Radiologist, HHFT NHS Foundation Trust",
	gmcNumber: "GMC 7017101",
	email: "secretary@radiologylaw.com",
	portalEmail: "Secure portal: encrypted in-file transfer",
	phone: "On request",
	address: "Oxford, Basingstoke & Winchester",
	indemnity: "Certificate of Professional Indemnity — MPS",
	photo: "/images/portrait-dr.jpg",
} as const;

export const MEMBERSHIPS = [
	"Fellow of the Royal College of Radiologists (FRCR)",
] as const;

// Page hero images — one high-quality picture per page, displayed large at the top.
// Each image is chosen for tone and relevance: clinical imagery for radiology pages,
// consultation / evidence imagery for law pages, and a mix for the home page.
export const PAGE_HERO_IMAGES: Record<string, string | null> = {
	"/": "/images/pexels-cottonbro-7579832.jpg",
	"/radiology-fundamentals": "/images/pexels-shvetsa-4226205.jpg",
	"/medicolegal-fundamentals": "/images/consult-room.jpg",
	"/radiology-legislation": "/images/pexels-shvetsa-4225925.jpg",
	"/recent-developments": "/images/pexels-cottonbro-5723881.jpg",
	"/free-dicom-viewer": "/images/pexels-valery-arispe-2149327983-34170810.jpg",
	"/how-to-use-the-dicom-viewer": "/images/pexels-valery-arispe-2149327983-34170810.jpg",
	"/about": "/images/pexels-tima-miroshnichenko-5452281.jpg",
	"/sitemap": "/images/pexels-shvetsa-4225925.jpg",
	"/disclaimer-and-terms-of-use": null,
	"/privacy-notice": null,
	"/cookie-policy": null,
	"/login": null,
	"/referrals": null,
};

// Every public page, grouped for the human-readable site map at /sitemap and for
// the contents strip on the home page. `/login` is intentionally excluded: it is
// an access screen, not editorial content. Carries no commercial terms.
export const SITEMAP = [
	{
		id: "start",
		title: "Start here",
		description: "",
		pages: [
			{ href: "/", label: "Home", description: "Overview of the two libraries and the latest commentary." },
			{ href: "/about", label: "About", description: "The curator, scope and standards." },
			{ href: "/sitemap", label: "Site map", description: "A full list of every page on the site." },
		],
	},
	{
		id: "radiology",
		title: "Radiology library",
		description: "Clinical reference on imaging modalities, reporting and safety.",
		pages: [
			{ href: "/radiology-fundamentals", label: "Radiology fundamentals", description: "What each modality shows and where it stops being useful." },
			{ href: "/free-dicom-viewer", label: "Free DICOM viewer", description: "Open your scan in the browser — nothing uploaded." },
			{ href: "/how-to-use-the-dicom-viewer", label: "Using the DICOM viewer", description: "How to load a disc or downloaded scan." },
		],
	},
	{
		id: "law",
		title: "Medicolegal law library",
		description: "Legal principles, authorities and statutory duties.",
		pages: [
			{ href: "/medicolegal-fundamentals", label: "Medicolegal law", description: "Standard of care, consent, causation and candour." },
			{ href: "/radiology-legislation", label: "Legislation", description: "IR(ME)R, IRR17, the communication duty and EPR16." },
		],
	},
	{
		id: "commentary",
		title: "Case commentary",
		description: "Anonymised discussions of real cases.",
		pages: [
			{ href: "/recent-developments", label: "Recent developments", description: "Short analyses of recent cases." },
		],
	},
	{
		id: "practice",
		title: "The practice",
		description: "",
		pages: [
			{ href: "/disclaimer-and-terms-of-use", label: "Disclaimer & terms", description: "" },
			{ href: "/privacy-notice", label: "Privacy notice", description: "How personal data is handled." },
			{ href: "/cookie-policy", label: "Cookie policy", description: "Analytics cookies and your choice." },
		],
	},
] as const;

