import { useState, useEffect } from 'react';

interface HealthFactors {
  symptomScore: number;      // 0-10 based on logged symptoms
  vitalScore: number;        // 0-10 based on BP, blood sugar, etc.
  activityScore: number;     // 0-10 based on movement/exercise
  nutritionScore: number;    // 0-10 based on diet/hydration
  pcosScore: number;         // 0-10 based on PCOS management
}

interface NashHealthResult {
  finalScore: number;
  status: 'Stable' | 'Caution' | 'Critical';
  equilibriumFactor: number;
  balanceStatus: 'Harmonious' | 'Moderate' | 'Imbalanced';
  recommendations: string[];
  flowerLevel: '🌱' | '🌿' | '🌸' | '🌷' | '🌺';
}

// Nash Equilibrium-inspired weights - each factor influences others
const NASH_WEIGHTS = {
  symptom: 0.30,
  vital: 0.30,
  activity: 0.15,
  nutrition: 0.15,
  pcos: 0.10
};

export const useNashHealthScore = () => {
  const [healthFactors, setHealthFactors] = useState<HealthFactors>({
    symptomScore: 8,
    vitalScore: 9,
    activityScore: 6,
    nutritionScore: 7,
    pcosScore: 8
  });

  // Standard deviation calculation for balance assessment
  const calculateStandardDeviation = (scores: number[]): number => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scores.length;
    return Math.sqrt(variance);
  };

  // Nash Equilibrium-inspired scoring algorithm
  const calculateNashScore = (factors: HealthFactors): NashHealthResult => {
    const scores = [
      factors.symptomScore,
      factors.vitalScore,
      factors.activityScore,
      factors.nutritionScore,
      factors.pcosScore
    ];

    // Base weighted score
    const rawScore = 
      factors.symptomScore * NASH_WEIGHTS.symptom +
      factors.vitalScore * NASH_WEIGHTS.vital +
      factors.activityScore * NASH_WEIGHTS.activity +
      factors.nutritionScore * NASH_WEIGHTS.nutrition +
      factors.pcosScore * NASH_WEIGHTS.pcos;

    // Nash-like balancing penalty: discourage imbalance
    const standardDev = calculateStandardDeviation(scores);
    const penalty = standardDev * 0.3; // Apply penalty for unbalanced health
    
    // Final score with Nash equilibrium adjustments
    const finalScore = Math.max(0, Math.min(10, rawScore - penalty));
    
    // Equilibrium factor - measures balance between health areas
    const equilibriumFactor = Math.max(0, 3 - standardDev); // Higher = more balanced

    // Determine status
    let status: 'Stable' | 'Caution' | 'Critical' = 'Stable';
    if (finalScore < 5) status = 'Critical';
    else if (finalScore < 7.5) status = 'Caution';

    // Balance assessment
    let balanceStatus: 'Harmonious' | 'Moderate' | 'Imbalanced' = 'Harmonious';
    if (standardDev > 2.5) balanceStatus = 'Imbalanced';
    else if (standardDev > 1.5) balanceStatus = 'Moderate';

    // Flower level based on overall harmony
    let flowerLevel: '🌱' | '🌿' | '🌸' | '🌷' | '🌺' = '🌱';
    if (finalScore >= 9 && balanceStatus === 'Harmonious') flowerLevel = '🌺';
    else if (finalScore >= 8) flowerLevel = '🌷';
    else if (finalScore >= 7) flowerLevel = '🌸';
    else if (finalScore >= 5) flowerLevel = '🌿';

    // Smart recommendations based on Nash analysis
    const recommendations: string[] = [];
    
    if (balanceStatus === 'Imbalanced') {
      const lowestScore = Math.min(...scores);
      const lowestIndex = scores.indexOf(lowestScore);
      const areas = ['symptoms', 'vitals', 'activity', 'nutrition', 'PCOS management'];
      recommendations.push(`🎯 Focus on improving ${areas[lowestIndex]} to restore balance`);
    }
    
    if (factors.vitalScore < factors.symptomScore - 2) {
      recommendations.push(`⚠️ Your vitals need attention despite feeling okay - consult your doctor`);
    }
    
    if (factors.symptomScore < factors.vitalScore - 2) {
      recommendations.push(`💝 Your vitals are great! Let's work on symptom management for comfort`);
    }
    
    if (standardDev < 1) {
      recommendations.push(`🌸 Amazing balance! You're in perfect health equilibrium`);
    }

    if (factors.activityScore < 5 && factors.nutritionScore < 5) {
      recommendations.push(`🌿 Gentle movement and good nutrition work together - start with one to boost both`);
    }

    return {
      finalScore: parseFloat(finalScore.toFixed(1)),
      status,
      equilibriumFactor: parseFloat(equilibriumFactor.toFixed(1)),
      balanceStatus,
      recommendations,
      flowerLevel
    };
  };

  // Simulate updating health factors from various sources
  const updateFactors = (newFactors: Partial<HealthFactors>) => {
    setHealthFactors(prev => ({ ...prev, ...newFactors }));
  };

  // Calculate current Nash score
  const currentResult = calculateNashScore(healthFactors);

  return {
    healthFactors,
    updateFactors,
    nashResult: currentResult,
    calculateNashScore
  };
};

// Individual factor calculation helpers
export const calculateSymptomScore = (symptoms: string[], severities: number[]): number => {
  if (symptoms.length === 0) return 10;
  
  const avgSeverity = severities.reduce((sum, sev) => sum + sev, 0) / severities.length;
  const impactFactor = Math.min(symptoms.length * 0.5, 3); // More symptoms = more impact
  
  return Math.max(0, 10 - avgSeverity - impactFactor);
};

export const calculateVitalScore = (bp: {systolic: number, diastolic: number}, bloodSugar: number): number => {
  let score = 10;
  
  // Blood pressure scoring
  if (bp.systolic > 140 || bp.diastolic > 90) score -= 4;
  else if (bp.systolic > 130 || bp.diastolic > 85) score -= 2;
  else if (bp.systolic < 90 || bp.diastolic < 60) score -= 3;
  
  // Blood sugar scoring (fasting)
  if (bloodSugar > 125) score -= 4;
  else if (bloodSugar > 100) score -= 2;
  else if (bloodSugar < 70) score -= 3;
  
  return Math.max(0, Math.min(10, score));
};

export const calculateActivityScore = (dailySteps: number, exerciseMinutes: number): number => {
  let score = 0;
  
  // Steps scoring (pregnancy-appropriate)
  if (dailySteps >= 8000) score += 5;
  else if (dailySteps >= 5000) score += 4;
  else if (dailySteps >= 3000) score += 3;
  else if (dailySteps >= 1000) score += 2;
  else score += 1;
  
  // Exercise scoring (gentle for pregnancy)
  if (exerciseMinutes >= 30) score += 5;
  else if (exerciseMinutes >= 20) score += 4;
  else if (exerciseMinutes >= 10) score += 3;
  else if (exerciseMinutes >= 5) score += 2;
  else score += 1;
  
  return Math.min(10, score);
};

export const calculateNutritionScore = (waterIntake: number, mealQuality: number): number => {
  let score = 0;
  
  // Water intake (glasses per day)
  if (waterIntake >= 8) score += 5;
  else if (waterIntake >= 6) score += 4;
  else if (waterIntake >= 4) score += 3;
  else score += 2;
  
  // Meal quality (1-5 self-reported)
  score += mealQuality;
  
  return Math.min(10, score);
};

export const calculatePCOSScore = (hasPCOS: boolean, managementActions: number): number => {
  if (!hasPCOS) return 10;
  
  // For users with PCOS, score based on management activities
  // managementActions could be medication compliance, diet adherence, etc.
  return Math.min(10, 3 + managementActions * 1.5);
};