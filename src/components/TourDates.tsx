
import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VenueType {
  id: number;
  stadium: string;
  location: string;
  date: string;
  tickets: 'available' | 'limited' | 'sold out';
}

const venues: VenueType[] = [
  {
    id: 1,
    stadium: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    date: 'Mar 12, 2026',
    tickets: 'available'
  },
  {
    id: 2,
    stadium: 'MetLife Stadium',
    location: 'East Rutherford, NJ',
    date: 'Apr 2, 2026',
    tickets: 'limited'
  },
  {
    id: 3,
    stadium: 'AT&T Stadium',
    location: 'Arlington, TX',
    date: 'Apr 23, 2026',
    tickets: 'available'
  },
  {
    id: 4,
    stadium: 'Allegiant Stadium',
    location: 'Las Vegas, NV',
    date: 'May 8, 2026',
    tickets: 'available'
  },
  {
    id: 5,
    stadium: 'Mercedes-Benz Stadium',
    location: 'Atlanta, GA',
    date: 'May 29, 2026',
    tickets: 'limited'
  },
  {
    id: 6,
    stadium: 'Levi\'s Stadium',
    location: 'Santa Clara, CA',
    date: 'Jun 18, 2026',
    tickets: 'available'
  },
  {
    id: 7,
    stadium: 'Soldier Field',
    location: 'Chicago, IL',
    date: 'Jul 9, 2026',
    tickets: 'sold out'
  },
  {
    id: 8,
    stadium: 'Wembley Stadium',
    location: 'London, UK',
    date: 'Jul 30, 2026',
    tickets: 'available'
  }
];

const TourDates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);

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

  const handleVenueClick = (id: number) => {
    setSelectedVenueId(id === selectedVenueId ? null : id);
  };

  return (
    <section 
      id="tour-dates" 
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
          <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white mb-4">
            <span className="text-sm font-medium">World Tour 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Tour Dates</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Check out our tour schedule and secure your tickets for an unforgettable experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <div 
              key={venue.id}
              onClick={() => handleVenueClick(venue.id)}
              className={cn(
                "bg-gray-800/50 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group",
                "hover:bg-gray-800/80 hover:shadow-xl hover:shadow-purple-900/20",
                selectedVenueId === venue.id ? "ring-2 ring-white/50 scale-[1.02]" : "",
                "transform hover:scale-[1.02]"
              )}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {venue.stadium}
                    </h3>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{venue.location}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "text-xs font-medium px-2 py-1 rounded",
                    venue.tickets === 'available' ? "bg-green-500/20 text-green-400" :
                    venue.tickets === 'limited' ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                    {venue.tickets === 'available' ? 'Available' :
                     venue.tickets === 'limited' ? 'Limited' :
                     'Sold Out'}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-300 mb-4">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{venue.date}</span>
                </div>
                
                <a 
                  href="/tickets" 
                  className={cn(
                    "block text-center w-full py-2 rounded transition-all duration-300 text-sm font-medium",
                    venue.tickets !== 'sold out' 
                      ? "bg-white/10 text-white hover:bg-white hover:text-black" 
                      : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {venue.tickets !== 'sold out' ? 'Get Tickets' : 'Sold Out'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourDates;
