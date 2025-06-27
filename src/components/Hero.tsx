
import React from 'react';
import { Heart, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 animate-pulse" />
            <span className="text-pink-700 font-medium text-sm sm:text-base">For She Who Gives Birth</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Care
            </span>
            <br />
            <span className="text-gray-800">for Every Mother</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Journey of A Nurtured And Nurturing Individual. Your intelligent companion from first trimester to first embrace, providing personalized care, expert guidance, and peace of mind throughout your pregnancy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Link 
              to="/dashboard"
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>💗</span>
              <span>Start My Journey</span>
            </Link>
            <button className="w-full sm:w-auto border-2 border-pink-300 text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-pink-50 transition-all flex items-center justify-center space-x-2">
              <span>📲</span>
              <span>Try Demo</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Your Pregnancy, Powered by AI</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Experience the future of maternal care with our intelligent health tracking, personalized recommendations, and 24/7 support system designed specifically for expecting mothers.
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white rounded-full p-2 sm:p-3 flex-shrink-0">
                    <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-pink-500" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Trusted by 10,000+ mothers worldwide</span>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Symptoms tracked today</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Next appointment scheduled</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Nutrition plan updated</span>
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
