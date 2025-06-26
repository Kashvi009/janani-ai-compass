
import React, { useState } from 'react';
import { Camera, Scan, User, Check, Loader2 } from 'lucide-react';

export const FacialLogin = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleScanLogin = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => {
        setScanComplete(false);
        setShowFallback(true);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-6 lg:p-8 rounded-3xl max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Secure Facial Recognition Login
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Quick, safe, and personalized access to your maternal health journey
        </p>
      </div>

      {!showFallback ? (
        <div className="text-center">
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-6">
            <div className={`w-full h-full rounded-full border-4 ${isScanning ? 'border-pink-400 animate-pulse' : 'border-pink-200'} bg-pink-50 flex items-center justify-center`}>
              {scanComplete ? (
                <Check className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
              ) : isScanning ? (
                <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-pink-500 animate-spin" />
              ) : (
                <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-pink-400" />
              )}
            </div>
            {isScanning && (
              <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-ping"></div>
            )}
          </div>

          {scanComplete ? (
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">Login Successful!</p>
              <p className="text-sm text-gray-600">Welcome back to JANANI</p>
            </div>
          ) : (
            <>
              <button
                onClick={handleScanLogin}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Scan className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{isScanning ? 'Scanning...' : 'Scan to Login'}</span>
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                Position your face in the camera frame above
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Camera not available on this device. Please use email login below.
            </p>
          </div>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            />
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all text-sm sm:text-base">
              Login with Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
