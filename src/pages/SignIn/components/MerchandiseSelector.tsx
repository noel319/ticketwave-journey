
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  image: string;
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {merchandise.map((item) => (
          <div
            key={item.id}
            className={`cursor-pointer p-3 md:p-4 rounded-lg border transition-all ${
              selectedMerchandise.includes(item.id)
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm md:text-lg font-semibold text-white line-clamp-1">{item.name}</h3>
              {selectedMerchandise.includes(item.id) && (
                <div className="bg-purple-500 rounded-full p-0.5 md:p-1 ml-1 flex-shrink-0">
                  <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                </div>
              )}
            </div>
            
            <div 
              className="relative aspect-square mb-2 rounded-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            
            <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{item.description}</p>
            
            <button
              onClick={() => toggleMerchandiseSelection(item.id)}
              className="mt-2 w-full text-xs md:text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-1 rounded transition-colors"
            >
              {selectedMerchandise.includes(item.id) ? 'Selected' : 'Select Item'}
            </button>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <img 
              src={selectedImage} 
              alt="Merchandise preview" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
