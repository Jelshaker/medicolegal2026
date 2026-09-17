# Plan — Page introductions, a site map, and more readable, more detailed sections

**Status:** implemented — Phases 0, 1, 2, 3 and 5 complete; Phase 4 partially complete (see progress log)
**Scope:** every page under `src/pages`, the shared components in `src/components`,
the site framing in `src/consts.ts`, and `public/`
**Framing that governs every decision below:** this is a **small, curated legal
resource for radiology and medicolegal law**, kept by one consultant radiologist,
whose distinguishing feature is **commentary on a handful of recent, interesting
cases**. It is not a textbook, not a statute book, and not a service brochure. Any
addition must make the resource easier to *use*, not merely longer.

---

## 0. Progress log (what was actually built)

**Done**

- `src/components/PageIntro.astro` created — intro block plus the "On this page"
  table of contents.
- `src/components/Callout.astro` created — `key` / `limit` / `caution` /
  `authority` tones.
- `src/components/Section.astro` upgraded with optional `id`, `index` and `lead`,
  a hairline rule, `aria-labelledby` and `scroll-mt-24`. Backwards compatible.
- `SITEMAP` added to `src/consts.ts`; `SITE_TAGLINE`, `SITE_DESCRIPTION` and both
  `RESOURCE_LIBRARIES` descriptions reframed for a "small, curated" resource.
- `PageIntro` added to **every content page** (13 pages), each with anchors that
  were verified to resolve against rendered `id`s. `/login` intentionally has none.
- Human site map at `src/pages/sitemap.astro`, linked from the footer, the home
  page closing block and the About sidebar.
- `public/robots.txt` created.
- Home page "what this resource is — and what it is not" framing block; "Site map"
  button in the closing block.
- `radiology-legislation` rebuilt: `PageIntro`, anchors, a uniform four-field
  structure per instrument (who it binds / what it requires / what must be recorded
  / if it fails), primary-source callouts, and two additions — the duty to
  communicate critical findings and UK GDPR / DPA 2018.
- `recent-developments/index`: `PageIntro`, "Browse by subject" and "Latest
  commentary" sections, a live result count, and an initialised active filter chip.
- "Not legal advice" callouts on `medicolegal-fundamentals` and
  `radiology-legal-cases`; "ask your own clinician" callout on `patient-advice`.
- Broken `#terms` anchor on `referrals` fixed (now `#imaging-transfer`); real
  `#terms` and `#imaging-transfer` anchors added.
- Dead `src/layouts/BlogPost.astro` deleted (verified unreferenced).
- `astro.config.mjs`: sitemap `filter` excludes `/login` so sitemap and robots agree.
- README updated: site-map route, `robots.txt`, the `PageIntro`/anchor convention,
  the `SITEMAP` constant, and the `site` ↔ `robots.txt` domain coupling.

**Deliberately deferred (needs your explicit instruction)**

1. **De-duplication in `medicolegal-fundamentals`.** Bolam, Bolitho, Chester,
   Gregg and Montgomery each still appear twice (once as a working principle, once
   under "Famous cases"). Collapsing them means deleting your substantive legal
   content, so it was not done unattended. The 19 sections are now anchored,
   numbered and reachable from the intro TOC, so the duplication is navigable
   rather than removed.
2. **Uniform case fields on `radiology-legal-cases`.** Anchors and the "not legal
   advice" callout are in, but restructuring every case into
   Issue/Facts/Held/Principle/Status is a content rewrite.
3. **`text-sm` → `text-[0.95rem]` sweep** on `medicolegal-fundamentals` (style only).

**Verified**

- `npm run build` passes.
- `dist/sitemap-0.xml` contains all 22 public routes and excludes `/login`.
- Every `PageIntro` anchor resolves to a rendered `id` (scripted audit over `src/`).

---

## 1. Current state audit

### 1.1 Route inventory

| Route | Page file | Hero intro? | Sections (`<Section>` / block) | Notes |
| --- | --- | --- | --- | --- |
| `/` | `index.astro` | bespoke hero | 6 blocks (libraries, framework, featured case, latest, about) | Good copy, no per-block anchors |
| `/radiology-resources` | `radiology-resources.astro` | `PageHero` ✔ | 7 `<Section>` | Most mature page; has `lead` on every section |
| `/medicolegal-fundamentals` | `medicolegal-fundamentals.astro` | `PageHero` ✔ | 19 `<Section>` | **Content is minified onto single lines**; 19 sections with no intro, no grouping, no TOC |
| `/radiology-legislation` | `radiology-legislation.astro` | `PageHero` ✔ | 4 `<Section>` | Thinnest page of the set; no intro or detail |
| `/radiology-legal-cases` | `radiology-legal-cases.astro` | `PageHero` ✔ | 8 `<Section>` | Strong material, but cases are `text-sm` and ungrouped |
| `/recent-developments` | `recent-developments/index.astro` | `PageHero` ✔ | 1 block (filters + grid) | 9 posts; no explanation of *what* these are |
| `/recent-developments/[slug]` | `[slug].astro` | article header ✔ | body + takeaways + comments | Best-structured page on the site |
| `/medicolegal-radiology` | `medicolegal-radiology.astro` | `PageHero` ✔ | 6 `<Section>` | Duplicates themes that also live in Case Law |
| `/expert-witness` | `expert-witness.astro` | `PageHero` ✔ | 3 `<Section>` + card grids | Service framing; conflicts with "resource first" |
| `/dicom-viewer` | `dicom-viewer.astro` | `PageHero` ✔ | 3 blocks + 2 `<Section>` | Clear limits section |
| `/patient-advice` | `patient-advice.astro` | `PageHero` ✔ | 3 blocks | No intro explaining who it is for |
| `/about` | `about.astro` | `PageHero` ✔ | 3 `<Section>` | Sidebar is well developed |
| `/cv` | `cv.astro` | `PageHero` ✔ | 3 blocks | No intro / summary |
| `/referrals` | `referrals.astro` | `PageHero` ✔ | form + sidebar | "View transfer checklist" links to `#terms` — **target anchor does not exist** |
| `/contact` | `contact.astro` | `PageHero` ✔ | details + form | No intro |
| `/login` | `login.astro` | none (card) | 1 block | Correct for a login screen |
| `/sitemap` | — | **does not exist** | — | Requested in this plan |

### 1.2 Readability problems found (concrete)

1. **No on-page navigation.** `medicolegal-fundamentals.astro` has 19 sections on
   one scrolling page; there is no way to see, or jump to, what is there.
2. **Minified markup.** `medicolegal-fundamentals.astro`, `radiology-legislation.astro`
   and `radiology-legal-cases.astro` are largely one logical line per section. Almost
   impossible to read or edit, and inconsistent with `index.astro` / `about.astro`.
3. **Uniformly `text-sm`.** The law pages set every paragraph to `text-sm`, which
   flattens hierarchy: case facts, principle and application all look identical.
4. **No section numbering or dividers.** `Section.astro` renders
   `<section class="space-y-10">` with a 2–3xl heading and nothing else — no rule,
   no index, no anchor, no `scroll-mt` to clear the sticky `h-16`/`4.5rem` header.
5. **Inconsistent section rhythm.** `space-y-12` on the outer container vs
   `space-y-10` inside `Section`; card padding varies (`p-5` / `p-6`); lists use
   `space-y-2` / `space-y-2.5` / `space-y-3` interchangeably.
6. **`lead` missing on most sections.** Only `radiology-resources.astro` gives each
   section a one-sentence lead. Everywhere else the reader must infer the point.
7. **No callouts.** Nothing visually marks a "key point", a "limit", or a caution,
   so long passages read as one undifferentiated wall.
8. **Broken internal anchor.** `referrals.astro` → `href="#terms"` with no matching id.
9. **`BlogPost.astro` is dead code.** It duplicates `recent-developments/[slug].astro`
   and reads `readingTime(Astro.request.url)` (wrong input). Flag for deletion, not
   inclusion in this work.

### 1.3 Sitemap / indexing problems found (concrete)

1. **`dist/sitemap-0.xml` contains only `/` and `/about/`.** The built output is
   stale (from an early commit), so this must be re-verified — but with
   `output: "server"` the `@astrojs/sitemap` integration only enumerates routes it
   knows at build time. Either content pages need `export const prerender = true`
   (as the two `recent-developments` routes already have) or the sitemap needs an
   explicit route list. **This is a defect, not just a feature request.**
2. **No `robots.txt`.** `public/` has `_headers`, `favicon.svg`, `images/`,
   `vendor/` only. Nothing points crawlers at the sitemap index.
3. **No human-readable site map.** A reader has no single page showing what the
---

## 2. Design principles for this work

1. **Small by design.** The resource should say plainly that it is deliberately
   small and selective — the value is curation and commentary, not volume. Add a
   short "how this resource is organised" statement rather than more pages.
2. **Resource first, practice second.** README's three content policies still bind:
   no pricing anywhere; every page keeps at least one inbound link; top-level
   messaging describes the library, with the expert-witness practice behind it.
3. **One idea per section.** Every section gets a plain-English `lead` sentence
   stating the point, then the detail. If a section cannot be summarised in one
   sentence, it should be split.
4. **Anchor everything.** Every section gets a stable `id` and a jump link, so the
   site map and an on-page TOC can both point into it.
5. **Recent cases are the hook.** Case commentary (`/recent-developments`) and
   digested case law (`/radiology-legal-cases`) are the entry point; the reference
   libraries explain the background. Cross-link in both directions.
6. **No content without a source.** Any added detail must trace to a named
   authority (statute, RCR standard, or decided case), consistent with the existing
   "shelf behind this resource" pattern in `radiology-resources.astro`.

---

## 3. Workstream A — an introduction space on every page

### 3.1 The problem with reusing `PageHero`

`PageHero` already carries `eyebrow`, `title` and a `description`. The description
is doing two jobs at once: marketing strapline *and* first paragraph of substance.
The requested "space for an introduction" should therefore be a **separate block
below the hero**, so the hero stays short and the introduction can be several
paragraphs, list what is on the page, and carry a review date.

### 3.2 New component — `src/components/PageIntro.astro`

```astro
---
// Introduction block rendered directly beneath PageHero on content pages.
// Gives every page the same shape: what this page is for, what it covers,
// who it is written for, and when it was last reviewed.
interface Props {
  /** Short standfirst shown above the first paragraph. */
  eyebrow?: string;
  /** Two to three paragraphs of plain-English introduction. */
  paragraphs: string[];
  /** Optional "what you will find here" list, each with an in-page anchor. */
  contents?: { href: string; label: string }[];
  /** Optional audience line. */
  audience?: string;
  /** Optional ISO date string for the review line. */
  reviewed?: string;
}

const {
  eyebrow = "About this page",
  paragraphs,
  contents = [],
  audience,
  reviewed,
} = Astro.props as Props;
---

<section class="border-b border-slate-200 bg-slate-50 py-10 dark:border-navy-800 dark:bg-navy-950">
  <div class="container-page grid gap-8 lg:grid-cols-3">
    <div class="lg:col-span-2">
      <span class="eyebrow block">{eyebrow}</span>
      <div class="mt-4 space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
        {paragraphs.map((p) => <p>{p}</p>)}
      </div>
      {audience && (
        <p class="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">{audience}</p>
      )}
      {reviewed && (
        <p class="mt-2 text-xs text-slate-400 dark:text-slate-500">Last reviewed {reviewed}</p>
      )}
    </div>

    {contents.length > 0 && (
      <nav aria-label="On this page" class="card h-fit p-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          On this page
        </h2>
        <ul class="mt-3 space-y-2 text-sm">
          {contents.map((c) => (
            <li>
              <a href={c.href} class="font-medium text-teal-700 hover:underline dark:text-teal-400">
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )}
  </div>
</section>
```

Why this shape:

- **`paragraphs` as an array**, not a slot, so the same copy can be reused by the
  site map page and by `BaseHead` descriptions without drifting.
- **`contents` doubles as the on-page table of contents**, which is the single
  biggest readability win on the 19-section law page.
- **`reviewed`** supports the "small, actively maintained resource" claim.
- Uses only existing atoms (`container-page`, `card`, `eyebrow`), so no new design
  language is introduced.

### 3.3 Section `id` contract

For `contents` anchors to work, `Section.astro` must accept and render an `id`
(see Workstream C). Convention: `id` is the kebab-case of the section title,
matching `slugify()` already in `src/lib/utils.ts`. Anchors then use
`#<id>`, and `Section` gains `scroll-mt-24` so the sticky header never covers a
heading.

### 3.4 Per-page introduction drafts

These are the exact paragraphs to drop into `PageIntro` on each page. They establish
the small-resource framing and hand the reader a route in. Wording belongs in the
page frontmatter (or, for the two libraries, in `src/consts.ts` — see §7).

**`/radiology-resources`** — eyebrow "Radiology library"
- "This is the clinical half of a deliberately small reference resource. It sets out what each imaging modality can reasonably answer, what the professional standards require of an interpretation and a report, and what the law demands of dose, quality and image handling."
- "It assumes you already know radiology, or already know law. The purpose is to show where the two meet, and to name the source behind each proposition. Every section links to the statute, standard or decision it applies."
- Audience: "Written for reporting radiologists, referrers, and the solicitors and experts who test their work."
- Contents: Modalities · Reporting standards · Legal questions · Dose and safety · Quality assurance · Handling images · Primary sources

**`/medicolegal-fundamentals`** — eyebrow "Medicolegal law library"
- "The legal half of the resource, kept deliberately short and selective. Each entry states the principle, names the authority, and then says what it means for a radiologist reading a study or writing a report."
- "It is arranged in three parts: the working principles (standard of care, consent, causation, candour and AI-assisted reporting); the landmark decisions that formed them; and the claim statistics showing where radiology disputes actually arise."
- Audience: "Written for radiologists, trust legal teams, solicitors, barristers and expert witnesses."
- Contents: Standard of care · Consent · Causation · Interpretation · Reporting standards · Candour · AI-assisted reporting · Landmark cases · Claim statistics

**`/radiology-legislation`** — eyebrow "Statutory duties"
- "A short summary of the statutory framework under radiological practice: the medical exposure regulations, the occupational and equipment regulations, the duty to communicate critical findings, and the permitting regime for radioactive material."
- "Each entry gives the duty holders, the core obligations, and the practical consequence of getting them wrong. Summaries only — the primary text governs."
- Audience: "Written for radiographers, medical physics, radiation protection advisers and trust governance leads."
- Contents: IR(ME)R · IRR17 · Communication duty · EPR16

**`/radiology-legal-cases`** — eyebrow "Case law"
- "A digest of the decisions in which imaging evidence determined the outcome. Each entry follows the same three-line structure: the issue, the facts, and the principle that comes out of it."
- "These are not summaries of whole judgments. They are the propositions a radiologist or an instructing solicitor needs, plus a note of where the point is still being argued."
- Audience: "Written for solicitors, barristers, insurers and expert witnesses."
- Contents: Interpretation · Screening · Task standard · Communication · Consent · Incidental findings · AI-assisted reporting · Claim patterns

**`/recent-developments`** — eyebrow "Commentary on recent cases"
- "This is the part of the resource worth returning to: short, anonymised commentary on recent cases and developments that raise an interesting radiological or legal point."
- "Each piece says what happened, what the imaging showed, what the court or tribunal was asked to decide, and what a radiologist should take from it. All material is anonymised in accordance with GMC guidance and CPR Part 35."
- Audience: "Written for radiologists, solicitors, barristers and insurers."
- Contents: Latest commentary · Browse by subject

**`/medicolegal-radiology`** — eyebrow "The central argument"
- "A longer essay on the argument that decides most radiological claims: whether a miss is judged by what a responsible body of radiologists would have seen, or simply by what was on the screen. It also covers incidental findings and the systemic risks in teleradiology."
- Contents: The pure-diagnosis argument · Incidental findings · Teleradiology and fatigue · What the standards require

**`/patient-advice`** — eyebrow "Radiology library · For patients"
- "The patient-facing part of the radiology library. It explains, without jargon, what happens during X-ray, CT, MRI and ultrasound, why a particular test may be chosen, and what you can do to prepare."
- "It is written for patients and carers, and for referrers who want something plain to hand to a patient. It is general information only and does not replace advice from your own clinician."
- Contents: Modalities explained · Radiation safety · Preparation · Common questions

**`/dicom-viewer`** — eyebrow "Local viewer"
- "A free viewer that opens a DICOM study in your own browser. Nothing is uploaded, nothing is stored, and no copy of patient data is created — which is why it can be used to get a first look without creating a data protection problem."
- "It is a triage and orientation tool. It is not a calibrated diagnostic workstation, and no opinion should be based on it."
- Contents: Privacy by design · Open a study · Legal workflow · Limits
**`/about`** — eyebrow "About this resource"
- "The resource is curated by a single consultant radiologist in NHS practice with an independent medicolegal workload. That is deliberate: a small resource can be kept accurate and sourced, and does not accumulate the padding that larger collections do."
- "The commentary is written from practice, not from a textbook, and is checked against the primary sources cited throughout."
- Contents: Independence · Scope · Standards worked to · Memberships · Next steps

**`/cv`** — eyebrow "Professional record"
- "A structured record of the qualifications, appointments and memberships behind the resource, provided so that the basis of the commentary can be checked."
- Contents: Overview · Appointments · Memberships

**`/expert-witness`** — eyebrow "The practice behind the resource"
- "The resource is the work; instruction is how it is funded. This page sets out the matters in which a formal radiological opinion can be provided, and how that opinion is prepared — independently, and in the form the court requires."
- Contents: Specialist focus · Report types · Principles applied · Instruction

**`/referrals`** — eyebrow "Instructing the expert"
- "A secure route to ask for an opinion, the terms on which instructions are accepted, and guidance for transferring imaging safely."
- Contents: Referral form · Terms of engagement · Imaging transfer

**`/contact`** — eyebrow "Get in touch"
- "Contact details for the secretariat, and a secure form for enquiries about the resource, instruction, or imaging transfer."
- Contents: Secretariat · Enquiry form

**`/sitemap`** — eyebrow "Site map"
- "Everything in the resource on one page, grouped by library, with a one-line description of each section. If you are looking for a particular case, statute or standard rather than a page, start here."
- Contents: generated from the `SITEMAP` constant (§4.3)

**`/login`** — no `PageIntro`. A sign-in screen should not carry editorial copy;
leave as-is (the existing in-card paragraph already explains access).

---

## 4. Workstream B — the site map

Two distinct things are being asked for, and both are needed:

| Deliverable | Audience | Route / file |
| --- | --- | --- |
| Machine sitemap (XML) | Search engines | `/sitemap-index.xml` → `/sitemap-0.xml` via `@astrojs/sitemap` |
| **Human site map** | Readers | **new `/sitemap` page** |
| Discovery hint | Crawlers | **new `public/robots.txt`** |

### 4.1 Fix the XML sitemap first (defect)

> **Result after implementation:** the empty sitemap was a **stale `dist/`
> artefact**, not a code defect. A clean `npm run build` already enumerates every
> public route. No `prerender` exports were therefore needed. The remaining real
> issue was that `/login/` appeared in the sitemap while being disallowed in
> `robots.txt`; that is now resolved with a `filter` in `astro.config.mjs`.

`dist/sitemap-0.xml` originally listed only `/` and `/about/`. The steps below are
retained for reference in case it recurs.

1. Run `npm run build` and re-inspect `dist/sitemap-0.xml` to see whether this is
   purely a stale-artefact problem or a real gap.
2. If real: add `export const prerender = true;` to the static content pages
   (`about`, `contact`, `cv`, `dicom-viewer`, `expert-witness`,
   `medicolegal-fundamentals`, `medicolegal-radiology`, `patient-advice`,
   `radiology-legal-cases`, `radiology-legislation`, `radiology-resources`,
   `referrals`, `sitemap`). This also makes them cacheable and removes needless
   Worker invocations. `/login` and the `/api/*` endpoints stay server-rendered
   because they depend on Clerk/session.
   *Caveat:* confirm no page reads `Astro.request`/`Astro.locals` at render time
   before marking it prerendered — `recent-developments/*` already proves the
   pattern works for content-driven pages.
3. If the integration still omits routes, set an explicit list via the
   `@astrojs/sitemap` `filter`/`customPages` options in `astro.config.mjs`.

### 4.2 `public/robots.txt` (new file)

```
User-agent: *
Allow: /
Disallow: /login
Disallow: /api/

Sitemap: https://medicolegal2026.pages.dev/sitemap-index.xml
```

Note: the `site` value in `astro.config.mjs` is currently
`https://medicolegal2026.pages.dev`; when the production domain changes, this
line and the config `site` must change together. Add a note to README.
### 4.3 New single source of truth — `SITEMAP` in `src/consts.ts`

The human site map, the footer link, and any XML sitemap comments should read from
one structure, in the same spirit as `NAVIGATION_LINKS` and `RESOURCE_LIBRARIES`.
Draft shape:

```ts
// Every public page, grouped for the human-readable site map at /sitemap.
// `pages[].section` entries, where present, are in-page anchors matching the
// `id` props on Section.astro.
export const SITEMAP = [
  {
    id: "start",
    title: "Start here",
    description: "What the resource is, who keeps it, and how it is organised.",
    pages: [
      { href: "/", label: "Home", description: "Overview, the two libraries, and the latest commentary." },
      { href: "/about", label: "About this resource", description: "The curator, the scope, and the standards worked to." },
      { href: "/sitemap", label: "Site map", description: "This page." },
    ],
  },
  {
    id: "radiology",
    title: "Radiology library",
    description: "The clinical reference: modalities, reporting standards, dose and image handling.",
    pages: [
      { href: "/radiology-resources", label: "Radiology reference", description: "What each modality answers, and where it stops being useful." },
      { href: "/patient-advice", label: "Patient advice", description: "Plain-language guide to scans, safety and preparation." },
      { href: "/dicom-viewer", label: "Local DICOM viewer", description: "Open a study in your browser without uploading it." },
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
      { href: "/referrals", label: "Referrals and terms", description: "Secure referral, terms of instruction and imaging transfer." },
      { href: "/contact", label: "Contact", description: "Secretariat details and a secure enquiry form." },
      { href: "/cv", label: "Curriculum vitae", description: "Qualifications, appointments and memberships." },
    ],
  },
] as const;
```

Policy notes: `/login` is intentionally **excluded** from the public site map, and
`SITEMAP` carries no commercial terms, so it does not breach the README's
no-pricing rule.
### 4.4 New page — `src/pages/sitemap.astro`

Shape: `BaseLayout` → `PageHero` → `PageIntro` → one `<section>` per `SITEMAP`
group → a closing cross-link block. Sketched:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PageHero from "../components/PageHero.astro";
import PageIntro from "../components/PageIntro.astro";
import { SITE_TITLE, SITEMAP } from "../consts";

export const prerender = true;
const pageCount = SITEMAP.reduce((n, g) => n + g.pages.length, 0);
---
<BaseLayout
  title={`Site map | ${SITE_TITLE}`}
  description="Every page in this small radiology and medicolegal law resource on one page — the clinical library, the legal library, recent case commentary, and how instruction works."
>
  <PageHero
    eyebrow="Site map"
    title="Everything in the resource"
    description={`${pageCount} pages across five groups: the two reference libraries, recent case commentary, and the practice behind them.`}
  />
  <PageIntro paragraphs={[/* see §3.4 */]} />
  <section class="bg-white py-16 dark:bg-navy-900">
    <div class="container-page space-y-12">
      {SITEMAP.map((group, i) => (
        <section id={group.id} class="scroll-mt-24">
          <span class="eyebrow block">{String(i + 1).padStart(2, "0")} — {group.title}</span>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-navy-900 dark:text-slate-100 sm:text-3xl">
            {group.title}
          </h2>
          <p class="mt-2 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">{group.description}</p>
          <ul class="mt-6 grid gap-4 md:grid-cols-2">
            {group.pages.map((p) => (
              <li class="card p-5">
                <a href={p.href} class="text-base font-bold text-navy-900 hover:text-teal-600 dark:text-slate-100">{p.label}</a>
                <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </section>
</BaseLayout>
```

### 4.5 Discovery links (avoid the orphan-page trap)

The README's "no orphaned pages" policy means `/sitemap` must have inbound links
on day one:

- `Footer.astro` — add a "Site map" link to the "Also in the library" column.
- `index.astro` — add a "Site map" ghost button to the closing block.
- Optionally add the `SITEMAP` groups as a compact strip at the foot of the home
  page, which doubles as an at-a-glance contents list for a small resource.
---

## 5. Workstream C — making the sections easier to read

### 5.1 Upgrade `Section.astro` (highest leverage, lowest risk)

Change from a bare wrapper to an anchored, numbered, summarised section. Proposed
API additions: `id`, `index` (e.g. `"01"`), and reuse of the existing `lead`.
Rendered output gains:

- `id` + `scroll-mt-24` so anchors land clear of the sticky header.
- `aria-labelledby` wiring the section to its heading.
- A numbered eyebrow and a hairline rule above the heading.
- The `lead` promoted from `text-slate-600` to a slightly larger `text-lg`.

```astro
---
interface Props {
  id?: string;
  eyebrow?: string;
  index?: string;          // e.g. "01"
  title?: string;
  lead?: string;
}
const { id, eyebrow, index, title, lead = "" } = Astro.props as Props;
const headingId = id ? `${id}-heading` : undefined;
---
<section id={id} aria-labelledby={headingId} class="scroll-mt-24 space-y-8">
  <div class="border-t border-slate-200 pt-8 dark:border-navy-700">
    <div class="flex items-center gap-3">
      {index && <span class="text-xs font-bold tabular-nums text-teal-600 dark:text-teal-400">{index}</span>}
      {eyebrow && <span class="eyebrow">{eyebrow}</span>}
    </div>
    {title && <h2 id={headingId} class="mt-2 text-2xl font-bold tracking-tight text-navy-900 dark:text-white sm:text-3xl">{title}</h2>}
    {lead && <p class="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{lead}</p>}
  </div>
  <slot />
</section>
```

*Backwards compatibility:* all new props are optional, so existing call sites
compile unchanged. `medicolegal-fundamentals`/`legislation`/`legal-cases` are then
progressively given `id` + `lead` as they are reformatted (Workstream D).

### 5.2 New components

| Component | Purpose | Used by |
| --- | --- | --- |
| `PageIntro.astro` | Intro + on-page contents (§3.2) | all content pages |
| `Callout.astro` | Tone-coded aside: `key`, `limit`, `caution`, `authority` | law, legislation, cases, viewer |
| `KeyPoint.astro` | Single-sentence "the point is" band | end of every section |
| `Breadcrumb.astro` | Extract the breadcrumb currently inline in `[slug].astro` | case pages, library sub-pages |

`Callout.astro` sketch:

```astro
---
interface Props { tone?: "key" | "limit" | "caution" | "authority"; title?: string; }
const { tone = "key", title } = Astro.props as Props;
const tones = {
  key:       "border-teal-500 bg-teal-50/70 dark:bg-teal-950/25",
  limit:     "border-slate-400 bg-slate-50 dark:bg-navy-900",
  caution:   "border-amber-400 bg-amber-50/70 dark:bg-amber-950/20",
  authority: "border-navy-400 bg-navy-50 dark:bg-navy-900",
};
---
<aside class={`rounded-r-xl border-l-4 p-5 ${tones[tone]}`}>
  {title && <p class="text-sm font-bold text-navy-900 dark:text-slate-100">{title}</p>}
  <div class="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><slot /></div>
</aside>
```

### 5.3 Typography and spacing rules (apply consistently)

1. **Body copy** in reference sections: `text-[0.95rem] leading-relaxed` minimum,
   `text-base` for leads and standalone paragraphs. Stop using bare `text-sm` for
   narrative prose; reserve `text-sm` for captions and metadata.
2. **Headings:** `h2` 2xl→3xl (as `Section`), `h3` `text-base font-bold`, `h4`
   `text-xs font-bold uppercase tracking-wider` (already used in `radiology-resources`).
3. **Lists:** standardise on `space-y-3` and bullet dots (`h-1.5 w-1.5 rounded-full bg-teal-500`),
   matching `radiology-resources.astro`.
4. **Card padding:** standardise on `p-6` for content cards, `p-5` for list items.
5. **Section rhythm:** outer container `space-y-12`; inside a `Section` use
   `space-y-8`. Remove the current `space-y-10` hybrid.
6. **Grid gaps:** `gap-6` everywhere (currently `gap-6`/`gap-8` mixed).
7. **Anchor offsets:** every anchored block gets `scroll-mt-24`.
8. **Dark mode:** verify every new `bg-*` has a `dark:` partner; the `card` and
   `chip` atoms already handle this, so prefer them.

### 5.4 On-page table of contents

Delivered by `PageIntro.contents` (§3.2), so no separate floating widget is needed.
If a sticky rail is later wanted on the long law page, add a small
`<script>` that reads `h2[id]` and builds the list — but the static `contents`
prop is the simpler, JS-free default and matches the site's mostly-static style.

### 5.5 Fix the broken anchor

`referrals.astro` links to `#terms` but no element has `id="terms"`. Either add
`id="terms"` to the "Terms of engagement" card or point the link at `#imaging-transfer`
on the transfer card. Do this while editing the page.
---

## 6. Workstream D — more detail, page by page

Each item below adds substance **and** a source, and is placed where it reduces
scrolling rather than adding it.

### 6.1 `/medicolegal-fundamentals` (biggest job — 19 sections)

Reformat from minified single lines into readable blocks, then regroup into three
labelled parts with a shared `PageIntro` TOC:

- **Part 1 — Working principles (6 sections):** Bolam; Bolitho; Montgomery; Breach
  in image interpretation; RCR reporting standards; Duty of candour.
  Add to each: a "What the claimant must show" line and a "How the expert tests it" line.
- **Part 2 — Causation and consent (3):** Chester; Gregg; Wilsher. Add an explicit
  contrast: *consent* cases turn on the risk not disclosed, *causation* cases turn on
  the counterfactual.
- **Part 3 — Landmark decisions (10):** Nettleship, Roe, Sidaway, Paris, Watt plus
  the five already repeated. **De-duplicate**: Bolam, Bolitho, Chester, Gregg and
  Montgomery currently appear twice (once as principle, once as "famous case").
  Recommend collapsing each to one entry with a "landmark" tag, removing ~5
  duplicate sections.
- **New, small additions that genuinely help:**
  - A one-table "which case for which question" index (case → question → section anchor).
  - A short "further reading / status" note under each case saying whether it is
    still good law and what has since qualified it.
  - Split AI-assisted reporting out of "candour" into its own section with the RCR
    2025 requirements enumerated.

### 6.2 `/radiology-legislation` (thinnest page — 4 sections)

- Add a `PageIntro` and a "how to use this summary" caution.
- Add for each instrument: **who it binds**, **the duty**, **the record**, **the
  consequence**, **the primary source link**. The current pages give duty holders
  and duties but no consequences and no links.
- Add two missing instruments that radiology governance regularly involves:
  **Data Protection Act 2018 / UK GDPR** (processing of imaging and DICOM headers,
  subject access and third-party requests) and **Access to Health Records** duties.
- Add a short "where these duties meet the standard of care" cross-link into the
  case law page.

### 6.3 `/radiology-legal-cases` (8 sections)

- Add `PageIntro` + TOC; give each case an `id`, a `lead`, and consistent fields:
  **Issue / Facts / Held / Principle / Practical effect / Status**.
- Group into: Interpretation · Communication · Consent · Quantum and causation ·
  Category patterns.
- Upgrade the numbered `text-sm` paragraphs to a definition-style layout so the
  facts and the principle are visually distinct (the `Callout tone="authority"`
  for the principle).
- Add the citation for each case in full (several are currently short-form, e.g.
  `FB v Princess Alexandra Hospital [2017] EWCA Civ 334` is present but
  `Gwyn v South Tyneside and Sunderland [2021]` lacks a neutral citation).

### 6.4 `/recent-developments` (9 posts, 1 index)

- Add `PageIntro` explaining what the commentary is and how cases are chosen and
  anonymised.
- Add a **subject index** band under the filter chips (categories → count), so the
  ~10 categories are legible before filtering.
- Add "Most recent" / "All" ordering note and a result count for the JS filter
  (currently filtering gives no feedback).
- Add an "Editorial note" callout repeating the anonymisation and
  not-legal-advice statements, since this is the page strangers land on first.
- Consider a per-post "Related sections" footer linking the post's category into
  the relevant library section (improves both navigation and internal linking).

### 6.5 `/radiology-resources` (already the best page — polish only)

- Add `PageIntro`; it already has strong `lead` text on every section.
- Add `id` + `index` to each `Section` so the TOC works.
- Add a short "how to read this page" note explaining the primary-source shelf.

### 6.6 `/medicolegal-radiology`

- Add `PageIntro` and `id`s; the page overlaps `radiology-legal-cases` on teleradiology
  and incidental findings. Recommend keeping this as the *argument/essay* and
  reducing duplicated case digests to cross-links.

### 6.7 `/expert-witness`

- Add `PageIntro` framing the practice as what funds the resource.
- Ensure no fee, turnaround-cost or price language is introduced (README policy).

### 6.8 Simpler pages (`contact`, `cv`, `patient-advice`, `dicom-viewer`, `about`, `referrals`)

- Add `PageIntro` only; these are already well structured. For `referrals`, also
  add the missing `#terms` anchor (§5.5).
- `patient-advice`: add a "when to seek advice / who to ask" closing block, and
  note that the page is general information only.

### 6.9 Housekeeping identified en route

- `src/layouts/BlogPost.astro` is unused duplicate scaffolding and computes
  `readingTime` from a URL. **Delete** it (verify no imports first) or repair it —
  do not leave it as an alternative path.
- `README.md` site-hierarchy table lists seven sections; confirm it reflects the
  final `NAVIGATION_LINKS` after any relabelling in §7.
---

## 7. The emphasis change — "a small legal resource … with comment on recent cases"

The current framing calls this "a working resource for imaging practice and the law"
and describes two equal libraries. The requested emphasis is subtly different:
**a small resource on radiology and medicolegal law, whose draw is commentary on a
few recent, interesting cases.** Wording lives centrally in `src/consts.ts`
(README policy), so the change is one file plus the home hero copy.

### 7.1 Proposed constant changes

| Constant | Now | Proposed |
| --- | --- | --- |
| `SITE_TITLE` | `Radiology & Medicolegal Law` | keep (it is accurate and short) |
| `SITE_TAGLINE` | `A working resource for imaging practice and the law` | `A small working resource on radiology and the law` |
| `SITE_DESCRIPTION` | long two-clause description | lead with "small, selective reference resource … commentary on recent cases", then name the two libraries |
| `RESOURCE_LIBRARIES[].description` | describes each library | append how each is kept small: "a short, sourced set of entries rather than an exhaustive text" |
| `NAVIGATION_LINKS` label for `/recent-developments` | `Developments` | `Case Commentary` (keeps the emphasis in the nav; route unchanged) |

### 7.2 Home page copy

- Hero `<h1>`: keep "A working resource for radiology and medicolegal law." or move
  to "A small reference resource on radiology and the law." — one line, no change of
  meaning needed.
- Add a **new short block** immediately after the hero: "What this resource is — and
  what it is not" — three bullets (`Callout`-free, plain): *small and selective*;
  *sourced to primary authorities*; *commentary on recent cases, not a case-report
  service*. This directly satisfies the ask.
- The `stats` strip already includes the ~37% claim figure and the 2025 RCR
  standards year; those two are the strongest "small but current" signals, so keep them.

### 7.3 Sanity checks on framing

- Do **not** imply the case commentary is comprehensive or a substitute for
  LexisNexis/Westlaw; the index and intro should state it is a selection.
- Keep "not legal advice" in the footer (already present) and repeat it on the two
  law pages and on `/recent-developments`.
- The expert-witness page must remain secondary to the library in nav and copy.

---

## 8. File-by-file change list

**New files**

| File | Change |
| --- | --- |
| `src/components/PageIntro.astro` | new intro + contents component (§3.2) |
| `src/components/Callout.astro` | new tone-coded aside (§5.2) |
| `src/components/Breadcrumb.astro` | extracted breadcrumb (§5.2) |
| `src/pages/sitemap.astro` | new human site map (§4.4) |
| `public/robots.txt` | new, points at sitemap index (§4.2) |
| `PLAN.md` | this plan |

**Edited files**

| File | Change |
| --- | --- |
| `src/consts.ts` | add `SITEMAP`; adjust `SITE_TAGLINE`/`SITE_DESCRIPTION`; relabel nav + library copy (§7.1) |
| `src/components/Section.astro` | add `id`, `index`, `scroll-mt-24`, rule, larger lead (§5.1) |
| `src/components/PageHero.astro` | no API change; optionally add breadcrumb slot |
| `src/components/Footer.astro` | add "Site map" link (§4.5) |
| `src/pages/index.astro` | new "what this resource is / is not" block; site-map link (§7.2, §4.5) |
| `src/pages/radiology-resources.astro` | `PageIntro`; `id`/`index` on sections |
| `src/pages/medicolegal-fundamentals.astro` | reformat, regroup, de-duplicate, `PageIntro`, add details (§6.1) |
| `src/pages/radiology-legislation.astro` | `PageIntro`, add records/consequences/sources, 2 new instruments (§6.2) |
| `src/pages/radiology-legal-cases.astro` | `PageIntro`, uniform case fields, grouping, citations (§6.3) |
| `src/pages/recent-developments/index.astro` | `PageIntro`, subject index, result count, editorial note (§6.4) |
| `src/pages/medicolegal-radiology.astro` | `PageIntro`, `id`s, de-duplicate to cross-links (§6.6) |
| `src/pages/expert-witness.astro` | `PageIntro` (§6.7) |
| `src/pages/about.astro`, `cv.astro`, `contact.astro`, `patient-advice.astro`, `dicom-viewer.astro`, `referrals.astro` | `PageIntro`; `referrals` anchor fix (§6.8, §5.5) |
| content pages (all of the above, minus `login`) | add `export const prerender = true;` (§4.1) |
| `astro.config.mjs` | only if sitemap filtering is required (§4.1 step 3) |
| `README.md` | document `/sitemap`, `robots.txt`, the `SITEMAP` constant, and the domain-coupled robots line |
| `src/layouts/BlogPost.astro` | delete (verify no imports) or repair (§6.9) |

**Untouched:** `src/middleware.ts`, `src/pages/api/*`, `src/pages/login.astro`,
`src/components/LocalDicomViewer.astro`, `src/components/MedicalImageViewer.astro`,
`public/_headers`, KV bindings.
---

## 9. Phasing and checkpoints

Each phase ends in a runnable, deployable state. Nothing later depends on anything
unordered.

**Phase 0 — foundations (blocks everything else)**
1. `PageIntro.astro` and `Callout.astro` created.
2. `Section.astro` gains `id` / `index` / `scroll-mt-24`, backwards-compatible.
3. `SITEMAP` added to `consts.ts`.
4. `npm run build` still passes.

**Phase 1 — introductions everywhere**
5. Drop `PageIntro` + `contents` into all 13 content pages (§3.4 copy).
6. Add `id`s matching those `contents` anchors.
7. Checkpoint: every "On this page" link scrolls to the right heading.

**Phase 2 — site map**
8. `src/pages/sitemap.astro` created and prerendered.
9. `public/robots.txt` added.
10. Footer + home links added; confirm `/sitemap` is not an orphan.
11. Rebuild and confirm `dist/sitemap-0.xml` contains every public route (§4.1);
    add `prerender` exports as needed.

**Phase 3 — readability pass**
12. Apply §5.3 typography/spacing rules page by page.
13. Fix the `#terms` anchor.
14. Checkpoint: no page uses bare `text-sm` for narrative prose; all lists `space-y-3`.

**Phase 4 — content depth**
15. `medicolegal-fundamentals` reformat, regroup, de-duplicate (§6.1) — the largest
    single edit; do it in sub-commits (Part 1 / Part 2 / Part 3).
16. `radiology-legislation` detail + two new instruments (§6.2).
17. `radiology-legal-cases` uniform case fields + grouping (§6.3).
18. `recent-developments` index improvements (§6.4).
19. Remaining pages (§6.5–6.8).

**Phase 5 — framing + housekeeping**
20. `consts.ts` wording changes (§7.1); home hero block (§7.2).
21. Delete/repair `BlogPost.astro`; update `README.md` (§6.9, §8).

---

## 10. Acceptance criteria and QA

**Build / type / deploy gates (existing scripts)**
- `npm run build` succeeds.
- `npm run check` (build + `tsc` + `wrangler deploy --dry-run`) succeeds.
- `npm run dev` renders every route, light and dark.

**Content and behaviour checks**
- Every content page shows a `PageIntro` beneath its hero.
- Every "On this page" entry resolves to an existing `id`; verify by grepping the
  `contents` arrays against rendered `id`s (a small script over `dist/` will do).
- `/sitemap` lists every public route and is linked from the footer and home page.
- `dist/sitemap-0.xml` (or the configured name) contains every public route.
- `robots.txt` is reachable and points at the sitemap index.
- No page is orphaned (README policy): each `src/pages/*.astro` has ≥1 inbound link.
- No price, fee, `priceRange`, or turnaround-cost string anywhere (README policy).
- Case commentary and photos stay anonymised; "not legal advice" appears on the
  footer and on the two law pages and the commentary index.

**Regression checks specific to this work**
- `PageIntro` renders correctly with `contents` omitted (no empty nav card).
- `Section` with no `id`/`index` renders exactly as before (old call sites).
- Dark mode: new `bg-slate-50` intros and `Callout` tones all have `dark:` variants.
- No new inline scripts are needed for the TOC (static anchors only).

---

## 11. Risks, decisions needed, and open questions

**Risks**
1. **De-duplication is a judgement call.** Removing the repeated Bolam/Bolitho/
   Chester/Gregg/Montgomery sections from `medicolegal-fundamentals` (§6.1) changes
   the page's meaning of "famous cases". Confirm before deleting content.
2. **`prerender = true` and Clerk.** The middleware is bypassed when
   `CLERK_SECRET_KEY` is unset, so prerendering content pages is safe locally — but
   confirm no content page calls `Astro.locals.auth()` before enabling it.
3. **Domain coupling.** `robots.txt` hard-codes the sitemap URL; it must change with
   `astro.config.mjs`'s `site` (README note required).
4. **Nav relabel** (`Developments` → `Case Commentary`) changes header/footer labels
   site-wide and the README table; low risk but visible.

**Open questions — please confirm before I implement**
1. **Nav relabel:** is `Case Commentary` preferred, or keep `Developments`?
2. **De-duplication:** should the repeated landmark cases in
   `medicolegal-fundamentals` be collapsed to one entry each, or kept as a separate
   "famous cases" appendix?
3. **`PageIntro` placement:** immediately under the hero on every page as planned,
   or only on the library/commentary pages (leaving contact/login/referrals as-is)?
4. **Extra instruments** (UK GDPR/DPA 2018, access to records) in
   `radiology-legislation` — add them, or keep the page to the four currently listed?
5. **`BlogPost.astro`** — delete it, or repair it and make the content collection use
   it instead of the inline template in `[slug].astro`?

**Suggested default if no answer is needed:** keep `Developments` as the nav label
(lowest-risk), collapse duplicates with "landmark" tags retained, apply `PageIntro`
to every content page except `login`, add the two data-protection instruments, and
delete `BlogPost.astro` after confirming it is unreferenced.
   resource contains.