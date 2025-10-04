# Next.js Migration Plan

## Purpose
- Define a structured path for replacing the existing Vite based React site with a Next.js implementation.
- Protect the current SEO automation system and SSR capabilities during the transition.
- Provide progress checkpoints for future agents to log changes and maintain continuity.
- Coordinate closely with the SEO replacement approach described in `docs/NEXTJS_SEO_STRATEGY.md`.
- Host the Next.js application as a dynamic web app on Render.

## Current Architecture Snapshot
- React 18 with TypeScript bundled through Vite.
- Routing handled by `react-router-dom` inside `src/App.tsx`.
- SEO meta management provided by `react-helmet-async` and the hidden content extractor (`FINAL-ULTIMATE-EXTRACTOR.cjs`).
- Tailwind CSS for styling with configuration in `tailwind.config.js`.
- Dual deployment: static build in `dist` plus `server-setup/express-server.cjs` for SEO friendly rendering.
- Static assets served from `public` and copied into the build output.

## Migration Principles
- Maintain automated SEO extraction or replace it with an equivalent Next.js aware mechanism before cutover.
- Keep production outages to zero by progressing through parallel proof of concept builds.
- Preserve Tailwind design tokens and component APIs to limit regression risk.
- Document every major change in the Progress Log template provided below.

## Phase 0: Readiness Checklist
1. Audit dependencies for Next.js compatibility and note replacements for Vite specific tooling (see `docs/NEXTJS_PHASE0_BASELINE.md`).
2. Capture baseline metrics: Lighthouse scores, bundle size, SSR output from the current Express server, SEO extractor output counts (documented in `docs/NEXTJS_PHASE0_BASELINE.md`).
3. Verify tests and linting run clean (`npm run lint`).
4. Create a dedicated git branch for the migration work.
5. Confirm hosting requirements for Next.js (static export vs Node server) with stakeholders — completed: Render dynamic web app.

## Phase 1: Foundation Setup
1. Scaffold Next.js 14 project (App Router) inside a `next` directory to allow side by side development.
2. Enable TypeScript, Tailwind, and ESLint during the bootstrap (`npx create-next-app@latest`).
3. Port shared configuration files incrementally:
   - Copy `tailwind.config.js`, `postcss.config.js`, `tsconfig.json` settings that remain relevant.
   - Align aliases and path resolutions with Next.js defaults (`jsconfig.json` or `tsconfig.json`).
4. Migrate global styles from `src/index.css` to `app/globals.css` preserving utility classes required by components.
5. Establish environment variables and build scripts in `package.json` (`next dev`, `next build`, `next export` or custom Node server if SSR is required).
6. Port initial homepage components (`Hero`, `CaseStudyLogos`, `Future`, `Team`, `Dashboard`, `Roadmap`, `GetStarted`, `Contact`, `FinalCTA`) and layout wrappers into the Next.js project.

## Phase 2: Routing and Layout Migration
1. Recreate the main layout inside `app/layout.tsx` including `<html lang="en">`, `<body>`, and shared `Header` and `Footer` components.
2. Convert top level routes from `src/App.tsx` into `app/(marketing)/page.tsx` style segments:
   - `app/page.tsx` replaces the homepage stack (`Hero`, `CaseStudyLogos`, `Future`, etc.).
   - Create route folders for each existing path (for example `app/google-autosuggest-ranking/page.tsx`).
   - For dynamic location routes, use `app/ai-seo-agency/[location]/page.tsx` and port logic from `LocationPage.tsx`.
3. Replace `react-router-dom` usage with `next/link` and `next/navigation` equivalents.
4. Move supporting hooks like `useParams` logic into Next server components or client hooks using `searchParams` when needed.

## Phase 3: SEO and Metadata Strategy
1. Evaluate Next.js Metadata API to replace `SEOHead`. Migrate static metadata into `metadata` exports per route.
2. For dynamic metadata (location pages), use `generateMetadata` inside the dynamic route to pull location data and surface titles, descriptions, and canonical URLs.
3. Recreate structured data injection using `<script type="application/ld+json">` inside server components or Metadata API `other` fields.
4. Port or redesign the hidden SEO content system as outlined in `docs/NEXTJS_SEO_STRATEGY.md`:
   - Option A: Integrate the existing extractor by targeting the new Next.js file structure.
   - Option B: Use Next.js static generation (`generateStaticParams`) to embed the content directly at build time, eliminating the extractor scripts.
5. Validate that the generated HTML contains all required hidden content before shutting down the Express SSR server.

## Phase 4: Data and Component Migration
1. Move shared data files (`src/data`) into a dedicated folder in the Next.js project (`app/_data` or `lib`). Update import paths.
2. Convert React components to Next compatible components:
   - Keep presentational components as client components when interactivity exists.
   - Mark files with `"use client"` only when necessary.
3. Replace asset imports with Next Image where feasible (`next/image`) while keeping SEO extractor considerations in mind.
4. Port utility modules and ensure they do not reference browser only globals when executed on the server.

## Phase 5: Build Pipeline and Automation Alignment
1. Update the root `package.json` scripts to include Next commands while temporarily retaining Vite scripts for fallback.
2. Adapt `FINAL-ULTIMATE-EXTRACTOR.cjs` and related scripts to read from the Next build output or retire them if equivalent functionality is implemented within Next.
3. Rework deployment configuration (`render.yaml`, redirects) to serve the Next.js app. Decide between static export hosting or Node server hosting based on SEO needs.
4. Update CI or build automation to run `npm run lint` and `npm run build` for Next.js.

## Phase 6: Validation and Cutover
1. Run full build and export to confirm HTML output for every route matches or exceeds the previous SEO content counts.
2. Cross check Lighthouse, CWV, and bundle metrics against Phase 0 baselines.
3. Execute manual QA for dynamic routes, contact forms, and CTA flows.
4. Perform staging deployment, verify redirects, and run SEO smoke tests (view source, structured data testing tools).
5. Plan production release window, execute cutover, and monitor logs, Search Console, and analytics for regressions.

## Phase 7: Post Migration Cleanup
1. Remove Vite specific scripts, configs, and extractor files if deprecated.
2. Archive or update documentation (`PROJECT_OVERVIEW.md`, `TECHNICAL_SPECS.md`, SEO extractor docs, `docs/NEXTJS_SEO_STRATEGY.md`) to reflect the new stack.
3. Update monitoring dashboards and alerting to target the Next.js deployment endpoints.
4. Conduct a retrospective to capture lessons learned and adjustments for future iterations.

## Progress Log Template
Future contributors must append entries after every major change. Keep the most recent entry at the top.

| Date (YYYY-MM-DD) | Phase | Description | Owner | Output Links | Follow Up |
| --- | --- | --- | --- | --- | --- |
| 2025-10-04 | Phase 1 | Scaffolded Next.js App Router project, aligned dependencies, Tailwind theme, PostCSS config, tsconfig settings, and ported core homepage/layout components | AI Assistant | `next/` directory | Plan component and route porting sequence |
| 2025-10-04 | Phase 0 | Captured dependency/tooling audit and SEO baseline metrics | AI Assistant | `docs/NEXTJS_PHASE0_BASELINE.md` | Decide hosting model for Next.js deployment |
| 2025-10-04 | Phase 2 | Created Next.js routes for homepage, Google Autosuggest, and AI Automation pages with metadata helpers and breadcrumb structured data | AI Assistant | `next/src/app` | Port remaining service/location pages and wire metadata |
| 2025-10-04 | Phase 2 | Ported AI SEO service page into Next.js with metadata helpers, structured data, and optimized imagery | AI Assistant | `next/src/app/ai-seo/page.tsx` | Continue migrating remaining service/location pages |
| 2025-10-04 | Phase 2 | Migrated AI SEO and SaaS service pages into Next.js with structured data, client components, and optimized assets | AI Assistant | `next/src/app/ai-seo/page.tsx`, `next/src/app/ai-seo-for-saas-companies/page.tsx` | Continue migrating remaining service/location pages |
| 2025-10-04 | Phase 2 | Expanded Next.js marketing routes with ecommerce specialization page and validated production build | AI Assistant | `next/src/app/ai-seo-for-ecommerce/page.tsx` | Continue migrating healthcare and location pages |
| 2025-10-04 | Phase 2 | Added healthcare specialization route with AI SEO messaging, shared components, and validated build | AI Assistant | `next/src/app/ai-seo-for-healthcare/page.tsx` | Extend approach to remaining vertical/location pages |
| 2025-10-04 | Phase 2 | Ported AI topical map offering into App Router with metadata helpers, next/image, and shared CTA/contact flows | AI Assistant | `next/src/app/ai-topical-map/page.tsx` | Continue migrating remaining specialty/location pages |
| 2025-10-05 | Phase 2 | Restored EmailJS contact flow in Next.js with production keys, normalized submission payload, and verified build | AI Assistant | `next/src/components/home/Contact.tsx` | Confirm deployment env vars and monitor form submissions |
| 2025-10-05 | Phase 2 | Started Next.js dev server locally (`npm run dev`) to verify migration pages prior to Render deployment | AI Assistant | localhost:3000 | Complete remaining page migrations and QA |
| 2025-10-05 | Phase 2 | Rebuilt Google Autosuggest Ranking page in Next.js to match legacy content, fixed escaped copy, and restored static assets for local preview | AI Assistant | `next/src/app/google-autosuggest-ranking/page.tsx` | Continue aligning remaining routes/design with legacy site |
| 2025-10-05 | Phase 2 | Ported AI lead generation route into Next.js with full legacy content, imagery, and structured data | AI Assistant | `next/src/app/lead-gen-ai-automation/page.tsx` | Migrate country/location routes (USA, UK, Vietnam) |
| 2025-10-05 | Phase 2 | Ported AI SEO agency USA location page with data-driven content, FAQs, and structured data | AI Assistant | `next/src/app/ai-seo-agency-usa/page.tsx`, `next/src/data/locationData.ts` | Migrate UK and Vietnam location pages |
| 2025-10-05 | Phase 2 | Migrated UK and Vietnam AI SEO agency pages with data-driven content, localized FAQs, and structured data | AI Assistant | `next/src/app/ai-seo-agency-uk/page.tsx`, `next/src/app/ai-seo-agency-vietnam/page.tsx` | Audit image paths and styling differences from legacy site |
|  |  |  |  |  |  |

### Progress Logging Guidelines for AI Agents
- **Frequency**: Update the log whenever a phase completes or a significant subsystem (routing, metadata, extractor) is migrated.
- **Detail Level**: Include the exact files touched, commands executed, and any blockers encountered referencing plans in `docs/NEXTJS_SEO_STRATEGY.md` when SEO changes occur.
- **Evidence**: Link to build artifacts, preview URLs, or diff references when possible.
- **Next Steps**: Capture unresolved tasks or decisions needed to keep the migration moving.

## Open Questions for Confirmation
- Should the SEO extractor remain as an external script or be reimplemented using Next static generation features.
- Any upcoming design changes that should land during the migration window.

## Verification Checklist Summary
Use this list to confirm completion before declaring the migration done.

- [ ] All routes migrated to Next.js with feature parity.
- [ ] Metadata and structured data verified for every page.
- [ ] SEO content extraction validated or replaced.
- [ ] Tailwind styles and global CSS behave as expected.
- [ ] Build and deployment pipelines updated and green.
- [ ] Documentation refreshed and progress log updated.
