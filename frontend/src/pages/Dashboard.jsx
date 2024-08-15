import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/DashboardHeader';
import MainContent from '../components/MainContent';
import { AddressProvider } from '../context/AddressContext';
import { ScheduleProvider } from '../context/ScheduleContext';
import Scheduling from '../components/Scheduling';

function Dashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast({
        title: 'Authentication required',
        description: 'You need to login or sign up to access the dashboard',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      navigate('/');
    }
  }, [token, navigate, toast]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen w-full lg:ml-64 transition-all duration-300">
        <AddressProvider>
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="flex-grow p-4">
            <ScheduleProvider>
              {location.pathname === '/scheduling' ? <Scheduling /> : <MainContent />}
            </ScheduleProvider>
          </main>
        </AddressProvider>
      </div>
    </div>
  );
}

export default Dashboard;