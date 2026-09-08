// Tiny toast system used across forms, the portal and the studio.
// Import from a page <script> block — it lazily mounts a host element.

export type ToastKind = "success" | "error" | "info";

const KIND_STYLES: Record<ToastKind, string> = {
	success: "border-teal-200 bg-white text-navy-900 dark:border-teal-500/40 dark:bg-navy-900 dark:text-slate-100",
	error: "border-rose-200 bg-white text-rose-700 dark:border-rose-500/40 dark:bg-navy-900 dark:text-rose-300",
	info: "border-slate-200 bg-white text-navy-900 dark:border-navy-600 dark:bg-navy-900 dark:text-slate-100",
};

const KIND_ICON: Record<ToastKind, string> = {
	success: "M5 13l4 4L19 7",
	error: "M6 18L18 6M6 6l12 12",
	info: "M12 8h.01M12 12v4",
};

export function toast(message: string, kind: ToastKind = "success", timeout = 4600) {
	let host = document.getElementById("toast-host") as HTMLDivElement | null;
	if (!host) {
		host = document.createElement("div");
		host.id = "toast-host";
		host.className =
			"fixed bottom-5 right-5 z-[120] flex w-[min(92vw,22rem)] flex-col gap-2";
		document.body.appendChild(host);
	}

	const el = document.createElement("div");
	const accent =
		kind === "error"
			? "stroke-rose-600 dark:stroke-rose-400"
			: kind === "info"
				? "stroke-navy-500 dark:stroke-navy-300"
				: "stroke-teal-600 dark:stroke-teal-400";

	el.className = `toast-anim pointer-events-none flex items-start gap-3 rounded-xl border p-3.5 shadow-lift ${KIND_STYLES[kind]}`;
	el.innerHTML = `
		<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-current opacity-15">
			<svg class="h-3.5 w-3.5 ${accent}" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${KIND_ICON[kind]}"/></svg>
		</span>
		<p class="text-sm font-medium leading-snug"></p>
	`;
	el.querySelector("p")!.textContent = message;
	host.appendChild(el);

	window.setTimeout(() => {
		el.style.transition = "opacity .25s ease, transform .25s ease";
		el.style.opacity = "0";
		el.style.transform = "translateY(8px)";
		window.setTimeout(() => el.remove(), 260);
	}, timeout);
}