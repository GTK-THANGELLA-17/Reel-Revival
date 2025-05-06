
import { Movie } from './movieService';

// Interfaces
export interface Theater {
  id: number;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image: string;
  availableTimes: string[];
}

export interface ContentType {
  id: string;
  name: string;
}

export interface BookingDetails {
  id?: string;
  theater?: Theater;
  movie?: Movie;
  date?: string;
  time?: string;
  name?: string;
  email?: string;
  phone?: string;
  attendees?: number;
  paymentMethod?: string;
  screeningType?: 'regular' | 'private';
  contentType?: string;
  contentTitle?: string;
  contentDescription?: string;
  contentDuration?: string;
  createdAt?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
}

// Sample theater data
export const theaters: Theater[] = [
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

// Available content types for private screenings
export const contentTypes: ContentType[] = [
  { id: 'documentary', name: 'Documentary' },
  { id: 'shortFilm', name: 'Short Film' },
  { id: 'feature', name: 'Feature Film' },
  { id: 'animation', name: 'Animation' },
  { id: 'music', name: 'Music Video' },
  { id: 'presentation', name: 'Presentation' },
  { id: 'other', name: 'Other' }
];

// Mock bookings array to store bookings (this would be replaced by a database in a real backend)
const bookings: BookingDetails[] = [];

// Function to create a new booking
export const createBooking = (bookingDetails: BookingDetails): BookingDetails => {
  const newBooking: BookingDetails = {
    ...bookingDetails,
    id: Math.random().toString(36).substring(2, 10).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(newBooking);
  return newBooking;
};

// Function to get a theater by ID
export const getTheaterById = (id: number): Theater | undefined => {
  return theaters.find(theater => theater.id === id);
};

// Function to get all theaters
export const getAllTheaters = (): Theater[] => {
  return theaters;
};

// Function to get all bookings (in a real app, this would be filtered by user)
export const getAllBookings = (): BookingDetails[] => {
  return bookings;
};

// Function to get a booking by ID
export const getBookingById = (id: string): BookingDetails | undefined => {
  return bookings.find(booking => booking.id === id);
};

// Function to generate a ticket for a booking
export const generateTicket = (bookingId: string): string => {
  const booking = getBookingById(bookingId);
  if (!booking) {
    return 'Booking not found';
  }
  
  // In a real app, this would generate a proper ticket
  return `
REEL REVIVAL - BOOKING CONFIRMATION
---------------------------------
Booking ID: ${booking.id}
Theater: ${booking.theater?.name}
${booking.screeningType === 'regular' 
  ? `Movie: ${booking.movie?.title}` 
  : `Content: ${booking.contentTitle} (${booking.contentType})`}
Date: ${booking.date}
Time: ${booking.time}
Attendees: ${booking.attendees}
Total Amount: ₹${booking.theater?.price.toLocaleString()}

Thank you for choosing Reel Revival!
`;
};
