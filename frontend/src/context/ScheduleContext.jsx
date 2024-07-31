// src/context/ScheduleContext.js
import React, { createContext, useState } from 'react';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTruck, setSelectedTruck] = useState(null);
  console.log(selectedDate)
  console.log(selectedTruck)

  return (
    <ScheduleContext.Provider value={{ selectedDate, setSelectedDate, selectedTruck, setSelectedTruck }}>
      {children}
    </ScheduleContext.Provider>
  );
};
