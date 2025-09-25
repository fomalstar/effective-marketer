## Build & Deploy

- Static build via `npm run build` (or `npm run build:static` convenience)
- Output in `dist/`

## IndexNow Integration

- Key file hosted at `public/a7b8c7614a074ed28408273880793687.txt` and deployed at `https://<host>/a7b8c7614a074ed28408273880793687.txt`.
- Submission script: `scripts/indexnow-submit.mjs`
- NPM script: `npm run indexnow`
- Usage:
  - Set environment variable `SITE_URL` (e.g. `https://www.effectivemarketer.com/`).
  - Optionally pass custom URLs: `npm run indexnow -- --urls=https://host/page1,https://host/page2`
  - You can override key location: `--keyLocation=https://host/a7b8c7614a074ed28408273880793687.txt`
  - Default URLs submitted: homepage and `sitemap.xml` if present in `public/`.

