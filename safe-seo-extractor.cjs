#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔒 SAFE SEO EXTRACTOR: Clean content only, no code exposure');

// SAFE content extraction - only meaningful text, no code
function extractSafeContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let safeContent = [];
    
    // Only extract content between quotes that looks like real text
    const textMatches = content.match(/["']([^"']{20,}?)["']/g) || [];
    
    textMatches.forEach(match => {
      const text = match.slice(1, -1).trim();
      
      // Filter for actual content, not code
      if (text && 
          !text.includes('className') &&
          !text.includes('import') &&
          !text.includes('export') &&
          !text.includes('function') &&
          !text.includes('const') &&
          !text.includes('React') &&
          !text.includes('tsx') &&
          !text.includes('jsx') &&
          !text.includes('http') &&
          !text.includes('src/') &&
          !text.includes('../../') &&
          !text.includes('px-') &&
          !text.includes('py-') &&
          !text.includes('bg-') &&
          !text.includes('text-') &&
          !text.includes('hover:') &&
          !text.includes('flex') &&
          !text.includes('grid') &&
          !text.includes('margin') &&
          !text.includes('padding') &&
          text.split(' ').length > 3 && // At least 4 words
          /[.!?]/.test(text) // Contains sentence ending
      ) {
        safeContent.push(text);
      }
    });
    
    return [...new Set(safeContent)]; // Remove duplicates
  } catch (error) {
    return [];
  }
}

// Predefined SAFE content for each page (no code exposure)
const safePageContent = {
  '/': {
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete.',
    content: [
      'We\'re the leading AI SEO agency specializing in Google Autocomplete optimization and AI platform visibility.',
      'Our cutting-edge strategies help businesses dominate search suggestions and get cited by ChatGPT, Gemini, and AI Overviews.',
      'Fast results in 1-3 months with our proven AI SEO methodology.',
      'Google Autocomplete optimization for high-intent keywords.',
      'AI platform citations and visibility across ChatGPT, Gemini, and AI search platforms.',
      'Advanced topical mapping and content strategy development.',
      'Competitive displacement in search results and AI recommendations.',
      'Lead generation automation using AI-powered solutions.',
      'Technical SEO audits and optimization for modern search algorithms.'
    ]
  },
  
  '/case-studies': {
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Real client success stories and proven AI SEO results. See how we helped companies achieve massive traffic growth.',
    content: [
      'Real client success stories showcasing massive traffic growth and lead generation improvements.',
      'Proven AI SEO results across multiple industries and business sizes.',
      'Case study: 287% traffic increase for SaaS company through Google Autocomplete optimization.',
      'Healthcare client achieved 156% more qualified leads through AI platform citations.',
      'E-commerce business saw 234% revenue growth with our AI SEO strategies.',
      'B2B software company dominated ChatGPT recommendations in their niche.',
      'Local business achieved #1 position in Google Autocomplete for competitive keywords.',
      'Enterprise client displaced competitors in AI search results and Gemini recommendations.'
    ]
  },
  
  '/ai-topical-map': {
    title: 'AI Topical Map & Content Strategy | Effective Marketer',
    description: 'Comprehensive AI topical mapping and content strategy to dominate your niche with AI-driven approach.',
    content: [
      'Comprehensive AI topical mapping to establish complete topic authority in your niche.',
      'Advanced content strategy using AI-driven keyword research and semantic analysis.',
      'Strategic content clusters designed to dominate both traditional search and AI platforms.',
      'Topical authority development for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
      'Content gap analysis to identify opportunities competitors are missing.',
      'AI-powered content optimization for Google Autocomplete and search suggestions.',
      'Semantic keyword mapping for comprehensive topic coverage.',
      'Content calendar development based on AI search trends and user intent patterns.'
    ]
  },
  
  '/google-autosuggest-ranking': {
    title: 'Google Autosuggest Ranking Services | Effective Marketer',
    description: 'Dominate Google Autocomplete suggestions with our proven autosuggest optimization strategies.',
    content: [
      'Professional Google Autocomplete optimization services to dominate search suggestions.',
      'Proven strategies to rank your brand in Google Autosuggest for high-intent keywords.',
      'Advanced autosuggest optimization techniques that capture traffic before the search begins.',
      'Strategic Google Autocomplete positioning for maximum brand visibility.',
      'Competitive autosuggest analysis and displacement strategies.',
      'Real-time monitoring and optimization of Google search suggestions.',
      'Custom autosuggest campaigns tailored to your industry and target audience.',
      'Fast results typically achieved within 45-75 days of campaign launch.'
    ]
  },
  
  '/ai-seo': {
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Advanced AI SEO services including ChatGPT citations, Gemini optimization, and AI platform visibility.',
    content: [
      'Cutting-edge AI SEO services designed for the future of search technology.',
      'ChatGPT citation optimization to get your brand recommended by AI assistants.',
      'Gemini optimization strategies for maximum visibility in Google\'s AI search features.',
      'AI Overviews optimization to appear in Google\'s AI-generated search summaries.',
      'Comprehensive AI platform visibility across Claude, Bing AI, and emerging AI tools.',
      'Generative Engine Optimization (GEO) for next-generation search technologies.',
      'AI-powered content optimization that ranks in both traditional and AI search.',
      'Future-proof SEO strategies designed for AI-first search experiences.'
    ]
  }
};

// Generate clean HTML with SAFE content only
function generateSafeHTML(route, pageData) {
  const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
  const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';
  
  const contentHTML = pageData.content.map(text => `<p>${text}</p>`).join('\n      ');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${pageData.title}</title>
  <meta name="description" content="${pageData.description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${pageData.title}" />
  <meta property="og:description" content="${pageData.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageData.title}" />
  <meta name="twitter:description" content="${pageData.description}" />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  
  <style>
    ${css}
    /* Hide SEO content completely - only for search engines */
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
    <!-- SAFE SEO CONTENT - No code exposure, only marketing text -->
    <div class="seo-only">
      <h1>${pageData.title}</h1>
      <p>${pageData.description}</p>
      ${contentHTML}
    </div>
  </div>
  
  <!-- React App Scripts -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// Process all pages with SAFE content
console.log('\n🔒 Processing pages with SAFE content (no code exposure)...');

// Get additional safe content from files where possible
Object.keys(safePageContent).forEach(route => {
  const pageData = safePageContent[route];
  
  // Try to extract additional safe content from files
  const fileMappings = {
    '/case-studies': 'src/pages/CaseStudies.tsx',
    '/ai-topical-map': 'src/pages/AITopicalMap.tsx',
    '/google-autosuggest-ranking': 'src/pages/GoogleAutosuggestRanking.tsx',
    '/ai-seo': 'src/pages/AISEO.tsx'
  };
  
  if (fileMappings[route] && fs.existsSync(fileMappings[route])) {
    const additionalContent = extractSafeContent(fileMappings[route]);
    pageData.content = [...pageData.content, ...additionalContent.slice(0, 10)]; // Add up to 10 more
  }
  
  console.log(`📄 ${route}: ${pageData.content.length} safe content pieces`);
  
  // Generate HTML
  const html = generateSafeHTML(route, pageData);
  
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
  console.log(`✅ Generated: ${outputPath} (${Math.round(html.length/1000)}KB) - SAFE CONTENT`);
});

console.log('\n🔒 SAFE SEO EXTRACTION COMPLETE!');
console.log('✅ No code exposure - only marketing content');
console.log('🔍 Google sees relevant text content');
console.log('🛡️ No security risks from code in view source');
console.log('🎯 Clean, professional SEO content only!');
