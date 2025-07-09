import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type UserPoints = Tables<'user_points'>;

export const useGameification = () => {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserPoints();
  }, []);

  const fetchUserPoints = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user points:', error);
      } else {
        setUserPoints(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPoints = async (points: number, action: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !userPoints) {
        return;
      }

      const newTotal = userPoints.total_points + points;
      const newWeeklyProgress = userPoints.weekly_progress + points;
      
      // Check if weekly goal is reached
      const goalReached = newWeeklyProgress >= userPoints.weekly_goal && 
                         userPoints.weekly_progress < userPoints.weekly_goal;

      // Update daily streak
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = userPoints.last_activity_date;
      const isNewDay = lastActivity !== today;
      
      let newStreak = userPoints.daily_streak;
      if (isNewDay) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastActivity === yesterdayStr) {
          newStreak += 1; // Continue streak
        } else if (lastActivity !== today) {
          newStreak = 1; // Start new streak
        }
      }

      // Award badges
      const newBadges = [...(userPoints.badges || [])];
      
      if (newStreak >= 7 && !newBadges.includes('7-day-streak')) {
        newBadges.push('7-day-streak');
      }
      
      if (newTotal >= 100 && !newBadges.includes('century-club')) {
        newBadges.push('century-club');
      }
      
      if (goalReached && !newBadges.includes('weekly-warrior')) {
        newBadges.push('weekly-warrior');
      }

      const updates = {
        total_points: newTotal,
        weekly_progress: newWeeklyProgress,
        daily_streak: newStreak,
        last_activity_date: today,
        badges: newBadges
      };

      const { error } = await supabase
        .from('user_points')
        .update(updates)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating points:', error);
      } else {
        setUserPoints(prev => prev ? { ...prev, ...updates } : null);
        
        toast({
          title: `+${points} points!`,
          description: `Great job ${action}! Keep up the amazing work! 🌸`,
        });

        if (goalReached) {
          toast({
            title: "🎉 Weekly Goal Achieved!",
            description: "You've reached your weekly goal! You're amazing!",
          });
        }

        if (newBadges.length > (userPoints.badges?.length || 0)) {
          const newBadge = newBadges[newBadges.length - 1];
          toast({
            title: "🏆 New Badge Earned!",
            description: `You've earned the ${newBadge.replace('-', ' ')} badge!`,
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLevel = () => {
    if (!userPoints) return 1;
    return Math.floor(userPoints.total_points / 100) + 1;
  };

  const getProgressToNextLevel = () => {
    if (!userPoints) return 0;
    return (userPoints.total_points % 100) / 100;
  };

  const getWeeklyProgress = () => {
    if (!userPoints) return 0;
    return Math.min(userPoints.weekly_progress / userPoints.weekly_goal, 1);
  };

  const getBadgeDisplayName = (badge: string) => {
    const badgeNames: Record<string, string> = {
      '7-day-streak': '7 Day Streak',
      'century-club': 'Century Club',
      'weekly-warrior': 'Weekly Warrior',
      'symptom-tracker': 'Symptom Tracker',
      'health-guardian': 'Health Guardian'
    };
    return badgeNames[badge] || badge;
  };

  return {
    userPoints,
    loading,
    addPoints,
    getLevel,
    getProgressToNextLevel,
    getWeeklyProgress,
    getBadgeDisplayName,
    refreshPoints: fetchUserPoints
  };
};