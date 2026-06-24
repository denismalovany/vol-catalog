---
version: alpha
name: VOL
description: Volunteer Optical Laboratory — calm, trust-forward humanitarian brand. Teal-and-charcoal palette on a clean white canvas, with a single dark "field report" section for gravity.
colors:
  primary: "#2297b2"
  primary-hover: "#1559ed"
  text: "#333333"
  heading: "#000000"
  link: "#000000"
  link-hover: "#333333"
  border: "#e1e8ed"
  surface-soft: "#fafbfc"
  surface-muted: "#f2f5f7"
  surface-dark: "#282c29"
  white: "#ffffff"
  black: "#000000"
typography:
  h1:
    fontFamily: Montserrat
    fontWeight: 600
    fontSize: 35px
    lineHeight: 1.5
    letterSpacing: "0"
    textTransform: none
  h2:
    fontFamily: Montserrat
    fontWeight: 600
    fontSize: 35px
    lineHeight: 1.5
    letterSpacing: "0"
    textTransform: none
  h3:
    fontFamily: Montserrat
    fontWeight: 600
    fontSize: 20px
    lineHeight: 1.65
  body-md:
    fontFamily: Montserrat
    fontWeight: 400
    fontSize: 18px
    lineHeight: 1.65
  body-sm:
    fontFamily: Montserrat
    fontWeight: 400
    fontSize: 16px
    lineHeight: 1.65
  nav-link:
    fontFamily: Montserrat
    fontWeight: 400
    fontSize: 15px
    lineHeight: 1
    textTransform: uppercase
    letterSpacing: "0"
  button:
    fontFamily: Montserrat
    fontWeight: 600
    fontSize: 16px
    lineHeight: 1.3
  stat-number:
    fontFamily: Montserrat
    fontWeight: 600
    fontSize: 35px
    lineHeight: 1.2
shapes:
  rounded-sm: 4px
  rounded-md: 10px
  rounded-lg: 15px
spacing:
  container-max: 1290px
  narrow-max: 750px
  container-pad: 24px
  content-gap: 60px
  block-gap: 16px
elevation:
  shadow-button: "none"
  shadow-card: "none"
motion:
  transition: "all 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{shapes.rounded-md}"
    padding: "0px 30px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.white}"
    rounded: "{shapes.rounded-md}"
  button-dark:
    backgroundColor: "{colors.text}"
    textColor: "{colors.white}"
    rounded: "{shapes.rounded-lg}"
    padding: "12px 40px"
  section-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.white}"
    padding: "{spacing.container-pad}"
  nav-link:
    typography: "{typography.nav-link}"
    textColor: "{colors.text}"
    padding: "5px 0px"
  link:
    textColor: "{colors.link}"
    textDecoration: none
  link-hover:
    textColor: "{colors.link-hover}"
---

## Overview

**VOL** (Volunteer Optical Laboratory) is a Ukrainian charity that repairs optical,
electro-optical and drone equipment for the defence forces. The visual identity
is built for **trust and transparency over time** — readers are donors, brigade
commanders, and journalists who need to see numbers, reports, and craft without
distraction.

The aesthetic is **calm civic-tech**: a single accent (teal) on a near-white
canvas, generous whitespace, real numbers surfaced as primary content, and one
dark "field report" section that breaks the lightness to give the reporting
weight. No gradients, no shadows, no decoration. Borders are square or softly
rounded (10–15px) — never pill-shaped.

Source: extracted 2026-06-23 from https://vol.com.ua/ via DOM-computed styles
and the inline WordPress/Blocksy CSS. Brand tokens (palette-color-1…8) come
from `:root` custom properties; component tokens come from real `.ct-button`,
`.stk-button`, and `.stk-block` instances on the live page.

## Colors

The brand runs on an **8-step palette** declared as CSS custom properties on
`:root` and exposed as `palette-color-1…8`. Everything maps back to this set —
no other hues are introduced.

- **Primary (`#2297b2` — teal):** The single accent. Reserved for primary
  buttons (`ПІДТРИМАТИ`), focus rings, and form-field focus. It is the only
  saturated color on the page.
- **Primary hover (`#1559ed` — blue):** Hover/focus state for teal elements
  *and* focus border for form fields. A small saturation shift, not a swap.
- **Text (`#333`):** Body copy, paragraph, captions. Never pure black on
  body — keeps paragraphs comfortable at 18px.
- **Heading (`#000`):** H1–H3 and nav labels. Pure black for max hierarchy
  contrast against `#fafbfc`.
- **Link (`#000`) → hover `#333`:** Default link color is full black (you
  notice it), hover lightens slightly.
- **Border (`#e1e8ed`):** All dividers, form field borders, card edges.
- **Surface soft (`#fafbfc`):** Page background — almost white, never
  clinically pure `#fff`.
- **Surface muted (`#f2f5f7`):** Text-selection background, soft section
  alternates.
- **Surface dark (`#282c29`):** The single dark section. A near-black with a
  green-olive cast — used for the stats ("ЗА ВЕСЬ ПЕРІОД РОБОТИ") and
  mission-statement blocks. It anchors the page.
- **White / Black:** Reserved for inverse text on primary/dark buttons and
  the strongest headings only.

## Typography

A single typeface, **Montserrat**, loaded locally (self-hosted WOFF2 from
`/wp-content/uploads/blocksy/local-google-fonts/` — no Google Fonts CDN call,
which matters for EU privacy and offline use). Two weights only: **400 (body)**
and **600 (emphasis, buttons, headings)**. No italics, no display variant.

- **Headings (H1, H2):** 35px / 600 / 1.5 line-height. Identical scale for
  H1 and H2 — the page relies on context and section spacing, not size
  jumps, to communicate hierarchy.
- **Body:** 18px / 400 / 1.65 line-height. Larger than typical — this is
  reading-first typography for long report paragraphs.
- **Nav links:** 15px / 400 / **uppercase**. The only `text-transform:
  uppercase` on the site. Slightly compressed visual rhythm signals
  "navigation" without using a different font.
- **Buttons:** 16px / 600.
- **Stat numbers** (e.g. "44.169.508 EUR"): 35px / 600, line-height 1.2 —
  sized to match the headings so the numbers *are* the heading.

Fluid (clamp) scale is declared in `--wp--preset--font-size--large` etc.
(`clamp(22px, 1.375rem + ((1vw - 3.2px) * 0.625), 30px)`) but the actual
rendered page uses fixed sizes — leave the fluid scale as a *future* option,
do not adopt it yet.

## Layout & Spacing

- **Container max-width:** 1290px (theme's `--theme-normal-container-max-width`).
- **Narrow container (text-heavy sections):** 750px (`--theme-narrow-container-max-width`).
- **Container edge padding:** 24px on all sides. Reads as a wide gutter at
  desktop, full-bleed comfortable padding on mobile.
- **Container width formula:** `min(100%, calc(90vw - 0px * 2))` — the
  theme auto-clamps viewport to 90vw, so sections never hit the literal
  screen edge.
- **Vertical content spacing:** 60px between major sections.
- **Block / card spacing:** 16px (theme default).
- **Section padding (default):** 24px all around for the dark stats block.

The hero is a full-bleed dark video section; the layout rhythm is therefore
**dark → light → dark → light → dark**, with stats and mission as the two
dark anchors.

## Shapes

No shadows anywhere. No gradients. Everything is either square or softly
rounded.

- **Buttons (CT theme):** 10px radius.
- **Buttons (Stackable plugin):** 15px radius — slightly more pill-like,
  used for dark secondary CTAs like `ДЕТАЛЬНІШЕ`.
- **Inputs / cards:** 4px radius (theme default for fields).
- **Sections:** 0px radius — sections meet at hard, square edges. This is
  what gives the page its "report / institutional" feel.

## Elevation

**None.** `box-shadow: none` is set on every button instance. Depth is
expressed only through the dark-section-on-white-section alternation, not
shadows. This is deliberate — shadows would read as "product / SaaS" and
undercut the report-document tone.

## Motion

A single transition curve, applied globally:
`all 0.12s cubic-bezier(0.455, 0.03, 0.515, 955)`. That's `--theme-transition`.
It is fast (120ms) and ease-out — buttons respond without lag, but there is
no spring / overshoot / playful motion. Keep it for hover, focus, and
color changes only. **Do not** animate size, position, or layout with it.

## Components

### `button-primary` (the "ПІДТРИМАТИ" / donate button)

The single most important element on the page. Teal background, white text,
10px radius, **50px min-height** so the hit target is comfortable, 30px
horizontal padding. No border, no shadow.

On hover/focus: background darkens to `--theme-button-background-hover-color`
(`#1559ed`). Text stays white.

### `button-dark` (the Stackable secondary CTA)

Charcoal `#333` background, white text, larger **15px radius** (more
rounded than the primary button), padding `12px 40px`, font 18px / 400.
Used for `ДЕТАЛЬНІШЕ` (Learn more) and dark-section CTAs. This is a
*secondary* action — lower saturation, larger padding reads as a quieter
"continue reading" button.

### `section-dark`

Background `#282c29`, white text, 24px padding. Use sparingly — one per
viewport is the rule. The dark stats block (44.169.508 EUR / 14.310
devices / etc.) and the mission statement are the only two on the homepage.

### `nav-link`

Uppercase, 15px, `#333`. Inline list, 5px vertical padding. No separator
characters between items — spacing alone separates them.

### `link`

Default `#000`, no underline (`text-decoration: none`). Hover `#333`.
Because the default is full black on near-white, links are recognizable
without an underline. This is a content-first decision: underlines would
compete with the inline numeric values in the stats paragraphs.

## Do's and Don'ts

**Do:**
- Keep all buttons at 50px min-height (or 18px padding for the dark
  variant). Touch targets matter.
- Use `#2297b2` (teal) for exactly one thing per viewport — the primary
  CTA or a focus state. Never as a decorative accent.
- Use `#282c29` for at most one section per scroll-screen. The dark
  surface carries emotional weight; overuse flattens it.
- Set body text at 18px / 1.65. Resist "tightening" the line-height —
  long reports need air.
- Use the narrow (750px) container for any paragraph block over 3
  sentences.

**Don't:**
- Don't add a second accent color. The page is teal + neutral; a new hue
  breaks the institutional tone.
- Don't use `text-transform: uppercase` outside the nav. The page uses
  case *as hierarchy*; turning H1s into SHOUTING breaks it.
- Don't add shadows, gradients, or blur. The design is explicitly flat.
- Don't introduce a second typeface. Montserrat at 400/600 is the whole
  system.
- Don't use `border-radius: 9999px` (pill) — the largest radius in the
  system is 15px.
- Don't animate anything longer than 120ms. The whole motion vocabulary
  is "responsive, not theatrical."
- Don't use pure `#fff` as a page background. `#fafbfc` is the chosen
  neutral; pure white reads as cold/sterile and clashes with the
  charity's warmer mission.
