
import { useState, useEffect } from 'react';

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

export const useHealthScorecard = () => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [currentScore, setCurrentScore] = useState<HealthScore | null>(null);
  const [gamificationData, setGamificationData] = useState<GamificationData>({
    totalPoints: 0,
    dailyStreak: 0,
    badges: [],
    level: 1,
    weeklyGoal: 50,
    weeklyProgress: 0
  });

  // Simulated data - in real app, this would come from Supabase
  useEffect(() => {
    // Initialize with sample data
    const sampleRecord: HealthRecord = {
      id: '1',
      userId: 'user1',
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      bloodSugarFasting: 90,
      bloodSugarPostMeal: 140,
      weight: 65,
      bmi: 23.5,
      symptoms: ['fatigue'],
      recordedAt: new Date()
    };

    setHealthRecords([sampleRecord]);
    setCurrentScore(calculateHealthScore(sampleRecord));
  }, []);

  const calculateHealthScore = (record: HealthRecord): HealthScore => {
    // Blood Pressure Score (1-10)
    const bpScore = calculateBPScore(record.bloodPressureSystolic, record.bloodPressureDiastolic);
    
    // Blood Sugar Score (1-10)
    const sugarScore = calculateSugarScore(record.bloodSugarFasting, record.bloodSugarPostMeal);
    
    // Weight/BMI Score (1-10)
    const weightScore = calculateWeightScore(record.bmi);
    
    // Symptom Score (1-10)
    const symptomScore = calculateSymptomScore(record.symptoms);
    
    const totalScore = (bpScore + sugarScore + weightScore + symptomScore) / 4;
    
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

  const addHealthRecord = (record: Partial<HealthRecord>) => {
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      userId: 'user1',
      bloodPressureSystolic: record.bloodPressureSystolic || 120,
      bloodPressureDiastolic: record.bloodPressureDiastolic || 80,
      bloodSugarFasting: record.bloodSugarFasting || 90,
      bloodSugarPostMeal: record.bloodSugarPostMeal || 140,
      weight: record.weight || 65,
      bmi: record.bmi || 23.5,
      symptoms: record.symptoms || [],
      recordedAt: new Date()
    };

    setHealthRecords(prev => [...prev, newRecord]);
    setCurrentScore(calculateHealthScore(newRecord));
    
    // Award points for tracking
    setGamificationData(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 5,
      weeklyProgress: Math.min(prev.weeklyProgress + 5, prev.weeklyGoal)
    }));
  };

  const awardPoints = (points: number, reason: string) => {
    setGamificationData(prev => {
      const newPoints = prev.totalPoints + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      const newBadges = [...prev.badges];
      
      // Award badges based on achievements
      if (newPoints >= 100 && !newBadges.includes('Century Club')) {
        newBadges.push('Century Club');
      }
      if (prev.dailyStreak >= 7 && !newBadges.includes('Weekly Warrior')) {
        newBadges.push('Weekly Warrior');
      }
      
      return {
        ...prev,
        totalPoints: newPoints,
        level: newLevel,
        badges: newBadges,
        weeklyProgress: Math.min(prev.weeklyProgress + points, prev.weeklyGoal)
      };
    });
  };

  return {
    healthRecords,
    currentScore,
    gamificationData,
    addHealthRecord,
    awardPoints,
    calculateHealthScore
  };
};
