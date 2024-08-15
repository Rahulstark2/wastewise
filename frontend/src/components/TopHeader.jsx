import React, { useState, useEffect } from 'react';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import EmailButton from './EmailButton';
import PhoneButton from './PhoneButton';
import LocationButton from './LocationButton';
import LogoutButton from './LogoutButton';
// Import the Dashboard component
import Dashboard from './DashboardButton.jsx'; // Adjust the path according to your project structure

const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Instant initial check
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('userPhoneNumber') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            setIsLoggedIn(false);
            localStorage.removeItem('token'); // Clear token if it's invalid
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="bg-custom-light-green flex flex-col md:flex-row justify-between items-center p-2 shadow-md flex-wrap">
      <div className="flex space-x-4 mb-2 md:mb-0">
        {/* Social Media Icons */}
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <i className="fab fa-facebook-f text-white text-xl"></i>
        </a>
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <i className="fab fa-linkedin-in text-white text-xl"></i>
        </a>
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <img src="https://img.icons8.com/?size=100&id=98964&format=png&color=ffffff" className='w-7 h-7' alt="Description of the image" />
        </a>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mr-5">
        {isLoggedIn ? (
          <>
            <PhoneButton phoneNumber={phoneNumber} />
            <LocationButton address={address} />
            <EmailButton email={email} />
            <Dashboard />
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
            <SignUpButton />
          </>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
