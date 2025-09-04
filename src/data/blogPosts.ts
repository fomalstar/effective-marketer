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
  {
    id: '1',
    title: 'AI SEO Automation Complete Guide',
    slug: 'ai-seo-automation-complete-guide',
    excerpt: 'Learn how to automate your SEO processes with AI tools and strategies.',
    content: '<h2>Introduction to AI SEO</h2><p>AI is revolutionizing how we approach SEO. With the right automation tools, you can save hours of manual work while improving your search rankings.</p><h2>Key Benefits of AI SEO</h2><p>Automation saves time and improves results. AI can analyze data faster than humans and identify patterns that lead to better optimization.</p><h2>Implementation Strategy</h2><p>Start with keyword research automation, then move to content optimization and performance monitoring.</p>',
    author: 'Steve',
    authorRole: 'SEO Director',
    authorImage: '/steve/steve-avatar.jpg',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    category: 'AI SEO Strategy',
    tags: ['AI', 'SEO', 'Automation'],
    featuredImage: '/images/ai-seo.jpg',
    metaDescription: 'Learn how to automate your SEO processes with AI tools and strategies.',
    featured: true
  },
  {
    id: '2',
    title: 'Google Autosuggest SEO Strategies',
    slug: 'google-autosuggest-seo-strategies',
    excerpt: 'Master the art of ranking in Google Autosuggest for maximum visibility.',
    content: '<h2>Understanding Google Autosuggest</h2><p>Google Autosuggest is a powerful feature that shows users relevant search suggestions as they type. Ranking here can significantly boost your visibility.</p><h2>Optimization Techniques</h2><p>Here are proven strategies to improve your autosuggest rankings: keyword research, content optimization, and user experience improvements.</p><h2>Measuring Success</h2><p>Track your autosuggest performance with tools like Google Search Console and third-party SEO platforms.</p>',
    author: 'Steve',
    authorRole: 'SEO Director',
    authorImage: '/steve/steve-avatar.jpg',
    publishDate: '2024-01-20',
    readTime: '7 min read',
    category: 'Autocomplete SEO',
    tags: ['Google', 'Autosuggest', 'SEO'],
    featuredImage: '/images/autosuggest.jpg',
    metaDescription: 'Master the art of ranking in Google Autosuggest for maximum visibility.',
    featured: true
  }
];
