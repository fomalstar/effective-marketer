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

  // Basic HTML to Markdown conversion
  private static htmlToMarkdown(html: string): string {
    let markdown = html;
    
    // Convert headers
    markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1');
    markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1');
    markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1');
    markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1');
    markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1');
    markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1');
    
    // Convert paragraphs
    markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    
    // Convert bold and italic
    markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    
    // Convert lists
    markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, '$1');
    markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, '$1');
    markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1');
    
    // Convert line breaks
    markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
    
    // Clean up HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '');
    
    // Clean up extra whitespace
    markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
    markdown = markdown.trim();
    
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
