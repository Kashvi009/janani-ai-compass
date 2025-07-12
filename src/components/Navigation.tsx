
import React, { useState } from 'react';
import { Heart, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { href: '#features', label: 'Features' },
    { href: '#ai', label: 'AI Technology' },
    { href: '#testimonials', label: 'Stories' },
    { href: '#research', label: 'Research' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              JANANI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {!isDashboard && navigationItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
            {isDashboard ? (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <a 
                  href="/"
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium text-sm lg:text-base flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-pink-50"
                >
                  <Heart className="h-4 w-4" />
                  <span>Website</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium text-sm lg:text-base px-3 py-2 rounded-full hover:bg-pink-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <Link 
                  to="/auth"
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-2 rounded-full hover:bg-pink-50"
                >
                  <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link 
                  to="/auth"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 sm:px-4 lg:px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium text-xs sm:text-sm lg:text-base flex items-center space-x-1"
                >
                  <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Start Journey</span>
                  <span className="sm:hidden">Start</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-pink-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {!isDashboard && navigationItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="block py-2 px-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {isDashboard ? (
                <div className="space-y-2">
                  <a 
                    href="/"
                    className="block py-3 px-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Back to Website</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-pink-100">
                  <Link 
                    to="/auth"
                    className="w-full text-left py-2 px-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/auth"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-full font-medium hover:shadow-lg transition-all duration-200 text-center text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🌸 Start My Journey
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
