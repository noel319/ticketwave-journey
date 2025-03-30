import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step2Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const merchandiseOptions = [
  { id: 'tshirt', name: 'Concert T-Shirt', description: 'Limited edition SOUNDUOEX t-shirt' },
  { id: 'hoodie', name: 'Premium Hoodie', description: 'Cozy premium hoodie with tour dates' },
  { id: 'poster', name: 'Autographed Poster', description: 'Collectible concert poster' },
  { id: 'vinyl', name: 'Vinyl Record', description: 'Limited edition vinyl record' },
  { id: 'hat', name: 'Snapback Hat', description: 'Tour logo snapback hat' },
  { id: 'wristband', name: 'VIP Wristband', description: 'Exclusive VIP access wristband' },
];

export const Step2PassDetails: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}) => {
  const toggleMerchandise = (id: string) => {
    const currentSelections = [...formData.merchandise];
    
    if (currentSelections.includes(id)) {
      // Remove item if already selected
      updateFormData({ 
        merchandise: currentSelections.filter(item => item !== id) 
      });
    } else {
      // Add item, but keep maximum 2 selections
      if (currentSelections.length < 2) {
        updateFormData({ 
          merchandise: [...currentSelections, id] 
        });
      } else {
        // If already have 2 items, replace the first one
        updateFormData({ 
          merchandise: [currentSelections[1], id] 
        });
      }
    }
  };
  
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700/50 pb-4">
        What's Included in Your FANS ONLY Pass
      </h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Pass Benefits</h3>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Ticket to Concert</span>
                <p className="text-sm text-gray-300">First come, first served seating at MetLife Stadium on July 6, 2026</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Potential Meet & Greet</span>
                <p className="text-sm text-gray-300">Random selection for exclusive artist meet & greet opportunity</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Free Merchandise</span>
                <p className="text-sm text-gray-300">Select 2 free merchandise items (see below)</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Digital Concert Copy</span>
                <p className="text-sm text-gray-300">Sent to your email 2-3 weeks after the concert</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Select Your Free Merchandise (Choose 2)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {merchandiseOptions.map(item => (
            <div 
              key={item.id}
              onClick={() => toggleMerchandise(item.id)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                formData.merchandise.includes(item.id)
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{item.name}</h4>
                {formData.merchandise.includes(item.id) && (
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full p-1">
                    <Check className="h-3 w-3 text-gray-900" />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
        {formData.merchandise.length < 2 && (
          <p className="text-amber-300 text-sm mt-2">Please select {2 - formData.merchandise.length} more item{formData.merchandise.length === 1 ? '' : 's'}</p>
        )}
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Terms & Conditions</h3>
        <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto text-sm text-gray-300">
          <p className="mb-4">By purchasing a FANS ONLY Pass, you agree to the following terms:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Passes are non-refundable and non-transferable</li>
            <li>Date changes may occur due to unforeseen circumstances</li>
            <li>Meet & greet opportunities are randomly selected and not guaranteed</li>
            <li>Installment plan requires completion of all 6 payments</li>
            <li>Three declined payments will result in pass revocation</li>
            <li>Digital concert copy will be sent within 2-3 weeks after the event</li>
            <li>Concert seating is on a first-come, first-served basis</li>
            <li>SOUNDUOEX reserves the right to modify the event details if necessary</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          onClick={prevStep}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
        >
          Back
        </Button>
        
        <Button 
          onClick={nextStep}
          disabled={formData.merchandise.length < 2}
          className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Registration
        </Button>
      </div>
    </>
  );
};
