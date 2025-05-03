
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Film, MapPin, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample theater data
const theaters = [
  {
    id: 1,
    name: "Shiva Ganga",
    location: "Asian Shiva Ganga, Kalyan Nagar Road, Survey No.102, Gaddiannaram Rd, near City Bus Stop, Sahithi Nagar, Dilsukhnagar, Hyderabad, Telangana 500060",
    capacity: 100,
    price: 20000,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Konark Asian-Mukta-A2",
    location: "Dilsukhnagar, Konark Theatre Ln, Dilsukhnagar, Hyderabad, Telangana 500060",
    capacity: 120,
    price: 25000,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Sudarshan",
    location: "RTC X Rd, Chikkadpally, Himayatnagar, Hyderabad, Telangana 500020",
    capacity: 220,
    price: 25000,
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "AAA Cinemas",
    location: "Asian Allu Arjun Cinemas, Satyam Theatre Rd, X RoadKumar Basti, Ameerpet, Hyderabad, Telangana 500082",
    capacity: 320,
    price: 45000,
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "IMax",
    location: "IMAX Road, NTR Marg, behind of, Khairtabad, Hyderabad, Telangana 500063",
    capacity: 300,
    price: 35000,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const HomePage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  const handleTheaterSelect = (theaterId: number) => {
    // In a real app, you might want to save the selected theater to state/context
    // For now, we'll just navigate to the booking page with the theater ID
    navigate(`/booking/${theaterId}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-cinema-navy text-white rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')" 
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cinema-gold">
              Revive The Magic <br />Of Cinema
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cinema-cream">
              Book an entire theater to watch your favorite classic movies on the big screen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => document.getElementById('theaters')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-cinema-burgundy hover:bg-opacity-90 text-white"
              >
                Book Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-cinema-cream bg-black text-cinema-cream hover:bg-cinema-cream hover:text-black"
                onClick={() => setShowAbout(true)}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About popup */}
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-cinema-navy">About Reel Revival</h3>
            <p className="mb-4">
              This website allows you to book an entire theater to watch your favorite movie on the available screens at your chosen location. 
              Once you book the theater, it's exclusively yours for that particular time slot.
            </p>
            <p className="mb-4">
              <strong>Important point to know:</strong> Only old movies that are not currently in theaters are to be entered to watch, not the current running movies in theaters.
            </p>
            <p className="mb-4">
              <strong>Main Moto of this website:</strong> The main moto is to make you watch your favorite movie or the movie which you missed in theaters to watch them again in the theaters. 
              You can watch it with your friends and the people you want with privacy and enjoy.
            </p>
            <p className="mb-4">
              <strong>About Booking Confirmations:</strong> After payment is done, the booking details can be downloaded and shared for your convenience.
            </p>
            <Button 
              onClick={() => setShowAbout(false)}
              className="bg-cinema-burgundy hover:bg-opacity-90 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* How it Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-cinema-burgundy">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="bg-cinema-burgundy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Select a Theater</h3>
            <p>Choose from our selection of premium theaters available for booking.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="bg-cinema-burgundy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Pick a Movie & Time</h3>
            <p>Enter the name of any classic film you'd like to watch and choose a convenient time.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="bg-cinema-burgundy rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Confirm & Enjoy</h3>
            <p>Complete your booking, make a payment, and enjoy your private screening experience.</p>
          </motion.div>
        </div>
      </section>

      {/* Theaters Section */}
      <section id="theaters" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-cinema-burgundy">Available Theaters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaters.map((theater) => (
            <motion.div
              key={theater.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleTheaterSelect(theater.id)}
            >
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${theater.image})` }}
              ></div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Film className="mr-2 h-5 w-5 text-cinema-burgundy" />
                  {theater.name}
                </h3>
                <p className="text-sm mb-3 flex items-start">
                  <MapPin className="mr-1 h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span className="line-clamp-2">{theater.location}</span>
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Capacity: {theater.capacity} seats</span>
                  <span className="font-bold text-cinema-burgundy">₹{theater.price.toLocaleString()}</span>
                </div>
                <Button 
                  className="w-full mt-4 bg-cinema-burgundy hover:bg-opacity-90"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-cinema-burgundy">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cinema-gold flex items-center justify-center text-cinema-navy font-bold mr-4">
                RS
              </div>
              <div>
                <h4 className="font-bold">Rahul Singh</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="italic">"Booking the entire theater for my wife's birthday was the best decision ever. We watched her favorite classic film and it was such a magical experience!"</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cinema-gold flex items-center justify-center text-cinema-navy font-bold mr-4">
                AP
              </div>
              <div>
                <h4 className="font-bold">Ananya Patel</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="italic">"Our friend group split the cost and had an amazing movie night. The booking process was super easy and the theater was all ours!"</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cinema-gold flex items-center justify-center text-cinema-navy font-bold mr-4">
                MR
              </div>
              <div>
                <h4 className="font-bold">Mohan Reddy</h4>
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="italic">"I organized a corporate event and screened an inspiring documentary. Everyone loved the private theater experience. Great customer service!"</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cinema-burgundy text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Cinema Like Never Before?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Book your private theater today and create unforgettable memories with friends and family.
        </p>
        <Button 
          onClick={() => document.getElementById('theaters')?.scrollIntoView({ behavior: 'smooth' })}
          size="lg" 
          className="bg-cinema-gold hover:bg-opacity-90 text-cinema-navy"
        >
          Book Now <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </Layout>
  );
};

export default HomePage;
