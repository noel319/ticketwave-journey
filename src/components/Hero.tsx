
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById('about-concert');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/40 to-black"
          style={{ zIndex: 1 }}
        ></div>
        <img 
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Concert" 
          className="object-cover w-full h-full opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight relative">
            <span className="animate-float inline-block relative">
              {/* Animated Letters */}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-300 to-sky-500 bg-clip-text text-transparent animate-shimmer opacity-80">SOUNDUOEX</span>
                <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-300 to-sky-400 bg-clip-text text-transparent animate-shimmer opacity-80" style={{ animationDelay: '0.5s' }}>SOUNDUOEX</span>
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500 bg-clip-text text-transparent animate-shimmer opacity-80" style={{ animationDelay: '1s' }}>SOUNDUOEX</span>
              </span>
              {/* Main visible text */}
              <span className="relative bg-gradient-to-r from-sky-300 via-blue-200 to-sky-300 bg-clip-text text-transparent">SOUNDUOEX</span>
            </span>
            <span className="block text-3xl md:text-5xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-400 animate-pulse-slow">
              July 6, 2026
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Experience the ultimate fusion of music's biggest names in a once a year spectacle. Eight headlining artists.
            Four collaborative performances. One unforgettable night. Secure your exclusive Sounduoex pass — includes your ticket, limited-edition merchandise and more. 
            Don't just watch history, be part of it. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToAboutSection}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
            <Link 
              to="/signup"
              className="bg-transparent hover:bg-gray-600/10 text-white border border-gray-400 px-8 py-3 rounded-md font-medium transition-all duration-300"
            >
              Get Pass
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToAboutSection}
        >
          <ChevronDown className="h-8 w-8 text-sky-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
