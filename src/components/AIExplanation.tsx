
import React from 'react';
import { ArrowDown, Shield, Heart, User } from 'lucide-react';

export const AIExplanation = () => {
  return (
    <section id="ai" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              How Our AI Works
            </span>
            <br />
            <span className="text-gray-800">for You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the intelligent system that provides personalized care and predictions for your pregnancy journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Intelligent Analysis Process</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Data Entry</h4>
                  <p className="text-gray-600">You input symptoms, vitals, and health information through our intuitive interface.</p>
                </div>
              </div>
              <ArrowDown className="h-6 w-6 text-pink-400 mx-auto" />
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Symptom Analysis</h4>
                  <p className="text-gray-600">Our AI processes your data against medical guidelines and patterns.</p>
                </div>
              </div>
              <ArrowDown className="h-6 w-6 text-pink-400 mx-auto" />
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Risk Prediction</h4>
                  <p className="text-gray-600">Advanced algorithms identify potential risks and complications early.</p>
                </div>
              </div>
              <ArrowDown className="h-6 w-6 text-pink-400 mx-auto" />
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Personalized Recommendations</h4>
                  <p className="text-gray-600">Receive tailored advice, reminders, and care plans specific to your needs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Privacy & Security</h4>
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-xl">
                <h5 className="font-semibold text-pink-800 mb-2">🔐 End-to-End Encryption</h5>
                <p className="text-pink-700 text-sm">Your data is encrypted and never shared without your consent.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <h5 className="font-semibold text-purple-800 mb-2">🏥 Medical Grade Security</h5>
                <p className="text-purple-700 text-sm">Compliant with healthcare data protection standards.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h5 className="font-semibold text-blue-800 mb-2">👩‍⚕️ Doctor Approved</h5>
                <p className="text-blue-700 text-sm">Built with gynecologists and maternal health experts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Workout & Wellness Integration</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Get trimester-specific yoga routines and prenatal fitness plans designed by certified instructors and approved by medical professionals.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">🧘‍♀️ Prenatal Yoga</h4>
              <p className="text-sm text-gray-600">Gentle poses for each trimester</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">💪 Safe Exercises</h4>
              <p className="text-sm text-gray-600">Strength training adapted for pregnancy</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">📄 Downloadable Plans</h4>
              <p className="text-sm text-gray-600">PDF workouts for offline use</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
