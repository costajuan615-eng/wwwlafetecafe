
# La Fête Cafe — Website Plan

A warm, soulful restaurant site inspired by Caribbean/Southern brunch culture, built with the pasted content as source of truth. No online ordering (delivery is unavailable per the listing) — we link out to Uber Eats and drive people to visit, call, and view the menu.

## Design direction

- **Vibe:** rustic-warm, editorial, food-forward. Think reclaimed wood, cast iron, hand-lettered accents — matching the uploaded hero photo.
- **Palette:** deep charcoal `#1a1310`, warm cream `#f5ebdc`, burnt sienna/paprika accent `#c2410c`, mustard highlight `#d4a017`.
- **Type:** display serif for headings (e.g. "DM Serif Display"), clean sans for body ("Inter"). Loaded via `<link>` in `__root.tsx`.
- **Photography:** one generated hero (overhead spread on wood, similar to the uploaded reference) + a few dish accents. Uploaded image is reference only, not embedded.

## Pages (TanStack Start file routes)

- `/` — Hero, intro blurb, featured dishes, review quotes, hours/location, CTA to menu + Uber Eats.
- `/menu` — Full menu, all 10 categories from the pasted content, with prices, descriptions, and "Popular" / "#1 most liked" badges.
- `/about` — Restaurant story, rating (4.6 ★ / 260+), review quotes.
- `/visit` — Address, hours (Mon 7:00 AM – 9:00 PM), phone/map, Uber Eats link, "Delivery unavailable" note.

Shared header (logo + nav) and footer (address, hours, socials placeholder). Each route sets its own `head()` with unique title/description/og tags; leaf hero image used for `og:image` on `/`.

## Content mapping

All menu items, prices, descriptions, and category names come verbatim from the pasted text. Reviews shown on `/` and `/about` are the six quoted ones. Rating badge "4.6 ★ · 260+ ratings" appears in hero and about.

## Technical

- TanStack Start + Tailwind v4, tokens defined in `src/styles.css` under `@theme`.
- Menu data lives in `src/data/menu.ts` (typed) and is imported by the menu page and homepage featured section — single source of truth.
- Generated images saved to `src/assets/` (hero + 2–3 dish shots) via imagegen.
- SEO: per-route title/description/og, JSON-LD `Restaurant` schema on `/` with address, hours, priceRange, aggregateRating.
- No backend needed. No Lovable Cloud.

## Out of scope

- Online ordering / cart (delivery unavailable; Uber Eats handles it).
- CMS / admin — menu is static in code, easy to edit later.
- Reservations (not mentioned in source).

Shall I build this?
