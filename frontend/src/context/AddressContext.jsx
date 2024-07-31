// src/context/AddressContext.js
import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('userAddress', newAddress);
  };

  return (
    <AddressContext.Provider value={{ address, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
