import React from 'react';
import { Link } from 'react-router-dom';
import GraffitiImg from '../assets/images/grafity.jpg'; 

const Home = () => {
  const tags = [
    { text: "WE ABOUT TO GO WASTED", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-red-500" },
    { text: "WE GO DRINK ALL NIGHT", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-orange-500" },
    { text: "F*CK IM GONNA DRINK ALL NIGHT", pos: "top-[20%] right-[5%]", rotate: "-rotate-3", color: "text-red-600" },
    { text: "HYPHY ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white" },
  ];

  return (
    /* Main Container: No gaps, forced black base */
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* 1. THE STABLE BACKGROUND LAYER (Fixed z-index and removed blend mode for stability) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full opacity-40 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(60%) grayscale(20%)'
          }}
        ></div>
        {/* Subtle red tint overlay to unify the photo with the brand color */}
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* 2. THE "WASTED" TAGS - High Visibility Z-Index */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-3xl md:text-6xl tracking-tighter uppercase opacity-90 animate-pulse`}
            style={{ 
              animationDelay: `${index * 0.7}s`,
              textShadow: '3px 3px 0px rgba(0,0,0,1), 0 0 20px rgba(220,38,38,0.4)' 
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* 3. AMBIENT RED GLOW - Positioned between Background and Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[120vh] bg-red-600/15 blur-[160px] rounded-full z-20 pointer-events-none"></div>

      {/* --- CONTENT LAYER (z-40) --- */}
      <div className="relative z-40 flex flex-col items-center px-6">
        
        {/* Decorative Top Badge */}
        <div className="p-[1px] rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent mb-10">
          <div className="bg-zinc-950/95 backdrop-blur-xl px-10 py-2 rounded-full border border-white/5 shadow-2xl">
            <span className="text-white font-black tracking-[0.4em] uppercase text-[10px]">
              The Underground Experience
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-8xl md:text-[13rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-10 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <span className="inline-block hover:scale-105 transition-transform duration-300">HYPHY</span><br/>
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            BODEGA
            <div className="absolute -bottom-6 left-0 w-full h-6 bg-red-600/60 blur-3xl"></div>
          </span>
        </h1>

        <p className="text-zinc-300 max-w-2xl font-black uppercase tracking-[0.3em] text-[12px] mb-14 leading-loose drop-shadow-lg">
          Exclusive Sets <span className="text-red-600">•</span> Premium Drinks <span className="text-red-600">•</span> Midnight Vibes
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 relative z-50">
          <Link to="/cafe" className="group relative px-12 py-5 bg-orange-600 rounded-xl overflow-hidden shadow-2xl transition-all hover:scale-110 active:scale-95">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative text-white font-black italic uppercase text-sm tracking-widest">The Day List</span>
          </Link>

          <Link to="/menu" className="group relative px-12 py-5 bg-red-600 rounded-xl overflow-hidden shadow-2xl transition-all hover:scale-110 active:scale-95">
            <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative text-white font-black italic uppercase text-sm tracking-widest">The Night List</span>
          </Link>
          
          <Link to="/reservations" className="group px-12 py-5 border border-white/20 hover:border-red-600 hover:bg-red-600/10 rounded-xl transition-all hover:scale-110 active:scale-95 backdrop-blur-lg">
            <span className="text-white font-black italic uppercase text-sm tracking-widest group-hover:text-red-500">VIP Tables</span>
          </Link>
        </div>
      </div>

      {/* 4. EDGE BLENDING - Ensure no gap with Navbar/Footer */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/20 to-transparent z-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/20 to-transparent z-30 pointer-events-none"></div>
    </div>
  );
};

export default Home;