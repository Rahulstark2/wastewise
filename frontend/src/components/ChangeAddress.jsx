import React, { useState } from 'react';
import { AiFillEnvironment } from 'react-icons/ai';

const ChangeAddress = ({ onAddressChange, onClose }) => {
  const [newAddress, setNewAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/user/changeaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          address: newAddress,
          email: localStorage.getItem('userEmail'),
        }),
      });
  
      if (response.ok) {
        // Address changed successfully
        onAddressChange(newAddress.split(' ').slice(0, 3).join(' '));
        onClose();
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setNewAddress(data.display_name);
          } catch (error) {
            console.error('Error fetching address:', error);
            // Handle error, e.g., show a message to the user
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Handle error, e.g., show a message to the user
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle unsupported browser, e.g., show a message to the user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#DFEDCC] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <AiFillEnvironment className="mr-2" />
          Change Address
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2 font-semibold">
              New Address
            </label>
            <input
              type="text"
              id="address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your new address"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleAutoDetect}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Auto Detect
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Save Address
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;
