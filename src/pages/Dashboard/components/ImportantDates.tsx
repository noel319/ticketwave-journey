
import React from 'react';
import { Separator } from "@/components/ui/separator";

const ImportantDates: React.FC = () => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Important Dates</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center text-gray-900 font-bold mr-4">
            6
          </div>
          <div>
            <p className="font-medium text-white">July 6, 2026</p>
            <p className="text-gray-400 text-sm">Concert Day</p>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-4">
            15
          </div>
          <div>
            <p className="font-medium text-white">June 15, 2026</p>
            <p className="text-gray-400 text-sm">Merchandise Ships</p>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-4">
            1
          </div>
          <div>
            <p className="font-medium text-white">July 1, 2026</p>
            <p className="text-gray-400 text-sm">Meet & Greet Selection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
