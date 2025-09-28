# Effective Marketer Backend Server

This is the backend server that handles SEO optimization for the Effective Marketer website.

## 🚀 Deployment to Render

### Step 1: Create New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure Build Settings
- **Root Directory**: `server-setup`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18 or higher

### Step 3: Environment Variables
No environment variables needed for basic setup.

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## 🔧 Local Development

```bash
cd server-setup
npm install
npm start
```

Server will run on `http://localhost:3001`

## 📋 What This Server Does

1. **SEO Optimization**: Serves each page with unique titles and meta tags
2. **Static File Serving**: Serves the React app files
3. **API Endpoints**: Provides webhook endpoints for n8n integration

## 🔍 Testing

After deployment, test these URLs:
- `https://your-app.onrender.com/` → Homepage with correct title
- `https://your-app.onrender.com/ai-seo-agency-usa` → USA page with unique title
- `https://your-app.onrender.com/ai-seo-agency-vietnam` → Vietnam page with unique title

## 📝 API Endpoints

- `POST /api/blog/webhook` - n8n webhook endpoint
- `GET /api/blog/drafts` - Get all drafts
- `POST /api/blog/drafts/:id/publish` - Publish a draft

## 🔗 Integration with Main Site

After deployment, update your main site's `_redirects` file:

```
/* https://your-app.onrender.com/:splat 200
```

This will redirect all traffic to the backend server for proper SEO handling.
