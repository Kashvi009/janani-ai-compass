
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold">JANANI</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Journey of A Nurtured And Nurturing Individual. AI-powered maternal health companion for every mother's unique journey.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-gray-300">care@janani.health</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-500" />
                <span className="text-gray-300">+91-800-JANANI</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span className="text-gray-300">Bangalore, India</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Symptom Tracker</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">AI Predictions</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Doctor Connect</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Medicine Reminders</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Wellness Plans</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 mb-4">
            © 2024 JANANI. Made with ❤️ for mothers everywhere.
          </p>
          <p className="text-sm text-gray-500">
            "For She Who Gives Birth" - Empowering every mother with intelligent, compassionate care.
          </p>
        </div>
      </div>
    </footer>
  );
};
