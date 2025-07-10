
import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LoginSignupProps {
  onLoginSuccess: () => void;
}

export const LoginSignup: React.FC<LoginSignupProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (showForgotPassword) {
        // Handle password reset
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });

        if (error) {
          toast({
            title: "Reset Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setPasswordReset(true);
          toast({
            title: "Reset Email Sent!",
            description: "Check your email for password reset instructions.",
          });
        }
      } else if (isLogin) {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          let errorMessage = error.message;
          // Provide more user-friendly error messages
          if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'Please check your email and click the confirmation link to verify your account.';
          }
          
          toast({
            title: "Sign In Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've been signed in successfully.",
          });
          onLoginSuccess();
        }
      } else {
        // Sign up new user
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Password Too Short",
            description: "Password must be at least 6 characters long.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name,
            }
          }
        });

        if (error) {
          let errorMessage = error.message;
          if (error.message.includes('User already registered')) {
            errorMessage = 'An account with this email already exists. Please sign in instead.';
          }
          
          toast({
            title: "Sign Up Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          // For immediate login without email confirmation
          toast({
            title: "Welcome to JANANI!",
            description: "Your account has been created successfully. You are now signed in!",
          });
          onLoginSuccess();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              JANANI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {showForgotPassword 
              ? 'Reset Password' 
              : isLogin 
                ? 'Welcome Back!' 
                : 'Join JANANI'
            }
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {showForgotPassword
              ? 'Enter your email to receive password reset instructions'
              : isLogin 
                ? 'Continue your pregnancy journey with us' 
                : 'Start your personalized maternal care journey'
            }
          </p>
        </div>

        {passwordReset ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Sent!</h3>
            <p className="text-gray-600 mb-4">
              We've sent password reset instructions to your email address.
            </p>
            <button
              onClick={() => {
                setPasswordReset(false);
                setShowForgotPassword(false);
              }}
              className="text-pink-500 hover:text-pink-600 font-semibold"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {!isLogin && !showForgotPassword && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            {!showForgotPassword && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            )}

            {!isLogin && !showForgotPassword && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>
                    {showForgotPassword 
                      ? 'Send Reset Email' 
                      : isLogin 
                        ? 'Sign In' 
                        : 'Create Account'
                    }
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </>
              )}
            </button>
          </form>
        )}

        {!passwordReset && (
          <div className="mt-6 text-center">
            {showForgotPassword ? (
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-pink-500 hover:text-pink-600 font-semibold transition-colors"
              >
                Back to Sign In
              </button>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setShowForgotPassword(false);
                  }}
                  className="ml-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            )}
          </div>
        )}

        {!passwordReset && isLogin && !showForgotPassword && (
          <div className="mt-4 text-center">
            <button 
              onClick={() => setShowForgotPassword(true)}
              className="text-pink-500 hover:text-pink-600 text-sm transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
