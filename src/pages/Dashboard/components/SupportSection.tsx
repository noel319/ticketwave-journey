
import React from 'react';
import { Button } from "@/components/ui/button";

const SupportSection: React.FC = () => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
      
      <p className="text-gray-300 text-sm mb-4">
        If you have any questions about your FANS ONLY Pass or need assistance, our support team is here to help.
      </p>
      
      <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold hover:opacity-90">
        Contact Support
      </Button>
    </div>
  );
};

export default SupportSection;
