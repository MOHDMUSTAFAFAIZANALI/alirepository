import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  emoji: string;
  stressLevel: number;
  sleepHours: number;
  energyLevel: number;
  notes?: string;
  gratitude: string[];
}

interface WellnessContextType {
  wellnessData: MoodEntry[];
  todaysMood: MoodEntry | null;
  addMoodEntry: (entry: Omit<MoodEntry, 'id' | 'date'>) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

interface WellnessProviderProps {
  children: ReactNode;
}

export const WellnessProvider: React.FC<WellnessProviderProps> = ({ children }) => {
  const [wellnessData, setWellnessData] = useState<MoodEntry[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('wellnessData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setWellnessData(parsed);
      } catch (error) {
        console.error('Error loading wellness data:', error);
      }
    } else {
      // Initialize with sample data for demo
      const sampleData: MoodEntry[] = [
        {
          id: '1',
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'good',
          emoji: '😊',
          stressLevel: 2,
          sleepHours: 8,
          energyLevel: 4,
          notes: 'Great start to the week!',
          gratitude: ['Good coffee', 'Sunny weather', 'Friend\'s message']
        },
        {
          id: '2',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'okay',
          emoji: '😐',
          stressLevel: 3,
          sleepHours: 6,
          energyLevel: 3,
          notes: 'Busy day with assignments',
          gratitude: ['Study group support', 'Library quiet space', 'Evening walk']
        },
        {
          id: '3',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'not great',
          emoji: '😔',
          stressLevel: 4,
          sleepHours: 5,
          energyLevel: 2,
          notes: 'Feeling overwhelmed with midterms',
          gratitude: ['Family call', 'Hot tea', 'Cozy blanket']
        },
        {
          id: '4',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'good',
          emoji: '😊',
          stressLevel: 2,
          sleepHours: 7,
          energyLevel: 4,
          notes: 'Better day, got help from professor',
          gratitude: ['Helpful teacher', 'Understanding roommate', 'Good meal']
        },
        {
          id: '5',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'excellent',
          emoji: '😄',
          stressLevel: 1,
          sleepHours: 8,
          energyLevel: 5,
          notes: 'Aced the midterm!',
          gratitude: ['Success on exam', 'Celebration with friends', 'Beautiful sunset']
        },
        {
          id: '6',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 'good',
          emoji: '😊',
          stressLevel: 2,
          sleepHours: 7,
          energyLevel: 4,
          notes: 'Relaxing weekend',
          gratitude: ['Free time', 'Good book', 'Video call with family']
        }
      ];
      setWellnessData(sampleData);
    }
  }, []);

  // Save data to localStorage whenever wellnessData changes
  useEffect(() => {
    localStorage.setItem('wellnessData', JSON.stringify(wellnessData));
  }, [wellnessData]);

  const addMoodEntry = (entry: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setWellnessData(prev => [...prev, newEntry]);
  };

  // Get today's mood entry if it exists
  const todaysMood = wellnessData.find(entry => {
    const entryDate = new Date(entry.date);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  }) || null;

  const value: WellnessContextType = {
    wellnessData,
    todaysMood,
    addMoodEntry
  };

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  );
};