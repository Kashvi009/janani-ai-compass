import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type SymptomLog = Tables<'symptom_logs'>;

export const useSymptomLogger = () => {
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('symptom_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });

      if (error) {
        console.error('Error fetching symptoms:', error);
        toast({
          title: "Error loading symptoms",
          description: "Unable to load your symptom history.",
          variant: "destructive",
        });
      } else {
        setSymptoms(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logSymptom = async (symptomType: string, severity: number, notes?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to log symptoms.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('symptom_logs')
        .insert({
          user_id: user.id,
          symptom_type: symptomType,
          severity,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error logging symptom:', error);
        toast({
          title: "Failed to log symptom",
          description: "Unable to save your symptom. Please try again.",
          variant: "destructive",
        });
      } else {
        setSymptoms(prev => [data, ...prev]);
        toast({
          title: "Symptom logged!",
          description: `${symptomType} has been recorded successfully.`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Failed to log symptom",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const deleteSymptom = async (id: string) => {
    try {
      const { error } = await supabase
        .from('symptom_logs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting symptom:', error);
        toast({
          title: "Failed to delete",
          description: "Unable to delete the symptom entry.",
          variant: "destructive",
        });
      } else {
        setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
        toast({
          title: "Symptom deleted",
          description: "The symptom entry has been removed.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getRecentSymptoms = (days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return symptoms.filter(symptom => 
      new Date(symptom.recorded_at) >= cutoffDate
    );
  };

  const getSymptomTrends = () => {
    const symptomsLast7Days = getRecentSymptoms(7);
    const avgSeverity = symptomsLast7Days.length > 0 
      ? symptomsLast7Days.reduce((sum, s) => sum + s.severity, 0) / symptomsLast7Days.length 
      : 0;
    
    return {
      totalEntries: symptomsLast7Days.length,
      averageSeverity: parseFloat(avgSeverity.toFixed(1)),
      mostCommon: getMostCommonSymptom(symptomsLast7Days)
    };
  };

  const getMostCommonSymptom = (symptomList: SymptomLog[]) => {
    const counts: Record<string, number> = {};
    symptomList.forEach(symptom => {
      counts[symptom.symptom_type] = (counts[symptom.symptom_type] || 0) + 1;
    });
    
    return Object.keys(counts).length > 0 
      ? Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
      : null;
  };

  return {
    symptoms,
    loading,
    logSymptom,
    deleteSymptom,
    refreshSymptoms: fetchSymptoms,
    getRecentSymptoms,
    getSymptomTrends
  };
};