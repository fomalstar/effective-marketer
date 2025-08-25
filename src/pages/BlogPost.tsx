import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag, TrendingUp, MessageCircle, Heart, Eye, Users, Target, Zap } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import TableOfContents from '../components/TableOfContents';
import { blogPosts, blogCategories, defaultAuthor } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [isLiked, setIsLiked] = useState(false);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const category = blogCategories.find(cat => cat.name === post.category);
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);
  
  // Popular posts for sidebar
  const popularPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 4);
    
  // Recent posts for sidebar
  const recentPosts = blogPosts
    .filter(p => p.id !== post.id)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Effective Marketer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://effectivemarketer.com/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://effectivemarketer.com/blog/${post.slug}`
    }
  };

  return (
    <PageLayout
      title={`${post.title} | Effective Marketer Blog`}
      description={post.metaDescription}
      keywords={post.tags.join(', ')}
      canonical={`https://effectivemarketer.com/blog/${post.slug}`}
      ogTitle={post.title}
      ogDescription={post.metaDescription}
      ogImage={post.featuredImage}
      ogType="article"
      structuredData={structuredData}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title }
      ]}
    >
      {/* Article Header */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Featured Image */}
                <div className="aspect-video relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${category?.color || 'bg-gray-500'}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4 text-gray-300 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b">
                    <div className="flex items-center space-x-4">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{post.author}</div>
                        <div className="text-sm text-cyan-600">{post.authorRole}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                          isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-lg transition-all ${
                          isBookmarked ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-all">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div className="mb-8">
                    <TableOfContents content={post.content} />
                  </div>

                  {/* Content with improved typography */}
                  <div className="prose prose-lg prose-gray max-w-none">
                    <div className="space-y-6 text-gray-800 leading-relaxed">
                      {post.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('# ')) {
                          const text = paragraph.replace('# ', '');
                          const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h1 key={index} id={id} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0 scroll-mt-20">
                              {text}
                            </h1>
                          );
                        }
                        if (paragraph.startsWith('## ')) {
                          const text = paragraph.replace('## ', '');
                          const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h2 key={index} id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20">
                              {text}
                            </h2>
                          );
                        }
                        if (paragraph.startsWith('### ')) {
                          const text = paragraph.replace('### ', '');
                          const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h3 key={index} id={id} className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20">
                              {text}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          const text = paragraph.replace('#### ', '');
                          const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h4 key={index} id={id} className="text-lg font-semibold text-gray-900 mt-6 mb-2 scroll-mt-20">
                              {text}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('- ')) {
                          const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                          return (
                            <ul key={index} className="space-y-2 ml-6">
                              {listItems.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start">
                                  <span className="text-cyan-500 mr-2">•</span>
                                  <span dangerouslySetInnerHTML={{ 
                                    __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                  }} />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (paragraph.trim() === '') return null;
                        return (
                          <p 
                            key={index} 
                            className="text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                            }} 
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-purple-50 text-cyan-700 rounded-full text-sm font-medium hover:from-cyan-100 hover:to-purple-100 transition-all duration-200 cursor-pointer"
                        >
                          #{tag.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{post.author}</h3>
                        <p className="text-cyan-600 font-medium mb-3">{post.authorRole}</p>
                        <p className="text-gray-600 leading-relaxed">
                          {defaultAuthor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Popular Posts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-cyan-500" />
                  <h3 className="font-semibold text-gray-900">Popular Posts</h3>
                </div>
                <div className="space-y-4">
                  {popularPosts.map((popularPost, index) => (
                    <Link
                      key={popularPost.id}
                      to={`/blog/${popularPost.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold rounded-full">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                            {popularPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{popularPost.readTime}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {blogCategories.map(category => {
                    const categoryPostCount = blogPosts.filter(p => p.category === category.name).length;
                    return (
                      <a
                        key={category.id}
                        href={`/blog?category=${category.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-cyan-600">{category.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {categoryPostCount}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* CTA Widget */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-3 text-cyan-100" />
                  <h3 className="font-semibold mb-2">Ready to Dominate?</h3>
                  <p className="text-sm text-cyan-100 mb-4">
                    Get expert AI SEO analysis and see how we can boost your rankings.
                  </p>
                  <a
                    href="https://calendly.com/effectivemarketer/demo"
                    className="inline-block bg-white text-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Book Free Consultation
                  </a>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map(recentPost => (
                    <Link
                      key={recentPost.id}
                      to={`/blog/${recentPost.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={recentPost.featuredImage}
                          alt={recentPost.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-tight">
                            {recentPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(recentPost.publishDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => {
                const relatedCategory = blogCategories.find(cat => cat.name === relatedPost.category);
                return (
                  <article key={relatedPost.id} className="group cursor-pointer">
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
                      <div className="aspect-video relative">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${relatedCategory?.color || 'bg-gray-500'}`}>
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <img
                              src={relatedPost.authorImage}
                              alt={relatedPost.author}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{relatedPost.author}</span>
                          </div>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="h-12 w-12 text-cyan-100 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Dominate Your Industry?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Get expert AI SEO analysis and discover how we can help your business dominate Google Autosuggest and appear before competitors.
          </p>
          <a
            href="https://calendly.com/effectivemarketer/demo"
            className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Schedule Free Consultation
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;