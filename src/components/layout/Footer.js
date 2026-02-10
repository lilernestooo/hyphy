import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    /* Key Fixes:
       1. Changed z-30 to z-50 to ensure it sits ABOVE the background photo.
       2. Changed bg-black/10 to bg-black. This provides a "cut-off" point 
          for the background photo so it doesn't overlap the text.
       3. Kept relative positioning to ensure z-index works correctly.
    */
    <footer className="relative z-50 bg-black border-t border-white/5 pt-20 pb-10 px-8 overflow-hidden">
      
      {/* 1. Subtle top border glow to transition from the background photo to solid black */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.3)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black italic tracking-tighter text-white mb-4 uppercase">
              HYPHY<span className="text-red-600">BODEGA</span>
            </h2>
            <p className="text-zinc-500 max-w-sm text-xs leading-relaxed uppercase font-bold tracking-[0.1em]">
              The premier digital destination for late-night ordering, 
              table lockdowns, and high-voltage event announcements. 
              <br/><span className="text-zinc-300 mt-2 block font-black">STAY LOUD. STAY HYPHY.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-6 opacity-50">Navigation</h4>
            <ul className="space-y-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <li><Link to="/menu" className="hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all"></span>Bar Menu</Link></li>
              <li><Link to="/reservations" className="hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all"></span>Table Booking</Link></li>
              <li><Link to="/events" className="hover:text-red-500 transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all"></span>Upcoming Hype</Link></li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-6 opacity-50">Connect</h4>
            <div className="flex gap-3">
              {[
                { id: 'ig', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
                { id: 'x', path: 'M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M13.232 10.768l6.768 -6.768' },
                { id: 'pin', path: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 100-6 3 3 0 000 6z' }
              ].map((icon, i) => (
                <a 
                  key={i}
                  href="/" 
                  className="w-12 h-12 rounded-2xl bg-zinc-900/30 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-600 hover:bg-red-600/20 transition-all duration-500 group"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    {icon.id === 'ig' ? <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> : null}
                    <path d={icon.path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></div>
            <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.5em]">
              © 2026 HYPHY BODEGA CRA • ALL RIGHTS RESERVED
            </p>
          </div>
          
          <div className="flex gap-8 text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">
            <span className="hover:text-red-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* 2. Aesthetic Red Flare - Kept for vibe, but muted so it doesn't clash */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;