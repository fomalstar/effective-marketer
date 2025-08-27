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
    res.json({ success: true, message: 'Draft published', publishedId: result.publishedId });
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
      published: published.length
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Database connection failed'
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
