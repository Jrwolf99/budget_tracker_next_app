import React, { useEffect, useState } from 'react';

export default function useResize() {
  const [isSmallScreenAndUnder, setIsSmallScreenAndUnder] = useState(null);
  const [isExtraSmallScreenAndUnder, setIsExtraSmallScreenAndUnder] =
    useState(null);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreenAndUnder(window.innerWidth < 1200);
      setIsExtraSmallScreenAndUnder(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isSmallScreenAndUnder, isExtraSmallScreenAndUnder };
}
