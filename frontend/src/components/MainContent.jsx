import React from 'react';
import CalendarComponent from './Calendar';
import AvailableTrucks from './AvailableTrucks';
import LiveTrackMap from './LiveTrackMap';
import SchedulePickupButton from './SchedulePickupButton';

const MainContent = () => {
  return (
    <div className="p-4 flex-grow">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CalendarComponent />

        
        <AvailableTrucks />
        <LiveTrackMap />
      </div>

      {/* Schedule a Pickup button */}
      <SchedulePickupButton />
    </div>
  );
};

export default MainContent;
