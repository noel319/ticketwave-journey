
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        
        return (
          <div key={stepNum} className="flex flex-col items-center relative w-1/5">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold z-10
                ${isCompleted 
                  ? 'bg-blue-500 text-white' 
                  : isActive 
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900' 
                    : 'bg-gray-700 text-gray-400'}`}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
            
            <div className="text-xs text-center mt-2 font-medium">
              {stepNum === 1 && 'Ticket Options'}
              {stepNum === 2 && 'Pass Details'}
              {stepNum === 3 && 'User Info'}
              {stepNum === 4 && 'Payment'}
              {stepNum === 5 && 'Success'}
            </div>
            
            {/* Lines connecting steps */}
            {stepNum < totalSteps && (
              <div 
                className={`absolute top-5 w-full h-0.5 
                  ${stepNum < currentStep ? 'bg-blue-500' : 'bg-gray-700'}`}
                style={{ left: '50%', zIndex: 0 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
