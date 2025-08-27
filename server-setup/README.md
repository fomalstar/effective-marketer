# Blog API Server Setup

This server provides persistent storage for your blog posts using SQLite database.

## Installation

1. Navigate to the server-setup directory:
```bash
cd server-setup
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will run on port 3001 (or the PORT environment variable if set).

## Database

The server uses SQLite database (`blog.db`) for persistent storage. The database file will be created automatically when the server starts.

### Tables:
- `drafts` - Draft blog posts
- `published_posts` - Published blog posts

## API Endpoints

- `POST /api/blog/webhook` - Webhook endpoint for n8n
- `GET /api/blog/drafts` - Get all drafts
- `GET /api/blog/drafts/:id` - Get single draft
- `PUT /api/blog/drafts/:id` - Update draft
- `POST /api/blog/drafts/:id/publish` - Publish draft
- `DELETE /api/blog/drafts/:id` - Delete draft
- `GET /api/blog/published` - Get all published posts
- `GET /api/blog/published/:id` - Get single published post
- `PUT /api/blog/published/:id` - Update published post
- `DELETE /api/blog/published/:id` - Delete published post
- `GET /api/health` - Health check

## Deployment to Render

1. Commit all changes to your repository
2. Deploy to Render
3. The database file (`blog.db`) will persist between deployments

## Data Migration

If you have existing drafts/published posts in JSON files, you can migrate them by:
1. Starting the server locally
2. Using the webhook endpoint to recreate the posts
3. Or writing a migration script

## Environment Variables

- `PORT` - Server port (default: 3001)