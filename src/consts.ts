// Global site configuration — update once and it propagates site-wide.

// The site is framed as a reference resource, not a service brochure: the
// library is the product, and the expert-witness practice sits behind it.
export const SITE_TITLE = "Radiology & Medicolegal Law";
export const SITE_TAGLINE = "A working resource for imaging practice and the law";
export const SITE_DESCRIPTION =
	"A reference resource on radiology and medicolegal law: how imaging investigations are performed, interpreted and reported, the standards and statutory duties that govern them, and the case law that decides what happens when they fail.";

export const NAVIGATION_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/radiology-resources", label: "Radiology" },
	{ href: "/medicolegal-fundamentals", label: "Medicolegal Law" },
	{ href: "/radiology-legislation", label: "Legislation" },
	{ href: "/radiology-legal-cases", label: "Case Law" },
	{ href: "/recent-developments", label: "Developments" },
	{ href: "/dicom-viewer", label: "DICOM Viewer" },
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
			"What each modality does and what it can reasonably answer, the professional standards governing interpretation and reporting, dose and safety, quality assurance, and the storage, transfer and viewing of images.",
		href: "/radiology-resources",
		cta: "Open the radiology library",
		topics: ["Modalities and protocols", "Reporting standards", "Dose and safety", "Image handling"],
	},
	{
		id: "medicolegal-law",
		eyebrow: "Medicolegal law library",
		title: "Law and the radiological opinion",
		description:
			"The standard of care, breach and causation, consent to investigation and intervention, the statutory duties attached to ionising radiation, and the decisions in which imaging evidence determined the outcome.",
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
	name: "Dr Joseph El-Sheikha, MBChB MRCS FRCR",
	shortName: "Dr Joseph El-Sheikha",
	title: "Consultant Radiologist & Medicolegal Expert Witness",
	qualifications: "MBChB (Hons), MRCS (Eng), FRCR, PGDip Medicolegal Practice (Cardiff)",
	subspecialty: "MSK, Gastrointestinal & Interventional Radiology",
	role: "Consultant Radiologist, NHS Foundation Trust | Independent Expert, The Harley Street Medico-Legal Imaging Unit",
	gmcNumber: "GMC 7123456",
	email: "secretary@elsheikha-imaging.legal",
	portalEmail: "Secure portal: encrypted in-file transfer",
	phone: "+44 (0)20 7946 0412",
	address: "The Harley Street Medico-Legal Imaging Unit, 33 New Cavendish Street, London W1G 9TW",
	indemnity: "Certificate of Professional Indemnity — MPS / MDDUS",
	photo: "/images/portrait-dr.jpg",
} as const;

export const MEMBERSHIPS = [
	"Fellow - Royal College of Radiologists (FRCR)",
	"Member - Royal College of Surgeons of England (MRCS Eng)",
	"British Society of Skeletal Radiologists (BSSR)",
	"British Society of Gastroenterology and Abdominal Imaging (BSGAR)",
	"British Society of Interventional Radiology (BSIR)",
	"British Medical Association (BMA)",
	"Expert Witness Institute (EWI)",
	"Medico-Legal Society of England and Wales",
	"Academy of Experts - Accredited Expert",
] as const;
