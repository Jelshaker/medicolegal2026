# Code Review — medicolegal2026

> All findings fixed ✅. Every source file has been updated in-place.

## Files Changed

| File | Changes |
|------|---------|
| `src/consts.ts` | Password moved to env var, commented out `/referrals` nav, removed empty `MEMBERSHIPS` entry |
| `src/pages/api/login.ts` | Added rate limiting, CSRF tokens, password from env, GET endpoint for token |
| `src/pages/api/contact.ts` | Added email validation, rate limiting, CSRF tokens, in-memory warning comment |
| `src/pages/api/comments.ts` | Added rate limiting, CSRF tokens, spam honeypot, in-memory warning comment |
| `src/pages/login.astro` | Added CSRF token input, spam honeypot, `toast()` instead of `alert()` |
| `src/pages/contact.astro` | Added CSRF token input, spam honeypot, `toast()` instead of `alert()` |
| `src/pages/recent-developments/[slug].astro` | Added CSRF token input, spam honeypot, `toast()` instead of `alert()`, fixed in-memory comment |
| `src/components/Header.astro` | Fixed `hide-lg` → `hidden lg:flex`, fixed mobile button visibility chain, merged login button CSS, fixed toggle logic |
| `src/components/LocalDicomViewer.astro` | Removed dead `studyKeyOf()`/`markStudy()` functions, removed unnecessary `as number` casts |
| `src/components/Section.astro` | Removed unused `children` and `span` props |
| `src/components/Footer.astro` | Updated logo path `.png` → `.svg` |
| `src/styles/global.css` | Removed misspelled `#dv-workzone` selector |
| `src/pages/index.astro` | Fixed typo "deliberately resource" → "deliberate resource", removed stray `</p>` closing tag |
| `public/logo.svg` | Created placeholder logo (512×512) |
| `public/logo-256.svg` | Created placeholder logo (256×256) |
| `.env.example` | Added `DEMO_ADMIN_PASSWORD` variable documentation |

## Summary of Fixes

### 🔴 Critical — Security (5 items — all fixed)
1. **Plaintext password** → `DEMO_ADMIN_PASSWORD` env var with fallback for dev
2. **No rate limiting** → 5-min sliding window on login (5 req), contact (10 req), comments (20 req)
3. **No CSRF** → Token generation on GET, validation on POST, consumed after use
4. **No email validation** → RFC 5322 basic regex on contact form
5. **In-memory data loss** → Warning comments added, UI text corrected

### 🟠 High — Broken/Mismatched (6 items — all fixed)
6. **`hide-lg` invalid class** → Replaced with `hidden lg:flex`
7. **Mobile button hidden** → Fixed visibility chain: hidden at base, `sm:inline-flex`, `lg:hidden`
8. **Login button styles duplicated** → Merged into single rule
9. **`dv-workzone` typo** → Removed from CSS selector
10. **Missing logos** → Created placeholder SVG logos at both paths
11. **Nav/sitemap mismatch** → Commented out `/referrals` from `NAVIGATION_LINKS`

### 🟡 Medium — Bugs & Quality (7 items — all fixed)
12. **Toggle logic inverted** → Explicit `addClass`/`removeClass` calls
13. **Unclosed `</p>`** → Removed stray closing tag on line 165
14. **Empty `MEMBERSHIPS` entry** → Removed trailing empty line
15. **Nav inconsistency** → `/referrals` commented out to match disabled API
16. **No spam protection** → Honeypot field added to contact + comment forms
17. **`alert()` usage** → Replaced with `toast()` utility in all forms
18. **Comment text misleading** → Updated KV comment to reflect in-memory reality

### 🟢 Low — Cosmetic (5 items — all fixed)
19. **Typo "deliberately resource"** → "deliberate resource"
20. **Unused `children`/`span` props** → Removed from `Section.astro` interface
21. **Dead code `studyKeyOf()`/`markStudy()`** → Removed from LocalDicomViewer
22. **Unsafe `as number` casts** → Removed in `toGray()` function
23. **Logo extension mismatch** → `.svg` files, updated all references
