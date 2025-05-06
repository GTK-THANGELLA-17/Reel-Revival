
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, Film, Calendar, Clock, MapPin, Users, ChevronsRight, UserPlus, Download } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Movie, getMovieById } from '@/services/movieService';
import TicketActions from '@/components/TicketActions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Theater, BookingDetails, contentTypes, theaters, createBooking, getTheaterById } from '@/services/bookingService';

const BookingPage: React.FC = () => {
  const { theaterId } = useParams<{ theaterId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'time' | 'screeningType' | 'movie' | 'privateContent' | 'details' | 'payment' | 'confirmation'>('time');
  const [theater, setTheater] = useState<Theater | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [attendees, setAttendees] = useState<number>(1);
  const [screeningType, setScreeningType] = useState<'regular' | 'private'>('regular');
  
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
      const foundTheater = getTheaterById(parseInt(theaterId, 10));
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
  }, [theaterId, navigate, toast, dates]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingDetails(prev => ({ 
      ...prev, 
      time,
      date: selectedDate
    }));
    // Direct to screening type selection after time selection
    setCurrentStep('screeningType');
  };

  const handleScreeningTypeSelect = (type: 'regular' | 'private') => {
    setScreeningType(type);
    setBookingDetails(prev => ({ 
      ...prev, 
      screeningType: type
    }));
    
    // Navigate to the next step based on the screening type
    if (type === 'regular') {
      setCurrentStep('movie');
    } else {
      setCurrentStep('privateContent');
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setBookingDetails(prev => ({ 
      ...prev, 
      movie
    }));
    setCurrentStep('details');
  };

  const handlePrivateContentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Update booking details with private content data
    setBookingDetails(prev => ({
      ...prev,
      contentType: formData.get('contentType') as string,
      contentTitle: formData.get('contentTitle') as string,
      contentDescription: formData.get('contentDescription') as string,
      contentDuration: formData.get('contentDuration') as string
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
      // Create booking in service
      const confirmedBooking = createBooking(bookingDetails);
      
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
          {/* Left Column - Theater & Movie/Content Info */}
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
              
              {/* Selected Movie Info - Only show when a movie is selected and it's a regular screening */}
              {selectedMovie && bookingDetails.screeningType === 'regular' && (
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
              
              {/* Private Content Info - Only show when private screening is selected and content details are provided */}
              {bookingDetails.screeningType === 'private' && bookingDetails.contentTitle && (
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
                        Your Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-bold">{bookingDetails.contentTitle}</h3>
                          <p className="text-sm text-gray-500 capitalize">{bookingDetails.contentType}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-700">{bookingDetails.contentDescription}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-700">Duration: {bookingDetails.contentDuration}</span>
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

            {/* Screening Type Selection - New step */}
            {currentStep === 'screeningType' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Select Screening Type</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <p className="text-gray-600">Choose between a regular movie screening or showcase your own content.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <Card 
                        className={`border-2 cursor-pointer transition-all ${screeningType === 'regular' ? 'border-cinema-primary bg-cinema-primary/10' : 'border-gray-200 hover:border-cinema-primary/50'}`}
                        onClick={() => handleScreeningTypeSelect('regular')}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <Film className="h-12 w-12 mb-4 text-cinema-primary" />
                          <h3 className="text-lg font-bold mb-2">Regular Screening</h3>
                          <p className="text-sm text-gray-600">
                            Watch a movie from our curated selection of classics
                          </p>
                        </CardContent>
                      </Card>

                      <Card 
                        className={`border-2 cursor-pointer transition-all ${screeningType === 'private' ? 'border-cinema-navy bg-cinema-navy/10' : 'border-gray-200 hover:border-cinema-navy/50'}`}
                        onClick={() => handleScreeningTypeSelect('private')}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-cinema-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                          <h3 className="text-lg font-bold mb-2">Private Showcase</h3>
                          <p className="text-sm text-gray-600">
                            Screen your own documentary, short film, or other content
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
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
            
            {/* Movie Selection Step */}
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
                            { id: 4, title: "Dilwale Dulhania Le Jayenge", year: 1995, genre: "Romance", industry: "bollywood", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 5, title: "Sholay", year: 1975, genre: "Action", industry: "bollywood", poster: "https://images.unsplash.com/photo-1626126525134-fbbc70c322b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 6, title: "Lagaan", year: 2001, genre: "Drama, Sport", industry: "bollywood", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
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
                            { id: 7, title: "Bahubali: The Beginning", year: 2015, genre: "Action, Fantasy", industry: "tollywood", poster: "https://images.unsplash.com/photo-1594909122133-a8f480ac4a37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 8, title: "RRR", year: 2022, genre: "Action, Drama", industry: "tollywood", poster: "https://images.unsplash.com/photo-1626814026049-5786409df8dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" },
                            { id: 9, title: "Arjun Reddy", year: 2017, genre: "Romance, Drama", industry: "tollywood", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80" },
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
                        onClick={() => setCurrentStep('screeningType')}
                        className="text-cinema-primary"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Screening Type
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Private Content Form Step */}
            {currentStep === 'privateContent' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Tell Us About Your Content</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handlePrivateContentSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="contentType">Content Type</Label>
                            <select 
                              id="contentType" 
                              name="contentType" 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              required
                            >
                              <option value="">Select content type</option>
                              {contentTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <Label htmlFor="contentTitle">Title</Label>
                            <Input 
                              type="text" 
                              id="contentTitle" 
                              name="contentTitle" 
                              placeholder="Enter the title of your content"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="contentDuration">Duration</Label>
                            <Input 
                              type="text" 
                              id="contentDuration" 
                              name="contentDuration" 
                              placeholder="e.g., 1 hour 30 minutes"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="contentDescription">Description</Label>
                            <textarea 
                              id="contentDescription" 
                              name="contentDescription" 
                              rows={4}
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Briefly describe your content"
                              required
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-6">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setCurrentStep('screeningType')}
                          >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          
                          <Button type="submit" className="bg-cinema-navy hover:bg-cinema-navy/90">
                            Continue
                            <ChevronsRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            {/* Personal Details Step */}
            {currentStep === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-2xl text-cinema-primary">Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleDetailsSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              type="text" 
                              id="name" 
                              name="name" 
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              type="email" 
                              id="email" 
                              name="email" 
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              type="tel" 
                              id="phone" 
                              name="phone" 
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="attendees">Number of Attendees</Label>
                            <Input 
                              type="number" 
                              id="attendees" 
                              name="attendees" 
                              min="1"
                              max={theater.capacity} 
                              value={attendees}
                              onChange={(e) => setAttendees(parseInt(e.target.value, 10))}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-6">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setCurrentStep(bookingDetails.screeningType === 'regular' ? 'movie' : 'privateContent')}
                          >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          
                          <Button type="submit" className="bg-cinema-primary hover:bg-cinema-primary/90">
                            Continue to Payment
                            <ChevronsRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
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
                    <CardTitle className="text-2xl text-cinema-primary">Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Theater:</span>
                            <span className="font-medium">{theater.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date & Time:</span>
                            <span className="font-medium">{bookingDetails.date} at {bookingDetails.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium capitalize">{bookingDetails.screeningType} Screening</span>
                          </div>
                          {bookingDetails.screeningType === 'regular' && bookingDetails.movie && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Movie:</span>
                              <span className="font-medium">{bookingDetails.movie.title}</span>
                            </div>
                          )}
                          {bookingDetails.screeningType === 'private' && bookingDetails.contentTitle && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Content:</span>
                              <span className="font-medium">{bookingDetails.contentTitle}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Attendees:</span>
                            <span className="font-medium">{bookingDetails.attendees}</span>
                          </div>
                          <div className="border-t pt-2 mt-2 flex justify-between">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold">₹{theater.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {['card', 'phonepe', 'paytm', 'gpay'].map((method) => (
                          <Card 
                            key={method}
                            className={`border-2 cursor-pointer transition-all ${bookingDetails.paymentMethod === method ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                            onClick={() => handlePaymentMethodSelect(method)}
                          >
                            <CardContent className="flex items-center justify-center p-4">
                              <div className="flex items-center space-x-2">
                                {getPaymentIcon(method)}
                                <span className="font-medium capitalize">{method === 'gpay' ? 'Google Pay' : method === 'phonepe' ? 'PhonePe' : method === 'paytm' ? 'Paytm' : 'Credit/Debit Card'}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep('details')}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
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
                <Card className="border-green-200">
                  <CardHeader className="border-b bg-green-50 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <CardTitle className="text-2xl text-green-700">Booking Confirmed!</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4 booking-confirmation-text">
                      <h3 className="font-bold text-lg mb-3 text-center">Booking Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Theater:</span>
                          <span className="font-medium">{theater.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">{bookingDetails.date} at {bookingDetails.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">{bookingDetails.screeningType} Screening</span>
                        </div>
                        
                        {bookingDetails.screeningType === 'regular' && bookingDetails.movie && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Movie:</span>
                            <span className="font-medium">{bookingDetails.movie.title}</span>
                          </div>
                        )}
                        
                        {bookingDetails.screeningType === 'private' && bookingDetails.contentTitle && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Content:</span>
                              <span className="font-medium">{bookingDetails.contentTitle}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Content Type:</span>
                              <span className="font-medium capitalize">{bookingDetails.contentType}</span>
                            </div>
                          </>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Attendees:</span>
                          <span className="font-medium">{bookingDetails.attendees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{bookingDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{bookingDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{bookingDetails.phone}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between">
                          <span className="font-bold">Total Amount Paid:</span>
                          <span className="font-bold">₹{theater.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <TicketActions bookingDetails={bookingDetails} />
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/')}
                        className="bg-cinema-navy text-white hover:bg-cinema-navy/90"
                      >
                        Return to Home
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default BookingPage;
