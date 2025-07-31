
import React, { useState } from 'react';
import { Heart, Activity, AlertTriangle, CheckCircle, Trophy, Star, Calendar, Plus, TrendingUp, LogOut, Target, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useHealthScorecard } from '@/hooks/useHealthScorecard';
import { useHealthScore } from '@/hooks/useHealthScore';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  userId: string;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodSugarFasting: number;
  bloodSugarPostMeal: number;
  weight: number;
  bmi: number;
  symptoms: string[];
  recordedAt: Date;
}

export const HealthScorecard = () => {
  const { 
    healthRecords, 
    currentScore, 
    gamificationData, 
    loading,
    addHealthRecord 
  } = useHealthScorecard();
  
  const { healthResult, healthFactors, updateFactors } = useHealthScore();

  const [healthRecord, setHealthRecord] = useState<Partial<HealthRecord>>({
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    bloodSugarFasting: 90,
    bloodSugarPostMeal: 140,
    weight: 65,
    bmi: 23.5,
    symptoms: []
  });

  const [activeTab, setActiveTab] = useState<'scorecard' | 'records' | 'rewards'>('scorecard');
  const [showRecordForm, setShowRecordForm] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable': return 'text-green-600 bg-green-100';
      case 'Caution': return 'text-yellow-600 bg-yellow-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Stable': return <CheckCircle className="h-5 w-5" />;
      case 'Caution': return <AlertTriangle className="h-5 w-5" />;
      case 'Critical': return <AlertTriangle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const handleRecordSubmit = async () => {
    try {
      await addHealthRecord(healthRecord);
      setShowRecordForm(false);
      // Reset form
      setHealthRecord({
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        bloodSugarFasting: 90,
        bloodSugarPostMeal: 140,
        weight: 65,
        bmi: 23.5
      });
    } catch (error) {
      console.error('Failed to submit health record:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Default values for when no data exists yet
  const displayScore = currentScore || {
    totalScore: 8.5,
    bloodPressureScore: 9,
    bloodSugarScore: 8,
    weightScore: 9,
    symptomScore: 8,
    status: 'Stable' as const,
    lastUpdated: new Date()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Your Health Scorecard
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your wellness journey with personalized insights and rewards
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-lg">
          {[
            { id: 'scorecard', label: 'Health Score', icon: Activity },
            { id: 'records', label: 'Records', icon: Heart },
            { id: 'rewards', label: 'Rewards', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scorecard Tab */}
        {activeTab === 'scorecard' && (
          <div className="space-y-6">
            {/* Health Balance Score */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-800">Health Balance Score</h2>
                  <div className="text-3xl">{healthResult.flowerLevel}</div>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(healthResult.status)}`}>
                  {getStatusIcon(healthResult.status)}
                  <span className="font-semibold">{healthResult.status}</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {healthResult.finalScore}
                  <span className="text-2xl text-gray-500">/10</span>
                </div>
                <p className="text-gray-600 mb-2">Balanced Health Score</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    healthResult.balanceStatus === 'Harmonious' ? 'bg-green-100 text-green-700' :
                    healthResult.balanceStatus === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {healthResult.balanceStatus} Balance
                  </span>
                  <span className="flex items-center space-x-1 text-purple-600">
                    <Target className="h-4 w-4" />
                    <span>Balance: {healthResult.equilibriumFactor}</span>
                  </span>
                </div>
              </div>

              {/* Health Factor Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-pink-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-500" />
                    Symptoms
                  </h3>
                  <div className="text-2xl font-bold text-pink-600">{healthFactors.symptomScore}/10</div>
                  <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${healthFactors.symptomScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-purple-500" />
                    Vitals
                  </h3>
                  <div className="text-2xl font-bold text-purple-600">{healthFactors.vitalScore}/10</div>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${healthFactors.vitalScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-blue-500" />
                    Activity
                  </h3>
                  <div className="text-2xl font-bold text-blue-600">{healthFactors.activityScore}/10</div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${healthFactors.activityScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-green-500" />
                    Nutrition
                  </h3>
                  <div className="text-2xl font-bold text-green-600">{healthFactors.nutritionScore}/10</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${healthFactors.nutritionScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-orange-500" />
                    PCOS
                  </h3>
                  <div className="text-2xl font-bold text-orange-600">{healthFactors.pcosScore}/10</div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${healthFactors.pcosScore * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Health Balance Insights */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-500" />
                Health Balance Insights
              </h3>
              <div className="space-y-3">
                {healthResult.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
                    <p className="text-gray-800 font-medium">{rec}</p>
                  </div>
                ))}
                
                {healthResult.balanceStatus === 'Harmonious' && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                    <p className="text-green-800 font-medium">🌸 Perfect health harmony! All factors are working in beautiful balance.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-600">
                  <strong>Balanced Health Approach:</strong> Your health score reflects harmony between all areas of wellness.
                  This approach rewards overall balance over perfection in just one area, creating sustainable health patterns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Health Records</h2>
                <button
                  onClick={() => setShowRecordForm(!showRecordForm)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>
              </div>

              {showRecordForm && (
                <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Health Record</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Pressure (Systolic)
                      </label>
                      <input
                        type="number"
                        value={healthRecord.bloodPressureSystolic || ''}
                        onChange={(e) => setHealthRecord({...healthRecord, bloodPressureSystolic: parseInt(e.target.value)})}
                        className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Pressure (Diastolic)
                      </label>
                      <input
                        type="number"
                        value={healthRecord.bloodPressureDiastolic || ''}
                        onChange={(e) => setHealthRecord({...healthRecord, bloodPressureDiastolic: parseInt(e.target.value)})}
                        className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                        placeholder="80"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Sugar (Fasting)
                      </label>
                      <input
                        type="number"
                        value={healthRecord.bloodSugarFasting || ''}
                        onChange={(e) => setHealthRecord({...healthRecord, bloodSugarFasting: parseInt(e.target.value)})}
                        className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={healthRecord.weight || ''}
                        onChange={(e) => setHealthRecord({...healthRecord, weight: parseInt(e.target.value)})}
                        className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                        placeholder="65"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleRecordSubmit}
                    className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Save Record (+5 points)
                  </button>
                </div>
              )}

              {/* Current Records Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-pink-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Blood Pressure</h4>
                  <p className="text-2xl font-bold text-pink-600">
                    {healthRecord.bloodPressureSystolic}/{healthRecord.bloodPressureDiastolic}
                  </p>
                  <p className="text-sm text-gray-600">mmHg</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Blood Sugar</h4>
                  <p className="text-2xl font-bold text-purple-600">{healthRecord.bloodSugarFasting}</p>
                  <p className="text-sm text-gray-600">mg/dL (fasting)</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Weight</h4>
                  <p className="text-2xl font-bold text-blue-600">{healthRecord.weight}</p>
                  <p className="text-sm text-gray-600">kg</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">BMI</h4>
                  <p className="text-2xl font-bold text-green-600">{healthRecord.bmi}</p>
                  <p className="text-sm text-gray-600">kg/m²</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* Pregnancy Blossom Tree */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🌸 Pregnancy Blossom Tree</h2>
              <div className="text-center">
                <div className="text-6xl mb-4">🌳</div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Level {gamificationData.level} - Growing Strong!</p>
                <p className="text-gray-600 mb-4">{gamificationData.totalPoints} flowers collected</p>
                <div className="bg-pink-50 rounded-2xl p-4">
                  <p className="text-pink-800 font-medium">Your tree is blooming beautifully! 🌸</p>
                </div>
              </div>
            </div>

            {/* Points & Streak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Streak</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{gamificationData.dailyStreak}</div>
                  <p className="text-gray-600 mb-4">days in a row</p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          i < gamificationData.dailyStreak ? 'bg-orange-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {i < gamificationData.dailyStreak ? '🔥' : '⭕'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Goal</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{gamificationData.weeklyProgress} / {gamificationData.weeklyGoal} points</span>
                    <span>{Math.round((gamificationData.weeklyProgress / gamificationData.weeklyGoal) * 100)}%</span>
                  </div>
                  <Progress value={(gamificationData.weeklyProgress / gamificationData.weeklyGoal) * 100} className="h-3" />
                </div>
                <p className="text-sm text-gray-600">Keep tracking to earn bonus rewards!</p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Earned Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gamificationData.badges.length > 0 ? (
                  gamificationData.badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="font-semibold text-gray-800">{badge}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500 py-8">
                    Start tracking your health to earn your first badge! 🌟
                  </div>
                )}
              </div>
            </div>

            {/* Point Earning Activities */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Earn More Points</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-pink-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">Daily Login</span>
                  </div>
                  <span className="text-pink-600 font-bold">+1 🌸</span>
                </div>
                <div className="flex items-center justify-between bg-purple-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Track Health Record</span>
                  </div>
                  <span className="text-purple-600 font-bold">+5 🌸</span>
                </div>
                <div className="flex items-center justify-between bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Complete Weekly Quiz</span>
                  </div>
                  <span className="text-blue-600 font-bold">+10 🌸</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
