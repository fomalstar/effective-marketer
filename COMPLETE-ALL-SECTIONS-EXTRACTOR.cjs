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
  
  // Method 1: JSX text content
  const jsxMatches = content.match(/>([^<{}]+)</g) || [];
  jsxMatches.forEach(match => {
    const text = match.substring(1).trim();
    if (text.length > 3 && 
        !text.includes('{') && 
        !text.includes('}') &&
        !text.includes('className')) {
      
      if (text.length < 100) {
        allContent.push(`<h3>${text}</h3>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });
  
  // Method 2: String literals with advanced filtering
  const stringMatches = content.match(/["']([^"']{15,}?)["']/g) || [];
  stringMatches.forEach(match => {
    const text = match.slice(1, -1).trim();
    
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
        text.split(' ').length > 3) {
      
      if (text.length < 80) {
        allContent.push(`<h3>${text}</h3>`);
      } else {
        allContent.push(`<p>${text}</p>`);
      }
    }
  });
  
  // Method 3: Extract arrays (features, stats, faqs)
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
      
      // Extract titles, descriptions, questions, answers
      const titleMatches = arrayContent.match(/title: ["']([^"']+)["']/g) || [];
      const descMatches = arrayContent.match(/description: ["']([^"']+)["']/g) || [];
      const questionMatches = arrayContent.match(/question: ["']([^"']+)["']/g) || [];
      const answerMatches = arrayContent.match(/answer: ["']([^"']+)["']/g) || [];
      
      titleMatches.forEach(match => {
        const title = match.replace(/title: ["']/, '').replace(/["']$/, '');
        allContent.push(`<h3>${title}</h3>`);
      });
      
      descMatches.forEach(match => {
        const desc = match.replace(/description: ["']/, '').replace(/["']$/, '');
        allContent.push(`<p>${desc}</p>`);
      });
      
      questionMatches.forEach(match => {
        const question = match.replace(/question: ["']/, '').replace(/["']$/, '');
        allContent.push(`<h4>${question}</h4>`);
      });
      
      answerMatches.forEach(match => {
        const answer = match.replace(/answer: ["']/, '').replace(/["']$/, '');
        allContent.push(`<p>${answer}</p>`);
      });
    }
  });
  
  return [...new Set(allContent)];
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
  </style>
</head>
<body>
  <div id="root">
    <!-- COMPLETE CONTENT INCLUDING ALL SECTIONS -->
    <div class="complete-seo-content">
      <h1>${pageData.title}</h1>
      <p>${pageData.description}</p>
      
      ${allContent.join('\n      ')}
    </div>
  </body>
</html>`;
}

// ALL PAGES INCLUDING HOMEPAGE
const allPages = {
  '/': {
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
    isHomepage: true
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
  },
  '/ai-seo': {
    file: 'src/pages/AISEO.tsx',
    title: 'AI SEO Services & Solutions | Effective Marketer',
    description: 'Cutting-edge AI SEO services to optimize your brand for Google, ChatGPT, Gemini, and AI Overviews. Future-proof your SEO strategy with our advanced AI solutions.'
  },
  '/ai-seo-for-saas-companies': {
    file: 'src/pages/SaaSCompanies.tsx',
    title: 'AI SEO for SaaS Companies | Effective Marketer',
    description: 'Specialized AI SEO services for SaaS companies. Dominate search results with our AI-powered SEO strategies designed specifically for software-as-a-service businesses.'
  },
  '/lead-gen-ai-automation': {
    file: 'src/pages/AIAutomation.tsx',
    title: 'AI Lead Generation & Automation | Effective Marketer',
    description: 'Automate your lead generation with AI-powered solutions. Streamline your sales funnel and capture high-quality leads with our advanced AI automation strategies.'
  },
  '/case-studies': {
    file: 'src/pages/CaseStudies.tsx',
    title: 'AI SEO Case Studies & Success Stories | Effective Marketer',
    description: 'Explore our AI SEO case studies and success stories. See how Effective Marketer helps businesses achieve top rankings in Google Autocomplete and AI platforms.'
  },
  '/ai-topical-map': {
    file: 'src/pages/AITopicalMap.tsx',
    title: 'AI Topical Map & Content Strategy | Effective Marketer',
    description: 'Develop a comprehensive AI topical map and content strategy to dominate your niche. Our AI-driven approach ensures complete topic coverage and authority.'
  },
  '/google-autosuggest-ranking': {
    file: 'src/pages/GoogleAutosuggestRanking.tsx',
    title: 'Google Autosuggest Ranking SEO Services | Effective Marketer',
    description: 'Dominate Google Autocomplete with our specialized Google Autosuggest Ranking SEO services. Get your brand visible in search suggestions and AI platforms for maximum exposure.'
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
  '/onboarding': {
    file: 'src/pages/Onboarding.tsx',
    title: 'AI SEO Onboarding & Consultation | Effective Marketer',
    description: 'Get started with AI SEO through our comprehensive onboarding and consultation services. Develop a custom AI SEO strategy tailored to your business goals.'
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
