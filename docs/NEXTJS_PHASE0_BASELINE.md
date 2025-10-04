# Next.js Migration Phase 0 Baseline

## Dependency and Tooling Audit
- `react`: 18.3.1 (Next.js compatible, no immediate changes needed)
- `react-dom`: 18.3.1 (compatible)
- `react-router-dom`: 7.6.3 (client routing to be replaced with Next.js routing primitives)
- `react-helmet-async`: 2.0.5 (metadata handling will move to the Next.js Metadata API)
- `vite`: 7.1.3 with `@vitejs/plugin-react`: 4.3.1 (to be removed once Next.js build pipeline is established)
- Build scripts: `npm run build` runs Vite, `FINAL-ULTIMATE-EXTRACTOR.cjs`, and `scripts/render-full-content.cjs`
- Styling: Tailwind CSS 3.4.1 and PostCSS/autoprefixer (configs portable to Next.js)
- TypeScript: `moduleResolution` set to `bundler`; adjust to `NodeNext` or rely on Next defaults when migrating
- Puppeteer: 22.15.0 used by `scripts/render-full-content.cjs` for post-build HTML capture
- Backend: `server-setup/express-server.cjs` serves generated HTML with route specific metadata overrides

## Build and Deployment Workflow Snapshot
1. `npm run build`
   - Runs `vite build` to emit static assets into `dist`
   - Executes `FINAL-ULTIMATE-EXTRACTOR.cjs` to inject hidden marketing content into each route
   - Executes `scripts/render-full-content.cjs` to embed fully rendered HTML inside `<template id="seo-content">`
2. Deployment uses both the static bundle and the Express SEO server (Render Web Service configuration documented in `docs/SEO_BACKEND_SOLUTION.md`).

## SEO Content Baseline (From Existing Documentation)
- Total pages processed: 12
- Total extracted content pieces: 1,831
- File size range: 51 KB to 69 KB per route
- Representative counts:
  - `/`: 270 pieces (67 KB)
  - `/ai-seo-agency-usa`: 246 pieces (68 KB)
  - `/ai-seo-for-saas-companies`: 217 pieces (66 KB)
  - `/ai-seo-for-healthcare`: 209 pieces (66 KB)
  - `/ai-topical-map`: 67 pieces (55 KB)
  - `/case-studies`: 31 pieces (51 KB)
- Hidden content delivered via `.complete-seo-content` wrapper and `<template id="seo-content">` in every HTML file

## Key Observations
- Current pipeline depends on Vite specific tooling and manual extractor scripts; these must be replaced with native Next.js rendering.
- Metadata is applied twice: React Helmet during runtime and Express middleware during SSR. Next.js implementation must consolidate metadata generation.
- Breadcrumb and structured data are embedded in page components today and need one to one equivalents in Next.js server components.
- Hosting model relies on Render: static hosting plus Express worker. Next.js will deploy as a dynamic Render web app using the standalone output.

## Pending Decisions and Follow Up
- Create dedicated migration branch before implementation work begins.
- Determine approach for replacing Puppeteer post-processing (ideally unnecessary once pages render content at build time).
- Hosting target confirmed: Render dynamic web service using Next.js standalone output.

## Recent Phase 1 Progress Highlights
- Migrated primary homepage sections (Hero, CaseStudyLogos, Future, Team, Dashboard, Roadmap, GetStarted, Contact, FinalCTA) into `next/src/components/home`.
- Implemented Next.js friendly Header and Footer with Link navigation and Render-ready layout wiring.
- Verified Next.js lint (`npm run lint`) and build (`npm run build`) succeeding after component imports.
- Established shared team data module in `next/src/data/teamData.ts` for reuse across pages.

## Phase 2 Routing Progress Highlights
- Added Next.js route pages for the homepage, `google-autosuggest-ranking`, `lead-gen-ai-automation`, `ai-seo`, `ai-seo-for-saas-companies`, `ai-seo-for-ecommerce`, `ai-seo-for-healthcare`, and `ai-topical-map` replicating Vite content.
- Reintroduced EmailJS-powered contact form handling (`service_p70onc9`, `template_mn8h5de`) to match the existing site workflow while maintaining structured data output.
- Initial metadata applied using Next.js Metadata API for new pages (title, description, OG). Further dynamic metadata to follow.
- Built metadata helper utilities in `next/src/lib/metadata.ts` and applied breadcrumb structured data.
