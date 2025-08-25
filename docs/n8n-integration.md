# n8n Blog Integration Guide

This guide explains how to integrate your n8n AI agent with the blog system to automatically create draft articles.

## 🚀 Quick Setup

### 1. Server Setup

First, set up the API server to receive webhooks from n8n:

```bash
# Install dependencies
npm install express cors body-parser

# Start the server
node server-setup/express-server.js
```

The server will run on `http://localhost:3001` with the following endpoints:

- `POST /api/blog/webhook` - n8n webhook endpoint
- `GET /api/blog/drafts` - Get all drafts
- `POST /api/blog/drafts/:id/publish` - Publish a draft
- `DELETE /api/blog/drafts/:id` - Delete a draft

### 2. n8n Workflow Configuration

#### Step 1: HTTP Request Node
Configure your n8n workflow to send a POST request to the webhook endpoint:

**URL:** `https://effective-marketer-dashobard.onrender.com/api/blog/webhook`
**Method:** `POST`
**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

#### Step 2: Request Body
Your n8n agent should send the following JSON structure:

```json
{
  "title": "Your Article Title",
  "content": "<h1>Your HTML Content</h1><p>Article content here...</p>",
  "category": "AI SEO Strategy",
  "tags": ["AI SEO", "Strategy", "Automation"],
  "featuredImage": "https://images.pexels.com/photos/image-id/image.jpeg",
  "metaDescription": "Brief description for SEO"
}
```

### 3. Admin Interface

Access the admin interface at `/blog-admin` to:
- Review draft articles
- Edit content before publishing
- Approve and publish articles
- Delete unwanted drafts

## 📋 Field Specifications

### Required Fields
- **title** (string): Article title
- **content** (string): HTML content that will be converted to markdown

### Optional Fields
- **category** (string): One of:
  - "AI SEO Strategy"
  - "Autocomplete SEO" 
  - "Lead Generation"
  - "Case Studies"
  - "Industry News"
- **tags** (array): Array of relevant tags
- **featuredImage** (string): URL to featured image
- **metaDescription** (string): SEO meta description

### Automatic Fields
These are automatically generated:
- **author**: "Steve"
- **authorRole**: "SEO Director" 
- **authorImage**: "/steve.jpg"
- **readTime**: Calculated from content length
- **slug**: Generated from title
- **excerpt**: Auto-generated from content
- **publishDate**: Current date
- **createdAt/updatedAt**: Timestamps

## 🔄 Complete n8n Workflow Example

### Node 1: AI Content Generation
Use your AI agent to generate article content:

```javascript
// Example n8n code node for content preparation
const article = {
  title: $input.first().json.generatedTitle,
  content: $input.first().json.htmlContent,
  category: "AI SEO Strategy",
  tags: $input.first().json.extractedTags,
  featuredImage: $input.first().json.selectedImage
};

return [{ json: article }];
```

### Node 2: HTTP Request to Webhook
Send the article to your blog API:

**URL:** `https://effective-marketer-dashobard.onrender.com/api/blog/webhook`
**Method:** `POST`
**Body:** `{{ $json }}`

### Node 3: Response Handling
Process the API response:

```javascript
// Example response handling
const response = $input.first().json;

if (response.success) {
  console.log(`Draft created: ${response.draftId}`);
  // Optionally send notification
} else {
  console.error('Error creating draft:', response.errors);
}

return [{ json: response }];
```

## 🛠️ Advanced Configuration

### Custom HTML to Markdown Conversion

The system automatically converts HTML to markdown, but you can customize this by modifying the `htmlToMarkdown` function in `server-setup/express-server.js`.

### Database Integration

For production use, replace the in-memory storage with a database:

```javascript
// Example with MongoDB
const mongoose = require('mongoose');

const DraftSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: { type: String, default: 'draft' },
  createdAt: { type: Date, default: Date.now }
  // ... other fields
});

const Draft = mongoose.model('Draft', DraftSchema);
```

### Authentication

Add authentication to protect your endpoints:

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (token !== `Bearer ${process.env.API_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

app.post('/api/blog/webhook', authenticateToken, (req, res) => {
  // ... webhook logic
});
```

## 📝 Testing Your Integration

### 1. Test Webhook Manually
```bash
curl -X POST https://effective-marketer-dashobard.onrender.com/api/blog/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "content": "<h1>Test</h1><p>This is a test article.</p>",
    "category": "AI SEO Strategy",
    "tags": ["test"]
  }'
```

### 2. Verify Draft Creation
```bash
curl https://effective-marketer-dashobard.onrender.com/api/blog/drafts
```

### 3. Test Publishing
```bash
curl -X POST https://effective-marketer-dashobard.onrender.com/api/blog/drafts/draft_123456789/publish
```

## 🔍 Monitoring & Logging

The server logs all activities:
- Draft creation
- Publishing events
- Errors and warnings

Check the console output for real-time monitoring.

## 🚨 Error Handling

Common error responses:

### 400 Bad Request
```json
{
  "success": false,
  "errors": ["Title and content are required"]
}
```

### 404 Not Found
```json
{
  "error": "Draft not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## 📈 Next Steps

1. **Set up the Express server** using the provided `express-server.js`
2. **Configure your n8n workflow** to use the webhook endpoint
3. **Test the integration** with a simple article
4. **Access the admin interface** to review and publish drafts
5. **Monitor the logs** to ensure everything works correctly

## 🔗 Related Files

- `src/api/blogApi.ts` - TypeScript API classes
- `src/pages/BlogAdmin.tsx` - Admin interface component
- `server-setup/express-server.js` - Express server setup
- `src/utils/blogUtils.ts` - Utility functions

For questions or issues, check the server logs and ensure all required fields are included in your n8n requests.
