// Global site configuration — update once and it propagates site-wide.

// The site is framed as a reference resource, not a service brochure: the
// library is the product, and the expert-witness practice sits behind it.
export const SITE_TITLE = "Radiology & Medicolegal Law";
export const SITE_TAGLINE = "A small working resource on radiology and the law";
export const SITE_DESCRIPTION =
	"A small, curated reference resource on radiology and medicolegal law, with commentary on recent cases. It sets out how imaging investigations are performed, interpreted and reported, the standards and statutory duties that govern them, and the decisions that show what happens when they fail.";

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
	{ href: "/radiology-resources", label: "Radiology Fundamentals" },
	{ href: "/medicolegal-fundamentals", label: "Medicolegal Fundamentals" },
	{ href: "/radiology-legislation", label: "Radiology Legislation" },
	{ href: "/radiology-legal-cases", label: "Important Radiology Case Law" },
	{ href: "/recent-developments", label: "Recent Legal Developments" },
	{ href: "/dicom-viewer", label: "Free DICOM viewer" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
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
		href: "/radiology-resources",
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

export const DEMO_PORTAL_ACCOUNT = {
	// Demo scaffolding — replace with a real identity provider (e.g. Clerk) in production.
	// See src/pages/api/login.ts for the auth logic this is paired with.
	email: "referrer@elsheikha-imaging.legal",
	password: "DrJE-Demo-2026",
	label: "Demo referrer account",
};

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
	"Fellow - Royal College of Radiologists (FRCR)",
	"Member - European Society of Radiology (ESR)",
	"British Society of Gastroenterology and Abdominal Imaging (BSGAR)",
	
] as const;

// Every public page, grouped for the human-readable site map at /sitemap and for
// the contents strip on the home page. `/login` is intentionally excluded: it is
// an access screen, not editorial content. Carries no commercial terms.
export const SITEMAP = [
	{
		id: "start",
		title: "Start here",
		description: "What the resource is, who keeps it, and how it is organised.",
		pages: [
			{ href: "/", label: "Home", description: "Overview, the two libraries, and the latest commentary." },
			{ href: "/about", label: "About this resource", description: "The curator, the scope, and the standards worked to." },
			{ href: "/sitemap", label: "Site map", description: "Everything in the resource on one page." },
		],
	},
	{
		id: "radiology",
		title: "Radiology library",
		description: "The clinical reference: modalities, reporting standards, dose and image handling.",
		pages: [
			{ href: "/radiology-resources", label: "Radiology reference", description: "What each modality answers, and where it stops being useful." },
			{ href: "/patient-advice", label: "Patient advice", description: "Plain-language guide to scans, safety and preparation." },
			{ href: "/dicom-viewer", label: "Free DICOM viewer", description: "Open your scan in your browser — free, private, nothing uploaded." },
			{ href: "/dicom-viewer-guide", label: "Using the DICOM viewer", description: "Step-by-step: loading a disc or download and using the tools." },
		],
	},
	{
		id: "law",
		title: "Medicolegal law library",
		description: "The legal reference: principles, authorities and statutory duties.",
		pages: [
			{ href: "/medicolegal-fundamentals", label: "Medicolegal law", description: "Standard of care, consent, causation, candour and AI-assisted reporting." },
			{ href: "/radiology-legislation", label: "Legislation", description: "IR(ME)R, IRR17, the communication duty and EPR16." },
			{ href: "/radiology-legal-cases", label: "Case law", description: "Decisions in which imaging evidence determined the outcome." },
			{ href: "/medicolegal-radiology", label: "Disputed interpretation", description: "The pure-diagnosis argument, incidental findings and teleradiology risk." },
		],
	},
	{
		id: "commentary",
		title: "Case commentary",
		description: "Recent, anonymised cases and what they mean in practice.",
		pages: [
			{ href: "/recent-developments", label: "Recent developments", description: "Short analyses of recent cases, filterable by subject." },
		],
	},
	{
		id: "practice",
		title: "The practice",
		description: "How instruction and contact work. The resource itself is free.",
		pages: [
			{ href: "/expert-witness", label: "Expert witness", description: "The matters in which a formal opinion can be provided." },
			// { href: "/referrals", label: "Referrals and terms", description: "Secure referral, terms of instruction and imaging transfer." },
			// --- REQUIRES RE-ENABLEMENT when the referral function is ready again (see src/pages/referrals.astro) ---
			{ href: "/contact", label: "Contact", description: "Secretariat details and a secure enquiry form." },
			{ href: "/cv", label: "Curriculum vitae", description: "Qualifications, appointments and memberships." },
			{ href: "/disclaimer", label: "Disclaimer & terms of use", description: "General information only: not legal or medical advice, and the terms of use." },
			{ href: "/privacy-notice", label: "Privacy notice", description: "What is collected, why it is lawful, retention, and your UK GDPR rights." },
			{ href: "/cookie-policy", label: "Cookie policy", description: "Strictly necessary storage, optional analytics, and your cookie choice." },
		],
	},
] as const;

