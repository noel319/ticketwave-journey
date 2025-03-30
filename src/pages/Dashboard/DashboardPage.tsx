
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Check, Calendar, Ticket, MapPin, Loader, User, CreditCard, Mail, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getUserInfo } from '@/services/userService';

interface UserDetails {
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

export const DashboardPage: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!loading && isAuthenticated && user) {
        try {
          const data = await getUserInfo();
          setUserDetails(data);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        } finally {
          setIsLoading(false);
        }
      } else if (!loading && !isAuthenticated) {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [loading, isAuthenticated, user]);

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

  // Mock data for development
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

  // Use mock data for development if no user details are fetched
  const details = userDetails || mockUserDetails;

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
              <Button className="bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold hover:opacity-90">
                Download Ticket
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Pass Card */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 border border-gray-700 shadow-xl">
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">FANS ONLY Pass</h2>
                    <span className="text-xs px-2 py-1 bg-green-500/30 text-green-300 rounded-full">
                      ACTIVE
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">SOUNDUOEX WORLD TOUR</h3>
                      <p className="text-gray-400">July 6, 2026 • MetLife Stadium</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="text-xs px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full">
                        PREMIUM ACCESS
                      </span>
                    </div>
                  </div>
                  
                  <div className="aspect-w-16 aspect-h-9 mb-6">
                    <div className="w-full h-48 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                      <AspectRatio ratio={16 / 9}>
                        <div className="h-full flex items-center justify-center">
                          <Ticket className="h-12 w-12 text-blue-400 mb-2" />
                          <span className="text-lg font-bold ml-2">FANS ONLY PASS</span>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Event Date</p>
                        <p className="text-gray-400 text-sm">July 6, 2026 • 7:00 PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Venue</p>
                        <p className="text-gray-400 text-sm">MetLife Stadium, New Jersey</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <User className="h-10 w-10 text-blue-400 bg-blue-500/10 p-2 rounded-full" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{details.name}</p>
                        <p className="text-gray-400 text-sm">Ticket ID: #SOUNDUOEX-2026-{Math.floor(Math.random() * 100000)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Status */}
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
              
              {/* Merchandise */}
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
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Information */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Name</p>
                      <p className="text-gray-400 text-sm">{details.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-gray-400 text-sm">{details.email}</p>
                      {details.isEmailVerified ? (
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full">
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              {/* Important Dates */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Important Dates</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center text-gray-900 font-bold mr-4">
                      6
                    </div>
                    <div>
                      <p className="font-medium text-white">July 6, 2026</p>
                      <p className="text-gray-400 text-sm">Concert Day</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-4">
                      15
                    </div>
                    <div>
                      <p className="font-medium text-white">June 15, 2026</p>
                      <p className="text-gray-400 text-sm">Merchandise Ships</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-4">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-white">July 1, 2026</p>
                      <p className="text-gray-400 text-sm">Meet & Greet Selection</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
                
                <p className="text-gray-300 text-sm mb-4">
                  If you have any questions about your FANS ONLY Pass or need assistance, our support team is here to help.
                </p>
                
                <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 text-gray-900 font-semibold hover:opacity-90">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
