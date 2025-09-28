# Render Web Service Setup Guide

## Overview
This guide explains how to set up a new Render web service to replace the static app and make the website completely dynamic.

## Current Problem
- Static app serves same HTML for all routes
- Google indexing issues due to identical page source
- Need dynamic server-side rendering for proper SEO

## Solution: New Render Web Service

### Step 1: Create New Web Service on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub repository
   - Select the `effectivemarketer` repository

3. **Configure Web Service**
   - **Name**: `effectivemarketer-web-service` (or your preferred name)
   - **Root Directory**: `server-setup`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run sitemap && npm run build && npm run indexnow`
   - **Start Command**: `npm start`
   - **Node Version**: `18` (or latest stable)

### Step 2: Environment Variables
Add these environment variables in Render:
- `NODE_ENV=production`
- `PORT=10000` (Render will set this automatically)
- `SITE_URL=https://your-domain.com` (your actual domain)

### Step 3: Domain Configuration
1. **Custom Domain**
   - In Render dashboard, go to your web service
   - Click "Settings" → "Custom Domains"
   - Add your domain: `effectivemarketer.com`
   - Update DNS records as instructed

2. **Remove Static App**
   - Delete or disable the old static app
   - Point domain directly to the new web service

### Step 4: Build Command Explanation

**Current Command**: `npm install && npm run sitemap && npm run build:static && npm run indexnow`

**Updated Command**: `npm install && npm run sitemap && npm run build && npm run indexnow`

**Why the change?**
- `build:static` → `build`: We want the full React app build, not just static files
- The server will serve the React app dynamically with unique SEO for each route

### Step 5: Verify Setup

1. **Check Build Process**
   - Monitor the build logs in Render
   - Ensure all commands complete successfully
   - Verify `dist/` folder is created with React app

2. **Test Routes**
   - Visit your domain
   - Test different routes: `/ai-topical-map`, `/ai-seo-agency-usa`, etc.
   - Check "View Page Source" - should show unique content per route

3. **Verify SEO**
   - Each page should have unique `<title>` tags
   - Meta descriptions should be different per page
   - Google should see different content for each route

## Expected Results

### Before (Static App):
```html
<!-- All pages show same content -->
<title>Google Autosuggests & AI SEO Agency - Effective Marketer</title>
<div id="root"></div>
```

### After (Web Service):
```html
<!-- Each page shows unique content -->
<title>AI Topical Map Services | Effective Marketer</title>
<meta name="description" content="Advanced AI topical mapping services..." />
<div id="root"></div>
<!-- React app loads and renders unique content -->
```

## Troubleshooting

### Build Fails
- Check Node version compatibility
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Routes Not Working
- Verify server is running on correct port
- Check that all routes are defined in `seoData`
- Test locally first: `cd server-setup && npm start`

### SEO Still Not Working
- Check that meta tags are being injected correctly
- Verify React app is mounting properly
- Test with Google Search Console

## Next Steps After Setup

1. **Monitor Performance**
   - Check Render logs for any errors
   - Monitor response times
   - Verify all routes are accessible

2. **SEO Verification**
   - Submit sitemap to Google Search Console
   - Test with Google's Rich Results Test
   - Monitor indexing status

3. **Optimization**
   - Add caching headers
   - Optimize build process
   - Monitor resource usage

## Support Files

- `server-setup/express-server.cjs` - Main server file
- `package.json` - Dependencies and scripts
- `dist/` - Built React application
- `docs/` - Project documentation

## Contact
If issues persist, check the server logs in Render dashboard and verify all configuration steps were followed correctly.
