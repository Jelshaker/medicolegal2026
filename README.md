# Dr Joseph El-Sheikha FRCR — Medicolegal Imaging

A responsive, mobile-first website for a Consultant Radiologist and
medico-legal expert witness, built with **Astro (SSR on Cloudflare Workers)**,
**Tailwind CSS v4**, **Clerk** authentication and **Cloudflare KV** storage.

## ✨ Features

- **Home** — hero with credentials (FRCR), practice areas, featured case and dynamic image cards.
- **Curriculum Vitae** — structured timeline of appointments, qualifications and memberships.
- **Recent Developments** (`/recent-developments`, `/recent-developments/[slug]`) — anonymised, category-filterable case discussions with a **Cloudflare KV-backed comment system**.
- **Patient Advice** — plain-language guide to MRI / CT / ultrasound / X-ray, radiation safety, preparation and FAQs.
- **Referrals** — secure referral form persisted to the `PATIENT_REFERRALS` KV namespace.
- **Contact** — secretariat details and an encrypted contact form.
- **Secure Login** — professional portal login (`/api/login`, demo account in `src/consts.ts`).
- **Interactive Medical Image Viewer** (`MedicalImageViewer.astro`) — lightbox with wheel/button zoom, pan and captioning.
- **Local DICOM Viewer** (`/dicom-viewer`) — 100% client-side viewer (`LocalDicomViewer.astro`) with window/level, pan, zoom and slice navigation. `dicom-parser` is **vendored at `public/vendor/dicomParser.min.js`** so no third-party CDN is contacted and the `script-src 'self'` CSP holds. Studies are parsed in-browser and never uploaded.
- **SEO & Analytics** — GA4, Google Search Console placeholder, OpenGraph and `MedicalBusiness` + `Person` JSON-LD.
- **Security headers** (`public/_headers`) — CSP, HSTS, X-Frame-Options and more.

## 🚀 Project Structure

```
src/
  components/   BaseHead, Header, Footer, MedicalImageViewer, LocalDicomViewer, PageHero, Section
  content/      recent-developments posts (markdown, typed by src/content.config.ts)
  layouts/      BaseLayout (shared shell), BlogPost
  lib/          utils (dates, reading time) + client toast system
  pages/        index, about, cv, patient-advice, referrals, contact, login,
                expert-witness, medicolegal-radiology
                recent-developments/index + [slug]
                dicom-viewer (local-only viewer), medicolegal-fundamentals,
                radiology-legislation, radiology-legal-cases
                api/ (comments, referrals, contact, login — Astro endpoints backed by KV)
public/         _headers (security), vendor/dicomParser.min.js, images, placeholders
wrangler.json   Cloudflare Worker + KV namespace bindings
```

## 🧭 Site hierarchy

Primary navigation is the six reference sections defined in
`src/consts.ts` → `NAVIGATION_LINKS`:

| Section                  | Route                       |
| ------------------------ | --------------------------- |
| Medicolegal Fundamentals | `/medicolegal-fundamentals` |
| Radiology Legislation    | `/radiology-legislation`    |
| Radiology Legal Cases    | `/radiology-legal-cases`    |
| Recent Developments      | `/recent-developments`      |
| DICOM Viewer             | `/dicom-viewer`             |
| Contact                  | `/contact`                  |

Legacy routes redirect permanently (see `redirects` in `astro.config.mjs`):
`/legal-blog` → `/recent-developments`, `/legal-blog/[slug]` →
`/recent-developments/[slug]`, and `/image-review` → `/dicom-viewer`.

Two deliberate content policies:

- **No pricing is published.** There is no `FEES` constant and no fee,
  surcharge, turnaround-cost or `priceRange` data anywhere in the codebase.
  Fee enquiries are routed to the secretariat via `/contact`. If you need to
  reintroduce commercial terms, add a new constant rather than restoring
  inline figures in page templates.
- **No orphaned pages.** Every page under `src/pages` has at least one inbound
  internal link. When adding a page, link it from navigation, a section index
  or a related page, or the audit will flag it.

## 🔑 Cloudflare KV bindings

Create three KV namespaces in the Cloudflare dashboard and add the IDs to
`wrangler.json` (or under *Workers & Pages → Settings → Bindings*):

| Binding              | Purpose                                    |
| -------------------- | ------------------------------------------ |
| `LEGAL_BLOG_COMMENTS` | Recent Developments comments (key `comments:<slug>`; binding name retained for continuity) |
| `PATIENT_REFERRALS`   | Referral + contact submissions              |
| `SESSION`             | Astro/Cloudflare session storage            |

## 🧞 Commands

| Command                | Action                                              |
| :--------------------- | :-------------------------------------------------- |
| `npm install`          | Install dependencies                                |
| `npm run dev`          | Local dev server at `localhost:4321`                |
| `npm run build`        | Build to `dist/` (SSR + prerendered blog pages)     |
| `npm run check`        | Build + type-check + Cloudflare dry-run deploy      |
| `npm run deploy`       | Deploy to Cloudflare Workers                        |
| `npm run cf-typegen`   | Regenerate `worker-configuration.d.ts` from wrangler |

## ⚙️ Environment variables

Copy `.env.example` to `.env` and set the same values in your Cloudflare
deployment. See the file for `PUBLIC_GA_MEASUREMENT_ID` (GA4), the Clerk keys,
and optional `COURTLISTENER_TOKEN` / `PUBLIC_DICOM_UPLOAD_URL`.

## 🔒 Production notes

- Replace the **demo login** (`src/consts.ts` → `DEMO_PORTAL_ACCOUNT`) and the
  `/api/login` handler with a real identity provider (Clerk is already wired in
  via `src/middleware.ts`) and signed session tokens.
- Replace the `google-site-verification` placeholder in `BaseHead.astro`.
- Provide real KV namespace IDs and point the site `astro.config.mjs` `site` at
  your production domain.
- All blog figures are anonymised. Nothing on the site constitutes legal advice.