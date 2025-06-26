
import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-blue-500/90"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-8">
              <Heart className="h-5 w-5 text-white animate-pulse" />
              <span className="text-white font-medium">Ready to Begin?</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              Begin Your Journey
              <br />
              <span className="text-pink-200">with JANANI</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of mothers who trust JANANI for their pregnancy journey. Experience personalized AI-powered care that grows with you and your baby.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center justify-center">
                💗 Start My Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all">
                📱 Download App
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Free</div>
                <div className="text-white/80">Initial Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-white/80">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-white/80">Privacy Protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
