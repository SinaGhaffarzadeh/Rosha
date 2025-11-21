import { useRef, useEffect } from 'react';

const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
const SWIPE_THRESHOLD = 50;
const SWIPE_RANGE = isMobileSafari ? [35, 150] : [0, 150];

export const useSwipeGesture = (onSwipeLeft, onSwipeRight, enabled = true) => {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      isDragging.current = false;
    };

    const handleTouchMove = (e) => {
      if (touchStartX.current === null) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;

      // Check if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDragging.current = true;
      }
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null || !isDragging.current) {
        touchStartX.current = null;
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const startX = touchStartX.current;

      // Check if swipe started from left edge
      const [minRange, maxRange] = SWIPE_RANGE;
      if (startX >= minRange && startX <= maxRange) {
        if (deltaX > SWIPE_THRESHOLD && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < -SWIPE_THRESHOLD && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      touchStartX.current = null;
      isDragging.current = false;
    };

    // Mouse drag support for desktop
    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Only left mouse button
      touchStartX.current = e.clientX;
      touchStartY.current = e.clientY;
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (touchStartX.current === null) return;

      const deltaX = e.clientX - touchStartX.current;
      const deltaY = e.clientY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDragging.current = true;
      }
    };

    const handleMouseUp = (e) => {
      if (touchStartX.current === null || !isDragging.current) {
        touchStartX.current = null;
        return;
      }

      const deltaX = e.clientX - touchStartX.current;
      const startX = touchStartX.current;

      const [minRange, maxRange] = SWIPE_RANGE;
      if (startX >= minRange && startX <= maxRange) {
        if (deltaX > SWIPE_THRESHOLD && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < -SWIPE_THRESHOLD && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      touchStartX.current = null;
      isDragging.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, onSwipeLeft, onSwipeRight]);
};

