import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setContentLoading: (sectionId: string, loading: boolean) => void;
  isContentLoading: (sectionId: string) => boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionLoadingState, setSectionLoadingState] = useState<Record<string, boolean>>({});
  
  // Initial app loading simulation and reset localStorage
  useEffect(() => {
    // Clear localStorage on initial app load to keep the app fresh
    localStorage.removeItem('selectedMovie');
    localStorage.removeItem('selectedTheater');
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds of initial loading
    
    return () => clearTimeout(timer);
  }, []);
  
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  
  const setContentLoading = (sectionId: string, loading: boolean) => {
    setSectionLoadingState(prev => ({
      ...prev,
      [sectionId]: loading
    }));
  };
  
  const isContentLoading = (sectionId: string) => {
    return sectionLoadingState[sectionId] || false;
  };
  
  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      startLoading, 
      stopLoading,
      setContentLoading,
      isContentLoading
    }}>
      {isLoading && <LoadingScreen onComplete={stopLoading} />}
      {children}
    </LoadingContext.Provider>
  );
};
