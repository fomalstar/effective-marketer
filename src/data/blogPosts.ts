// Utility function to calculate reading time based on content length
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Default author configuration for consistency
export const defaultAuthor = {
  name: 'Steve',
  role: 'SEO Director',
  image: '/steve.jpg',
  bio: 'Steve is a leading expert in AI SEO and Google Autosuggest optimization at Effective Marketer, helping businesses dominate search results through innovative strategies and proven methodologies.'
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaDescription: string;
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'AI SEO Strategy',
    slug: 'ai-seo-strategy',
    description: 'Advanced AI SEO strategies and techniques',
    color: 'bg-gradient-to-r from-cyan-500 to-blue-600'
  },
  {
    id: '2',
    name: 'Autocomplete SEO',
    slug: 'autocomplete-seo',
    description: 'Google Autosuggest optimization insights',
    color: 'bg-gradient-to-r from-purple-500 to-pink-600'
  },
  {
    id: '3',
    name: 'Lead Generation',
    slug: 'lead-generation',
    description: 'AI automation and lead generation strategies',
    color: 'bg-gradient-to-r from-green-500 to-emerald-600'
  },
  {
    id: '4',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real client success stories and results',
    color: 'bg-gradient-to-r from-orange-500 to-red-600'
  },
  {
    id: '5',
    name: 'Industry News',
    slug: 'industry-news',
    description: 'Latest updates in AI SEO and marketing',
    color: 'bg-gradient-to-r from-gray-500 to-slate-600'
  }
];

export const blogPosts: BlogPost[] = [
  // Local blog posts are now managed through the API
  // This array is kept for fallback purposes only
];
