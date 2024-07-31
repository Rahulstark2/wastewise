// AvailableTrucks.jsx
import React, { useContext } from 'react';
import { FaTruck } from 'react-icons/fa';
import { ScheduleContext } from '../context/ScheduleContext';
import { AddressContext } from '../context/AddressContext';

const AvailableTrucks = () => {
  const { address } = useContext(AddressContext);
  const { selectedTruck, setSelectedTruck } = useContext(ScheduleContext);

  const trucks = [
    { id: 1, license: '0001 HG 1932', driver: 'Suraj Chaturvedi' },
    { id: 2, license: '0001 HG 1933', driver: 'Raj Thakur' },
    { id: 3, license: '0001 HG 1934', driver: 'Vinod Segal' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="font-bold mb-4 text-lg sm:text-xl">
        Following Trucks are available at <span>{address}</span> today
      </h2>
      <ul>
        {trucks.map((truck) => (
          <li key={truck.id} onClick={() => setSelectedTruck(truck)} style={{ cursor: 'pointer' }}>
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <div className="flex items-center gap-2">
                <FaTruck className="text-xl" />
                <div>
                  <p className="font-semibold">{truck.license}</p>
                  <p className="text-gray-600">{truck.driver}</p>
                </div>
              </div>
              <button
                className={`p-2 rounded mt-2 sm:mt-0 ${
                  selectedTruck && selectedTruck.id === truck.id ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                }`}
              >
                {selectedTruck && selectedTruck.id === truck.id ? 'Requested' : 'Request Pickup'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs sm:text-sm mt-4">
        Please note that, once requested, the next pick-up would be available only after a period of 24 hours.
      </p>
    </div>
  );
};

export default AvailableTrucks;
