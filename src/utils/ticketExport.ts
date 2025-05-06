
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { toast } from '@/hooks/use-toast';

type ExportFormat = 'pdf' | 'image' | 'word';

/**
 * Generates a ticket in the specified format
 */
export const exportTicket = async (
  format: ExportFormat,
  ticketElementSelector: string,
  bookingId?: string
): Promise<boolean> => {
  try {
    // Find the booking confirmation element
    const ticketElement = document.querySelector(ticketElementSelector);
    
    if (!ticketElement) {
      toast({
        title: "Error",
        description: "Unable to generate ticket. Please try again.",
        variant: "destructive"
      });
      return false;
    }
    
    // Use html2canvas to capture the ticket as an image
    const canvas = await html2canvas(ticketElement as HTMLElement);
    const imgData = canvas.toDataURL('image/png');
    
    const fileName = `reel-revival-ticket-${bookingId || 'new'}`;
    
    switch(format) {
      case 'pdf':
        // Create PDF using jsPDF with the correct constructor
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
        break;
        
      case 'image':
        // Save as PNG image
        saveAs(imgData, `${fileName}.png`);
        break;
        
      case 'word':
        // For Word document, we'll create an HTML file that can be opened in Word
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Reel Revival Ticket</title>
            </head>
            <body>
              <div>
                <img src="${imgData}" alt="Ticket" style="width: 100%;" />
              </div>
            </body>
          </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        saveAs(blob, `${fileName}.doc`);
        break;
    }
    
    toast({
      title: "Ticket downloaded successfully",
      description: `Your ticket has been downloaded in ${format.toUpperCase()} format.`,
    });
    
    return true;
  } catch (error) {
    console.error('Error generating ticket:', error);
    toast({
      title: "Error",
      description: "Failed to generate ticket. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
