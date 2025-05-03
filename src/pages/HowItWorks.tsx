
import React from 'react';
import Layout from '../components/layout/Layout';
import { Film, Clock, Calendar, CreditCard, Check, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-cinema-burgundy mb-6">How It Works</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg mb-6">
            Booking your private theater experience with Reel Revival is simple and straightforward. Follow these easy steps to create an unforgettable movie event.
          </p>
          
          <div className="space-y-8">
            <Step 
              number={1}
              title="Choose Your Theater"
              description="Browse our selection of available theaters. Each listing shows location, capacity, and price information. Select the theater that best suits your needs and preferences."
              icon={<Film className="w-8 h-8" />}
            />
            
            <Step 
              number={2}
              title="Select Date & Time"
              description="Pick an available date and time slot for your private screening. Different theaters have various time slots available throughout the day."
              icon={<Calendar className="w-8 h-8" />}
            />
            
            <Step 
              number={3}
              title="Pick Your Movie"
              description="Enter the name of the movie you'd like to watch. Remember, we focus on classic films and movies that are no longer in their initial theatrical run."
              icon={<Film className="w-8 h-8" />}
            />
            
            <Step 
              number={4}
              title="Enter Your Details"
              description="Provide your contact information so we can confirm your booking and send you important updates about your screening."
              icon={<Users className="w-8 h-8" />}
            />
            
            <Step 
              number={5}
              title="Make Payment"
              description="Complete your booking by making payment through one of our secure payment options, including credit/debit cards and various digital payment methods."
              icon={<CreditCard className="w-8 h-8" />}
            />
            
            <Step 
              number={6}
              title="Receive Confirmation"
              description="Once your payment is processed, you'll receive a booking confirmation that you can download or share. This will contain all the details of your private screening."
              icon={<Check className="w-8 h-8" />}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-cinema-navy mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <FAQ 
              question="How many people can I bring?"
              answer="You can bring as many guests as the theater capacity allows. The price remains the same regardless of how many people attend (up to the maximum capacity)."
            />
            
            <FAQ 
              question="Can I bring my own food and drinks?"
              answer="Policies vary by theater. Some theaters allow outside food and drinks, while others offer concessions for purchase. Check the specific theater's policy during the booking process."
            />
            
            <FAQ 
              question="What if I need to cancel my booking?"
              answer="Our cancellation policy varies by theater and how close to the screening time you cancel. Generally, cancellations made at least 48 hours in advance receive a full refund, while later cancellations may incur fees."
            />
            
            <FAQ 
              question="Can I request any movie?"
              answer="We focus on movies that are no longer in their initial theatrical run due to licensing restrictions. Most classics and older films are available, but very recent releases may not be possible to screen."
            />
            
            <FAQ 
              question="Is technical support available during my screening?"
              answer="Yes, theater staff will be available to assist with any technical issues that might arise during your private screening."
            />
            
            <FAQ 
              question="Can I book for special occasions?"
              answer="Absolutely! Many customers book private screenings for birthdays, anniversaries, corporate events, and other special occasions. Some theaters even offer special packages for such events."
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

const Step: React.FC<{
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ number, title, description, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="flex items-start"
    >
      <div className="bg-cinema-burgundy text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-cinema-navy mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-bold text-cinema-navy mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  );
};

export default HowItWorks;
