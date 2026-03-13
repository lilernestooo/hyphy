import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GraffitiImg from '../assets/images/grafity.jpg';
import { menuItems, upcomingEvents, cafeItems } from '../utils/Data';

const Home = () => {
  const [videoDismissed, setVideoDismissed] = useState(false);

  const tags = [
    { text: "WE ABOUT TO GO WASTED", pos: "top-[12%] left-[5%]", rotate: "-rotate-12", color: "text-red-500" },
    { text: "WE GO DRINK ALL NIGHT", pos: "bottom-[25%] right-[8%]", rotate: "rotate-6", color: "text-orange-500" },
    { text: "F*CK IM GONNA DRINK ALL NIGHT", pos: "top-[20%] right-[5%]", rotate: "-rotate-3", color: "text-red-600" },
    { text: "HYPHY ENERGY", pos: "bottom-[18%] left-[10%]", rotate: "rotate-12", color: "text-white" },
  ];

  const featuredMenu = menuItems.slice(0, 3);
  const featuredCafe = cafeItems.slice(0, 3);
  const featuredEvents = upcomingEvents.slice(0, 3);

  const steps = [
    {
      number: "01",
      title: "Book Your Table",
      desc: "Lock down your spot before the night gets wild. VIP and standard seating available.",
      icon: <path d="M3 4h18v18H3z M8 2v4 M16 2v4 M3 10h18"/>,
      link: "/reservations",
      color: "from-red-600 to-red-900"
    },
    {
      number: "02",
      title: "Order The List",
      desc: "Browse the night menu and the morning cafe. Add to your order straight from the app.",
      icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
      link: "/menu",
      color: "from-orange-600 to-red-900"
    },
    {
      number: "03",
      title: "Catch The Hype",
      desc: "Stay locked in on upcoming DJ sets, pop-ups, and premium events at the bodega.",
      icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
      link: "/events",
      color: "from-zinc-700 to-zinc-900"
    },
  ];

  return (
    <div className="relative w-full bg-black overflow-x-hidden">

      {/* ─── SHARED BACKGROUND ─── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full opacity-40 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(60%) grayscale(20%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* GRAFFITI TAGS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden">
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

      {/* ─── SECTION 1: ANNOUNCEMENT BANNER ─── */}
      <div className="relative z-40 w-full bg-red-600 py-3 px-6 flex items-center justify-center gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800 animate-pulse opacity-50"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-ping relative z-10"></div>
        <p className="relative z-10 text-white font-black italic uppercase tracking-[0.3em] text-[11px] text-center">
          🔥 HYPHY NEW YEAR — DEC 31 • Tickets going fast •&nbsp;
          <Link to="/events" className="underline underline-offset-2 hover:text-yellow-300 transition-colors">
            Secure Access Now
          </Link>
        </p>
        <div className="w-2 h-2 bg-white rounded-full animate-ping relative z-10" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* ─── SECTION 2: HERO ─── */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-10">
        {/* Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[120vh] bg-red-600/15 blur-[160px] rounded-full z-0 pointer-events-none"></div>

        <div className="relative z-40 flex flex-col items-center px-6 text-center">
          {/* Badge */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[8px]">Scroll</p>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>

        {/* Edge Blending */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/20 to-transparent z-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/20 to-transparent z-30 pointer-events-none"></div>
      </div>

      {/* ─── SECTION 3: HERO VIDEO/REEL ─── */}
      {!videoDismissed && (
        <div className="relative z-20 w-full bg-black py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px]">The Vibe</span>
              <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase mt-2">
                FEEL THE <span className="text-red-600">ENERGY</span>
              </h2>
            </div>

            {/* Video Embed Placeholder — replace src with real video URL */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-red-900/20 aspect-video bg-zinc-950 group">
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-600/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#dc2626" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <p className="text-white font-black italic uppercase tracking-[0.3em] text-sm">Watch The Reel</p>
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-[9px] mt-2">Add your video URL to activate</p>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              {/* Placeholder background */}
              <div
                className="absolute inset-0 opacity-20 bg-center bg-cover"
                style={{ backgroundImage: `url(${GraffitiImg})`, filter: 'blur(4px)' }}
              ></div>
            </div>

            <p className="text-center text-zinc-700 font-black uppercase tracking-widest text-[9px] mt-6">
              Replace the video placeholder in Home.js with your actual reel URL
            </p>
          </div>
        </div>
      )}

      {/* ─── SECTION 4: HOW IT WORKS ─── */}
      <div className="relative z-20 w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px]">The Process</span>
            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase mt-2">
              HOW IT <span className="text-red-600">WORKS</span>
            </h2>
            <div className="h-1 w-24 bg-red-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Link to={step.link} key={step.number} className="group relative p-8 rounded-[2.5rem] bg-zinc-950/60 border border-white/5 hover:border-red-600/40 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="text-[80px] font-black italic text-white/5 leading-none absolute -top-4 -right-2 select-none">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {step.icon}
                    </svg>
                  </div>

                  <p className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">{step.number}</p>
                  <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-4 group-hover:text-red-400 transition-colors">{step.title}</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black uppercase tracking-widest">Go</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SECTION 5: FEATURED MENU ITEMS ─── */}
      <div className="relative z-20 w-full py-24 px-6 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px]">Tonight's Picks</span>
              <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase mt-2">
                FEATURED <span className="text-red-600">MENU</span>
              </h2>
            </div>
            <Link to="/menu" className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition-colors group">
              <span className="font-black uppercase tracking-widest text-[10px]">View Full Menu</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredMenu.map((item) => (
              <div key={item.id} className="group p-6 rounded-[2rem] bg-zinc-950/80 border border-white/5 hover:border-red-600/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
                {/* Image Placeholder */}
                <div className="w-full h-40 rounded-2xl bg-zinc-900 border border-white/5 mb-5 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>
                  <span className="text-zinc-700 font-black italic uppercase text-xs tracking-widest relative z-10">No Image Yet</span>
                </div>
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">{item.category}</span>
                <div className="flex justify-between items-start mt-1">
                  <h3 className="text-lg font-black italic uppercase text-white group-hover:text-red-400 transition-colors">{item.name}</h3>
                  <span className="text-white font-mono font-bold">${item.price}</span>
                </div>
                <p className="text-zinc-600 text-xs mt-2 leading-relaxed font-bold uppercase tracking-tight">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Cafe Preview */}
          <div className="mt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-[10px]">Morning Session</span>
                <h2 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase mt-2">
                  FROM THE <span className="text-orange-500">CAFE</span>
                </h2>
              </div>
              <Link to="/cafe" className="flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors group">
                <span className="font-black uppercase tracking-widest text-[10px]">View Cafe Menu</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCafe.map((item) => (
                <div key={item.id} className="group p-6 rounded-[2rem] bg-zinc-950/80 border border-white/5 hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-full h-40 rounded-2xl bg-zinc-900 border border-white/5 mb-5 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-black"></div>
                    <span className="text-zinc-700 font-black italic uppercase text-xs tracking-widest relative z-10">No Image Yet</span>
                  </div>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">{item.category}</span>
                  <div className="flex justify-between items-start mt-1">
                    <h3 className="text-lg font-black italic uppercase text-white group-hover:text-orange-400 transition-colors">{item.name}</h3>
                    <span className="text-white font-mono font-bold">${item.price}</span>
                  </div>
                  <p className="text-zinc-600 text-xs mt-2 leading-relaxed font-bold uppercase tracking-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 6: UPCOMING EVENTS ─── */}
      <div className="relative z-20 w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-red-600 font-black tracking-[0.5em] uppercase text-[10px]">On The Radar</span>
              <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase mt-2">
                UPCOMING <span className="text-red-600">HYPE</span>
              </h2>
            </div>
            <Link to="/events" className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition-colors group">
              <span className="font-black uppercase tracking-widest text-[10px]">All Events</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-[2rem] bg-zinc-950/60 border border-white/5 hover:border-red-600/50 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]">
                {/* Color Header */}
                <div className={`h-40 bg-gradient-to-br ${event.color || 'from-red-600 to-black'} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-black text-6xl italic tracking-tighter uppercase select-none">{event.type}</span>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-white font-black italic text-[9px] tracking-widest uppercase">{event.type}</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-red-500 font-black text-[10px] tracking-[0.3em] uppercase mb-1">{event.date}</p>
                  <h3 className="text-xl font-black italic uppercase text-white tracking-tighter mb-2 group-hover:text-red-400 transition-colors">{event.title}</h3>
                  <p className="text-zinc-600 text-xs font-bold uppercase tracking-wider mb-6 leading-relaxed">{event.desc}</p>
                  <Link to="/events" className="flex items-center gap-2 text-red-600 font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                    Secure Access
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FINAL CTA ─── */}
      <div className="relative z-20 w-full py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 rounded-[3rem] overflow-hidden border border-red-600/20 bg-zinc-950/80 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-900/10"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

            <div className="relative z-10">
              <p className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Don't Sleep On It</p>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-[0.9] mb-8">
                LOCK DOWN<br/>YOUR SPOT
              </h2>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs mb-10 max-w-md mx-auto leading-relaxed">
                Tables fill up fast. Reserve your seat before the night gets wild.
              </p>
              <Link to="/reservations" className="group relative inline-block px-16 py-6 bg-red-600 rounded-2xl font-black text-white italic tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-900/30">
                <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 uppercase">Book A Table Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/20 to-transparent z-[5] pointer-events-none"></div>
    </div>
  );
};

export default Home;