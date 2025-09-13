import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { MoodCheckIn } from './components/MoodCheckIn';
import { WellnessTrends } from './components/WellnessTrends';
import { ChatSupport } from './components/ChatSupport';
import { CommunityForum } from './components/CommunityForum';
import { MeditationLibrary } from './components/MeditationLibrary';
import { CrisisSupport } from './components/CrisisSupport';
import { WellnessProvider } from './context/WellnessContext';

export type ActiveView = 'dashboard' | 'checkin' | 'trends' | 'chat' | 'community' | 'meditation' | 'crisis';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />;
      case 'checkin':
        return <MoodCheckIn onComplete={() => setActiveView('dashboard')} />;
      case 'trends':
        return <WellnessTrends />;
      case 'chat':
        return <ChatSupport />;
      case 'community':
        return <CommunityForum />;
      case 'meditation':
        return <MeditationLibrary />;
      case 'crisis':
        return <CrisisSupport />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <WellnessProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="pb-20">
          {renderActiveView()}
        </main>
        <Navigation activeView={activeView} onNavigate={setActiveView} />
      </div>
    </WellnessProvider>
  );
}

export default App;