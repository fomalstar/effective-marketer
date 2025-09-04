import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Tag, TrendingUp, MessageCircle, Heart, Eye, Users, Target, Zap } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import TableOfContents from '../components/TableOfContents';
import InternalLinking from '../components/InternalLinking';
import { blogPosts, blogCategories, defaultAuthor, type BlogPost } from '../data/blogPosts';
import { apiClient } from '../config/apiConfig';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPosts);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLiked] = useState(Math.floor(Math.random() * 50) + 10);
  const [isLiked, setIsLiked] = useState(false);
  
  // Remove .html extension from slug if present
  const cleanSlug = slug?.replace('.html', '') || '';

  // Fetch all posts (static + API) - but don't show loading state
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const publishedPosts = await apiClient.getPublishedPosts();
        // Combine API posts with static posts
        const combinedPosts = [...publishedPosts, ...blogPosts];
        setAllPosts(combinedPosts);
      } catch (error) {
        console.error('Error fetching published posts:', error);
        // Fallback to static posts if API fails
        setAllPosts(blogPosts);
      }
    };

    fetchAllPosts();
  }, []);

  const post = allPosts.find(p => p.slug === cleanSlug);

  // Debug logging
  console.log('BlogPost Debug:', {
    slug,
    cleanSlug,
    allPostsCount: allPosts.length,
    foundPost: !!post,
    postTitle: post?.title
  });

  // Remove loading state - show content immediately

  if (!post) {
    console.log('Post not found, redirecting to /blog');
    return <Navigate to="/blog" replace />;
  }

  const category = blogCategories.find(cat => cat.name === post.category);
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);
  
  // Popular posts for sidebar
  const popularPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 4);
    
  // Recent posts for sidebar
  const recentPosts = allPosts
    .filter(p => p.id !== post.id)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": {
      "@type": "ImageObject",
      "url": post.featuredImage,
      "width": 1200,
      "height": 630,
      "alt": post.title
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
      "image": post.authorImage,
      "url": "https://effectivemarketer.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Effective Marketer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://effectivemarketer.com/logo.png",
        "width": 600,
        "height": 60
      },
      "url": "https://effectivemarketer.com"
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://effectivemarketer.com/blog/${post.slug}`
    },
    "url": `https://effectivemarketer.com/blog/${post.slug}`,
    "articleSection": post.category,
    "keywords": post.tags.join(', '),
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime.split(' ')[0]}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "h3", "p"]
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": `https://effectivemarketer.com/blog/${post.slug}`
    },
    "mainEntity": {
      "@type": "WebPage",
      "@id": `https://effectivemarketer.com/blog/${post.slug}`
    }
  };

  // Generate FAQ schema from content headings
  const generateFAQSchema = (content: string) => {
    const lines = content.split('\n');
    const faqs = [];
    let currentQuestion = '';
    let currentAnswer = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for question patterns (lines ending with ? or starting with common question words)
      if (line.endsWith('?') || 
          /^(what|how|why|when|where|which|who|can|could|would|should|do|does|is|are|will)/i.test(line)) {
        
        // Save previous FAQ if exists
        if (currentQuestion && currentAnswer) {
          faqs.push({
            "@type": "Question",
            "name": currentQuestion,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentAnswer.trim()
            }
          });
        }
        
        currentQuestion = line;
        currentAnswer = '';
      } else if (currentQuestion && line && !line.startsWith('#')) {
        // Add to answer if we have a question
        currentAnswer += line + ' ';
      }
    }

    // Add the last FAQ
    if (currentQuestion && currentAnswer) {
      faqs.push({
        "@type": "Question",
        "name": currentQuestion,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentAnswer.trim()
        }
      });
    }

    return faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.slice(0, 10) // Limit to 10 FAQs
    } : null;
  };

  const faqSchema = generateFAQSchema(post.content);

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
      structuredData={faqSchema ? [structuredData, faqSchema] : structuredData}
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
                      {post.content.split('\n\n').map((block, index) => {
                        // Skip empty blocks
                        if (!block.trim()) return null;
                        
                        // Headers
                        if (block.startsWith('# ')) {
                          const text = block.replace('# ', '');
                          const id = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h1 key={index} id={id} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0 scroll-mt-20">
                              {text}
                            </h1>
                          );
                        }
                        if (block.startsWith('## ')) {
                          const text = block.replace('## ', '').replace(/ \{#.*?\}$/, ''); // Remove {#id} from display
                          const id = block.match(/\{#(.*?)\}/)?.[1] || text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h2 key={index} id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20">
                              {text}
                            </h2>
                          );
                        }
                        if (block.startsWith('### ')) {
                          const text = block.replace('### ', '').replace(/ \{#.*?\}$/, '');
                          const id = block.match(/\{#(.*?)\}/)?.[1] || text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h3 key={index} id={id} className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20">
                              {text}
                            </h3>
                          );
                        }
                        if (block.startsWith('#### ')) {
                          const text = block.replace('#### ', '').replace(/ \{#.*?\}$/, '');
                          const id = block.match(/\{#(.*?)\}/)?.[1] || text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <h4 key={index} id={id} className="text-lg font-semibold text-gray-900 mt-6 mb-2 scroll-mt-20">
                              {text}
                            </h4>
                          );
                        }
                        
                        // Images  
                        if (block.trim().startsWith('![')) {
                          const imageMatch = block.match(/!\[(.*?)\]\((.*?)\)/);
                          if (imageMatch) {
                            const [, altText, imageUrl] = imageMatch;
                            return (
                              <div key={index} className="my-8">
                                <img 
                                  src={imageUrl} 
                                  alt={altText} 
                                  className="w-full h-auto rounded-lg shadow-lg"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                {altText && (
                                  <p className="text-sm text-gray-600 text-center mt-2 italic">
                                    {altText}
                                  </p>
                                )}
                              </div>
                            );
                          }
                        }
                        
                        // Handle blocks with images mixed in 
                        if (block.includes('![')) {
                          // Split mixed content and render each part
                          const parts: React.ReactNode[] = [];
                          const lines = block.split('\n');
                          
                          lines.forEach((line, lineIndex) => {
                            if (line.trim().startsWith('![')) {
                              const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
                              if (imageMatch) {
                                const [, altText, imageUrl] = imageMatch;
                                parts.push(
                                  <div key={`${index}-img-${lineIndex}`} className="my-8">
                                    <img 
                                      src={imageUrl} 
                                      alt={altText} 
                                      className="w-full h-auto rounded-lg shadow-lg"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    {altText && (
                                      <p className="text-sm text-gray-600 text-center mt-2 italic">
                                        {altText}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            } else if (line.startsWith('- ')) {
                              parts.push(
                                <li key={`${index}-li-${lineIndex}`} className="flex items-start mb-2">
                                  <span className="text-cyan-500 mr-3 mt-1">•</span>
                                  <span dangerouslySetInnerHTML={{
                                    __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 hover:underline">$1</a>')
                                  }} />
                                </li>
                              );
                            } else if (line.trim()) {
                              parts.push(
                                <p key={`${index}-p-${lineIndex}`} className="mb-2" dangerouslySetInnerHTML={{
                                  __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 hover:underline">$1</a>')
                                }} />
                              );
                            }
                          });
                          
                          return <div key={index}>{parts}</div>;
                        }
                        
                        // Lists (simple approach - render as mixed content)
                        if (block.includes('- **') || block.includes('- ') || /^\d+\.\s/.test(block)) {
                          return (
                            <div key={index} className="my-4" dangerouslySetInnerHTML={{
                              __html: block
                                .split('\n')
                                .map(line => {
                                  if (line.startsWith('- ')) {
                                    return `<li class="flex items-start mb-2"><span class="text-cyan-500 mr-3 mt-1">•</span><span>${line.replace('- ', '')}</span></li>`;
                                  } else if (/^\d+\.\s/.test(line)) {
                                    return `<li class="flex items-start mb-2"><span class="text-cyan-600 mr-3 font-semibold">${line.match(/^\d+/)![0]}.</span><span>${line.replace(/^\d+\.\s/, '')}</span></li>`;
                                  } else {
                                    return `<p class="mb-2">${line}</p>`;
                                  }
                                })
                                .join('')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 hover:underline" target="_blank">$1</a>')
                                .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                            }} />
                          );
                        }
                        
                        // Regular paragraphs
                        return (
                          <p 
                            key={index} 
                            className="text-lg leading-relaxed my-4"
                            dangerouslySetInnerHTML={{ 
                              __html: block
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
                                .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
                                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 hover:text-cyan-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
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
                      to={`/blog/${popularPost.slug}.html`}
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
                    const categoryPostCount = allPosts.filter(p => p.category === category.name).length;
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
                      to={`/blog/${recentPost.slug}.html`}
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

      {/* Internal Linking Section */}
      <InternalLinking 
        currentPost={post}
        allPosts={allPosts}
        maxLinks={3}
      />

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