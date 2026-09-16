# Radiology & Medicolegal Law — a reference resource

A responsive, mobile-first **reference resource on radiology and medicolegal
law**, curated by a Consultant Radiologist, built with **Astro (SSR on
Cloudflare Workers)**, **Tailwind CSS v4**, **Clerk** authentication and
**Cloudflare KV** storage.

## ✨ Features

- **Home** — resource hero, a "what this resource is / is not" framing block, the two reference libraries, the legal framework in four questions, featured case discussion and the latest posts.
- **Page introductions** — every content page opens with a `PageIntro` block: what the page is for, who it is written for, and an "On this page" table of contents that jumps to the numbered, anchored sections below.
- **Site map** (`/sitemap`) — every page in the resource on one page, grouped by library, generated from `SITEMAP` in `src/consts.ts`. The XML sitemap (`/sitemap-index.xml`, via `@astrojs/sitemap`) enumerates every public route and `robots.txt` (generated from the configured domain) points crawlers at it.
- **Radiology Reference** (`/radiology-resources`) — the clinical library: what each modality answers and where it is limited, the RCR interpretation and reporting standards, dose and safety duties, quality assurance, image handling, and a primary-source shelf that links each source to the section applying it.
- **Curriculum Vitae** — structured timeline of appointments, qualifications and memberships.
- **Recent Developments** (`/recent-developments`, `/recent-developments/[slug]`) — anonymised, category-filterable case discussions with a **Cloudflare KV-backed comment system**.
- **Patient Advice** — plain-language guide to MRI / CT / ultrasound / X-ray, radiation safety, preparation and FAQs.
- **Referrals** — secure referral form persisted to the `PATIENT_REFERRALS` KV namespace.
- **Contact** — secretariat details and an encrypted contact form.
- **Secure Login** — professional portal login (`/api/login`, demo account in `src/consts.ts`).
- **Interactive Medical Image Viewer** (`MedicalImageViewer.astro`) — lightbox with wheel/button zoom, pan and captioning.
- **Local DICOM Viewer** (`/dicom-viewer`) — 100% client-side viewer (`LocalDicomViewer.astro`) with window/level, pan, zoom and slice navigation. `dicom-parser` is **vendored at `public/vendor/dicomParser.min.js`** so no third-party CDN is contacted and the `script-src 'self'` CSP holds. Studies are parsed in-browser and never uploaded.
- **SEO** — every public page is indexable. The XML sitemap and `robots.txt` both derive from the configured domain (no drift); canonical URLs use a trailing slash that matches the sitemap; `/login` is `noindex`, disallowed in `robots.txt` and excluded from the sitemap; each page carries OpenGraph/Twitter tags, a `robots` meta tag, Google Search Console verification (when configured) and `MedicalBusiness` + `Person` JSON-LD. Commentary posts additionally carry `article:` metadata and a `BlogPosting` node.
- **Analytics** — GA4 via the standard `gtag.js` snippet, emitted only when `PUBLIC_GA_MEASUREMENT_ID` is set to a real ID (the `.env.example` placeholder is ignored, so analytics is simply absent until configured). `PUBLIC_GOOGLE_SITE_VERIFICATION` adds the Search Console meta tag when set.
- **Security headers** — CSP, HSTS, `X-Frame-Options` and more, applied to server-rendered pages by `src/middleware.ts` and to static assets by `public/_headers`, both driven by a single policy in `src/lib/security-headers.ts`.

## 🚀 Project Structure

```
src/
  components/   BaseHead, Header, Footer, MedicalImageViewer, LocalDicomViewer,
                PageHero, PageIntro, Section, Callout
  content/      recent-developments posts (markdown, typed by src/content.config.ts)
  layouts/      BaseLayout (shared shell), BlogPost
  lib/          utils (dates, reading time) + client toast system, plus `seo.ts` and `security-headers.ts`
  pages/        index, about, cv, patient-advice, referrals, contact, login,
                expert-witness, medicolegal-radiology
                recent-developments/index + [slug]
                dicom-viewer (local-only viewer), medicolegal-fundamentals,
                radiology-resources (clinical library), radiology-legislation,
                radiology-legal-cases, sitemap
                api/ (comments, referrals, contact, login — Astro endpoints backed by KV)
public/         _headers (security policy for static assets), vendor/dicomParser.min.js, images, placeholders
wrangler.json   Cloudflare Worker + KV namespace bindings
```

## 🧭 Site hierarchy

Primary navigation is the eight reference sections defined in
`src/consts.ts` → `NAVIGATION_LINKS` (home plus the seven below), and the
framing they express is driven by `SITE_TITLE`, `SITE_TAGLINE`,
`SITE_DESCRIPTION` and `RESOURCE_LIBRARIES` in the same file:

| Section                      | Route                       |
| ---------------------------- | --------------------------- |
| Radiology Reference          | `/radiology-resources`      |
| Medicolegal Law              | `/medicolegal-fundamentals` |
| Legislation                  | `/radiology-legislation`    |
| Case Law                     | `/radiology-legal-cases`    |
| Developments                 | `/recent-developments`      |
| DICOM Viewer                 | `/dicom-viewer`             |
| Site map                     | `/sitemap`                  |
| Contact                      | `/contact`                  |

Legacy routes redirect permanently (see `redirects` in `astro.config.mjs`):
`/legal-blog` → `/recent-developments`, `/legal-blog/[slug]` →
`/recent-developments/[slug]`, and `/image-review` → `/dicom-viewer`.

Three deliberate content policies:

- **No pricing is published.** There is no `FEES` constant and no fee,
  surcharge, turnaround-cost or `priceRange` data anywhere in the codebase.
  Fee enquiries are routed to the secretariat via `/contact`. If you need to
  reintroduce commercial terms, add a new constant rather than restoring
  inline figures in page templates.
- **No orphaned pages.** Every page under `src/pages` has at least one inbound
  internal link. When adding a page, link it from navigation, a section index
  or a related page, or the audit will flag it.
- **The resource comes first.** Top-level messaging describes the reference
  libraries, not the services. The expert-witness practice is presented as the
  curator of the resource (`PRACTITIONER`); instruction enquiries are routed to
  `/expert-witness` and `/contact` from the foot of the home page. The wording
  lives in `SITE_TITLE`, `SITE_TAGLINE`, `SITE_DESCRIPTION` and
  `RESOURCE_LIBRARIES` (`src/consts.ts`) and is consumed by the home page,
  header, footer, `PageHero` and the `WebSite` JSON-LD — update it there rather
  than editing the strings in page templates.

## 🧩 Page introductions, anchors and the site map

Every content page renders `PageIntro` directly beneath `PageHero`, giving each
page the same shape: a short introduction, an optional audience line, and an "On
this page" list. That `contents` array **doubles as the on-page table of
contents**, so every entry must point at an `id` rendered by a `Section` or
`section` element on the same page — adding an entry without adding the anchor
creates a dead link.

Section numbering, the hairline rule and the larger lead paragraph come from the
optional `id`, `index` and `lead` props on `Section.astro`. All three are
optional, so older call sites render unchanged. Anchored blocks use `scroll-mt-24`
to clear the sticky header.

The human-readable site map at `/sitemap` is generated from `SITEMAP` in
`src/consts.ts`. Add new public pages there (and to `NAVIGATION_LINKS` or the
footer) so they are neither orphaned nor missing from the map. `/login` is
deliberately excluded from both `SITEMAP` and the XML sitemap, and is disallowed
in `public/robots.txt`.

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
deployment. See `.env.example` for `PUBLIC_SITE_URL` (the canonical domain),
`PUBLIC_GA_MEASUREMENT_ID` (GA4), `PUBLIC_GOOGLE_SITE_VERIFICATION` (Search
Console) and the Clerk keys, plus the optional `COURTLISTENER_TOKEN` /
`PUBLIC_DICOM_UPLOAD_URL`.

These `PUBLIC_*` values are inlined at **build** time, so change one and rebuild
(`npm run build`) before `npm run deploy`. With the Cloudflare adapter's platform
proxy enabled (`platformProxy.enabled` in `astro.config.mjs`), `PUBLIC_*`
variables may also be supplied as Worker environment variables and read at
runtime, so you are not forced to rebuild to flip the tracking ID.

## 🔒 Production notes

- Replace the **demo login** (`src/consts.ts` → `DEMO_PORTAL_ACCOUNT`) and the
  `/api/login` handler with a real identity provider (Clerk is already wired in
  via `src/middleware.ts`) and signed session tokens.
- Provide real KV namespace IDs (`wrangler.json`) for `LEGAL_BLOG_COMMENTS`,
  `PATIENT_REFERRALS` and `SESSION`.
- `PUBLIC_SITE_URL` is the canonical domain for everything SEO: it is read by
  `astro.config.mjs` (`site`), `src/consts.ts` (`SITE_URL`) and
  `src/pages/robots.txt.ts`, so the domain is set in **one place** — robots.txt
  can no longer drift from the sitemap or canonical URLs.
- Set `PUBLIC_GA_MEASUREMENT_ID` to your GA4 Measurement ID and
  `PUBLIC_GOOGLE_SITE_VERIFICATION` to your Search Console token (both in `.env`
  / the build env, or as runtime Worker vars). Analytics and verification stay
  absent until these are set, so a placeholder can never leak to production.
- All blog figures are anonymised. Nothing on the site constitutes legal advice.