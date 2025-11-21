import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  const selectSection = (section) => {
    setSelectedSection(section);
    openDrawer();
  };

  const closeDrawerAndReset = () => {
    setIsDrawerOpen(false);
    setSelectedSection(null);
  };

  const value = {
    isDrawerOpen,
    selectedSection,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    selectSection,
    closeDrawerAndReset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

