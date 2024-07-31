import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ScheduleContext } from '../context/ScheduleContext'; // Import the context

const CalendarComponent = () => {
  const { selectedDate, setSelectedDate } = useContext(ScheduleContext); // Use context

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="font-bold mb-4 text-lg sm:text-xl">Available Slots</h2>
      <Calendar
        onChange={(date) => setSelectedDate(date)} // Update context on change
        value={selectedDate} // Use selectedDate from context
        minDate={today} // Set the minimum selectable date to today
        className="react-calendar" // Custom class if needed for specific styles
      />
      <div className="mt-4 text-sm sm:text-base">
        Selected Date: {selectedDate.toDateString()} {/* Display the selected date */}
      </div>
    </div>
  );
};

export default CalendarComponent;
