#!/usr/bin/env node

// Test script to verify sitemap generation
// This will help debug why Google isn't indexing blog posts

const https = require('https');

async function testSitemap() {
  console.log('🔍 Testing Sitemap Generation');
  console.log('==============================\n');

  // Test 1: Check current sitemap
  console.log('1️⃣ Testing current sitemap.xml...');
  try {
    const sitemapResponse = await fetch('https://effectivemarketer.com/sitemap.xml');
    const sitemapText = await sitemapResponse.text();
    
    console.log('✅ Sitemap accessible');
    console.log('📊 Sitemap size:', sitemapText.length, 'characters');
    
    // Count URLs in sitemap
    const urlCount = (sitemapText.match(/<loc>/g) || []).length;
    console.log('🔗 URLs in sitemap:', urlCount);
    
    // Check if blog posts are included
    const blogPostCount = (sitemapText.match(/\/blog\//g) || []).length;
    console.log('📝 Blog post URLs:', blogPostCount);
    
    if (blogPostCount === 0) {
      console.log('❌ No blog posts found in sitemap!');
    } else {
      console.log('✅ Blog posts found in sitemap');
    }
    
  } catch (error) {
    console.log('❌ Error accessing sitemap:', error.message);
  }

  console.log('\n2️⃣ Testing RSS feed...');
  try {
    const rssResponse = await fetch('https://effectivemarketer.com/rss.xml');
    const rssText = await rssResponse.text();
    
    console.log('✅ RSS feed accessible');
    console.log('📊 RSS size:', rssText.length, 'characters');
    
    // Count items in RSS
    const itemCount = (rssText.match(/<item>/g) || []).length;
    console.log('📰 RSS items:', itemCount);
    
  } catch (error) {
    console.log('❌ Error accessing RSS feed:', error.message);
  }

  console.log('\n3️⃣ Testing individual blog post...');
  try {
    // Test a specific blog post URL
    const blogPostUrl = 'https://effectivemarketer.com/blog/11-best-seo-automation-tools-in-2025-that-actually-save-you-time';
    const postResponse = await fetch(blogPostUrl);
    
    if (postResponse.ok) {
      console.log('✅ Blog post accessible:', blogPostUrl);
      console.log('📊 Response status:', postResponse.status);
      
      // Check for canonical URL in response
      const postText = await postResponse.text();
      const canonicalMatch = postText.match(/<link rel="canonical" href="([^"]+)"/);
      
      if (canonicalMatch) {
        console.log('🔗 Canonical URL found:', canonicalMatch[1]);
        
        if (canonicalMatch[1] === blogPostUrl) {
          console.log('✅ Canonical URL matches post URL');
        } else {
          console.log('❌ Canonical URL mismatch!');
          console.log('   Expected:', blogPostUrl);
          console.log('   Found:', canonicalMatch[1]);
        }
      } else {
        console.log('❌ No canonical URL found in response');
      }
      
    } else {
      console.log('❌ Blog post not accessible:', postResponse.status);
    }
    
  } catch (error) {
    console.log('❌ Error testing blog post:', error.message);
  }

  console.log('\n4️⃣ Testing robots.txt...');
  try {
    const robotsResponse = await fetch('https://effectivemarketer.com/robots.txt');
    const robotsText = await robotsResponse.text();
    
    console.log('✅ Robots.txt accessible');
    console.log('📊 Robots.txt size:', robotsText.length, 'characters');
    
    // Check for blog-related rules
    if (robotsText.includes('Allow: /blog/')) {
      console.log('✅ Blog crawling allowed in robots.txt');
    } else {
      console.log('❌ Blog crawling not explicitly allowed in robots.txt');
    }
    
    if (robotsText.includes('Disallow: /blog-admin/')) {
      console.log('✅ Blog admin disallowed in robots.txt');
    } else {
      console.log('❌ Blog admin not explicitly disallowed in robots.txt');
    }
    
  } catch (error) {
    console.log('❌ Error accessing robots.txt:', error.message);
  }

  console.log('\n📋 Summary of Issues Found:');
  console.log('=============================');
  console.log('• Check if sitemap.xml includes all blog posts');
  console.log('• Verify canonical URLs are set correctly on each blog post');
  console.log('• Ensure robots.txt allows crawling of /blog/ paths');
  console.log('• Check if individual blog post URLs return 200 status');
  console.log('• Verify structured data has correct URLs');
}

// Helper function to fetch URLs
function fetch(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SitemapTester/1.0)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          text: () => Promise.resolve(data)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run the test
testSitemap().catch(console.error);

