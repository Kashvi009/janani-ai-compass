import React, { useState } from 'react';
import { HealthScorecard } from "@/components/HealthScorecard";
import { SymptomTracker } from "@/components/SymptomTracker";
import { Navigation } from "@/components/Navigation";
import { useProfile } from "@/hooks/useProfile";
import { useGameification } from "@/hooks/useGameification";
import { Heart, Activity, Calendar, Baby, TrendingUp, Settings, Bell, User, ClipboardList, Trophy } from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'health' | 'symptoms' | 'pregnancy' | 'profile'>('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'health', label: 'Health Score', icon: Heart },
    { id: 'symptoms', label: 'Symptoms', icon: ClipboardList },
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
          {activeSection === 'symptoms' && <div className="p-6"><SymptomTracker /></div>}
          {activeSection === 'pregnancy' && <PregnancyTracker />}
          {activeSection === 'profile' && <ProfileSettings />}
        </div>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const { profile } = useProfile();
  const { userPoints, getLevel, getWeeklyProgress } = useGameification();
  
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back, {profile?.full_name || 'Mama'}! 🌸
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
              <p className="text-2xl font-bold text-purple-600">{profile?.pregnancy_week || 'Not set'}</p>
            </div>
            <Baby className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Streak</p>
              <p className="text-2xl font-bold text-orange-600">{userPoints?.daily_streak || 0} days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Level & Points</p>
              <p className="text-2xl font-bold text-blue-600">Lv.{getLevel()} ({userPoints?.total_points || 0}pts)</p>
            </div>
            <Trophy className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Gamification Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress 🌸</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Weekly Goal Progress</span>
              <span>{userPoints?.weekly_progress || 0}/{userPoints?.weekly_goal || 50} points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all" 
                style={{ width: `${(getWeeklyProgress() * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {userPoints?.badges && userPoints.badges.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Badges</h4>
              <div className="flex flex-wrap gap-2">
                {userPoints.badges.map((badge, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    🏆 {badge.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
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
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    pregnancy_week: '',
    due_date: '',
    blood_type: '',
    has_pcos: false,
    age: '',
    height_cm: '',
    weight_kg: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    doctor_name: '',
    doctor_phone: ''
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        pregnancy_week: profile.pregnancy_week?.toString() || '',
        due_date: profile.due_date || '',
        blood_type: profile.blood_type || '',
        has_pcos: profile.has_pcos || false,
        age: profile.age?.toString() || '',
        height_cm: profile.height_cm?.toString() || '',
        weight_kg: profile.weight_kg?.toString() || '',
        emergency_contact_name: profile.emergency_contact_name || '',
        emergency_contact_phone: profile.emergency_contact_phone || '',
        doctor_name: profile.doctor_name || '',
        doctor_phone: profile.doctor_phone || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const updates: any = {};
    
    if (formData.full_name) updates.full_name = formData.full_name;
    if (formData.pregnancy_week) updates.pregnancy_week = parseInt(formData.pregnancy_week);
    if (formData.due_date) updates.due_date = formData.due_date;
    if (formData.blood_type) updates.blood_type = formData.blood_type;
    updates.has_pcos = formData.has_pcos;
    if (formData.age) updates.age = parseInt(formData.age);
    if (formData.height_cm) updates.height_cm = parseInt(formData.height_cm);
    if (formData.weight_kg) updates.weight_kg = parseFloat(formData.weight_kg);
    if (formData.emergency_contact_name) updates.emergency_contact_name = formData.emergency_contact_name;
    if (formData.emergency_contact_phone) updates.emergency_contact_phone = formData.emergency_contact_phone;
    if (formData.doctor_name) updates.doctor_name = formData.doctor_name;
    if (formData.doctor_phone) updates.doctor_phone = formData.doctor_phone;

    await updateProfile(updates);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Settings</h2>
        <p className="text-gray-600">Manage your account and health information</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.full_name ? getInitials(profile.full_name) : 'U'}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{profile?.full_name || 'User'}</h3>
            <p className="text-gray-600">Member since {profile ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Personal Information</h4>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Full Name</label>
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Pregnancy Week</label>
                <input 
                  type="number" 
                  value={formData.pregnancy_week}
                  onChange={(e) => setFormData(prev => ({ ...prev, pregnancy_week: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Due Date</label>
                <input 
                  type="date" 
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Health Information</h4>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Blood Type</label>
                <select 
                  value={formData.blood_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, blood_type: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50"
                >
                  <option value="">Select Blood Type</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.has_pcos}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_pcos: e.target.checked }))}
                    disabled={!isEditing}
                    className="rounded border-pink-200"
                  />
                  <span className="text-sm text-gray-600">I have PCOS/PCOD</span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Height (cm)</label>
                <input 
                  type="number" 
                  value={formData.height_cm}
                  onChange={(e) => setFormData(prev => ({ ...prev, height_cm: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.weight_kg}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight_kg: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-pink-200 rounded-lg disabled:bg-gray-50" 
                />
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Emergency Contact</h4>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Contact Name</label>
                  <input 
                    type="text" 
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                    className="w-full p-3 border border-pink-200 rounded-lg" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Contact Phone</label>
                  <input 
                    type="tel" 
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                    className="w-full p-3 border border-pink-200 rounded-lg" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Doctor Information</h4>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Doctor Name</label>
                  <input 
                    type="text" 
                    value={formData.doctor_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctor_name: e.target.value }))}
                    className="w-full p-3 border border-pink-200 rounded-lg" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Doctor Phone</label>
                  <input 
                    type="tel" 
                    value={formData.doctor_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctor_phone: e.target.value }))}
                    className="w-full p-3 border border-pink-200 rounded-lg" 
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-2xl font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;