
import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { AIExplanation } from '../components/AIExplanation';
import { Testimonials } from '../components/Testimonials';
import { Research } from '../components/Research';
import { CallToAction } from '../components/CallToAction';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AIAssistant } from '../components/AIAssistant';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navigation />
      <Hero />
      <Features />
      
      {/* Dashboard CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Experience All Features
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Try our comprehensive dashboard with facial recognition login, health questionnaire, workout plans, ultrasound scheduler, and family sharing features.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Launch JANANI Dashboard
          </Link>
        </div>
      </section>

      <AIExplanation />
      <Testimonials />
      <Research />
      <CallToAction />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
