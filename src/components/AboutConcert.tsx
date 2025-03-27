
import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from "react-router-dom";
const AboutConcert = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section 
      id="about-concert" 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-gray-900 to-black"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">SOUNDUOEX 2026</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the ultimate fusion of music’s biggest names in a once a year spectacle. Eight headlining artists. 
            Four collaborative performances. One unforgettable night. Secure your exclusive Sounduoex pass — includes your ticket, limited-edition merchandise and more. 
            Don’t just watch history, be part of it. 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Concert Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Date</h4>
                  <p className="text-gray-300">July 6, 2026</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Time</h4>
                  <p className="text-gray-300">Doors open at 5:00 PM | Show starts at 7:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Venue</h4>
                  <p className="text-gray-300">MetLife Stadium</p>
                  <p className="text-gray-400 text-sm">1 MetLife Stadium Dr, East Rutherford, NJ 07073</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-lg p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Sounduoex Pass</h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-300">
                Get SOUNDUOEX access to an unforgettable concert experience and incredible perks with the SOUNDUOEX Pass.
              </p>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 mr-2 mt-0.5">✓</span>
                  <span>Concert Ticket (First-come, first-served seating)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 mr-2 mt-0.5">✓</span>
                  <span>Free SOUNDUOEX Merchandise</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 mr-2 mt-0.5">✓</span>
                  <span>Digital Concert Experience with behind-the-scenes footage</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 mr-2 mt-0.5">✓</span>
                  <span>Opportunity for an SOUNDUOEX Meet & Greet</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-105"
              >
                Get Your Pass
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 text-center mt-4">
              Only 80,000 passes available. Don't miss out!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutConcert;
