# Step-by-Step Checklist: New Render Web Service

## ✅ Step 1: Create New Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `effectivemarketer` repository

## ✅ Step 2: Configure Web Service Settings
- **Name**: `effectivemarketer-web-service`
- **Root Directory**: `server-setup`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run sitemap && npm run build && npm run indexnow`
- **Start Command**: `npm start`
- **Node Version**: `18`

## ✅ Step 3: Add Environment Variables
In Render dashboard, add these environment variables:
- `NODE_ENV=production`
- `SITE_URL=https://effectivemarketer.com` (your actual domain)

## ✅ Step 4: Deploy and Test
1. Click "Create Web Service"
2. Wait for build to complete
3. Test the generated URL (e.g., `https://effectivemarketer-web-service.onrender.com`)

## ✅ Step 5: Configure Custom Domain
1. In your web service dashboard, go to "Settings"
2. Click "Custom Domains"
3. Add your domain: `effectivemarketer.com`
4. Follow DNS instructions to point domain to the web service

## ✅ Step 6: Remove Old Static App
1. Go to your old static app in Render
2. Delete or disable it
3. Verify domain now points to the new web service

## ✅ Step 7: Test All Routes
Visit these URLs and check "View Page Source":
- `https://effectivemarketer.com/` (homepage)
- `https://effectivemarketer.com/ai-topical-map`
- `https://effectivemarketer.com/ai-seo-agency-usa`
- `https://effectivemarketer.com/ai-seo-agency-vietnam`
- `https://effectivemarketer.com/google-autosuggest-ranking`

## ✅ Step 8: Verify SEO
Each page should show:
- Unique `<title>` tag
- Unique meta description
- Different content in page source

## ✅ Step 9: Submit to Google
1. Go to Google Search Console
2. Submit your sitemap
3. Request indexing for key pages

## 🚨 Important Notes:
- **Build Command**: Use `npm run build` (not `build:static`)
- **Root Directory**: Must be `server-setup`
- **Start Command**: Must be `npm start`
- **Domain**: Point directly to web service, not static app

## 🔧 If Something Goes Wrong:
1. Check Render build logs
2. Verify all environment variables are set
3. Test locally: `cd server-setup && npm start`
4. Check that `dist/` folder exists after build
