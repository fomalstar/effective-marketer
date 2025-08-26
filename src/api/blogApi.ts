import { BlogPost, defaultAuthor } from '../data/blogPosts';
import { createBlogPost, validateBlogPost } from '../utils/blogUtils';

// Extended interface for draft posts
export interface DraftBlogPost extends BlogPost {
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  source: 'manual' | 'n8n' | 'api';
  originalHtml?: string; // Store original HTML from n8n
}

// In-memory storage for drafts (in production, use a database)
let draftPosts: DraftBlogPost[] = [];
let publishedPosts: BlogPost[] = [];

// API endpoints for blog management
export class BlogAPI {
  
  // Webhook endpoint for n8n to submit new articles
  static async receiveFromN8N(data: {
    title: string;
    content: string; // HTML content from n8n
    category?: string;
    tags?: string[];
    featuredImage?: string;
    metaDescription?: string;
  }): Promise<{ success: boolean; draftId?: string; errors?: string[] }> {
    try {
      // Convert HTML to markdown (basic conversion)
      const markdownContent = this.htmlToMarkdown(data.content);
      
      // Validate required fields
      const errors = validateBlogPost({
        title: data.title,
        content: markdownContent,
        category: data.category || 'AI SEO Strategy',
        tags: data.tags || ['AI SEO'],
        featuredImage: data.featuredImage || 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200'
      });

      if (errors.length > 0) {
        return { success: false, errors };
      }

      // Create draft post
      const draftId = `draft_${Date.now()}`;
      const draftPost: DraftBlogPost = {
        ...createBlogPost({
          id: draftId,
          title: data.title,
          content: markdownContent,
          category: data.category || 'AI SEO Strategy',
          tags: data.tags || ['AI SEO'],
          featuredImage: data.featuredImage || 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200',
          metaDescription: data.metaDescription,
          featured: false
        }),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'n8n',
        originalHtml: data.content
      };

      draftPosts.push(draftPost);
      
      return { success: true, draftId };
      
    } catch (error) {
      console.error('Error processing n8n article:', error);
      return { success: false, errors: ['Internal server error'] };
    }
  }

  // Get all draft posts for admin review
  static getDrafts(): DraftBlogPost[] {
    return draftPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Get single draft by ID
  static getDraft(id: string): DraftBlogPost | null {
    return draftPosts.find(post => post.id === id) || null;
  }

  // Update draft post
  static updateDraft(id: string, updates: Partial<DraftBlogPost>): { success: boolean; errors?: string[] } {
    const draftIndex = draftPosts.findIndex(post => post.id === id);
    
    if (draftIndex === -1) {
      return { success: false, errors: ['Draft not found'] };
    }

    draftPosts[draftIndex] = {
      ...draftPosts[draftIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return { success: true };
  }

  // Publish draft (move from draft to published)
  static publishDraft(id: string): { success: boolean; errors?: string[] } {
    const draftIndex = draftPosts.findIndex(post => post.id === id);
    
    if (draftIndex === -1) {
      return { success: false, errors: ['Draft not found'] };
    }

    const draft = draftPosts[draftIndex];
    
    // Generate new ID for published post
    const publishedId = `pub_${Date.now()}`;
    
    // Create published post (remove draft-specific fields)
    const publishedPost: BlogPost = {
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
    
    // Remove from drafts
    draftPosts.splice(draftIndex, 1);

    return { success: true };
  }

  // Delete draft
  static deleteDraft(id: string): { success: boolean; errors?: string[] } {
    const draftIndex = draftPosts.findIndex(post => post.id === id);
    
    if (draftIndex === -1) {
      return { success: false, errors: ['Draft not found'] };
    }

    draftPosts.splice(draftIndex, 1);
    return { success: true };
  }

  // Get all published posts
  static getPublishedPosts(): BlogPost[] {
    return publishedPosts;
  }

  // Enhanced HTML to Markdown conversion
  private static htmlToMarkdown(html: string): string {
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
    
    // Convert images (handle both src-alt and alt-src orders)
    markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*alt=['"](.*?)['"][^>]*[^>]*>/gi, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*alt=['"](.*?)['"][^>]*src=['"](.*?)['"][^>]*[^>]*>/gi, '![$1]($2)');
    markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*>/gi, '![]($1)');
    
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
      return '\n' + listContent + '\n';
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
      return '\n' + listContent + '\n';
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
    markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n#])/g, '$1\n\n$2');
    
    // Clean up any remaining double spaces
    markdown = markdown.replace(/  +/g, ' ');
    
    return markdown;
  }
}

// Express.js route handlers (if using Express)
export const blogRoutes = {
  
  // POST /api/blog/webhook - n8n webhook endpoint
  webhook: async (req: any, res: any) => {
    try {
      const result = await BlogAPI.receiveFromN8N(req.body);
      
      if (result.success) {
        res.json({ 
          success: true, 
          message: 'Article received and saved as draft',
          draftId: result.draftId 
        });
      } else {
        res.status(400).json({ 
          success: false, 
          errors: result.errors 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  },

  // GET /api/blog/drafts - get all drafts
  getDrafts: (req: any, res: any) => {
    res.json(BlogAPI.getDrafts());
  },

  // GET /api/blog/drafts/:id - get single draft
  getDraft: (req: any, res: any) => {
    const draft = BlogAPI.getDraft(req.params.id);
    
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    
    res.json(draft);
  },

  // PUT /api/blog/drafts/:id - update draft
  updateDraft: (req: any, res: any) => {
    const result = BlogAPI.updateDraft(req.params.id, req.body);
    
    if (result.success) {
      res.json({ success: true, message: 'Draft updated' });
    } else {
      res.status(400).json({ success: false, errors: result.errors });
    }
  },

  // POST /api/blog/drafts/:id/publish - publish draft
  publishDraft: (req: any, res: any) => {
    const result = BlogAPI.publishDraft(req.params.id);
    
    if (result.success) {
      res.json({ success: true, message: 'Draft published' });
    } else {
      res.status(400).json({ success: false, errors: result.errors });
    }
  },

  // DELETE /api/blog/drafts/:id - delete draft
  deleteDraft: (req: any, res: any) => {
    const result = BlogAPI.deleteDraft(req.params.id);
    
    if (result.success) {
      res.json({ success: true, message: 'Draft deleted' });
    } else {
      res.status(404).json({ success: false, errors: result.errors });
    }
  }
};
