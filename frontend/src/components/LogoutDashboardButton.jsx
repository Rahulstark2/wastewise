import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";

const LogoutDashboardButton = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    // Perform logout actions here, such as clearing the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userPhoneNumber');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');

    // Display a toast message
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // Wait for 2 seconds before navigating to the login page
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  return (
    <button className="w-full p-2 bg-custom-purple text-white rounded mt-2 flex items-center gap-5" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
  );
};

export default LogoutDashboardButton;
