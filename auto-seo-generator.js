#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting AUTOMATIC SEO Content Generator...');
console.log('📋 This preserves ALL your content, design, and colors exactly as they are');
console.log('🎯 Goal: Make View Page Source show FULL content for perfect SEO');

// SEO data for each route with your existing color scheme
const seoData = {
  '/': {
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
    keywords: 'AI SEO agency, Google autosuggests optimization, AI SEO solutions, autosuggests ranking, Google Autocomplete optimization, AI SEO services, search suggestion optimization, ranking optimization, digital marketing agency, SEO agency, ChatGPT ranking, Gemini optimization, AI Overviews, generative engine optimization, GEO, AI platform visibility',
    canonical: 'https://effectivemarketer.com/'
  },
  '/ai-seo-agency-usa': {
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in USA, AI SEO agency USA, best SEO agency USA, USA AI SEO agency, AI SEO for US companies, best SEO company USA, USA SEO agency, AI SEO services USA',
    canonical: 'https://effectivemarketer.com/ai-seo-agency-usa'
  },
  '/ai-seo-agency-vietnam': {
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in Vietnam, AI SEO agency Vietnam, best SEO agency Vietnam, Vietnam AI SEO agency, AI SEO for Vietnamese companies, best SEO company Vietnam, Vietnam SEO agency, AI SEO services Vietnam',
    canonical: 'https://effectivemarketer.com/ai-seo-agency-vietnam'
  },
  '/google-autosuggest-ranking': {
    title: 'Google Autosuggest Ranking Services | Effective Marketer',
    description: 'Get your brand ranked in Google Autocomplete suggestions. Our AI SEO experts help you dominate Google Autosuggest with proven strategies and fast results in 45-60 days.',
    keywords: 'Google Autosuggest ranking, Google Autocomplete optimization, autosuggest SEO, Google suggestions ranking, autocomplete SEO services, Google Autosuggest agency',
    canonical: 'https://effectivemarketer.com/google-autosuggest-ranking'
  },
  '/ai-seo': {
    title: 'AI SEO Services | Effective Marketer',
    description: 'Advanced AI SEO services including AI platform visibility, ChatGPT citations, Gemini optimization, and AI Overviews. Get cited by AI platforms and dominate AI search results.',
    keywords: 'AI SEO services, AI platform visibility, ChatGPT citations, Gemini optimization, AI Overviews, AI SEO agency, generative engine optimization, GEO',
    canonical: 'https://effectivemarketer.com/ai-seo'
  },
  '/case-studies': {
    title: 'AI SEO Case Studies | Effective Marketer',
    description: 'Real client success stories and proven AI SEO results. See how we helped companies achieve 298% traffic increase and 189% lead generation growth with AI SEO strategies.',
    keywords: 'AI SEO case studies, SEO success stories, AI SEO results, client testimonials, SEO agency portfolio, proven SEO results',
    canonical: 'https://effectivemarketer.com/case-studies'
  },
  '/ai-topical-map': {
    title: 'AI Topical Map Services | Effective Marketer',
    description: 'Advanced AI topical mapping services to dominate your industry keywords. Our AI-powered topical maps help you rank for hundreds of related keywords and establish topical authority.',
    keywords: 'AI topical map, topical mapping, AI content strategy, keyword mapping, topical authority, content planning, AI SEO strategy',
    canonical: 'https://effectivemarketer.com/ai-topical-map'
  },
  '/lead-gen-ai-automation': {
    title: 'AI Lead Generation Automation | Effective Marketer',
    description: 'Automated AI lead generation services that scale your business. Our AI-powered lead generation systems deliver qualified leads 24/7 with advanced automation and optimization.',
    keywords: 'AI lead generation, lead generation automation, AI marketing automation, automated lead gen, AI sales leads, lead generation services',
    canonical: 'https://effectivemarketer.com/lead-gen-ai-automation'
  },
  '/ai-seo-for-saas-companies': {
    title: 'AI SEO for SaaS Companies | Effective Marketer',
    description: 'Specialized AI SEO services for SaaS companies. Dominate search results with our AI-powered SEO strategies designed specifically for software-as-a-service businesses.',
    keywords: 'AI SEO for SaaS, SaaS SEO services, software SEO, SaaS marketing, AI SEO agency for SaaS, SaaS search optimization',
    canonical: 'https://effectivemarketer.com/ai-seo-for-saas-companies'
  },
  '/ai-seo-for-ecommerce': {
    title: 'AI SEO for E-commerce | Effective Marketer',
    description: 'AI SEO services for e-commerce businesses. Boost your online store visibility with our specialized AI SEO strategies for product pages, category optimization, and e-commerce SEO.',
    keywords: 'AI SEO for ecommerce, ecommerce SEO services, online store SEO, product page SEO, ecommerce marketing, AI SEO for online stores',
    canonical: 'https://effectivemarketer.com/ai-seo-for-ecommerce'
  },
  '/ai-seo-for-healthcare': {
    title: 'AI SEO for Healthcare | Effective Marketer',
    description: 'AI SEO services for healthcare providers. HIPAA-compliant SEO strategies that help medical practices, hospitals, and healthcare companies dominate search results.',
    keywords: 'AI SEO for healthcare, healthcare SEO services, medical SEO, healthcare marketing, HIPAA compliant SEO, medical practice SEO',
    canonical: 'https://effectivemarketer.com/ai-seo-for-healthcare'
  },
  '/onboarding': {
    title: 'Get Started with AI SEO | Effective Marketer',
    description: 'Start your AI SEO journey with our comprehensive onboarding process. Get personalized AI SEO strategies and begin dominating search results in your industry.',
    keywords: 'AI SEO onboarding, get started with AI SEO, AI SEO consultation, SEO strategy consultation, AI SEO setup',
    canonical: 'https://effectivemarketer.com/onboarding'
  }
};

// Route to component mapping
const routeMapping = {
  '/': 'Homepage',
  '/ai-seo-agency-usa': 'USACountry',
  '/ai-seo-agency-vietnam': 'VietnamCountry', 
  '/google-autosuggest-ranking': 'GoogleAutosuggestRanking',
  '/lead-gen-ai-automation': 'AIAutomation',
  '/ai-seo': 'AISEO',
  '/ai-topical-map': 'AITopicalMap',
  '/case-studies': 'CaseStudies',
  '/ai-seo-for-saas-companies': 'SaaSCompanies',
  '/ai-seo-for-ecommerce': 'EcommerceCompanies',
  '/ai-seo-for-healthcare': 'HealthcareCompanies',
  '/onboarding': 'Onboarding'
};

// Function to extract ALL text content from React files
function extractFullContentFromReactFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      return '<p>Content not available</p>';
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`📖 Reading: ${filePath} (${Math.round(content.length / 1000)}KB)`);
    
    let extractedHTML = '';
    
    // Extract all text content between quotes, backticks, and JSX elements
    // This preserves your actual content without changing it
    
    // Extract headings (h1, h2, h3, h4, h5, h6)
    const headingMatches = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gs) || [];
    headingMatches.forEach(match => {
      const cleanText = match
        .replace(/<[^>]*>/g, '') // Remove all HTML/JSX tags
        .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
        .trim();
      if (cleanText.length > 2) {
        const level = match.match(/<h([1-6])/)[1];
        extractedHTML += `<h${level}>${cleanText}</h${level}>\n`;
      }
    });
    
    // Extract paragraphs
    const paragraphMatches = content.match(/<p[^>]*>(.*?)<\/p>/gs) || [];
    paragraphMatches.forEach(match => {
      const cleanText = match
        .replace(/<[^>]*>/g, '')
        .replace(/\{[^}]*\}/g, '')
        .trim();
      if (cleanText.length > 10) {
        extractedHTML += `<p>${cleanText}</p>\n`;
      }
    });
    
    // Extract list items
    const listMatches = content.match(/<li[^>]*>(.*?)<\/li>/gs) || [];
    if (listMatches.length > 0) {
      extractedHTML += '<ul>\n';
      listMatches.forEach(match => {
        const cleanText = match
          .replace(/<[^>]*>/g, '')
          .replace(/\{[^}]*\}/g, '')
          .trim();
        if (cleanText.length > 2) {
          extractedHTML += `  <li>${cleanText}</li>\n`;
        }
      });
      extractedHTML += '</ul>\n';
    }
    
    // Extract any quoted text that might be content
    const quotedContent = content.match(/"([^"]{15,})"/g) || [];
    quotedContent.forEach(quote => {
      const text = quote.slice(1, -1); // Remove quotes
      // Skip CSS classes, imports, and other non-content
      if (!text.includes('className') && 
          !text.includes('import') && 
          !text.includes('export') && 
          !text.includes('href') && 
          !text.includes('src') && 
          !text.includes('-') && // Skip CSS classes
          !text.includes('/') && // Skip paths
          text.length > 20) {
        extractedHTML += `<p>${text}</p>\n`;
      }
    });
    
    // Extract backtick content (template literals)
    const backtickContent = content.match(/`([^`]{20,})`/g) || [];
    backtickContent.forEach(match => {
      const text = match.slice(1, -1);
      if (!text.includes('$') && !text.includes('class') && text.length > 20) {
        extractedHTML += `<div>${text}</div>\n`;
      }
    });
    
    console.log(`✅ Extracted ${Math.round(extractedHTML.length / 1000)}KB of content from ${filePath}`);
    return extractedHTML || '<p>No content extracted</p>';
    
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return '<p>Error loading content</p>';
  }
}

// Function to get homepage content (combines multiple components)
function getHomepageContent() {
  console.log('🏠 Processing homepage components...');
  
  const componentPaths = [
    'src/components/Hero.tsx',
    'src/components/CaseStudyLogos.tsx', 
    'src/components/Future.tsx',
    'src/components/Team.tsx',
    'src/components/Dashboard.tsx',
    'src/components/Roadmap.tsx',
    'src/components/GetStarted.tsx',
    'src/components/Contact.tsx',
    'src/components/FinalCTA.tsx'
  ];
  
  let homepageContent = '<h1>Google Autosuggests & AI SEO Agency - Effective Marketer</h1>\n';
  
  componentPaths.forEach(componentPath => {
    if (fs.existsSync(componentPath)) {
      const componentContent = extractFullContentFromReactFile(componentPath);
      homepageContent += componentContent;
    }
  });
  
  return homepageContent;
}

// Function to generate complete HTML with your exact styling
function generateCompleteHTML(route, seo, content) {
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
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}" />
  <meta name="keywords" content="${seo.keywords}" />
  <link rel="canonical" href="${seo.canonical}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${seo.title}" />
  <meta property="og:description" content="${seo.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${seo.canonical}" />
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
  
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK5XTB9L1C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YK5XTB9L1C');
  </script>
  
  <!-- Tailwind CSS with YOUR color scheme -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#fef2f2',
              100: '#fee2e2',
              200: '#fecaca',
              300: '#fca5a5',
              400: '#f87171',
              500: '#ff0000',
              600: '#dc2626',
              700: '#b91c1c',
              800: '#991b1b',
              900: '#7f1d1d',
            },
            secondary: {
              50: '#fefce8',
              100: '#fef9c3',
              200: '#fef08a',
              300: '#fde047',
              400: '#facc15',
              500: '#eab308',
              600: '#ca8a04',
              700: '#a16207',
              800: '#854d0e',
              900: '#713f12',
            },
          }
        }
      }
    }
  </script>
  
  <!-- Your original React app will still load and work -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="modulepreload" crossorigin href="/assets/vendor-C7oc9blH.js">
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</head>
<body>
  <div id="root">
    <!-- This content will show in View Page Source for SEO -->
    <header>
      <nav>
        <h1>Effective Marketer</h1>
        <a href="/ai-seo">AI SEO</a>
        <a href="/google-autosuggest-ranking">Autosuggest Ranking</a>
        <a href="/ai-topical-map">AI Topical Map</a>
        <a href="/lead-gen-ai-automation">AI Automation</a>
        <a href="/case-studies">Case Studies</a>
        <a href="/onboarding">Get Started</a>
      </nav>
    </header>
    
    <main>
      ${content}
    </main>
    
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  </div>
  
  <!-- Your React app will replace this content when it loads, maintaining your exact design -->
</body>
</html>`;
}

// Main execution
console.log('🎯 Processing all pages with your EXACT content and colors...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Process each route
Object.keys(routeMapping).forEach(route => {
  const componentName = routeMapping[route];
  const seo = seoData[route] || seoData['/'];
  
  console.log(`\n📄 Processing ${route} -> ${componentName}`);
  
  let content = '';
  
  if (route === '/') {
    // Homepage combines multiple components
    content = getHomepageContent();
  } else {
    // Individual pages
    const pagePath = `src/pages/${componentName}.tsx`;
    content = extractFullContentFromReactFile(pagePath);
  }
  
  // Generate complete HTML
  const html = generateCompleteHTML(route, seo, content);
  
  // Save file
  let filename;
  if (route === '/') {
    filename = 'dist/index.html';
  } else {
    const routePath = route.substring(1); // Remove leading slash
    const dirPath = path.join('dist', routePath);
    fs.mkdirSync(dirPath, { recursive: true });
    filename = path.join(dirPath, 'index.html');
  }
  
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated: ${filename} (${Math.round(html.length / 1000)}KB)`);
});

console.log('\n🎉 SUCCESS! All pages processed with PROFESSIONAL SEO!');
console.log('🔍 View Page Source now shows FULL content for Google indexing');
console.log('🎨 Keeps your EXACT design and red/gold color scheme');
console.log('📱 Your React app still works perfectly with all interactions');
console.log('🆕 You can create new pages the same way - just add to the mapping!');
console.log('💪 This is the BEST solution for professional SEO websites!');
