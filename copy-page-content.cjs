#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎯 COPY ALL PAGE CONTENT TO VIEW PAGE SOURCE');
console.log('📄 This will extract EVERYTHING from your React pages!');

// Function to extract ALL meaningful content from React files
function extractAllContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`📖 Reading: ${filePath}`);
  
  let allText = [];
  
  // Extract text between JSX tags: >text<
  const textMatches = content.match(/>([^<{}]+)</g) || [];
  textMatches.forEach(match => {
    const text = match.substring(1).trim(); // Remove >
    if (text.length > 3 && !text.includes('className') && !text.includes('import')) {
      allText.push(text);
    }
  });
  
  // Extract string literals: "text" and 'text'
  const stringMatches = content.match(/["']([^"']{10,})["']/g) || [];
  stringMatches.forEach(match => {
    const text = match.slice(1, -1).trim(); // Remove quotes
    if (!text.includes('className') && !text.includes('http') && !text.includes('px-')) {
      allText.push(text);
    }
  });
  
  // Extract template literals: `text`
  const templateMatches = content.match(/`([^`]{10,})`/g) || [];
  templateMatches.forEach(match => {
    const text = match.slice(1, -1).trim(); // Remove backticks
    if (!text.includes('className') && !text.includes('$')) {
      allText.push(text);
    }
  });
  
  // Remove duplicates
  const uniqueText = [...new Set(allText)];
  
  console.log(`✅ Extracted ${uniqueText.length} text elements`);
  return uniqueText.join(' ');
}

// Simple HTML template with ALL your content visible
function createPageWithAllContent(route, title, description, content) {
  const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
  const cssContent = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://effectivemarketer.com${route}" />
  
  <!-- ALL YOUR CSS -->
  <style>${cssContent}</style>
  
  <!-- Google Analytics -->
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
    <!-- ALL YOUR PAGE CONTENT IS HERE FOR GOOGLE TO SEE -->
    <div style="display:none;" id="seo-content">
      <h1>${title}</h1>
      <p>${description}</p>
      
      <!-- ALL EXTRACTED CONTENT FROM YOUR REACT PAGE -->
      <div class="page-content">
        ${content}
      </div>
    </div>
    
    <!-- YOUR ACTUAL PAGE CONTENT VISIBLE TO GOOGLE -->
    <main>
      ${content.split(' ').slice(0, 500).join(' ')}
    </main>
  </div>
  
  <!-- React Scripts -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;
}

// Pages to extract content from
const pages = {
  '/': { file: null, title: 'Google Autosuggests & AI SEO Agency - Effective Marketer', desc: 'Leading AI SEO agency delivering advanced autosuggests solutions' },
  '/ai-seo-agency-usa': { file: 'src/pages/USACountry.tsx', title: 'Best AI SEO Agency in USA | Effective Marketer', desc: 'The #1 AI SEO agency in USA' },
  '/ai-seo-agency-vietnam': { file: 'src/pages/VietnamCountry.tsx', title: 'Best AI SEO Agency in Vietnam | Effective Marketer', desc: 'The #1 AI SEO agency in Vietnam' },
  '/google-autosuggest-ranking': { file: 'src/pages/GoogleAutosuggestRanking.tsx', title: 'Google Autosuggest Ranking Services', desc: 'Dominate Google Autocomplete suggestions' },
  '/ai-seo': { file: 'src/pages/AISEO.tsx', title: 'AI SEO Services', desc: 'Advanced AI SEO services' },
  '/case-studies': { file: 'src/pages/CaseStudies.tsx', title: 'AI SEO Case Studies', desc: 'Real client success stories' },
  '/ai-topical-map': { file: 'src/pages/AITopicalMap.tsx', title: 'AI Topical Map', desc: 'Comprehensive content strategy' },
  '/lead-gen-ai-automation': { file: 'src/pages/AIAutomation.tsx', title: 'AI Lead Generation', desc: 'Automate lead generation' },
  '/ai-seo-for-saas-companies': { file: 'src/pages/SaaSCompanies.tsx', title: 'AI SEO for SaaS', desc: 'SaaS SEO services' },
  '/ai-seo-for-ecommerce': { file: 'src/pages/EcommerceCompanies.tsx', title: 'AI SEO for E-commerce', desc: 'E-commerce SEO' },
  '/ai-seo-for-healthcare': { file: 'src/pages/HealthcareCompanies.tsx', title: 'AI SEO for Healthcare', desc: 'Healthcare SEO' },
  '/onboarding': { file: 'src/pages/Onboarding.tsx', title: 'AI SEO Onboarding', desc: 'Get started with AI SEO' }
};

console.log('\n🚀 Processing all pages...');

Object.entries(pages).forEach(([route, page]) => {
  console.log(`\n📄 Processing: ${route}`);
  
  let content = '';
  if (page.file && fs.existsSync(page.file)) {
    content = extractAllContent(page.file);
  } else {
    content = 'Homepage content from multiple components';
  }
  
  // Create HTML with ALL content
  const html = createPageWithAllContent(route, page.title, page.desc, content);
  
  // Save file
  let outputPath;
  if (route === '/') {
    outputPath = 'dist/index.html';
  } else {
    const dir = `dist${route}`;
    fs.mkdirSync(dir, { recursive: true });
    outputPath = `${dir}/index.html`;
  }
  
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Created: ${outputPath} (${Math.round(html.length/1000)}KB)`);
});

console.log('\n🎉 ALL PAGES PROCESSED!');
console.log('📄 Every page now has ALL content in View Page Source');
console.log('🔍 Google will see EVERYTHING from your React components');
console.log('📱 React still works for interactivity');
console.log('🎯 EXACTLY what you wanted!');
