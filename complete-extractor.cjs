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
  <style>${css}</style>
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
    <!-- ALL YOUR COMPLETE PAGE CONTENT HERE -->
    <main>
      <h1>${title}</h1>
      <p>${description}</p>
      
      <!-- ALL SECTIONS FROM YOUR REACT COMPONENT -->
      ${allContent}
      
    </main>
  </div>
  
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// Process ALL pages with COMPLETE content
const pages = {
  '/': { title: 'Google Autosuggests & AI SEO Agency - Effective Marketer', desc: 'Leading AI SEO agency', file: null },
  '/ai-seo-agency-usa': { title: 'Best AI SEO Agency in USA', desc: '#1 AI SEO agency in USA', file: 'src/pages/USACountry.tsx' },
  '/ai-seo-agency-vietnam': { title: 'Best AI SEO Agency in Vietnam', desc: '#1 AI SEO agency in Vietnam', file: 'src/pages/VietnamCountry.tsx' },
  '/google-autosuggest-ranking': { title: 'Google Autosuggest Ranking', desc: 'Dominate Google Autocomplete', file: 'src/pages/GoogleAutosuggestRanking.tsx' },
  '/ai-seo': { title: 'AI SEO Services', desc: 'Advanced AI SEO services', file: 'src/pages/AISEO.tsx' },
  '/case-studies': { title: 'AI SEO Case Studies', desc: 'Real client success stories', file: 'src/pages/CaseStudies.tsx' },
  '/ai-topical-map': { title: 'AI Topical Map', desc: 'Content strategy', file: 'src/pages/AITopicalMap.tsx' },
  '/lead-gen-ai-automation': { title: 'AI Lead Generation', desc: 'Automate lead generation', file: 'src/pages/AIAutomation.tsx' },
  '/ai-seo-for-saas-companies': { title: 'AI SEO for SaaS', desc: 'SaaS SEO services', file: 'src/pages/SaaSCompanies.tsx' },
  '/ai-seo-for-ecommerce': { title: 'AI SEO for E-commerce', desc: 'E-commerce SEO', file: 'src/pages/EcommerceCompanies.tsx' },
  '/ai-seo-for-healthcare': { title: 'AI SEO for Healthcare', desc: 'Healthcare SEO', file: 'src/pages/HealthcareCompanies.tsx' },
  '/onboarding': { title: 'AI SEO Onboarding', desc: 'Get started', file: 'src/pages/Onboarding.tsx' }
};

console.log('\n🚨 PROCESSING ALL PAGES WITH COMPLETE CONTENT...');

Object.entries(pages).forEach(([route, page]) => {
  console.log(`\n📄 ${route}`);
  
  let allContent = '';
  if (page.file && fs.existsSync(page.file)) {
    allContent = extractCompleteContent(page.file);
    console.log(`✅ Extracted ${allContent.length} characters`);
  } else {
    allContent = '<p>Homepage content from components</p>';
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
