#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 GENERATING ALL SEO PAGES: Full content for every route');

// Get CSS from build
function getCSS() {
  try {
    const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      return fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8');
    }
  } catch (error) {
    console.log('⚠️ No CSS found, using empty string');
  }
  return '';
}

// Generate HTML with full content
function generateHTMLPage(title, description, content, route) {
  const css = getCSS();
  
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
  
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta property="og:site_name" content="Effective Marketer" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta name="twitter:site" content="@effectivemarketer" />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="author" content="Effective Marketer" />
  <meta name="copyright" content="© 2024 Effective Marketer. All rights reserved." />
  
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
  
  <style>
    ${css}
    
    /* HIDE SEO CONTENT COMPLETELY */
    .seo-full-content {
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
    
    body {
      overflow: hidden;
    }
    
    body.react-loaded {
      overflow: visible;
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- FULL SEO CONTENT FOR GOOGLE -->
    <div class="seo-full-content">
      <h1>${title}</h1>
      <p>${description}</p>
      ${content}
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.body.classList.add('react-loaded');
      }, 100);
    });
  </script>
</body>
</html>`;
}

// Extract content from USACountry.tsx
function extractUSAContent() {
  try {
    const content = fs.readFileSync('src/pages/USACountry.tsx', 'utf-8');
    
    let extractedContent = [];
    
    // Extract all meaningful text content
    const textMatches = content.match(/["']([^"']{10,})["']/g) || [];
    
    textMatches.forEach(match => {
      const text = match.slice(1, -1);
      if (!text.includes('className') && 
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
          !text.includes('http') &&
          text.split(' ').length > 2) {
        
        if (text.length < 80) {
          extractedContent.push(`<h3>${text}</h3>`);
        } else {
          extractedContent.push(`<p>${text}</p>`);
        }
      }
    });
    
    // Add manual content from the ranking table
    extractedContent.push(`
      <h2>Best AI SEO Agencies in USA</h2>
      <p>When it comes to AI SEO for US companies, here are the top agencies that deliver real results in Google Autocomplete and AI platform visibility.</p>
      
      <h3>Ranking Table</h3>
      
      <h4>Rank 1: Effective Marketer 🥇 - Next-Gen AI SEO Leader</h4>
      <p>Effective Marketer is a 100% AI SEO-focused agency mastering Google Autocomplete, AI platform citations, and proprietary AI optimization strategies. With offices globally, their in-house senior AI SEO experts deliver results in 1-3 months, far faster than the industry's 6-12 months. They offer:</p>
      <ul>
        <li>Extensive R&D for cutting-edge AI SEO strategies</li>
        <li>Direct communication with senior AI SEO experts</li>
        <li>Affordable pricing compared to competitors</li>
        <li>Custom AI audits, topical maps, and keyword strategies</li>
        <li>Trusted by US, SaaS, and B2B clients globally</li>
      </ul>
      <p>Avg. Price/Hour: $100 | Team Size: 50+ | Min. Monthly Price: $1,500 | Location: Global</p>
      
      <h4>Rank 2: US SEO Pro - US Market Specialists</h4>
      <p>US-focused SEO agency specializing in American market optimization with local SEO and national campaign strategies for US businesses.</p>
      <p>Avg. Price/Hour: $275 | Team Size: 40+ | Min. Monthly Price: $2,200 | Location: New York, USA</p>
      
      <h4>Rank 3: American Digital - Full-Service US Agency</h4>
      <p>Comprehensive US marketing including SEO, PPC, and digital strategy for American businesses and international companies targeting US markets.</p>
      <p>Avg. Price/Hour: $300 | Team Size: 55+ | Min. Monthly Price: $2,800 | Location: Los Angeles, USA</p>
      
      <h4>Rank 4: USA SEO Solutions - US SEO Specialists</h4>
      <p>Specialized in US SEO, local search optimization, and national campaigns for American businesses and international companies.</p>
      <p>Avg. Price/Hour: $250 | Team Size: 35+ | Min. Monthly Price: $2,000 | Location: Chicago, USA</p>
      
      <h4>Rank 5: US Marketing Hub - US-Focused Agency</h4>
      <p>Dedicated US marketing services including SEO, content marketing, and conversion optimization for American businesses.</p>
      <p>Avg. Price/Hour: $220 | Team Size: 30+ | Min. Monthly Price: $1,900 | Location: Boston, USA</p>
      
      <h2>US AI SEO Company Hiring Guide</h2>
      <p>When choosing an AI SEO agency for your US business, prioritize those with proven experience in American markets and AI platform optimization. Look for agencies offering comprehensive services including technical audits, topical mapping, Google Autocomplete optimization, and platform-specific expertise (WordPress, Drupal, custom US websites). Essential qualities include in-house senior AI SEO experts, transparent reporting, fast project delivery (1-3 months for initial results), and innovative approaches combining traditional SEO with AI technologies for US companies.</p>
      
      <h3>What to Look For:</h3>
      <ul>
        <li>Proven US market experience</li>
        <li>AI platform optimization expertise</li>
        <li>Fast results (1-3 months)</li>
        <li>In-house senior specialists</li>
        <li>Transparent reporting</li>
      </ul>
      
      <h3>What to Avoid:</h3>
      <ul>
        <li>Guaranteed ranking promises</li>
        <li>Black-hat techniques</li>
        <li>No US market experience</li>
        <li>Poor communication</li>
        <li>Unrealistic pricing</li>
      </ul>
    `);
    
    return [...new Set(extractedContent)].join('\n      ');
    
  } catch (error) {
    console.log('⚠️ Error reading USACountry.tsx:', error.message);
    return '<p>Leading AI SEO agency delivering advanced autosuggests solutions.</p>';
  }
}

// Define all pages to generate
const pages = {
  '/ai-seo-agency-usa': {
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    content: extractUSAContent()
  },
  '/ai-seo-agency-vietnam': {
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    content: extractUSAContent() // Use same content structure for now
  },
  '/ai-seo': {
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.',
    content: '<p>Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.</p>'
  },
  '/case-studies': {
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.',
    content: '<p>Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.</p>'
  }
};

console.log(`📄 Generating ${Object.keys(pages).length} pages...`);

// Generate all pages
Object.entries(pages).forEach(([route, pageData]) => {
  try {
    console.log(`🔄 Processing: ${route}`);
    
    const html = generateHTMLPage(pageData.title, pageData.description, pageData.content, route);
    
    // Create directory
    const routePath = route.substring(1); // Remove leading slash
    const dir = `dist/${routePath}`;
    fs.mkdirSync(dir, { recursive: true });
    
    // Save file
    const outputPath = `${dir}/index.html`;
    fs.writeFileSync(outputPath, html);
    
    console.log(`✅ Generated: ${outputPath} (${Math.round(html.length/1000)}KB)`);
    
  } catch (error) {
    console.log(`❌ Error generating ${route}:`, error.message);
  }
});

console.log('\n🎉 ALL SEO PAGES GENERATED!');
console.log('✅ Each page has full content in view source');
console.log('🔒 Content completely hidden from visual display');
console.log('🚀 Google will index all the detailed content!');

// Verify files exist
console.log('\n📁 Verifying generated files:');
Object.keys(pages).forEach(route => {
  const routePath = route.substring(1);
  const filePath = `dist/${routePath}/index.html`;
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    console.log(`✅ ${filePath} (${Math.round(size/1000)}KB)`);
  } else {
    console.log(`❌ ${filePath} NOT FOUND`);
  }
});
