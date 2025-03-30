
import React from 'react';
import { Ticket, Calendar, MapPin, User } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { UserDetails } from '../DashboardPage';

interface PassCardProps {
  details: UserDetails;
}

const PassCard: React.FC<PassCardProps> = ({ details }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 border border-gray-700 shadow-xl">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">FANS ONLY Pass</h2>
          <span className="text-xs px-2 py-1 bg-green-500/30 text-green-300 rounded-full">
            ACTIVE
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">SOUNDUOEX WORLD TOUR</h3>
            <p className="text-gray-400">July 6, 2026 • MetLife Stadium</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-xs px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full">
              PREMIUM ACCESS
            </span>
          </div>
        </div>
        
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <div className="w-full h-48 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
            <AspectRatio ratio={16 / 9}>
              <div className="h-full flex items-center justify-center">
                <Ticket className="h-12 w-12 text-blue-400 mb-2" />
                <span className="text-lg font-bold ml-2">FANS ONLY PASS</span>
              </div>
            </AspectRatio>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-white">Event Date</p>
              <p className="text-gray-400 text-sm">July 6, 2026 • 7:00 PM EST</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-white">Venue</p>
              <p className="text-gray-400 text-sm">MetLife Stadium, New Jersey</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="mr-4">
              <User className="h-10 w-10 text-blue-400 bg-blue-500/10 p-2 rounded-full" />
            </div>
            <div>
              <p className="font-medium text-white">{details.name}</p>
              <p className="text-gray-400 text-sm">Ticket ID: #SOUNDUOEX-2026-{Math.floor(Math.random() * 100000)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassCard;
