import React, { useState } from 'react';
import { upcomingEvents } from '../utils/Data';
import GraffitiImg from '../assets/images/grafity.jpg'; 

const Events = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(upcomingEvents.map(event => event.type))];

  const filteredEvents = filter === 'All' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.type === filter);

  const tags = [
    { text: "WE ABOUT TO GO WASTED", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-red-500/60" },
    { text: "WE GO DRINK ALL NIGHT", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-orange-500/60" },
    { text: "F*CK IM GONNA DRINK ALL NIGHT", pos: "top-[25%] right-[5%]", rotate: "-rotate-3", color: "text-red-600/60" },
    { text: "HYPHY ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white/30" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      
      {/* --- LAYER 1: GRAFFITI BACKGROUND --- */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `url(${GraffitiImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(130%) brightness(25%) grayscale(20%)' 
        }}
      >
        {/* Black Vignette (Behind tags) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black opacity-100"></div>

        {/* Street Text Tags */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-4xl md:text-7xl tracking-tighter uppercase select-none`}
              style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
            >
              {tag.text}
            </div>
          ))}
        </div>
      </div>

      {/* --- LAYER 2: INTERACTIVE CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        
        {/* Header Section */}
        <header className="mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-red-600/30 bg-red-600/5 mb-8">
            <span className="text-red-500 font-black tracking-[0.4em] uppercase text-[10px] animate-pulse">
              Live Schedule
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black italic text-white tracking-[-0.05em] uppercase leading-[0.8]">
            UPCOMING <br/>
            {/* FIXED "HYPE" FONT: 
                Color: White
                Stroke: 2px Red
                Shadow: Deep Red Glow
            */}
            <span 
              className="text-white drop-shadow-[0_0_40px_rgba(220,38,38,0.8)]"
              style={{
                WebkitTextStroke: '2px #dc2626', // Solid Red-600 Stroke
                paintOrder: 'stroke fill'
              }}
            >
              HYPE
            </span>
          </h1>
        </header>

        {/* Filter Bar */}
        <div className="flex gap-3 mb-16 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-4 rounded-xl font-black uppercase italic tracking-[0.2em] text-[11px] transition-all duration-300 border whitespace-nowrap ${
                filter === cat 
                ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] scale-105' 
                : 'bg-zinc-900/60 border-white/5 text-zinc-500 hover:border-red-600/50 hover:text-zinc-300 backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-950/40 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-red-600/50"
            >
              <div className="h-72 bg-zinc-900/80 relative overflow-hidden border-b border-white/5">
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color || 'from-red-600 to-black'} opacity-40 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="absolute top-6 left-6 px-4 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full z-20">
                  <span className="text-white font-black italic text-[9px] tracking-widest uppercase">{event.type}</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/5 font-black text-8xl italic tracking-tighter uppercase select-none">
                    {event.type}
                  </span>
                </div>
              </div>

              <div className="p-10 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-red-500 font-black text-[10px] tracking-[0.4em] uppercase mb-2">{event.sub || 'Special Event'}</p>
                    <h3 className="text-4xl font-black italic text-white leading-[0.9] uppercase tracking-tighter">
                      {event.title}
                    </h3>
                  </div>
                  <div className="text-right bg-white/5 p-3 rounded-2xl border border-white/5">
                    <p className="text-white font-black text-2xl italic leading-none">{event.date.split(',')[0]}</p>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase mt-1">{event.date.split(',')[1] || ''}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-8 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  {event.host && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                      {event.host}
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
                      {event.time}
                    </div>
                  )}
                </div>

                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest leading-relaxed mb-10">
                  {event.desc}
                </p>

                <button className="w-full py-5 bg-white text-black font-black uppercase italic tracking-[0.2em] text-xs rounded-2xl hover:bg-red-600 hover:text-white transition-all transform group-hover:scale-[1.02] shadow-xl">
                  Secure Access
                </button>
              </div>

              <div className="absolute top-[288px] -left-5 w-10 h-10 bg-black rounded-full z-20"></div>
              <div className="absolute top-[288px] -right-5 w-10 h-10 bg-black rounded-full z-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- LAYER 3: AMBIENT GLOWS --- */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
};

export default Events;