## Build & Deploy

### Static Site Build
- Static build via `npm run build`
- Output in `dist/`
- Serves React app with client-side routing

### Backend Server (SEO Solution)
- **Location**: `server-setup/express-server.cjs`
- **Purpose**: Serve pages with unique SEO meta tags
- **Deployment**: Render Web Service
- **Configuration**:
  - Root Directory: `server-setup`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Node Version: 18+

### Deployment Architecture
```
Main Site (Static) → Redirects → Backend Server (SEO) → Serves React App
```

## SEO Backend Solution

### Problem Solved
- **Issue**: All pages showing same homepage title in search results
- **Root Cause**: SPA routing not generating unique HTML for each route
- **Solution**: Backend server serves each route with unique SEO data

### Implementation
- **Backend server** handles SEO meta tags server-side
- **Static site** remains fast and cost-effective
- **Redirects** route traffic to backend for SEO handling
- **Each page** gets unique title, description, and canonical URL

### SEO Data Structure
```javascript
const seoData = {
  '/': { title: 'Google Autosuggests & AI SEO Agency - Effective Marketer' },
  '/ai-seo-agency-usa': { title: 'Best AI SEO Agency in USA | Effective Marketer' },
  '/ai-seo-agency-vietnam': { title: 'Best AI SEO Agency in Vietnam | Effective Marketer' }
  // ... more routes
};
```

## IndexNow Integration

- Key file hosted at `public/a7b8c7614a074ed28408273880793687.txt` and deployed at `https://<host>/a7b8c7614a074ed28408273880793687.txt`.
- Submission script: `scripts/indexnow-submit.mjs`
- NPM script: `npm run indexnow`
- Usage:
  - Set environment variable `SITE_URL` (e.g. `https://www.effectivemarketer.com/`).
  - Optionally pass custom URLs: `npm run indexnow -- --urls=https://host/page1,https://host/page2`
  - You can override key location: `--keyLocation=https://host/a7b8c7614a074ed28408273880793687.txt`
  - Default URLs submitted: homepage and `sitemap.xml` if present in `public/`.

