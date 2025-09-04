import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog post template function
function blogPostTemplate(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-scale=1.0">
    <title>${post.title} - Effective Marketer</title>
    <meta name="description" content="${post.excerpt || post.title}">
    <meta name="author" content="Steve">
    <meta name="robots" content="index, follow">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://effectivemarketer.com/blog/${post.slug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt || post.title}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://effectivemarketer.com/blog/${post.slug}">
    <meta property="og:site_name" content="Effective Marketer">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.excerpt || post.title}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${post.title}",
        "description": "${post.excerpt || post.title}",
        "author": {
            "@type": "Person",
            "name": "Steve"
        },
        "datePublished": "${post.publishDate || post.publishedAt || new Date().toISOString()}",
        "dateModified": "${new Date().toISOString()}",
        "publisher": {
            "@type": "Organization",
            "name": "Effective Marketer",
            "logo": {
                "@type": "ImageObject",
                "url": "https://effectivemarketer.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://effectivemarketer.com/blog/${post.slug}"
        },
        "url": "https://effectivemarketer.com/blog/${post.slug}",
        "articleSection": "${post.category || 'Digital Marketing'}",
        "keywords": "${post.tags ? post.tags.join(', ') : 'SEO, Digital Marketing, AI'}",
        "image": "${post.featuredImage && post.featuredImage !== '/images/ai-seo.jpg' && post.featuredImage !== '/images/autosuggest.jpg' ? post.featuredImage : 'https://effectivemarketer.com/googleautosuggests.jpg'}"
    }
    </script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/assets/index-BmiY7FIp.css">
    <link rel="icon" type="image/png" href="/favicon.png">
</head>
<body>
    <div id="root">
        <!-- Header -->
        <header class="bg-gray-900 text-white">
            <nav class="container mx-auto px-4 py-6">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold">Effective Marketer</div>
                    <div class="hidden md:flex space-x-6">
                        <a href="/" class="hover:text-blue-400">Home</a>
                        <a href="/ai-seo" class="hover:text-blue-400">AI SEO</a>
                        <a href="/lead-gen-ai-automation" class="hover:text-blue-400">AI Lead Gen</a>
                        <a href="/blog" class="hover:text-blue-400">Blog</a>
                        <a href="/contact" class="hover:text-blue-400">Contact</a>
                    </div>
                    <a href="https://dash.effectivemarketer.com" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
                        <span class="mr-2">📊</span>Dashboard
                    </a>
                </div>
            </nav>
        </header>

        <!-- Breadcrumb -->
        <nav class="bg-gray-100 py-4">
            <div class="container mx-auto px-4">
                <ol class="flex items-center space-x-2 text-sm text-gray-600">
                    <li><a href="/" class="hover:text-blue-600">Home</a></li>
                    <li><span class="mx-2">/</span></li>
                    <li><a href="/blog" class="hover:text-blue-600">Blog</a></li>
                    <li><span class="mx-2">/</span></li>
                    <li class="text-gray-900">${post.title}</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <article class="max-w-4xl mx-auto">
                <!-- Article Header -->
                <header class="mb-8">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
                    
                    <!-- Author and Meta -->
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="flex items-center space-x-3">
                            <img src="/steve.jpg" alt="Steve" class="w-12 h-12 rounded-full">
                            <div>
                                <div class="font-semibold text-gray-900">Steve</div>
                                <div class="text-sm text-gray-600">${post.publishDate ? new Date(post.publishDate).toLocaleDateString() : new Date().toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div class="text-sm text-gray-500">
                            📖 ${post.readTime || Math.ceil((post.content || '').split(' ').length / 200)} min read
                        </div>
                    </div>

                    <!-- Featured Image -->
                    ${post.featuredImage && post.featuredImage !== '/images/ai-seo.jpg' && post.featuredImage !== '/images/autosuggest.jpg' ? 
                      `<img src="${post.featuredImage}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-6">` : 
                      `<img src="/googleautosuggests.jpg" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-6">`}
                    
                    <!-- Excerpt -->
                    ${post.excerpt ? `<p class="text-xl text-gray-600 mb-6">${post.excerpt}</p>` : ''}
                </header>

                <!-- Table of Contents -->
                <div class="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 class="text-xl font-semibold mb-4">Table of Contents</h2>
                    <nav class="space-y-2">
                        ${generateTableOfContents(post.content)}
                    </nav>
                </div>

                <!-- Article Content -->
                <div class="prose prose-lg max-w-none">
                    ${post.content || 'Content coming soon...'}
                </div>

                <!-- Article Footer -->
                <footer class="mt-12 pt-8 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600">Share:</span>
                            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://effectivemarketer.com/blog/${post.slug}`)}" class="text-blue-500 hover:text-blue-600">Twitter</a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://effectivemarketer.com/blog/${post.slug}`)}" class="text-blue-500 hover:text-blue-600">LinkedIn</a>
                        </div>
                        <div class="text-sm text-gray-600">
                            Category: <span class="font-medium">${post.category || 'Digital Marketing'}</span>
                        </div>
                    </div>
                </footer>
            </article>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <!-- Scripts -->
    <script type="module" src="/assets/index-BRSRj_7p.js"></script>
</body>
</html>`;
}

// Generate table of contents from content
function generateTableOfContents(content) {
  if (!content) return '<p>No content available</p>';
  
  // Simple heading extraction (you can enhance this)
  const headings = content.match(/<h[2-6][^>]*>(.*?)<\/h[2-6]>/g) || [];
  
  if (headings.length === 0) return '<p>No headings found</p>';
  
  return headings.map((heading, index) => {
    const level = heading.match(/<h([2-6])/)[1];
    const text = heading.replace(/<[^>]*>/g, '');
    const indent = (level - 2) * 20;
    
    return `<a href="#heading-${index}" class="block hover:text-blue-600" style="padding-left: ${indent}px">${text}</a>`;
  }).join('');
}

// Generate blog index page
function generateBlogIndex(posts) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-scale=1.0">
    <title>Blog - Effective Marketer</title>
    <meta name="description" content="Latest insights on AI SEO, digital marketing, and automation strategies.">
    <link rel="canonical" href="https://effectivemarketer.com/blog">
    <link rel="stylesheet" href="/assets/index-BmiY7FIp.css">
</head>
<body>
    <div id="root">
        <header class="bg-gray-900 text-white">
            <nav class="container mx-auto px-4 py-6">
                <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold">Effective Marketer</div>
                    <div class="hidden md:flex space-x-6">
                        <a href="/" class="hover:text-blue-400">Home</a>
                        <a href="/ai-seo" class="hover:text-blue-400">AI SEO</a>
                        <a href="/lead-gen-ai-automation" class="hover:text-blue-400">AI Lead Gen</a>
                        <a href="/blog" class="hover:text-blue-400">Blog</a>
                        <a href="/contact" class="hover:text-blue-400">Contact</a>
                    </div>
                    <a href="https://dash.effectivemarketer.com" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
                        <span class="mr-2">📊</span>Dashboard
                    </a>
                </div>
            </nav>
        </header>

        <main class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-center mb-12">Blog</h1>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${posts.map(post => `
                <article class="bg-white rounded-lg shadow-lg overflow-hidden">
                    ${post.featuredImage && post.featuredImage !== '/images/ai-seo.jpg' && post.featuredImage !== '/images/autosuggest.jpg' ? 
                      `<img src="${post.featuredImage}" alt="${post.title}" class="w-full h-48 object-cover">` : 
                      `<img src="/googleautosuggests.jpg" alt="${post.title}" class="w-full h-48 object-cover">`}
                    <div class="p-6">
                        <h2 class="text-xl font-semibold mb-3">
                            <a href="/blog/${post.slug}" class="hover:text-blue-600">${post.title}</a>
                        </h2>
                        <p class="text-gray-600 mb-4">${post.excerpt || 'Read more about this topic...'}</p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span>${post.category || 'Digital Marketing'}</span>
                            <span>${post.publishDate ? new Date(post.publishDate).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </article>
                `).join('')}
            </div>
        </main>

        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
            </div>
        </footer>
    </div>
</body>
</html>`;
}

// Main function to generate static blog posts
async function generateStaticBlogs() {
  try {
    console.log('🚀 Starting static blog generation...');
    
    // Create blog directory if it doesn't exist (in dist for production, public for development)
    const isProduction = process.env.NODE_ENV === 'production';
    const blogDir = isProduction 
      ? path.join(__dirname, '../dist/blog')
      : path.join(__dirname, '../public/blog');
    
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
      console.log(`✅ Created blog directory: ${blogDir}`);
    }
    
    // Also create files in root dist directory for Render compatibility
    const rootDir = isProduction 
      ? path.join(__dirname, '../dist')
      : path.join(__dirname, '../public');

    // Fetch blog posts from API (same as sitemap generation)
    let blogPosts = [];
    
    try {
      console.log('🔍 Fetching published posts from API...');
      const response = await fetch('https://effective-marketer-dashobard.onrender.com/api/blog/published');
      const apiPosts = await response.json();
      
      if (Array.isArray(apiPosts) && apiPosts.length > 0) {
        blogPosts = apiPosts;
        console.log(`📚 Found ${blogPosts.length} published posts from API`);
      } else {
        throw new Error('No posts found in API response');
      }
    } catch (apiError) {
      console.log('⚠️ API fetch failed, falling back to local data...');
      
      // Fallback to local data
      const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
      try {
        // Read and parse the blog posts file
        const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');
        
        // Extract the blogPosts array using regex - look for the array content
        const match = blogPostsContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
        if (match) {
          console.log('📚 Found blogPosts array, parsing...');
          // Convert the string to actual data (simple approach)
          const postsString = match[1]
            .replace(/'/g, '"')
            .replace(/(\w+):/g, '"$1":')
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
          
          try {
            blogPosts = JSON.parse(postsString);
            console.log(`📚 Successfully parsed ${blogPosts.length} blog posts`);
          } catch (parseError) {
            console.log('⚠️ JSON parsing failed, using fallback approach');
            // Fallback: manually create posts from the content
            blogPosts = [
              {
                id: '1',
                title: 'AI SEO Automation Complete Guide',
                slug: 'ai-seo-automation-complete-guide',
                excerpt: 'Learn how to automate your SEO processes with AI tools and strategies.',
                content: '<h2>Introduction to AI SEO</h2><p>AI is revolutionizing how we approach SEO...</p><h2>Key Benefits</h2><p>Automation saves time and improves results...</p>',
                category: 'AI SEO',
                tags: ['AI', 'SEO', 'Automation'],
                publishDate: '2024-01-15T00:00:00Z',
                featuredImage: '/images/ai-seo.jpg'
              },
              {
                id: '2',
                title: 'Google Autosuggest SEO Strategies',
                slug: 'google-autosuggest-seo-strategies',
                excerpt: 'Master the art of ranking in Google Autosuggest for maximum visibility.',
                content: '<h2>Understanding Autosuggest</h2><p>Google Autosuggest is a powerful feature...</p><h2>Optimization Techniques</h2><p>Here are proven strategies...</p>',
                category: 'SEO',
                tags: ['Google', 'Autosuggest', 'SEO'],
                publishDate: '2024-01-20T00:00:00Z',
                featuredImage: '/images/autosuggest.jpg'
              }
            ];
          }
        } else {
          console.log('⚠️ Could not find blogPosts array, using fallback data');
          blogPosts = [
            {
              id: '1',
              title: 'AI SEO Automation Complete Guide',
              slug: 'ai-seo-automation-complete-guide',
              excerpt: 'Learn how to automate your SEO processes with AI tools and strategies.',
              content: '<h2>Introduction to AI SEO</h2><p>AI is revolutionizing how we approach SEO...</p><h2>Key Benefits</h2><p>Automation saves time and improves results...</p>',
              category: 'AI SEO',
              tags: ['AI', 'SEO', 'Automation'],
              publishDate: '2024-01-15T00:00:00Z',
              featuredImage: '/images/ai-seo.jpg'
            },
            {
              id: '2',
              title: 'Google Autosuggest SEO Strategies',
              slug: 'google-autosuggest-seo-strategies',
              excerpt: 'Master the art of ranking in Google Autosuggest for maximum visibility.',
              content: '<h2>Understanding Autosuggest</h2><p>Google Autosuggest is a powerful feature...</p><h2>Optimization Techniques</h2><p>Here are proven strategies...</p>',
              category: 'SEO',
              tags: ['Google', 'Autosuggest', 'SEO'],
              publishDate: '2024-01-20T00:00:00Z',
              featuredImage: '/images/autosuggest.jpg'
            }
          ];
        }
      } catch (error) {
        console.log('⚠️ Could not parse blog posts, using sample data');
        // Fallback to sample posts
        blogPosts = [
          {
            id: '1',
            title: 'AI SEO Automation Complete Guide',
            slug: 'ai-seo-automation-complete-guide',
            excerpt: 'Learn how to automate your SEO processes with AI tools and strategies.',
            content: '<h2>Introduction to AI SEO</h2><p>AI is revolutionizing how we approach SEO...</p><h2>Key Benefits</h2><p>Automation saves time and improves results...</p>',
            category: 'AI SEO',
            tags: ['AI', 'SEO', 'Automation'],
            publishDate: '2024-01-15T00:00:00Z',
            featuredImage: '/images/ai-seo.jpg'
          },
          {
            id: '2',
            title: 'Google Autosuggest SEO Strategies',
            slug: 'google-autosuggest-seo-strategies',
            excerpt: 'Master the art of ranking in Google Autosuggest for maximum visibility.',
            content: '<h2>Understanding Autosuggest</h2><p>Google Autosuggest is a powerful feature...</p><h2>Optimization Techniques</h2><p>Here are proven strategies...</p>',
            category: 'SEO',
            tags: ['Google', 'Autosuggest', 'SEO'],
            publishDate: '2024-01-20T00:00:00Z',
            featuredImage: '/images/autosuggest.jpg'
          }
        ];
      }
    }

    // Generate HTML for each blog post in root directory (Render compatibility)
    let generatedCount = 0;
    for (const post of blogPosts) {
      const html = blogPostTemplate(post);
      // Generate in root directory with original slug for clean URLs
      const fileName = `${post.slug}.html`;
      const filePath = path.join(rootDir, fileName);
      
      fs.writeFileSync(filePath, html);
      console.log(`✅ Generated: ${fileName}`);
      generatedCount++;
    }

    // Generate blog index page
    const blogIndexHtml = generateBlogIndex(blogPosts);
    const indexPath = path.join(blogDir, 'index.html');
    fs.writeFileSync(indexPath, blogIndexHtml);
    console.log('✅ Generated: blog/index.html');

    // Generate sitemap entries
    const sitemapEntries = blogPosts.map(post => 
      `  <url>\n    <loc>https://effectivemarketer.com/blog/${post.slug}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    ).join('\n');

    console.log(`\n🎉 Successfully generated ${generatedCount} static blog posts!`);
    console.log(`📝 Add these sitemap entries to your sitemap.xml:\n\n${sitemapEntries}`);
    
  } catch (error) {
    console.error('❌ Error generating static blogs:', error);
    process.exit(1);
  }
}

// Run the generator
generateStaticBlogs();