
import React from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: 'Features',
      links: [
        { name: 'Symptom Tracker', href: '#' },
        { name: 'AI Predictions', href: '#' },
        { name: 'Doctor Connect', href: '#' },
        { name: 'Medicine Reminders', href: '#' },
        { name: 'Wellness Plans', href: '#' },
        { name: 'PCOS Tracker', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'FAQ', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Pregnancy Guide', href: '#' },
        { name: 'Nutrition Tips', href: '#' },
        { name: 'Exercise Videos', href: '#' },
        { name: 'Medical Articles', href: '#' },
        { name: 'Expert Advice', href: '#' },
        { name: 'Blog', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-8 w-8 text-pink-500" />
                <span className="text-2xl font-bold">JANANI</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Journey of A Nurtured And Nurturing Individual. AI-powered maternal health companion for every mother's unique journey.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-pink-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">care@janani.health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-pink-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">+91-800-JANANI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-pink-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">Bangalore, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors duration-200 group"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a 
                            href={link.href} 
                            className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm sm:text-base block"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-0">
                © 2024 JANANI. Made with ❤️ for mothers everywhere.
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                "For She Who Gives Birth" - Empowering every mother with intelligent, compassionate care.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
