
import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface SectionLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  skipAnimation?: boolean; // New prop to skip loading animation entirely
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ 
  isLoading, 
  children, 
  className = "",
  skipAnimation = false  // Default to false to maintain backward compatibility
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {isLoading && !skipAnimation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ 
                rotate: 360
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "linear" 
              }}
              className="text-cinema-accent mb-3"
            >
              <Loader size={36} className="glow" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-center text-muted-foreground"
            >
              <div className="bg-black/40 px-4 py-2 rounded-md neo-blur">
                <p className="text-white/90">Loading content...</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionLoader;
