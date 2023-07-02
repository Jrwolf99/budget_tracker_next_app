import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue = null) => {
  const readValue = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValueState] = useState(readValue);

  const setStoredValue = (newValue) => {
    // Save state
    setStoredValueState(newValue);
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValueState(readValue());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
