#!/bin/sh
cd /Users/joseph/Documents/VScode/medicolegal2026/src/pages

FILES="about.astro contact.astro cv.astro dicom-viewer.astro expert-witness.astro login.astro medicolegal-fundamentals.astro medicolegal-radiology.astro patient-advice.astro radiology-legal-cases.astro radiology-legislation.astro radiology-resources.astro referrals.astro sitemap.astro recent-developments/index.astro recent-developments/[slug].astro"

for f in $FILES; do
  sed -i '' -E 's/ dark:[a-z0-9:/().%!-]+//gI' "$f"
done

echo "done"