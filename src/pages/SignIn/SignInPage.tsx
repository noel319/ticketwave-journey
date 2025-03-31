import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MerchandiseItem } from './types/merchandise';
import { PassBenefits } from './components/PassBenefits';
import { PaymentPlanSelector } from './components/PaymentPlanSelector';
import { MerchandiseSelector } from './components/MerchandiseSelector';
import { RegistrationForm } from './components/RegistrationForm';
import { PassHeader } from './components/PassHeader';

export const SignInPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'buyNow' | 'paymentPlan'>('buyNow');
  const [step, setStep] = useState(1);
  const [selectedMerchandise, setSelectedMerchandise] = useState<string[]>([]);
  const { toast } = useToast();

  const merchandise: MerchandiseItem[] = [
    { 
      id: 'tshirt', 
      name: 'Concert T-Shirt', 
      description: 'Limited edition concert t-shirt', 
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80' 
    },
    { 
      id: 'hoodie', 
      name: 'Premium Hoodie', 
      description: 'Cozy premium hoodie with tour dates', 
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' 
    },
    { 
      id: 'poster', 
      name: 'Autographed Poster', 
      description: 'SOUNDUOEX autographed poster', 
      image: 'https://images.unsplash.com/photo-1587142198902-878588a3a810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80' 
    },
    { 
      id: 'vinyl', 
      name: 'Vinyl Record', 
      description: 'Limited edition vinyl record', 
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80' 
    },
    { 
      id: 'hat', 
      name: 'Snapback Hat', 
      description: 'Tour logo snapback hat', 
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80' 
    },
    { 
      id: 'bracelet', 
      name: 'VIP Bracelet', 
      description: 'Special VIP access bracelet', 
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' 
    },
  ];

  const toggleMerchandiseSelection = (id: string) => {
    if (selectedMerchandise.includes(id)) {
      setSelectedMerchandise(selectedMerchandise.filter(item => item !== id));
    } else {
      if (selectedMerchandise.length >= 2) {
        setSelectedMerchandise([selectedMerchandise[1], id]);
      } else {
        setSelectedMerchandise([...selectedMerchandise, id]);
      }
    }
  };

  const goToNextStep = () => {
    if (step === 1) {
      if (selectedMerchandise.length !== 2) {
        toast({
          title: "Please select 2 merchandise items",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <PassHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PassBenefits />
            
            <div className="lg:col-span-2">
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 p-6 border border-gray-800">
                {step === 1 && (
                  <>
                    <PaymentPlanSelector 
                      selectedPlan={selectedPlan} 
                      setSelectedPlan={setSelectedPlan} 
                    />
                    
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                      Select Your Free SOUNDUOEX Merchandise (Choose 2)
                    </h2>
                    
                    <MerchandiseSelector 
                      merchandise={merchandise} 
                      selectedMerchandise={selectedMerchandise} 
                      toggleMerchandiseSelection={toggleMerchandiseSelection} 
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={goToNextStep}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300"
                      >
                        Continue to Registration
                      </Button>
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <RegistrationForm 
                    selectedPlan={selectedPlan} 
                    selectedMerchandise={selectedMerchandise} 
                    merchandise={merchandise}
                    goToPreviousStep={goToPreviousStep}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
