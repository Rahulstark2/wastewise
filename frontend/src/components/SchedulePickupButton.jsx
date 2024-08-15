import React, { useContext, useEffect } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { ScheduleContext } from '../context/ScheduleContext';

const SchedulePickupButton = () => {
  const { selectedDate, selectedTruck } = useContext(ScheduleContext);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    const payload = {
      selectedDate,
      selectedTruck,
      email,
      token,
    };

    try {
      const response = await fetch('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/schedule/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        if (message === 'Selected date must be greater than all previous dates') {
          // Display a static message
          toast({
            title: "Next Pickup Available After",
            description: "Next pickup will be available 1 day after current pickup date.",
            status: "info",
            duration: 4000,
            isClosable: true,
          });
        } else {
          throw new Error(message);
        }
      } else {
        toast({
          title: "Success",
          description: "Successfully scheduled pickup.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error sending data:', error);
      toast({
        title: "Error",
        description: "An error occurred while scheduling the pickup.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-end mt-4">
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-custom-purple text-white px-4 py-2 rounded"
    >
      Schedule a Pickup
    </button>
  </div>
  );
};

export default SchedulePickupButton;
