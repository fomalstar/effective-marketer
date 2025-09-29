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

// Function to serve static HTML files with FULL content for SEO
function generateHTML(route, seo) {
  // Try to read the static HTML file with full content first
  let staticFilePath;
  
  if (route === '/') {
    staticFilePath = path.join(__dirname, '../dist/index.html');
  } else {
    // For routes like /ai-seo-agency-usa, look for dist/ai-seo-agency-usa/index.html
    const routePath = route.substring(1); // Remove leading slash
    staticFilePath = path.join(__dirname, '../dist', routePath, 'index.html');
  }
  
  // Try to read the static HTML file with full content
  try {
    if (fs.existsSync(staticFilePath)) {
      const staticHTML = fs.readFileSync(staticFilePath, 'utf-8');
      console.log(`✅ Serving static HTML with full content: ${staticFilePath}`);
      return staticHTML;
    }
  } catch (error) {
    console.log(`⚠️ Static file not found: ${staticFilePath}, generating dynamic HTML`);
  }
  
  // Fallback: Read the React template and inject SEO
  let template;
  try {
    template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
  } catch (error) {
    console.error('Error reading dist/index.html:', error);
    template = `<!doctype html><html><head><title>Effective Marketer</title></head><body><div id="root"></div></body></html>`;
  }
  
  // Inject SEO meta tags into the template
  const seoTags = `
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
  `;
  
  // Replace or add SEO tags to the template
  let htmlWithSEO = template;
  
  // Remove existing title and meta tags if any, then add our SEO tags
  htmlWithSEO = htmlWithSEO.replace(/<title>.*?<\/title>/i, '');
  htmlWithSEO = htmlWithSEO.replace(/<meta name="description".*?>/i, '');
  htmlWithSEO = htmlWithSEO.replace(/<link rel="canonical".*?>/i, '');
  
  // Inject our SEO tags before </head>
  htmlWithSEO = htmlWithSEO.replace('</head>', `${seoTags}</head>`);
  
  console.log(`📄 Serving dynamic HTML with SEO for: ${route}`);
  return htmlWithSEO;
}

// Handle all routes - serve React app with proper SEO
app.use((req, res) => {
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
  console.log(`✅ Now serving your REAL React pages with unique SEO!`);
  console.log(`📝 API endpoints available for n8n integration`);
  console.log(`🎨 Your beautiful React pages are now visible with full SEO!`);
});

module.exports = app;
