#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚨 COMPLETE EXTRACTOR: Get ALL sections in View Page Source');

// Function to extract COMPLETE content from React files
function extractCompleteContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract EVERYTHING - all text content
  let allContent = [];
  
  // Get ALL text between JSX tags
  const jsxText = content.match(/>([^<{}]+)</g) || [];
  jsxText.forEach(match => {
    const text = match.substring(1).trim();
    if (text.length > 2) {
      allContent.push(text);
    }
  });
  
  // Get ALL string literals
  const strings = content.match(/["']([^"']{5,})["']/g) || [];
  strings.forEach(match => {
    const text = match.slice(1, -1);
    if (!text.includes('className') && !text.includes('http') && !text.includes('px-')) {
      allContent.push(text);
    }
  });
  
  // Return ALL content as HTML sections
  return allContent.map(text => `<p>${text}</p>`).join('\n');
}

// Generate complete HTML with ALL content visible
function generateCompleteHTML(route, title, description, allContent) {
  const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
  const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  <style>
    ${css}
    /* Hide SEO content from users but keep visible to Google */
    .seo-content {
      position: absolute !important;
      left: -10000px !important;
      top: auto !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
    }
  </style>
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
    <!-- SEO CONTENT - HIDDEN FROM USERS BUT VISIBLE TO GOOGLE -->
    <div class="seo-content">
      <h1>${title}</h1>
      <p>${description}</p>
      ${allContent}
    </div>
  </div>
  
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// Function to extract homepage content from components
function extractHomepageContent() {
  const homepageContent = `
    <h1>Google Autosuggests & AI SEO Agency - Effective Marketer</h1>
    <p>Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.</p>
    
    <h2>Why Choose Our AI SEO Services?</h2>
    <p>We're not just another SEO agency. We're AI SEO specialists who understand how search is evolving with artificial intelligence. Our unique approach targets the future of search today.</p>
    
    <h3>Next-Gen AI SEO Solutions</h3>
    <h4>Fast Results</h4>
    <p>See improvements in 1-3 months, thanks to our advanced AI algorithms and proven strategies.</p>
    
    <h4>AI Platform Optimization</h4>
    <p>Get your brand cited in ChatGPT, Gemini, and AI Overviews for maximum AI visibility.</p>
    
    <h4>Google Autosuggest Domination</h4>
    <p>Rank in Google Autocomplete suggestions for high-intent keywords and capture search traffic.</p>
    
    <h2>Our AI SEO Services</h2>
    <ul>
      <li>Google Autocomplete optimization</li>
      <li>AI platform citations (ChatGPT, Gemini, AI Overviews)</li>
      <li>Advanced topical mapping</li>
      <li>Competitive displacement strategies</li>
      <li>Lead generation automation</li>
      <li>Technical SEO audits</li>
    </ul>
    
    <h2>Our Team of AI SEO Experts</h2>
    <p>Meet our team of senior AI SEO specialists who deliver cutting-edge strategies and fast results for your business.</p>
    
    <h2>Proven Case Studies</h2>
    <p>See how we've helped companies achieve massive traffic growth and lead generation success with our AI SEO strategies.</p>
    
    <h2>Get Started Today</h2>
    <p>Ready to dominate search results and AI platforms? Book your free consultation and discover how our AI SEO services can transform your business.</p>
  `;
  return homepageContent;
}

// Process ALL pages with COMPLETE content
const pages = {
  '/': { title: 'Google Autosuggests & AI SEO Agency - Effective Marketer', desc: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete', file: 'homepage' },
  '/ai-seo-agency-usa': { title: 'Best AI SEO Agency in USA | Effective Marketer', desc: '#1 AI SEO agency in USA. Fast results in 1-3 months', file: 'src/pages/USACountry.tsx' },
  '/ai-seo-agency-vietnam': { title: 'Best AI SEO Agency in Vietnam | Effective Marketer', desc: '#1 AI SEO agency in Vietnam. Fast results in 1-3 months', file: 'src/pages/VietnamCountry.tsx' },
  '/google-autosuggest-ranking': { title: 'Google Autosuggest Ranking Services | Effective Marketer', desc: 'Dominate Google Autocomplete suggestions with our proven strategies', file: 'src/pages/GoogleAutosuggestRanking.tsx' },
  '/ai-seo': { title: 'AI SEO Services & Solutions | Effective Marketer', desc: 'Advanced AI SEO services including ChatGPT citations and AI platform optimization', file: 'src/pages/AISEO.tsx' },
  '/case-studies': { title: 'AI SEO Case Studies & Success Stories | Effective Marketer', desc: 'Real client success stories and proven AI SEO results', file: 'src/pages/CaseStudies.tsx' },
  '/ai-topical-map': { title: 'AI Topical Map & Content Strategy | Effective Marketer', desc: 'Comprehensive AI topical mapping and content strategy services', file: 'src/pages/AITopicalMap.tsx' },
  '/lead-gen-ai-automation': { title: 'AI Lead Generation & Automation | Effective Marketer', desc: 'Automate your lead generation with AI-powered solutions', file: 'src/pages/AIAutomation.tsx' },
  '/ai-seo-for-saas-companies': { title: 'AI SEO for SaaS Companies | Effective Marketer', desc: 'Specialized AI SEO services for SaaS companies and software businesses', file: 'src/pages/SaaSCompanies.tsx' },
  '/ai-seo-for-ecommerce': { title: 'AI SEO for E-commerce | Effective Marketer', desc: 'Boost your e-commerce sales with AI SEO and Google Autocomplete optimization', file: 'src/pages/EcommerceCompanies.tsx' },
  '/ai-seo-for-healthcare': { title: 'AI SEO for Healthcare & Medical | Effective Marketer', desc: 'Specialized AI SEO for healthcare providers and medical practices', file: 'src/pages/HealthcareCompanies.tsx' },
  '/onboarding': { title: 'AI SEO Onboarding & Consultation | Effective Marketer', desc: 'Get started with AI SEO through our comprehensive onboarding process', file: 'src/pages/Onboarding.tsx' },
  '/ai-seo-agency-location': { title: 'AI SEO Agency Location Services | Effective Marketer', desc: 'Local AI SEO services for businesses worldwide', file: 'src/pages/LocationPage.tsx' }
};

console.log('\n🚨 PROCESSING ALL PAGES WITH COMPLETE CONTENT...');

Object.entries(pages).forEach(([route, page]) => {
  console.log(`\n📄 ${route}`);
  
  let allContent = '';
  if (page.file === 'homepage') {
    // Special handling for homepage
    allContent = extractHomepageContent();
    console.log(`✅ Generated homepage content: ${allContent.length} characters`);
  } else if (page.file && fs.existsSync(page.file)) {
    allContent = extractCompleteContent(page.file);
    console.log(`✅ Extracted ${allContent.length} characters`);
  } else {
    allContent = '<p>Page content not found</p>';
    console.log(`⚠️ File not found: ${page.file}`);
  }
  
  const html = generateCompleteHTML(route, page.title, page.desc, allContent);
  
  // Save
  let outputPath;
  if (route === '/') {
    outputPath = 'dist/index.html';
  } else {
    const dir = `dist${route}`;
    fs.mkdirSync(dir, { recursive: true });
    outputPath = `${dir}/index.html`;
  }
  
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Saved: ${outputPath} (${Math.round(html.length/1000)}KB)`);
});

console.log('\n🎉 COMPLETE! ALL PAGES NOW HAVE FULL CONTENT!');
console.log('📄 Every section visible in View Page Source');
console.log('💰 No more money lost - Google sees EVERYTHING!');
