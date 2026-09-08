# Dr Joseph El-Sheikha FRCR — Medicolegal Imaging

A responsive, mobile-first website for a Consultant Radiologist and
medico-legal expert witness, built with **Astro (SSR on Cloudflare Workers)**,
**Tailwind CSS v4**, **Clerk** authentication and **Cloudflare KV** storage.

## ✨ Features

- **Home** — hero with credentials (FRCR), practice areas, featured case and dynamic image cards.
- **Curriculum Vitae** — structured timeline of appointments, qualifications and memberships.
- **Legal Radiology Blog** (`/legal-blog`, `/legal-blog/[slug]`) — anonymised, category-filterable case discussions with a **Cloudflare KV-backed comment system**.
- **Patient Advice** — plain-language guide to MRI / CT / ultrasound / X-ray, radiation safety, preparation and FAQs.
- **Referrals** — secure referral form persisted to the `PATIENT_REFERRALS` KV namespace.
- **Contact** — secretariat details and an encrypted contact form.
- **Secure Login** — professional portal login (`/api/login`, demo account in `src/consts.ts`).
- **Interactive Medical Image Viewer** (`MedicalImageViewer.astro`) — lightbox with wheel/button zoom, pan and captioning.
- **SEO & Analytics** — GA4, Google Search Console placeholder, OpenGraph and `MedicalBusiness` + `Person` JSON-LD.
- **Security headers** (`public/_headers`) — CSP, HSTS, X-Frame-Options and more.

## 🚀 Project Structure

```
src/
  components/   BaseHead, Header, Footer, MedicalImageViewer, PageHero, Section
  content/      blog posts (markdown, typed by src/content.config.ts)
  layouts/      BaseLayout (shared shell), BlogPost
  lib/          utils (dates, reading time) + client toast system
  pages/        index, cv, patient-advice, referrals, contact, login
                legal-blog/index + [slug]
                api/ (comments, referrals, contact, login — Astro endpoints backed by KV)
public/         _headers (security), images, placeholders
wrangler.json   Cloudflare Worker + KV namespace bindings
```

## 🔑 Cloudflare KV bindings

Create three KV namespaces in the Cloudflare dashboard and add the IDs to
`wrangler.json` (or under *Workers & Pages → Settings → Bindings*):

| Binding              | Purpose                                    |
| -------------------- | ------------------------------------------ |
| `LEGAL_BLOG_COMMENTS` | Blog post comments (key `comments:<postId>`) |
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