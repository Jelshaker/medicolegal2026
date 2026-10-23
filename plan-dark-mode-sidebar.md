# Plan: Dark Mode Button & Sidebar Close Function

## Overview
Add a dark mode toggle button to the top header and ensure clicking the menu toggle button closes the open TOC sidebar when it is visible.

## Files Modified
- `src/components/Header.astro` – Add dark mode button and enhanced click handler.
- (Optional) `src/pages/*.astro` – No changes needed if dark mode is applied at the `<html>` level.

## Detailed Steps

### 1. Dark Mode Button in Header
| Step | Action |
|------|--------|
| 1.1 | In `Header.astro`, locate the **right group** `<div class="shrink-0 flex items-center gap-x-3">` (around line 62). |
| 1.2 | After the mobile menu toggle button (or before the login button), add a new button element: <br><br>```html\n<button\n  id="theme-toggle"\n  type="button"\n  class="btn btn-ghost header-theme-toggle"\n  aria-label="Toggle dark mode"\n  aria-pressed=\"false\"\n>\n  <svg id=\"icon-moon\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width="2" class="hidden">\n    <circle cx="12" cy="12" r="5"/>\n    <path d="M12 1v2M12 21v2My2 12h2M21 12h2"/>\n  </svg>\n  <svg id=\"icon-sun\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke="currentColor" stroke-width="2" class="block">\n    <circle cx="12" cy="12" r="5"/>\n    <path d="M12 1v2M12 21v2m0-2c-6.6 0-12 6.4-12 12s6.4 12 12 12s6.4-12 12-12"/>\n  </svg>\n</button>\n```<br><br>*(The SVG icons are optional; you may use simple text "🌓" or Tailwind `dark:` utilities if preferred.)* |
| 1.3 | Add a `<script>` block (or extend the existing IIFE) that toggles a `data-theme` attribute on the `<html>` element between `"light"` and `"dark"` when the button is clicked. |
| 1.4 | Update the button's `aria-pressed` state to reflect the current theme. |
| 1.5 | (Optional) Add CSS in `src/styles/global.css` to style the button for both light and dark themes, using the existing `var(--color-ink)` / `var(--color-paper)` tokens. |

### 2. Close Sidebar on Menu Toggle Click
| Step | Action |
|------|--------|
| 2.1 | In the same `<script>` IIFE of `Header.astro`, inside the existing click listener for `#menu-toggle`, add logic to hide the TOC sidebar if it is currently visible. |
| 2.2 | Use the following code snippet (insert after the existing menu toggle logic, inside the `document.addEventListener(\"click\", ...)` block): <br><br>```javascript\n// Close TOC sidebar if open\nconst tocSidebar = document.querySelector(\".toc-sidebar\");\nif (tocSidebar) {\n  tocSidebar.classList.remove(\"is-ready\");\n  // Optionally add `hidden` attribute for extra safety\n  tocSidebar.setAttribute(\"hidden\", \"true\");\n}\n```<br><br>This removes the `is-ready` class, which—per `src/styles/global.css`—switches the sidebar from `display: block` back to `display: none`. |
| 2.3 | Ensure the `aria-expanded` attribute of the menu toggle is set correctly when the sidebar closes. |
| 2.4 | Test: run the site locally, open the TOC sidebar on a wide viewport, then click the menu toggle (hamburger) – the sidebar should close. |

### 3. Verification
| Step | Action |
|------|--------|
| 3.1 | Start the dev server: `npm run dev` (or `yarn dev`). |
| 3.2 | Verify the dark mode button appears in the top header, next to the login/logout area. |
| 3.3 | Click the button and confirm the page switches between light and dark themes (Tailwind `dark:` utilities apply). |
| 3.4 | On a wide viewport, open the TOC sidebar (it should be visible by default). Click the menu toggle button; the sidebar should disappear. |
| 3.5 | On mobile, verify the existing mobile menu still works and the sidebar close logic does not interfere. |

### 4. Optional: Persist Theme Preference
| Step | Action |
|------|--------|
| 4.1 | If you want the chosen theme to persist across sessions, store the preference in `localStorage` or `sessionStorage` within the toggle handler: <br><br>```javascript\nconst html = document.documentElement;\nconst current = html.getAttribute(\"data-theme\") === \"dark\" ? \"light\" : \"dark\";\nhtml.setAttribute(\"data-theme\", current);\nlocalStorage.setItem(\"theme\", current);\n```<br><br>On page load, read from storage and set the initial theme. |
| 4.2 | Add a small script at the top of `Header.astro` (or in `src/layouts/BaseLayout.astro`) to apply the stored preference on first load. |

## Notes & Assumptions
- The project uses Tailwind CSS with dark mode enabled (likely via `class` strategy). Toggling a `data-theme` or `class="dark"` on `<html>` should cause Tailwind's `dark:` utilities to activate.
- The TOC sidebar visibility is controlled by the presence of the `is-ready` class on `.toc-sidebar` (defined in `src/styles/global.css`).
- The header already has a mobile menu toggle (`#menu-toggle`) that controls `#mobile-menu`. The new logic adds sidebar-closing behavior without breaking existing functionality.
- SVG icons used in the button are minimal; replace with existing iconography if the project has a preferred set.

## Checklist
- [x] Dark mode button added to Header.astro right group.
- [x] Tailwind v4 configured for class-based dark mode (`tailwind.config.js` with `darkMode: 'class'`).
- [x] Theme toggle script toggles `class="dark"` on `<html>` to activate Tailwind `dark:` utilities.
- [x] Button `aria-pressed` state updated accordingly; sun/moon icons swapped.
- [x] Theme choice persisted in `localStorage` (`medicolegal-theme`), honoring `prefers-color-scheme` as fallback.
- [x] Click handler for `#menu-toggle` always calls `closeSidebar()` before toggling the mobile menu drawer — so clicking the toggle when the TOC sidebar is open closes it.
- [x] Click handler now calls `getEls()` before reading `mobileMenu`, fixing a first-click caching bug.
- [x] TypeScript check passes (`tsc --noEmit` clean).
- [x] Astro build completes successfully.