
import React from 'react';
import { Check, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { UserDetails } from '../DashboardPage';

interface PaymentInfoProps {
  details: UserDetails;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ details }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Payment Information</h2>
      
      {details.paymentPlan === 'oneTime' ? (
        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-green-300">
              <span className="font-semibold">Fully Paid:</span> One-time payment of $5,300
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className={`bg-${details.paymentStatus === 'active' ? 'blue' : 'amber'}-900/20 border border-${details.paymentStatus === 'active' ? 'blue' : 'amber'}-700/30 rounded-lg p-4 mb-4`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {details.paymentStatus === 'active' ? (
                  <Check className="h-5 w-5 text-blue-400 mr-2" />
                ) : (
                  <div className="h-5 w-5 text-amber-400 mr-2">⚠️</div>
                )}
                <p className={`text-${details.paymentStatus === 'active' ? 'blue' : 'amber'}-300`}>
                  <span className="font-semibold">
                    {details.paymentStatus === 'active' ? 'Payment Plan Active' : 'Payment Overdue'}
                  </span>
                  : $900/month for 6 months
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {details.remainingPayments} payments remaining
              </span>
            </div>
          </div>
          
          <div className="flex items-start mb-6">
            <CreditCard className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-white">Next Payment</p>
              <p className="text-gray-400 text-sm">
                {details.nextPaymentDate} • $900.00
              </p>
              <Button className="mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 text-xs px-3 py-1 h-auto">
                Update Payment Method
              </Button>
            </div>
          </div>
        </>
      )}
      
      <div className="border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          Purchase date: {details.purchaseDate}
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;
