// Global site configuration.
// Update these values once and they are used across every page.

export const SITE_TITLE = "Medico-Legal Radiology Reports";
export const SITE_DESCRIPTION =
	"Independent consultant radiologist expert witness services: radiology reporting, EMA/CPR Part 35 compliant reports for solicitors and insurers.";

export const NAVIGATION_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/services", label: "Services & Terms" },
	{ href: "/information", label: "Information" },
	{ href: "/legal-news", label: "Legal News" },
	{ href: "/members", label: "Members" },
] as const;

export const PRACTITIONER = {
	// TODO: Replace with real details before go-live.
	name: "Dr. A. Consultant",
	qualifications: "BMedSci, MBBS, MRCP, FRCR",
	role: "Consultant Radiologist & Expert Witness",
	gmcNumber: "GMC 0000000",
	email: "secretary@medicolegal.example",
	phone: "+44 (0) 000 000 0000",
	address: "Imaging Cortex, 000 Fleet Street, London EC0 0XX",
} as const;

export const FEES = {
	standard: "£1,450",
	urgentSurcharge: "+60%",
	standardTurnaround: "14 working days",
	urgentTurnaround: "48 hours",
} as const;
