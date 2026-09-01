/// <reference types="@clerk/astro/env" />
/// <reference path="../worker-configuration.d.ts" />

interface ImportMetaEnv {
	readonly PUBLIC_GA_MEASUREMENT_ID?: string;
	readonly PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
	readonly CLERK_SECRET_KEY?: string;
	readonly COURTLISTENER_TOKEN?: string;
	readonly PUBLIC_DICOM_UPLOAD_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}
