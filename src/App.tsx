
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import BookingPage from "./pages/BookingPage";
import MovieGallery from "./pages/MovieGallery";

// Clear localStorage on navigate
const ClearStorageOnNavigate = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Clear selections when navigating to certain pages
    if (location.pathname === "/movies" || location.pathname === "/") {
      localStorage.removeItem('selectedMovie');
    }
  }, [location.pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LoadingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ClearStorageOnNavigate />
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

export default App;
