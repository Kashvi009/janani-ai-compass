import React, { useState } from 'react';
import { Home, User, Activity, Heart, Bot, Calendar, LogOut, TrendingUp, Trophy, Target, Star, ArrowLeft, Users, Sparkles, BookOpen, Microscope } from 'lucide-react';
import { HealthScorecard } from "@/components/HealthScorecard";
import { SymptomTracker } from "@/components/SymptomTracker";
import { PersonalizedAIAssistant } from "@/components/PersonalizedAIAssistant";
import { ProfileEditor } from "@/components/ProfileEditor";
import { FamilyMemberMode } from "@/components/FamilyMemberMode";
import { Features } from "@/components/Features";
import { AIModelExplanation } from "@/components/AIModelExplanation";
import { Research } from "@/components/Research";
import { Testimonials } from "@/components/Testimonials";
import { PCOSTracker } from "@/components/PCOSTracker";
import { UltrasoundScheduler } from "@/components/UltrasoundScheduler";
import { useProfile } from "@/hooks/useProfile";
import { useNashHealthScore } from "@/hooks/useNashHealthScore";
import { useGameification } from "@/hooks/useGameification";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'health' | 'symptoms' | 'ai' | 'family' | 'pcos' | 'ultrasound' | 'features' | 'research' | 'stories'>('overview');
  const { profile } = useProfile();
  const { nashResult } = useNashHealthScore();
  const { userPoints } = useGameification();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home, description: 'Your health snapshot' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Personal information' },
    { id: 'health', label: 'Health Score', icon: Activity, description: 'Nash equilibrium analysis' },
    { id: 'symptoms', label: 'Symptoms', icon: Heart, description: 'Track & analyze patterns' },
    { id: 'ai', label: 'AI Technology', icon: Bot, description: 'Personalized guidance' },
    { id: 'pcos', label: 'PCOS Tracker', icon: Heart, description: 'Track PCOS symptoms' },
    { id: 'ultrasound', label: 'Ultrasound', icon: Calendar, description: 'Schedule & manage scans' },
    { id: 'family', label: 'Family Mode', icon: Users, description: 'Care for loved ones' },
    { id: 'research', label: 'Research', icon: Microscope, description: 'Trusted insights' },
    { id: 'stories', label: 'Stories', icon: BookOpen, description: 'Inspiring journeys' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="pt-6 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back to Website and Logout */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-pink-600 border border-pink-100 w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Main Website</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all w-fit"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center space-y-1 py-3 px-2 rounded-xl transition-all text-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">{tab.label}</span>
                    <span className={`text-xs hidden sm:block ${activeTab === tab.id ? 'text-pink-100' : 'text-gray-400'}`}>
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
          {activeTab === 'ai' && (
            <div className="space-y-8">
              <PersonalizedAIAssistant />
              <AIModelExplanation />
            </div>
          )}
          {activeTab === 'pcos' && (
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <PCOSTracker />
            </div>
          )}
          {activeTab === 'ultrasound' && <UltrasoundScheduler />}
          {activeTab === 'family' && <FamilyMemberMode />}
          {activeTab === 'research' && <Research />}
          {activeTab === 'stories' && <Testimonials />}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;