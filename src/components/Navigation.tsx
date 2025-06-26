
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              JANANI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-pink-500 transition-colors">Features</a>
            <a href="#ai" className="text-gray-700 hover:text-pink-500 transition-colors">AI Technology</a>
            <a href="#testimonials" className="text-gray-700 hover:text-pink-500 transition-colors">Stories</a>
            <a href="#research" className="text-gray-700 hover:text-pink-500 transition-colors">Research</a>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-pink-100">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block py-2 text-gray-700 hover:text-pink-500">Features</a>
            <a href="#ai" className="block py-2 text-gray-700 hover:text-pink-500">AI Technology</a>
            <a href="#testimonials" className="block py-2 text-gray-700 hover:text-pink-500">Stories</a>
            <a href="#research" className="block py-2 text-gray-700 hover:text-pink-500">Research</a>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-full mt-2">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
