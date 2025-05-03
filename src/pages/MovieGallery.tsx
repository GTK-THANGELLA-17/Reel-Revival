
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Film, Search, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { movieData, Movie } from '@/services/movieService';
import SectionLoader from '@/components/SectionLoader';
import { useLoading } from '@/contexts/LoadingContext';

const MovieGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { setContentLoading, isContentLoading } = useLoading();
  
  // Setup section loading - we'll still use this for state management
  // but skip the animation
  useEffect(() => {
    // Simulate movies loading
    setContentLoading('movies', true);
    const timer = setTimeout(() => {
      setContentLoading('movies', false);
    }, 300); // Reduced time since we're not showing the animation
    
    return () => clearTimeout(timer);
  }, [activeTab, setContentLoading]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Function to filter movies based on search query
  const filterMovies = (): Movie[] => {
    let filteredMovies: Movie[] = [];
    
    if (activeTab === 'all') {
      filteredMovies = [
        ...movieData.hollywood,
        ...movieData.bollywood,
        ...movieData.tollywood
      ];
    } else if (activeTab === 'hollywood' || activeTab === 'bollywood' || activeTab === 'tollywood') {
      filteredMovies = movieData[activeTab];
    }

    if (searchQuery) {
      return filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filteredMovies;
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-2 text-cinema-navy dark:text-cinema-gold glow-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Movie Gallery
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Browse our collection of classic movies available for booking
            </motion.span>
          </p>
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <motion.div 
              className="relative w-full md:w-1/3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="Search movies by title or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-auto"
            >
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full dark:bg-gray-800">
                  <TabsTrigger value="all" className="dark:data-[state=active]:bg-cinema-accent dark:data-[state=active]:text-white">All</TabsTrigger>
                  <TabsTrigger value="hollywood" className="dark:data-[state=active]:bg-cinema-accent dark:data-[state=active]:text-white">Hollywood</TabsTrigger>
                  <TabsTrigger value="bollywood" className="dark:data-[state=active]:bg-cinema-accent dark:data-[state=active]:text-white">Bollywood</TabsTrigger>
                  <TabsTrigger value="tollywood" className="dark:data-[state=active]:bg-cinema-accent dark:data-[state=active]:text-white">Tollywood</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>

        <SectionLoader isLoading={isContentLoading('movies')} skipAnimation={true}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filterMovies().map((movie) => (
                <motion.div
                  key={movie.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="cursor-pointer"
                  layout
                >
                  <Card className="overflow-hidden h-full border-2 hover:border-cinema-accent transition-colors dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative h-60 w-full overflow-hidden">
                      <motion.div
                        className="absolute top-2 right-2 z-10 flex gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center bg-black/70 text-cinema-gold px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 mr-1 fill-cinema-gold text-cinema-gold" />
                          <span className="text-xs font-bold">{(Math.random() * 2 + 3).toFixed(1)}</span>
                        </div>
                      </motion.div>
                      <motion.img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                        <p className="text-xs">{movie.year} • {movie.genre}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold truncate dark:text-white">{movie.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{movie.year}</p>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Film className="h-5 w-5 text-cinema-navy dark:text-cinema-gold" />
                        </motion.div>
                      </div>
                      {/* Book Now button removed as requested */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </SectionLoader>
        
        {filterMovies().length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No movies found matching your search criteria</h3>
            <Button 
              variant="link" 
              onClick={() => {setSearchQuery(''); setActiveTab('all');}}
              className="mt-2 text-cinema-navy dark:text-cinema-gold"
            >
              Clear search
            </Button>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 neo-blur p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-cinema-navy dark:text-cinema-gold">Why Book with Reel Revival?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-cinema-navy dark:bg-black rounded-full w-16 h-16 flex items-center justify-center mb-4 ripple-effect">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Film className="text-cinema-gold h-8 w-8" />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Classic Movie Experience</h3>
              <p className="dark:text-gray-300">Experience your favorite classic movies on the big screen with premium sound and visuals.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-cinema-navy dark:bg-black rounded-full w-16 h-16 flex items-center justify-center mb-4 pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cinema-gold h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Private Screenings</h3>
              <p className="dark:text-gray-300">Enjoy movies with just your friends and family in a private theater setting.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-cinema-navy dark:bg-black rounded-full w-16 h-16 flex items-center justify-center mb-4 float-animation">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cinema-gold h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Flexible Scheduling</h3>
              <p className="dark:text-gray-300">Choose from multiple available time slots to fit your schedule.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Acernity UI-inspired floating glassmorphism elements */}
        <motion.div 
          className="fixed bottom-10 right-10 glass-effect p-4 rounded-xl z-10 hidden lg:flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-white text-sm font-medium">Quick booking</span>
          <Button 
            onClick={() => navigate('/booking/1')} 
            className="bg-cinema-accent hover:bg-cinema-accent/80 text-white glow"
          >
            <Star className="mr-2 h-4 w-4" /> Browse Theaters
          </Button>
        </motion.div>
        
        {/* Background decorative elements - Acernity style */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cinema-accent/20 blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cinema-gold/10 blur-3xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              delay: 1 
            }}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default MovieGallery;
