import React, { useState } from 'react';
import { cafeItems } from '../utils/Data';
import GraffitiImg from '../assets/images/grafity.jpg'; 

const Cafe = () => {
  // Admin state to control shop status
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter logic for Cafe Categories
  const categories = ['All', 'Coffee', 'Pastries', 'Food'];
  const filteredItems = activeCategory === 'All' 
    ? cafeItems 
    : cafeItems.filter(item => item.category === activeCategory);

  // Background Graffiti Tags (Orange theme for Morning)
  const tags = [
    { text: "FRESH BREW ONLY", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-orange-500" },
    { text: "WAKE UP HYPHY", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-yellow-600" },
    { text: "BODEGA BREAKFAST", pos: "top-[20%] right-[5%]", rotate: "-rotate-3", color: "text-orange-600" },
    { text: "CAFFEINE ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white" },
  ];

  return (
    <div className={`relative min-h-screen w-full bg-black overflow-x-hidden transition-all duration-700 ${!isOpen ? 'grayscale-[0.4] contrast-75' : ''}`}>
      
      {/* 1. THE STABLE BACKGROUND LAYER */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full opacity-30 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(50%) grayscale(30%)'
          }}
        ></div>
        {/* Subtle orange tint overlay for morning */}
        <div className="absolute inset-0 bg-orange-950/10 mix-blend-multiply"></div>
      </div>

      {/* 2. THE GRAFFITI TAGS (z-1) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-3xl md:text-6xl tracking-tighter uppercase opacity-30 animate-pulse`}
            style={{ 
              animationDelay: `${index * 0.7}s`,
              textShadow: '2px 2px 0px rgba(0,0,0,1), 0 0 15px rgba(249,115,22,0.2)' 
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* 3. AMBIENT ORANGE GLOW */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] bg-orange-600/10 blur-[160px] rounded-full z-0 pointer-events-none"></div>

      {/* 4. MAIN CONTENT LAYER (z-10) */}
      <div className="relative z-10 px-6 pt-32 pb-40 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-[10px] ml-1">
                The Day Session
              </span>
              <h1 className="text-7xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                MORNING <span className={`transition-all duration-700 ${isOpen ? 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'text-zinc-700'}`}>BODEGA</span>
              </h1>
              <div className={`h-1.5 w-32 mt-6 transition-colors ${isOpen ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
            </div>

            {/* ADMIN TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 font-black italic text-[10px] uppercase tracking-widest transition-all ${
                isOpen 
                ? 'border-orange-500/30 text-orange-500 bg-orange-500/5 backdrop-blur-md' 
                : 'border-red-600 text-white bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
              }`}
            >
              {isOpen ? 'Close Shop' : 'Open Shop'}
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-orange-500 animate-pulse' : 'bg-white'}`}></div>
            </button>
          </div>
          
          {/* CATEGORY TABS */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-3 rounded-xl font-black uppercase italic tracking-widest text-[10px] transition-all border-2 ${
                  activeCategory === cat 
                  ? 'bg-orange-600 border-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] scale-105' 
                  : 'bg-zinc-900/80 border-white/5 text-zinc-500 hover:border-orange-600/50 hover:text-white backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* MENU GRID */}
        <div className="relative">
          {!isOpen && (
            <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm rounded-[2.5rem]">
              <div className="bg-red-600 text-white px-10 py-4 -rotate-3 font-black italic text-3xl uppercase tracking-tighter shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                Closed Kitchen
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${!isOpen ? 'opacity-20' : 'opacity-100'}`}>
            {filteredItems.map((item) => (
              <div key={item.id} className="group p-8 rounded-[2rem] bg-zinc-950/60 backdrop-blur-xl border border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">{item.category}</span>
                  <span className="text-3xl font-black italic text-white">${item.price}</span>
                </div>
                
                <h3 className="text-2xl font-black italic uppercase text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-8 italic uppercase tracking-tight">
                  {item.desc}
                </p>

                <button 
                  disabled={!isOpen}
                  className={`w-full py-4 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all ${
                    isOpen 
                    ? 'bg-white text-black hover:bg-orange-500 hover:text-white shadow-xl' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  {isOpen ? 'Add to Bag' : 'Closed'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-600 font-black italic uppercase tracking-widest text-xl animate-pulse">Morning menu is empty...</p>
          </div>
        )}

        {/* FOOTER NOTICE */}
        <div className="mt-32 px-12 py-12 rounded-[2.5rem] border-2 border-dashed border-white/5 bg-zinc-950/40 backdrop-blur-md text-center">
            <h4 className="text-white font-black italic text-2xl uppercase mb-2">Looking for the Bar?</h4>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
              The Night List opens at 5PM.
            </p>
            <a href="/menu" className="inline-block px-8 py-3 bg-red-600/10 border border-red-600/50 text-red-500 font-black italic uppercase text-xs tracking-widest rounded-lg hover:bg-red-600 hover:text-white transition-all">
              Switch to Night Mode
            </a>
        </div>
      </div>

      {/* Edge Blending Gradients */}
      <div className="fixed top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default Cafe;