import React from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

const SignUpButton = ({className}) => {
  const navigate = useNavigate(); // Step 2: Use the navigate function

  const handleClick = () => {
    navigate('/signup'); // Navigate to /signup on click
  };

  return (
    <button 
      className={`bg-custom-purple text-white py-3 px-4 rounded-lg flex items-center max-w-xs justify-center ${className}`}
      onClick={handleClick} // Step 3: Attach the onClick event handler
    >
      Sign up
    </button>
  );
};

export default SignUpButton;
