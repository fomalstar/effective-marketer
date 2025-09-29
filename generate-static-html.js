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
  }
};

// Content from your beautiful React pages
const pageContent = {
  '/': `
    <div class="min-h-screen flex flex-col">
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-2xl font-bold bg-gradient-to-r from-red-600 to-cyan-600 bg-clip-text text-transparent">
                Effective Marketer
              </a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="/ai-seo" class="text-gray-700 hover:text-red-600 transition-colors">AI SEO</a>
              <a href="/google-autosuggest-ranking" class="text-gray-700 hover:text-red-600 transition-colors">Autosuggest Ranking</a>
              <a href="/ai-topical-map" class="text-gray-700 hover:text-red-600 transition-colors">AI Topical Map</a>
              <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-red-600 transition-colors">AI Automation</a>
              <a href="/case-studies" class="text-gray-700 hover:text-red-600 transition-colors">Case Studies</a>
              <a href="/onboarding" class="bg-gradient-to-r from-red-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-cyan-600 transition-all duration-300">Get Started</a>
            </div>
          </div>
        </nav>
      </header>
      
      <main class="flex-grow">
        <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div class="space-y-6 lg:space-y-8">
                <div class="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                  <span class="text-primary-300 font-medium text-sm lg:text-base">Leading AI SEO Agency</span>
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Google <span class="text-primary-400">Autosuggests</span> & AI SEO Agency
                </h1>
                <p class="text-lg lg:text-xl text-white/90 max-w-2xl">
                  Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="https://calendly.com/effectivemarketer/demo" class="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                    Get Free AI SEO Demo
                  </a>
                  <a href="/case-studies" class="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 text-center">
                    View Case Studies
                  </a>
                </div>
              </div>
              
              <div class="relative mt-8 lg:mt-0">
                <div class="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 border border-primary-500/30">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-3xl font-bold text-white">298%</div>
                      <div class="text-primary-200 text-sm">Traffic Increase</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-3xl font-bold text-white">189%</div>
                      <div class="text-primary-200 text-sm">Lead Generation</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-3xl font-bold text-white">45+</div>
                      <div class="text-primary-200 text-sm">Keywords Ranked</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-3xl font-bold text-white">96%</div>
                      <div class="text-primary-200 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-16 lg:py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our <span class="bg-gradient-to-r from-red-600 to-cyan-600 bg-clip-text text-transparent">AI SEO</span> Services?
              </h2>
              <p class="text-xl text-gray-600 max-w-4xl mx-auto">
                We're not just another SEO agency. We're AI SEO specialists who understand how search is evolving with artificial intelligence. Our unique approach targets the future of search today.
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Next-Gen AI SEO Solutions</h3>
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Fast Results</h4>
                      <p class="text-gray-600">See improvements in 1-3 months, thanks to our advanced AI algorithms and proven strategies.</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">AI Platform Optimization</h4>
                      <p class="text-gray-600">Get your brand cited in ChatGPT, Gemini, and AI Overviews for maximum AI visibility.</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Google Autosuggest Domination</h4>
                      <p class="text-gray-600">Rank in Google Autocomplete suggestions for high-intent keywords and capture search traffic.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-br from-red-50 to-cyan-50 rounded-2xl p-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Our AI SEO Services</h4>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">Google Autocomplete optimization</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">AI platform citations (ChatGPT, Gemini, AI Overviews)</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">Advanced topical mapping</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">Competitive displacement strategies</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">Content optimization for AI</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-gray-700">Technical SEO for AI platforms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-2">
              <h3 class="text-xl font-bold mb-4">Effective Marketer</h3>
              <p class="text-gray-300 mb-4">Leading AI SEO agency specializing in Google Autosuggest optimization and AI platform visibility.</p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-300 hover:text-white">Twitter</a>
                <a href="#" class="text-gray-300 hover:text-white">LinkedIn</a>
                <a href="#" class="text-gray-300 hover:text-white">YouTube</a>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Services</h4>
              <ul class="space-y-2 text-gray-300">
                <li><a href="/ai-seo" class="hover:text-white">AI SEO</a></li>
                <li><a href="/google-autosuggest-ranking" class="hover:text-white">Autosuggest Ranking</a></li>
                <li><a href="/ai-topical-map" class="hover:text-white">AI Topical Map</a></li>
                <li><a href="/lead-gen-ai-automation" class="hover:text-white">AI Automation</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Company</h4>
              <ul class="space-y-2 text-gray-300">
                <li><a href="/case-studies" class="hover:text-white">Case Studies</a></li>
                <li><a href="/onboarding" class="hover:text-white">Get Started</a></li>
                <li><a href="#" class="hover:text-white">About</a></li>
                <li><a href="#" class="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  
  '/ai-seo-agency-usa': `
    <div class="min-h-screen flex flex-col">
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-2xl font-bold bg-gradient-to-r from-red-600 to-cyan-600 bg-clip-text text-transparent">
                Effective Marketer
              </a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="/ai-seo" class="text-gray-700 hover:text-red-600 transition-colors">AI SEO</a>
              <a href="/google-autosuggest-ranking" class="text-gray-700 hover:text-red-600 transition-colors">Autosuggest Ranking</a>
              <a href="/ai-topical-map" class="text-gray-700 hover:text-red-600 transition-colors">AI Topical Map</a>
              <a href="/lead-gen-ai-automation" class="text-gray-700 hover:text-red-600 transition-colors">AI Automation</a>
              <a href="/case-studies" class="text-gray-700 hover:text-red-600 transition-colors">Case Studies</a>
              <a href="/onboarding" class="bg-gradient-to-r from-red-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-cyan-600 transition-all duration-300">Get Started</a>
            </div>
          </div>
        </nav>
      </header>
      
      <main class="flex-grow">
        <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-16 lg:py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div class="space-y-6 lg:space-y-8">
                <div class="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-4 border border-primary-500/30">
                  <span class="text-primary-300 font-medium text-sm lg:text-base">Best AI SEO Agency in USA</span>
                </div>
                <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                  The #1 <span class="text-primary-400">AI SEO Agency</span> in USA
                </h1>
                <p class="text-lg text-white/90 mt-4">
                  Boost your US business traffic and sales with our unique AI SEO services for US companies. We're the only SEO agency offering this innovative Google Autosuggest solution for US businesses.
                  Get fast results — just 1 to 3 months is enough to start seeing a positive ROI on your US business.
                </p>
                <div class="pt-4">
                  <a href="https://calendly.com/effectivemarketer/demo" class="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get USA AI SEO Demo
                  </a>
                </div>
              </div>
              <div class="relative mt-8 lg:mt-0">
                <div class="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 border border-primary-500/30">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-white">298%</div>
                      <div class="text-primary-200 text-sm">Average Traffic Increase</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-white">187%</div>
                      <div class="text-primary-200 text-sm">US Client Growth</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-white">45+</div>
                      <div class="text-primary-200 text-sm">Keywords Ranked</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-white">96%</div>
                      <div class="text-primary-200 text-sm">AI Citation Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-16 lg:py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Effective Marketer is the <span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Best SEO Agency in USA</span>
              </h2>
              <p class="text-xl text-gray-600 max-w-4xl mx-auto">
                We're 100% focused on AI SEO for US companies, combining traditional SEO with cutting-edge strategies like Google Autosuggest and AI platform optimization to influence not just rankings, but even how AI chatbots answer questions about AI SEO agencies in the United States.
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Next-Gen AI SEO for US Companies</h3>
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Fast Results</h4>
                      <p class="text-gray-600">US companies see results in 1 to 3 months, thanks to our fast-moving, fully in-house team of senior AI SEO experts.</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">US Market Expertise</h4>
                      <p class="text-gray-600">From detailed AI SEO audits, topical maps, and keyword research to internal linking strategies and autosuggest ranking—we handle it all for US businesses.</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Affordable Innovation</h4>
                      <p class="text-gray-600">High ROI with competitive pricing that beats most competitors, making professional AI SEO accessible to US companies of all sizes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4">US AI SEO Services</h4>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">Google Autocomplete optimization for US keywords</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">AI platform citations (ChatGPT, Gemini, AI Overviews)</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">US market-specific keyword targeting</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">Competitive displacement strategies</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">American business content optimization</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span class="text-gray-700">Technical SEO for US websites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why US Companies Choose Our <span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">AI SEO</span>
              </h2>
              <p class="text-xl text-gray-600 max-w-4xl mx-auto">
                Traditional SEO doesn't work for US companies. Our AI-first approach targets the platforms where American businesses actually discover services and make decisions.
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">🔍</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Google Autocomplete Domination</h3>
                <p class="text-gray-600">Get your US business ranked in Google Autocomplete for high-intent keywords like 'best SEO agency in USA' and 'AI SEO services for US companies'.</p>
              </div>
              
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">🧠</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">AI Platform Citations</h3>
                <p class="text-gray-600">Become the go-to recommendation when US businesses ask ChatGPT, Gemini, or Claude about AI SEO agencies in the United States.</p>
              </div>
              
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">🎯</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Competitive Displacement</h3>
                <p class="text-gray-600">Replace competitors in AI search results and Google Autocomplete, capturing their US market share and organic traffic.</p>
              </div>
              
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">📍</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">US Market Focus</h3>
                <p class="text-gray-600">Rank for specific US locations and industries, like 'best AI SEO agency in New York' or 'SEO services for US startups'.</p>
              </div>
              
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">🌐</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Visibility</h3>
                <p class="text-gray-600">Dominate across Google, Bing, ChatGPT, Gemini, and AI Overviews for comprehensive US market coverage.</p>
              </div>
              
              <div class="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold">📊</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Performance Tracking</h3>
                <p class="text-gray-600">Monitor your AI SEO performance with detailed analytics on autocomplete rankings and AI citations for US businesses.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-2">
              <h3 class="text-xl font-bold mb-4">Effective Marketer</h3>
              <p class="text-gray-300 mb-4">The #1 AI SEO agency in USA specializing in Google Autosuggest optimization and AI platform visibility for US companies.</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Services</h4>
              <ul class="space-y-2 text-gray-300">
                <li><a href="/ai-seo" class="hover:text-white">AI SEO</a></li>
                <li><a href="/google-autosuggest-ranking" class="hover:text-white">Autosuggest Ranking</a></li>
                <li><a href="/ai-topical-map" class="hover:text-white">AI Topical Map</a></li>
                <li><a href="/lead-gen-ai-automation" class="hover:text-white">AI Automation</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Company</h4>
              <ul class="space-y-2 text-gray-300">
                <li><a href="/case-studies" class="hover:text-white">Case Studies</a></li>
                <li><a href="/onboarding" class="hover:text-white">Get Started</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `
};

// Function to generate full HTML with SEO and content
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
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#fff1f2',
              100: '#ffe4e6',
              200: '#fecdd3',
              300: '#fda4af',
              400: '#fb7185',
              500: '#f43f5e',
              600: '#e11d48',
              700: '#be123c',
              800: '#9f1239',
              900: '#881337',
            },
            secondary: {
              50: '#ecfeff',
              100: '#cffafe',
              200: '#a5f3fc',
              300: '#67e8f9',
              400: '#22d3ee',
              500: '#06b6d4',
              600: '#0891b2',
              700: '#0e7490',
              800: '#155e75',
              900: '#164e63',
            }
          }
        }
      }
    }
  </script>
</head>
<body>
  <div id="root">${content}</div>
</body>
</html>`;
}

// Generate static HTML files
console.log('🚀 Generating static HTML files with LONG beautiful content...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Generate HTML files for each route
Object.keys(seoData).forEach(route => {
  const seo = seoData[route];
  const content = pageContent[route] || pageContent['/'];
  const html = generateHTML(route, seo, content);
  
  let filename;
  if (route === '/') {
    filename = 'index.html';
  } else {
    // Create directory structure for nested routes
    const routePath = route.substring(1); // Remove leading slash
    const dirPath = path.join('dist', routePath);
    fs.mkdirSync(dirPath, { recursive: true });
    filename = path.join(dirPath, 'index.html');
  }
  
  fs.writeFileSync(filename, html);
  console.log(`✅ Generated: ${filename} (${Math.round(html.length / 1000)}KB of content)`);
});

console.log('🎉 Static HTML generation complete!');
console.log('📄 Each HTML file now contains the FULL beautiful React content in View Page Source!');
console.log('🔍 Google will see all the content when crawling your site!');
