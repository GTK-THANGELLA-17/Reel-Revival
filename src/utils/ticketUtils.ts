
import { BookingDetails } from '@/services/bookingService';

/**
 * Generates the text content for a ticket based on booking details
 */
export const generateTicketContent = (bookingDetails: BookingDetails): string => {
  const isPrivateScreening = bookingDetails.screeningType === 'private';
  const movieOrContentTitle = isPrivateScreening 
    ? bookingDetails.contentTitle 
    : bookingDetails.movie?.title;
  
  return `
REEL REVIVAL - BOOKING CONFIRMATION
---------------------------------
Booking ID: ${bookingDetails.id || 'N/A'}
Theater: ${bookingDetails.theater?.name || 'N/A'}
${isPrivateScreening 
  ? `Content: ${movieOrContentTitle}`
  : `Movie: ${movieOrContentTitle}`}
${isPrivateScreening && bookingDetails.contentType ? `Content Type: ${bookingDetails.contentType}` : ''}
Date: ${bookingDetails.date || 'N/A'}
Time: ${bookingDetails.time || 'N/A'}
Attendees: ${bookingDetails.attendees || 0}
`;
};
