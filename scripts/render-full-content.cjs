#!/usr/bin/env node
/*
  Render routes in a headless browser and embed the fully rendered HTML
  into a non-rendered <template id="seo-content-full"> in their dist HTML files.

  During CI/Render builds there is no HTTP server already running, which used to
  cause noisy `net::ERR_CONNECTION_REFUSED` logs. We now spin up the production
  Express server automatically (unless an explicit RENDER_BASE_URL / BASE_URL is
  provided) and tear it down when we're done.
*/
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startLocalServer() {
  const explicitBase = process.env.RENDER_BASE_URL || process.env.SEO_RENDER_BASE_URL || process.env.BASE_URL;
  if (explicitBase) {
    return { child: null, baseUrl: explicitBase.replace(/\/$/, '') };
  }

  const port = process.env.SEO_RENDER_PORT || '3020';

  return await new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      ['server-setup/express-server.cjs'],
      {
        env: { ...process.env, PORT: port, NODE_ENV: 'production', SEO_AUTOMATION_MODE: 'build' },
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    let resolved = false;

    const timeout = setTimeout(() => {
      if (!resolved) {
        console.warn(`⚠️  Express server did not start within 8s, continuing without local server.`);
        resolved = true;
        resolve({ child: null, baseUrl: `http://localhost:${port}` });
      }
    }, 8000);

    const checkForReady = (data) => {
      const text = data.toString();
      if (!resolved && /Server running on port/i.test(text)) {
        clearTimeout(timeout);
        resolved = true;
        console.log(`✅ Spawned temporary SEO server on http://localhost:${port}`);
        resolve({ child, baseUrl: `http://localhost:${port}` });
      }
      process.stdout.write(text);
    };

    child.stdout.on('data', checkForReady);
    child.stderr.on('data', (data) => {
      if (!resolved) {
        const text = data.toString();
        if (/EADDRINUSE/i.test(text)) {
          console.warn(`⚠️  Port ${port} already in use, assuming server is running externally.`);
          clearTimeout(timeout);
          resolved = true;
          resolve({ child: null, baseUrl: `http://localhost:${port}` });
        }
      }
      process.stderr.write(data);
    });

    child.on('exit', (code) => {
      if (!resolved) {
        clearTimeout(timeout);
        resolved = true;
        console.warn(`⚠️  Express server exited early (code ${code}). Continuing without local server.`);
        resolve({ child: null, baseUrl: `http://localhost:${port}` });
      }
    });
  });
}

function stopLocalServer(child) {
  if (!child) return;
  child.kill('SIGTERM');
}

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

  const { child, baseUrl } = await startLocalServer();
  const normalizedBase = baseUrl.replace(/\/$/, '');

  // Give the server a moment to finish warming (esp. in CI)
  await delay(400);

  console.log('🚀 Launching headless browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);

  for (const route of routes) {
    const url = normalizedBase + route;
    try {
      console.log(`🌐 Rendering ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      // Wait for app to mark itself as loaded
      try {
        await page.waitForSelector('body.react-loaded', { timeout: 8000 });
      } catch (_) {
        await delay(1500);
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
        await delay(1500);
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
  stopLocalServer(child);
  console.log('🎯 Full rendered content embedding complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


