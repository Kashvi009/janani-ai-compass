
import React, { useState, useEffect } from 'react';
import { Heart, Activity, AlertTriangle, CheckCircle, Trophy, Star, Calendar, Plus, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

interface HealthScore {
  totalScore: number;
  bloodPressureScore: number;
  bloodSugarScore: number;
  weightScore: number;
  symptomScore: number;
  status: 'Stable' | 'Caution' | 'Critical';
  lastUpdated: Date;
}

interface GamificationData {
  totalPoints: number;
  dailyStreak: number;
  badges: string[];
  level: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export const HealthScorecard = () => {
  const [healthRecord, setHealthRecord] = useState<Partial<HealthRecord>>({
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    bloodSugarFasting: 90,
    bloodSugarPostMeal: 140,
    weight: 65,
    bmi: 23.5,
    symptoms: []
  });

  const [healthScore, setHealthScore] = useState<HealthScore>({
    totalScore: 8.5,
    bloodPressureScore: 9,
    bloodSugarScore: 8,
    weightScore: 9,
    symptomScore: 8,
    status: 'Stable',
    lastUpdated: new Date()
  });

  const [gamification, setGamification] = useState<GamificationData>({
    totalPoints: 245,
    dailyStreak: 7,
    badges: ['Weekly Warrior', 'Health Hero', 'Consistent Tracker'],
    level: 3,
    weeklyGoal: 50,
    weeklyProgress: 35
  });

  const [activeTab, setActiveTab] = useState<'scorecard' | 'records' | 'rewards'>('scorecard');
  const [showRecordForm, setShowRecordForm] = useState(false);

  // Calculate health score based on medical thresholds
  const calculateHealthScore = (record: Partial<HealthRecord>): HealthScore => {
    let scores = [];
    
    // Blood Pressure Score (1-10)
    const bpScore = calculateBPScore(record.bloodPressureSystolic || 120, record.bloodPressureDiastolic || 80);
    scores.push(bpScore);
    
    // Blood Sugar Score (1-10)
    const sugarScore = calculateSugarScore(record.bloodSugarFasting || 90, record.bloodSugarPostMeal || 140);
    scores.push(sugarScore);
    
    // Weight/BMI Score (1-10)
    const weightScore = calculateWeightScore(record.bmi || 23.5);
    scores.push(weightScore);
    
    // Symptom Score (1-10)
    const symptomScore = calculateSymptomScore(record.symptoms || []);
    scores.push(symptomScore);
    
    const totalScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    let status: 'Stable' | 'Caution' | 'Critical' = 'Stable';
    if (totalScore < 5) status = 'Critical';
    else if (totalScore < 8) status = 'Caution';
    
    return {
      totalScore: Math.round(totalScore * 10) / 10,
      bloodPressureScore: bpScore,
      bloodSugarScore: sugarScore,
      weightScore: weightScore,
      symptomScore: symptomScore,
      status,
      lastUpdated: new Date()
    };
  };

  const calculateBPScore = (systolic: number, diastolic: number): number => {
    if (systolic <= 120 && diastolic <= 80) return 10;
    if (systolic <= 130 && diastolic <= 85) return 8;
    if (systolic <= 140 && diastolic <= 90) return 6;
    if (systolic <= 160 && diastolic <= 100) return 4;
    return 2;
  };

  const calculateSugarScore = (fasting: number, postMeal: number): number => {
    if (fasting <= 95 && postMeal <= 140) return 10;
    if (fasting <= 105 && postMeal <= 160) return 8;
    if (fasting <= 115 && postMeal <= 180) return 6;
    if (fasting <= 125 && postMeal <= 200) return 4;
    return 2;
  };

  const calculateWeightScore = (bmi: number): number => {
    if (bmi >= 18.5 && bmi <= 24.9) return 10;
    if (bmi >= 25 && bmi <= 29.9) return 7;
    if (bmi >= 30 && bmi <= 34.9) return 5;
    return 3;
  };

  const calculateSymptomScore = (symptoms: string[]): number => {
    const severityMap: { [key: string]: number } = {
      'fatigue': 2,
      'nausea': 1,
      'headache': 3,
      'pain': 4,
      'bleeding': 5,
      'fever': 4
    };
    
    const totalSeverity = symptoms.reduce((total, symptom) => {
      return total + (severityMap[symptom.toLowerCase()] || 1);
    }, 0);
    
    if (totalSeverity === 0) return 10;
    if (totalSeverity <= 3) return 8;
    if (totalSeverity <= 6) return 6;
    if (totalSeverity <= 10) return 4;
    return 2;
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

  const handleRecordSubmit = () => {
    const newScore = calculateHealthScore(healthRecord);
    setHealthScore(newScore);
    setShowRecordForm(false);
    
    // Award points for tracking
    setGamification(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 5,
      weeklyProgress: Math.min(prev.weeklyProgress + 5, prev.weeklyGoal)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Your Health Scorecard
            </span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your wellness journey with personalized insights and rewards
          </p>
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
            {/* Overall Health Score */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Overall Health</h2>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(healthScore.status)}`}>
                  {getStatusIcon(healthScore.status)}
                  <span className="font-semibold">{healthScore.status}</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {healthScore.totalScore}
                  <span className="text-2xl text-gray-500">/10</span>
                </div>
                <p className="text-gray-600">Your current health score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Blood Pressure</h3>
                  <div className="text-2xl font-bold text-pink-600">{healthScore.bloodPressureScore}/10</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Blood Sugar</h3>
                  <div className="text-2xl font-bold text-purple-600">{healthScore.bloodSugarScore}/10</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Weight/BMI</h3>
                  <div className="text-2xl font-bold text-blue-600">{healthScore.weightScore}/10</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Symptoms</h3>
                  <div className="text-2xl font-bold text-green-600">{healthScore.symptomScore}/10</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {healthScore.status === 'Critical' && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-red-800 font-medium">⚠️ Please consult your healthcare provider immediately</p>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-blue-800">🌸 Continue tracking your daily symptoms</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-green-800">💧 Stay hydrated and maintain gentle exercise</p>
                </div>
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
                <p className="text-lg font-semibold text-gray-800 mb-2">Level {gamification.level} - Growing Strong!</p>
                <p className="text-gray-600 mb-4">{gamification.totalPoints} flowers collected</p>
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
                  <div className="text-4xl font-bold text-orange-500 mb-2">{gamification.dailyStreak}</div>
                  <p className="text-gray-600 mb-4">days in a row</p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          i < gamification.dailyStreak ? 'bg-orange-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {i < gamification.dailyStreak ? '🔥' : '⭕'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Goal</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{gamification.weeklyProgress} / {gamification.weeklyGoal} points</span>
                    <span>{Math.round((gamification.weeklyProgress / gamification.weeklyGoal) * 100)}%</span>
                  </div>
                  <Progress value={(gamification.weeklyProgress / gamification.weeklyGoal) * 100} className="h-3" />
                </div>
                <p className="text-sm text-gray-600">Keep tracking to earn bonus rewards!</p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Earned Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gamification.badges.map((badge, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="font-semibold text-gray-800">{badge}</p>
                  </div>
                ))}
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
