import React, { useState } from 'react';
import { Home, User, Activity, Heart, Bot, Calendar, Baby, TrendingUp, Trophy, Target, Star } from 'lucide-react';
import { HealthScorecard } from "@/components/HealthScorecard";
import { SymptomTracker } from "@/components/SymptomTracker";
import { PersonalizedAIAssistant } from "@/components/PersonalizedAIAssistant";
import { ProfileEditor } from "@/components/ProfileEditor";
import { useProfile } from "@/hooks/useProfile";
import { useNashHealthScore } from "@/hooks/useNashHealthScore";
import { useGameification } from "@/hooks/useGameification";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'health' | 'symptoms' | 'ai'>('overview');
  const { profile } = useProfile();
  const { nashResult } = useNashHealthScore();
  const { userPoints } = useGameification();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home, description: 'Your health snapshot' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Personal information' },
    { id: 'health', label: 'Health Score', icon: Activity, description: 'Nash equilibrium analysis' },
    { id: 'symptoms', label: 'Symptoms', icon: Heart, description: 'Track & analyze patterns' },
    { id: 'ai', label: 'AI Assistant', icon: Bot, description: 'Personalized guidance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with personalized greeting */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {profile?.full_name || 'Beautiful Mama'}! 🌸
            </span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {profile?.pregnancy_week ? `Week ${profile.pregnancy_week} of your beautiful journey` : 'Your personalized health dashboard'}
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Health Score</p>
                <p className="text-xl font-bold text-pink-600">{nashResult.finalScore}/10</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-lg font-bold text-purple-600">{nashResult.balanceStatus}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-xl font-bold text-blue-600">{userPoints?.level || 1}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Points</p>
                <p className="text-xl font-bold text-green-600">{userPoints?.total_points || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-3xl p-2 mb-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-3 rounded-xl transition-all text-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <span className="text-sm font-medium block">{tab.label}</span>
                    <span className={`text-xs ${activeTab === tab.id ? 'text-pink-100' : 'text-gray-400'}`}>
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Health Summary */}
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-pink-500" />
                    Health Balance Summary
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{nashResult.flowerLevel}</div>
                    <div className="text-3xl font-bold text-gray-800">{nashResult.finalScore}/10</div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      nashResult.status === 'Stable' ? 'bg-green-100 text-green-700' :
                      nashResult.status === 'Caution' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {nashResult.status}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {nashResult.recommendations.slice(0, 2).map((rec, index) => (
                      <div key={index} className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick AI Chat */}
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-purple-500" />
                    AI Assistant Preview
                  </h3>
                  <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <p className="text-gray-600 mb-3">Ready to help with personalized guidance</p>
                      <button
                        onClick={() => setActiveTab('ai')}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all"
                      >
                        Start Conversation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Recent Activity & Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-pink-50 rounded-2xl">
                    <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Symptoms Logged</p>
                    <p className="text-2xl font-bold text-pink-600">Today</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Health Records</p>
                    <p className="text-2xl font-bold text-purple-600">Updated</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-2xl">
                    <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800">Daily Streak</p>
                    <p className="text-2xl font-bold text-blue-600">{userPoints?.daily_streak || 0} days</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileEditor />}
          {activeTab === 'health' && <HealthScorecard />}
          {activeTab === 'symptoms' && <SymptomTracker />}
          {activeTab === 'ai' && <PersonalizedAIAssistant />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;