
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { Step1SignupForm } from './components/Step1SignupForm';
import { Step2EmailVerification } from './components/Step2EmailVerification';
import { Step3TicketSelection } from './components/Step3TicketSelection';
import { Step4PaymentInfo } from './components/Step4PaymentInfo';
import { Step5Success } from './components/Step5Success';
import { toast } from 'sonner';

interface LoginPageProps {
  initialStep?: number;
  isSignUpFlow?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ 
  initialStep = 1,
  isSignUpFlow = false
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isEmailVerified: false,
    selectedTickets: [],
    paymentInfo: null
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  // Set the appropriate step based on user auth state
  useEffect(() => {
    if (user && isSignUpFlow) {
      if (!user.isEmailVerified) {
        setCurrentStep(2);
      } else if (!user.hasTicket) {
        setCurrentStep(3);
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, isSignUpFlow]);

  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
    // Show toast message for demo purposes
    if (currentStep < 5) {
      toast.success(`Step ${currentStep} completed successfully!`);
    }
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1SignupForm 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
          />
        );
      case 2:
        return (
          <Step2EmailVerification 
            email={formData.email} 
            nextStep={nextStep} 
            prevStep={prevStep}
            skipVerification={true} // For demo purposes
          />
        );
      case 3:
        return (
          <Step3TicketSelection 
            nextStep={nextStep} 
            prevStep={prevStep} 
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Step4PaymentInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep}
          />
        );
      case 5:
        return <Step5Success />;
      default:
        return <Step1SignupForm 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              {isSignUpFlow ? 'Join SOUNDUOEX Pass' : 'Welcome Back'}
            </h1>
            <p className="mt-3 text-gray-400">
              {isSignUpFlow 
                ? 'Complete the steps below to get your exclusive SOUNDUOEX Pass' 
                : 'Sign in to access your SOUNDUOEX Pass and exclusive content'}
            </p>
          </div>
          
          {isSignUpFlow && <StepIndicator currentStep={currentStep} />}
          
          <div className="mt-8 bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-800">
            {renderStep()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
