import React from 'react';
import { Heart, Bell, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">MindfulMe</h1>
            <p className="text-sm text-gray-600">{greeting}, Alex</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Bell className="w-5 h-5 text-blue-600" />
          </button>
          <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Settings className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </header>
  );
};