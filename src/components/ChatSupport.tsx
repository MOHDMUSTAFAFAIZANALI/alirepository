import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'normal' | 'crisis' | 'support';
}

export const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm MindfulBot, your personal wellness assistant. I'm here to provide support, coping strategies, and a listening ear. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): { content: string; type: 'normal' | 'crisis' | 'support' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'can\'t go on', 'want to die'];
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        content: "I'm really concerned about you right now. Please know that you're not alone and help is available. Would you like me to connect you with crisis support resources? You can also call the 988 Suicide & Crisis Lifeline (call or text 988) for immediate support.",
        type: 'crisis'
      };
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
      return {
        content: "I hear that you're feeling anxious. Let's try a quick grounding technique together: Can you name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste? This can help bring you back to the present moment.",
        type: 'support'
      };
    }

    // Depression responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return {
        content: "I'm sorry you're feeling down. Depression can make everything feel heavier. Remember that these feelings are temporary, even when they don't feel like it. Have you been able to do any small self-care activities today, like taking a shower, eating a meal, or stepping outside?",
        type: 'support'
      };
    }

    // Stress responses
    if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed')) {
      return {
        content: "Stress can feel overwhelming, but you're taking a positive step by reaching out. Let's break things down: What's the most pressing thing on your mind right now? Sometimes tackling one small task can help reduce the overall feeling of being overwhelmed.",
        type: 'support'
      };
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return {
        content: "Sleep is so important for mental health. If you're having trouble sleeping, try creating a wind-down routine: dim the lights an hour before bed, put away screens, and try some deep breathing or gentle stretching. How has your sleep been lately?",
        type: 'support'
      };
    }

    // General positive responses
    const positiveResponses = [
      "Thank you for sharing with me. Your feelings are valid, and I'm here to support you.",
      "It sounds like you're going through a lot right now. What's one small thing that brought you a moment of peace today?",
      "I appreciate you opening up. Sometimes just talking about what we're experiencing can help us process it.",
      "You're being very brave by reaching out for support. What would be most helpful for you right now?"
    ];

    return {
      content: positiveResponses[Math.floor(Math.random() * positiveResponses.length)],
      type: 'normal'
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        isBot: true,
        timestamp: new Date(),
        type: botResponse.type
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-blue-100 h-[70vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">MindfulBot</h3>
            <p className="text-sm text-green-600">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-green-500 to-blue-500'
                }`}>
                  {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.isBot
                    ? message.type === 'crisis'
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : message.type === 'support'
                      ? 'bg-blue-50 border border-blue-200 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.type === 'crisis' && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-medium">Crisis Support Available</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Heart className="w-3 h-3" />
            <span>This is AI support. For immediate crisis help, call 988</span>
          </div>
        </div>
      </div>
    </div>
  );
};