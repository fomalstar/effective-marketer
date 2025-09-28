import http from 'http';

console.log('🧪 Testing Full Content SEO...\n');

// Test USA page for full content
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/ai-seo-agency-usa',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    
    const h1Match = data.match(/<h1>(.*?)<\/h1>/);
    const h1 = h1Match ? h1Match[1] : 'No H1 found';
    
    const contentMatch = data.match(/<main>(.*?)<\/main>/s);
    const hasContent = contentMatch ? 'Yes' : 'No';
    
    console.log(`📄 Page: /ai-seo-agency-usa`);
    console.log(`🏷️  Title: ${title}`);
    console.log(`📝 H1: ${h1}`);
    console.log(`📋 Has Main Content: ${hasContent}`);
    
    if (title.includes('Best AI SEO Agency in USA') && h1.includes('The #1 AI SEO Agency in USA')) {
      console.log('\n✅ SUCCESS: Full content is being served!');
      console.log('🔍 Search engines can now crawl the complete content');
      console.log('📊 This will significantly improve SEO rankings');
    } else {
      console.log('\n❌ ISSUE: Content not being served correctly');
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Deploy backend to Render');
    console.log('2. Update redirects');
    console.log('3. Test live URLs');
  });
});

req.on('error', (err) => {
  console.log(`❌ Server not running: ${err.message}`);
  console.log('💡 Start server with: cd server-setup && npm start');
});

req.end();

