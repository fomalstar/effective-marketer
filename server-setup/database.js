const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class BlogDatabase {
  constructor() {
    // Use a persistent database file
    const dbPath = path.join(__dirname, 'blog.db');
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  init() {
    // Create tables if they don't exist
    this.db.serialize(() => {
      // Drafts table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS drafts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          author TEXT,
          authorRole TEXT,
          authorImage TEXT,
          publishDate TEXT,
          readTime TEXT,
          category TEXT,
          tags TEXT, -- JSON string
          featuredImage TEXT,
          metaDescription TEXT,
          featured INTEGER DEFAULT 0,
          status TEXT DEFAULT 'draft',
          createdAt TEXT,
          updatedAt TEXT,
          source TEXT,
          originalHtml TEXT
        )
      `);

      // Published posts table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS published_posts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          author TEXT,
          authorRole TEXT,
          authorImage TEXT,
          publishDate TEXT,
          readTime TEXT,
          category TEXT,
          tags TEXT, -- JSON string
          featuredImage TEXT,
          metaDescription TEXT,
          featured INTEGER DEFAULT 0
        )
      `);
    });
  }

  // Draft methods
  getAllDrafts() {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM drafts ORDER BY createdAt DESC',
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const drafts = rows.map(row => ({
              ...row,
              tags: JSON.parse(row.tags || '[]'),
              featured: !!row.featured
            }));
            resolve(drafts);
          }
        }
      );
    });
  }

  getDraft(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM drafts WHERE id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (!row) {
            resolve(null);
          } else {
            resolve({
              ...row,
              tags: JSON.parse(row.tags || '[]'),
              featured: !!row.featured
            });
          }
        }
      );
    });
  }

  createDraft(draft) {
    return new Promise((resolve, reject) => {
      const {
        id, title, slug, excerpt, content, author, authorRole, authorImage,
        publishDate, readTime, category, tags, featuredImage, metaDescription,
        featured, status, createdAt, updatedAt, source, originalHtml
      } = draft;

      this.db.run(`
        INSERT INTO drafts (
          id, title, slug, excerpt, content, author, authorRole, authorImage,
          publishDate, readTime, category, tags, featuredImage, metaDescription,
          featured, status, createdAt, updatedAt, source, originalHtml
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, title, slug, excerpt, content, author, authorRole, authorImage,
        publishDate, readTime, category, JSON.stringify(tags || []), featuredImage,
        metaDescription, featured ? 1 : 0, status, createdAt, updatedAt, source, originalHtml
      ], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  updateDraft(id, updates) {
    return new Promise((resolve, reject) => {
      // Build dynamic update query
      const fields = [];
      const values = [];
      
      Object.keys(updates).forEach(key => {
        if (key === 'tags') {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(updates[key] || []));
        } else if (key === 'featured') {
          fields.push(`${key} = ?`);
          values.push(updates[key] ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push(updates[key]);
        }
      });

      fields.push('updatedAt = ?');
      values.push(new Date().toISOString());
      values.push(id);

      this.db.run(
        `UPDATE drafts SET ${fields.join(', ')} WHERE id = ?`,
        values,
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            resolve({ success: false, error: 'Draft not found' });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  }

  deleteDraft(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM drafts WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve({ success: false, error: 'Draft not found' });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  // Published posts methods
  getAllPublishedPosts() {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM published_posts ORDER BY publishDate DESC',
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const posts = rows.map(row => ({
              ...row,
              tags: JSON.parse(row.tags || '[]'),
              featured: !!row.featured
            }));
            resolve(posts);
          }
        }
      );
    });
  }

  getPublishedPost(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM published_posts WHERE id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (!row) {
            resolve(null);
          } else {
            resolve({
              ...row,
              tags: JSON.parse(row.tags || '[]'),
              featured: !!row.featured
            });
          }
        }
      );
    });
  }

  createPublishedPost(post) {
    return new Promise((resolve, reject) => {
      const {
        id, title, slug, excerpt, content, author, authorRole, authorImage,
        publishDate, readTime, category, tags, featuredImage, metaDescription, featured
      } = post;

      this.db.run(`
        INSERT INTO published_posts (
          id, title, slug, excerpt, content, author, authorRole, authorImage,
          publishDate, readTime, category, tags, featuredImage, metaDescription, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, title, slug, excerpt, content, author, authorRole, authorImage,
        publishDate, readTime, category, JSON.stringify(tags || []), featuredImage,
        metaDescription, featured ? 1 : 0
      ], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  updatePublishedPost(id, updates) {
    return new Promise((resolve, reject) => {
      // Build dynamic update query
      const fields = [];
      const values = [];
      
      Object.keys(updates).forEach(key => {
        if (key === 'tags') {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(updates[key] || []));
        } else if (key === 'featured') {
          fields.push(`${key} = ?`);
          values.push(updates[key] ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push(updates[key]);
        }
      });

      values.push(id);

      this.db.run(
        `UPDATE published_posts SET ${fields.join(', ')} WHERE id = ?`,
        values,
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            resolve({ success: false, error: 'Published post not found' });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  }

  deletePublishedPost(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM published_posts WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve({ success: false, error: 'Published post not found' });
        } else {
          resolve({ success: true });
        }
      });
    });
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

  close() {
    this.db.close();
  }
}

module.exports = BlogDatabase;