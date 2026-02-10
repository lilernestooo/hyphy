import React from 'react';

const ReservationForm = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-red-600 to-red-900 p-[1px] rounded-[2.5rem] shadow-[0_0_50px_rgba(220,38,38,0.15)]">
      <div className="bg-zinc-950 p-8 md:p-12 rounded-[2.4rem]">
        <h2 className="text-4xl font-black italic text-white mb-2 uppercase tracking-tighter">
          SECURE THE <span className="text-red-600">VIBE</span>
        </h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">Table Bookings • VIP Sections</p>
        
        <form className="space-y-6">
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:border-red-600 outline-none transition group-hover:border-zinc-700 font-bold placeholder:text-zinc-700" placeholder="FULL NAME" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Date Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <input type="date" className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-red-600 transition" />
            </div>
            {/* Time Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <input type="time" className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-red-600 transition" />
            </div>
          </div>

          <button className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-900/40 transition-all uppercase italic active:scale-95">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;