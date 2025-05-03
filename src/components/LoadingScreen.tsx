
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Loader } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  useEffect(() => {
    const loadingTexts = [
      'Initializing...',
      'Curating classic movies...',
      'Preparing theater experience...',
      'Setting up the stage...',
      'Almost ready...'
    ];
    
    let currentTextIndex = 0;
    
    // Update loading text
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[currentTextIndex]);
    }, 1500);
    
    // Update progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 8 + 2; // Random increment between 2-10
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100 && onComplete) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onComplete, 600);
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cinema-cream dark:bg-cinema-charcoal"
    >
      <div className="w-full max-w-md flex flex-col items-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gradient glow-text mb-2">Reel Revival</h1>
          <p className="text-muted-foreground dark:text-gray-300 mt-2">Classic Cinema Experience</p>
        </motion.div>
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-2 w-full bg-gray-200 dark:bg-gray-800" />
          <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        
        <div className="relative">
          <motion.div
            className="pulse-ring"
            animate={{ 
              rotate: 360
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear" 
            }}
          >
            <Loader size={36} className="text-cinema-accent" />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 text-center glass-effect px-6 py-3 rounded-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/90">{loadingText}</p>
      </motion.div>
      
      {/* Acernity-style decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cinema-accent/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-cinema-gold/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
