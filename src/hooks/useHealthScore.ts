import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HealthFactors {
  symptomScore: number;      // 0-10 based on logged symptoms
  vitalScore: number;        // 0-10 based on BP, blood sugar, etc.
  activityScore: number;     // 0-10 based on movement/exercise
  nutritionScore: number;    // 0-10 based on diet/hydration
  pcosScore: number;         // 0-10 based on PCOS management
}

interface HealthResult {
  finalScore: number;
  status: string;
  equilibriumFactor: number;
  balanceStatus: string;
  recommendations: string[];
  flowerLevel: string;
}

interface NashFactors {
  sleep: number;
  nutrition: number;
  stress: number;
  exercise: number;
  vitals: number;
  symptoms: number;
  pcos: number;
}

// Balanced health scoring weights - each factor influences others
const HEALTH_WEIGHTS = {
  symptom: 0.30,
  vital: 0.30,
  activity: 0.15,
  nutrition: 0.15,
  pcos: 0.10
};

export const useHealthScore = () => {
  const [healthFactors, setHealthFactors] = useState<HealthFactors>({
    symptomScore: 8,
    vitalScore: 9,
    activityScore: 6,
    nutritionScore: 7,
    pcosScore: 8
  });

  const [nashResult, setNashResult] = useState<HealthResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Nash equilibrium health score calculation via backend
  const calculateNashHealthScore = async (factors: HealthFactors, userId?: string): Promise<HealthResult> => {
    if (!userId) {
      return calculateLocalHealthScore(factors);
    }

    setIsCalculating(true);
    
    try {
      // Convert 0-10 scale to 0-100 for Nash calculation
      const nashFactors: NashFactors = {
        sleep: (factors.activityScore * 10) * 0.7 + 30, // Estimate sleep quality from activity
        nutrition: factors.nutritionScore * 10,
        stress: Math.max(0, 100 - (factors.symptomScore * 10)), // Invert symptoms to get stress
        exercise: factors.activityScore * 10,
        vitals: factors.vitalScore * 10,
        symptoms: 100 - (factors.symptomScore * 10), // Invert for Nash calculation
        pcos: factors.pcosScore * 10
      };

      // Call Nash equilibrium edge function
      const { data: { session } } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();

      const response = await supabase.functions.invoke('calculate-health-score', {
        body: {
          factors: nashFactors,
          userId: user?.id
        }
      });

      if (response.error) {
        throw new Error(`Nash calculation failed: ${response.error.message}`);
      }

      const result = response.data;
      
      // Convert Nash result to our format
      const nashHealthResult: HealthResult = {
        finalScore: Math.round(result.score / 10), // Convert back to 0-10 scale
        status: result.status.charAt(0).toUpperCase() + result.status.slice(1),
        equilibriumFactor: result.equilibriumReached ? 10 : 7,
        balanceStatus: result.equilibriumReached ? "Harmonious" : "Developing",
        recommendations: result.recommendations || [],
        flowerLevel: getFlowerLevel(result.score / 10, result.equilibriumReached)
      };

      setNashResult(nashHealthResult);
      return nashHealthResult;
      
    } catch (error) {
      console.error('Nash calculation failed, using local fallback:', error);
      return calculateLocalHealthScore(factors);
    } finally {
      setIsCalculating(false);
    }
  };

  // Get flower level based on score and balance
  const getFlowerLevel = (score: number, balanced: boolean): string => {
    if (score >= 9 && balanced) return '🌺';
    else if (score >= 8) return '🌷';
    else if (score >= 7) return '🌸';
    else if (score >= 5) return '🌿';
    else return '🌱';
  };

  // Standard deviation calculation for balance assessment
  const calculateStandardDeviation = (scores: number[]): number => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scores.length;
    return Math.sqrt(variance);
  };

  // Fallback local calculation when Nash backend is unavailable
  const calculateLocalHealthScore = (factors: HealthFactors): HealthResult => {
    const scores = [
      factors.symptomScore,
      factors.vitalScore,
      factors.activityScore,
      factors.nutritionScore,
      factors.pcosScore
    ];

    // Base weighted score
    const rawScore = 
      factors.symptomScore * HEALTH_WEIGHTS.symptom +
      factors.vitalScore * HEALTH_WEIGHTS.vital +
      factors.activityScore * HEALTH_WEIGHTS.activity +
      factors.nutritionScore * HEALTH_WEIGHTS.nutrition +
      factors.pcosScore * HEALTH_WEIGHTS.pcos;

    // Balanced approach: discourage imbalance between health areas
    const standardDev = calculateStandardDeviation(scores);
    const penalty = standardDev * 0.3;
    
    const finalScore = Math.max(0, Math.min(10, rawScore - penalty));
    const equilibriumFactor = Math.max(0, 3 - standardDev);

    // Determine status
    let status = 'Stable';
    if (finalScore < 5) status = 'Critical';
    else if (finalScore < 7.5) status = 'Caution';

    // Balance assessment
    let balanceStatus = 'Harmonious';
    if (standardDev > 2.5) balanceStatus = 'Imbalanced';
    else if (standardDev > 1.5) balanceStatus = 'Moderate';

    const flowerLevel = getFlowerLevel(finalScore, balanceStatus === 'Harmonious');

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (balanceStatus === 'Imbalanced') {
      const lowestScore = Math.min(...scores);
      const lowestIndex = scores.indexOf(lowestScore);
      const areas = ['symptoms', 'vitals', 'activity', 'nutrition', 'PCOS management'];
      recommendations.push(`Focus on improving ${areas[lowestIndex]} to restore balance`);
    }
    
    if (factors.vitalScore < factors.symptomScore - 2) {
      recommendations.push(`Your vitals need attention despite feeling okay - consult your doctor`);
    }
    
    if (standardDev < 1) {
      recommendations.push(`Amazing balance! You're in perfect health harmony`);
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

  // Update health factors
  const updateFactors = (newFactors: Partial<HealthFactors>) => {
    setHealthFactors(prev => ({ ...prev, ...newFactors }));
  };

  // Get current result (use Nash if available, otherwise local)
  const currentResult = nashResult || calculateLocalHealthScore(healthFactors);

  return {
    healthFactors,
    updateFactors,
    healthResult: currentResult,
    calculateHealthScore: calculateLocalHealthScore,
    calculateNashHealthScore,
    isCalculating
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