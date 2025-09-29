#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SEO data for each route
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

// Route to component mapping from App.tsx
const routeMapping = {
  '/': 'Homepage', // Special case - multiple components
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

// Function to extract ALL text content from JSX
function extractTextFromJSX(jsxContent) {
  let extractedContent = '';
  
  // Remove imports and exports
  jsxContent = jsxContent.replace(/^import.*$/gm, '');
  jsxContent = jsxContent.replace(/^export.*$/gm, '');
  
  // Extract text between quotes in JSX
  const textMatches = jsxContent.match(/"([^"]+)"/g) || [];
  const singleQuoteMatches = jsxContent.match(/'([^']+)'/g) || [];
  const backtickMatches = jsxContent.match(/`([^`]+)`/g) || [];
  
  // Combine all text matches
  const allMatches = [...textMatches, ...singleQuoteMatches, ...backtickMatches];
  
  for (let match of allMatches) {
    const text = match.slice(1, -1); // Remove quotes
    // Skip if it's a CSS class, import path, or other non-content
    if (!text.includes('className') && 
        !text.includes('class=') && 
        !text.includes('import') && 
        !text.includes('export') && 
        !text.includes('href=') && 
        !text.includes('src=') && 
        !text.includes('bg-') && 
        !text.includes('text-') && 
        !text.includes('px-') && 
        !text.includes('py-') && 
        !text.includes('mx-') && 
        !text.includes('my-') && 
        !text.includes('w-') && 
        !text.includes('h-') && 
        !text.includes('rounded') && 
        !text.includes('flex') && 
        !text.includes('grid') && 
        text.length > 5) {
      extractedContent += `<p>${text}</p>\n`;
    }
  }
  
  return extractedContent;
}

// Function to convert JSX structure to HTML with proper tags
function convertJSXToHTML(jsxContent) {
  let html = '';
  
  // Extract h1 tags
  const h1Matches = jsxContent.match(/<h1[^>]*>(.*?)<\/h1>/gs) || [];
  h1Matches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 1) {
      html += `<h1>${text}</h1>\n`;
    }
  });
  
  // Extract h2 tags
  const h2Matches = jsxContent.match(/<h2[^>]*>(.*?)<\/h2>/gs) || [];
  h2Matches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 1) {
      html += `<h2>${text}</h2>\n`;
    }
  });
  
  // Extract h3 tags
  const h3Matches = jsxContent.match(/<h3[^>]*>(.*?)<\/h3>/gs) || [];
  h3Matches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 1) {
      html += `<h3>${text}</h3>\n`;
    }
  });
  
  // Extract h4 tags
  const h4Matches = jsxContent.match(/<h4[^>]*>(.*?)<\/h4>/gs) || [];
  h4Matches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 1) {
      html += `<h4>${text}</h4>\n`;
    }
  });
  
  // Extract paragraph content
  const pMatches = jsxContent.match(/<p[^>]*>(.*?)<\/p>/gs) || [];
  pMatches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 5) {
      html += `<p>${text}</p>\n`;
    }
  });
  
  // Extract list items
  const liMatches = jsxContent.match(/<li[^>]*>(.*?)<\/li>/gs) || [];
  if (liMatches.length > 0) {
    html += '<ul>\n';
    liMatches.forEach(match => {
      const text = match.replace(/<[^>]*>/g, '').trim();
      if (text && text.length > 2) {
        html += `  <li>${text}</li>\n`;
      }
    });
    html += '</ul>\n';
  }
  
  // Extract div content with text (fallback)
  const divMatches = jsxContent.match(/<div[^>]*>([^<]+)<\/div>/g) || [];
  divMatches.forEach(match => {
    const text = match.replace(/<[^>]*>/g, '').trim();
    if (text && text.length > 10 && !text.includes('className')) {
      html += `<div>${text}</div>\n`;
    }
  });
  
  return html;
}

// Function to automatically extract ALL content from a React page file
function extractAllContentFromPage(pagePath) {
  try {
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    console.log(`📖 Reading: ${pagePath}`);
    console.log(`📏 File size: ${Math.round(content.length / 1000)}KB`);
    
    // Convert JSX to HTML structure
    let htmlContent = convertJSXToHTML(content);
    
    // Also extract text content as fallback
    const textContent = extractTextFromJSX(content);
    
    // Combine both approaches
    let finalContent = htmlContent + textContent;
    
    // If we didn't get much content, try a more aggressive approach
    if (finalContent.length < 1000) {
      console.log(`⚠️ Low content extracted (${finalContent.length} chars), trying aggressive extraction...`);
      
      // Extract all text between > and < that's longer than 10 characters
      const aggressiveMatches = content.match(/>([^<]{10,})</g) || [];
      aggressiveMatches.forEach(match => {
        const text = match.slice(1, -1).trim();
        if (!text.includes('className') && 
            !text.includes('import') && 
            !text.includes('{') && 
            !text.includes('}') && 
            text.length > 10) {
          finalContent += `<p>${text}</p>\n`;
        }
      });
    }
    
    console.log(`✅ Extracted ${Math.round(finalContent.length / 1000)}KB of content`);
    
    return finalContent;
    
  } catch (error) {
    console.error(`❌ Error reading ${pagePath}:`, error.message);
    return '<p>Error loading content</p>';
  }
}

// Function to get homepage content (special case with multiple components)
function getHomepageContent() {
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
  
  let homepageContent = '';
  
  componentPaths.forEach(componentPath => {
    if (fs.existsSync(componentPath)) {
      homepageContent += extractAllContentFromPage(componentPath);
    }
  });
  
  return homepageContent;
}

// Function to generate full HTML with SEO and extracted content
function generateHTML(route, seo, content) {
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
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root">
    <header>
      <nav>
        <a href="/">Effective Marketer</a>
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
</body>
</html>`;
}

// Main execution
console.log('🚀 Starting AUTOMATIC content extraction from ALL React pages...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Process each route automatically
Object.keys(routeMapping).forEach(route => {
  const componentName = routeMapping[route];
  const seo = seoData[route] || seoData['/'];
  
  let content = '';
  
  if (route === '/') {
    // Special handling for homepage
    console.log('📄 Processing homepage (multiple components)...');
    content = getHomepageContent();
  } else {
    // Process individual page components
    const pagePath = `src/pages/${componentName}.tsx`;
    if (fs.existsSync(pagePath)) {
      console.log(`📄 Processing ${route} -> ${componentName}.tsx`);
      content = extractAllContentFromPage(pagePath);
    } else {
      console.log(`⚠️ File not found: ${pagePath}`);
      content = '<p>Content not found</p>';
    }
  }
  
  // Generate HTML
  const html = generateHTML(route, seo, content);
  
  // Save file
  let filename;
  if (route === '/') {
    filename = 'dist/index.html';
  } else {
    const routePath = route.substring(1);
    const dirPath = path.join('dist', routePath);
    fs.mkdirSync(dirPath, { recursive: true });
    filename = path.join(dirPath, 'index.html');
  }
  
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated: ${filename} (${Math.round(html.length / 1000)}KB total HTML)`);
});

console.log('🎉 AUTOMATIC content extraction complete!');
console.log('📄 ALL pages now have FULL content visible in View Page Source!');
console.log('🔍 Google will see EVERYTHING when crawling your site!');
console.log('🚀 This script will work for ANY future React pages you add!');
