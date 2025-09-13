import React from 'react';
import { Calendar, Target, Award, Zap, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import type { ActiveView } from '../App';

interface DashboardProps {
  onNavigate: (view: ActiveView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { wellnessData, todaysMood } = useWellness();
  
  const currentStreak = wellnessData.reduce((streak, entry, index) => {
    if (index === wellnessData.length - 1) return streak + 1;
    const today = new Date();
    const entryDate = new Date(entry.date);
    const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= index ? streak + 1 : streak;
  }, 0);

  const weeklyGoalProgress = Math.min((wellnessData.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length / 7) * 100, 100);

  const quickActions = [
    {
      title: 'Daily Check-in',
      subtitle: todaysMood ? 'Completed today' : 'Take your mood check-in',
      icon: Calendar,
      color: 'blue',
      action: () => onNavigate('checkin'),
      completed: !!todaysMood
    },
    {
      title: 'View Trends',
      subtitle: 'See your wellness journey',
      icon: TrendingUp,
      color: 'green',
      action: () => onNavigate('trends')
    },
    {
      title: 'AI Support',
      subtitle: 'Chat with your wellness assistant',
      icon: MessageCircle,
      color: 'purple',
      action: () => onNavigate('chat')
    },
    {
      title: 'Crisis Support',
      subtitle: 'Immediate help resources',
      icon: AlertTriangle,
      color: 'red',
      action: () => onNavigate('crisis')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Wellness Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Current Streak</h3>
              <p className="text-2xl font-bold text-blue-600">{currentStreak} days</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Keep up the great work!</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Weekly Goal</h3>
              <p className="text-2xl font-bold text-green-600">{Math.round(weeklyGoalProgress)}%</p>
            </div>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${weeklyGoalProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Achievements</h3>
              <p className="text-2xl font-bold text-yellow-600">7</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Badges earned</p>
        </div>
      </div>

      {/* Today's Mood Status */}
      {todaysMood && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3">Today's Mood</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{todaysMood.emoji}</span>
            <div>
              <p className="font-medium text-gray-800 capitalize">{todaysMood.mood}</p>
              <p className="text-sm text-gray-600">{todaysMood.notes || 'No notes added'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group ${
                  action.completed ? 'ring-2 ring-green-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.subtitle}</p>
                  </div>
                  {action.completed && (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-3">Today's Wellness Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">1</span>
            </div>
            <p className="text-gray-700">Try the 5-4-3-2-1 grounding technique when feeling anxious.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">2</span>
            </div>
            <p className="text-gray-700">Take a 10-minute walk outside to boost your mood naturally.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">3</span>
            </div>
            <p className="text-gray-700">Practice gratitude by writing down three things you're thankful for.</p>
          </div>
        </div>
      </div>
    </div>
  );
};