// NavigationContext.js
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the navigation context
const NavigationContext = createContext(null);

// Custom hook to access navigation context
export const useNavigation = () => {
  return useContext(NavigationContext);
};

// Navigation provider to wrap the app and provide navigation context
export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  // You can add more navigation logic here if needed
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};
