import React, { useState } from 'react';
import { HealthScorecard } from "@/components/HealthScorecard";
import { Navigation } from "@/components/Navigation";
import { Heart, Activity, Calendar, Baby, TrendingUp, Settings, Bell, User } from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'health' | 'pregnancy' | 'profile'>('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'health', label: 'Health Score', icon: Heart },
    { id: 'pregnancy', label: 'Pregnancy', icon: Baby },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navigation />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white/80 backdrop-blur-sm border-r border-pink-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  JANANI
                </span>
              </div>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as any)}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-xl w-full transition-all ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                          : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {activeSection === 'overview' && <DashboardOverview />}
          {activeSection === 'health' && <HealthScorecard />}
          {activeSection === 'pregnancy' && <PregnancyTracker />}
          {activeSection === 'profile' && <ProfileSettings />}
        </div>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back, Mama! 🌸
          </span>
        </h1>
        <p className="text-gray-600">Your personalized maternal health dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="text-2xl font-bold text-pink-600">8.5/10</p>
            </div>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pregnancy Week</p>
              <p className="text-2xl font-bold text-purple-600">24</p>
            </div>
            <Baby className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Streak</p>
              <p className="text-2xl font-bold text-orange-600">7 days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Appointment</p>
              <p className="text-2xl font-bold text-blue-600">Dec 15</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-2xl">
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
            <span className="text-gray-700">Health data logged - Blood pressure recorded</span>
            <span className="text-sm text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-2xl">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Symptom tracker updated - Feeling good!</span>
            <span className="text-sm text-gray-500 ml-auto">5h ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-2xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Weekly goal achieved - 50 points earned!</span>
            <span className="text-sm text-gray-500 ml-auto">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pregnancy Tracker Component
const PregnancyTracker = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pregnancy Journey</h2>
        <p className="text-gray-600">Track your beautiful journey week by week</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🤱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Week 24 - Second Trimester</h3>
          <p className="text-gray-600">Your baby is about the size of a corn cob!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-pink-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Baby Development</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Hearing is developing</li>
              <li>• Skin is becoming less transparent</li>
              <li>• Weight: ~1.3 pounds</li>
              <li>• Length: ~11.8 inches</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">What to Expect</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You may feel more energetic</li>
              <li>• Baby's movements are stronger</li>
              <li>• Glucose screening test coming up</li>
              <li>• Consider prenatal classes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Settings</h2>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Jane Doe</h3>
            <p className="text-gray-600">jane.doe@example.com</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Personal Information</h4>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Full Name</label>
                <input type="text" value="Jane Doe" className="w-full p-3 border border-pink-200 rounded-lg" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Due Date</label>
                <input type="date" className="w-full p-3 border border-pink-200 rounded-lg" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Health Information</h4>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Blood Type</label>
                <select className="w-full p-3 border border-pink-200 rounded-lg">
                  <option>O+</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>AB+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">PCOS/PCOD</label>
                <select className="w-full p-3 border border-pink-200 rounded-lg">
                  <option>No</option>
                  <option>Yes - PCOS</option>
                  <option>Yes - PCOD</option>
                </select>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;