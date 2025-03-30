
import React, { useEffect, useState } from 'react';
import { DashboardPage } from './DashboardPage';
import { getUserInfo } from '@/services/userService';
import { toast } from 'sonner';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserInfo();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return <DashboardPage userData={userData} isLoading={isLoading} />;
};

export default Dashboard;
