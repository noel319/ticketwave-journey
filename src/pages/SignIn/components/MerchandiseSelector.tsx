
import React from 'react';
import { Check } from 'lucide-react';

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
}

interface MerchandiseSelectorProps {
  merchandise: MerchandiseItem[];
  selectedMerchandise: string[];
  toggleMerchandiseSelection: (id: string) => void;
}

export const MerchandiseSelector: React.FC<MerchandiseSelectorProps> = ({ 
  merchandise, 
  selectedMerchandise, 
  toggleMerchandiseSelection 
}) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
      {merchandise.map((item) => (
        <div
          key={item.id}
          className={`cursor-pointer p-3 md:p-4 rounded-lg border transition-all ${
            selectedMerchandise.includes(item.id)
              ? 'border-purple-500 bg-purple-900/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => toggleMerchandiseSelection(item.id)}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm md:text-lg font-semibold text-white line-clamp-1">{item.name}</h3>
            {selectedMerchandise.includes(item.id) && (
              <div className="bg-purple-500 rounded-full p-0.5 md:p-1 ml-1 flex-shrink-0">
                <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-300 mt-1 line-clamp-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
