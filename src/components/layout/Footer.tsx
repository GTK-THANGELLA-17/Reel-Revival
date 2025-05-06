
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { DeveloperModal } from '@/components/DeveloperModal';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <footer className="bg-cinema-navy dark:bg-black text-white py-12 px-4 mt-12">
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4 text-cinema-gold">Reel Revival</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">
                Experience the magic of cinema with your exclusive theater booking.
                Bring back the classics or catch up on films you missed on the big screen.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-300 hover:text-cinema-gold transition-colors">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-300 hover:text-cinema-gold transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-300 hover:text-cinema-gold transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4 text-cinema-gold">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/movies', label: 'Movies' },
                  { path: '/about', label: 'About Us' },
                  { path: '/how-it-works', label: 'How It Works' },
                  { path: '#terms', label: 'Terms & Conditions' },
                  { path: '#privacy', label: 'Privacy Policy' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="hover:text-cinema-gold transition-colors flex items-center"
                    >
                      <span className="mr-2">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4 text-cinema-gold">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-cinema-gold mt-0.5" />
                  <span>contact@reelrevival.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-cinema-gold mt-0.5" />
                  <span>+91 11111 77777</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-cinema-gold mt-0.5 flex-shrink-0" />
                  <span>Cinema Street, Hyderabad, Telangana, India</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants} 
            className="border-t border-gray-700 mt-10 pt-8 text-center text-sm"
          >
            <p>&copy; {currentYear} Reel Revival Booking. All rights reserved.</p>
            <p className="mt-2 text-xs text-gray-400">
              Developed by{" "}
              <Button
                onClick={() => setDeveloperModalOpen(true)}
                variant="ghost"
                className={`px-2 py-1 text-cinema-gold hover:text-cinema-gold/90 font-medium transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                G.Thangella
              </Button>
              Developer
            </p>
          </motion.div>
        </motion.div>
      </footer>
      
      <DeveloperModal 
        open={developerModalOpen}
        onOpenChange={setDeveloperModalOpen}
      />
    </>
  );
};

export default Footer;
