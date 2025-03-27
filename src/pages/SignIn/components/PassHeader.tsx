
import React from 'react';

export const PassHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-block px-4 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-pink-300 mb-4 border border-pink-400/30 animate-pulse-slow">
        <span className="text-sm font-medium">Limited Availability - Only 80,000 passes</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-fuchsia-400 animate-shimmer">
          Sounduoex pass
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
        Your <span className="text-cyan-300 font-semibold animate-text-glow">SOUNDUOEX</span> access to the concert of a lifetime and premium benefits
      </p>
    </div>
  );
};
