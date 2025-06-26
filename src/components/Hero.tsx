
import React from 'react';
import { Heart, ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full mb-8">
            <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
            <span className="text-pink-700 font-medium">For She Who Gives Birth</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Care
            </span>
            <br />
            <span className="text-gray-800">for Every Mother</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Journey of A Nurtured And Nurturing Individual. Your intelligent companion from first trimester to first embrace, providing personalized care, expert guidance, and peace of mind throughout your pregnancy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
              💗 Start My Journey
            </button>
            <button className="border-2 border-pink-300 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all">
              📲 Try Demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Pregnancy, Powered by AI</h3>
                <p className="text-gray-600 mb-6">
                  Experience the future of maternal care with our intelligent health tracking, personalized recommendations, and 24/7 support system designed specifically for expecting mothers.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full p-3">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <span className="text-gray-700">Trusted by 10,000+ mothers worldwide</span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Symptoms tracked today</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Next appointment scheduled</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Nutrition plan updated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
