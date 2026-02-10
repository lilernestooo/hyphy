import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your Pages
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Reservations from '../pages/Reservations';
import Events from '../pages/Event';
import Cafe from '../pages/Cafe'; // New Cafe Page Import

const AppRoutes = () => {
  return (
    /* The Routes component acts as the 'switcher' for your app.
       Each Route maps a URL path (like /cafe) to a specific React Component.
    */
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />
      
      {/* Night Menu / Bar Ordering */}
      <Route path="/menu" element={<Menu />} />
      
      {/* Table Booking */}
      <Route path="/reservations" element={<Reservations />} />
      
      {/* Upcoming Music & Pop-ups */}
      <Route path="/events" element={<Events />} />

      {/* Daytime Cafe Menu (10AM - 5PM) */}
      <Route path="/cafe" element={<Cafe />} />
      
      {/* 404 Error Page - Styled for the Hyphy Aesthetic */}
      <Route path="*" element={
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-9xl font-black italic text-zinc-900 absolute opacity-50 select-none">404</h1>
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic uppercase text-white mb-4">You're Lost, Homie.</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-8">This corner of the bodega doesn't exist.</p>
            <a href="/" className="px-8 py-3 bg-red-600 text-white font-black italic rounded-xl hover:bg-red-500 transition-all shadow-xl shadow-red-900/20">
              BACK TO BASE
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;