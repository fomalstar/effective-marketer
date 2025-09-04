import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
}

interface InternalLinkingProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  maxLinks?: number;
}

const InternalLinking: React.FC<InternalLinkingProps> = ({ 
  currentPost, 
  allPosts, 
  maxLinks = 3 
}) => {
  // Find related posts based on category and tags
  const findRelatedPosts = () => {
    const relatedPosts = allPosts
      .filter(post => post.id !== currentPost.id)
      .map(post => {
        let score = 0;
        
        // Category match (highest weight)
        if (post.category === currentPost.category) {
          score += 10;
        }
        
        // Tag matches
        const commonTags = post.tags.filter(tag => 
          currentPost.tags.includes(tag)
        );
        score += commonTags.length * 3;
        
        // Title keyword matches
        const currentKeywords = currentPost.title.toLowerCase().split(' ');
        const postKeywords = post.title.toLowerCase().split(' ');
        const keywordMatches = currentKeywords.filter(keyword => 
          postKeywords.includes(keyword) && keyword.length > 3
        );
        score += keywordMatches.length;
        
        return { ...post, score };
      })
      .filter(post => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxLinks);

    return relatedPosts;
  };

  const relatedPosts = findRelatedPosts();

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Related Articles
          </h2>
          <p className="text-gray-600">
            Continue learning with these related topics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-video relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-cyan-600">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link 
                    to={`/blog/${post.slug}.html`}
                    className="hover:text-cyan-600 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}.html`}
                    className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalLinking;
