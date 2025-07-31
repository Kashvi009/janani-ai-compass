import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HealthFactors {
  sleep: number;      // 0-100 (hours and quality)
  nutrition: number;  // 0-100 (diet quality and hydration)
  stress: number;     // 0-100 (stress levels, lower is better)
  exercise: number;   // 0-100 (activity and movement)
  vitals: number;     // 0-100 (blood pressure, sugar, etc.)
  symptoms: number;   // 0-100 (symptom severity, lower is better)
  pcos: number;       // 0-100 (PCOS management if applicable)
}

interface NashResult {
  finalScore: number;
  equilibriumReached: boolean;
  iterations: number;
  factorWeights: HealthFactors;
  recommendations: string[];
}

// Nash Equilibrium calculation for health factors
function calculateNashHealthScore(factors: HealthFactors): NashResult {
  const maxIterations = 50;
  const convergenceThreshold = 0.001;
  
  // Initialize weights (how much each factor affects others)
  let weights: HealthFactors = {
    sleep: 0.2,
    nutrition: 0.18,
    stress: 0.15,
    exercise: 0.17,
    vitals: 0.15,
    symptoms: 0.1,
    pcos: 0.05
  };
  
  let iteration = 0;
  let equilibriumReached = false;
  let previousScore = 0;
  
  // Nash equilibrium iteration
  while (iteration < maxIterations && !equilibriumReached) {
    // Calculate cross-factor influences (Nash-style interactions)
    const sleepInfluence = Math.min(100, factors.sleep + (factors.exercise * 0.3) - (factors.stress * 0.4));
    const nutritionInfluence = Math.min(100, factors.nutrition + (factors.exercise * 0.2) - (factors.symptoms * 0.3));
    const stressInfluence = Math.max(0, factors.stress - (factors.sleep * 0.4) - (factors.exercise * 0.3));
    const exerciseInfluence = Math.min(100, factors.exercise + (factors.sleep * 0.2) - (factors.stress * 0.2));
    const vitalsInfluence = Math.min(100, factors.vitals + (factors.nutrition * 0.3) + (factors.exercise * 0.2) - (factors.stress * 0.4));
    const symptomsInfluence = Math.max(0, factors.symptoms - (factors.nutrition * 0.2) - (factors.sleep * 0.3));
    const pcosInfluence = factors.pcos > 0 ? Math.min(100, factors.pcos + (factors.nutrition * 0.3) + (factors.exercise * 0.4) - (factors.stress * 0.3)) : 0;
    
    // Apply Nash equilibrium: each factor adjusts based on others
    const adjustedFactors = {
      sleep: sleepInfluence,
      nutrition: nutritionInfluence,
      stress: 100 - stressInfluence, // Invert stress (lower is better)
      exercise: exerciseInfluence,
      vitals: vitalsInfluence,
      symptoms: 100 - symptomsInfluence, // Invert symptoms (lower is better)
      pcos: pcosInfluence
    };
    
    // Calculate weighted score
    const currentScore = 
      (adjustedFactors.sleep * weights.sleep) +
      (adjustedFactors.nutrition * weights.nutrition) +
      (adjustedFactors.stress * weights.stress) +
      (adjustedFactors.exercise * weights.exercise) +
      (adjustedFactors.vitals * weights.vitals) +
      (adjustedFactors.symptoms * weights.symptoms) +
      (adjustedFactors.pcos * weights.pcos);
    
    // Check convergence (Nash equilibrium reached)
    if (Math.abs(currentScore - previousScore) < convergenceThreshold) {
      equilibriumReached = true;
    }
    
    previousScore = currentScore;
    iteration++;
    
    // Adjust weights based on factor performance (Nash adaptation)
    const totalVariance = Object.values(adjustedFactors).reduce((acc, val) => acc + Math.pow(val - 50, 2), 0);
    if (totalVariance > 1000) { // High variance - redistribute weights
      weights = redistributeWeights(adjustedFactors, weights);
    }
  }
  
  // Generate personalized recommendations based on Nash analysis
  const recommendations = generateRecommendations(factors, weights);
  
  return {
    finalScore: Math.round(previousScore),
    equilibriumReached,
    iterations: iteration,
    factorWeights: weights,
    recommendations
  };
}

// Redistribute weights to achieve better balance (Nash optimization)
function redistributeWeights(factors: HealthFactors, currentWeights: HealthFactors): HealthFactors {
  const idealTarget = 75; // Target score for each factor
  const newWeights = { ...currentWeights };
  
  Object.keys(factors).forEach(key => {
    const factor = key as keyof HealthFactors;
    const deviation = Math.abs(factors[factor] - idealTarget);
    
    // Increase weight for underperforming factors
    if (factors[factor] < idealTarget) {
      newWeights[factor] = Math.min(0.3, currentWeights[factor] * 1.1);
    } else if (factors[factor] > idealTarget + 10) {
      newWeights[factor] = Math.max(0.05, currentWeights[factor] * 0.9);
    }
  });
  
  // Normalize weights to sum to 1
  const totalWeight = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
  Object.keys(newWeights).forEach(key => {
    newWeights[key as keyof HealthFactors] /= totalWeight;
  });
  
  return newWeights;
}

// Generate personalized recommendations based on Nash analysis
function generateRecommendations(factors: HealthFactors, weights: HealthFactors): string[] {
  const recommendations: string[] = [];
  const sortedFactors = Object.entries(factors).sort(([,a], [,b]) => a - b);
  
  // Focus on the lowest performing factors that affect overall balance
  sortedFactors.slice(0, 2).forEach(([factor, score]) => {
    if (score < 60) {
      switch (factor) {
        case 'sleep':
          recommendations.push("Prioritize 7-9 hours of quality sleep to boost overall wellness harmony");
          break;
        case 'nutrition':
          recommendations.push("Focus on balanced nutrition with prenatal vitamins for optimal health balance");
          break;
        case 'stress':
          recommendations.push("Practice mindfulness and relaxation techniques to reduce stress impact");
          break;
        case 'exercise':
          recommendations.push("Gentle prenatal exercises can improve multiple health factors simultaneously");
          break;
        case 'vitals':
          recommendations.push("Monitor blood pressure and blood sugar regularly with your healthcare provider");
          break;
        case 'symptoms':
          recommendations.push("Track symptoms and discuss patterns with your doctor for better management");
          break;
        case 'pcos':
          recommendations.push("Continue PCOS management strategies for hormonal balance");
          break;
      }
    }
  });
  
  return recommendations;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { factors, userId } = await req.json()
    
    if (!factors || !userId) {
      throw new Error('Missing required parameters: factors and userId')
    }

    // Calculate Nash equilibrium health score
    const result = calculateNashHealthScore(factors as HealthFactors);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Save the calculated score to database
    const { error: insertError } = await supabase
      .from('health_scores')
      .insert({
        user_id: userId,
        total_score: result.finalScore,
        blood_pressure_score: Math.round(factors.vitals * 0.4 + factors.stress * 0.3),
        blood_sugar_score: Math.round(factors.vitals * 0.5 + factors.nutrition * 0.3),
        weight_score: Math.round(factors.nutrition * 0.4 + factors.exercise * 0.4),
        symptom_score: Math.round(100 - factors.symptoms),
        status: result.finalScore >= 80 ? 'excellent' : 
                result.finalScore >= 65 ? 'good' : 
                result.finalScore >= 50 ? 'fair' : 'needs_attention'
      });

    if (insertError) {
      console.error('Error saving health score:', insertError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        score: result.finalScore,
        status: result.finalScore >= 80 ? 'excellent' : 
                result.finalScore >= 65 ? 'good' : 
                result.finalScore >= 50 ? 'fair' : 'needs_attention',
        equilibriumReached: result.equilibriumReached,
        recommendations: result.recommendations,
        iterations: result.iterations
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})