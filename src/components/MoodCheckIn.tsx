import React, { useState } from 'react';
import { ArrowLeft, Send, Star } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

interface MoodCheckInProps {
  onComplete: () => void;
}

const moodOptions = [
  { mood: 'excellent', emoji: '😄', color: 'green', label: 'Excellent' },
  { mood: 'good', emoji: '😊', color: 'blue', label: 'Good' },
  { mood: 'okay', emoji: '😐', color: 'yellow', label: 'Okay' },
  { mood: 'not great', emoji: '😔', color: 'orange', label: 'Not Great' },
  { mood: 'terrible', emoji: '😢', color: 'red', label: 'Terrible' }
];

const stressLevels = [1, 2, 3, 4, 5];

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onComplete }) => {
  const { addMoodEntry } = useWellness();
  const [selectedMood, setSelectedMood] = useState('');
  const [stressLevel, setStressLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(8);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [notes, setNotes] = useState('');
  const [gratitude, setGratitude] = useState(['', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      const moodData = moodOptions.find(m => m.mood === selectedMood);
      addMoodEntry({
        mood: selectedMood,
        emoji: moodData?.emoji || '😐',
        stressLevel,
        sleepHours,
        energyLevel,
        notes: notes.trim(),
        gratitude: gratitude.filter(item => item.trim() !== '')
      });
      onComplete();
    }
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-blue-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onComplete}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Daily Check-In</h2>
          </div>
          <p className="text-gray-600">Take a moment to reflect on how you're feeling today.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How are you feeling today?
            </label>
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((option) => (
                <button
                  key={option.mood}
                  type="button"
                  onClick={() => setSelectedMood(option.mood)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedMood === option.mood
                      ? `border-${option.color}-300 bg-${option.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div className="text-xs font-medium text-gray-700">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Stress Level: {stressLevel}/5
            </label>
            <div className="flex gap-2">
              {stressLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setStressLevel(level)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    stressLevel >= level
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Star className={`w-5 h-5 mx-auto ${stressLevel >= level ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Hours of sleep last night: {sleepHours}
            </label>
            <input
              type="range"
              min="0"
              max="12"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Energy Level: {energyLevel}/5
            </label>
            <div className="flex gap-2">
              {stressLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEnergyLevel(level)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    energyLevel >= level
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Star className={`w-5 h-5 mx-auto ${energyLevel >= level ? 'text-green-500 fill-green-500' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Gratitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Three things you're grateful for today:
            </label>
            <div className="space-y-3">
              {gratitude.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => updateGratitude(index, e.target.value)}
                  placeholder={`Gratitude ${index + 1}...`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Additional notes (optional):
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your day? Any thoughts you'd like to share..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedMood}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
            Complete Check-In
          </button>
        </form>
      </div>
    </div>
  );
};