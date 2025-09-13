import React from 'react';
import { Phone, MessageCircle, AlertTriangle, Heart, MapPin, Clock, ExternalLink } from 'lucide-react';

interface CrisisResource {
  id: string;
  name: string;
  description: string;
  phone: string;
  text?: string;
  website?: string;
  available: string;
  type: 'crisis' | 'support' | 'emergency';
}

export const CrisisSupport: React.FC = () => {
  const crisisResources: CrisisResource[] = [
    {
      id: '1',
      name: '988 Suicide & Crisis Lifeline',
      description: 'Free and confidential emotional support for people in suicidal crisis or emotional distress.',
      phone: '988',
      text: '988',
      website: 'https://988lifeline.org',
      available: '24/7',
      type: 'crisis'
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      description: 'Free, 24/7 support for those in crisis via text message.',
      phone: '',
      text: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      available: '24/7',
      type: 'crisis'
    },
    {
      id: '3',
      name: 'NAMI Helpline',
      description: 'Information, referrals and support for people with mental health conditions.',
      phone: '1-800-950-NAMI (6264)',
      website: 'https://nami.org',
      available: 'Mon-Fri 10am-10pm ET',
      type: 'support'
    },
    {
      id: '4',
      name: 'Emergency Services',
      description: 'For immediate medical emergencies and life-threatening situations.',
      phone: '911',
      available: '24/7',
      type: 'emergency'
    }
  ];

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'border-red-200 bg-red-50';
      case 'support': return 'border-blue-200 bg-blue-50';
      case 'emergency': return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'crisis': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'support': return <Heart className="w-6 h-6 text-blue-600" />;
      case 'emergency': return <Phone className="w-6 h-6 text-orange-600" />;
      default: return <Phone className="w-6 h-6 text-gray-600" />;
    }
  };

  const immediateSteps = [
    {
      title: 'Take Deep Breaths',
      description: 'Focus on slow, deep breathing to help calm your nervous system.',
      icon: '🫁'
    },
    {
      title: 'Find a Safe Space',
      description: 'Move to a comfortable, secure location where you feel protected.',
      icon: '🏠'
    },
    {
      title: 'Reach Out',
      description: 'Contact a crisis helpline, trusted friend, or emergency services.',
      icon: '📞'
    },
    {
      title: 'Stay Present',
      description: 'Use grounding techniques like naming 5 things you can see around you.',
      icon: '👁️'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Emergency Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <div>
            <h2 className="text-xl font-bold text-red-800">Crisis Support Resources</h2>
            <p className="text-red-700">If you're in immediate danger, call 911</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-red-200">
          <p className="text-gray-800 font-medium mb-2">You are not alone. Help is available.</p>
          <p className="text-gray-700 text-sm">
            If you're having thoughts of suicide or self-harm, please reach out immediately. 
            These feelings can be temporary, and support is available to help you through this difficult time.
          </p>
        </div>
      </div>

      {/* Immediate Steps */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">If You're in Crisis Right Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {immediateSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-2xl">{step.icon}</span>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Crisis Support Contacts</h3>
        {crisisResources.map((resource) => (
          <div key={resource.id} className={`rounded-xl p-6 border-2 ${getResourceColor(resource.type)}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getResourceIcon(resource.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">{resource.name}</h4>
                <p className="text-gray-700 mb-4">{resource.description}</p>
                
                <div className="space-y-3">
                  {resource.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`tel:${resource.phone}`}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        {resource.phone}
                      </a>
                    </div>
                  )}
                  
                  {resource.text && (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{resource.text}</span>
                    </div>
                  )}
                  
                  {resource.website && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                      <a 
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{resource.available}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Plan */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Your Safety Plan</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">Warning Signs</h4>
            <p className="text-green-700 text-sm">
              Identify early warning signs that indicate you might be entering a crisis (thoughts, feelings, behaviors).
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">Coping Strategies</h4>
            <p className="text-blue-700 text-sm">
              List activities and strategies that help you feel better and can be done independently.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">Support Contacts</h4>
            <p className="text-purple-700 text-sm">
              Keep a list of trusted friends, family members, or professionals you can contact for support.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h4 className="font-medium text-yellow-800 mb-2">Safe Environment</h4>
            <p className="text-yellow-700 text-sm">
              Plan how to make your environment safer by removing or restricting access to harmful items.
            </p>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          Start Building My Safety Plan
        </button>
      </div>

      {/* Local Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Find Local Resources</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Connect with mental health professionals and support services in your area.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors text-left">
            <h4 className="font-medium text-blue-800 mb-1">Campus Counseling Center</h4>
            <p className="text-blue-700 text-sm">Free counseling services for students</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors text-left">
            <h4 className="font-medium text-green-800 mb-1">Community Mental Health</h4>
            <p className="text-green-700 text-sm">Local therapy and support groups</p>
          </button>
        </div>
      </div>
    </div>
  );
};