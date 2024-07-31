import React, { useContext, useState } from 'react';
import { AiFillEnvironment } from "react-icons/ai";
import ChangeAddress from './ChangeAddress';
import { AddressContext } from '../context/AddressContext';

const Header = () => {
  const { address, updateAddress } = useContext(AddressContext);
  const [showChangeAddress, setShowChangeAddress] = useState(false);

  return (
    <>
      <div className="bg-green-50 p-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Address Section */}
        <div className="text-lg font-bold flex items-center gap-4 sm:gap-8">
          <AiFillEnvironment className="text-2xl" />
          <div className='flex flex-col'>
            <span className="block truncate">{address}</span>
            <button
              onClick={() => setShowChangeAddress(true)}
              className="text-blue-500 underline text-left"
            >
              Change address
            </button>
          </div>
        </div>

     
      </div>

      {showChangeAddress && (
        <ChangeAddress
          onAddressChange={(newAddress) => {
            updateAddress(newAddress);
            setShowChangeAddress(false);
          }}
          onClose={() => setShowChangeAddress(false)}
        />
      )}
    </>
  );
};

export default Header;
