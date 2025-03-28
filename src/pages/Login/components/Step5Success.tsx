
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Step5Success: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-sky-500/20 p-4 rounded-full">
          <CheckCircle className="h-16 w-16 text-sky-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Registration Complete!</h2>
      
      <p className="text-gray-300 mb-6">
        Your SOUNDUOEX Pass has been activated successfully. You're all set for the concert experience!
      </p>
      
      <div className="bg-gradient-to-r from-gray-900/50 to-black/30 rounded-lg p-6 border border-gray-700/20 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-5 h-5 text-sky-400 mr-2" />
          <span className="font-bold">July 6, 2026</span>
        </div>
        
        <div className="text-sm text-gray-300 mb-4">
          Your digital pass and tickets will be available in your account. You'll receive an email with all details.
        </div>
        
        <div className="flex justify-center">
          <QrCode className="w-24 h-24 text-sky-400/80" />
        </div>
      </div>
      
      <div className="space-y-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white font-semibold"
        >
          <Link to="/pass">
            View My SOUNDUOEX Pass
          </Link>
        </Button>
        
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 hover:bg-gray-800/30"
        >
          <Download className="w-4 h-4" />
          Download Ticket PDF
        </Button>
        
        <Button
          asChild
          variant="ghost"
          className="w-full text-gray-400 hover:bg-gray-800/30 hover:text-white"
        >
          <Link to="/">
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};
