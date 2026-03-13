import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Style for active links with a glowing red highlight
  const isActive = (path) => 
    location.pathname === path 
      ? "text-white bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]" 
      : "text-zinc-400 hover:text-white hover:bg-white/5";

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      {/* TOP NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-black/20 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between z-[100]">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all text-red-600 active:scale-90"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Text Logo with Red Glow */}
          <Link to="/" className="text-2xl font-black italic tracking-tighter text-white uppercase group">
            HYPHY<span className="text-red-600 group-hover:drop-shadow-[0_0_10px_rgba(220,38,38,1)] transition-all duration-300">BODEGA</span>
          </Link>
        </div>

        {/* CENTERED LOGO IMAGE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <img 
            src={LogoImg} 
            alt="Logo" 
            className="h-14 w-auto object-contain opacity-90"
          />
        </div>

        {/* Right Section: Profile / Auth Button */}
        <button 
          onClick={handleAuthClick}
          title={user ? `Logged in as ${user.name} — Click to logout` : 'Sign In'}
          className="relative w-11 h-11 rounded-full border-2 border-red-600/50 p-0.5 hover:border-red-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
        >
          <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-red-500">
            {user ? (
              <span className="text-sm font-black uppercase text-red-500">
                {user.name.charAt(0)}
              </span>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
          {/* Green dot if logged in, red dot if not */}
          <span className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-black animate-pulse ${user ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </button>
      </nav>

      {/* OVERLAY: Darkens the screen when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* SIDEBAR DRAWER */}
      <aside className={`fixed top-0 left-0 h-full w-80 z-[120] shadow-[30px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Sidebar Background */}
        <div className="absolute inset-0 bg-zinc-950 bg-gradient-to-b from-red-950/40 via-zinc-950 to-zinc-950 border-r border-red-600/20"></div>
        
        {/* Sidebar Content */}
        <div className="relative h-full flex flex-col z-10">
          <div className="p-8 flex justify-between items-center border-b border-white/5">
            <h2 className="font-black italic text-white tracking-[0.3em] text-sm uppercase">Navigation</h2>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-red-500 transition-colors">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* User Info in Sidebar (if logged in) */}
          {user && (
            <div className="mx-6 mt-6 px-5 py-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Logged in as</p>
              <p className="text-white font-black italic uppercase text-sm tracking-tight">{user.name}</p>
              <span className={`text-[9px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'text-orange-500' : 'text-red-500'}`}>
                {user.role}
              </span>
            </div>
          )}

          <nav className="p-6 flex flex-col gap-2 overflow-y-auto no-scrollbar">
            {[
              { label: 'Home', path: '/', icon: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> },
              { label: 'Morning Cafe', path: '/cafe', icon: <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3 M10 1v3 M14 1v3"></path> },
              { label: 'The Night List', path: '/menu', icon: <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path> },
              { label: 'Reservations', path: '/reservations', icon: <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> },
              { label: 'Upcoming Hype', path: '/events', icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase italic text-xs tracking-[0.2em] transition-all duration-300 ${isActive(link.path)}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {link.icon}
                </svg>
                {link.label}
              </Link>
            ))}

            {/* Auth Link in Sidebar */}
            <button
              onClick={() => { handleAuthClick(); setIsOpen(false); }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase italic text-xs tracking-[0.2em] transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5 mt-2 border-t border-white/5 pt-6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {user 
                  ? <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></>
                  : <><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></>
                }
              </svg>
              {user ? 'Sign Out' : 'Sign In'}
            </button>
          </nav>

          {/* Bottom Card for Bodega Status */}
          <div className="mt-auto p-8">
            <div className="relative p-6 rounded-[2rem] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Bodega Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <p className="text-white font-black italic text-lg tracking-tighter uppercase">Active Night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;