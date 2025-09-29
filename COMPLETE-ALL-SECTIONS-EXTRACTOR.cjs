#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎯 COMPLETE ALL SECTIONS EXTRACTOR');
console.log('📄 Extracting ALL content including Team, FAQ, Brand sections + Homepage');

// Get CSS
function getCSS() {
  try {
    const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      const css = fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8');
      console.log(`✅ Found CSS: ${cssFiles[0]} (${Math.round(css.length/1000)}KB)`);
      return css;
    }
  } catch (error) {
    console.log('⚠️ No CSS found');
  }
  return '';
}

// Extract content from any React file
function extractAllContent(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let allContent = [];
  
  // 🔒 ROBUST CONTENT EXTRACTION - PROTECTED FROM FUTURE EDITS
  // This approach extracts ALL valid content while avoiding JSX fragments
  
  // Method 1: SAFE JSX text extraction - BULLETPROOF FILTERING
  const jsxMatches = content.match(/>([^<>{}]+)</g) || [];
  jsxMatches.forEach(match => {
    const text = match.substring(1).trim();
    
    // 🔒 BULLETPROOF FILTERING - prevent ALL JSX fragments
    if (text.length > 5 && 
        text.length < 300 && 
        // Block ALL JSX/HTML patterns
        !text.includes('{') && 
        !text.includes('}') &&
        !text.includes('<') &&
        !text.includes('>') &&
        !text.includes('=') &&
        !text.includes('href') &&
        !text.includes('onClick') &&
        !text.includes('className') &&
        !text.includes('target') &&
        !text.includes('rel') &&
        !text.includes('src') &&
        !text.includes('import') &&
        !text.includes('export') &&
        !text.includes('function') &&
        !text.includes('const') &&
        !text.includes('(') &&
        !text.includes(')') &&
        !text.includes('[') &&
        !text.includes(']') &&
        !text.includes(';') &&
        !text.includes(':') &&
        !text.includes('/') &&
        !text.includes('\\') &&
        !text.includes('|') &&
        !text.includes('&') &&
        !text.includes('%') &&
        !text.includes('#') &&
        !text.includes('@') &&
        !text.includes('*') &&
        !text.includes('+') &&
        !text.includes('~') &&
        !text.includes('`') &&
        // Must be real readable text
        text.includes(' ') && // Contains spaces
        text.split(' ').length >= 3 && // At least 3 words
        /^[A-Z]/.test(text) && // Starts with capital
        /[a-z]/.test(text) && // Contains lowercase
        !/^\d/.test(text) && // Doesn't start with number
        !text.match(/^[A-Z]+$/) && // Not all caps
        !text.match(/^\w+$/) && // Not single word
        !text.match(/^\w+:$/) && // Not object key
        text.length > 15) { // Minimum meaningful length
      
      if (text.length < 80) {
        allContent.push(`<h3>${text}</h3>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });

  // Method 2: String literals with balanced filtering
  const stringMatches = content.match(/["']([^"']{10,}?)["']/g) || [];
  stringMatches.forEach(match => {
    const text = match.slice(1, -1).trim();
    
    if (text && 
        !text.includes('className') &&
        !text.includes('import') &&
        !text.includes('export') &&
        !text.includes('function') &&
        !text.includes('const') &&
        !text.includes('React') &&
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
        // Less strict about symbols - allow more content
        text.split(' ').length > 2) { // Reduced from 3 to 2
      
      if (text.length < 80) {
        allContent.push(`<h3>${text}</h3>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });
  
  // Method 3: SAFE array extraction - ONLY clean quoted strings
  const patterns = [
    /features = \[(.*?)\]/s,
    /stats = \[(.*?)\]/s,
    /faqs = \[(.*?)\]/s,
    /teamMembers = \[(.*?)\]/s
  ];
  
  patterns.forEach(pattern => {
    const match = content.match(pattern);
    if (match) {
      const arrayContent = match[1];
      
      // ONLY extract safe quoted content - NO JSX elements
      const titleMatches = arrayContent.match(/title:\s*["']([^"'<>{}=]+)["']/g) || [];
      const descMatches = arrayContent.match(/description:\s*["']([^"'<>{}=]+)["']/g) || [];
      const questionMatches = arrayContent.match(/question:\s*["']([^"'<>{}=]+)["']/g) || [];
      const answerMatches = arrayContent.match(/answer:\s*["']([^"'<>{}=]+)["']/g) || [];
      
      titleMatches.forEach(match => {
        const title = match.replace(/title:\s*["']/, '').replace(/["']$/, '').trim();
        // Extra safety check
        if (title && title.length > 3 && !title.includes('<') && !title.includes('>') && !title.includes('{') && !title.includes('}')) {
          allContent.push(`<h3>${title}</h3>`);
        }
      });
      
      descMatches.forEach(match => {
        const desc = match.replace(/description:\s*["']/, '').replace(/["']$/, '').trim();
        // Extra safety check
        if (desc && desc.length > 10 && !desc.includes('<') && !desc.includes('>') && !desc.includes('{') && !desc.includes('}')) {
          allContent.push(`<p>${desc}</p>`);
        }
      });
      
      questionMatches.forEach(match => {
        const question = match.replace(/question:\s*["']/, '').replace(/["']$/, '').trim();
        // Extra safety check
        if (question && question.length > 5 && !question.includes('<') && !question.includes('>') && !question.includes('{') && !question.includes('}')) {
          allContent.push(`<h4>${question}</h4>`);
        }
      });
      
      answerMatches.forEach(match => {
        const answer = match.replace(/answer:\s*["']/, '').replace(/["']$/, '').trim();
        // Extra safety check
        if (answer && answer.length > 10 && !answer.includes('<') && !answer.includes('>') && !answer.includes('{') && !answer.includes('}')) {
          allContent.push(`<p>${answer}</p>`);
        }
      });
    }
  });
  
  // 🔒 PROTECTION: Validate content before returning
  const uniqueContent = [...new Set(allContent)];
  
  // ⚠️ CRITICAL CHECK: Ensure we have substantial content
  if (uniqueContent.length < 20) {
    console.warn(`⚠️ WARNING: ${filePath} only has ${uniqueContent.length} content pieces - this seems low!`);
  }
  
  // ⚠️ CRITICAL CHECK: Ensure no broken JSX fragments
  const brokenElements = uniqueContent.filter(item => 
    item.includes('href=') || 
    item.includes('<a ') || 
    item.includes('onClick') ||
    item.includes('target=') ||
    item.includes('}>') ||
    item.includes('<{')
  );
  
  if (brokenElements.length > 0) {
    console.error(`❌ ERROR: Found ${brokenElements.length} broken JSX fragments in ${filePath}:`);
    brokenElements.forEach(item => console.error(`   ${item.substring(0, 50)}...`));
  }
  
  console.log(`📄 ${filePath}: Found ${uniqueContent.length} content pieces (${brokenElements.length} broken)`);
  
  // 🔧 POST-PROCESSING: Clean up any remaining broken fragments
  const cleanedContent = uniqueContent.filter(item => 
    !item.includes('href=') && 
    !item.includes('<a ') && 
    !item.includes('onClick') &&
    !item.includes('target=') &&
    !item.includes('}>') &&
    !item.includes('<{') &&
    !item.includes('icon:') &&
    !item.includes('description:') &&
    !item.includes('},') &&
    !item.includes('{') &&
    !item.includes('}') &&
    item.length > 5 &&
    item.trim().length > 0
  );
  
  console.log(`🔧 ${filePath}: Cleaned ${uniqueContent.length} → ${cleanedContent.length} pieces`);
  return cleanedContent;
}

// Extract content from multiple component files for homepage
function extractHomepageContent() {
  console.log('🏠 Extracting HOMEPAGE content from multiple components...');
  
  const homepageComponents = [
    'src/components/Hero.tsx',
    'src/components/Future.tsx', 
    'src/components/Team.tsx',
    'src/components/Dashboard.tsx',
    'src/components/Roadmap.tsx',
    'src/components/GetStarted.tsx',
    'src/components/Contact.tsx',
    'src/components/FinalCTA.tsx',
    'src/components/CaseStudyLogos.tsx',
    'src/components/WhyChooseUs.tsx'
  ];
  
  let allHomepageContent = [];
  
  homepageComponents.forEach(componentPath => {
    console.log(`🔍 Extracting from: ${componentPath}`);
    const content = extractAllContent(componentPath);
    allHomepageContent = allHomepageContent.concat(content);
    console.log(`✅ Added ${content.length} pieces from ${componentPath}`);
  });
  
  console.log(`✅ Total homepage content: ${allHomepageContent.length} pieces`);
  return [...new Set(allHomepageContent)];
}

// Extract additional component content for country pages  
function extractAdditionalSections(mainContent) {
  console.log('🔍 Extracting additional sections (Team, FAQ, etc.)...');
  
  const additionalComponents = [
    'src/components/Team.tsx',
    'src/components/FAQ.tsx',
    'src/components/CaseStudyLogos.tsx'
  ];
  
  let additionalContent = [];
  
  additionalComponents.forEach(componentPath => {
    const content = extractAllContent(componentPath);
    additionalContent = additionalContent.concat(content);
    console.log(`✅ Added ${content.length} pieces from ${componentPath}`);
  });
  
  return [...new Set(mainContent.concat(additionalContent))];
}

// Generate complete HTML
function generateCompleteHTML(route, pageData, allContent) {
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

  <title>${pageData.title}</title>
  <meta name="description" content="${pageData.description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${pageData.title}" />
  <meta property="og:description" content="${pageData.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com${route}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta property="og:site_name" content="Effective Marketer" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageData.title}" />
  <meta name="twitter:description" content="${pageData.description}" />
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
    
    /* COMPLETE HIDING */
    .complete-seo-content {
      display: none !important;
      visibility: hidden !important;
      position: absolute !important;
      left: -10000px !important;
      top: -10000px !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      z-index: -999999 !important;
    }
    
    /* LOADING SCREEN - BRAND COLORS */
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    }
    
    .loading-content {
      text-align: center;
      color: white;
    }
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255,255,255,0.1);
      border-top: 4px solid #ef4444;
      border-right: 4px solid #dc2626;
      border-radius: 50%;
      animation: spin 1.2s linear infinite;
      margin: 0 auto 24px;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }
    
    .loading-text {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      background: linear-gradient(45deg, #ffffff, #ef4444);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .loading-subtitle {
      font-size: 14px;
      opacity: 0.7;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Hide loading when React loads */
    body.react-loaded .loading-screen {
      opacity: 0;
      pointer-events: none;
    }
    
    /* Hide root until React loads */
    #root {
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }
    
    body.react-loaded #root {
      opacity: 1;
    }
  </style>
</head>
<body>
  <!-- LOADING SCREEN - NO FLASH -->
  <div class="loading-screen">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading Effective Marketer</div>
      <div class="loading-subtitle">AI SEO Agency</div>
    </div>
  </div>
  
  <div id="root">
    <!-- COMPLETE CONTENT INCLUDING ALL SECTIONS -->
    <div class="complete-seo-content">
      <h1>${pageData.title}</h1>
      <p>${pageData.description}</p>
      
      ${allContent.join('\n      ')}
    </div>
  </div>
  
  <script>
    // Hide loading and show content when React loads
    document.addEventListener('DOMContentLoaded', function() {
      // Wait for React to mount
      setTimeout(() => {
        document.body.classList.add('react-loaded');
      }, 500);
    });
  </script>
  </body>
</html>`;
}

// ALL PAGES INCLUDING HOMEPAGE - COMPLETE LIST
const allPages = {
  '/': {
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
    isHomepage: true
  },
  '/onboarding': {
    file: 'src/pages/Onboarding.tsx',
    title: 'AI SEO Onboarding & Consultation | Effective Marketer',
    description: 'Get started with AI SEO through our comprehensive onboarding and consultation services. Develop a custom AI SEO strategy tailored to your business goals.'
  },
  '/google-autosuggest-ranking': {
    file: 'src/pages/GoogleAutosuggestRanking.tsx',
    title: 'Google Autosuggest Ranking SEO Services | Effective Marketer',
    description: 'Dominate Google Autocomplete with our specialized Google Autosuggest Ranking SEO services. Get your brand visible in search suggestions and AI platforms for maximum exposure.'
  },
  '/lead-gen-ai-automation': {
    file: 'src/pages/AIAutomation.tsx',
    title: 'AI Lead Generation & Automation | Effective Marketer',
    description: 'Automate your lead generation with AI-powered solutions. Streamline your sales funnel and capture high-quality leads with our advanced AI automation strategies.'
  },
  '/ai-seo': {
    file: 'src/pages/AISEO.tsx',
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.'
  },
  '/ai-topical-map': {
    file: 'src/pages/AITopicalMap.tsx',
    title: 'AI Topical Map & Content Strategy | Effective Marketer',
    description: 'Develop a comprehensive AI topical map and content strategy to dominate your niche. Our AI-driven approach ensures complete topic coverage and authority.'
  },
  '/case-studies': {
    file: 'src/pages/CaseStudies.tsx',
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.'
  },
  '/ai-seo-for-saas-companies': {
    file: 'src/pages/SaaSCompanies.tsx',
    title: 'AI SEO for SaaS Companies | Effective Marketer',
    description: 'Specialized AI SEO services for SaaS companies. Dominate search results with our AI-powered SEO strategies designed specifically for software-as-a-service businesses.'
  },
  '/ai-seo-for-ecommerce': {
    file: 'src/pages/EcommerceCompanies.tsx',
    title: 'AI SEO for E-commerce | Effective Marketer',
    description: 'Boost your e-commerce sales with AI SEO. Optimize product listings, dominate Google Autocomplete, and get recommended by AI platforms for online shoppers.'
  },
  '/ai-seo-for-healthcare': {
    file: 'src/pages/HealthcareCompanies.tsx',
    title: 'AI SEO for Healthcare & Medical | Effective Marketer',
    description: 'Specialized AI SEO for healthcare providers and medical practices. Improve patient acquisition, dominate Google Autocomplete, and get cited by AI for health-related searches.'
  },
  '/ai-seo-agency-usa': {
    file: 'src/pages/USACountry.tsx',
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    needsAdditionalSections: true
  },
  '/ai-seo-agency-vietnam': {
    file: 'src/pages/VietnamCountry.tsx',
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    needsAdditionalSections: true
  }
};

console.log(`🚀 Processing ${Object.keys(allPages).length} pages (including homepage)...`);

let totalGenerated = 0;
let totalContentPieces = 0;

// Process all pages
Object.entries(allPages).forEach(([route, pageData]) => {
  console.log(`\n🔥 Processing: ${route}`);
  
  let allContent = [];
  
  if (pageData.isHomepage) {
    // Special handling for homepage
    allContent = extractHomepageContent();
  } else {
    // Extract from main page file
    allContent = extractAllContent(pageData.file);
    
    // Add additional sections if needed
    if (pageData.needsAdditionalSections) {
      allContent = extractAdditionalSections(allContent);
    }
  }
  
  console.log(`✅ Total content: ${allContent.length} pieces`);
  totalContentPieces += allContent.length;
  
  // Generate HTML
  const html = generateCompleteHTML(route, pageData, allContent);
  
  // Save file
  let outputPath;
  if (route === '/') {
    outputPath = 'dist/index.html';
  } else {
    const routePath = route.substring(1);
    const dir = `dist/${routePath}`;
    fs.mkdirSync(dir, { recursive: true });
    outputPath = `${dir}/index.html`;
  }
  
  try {
    fs.writeFileSync(outputPath, html);
    console.log(`✅ Generated: ${outputPath} (${Math.round(html.length/1000)}KB)`);
    totalGenerated++;
  } catch (error) {
    console.log(`❌ Error saving ${route}:`, error.message);
  }
});

console.log(`\n🎉 COMPLETE EXTRACTION FINISHED!`);
console.log(`✅ Generated: ${totalGenerated}/${Object.keys(allPages).length} pages`);
console.log(`📝 Total content pieces: ${totalContentPieces}`);
console.log(`🏠 Homepage (/) now has content!`);
console.log(`📋 All sections included: Team, FAQ, Brand, etc.`);
console.log(`🔒 All content hidden from visual display`);
console.log(`🚀 Google sees COMPLETE content for all pages!`);
