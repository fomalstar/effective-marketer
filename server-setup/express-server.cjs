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

// Function to get page content for each route
function getPageContent(route) {
  const contentMap = {
    '/': {
      title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Google Autosuggests & AI SEO Agency - Effective Marketer</h1>
            <p class="text-xl text-gray-600 mb-8">Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.</p>
            <div class="flex justify-center space-x-4">
              <a href="/onboarding" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">Get Started</a>
              <a href="/ai-seo" class="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">Learn More</a>
            </div>
          </div>
        </main>
      `
    },
    '/ai-topical-map': {
      title: 'AI Topical Map Services | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-blue-600 font-semibold">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">AI Topical Map Services</h1>
            <p class="text-xl text-gray-600 mb-8">Own AI Search with GEO-ready topical maps. Entity-rich, Generative Intent blueprints built for AI citations across ChatGPT, Google AI Mode, Perplexity, and more.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Advanced AI Topical Mapping</h2>
              <p class="text-gray-600 mb-4">Our AI-powered topical maps help you dominate your industry keywords and establish topical authority across all AI search engines.</p>
              <ul class="space-y-2 text-gray-600">
                <li>• Entity-rich content architecture</li>
                <li>• Generative Intent optimization</li>
                <li>• AI citation optimization</li>
                <li>• Cross-platform AI visibility</li>
              </ul>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">GEO-Ready Implementation</h2>
              <p class="text-gray-600 mb-4">Location-specific topical maps that help you rank for geo-targeted keywords and capture local AI search traffic.</p>
              <ul class="space-y-2 text-gray-600">
                <li>• Location-based keyword mapping</li>
                <li>• Local entity optimization</li>
                <li>• Regional AI search dominance</li>
                <li>• Multi-location scalability</li>
              </ul>
            </div>
          </div>
        </main>
      `
    },
    '/ai-seo-agency-usa': {
      title: 'Best AI SEO Agency in USA | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">The #1 AI SEO Agency in USA</h1>
            <p class="text-xl text-gray-600 mb-8">The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies. Our AI SEO strategies help US businesses dominate search results and capture more qualified leads.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">US Market Expertise</h2>
              <p class="text-gray-600 mb-4">Deep understanding of the US market and search behavior patterns to optimize your AI SEO strategy.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Local AI Optimization</h2>
              <p class="text-gray-600 mb-4">Location-specific AI SEO that helps US businesses rank higher in local and national search results.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Proven Results</h2>
              <p class="text-gray-600 mb-4">Track record of helping US companies achieve top rankings and increased organic traffic.</p>
            </div>
          </div>
        </main>
      `
    },
    '/ai-seo-agency-vietnam': {
      title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">The #1 AI SEO Agency in Vietnam</h1>
            <p class="text-xl text-gray-600 mb-8">The #1 AI SEO agency in Vietnam. We're 100% focused on AI SEO for Vietnamese companies. Our AI SEO strategies help Vietnamese businesses dominate search results and capture more qualified leads.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Vietnam Market Expertise</h2>
              <p class="text-gray-600 mb-4">Deep understanding of the Vietnamese market and search behavior patterns to optimize your AI SEO strategy.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Local AI Optimization</h2>
              <p class="text-gray-600 mb-4">Location-specific AI SEO that helps Vietnamese businesses rank higher in local and national search results.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Proven Results</h2>
              <p class="text-gray-600 mb-4">Track record of helping Vietnamese companies achieve top rankings and increased organic traffic.</p>
            </div>
          </div>
        </main>
      `
    },
    '/google-autosuggest-ranking': {
      title: 'Google Autosuggest Ranking Services | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Google Autosuggest Ranking Services</h1>
            <p class="text-xl text-gray-600 mb-8">Dominate Google Autocomplete with our advanced autosuggest ranking services. We help your brand appear in Google's autocomplete suggestions to capture more search traffic and increase brand visibility.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Autocomplete Optimization</h2>
              <p class="text-gray-600 mb-4">Strategic optimization to get your brand and keywords into Google's autocomplete suggestions for maximum visibility.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Search Volume Capture</h2>
              <p class="text-gray-600 mb-4">Capture high-intent search traffic by appearing in autocomplete suggestions when users type relevant queries.</p>
            </div>
          </div>
        </main>
      `
    },
    '/lead-gen-ai-automation': {
      title: 'AI Lead Generation Automation | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-blue-600 font-semibold">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">AI Lead Generation Automation</h1>
            <p class="text-xl text-gray-600 mb-8">Automated AI lead generation services that scale your business. Our AI-powered lead generation systems deliver qualified leads 24/7 with advanced automation and optimization.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">24/7 Lead Generation</h2>
              <p class="text-gray-600 mb-4">AI-powered systems that work around the clock to identify and capture qualified leads for your business.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Advanced Automation</h2>
              <p class="text-gray-600 mb-4">Sophisticated automation workflows that nurture leads and convert prospects into customers.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Scalable Solutions</h2>
              <p class="text-gray-600 mb-4">Lead generation systems that scale with your business growth and adapt to changing market conditions.</p>
            </div>
          </div>
        </main>
      `
    },
    '/ai-seo': {
      title: 'AI SEO Services | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-blue-600 font-semibold">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">AI SEO Services</h1>
            <p class="text-xl text-gray-600 mb-8">Advanced AI SEO services that help your business dominate search results. Our AI-powered SEO strategies optimize your content for maximum visibility across all search engines and AI platforms.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">AI-Powered Optimization</h2>
              <p class="text-gray-600 mb-4">Leverage artificial intelligence to optimize your content for search engines and AI platforms like ChatGPT and Google AI.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-4">Multi-Platform Visibility</h2>
              <p class="text-gray-600 mb-4">Optimize for traditional search engines and emerging AI platforms to capture traffic from all sources.</p>
            </div>
          </div>
        </main>
      `
    },
    '/onboarding': {
      title: 'Get Started with AI SEO | Effective Marketer',
      content: `
        <header class="bg-white shadow-sm">
          <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">Effective Marketer</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/ai-seo" class="text-gray-700 hover:text-blue-600">AI SEO</a>
                <a href="/ai-topical-map" class="text-gray-700 hover:text-blue-600">AI Topical Map</a>
                <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-blue-600">AI Automation</a>
                <a href="/onboarding" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</a>
              </div>
            </div>
          </nav>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-6">Get Started with AI SEO</h1>
            <p class="text-xl text-gray-600 mb-8">Start your AI SEO journey with our comprehensive onboarding process. Get personalized AI SEO strategies and begin dominating search results in your industry.</p>
          </div>
          <div class="max-w-2xl mx-auto">
            <div class="bg-white p-8 rounded-lg shadow-sm border">
              <h2 class="text-2xl font-semibold mb-6 text-center">Ready to Get Started?</h2>
              <p class="text-gray-600 mb-6 text-center">Fill out the form below to begin your AI SEO journey with our expert team.</p>
              <form class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your company name">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                  <input type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://yourwebsite.com">
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">Start My AI SEO Journey</button>
              </form>
            </div>
          </div>
        </main>
      `
    }
  };
  
  return contentMap[route] || contentMap['/'];
}

// Function to generate HTML with proper SEO and full content
function generateHTML(route, seo) {
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
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React App Scripts -->
    <script type="module" crossorigin src="/assets/main-DEFZx3vN.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-D3F3s8fL.js">
    <link rel="modulepreload" crossorigin href="/assets/router-CeWAwckd.js">
    <link rel="modulepreload" crossorigin href="/assets/helmet-BmDwPsnS.js">
    <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
  </head>
  <body>
    <div id="root">${pageContent.content}</div>
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>`;
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
  console.log(`✅ Each page now has unique titles and meta tags!`);
  console.log(`📝 API endpoints available for n8n integration`);
});

module.exports = app;
