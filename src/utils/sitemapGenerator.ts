import { blogPosts } from '../data/blogPosts';
import { apiClient } from '../config/apiConfig';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SitemapData {
  staticPages: SitemapUrl[];
  blogPosts: SitemapUrl[];
  allUrls: SitemapUrl[];
}

// Static pages configuration
const STATIC_PAGES: SitemapUrl[] = [
  {
    loc: 'https://effectivemarketer.com/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: 'https://effectivemarketer.com/google-autosuggest-ranking',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: 'https://effectivemarketer.com/lead-gen-ai-automation',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: 'https://effectivemarketer.com/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: 'https://effectivemarketer.com/onboarding',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  }
];

// Generate sitemap data
export async function generateSitemapData(): Promise<SitemapData> {
  try {
    // Get published posts from API
    const publishedPosts = await apiClient.getPublishedPosts();
    
    // Combine static and API posts
    const allBlogPosts = [...blogPosts, ...publishedPosts];
    
    // Generate blog post URLs
    const blogPostUrls: SitemapUrl[] = allBlogPosts.map(post => ({
      loc: `https://effectivemarketer.com/blog/${post.slug}`,
      lastmod: post.publishDate || new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.6
    }));

    // Combine all URLs
    const allUrls = [...STATIC_PAGES, ...blogPostUrls];

    return {
      staticPages: STATIC_PAGES,
      blogPosts: blogPostUrls,
      allUrls
    };
  } catch (error) {
    console.error('Error generating sitemap data:', error);
    
    // Fallback to static posts only
    const blogPostUrls: SitemapUrl[] = blogPosts.map(post => ({
      loc: `https://effectivemarketer.com/blog/${post.slug}`,
      lastmod: post.publishDate || new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.6
    }));

    const allUrls = [...STATIC_PAGES, ...blogPostUrls];

    return {
      staticPages: STATIC_PAGES,
      blogPosts: blogPostUrls,
      allUrls
    };
  }
}

// Generate XML sitemap
export function generateSitemapXML(sitemapData: SitemapData): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = sitemapData.allUrls.map(url => {
    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}
${urlsetOpen}
${urlEntries}
${urlsetClose}`;
}

// Generate RSS feed
export function generateRSSFeed(sitemapData: SitemapData): string {
  const rssHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Effective Marketer Blog</title>
    <link>https://effectivemarketer.com</link>
    <description>AI SEO strategies, Google Autosuggest optimization, and lead generation insights</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://effectivemarketer.com/rss.xml" rel="self" type="application/rss+xml" />`;

  const rssFooter = `
  </channel>
</rss>`;

  const itemEntries = sitemapData.blogPosts.map(url => {
    // Extract post data from URL
    const slug = url.loc.split('/').pop();
    const post = [...blogPosts].find(p => p.slug === slug);
    
    if (!post) return '';
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url.loc}</link>
      <guid>${url.loc}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <category>${post.category}</category>
      <dc:creator>${post.author}</dc:creator>
    </item>`;
  }).filter(item => item !== '').join('');

  return `${rssHeader}${itemEntries}${rssFooter}`;
}

