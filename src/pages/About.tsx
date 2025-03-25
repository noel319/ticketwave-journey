
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Concert crowd" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">About SOUNDUOEX</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experience live music in a whole new dimension.
            </p>
          </div>
        </section>
        
        {/* About Content */}
        <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div 
            className={cn(
              "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Bringing Music To 25 Cities</h2>
                <p className="text-gray-300 mb-6">
                SOUNDUOEX is revolutionizing the concert experience by bringing world-class performances to 25 major cities across the globe. Our mission is to create unforgettable moments through the power of live music.
                </p>
                <p className="text-gray-300 mb-6">
                  With state-of-the-art sound systems, spectacular light shows, and the most talented artists in the industry, we're setting a new standard for live entertainment. Each venue is carefully selected to provide the perfect atmosphere for both performers and fans.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-3xl font-bold text-white">25</div>
                    <div className="text-gray-400 text-sm">Cities</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-3xl font-bold text-white">30+</div>
                    <div className="text-gray-400 text-sm">Artists</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-3xl font-bold text-white">1M+</div>
                    <div className="text-gray-400 text-sm">Fans</div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Concert performance" 
                    className="rounded-lg shadow-2xl w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">Our Vision</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10">
                  <div className="w-12 h-12 bg-purple-700/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Unparalleled Sound</h3>
                  <p className="text-gray-400">
                    We invest in cutting-edge audio technology to ensure every note is heard with perfect clarity, regardless of where you're seated.
                  </p>
                </div>
                
                <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10">
                  <div className="w-12 h-12 bg-purple-700/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Visual Spectacle</h3>
                  <p className="text-gray-400">
                    Our light shows and visual effects create an immersive environment that enhances the emotional impact of the music.
                  </p>
                </div>
                
                <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10">
                  <div className="w-12 h-12 bg-purple-700/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Community</h3>
                  <p className="text-gray-400">
                    We bring together music lovers from all walks of life, creating a shared experience that transcends cultural boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
