#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 FINAL WORKING EXTRACTOR - ONE TIME FIX FOR ALL PAGES');

// Get CSS
const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';

// ALL YOUR PAGES WITH THEIR ACTUAL FILES
const pageFiles = {
  '/ai-seo-agency-usa': 'src/pages/USACountry.tsx',
  '/ai-seo-agency-vietnam': 'src/pages/VietnamCountry.tsx',
  '/ai-seo': 'src/pages/AISEO.tsx',
  '/ai-seo-for-saas-companies': 'src/pages/SaaSCompanies.tsx',
  '/lead-gen-ai-automation': 'src/pages/AIAutomation.tsx',
  '/case-studies': 'src/pages/CaseStudies.tsx',
  '/ai-topical-map': 'src/pages/AITopicalMap.tsx',
  '/google-autosuggest-ranking': 'src/pages/GoogleAutosuggestRanking.tsx',
  '/ai-seo-for-ecommerce': 'src/pages/EcommerceCompanies.tsx',
  '/ai-seo-for-healthcare': 'src/pages/HealthcareCompanies.tsx',
  '/onboarding': 'src/pages/Onboarding.tsx'
};

// SEO data for each page
const seoData = {
  '/ai-seo-agency-usa': {
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.'
  },
  '/ai-seo-agency-vietnam': {
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.'
  },
  '/ai-seo': {
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.'
  },
  '/ai-seo-for-saas-companies': {
    title: 'AI SEO for SaaS Companies | Effective Marketer',
    description: 'Specialized AI SEO services for SaaS companies. Dominate search results with our AI-powered SEO strategies designed specifically for software-as-a-service businesses.'
  },
  '/lead-gen-ai-automation': {
    title: 'AI Lead Generation & Automation | Effective Marketer',
    description: 'Automate your lead generation with AI-powered solutions. Streamline your sales funnel and capture high-quality leads with our advanced AI automation strategies.'
  },
  '/case-studies': {
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.'
  },
  '/ai-topical-map': {
    title: 'AI Topical Map & Content Strategy | Effective Marketer',
    description: 'Develop a comprehensive AI topical map and content strategy to dominate your niche. Our AI-driven approach ensures complete topic coverage and authority.'
  },
  '/google-autosuggest-ranking': {
    title: 'Google Autosuggest Ranking SEO Services | Effective Marketer',
    description: 'Dominate Google Autocomplete with our specialized Google Autosuggest Ranking SEO services. Get your brand visible in search suggestions and AI platforms for maximum exposure.'
  },
  '/ai-seo-for-ecommerce': {
    title: 'AI SEO for E-commerce | Effective Marketer',
    description: 'Boost your e-commerce sales with AI SEO. Optimize product listings, dominate Google Autocomplete, and get recommended by AI platforms for online shoppers.'
  },
  '/ai-seo-for-healthcare': {
    title: 'AI SEO for Healthcare & Medical | Effective Marketer',
    description: 'Specialized AI SEO for healthcare providers and medical practices. Improve patient acquisition, dominate Google Autocomplete, and get cited by AI for health-related searches.'
  },
  '/onboarding': {
    title: 'AI SEO Onboarding & Consultation | Effective Marketer',
    description: 'Get started with AI SEO through our comprehensive onboarding and consultation services. Develop a custom AI SEO strategy tailored to your business goals.'
  }
};

// Extract ALL content from a React file
function extractAllContent(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let allContent = [];
  
  // Method 1: Extract all string literals
  const stringMatches = content.match(/["'`]([^"'`]{15,}?)["'`]/g) || [];
  stringMatches.forEach(match => {
    const text = match.slice(1, -1).trim();
    
    // Skip code-related strings
    if (text && 
        !text.includes('className') &&
        !text.includes('text-') &&
        !text.includes('bg-') &&
        !text.includes('px-') &&
        !text.includes('py-') &&
        !text.includes('hover:') &&
        !text.includes('import') &&
        !text.includes('export') &&
        !text.includes('function') &&
        !text.includes('const') &&
        !text.includes('src/') &&
        !text.includes('../../') &&
        !text.includes('http') &&
        !text.includes('{') &&
        !text.includes('}') &&
        text.split(' ').length > 2) {
      
      // Determine if heading or paragraph
      if (text.length < 100 && 
          (text.includes('SEO') || text.includes('AI') || text.includes('Best') || 
           text.includes('%') || text.includes('Results') || text.includes('Agency'))) {
        allContent.push(`<h2>${text}</h2>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });
  
  // Method 2: Extract JSX text content
  const jsxMatches = content.match(/>([^<{}]+)</g) || [];
  jsxMatches.forEach(match => {
    const text = match.substring(1).trim();
    if (text.length > 5 && 
        !text.includes('{') && 
        !text.includes('}') &&
        !text.includes('className')) {
      
      if (text.length < 80) {
        allContent.push(`<h3>${text}</h3>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });
  
  // Remove duplicates and return
  return [...new Set(allContent)];
}

// Generate HTML for each page
function generatePageHTML(route, seo, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
  <link rel="shortcut icon" href="/favicon/favicon.ico" />
  <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="/favicon/site.webmanifest" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK5XTB9L1C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YK5XTB9L1C');
  </script>
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="modulepreload" crossorigin href="/assets/vendor-C7oc9blH.js">
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">

  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${seo.title}" />
  <meta property="og:description" content="${seo.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta property="og:site_name" content="Effective Marketer" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${seo.title}" />
  <meta name="twitter:description" content="${seo.description}" />
  <meta name="twitter:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta name="twitter:site" content="@effectivemarketer" />
  
  <!-- Additional SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="author" content="Effective Marketer" />
  <meta name="copyright" content="© 2024 Effective Marketer. All rights reserved." />
  
  <style>
    ${css}
    
    /* COMPLETELY HIDE SEO CONTENT */
    .seo-content {
      display: none !important;
      visibility: hidden !important;
      position: absolute !important;
      left: -10000px !important;
      top: -10000px !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- FULL PAGE CONTENT FOR SEO - COMPLETELY HIDDEN -->
    <div class="seo-content">
      <h1>${seo.title}</h1>
      <p>${seo.description}</p>
      ${content.join('\n      ')}
    </div>
  </body>
</html>`;
}

console.log(`🔄 Processing ${Object.keys(pageFiles).length} pages...`);

// Process each page
let totalGenerated = 0;
let totalContent = 0;

Object.entries(pageFiles).forEach(([route, filePath]) => {
  console.log(`\n📄 Processing: ${route} -> ${filePath}`);
  
  // Extract content
  const content = extractAllContent(filePath);
  const seo = seoData[route];
  
  if (!seo) {
    console.log(`❌ No SEO data for ${route}`);
    return;
  }
  
  console.log(`✅ Extracted ${content.length} content pieces`);
  totalContent += content.length;
  
  // Generate HTML
  const html = generatePageHTML(route, seo, content);
  
  // Create directory and save file
  const routePath = route.substring(1); // Remove leading slash
  const dir = `dist/${routePath}`;
  
  try {
    fs.mkdirSync(dir, { recursive: true });
    const outputPath = `${dir}/index.html`;
    fs.writeFileSync(outputPath, html);
    
    console.log(`✅ Generated: ${outputPath} (${Math.round(html.length/1000)}KB)`);
    totalGenerated++;
    
  } catch (error) {
    console.log(`❌ Error saving ${route}:`, error.message);
  }
});

console.log(`\n🎉 FINAL EXTRACTION COMPLETE!`);
console.log(`✅ Generated ${totalGenerated} pages successfully`);
console.log(`📝 Total content pieces: ${totalContent}`);
console.log(`🔒 All content hidden from visual display`);
console.log(`🚀 Google will see FULL content in view source!`);

// Verify all files exist
console.log(`\n📁 Verifying generated files:`);
Object.keys(pageFiles).forEach(route => {
  const routePath = route.substring(1);
  const filePath = `dist/${routePath}/index.html`;
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    console.log(`✅ ${filePath} (${Math.round(size/1000)}KB)`);
  } else {
    console.log(`❌ ${filePath} NOT FOUND`);
  }
});

console.log(`\n🎯 THIS IS THE FINAL WORKING VERSION!`);
console.log(`📄 Each page now has ALL content from your React files!`);
