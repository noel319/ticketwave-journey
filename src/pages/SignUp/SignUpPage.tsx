
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { Step1TicketOptions } from './components/Step1TicketOptions';
import { Step2PassDetails } from './components/Step2PassDetails';
import { Step3UserInfo } from './components/Step3UserInfo';
import { Step4Payment } from './components/Step4Payment';
import { Step5Success } from './components/Step5Success';

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

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

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
