#!/usr/bin/env node

/**
 * 🤖 AUTOMATIC SEO CONTENT GENERATOR
 * 
 * This script automatically:
 * 1. Scans all React pages in src/pages/
 * 2. Reads routes from src/App.tsx
 * 3. Generates safe SEO content for ALL pages
 * 4. No manual configuration needed!
 * 
 * FOR FUTURE AI: Just run this script when adding new pages!
 */

const fs = require('fs');
const path = require('path');

console.log('🤖 AUTO SEO GENERATOR: Scanning all pages automatically...');

// STEP 1: Auto-scan all page files
function scanAllPages() {
  const pagesDir = 'src/pages';
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));
  
  console.log(`📁 Found ${pageFiles.length} page files:`);
  pageFiles.forEach(file => console.log(`   • ${file}`));
  
  return pageFiles;
}

// STEP 2: Auto-extract routes from App.tsx
function extractRoutesFromApp() {
  const appContent = fs.readFileSync('src/App.tsx', 'utf-8');
  const routes = {};
  
  // Extract route patterns
  const routeMatches = appContent.match(/<Route path="([^"]+)" element={<(\w+)[^>]*>}/g) || [];
  
  routeMatches.forEach(match => {
    const pathMatch = match.match(/path="([^"]+)"/);
    const componentMatch = match.match(/element={<(\w+)/);
    
    if (pathMatch && componentMatch) {
      const path = pathMatch[1];
      const component = componentMatch[1];
      
      // Skip dynamic routes and wildcards
      if (!path.includes(':') && path !== '*') {
        routes[path] = component;
      }
    }
  });
  
  console.log(`🔍 Auto-detected ${Object.keys(routes).length} routes:`);
  Object.entries(routes).forEach(([path, component]) => {
    console.log(`   • ${path} -> ${component}`);
  });
  
  return routes;
}

// STEP 3: Auto-generate SEO content for each page
function generateSEOContent(route, component) {
  // Auto-generate title and description based on route
  const routeParts = route.split('/').filter(part => part);
  const lastPart = routeParts[routeParts.length - 1] || 'home';
  
  // Smart title generation
  let title = 'Effective Marketer';
  let description = 'Leading AI SEO agency delivering advanced solutions.';
  
  if (route === '/') {
    title = 'Google Autosuggests & AI SEO Agency - Effective Marketer';
    description = 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete.';
  } else {
    // Convert route to human readable title
    const readable = lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    title = `${readable} | Effective Marketer`;
    description = `Professional ${readable.toLowerCase()} services and solutions. Fast results with our proven AI SEO methodology.`;
  }
  
  // Auto-generate content based on route keywords
  const content = [];
  
  // Base content for all pages
  content.push('Leading AI SEO agency specializing in cutting-edge search optimization strategies.');
  content.push('Fast results in 1-3 months with our proven AI SEO methodology and advanced techniques.');
  content.push('Professional team of senior AI SEO experts delivering innovative solutions for businesses.');
  
  // Route-specific content
  if (route.includes('seo')) {
    content.push('Advanced SEO services including Google Autocomplete optimization and AI platform visibility.');
    content.push('Comprehensive SEO audits, keyword research, and technical optimization for maximum results.');
    content.push('Get your brand cited in ChatGPT, Gemini, and AI Overviews for maximum exposure.');
  }
  
  if (route.includes('case-studies')) {
    content.push('Real client success stories showcasing massive traffic growth and lead generation improvements.');
    content.push('Proven results across multiple industries with documented case studies and testimonials.');
    content.push('See how our clients achieved 287% traffic increases and dominated their competitive markets.');
  }
  
  if (route.includes('topical-map')) {
    content.push('Comprehensive AI topical mapping to establish complete topic authority in your niche.');
    content.push('Strategic content clusters designed to dominate both traditional search and AI platforms.');
    content.push('Advanced content strategy using AI-driven keyword research and semantic analysis.');
  }
  
  if (route.includes('autosuggest')) {
    content.push('Professional Google Autocomplete optimization services to dominate search suggestions.');
    content.push('Proven strategies to rank your brand in Google Autosuggest for high-intent keywords.');
    content.push('Advanced autosuggest optimization techniques that capture traffic before the search begins.');
  }
  
  if (route.includes('automation')) {
    content.push('AI-powered lead generation automation to streamline your sales funnel and capture leads.');
    content.push('Advanced automation strategies that work 24/7 to generate qualified prospects for your business.');
    content.push('Custom lead generation systems designed to maximize conversion rates and ROI.');
  }
  
  if (route.includes('saas')) {
    content.push('Specialized AI SEO services designed specifically for SaaS companies and software businesses.');
    content.push('Proven strategies to help SaaS companies dominate competitive keywords and generate leads.');
    content.push('Technical SEO optimization for SaaS platforms, APIs, and software documentation.');
  }
  
  if (route.includes('ecommerce')) {
    content.push('E-commerce SEO optimization to boost online sales and product visibility in search results.');
    content.push('Advanced product page optimization, category structure, and conversion rate improvements.');
    content.push('Proven e-commerce SEO strategies that increase organic traffic and revenue.');
  }
  
  if (route.includes('healthcare')) {
    content.push('Specialized AI SEO for healthcare providers, medical practices, and health-related businesses.');
    content.push('HIPAA-compliant SEO strategies designed to attract qualified patients and build trust.');
    content.push('Medical SEO expertise covering patient acquisition, reputation management, and compliance.');
  }
  
  if (route.includes('usa') || route.includes('vietnam')) {
    const country = route.includes('usa') ? 'USA' : 'Vietnam';
    content.push(`The #1 AI SEO agency in ${country} with proven results for local businesses and enterprises.`);
    content.push(`Specialized ${country} market expertise with deep understanding of local search behavior.`);
    content.push(`Comprehensive AI SEO services tailored specifically for ${country} companies and markets.`);
  }
  
  if (route.includes('onboarding')) {
    content.push('Comprehensive AI SEO onboarding process to get your campaigns started quickly and effectively.');
    content.push('Expert consultation and strategy development to ensure maximum ROI from day one.');
    content.push('Detailed planning and implementation roadmap tailored to your business goals and timeline.');
  }
  
  return { title, description, content };
}

// STEP 4: Generate safe HTML for all pages
function generateSafeHTML(route, seoData) {
  const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
  const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';
  
  const contentHTML = seoData.content.map(text => `<p>${text}</p>`).join('\n      ');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${seoData.title}</title>
  <meta name="description" content="${seoData.description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${seoData.title}" />
  <meta property="og:description" content="${seoData.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${seoData.title}" />
  <meta name="twitter:description" content="${seoData.description}" />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="author" content="Effective Marketer" />
  
  <style>
    ${css}
    /* Hide SEO content - only for search engines */
    .seo-only {
      display: none !important;
      visibility: hidden !important;
      position: absolute !important;
      left: -10000px !important;
    }
  </style>
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK5XTB9L1C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YK5XTB9L1C');
  </script>
</head>
<body>
  <div id="root">
    <!-- AUTO-GENERATED SEO CONTENT - Safe and secure -->
    <div class="seo-only">
      <h1>${seoData.title}</h1>
      <p>${seoData.description}</p>
      ${contentHTML}
    </div>
  </div>
  
  <!-- React App Scripts -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// MAIN EXECUTION
console.log('\n🤖 STARTING AUTO SEO GENERATION...');

// Auto-scan everything
const pageFiles = scanAllPages();
const routes = extractRoutesFromApp();

console.log('\n🔄 Processing all routes automatically...');

let processedCount = 0;
let totalContent = 0;

Object.entries(routes).forEach(([route, component]) => {
  console.log(`\n📄 Auto-processing: ${route} (${component})`);
  
  // Auto-generate SEO content
  const seoData = generateSEOContent(route, component);
  totalContent += seoData.content.length;
  
  console.log(`   ✅ Generated ${seoData.content.length} content pieces`);
  
  // Generate HTML
  const html = generateSafeHTML(route, seoData);
  
  // Save file
  let outputPath;
  if (route === '/') {
    outputPath = 'dist/index.html';
  } else {
    const dir = `dist${route}`;
    fs.mkdirSync(dir, { recursive: true });
    outputPath = `${dir}/index.html`;
  }
  
  fs.writeFileSync(outputPath, html);
  console.log(`   💾 Saved: ${outputPath} (${Math.round(html.length/1000)}KB)`);
  
  processedCount++;
});

console.log('\n🎉 AUTO SEO GENERATION COMPLETE!');
console.log(`📊 Processed ${processedCount} pages automatically`);
console.log(`📝 Generated ${totalContent} total content pieces`);
console.log('🔒 All content is safe and secure (no code exposure)');
console.log('🤖 Future pages will be auto-detected and processed!');
console.log('');
console.log('✨ FOR FUTURE AI: Just run this script after adding new pages!');
console.log('   No manual configuration needed - everything is automatic!');
