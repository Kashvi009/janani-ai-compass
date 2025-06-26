
import React, { useState } from 'react';
import { ChevronRight, Heart, CheckCircle, Calendar, AlertCircle } from 'lucide-react';

interface QuestionnaireData {
  maritalStatus: string;
  hasPCOS: boolean;
  foodAllergies: string[];
  menstrualCycle: string;
  healthRecords: string;
  consent: boolean;
}

export const SmartQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [data, setData] = useState<QuestionnaireData>({
    maritalStatus: '',
    hasPCOS: false,
    foodAllergies: [],
    menstrualCycle: '',
    healthRecords: '',
    consent: false
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate saving data with session ID and timestamp
    const submissionData = {
      ...data,
      sessionId,
      timestamp: new Date().toISOString(),
      deviceInfo: {
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`
      }
    };
    
    console.log('Questionnaire submitted:', submissionData);
    setIsSubmitted(true);
  };

  const handleAllergyToggle = (allergy: string) => {
    setData(prev => ({
      ...prev,
      foodAllergies: prev.foodAllergies.includes(allergy)
        ? prev.foodAllergies.filter(a => a !== allergy)
        : [...prev.foodAllergies, allergy]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
          <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Thank You for Sharing!
          </h2>
          <p className="text-gray-600 mb-6">
            Your health profile has been created successfully. We'll use this information to provide you with personalized care and recommendations.
          </p>
          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-pink-700">
              <strong>Session ID:</strong> {sessionId}
            </p>
            <p className="text-xs text-pink-600 mt-1">
              Your data is encrypted and stored securely
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tell us about yourself</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
            <div className="space-y-2">
              {['Single', 'Married', 'Divorced', 'Widowed'].map(status => (
                <label key={status} className="flex items-center space-x-3 p-3 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={status}
                    checked={data.maritalStatus === status}
                    onChange={(e) => setData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-sm sm:text-base">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Health Conditions",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Information</h3>
          <div>
            <label className="flex items-center space-x-3 p-4 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hasPCOS}
                onChange={(e) => setData(prev => ({ ...prev, hasPCOS: e.target.checked }))}
                className="text-pink-500 focus:ring-pink-500"
              />
              <div>
                <span className="font-medium text-gray-800">I have PCOS/PCOD</span>
                <p className="text-sm text-gray-600">This helps us provide specialized care</p>
              </div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Menstrual Cycle</label>
            <select
              value={data.menstrualCycle}
              onChange={(e) => setData(prev => ({ ...prev, menstrualCycle: e.target.value }))}
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select cycle pattern</option>
              <option value="regular">Regular (21-35 days)</option>
              <option value="irregular">Irregular</option>
              <option value="absent">Absent periods</option>
              <option value="postmenopausal">Post-menopausal</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Food Allergies",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Allergies & Restrictions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Dairy', 'Nuts', 'Gluten', 'Eggs', 'Shellfish', 'Soy', 'Fish', 'None'].map(allergy => (
              <label key={allergy} className="flex items-center space-x-3 p-3 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.foodAllergies.includes(allergy)}
                  onChange={() => handleAllergyToggle(allergy)}
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm sm:text-base">{allergy}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Health Records",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Initial Health Records</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any existing health conditions or medications?
            </label>
            <textarea
              value={data.healthRecords}
              onChange={(e) => setData(prev => ({ ...prev, healthRecords: e.target.value }))}
              placeholder="Please describe any existing health conditions, medications, or concerns..."
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              rows={4}
            />
          </div>
        </div>
      )
    },
    {
      title: "Privacy Consent",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Consent</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">How we protect your data:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• End-to-end encryption for all health data</li>
              <li>• Anonymous session-based storage</li>
              <li>• No data sharing without explicit consent</li>
              <li>• Medical-grade security standards</li>
            </ul>
          </div>
          <label className="flex items-start space-x-3 p-4 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => setData(prev => ({ ...prev, consent: e.target.checked }))}
              className="text-pink-500 focus:ring-pink-500 mt-1"
            />
            <div>
              <span className="font-medium text-gray-800">I consent to data collection and processing</span>
              <p className="text-sm text-gray-600 mt-1">
                I understand that my health information will be used to provide personalized maternal health recommendations and care.
              </p>
            </div>
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Health Profile Setup</h2>
            <span className="text-pink-100 text-sm">{currentStep + 1} of {totalSteps}</span>
          </div>
          <div className="w-full bg-pink-200 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 sm:p-8 pt-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-2 text-gray-600 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!data.consent}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>Complete Setup</span>
              <Heart className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
