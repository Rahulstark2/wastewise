import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import TopHeader from './TopHeader';
import logo from '../assets/image.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // Function to check if the current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <TopHeader />
      <header className="bg-custom-white flex flex-col md:flex-row justify-between items-center p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10" />
          <div className="text-custom-olive-green text-2xl">
            <span className="font-bold">Waste</span>
            <span className="font-normal">Wise</span>
          </div>
        </div>
        <nav className="flex flex-row items-center space-x-4 mt-7 md:mt-0">
          <button
            onClick={() => navigate("/home")}
            className={`text-custom-black pb-1 border-b-4 ${
              isActive("/home") ? 'border-custom-olive-green' : 'border-transparent'
            } hover:border-custom-olive-green transition duration-300`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/services")}
            className={`text-custom-black pb-1 border-b-4 ${
              isActive("/services") ? 'border-custom-olive-green' : 'border-transparent'
            } hover:border-custom-olive-green transition duration-300`}
          >
            Our Services
          </button>
          <button
            onClick={() => navigate("/blog")}
            className={`text-custom-black pb-1 border-b-4 ${
              isActive("/blog") ? 'border-custom-olive-green' : 'border-transparent'
            } hover:border-custom-olive-green transition duration-300`}
          >
            Blog
          </button>
          <button
            onClick={() => navigate("/contact")}
            className={`text-custom-black pb-1 border-b-4 ${
              isActive("/contact") ? 'border-custom-olive-green' : 'border-transparent'
            } hover:border-custom-olive-green transition duration-300`}
          >
            Contact Us
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
