import React from 'react';

import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

const LoginButton = ({className}) => {
  const navigate = useNavigate(); // Step 2: Use the navigate function

  const handleClick = () => {
    navigate('/login'); // Navigate to /signup on click
  };

  return (
    <button
        className={`bg-custom-purple text-white py-3 px-4 rounded-lg flex items-center justify-center max-w-xs ${className}`}
        onClick={handleClick}
      >
        Login
    </button>
  );
};

export default LoginButton;