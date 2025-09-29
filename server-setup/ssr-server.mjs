import fs from 'node:fs/promises'
import express from 'express'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
let templateHtml = ''
let ssrManifest = undefined

if (isProduction) {
  try {
    templateHtml = await fs.readFile('../dist/client/index.html', 'utf-8')
    ssrManifest = await fs.readFile('../dist/client/.vite/ssr-manifest.json', 'utf-8')
    console.log('✅ Production assets loaded successfully')
  } catch (error) {
    console.error('❌ Error loading production assets:', error.message)
    process.exit(1)
  }
}

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
        } else {
          const compression = (await import('compression')).default
          const sirv = (await import('sirv')).default
          app.use(compression())
          app.use(base, sirv('../dist/client', { extensions: [] }))
        }

// Serve HTML - use a more compatible route pattern
app.use((req, res, next) => {
  // Skip API routes and static files
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next()
  }
  
  // Handle all other routes for SSR
  handleSSR(req, res).catch(next)
})

async function handleSSR(req, res) {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
            if (!isProduction) {
              // Always read fresh template in development
              template = await fs.readFile('../index.html', 'utf-8')
              template = await vite.transformIndexHtml(url, template)
              render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
            } else {
              template = templateHtml
              render = (await import('../dist/server/entry-server.js')).render
            }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--ssr-outlet-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})