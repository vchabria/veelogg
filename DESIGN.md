---
name: Veelogg
description: A playful digital desk for AI content, automations, websites, apps and mentorship.
colors:
  white: '#fff'
  brown: '#38251f'
  yellow: '#ffda59'
  pink: '#ffc4da'
  paper: '#faf6f1'
  ink-muted: '#725a51'
  border: '#d9cac3'
  brown-hover: '#5c3d30'
  yellow-hover: '#f1c538'
  shelf-pink: '#fce9f0'
  guide-paper: '#f1e6d8'
  receipt-pink: '#fce6ee'
  receipt-yellow: '#fff0b5'
  on-brown-muted: '#eeded6'
typography:
  display:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: clamp(54px, 6.4vw, 87px)
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: -0.04em
  headline:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 58px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.04em
  title:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 45px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.04em
  library-display:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 68px
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: -0.04em
  guide-cover:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.04em
  body:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  text-link:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.6
  button:
    fontFamily: Poppins, Arial, sans-serif
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: 12px
  cover: 14px
  app-icon: 15px
  tray: 24px
  highlight: 8px
  filter: 8px
  pill: 999px
spacing:
  gutter-wide: 58px
  gutter-compact: 39px
  gutter-tablet: 28px
  gutter-mobile: 23px
  gutter-narrow: 19px
components:
  button-brown:
    backgroundColor: '{colors.brown}'
    textColor: '{colors.white}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    padding: 15px 23px
  button-brown-hover:
    backgroundColor: '{colors.brown-hover}'
  button-yellow:
    backgroundColor: '{colors.yellow}'
    textColor: '{colors.brown}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    padding: 15px 23px
  button-yellow-hover:
    backgroundColor: '{colors.yellow-hover}'
  button-outline:
    backgroundColor: transparent
    textColor: '{colors.brown}'
    typography: '{typography.button}'
    rounded: '{rounded.control}'
    padding: 15px 23px
  button-outline-hover:
    backgroundColor: '#fff8'
  text-link:
    textColor: '{colors.brown}'
    typography: '{typography.text-link}'
  app-dock:
    backgroundColor: '#f4efea'
    textColor: '{colors.brown}'
    rounded: '{rounded.tray}'
    padding: 17px 19px 12px
  app-icon:
    rounded: '{rounded.app-icon}'
    size: 60px
  guide-cover-pink:
    backgroundColor: '{colors.pink}'
    textColor: '{colors.brown}'
    rounded: '{rounded.cover}'
    padding: 28px 28px 21px
  guide-cover-yellow:
    backgroundColor: '{colors.yellow}'
    textColor: '{colors.brown}'
    rounded: '{rounded.cover}'
    padding: 28px 28px 21px
  guide-cover-brown:
    backgroundColor: '{colors.brown}'
    textColor: '{colors.white}'
    rounded: '{rounded.cover}'
    padding: 28px 28px 21px
  guide-cover-paper:
    backgroundColor: '{colors.guide-paper}'
    textColor: '{colors.brown}'
    rounded: '{rounded.cover}'
    padding: 28px 28px 21px
  free-tag:
    rounded: '{rounded.pill}'
    padding: 2px 9px
  guide-search:
    backgroundColor: transparent
    textColor: '{colors.brown}'
    rounded: '0'
    padding: 5px 0
    height: 44px
  guide-filter:
    backgroundColor: transparent
    textColor: '{colors.brown}'
    rounded: '{rounded.filter}'
    padding: 9px 12px
    height: 42px
  guide-filter-selected:
    backgroundColor: '{colors.yellow}'
  offer-tab:
    backgroundColor: transparent
    textColor: '{colors.brown}'
    rounded: '{rounded.control}'
    padding: 14px
  offer-tab-selected:
    backgroundColor: '{colors.brown}'
    textColor: '{colors.white}'
  offer-receipt-pink:
    backgroundColor: '{colors.receipt-pink}'
    textColor: '{colors.brown}'
    rounded: '{rounded.control}'
    padding: 32px 33px
  offer-receipt-yellow:
    backgroundColor: '{colors.receipt-yellow}'
    textColor: '{colors.brown}'
    rounded: '{rounded.control}'
    padding: 32px 33px
---

# Design System: Veelogg

## Overview

**Creative North Star: "Playful digital desk"**

Veelogg feels like Varnika’s working desk: a bold, centered invitation surrounded by real photographs, useful guides and recognizable app icons. White space gives the objects room; chocolate type, saturated yellow and pink make the experience warm and playful.

The original handwritten logo supplies the personal mark. Poppins carries every live text role, from poster-scale headlines to controls. Soft physical depth, slight rotations and optional movement make the objects feel handleable while the offers, guide titles and next steps remain readable. This is the explicitly authorized replacement for the rejected restrained V1 direction.

**Key Characteristics:**

- Original handwritten logo and original Veelogg app icon.
- Poppins only, with bold poster headlines and plain, direct copy.
- Real photographs, colored guide covers and labeled app destinations.
- Optional movement with visible focus and static touch/reduced-motion alternatives.

Scope: the shipped homepage and guide hub, their shared shell and used controls. The composition contract remains in `.impeccable/surfaces/app-page-tsx.md`; product and asset truth remain in `PRODUCT.md` and `ASSET-SOURCES.md`.

## Colors

The palette combines strong chocolate contrast with cheerful yellow and pink; the frontmatter is normative.

| Role | Tokens | Application |
| --- | --- | --- |
| Primary | `brown`, `brown-hover` | Main text, filled actions, selected service tabs, dark guide covers and editing-skill section. |
| Secondary | `yellow`, `yellow-hover`, `receipt-yellow` | Action fill, selected guide filter, highlights, photo backing and scope receipts. |
| Tertiary | `pink`, `shelf-pink`, `receipt-pink` | Hero highlight, guide covers, broad free-guide shelf, contact poster and scope receipts. |
| Neutral | `white`, `paper`, `guide-paper` | Page canvas, photo framing, quiet hover fill and warm guide covers. |
| Supporting neutral | `ink-muted`, `border`, `on-brown-muted` | Supporting copy, dividers and text on the dark section. |

Keep chocolate text on light brand surfaces and white text on chocolate. The app dock also uses destination-specific gradients, Shopify green and white Apple treatment; these remain local icon treatments, not an expanded page palette. The about headline has a local berry accent. The sidecar’s synthetic tonal ramps are preview aids, not additional implementation tokens.

## Typography

Poppins is self-hosted in regular, medium, semibold and bold weights with `font-display: swap`; Arial and sans-serif are fallbacks. No live text uses Fraunces. The logo retains its original embedded lettering.

The frontmatter roles describe actual base treatments: `display` for the homepage hero, `library-display` for the guide hub, `headline` for section headings, `title` for offer headings, `guide-cover` for cover typography, and `body`/`lead`/`label`/`text-link`/`button` for supporting content. Headings use balanced wrapping and close tracking. Paragraphs have a general maximum measure of 70ch; hero copy narrows to 570px and offer prose to 47ch. The scale is composition-specific rather than mathematical.

The homepage headline becomes 71px at 1150px, 61px at 900px, `clamp(35px, 8.25vw, 49px)` at 640px, and 32px at 370px; it becomes 92px at 1500px and above. Mobile hero leading is 1.25. The guide-hub headline uses 60px, then 50px, then the final `clamp(29px, 10vw, 40px)` at 640px and below. That final clamp overrides the earlier narrow-screen declaration. Body copy remains generally 16px on mobile. Final dock and filter labels are 14px at every viewport; free-guide badges are 12px.

**The Original Mark Rule.** Use the supplied handwritten logo asset; do not recreate the wordmark with a font or redraw it.

**The Poppins Rule.** Use Poppins for live interface text. The lettering inside the supplied logo is an asset, not a second typesetting family.

## Layout

The shared container is centered at a maximum outer width of 1320px, leaving 1204px inside the base gutters. The homepage uses a centered hero with offset photo cards and a dock below the main actions. Wide layouts combine generous whitespace with section-specific grids; the guide hub gives search and covers the main reading area.

| Media condition | Gutter | Observed change |
| --- | --- | --- |
| Base | `gutter-wide` | Three-column guide shelf/hub; four service tabs; two-column service brief/receipt. |
| Max 1150px | `gutter-compact` | Tighter type, gaps and cards; search and filters stack; guide-help strip loses outer rounding. |
| Max 900px | `gutter-tablet` | Header becomes a mobile menu; guide hub becomes two columns; editing-skill intro spans a two-column body. |
| Max 640px | `gutter-mobile` | Hero photos enter normal flow; dock becomes a 3×2 grid; guides and content sections stack; service tabs form a 2×2 grid; filters wrap. |
| Max 370px | `gutter-narrow` | Smaller logo, photo crops, selected headings and search text. |
| Min 1500px | `gutter-wide` | Hero grows to 800px minimum height with larger display type and repositioned desk objects. |

The sticky header is 94px high, then 80px at 900px and 76px at 640px. Anchor offsets are 105px, reducing to 87px on mobile. The base hero minimum height is 750px, then 715px and 690px, before becoming content-sized at 640px. Desktop guide gaps are 38px on the shelf and 49px by 30px in the hub. Section spacing is intentionally composition-specific; do not invent a universal section-padding token.

## Elevation & Depth

Depth belongs to desk objects: photographs, app icons, covers, receipts and the contact envelope. The header and service tabs stay flat. Guide covers on the homepage have a low shadow and lift on hover/focus; hub covers are flat at rest. Photographs retain slight static rotations; mobile receipts become upright and lose their shadow. Exact shadow values live in the sidecar.

Motion requires `(min-width: 641px) and (hover: hover) and (pointer: fine)` for the dock, movable photos and cover fan, and is disabled when reduced motion is requested. The dock’s distance response is ±130px, peaking at 1.28× scale; its spring uses mass 0.12, stiffness 260 and damping 20. Pointer exit resets the cursor value to infinity. Covers settle once at 35% visibility over 0.65s, staggered by 0.07s, with `cubic-bezier(0.16, 1, 0.3, 1)`.

Buttons lift 3px over 0.25s; covers lift 10px over 0.4s; the service panel enters from 6px below over 0.3s. Reduced motion removes CSS animations/transitions, hover movement and smooth scrolling. Narrow screens force cover-fan transforms off and suppress cover hover lift. The original React/Motion implementation draws on the public 21st.dev dock preview and Readymag interaction references; it does not contain the locked 21st component source or run in Readymag.

**The Optional Play Rule.** Keep navigation, reading and enquiries complete without dragging, magnification, scroll animation or WebGL.

## Shapes

Controls use soft corners, covers use slightly larger corners and app icons use compact rounded squares; the frontmatter records their base radii. The dock is a rounded tray. Free-guide badges use thin outlined pills, while counts, process numbers and the guide-hub stamp are circles.

The broad shelf has rounded top corners (56px, then 35px at 900px and 31px at 640px). Photo frames remain square, paper-like rectangles. The reel has a 22px outer radius and 17px image radius; the contact envelope uses 16px. Highlight strips are slightly rotated inline blocks, not gradients or decorative text effects. Service receipts use a dashed price divider and a slight desktop tilt. Preserve these distinct object silhouettes instead of applying one card shape everywhere.

## Components

### Buttons and navigation

Brown, yellow and outline actions share a 56px base minimum height, 22px icon gap and the frontmatter padding. Hover shifts fill and position; text links underline. A 3px chocolate focus outline sits 5px outside links, buttons, inputs and focusable objects; dark-section links use yellow. Service tabs use a 4px outline offset and their panels 7px.

The header uses the original logo, plain text navigation and a yellow guide-count badge. There is no desktop active-link treatment. At 900px the menu button exposes `aria-expanded`/`aria-controls`; selecting a mobile link closes the menu. The keyboard-visible skip link targets the main content.

### App dock and photographs

Six permanently labeled destinations map content and systems to their matching service tabs, websites and apps to the build tab, free guides to the hub and say hello to contact. The dock uses 60px icons on desktop, 53px at 900px and 54px on mobile; its mobile tray has no shadow. Keep the supplied platform glyphs recognizable and labels visible.

The two real photo cards start at −8° and +7°. With fine-pointer motion enabled they support drag and keyboard movement. Left-card bounds are x −10…65px/y −35…35px; right-card bounds are x −65…10px/y −35…35px. Arrow keys move 10px, clamped to these bounds. Escape or the revealed reset button returns x/y to zero; drag elasticity and momentum are both off. On touch/narrow/reduced-motion entry the photos retain their static rotations without enabling dragging or a movement tab stop.

### Guide covers, search and filters

Each complete card is one external guide link. Poppins cover titles, a large line icon, category and outlined free badge sit above a separate descriptive caption and arrow. The shelf previews three covers; the hub exposes all eight with full descriptions. Preserve real titles and semantic heading levels.

Search is an open, borderless field inside a divided control row. Matching trims whitespace, ignores case and checks title, full title, description and category together. The five filters are all, brand voice, content, automation and websites; the selected filter uses yellow. Clearing a toggled category returns to all. The count is a status region; an empty result offers “show all guides,” which resets both query and category. Retain the Radix toggle semantics and keyboard behavior. No enquiry form field is embedded here.

### Services, FAQ and contact

Four Radix tabs pair a plain-language brief with a pink or yellow scope receipt. Selected tabs are chocolate with white text. A receipt lists inclusions, price/terms and a full-width action. Choosing a service also updates the visible contact context and drafted email; it sends nothing. The FAQ is a single-open, collapsible Radix accordion with divider rows, underline hover and a rotating chevron.

The pink contact poster combines a highlighted headline with a tilted paper envelope. Enquiry actions use the existing contact page or a mail draft. The visible email remains selectable; its copy button reports success or fallback instructions in a status region. Keep the actual logo/photo/icon provenance in `ASSET-SOURCES.md` when extending these patterns.

## Do's and Don'ts

### Do:

- **Do** preserve the original logo, brand icon and actual personal photographs.
- **Do** use the white, chocolate, yellow and pink hierarchy with Poppins throughout live text.
- **Do** keep free guides prominent, titled in HTML and directly accessible without an email wall.
- **Do** retain visible focus, bounded photo movement, reset controls and reduced-motion behavior.
- **Do** keep scope, price, contact context and guide categories readable beside the playful objects.

### Don't:

- **Don’t** restore the rejected serif/editorial V1 direction or replace the identity with a generic text logo.
- **Don’t** invent client logos, testimonials, outcomes or urgency; platform icons identify destinations.
- **Don’t** replace the real photographs with stock or generated stand-ins.
- **Don’t** make essential content depend on motion, pointer precision or a particular rendering capability.
- **Don’t** treat unused starter components or stored Fraunces font files as active brand patterns.
