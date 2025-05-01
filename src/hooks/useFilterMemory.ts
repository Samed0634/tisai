import { useState, useEffect } from 'react';

type FilterData = any;

/**
 * A hook that persists filter state in localStorage
 * @param key The key to use for localStorage
 * @param initialValue The initial filter value
 * @returns [filterValue, setFilterValue]
 */
export const useFilterMemory = <T extends FilterData>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // Get from localStorage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep working for SSR
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    // Prevent build error "window is undefined" but keep working for SSR
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to state
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue];
};
