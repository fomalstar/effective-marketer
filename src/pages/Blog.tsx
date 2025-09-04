import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight, TrendingUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { apiClient } from '../config/apiConfig';
import { BlogPost, blogPosts } from '../data/blogPosts';
const blogCategories = [
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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const publishedPosts = await apiClient.getPublishedPosts();
        // Combine API posts with static posts
        const allPosts = [...publishedPosts, ...blogPosts];
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching published posts:', error);
        // Fallback to static posts if API fails
        setPosts(blogPosts);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Effective Marketer AI SEO Blog",
    "description": "Expert insights on AI SEO, Google Autosuggest optimization, and advanced digital marketing strategies",
    "url": "https://effectivemarketer.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Effective Marketer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://effectivemarketer.com/logo.png"
      }
    },
    "blogPost": featuredPosts.concat(regularPosts).slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "image": post.featuredImage,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": `https://effectivemarketer.com/blog/${post.slug}`
    }))
  };

  return (
    <PageLayout
      title="AI SEO Blog - Expert Insights & Strategies | Effective Marketer"
      description="Stay ahead with expert AI SEO insights, Google Autosuggest optimization strategies, lead generation automation, case studies, and industry trends from our team of specialists."
      keywords="AI SEO blog, Google Autosuggest optimization, autocomplete SEO, AI automation insights, digital marketing strategies, SEO case studies"
      canonical="https://effectivemarketer.com/blog"
      ogTitle="AI SEO Blog - Expert Insights & Strategies | Effective Marketer"
      ogDescription="🚀 Expert AI SEO insights & Google Autosuggest strategies. 📈 Case studies, automation tips & industry trends from leading specialists."
      ogImage="https://effectivemarketer.com/blog-og-image.jpg"
      structuredData={structuredData}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog' }
      ]}
    >

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-cyan-500/30">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">Expert Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Insights</span> & Strategies
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stay ahead with expert insights on AI SEO, Google Autosuggest optimization, lead generation automation, and cutting-edge digital marketing strategies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {blogCategories.slice(0, 4).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {blogCategories.map((category) => {
              const categoryPosts = posts.filter(post => post.category === category.name);
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${selectedCategory === category.name ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </h3>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      selectedCategory === category.name
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {categoryPosts.length}
                    </span>
                  </div>
                  <p className={`text-sm ${selectedCategory === category.name ? 'text-gray-200' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Articles</h2>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map(post => {
                const category = blogCategories.find(cat => cat.name === post.category);
                return (
                  <Link key={post.id} to={`/blog-${post.slug}.html`} className="group cursor-pointer">
                    <article className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                      <div className="aspect-video relative">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${category?.color || 'bg-gray-500'}`}>
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center text-gray-300 text-sm">
                            <User className="h-4 w-4 mr-1" />
                            <span className="mr-4">{post.author}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                          </div>
                          <span className="text-cyan-600 font-medium group-hover:text-cyan-700">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            <div className="text-sm text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => {
                const category = blogCategories.find(cat => cat.name === post.category);
                return (
                  <Link key={post.id} to={`/blog-${post.slug}.html`} className="group cursor-pointer">
                    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
                      <div className="aspect-video relative">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${category?.color || 'bg-gray-500'}`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  No articles match your current filter. Try selecting a different category or clearing your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                >
                  View All Articles
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with AI SEO Insights
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Get the latest AI SEO strategies, Google Autosuggest optimization tips, and exclusive insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-500"
            />
            <button className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;