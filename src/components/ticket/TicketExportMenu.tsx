
import React from 'react';
import { FileText, FileImage, File } from 'lucide-react';
import { 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { exportTicket } from '@/utils/ticketExport';

interface TicketExportMenuProps {
  bookingId?: string;
  ticketElementSelector: string;
}

const TicketExportMenu: React.FC<TicketExportMenuProps> = ({ 
  bookingId, 
  ticketElementSelector 
}) => {
  const handleExport = async (format: 'pdf' | 'image' | 'word') => {
    await exportTicket(format, ticketElementSelector, bookingId);
  };

  return (
    <>
      <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleExport('pdf')} className="cursor-pointer">
        <FileText className="mr-2 h-4 w-4" /> PDF Format
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleExport('image')} className="cursor-pointer">
        <FileImage className="mr-2 h-4 w-4" /> Image (PNG)
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleExport('word')} className="cursor-pointer">
        <File className="mr-2 h-4 w-4" /> Word Document
      </DropdownMenuItem>
    </>
  );
};

export default TicketExportMenu;
