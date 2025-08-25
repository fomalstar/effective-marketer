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
  
  // Convert headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1');
  
  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  
  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, '$1');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Clean up HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Clean up extra whitespace
  markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return markdown.trim();
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
