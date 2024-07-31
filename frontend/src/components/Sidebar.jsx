import React, { useState } from 'react';
import { BiSolidDashboard, BiHome } from "react-icons/bi";
import { AiTwotoneSchedule } from "react-icons/ai";
import { GrResources } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdSupportAgent } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import LogoutDashboardButton from './LogoutDashboardButton';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-500 text-white rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <AiOutlineClose /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-green-100 w-64 h-screen p-4 flex flex-col fixed top-0 left-0 transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-1/5`}
      >
        <div className="text-2xl font-bold mb-8 flex items-center">
          <span>WasteWise</span>
        </div>
        <ul>
          <li className="mb-4">
            <Link to="/" className="p-2 bg-purple-200 rounded flex items-center gap-5">
              <BiHome /> Home
            </Link>
          </li>
          <li className="mb-4">
            <a href="#" className="p-2 bg-purple-500 text-white rounded flex items-center gap-5">
              <BiSolidDashboard /> Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="p-2 bg-purple-200 rounded flex items-center gap-5">
              <AiTwotoneSchedule /> Scheduling
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="p-2 bg-purple-200 rounded flex items-center gap-5">
              <GrResources /> Education Resources
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="p-2 bg-purple-200 rounded flex items-center gap-5">
              <CgProfile /> Profile
            </a>
          </li>
        </ul>
        <div className="mt-auto">
          <button className="w-full p-2 bg-gray-200 rounded flex items-center gap-5">
            <MdSupportAgent /> Support
          </button>
         <LogoutDashboardButton/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
