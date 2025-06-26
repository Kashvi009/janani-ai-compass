
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Calendar, Clock } from 'lucide-react';

interface SymptomData {
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  frequency: string;
  trimester: '1' | '2' | '3';
}

interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  urgency: 'routine' | 'schedule_soon' | 'immediate';
  description: string;
}

export const SymptomAnalyzer = () => {
  const [symptomData, setSymptomData] = useState<SymptomData>({
    symptom: '',
    severity: 'mild',
    duration: '',
    frequency: '',
    trimester: '1'
  });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSymptom = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const result = generateAnalysis(symptomData);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateAnalysis = (data: SymptomData): AnalysisResult => {
    const { symptom, severity, trimester } = data;
    
    // High-risk symptoms
    const highRiskSymptoms = ['severe bleeding', 'severe abdominal pain', 'persistent vomiting', 'high fever', 'severe headache with vision changes'];
    const isHighRisk = highRiskSymptoms.some(s => symptom.toLowerCase().includes(s.split(' ')[1]));
    
    if (isHighRisk || severity === 'severe') {
      return {
        riskLevel: 'high',
        urgency: 'immediate',
        description: 'This symptom requires immediate medical attention.',
        recommendations: [
          'Contact your healthcare provider immediately',
          'Consider visiting the emergency room if symptoms worsen',
          'Monitor symptoms closely',
          'Have someone accompany you to medical appointments'
        ]
      };
    }

    // Medium risk analysis
    if (severity === 'moderate' || symptom.toLowerCase().includes('pain') || symptom.toLowerCase().includes('bleeding')) {
      return {
        riskLevel: 'medium',
        urgency: 'schedule_soon',
        description: 'This symptom should be evaluated by your healthcare provider within a few days.',
        recommendations: [
          'Schedule an appointment with your doctor within 48-72 hours',
          'Keep a symptom diary to track patterns',
          'Rest and stay hydrated',
          'Avoid strenuous activities until evaluated'
        ]
      };
    }

    // Low risk
    return {
      riskLevel: 'low',
      urgency: 'routine',
      description: 'This is likely a normal pregnancy symptom, but monitoring is recommended.',
      recommendations: [
        'Mention this at your next routine appointment',
        'Continue normal activities unless symptoms worsen',
        'Use comfort measures like rest and hydration',
        'Contact your doctor if symptoms change or worsen'
      ]
    };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Symptom Analyzer</h3>
        <p className="text-gray-600">Describe your symptoms for personalized analysis and recommendations.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your symptom
          </label>
          <textarea
            value={symptomData.symptom}
            onChange={(e) => setSymptomData({ ...symptomData, symptom: e.target.value })}
            placeholder="e.g., mild nausea in the morning, lower back pain, headache..."
            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <select
              value={symptomData.severity}
              onChange={(e) => setSymptomData({ ...symptomData, severity: e.target.value as any })}
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Trimester
            </label>
            <select
              value={symptomData.trimester}
              onChange={(e) => setSymptomData({ ...symptomData, trimester: e.target.value as any })}
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="1">First Trimester (1-12 weeks)</option>
              <option value="2">Second Trimester (13-27 weeks)</option>
              <option value="3">Third Trimester (28+ weeks)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={symptomData.duration}
              onChange={(e) => setSymptomData({ ...symptomData, duration: e.target.value })}
              placeholder="e.g., 2 days, 1 week"
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <input
              type="text"
              value={symptomData.frequency}
              onChange={(e) => setSymptomData({ ...symptomData, frequency: e.target.value })}
              placeholder="e.g., daily, occasionally"
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={analyzeSymptom}
        disabled={!symptomData.symptom.trim() || isAnalyzing}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Symptoms'}
      </button>

      {analysis && (
        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-lg border-2 ${getRiskColor(analysis.riskLevel)}`}>
            <div className="flex items-center space-x-2 mb-2">
              {getRiskIcon(analysis.riskLevel)}
              <h4 className="font-semibold capitalize">
                {analysis.riskLevel} Risk Level
              </h4>
            </div>
            <p className="text-sm">{analysis.description}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recommended Actions
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                  <span className="font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-700">
              <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. Always consult with your healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
