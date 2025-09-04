// Express.js server setup for blog API
// This file shows how to set up the server endpoints for your n8n integration

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BlogDatabase = require('./database-postgres');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
const db = new BlogDatabase();

// Utility functions (copy from your TypeScript files)
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateExcerpt = (content, maxLength = 200) => {
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n\n+/g, ' ')
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  return cleanContent.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

const htmlToMarkdown = (html) => {
  let markdown = html;
  
  // First, handle special containers (like table of contents) before processing other elements
  markdown = markdown.replace(/<div[^>]*>[\s]*<h4[^>]*>Table of Contents<\/h4>(.*?)<\/div>/gis, (match, content) => {
    return '\n## Table of Contents\n\n' + content + '\n\n';
  });
  
  // Convert headers with proper spacing (handle id attributes)
  markdown = markdown.replace(/<h1[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h1>/gi, '\n# $2 {#$1}\n\n');
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h2>/gi, '\n## $2 {#$1}\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h3>/gi, '\n### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h4>/gi, '\n#### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h5>/gi, '\n##### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h6>/gi, '\n###### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n\n');
  
  // Convert links BEFORE processing lists (so list item links work)
  markdown = markdown.replace(/<a[^>]*href=['"](.*?)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images (handle both src-alt and alt-src orders) with proper spacing
  markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*alt=['"](.*?)['"][^>]*[^>]*>/gi, '\n\n![$2]($1)\n\n');
  markdown = markdown.replace(/<img[^>]*alt=['"](.*?)['"][^>]*src=['"](.*?)['"][^>]*[^>]*>/gi, '\n\n![$1]($2)\n\n');
  markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*>/gi, '\n\n![]($1)\n\n');
  
  // Convert code elements (before processing other text formatting)
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '\n```\n$1\n```\n\n');
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert ordered lists (preserve nested structure)
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1;
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gis, (liMatch, liContent) => {
      // Clean up the list item content and preserve any formatting
      const cleanContent = liContent
        .replace(/^\s+|\s+$/g, '') // trim whitespace
        .replace(/\n+/g, ' '); // replace newlines with spaces
      return `${counter++}. ${cleanContent}\n`;
    });
    return '\n\n' + listContent + '\n';
  });
  
  // Convert unordered lists (preserve nested structure)  
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gis, (liMatch, liContent) => {
      // Clean up the list item content and preserve any formatting
      const cleanContent = liContent
        .replace(/^\s+|\s+$/g, '') // trim whitespace
        .replace(/\n+/g, ' '); // replace newlines with spaces
      return `- ${cleanContent}\n`;
    });
    return '\n\n' + listContent + '\n';
  });
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return '\n> ' + cleanContent.replace(/\n/g, '\n> ') + '\n\n';
  });
  
  // Convert paragraphs with proper spacing
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gis, '\n$1\n\n');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Convert tables
  markdown = markdown.replace(/<table[^>]*>(.*?)<\/table>/gis, (match, tableContent) => {
    let tableMarkdown = '\n';
    const rows = tableContent.match(/<tr[^>]*>(.*?)<\/tr>/gis) || [];
    
    rows.forEach((row, index) => {
      const cells = row.match(/<t[hd][^>]*>(.*?)<\/t[hd]>/gis) || [];
      const cellContent = cells.map(cell => 
        cell.replace(/<t[hd][^>]*>(.*?)<\/t[hd]>/gis, '$1')
           .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
           .trim()
      );
      
      if (cellContent.length > 0) {
        tableMarkdown += '| ' + cellContent.join(' | ') + ' |\n';
        
        // Add header separator after first row
        if (index === 0) {
          tableMarkdown += '|' + cellContent.map(() => ' --- ').join('|') + '|\n';
        }
      }
    });
    
    return tableMarkdown + '\n';
  });
  
  // Remove any remaining div, span, and other container tags
  markdown = markdown.replace(/<\/?(?:div|span|section|article|aside|nav|header|footer|main)[^>]*>/gi, '');
  
  // Clean up remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  markdown = markdown
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace and normalize spacing
  markdown = markdown
    .replace(/\n\s*\n\s*\n+/g, '\n\n') // Multiple newlines to double newlines
    .replace(/^\s+/gm, '') // Remove leading whitespace from lines
    .replace(/\s+$/gm, '') // Remove trailing whitespace from lines
    .replace(/\n\n\n+/g, '\n\n') // No more than 2 consecutive newlines
    .trim();
  
  // Ensure proper spacing after headers
  markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n#-])/g, '$1\n\n$2');
  
  // Ensure proper spacing before headers (except at start)
  markdown = markdown.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
  
  // Clean up any remaining double spaces
  markdown = markdown.replace(/  +/g, ' ');
  
  // Final cleanup to ensure consistent line breaks
  markdown = markdown.replace(/([.!?:])\n([A-Z#])/g, '$1\n\n$2');
  
  return markdown;
};

// ============================================
// API ROUTES
// ============================================

// POST /api/blog/webhook - n8n webhook endpoint
app.post('/api/blog/webhook', async (req, res) => {
  try {
    const { title, content, category, tags, featuredImage, metaDescription } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        errors: ['Title and content are required']
      });
    }

    // Convert HTML to markdown
    const markdownContent = htmlToMarkdown(content);
    
    // Create draft post
    const draftId = `draft_${Date.now()}`;
    const draftPost = {
      id: draftId,
      title: title,
      slug: generateSlug(title),
      excerpt: generateExcerpt(markdownContent),
      content: markdownContent,
      author: 'Steve',
      authorRole: 'SEO Director',
      authorImage: '/steve.jpg',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: calculateReadingTime(markdownContent),
      category: category || 'AI SEO Strategy',
      tags: tags || ['AI SEO'],
      featuredImage: featuredImage || 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200',
      metaDescription: metaDescription || generateExcerpt(markdownContent, 155),
      featured: false,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'n8n',
      originalHtml: content
    };

    await db.createDraft(draftPost);
    
    console.log(`New draft received: ${title} (ID: ${draftId})`);
    
    res.json({
      success: true,
      message: 'Article received and saved as draft',
      draftId: draftId,
      preview: {
        title: draftPost.title,
        slug: draftPost.slug,
        excerpt: draftPost.excerpt,
        readTime: draftPost.readTime
      }
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/blog/drafts - get all drafts
app.get('/api/blog/drafts', async (req, res) => {
  try {
    const drafts = await db.getAllDrafts();
    res.json(drafts);
  } catch (error) {
    console.error('Error getting drafts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/drafts/:id - get single draft
app.get('/api/blog/drafts/:id', async (req, res) => {
  try {
    const draft = await db.getDraft(req.params.id);
    
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    
    res.json(draft);
  } catch (error) {
    console.error('Error getting draft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/blog/drafts/:id - update draft
app.put('/api/blog/drafts/:id', async (req, res) => {
  try {
    console.log(`Updating draft ${req.params.id} with data:`, req.body);
    const result = await db.updateDraft(req.params.id, req.body);
    
    if (!result.success) {
      console.error('Draft update failed:', result.error);
      return res.status(404).json({ error: result.error });
    }
    
    console.log(`Draft ${req.params.id} updated successfully`);
    res.json({ success: true, message: 'Draft updated' });
  } catch (error) {
    console.error('Error updating draft:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/blog/drafts/:id/publish - publish draft
app.post('/api/blog/drafts/:id/publish', async (req, res) => {
  try {
    const result = await db.publishDraft(req.params.id);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    console.log(`Published article (ID: ${result.publishedId})`);
    
    // Log sitemap update notification
    console.log('📝 New blog post published - sitemap should be updated on next build');
    
    res.json({ 
      success: true, 
      message: 'Draft published and sitemap will be updated on next build', 
      publishedId: result.publishedId 
    });
  } catch (error) {
    console.error('Error publishing draft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/blog/drafts/:id - delete draft
app.delete('/api/blog/drafts/:id', async (req, res) => {
  try {
    const result = await db.deleteDraft(req.params.id);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    console.log(`Deleted draft (ID: ${req.params.id})`);
    res.json({ success: true, message: 'Draft deleted' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/published - get all published posts
app.get('/api/blog/published', async (req, res) => {
  try {
    const posts = await db.getAllPublishedPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error getting published posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/published/:id - get single published post
app.get('/api/blog/published/:id', async (req, res) => {
  try {
    const post = await db.getPublishedPost(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Published post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error getting published post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/blog/published/:id - update published post
app.put('/api/blog/published/:id', async (req, res) => {
  try {
    // Generate slug if title is being updated
    const updates = { ...req.body };
    if (updates.title) {
      updates.slug = generateSlug(updates.title);
    }
    
    const result = await db.updatePublishedPost(req.params.id, updates);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    console.log(`Updated published post (ID: ${req.params.id})`);
    res.json({ success: true, message: 'Published post updated' });
  } catch (error) {
    console.error('Error updating published post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/blog/published/:id - delete published post
app.delete('/api/blog/published/:id', async (req, res) => {
  try {
    const result = await db.deletePublishedPost(req.params.id);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    console.log(`Deleted published post (ID: ${req.params.id})`);
    res.json({ success: true, message: 'Published post deleted' });
  } catch (error) {
    console.error('Error deleting published post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const drafts = await db.getAllDrafts();
    const published = await db.getAllPublishedPosts();
    
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      drafts: drafts.length,
      published: published.length,
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      error: 'Database connection failed',
      details: error.message
    });
  }
});

// Dynamic sitemap endpoint
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    // Get all published posts from database
    const publishedPosts = await db.getAllPublishedPosts();
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://effectivemarketer.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/google-autosuggest-ranking</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/lead-gen-ai-automation</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/onboarding</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add dynamic blog posts
    publishedPosts.forEach(post => {
      sitemap += `
  <url>
    <loc>https://effectivemarketer.com/blog/${post.slug}</loc>
    <lastmod>${post.publish_date || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
    
    console.log(`📊 Sitemap generated with ${publishedPosts.length} blog posts`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// HTML generation functions
function generateBlogPostHTML(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - Effective Marketer</title>
    <meta name="description" content="${post.excerpt || post.title}">
    <meta name="author" content="${post.author || 'Steve'}">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://effectivemarketer.com/blog/${post.slug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt || post.title}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://effectivemarketer.com/blog/${post.slug}">
    <meta property="og:site_name" content="Effective Marketer">
    <meta property="og:image" content="${post.featured_image || 'https://effectivemarketer.com/googleautosuggests.jpg'}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.excerpt || post.title}">
    <meta name="twitter:image" content="${post.featured_image || 'https://effectivemarketer.com/googleautosuggests.jpg'}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${post.title}",
      "description": "${post.excerpt || post.title}",
      "author": {
        "@type": "Person",
        "name": "${post.author || 'Steve'}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Effective Marketer",
        "logo": {
          "@type": "ImageObject",
          "url": "https://effectivemarketer.com/e logo 2.png"
        }
      },
      "datePublished": "${post.publish_date}",
      "dateModified": "${post.updated_at || post.publish_date}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://effectivemarketer.com/blog/${post.slug}"
      },
      "url": "https://effectivemarketer.com/blog/${post.slug}",
      "image": "${post.featured_image || 'https://effectivemarketer.com/googleautosuggests.jpg'}"
    }
    </script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-gray-900">Effective Marketer</a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="/google-autosuggest-ranking" class="text-gray-600 hover:text-gray-900">AI SEO</a>
                    <a href="/lead-gen-ai-automation" class="text-gray-600 hover:text-gray-900">AI Lead Gen</a>
                    <a href="/blog" class="text-gray-600 hover:text-gray-900">Blog</a>
                    <a href="/contact" class="text-gray-600 hover:text-gray-900">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Breadcrumb -->
        <nav class="mb-8">
            <ol class="flex items-center space-x-2 text-sm text-gray-500">
                <li><a href="/" class="hover:text-gray-700">Home</a></li>
                <li>/</li>
                <li><a href="/blog" class="hover:text-gray-700">Blog</a></li>
                <li>/</li>
                <li class="text-gray-900">${post.title}</li>
            </ol>
        </nav>

        <!-- Article -->
        <article class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Featured Image -->
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="w-full h-64 object-cover">` : ''}
            
            <div class="p-8">
                <!-- Title -->
                <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
                
                <!-- Meta -->
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <span>By ${post.author || 'Steve'}</span>
                    <span>•</span>
                    <span>${new Date(post.publish_date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>${calculateReadingTime(post.content)}</span>
                </div>
                
                <!-- Content -->
                <div class="prose prose-lg max-w-none">
                    ${post.content.replace(/\n/g, '<br>')}
                </div>
            </div>
        </article>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

function generateBlogIndexHTML(posts) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Effective Marketer</title>
    <meta name="description" content="Latest insights on AI SEO, Google Autosuggest optimization, and lead generation automation.">
    <link rel="canonical" href="https://effectivemarketer.com/blog">
    <link rel="icon" type="image/png" href="/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-gray-900">Effective Marketer</a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="/google-autosuggest-ranking" class="text-gray-600 hover:text-gray-900">AI SEO</a>
                    <a href="/lead-gen-ai-automation" class="text-gray-600 hover:text-gray-900">AI Lead Gen</a>
                    <a href="/blog" class="text-gray-600 hover:text-gray-900">Blog</a>
                    <a href="/contact" class="text-gray-600 hover:text-gray-900">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p class="text-xl text-gray-600">Latest insights on AI SEO and marketing automation</p>
        </div>

        <!-- Blog Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${posts.map(post => `
            <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="w-full h-48 object-cover">` : ''}
                <div class="p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-3">
                        <a href="/blog/${post.slug}" class="hover:text-blue-600">${post.title}</a>
                    </h2>
                    <p class="text-gray-600 mb-4">${post.excerpt || post.title}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>By ${post.author || 'Steve'}</span>
                        <span>${new Date(post.publish_date).toLocaleDateString()}</span>
                    </div>
                </div>
            </article>
            `).join('')}
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

// Blog post serving endpoints
app.get('/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`🔍 Looking for blog post with slug: ${slug}`);
    
    // Get the blog post from database
    const result = await db.pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND status = $2',
      [slug, 'published']
    );
    
    console.log(`📊 Found ${result.rows.length} posts for slug: ${slug}`);
    
    if (result.rows.length === 0) {
      console.log(`❌ No published post found for slug: ${slug}`);
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Blog Post Not Found</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <p>Slug: ${slug}</p>
          <a href="/blog">← Back to Blog</a>
        </body>
        </html>
      `);
    }
    
    const post = result.rows[0];
    console.log(`✅ Found post: ${post.title}`);
    
    // Generate HTML for the blog post
    const html = generateBlogPostHTML(post);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
    
  } catch (error) {
    console.error('❌ Error serving blog post:', error);
    console.error('Error stack:', error.stack);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error Loading Blog Post</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1>Error Loading Blog Post</h1>
        <p>There was an error loading the blog post.</p>
        <p>Error: ${error.message}</p>
        <a href="/blog">← Back to Blog</a>
      </body>
      </html>
    `);
  }
});

// Blog post with .html extension
app.get('/blog/:slug.html', async (req, res) => {
  // Redirect to the clean URL
  res.redirect(301, `/blog/${req.params.slug}`);
});

// Blog index page
app.get('/blog', async (req, res) => {
  try {
    // Get all published posts
    const result = await db.pool.query(
      'SELECT * FROM blog_posts WHERE status = $1 ORDER BY publish_date DESC',
      ['published']
    );
    
    const posts = result.rows;
    const html = generateBlogIndexHTML(posts);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
    
  } catch (error) {
    console.error('Error serving blog index:', error);
    res.status(500).send('Error loading blog');
  }
});

// Blog debug endpoint
app.get('/api/blog/debug', async (req, res) => {
  try {
    // Get all blog posts
    const result = await db.pool.query('SELECT slug, title, status FROM blog_posts ORDER BY publish_date DESC');
    
    res.json({
      status: 'blog_debug',
      total_posts: result.rows.length,
      posts: result.rows.map(post => ({
        slug: post.slug,
        title: post.title,
        status: post.status
      }))
    });
  } catch (error) {
    res.status(500).json({
      status: 'blog_debug_error',
      error: error.message
    });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    // Check environment variables
    const hasDbUrl = !!process.env.DATABASE_URL;
    
    // Test database connection
    const dbTest = await db.pool.query('SELECT NOW() as current_time');
    
    // Check tables
    const tables = await db.pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_name LIKE 'blog_%'
    `);
    
    res.json({
      status: 'debug_info',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        hasDbUrl,
        dbUrlLength: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
      },
      database: {
        connected: true,
        currentTime: dbTest.rows[0].current_time,
        tables: tables.rows.map(r => r.table_name)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'debug_error',
      error: error.message,
      stack: error.stack
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog API server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/blog/webhook`);
  console.log(`Admin API: http://localhost:${PORT}/api/blog/drafts`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close();
  process.exit(0);
});
