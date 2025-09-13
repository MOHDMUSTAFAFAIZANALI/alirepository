import React, { useState } from 'react';
import { Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const WellnessTrends: React.FC = () => {
  const { wellnessData } = useWellness();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'okay': return 'bg-yellow-500';
      case 'not great': return 'bg-orange-500';
      case 'terrible': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMoodScore = (mood: string) => {
    switch (mood) {
      case 'excellent': return 5;
      case 'good': return 4;
      case 'okay': return 3;
      case 'not great': return 2;
      case 'terrible': return 1;
      default: return 3;
    }
  };

  const getFilteredData = () => {
    const now = new Date();
    const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const cutoff = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return wellnessData.filter(entry => new Date(entry.date) >= cutoff);
  };

  const filteredData = getFilteredData();
  const averageMood = filteredData.length > 0 
    ? filteredData.reduce((sum, entry) => sum + getMoodScore(entry.mood), 0) / filteredData.length 
    : 3;
  
  const averageStress = filteredData.length > 0
    ? filteredData.reduce((sum, entry) => sum + entry.stressLevel, 0) / filteredData.length
    : 3;

  const averageSleep = filteredData.length > 0
    ? filteredData.reduce((sum, entry) => sum + entry.sleepHours, 0) / filteredData.length
    : 8;

  const moodDistribution = filteredData.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Wellness Trends</h2>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {period === 'week' ? '7 Days' : period === 'month' ? '30 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
        <p className="text-gray-600">Track your wellness journey over time</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-800">Average Mood</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-green-600">{averageMood.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">/5.0</span>
          </div>
          <p className="text-sm text-gray-600">
            {averageMood >= 4 ? 'Great mood overall!' : averageMood >= 3 ? 'Steady mood' : 'Room for improvement'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Average Sleep</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-blue-600">{averageSleep.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">hours</span>
          </div>
          <p className="text-sm text-gray-600">
            {averageSleep >= 7 ? 'Good sleep habits!' : 'Try to get more rest'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center gap-3 mb-3">
            <PieChart className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-800">Average Stress</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-orange-600">{averageStress.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">/5.0</span>
          </div>
          <p className="text-sm text-gray-600">
            {averageStress <= 2 ? 'Low stress levels' : averageStress <= 3 ? 'Manageable stress' : 'High stress detected'}
          </p>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-4">Mood Over Time</h3>
        <div className="space-y-3">
          {filteredData.slice(-14).map((entry, index) => {
            const date = new Date(entry.date);
            const score = getMoodScore(entry.mood);
            const width = (score / 5) * 100;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600">
                  {date.getMonth() + 1}/{date.getDate()}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getMoodColor(entry.mood)}`}
                    style={{ width: `${width}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-sm font-medium text-white capitalize">{entry.mood}</span>
                  </div>
                </div>
                <span className="text-lg">{entry.emoji}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-4">Mood Distribution</h3>
        <div className="space-y-3">
          {Object.entries(moodDistribution).map(([mood, count]) => {
            const percentage = (count / filteredData.length) * 100;
            const moodData = [
              { mood: 'excellent', emoji: '😄' },
              { mood: 'good', emoji: '😊' },
              { mood: 'okay', emoji: '😐' },
              { mood: 'not great', emoji: '😔' },
              { mood: 'terrible', emoji: '😢' }
            ].find(m => m.mood === mood);
            
            return (
              <div key={mood} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-24">
                  <span className="text-lg">{moodData?.emoji}</span>
                  <span className="text-sm text-gray-600 capitalize">{mood}</span>
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getMoodColor(mood)}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count} days</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-semibold text-gray-800 mb-4">AI Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Your mood shows a positive correlation with sleep quality. Days with 7+ hours of sleep tend to have better mood ratings.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Stress levels are typically lower on days when you practice gratitude exercises.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">
              Your most consistent positive days occur on weekends, suggesting work-life balance opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};