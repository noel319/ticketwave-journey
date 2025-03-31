
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { Step1TicketOptions } from './components/Step1TicketOptions';
import { Step2PassDetails } from './components/Step2PassDetails';
import { Step3UserInfo } from './components/Step3UserInfo';
import { Step4Payment } from './components/Step4Payment';
import { Step5Success } from './components/Step5Success';
import { saveSignupProgress, getSavedProgress, clearSavedProgress } from '@/utils/signupProgress';
import { toast } from 'sonner';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    paymentOption: 'oneTime', // oneTime or installment
    merchandise: [], // array of selected merchandise
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardDetails: {
      number: '',
      expiry: '',
      cvc: ''
    },
    termsAccepted: false
  });

  // Check for saved progress on component mount
  useEffect(() => {
    const savedProgress = getSavedProgress();
    if (savedProgress) {
      // Ask user if they want to continue from where they left off
      const continueProgress = window.confirm(
        `You have an unfinished signup from ${new Date(savedProgress.lastUpdated).toLocaleString()}. Do you want to continue from where you left off?`
      );
      
      if (continueProgress) {
        setCurrentStep(savedProgress.currentStep);
        setFormData(prev => ({ ...prev, ...savedProgress.formData }));
        toast.info(`Welcome back! You're now on step ${savedProgress.currentStep} of 5`);
      } else {
        // If user declines, clear saved progress
        clearSavedProgress();
      }
    }
  }, []);

  // Save progress whenever form data or current step changes
  useEffect(() => {
    if (formData.email && currentStep > 1 && currentStep < 5) {
      saveSignupProgress(formData.email, currentStep, formData);
    }
  }, [currentStep, formData]);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
    
    // If we've reached the final step, clear saved progress
    if (currentStep === 4) {
      clearSavedProgress();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // If user is navigating away, we should save their progress
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 1 && currentStep < 5 && formData.email) {
        saveSignupProgress(formData.email, currentStep, formData);
        
        // Modern browsers ignore this message, but we need to set returnValue for the confirmation dialog to show
        const message = "You have unfinished signup progress. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep, formData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              FANS ONLY Pass
            </h1>
            <p className="text-gray-300 mt-2">Join us for an unforgettable concert experience</p>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={5} />
          
          <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-blue-500/20 shadow-xl">
            {currentStep === 1 && (
              <Step1TicketOptions 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
              />
            )}
            
            {currentStep === 2 && (
              <Step2PassDetails 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
              />
            )}
            
            {currentStep === 3 && (
              <Step3UserInfo 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
              />
            )}
            
            {currentStep === 4 && (
              <Step4Payment 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
              />
            )}
            
            {currentStep === 5 && (
              <Step5Success 
                formData={formData} 
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
