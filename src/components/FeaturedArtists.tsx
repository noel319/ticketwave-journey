
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Music, Music2, Music4 } from 'lucide-react';

interface ArtistPair {
  id: number;
  artists: string[];
  image: string;
  description: string;
}

const artistPairs: ArtistPair[] = [
  {
    id: 1,
    artists: ['Post Malone', 'Morgan Wallen'],
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Two genre-bending superstars unite for an unforgettable performance.'
  },
  {
    id: 2,
    artists: ['Justin Bieber', 'Ariana Grande'],
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    description: 'Pop royalty joins forces to deliver chart-topping hits and stunning vocal performances.'
  },
  {
    id: 3,
    artists: ['Chris Brown', 'The Weeknd'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'R&B legends combine their talents for a soul-stirring, dynamic experience.'
  }
];

const FeaturedArtists = () => {
  const [currentPair, setCurrentPair] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentPair((prev) => (prev === 0 ? artistPairs.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentPair((prev) => (prev === artistPairs.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentPair, isAnimating]);

  return (
    <section 
      ref={sectionRef} 
      className={cn(
        "py-12 md:py-24 bg-gradient-to-b from-black/90 to-gray-900/90 relative transition-opacity duration-1000 overflow-hidden",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Music icon decorations */}
      <div className="absolute top-10 left-10 text-purple-400/20 hidden md:block animate-float">
        <Music className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute bottom-20 right-10 text-blue-400/20 hidden md:block animate-float" style={{ animationDelay: "1s" }}>
        <Music2 className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute top-1/2 left-1/4 text-pink-400/20 hidden md:block animate-float" style={{ animationDelay: "2s" }}>
        <Music4 className="w-14 h-14 md:w-20 md:h-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 text-gradient">Featured Artists</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">Experience incredible performances from the world's biggest music stars.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-xl shadow-2xl aspect-[16/9]"
            style={{ 
              minHeight: isMobile ? '220px' : '300px',
              backgroundImage: 'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              <img 
                src={artistPairs[currentPair].image} 
                alt={artistPairs[currentPair].artists.join(' & ')} 
                className={cn(
                  "w-full h-full object-cover transform scale-105 transition-all duration-700",
                  isAnimating ? "opacity-50" : "opacity-100"
                )}
              />
            </div>

            <div 
              className={cn(
                "absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-500",
                isAnimating ? 
                  (direction === 'right' ? "translate-x-full opacity-0" : "-translate-x-full opacity-0") : 
                  "translate-x-0 opacity-100"
              )}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-3">
                <span className="text-gradient-primary">{artistPairs[currentPair].artists[0]}</span> 
                <span className="text-yellow-400"> & </span> 
                <span className="text-gradient-primary">{artistPairs[currentPair].artists[1]}</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-3 md:mb-5">
                {artistPairs[currentPair].description}
              </p>              
            </div>
          </div>

          <div className="flex justify-center mt-4 md:mt-8 space-x-2 md:space-x-3">
            {artistPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index > currentPair) {
                    setDirection('right');
                  } else if (index < currentPair) {
                    setDirection('left');
                  }
                  setCurrentPair(index);
                }}
                className={cn(
                  "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300",
                  index === currentPair ? "bg-white scale-110" : "bg-gray-600 hover:bg-gray-400"
                )}
                aria-label={`View artist pair ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-1 sm:left-2 md:left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-0.5 sm:p-1 md:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous artist"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-1 sm:right-2 md:right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-0.5 sm:p-1 md:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next artist"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
