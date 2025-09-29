#!/usr/bin/env node
/*
  Render routes in a headless browser and embed the fully rendered HTML
  into a non-rendered <template id="seo-content-full"> in their dist HTML files.
*/
const fs = require('fs');
const path = require('path');

async function main() {
  const puppeteer = require('puppeteer');

  const routes = [
    '/',
    '/ai-seo-agency-usa',
    '/ai-seo-agency-vietnam',
    '/google-autosuggest-ranking',
    '/ai-seo',
    '/case-studies',
    '/ai-topical-map',
    '/lead-gen-ai-automation',
    '/ai-seo-for-saas-companies',
    '/ai-seo-for-ecommerce',
    '/ai-seo-for-healthcare',
    '/onboarding'
  ];

  // Ensure server is running at http://localhost:3001
  const baseUrl = process.env.RENDER_BASE_URL || 'http://localhost:3001';

  console.log('🚀 Launching headless browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  for (const route of routes) {
    const url = baseUrl + route;
    try {
      console.log(`🌐 Rendering ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      // Wait for app to mark itself as loaded
      try {
        await page.waitForSelector('body.react-loaded', { timeout: 8000 });
      } catch (_) {
        await page.waitForTimeout(1500);
      }
      // Scroll to bottom to trigger any lazy content
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let total = 0;
          const step = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.scrollingElement || document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight || total > 20) return resolve();
            window.scrollBy(0, clientHeight);
            total++;
            setTimeout(step, 150);
          };
          step();
        });
      });
      // Wait until the app actually renders substantial content
      try {
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            return !!root && (root.innerText || '').replace(/\s+/g, ' ').length > 4000;
          },
          { timeout: 15000 }
        );
      } catch (_) {
        // Fallback small delay
        await page.waitForTimeout(1500);
      }

      const innerHTML = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root ? root.innerHTML : '';
      });

      if (!innerHTML) {
        console.warn(`⚠️ Empty #root HTML for ${route}`);
        continue;
      }

      const distPath = route === '/' ? path.join('dist', 'index.html') : path.join('dist', route.slice(1), 'index.html');
      if (!fs.existsSync(distPath)) {
        console.warn(`⚠️ dist file not found: ${distPath}`);
        continue;
      }

      let html = fs.readFileSync(distPath, 'utf-8');
      // Prefer updating existing seo-content template if present
      if (/id=\"seo-content\"/.test(html)) {
        html = html.replace(/(<template id=\"seo-content\">)[\s\S]*?(<\/template>)/, `$1\n${innerHTML}\n  $2`);
      } else {
        const templateBlock = `\n  <!-- FULL RENDERED HTML FOR VIEW-SOURCE -->\n  <template id=\"seo-content\">\n${innerHTML}\n  </template>\n`;
        if (html.includes('<div id=\"root\"></div>')) {
          html = html.replace('<div id=\"root\"></div>', `<div id=\"root\"></div>${templateBlock}`);
        } else {
          html = html.replace('</body>', `${templateBlock}\n</body>`);
        }
      }

      fs.writeFileSync(distPath, html);
      console.log(`✅ Embedded full rendered HTML into: ${distPath}`);
    } catch (err) {
      console.error(`❌ Failed ${route}:`, err.message);
    }
  }

  await browser.close();
  console.log('🎯 Full rendered content embedding complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


