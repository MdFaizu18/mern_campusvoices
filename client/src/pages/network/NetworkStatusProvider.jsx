// NetworkStatusProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const NetworkStatusContext = createContext();

export const NetworkStatusProvider = ({ children }) => {
    const [isNetworkSlow, setIsNetworkSlow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleNetworkChange = () => {
            if (navigator.connection) {
                const { effectiveType, downlink } = navigator.connection;

                // Check if the connection is slow (adjust conditions as needed)
                if (effectiveType === '2g' || downlink < 0.5) {
                    setIsNetworkSlow(true);
                } else {
                    setIsNetworkSlow(false);
                }
            }
        };

        // Set loading to false after a delay (simulating initial load)
        setTimeout(() => setIsLoading(false), 3000);

        // Add event listener for network changes
        navigator.connection?.addEventListener('change', handleNetworkChange);

        // Initial network check
        handleNetworkChange();

        // Cleanup listener on component unmount
        return () => {
            navigator.connection?.removeEventListener('change', handleNetworkChange);
        };
    }, []);

    return (
        <NetworkStatusContext.Provider value={{ isNetworkSlow, isLoading }}>
            {children}
        </NetworkStatusContext.Provider>
    );
};

// Custom hook to use network status in any component
export const useNetworkStatus = () => useContext(NetworkStatusContext);
