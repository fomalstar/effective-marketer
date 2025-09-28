# Technical Reference for Next AI

## Project Structure
```
effectivemarketer/
├── server-setup/           # Backend server (Root Directory for Render)
│   ├── express-server.cjs  # Main server file
│   └── package.json        # Server dependencies
├── src/                    # React frontend source
├── dist/                   # Built React app (created during build)
├── docs/                   # Project documentation
└── package.json            # Main project dependencies
```

## Key Files to Understand

### 1. `server-setup/express-server.cjs`
- **Purpose**: Express server that serves React app with dynamic SEO
- **Key Features**:
  - Serves React app from `../dist/` folder
  - Injects unique meta tags for each route
  - Handles API endpoints
  - Serves static files

### 2. `server-setup/package.json`
- **Scripts**:
  - `start`: Runs the Express server
  - `build`: Builds the React app (runs from parent directory)
- **Dependencies**: Express, CORS, compression, helmet

### 3. Main `package.json`
- **Scripts**:
  - `build`: Builds React app with Vite
  - `sitemap`: Generates sitemap.xml
  - `indexnow`: Submits to search engines
  - `build:static`: Legacy script (don't use)

## Build Process Explanation

### Current Build Command:
```bash
npm install && npm run sitemap && npm run build && npm run indexnow
```

### What Each Command Does:
1. `npm install` - Installs dependencies
2. `npm run sitemap` - Generates sitemap.xml
3. `npm run build` - Builds React app to `dist/` folder
4. `npm run indexnow` - Submits to search engines

### Why Not `build:static`?
- `build:static` was for static file generation
- `build` creates the full React app that the server can serve dynamically
- The server needs the React app to inject SEO meta tags

## Server Configuration

### Render Web Service Settings:
- **Root Directory**: `server-setup`
- **Build Command**: `npm install && npm run sitemap && npm run build && npm run indexnow`
- **Start Command**: `npm start`
- **Environment**: Node.js

### Environment Variables:
- `NODE_ENV=production`
- `PORT=10000` (auto-set by Render)
- `SITE_URL=https://effectivemarketer.com`

## SEO Implementation

### How It Works:
1. User visits a route (e.g., `/ai-topical-map`)
2. Server reads `dist/index.html`
3. Server injects unique meta tags for that route
4. Server serves modified HTML to user
5. React app loads and renders the page content

### SEO Data Structure:
```javascript
const seoData = {
  '/ai-topical-map': {
    title: 'AI Topical Map Services | Effective Marketer',
    description: 'Advanced AI topical mapping services...',
    keywords: 'AI topical map, topical mapping...',
    canonical: 'https://effectivemarketer.com/ai-topical-map'
  },
  // ... more routes
};
```

## Common Issues and Solutions

### 1. Build Fails
- **Cause**: Missing dependencies or incorrect Node version
- **Solution**: Check `package.json` dependencies, use Node 18

### 2. Routes Show Same Content
- **Cause**: Route not defined in `seoData` object
- **Solution**: Add missing route to `seoData` in `express-server.cjs`

### 3. React App Not Loading
- **Cause**: `dist/` folder missing or incorrect build
- **Solution**: Verify build command completes successfully

### 4. Meta Tags Not Updating
- **Cause**: Server not injecting tags correctly
- **Solution**: Check `generateHTML` function in `express-server.cjs`

## Testing Commands

### Local Testing:
```bash
cd server-setup
npm install
npm start
```

### Build Testing:
```bash
npm run build
ls dist/  # Should show built files
```

### Route Testing:
- Visit each route and check "View Page Source"
- Verify unique titles and meta descriptions
- Check that React app loads and renders content

## Deployment Checklist

1. ✅ Web service created on Render
2. ✅ Root directory set to `server-setup`
3. ✅ Build command configured correctly
4. ✅ Environment variables set
5. ✅ Custom domain configured
6. ✅ Old static app removed/disabled
7. ✅ All routes tested and working
8. ✅ SEO meta tags unique per page
9. ✅ Sitemap submitted to Google
10. ✅ Indexing requested for key pages

## Support Files
- `render-web-service-setup.md` - Complete setup guide
- `step-by-step-checklist.md` - Action checklist
- `docs/SEO_BACKEND_SOLUTION.md` - Original SEO solution
- `docs/PROJECT_OVERVIEW.md` - Project architecture
