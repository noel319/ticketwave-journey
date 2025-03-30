
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Ticket, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step5Props {
  formData: any;
}

export const Step5Success: React.FC<Step5Props> = ({ formData }) => {
  const navigate = useNavigate();
  
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const merchandiseOptions = {
    tshirt: 'Concert T-Shirt',
    hoodie: 'Premium Hoodie',
    poster: 'Autographed Poster',
    vinyl: 'Vinyl Record',
    hat: 'Snapback Hat',
    wristband: 'VIP Wristband',
  };

  const selectedMerchandise = formData.merchandise.map((id: string) => {
    return merchandiseOptions[id as keyof typeof merchandiseOptions];
  });

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="mx-auto bg-gradient-to-r from-blue-400 to-cyan-300 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-gray-900" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Your FANS ONLY Pass is Confirmed!
        </h2>
        <p className="text-gray-300">
          A confirmation email has been sent to <span className="text-blue-400">{formData.email}</span>
        </p>
      </div>
      
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Purchase Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-left">
            <div className="flex items-start mb-4">
              <Ticket className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-white">FANS ONLY Pass</p>
                <p className="text-gray-400 text-sm">MetLife Stadium, July 6, 2026</p>
                <p className="text-sm text-blue-300 mt-1">
                  {formData.paymentOption === 'oneTime' 
                    ? 'One-time payment of $5,300' 
                    : 'Installment plan: $900/month for 6 months'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-white">Selected Merchandise</p>
                <ul className="text-gray-400 text-sm">
                  {selectedMerchandise.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <div className="flex items-start mb-4">
              <Mail className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-white">Digital Delivery</p>
                <p className="text-gray-400 text-sm">
                  Your ticket and concert recording will be sent to {formData.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-5 w-5 text-blue-400 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Shipping Address</p>
                <p className="text-gray-400 text-sm">
                  {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-300">
          You can access your pass details and order information anytime through your account dashboard
        </p>
        
        <Button 
          onClick={goToDashboard}
          className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-all"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
