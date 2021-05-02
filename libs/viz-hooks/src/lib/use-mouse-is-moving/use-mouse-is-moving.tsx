import React, { useEffect, useRef, useState } from 'react';

export function useMouseIsMoving() {
  const timer = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    const listener = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setIsMoving(false);
      }, 500);
      if (!isMoving) {
        setIsMoving(true);
      }
    };
    document.addEventListener('pointermove', listener);
    return () => document.removeEventListener('pointermove', listener);
  }, []);
  return isMoving;
}

export default useMouseIsMoving;
