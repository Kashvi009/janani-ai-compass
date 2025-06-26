
import React, { useState } from 'react';
import { FacialLogin } from '../components/FacialLogin';
import { SmartQuestionnaire } from '../components/SmartQuestionnaire';
import { WorkoutWellness } from '../components/WorkoutWellness';
import { UltrasoundScheduler } from '../components/UltrasoundScheduler';
import { AIModelExplanation } from '../components/AIModelExplanation';
import { FamilyMemberMode } from '../components/FamilyMemberMode';
import { Heart, Home, Calendar, Dumbbell, Brain, Users, LogIn, FileText } from 'lucide-react';

type DashboardView = 'home' | 'login' | 'questionnaire' | 'workout' | 'ultrasound' | 'ai-explanation' | 'family';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'login', label: 'Facial Login', icon: LogIn },
    { id: 'questionnaire', label: 'Health Profile', icon: FileText },
    { id: 'workout', label: 'Workout & Wellness', icon: Dumbbell },
    { id: 'ultrasound', label: 'Ultrasound Scheduler', icon: Calendar },
    { id: 'ai-explanation', label: 'How AI Works', icon: Brain },
    { id: 'family', label: 'Family Mode', icon: Users },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'login':
        return <FacialLogin />;
      case 'questionnaire':
        return <SmartQuestionnaire />;
      case 'workout':
        return <WorkoutWellness />;
      case 'ultrasound':
        return <UltrasoundScheduler />;
      case 'ai-explanation':
        return <AIModelExplanation />;
      case 'family':
        return <FamilyMemberMode />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    JANANI Dashboard
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  Your comprehensive maternal health companion with AI-powered insights and personalized care.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {navigationItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveView(item.id as DashboardView)}
                      className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group hover:scale-105"
                    >
                      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 mb-6 group-hover:from-pink-200 group-hover:to-purple-200 transition-all">
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-pink-600 mx-auto" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center">
                        {item.label}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 text-center">
                        {getFeatureDescription(item.id)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-16 bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                  Your Pregnancy Journey
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-pink-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-pink-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Week 20</h3>
                    <p className="text-sm sm:text-base text-gray-600">Current pregnancy week</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">3 Days</h3>
                    <p className="text-sm sm:text-base text-gray-600">Until next appointment</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Dumbbell className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">5 Times</h3>
                    <p className="text-sm sm:text-base text-gray-600">Workouts this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const getFeatureDescription = (id: string) => {
    switch (id) {
      case 'login':
        return 'Secure facial recognition login with biometric authentication and privacy protection.';
      case 'questionnaire':
        return 'Complete health profile setup with personalized questions and data encryption.';
      case 'workout':
        return 'Trimester-specific workout routines, yoga, and wellness programs.';
      case 'ultrasound':
        return 'Schedule appointments, upload reports, and track your pregnancy milestones.';
      case 'ai-explanation':
        return 'Learn how our AI analyzes your data and provides personalized recommendations.';
      case 'family':
        return 'Share your pregnancy journey with family members while maintaining privacy control.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setActiveView('home')}
            >
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                JANANI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as DashboardView)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <select
                value={activeView}
                onChange={(e) => setActiveView(e.target.value as DashboardView)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {navigationItems.map((item) => (
                  <option key={item.id} value={item.id} className="bg-white text-gray-800">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
