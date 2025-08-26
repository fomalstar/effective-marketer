// Express.js server setup for blog API
// This file shows how to set up the server endpoints for your n8n integration

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
let draftPosts = [];
let publishedPosts = [];

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
  
  // Convert headers with proper spacing
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n\n');
  
  // Convert paragraphs with proper spacing
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n\n');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert ordered lists
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1;
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gi, (liMatch, liContent) => {
      return `${counter++}. ${liContent.trim()}\n`;
    });
    return '\n' + listContent + '\n';
  });
  
  // Convert unordered lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gi, (liMatch, liContent) => {
      return `- ${liContent.trim()}\n`;
    });
    return '\n' + listContent + '\n';
  });
  
  // Convert tables
  markdown = markdown.replace(/<table[^>]*>(.*?)<\/table>/gis, (match, tableContent) => {
    let tableMarkdown = '\n';
    const rows = tableContent.match(/<tr[^>]*>(.*?)<\/tr>/gis) || [];
    
    rows.forEach((row, index) => {
      const cells = row.match(/<t[hd][^>]*>(.*?)<\/t[hd]>/gis) || [];
      const cellContent = cells.map(cell => 
        cell.replace(/<t[hd][^>]*>(.*?)<\/t[hd]>/i, '$1').trim()
      );
      
      tableMarkdown += '| ' + cellContent.join(' | ') + ' |\n';
      
      // Add header separator after first row
      if (index === 0) {
        tableMarkdown += '|' + cellContent.map(() => ' --- ').join('|') + '|\n';
      }
    });
    
    return tableMarkdown + '\n';
  });
  
  // Convert links
  markdown = markdown.replace(/<a[^>]*href=['"](.*?)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images
  markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*alt=['"](.*?)['"][^>]*>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*alt=['"](.*?)['"][^>]*src=['"](.*?)['"][^>]*>/gi, '![$1]($2)');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
    return '\n> ' + content.trim().replace(/\n/g, '\n> ') + '\n\n';
  });
  
  // Convert code blocks
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '\n```\n$1\n```\n\n');
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Clean up remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Clean up extra whitespace and normalize spacing
  markdown = markdown
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple newlines to double newlines
    .replace(/^\s+/gm, '') // Remove leading whitespace from lines
    .replace(/\s+$/gm, '') // Remove trailing whitespace from lines
    .trim();
  
  // Ensure proper spacing after headers
  markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n])/g, '$1\n\n$2');
  
  return markdown;
};

// ============================================
// API ROUTES
// ============================================

// POST /api/blog/webhook - n8n webhook endpoint
app.post('/api/blog/webhook', (req, res) => {
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

    draftPosts.push(draftPost);
    
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
app.get('/api/blog/drafts', (req, res) => {
  const sortedDrafts = draftPosts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json(sortedDrafts);
});

// GET /api/blog/drafts/:id - get single draft
app.get('/api/blog/drafts/:id', (req, res) => {
  const draft = draftPosts.find(post => post.id === req.params.id);
  
  if (!draft) {
    return res.status(404).json({ error: 'Draft not found' });
  }
  
  res.json(draft);
});

// PUT /api/blog/drafts/:id - update draft
app.put('/api/blog/drafts/:id', (req, res) => {
  const draftIndex = draftPosts.findIndex(post => post.id === req.params.id);
  
  if (draftIndex === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }

  draftPosts[draftIndex] = {
    ...draftPosts[draftIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({ success: true, message: 'Draft updated' });
});

// POST /api/blog/drafts/:id/publish - publish draft
app.post('/api/blog/drafts/:id/publish', (req, res) => {
  const draftIndex = draftPosts.findIndex(post => post.id === req.params.id);
  
  if (draftIndex === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }

  const draft = draftPosts[draftIndex];
  
  // Create published post
  const publishedId = `pub_${Date.now()}`;
  const publishedPost = {
    id: publishedId,
    title: draft.title,
    slug: draft.slug,
    excerpt: draft.excerpt,
    content: draft.content,
    author: draft.author,
    authorRole: draft.authorRole,
    authorImage: draft.authorImage,
    publishDate: new Date().toISOString().split('T')[0],
    readTime: draft.readTime,
    category: draft.category,
    tags: draft.tags,
    featuredImage: draft.featuredImage,
    metaDescription: draft.metaDescription,
    featured: draft.featured
  };

  publishedPosts.push(publishedPost);
  draftPosts.splice(draftIndex, 1);

  console.log(`Published article: ${publishedPost.title} (ID: ${publishedId})`);

  res.json({ success: true, message: 'Draft published', publishedId });
});

// DELETE /api/blog/drafts/:id - delete draft
app.delete('/api/blog/drafts/:id', (req, res) => {
  const draftIndex = draftPosts.findIndex(post => post.id === req.params.id);
  
  if (draftIndex === -1) {
    return res.status(404).json({ error: 'Draft not found' });
  }

  const deleted = draftPosts.splice(draftIndex, 1)[0];
  console.log(`Deleted draft: ${deleted.title} (ID: ${deleted.id})`);

  res.json({ success: true, message: 'Draft deleted' });
});

// GET /api/blog/published - get all published posts
app.get('/api/blog/published', (req, res) => {
  const sortedPosts = publishedPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  res.json(sortedPosts);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    drafts: draftPosts.length,
    published: publishedPosts.length
  });
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
  process.exit(0);
});
