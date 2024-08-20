import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardButton = ({className}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <button className={`bg-custom-purple text-white py-3 px-4 rounded-lg flex items-center max-w-xs justify-center ${className}`}
    onClick={handleClick}>
      Dashboard
    </button>
  );
};

export default DashboardButton;
