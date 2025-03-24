
import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaymentPlanSelectorProps {
  selectedPlan: 'buyNow' | 'paymentPlan';
  setSelectedPlan: (plan: 'buyNow' | 'paymentPlan') => void;
}

export const PaymentPlanSelector: React.FC<PaymentPlanSelectorProps> = ({ 
  selectedPlan, 
  setSelectedPlan 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
      <div
        className={`cursor-pointer p-4 md:p-6 rounded-lg border-2 transition-all ${
          selectedPlan === 'buyNow'
            ? 'border-purple-500 bg-purple-900/20'
            : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
        }`}
        onClick={() => setSelectedPlan('buyNow')}
      >
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-bold text-white">Buy Now</h3>
          {selectedPlan === 'buyNow' && (
            <div className="bg-purple-500 rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          )}
        </div>
        <p className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">$5,300</p>
        <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">One-time payment</p>
        <ul className="space-y-1 md:space-y-2">
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span>Immediate membership activation</span>
          </li>
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span>All benefits included</span>
          </li>
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span>No monthly payments to worry about</span>
          </li>
        </ul>
      </div>
      
      <div
        className={`cursor-pointer p-4 md:p-6 rounded-lg border-2 transition-all ${
          selectedPlan === 'paymentPlan'
            ? 'border-purple-500 bg-purple-900/20'
            : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
        }`}
        onClick={() => setSelectedPlan('paymentPlan')}
      >
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-bold text-white">Payment Plan</h3>
          {selectedPlan === 'paymentPlan' && (
            <div className="bg-purple-500 rounded-full p-1">
              <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </div>
          )}
        </div>
        <p className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
          $900<span className="text-lg md:text-xl">/month</span>
        </p>
        <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">
          For 6 months {isMobile ? '' : '(First payment today)'}
          {isMobile && <span className="block mt-1">(First payment today)</span>}
        </p>
        <ul className="space-y-1 md:space-y-2">
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span>Same benefits as full payment</span>
          </li>
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span>Spread cost over 6 months</span>
          </li>
          <li className="flex items-center text-xs md:text-sm text-gray-300">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-purple-400 mr-1 md:mr-2 flex-shrink-0" />
            <span className="line-clamp-2">Total cost: $5,400 ($100 service fee)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
