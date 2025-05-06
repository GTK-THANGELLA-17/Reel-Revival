
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { LoadingProvider } from "@/contexts/LoadingContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import BookingPage from "./pages/BookingPage";
import MovieGallery from "./pages/MovieGallery";

// Clear localStorage on navigate and scroll to top
const NavigationHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear selections when navigating to certain pages
    if (location.pathname === "/movies" || location.pathname === "/") {
      localStorage.removeItem('selectedMovie');
    }
    
    // Scroll to top on every navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// Custom CSS for dark mode text color in booking details
const addCustomStyles = () => {
  // Add a style tag to ensure booking confirmation text is black in dark mode
  const style = document.createElement('style');
  style.innerHTML = `
    .dark .booking-confirmation-text,
    .dark .bg-gray-50 {
      color: black !important;
    }
    
    .dark .bg-gray-50 {
      background-color: #f9fafb !important;
    }
    
    .dark .booking-confirmation-text * {
      color: black !important;
    }
    
    .booking-confirmation-container {
      background-color: #221F26 !important;
    }
    
    .dark .booking-details-container {
      background-color: #221F26 !important;
    }
    
    /* Ensure booking details text is always visible */
    .booking-details,
    .dark .booking-details {
      color: black !important;
    }
    
    /* Improved mobile menu styles */
    @media (max-width: 768px) {
      .mobile-menu {
        display: block !important;
        position: fixed !important;
        top: 64px !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 50 !important;
        max-height: calc(100vh - 64px) !important;
        overflow-y: auto !important;
      }
      
      .menu-button {
        z-index: 60 !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize the QueryClient
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    addCustomStyles();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <NavigationHandler />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/booking/:theaterId" element={<BookingPage />} />
                <Route path="/movies" element={<MovieGallery />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
