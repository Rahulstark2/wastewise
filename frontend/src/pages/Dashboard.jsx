import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/DashboardHeader';
import MainContent from '../components/MainContent';
import { AddressProvider } from '../context/AddressContext';
import { ScheduleProvider } from '../context/ScheduleContext';

function Dashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // get the token from local storage

  useEffect(() => {
    if (!token) {
      toast({
        title: 'Authentication required',
        description: 'You need to login or sign up to access the dashboard',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      navigate('/'); // redirect to the home page
    }
  }, [token, navigate, toast]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar className="lg:w-64 w-full lg:h-screen lg:fixed lg:top-0 lg:left-0 bg-gray-800 text-white" />

      <div className="flex-grow flex flex-col">
        <AddressProvider>
          {/* Header */}
          <Header className="lg:pl-64" />

          {/* Main Content */}
          <main className="flex-grow p-4">
            <ScheduleProvider>
            <MainContent />
            </ScheduleProvider>
          </main>
        </AddressProvider>
      </div>
    </div>
  );
}

export default Dashboard;
