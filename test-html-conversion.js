// Test HTML to Markdown conversion
const htmlToMarkdown = (html) => {
  let markdown = html;
  
  // First, handle special containers (like table of contents) before processing other elements
  markdown = markdown.replace(/<div[^>]*>[\s]*<h4[^>]*>Table of Contents<\/h4>(.*?)<\/div>/gis, (match, content) => {
    return '\n## Table of Contents\n\n' + content + '\n\n';
  });
  
  // Convert headers with proper spacing (handle id attributes)
  markdown = markdown.replace(/<h1[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h1>/gi, '\n# $2 {#$1}\n\n');
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h2>/gi, '\n## $2 {#$1}\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h3>/gi, '\n### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h4>/gi, '\n#### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
  markdown = markdown.replace(/<h5[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h5>/gi, '\n##### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n\n');
  markdown = markdown.replace(/<h6[^>]*id=['"](.*?)['"][^>]*>(.*?)<\/h6>/gi, '\n###### $2 {#$1}\n\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n\n');
  
  // Convert links BEFORE processing lists (so list item links work)
  markdown = markdown.replace(/<a[^>]*href=['"](.*?)['"][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images (handle both src-alt and alt-src orders)
  markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*alt=['"](.*?)['"][^>]*[^>]*>/gi, '![$2]($1)');
  markdown = markdown.replace(/<img[^>]*alt=['"](.*?)['"][^>]*src=['"](.*?)['"][^>]*[^>]*>/gi, '![$1]($2)');
  markdown = markdown.replace(/<img[^>]*src=['"](.*?)['"][^>]*>/gi, '![]($1)');
  
  // Convert code elements (before processing other text formatting)
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '\n```\n$1\n```\n\n');
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Convert bold and italic
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert ordered lists (preserve nested structure)
  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1;
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gis, (liMatch, liContent) => {
      const cleanContent = liContent
        .replace(/^\s+|\s+$/g, '')
        .replace(/\n+/g, ' ');
      return `${counter++}. ${cleanContent}\n`;
    });
    return '\n' + listContent + '\n';
  });
  
  // Convert unordered lists (preserve nested structure)  
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
    const listContent = content.replace(/<li[^>]*>(.*?)<\/li>/gis, (liMatch, liContent) => {
      const cleanContent = liContent
        .replace(/^\s+|\s+$/g, '')
        .replace(/\n+/g, ' ');
      return `- ${cleanContent}\n`;
    });
    return '\n' + listContent + '\n';
  });
  
  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return '\n> ' + cleanContent.replace(/\n/g, '\n> ') + '\n\n';
  });
  
  // Convert paragraphs with proper spacing
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gis, '\n$1\n\n');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove any remaining div, span, and other container tags
  markdown = markdown.replace(/<\/?(?:div|span|section|article|aside|nav|header|footer|main)[^>]*>/gi, '');
  
  // Clean up remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  markdown = markdown
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace and normalize spacing
  markdown = markdown
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .replace(/\n\n\n+/g, '\n\n')
    .trim();
  
  // Ensure proper spacing after headers
  markdown = markdown.replace(/(#{1,6}\s+[^\n]+)\n([^\n#-])/g, '$1\n\n$2');
  
  // Ensure proper spacing before headers (except at start)
  markdown = markdown.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
  
  // Clean up any remaining double spaces
  markdown = markdown.replace(/  +/g, ' ');
  
  // Final cleanup to ensure consistent line breaks
  markdown = markdown.replace(/([.!?:])\n([A-Z#])/g, '$1\n\n$2');
  
  return markdown;
};

// Test with your actual HTML content
const testHtml = `<p>Technical SEO is the foundation of a high-ranking website.</p>
<h2 id="what-is-technical-seo">What Is Technical SEO?</h2>
<p>Technical SEO refers to the optimization of your website's infrastructure to help search engines crawl, index, and rank your pages effectively.</p>
<h3>Why Technical SEO Matters More Than Ever</h3>
<p>Search engines now factor in user experience metrics like page speed and mobile friendliness when ranking pages.</p>
<ul>
  <li><strong>robots.txt:</strong> Use it to prevent crawling of irrelevant or duplicate pages (e.g., /cart or /admin).</li>
  <li><strong>XML Sitemaps:</strong> Submit to <a href="https://search.google.com/search-console">Google Search Console</a>. It should include only indexable, canonical, and important pages.</li>
</ul>
<img src="https://cdiscoutn.com/wp-content/uploads/2025/08/image-1756219965477.png" alt="Technical SEO graph illustrating page speed impact" style="width:100%">`;

console.log('Original HTML:');
console.log(testHtml);
console.log('\n' + '='.repeat(50) + '\n');
console.log('Converted Markdown:');
const result = htmlToMarkdown(testHtml);
console.log(result);
console.log('\n' + '='.repeat(50) + '\n');
console.log('Blocks after split:');
const blocks = result.split('\n\n');
blocks.forEach((block, i) => {
  console.log(`Block ${i}: "${block}"`);
});