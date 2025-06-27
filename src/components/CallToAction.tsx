
import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-blue-500/90"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />
              <span className="text-white font-medium text-sm sm:text-base">Ready to Begin?</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Begin Your Journey
              <br />
              <span className="text-pink-200">with JANANI</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Join thousands of mothers who trust JANANI for their pregnancy journey. Experience personalized AI-powered care that grows with you and your baby.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 max-w-md sm:max-w-none mx-auto">
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto bg-white text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
              >
                <span>💗</span>
                <span>Start My Journey</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Download App</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Free</div>
                <div className="text-white/80 text-sm sm:text-base">Initial Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-white/80 text-sm sm:text-base">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-white/80 text-sm sm:text-base">Privacy Protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
