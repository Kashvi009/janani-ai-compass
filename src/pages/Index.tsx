
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navigation />
      <Hero />
      <Features />
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
