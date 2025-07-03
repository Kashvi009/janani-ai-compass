import React, { useState } from 'react';
import { LoginSignup } from '../components/LoginSignup';
import { FacialLogin } from '../components/FacialLogin';
import { SmartQuestionnaire } from '../components/SmartQuestionnaire';
import { WorkoutWellness } from '../components/WorkoutWellness';
import { UltrasoundScheduler } from '../components/UltrasoundScheduler';
import { AIModelExplanation } from '../components/AIModelExplanation';
import { FamilyMemberMode } from '../components/FamilyMemberMode';
import { HealthScorecard } from '../components/HealthScorecard';
import { AIAssistant } from '../components/AIAssistant';
import { Heart, Home, Calendar, Dumbbell, Brain, Users, LogIn, FileText, LogOut, User, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

type DashboardView = 'home' | 'login' | 'questionnaire' | 'workout' | 'ultrasound' | 'ai-explanation' | 'family' | 'health-scorecard';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'login', label: 'Facial Login', icon: LogIn },
    { id: 'health-scorecard', label: 'Health Scorecard', icon: Activity },
    { id: 'questionnaire', label: 'Health Profile', icon: FileText },
    { id: 'workout', label: 'Workout & Wellness', icon: Dumbbell },
    { id: 'ultrasound', label: 'Ultrasound Scheduler', icon: Calendar },
    { id: 'ai-explanation', label: 'How AI Works', icon: Brain },
    { id: 'family', label: 'Family Mode', icon: Users },
  ];

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('home');
  };

  const handleFeatureAccess = (viewId: DashboardView) => {
    if (!isAuthenticated && viewId !== 'home') {
      setShowLoginModal(true);
      return;
    }
    setActiveView(viewId);
  };

  const renderContent = () => {
    if (!isAuthenticated && activeView !== 'home') {
      return null;
    }

    switch (activeView) {
      case 'login':
        return <FacialLogin />;
      case 'health-scorecard':
        return <HealthScorecard />;
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
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    JANANI Dashboard
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                  Your comprehensive maternal health companion with AI-powered insights and personalized care.
                </p>
                {!isAuthenticated && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
                    >
                      <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Login to Access Features</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {navigationItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  const isLocked = !isAuthenticated;
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleFeatureAccess(item.id as DashboardView)}
                      className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group hover:scale-105 relative ${
                        isLocked ? 'opacity-75' : ''
                      }`}
                    >
                      {isLocked && (
                        <div className="absolute top-2 right-2 bg-pink-100 p-1 rounded-full">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        </div>
                      )}
                      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 group-hover:from-pink-200 group-hover:to-purple-200 transition-all">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-pink-600 mx-auto" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                        {item.label}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed">
                        {getFeatureDescription(item.id)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats - Only show when authenticated */}
              {isAuthenticated && (
                <div className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                    Your Pregnancy Journey
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="bg-pink-100 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                        <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Week 20</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Current pregnancy week</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2">3 Days</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Until next appointment</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                        <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2">5 Times</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Workouts this week</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                        <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2">8.5/10</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Health score</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const getFeatureDescription = (id: string) => {
    switch (id) {
      case 'login':
        return 'Secure facial recognition login with biometric authentication and privacy protection.';
      case 'health-scorecard':
        return 'Track your health metrics with AI-powered scoring and gamified wellness rewards.';
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setActiveView('home')}
              >
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  JANANI
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                <Link 
                  to="/"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleFeatureAccess(item.id as DashboardView)}
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
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 ml-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex items-center space-x-2">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                )}
                <select
                  value={activeView}
                  onChange={(e) => handleFeatureAccess(e.target.value as DashboardView)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="home" className="bg-white text-gray-800">Dashboard</option>
                  {navigationItems.slice(1).map((item) => (
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

        {/* AI Assistant - Always visible */}
        <AIAssistant />
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Access Required</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <LoginSignup onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
