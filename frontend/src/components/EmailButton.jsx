import React from 'react';

const EmailButton = () => {
  return (
    <button className="bg-custom-purple text-white py-3 px-4 rounded-lg flex items-center max-w-xs">
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      uxultimates@gmail.com
    </button>
  );
};

export default EmailButton;