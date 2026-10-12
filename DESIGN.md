# DESIGN.md: Jorge Rosas CV website

Reference for keeping the site consistent. Principles follow the taste-skill dials
(variance 3, motion 3, density 5) and the Vercel Web Interface Guidelines.

## Tone
Plain, answer-first copy. No sci-fi labels, no em dashes in copy. First person is fine (personal site).

## Colour
- Background `#0a0a0a`, surface `#111111`, text `#ffffff`, secondary `#a1a1aa`, muted `#8a8a94`
- Accent (structure and information only): `--accent #8b9cf8`
- Green `#4ade80`: **returns only** (the +104.6% figures and the price line). Never decorative.
- LinkedIn button uses LinkedIn blue `#0a66c2`.
- No glows, no text-shadow, no gradient text.

## Type
Inter. Tabular numerals for every number. Headings use `text-wrap: balance`.
Hero name 600 weight; section labels 12px uppercase with a small accent square.

## Shape and layout
- 6px radius on buttons, square cards on a 1px hairline grid.
- Max width 1200px, sections 89px vertical padding, 55px on phones.
- Proof strip is full-bleed.

## Motion
One-time fade-up on scroll, line-draw on the price chart. Everything respects `prefers-reduced-motion`.
Animate `transform` and `opacity` only. Never `transition: all`.

## Accessibility
Skip link, visible `:focus-visible` outlines (accent), `scroll-margin-top` on sections,
chart exposed as an image with a text label, `color-scheme: dark`.

## Do not
Custom cursors, floating orbs, tilt cards, marquees, glow shadows, a third accent colour.
