import React, { useState } from 'react';
import { MessageSquare, Heart, Clock, Users, Plus } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  replies: number;
  category: string;
  isAnonymous: boolean;
}

export const CommunityForum: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);

  const categories = [
    { id: 'all', name: 'All Posts', count: 42 },
    { id: 'anxiety', name: 'Anxiety Support', count: 15 },
    { id: 'depression', name: 'Depression', count: 12 },
    { id: 'stress', name: 'Stress Management', count: 8 },
    { id: 'success', name: 'Success Stories', count: 7 }
  ];

  const samplePosts: ForumPost[] = [
    {
      id: '1',
      title: 'Celebrating small wins - 30 days of mood tracking!',
      content: 'Just wanted to share that I\'ve completed my first month of daily check-ins. It really helped me notice patterns...',
      author: 'Anonymous Student',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      replies: 8,
      category: 'success',
      isAnonymous: true
    },
    {
      id: '2',
      title: 'Struggling with exam anxiety - any coping strategies?',
      content: 'Finals week is approaching and I\'m feeling overwhelmed. Has anyone found effective ways to manage test anxiety?',
      author: 'WorriedSophmore',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 12,
      replies: 15,
      category: 'anxiety',
      isAnonymous: true
    },
    {
      id: '3',
      title: 'Morning meditation routine that actually works',
      content: 'After trying different approaches, I found a 10-minute morning routine that fits my schedule...',
      author: 'MindfulMornings',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 31,
      replies: 12,
      category: 'stress',
      isAnonymous: false
    }
  ];

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'bg-yellow-100 text-yellow-800';
      case 'depression': return 'bg-blue-100 text-blue-800';
      case 'stress': return 'bg-purple-100 text-purple-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = activeCategory === 'all' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Community Forum</h2>
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
        <p className="text-gray-600">Connect with fellow students in a safe, supportive environment</p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {category.name}
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Post</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Post title..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select category</option>
                <option>Anxiety Support</option>
                <option>Depression</option>
                <option>Stress Management</option>
                <option>Success Stories</option>
              </select>
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-600">Post anonymously</span>
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {post.isAnonymous ? 'A' : post.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{post.author}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {categories.find(c => c.id === post.category)?.name || post.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{getTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.replies}</span>
                </button>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <h3 className="font-semibold text-gray-800 mb-3">Community Guidelines</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Be respectful and supportive of all community members</p>
          <p>• Keep personal information private and respect anonymity</p>
          <p>• If you're in crisis, please seek immediate professional help</p>
          <p>• Report any inappropriate content to maintain a safe space</p>
        </div>
      </div>
    </div>
  );
};