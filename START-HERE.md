# Veelogg website code

This is the complete source for version 2 of the redesigned Veelogg website.

## Run locally

Requirements: Node.js 22.13 or later, and pnpm 11.25.0 (the version pinned in package.json).

1. Extract this ZIP.
2. Open a terminal in the extracted `veelogg-website` folder.
3. Install dependencies and start the development server:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5173, or the local address printed by the terminal.

To create a production build:

```sh
pnpm build
```

This project uses React, TypeScript, Tailwind CSS, Motion, and Vinext with Cloudflare tooling. Keep the supplied configuration files and lockfile when installing or moving it. It is a source project, so opening a TSX file directly in a browser will not run the website.

## Where to edit

- `app/page.tsx`: homepage layout and copy.
- `app/globals.css`: colours, typography and responsive styling.
- `components/playful.tsx`: app dock, draggable photos and guide-cover motion.
- `components/site-shell.tsx`: logo, navigation and footer.
- `app/guides/page.tsx`: free-guide page.
- `components/guide-library.tsx`: guide search and category filters.
- `lib/guides.ts`: the eight guide entries and article links.
- `lib/content.ts`: service details, prices and FAQs.
- `public/assets/`: your logo, photos and app icons.
- `public/fonts/`: local font files.
- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`: SEO settings.

## Before public launch

The review version intentionally uses `noindex, follow`. Enable indexing in `app/layout.tsx` when publishing publicly, and confirm the canonical domain and sitemap URLs.

Free guides link to your existing articles. Enquiries and purchases use your existing contact page, email address and Stripe checkout. The ZIP includes the current Sites project configuration; local development does not require a Sites credential. Deployment to a different host requires configuring that host for this Vinext/Cloudflare project.

The original logo, photos, icons, fonts and design documentation are included. See `ASSET-SOURCES.md` for provenance and `README.md` for implementation details. Dependency folders, build output and Git history are omitted.

Source commit: d93c30c610f9be1c4b59c2b487dfc5dc495abc0c
