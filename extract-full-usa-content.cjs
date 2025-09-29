#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 EXTRACTING FULL USA CONTENT: All text from USACountry.tsx');

// Read the USACountry.tsx file and extract ALL content
const usaFile = 'src/pages/USACountry.tsx';
const content = fs.readFileSync(usaFile, 'utf-8');

console.log('✅ Reading USACountry.tsx...');

// Extract all the text content between quotes and JSX
let extractedContent = [];

// Extract titles and descriptions from the features array
const featuresMatch = content.match(/features = \[(.*?)\]/s);
if (featuresMatch) {
  console.log('📋 Found features section');
  const featuresText = featuresMatch[1];
  
  // Extract feature titles and descriptions
  const titleMatches = featuresText.match(/title: ["']([^"']+)["']/g) || [];
  const descMatches = featuresText.match(/description: ["']([^"']+)["']/g) || [];
  
  titleMatches.forEach(match => {
    const title = match.replace(/title: ["']/, '').replace(/["']$/, '');
    extractedContent.push(`<h3>${title}</h3>`);
  });
  
  descMatches.forEach(match => {
    const desc = match.replace(/description: ["']/, '').replace(/["']$/, '');
    extractedContent.push(`<p>${desc}</p>`);
  });
}

// Extract all JSX text content
const jsxMatches = content.match(/>([^<{}]+)</g) || [];
jsxMatches.forEach(match => {
  const text = match.substring(1).trim();
  if (text.length > 5 && 
      !text.includes('className') && 
      !text.includes('onClick') &&
      !text.includes('{') &&
      !text.includes('}')) {
    
    // Determine if it's a heading or paragraph based on length and content
    if (text.length < 100 && 
        (text.includes('SEO') || text.includes('AI') || text.includes('Best') || 
         text.includes('USA') || text.includes('Agency') || text.includes('%'))) {
      extractedContent.push(`<h2>${text}</h2>`);
    } else {
      extractedContent.push(`<p>${text}</p>`);
    }
  }
});

// Extract all string literals that look like content
const stringMatches = content.match(/["']([^"']{20,})["']/g) || [];
stringMatches.forEach(match => {
  const text = match.slice(1, -1);
  if (!text.includes('className') && 
      !text.includes('text-') && 
      !text.includes('bg-') && 
      !text.includes('px-') && 
      !text.includes('py-') && 
      !text.includes('hover:') && 
      !text.includes('import') && 
      !text.includes('export') && 
      !text.includes('function') && 
      !text.includes('const') && 
      !text.includes('src/') && 
      !text.includes('http') &&
      text.split(' ').length > 3) {
    extractedContent.push(`<p>${text}</p>`);
  }
});

console.log(`📝 Extracted ${extractedContent.length} content pieces`);

// Remove duplicates
extractedContent = [...new Set(extractedContent)];

console.log(`📝 After removing duplicates: ${extractedContent.length} pieces`);

// Get CSS
const cssFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.css'));
const css = cssFiles.length > 0 ? fs.readFileSync(`dist/assets/${cssFiles[0]}`, 'utf-8') : '';

// Create the full HTML with EVERYTHING
const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Best AI SEO Agency in USA | Effective Marketer</title>
  <meta name="description" content="The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months." />
  <link rel="canonical" href="https://effectivemarketer.com/ai-seo-agency-usa" />
  
  <!-- Open Graph Tags -->
  <meta property="og:title" content="Best AI SEO Agency in USA | Effective Marketer" />
  <meta property="og:description" content="The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://effectivemarketer.com/ai-seo-agency-usa" />
  <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
  
  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Best AI SEO Agency in USA | Effective Marketer" />
  <meta name="twitter:description" content="The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months." />
  
  <!-- SEO Meta Tags -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="author" content="Effective Marketer" />
  
  <style>
    ${css}
    
    /* COMPLETELY HIDE SEO CONTENT */
    .seo-full-content {
      display: none !important;
      visibility: hidden !important;
      position: absolute !important;
      left: -10000px !important;
      top: -10000px !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
    }
    
    /* Control page loading */
    body {
      overflow: hidden;
    }
    
    body.react-loaded {
      overflow: visible;
    }
  </style>
  
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
    <!-- FULL USA CONTENT FOR SEO -->
    <div class="seo-full-content">
      <h1>Best AI SEO Agency in USA | Effective Marketer</h1>
      <p>The #1 AI SEO agency in USA. We're 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.</p>
      
      ${extractedContent.join('\n      ')}
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        document.body.classList.add('react-loaded');
      }, 100);
    });
  </script>
  
  <!-- React App Scripts -->
  <script type="module" crossorigin src="/assets/main-CNtjwS6O.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/main-Ci9Yw_6s.css">
</body>
</html>`;

// Create directory and save file
fs.mkdirSync('dist/ai-seo-agency-usa', { recursive: true });
fs.writeFileSync('dist/ai-seo-agency-usa/index.html', fullHTML);

console.log('✅ Generated USA page with FULL extracted content');
console.log(`📄 File size: ${Math.round(fullHTML.length/1000)}KB`);
console.log(`📝 Content pieces included: ${extractedContent.length}`);
console.log('🔥 ALL content from USACountry.tsx is now in view source!');

// Show sample of extracted content
console.log('\n📋 Sample extracted content:');
extractedContent.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. ${item.substring(0, 80)}...`);
});

console.log('\n🎉 DONE! View source will show ALL content!');
