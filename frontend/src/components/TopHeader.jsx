import React, { useState, useEffect } from 'react';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import EmailButton from './EmailButton';
import PhoneButton from './PhoneButton';
import LocationButton from './LocationButton';
import LogoutButton from './LogoutButton';
import Dashboard from './DashboardButton.jsx';

const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('userPhoneNumber') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
       
        if (token) {
          const response = await fetch('https://backend-zeta-ashen.vercel.app/api/v1/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            setIsLoggedIn(false);
            localStorage.removeItem('token');
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-custom-light-green flex justify-between items-center p-2 shadow-md flex-wrap relative">
      {/* Left section (social icons) */}
      <div className="flex space-x-4">
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <i className="fab fa-facebook-f text-white text-xl"></i>
        </a>
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <i className="fab fa-linkedin-in text-white text-xl"></i>
        </a>
        <a href="#" className="bg-custom-purple w-10 h-10 flex items-center justify-center rounded-lg">
          <img src="https://img.icons8.com/?size=100&id=98964&format=png&color=ffffff" className='w-7 h-7' alt="Icon" />
        </a>
      </div>

      {/* Right section (hamburger icon and menu items) */}
      <div className="flex items-center">
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-custom-purple focus:outline-none">
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu items for desktop */}
        <div className="hidden md:flex items-center space-x-4">
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

      {/* Dropdown menu for mobile with animation */}
      <div
        className={`absolute top-12 right-0 mt-2 w-full bg-custom-light-green rounded-md shadow-lg py-4 z-50 md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center p-2 space-y-2">
          {isLoggedIn ? (
            <>
              <PhoneButton phoneNumber={phoneNumber} className="w-full text-center text-xl" />
              <LocationButton address={address} className="w-full text-center mt-8 text-xl" />
              <EmailButton email={email} className="w-full text-center mt-8 text-xl" />
              <Dashboard className="w-full text-center mt-8 text-xl" />
              <LogoutButton className="w-full text-center mt-8 text-xl" />
            </>
          ) : (
            <>
              <LoginButton className="w-full text-center text-xl" />
              <SignUpButton className="w-full text-center mt-8 text-xl" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
