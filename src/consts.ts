// Global site configuration — update once and it propagates site-wide.

export const SITE_TITLE = "Dr Joseph El-Sheikha FRCR";
export const SITE_DESCRIPTION =
	"Independent Consultant Radiologist and medico-legal expert witness: CPR Part 35 / EMA compliant radiological opinions for solicitors, barristers, and insurers across the UK.";

export const NAVIGATION_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/referrals", label: "Referrals" },
	{ href: "/legal-blog", label: "Legal Radiology" },
	{ href: "/patient-advice", label: "Patient Advice" },
	{ href: "/cv", label: "Curriculum Vitae" },
	{ href: "/contact", label: "Contact" },
] as const;

export const BLOG_CATEGORIES = [
	{ id: "all", label: "All cases" },
	{ id: "musculoskeletal", label: "Musculoskeletal" },
	{ id: "gastrointestinal", label: "Gastrointestinal" },
	{ id: "neuroradiology", label: "Neuroradiology" },
	{ id: "interventional", label: "Interventional" },
	{ id: "negligence", label: "Negligence / Delay in Diagnosis" },
	{ id: "quantum", label: "Quantum & Causation" },
	{ id: "practice", label: "Practice & Procedure" },
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
	indemnity: "Certificate of Professional Indemnity — MPS / MDDUS, £10m limit per claim",
	photo: "/images/portrait-dr.jpg",
} as const;

export const FEES = {
	standardFee: "£1,450 + VAT",
	urgentSurcharge: "+60%",
	standardTurnaround: "14 working days",
	urgentTurnaround: "48–72 hours",
	downloads: [
		{
			title: "Terms of Instruction (PDF)",
			href: "/downloads/terms-of-instruction.pdf",
		},
		{
			title: "Full Curriculum Vitae (PDF)",
			href: "/downloads/cv-dr-joseph-elsheikha.pdf",
		},
		{
			title: "Imaging Transfer Checklist (PDF)",
			href: "/downloads/imaging-transfer-checklist.pdf",
		},
	],
} as const;

export const MEMBERSHIPS = [
	"Fellow — Royal College of Radiologists (FRCR)",
	"Member — Royal College of Surgeons of England (MRCS Eng)",
	"British Society of Skeletal Radiologists (BSSR)",
	"British Society of Gastroenterology & Abdominal Imaging (BSGAR)",
	"British Society of Interventional Radiology (BSIR)",
	"British Medical Association (BMA)",
	"Expert Witness Institute (EWI)",
	"Medico-Legal Society of England & Wales",
	"Academy of Experts — Accredited Expert",
] as const;

export const KEY_STATS = {
	reportsDelivered: 340,
	clientSatisfaction: 98,
	standardTurnaroundDays: 14,
	urgentTurnaroundHours: 48,
} as const;