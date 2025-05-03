
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-cream p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <div className="mb-6 text-cinema-burgundy">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4M12 16h.01"></path>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-cinema-navy">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-cinema-navy">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          It seems the page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-cinema-burgundy hover:bg-opacity-90"
          >
            Return to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full border-cinema-burgundy text-cinema-burgundy"
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
