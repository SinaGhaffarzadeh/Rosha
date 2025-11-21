import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useDrawer = () => {
  const { isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } = useApp();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDrawerOpen, closeDrawer]);

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};

