
import React, { useState } from 'react';
import { Users, Share2, Eye, EyeOff, Heart, Shield, Bell } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  access: 'full' | 'limited' | 'emergency';
  avatar: string;
  active: boolean;
}

export const FamilyMemberMode = () => {
  const [shareEnabled, setShareEnabled] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      relationship: 'Spouse',
      access: 'full',
      avatar: '👨',
      active: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      relationship: 'Mother',
      access: 'limited',
      avatar: '👵',
      active: false
    },
    {
      id: '3',
      name: 'Dr. Meera Singh',
      relationship: 'Primary Doctor',
      access: 'full',
      avatar: '👩‍⚕️',
      active: true
    }
  ]);

  const [sharedData, setSharedData] = useState({
    appointments: true,
    vitals: true,
    symptoms: false,
    reports: true,
    medications: true,
    emergencyContacts: true
  });

  const toggleDataSharing = (key: keyof typeof sharedData) => {
    setSharedData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'full': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Family Member Mode
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Share your pregnancy journey with loved ones while maintaining control over your privacy.
          </p>
        </div>

        {/* Main Toggle */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Share2 className="h-6 w-6 text-pink-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Family Sharing</h2>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shareEnabled}
                onChange={(e) => setShareEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-600"></div>
            </label>
          </div>

          {shareEnabled ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-medium">Family sharing is enabled</p>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Selected family members can now access your shared health information.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <EyeOff className="h-5 w-5 text-gray-600" />
                <p className="text-gray-800 font-medium">Family sharing is disabled</p>
              </div>
              <p className="text-gray-700 text-sm mt-1">
                Your health information is private and not shared with anyone.
              </p>
            </div>
          )}
        </div>

        {/* Family Members */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Family Members</h3>
          
          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{member.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.relationship}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAccessColor(member.access)}`}>
                    {member.access} access
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${member.active ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                    <span className="text-sm text-gray-600">
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Add Family Member</span>
          </button>
        </div>

        {/* Data Sharing Controls */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">What to Share</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(sharedData).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">
                    {key === 'appointments' && '📅'}
                    {key === 'vitals' && '💓'}
                    {key === 'symptoms' && '🤒'}
                    {key === 'reports' && '📋'}
                    {key === 'medications' && '💊'}
                    {key === 'emergencyContacts' && '🚨'}
                  </div>
                  <span className="font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => toggleDataSharing(key as keyof typeof sharedData)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-600"></div>
                </label>
              </label>
            ))}
          </div>
        </div>

        {/* Shared Dashboard Preview */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Shared Dashboard Preview</h3>
          <p className="text-gray-600 mb-6">This is what your family members will see when they access your shared information.</p>
          
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-dashed border-pink-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell className="h-4 w-4 text-blue-500" />
                  <h4 className="font-semibold text-gray-800">Next Appointment</h4>
                </div>
                <p className="text-sm text-gray-600">Feb 20, 2024 - Anatomy Scan</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <h4 className="font-semibold text-gray-800">Latest Vitals</h4>
                </div>
                <p className="text-sm text-gray-600">BP: 120/80 | Weight: 65kg</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <h4 className="font-semibold text-gray-800">Pregnancy Week</h4>
                </div>
                <p className="text-sm text-gray-600">Week 20 - Second Trimester</p>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              <Eye className="h-4 w-4 inline mr-1" />
              This is a preview of the shared family dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
