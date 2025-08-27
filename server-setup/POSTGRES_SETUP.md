# PostgreSQL Database Setup

## Option 1: Reuse Existing Database (FREE - Save $6/month)

If you want to reuse your existing PostgreSQL database:

1. **Get your existing DATABASE_URL**:
   - Go to your Render dashboard
   - Find your existing PostgreSQL database
   - Copy the "External Database URL"

2. **Add Environment Variable**:
   - Go to your blog API web service on Render
   - Go to Environment tab
   - Add: `DATABASE_URL = your_existing_database_url`

3. **Deploy**: The code will automatically create tables with `blog_` prefix to avoid conflicts

**Tables created**: `blog_drafts`, `blog_published_posts`

---

## Option 2: Create New Database ($6/month)

If you want a separate database for the blog:

1. **Create PostgreSQL Database**:
   - On Render dashboard, click "New +"
   - Select "PostgreSQL"
   - Choose region (same as your web service)
   - Select plan ($6/month)
   - Create database

2. **Get DATABASE_URL**:
   - After creation, copy the "External Database URL"

3. **Add Environment Variable**:
   - Go to your blog API web service
   - Go to Environment tab  
   - Add: `DATABASE_URL = your_new_database_url`

4. **Deploy**: Tables will be created automatically

---

## Deployment Steps (Both Options):

1. **Commit changes**:
```bash
git add .
git commit -m "Add PostgreSQL database support"
git push
```

2. **Set Environment Variable**:
   - In Render web service → Environment tab
   - Add: `DATABASE_URL = your_database_url`

3. **Deploy**: Render will automatically:
   - Install `pg` dependency
   - Connect to database
   - Create tables on first run

## Verification:

After deployment, check logs for:
- "Database tables initialized successfully"
- No database connection errors

Your blog posts will now persist forever! 🎉

## My Recommendation:

- **Budget tight**: Option 1 (reuse existing)
- **Production blog**: Option 2 (separate database)