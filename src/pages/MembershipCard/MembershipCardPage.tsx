
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

export const MembershipCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const membershipBenefits = [
    'Early access to ticket sales for all concerts',
    'Exclusive merchandise discounts (15% off)',
    'Access to VIP areas at concert venues',
    'Meet & greet opportunities with artists',
    'Priority customer support',
    'Free shipping on all merchandise orders',
    'Personalized membership card',
    'Birthday gifts and special offers'
  ];

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleJoinClick = () => {
    navigate('/tickets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Navbar />
      
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:bg-white/10" 
            onClick={handleCancelClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-500/20 shadow-xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient-primary mb-2">Premium Membership</h1>
            <p className="text-lg sm:text-xl mb-8 text-purple-200">Unlock exclusive benefits and elevate your concert experience</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Membership Benefits */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-pink-300">Membership Benefits</h2>
                <ul className="space-y-3">
                  {membershipBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-2 text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Membership Card Preview (Simplified) */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-pink-300">Exclusive Membership</h2>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 p-0.5">
                  <div className="bg-black/70 backdrop-blur-sm rounded-xl p-5 h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">PREMIUM MEMBER</h3>
                        <p className="text-sm text-purple-200 opacity-80">Unlock exclusive concert experiences</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 mb-1 text-center">
                      <p className="text-2xl font-bold text-white">Join Today!</p>
                      <p className="text-purple-200 mt-2">Limited memberships available</p>
                    </div>
                    
                    <div className="absolute bottom-5 right-5 opacity-30">
                      <div className="text-4xl font-bold tracking-tighter">TicketWave</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-purple-200 mb-4">
                    Join our premium membership program for just <span className="font-bold text-white">$9.99/month</span> and 
                    unlock all these exclusive benefits.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="border-pink-500/50 text-pink-300 hover:bg-pink-500/10"
                onClick={handleCancelClick}
              >
                <X className="mr-2 h-4 w-4" />
                No Thanks
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 shadow-lg shadow-purple-500/20"
                onClick={handleJoinClick}
              >
                <Check className="mr-2 h-4 w-4" />
                Join Premium Membership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
