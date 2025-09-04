# Blog Backend Domain Issue Documentation

## Problem
- **Backend Domain**: `effective-marketer-dashboard.onrender.com` (where blog posts are served)
- **Main Site Domain**: `effectivemarketer.com` (where users expect to find blog posts)
- **Issue**: Blog posts are served from backend domain, but SEO and user expectations are for main domain

## Current Setup
1. **Backend Server**: `effective-marketer-dashboard.onrender.com`
   - Serves blog posts at `/blog/:slug`
   - Has full HTML generation with SEO meta tags
   - Database integration working

2. **Main Site**: `effectivemarketer.com`
   - Static site on Render
   - React app with routing
   - Users expect blog posts here

## Solutions Considered

### Option 1: Domain Redirects (Recommended)
- Set up redirects from `effectivemarketer.com/blog/*` to `effective-marketer-dashboard.onrender.com/blog/*`
- Maintains SEO value
- Users get seamless experience
- No additional costs

### Option 2: Proxy/Reverse Proxy
- Route blog requests through main domain
- More complex setup
- Potential performance issues

### Option 3: Move Backend to Main Domain
- Would require upgrading to Web Service on Render
- Additional $7/month cost
- User doesn't want this

## Recommended Approach: Domain Redirects

### Implementation Steps:
1. **Update Backend URLs**: Ensure all internal links use main domain
2. **Set Up Redirects**: Configure Render to redirect blog requests to backend
3. **Update SEO**: Ensure canonical URLs point to main domain
4. **Test**: Verify redirects work without breaking SEO

### SEO Considerations:
- Use 301 redirects (permanent)
- Maintain canonical URLs on main domain
- Ensure structured data uses correct domain
- Update sitemap to reflect correct URLs

## Current Status
- Backend blog serving implemented ✅
- Domain mismatch identified ❌
- Redirect solution needed ⏳
- SEO URLs need updating ⏳

## Next Steps
1. Fix backend error ("error loading blog post")
2. Set up domain redirects
3. Update all SEO URLs to main domain
4. Test complete flow
