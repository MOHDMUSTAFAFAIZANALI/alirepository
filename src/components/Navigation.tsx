import React from 'react';
import { Home, Heart, TrendingUp, MessageCircle, Users, Brain, AlertTriangle } from 'lucide-react';
import type { ActiveView } from '../App';

interface NavigationProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navItems = [
  { id: 'dashboard' as ActiveView, icon: Home, label: 'Home' },
  { id: 'checkin' as ActiveView, icon: Heart, label: 'Check-in' },
  { id: 'trends' as ActiveView, icon: TrendingUp, label: 'Trends' },
  { id: 'chat' as ActiveView, icon: MessageCircle, label: 'Support' },
  { id: 'meditation' as ActiveView, icon: Brain, label: 'Mindful' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 z-50">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-25'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};