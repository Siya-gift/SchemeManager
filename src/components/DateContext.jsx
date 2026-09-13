import React, { createContext, useContext, useState } from 'react';

// Create the shared Date Context
const DateContext = createContext(undefined);

export const DateProvider = ({ children }) => {
  // Global date state initialized to today's date
  const [globalDate, setGlobalDate] = useState(new Date());

  // Dynamic helper to format the current date globally (e.g., "September 2026")
  const formattedDate = globalDate.toLocaleString('en-ZA', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <DateContext.Provider value={{ globalDate, setGlobalDate, formattedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// Custom hook for easy access in any panel component
export const useGlobalDate = () => {
  const context = useContext(DateContext);
  if (!context) throw new Error('useGlobalDate must be used within a DateProvider');
  return context;
};
