
import React from 'react';

export const PassHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-block px-4 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 mb-4">
        <span className="text-sm font-medium">Limited Availability - Only 80,000 pass</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        FANS ONLY Pass Card
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Your SOUNDUOEX access to the concert of a lifetime and premium benefits
      </p>
    </div>
  );
};
