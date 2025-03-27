
import React from 'react';

export const PassHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-block px-4 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 mb-4">
        <span className="text-sm font-medium">Limited Availability - Only 80,000 pass</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 relative">
        <span className="animate-float inline-block relative">
          {/* Animated Letters */}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-shimmer opacity-80">FANS ONLY Pass Card</span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent animate-shimmer opacity-80" style={{ animationDelay: '0.5s' }}>FANS ONLY Pass Card</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-shimmer opacity-80" style={{ animationDelay: '1s' }}>FANS ONLY Pass Card</span>
          </span>
          {/* Main visible text */}
          <span className="relative bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">FANS ONLY Pass Card</span>
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Your SOUNDUOEX access to the concert of a lifetime and premium benefits
      </p>
    </div>
  );
};
