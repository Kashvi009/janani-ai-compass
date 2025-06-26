
import React, { useState } from 'react';
import { MessageCircle, X, Heart, Sparkles } from 'lucide-react';
import { AIChatbot } from './AIChatbot';
import { SymptomAnalyzer } from './SymptomAnalyzer';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'analyzer'>('chat');

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50 group"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              <Heart className="h-3 w-3" />
            </div>
          </div>
          <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with JANANI AI
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      )}

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl border border-pink-100 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Heart className="h-6 w-6 animate-pulse" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-semibold">JANANI AI</h3>
                  <p className="text-xs text-pink-100">Your intelligent pregnancy companion</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex mt-3 bg-white/20 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'chat' 
                    ? 'bg-white text-pink-600' 
                    : 'text-pink-100 hover:text-white'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('analyzer')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'analyzer' 
                    ? 'bg-white text-pink-600' 
                    : 'text-pink-100 hover:text-white'
                }`}
              >
                🔍 Analyze
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' ? (
              <div className="h-full flex flex-col">
                <AIChatbot />
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-4">
                <SymptomAnalyzer />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
