import fs from 'fs';
import path from 'path';

// Import the API client (we'll need to adapt it for Node.js)
const API_BASE_URL = 'https://effective-marketer-dashobard.onrender.com/api';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  publishDate?: string;
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    console.log('🔍 Fetching published posts from:', `${API_BASE_URL}/blog/published`);
    const response = await fetch(`${API_BASE_URL}/blog/published`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('📊 API Response:', data);
    return data as BlogPost[];
  } catch (error) {
    console.error('❌ Error fetching published posts:', error);
    return [];
  }
}

export async function generateSitemap(): Promise<void> {
  try {
    console.log('🔄 Generating sitemap...');
    
    // Get all published posts
    const publishedPosts = await fetchPublishedPosts();
    console.log(`📝 Found ${publishedPosts.length} published posts`);
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://effectivemarketer.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/google-autosuggest-ranking</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/lead-gen-ai-automation</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://effectivemarketer.com/onboarding</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add dynamic blog posts
    publishedPosts.forEach((post: BlogPost) => {
      console.log(`📄 Adding blog post to sitemap: ${post.slug}`);
      sitemap += `
  <url>
            <loc>https://effectivemarketer.com/blog/${post.slug}</loc>
    <lastmod>${post.publishDate || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Write to public directory
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log(`📊 Total URLs in sitemap: ${5 + publishedPosts.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  }
}

// Allow running directly
generateSitemap().catch(console.error);
