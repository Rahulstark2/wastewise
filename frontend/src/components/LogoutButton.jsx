import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    // Perform logout actions here, such as clearing the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userPhoneNumber');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('userAddressFull')

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
    <button className="bg-custom-purple text-white py-3 px-4 rounded-lg flex items-center max-w-xs"
    onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
