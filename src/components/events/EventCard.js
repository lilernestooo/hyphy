import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="relative group overflow-hidden rounded-3xl bg-zinc-900 border border-red-900/30 transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
      <div className="h-32 bg-gradient-to-br from-red-600 via-red-800 to-black p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-black text-white italic truncate uppercase">{event.title}</h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Calendar SVG */}
        <div className="flex items-center text-zinc-400 gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span className="font-bold text-xs uppercase tracking-wider">{event.date}</span>
        </div>
        
        {/* Clock SVG */}
        <div className="flex items-center text-zinc-400 gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span className="font-bold text-xs">{event.time}</span>
        </div>

        {/* User SVG */}
        <div className="flex items-center text-zinc-400 gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="text-xs font-medium uppercase tracking-tighter">Host: {event.host}</span>
        </div>

        <button className="w-full mt-4 py-3 bg-zinc-800 border border-zinc-700 text-white font-black uppercase italic rounded-xl group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
          Get Notification
        </button>
      </div>
    </div>
  );
};

export default EventCard;