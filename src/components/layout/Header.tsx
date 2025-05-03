import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Film, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-cinema-primary dark:bg-cinema-navy text-white shadow-md relative z-50">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-7 w-7 text-cinema-gold" />
          <h1 className="text-xl font-bold">Reel Revival</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-cinema-gold ${isActive(item.path) ? 'font-bold' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-4 bg-white/10 px-2 py-1 rounded-full">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-cinema-navy data-[state=unchecked]:bg-cinema-primary"
            />
            <Moon className="h-4 w-4" />
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cinema-primary dark:bg-cinema-navy overflow-hidden z-40"
          >
            <div className="flex flex-col px-4 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 ${isActive(item.path) ? 'font-semibold text-cinema-gold' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-full mt-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
