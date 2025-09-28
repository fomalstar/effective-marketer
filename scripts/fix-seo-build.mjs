import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define all routes with their specific SEO data
const routes = [
  {
    path: '/',
    title: 'Google Autosuggests & AI SEO Agency - Effective Marketer',
    description: 'Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.',
    keywords: 'AI SEO agency, Google autosuggests optimization, AI SEO solutions, autosuggests ranking, Google Autocomplete optimization, AI SEO services, search suggestion optimization, ranking optimization, digital marketing agency, SEO agency, ChatGPT ranking, Gemini optimization, AI Overviews, generative engine optimization, GEO, AI platform visibility',
    canonical: 'https://effectivemarketer.com/'
  },
  {
    path: '/ai-seo-agency-usa',
    title: 'Best AI SEO Agency in USA | Effective Marketer',
    description: 'The #1 AI SEO agency in USA. We\'re 100% focused on AI SEO for US companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in USA, AI SEO agency USA, best SEO agency USA, USA AI SEO agency, AI SEO for US companies, best SEO company USA, USA SEO agency, AI SEO services USA',
    canonical: 'https://effectivemarketer.com/ai-seo-agency-usa'
  },
  {
    path: '/ai-seo-agency-vietnam',
    title: 'Best AI SEO Agency in Vietnam | Effective Marketer',
    description: 'The #1 AI SEO agency in Vietnam. We\'re 100% focused on AI SEO for Vietnamese companies, combining traditional SEO with Google Autosuggest and AI platform optimization. Fast results in 1-3 months.',
    keywords: 'best AI SEO agency in Vietnam, AI SEO agency Vietnam, best SEO agency Vietnam, Vietnam AI SEO agency, AI SEO for Vietnamese companies, best SEO company Vietnam, Vietnam SEO agency, AI SEO services Vietnam',
    canonical: 'https://effectivemarketer.com/ai-seo-agency-vietnam'
  },
  {
    path: '/google-autosuggest-ranking',
    title: 'Google Autosuggest Ranking Services | Effective Marketer',
    description: 'Get your brand ranked in Google Autocomplete suggestions. Our AI SEO experts help you dominate Google Autosuggest with proven strategies and fast results in 45-60 days.',
    keywords: 'Google Autosuggest ranking, Google Autocomplete optimization, autosuggest SEO, Google suggestions ranking, autocomplete SEO services, Google Autosuggest agency',
    canonical: 'https://effectivemarketer.com/google-autosuggest-ranking'
  },
  {
    path: '/ai-seo',
    title: 'AI SEO Services | Effective Marketer',
    description: 'Advanced AI SEO services including AI platform visibility, ChatGPT citations, Gemini optimization, and AI Overviews. Get cited by AI platforms and dominate AI search results.',
    keywords: 'AI SEO services, AI platform visibility, ChatGPT citations, Gemini optimization, AI Overviews, AI SEO agency, generative engine optimization, GEO',
    canonical: 'https://effectivemarketer.com/ai-seo'
  },
  {
    path: '/case-studies',
    title: 'AI SEO Case Studies | Effective Marketer',
    description: 'Real client success stories and proven AI SEO results. See how we helped companies achieve 298% traffic increase and 189% lead generation growth with AI SEO strategies.',
    keywords: 'AI SEO case studies, SEO success stories, AI SEO results, client testimonials, SEO agency portfolio, proven SEO results',
    canonical: 'https://effectivemarketer.com/case-studies'
  }
];

// Generate HTML template for each route
function generateHTML(route) {
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
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="${route.keywords}" />
    <link rel="canonical" href="${route.canonical}" />
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:image" content="https://effectivemarketer.com/og-image.jpg" />
    <meta property="og:site_name" content="Effective Marketer" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
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
    <div id="root"></div>
  </body>
</html>`;
}

// Generate static HTML files
function generateStaticPages() {
  const distPath = join(__dirname, '..', 'dist');
  
  console.log('🔧 Fixing SEO by generating proper static HTML files...\n');
  
  routes.forEach(route => {
    const html = generateHTML(route);
    let filePath;
    
    if (route.path === '/') {
      filePath = join(distPath, 'index.html');
    } else {
      const dirPath = join(distPath, route.path);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      filePath = join(dirPath, 'index.html');
    }
    
    writeFileSync(filePath, html);
    console.log(`✅ Generated: ${route.path} → ${route.title}`);
  });
  
  console.log(`\n🎉 SUCCESS: Generated ${routes.length} static HTML files with unique SEO data!`);
  console.log('\n📋 Next steps:');
  console.log('1. Upload the dist/ folder to your hosting provider');
  console.log('2. Each page will now show its unique title and meta tags');
  console.log('3. Search engines will properly index each page');
}

generateStaticPages();
