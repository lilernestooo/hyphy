import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import OrderTracker from './components/ordering/Ordertracker';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black flex flex-col overflow-x-hidden">
      
      <div className="fixed inset-0 bg-hyphy-main z-0"></div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-red-900/20 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="fixed inset-0 bg-grain z-0 pointer-events-none opacity-50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-grow w-full">
          <AppRoutes />
        </main>

        <Footer />
      </div>

      {/* ✅ Order Tracker - shows on every page */}
      <OrderTracker />

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #ef4444; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

export default App;