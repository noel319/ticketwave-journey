
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step1Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
}

export const Step1TicketOptions: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  nextStep
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700/50 pb-4">
        Ticket & Payment Options
      </h2>
      
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
        <p className="text-blue-300">
          Choose your preferred payment option for the FANS ONLY Pass. Both options include the same benefits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
            formData.paymentOption === 'oneTime'
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => updateFormData({ paymentOption: 'oneTime' })}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">One-Time Payment</h3>
            {formData.paymentOption === 'oneTime' && (
              <div className="bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full p-1">
                <Check className="h-4 w-4 text-gray-900" />
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-white mb-2">$5,300</p>
          <p className="text-gray-300 text-sm mb-4">Full payment today</p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>All benefits included</span>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>Simple one-time charge</span>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>No future payments</span>
            </li>
          </ul>
        </div>
        
        <div
          className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
            formData.paymentOption === 'installment'
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
          }`}
          onClick={() => updateFormData({ paymentOption: 'installment' })}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">Installment Plan</h3>
            {formData.paymentOption === 'installment' && (
              <div className="bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full p-1">
                <Check className="h-4 w-4 text-gray-900" />
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-white mb-2">$900<span className="text-xl">/month</span></p>
          <p className="text-gray-300 text-sm mb-4">For 6 months (First payment today)</p>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>Same benefits as full payment</span>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>Spread cost over 6 months</span>
            </li>
            <li className="flex items-center text-sm text-gray-300">
              <Check className="h-4 w-4 text-blue-400 mr-2" />
              <span>Automated monthly billing</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-8">
        <p className="text-sm text-amber-300">
          <strong>Important:</strong> Installment plan requires 6 monthly payments. Three declined payments will result in pass revocation without refund of previous payments.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold px-8 py-6 rounded-md hover:opacity-90 transition-all duration-300"
        >
          Continue to Pass Details
        </Button>
      </div>
    </>
  );
};
