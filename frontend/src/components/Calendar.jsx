import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ScheduleContext } from '../context/ScheduleContext';

const CalendarComponent = () => {
  const { selectedDate, setSelectedDate } = useContext(ScheduleContext);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="font-bold mb-4 text-lg sm:text-xl">Available Slots</h2>
      <Calendar
        onChange={(date) => {
          const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
          setSelectedDate(localDate);
        }}
        value={selectedDate}
        minDate={today}
        className="react-calendar"
      />
      <div className="mt-4 text-sm sm:text-base">
        Selected Date: {selectedDate.toDateString()}
      </div>
    </div>
  );
};

export default CalendarComponent;
