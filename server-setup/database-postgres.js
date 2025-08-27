const { Pool } = require('pg');

class BlogDatabase {
  constructor() {
    // Initialize PostgreSQL connection
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    this.init();
  }

  async init() {
    try {
      console.log('Initializing database connection...');
      
      // Test connection first
      await this.pool.query('SELECT NOW()');
      console.log('Database connection successful');
      
      // Create tables if they don't exist
      console.log('Creating blog_drafts table...');
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS blog_drafts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          author TEXT,
          author_role TEXT,
          author_image TEXT,
          publish_date TEXT,
          read_time TEXT,
          category TEXT,
          tags JSONB DEFAULT '[]'::jsonb,
          featured_image TEXT,
          meta_description TEXT,
          featured BOOLEAN DEFAULT false,
          status TEXT DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          source TEXT,
          original_html TEXT
        )
      `);

      console.log('Creating blog_published_posts table...');
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS blog_published_posts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          author TEXT,
          author_role TEXT,
          author_image TEXT,
          publish_date TEXT,
          read_time TEXT,
          category TEXT,
          tags JSONB DEFAULT '[]'::jsonb,
          featured_image TEXT,
          meta_description TEXT,
          featured BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database tables initialized successfully');
      
      // Verify tables exist
      const tablesResult = await this.pool.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_name IN ('blog_drafts', 'blog_published_posts')
      `);
      console.log('Tables found:', tablesResult.rows.map(r => r.table_name));
      
    } catch (error) {
      console.error('CRITICAL: Error initializing database:', error.message);
      console.error('Stack:', error.stack);
      throw error;
    }
  }

  // Draft methods
  async getAllDrafts() {
    const result = await this.pool.query(
      'SELECT * FROM blog_drafts ORDER BY created_at DESC'
    );
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      authorRole: row.author_role,
      authorImage: row.author_image,
      publishDate: row.publish_date,
      readTime: row.read_time,
      category: row.category,
      tags: row.tags || [],
      featuredImage: row.featured_image,
      metaDescription: row.meta_description,
      featured: row.featured,
      status: row.status,
      createdAt: row.created_at?.toISOString(),
      updatedAt: row.updated_at?.toISOString(),
      source: row.source,
      originalHtml: row.original_html
    }));
  }

  async getDraft(id) {
    const result = await this.pool.query(
      'SELECT * FROM blog_drafts WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      authorRole: row.author_role,
      authorImage: row.author_image,
      publishDate: row.publish_date,
      readTime: row.read_time,
      category: row.category,
      tags: row.tags || [],
      featuredImage: row.featured_image,
      metaDescription: row.meta_description,
      featured: row.featured,
      status: row.status,
      createdAt: row.created_at?.toISOString(),
      updatedAt: row.updated_at?.toISOString(),
      source: row.source,
      originalHtml: row.original_html
    };
  }

  async createDraft(draft) {
    await this.pool.query(`
      INSERT INTO blog_drafts (
        id, title, slug, excerpt, content, author, author_role, author_image,
        publish_date, read_time, category, tags, featured_image, meta_description,
        featured, status, created_at, updated_at, source, original_html
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    `, [
      draft.id, draft.title, draft.slug, draft.excerpt, draft.content,
      draft.author, draft.authorRole, draft.authorImage, draft.publishDate,
      draft.readTime, draft.category, JSON.stringify(draft.tags || []),
      draft.featuredImage, draft.metaDescription, draft.featured,
      draft.status, draft.createdAt, draft.updatedAt, draft.source, draft.originalHtml
    ]);
    
    return { success: true };
  }

  async updateDraft(id, updates) {
    try {
      console.log('updateDraft called with id:', id);
      console.log('updateDraft called with updates:', JSON.stringify(updates, null, 2));

      // First check if draft exists
      const existingDraft = await this.getDraft(id);
      if (!existingDraft) {
        return { success: false, error: 'Draft not found' };
      }

      // Build safe update query with proper field mapping and type checking
      const fields = [];
      const values = [];
      let paramIndex = 1;
      
      // Only update allowed fields
      const allowedFields = {
        'title': 'title',
        'content': 'content', 
        'category': 'category',
        'tags': 'tags',
        'authorRole': 'author_role',
        'authorImage': 'author_image',
        'publishDate': 'publish_date',
        'readTime': 'read_time',
        'featuredImage': 'featured_image',
        'metaDescription': 'meta_description',
        'featured': 'featured',
        'excerpt': 'excerpt',
        'slug': 'slug',
        'author': 'author'
      };
      
      Object.keys(updates).forEach(key => {
        if (!allowedFields[key]) {
          console.log('Skipping unknown field:', key);
          return;
        }

        const dbKey = allowedFields[key];
        let value = updates[key];

        // Handle special field types
        if (key === 'tags') {
          value = JSON.stringify(Array.isArray(value) ? value : []);
        } else if (key === 'featured') {
          value = Boolean(value);
        } else if (value === null || value === undefined) {
          value = null;
        }

        fields.push(`${dbKey} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      });

      if (fields.length === 0) {
        return { success: false, error: 'No valid fields to update' };
      }

      // Always update the updated_at timestamp
      fields.push(`updated_at = $${paramIndex}`);
      values.push(new Date().toISOString());
      paramIndex++;

      values.push(id);

      const query = `UPDATE blog_drafts SET ${fields.join(', ')} WHERE id = $${paramIndex}`;
      console.log('Executing query:', query);
      console.log('With values:', values);

      const result = await this.pool.query(query, values);

      console.log('Update result - rows affected:', result.rowCount);

      return {
        success: result.rowCount > 0,
        error: result.rowCount === 0 ? 'Draft not found' : null
      };
    } catch (error) {
      console.error('DETAILED ERROR updating draft:', {
        message: error.message,
        code: error.code,
        detail: error.detail,
        where: error.where,
        stack: error.stack
      });
      throw error;
    }
  }

  async deleteDraft(id) {
    const result = await this.pool.query(
      'DELETE FROM blog_drafts WHERE id = $1',
      [id]
    );

    return {
      success: result.rowCount > 0,
      error: result.rowCount === 0 ? 'Draft not found' : null
    };
  }

  // Published posts methods
  async getAllPublishedPosts() {
    const result = await this.pool.query(
      'SELECT * FROM blog_published_posts ORDER BY publish_date DESC'
    );
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      authorRole: row.author_role,
      authorImage: row.author_image,
      publishDate: row.publish_date,
      readTime: row.read_time,
      category: row.category,
      tags: row.tags || [],
      featuredImage: row.featured_image,
      metaDescription: row.meta_description,
      featured: row.featured
    }));
  }

  async getPublishedPost(id) {
    const result = await this.pool.query(
      'SELECT * FROM blog_published_posts WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      authorRole: row.author_role,
      authorImage: row.author_image,
      publishDate: row.publish_date,
      readTime: row.read_time,
      category: row.category,
      tags: row.tags || [],
      featuredImage: row.featured_image,
      metaDescription: row.meta_description,
      featured: row.featured
    };
  }

  async createPublishedPost(post) {
    await this.pool.query(`
      INSERT INTO blog_published_posts (
        id, title, slug, excerpt, content, author, author_role, author_image,
        publish_date, read_time, category, tags, featured_image, meta_description, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `, [
      post.id, post.title, post.slug, post.excerpt, post.content,
      post.author, post.authorRole, post.authorImage, post.publishDate,
      post.readTime, post.category, JSON.stringify(post.tags || []),
      post.featuredImage, post.metaDescription, post.featured
    ]);
    
    return { success: true };
  }

  async updatePublishedPost(id, updates) {
    try {
      // Build dynamic update query with proper field mapping
      const fields = [];
      const values = [];
      let paramIndex = 1;
      
      // Map frontend fields to database fields
      const fieldMap = {
        'title': 'title',
        'content': 'content', 
        'category': 'category',
        'tags': 'tags',
        'authorRole': 'author_role',
        'authorImage': 'author_image',
        'publishDate': 'publish_date',
        'readTime': 'read_time',
        'featuredImage': 'featured_image',
        'metaDescription': 'meta_description',
        'featured': 'featured',
        'excerpt': 'excerpt',
        'slug': 'slug',
        'author': 'author'
      };
      
      Object.keys(updates).forEach(key => {
        const dbKey = fieldMap[key] || key;
        if (key === 'tags') {
          fields.push(`${dbKey} = $${paramIndex}`);
          values.push(JSON.stringify(updates[key] || []));
        } else {
          fields.push(`${dbKey} = $${paramIndex}`);
          values.push(updates[key]);
        }
        paramIndex++;
      });

      values.push(id);

      console.log('Updating published post with query:', `UPDATE blog_published_posts SET ${fields.join(', ')} WHERE id = $${paramIndex}`);
      console.log('Values:', values);

      const result = await this.pool.query(
        `UPDATE blog_published_posts SET ${fields.join(', ')} WHERE id = $${paramIndex}`,
        values
      );

      return {
        success: result.rowCount > 0,
        error: result.rowCount === 0 ? 'Published post not found' : null
      };
    } catch (error) {
      console.error('Error updating published post:', error);
      throw error;
    }
  }

  async deletePublishedPost(id) {
    const result = await this.pool.query(
      'DELETE FROM blog_published_posts WHERE id = $1',
      [id]
    );

    return {
      success: result.rowCount > 0,
      error: result.rowCount === 0 ? 'Published post not found' : null
    };
  }

  // Publish a draft (move from drafts to published_posts)
  async publishDraft(draftId) {
    try {
      const draft = await this.getDraft(draftId);
      if (!draft) {
        return { success: false, error: 'Draft not found' };
      }

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

      await this.createPublishedPost(publishedPost);
      await this.deleteDraft(draftId);

      return { success: true, publishedId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  async close() {
    await this.pool.end();
  }
}

module.exports = BlogDatabase;