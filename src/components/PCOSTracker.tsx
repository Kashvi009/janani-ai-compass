
import React, { useState } from 'react';
import { Heart, Calendar, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';

interface PCOSData {
  irregularPeriods: boolean;
  excessHairGrowth: boolean;
  acne: boolean;
  weightGain: boolean;
  hairLoss: boolean;
  darkSkinPatches: boolean;
  moodChanges: boolean;
  sleepIssues: boolean;
  lastPeriodDate: string;
  cycleLength: string;
  symptoms: string;
  lifestyle: {
    exercise: string;
    diet: string;
    stress: string;
  };
}

interface PCOSAssessment {
  riskLevel: 'low' | 'moderate' | 'high';
  score: number;
  recommendations: string[];
  nextSteps: string[];
}

export const PCOSTracker = () => {
  const [pcosData, setPcosData] = useState<PCOSData>({
    irregularPeriods: false,
    excessHairGrowth: false,
    acne: false,
    weightGain: false,
    hairLoss: false,
    darkSkinPatches: false,
    moodChanges: false,
    sleepIssues: false,
    lastPeriodDate: '',
    cycleLength: '',
    symptoms: '',
    lifestyle: {
      exercise: '',
      diet: '',
      stress: ''
    }
  });

  const [assessment, setAssessment] = useState<PCOSAssessment | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomChange = (symptom: keyof PCOSData, value: boolean) => {
    setPcosData(prev => ({ ...prev, [symptom]: value }));
  };

  const handleLifestyleChange = (key: keyof PCOSData['lifestyle'], value: string) => {
    setPcosData(prev => ({
      ...prev,
      lifestyle: { ...prev.lifestyle, [key]: value }
    }));
  };

  const calculatePCOSRisk = (): PCOSAssessment => {
    let score = 0;
    const symptoms = [
      pcosData.irregularPeriods,
      pcosData.excessHairGrowth,
      pcosData.acne,
      pcosData.weightGain,
      pcosData.hairLoss,
      pcosData.darkSkinPatches,
      pcosData.moodChanges,
      pcosData.sleepIssues
    ];

    score = symptoms.filter(Boolean).length;

    let riskLevel: 'low' | 'moderate' | 'high';
    let recommendations: string[] = [];
    let nextSteps: string[] = [];

    if (score >= 5) {
      riskLevel = 'high';
      recommendations = [
        'Consult with a gynecologist or endocrinologist immediately',
        'Request hormonal tests (LH, FSH, testosterone, insulin)',
        'Consider pelvic ultrasound to check for ovarian cysts',
        'Start tracking your menstrual cycle and symptoms daily',
        'Begin lifestyle modifications (diet and exercise)'
      ];
      nextSteps = [
        'Book appointment with specialist within 1-2 weeks',
        'Start PCOS-friendly diet (low glycemic index)',
        'Begin regular exercise routine (30 min daily)',
        'Consider stress management techniques'
      ];
    } else if (score >= 3) {
      riskLevel = 'moderate';
      recommendations = [
        'Schedule consultation with your gynecologist',
        'Start tracking menstrual cycles and symptoms',
        'Focus on maintaining healthy weight through diet and exercise',
        'Monitor symptoms and report changes to your doctor',
        'Consider blood tests to rule out hormonal imbalances'
      ];
      nextSteps = [
        'Book appointment within 4-6 weeks',
        'Maintain symptom diary for 2-3 months',
        'Adopt anti-inflammatory diet',
        'Regular moderate exercise'
      ];
    } else {
      riskLevel = 'low';
      recommendations = [
        'Continue monitoring symptoms and menstrual cycle',
        'Maintain healthy lifestyle with balanced diet and exercise',
        'Annual gynecological check-ups',
        'Be aware of PCOS symptoms for early detection',
        'Focus on stress management and adequate sleep'
      ];
      nextSteps = [
        'Continue healthy lifestyle habits',
        'Regular health check-ups',
        'Stay informed about reproductive health',
        'Track any changes in symptoms'
      ];
    }

    return { riskLevel, score, recommendations, nextSteps };
  };

  const analyzePCOS = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = calculatePCOSRisk();
      setAssessment(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'moderate': return <Activity className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'low': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <Activity className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl max-w-2xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500 mr-2" />
          PCOS/PCOD Tracker
        </h3>
        <p className="text-sm sm:text-base text-gray-600">Track symptoms and get personalized insights for PCOS/PCOD management.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Symptoms Checklist */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Common PCOS Symptoms</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              { key: 'irregularPeriods', label: 'Irregular periods' },
              { key: 'excessHairGrowth', label: 'Excess hair growth' },
              { key: 'acne', label: 'Acne or oily skin' },
              { key: 'weightGain', label: 'Weight gain/difficulty losing weight' },
              { key: 'hairLoss', label: 'Hair thinning/male pattern baldness' },
              { key: 'darkSkinPatches', label: 'Dark skin patches' },
              { key: 'moodChanges', label: 'Mood changes/depression' },
              { key: 'sleepIssues', label: 'Sleep problems' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-2 p-2 sm:p-3 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pcosData[key as keyof PCOSData] as boolean}
                  onChange={(e) => handleSymptomChange(key as keyof PCOSData, e.target.checked)}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="text-xs sm:text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cycle Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Last Period Date
            </label>
            <input
              type="date"
              value={pcosData.lastPeriodDate}
              onChange={(e) => setPcosData(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
              className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typical Cycle Length
            </label>
            <select
              value={pcosData.cycleLength}
              onChange={(e) => setPcosData(prev => ({ ...prev, cycleLength: e.target.value }))}
              className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            >
              <option value="">Select cycle length</option>
              <option value="<21 days">Less than 21 days</option>
              <option value="21-35 days">21-35 days (normal)</option>
              <option value=">35 days">More than 35 days</option>
              <option value="irregular">Very irregular</option>
            </select>
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Lifestyle Factors</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Frequency</label>
              <select
                value={pcosData.lifestyle.exercise}
                onChange={(e) => handleLifestyleChange('exercise', e.target.value)}
                className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              >
                <option value="">Select frequency</option>
                <option value="none">No regular exercise</option>
                <option value="1-2 times/week">1-2 times per week</option>
                <option value="3-4 times/week">3-4 times per week</option>
                <option value="daily">Daily exercise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
              <select
                value={pcosData.lifestyle.diet}
                onChange={(e) => handleLifestyleChange('diet', e.target.value)}
                className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              >
                <option value="">Select diet type</option>
                <option value="regular">Regular diet</option>
                <option value="low-carb">Low carb</option>
                <option value="anti-inflammatory">Anti-inflammatory</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="vegetarian">Vegetarian/Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level</label>
              <select
                value={pcosData.lifestyle.stress}
                onChange={(e) => handleLifestyleChange('stress', e.target.value)}
                className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              >
                <option value="">Select stress level</option>
                <option value="low">Low stress</option>
                <option value="moderate">Moderate stress</option>
                <option value="high">High stress</option>
                <option value="very-high">Very high stress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Symptoms or Notes
          </label>
          <textarea
            value={pcosData.symptoms}
            onChange={(e) => setPcosData(prev => ({ ...prev, symptoms: e.target.value }))}
            placeholder="Describe any other symptoms, concerns, or patterns you've noticed..."
            className="w-full p-2 sm:p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            rows={3}
          />
        </div>

        <button
          onClick={analyzePCOS}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isAnalyzing ? 'Analyzing PCOS Risk...' : '💕 Analyze PCOS Risk'}
        </button>

        {assessment && (
          <div className="space-y-4">
            <div className={`p-3 sm:p-4 rounded-lg border-2 ${getRiskColor(assessment.riskLevel)}`}>
              <div className="flex items-center space-x-2 mb-2">
                {getRiskIcon(assessment.riskLevel)}
                <h4 className="font-semibold capitalize text-sm sm:text-base">
                  {assessment.riskLevel} Risk Level
                </h4>
                <span className="text-xs sm:text-sm">({assessment.score}/8 symptoms)</span>
              </div>
              <p className="text-xs sm:text-sm">Based on your symptoms, this assessment helps guide your next steps.</p>
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-sm sm:text-base">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-blue-700">
                    <span className="font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center text-sm sm:text-base">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Next Steps
              </h4>
              <ul className="space-y-2">
                {assessment.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-purple-700">
                    <span className="font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-pink-50 p-3 sm:p-4 rounded-lg border border-pink-200">
              <p className="text-xs sm:text-sm text-pink-700">
                <strong>Disclaimer:</strong> This assessment is for informational purposes only and should not replace professional medical advice. PCOS diagnosis requires medical evaluation and specific tests. Always consult with your healthcare provider.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
