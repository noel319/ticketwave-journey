
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import ResponsiveFeaturedArtists from '@/components/ResponsiveFeaturedArtists';
import TourDates from '@/components/TourDates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Function to animate elements when they enter the viewport
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.9) {
          element.classList.add('show');
        }
      });
    };

    // Initial check and scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Music Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        
        {/* Music note particles */}
        <div className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 animate-float"></div>
        <div className="absolute top-40 left-[20%] w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-60 left-[30%] w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-red-500 opacity-20 animate-float" style={{ animationDelay: '2.7s' }}></div>
        <div className="absolute top-80 left-[15%] w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 animate-float" style={{ animationDelay: '3.2s' }}></div>
        
        <div className="absolute top-20 right-[10%] w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-[20%] w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 animate-float" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-60 right-[30%] w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-red-500 opacity-20 animate-float" style={{ animationDelay: '2.3s' }}></div>
        <div className="absolute top-80 right-[15%] w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 animate-float" style={{ animationDelay: '3.7s' }}></div>
        
        {/* Sound wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-20 opacity-10">
          <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full">
            {Array.from({ length: 100 }).map((_, index) => (
              <div 
                key={index}
                className="w-[0.2%] bg-gradient-to-t from-purple-500 to-pink-500 opacity-70"
                style={{ 
                  height: `${Math.sin(index * 0.2) * 50 + 50}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ResponsiveFeaturedArtists />
          <TourDates />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
