import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    /* Base Background: Using bg-black for a seamless blend with the photo */
    <div className="relative min-h-screen bg-black flex flex-col overflow-x-hidden">
      
      {/* LAYER 1: Ambient Mesh (Fixed) */}
      <div className="fixed inset-0 bg-hyphy-main z-0"></div>

      {/* LAYER 2: Moving Glow Orbs (Visual Interest) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-red-900/20 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* LAYER 3: Texture Overlay */}
      <div className="fixed inset-0 bg-grain z-0 pointer-events-none opacity-50"></div>

      {/* LAYER 4: App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar is fixed, so it doesn't take up "space" in the flex layout */}
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* THE FIX: 
            1. Removed pt-24 and pb-12. This allows Home.js to fill the WHOLE screen.
            2. flex-grow ensures the footer stays at the bottom if content is short.
        */}
        <main className="flex-grow w-full">
          <AppRoutes />
        </main>

        <Footer />
      </div>

      {/* Global Scrollbar Styling */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #ef4444; }
        
        /* Smooth scrolling for the whole app */
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

export default App;