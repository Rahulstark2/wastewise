import React from 'react';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';

const TopHeader = () => {
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
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mr-16">
        <LoginButton/>
        <SignUpButton/>
      </div>
    </div>
  );
};

export default TopHeader;
