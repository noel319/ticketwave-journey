
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Verification' },
    { number: 3, title: 'Tickets' },
    { number: 4, title: 'Payment' },
    { number: 5, title: 'Success' }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          
          return (
            <React.Fragment key={step.number}>
              {/* Step circle with number or check */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold
                    ${isCompleted 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : isActive 
                        ? 'bg-purple-900 border-purple-400 text-purple-400'
                        : 'bg-purple-900 border-purple-700 text-gray-400'}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                
                {/* Step title */}
                <div className={`mt-2 text-xs md:text-sm font-medium 
                  ${isCompleted 
                    ? 'text-purple-400' 
                    : isActive 
                      ? 'text-white'
                      : 'text-gray-500'}`
                }>
                  {step.title}
                </div>
              </div>
              
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="w-full h-[2px] flex-grow mx-2 sm:mx-4">
                  <div
                    className={`h-full ${
                      currentStep > index + 1 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
                        : 'bg-purple-800'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
