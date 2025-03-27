
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
    <section className="relative h-screen overflow-hidden">
      {/* Video Background with Spotify-inspired overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/20 to-black"
          style={{ zIndex: 1 }}
        ></div>
        <video 
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-in-a-concert-1216-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Animated sound bars */}
        <div className="absolute inset-0 z-2 opacity-40">
          <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-36">
            {Array.from({ length: 80 }).map((_, index) => (
              <div 
                key={index}
                className="w-[0.5%] bg-gradient-to-t from-cyan-500 via-fuchsia-400 to-pink-300"
                style={{ 
                  height: `${Math.sin(index * 0.2) * 50 + Math.cos(index * 0.3) * 30 + 20}%`,
                  animationDuration: `${1.5 + Math.random()}s`,
                  animationDelay: `${index * 0.02}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight text-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-cyan-300 animate-pulse-slow">
              SOUNDUOEX
            </span>
            <span className="block text-3xl md:text-5xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 animate-shimmer">
              July 6, 2026
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 text-shadow-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Experience the ultimate fusion of music's biggest names in a once a year spectacle. Eight headlining artists.
            Four collaborative performances. <span className="text-cyan-300">One unforgettable night.</span> Secure your exclusive Sounduoex pass — includes your ticket, limited-edition merchandise and more. 
            <span className="font-bold block mt-3 text-white">Don't just watch history, be part of it.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
            <button
              onClick={scrollToAboutSection}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/30"
            >
              Learn More
            </button>
            <Link 
              to="/signup"
              className="bg-transparent hover:bg-white/10 text-white border border-cyan-400 hover:border-white px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              Get Pass
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20"
          onClick={scrollToAboutSection}
        >
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <ChevronDown className="h-6 w-6 text-cyan-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
