
import { BookingDetails } from '@/services/bookingService';
import { toast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

type SharingPlatform = 'WhatsApp' | 'Facebook' | 'Twitter' | 'Email' | string;

/**
 * Shares the ticket on the specified platform
 */
export const shareTicket = async (
  platform: SharingPlatform,
  bookingDetails: BookingDetails,
  ticketElementSelector: string
): Promise<boolean> => {
  try {
    const isPrivateScreening = bookingDetails.screeningType === 'private';
    const title = isPrivateScreening ? bookingDetails.contentTitle : bookingDetails.movie?.title;
    
    // Create ticket image for sharing
    const ticketElement = document.querySelector(ticketElementSelector);
    let imgData = null;
    
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement as HTMLElement);
      imgData = canvas.toDataURL('image/png');
    }
    
    const ticketDetails = `
      I just booked ${isPrivateScreening ? 'a private screening' : 'tickets'} for ${title || ''} at ${bookingDetails.theater?.name || ''}!
      Date: ${bookingDetails.date || 'N/A'}
      Time: ${bookingDetails.time || 'N/A'}
      
      Book your own exclusive theater experience at Reel Revival!
    `;
    
    // For demonstration, we'll show a toast and use different sharing methods based on platform
    switch(platform) {
      case 'WhatsApp':
        window.open(`https://wa.me/?text=${encodeURIComponent(ticketDetails)}`, '_blank');
        break;
        
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(ticketDetails)}`, '_blank');
        break;
        
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(ticketDetails)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
        break;
        
      case 'Email':
        window.location.href = `mailto:?subject=My Booking at Reel Revival&body=${encodeURIComponent(ticketDetails)}`;
        break;
        
      default:
        // Use Web Share API as fallback if available
        if (navigator.share) {
          try {
            const shareData: ShareData = {
              title: `My ${isPrivateScreening ? 'Private Screening' : title} at Reel Revival`,
              text: ticketDetails,
              url: window.location.href,
            };
            
            // Add image if available (might not work on all platforms)
            if (imgData) {
              const blob = await (await fetch(imgData)).blob();
              const file = new File([blob], 'ticket.png', { type: 'image/png' });
              shareData.files = [file];
            }
            
            await navigator.share(shareData);
          } catch (err) {
            console.error('Error sharing:', err);
            throw err;
          }
        } else {
          throw new Error('Sharing not supported on this browser');
        }
    }
    
    toast({
      title: `Shared on ${platform}`,
      description: "Your booking has been shared successfully.",
    });
    
    return true;
  } catch (error) {
    console.error('Error sharing:', error);
    toast({
      title: "Sharing Failed",
      description: `Unable to share on ${platform}. Please try another option.`,
      variant: "destructive"
    });
    return false;
  }
};
