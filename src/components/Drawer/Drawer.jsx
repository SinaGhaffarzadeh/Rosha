import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './Drawer.module.css';

const Drawer = ({ children }) => {
  const { isDrawerOpen, closeDrawer } = useApp();
  const drawerRef = useRef(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (isDrawerOpen) {
      drawer.classList.add(styles.open);
      // Don't disable body scroll to allow MainContent scrolling
    } else {
      drawer.classList.remove(styles.open);
    }
  }, [isDrawerOpen]);


  return (
    <div
      ref={drawerRef}
      className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}
      role="complementary"
      aria-label="Content sidebar"
    >
      <div className={styles.drawerContent}>
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // در همه سکشن‌ها فقط drawer را ببندد و selectedSection حفظ شود
            closeDrawer();
          }}
          aria-label="Close sidebar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;

