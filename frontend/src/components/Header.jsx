import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TopHeader from './TopHeader';
import logo from '../assets/image.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

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
        <nav className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
          {/* Use buttons with onClick handlers instead of anchor tags */}
          <button onClick={() => navigate("/home")} className="text-custom-black">Home</button>
          <button onClick={() => navigate("/services")} className="text-custom-black">Our Services</button>
          <button onClick={() => navigate("/blog")} className="text-custom-black">Blog</button>
          <button className="text-custom-black">About Us</button>
          <button onClick={() => navigate("/contact")} className="text-custom-black">Contact Us</button>
          <button className="text-custom-black"><i className="fas fa-search"></i></button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
