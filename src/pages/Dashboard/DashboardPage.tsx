import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import PassCard from './components/PassCard';
import PaymentInfo from './components/PaymentInfo';
import MerchandiseInfo from './components/MerchandiseInfo';
import ProfileSidebar from './components/ProfileSidebar';

export interface UserDetails {
  name: string;
  email: string;
  isEmailVerified: boolean;
  hasPass: boolean;
  purchaseDate: string;
  paymentPlan: 'oneTime' | 'installment';
  paymentStatus: 'paid' | 'active' | 'overdue';
  nextPaymentDate?: string;
  remainingPayments?: number;
  merchandise: string[];
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface DashboardPageProps {
  userData: any;
  isLoading: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ userData, isLoading }) => {
  const { loading, isAuthenticated } = useAuth();

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-white">Loading your dashboard...</span>
      </div>
    );
  }

  const mockUserDetails: UserDetails = {
    name: "John Doe",
    email: "john@example.com",
    isEmailVerified: true,
    hasPass: true,
    purchaseDate: "2023-05-15",
    paymentPlan: 'installment',
    paymentStatus: 'active',
    nextPaymentDate: '2023-06-15',
    remainingPayments: 4,
    merchandise: ['Concert T-Shirt', 'Premium Hoodie'],
    shippingAddress: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    }
  };

  const details = userData || mockUserDetails;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {details.name}
              </h1>
              <p className="text-gray-300 mt-1">
                Your FANS ONLY Pass and concert ticket
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <a href="#" download className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold hover:opacity-90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Download Ticket
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <PassCard details={details} />
              <PaymentInfo details={details} />
              <MerchandiseInfo details={details} />
            </div>
            
            <ProfileSidebar details={details} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
