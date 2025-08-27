import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://effective-marketer-dashobard.onrender.com/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaDescription: string;
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    console.log('🔍 Fetching published posts for RSS feed...');
    const response = await fetch(`${API_BASE_URL}/blog/published`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`📊 Found ${data.length} posts for RSS feed`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching published posts for RSS:', error);
    return [];
  }
}

export async function generateRSSFeed(): Promise<void> {
  try {
    console.log('🔄 Generating RSS feed...');
    
    const publishedPosts = await fetchPublishedPosts();
    
    let rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>Effective Marketer Blog</title>
    <atom:link href="https://effectivemarketer.com/rss.xml" rel="self" type="application/rss+xml" />
    <link>https://effectivemarketer.com/blog</link>
    <description>Expert insights on AI SEO, Google Autosuggest optimization, and advanced digital marketing strategies from Effective Marketer.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>https://effectivemarketer.com/logo.png</url>
      <title>Effective Marketer Blog</title>
      <link>https://effectivemarketer.com/blog</link>
      <width>600</width>
      <height>60</height>
    </image>`;

    publishedPosts.forEach(post => {
      // Clean content for RSS (remove markdown formatting)
      const cleanContent = post.content
        .replace(/^#{1,6}\s+/gm, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
        .replace(/`([^`]+)`/g, '$1') // Remove code
        .replace(/\n\n+/g, '\n') // Clean up multiple newlines
        .trim();

      const pubDate = new Date(post.publishDate).toUTCString();
      
      rssFeed += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://effectivemarketer.com/blog/${post.slug}</link>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${post.author}]]></dc:creator>
      <category><![CDATA[${post.category}]]></category>
      <guid isPermaLink="true">https://effectivemarketer.com/blog/${post.slug}</guid>
      <description><![CDATA[${post.metaDescription}]]></description>
      <content:encoded><![CDATA[<p>${post.excerpt}</p><p><a href="https://effectivemarketer.com/blog/${post.slug}">Read the full article</a></p>]]></content:encoded>
      <enclosure url="${post.featuredImage}" type="image/jpeg" length="0" />
    </item>`;
    });

    rssFeed += `
  </channel>
</rss>`;

    // Write RSS feed to public directory
    const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
    fs.writeFileSync(rssPath, rssFeed);
    console.log('✅ RSS feed generated successfully at:', rssPath);
    console.log(`📊 RSS feed contains ${publishedPosts.length} articles`);
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    throw error;
  }
}

// Allow running directly
generateRSSFeed().catch(console.error);
