import React, { useState } from 'react';
import { Play, Pause, Clock, Star, Filter, Search } from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  instructor: string;
  tags: string[];
  audioUrl?: string;
}

export const MeditationLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingSession, setPlayingSession] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Sessions' },
    { id: 'anxiety', name: 'Anxiety Relief' },
    { id: 'stress', name: 'Stress Management' },
    { id: 'sleep', name: 'Better Sleep' },
    { id: 'focus', name: 'Focus & Concentration' },
    { id: 'gratitude', name: 'Gratitude Practice' }
  ];

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: '5-Minute Morning Calm',
      description: 'Start your day with intention and peace. Perfect for busy students.',
      duration: 5,
      category: 'stress',
      difficulty: 'beginner',
      rating: 4.8,
      instructor: 'Sarah Chen',
      tags: ['morning', 'breathing', 'centering']
    },
    {
      id: '2',
      title: 'Exam Anxiety Relief',
      description: 'Specifically designed to calm pre-test nerves and boost confidence.',
      duration: 10,
      category: 'anxiety',
      difficulty: 'beginner',
      rating: 4.9,
      instructor: 'Dr. Michael Torres',
      tags: ['anxiety', 'confidence', 'exams']
    },
    {
      id: '3',
      title: 'Deep Sleep Preparation',
      description: 'Wind down from a busy day and prepare your mind for restful sleep.',
      duration: 15,
      category: 'sleep',
      difficulty: 'beginner',
      rating: 4.7,
      instructor: 'Luna Park',
      tags: ['sleep', 'relaxation', 'bedtime']
    },
    {
      id: '4',
      title: 'Study Focus Enhancer',
      description: 'Improve concentration and mental clarity for better study sessions.',
      duration: 8,
      category: 'focus',
      difficulty: 'intermediate',
      rating: 4.6,
      instructor: 'James Wilson',
      tags: ['focus', 'productivity', 'clarity']
    },
    {
      id: '5',
      title: 'Gratitude & Self-Compassion',
      description: 'Cultivate appreciation and kindness toward yourself.',
      duration: 12,
      category: 'gratitude',
      difficulty: 'beginner',
      rating: 4.8,
      instructor: 'Emma Rodriguez',
      tags: ['gratitude', 'self-love', 'positivity']
    },
    {
      id: '6',
      title: 'Advanced Mindfulness Practice',
      description: 'Deep mindfulness exploration for experienced practitioners.',
      duration: 20,
      category: 'stress',
      difficulty: 'advanced',
      rating: 4.9,
      instructor: 'Zen Master Lin',
      tags: ['mindfulness', 'awareness', 'meditation']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'bg-blue-500';
      case 'stress': return 'bg-purple-500';
      case 'sleep': return 'bg-indigo-500';
      case 'focus': return 'bg-orange-500';
      case 'gratitude': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredSessions = meditationSessions.filter(session => {
    const matchesCategory = selectedCategory === 'all' || session.category === selectedCategory;
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const togglePlayback = (sessionId: string) => {
    if (playingSession === sessionId) {
      setPlayingSession(null);
    } else {
      setPlayingSession(sessionId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Meditation Library</h2>
        <p className="text-gray-600">Personalized mindfulness exercises tailored to your needs</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search meditations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Filter</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">{session.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(session.difficulty)}`}>
                    {session.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{session.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">{session.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(session.category)}`}></div>
                  <span className="text-sm text-gray-600">by {session.instructor}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {session.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => togglePlayback(session.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 ml-4 ${
                  playingSession === session.id
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {playingSession === session.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
            </div>

            {playingSession === session.id && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-700">Now Playing</span>
                  <span className="text-sm text-blue-600">0:00 / {session.duration}:00</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-blue-700 mt-2">🎧 Find a quiet space and close your eyes...</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-800 mb-4">Recommended for You</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Based on your recent stress levels, we recommend starting with "5-Minute Morning Calm" sessions.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Since you mentioned anxiety about exams, "Exam Anxiety Relief" could be particularly helpful.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Your sleep patterns suggest adding "Deep Sleep Preparation" to your evening routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};