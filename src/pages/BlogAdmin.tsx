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
  Settings
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { BlogAPI, DraftBlogPost } from '../api/blogApi';

const BlogAdmin: React.FC = () => {
  const [drafts, setDrafts] = useState<DraftBlogPost[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<DraftBlogPost | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    setLoading(true);
    // In a real app, this would be an API call
    const draftList = BlogAPI.getDrafts();
    setDrafts(draftList);
    setLoading(false);
  };

  const handlePublish = async (draftId: string) => {
    if (window.confirm('Are you sure you want to publish this article?')) {
      const result = BlogAPI.publishDraft(draftId);
      
      if (result.success) {
        alert('Article published successfully!');
        loadDrafts();
        setSelectedDraft(null);
      } else {
        alert('Error publishing article: ' + result.errors?.join(', '));
      }
    }
  };

  const handleDelete = async (draftId: string) => {
    if (window.confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
      const result = BlogAPI.deleteDraft(draftId);
      
      if (result.success) {
        alert('Draft deleted successfully!');
        loadDrafts();
        setSelectedDraft(null);
      } else {
        alert('Error deleting draft: ' + result.errors?.join(', '));
      }
    }
  };

  const handleEdit = (draft: DraftBlogPost) => {
    setSelectedDraft(draft);
    setShowPreview(false);
  };

  const handlePreview = (draft: DraftBlogPost) => {
    setSelectedDraft(draft);
    setShowPreview(true);
  };

  const handleSaveDraft = (updatedDraft: Partial<DraftBlogPost>) => {
    if (!selectedDraft) return;
    
    const result = BlogAPI.updateDraft(selectedDraft.id, updatedDraft);
    
    if (result.success) {
      alert('Draft updated successfully!');
      loadDrafts();
      // Update selected draft
      const updated = BlogAPI.getDraft(selectedDraft.id);
      setSelectedDraft(updated);
    } else {
      alert('Error updating draft: ' + result.errors?.join(', '));
    }
  };

  return (
    <PageLayout
      title="Blog Admin - Manage Drafts | Effective Marketer"
      description="Admin interface for managing blog post drafts and publishing articles"
      noIndex={true}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Admin' }
      ]}
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Administration</h1>
                <p className="text-gray-600 mt-2">Manage draft articles and publish content</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Blog
                </Link>
                <button
                  onClick={loadDrafts}
                  className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Drafts List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Draft Articles ({drafts.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {loading ? (
                    <div className="p-6 text-center text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      Loading drafts...
                    </div>
                  ) : drafts.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      No drafts available
                    </div>
                  ) : (
                    drafts.map(draft => (
                      <div
                        key={draft.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedDraft?.id === draft.id ? 'bg-cyan-50 border-r-4 border-cyan-500' : ''
                        }`}
                        onClick={() => handleEdit(draft)}
                      >
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {draft.title}
                        </h3>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(draft.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {draft.readTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            draft.source === 'n8n' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {draft.source === 'n8n' ? 'AI Generated' : 'Manual'}
                          </span>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(draft);
                              }}
                              className="p-1 text-gray-400 hover:text-cyan-600"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(draft);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Draft Editor/Preview */}
            <div className="lg:col-span-2">
              {selectedDraft ? (
                <div className="bg-white rounded-xl shadow-sm">
                  
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {showPreview ? 'Preview Article' : 'Edit Draft'}
                      </h2>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            showPreview 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showPreview ? 'Edit' : 'Preview'}
                        </button>
                        
                        <button
                          onClick={() => handlePublish(selectedDraft.id)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publish
                        </button>
                        
                        <button
                          onClick={() => handleDelete(selectedDraft.id)}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Source:</span>
                        <p className="font-medium">{selectedDraft.source}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <p className="font-medium">{selectedDraft.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Reading Time:</span>
                        <p className="font-medium">{selectedDraft.readTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <p className="font-medium">{new Date(selectedDraft.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {showPreview ? (
                      // Preview Mode
                      <div className="prose prose-lg max-w-none">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">
                          {selectedDraft.title}
                        </h1>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8 pb-4 border-b">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {selectedDraft.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(selectedDraft.publishDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {selectedDraft.readTime}
                          </div>
                        </div>
                        
                        <div 
                          className="prose-content"
                          dangerouslySetInnerHTML={{ 
                            __html: selectedDraft.content
                              .split('\n\n')
                              .map(paragraph => {
                                if (paragraph.startsWith('# ')) {
                                  return `<h1 class="text-2xl font-bold mt-8 mb-4">${paragraph.replace('# ', '')}</h1>`;
                                }
                                if (paragraph.startsWith('## ')) {
                                  return `<h2 class="text-xl font-bold mt-6 mb-3">${paragraph.replace('## ', '')}</h2>`;
                                }
                                if (paragraph.startsWith('### ')) {
                                  return `<h3 class="text-lg font-bold mt-4 mb-2">${paragraph.replace('### ', '')}</h3>`;
                                }
                                if (paragraph.startsWith('- ')) {
                                  const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                                  return `<ul class="list-disc ml-6 mb-4">${items.map(item => `<li>${item.replace('- ', '')}</li>`).join('')}</ul>`;
                                }
                                return `<p class="mb-4">${paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                              })
                              .join('')
                          }}
                        />
                        
                        <div className="mt-8 pt-4 border-t">
                          <div className="flex flex-wrap gap-2">
                            {selectedDraft.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Edit Mode
                      <DraftEditor
                        draft={selectedDraft}
                        onSave={handleSaveDraft}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Draft</h3>
                  <p className="text-gray-500">Choose a draft from the list to edit or preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Draft Editor Component
const DraftEditor: React.FC<{
  draft: DraftBlogPost;
  onSave: (updates: Partial<DraftBlogPost>) => void;
}> = ({ draft, onSave }) => {
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [category, setCategory] = useState(draft.category);
  const [tags, setTags] = useState(draft.tags.join(', '));
  const [featuredImage, setFeaturedImage] = useState(draft.featuredImage);
  const [metaDescription, setMetaDescription] = useState(draft.metaDescription);

  const handleSave = () => {
    onSave({
      title,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      featuredImage,
      metaDescription
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="AI SEO Strategy">AI SEO Strategy</option>
          <option value="Autocomplete SEO">Autocomplete SEO</option>
          <option value="Lead Generation">Lead Generation</option>
          <option value="Case Studies">Case Studies</option>
          <option value="Industry News">Industry News</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="SEO, AI, Strategy"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
        <input
          type="url"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BlogAdmin;
