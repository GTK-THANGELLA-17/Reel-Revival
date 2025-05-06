
import React from 'react';
import { Share2 } from 'lucide-react';
import { 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { BookingDetails } from '@/services/bookingService';
import { shareTicket } from '@/utils/ticketShare';

interface TicketShareMenuProps {
  bookingDetails: BookingDetails;
  ticketElementSelector: string;
}

const SHARING_PLATFORMS = ['WhatsApp', 'Facebook', 'Twitter', 'Email'];

const TicketShareMenu: React.FC<TicketShareMenuProps> = ({ 
  bookingDetails,
  ticketElementSelector
}) => {
  const handleShare = (platform: string) => {
    try {
      shareTicket(platform, bookingDetails, ticketElementSelector);
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
    }
  };

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Share Ticket</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {SHARING_PLATFORMS.map(platform => (
        <DropdownMenuItem 
          key={platform} 
          onClick={() => handleShare(platform)} 
          className="cursor-pointer"
        >
          <Share2 className="mr-2 h-4 w-4" /> {platform}
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default TicketShareMenu;
