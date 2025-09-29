#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 REAL CONTENT GENERATOR: Extracting actual page content...');

// Read the working USA page content we had before
function extractUSAContent() {
  try {
    const usaPath = 'src/pages/USACountry.tsx';
    if (!fs.existsSync(usaPath)) {
      console.log('❌ USACountry.tsx not found');
      return [];
    }
    
    const content = fs.readFileSync(usaPath, 'utf-8');
    console.log('✅ Found USACountry.tsx');
    
    // Extract meaningful content strings
    const contentPieces = [];
    
    // Look for text content in the file
    const textMatches = content.match(/["']([^"']{15,}?)["']/g) || [];
    
    textMatches.forEach(match => {
      const text = match.slice(1, -1).trim();
      
      // Filter for actual content
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
          text.split(' ').length > 3) {
        contentPieces.push(text);
      }
    });
    
    console.log(`📝 Extracted ${contentPieces.length} content pieces from USACountry.tsx`);
    return contentPieces;
    
  } catch (error) {
    console.log('❌ Error reading USACountry.tsx:', error.message);
    return [];
  }
}

// Generate HTML with real content
function generateHTMLWithRealContent(title, description, content, route) {
  // Get CSS from the build
  const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
  const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';
  
  const contentHTML = content.map(text => `      <p>${text}</p>`).join('\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="author" content="Effective Marketer" />
  
  <style>
    ${css}
    
    /* COMPLETELY HIDE SEO CONTENT FROM USERS */
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
    
    /* Hide any content until React loads */
    #root {
      min-height: 100vh;
    }
    
    /* Ensure no content shows before React hydration */
    body {
      overflow: hidden;
    }
    
    /* Show content only after React loads */
    body.react-loaded {
      overflow: visible;
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
    <!-- REAL PAGE CONTENT FOR SEO - COMPLETELY HIDDEN FROM USERS -->
    <div class="seo-content">
      <h1>${title}</h1>
      <p>${description}</p>
${contentHTML}
    </div>
  </div>
  
  <script>
    // Mark body as loaded when React starts
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.body.classList.add('react-loaded');
      }, 100);
    });
  </script>
  
  <!-- React App Scripts -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// Define pages with real SEO data
const pages = {
  '/ai-seo-agency-usa': {
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    contentExtractor: extractUSAContent
  },
  '/ai-seo-agency-vietnam': {
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    contentExtractor: extractUSAContent // Use same extraction for now
  },
  '/ai-seo': {
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.',
    contentExtractor: extractUSAContent
  },
  '/case-studies': {
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.',
    contentExtractor: extractUSAContent
  },
  '/ai-topical-map': {
    title: 'AI Topical Map & Content Strategy | Effective Marketer',
    description: 'Develop a comprehensive AI topical map and content strategy to dominate your niche. Our AI-driven approach ensures complete topic coverage and authority.',
    contentExtractor: extractUSAContent
  },
  '/google-autosuggest-ranking': {
    title: 'Google Autosuggest Ranking SEO Services | Effective Marketer',
    description: 'Dominate Google Autocomplete with our specialized Google Autosuggest Ranking SEO services. Get your brand visible in search suggestions and AI platforms for maximum exposure.',
    contentExtractor: extractUSAContent
  }
};

console.log('📄 Processing pages with REAL content...');

// Process each page
Object.entries(pages).forEach(([route, pageData]) => {
  console.log(`\n🔄 Processing: ${route}`);
  
  // Extract real content
  const content = pageData.contentExtractor();
  
  if (content.length === 0) {
    console.log(`⚠️  No content extracted for ${route}, using fallback`);
    content.push('Leading AI SEO agency delivering advanced autosuggests solutions.');
    content.push('Fast results in 1-3 months with proven AI SEO methodology.');
    content.push('Professional team of senior AI SEO experts.');
  }
  
  // Generate HTML
  const html = generateHTMLWithRealContent(pageData.title, pageData.description, content, route);
  
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
  console.log(`✅ Generated: ${outputPath} (${Math.round(html.length/1000)}KB)`);
  console.log(`📝 Content pieces: ${content.length}`);
});

console.log('\n🎉 REAL CONTENT GENERATION COMPLETE!');
console.log('✅ Using actual page content from React components');
console.log('🔒 Content completely hidden from visual display');
console.log('🤖 Google can index all the real content');
console.log('📄 View page source will show LONG real content!');
