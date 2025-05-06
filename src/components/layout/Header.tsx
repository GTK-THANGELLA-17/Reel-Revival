
import React, { useState, useEffect } from 'react';
import { Film, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' }
  ];
  
  return (
    <header className="bg-cinema-primary dark:bg-cinema-navy/30 text-cinema-navy dark:text-white py-4 px-4 relative overflow-visible shadow-md backdrop-blur-sm z-50 sticky top-0">
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center z-10">
          {navItems.map((item) => (
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
        <div className="md:hidden flex items-center space-x-4 z-50">
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
            className="text-cinema-navy dark:text-white p-1 rounded-md hover:bg-white/10 menu-button" 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed md:hidden top-[64px] left-0 right-0 bg-cinema-primary dark:bg-cinema-navy shadow-lg z-40"
            style={{ height: "auto", maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
          >
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`block py-3 px-6 hover:bg-white/10 transition-colors ${
                    isActive(item.path) ? 'font-semibold bg-white/5 border-l-4 border-cinema-gold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
