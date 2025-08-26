import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Calendar, 
  User, 
  Tag,
  ExternalLink,
  FileText,
  Settings,
  LogOut,
  Plus,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { BlogAPI, DraftBlogPost } from '../api/blogApi';
import { apiClient } from '../config/apiConfig';
import { useAuth } from '../contexts/AuthContext';
import { blogPosts, BlogPost } from '../data/blogPosts';

interface AllPosts {
  drafts: DraftBlogPost[];
  published: BlogPost[];
}

const BlogAdmin: React.FC = () => {
  const [allPosts, setAllPosts] = useState<AllPosts>({ drafts: [], published: [] });
  const [selectedPost, setSelectedPost] = useState<DraftBlogPost | BlogPost | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'drafts' | 'published'>('drafts');
  const [editingPost, setEditingPost] = useState<DraftBlogPost | BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { logout } = useAuth();

  useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = async () => {
    setLoading(true);
    try {
      // Load drafts
      const draftList = await apiClient.getDrafts();
      
      // Load published posts (combine API + static)
      let publishedPosts: BlogPost[] = [];
      try {
        const apiPublished = await apiClient.getPublishedPosts();
        publishedPosts = [...apiPublished, ...blogPosts];
      } catch (error) {
        publishedPosts = blogPosts;
      }
      
      setAllPosts({
        drafts: draftList,
        published: publishedPosts
      });
    } catch (error) {
      console.error('Error loading posts:', error);
      setAllPosts({ drafts: [], published: blogPosts });
    }
    setLoading(false);
  };

  const handlePublish = async (draftId: string) => {
    if (window.confirm('Are you sure you want to publish this article?')) {
      try {
        await apiClient.publishDraft(draftId);
        alert('Article published successfully!');
        loadAllPosts();
        setSelectedPost(null);
      } catch (error) {
        console.error('Error publishing:', error);
        alert('Error publishing article');
      }
    }
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (window.confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
      try {
        await apiClient.deleteDraft(draftId);
        alert('Draft deleted successfully!');
        loadAllPosts();
        setSelectedPost(null);
      } catch (error) {
        console.error('Error deleting draft:', error);
        alert('Error deleting draft');
      }
    }
  };

  const handleDeletePublished = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this published post? This action cannot be undone.')) {
      try {
        // Check if it's a static post (IDs 1-5) that can't be deleted from server
        const numericId = parseInt(postId);
        if (numericId >= 1 && numericId <= 5) {
          // Static post - just remove from local state
          setAllPosts(prev => ({
            ...prev,
            published: prev.published.filter(p => p.id !== postId)
          }));
          alert('Static post hidden from view (will return after page refresh). To permanently remove, delete from blogPosts.ts file.');
        } else {
          // API post - delete from server
          await apiClient.deletePublishedPost(postId);
          alert('Post deleted successfully!');
          loadAllPosts();
        }
        setSelectedPost(null);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;
    
    try {
      if ('status' in editingPost) {
        // It's a draft
        await apiClient.updateDraft(editingPost.id, editingPost);
        alert('Draft updated successfully!');
      } else {
        // It's a published post
        const numericId = parseInt(editingPost.id);
        if (numericId >= 1 && numericId <= 5) {
          // Static post - just update local state
          setAllPosts(prev => ({
            ...prev,
            published: prev.published.map(p => 
              p.id === editingPost.id ? editingPost as BlogPost : p
            )
          }));
          alert('Static post updated locally (changes will reset after page refresh). To make permanent changes, edit blogPosts.ts file.');
        } else {
          // API post - update on server
          console.log('Updating API post:', editingPost.id, editingPost);
          const result = await apiClient.updatePublishedPost(editingPost.id, editingPost);
          console.log('Update result:', result);
          alert('Post updated successfully!');
          loadAllPosts();
        }
      }
      
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    }
  };

  const filteredPosts = (posts: (DraftBlogPost | BlogPost)[]) => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const categories = [...new Set([...allPosts.drafts, ...allPosts.published].map(p => p.category))];

  const PostCard = ({ post, isDraft }: { post: DraftBlogPost | BlogPost, isDraft: boolean }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {post.excerpt || post.content.substring(0, 150) + '...'}
            </p>
          </div>
          {isDraft && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Clock className="w-3 h-3 mr-1" />
              Draft
            </span>
          )}
          {!isDraft && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Published
            </span>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="mr-4">{new Date(post.publishDate).toLocaleDateString()}</span>
          <User className="w-4 h-4 mr-1" />
          <span className="mr-4">{post.author}</span>
          <Tag className="w-4 h-4 mr-1" />
          <span>{post.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPost(post)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
            <button
              onClick={() => setEditingPost(post)}
              className="inline-flex items-center px-3 py-1.5 border border-cyan-300 rounded-md text-sm font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition-colors"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>

          <div className="flex space-x-2">
            {isDraft ? (
              <>
                <button
                  onClick={() => handlePublish(post.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Publish
                </button>
                <button
                  onClick={() => handleDeleteDraft(post.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => handleDeletePublished(post.id)}
                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Blog Administration | Effective Marketer"
      description="Manage blog posts, drafts, and content administration"
      noIndex={true}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-cyan-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Blog
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'drafts'
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Drafts ({allPosts.drafts.length})
                </button>
                <button
                  onClick={() => setActiveTab('published')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'published'
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Published ({allPosts.published.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts(activeTab === 'drafts' ? allPosts.drafts : allPosts.published).map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  isDraft={activeTab === 'drafts'}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Post</h3>
              <button
                onClick={() => setEditingPost(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => setEditingPost({ 
                      ...editingPost, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Preview: {selectedPost.title}</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="prose max-w-none">
              <h1>{selectedPost.title}</h1>
              <div className="prose-content space-y-4">
                {selectedPost.content.split('\n\n').map((block, index) => {
                  if (!block.trim()) return null;
                  
                  if (block.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-900">
                        {block.replace('## ', '').replace(/ \{#.*?\}$/, '')}
                      </h2>
                    );
                  }
                  if (block.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-gray-900">
                        {block.replace('### ', '').replace(/ \{#.*?\}$/, '')}
                      </h3>
                    );
                  }
                  
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
                  
                  return (
                    <p 
                      key={index} 
                      className="mb-4 text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: block
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-600 hover:underline">$1</a>')
                          .replace(/- (.*?)$/gm, '<li style="margin-left: 1rem;">• $1</li>')
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default BlogAdmin;