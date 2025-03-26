
import React from 'react';
import { Check } from 'lucide-react';

interface PaymentPlanSelectorProps {
  selectedPlan: 'buyNow' | 'paymentPlan';
  setSelectedPlan: (plan: 'buyNow' | 'paymentPlan') => void;
}

export const PaymentPlanSelector: React.FC<PaymentPlanSelectorProps> = ({ 
  selectedPlan, 
  setSelectedPlan 
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        Choose Your Payment Plan
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
            selectedPlan === 'buyNow'
              ? 'border-purple-500 bg-purple-900/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => setSelectedPlan('buyNow')}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">Buy Now</h3>
            {selectedPlan === 'buyNow' && (
              <div className="bg-purple-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-white mb-2">$5,300</p>
          <p className="text-gray-300 text-sm mb-4">One-time payment</p>
          <ul className="space-y-2">                          
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-purple-400 mr-2" />
              <span>All benefits included</span>
            </li>                          
          </ul>
        </div>
        
        <div
          className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
            selectedPlan === 'paymentPlan'
              ? 'border-purple-500 bg-purple-900/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => setSelectedPlan('paymentPlan')}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">Payment Plan</h3>
            {selectedPlan === 'paymentPlan' && (
              <div className="bg-purple-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-white mb-2">$900<span className="text-xl">/month</span></p>
          <p className="text-gray-300 text-sm mb-4">For 6 months (First payment today)</p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-purple-400 mr-2" />
              <span>Same benefits as full payment</span>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-purple-400 mr-2" />
              <span>Spread cost over 6 months</span>
            </li>                          
          </ul>
        </div>
      </div>
      
      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-8">
        <p className="text-sm text-yellow-300">
          <strong>Important:</strong> If choosing the payment plan, three declined payments will result in pass revocation. 
          No additional payments will be taken after revocation, but previous payments are non-refundable.
        </p>
      </div>
    </>
  );
};
