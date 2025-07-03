
import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch health records
      const { data: healthRecordsData, error: recordsError } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });

      if (recordsError) {
        console.error('Error fetching health records:', recordsError);
      } else if (healthRecordsData) {
        const formattedRecords = healthRecordsData.map(record => ({
          id: record.id,
          userId: record.user_id,
          bloodPressureSystolic: record.blood_pressure_systolic || 120,
          bloodPressureDiastolic: record.blood_pressure_diastolic || 80,
          bloodSugarFasting: record.blood_sugar_fasting || 90,
          bloodSugarPostMeal: record.blood_sugar_post_meal || 140,
          weight: record.weight_kg || 65,
          bmi: record.bmi || 23.5,
          symptoms: [], // Will be fetched from symptom_logs
          recordedAt: new Date(record.recorded_at)
        }));
        setHealthRecords(formattedRecords);
      }

      // Fetch latest health score
      const { data: healthScoreData, error: scoreError } = await supabase
        .from('health_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('calculated_at', { ascending: false })
        .limit(1)
        .single();

      if (scoreError && scoreError.code !== 'PGRST116') {
        console.error('Error fetching health score:', scoreError);
      } else if (healthScoreData) {
        setCurrentScore({
          totalScore: parseFloat(healthScoreData.total_score),
          bloodPressureScore: healthScoreData.blood_pressure_score,
          bloodSugarScore: healthScoreData.blood_sugar_score,
          weightScore: healthScoreData.weight_score,
          symptomScore: healthScoreData.symptom_score,
          status: healthScoreData.status as 'Stable' | 'Caution' | 'Critical',
          lastUpdated: new Date(healthScoreData.calculated_at)
        });
      }

      // Fetch gamification data
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') {
        console.error('Error fetching user points:', pointsError);
      } else if (pointsData) {
        setGamificationData({
          totalPoints: pointsData.total_points,
          dailyStreak: pointsData.daily_streak,
          badges: pointsData.badges || [],
          level: pointsData.level,
          weeklyGoal: pointsData.weekly_goal,
          weeklyProgress: pointsData.weekly_progress
        });
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateHealthScore = (record: HealthRecord): HealthScore => {
    const bpScore = calculateBPScore(record.bloodPressureSystolic, record.bloodPressureDiastolic);
    const sugarScore = calculateSugarScore(record.bloodSugarFasting, record.bloodSugarPostMeal);
    const weightScore = calculateWeightScore(record.bmi);
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

  const addHealthRecord = async (record: Partial<HealthRecord>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const newRecord = {
        user_id: user.id,
        blood_pressure_systolic: record.bloodPressureSystolic || 120,
        blood_pressure_diastolic: record.bloodPressureDiastolic || 80,
        blood_sugar_fasting: record.bloodSugarFasting || 90,
        blood_sugar_post_meal: record.bloodSugarPostMeal || 140,
        weight_kg: record.weight || 65,
        bmi: record.bmi || 23.5,
      };

      const { data, error } = await supabase
        .from('health_records')
        .insert([newRecord])
        .select()
        .single();

      if (error) throw error;

      // Create health record object for scoring
      const healthRecord: HealthRecord = {
        id: data.id,
        userId: data.user_id,
        bloodPressureSystolic: data.blood_pressure_systolic,
        bloodPressureDiastolic: data.blood_pressure_diastolic,
        bloodSugarFasting: data.blood_sugar_fasting,
        bloodSugarPostMeal: data.blood_sugar_post_meal,
        weight: data.weight_kg,
        bmi: data.bmi,
        symptoms: [],
        recordedAt: new Date(data.recorded_at)
      };

      // Calculate and save health score
      const newScore = calculateHealthScore(healthRecord);
      
      const { error: scoreError } = await supabase
        .from('health_scores')
        .insert([{
          user_id: user.id,
          total_score: newScore.totalScore,
          blood_pressure_score: newScore.bloodPressureScore,
          blood_sugar_score: newScore.bloodSugarScore,
          weight_score: newScore.weightScore,
          symptom_score: newScore.symptomScore,
          status: newScore.status,
        }]);

      if (scoreError) throw scoreError;

      // Award points
      await awardPoints(5, 'health_record_added');

      // Refresh data
      await fetchUserData();

      toast({
        title: "Health Record Added!",
        description: "Your health data has been saved and your score updated.",
      });

    } catch (error) {
      console.error('Error adding health record:', error);
      toast({
        title: "Error",
        description: "Failed to save health record. Please try again.",
        variant: "destructive",
      });
    }
  };

  const awardPoints = async (points: number, reason: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: currentPoints, error: fetchError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching current points:', fetchError);
        return;
      }

      const newTotalPoints = (currentPoints?.total_points || 0) + points;
      const newLevel = Math.floor(newTotalPoints / 100) + 1;
      const newWeeklyProgress = Math.min((currentPoints?.weekly_progress || 0) + points, currentPoints?.weekly_goal || 50);

      const updateData = {
        total_points: newTotalPoints,
        level: newLevel,
        weekly_progress: newWeeklyProgress,
      };

      const { error: updateError } = await supabase
        .from('user_points')
        .update(updateData)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating points:', updateError);
      }
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  return {
    healthRecords,
    currentScore,
    gamificationData,
    loading,
    addHealthRecord,
    awardPoints,
    calculateHealthScore,
    fetchUserData
  };
};
