import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GraffitiImg from '../assets/images/grafity.jpg';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const user = await login(form.email, form.password);
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        if (form.password !== form.password_confirmation) {
          setError("Passwords don't match.");
          setLoading(false);
          return;
        }
        await register(form.name, form.email, form.password, form.password_confirmation);
        // Save email for pre-filling login, show success popup
        setRegisteredEmail(form.email);
        setShowSuccess(true);
        setForm({ name: '', email: '', password: '', password_confirmation: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessSignIn = () => {
    setShowSuccess(false);
    setMode('login');
    // Pre-fill email so user only needs to enter password
    setForm({ name: '', email: registeredEmail, password: '', password_confirmation: '' });
  };

  const tags = [
    { text: "STAY HYPHY", pos: "top-[10%] left-[3%]", rotate: "-rotate-12", color: "text-red-500" },
    { text: "BODEGA LIFE", pos: "bottom-[20%] right-[5%]", rotate: "rotate-6", color: "text-orange-500" },
    { text: "UNDERGROUND ONLY", pos: "top-[18%] right-[3%]", rotate: "-rotate-3", color: "text-red-600" },
    { text: "LOCKED IN", pos: "bottom-[15%] left-[8%]", rotate: "rotate-12", color: "text-white" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4">

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full opacity-30 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${GraffitiImg})`,
            filter: 'contrast(130%) brightness(40%) grayscale(20%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* GRAFFITI TAGS */}
      <div className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`absolute ${tag.pos} ${tag.rotate} ${tag.color} font-black italic text-3xl md:text-5xl tracking-tighter uppercase opacity-20 animate-pulse hidden md:block`}
            style={{
              animationDelay: `${index * 0.7}s`,
              textShadow: '3px 3px 0px rgba(0,0,0,1), 0 0 20px rgba(220,38,38,0.4)'
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* AMBIENT GLOW */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-red-600/10 blur-[160px] rounded-full z-0 pointer-events-none"></div>

      {/* EDGE GRADIENTS */}
      <div className="fixed top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

      {/* ✅ SUCCESS POPUP OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          {/* Popup Card */}
          <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center overflow-hidden">
            {/* Green Glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Checkmark Icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <p className="text-green-400 font-black uppercase tracking-[0.4em] text-[10px] mb-3 relative z-10">
              Registration Successful
            </p>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-3 relative z-10">
              You're In The Crew!
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-10 relative z-10 leading-relaxed">
              Your account has been created.<br/>Sign in now to enter the bodega.
            </p>

            {/* Sign In Now Button */}
            <button
              onClick={handleSuccessSignIn}
              className="group relative w-full bg-red-600 py-5 rounded-2xl font-black text-white italic tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-900/20 z-10"
            >
              <span className="relative z-10 uppercase text-sm">Sign In Now</span>
              <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      )}

      {/* AUTH CARD */}
      <div className="relative z-30 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">
            HYPHY<span className="text-red-600">BODEGA</span>
          </h1>
          <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mt-2">
            {mode === 'login' ? 'Welcome Back, Homie.' : 'Join The Underground.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex mb-8 bg-zinc-950/80 border border-white/5 rounded-2xl p-1 backdrop-blur-md">
          <button
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-3 rounded-xl font-black uppercase italic text-xs tracking-widest transition-all duration-300 ${
              mode === 'login'
                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-3 rounded-xl font-black uppercase italic text-xs tracking-widest transition-all duration-300 ${
              mode === 'register'
                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 px-5 py-4 bg-red-600/10 border border-red-600/40 rounded-2xl">
              <p className="text-red-400 font-black uppercase text-[10px] tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

            {/* Name Field (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="YOUR NAME"
                  required
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold uppercase text-xs"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="YOUR@EMAIL.COM"
                required
                className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold uppercase text-xs"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold text-xs"
              />
            </div>

            {/* Confirm Password (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 ml-1">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold text-xs"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-red-600 py-5 rounded-2xl font-black text-white italic tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <span className="relative z-10 uppercase text-sm">
                {loading ? 'Loading...' : mode === 'login' ? 'Enter The Bodega' : 'Join The Crew'}
              </span>
              <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-zinc-600 font-black uppercase tracking-widest text-[9px] mt-8">
          Stay Loud. Stay Hyphy. — © 2026 Hyphy Bodega
        </p>
      </div>
    </div>
  );
};

export default Auth;