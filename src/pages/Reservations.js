import React, { useState } from 'react';

// --- IMPORT ASSETS HERE ---
import FloorOne from '../assets/images/1stfloor.jpg';
import FloorTwo from '../assets/images/2ndfloor.jpg';
import GraffitiImg from '../assets/images/grafity.jpg';

const Reservations = () => {
  const [floor, setFloor] = useState(1);

  const tags = [
    { text: "WE ABOUT TO GO WASTED", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-red-500" },
    { text: "WE GO DRINK ALL NIGHT", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-orange-500" },
    { text: "F*CK IM GONNA DRINK ALL NIGHT", pos: "top-[20%] right-[5%]", rotate: "-rotate-3", color: "text-red-600" },
    { text: "HYPHY ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white pt-32 md:pt-48 pb-32 overflow-x-hidden">
      
      {/* 1. THE STABLE BACKGROUND LAYER (Matched to Home.js) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full opacity-40 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(60%) grayscale(20%)'
          }}
        ></div>
        {/* Subtle red tint overlay */}
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* 2. THE "WASTED" TAGS - High Visibility (Matched to Home.js) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-3xl md:text-6xl tracking-tighter uppercase opacity-90 animate-pulse hidden md:block`}
            style={{ 
              animationDelay: `${index * 0.7}s`,
              textShadow: '3px 3px 0px rgba(0,0,0,1), 0 0 20px rgba(220,38,38,0.4)' 
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* 3. AMBIENT RED GLOW */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[120vh] bg-red-600/15 blur-[160px] rounded-full z-20 pointer-events-none"></div>

      {/* 4. EDGE BLENDING - Fade for Navbar/Footer */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/20 to-transparent z-30 pointer-events-none"></div>

      {/* --- CONTENT LAYER (z-40) --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-40">
        
        {/* Header Section */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            LOCK DOWN <br/>
            <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">A TABLE</span>
          </h1>
          <p className="text-zinc-300 mt-6 uppercase tracking-[0.5em] font-black text-[10px] md:text-xs drop-shadow-lg">
            Experience the underground • VIP & Standard seating
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Venue Map */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <h2 className="text-xl font-black italic text-white uppercase tracking-widest">Venue Map</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => setFloor(1)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black transition-all duration-300 ${
                    floor === 1 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-zinc-950/80 text-zinc-500 border border-white/10 hover:border-white/20'
                  }`}
                >
                  1ST FLOOR
                </button>
                <button 
                  onClick={() => setFloor(2)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black transition-all duration-300 ${
                    floor === 2 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-zinc-950/80 text-zinc-500 border border-white/10 hover:border-white/20'
                  }`}
                >
                  2ND FLOOR
                </button>
              </div>
            </div>

            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm aspect-[3/4] md:aspect-auto shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <img 
                src={floor === 1 ? FloorOne : FloorTwo} 
                alt="Venue Map" 
                className="w-full h-full object-contain animate-in fade-in zoom-in duration-700 p-8"
              />

              <div className="absolute bottom-8 left-8 z-20 space-y-3 bg-black/80 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-white rounded-sm shadow-[0_0_8px_rgba(255,255,255,0.4)]"></span>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">C - Couch (4-5 Pax)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-zinc-700 rounded-sm border border-white/20"></span>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">S - Standing (4 Pax)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Form */}
          <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <form className="space-y-8 relative z-10">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ml-2">Lead Guest</label>
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold uppercase text-xs" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ml-2">Date</label>
                  <input type="date" className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white focus:border-red-600 outline-none uppercase text-xs font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ml-2">Time</label>
                  <input type="time" className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white focus:border-red-600 outline-none uppercase text-xs font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ml-2">Party Size</label>
                  <select className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-zinc-400 focus:border-red-600 outline-none uppercase text-xs font-bold appearance-none cursor-pointer">
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ml-2">Table Code</label>
                  <input 
                    type="text" 
                    placeholder="E.G. C2" 
                    className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white focus:border-red-600 outline-none uppercase text-xs font-bold placeholder:text-zinc-800" 
                  />
                </div>
              </div>

              <button className="group relative w-full bg-red-600 py-6 rounded-2xl font-black text-white italic tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-900/20">
                <span className="relative z-10 uppercase">Confirm Booking</span>
                <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <p className="text-center text-zinc-500 text-[10px] uppercase font-black tracking-widest pt-4 leading-relaxed">
                Stay Loud. Stay Hyphy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;