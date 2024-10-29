import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;

// Custom hook to save and retrieve previous stats
export function usePreviousStats(initialStats) {
    const [prevStats, setPrevStats] = useLocalStorage('adminDashboardStats', initialStats);

    useEffect(() => {
        // Update local storage whenever the stats change
        setPrevStats(initialStats);
    }, [initialStats, setPrevStats]);

    return [prevStats, setPrevStats];
}
