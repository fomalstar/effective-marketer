import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost, blogCategories } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const category = blogCategories.find(cat => cat.name === post.category);
  
  return (
    <article className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${featured ? 'lg:col-span-2' : ''}`}>
      <div className={`${featured ? 'lg:flex' : ''}`}>
        <div className={`relative ${featured ? 'lg:w-1/2' : ''}`}>
          <img
            src={post.featuredImage}
            alt={post.title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${featured ? 'h-64 lg:h-full' : 'h-48'}`}
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${category?.color || 'bg-gray-500'}`}>
              {post.category}
            </span>
          </div>
        </div>
        
        <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-between' : ''}`}>
          <div>
            <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200 leading-tight ${featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'}`}>
              <Link to={`/${post.slug}.html`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            
            <p className={`text-gray-600 mb-4 leading-relaxed ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              {post.excerpt}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{post.author}</div>
                  <div className="text-xs text-gray-500">{post.authorRole}</div>
                </div>
              </div>
              
              <Link
                to={`/${post.slug}.html`}
                className="inline-flex items-center space-x-1 text-cyan-600 hover:text-cyan-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200"
              >
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;