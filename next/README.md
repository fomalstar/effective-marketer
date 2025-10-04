# Effective Marketer Next.js Migration Workspace

This directory contains the Next.js 15 App Router scaffold for migrating the Effective Marketer site from the existing Vite stack.

## Getting Started

```bash
npm install
npm run dev
```

- The dev server runs on `http://localhost:3000`.
- Global styles live in `src/app/globals.css`.
- Shared components and pages will be ported from the root `src/` directory in upcoming phases.

## Deployment Target
- Hosting: Render dynamic web service (Node 18+)
- Build command: `npm run build`
- Start command: `npm run start`
- Output: `standalone` bundle (see `next.config.ts`)

## Migration Notes
- Tailwind theme matches the Vite project to preserve design tokens.
- React 18.3.1 is used to align with the existing component codebase.
- Follow the steps in `docs/NEXTJS_MIGRATION_PLAN.md` for ongoing migration tasks.
