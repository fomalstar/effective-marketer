const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

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

// Function to generate HTML with proper SEO and page content
function generateHTML(route, seo) {
  // Get page content based on route
  const pageContent = getPageContent(route);
  
  return `<!doctype html>
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
    
    <script type="module" crossorigin src="/assets/main-DEFZx3vN.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-D3F3s8fL.js">
    <link rel="modulepreload" crossorigin href="/assets/router-CeWAwckd.js">
    <link rel="modulepreload" crossorigin href="/assets/helmet-BmDwPsnS.js">
    <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
  </head>
  <body>
    <div id="root">${pageContent}</div>
  </body>
</html>`;
}

// Function to get page-specific content
function getPageContent(route) {
  const contentMap = {
    '/': getHomepageContent(),
    '/ai-seo-agency-usa': getUSAContent(),
    '/ai-seo-agency-vietnam': getVietnamContent(),
    '/google-autosuggest-ranking': getAutosuggestContent(),
    '/ai-seo': getAISEOContent(),
    '/case-studies': getCaseStudiesContent(),
    '/ai-topical-map': getAITopicalMapContent(),
    '/lead-gen-ai-automation': getLeadGenContent(),
    '/ai-seo-for-saas-companies': getSaaSContent(),
    '/ai-seo-for-ecommerce': getEcommerceContent(),
    '/ai-seo-for-healthcare': getHealthcareContent(),
    '/onboarding': getOnboardingContent()
  };
  
  return contentMap[route] || getHomepageContent();
}

// Homepage content
function getHomepageContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>Google Autosuggests & AI SEO Agency - Effective Marketer</h1>
        <p>Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.</p>
        <a href="/google-autosuggest-ranking" class="cta-button">Get Started</a>
      </section>
      <section class="services">
        <h2>Our AI SEO Services</h2>
        <div class="service-grid">
          <div class="service-card">
            <h3>Google Autosuggest Ranking</h3>
            <p>Get your brand ranked in Google Autocomplete suggestions with our proven AI SEO strategies.</p>
          </div>
          <div class="service-card">
            <h3>AI Platform Visibility</h3>
            <p>Dominate ChatGPT, Gemini, and AI Overviews with our specialized AI SEO techniques.</p>
          </div>
          <div class="service-card">
            <h3>AI Lead Generation</h3>
            <p>Automated multi-channel lead generation with AI-powered optimization strategies.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// AI Topical Map content
function getAITopicalMapContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>AI Topical Map Services | Effective Marketer</h1>
        <p>Advanced AI topical mapping services to dominate your industry keywords. Our AI-powered topical maps help you rank for hundreds of related keywords and establish topical authority.</p>
        <a href="https://calendly.com/effectivemarketer/demo" class="cta-button">Start Your Topical Map</a>
      </section>
      <section class="features">
        <h2>Why Our Topical Maps Win AI Search</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>AI Citation-Ready</h3>
            <p>Entity-rich hierarchy and evidence notes AI assistants trust and cite.</p>
          </div>
          <div class="feature-card">
            <h3>Generative Intent Coverage</h3>
            <p>Synthesized answers mapped to topic silos and clusters.</p>
          </div>
          <div class="feature-card">
            <h3>LLM-Friendly Clusters</h3>
            <p>Four-level hierarchy humans and models can navigate without context drift.</p>
          </div>
        </div>
      </section>
      <section class="process">
        <h2>How GEO-Ready Maps Work</h2>
        <div class="process-steps">
          <div class="step">
            <h3>1. Ask the Right Questions</h3>
            <p>We analyze search intent, competitors, and user questions, then extract Generative Intent prompts you should win across AI and classic search.</p>
          </div>
          <div class="step">
            <h3>2. Design the Topical Blueprint</h3>
            <p>We arrange topics and subtopics into a clear, hierarchical map. We connect entities and relationships so LLMs can reason across clusters.</p>
          </div>
          <div class="step">
            <h3>3. We Deliver the GEO Topical Map</h3>
            <p>Spreadsheet + mind map deliverable with keywords, clusters, volume/CPC, SERP analysis, buyer journey stages, content types, and Generative Intent prompts per cluster.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// USA page content
function getUSAContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>The #1 AI SEO Agency in USA</h1>
        <p>The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.</p>
        <a href="/google-autosuggest-ranking" class="cta-button">Get USA AI SEO Demo</a>
      </section>
      <section class="features">
        <h2>Why US Companies Choose Our AI SEO</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Google Autocomplete Domination</h3>
            <p>Get your US business ranked in Google Autocomplete for high-intent keywords like 'best SEO agency in USA' and 'AI SEO services for US companies'.</p>
          </div>
          <div class="feature-card">
            <h3>AI Platform Citations</h3>
            <p>Become the go-to recommendation when US businesses ask ChatGPT, Gemini, or Claude about AI SEO agencies in the United States.</p>
          </div>
          <div class="feature-card">
            <h3>Competitive Displacement</h3>
            <p>Replace competitors in AI search results and Google Autocomplete, capturing their US market share and organic traffic.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// Vietnam page content
function getVietnamContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>The #1 AI SEO Agency in Vietnam</h1>
        <p>The #1 AI SEO agency in Vietnam. We're 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.</p>
        <a href="/google-autosuggest-ranking" class="cta-button">Get Vietnam AI SEO Demo</a>
      </section>
      <section class="features">
        <h2>Why Vietnamese Companies Choose Our AI SEO</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Google Autocomplete Domination</h3>
            <p>Get your Vietnamese business ranked in Google Autocomplete for high-intent keywords like 'best SEO agency in Vietnam' and 'AI SEO services for Vietnamese companies'.</p>
          </div>
          <div class="feature-card">
            <h3>AI Platform Citations</h3>
            <p>Become the go-to recommendation when Vietnamese businesses ask ChatGPT, Gemini, or Claude about AI SEO agencies in Vietnam.</p>
          </div>
          <div class="feature-card">
            <h3>Competitive Displacement</h3>
            <p>Replace competitors in AI search results and Google Autocomplete, capturing their Vietnamese market share and organic traffic.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// Autosuggest page content
function getAutosuggestContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>Google Autosuggest Ranking Services</h1>
        <p>Get your brand ranked in Google Autocomplete suggestions. Our AI SEO experts help you dominate Google Autosuggest with proven strategies and fast results in 45-60 days.</p>
        <a href="/google-autosuggest-ranking" class="cta-button">Start Autosuggest Campaign</a>
      </section>
      <section class="process">
        <h2>How Google Autosuggest Ranking Works</h2>
        <div class="process-steps">
          <div class="step">
            <h3>1. Keyword Research</h3>
            <p>We identify high-value autosuggest opportunities for your brand and industry.</p>
          </div>
          <div class="step">
            <h3>2. Content Optimization</h3>
            <p>Create and optimize content that Google's algorithm recognizes as authoritative.</p>
          </div>
          <div class="step">
            <h3>3. Signal Building</h3>
            <p>Build the right signals to influence Google's autosuggest algorithm.</p>
          </div>
          <div class="step">
            <h3>4. Results Tracking</h3>
            <p>Monitor and optimize your autosuggest rankings for maximum impact.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// AI SEO page content
function getAISEOContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>AI SEO Services</h1>
        <p>Advanced AI SEO services including AI platform visibility, ChatGPT citations, Gemini optimization, and AI Overviews. Get cited by AI platforms and dominate AI search results.</p>
        <a href="/ai-seo" class="cta-button">Get AI SEO Strategy</a>
      </section>
      <section class="services">
        <h2>Our AI SEO Solutions</h2>
        <div class="service-grid">
          <div class="service-card">
            <h3>ChatGPT Citations</h3>
            <p>Get your brand recommended by ChatGPT when users ask about your industry or services.</p>
          </div>
          <div class="service-card">
            <h3>Gemini Optimization</h3>
            <p>Optimize your content for Google's Gemini AI to ensure maximum visibility.</p>
          </div>
          <div class="service-card">
            <h3>AI Overviews</h3>
            <p>Appear in Google's AI Overviews with our specialized optimization techniques.</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// Case studies page content
function getCaseStudiesContent() {
  return `
    <header>
      <nav>
        <div class="logo">Effective Marketer</div>
        <ul>
          <li><a href="/google-autosuggest-ranking">Google Autosuggest Ranking</a></li>
          <li><a href="/ai-seo">AI SEO Services</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>AI SEO Case Studies</h1>
        <p>Real client success stories and proven AI SEO results. See how we helped companies achieve 298% traffic increase and 189% lead generation growth with AI SEO strategies.</p>
      </section>
      <section class="case-studies">
        <h2>Client Success Stories</h2>
        <div class="case-study-grid">
          <div class="case-study">
            <h3>SaaS Company - 247% Traffic Increase</h3>
            <p>We helped a SaaS company achieve 247% traffic increase in just 3 months using our AI SEO strategies and Google Autosuggest optimization.</p>
            <div class="results">
              <div class="result-item">247% Traffic Increase</div>
              <div class="result-item">189% Lead Generation Growth</div>
              <div class="result-item">45+ Keywords Ranked</div>
            </div>
          </div>
          <div class="case-study">
            <h3>Healthcare Company - 298% Growth</h3>
            <p>A healthcare company saw 298% growth in organic traffic after implementing our AI SEO and ChatGPT citation strategies.</p>
            <div class="results">
              <div class="result-item">298% Traffic Growth</div>
              <div class="result-item">156% Conversion Increase</div>
              <div class="result-item">32+ Keywords Ranked</div>
            </div>
          </div>
          <div class="case-study">
            <h3>E-commerce Business - 189% Lead Increase</h3>
            <p>An e-commerce business achieved 189% increase in qualified leads through our AI SEO and Google Autosuggest optimization.</p>
            <div class="results">
              <div class="result-item">189% Lead Increase</div>
              <div class="result-item">234% Revenue Growth</div>
              <div class="result-item">28+ Keywords Ranked</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
    </footer>
  `;
}

// Placeholder functions for other pages
function getLeadGenContent() { return getHomepageContent(); }
function getSaaSContent() { return getHomepageContent(); }
function getEcommerceContent() { return getHomepageContent(); }
function getHealthcareContent() { return getHomepageContent(); }
function getOnboardingContent() { return getHomepageContent(); }


// Handle all routes - serve React app with proper SEO
app.get('*', (req, res) => {
  const route = req.path;
  
  // Get SEO data for this route, fallback to homepage
  const seo = seoData[route] || seoData['/'] || {
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete.',
    keywords: 'AI SEO agency, Google autosuggests optimization, AI SEO solutions',
    canonical: 'https://effectivemarketer.com/'
  };
  
  console.log(`📄 Serving route: ${route} with title: ${seo.title}`);
  
  const html = generateHTML(route, seo);
  res.send(html);
});

// API endpoints for n8n integration
app.post('/api/blog/webhook', (req, res) => {
  console.log('📝 Received blog webhook:', req.body);
  
  // Process the webhook data
  const { title, content, category, tags, featuredImage, metaDescription } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      errors: ['Title and content are required']
    });
  }
  
  // Generate draft ID
  const draftId = `draft_${Date.now()}`;
  
  // Store draft (in production, use a database)
  const draft = {
    id: draftId,
    title,
    content,
    category: category || 'AI SEO Strategy',
    tags: tags || [],
    featuredImage,
    metaDescription,
    status: 'draft',
    createdAt: new Date().toISOString()
  };
  
  console.log(`✅ Draft created: ${draftId}`);
  
  res.json({
    success: true,
    draftId,
    message: 'Draft created successfully'
  });
});

app.get('/api/blog/drafts', (req, res) => {
  // Return all drafts (in production, fetch from database)
  res.json({
    success: true,
    drafts: []
  });
});

app.post('/api/blog/drafts/:id/publish', (req, res) => {
  const { id } = req.params;
  console.log(`🚀 Publishing draft: ${id}`);
  
  res.json({
    success: true,
    message: 'Draft published successfully'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
  console.log(`🔍 Test SEO: http://localhost:${PORT}/ai-seo-agency-usa`);
  console.log(`✅ Each page now has unique titles and meta tags!`);
  console.log(`📝 API endpoints available for n8n integration`);
});

module.exports = app;
