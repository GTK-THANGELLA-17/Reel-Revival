
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { BookingDetails } from '@/services/bookingService';
import TicketExportMenu from './ticket/TicketExportMenu';
import TicketShareMenu from './ticket/TicketShareMenu';

interface TicketActionsProps {
  bookingDetails: BookingDetails;
}

const TICKET_ELEMENT_SELECTOR = '.booking-confirmation-text';

const TicketActions: React.FC<TicketActionsProps> = ({ bookingDetails }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <Button 
      className="flex-1 bg-cinema-primary hover:bg-opacity-90 text-white"
      disabled={isGenerating}
      onClick={() => {}}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 w-full justify-center">
            {isGenerating ? "Generating..." : (
              <>
                <Download className="h-4 w-4" /> Download Ticket
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <TicketExportMenu 
            bookingId={bookingDetails.id}
            ticketElementSelector={TICKET_ELEMENT_SELECTOR}
          />
          <TicketShareMenu 
            bookingDetails={bookingDetails}
            ticketElementSelector={TICKET_ELEMENT_SELECTOR}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  );
};

export default TicketActions;
