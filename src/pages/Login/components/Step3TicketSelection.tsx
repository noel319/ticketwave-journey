
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Ticket, Check, Crown, Star, Users, Music, Calendar } from 'lucide-react';

interface Step3TicketSelectionProps {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: any) => void;
}

interface TicketOption {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const Step3TicketSelection: React.FC<Step3TicketSelectionProps> = ({
  nextStep,
  prevStep,
  updateFormData
}) => {
  const [selectedTicket, setSelectedTicket] = useState<string>('standard');

  const ticketOptions: TicketOption[] = [
    {
      id: 'standard',
      name: 'Standard Pass',
      price: '$499',
      description: 'Perfect for casual fans who want to experience the concert',
      features: [
        'General admission',
        'Digital concert program',
        'Official merchandise pack',
        'Digital photo album'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      price: '$899',
      description: 'Enhanced experience with better seats and exclusive content',
      features: [
        'Premium seating section',
        'Digital concert program',
        'Exclusive merchandise pack',
        'Digital photo album',
        'Early venue access',
        'Exclusive digital content'
      ],
      recommended: true
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: '$1,499',
      description: 'The ultimate fan experience with exclusive perks',
      features: [
        'VIP seating area',
        'Digital concert program',
        'Deluxe merchandise pack',
        'Digital photo album',
        'Priority venue access',
        'Exclusive digital content',
        'Post-show virtual meet & greet',
        'Backstage virtual tour'
      ]
    }
  ];

  const handleContinue = () => {
    const ticket = ticketOptions.find(ticket => ticket.id === selectedTicket);
    updateFormData({ 
      selectedTickets: [ticket],
      ticketType: selectedTicket
    });
    nextStep();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Select Your SOUNDUOEX Pass</h2>
      <p className="text-gray-400 mb-6 text-center">Choose the experience that's right for you</p>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <RadioGroup 
          defaultValue={selectedTicket} 
          onValueChange={setSelectedTicket}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {ticketOptions.map((ticket) => (
            <div key={ticket.id} className="relative">
              <RadioGroupItem
                value={ticket.id}
                id={ticket.id}
                className="sr-only"
              />
              <Label
                htmlFor={ticket.id}
                className={`
                  flex flex-col h-full p-4 rounded-lg border cursor-pointer transition-all
                  ${selectedTicket === ticket.id 
                    ? 'border-cyan-400 bg-gray-800/70' 
                    : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'}
                  ${ticket.recommended ? 'ring-2 ring-cyan-400 ring-opacity-50' : ''}
                `}
              >
                {ticket.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 text-cyan-400 mr-2" />
                    <span className="font-bold">{ticket.name}</span>
                  </div>
                  <div className="text-cyan-400 font-bold">{ticket.price}</div>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{ticket.description}</p>
                
                <div className="mt-auto space-y-2">
                  {ticket.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Concert Details */}
      <div className="bg-gray-800/30 rounded-lg p-4 mb-8 border border-gray-700">
        <h3 className="font-bold mb-3 text-cyan-400">SOUNDUOEX Concert Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <div className="text-white">July 6, 2026</div>
              <div className="text-xs text-gray-400">Gates open at 5:00 PM</div>
            </div>
          </div>
          <div className="flex items-center">
            <Music className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <div className="text-white">MetLife Stadium</div>
              <div className="text-xs text-gray-400">East Rutherford, NJ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="md:w-auto"
        >
          Back
        </Button>
        
        <Button
          onClick={handleContinue}
          className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:opacity-90 text-black font-semibold md:w-auto"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};
