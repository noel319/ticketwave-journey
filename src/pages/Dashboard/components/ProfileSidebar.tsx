
import React from 'react';
import { User, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { UserDetails } from '../DashboardPage';
import ImportantDates from './ImportantDates';
import SupportSection from './SupportSection';

interface ProfileSidebarProps {
  details: UserDetails;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ details }) => {
  return (
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
      
      <ImportantDates />
      <SupportSection />
    </div>
  );
};

export default ProfileSidebar;
