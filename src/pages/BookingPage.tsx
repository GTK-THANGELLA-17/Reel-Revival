import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, Film, Calendar, Clock, MapPin, Users, ChevronsRight, UserPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Movie, getMovieById } from '@/services/movieService';

// Sample theater data
const theaters = [
  {
    id: 1,
    name: "Shiva Ganga",
    location: "Asian Shiva Ganga, Kalyan Nagar Road, Survey No.102, Gaddiannaram Rd, near City Bus Stop, Sahithi Nagar, Dilsukhnagar, Hyderabad, Telangana 500060",
    capacity: 100,
    price: 20000,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    availableTimes: ["10:00 AM", "2:00 PM", "6:00 PM"]
  },
  {
    id: 2,
    name: "Konark Asian-Mukta-A2",
    location: "Dilsukhnagar, Konark Theatre Ln, Dilsukhnagar, Hyderabad, Telangana 500060",
    capacity: 120,
    price: 25000,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    availableTimes: ["11:00 AM", "3:00 PM", "7:00 PM"]
  },
  {
    id: 3,
    name: "Sudarshan",
    location: "RTC X Rd, Chikkadpally, Himayatnagar, Hyderabad, Telangana 500020",
    capacity: 220,
    price: 25000,
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    availableTimes: ["2:00 PM", "9:00 PM"]
  },
  {
    id: 4,
    name: "AAA Cinemas",
    location: "Asian Allu Arjun Cinemas, Satyam Theatre Rd, X RoadKumar Basti, Ameerpet, Hyderabad, Telangana 500082",
    capacity: 320,
    price: 45000,
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    availableTimes: ["10:00 AM", "2:00 PM", "9:00 PM"]
  },
  {
    id: 5,
    name: "IMax",
    location: "IMAX Road, NTR Marg, behind of, Khairtabad, Hyderabad, Telangana 500063",
    capacity: 300,
    price: 35000,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    availableTimes: ["2:00 PM", "6:00 PM", "9:00 PM"]
  }
];

// Interfaces
interface Theater {
  id: number;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image: string;
  availableTimes: string[];
}

interface BookingDetails {
  theater?: Theater;
  movie?: Movie;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  attendees?: number;
  paymentMethod?: string;
}

const BookingPage: React.FC = () => {
  const { theaterId } = useParams<{ theaterId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'time' | 'movie' | 'details' | 'payment' | 'confirmation'>('time');
  const [theater, setTheater] = useState<Theater | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [attendees, setAttendees] = useState<number>(1);
  
  // Get dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  useEffect(() => {
    // Retrieve movie from localStorage
    const storedMovie = localStorage.getItem('selectedMovie');
    if (storedMovie) {
      setSelectedMovie(JSON.parse(storedMovie));
    }
    
    // Find the selected theater
    if (theaterId) {
      const foundTheater = theaters.find(t => t.id === parseInt(theaterId, 10));
      if (foundTheater) {
        setTheater(foundTheater);
        setBookingDetails(prev => ({ ...prev, theater: foundTheater }));
      } else {
        // Theater not found, navigate back to home
        navigate('/');
        toast({
          title: "Theater not found",
          description: "The selected theater could not be found.",
          variant: "destructive"
        });
      }
    }
    
    // Set default date to today
    setSelectedDate(dates[0]);
  }, [theaterId, navigate, toast]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingDetails(prev => ({ 
      ...prev, 
      time,
      date: selectedDate
    }));
    // Direct to movie selection after time selection
    setCurrentStep('movie');
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setBookingDetails(prev => ({ 
      ...prev, 
      movie
    }));
    setCurrentStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Update booking details with form data
    setBookingDetails(prev => ({
      ...prev,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      attendees: parseInt(formData.get('attendees') as string, 10) || 1
    }));
    
    setCurrentStep('payment');
  };

  const handlePaymentMethodSelect = (method: string) => {
    setBookingDetails(prev => ({ ...prev, paymentMethod: method }));
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });
      setCurrentStep('confirmation');
    }, 1500);
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5zm-1-2a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V6a3 3 0 00-3-3H4z" clipRule="evenodd" /><path fillRule="evenodd" d="M4 9a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
      case 'phonepe':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
      case 'paytm':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 100 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>;
      case 'gpay':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M15 19.128a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
    }
  };

  if (!theater) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
          <p>Loading theater information...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-cinema-primary hover:text-cinema-navy hover:bg-cinema-primary/20"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Theater & Movie Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="bg-cinema-primary text-cinema-navy rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Film className="mr-2 h-5 w-5" />
                    Theater Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={theater.image} 
                      alt={theater.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                      <h3 className="text-xl font-bold">{theater.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{theater.location}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-700">Capacity: {theater.capacity} seats</p>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 mr-2 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-bold text-cinema-primary">₹{theater.price.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Selected Movie Info - Only show when a movie is selected */}
              {selectedMovie && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6"
                >
                  <Card>
                    <CardHeader className="bg-cinema-navy text-white rounded-t-lg">
                      <CardTitle className="flex items-center">
                        <Film className="mr-2 h-5 w-5" />
                        Selected Movie
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={selectedMovie.poster} 
                          alt={selectedMovie.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                          <h3 className="text-xl font-bold">{selectedMovie.title}</h3>
                          <p className="text-sm">{selectedMovie.year}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700 mr-2">Genre:</span>
                          <span className="text-sm text-gray-600">{selectedMovie.genre}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-gray-700 mr-2">Industry:</span>
                          <span className="text-sm text-gray-600 capitalize">{selectedMovie.industry}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Right Column - Booking Flow */}
          <div className="lg:col-span-2">
            {/* Time Selection Step */}
            {currentStep === 'time' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Select Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Date Selection */}
                    <div className="mb-6">
                      <Label className="text-lg font-medium mb-3 block">Choose a Date</Label>
                      <Tabs defaultValue={dates[0]} onValueChange={setSelectedDate} className="w-full">
                        <TabsList className="grid grid-cols-7 h-auto">
                          {dates.map((date, index) => {
                            const d = new Date(date);
                            const day = d.toLocaleDateString('en-US', { weekday: 'short' });
                            const dayNum = d.getDate();
                            return (
                              <TabsTrigger 
                                key={date} 
                                value={date}
                                className="flex flex-col py-3 data-[state=active]:bg-cinema-primary data-[state=active]:text-white"
                              >
                                <span className="text-xs">{day}</span>
                                <span className="text-lg font-bold">{dayNum}</span>
                              </TabsTrigger>
                            );
                          })}
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    {/* Time Selection */}
                    <div>
                      <Label className="text-lg font-medium mb-3 block">Available Times</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {theater.availableTimes.map(time => (
                          <Button
                            key={time}
                            variant="outline" 
                            className="border-2 hover:bg-cinema-primary hover:text-white hover:border-cinema-primary transition-all"
                            onClick={() => handleTimeSelect(time)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Movie Selection Step - New */}
            {currentStep === 'movie' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Choose a Movie</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <p className="text-gray-600">Browse our collection of classic movies and select one for your screening.</p>
                    </div>
                    
                    {/* Movie Categories */}
                    <Tabs defaultValue="hollywood" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="hollywood">Hollywood</TabsTrigger>
                        <TabsTrigger value="bollywood">Bollywood</TabsTrigger>
                        <TabsTrigger value="tollywood">Tollywood</TabsTrigger>
                      </TabsList>
                      
                      {/* Hollywood Movies */}
                      <TabsContent value="hollywood">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Sample Hollywood movies - Replace with actual data */}
                          {[
                            { id: 1, title: "The Godfather", year: 1972, genre: "Crime, Drama", industry: "hollywood", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80" },
                            { id: 2, title: "The Shawshank Redemption", year: 1994, genre: "Drama", industry: "hollywood", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 3, title: "Pulp Fiction", year: 1994, genre: "Crime, Drama", industry: "hollywood", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                          ].map((movie) => (
                            <Card key={movie.id} className="cursor-pointer hover:scale-105 transition-transform overflow-hidden" onClick={() => handleMovieSelect(movie as Movie)}>
                              <div className="relative h-40">
                                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                                  <h3 className="font-medium text-sm">{movie.title}</h3>
                                  <p className="text-xs">{movie.year}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      {/* Bollywood Movies */}
                      <TabsContent value="bollywood">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Sample Bollywood movies */}
                          {[
                            { id: 5, title: "3 Idiots", year: 2009, genre: "Comedy, Drama", industry: "bollywood", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 6, title: "Lagaan", year: 2001, genre: "Drama, Sport", industry: "bollywood", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80" },
                            { id: 7, title: "Sholay", year: 1975, genre: "Action, Adventure", industry: "bollywood", poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
                          ].map((movie) => (
                            <Card key={movie.id} className="cursor-pointer hover:scale-105 transition-transform overflow-hidden" onClick={() => handleMovieSelect(movie as Movie)}>
                              <div className="relative h-40">
                                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                                  <h3 className="font-medium text-sm">{movie.title}</h3>
                                  <p className="text-xs">{movie.year}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      {/* Tollywood Movies */}
                      <TabsContent value="tollywood">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Sample Tollywood movies */}
                          {[
                            { id: 9, title: "Baahubali: The Beginning", year: 2015, genre: "Action, Drama", industry: "tollywood", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 10, title: "Arjun Reddy", year: 2017, genre: "Drama, Romance", industry: "tollywood", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
                            { id: 11, title: "RRR", year: 2022, genre: "Action, Drama", industry: "tollywood", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                          ].map((movie) => (
                            <Card key={movie.id} className="cursor-pointer hover:scale-105 transition-transform overflow-hidden" onClick={() => handleMovieSelect(movie as Movie)}>
                              <div className="relative h-40">
                                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                                  <h3 className="font-medium text-sm">{movie.title}</h3>
                                  <p className="text-xs">{movie.year}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep('time')}
                        className="text-cinema-primary"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Time Selection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Details Step */}
            {currentStep === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Enter Your Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleDetailsSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" required placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" required placeholder="Enter your phone number" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" required placeholder="Enter your email address" />
                      </div>
                      
                      {/* Added attendees count field */}
                      <div className="space-y-2">
                        <Label htmlFor="attendees" className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          Number of Attendees
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={() => setAttendees(prev => Math.max(1, prev - 1))}
                            className="h-8 w-8"
                          >
                            -
                          </Button>
                          <Input 
                            id="attendees" 
                            name="attendees" 
                            type="number" 
                            min="1" 
                            max={theater.capacity}
                            value={attendees}
                            onChange={(e) => setAttendees(parseInt(e.target.value, 10) || 1)}
                            className="w-20 text-center" 
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={() => setAttendees(prev => Math.min(theater.capacity, prev + 1))}
                            className="h-8 w-8"
                          >
                            +
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            (Max capacity: {theater.capacity})
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-cinema-primary text-white hover:bg-opacity-90">
                          Continue to Payment
                          <ChevronsRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          variant="link" 
                          onClick={() => setCurrentStep('movie')}
                          className="text-cinema-primary"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back to Movie Selection
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Payment Step */}
            {currentStep === 'payment' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Select Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {['card', 'phonepe', 'paytm', 'gpay'].map(method => (
                        <Button
                          key={method}
                          variant="outline"
                          className="h-auto py-6 flex flex-col items-center justify-center gap-2 hover:bg-cinema-primary hover:text-white transition-all"
                          onClick={() => handlePaymentMethodSelect(method)}
                        >
                          {getPaymentIcon(method)}
                          <span className="capitalize">{method === 'gpay' ? 'Google Pay' : method === 'card' ? 'Credit/Debit Card' : method}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="mt-8 border-t pt-6">
                      <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Theater</span>
                          <span>{theater.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Movie</span>
                          <span>{selectedMovie?.title || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date & Time</span>
                          <span>{new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })} at {selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Number of Attendees</span>
                          <span>{bookingDetails.attendees || 1}</span>
                        </div>
                        <div className="border-t border-dashed pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total Amount</span>
                            <span className="text-cinema-primary">₹{theater.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button 
                        variant="link" 
                        onClick={() => setCurrentStep('details')}
                        className="text-cinema-primary"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Confirmation Step */}
            {currentStep === 'confirmation' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-green-500">
                  <div className="bg-green-500 p-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <CardContent className="pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Booking Confirmed!</h2>
                    <p className="mb-6 text-gray-600">Your theater booking has been confirmed. A confirmation email has been sent to {bookingDetails.email}.</p>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <h3 className="font-bold text-left mb-3">Booking Details:</h3>
                      <div className="text-left space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Booking ID:</span>
                          <span>{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Theater:</span>
                          <span>{theater.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Movie:</span>
                          <span>{selectedMovie?.title || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date & Time:</span>
                          <span>{new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })} at {selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Attendees:</span>
                          <span>{bookingDetails.attendees || 1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Name:</span>
                          <span>{bookingDetails.name}</span>
                        </div>
                        <div className="border-t border-dashed pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Amount Paid:</span>
                            <span className="text-green-700">₹{theater.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={() => navigate('/')}
                        variant="outline" 
                        className="flex-1"
                      >
                        Back to Home
                      </Button>
                      <Button 
                        className="flex-1 bg-cinema-primary hover:bg-opacity-90 text-white"
                        onClick={() => {
                          // Logic to download the ticket
                          const ticketContent = `
REEL REVIVAL - BOOKING CONFIRMATION
---------------------------------
Booking ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}
Theater: ${theater.name}
Movie: ${selectedMovie?.title || "Not specified"}
Date: ${new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
Time: ${selectedTime}
Attendees: ${bookingDetails.attendees || 1}
Name: ${bookingDetails.name}
Amount Paid: ₹${theater.price.toLocaleString()}
                          `;
                          
                          const element = document.createElement('a');
                          const file = new Blob([ticketContent], {type: 'text/plain'});
                          element.href = URL.createObjectURL(file);
                          element.download = "reel_revival_ticket.txt";
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                        </svg>
                        Download Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Additional Information */}
        {currentStep !== 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-cinema-primary">About Reel Revival</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-cinema-navy rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Film className="text-cinema-gold h-6 w-6" />
                    </div>
                    <h3 className="font-bold mb-2">Preserve Cinematic Heritage</h3>
                    <p className="text-sm text-gray-600">
                      We keep theaters alive during non-peak periods while giving classic films another chance to shine on the big screen.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-cinema-navy rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cinema-gold h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold mb-2">Private Experience</h3>
                    <p className="text-sm text-gray-600">
                      Enjoy films with just your chosen group in a private theater, creating an intimate and special viewing experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-cinema-navy rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cinema-gold h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                    </div>
                    <h3 className="font-bold mb-2">Easy Booking Process</h3>
                    <p className="text-sm text-gray-600">
                      Our streamlined booking system makes it simple to select theaters, movies, and times with just a few clicks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default BookingPage;
