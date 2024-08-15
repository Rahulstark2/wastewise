import React, { useState, useEffect } from 'react';
import { BiSolidDashboard, BiHome } from "react-icons/bi";
import { AiTwotoneSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import LogoutDashboardButton from './LogoutDashboardButton';
import logo from '../assets/image.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar')) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    // Close sidebar when route changes (on mobile)
    closeSidebar();
  }, [location]);

  return (
    <>
    {/* Sidebar Toggle Button */}
    <button
      className="lg:hidden fixed top-2 left-4 z-50 p-2 bg-custom-deep-purple text-white rounded"
      onClick={toggleSidebar}
    >
      {isSidebarOpen ? <AiOutlineClose /> : <HiMenu />}
    </button>

    {/* Sidebar */}
    <div
      className={`sidebar bg-[#DFEDCC] w-64 h-screen p-4 flex flex-col fixed top-0 left-0 transition-transform duration-300 ease-in-out z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
        <div className="flex items-center space-x-2 mt-10">
          <img src={logo} alt="Logo" className="h-10" />
          <div className="text-black text-2xl">
            <span className="font-bold">Waste</span>
            <span className="font-normal">Wise</span>
          </div>
        </div>
        <ul className='mt-8'>
          <li className="mb-4">
            <Link to="/" className="p-2 bg-custom-purple text-white rounded flex items-center gap-5">
              <BiHome /> Home
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className={`p-2 text-white rounded flex items-center gap-5 ${
                location.pathname === '/dashboard' ? 'bg-green-500' : 'bg-custom-purple'
              }`}
            >
              <BiSolidDashboard /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/scheduling"
              className={`p-2 text-white rounded flex items-center gap-5 ${
                location.pathname === '/scheduling' ? 'bg-green-500' : 'bg-custom-purple'
              }`}
            >
              <AiTwotoneSchedule /> Scheduling
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <LogoutDashboardButton/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
