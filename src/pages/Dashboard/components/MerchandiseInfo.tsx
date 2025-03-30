
import React from 'react';
import { Package } from 'lucide-react';
import type { UserDetails } from '../DashboardPage';

interface MerchandiseInfoProps {
  details: UserDetails;
}

const MerchandiseInfo: React.FC<MerchandiseInfoProps> = ({ details }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Your Merchandise</h2>
      
      <div className="space-y-4">
        {details.merchandise.map((item, index) => (
          <div key={index} className="flex items-start">
            <Package className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-white">{item}</p>
              <p className="text-gray-400 text-sm">
                Shipping to: {details.shippingAddress.address}, {details.shippingAddress.city}, {details.shippingAddress.state} {details.shippingAddress.zipCode}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                Estimated delivery: 2-3 weeks before concert
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchandiseInfo;
