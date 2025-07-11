
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Lock, Database, Users, ArrowRight } from 'lucide-react';

export const AIModelExplanation = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'data-entry',
      title: 'Data Entry',
      icon: '📝',
      description: 'You input symptoms, vitals, and health information through our secure interface',
      details: 'All data is encrypted in transit and at rest using AES-256 encryption standards'
    },
    {
      id: 'symptom-detection',
      title: 'Symptom Detection',
      icon: '🔍',
      description: 'Our AI analyzes patterns and identifies potential health indicators',
      details: 'Machine learning models trained on anonymized medical datasets'
    },
    {
      id: 'risk-analysis',
      title: 'Risk Analysis',
      icon: '⚖️',
      description: 'Advanced algorithms assess risk levels based on medical guidelines',
      details: 'Cross-referenced with clinical guidelines and research data'
    },
    {
      id: 'recommendations',
      title: 'Personalized Suggestions',
      icon: '💡',
      description: 'Tailored recommendations and care plans specific to your needs',
      details: 'Generated based on your unique health profile and pregnancy stage'
    }
  ];

  const privacyItems = [
    {
      id: 'data-storage',
      title: 'How is my data stored?',
      content: 'Your health data is stored using military-grade encryption (AES-256) in secure, HIPAA-compliant servers. Data is distributed across multiple secure locations with regular backups and 99.9% uptime guarantee.'
    },
    {
      id: 'anonymous-sessions',
      title: 'Anonymous Session Handling',
      content: 'Each session is assigned a unique, anonymous ID that cannot be traced back to personal information. Session data is automatically purged after 30 days of inactivity, ensuring your privacy is maintained.'
    },
    {
      id: 'admin-separation',
      title: 'Admin-User Data Separation',
      content: 'Administrative staff cannot access individual user health data. All personal health information is encrypted with user-specific keys, ensuring even system administrators cannot view your private information.'
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing Policies',
      content: 'We never sell or share your personal health data with third parties. Aggregated, anonymized data may be used for medical research only with explicit consent and under strict ethical guidelines.'
    }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              How Our AI Works
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the intelligent system that provides personalized care and predictions for your pregnancy journey.
          </p>
        </div>

        {/* Interactive Flowchart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            AI Analysis Process
          </h2>
          
          {/* Desktop Horizontal Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      currentStep === index ? 'scale-110' : 'hover:scale-105'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 transition-all ${
                      currentStep === index 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                        : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                    }`}>
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-center text-sm">{step.title}</h3>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-pink-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Flow */}
          <div className="lg:hidden space-y-6 mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all ${
                  currentStep === index 
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  currentStep === index 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-pink-100 text-pink-600'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">{steps[currentStep].icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
              <p className="text-sm text-gray-500 italic">{steps[currentStep].details}</p>
            </div>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-12">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Privacy by Design & Data Encryption
            </h2>
            <p className="text-gray-600">
              Your privacy and data security are our top priorities. Learn how we protect your information.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-pink-50 p-4 rounded-xl text-center">
              <Lock className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">End-to-End Encryption</h3>
              <p className="text-sm text-gray-600">AES-256 encryption standard</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Secure Storage</h3>
              <p className="text-sm text-gray-600">HIPAA-compliant servers</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Anonymous Sessions</h3>
              <p className="text-sm text-gray-600">No personal identifiers</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Zero Data Sharing</h3>
              <p className="text-sm text-gray-600">Never sold to third parties</p>
            </div>
          </div>

          {/* Accordion for Privacy Details */}
          <div className="space-y-4">
            {privacyItems.map((item) => (
              <div key={item.id} className="border border-pink-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-4 hover:bg-pink-50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800">{item.title}</span>
                  {activeAccordion === item.id ? (
                    <ChevronDown className="h-5 w-5 text-pink-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-pink-600" />
                  )}
                </button>
                {activeAccordion === item.id && (
                  <div className="p-4 pt-0 bg-pink-50 border-t border-pink-100">
                    <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medical Approval Section */}
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-6 sm:p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Doctor Approved & Medically Validated
          </h3>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Our AI models are developed in collaboration with certified gynecologists, maternal health experts, and medical researchers to ensure accuracy and safety.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">👩‍⚕️ Medical Advisory Board</h4>
              <p className="text-sm text-gray-600">Certified OB-GYNs and maternal specialists</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">📚 Research Backed</h4>
              <p className="text-sm text-gray-600">Based on peer-reviewed medical literature</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">🏥 Clinical Validation</h4>
              <p className="text-sm text-gray-600">Tested in real clinical environments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
