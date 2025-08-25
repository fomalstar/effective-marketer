import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogPosts, blogCategories } from '../data/blogPosts';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>GEO Blog - Expert Insights on Generative Engine Optimization | Effective Marketer</title>
        <meta name="description" content="Stay ahead with expert GEO insights, autocomplete optimization strategies, AI platform optimization, case studies, and industry trends from Effective Marketer's team of specialists." />
        <meta name="keywords" content="GEO blog, Generative Engine Optimization, autocomplete optimization, AI optimization, ChatGPT optimization, digital marketing insights" />
        <link rel="canonical" href="https://effectivemarketer.com/blog" />
        <meta property="og:title" content="GEO Blog - Expert Insights on Generative Engine Optimization | Effective Marketer" />
        <meta property="og:description" content="Stay ahead with expert GEO insights, autocomplete optimization strategies, AI platform optimization, case studies, and industry trends from Effective Marketer's team of specialists." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://effectivemarketer.com/blog" />
        <meta property="og:image" content="https://effectivemarketer.com/blog-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GEO Blog - Expert Insights on Generative Engine Optimization" />
        <meta name="twitter:description" content="Expert GEO insights and autocomplete optimization strategies from industry specialists." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Effective Marketer GEO Blog",
            "description": "Expert insights on GEO and autocomplete optimization",
            "url": "https://effectivemarketer.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Effective Marketer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://effectivemarketer.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 px-4">
                GEO Insights & <span className="text-[#ff312b]">Strategies</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4">
                Stay ahead of the curve with expert insights on GEO (Generative Engine Optimization), autocomplete optimization, AI platform strategies, and digital marketing trends from our team of specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff312b] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ff312b] focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {blogCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map(post => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {regularPosts.length > 0 ? (
              <>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  {featuredPosts.length > 0 ? 'Latest Articles' : 'All Articles'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-[#ff312b] to-[#384ec2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Stay Updated with GEO Insights
            </h2>
            <p className="text-lg sm:text-xl text-white opacity-90 mb-8">
              Get the latest GEO strategies, autocomplete optimization, and AI platform insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#ff312b]"
              />
              <button className="bg-white text-[#ff312b] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;