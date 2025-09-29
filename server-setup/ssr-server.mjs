import fs from 'node:fs/promises'
import express from 'express'
import { cwd } from 'process'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

console.log('📁 SSR Server working directory:', cwd())

// Cached production assets
let templateHtml = ''
let ssrManifest = undefined

if (isProduction) {
  try {
    // Try different path combinations to find the dist directory
    const possiblePaths = [
      './dist/client/index.html',
      '../dist/client/index.html',
      './server-setup/../dist/client/index.html',
      '../src/dist/client/index.html',
      './src/dist/client/index.html'
    ]
    
    let templatePath = null
    let manifestPath = null
    
    for (const path of possiblePaths) {
      try {
        await fs.access(path)
        templatePath = path
        manifestPath = path.replace('index.html', '.vite/ssr-manifest.json')
        console.log('✅ Found template at:', path)
        break
      } catch (e) {
        console.log('❌ Not found:', path)
      }
    }
    
    if (!templatePath) {
      throw new Error('Could not find dist/client/index.html in any expected location')
    }
    
    templateHtml = await fs.readFile(templatePath, 'utf-8')
    ssrManifest = await fs.readFile(manifestPath, 'utf-8')
    console.log('✅ Production assets loaded successfully')
  } catch (error) {
    console.error('❌ Error loading production assets:', error.message)
    console.log('📁 Checking if dist directory exists...')
    
    // List current directory contents
    try {
      const currentContents = await fs.readdir('.')
      console.log('📁 Current directory contents:', currentContents)
    } catch (e) {
      console.log('❌ Error reading current directory:', e.message)
    }
    
    // Check for dist in different locations
    const distLocations = ['./dist', '../dist', './server-setup/../dist', './src/dist', '../src/dist']
    for (const location of distLocations) {
      try {
        const exists = await fs.access(location).then(() => true).catch(() => false)
        if (exists) {
          console.log('📁 Found dist at:', location)
          const distContents = await fs.readdir(location)
          console.log('📁 Dist contents:', distContents)
        } else {
          console.log('❌ No dist at:', location)
        }
      } catch (e) {
        console.log('❌ Error checking:', location, e.message)
      }
    }
    
    console.log('💡 Make sure your Render build command is: npm install && npm run sitemap && npm run build && npm run indexnow')
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
          app.use(base, sirv('./dist/client', { extensions: [] }))
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