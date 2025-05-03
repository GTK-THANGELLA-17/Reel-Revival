
import React, { useState } from 'react';
import { Film, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-cinema-primary dark:bg-cinema-navy/30 text-cinema-navy dark:text-white py-6 px-4 relative overflow-hidden shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Film className="h-8 w-8 text-cinema-gold" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold shining-text"
          >
            Reel Revival
          </motion.h1>
        </Link>
        
        <nav className="hidden md:flex space-x-6 items-center z-10">
          {[
            { path: '/', label: 'Home' },
            { path: '/movies', label: 'Movies' },
            { path: '/about', label: 'About' },
            { path: '/how-it-works', label: 'How It Works' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`hover:text-cinema-gold transition-colors relative ${isActive(item.path) ? 'font-semibold' : ''}`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-cinema-gold bottom-[-5px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-2 ml-4 bg-white/20 dark:bg-black/20 p-1.5 rounded-full">
            <Sun className="h-4 w-4 text-cinema-navy dark:text-white" />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-cinema-navy data-[state=unchecked]:bg-cinema-primary"
            />
            <Moon className="h-4 w-4 text-cinema-navy dark:text-white" />
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4 z-10">
          <div className="flex items-center space-x-1 bg-white/20 dark:bg-black/20 p-1.5 rounded-full">
            <Sun className="h-3 w-3 text-cinema-navy dark:text-white" />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-cinema-navy data-[state=unchecked]:bg-cinema-primary"
            />
            <Moon className="h-3 w-3 text-cinema-navy dark:text-white" />
          </div>
          <button 
            className="text-cinema-navy dark:text-white p-1 rounded-md hover:bg-white/10" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 right-0 bg-cinema-primary dark:bg-cinema-navy/90 backdrop-blur-md z-50 shadow-lg"
        >
          <div className="py-4 space-y-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/movies', label: 'Movies' },
              { path: '/about', label: 'About' },
              { path: '/how-it-works', label: 'How It Works' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`block py-2 px-4 hover:bg-white/10 transition-colors ${isActive(item.path) ? 'font-semibold border-l-4 border-cinema-gold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 opacity-5">
        <Film className="h-32 w-32 text-cinema-gold" />
      </div>
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-5">
        <Film className="h-32 w-32 text-cinema-gold" />
      </div>
    </header>
  );
};

export default Header;
