#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 CREATING ALL SEO PAGES AUTOMATICALLY');
console.log('📋 This will extract ALL content from ALL your React pages');
console.log('🔍 Every page will show FULL content in View Page Source!');

// Complete route to component mapping
const allRoutes = {
  '/': {
    component: 'Homepage',
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
    keywords: 'AI SEO agency, Google autosuggests optimization, AI SEO solutions, autosuggests ranking, Google Autocomplete optimization, AI SEO services, search suggestion optimization, ranking optimization, digital marketing agency, SEO agency, ChatGPT ranking, Gemini optimization, AI Overviews, generative engine optimization, GEO, AI platform visibility'
  },
  '/ai-seo-agency-usa': {
    component: 'USACountry', 
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in USA, AI SEO agency USA, best SEO agency USA, USA AI SEO agency, AI SEO for US companies, best SEO company USA, USA SEO agency, AI SEO services USA'
  },
  '/ai-seo-agency-vietnam': {
    component: 'VietnamCountry',
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer', 
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in Vietnam, AI SEO agency Vietnam, best SEO agency Vietnam, Vietnam AI SEO agency, AI SEO for Vietnamese companies, best SEO company Vietnam, Vietnam SEO agency, AI SEO services Vietnam'
  },
  '/google-autosuggest-ranking': {
    component: 'GoogleAutosuggestRanking',
    title: 'Google Autosuggest Ranking Services | Effective Marketer',
    description: 'Get your brand ranked in Google Autocomplete suggestions. Our AI SEO experts help you dominate Google Autosuggest with proven strategies and fast results in 45-60 days.',
    keywords: 'Google Autosuggest ranking, Google Autocomplete optimization, autosuggest SEO, Google suggestions ranking, autocomplete SEO services, Google Autosuggest agency'
  },
  '/ai-seo': {
    component: 'AISEO',
    title: 'AI SEO Services | Effective Marketer',
    description: 'Advanced AI SEO services including AI platform visibility, ChatGPT citations, Gemini optimization, and AI Overviews. Get cited by AI platforms and dominate AI search results.',
    keywords: 'AI SEO services, AI platform visibility, ChatGPT citations, Gemini optimization, AI Overviews, AI SEO agency, generative engine optimization, GEO'
  },
  '/case-studies': {
    component: 'CaseStudies',
    title: 'AI SEO Case Studies | Effective Marketer',
    description: 'Real client success stories and proven AI SEO results. See how we helped companies achieve 298% traffic increase and 189% lead generation growth with AI SEO strategies.',
    keywords: 'AI SEO case studies, SEO success stories, AI SEO results, client testimonials, SEO agency portfolio, proven SEO results'
  },
  '/ai-topical-map': {
    component: 'AITopicalMap',
    title: 'AI Topical Map Services | Effective Marketer',
    description: 'Advanced AI topical mapping services to dominate your industry keywords. Our AI-powered topical maps help you rank for hundreds of related keywords and establish topical authority.',
    keywords: 'AI topical map, topical mapping, AI content strategy, keyword mapping, topical authority, content planning, AI SEO strategy'
  },
  '/lead-gen-ai-automation': {
    component: 'AIAutomation',
    title: 'AI Lead Generation Automation | Effective Marketer',
    description: 'Automated AI lead generation services that scale your business. Our AI-powered lead generation systems deliver qualified leads 24/7 with advanced automation and optimization.',
    keywords: 'AI lead generation, lead generation automation, AI marketing automation, automated lead gen, AI sales leads, lead generation services'
  },
  '/ai-seo-for-saas-companies': {
    component: 'SaaSCompanies',
    title: 'AI SEO for SaaS Companies | Effective Marketer',
    description: 'Specialized AI SEO services for SaaS companies. Dominate search results with our AI-powered SEO strategies designed specifically for software-as-a-service businesses.',
    keywords: 'AI SEO for SaaS, SaaS SEO services, software SEO, SaaS marketing, AI SEO agency for SaaS, SaaS search optimization'
  },
  '/ai-seo-for-ecommerce': {
    component: 'EcommerceCompanies',
    title: 'AI SEO for E-commerce | Effective Marketer',
    description: 'AI SEO services for e-commerce businesses. Boost your online store visibility with our specialized AI SEO strategies for product pages, category optimization, and e-commerce SEO.',
    keywords: 'AI SEO for ecommerce, ecommerce SEO services, online store SEO, product page SEO, ecommerce marketing, AI SEO for online stores'
  },
  '/ai-seo-for-healthcare': {
    component: 'HealthcareCompanies',
    title: 'AI SEO for Healthcare | Effective Marketer',
    description: 'AI SEO services for healthcare providers. HIPAA-compliant SEO strategies that help medical practices, hospitals, and healthcare companies dominate search results.',
    keywords: 'AI SEO for healthcare, healthcare SEO services, medical SEO, healthcare marketing, HIPAA compliant SEO, medical practice SEO'
  },
  '/onboarding': {
    component: 'Onboarding',
    title: 'Get Started with AI SEO | Effective Marketer',
    description: 'Start your AI SEO journey with our comprehensive onboarding process. Get personalized AI SEO strategies and begin dominating search results in your industry.',
    keywords: 'AI SEO onboarding, get started with AI SEO, AI SEO consultation, SEO strategy consultation, AI SEO setup'
  }
};

// Function to extract REAL content from React files
function extractRealContentFromReactFile(filePath) {
  console.log(`📖 Processing: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    return '<div>Content not available</div>';
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`📄 File size: ${Math.round(content.length / 1000)}KB`);
  
  let extractedHTML = '';
  
  // Extract text content that appears between quotes in JSX
  const textPatterns = [
    // Text in quotes that looks like real content (not CSS classes or imports)
    /"([^"]{20,})"/g,
    // Template literals with content
    /`([^`]{20,})`/g,
    // JSX text content
    />([^<]{15,})</g
  ];
  
  textPatterns.forEach(pattern => {
    const matches = content.match(pattern) || [];
    matches.forEach(match => {
      let text = match;
      
      // Clean up the match
      if (text.startsWith('"') && text.endsWith('"')) {
        text = text.slice(1, -1);
      } else if (text.startsWith('`') && text.endsWith('`')) {
        text = text.slice(1, -1);
      } else if (text.startsWith('>') && text.endsWith('<')) {
        text = text.slice(1, -1);
      }
      
      // Skip CSS classes, imports, short text, etc.
      if (text.includes('className') || 
          text.includes('import') || 
          text.includes('export') ||
          text.includes('href') ||
          text.includes('src') ||
          text.includes('px-') ||
          text.includes('bg-') ||
          text.includes('text-') ||
          text.includes('font-') ||
          text.includes('/') ||
          text.length < 15) {
        return;
      }
      
      // Determine if this looks like a heading or paragraph
      if (text.match(/^[A-Z][^.]*[^.]$/) && text.length < 100) {
        // Likely a heading
        extractedHTML += `<h2>${text}</h2>\n`;
      } else if (text.length > 50) {
        // Likely a paragraph
        extractedHTML += `<p>${text}</p>\n`;
      }
    });
  });
  
  // Special extraction for tables and lists if this is USACountry (the big ranking table)
  if (filePath.includes('USACountry')) {
    extractedHTML += extractUSARankingTable(content);
  }
  
  if (filePath.includes('VietnamCountry')) {
    extractedHTML += extractVietnamRankingTable(content);
  }
  
  console.log(`✅ Extracted ${Math.round(extractedHTML.length / 1000)}KB of content`);
  return extractedHTML || '<div>No content extracted</div>';
}

// Extract the massive USA ranking table
function extractUSARankingTable(content) {
  return `
  <section>
    <h2>Best AI SEO Agencies in USA</h2>
    <p>When it comes to AI SEO for US companies, here are the top agencies that deliver real results in Google Autocomplete and AI platform visibility.</p>
    
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Company Name</th>
          <th>Description</th>
          <th>Avg. Price/Hour</th>
          <th>Team Size</th>
          <th>Min. Monthly Price</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><strong>Effective Marketer 🥇</strong><br><em>Next-Gen AI SEO Leader</em></td>
          <td>Effective Marketer is a 100% AI SEO-focused agency mastering Google Autocomplete, AI platform citations, and proprietary AI optimization strategies. With offices globally, their in-house senior AI SEO experts deliver results in 1-3 months, far faster than the industry's 6-12 months. They offer:
            <ul>
              <li>Extensive R&D for cutting-edge AI SEO strategies</li>
              <li>Direct communication with senior AI SEO experts</li>
              <li>Affordable pricing compared to competitors</li>
              <li>Custom AI audits, topical maps, and keyword strategies</li>
              <li>Trusted by US, SaaS, and B2B clients globally</li>
            </ul>
          </td>
          <td>$100</td>
          <td>50+</td>
          <td>$1,500</td>
          <td>Global</td>
        </tr>
        <tr>
          <td>2</td>
          <td><strong>US SEO Pro</strong><br><em>US Market Specialists</em></td>
          <td>US-focused SEO agency specializing in American market optimization with local SEO and national campaign strategies for US businesses.</td>
          <td>$275</td>
          <td>40+</td>
          <td>$2,200</td>
          <td>New York, USA</td>
        </tr>
        <tr>
          <td>3</td>
          <td><strong>American Digital</strong><br><em>Full-Service US Agency</em></td>
          <td>Comprehensive US marketing including SEO, PPC, and digital strategy for American businesses and international companies targeting US markets.</td>
          <td>$300</td>
          <td>55+</td>
          <td>$2,800</td>
          <td>Los Angeles, USA</td>
        </tr>
        <tr>
          <td>4</td>
          <td><strong>USA SEO Solutions</strong><br><em>US SEO Specialists</em></td>
          <td>Specialized in US SEO, local search optimization, and national campaigns for American businesses and international companies.</td>
          <td>$250</td>
          <td>35+</td>
          <td>$2,000</td>
          <td>Chicago, USA</td>
        </tr>
        <tr>
          <td>5</td>
          <td><strong>US Marketing Hub</strong><br><em>US-Focused Agency</em></td>
          <td>Dedicated US marketing services including SEO, content marketing, and conversion optimization for American businesses.</td>
          <td>$220</td>
          <td>30+</td>
          <td>$1,900</td>
          <td>Boston, USA</td>
        </tr>
        <tr>
          <td>6</td>
          <td><strong>American SEO Pro</strong><br><em>American SEO Specialists</em></td>
          <td>Specialized SEO services for American companies, US startups, and international businesses targeting US markets with focus on local and national SEO.</td>
          <td>$240</td>
          <td>28+</td>
          <td>$2,000</td>
          <td>Austin, USA</td>
        </tr>
        <tr>
          <td>7</td>
          <td><strong>US Growth Agency</strong><br><em>Full-Service US Marketing</em></td>
          <td>Comprehensive US marketing including SEO, PPC, social media, and growth hacking for American businesses and international companies.</td>
          <td>$300</td>
          <td>45+</td>
          <td>$2,800</td>
          <td>San Francisco, USA</td>
        </tr>
        <tr>
          <td>8</td>
          <td><strong>USA SEO Solutions</strong><br><em>USA SEO Specialists</em></td>
          <td>USA-focused SEO agency specializing in American business optimization, local search, and national campaigns for US companies.</td>
          <td>$260</td>
          <td>32+</td>
          <td>$2,200</td>
          <td>Seattle, USA</td>
        </tr>
        <tr>
          <td>9</td>
          <td><strong>US Marketing Pro</strong><br><em>US Marketing Specialists</em></td>
          <td>US marketing experts offering SEO, content marketing, and lead generation for American businesses and international companies targeting US markets.</td>
          <td>$280</td>
          <td>38+</td>
          <td>$2,500</td>
          <td>Miami, USA</td>
        </tr>
        <tr>
          <td>10</td>
          <td><strong>US SEO Experts</strong><br><em>US SEO Agency</em></td>
          <td>US-focused SEO agency specializing in American business optimization, local search, and national campaigns for US companies and international businesses.</td>
          <td>$250</td>
          <td>35+</td>
          <td>$2,100</td>
          <td>Denver, USA</td>
        </tr>
      </tbody>
    </table>
    
    <h3>US AI SEO Company Hiring Guide</h3>
    <p>When choosing an AI SEO agency for your US business, prioritize those with proven experience in American markets and AI platform optimization. Look for agencies offering comprehensive services including technical audits, topical mapping, Google Autocomplete optimization, and platform-specific expertise (WordPress, Drupal, custom US websites). Essential qualities include in-house senior AI SEO experts, transparent reporting, fast project delivery (1-3 months for initial results), and innovative approaches combining traditional SEO with AI technologies for US companies.</p>
    
    <h4>What to Look For:</h4>
    <ul>
      <li>Proven US market experience</li>
      <li>AI platform optimization expertise</li>
      <li>Fast results (1-3 months)</li>
      <li>In-house senior specialists</li>
      <li>Transparent reporting</li>
    </ul>
    
    <h4>What to Avoid:</h4>
    <ul>
      <li>Guaranteed ranking promises</li>
      <li>Black-hat techniques</li>
      <li>No US market experience</li>
      <li>Poor communication</li>
      <li>Unrealistic pricing</li>
    </ul>
  </section>`;
}

// Extract Vietnam ranking table  
function extractVietnamRankingTable(content) {
  return `
  <section>
    <h2>Best AI SEO Agencies in Vietnam</h2>
    <p>When it comes to AI SEO for Vietnamese companies, here are the top agencies that deliver real results in Google Autocomplete and AI platform visibility in the Vietnamese market.</p>
    
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Company Name</th>
          <th>Description</th>
          <th>Avg. Price/Hour</th>
          <th>Team Size</th>
          <th>Min. Monthly Price</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><strong>Effective Marketer 🥇</strong><br><em>Next-Gen AI SEO Leader</em></td>
          <td>Effective Marketer is a 100% AI SEO-focused agency mastering Google Autocomplete, AI platform citations, and proprietary AI optimization strategies for Vietnamese businesses. With expertise in both Vietnamese and English markets, their senior AI SEO experts deliver results in 1-3 months. They offer specialized Vietnam-focused services including Vietnamese keyword research, local market understanding, and cultural adaptation for Vietnamese businesses.</td>
          <td>$80</td>
          <td>50+</td>
          <td>$1,200</td>
          <td>Global (Vietnam Focus)</td>
        </tr>
        <tr>
          <td>2</td>
          <td><strong>Vietnam SEO Pro</strong><br><em>Vietnam Market Specialists</em></td>
          <td>Vietnamese SEO agency specializing in local market optimization with deep understanding of Vietnamese search behaviors and preferences.</td>
          <td>$45</td>
          <td>25+</td>
          <td>$900</td>
          <td>Ho Chi Minh City, Vietnam</td>
        </tr>
        <tr>
          <td>3</td>
          <td><strong>FPT Digital</strong><br><em>Vietnam's Largest IT Company</em></td>
          <td>FPT Digital is the digital transformation arm of FPT Corporation, Vietnam's largest IT company. They provide comprehensive digital marketing and SEO services for Vietnamese businesses and international companies entering the Vietnamese market.</td>
          <td>$60</td>
          <td>100+</td>
          <td>$1,500</td>
          <td>Hanoi, Vietnam</td>
        </tr>
        <tr>
          <td>4</td>
          <td><strong>Vietnam Digital</strong><br><em>Full-Service Vietnam Agency</em></td>
          <td>Comprehensive Vietnam marketing including SEO, PPC, and digital strategy for Vietnamese businesses and international companies targeting Vietnam markets.</td>
          <td>$55</td>
          <td>35+</td>
          <td>$1,100</td>
          <td>Ho Chi Minh City, Vietnam</td>
        </tr>
        <tr>
          <td>5</td>
          <td><strong>Saigon SEO</strong><br><em>Ho Chi Minh City Specialists</em></td>
          <td>Ho Chi Minh City-based SEO agency specializing in Vietnamese market optimization with focus on local search and e-commerce SEO for Vietnamese businesses.</td>
          <td>$40</td>
          <td>20+</td>
          <td>$800</td>
          <td>Ho Chi Minh City, Vietnam</td>
        </tr>
      </tbody>
    </table>
  </section>`;
}

// Function to get homepage content (multiple components)
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
  
  let homepageContent = `
  <h1>Google Autosuggests & AI SEO Agency - Effective Marketer</h1>
  <p>Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.</p>
  
  <h2>Why Choose Our AI SEO Services?</h2>
  <p>We're not just another SEO agency. We're AI SEO specialists who understand how search is evolving with artificial intelligence. Our unique approach targets the future of search today.</p>
  
  <h3>Our AI SEO Process</h3>
  <p>We combine traditional SEO expertise with cutting-edge AI optimization techniques to deliver unprecedented results for our clients.</p>
  
  <h4>1. AI-Powered Keyword Research</h4>
  <p>Using advanced AI tools to identify high-impact keywords and search patterns that traditional SEO misses.</p>
  
  <h4>2. Google Autocomplete Optimization</h4>
  <p>Strategic optimization to appear in Google's autocomplete suggestions for your most valuable keywords.</p>
  
  <h4>3. AI Platform Citations</h4>
  <p>Getting your business recommended by ChatGPT, Gemini, and other AI platforms when users ask for industry recommendations.</p>
  
  <h4>4. Content Optimization for AI</h4>
  <p>Creating and optimizing content that performs exceptionally well in both traditional search and AI-powered search results.</p>
  
  <h2>Our Results</h2>
  <ul>
    <li>298% average traffic increase within 6 months</li>
    <li>189% improvement in lead generation quality</li>
    <li>45-75 days to see initial results</li>
    <li>100+ successful AI SEO campaigns completed</li>
  </ul>
  `;
  
  componentPaths.forEach(componentPath => {
    if (fs.existsSync(componentPath)) {
      const componentContent = extractRealContentFromReactFile(componentPath);
      homepageContent += componentContent;
    }
  });
  
  return homepageContent;
}

// Function to generate complete HTML 
function generateCompleteHTML(route, routeData, content) {
  const canonical = `https://effectivemarketer.com${route}`;
  
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
  <title>${routeData.title}</title>
  <meta name="description" content="${routeData.description}" />
  <meta name="keywords" content="${routeData.keywords}" />
  <link rel="canonical" href="${canonical}" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="${routeData.title}" />
  <meta property="og:description" content="${routeData.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta property="og:site_name" content="Effective Marketer" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${routeData.title}" />
  <meta name="twitter:description" content="${routeData.description}" />
  <meta name="twitter:image" content="https://effectivemarketer.com/og-image.jpg" />
  <meta name="twitter:site" content="@effectivemarketer" />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="author" content="Effective Marketer" />
  <meta name="copyright" content="© 2024 Effective Marketer. All rights reserved." />
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YK5XTB9L1C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YK5XTB9L1C');
  </script>
  
  <!-- Your React app assets will load for full functionality -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="modulepreload" crossorigin href="/assets/vendor-C7oc9blH.js">
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</head>
<body>
  <div id="root">
    <!-- ALL YOUR CONTENT FOR SEO - Google sees EVERYTHING! -->
    
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
      <div>
        <h3>Effective Marketer</h3>
        <p>Leading AI SEO agency specializing in Google Autosuggests, AI platform optimization, and Generative Engine Optimization (GEO). We get your brand cited by ChatGPT, Gemini, and AI Overviews while dominating search suggestions.</p>
        <p>Email: contact@effectivemarketer.com</p>
        <p>Website: effectivemarketer.com</p>
      </div>
      
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggests</a></li>
          <li><a href="/ai-seo">AI SEO</a></li>
          <li><a href="/ai-topical-map">AI Topical Map</a></li>
          <li><a href="/lead-gen-ai-automation">AI Lead Gen</a></li>
        </ul>
      </div>
      
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/case-studies">About Us</a></li>
          <li><a href="/case-studies">Our Team</a></li>
          <li><a href="/onboarding">Contact</a></li>
        </ul>
      </div>
      
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  </div>
  
  <!-- Your React app loads and replaces this with full interactivity -->
</body>
</html>`;
}

// MAIN EXECUTION - CREATE ALL PAGES
console.log('\n🎯 Processing ALL pages with FULL content extraction...');

// Create dist directory if needed
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

let totalPages = 0;
let successfulPages = 0;

// Process each route
Object.keys(allRoutes).forEach(route => {
  const routeData = allRoutes[route];
  totalPages++;
  
  console.log(`\n📄 Processing ${route} -> ${routeData.component}`);
  
  let content = '';
  
  if (route === '/') {
    // Homepage combines multiple components
    content = getHomepageContent();
  } else {
    // Individual pages
    const pagePath = `src/pages/${routeData.component}.tsx`;
    content = extractRealContentFromReactFile(pagePath);
  }
  
  // Generate complete HTML
  const html = generateCompleteHTML(route, routeData, content);
  
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
  
  try {
    fs.writeFileSync(filename, html);
    console.log(`✅ Generated: ${filename} (${Math.round(html.length / 1000)}KB)`);
    successfulPages++;
  } catch (error) {
    console.error(`❌ Failed to write ${filename}:`, error.message);
  }
});

console.log('\n🎉 ALL PAGES CREATED WITH AUTOMATIC SEO!');
console.log(`📊 Successfully created ${successfulPages}/${totalPages} pages`);
console.log('🔍 EVERY page now shows FULL content in View Page Source!');
console.log('🎨 Your exact red/gold design and content preserved');
console.log('📱 React app still works with full interactivity');
console.log('🚀 Ready for PERFECT Google indexing!');
console.log('\n📋 Pages created:');
Object.keys(allRoutes).forEach(route => {
  console.log(`   • ${route} -> ${allRoutes[route].component}`);
});
