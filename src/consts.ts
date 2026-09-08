// Global site configuration — update once and it propagates site-wide.

export const SITE_TITLE = "Dr Eleanor Voss MRCP FRCR";
export const SITE_DESCRIPTION =
	"Independent consultant radiologist and medico-legal expert witness: CPR Part 35 / EMA compliant radiology opinions for solicitors, barristers, and insurers across the UK.";

export const NAVIGATION_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/referrals", label: "Referrals" },
	{ href: "/blog", label: "Case Discussions" },
	{ href: "/cv", label: "Curriculum Vitae" },
	{ href: "/admin/generator", label: "Studio" },
] as const;

export const BLOG_CATEGORIES = [
	{ id: "all", label: "All cases" },
	{ id: "musculoskeletal", label: "Musculoskeletal" },
	{ id: "neuroradiology", label: "Neuroradiology" },
	{ id: "negligence", label: "Negligence / Delay in Diagnosis" },
	{ id: "quantum", label: "Quantum & Causation" },
	{ id: "practice", label: "Practice & Procedure" },
] as const;

export const PRACTITIONER = {
	name: "Dr Eleanor Voss, MClinEd MBBS FRCR",
	shortName: "Dr Eleanor Voss",
	title: "Consultant Radiologist & Medicolegal Expert Witness",
	qualifications:
		"MBBS (Hons), BMedSci, MClinEd, PGDip Medicolegal Practice (Cardiff), MRCP, FRCR",
	subspecialty: "MSK & Neuroradiology",
	role: "Consultant Radiologist, NHS Foundation Trust | Independent Expert, London Medicolegal Imaging",
	gmcNumber: "GMC 7230418",
	email: "secretary@imagingmedico.legal",
	portalEmail: "Secure portal: encrypted in-file transfer",
	phone: "+44 (0)20 7946 0831",
	address: "The Harley Medicolegal Imaging Unit, 27 Wimpole Mews, London W1G 0RY",
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
			href: "/downloads/cv-dr-eleanor-voss.pdf",
		},
		{
			title: "Imaging Transfer Checklist (PDF)",
			href: "/downloads/imaging-transfer-checklist.pdf",
		},
	],
} as const;

export const MEMBERSHIPS = [
	"Fellow — Royal College of Radiologists (FRCR)",
	"Member — Royal College of Physicians (MRCP)",
	"British Society of Skeletal Radiologists (BSSR)",
	"British Society of Neuroradiologists (BSNR)",
	"British Medical Association (BMA)",
	"Expert Witness Institute (EWI)",
	"Medico-Legal Society of England & Wales",
	"Academy of Experts — Accredited Expert",
] as const;

export const KEY_STATS = {
	reportsDelivered: 320,
	clientSatisfaction: 98,
	standardTurnaroundDays: 14,
	urgentTurnaroundHours: 48,
} as const;