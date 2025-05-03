
import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-cinema-burgundy mb-6">About Reel Revival</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-cinema-navy mb-4">Our Mission</h2>
          <p className="mb-4">
            At Reel Revival, our mission is to breathe new life into cinema halls while giving movie enthusiasts the opportunity to experience their favorite films on the big screen. We believe in creating memorable viewing experiences in a premium theater environment, exclusively reserved for you and your chosen guests.
          </p>
          <p>
            In an age where many theaters struggle during periods without new releases, we've created a platform that keeps these beautiful spaces alive while offering film lovers a chance to revisit classics or catch up on movies they missed seeing in theaters.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-cinema-navy mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Exclusive theater bookings for private screenings</li>
            <li>Ability to watch classic films and missed releases on the big screen</li>
            <li>Customizable viewing experiences for special occasions</li>
            <li>Simple booking process with convenient payment options</li>
            <li>Support for local theaters during non-peak periods</li>
            <li>Premium viewing experience with state-of-the-art projection and sound</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-cinema-navy mb-4">How It All Started</h2>
          <p className="mb-4">
            Reel Revival was born from a simple observation: many people miss seeing their favorite movies on the big screen, and many theaters sit empty during certain periods. We saw an opportunity to solve both problems at once.
          </p>
          <p className="mb-4">
            Our founder, a passionate film enthusiast, missed the theatrical release of a film he had eagerly anticipated. When he approached a local theater owner about the possibility of arranging a private screening, both parties realized there was untapped potential in this concept.
          </p>
          <p>
            From that initial conversation, Reel Revival has grown into a platform connecting movie lovers with theaters across the country, creating win-win situations for everyone involved.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-cinema-navy mb-4">Important Information</h2>
          <p className="mb-4">
            <strong>Movie Selection:</strong> We focus on screening classic films and movies that are no longer in their initial theatrical run. Due to licensing restrictions, we typically cannot offer current theatrical releases.
          </p>
          <p className="mb-4">
            <strong>Pricing:</strong> Theater rental prices vary based on location, capacity, day of the week, and time slot. The price displayed is for the entire theater, regardless of how many guests you bring (up to the theater's capacity).
          </p>
          <p className="mb-4">
            <strong>Booking Process:</strong> After selecting a theater, time slot, and movie, you'll complete your booking by providing personal details and making payment. Once confirmed, you'll receive booking details that can be downloaded or shared.
          </p>
          <p>
            <strong>Cancellation Policy:</strong> Please refer to our Terms and Conditions for details about our cancellation policy, which may vary by theater and booking time.
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;
