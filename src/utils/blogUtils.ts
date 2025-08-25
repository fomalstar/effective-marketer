import { BlogPost, defaultAuthor } from '../data/blogPosts';

// Utility function to calculate reading time based on content length
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Utility function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Utility function to extract excerpt from content
export const generateExcerpt = (content: string, maxLength: number = 200): string => {
  // Remove markdown headings and formatting
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '') // Remove heading markers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\n\n+/g, ' ') // Replace multiple newlines with spaces
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  return cleanContent.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

// Main function to create a new blog post with automatic settings
export const createBlogPost = (options: {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured?: boolean;
  slug?: string;
  excerpt?: string;
  metaDescription?: string;
  publishDate?: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
}): BlogPost => {
  const {
    id,
    title,
    content,
    category,
    tags,
    featuredImage,
    featured = false,
    slug,
    excerpt,
    metaDescription,
    publishDate,
    author = defaultAuthor
  } = options;

  return {
    id,
    title,
    slug: slug || generateSlug(title),
    excerpt: excerpt || generateExcerpt(content),
    content,
    author: author.name,
    authorRole: author.role,
    authorImage: author.image,
    publishDate: publishDate || new Date().toISOString().split('T')[0],
    readTime: calculateReadingTime(content),
    category,
    tags,
    featuredImage,
    metaDescription: metaDescription || generateExcerpt(content, 155),
    featured
  };
};

// Function to validate blog post data
export const validateBlogPost = (post: Partial<BlogPost>): string[] => {
  const errors: string[] = [];
  
  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!post.content || post.content.trim().length === 0) {
    errors.push('Content is required');
  }
  
  if (!post.category || post.category.trim().length === 0) {
    errors.push('Category is required');
  }
  
  if (!post.tags || post.tags.length === 0) {
    errors.push('At least one tag is required');
  }
  
  if (!post.featuredImage || post.featuredImage.trim().length === 0) {
    errors.push('Featured image is required');
  }
  
  return errors;
};

// Function to get table of contents from content
export const extractTableOfContents = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    items.push({
      id,
      text,
      level
    });
  }

  return items;
};

// Function to format content with proper IDs for headings
export const formatContentWithIds = (content: string): string => {
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    return `${hashes} ${text} {#${id}}`;
  });
};

// Example usage for creating a new blog post:
/*
const newPost = createBlogPost({
  id: 'unique-id',
  title: 'How to Master AI SEO in 2024',
  content: `
# How to Master AI SEO in 2024

## Introduction
AI SEO is revolutionizing...

## Key Strategies
1. Content optimization
2. Technical improvements
3. User experience

## Conclusion
The future of SEO...
  `,
  category: 'AI SEO Strategy',
  tags: ['AI SEO', 'Strategy', '2024'],
  featuredImage: 'https://example.com/image.jpg',
  featured: false
});
*/
